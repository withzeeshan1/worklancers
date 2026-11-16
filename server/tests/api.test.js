import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret';
process.env.CLIENT_URL = 'https://example.test';
delete process.env.CLOUDINARY_CLOUD_NAME; delete process.env.SMTP_HOST;

const { default: app } = await import('../server.js');
const { default: mongoose } = await import('mongoose');
const { default: Admin } = await import('../models/Admin.js');
const { default: Service } = await import('../models/Service.js');
const { default: Lead } = await import('../models/Lead.js');

let server; let base; let token;
const call = async (method, path, { body, auth = true, headers = {} } = {}) => {
  const res = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(auth && token && { Authorization: `Bearer ${token}` }), ...headers }, body: body && JSON.stringify(body) });
  const ct = res.headers.get('content-type') || '';
  return { status: res.status, body: ct.includes('json') ? await res.json() : await res.text() };
};

before(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI || 'mongodb://127.0.0.1:27018/worklancers_test');
  await mongoose.connection.dropDatabase();
  await Admin.create({ name: 'Tester', email: 'admin@test.dev', password: 'a-long-test-password' });
  server = app.listen(0); base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { server.close(); await mongoose.connection.dropDatabase(); await mongoose.disconnect(); });

const validLead = { fullName: 'Ali Khan', email: 'ali@example.com', phone: '+923001234567', service: 'Web Development', budget: '$500 – $1,500', description: 'I need a business website with a contact form.' };

test('health + 404', async () => {
  assert.equal((await call('GET', '/api/health')).status, 200);
  assert.equal((await call('GET', '/api/nope')).status, 404);
});

test('auth: rejects bad creds, NoSQL injection, and protects routes', async () => {
  assert.equal((await call('POST', '/api/auth/login', { auth: false, body: { email: 'admin@test.dev', password: 'wrong-password' } })).status, 401);
  const inj = await call('POST', '/api/auth/login', { auth: false, body: { email: { $gt: '' }, password: { $gt: '' } } });
  assert.equal(inj.status, 400);
  for (const [m, p] of [['GET', '/api/leads'], ['GET', '/api/stats'], ['GET', '/api/auth/me'], ['POST', '/api/services'], ['DELETE', '/api/projects/abc'], ['GET', '/api/contacts']])
    assert.equal((await call(m, p, { auth: false })).status, 401, `${m} ${p} should be 401`);
  assert.equal((await call('GET', '/api/leads', { auth: false, headers: { Authorization: 'Bearer garbage' } })).status, 401);
});

test('auth: login works, /me works, password never returned', async () => {
  const r = await call('POST', '/api/auth/login', { auth: false, body: { email: 'admin@test.dev', password: 'a-long-test-password' } });
  assert.equal(r.status, 200); assert.ok(r.body.token); assert.equal(r.body.admin.password, undefined);
  token = r.body.token;
  const me = await call('GET', '/api/auth/me'); assert.equal(me.status, 200); assert.equal(me.body.admin.email, 'admin@test.dev');
  const stored = await Admin.findOne({ email: 'admin@test.dev' }).select('+password');
  assert.notEqual(stored.password, 'a-long-test-password'); assert.match(stored.password, /^\$2[aby]\$/);
});

for (const [path, make] of [
  ['services', (t) => ({ title: t, description: 'A service description', features: ['a'], benefits: ['b'] })],
  ['projects', (t) => ({ title: t, description: 'A project description', category: 'Web', technologies: ['React'], liveUrl: 'https://example.com' })],
  ['blogs', (t) => ({ title: t, excerpt: 'Short excerpt', content: 'Body text', category: 'SEO' })],
]) {
  test(`${path}: CRUD, slugs, validation, publish visibility`, async () => {
    assert.equal((await call('POST', `/api/${path}`, { body: { title: '' } })).status, 400);
    const a = await call('POST', `/api/${path}`, { body: make('Hello World') });
    assert.equal(a.status, 201); assert.equal(a.body.data.slug, 'hello-world');
    const b = await call('POST', `/api/${path}`, { body: make('Hello World') });
    assert.equal(b.body.data.slug, 'hello-world-2', 'duplicate titles get unique slugs');

    // blogs default to unpublished; others default to published
    const id = a.body.data._id;
    const isBlog = path === 'blogs';
    if (isBlog) {
      assert.equal((await call('GET', `/api/${path}`, { auth: false })).body.count, 0, 'unpublished blog hidden from public');
      assert.equal((await call('GET', `/api/${path}/hello-world`, { auth: false })).status, 404);
      assert.equal((await call('GET', `/api/${path}?all=true`)).body.count, 2, 'admin sees drafts');
      const pub = await call('PUT', `/api/${path}/${id}`, { body: { isPublished: true } });
      assert.equal(pub.status, 200); assert.ok(pub.body.data.publishedAt, 'publishedAt set');
    }
    assert.equal((await call('GET', `/api/${path}/hello-world`, { auth: false })).status, 200);

    // mass assignment: client cannot set protected fields
    const upd = await call('PUT', `/api/${path}/${id}`, { body: { title: 'Renamed', slug: 'hacked', _id: '000000000000000000000000', createdAt: '2000-01-01' } });
    assert.equal(upd.status, 200); assert.equal(upd.body.data.title, 'Renamed'); assert.equal(upd.body.data._id, id);
    assert.equal(upd.body.data.slug, 'hacked', 'explicit slug is allowed but normalized'); assert.notEqual(upd.body.data.createdAt, '2000-01-01T00:00:00.000Z');

    await call('PUT', `/api/${path}/${id}`, { body: { isPublished: false } });
    assert.equal((await call('GET', `/api/${path}/hacked`, { auth: false })).status, 404, 'unpublished hidden');
    assert.equal((await call('DELETE', `/api/${path}/${id}`)).status, 200);
    assert.equal((await call('DELETE', `/api/${path}/${id}`)).status, 404);
    assert.equal((await call('PUT', `/api/${path}/not-an-id`, { body: { title: 'x' } })).status, 400);
  });
}

test('regression: POST validators stay strict and empty optional fields are accepted', async () => {
  assert.equal((await call('POST', '/api/projects', { body: { description: 'd', category: 'c' } })).status, 400, 'missing title rejected by validator');
  assert.equal((await call('POST', '/api/services', { body: { description: 'only description' } })).status, 400);
  const ok = await call('POST', '/api/projects', { body: { title: 'No URL', description: 'd', category: 'c', liveUrl: '' } });
  assert.equal(ok.status, 201, 'empty liveUrl is allowed');
  const ok2 = await call('POST', '/api/projects', { body: { title: 'Null URL', description: 'd', category: 'c', liveUrl: null } });
  assert.equal(ok2.status, 201, 'null liveUrl is allowed');
  const clear = await call('PUT', `/api/projects/${ok.body.data._id}`, { body: { liveUrl: '' } });
  assert.equal(clear.status, 200);
});

test('projects: rejects javascript: URLs', async () => {
  const r = await call('POST', '/api/projects', { body: { title: 'Bad', description: 'd', category: 'c', liveUrl: 'javascript:alert(1)' } });
  assert.equal(r.status, 400);
});

test('leads: public create, validation, admin list/filter/search/status/delete', async () => {
  assert.equal((await call('POST', '/api/leads', { auth: false, body: { ...validLead, email: 'nope' } })).status, 400);
  assert.equal((await call('POST', '/api/leads', { auth: false, body: { ...validLead, description: 'short' } })).status, 400);
  assert.equal((await call('POST', '/api/leads', { auth: false, body: { ...validLead, fullName: { $ne: null } } })).status, 400);
  assert.equal((await call('POST', '/api/leads', { auth: false, body: { ...validLead, phone: 'abc' } })).status, 400, 'bad phone still rejected');
  const quick = await call('POST', '/api/leads', { auth: false, body: { fullName: 'Quick Audit', email: 'audit@example.com', service: 'Free Website Audit', description: 'Free website audit request. Website: example.com' } });
  assert.equal(quick.status, 201, 'phone and budget are optional');
  const quickLead = await Lead.findOne({ email: 'audit@example.com' });
  assert.equal(quickLead.budget, 'Not sure yet'); assert.equal(quickLead.phone, '');
  await Lead.deleteOne({ _id: quickLead._id });
  const ok = await call('POST', '/api/leads', { auth: false, body: { ...validLead, status: 'won' } });
  assert.equal(ok.status, 201); assert.equal(ok.body.success, true);
  await call('POST', '/api/leads', { auth: false, body: { ...validLead, fullName: 'Sara Ahmed', email: 'sara@example.com', service: 'AI & Automation' } });

  const all = await call('GET', '/api/leads'); assert.equal(all.body.total, 2);
  assert.ok(all.body.data.every((l) => l.status === 'new'), 'client cannot set status on creation');
  assert.equal((await call('GET', '/api/leads?search=sara')).body.total, 1);
  assert.equal((await call('GET', '/api/leads?service=' + encodeURIComponent('AI & Automation'))).body.total, 1);
  assert.equal((await call('GET', '/api/leads?search=.*')).body.total, 0, 'regex chars are escaped');
  const id = all.body.data[0]._id;
  assert.equal((await call('GET', `/api/leads/${id}`)).status, 200);
  assert.equal((await call('PUT', `/api/leads/${id}`, { body: { status: 'bogus' } })).status, 400);
  assert.equal((await call('PUT', `/api/leads/${id}`, { body: { status: 'contacted' } })).body.data.status, 'contacted');
  assert.equal((await call('GET', '/api/leads?status=contacted')).body.total, 1);
  assert.equal((await call('DELETE', `/api/leads/${id}`)).status, 200);
  assert.equal((await call('GET', '/api/leads')).body.total, 1);
});

test('contacts, stats, settings, upload, sitemap, robots', async () => {
  assert.equal((await call('POST', '/api/contacts', { auth: false, body: { name: 'A', email: 'a@b.co', subject: 's', message: 'hello there friend' } })).status, 400);
  assert.equal((await call('POST', '/api/contacts', { auth: false, body: { name: 'Ann', email: 'a@b.co', subject: 'Hi', message: 'hello there friend' } })).status, 201);
  assert.equal((await call('GET', '/api/contacts')).body.count, 1);

  await call('POST', '/api/services', { body: { title: 'Visible Svc', description: 'd' } });
  await call('POST', '/api/services', { body: { title: 'Hidden Svc', description: 'd', isPublished: false } });
  const st = (await call('GET', '/api/stats')).body.data;
  assert.equal(st.totalLeads, 1); assert.equal(st.newLeads, 1); assert.equal(st.services, await Service.countDocuments());

  const set = await call('PUT', '/api/settings', { body: { agencyEmail: 'hi@worklancers.test', social: { facebook: 'https://fb.com/x' }, evil: 'x' } });
  assert.equal(set.body.data.agencyEmail, 'hi@worklancers.test'); assert.equal(set.body.data.evil, undefined);
  assert.equal((await call('GET', '/api/settings', { auth: false })).body.data.agencyEmail, 'hi@worklancers.test');

  const up = await call('POST', '/api/upload'); assert.equal(up.status, 503); assert.match(up.body.message, /not configured/i);
  assert.equal((await call('POST', '/api/upload', { auth: false })).status, 401);

  const sm = await call('GET', '/sitemap.xml', { auth: false });
  assert.equal(sm.status, 200); assert.match(sm.body, /https:\/\/example\.test\/services\/visible-svc/); assert.doesNotMatch(sm.body, /hidden-svc/);
  assert.match((await call('GET', '/robots.txt', { auth: false })).body, /Sitemap: https:\/\/example\.test\/sitemap\.xml/);
});

test('security headers present', async () => {
  const res = await fetch(base + '/api/health');
  assert.ok(res.headers.get('x-content-type-options')); assert.equal(res.headers.get('x-powered-by'), null);
});
