import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs } from '../seo/schema';
import { PageHeader, Section } from '../components/ui';
import { SITE, whatsappLink } from '../utils/config';
import { recaptchaEnabled } from '../services/recaptcha';
import { formatDate } from '../utils/format';

// Change this date whenever the policy text changes.
const UPDATED = '2026-11-25';

// The parts about reCAPTCHA and analytics only appear when those are switched on in the settings,
// so the policy always describes what the site really does.
const recaptcha = recaptchaEnabled();
const analytics = Boolean(SITE.cfAnalyticsToken);

const link = 'text-violet-300 underline underline-offset-4 transition hover:text-fg';
const Email = () => <a href={`mailto:${SITE.email}`} className={link}>{SITE.email}</a>;
const WhatsApp = () => <a href={whatsappLink()} target="_blank" rel="noreferrer" className={link}>WhatsApp</a>;

const summary = [
  'We only collect what you type into our forms or send us yourself.',
  'We use it to reply to you and to work on your project. We never sell it.',
  analytics ? 'No advertising or tracking cookies. Our visitor statistics are cookie-free.' : 'No advertising or tracking cookies.',
  'Ask us any time to see, correct or delete your details.',
];

const sections = [
  { id: 'who-we-are', title: 'Who we are', body: (
    <p>Worklancer (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a web and software development company based in Pakistan, and we run this website, worklancer.org. For any question about your personal information, email <Email /> or message us on <WhatsApp />.</p>
  ) },
  { id: 'what-we-collect', title: 'What we collect', body: (
    <>
      <p><strong className="text-fg">What you send us.</strong> When you fill in a form on this site (the contact form, the project estimate form or the free website audit), we receive what you enter: your name and email address and, if you choose to give them, your phone number, company name, website address, the service you&rsquo;re interested in, your budget and your project details. When you email us or message us on WhatsApp, we receive your message and the contact details that come with it.</p>
      <p><strong className="text-fg">Visit information.</strong> Like almost every website, our hosting provider automatically records basic technical details of each visit, such as your IP address, browser type and the pages requested. These logs keep the site running and secure.</p>
      {analytics && <p><strong className="text-fg">Visitor statistics.</strong> We use Cloudflare Web Analytics to count visits. It doesn&rsquo;t use cookies or identify you; it tells us things like which pages are popular and roughly which country visitors come from.</p>}
    </>
  ) },
  { id: 'how-we-use-it', title: 'How we use it', body: (
    <>
      <ul className="space-y-2 pl-5 [list-style:disc] marker:text-violet-300">
        <li>To reply to your enquiry and send you the quote or audit you asked for.</li>
        <li>To plan and deliver your project if you become a client.</li>
        <li>To keep this website secure and stop spam.</li>
        {analytics && <li>To see which pages are useful, so we can improve the site.</li>}
      </ul>
      <p>We don&rsquo;t add you to a mailing list unless you ask us to, and we don&rsquo;t make automated decisions about you.</p>
      <p>If you are in the UK or the European Union, the legal reasons we rely on are: you asked us to contact you or to prepare a quote (steps before a contract), we need it to carry out our contract with you, and our legitimate interest in running a secure website.</p>
    </>
  ) },
  { id: 'who-we-share-it-with', title: 'Who we share it with', body: (
    <>
      <p>We never sell or rent your personal information. We only share it with the services that help us run this website and reply to you:</p>
      <ul className="space-y-2 pl-5 [list-style:disc] marker:text-violet-300">
        <li><strong className="text-fg">Web3Forms</strong>, which delivers form messages to our email inbox.</li>
        <li><strong className="text-fg">Google (Gmail)</strong>, which stores our email.</li>
        <li><strong className="text-fg">WhatsApp (Meta)</strong>, if you choose to contact us on WhatsApp.</li>
        <li><strong className="text-fg">Hostinger</strong>, which hosts this website.</li>
        {recaptcha && <li><strong className="text-fg">Google reCAPTCHA</strong>, which checks form submissions for spam. Google&rsquo;s <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={link}>Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className={link}>Terms of Service</a> apply.</li>}
        {analytics && <li><strong className="text-fg">Cloudflare</strong>, which provides our visitor statistics.</li>}
      </ul>
      <p>These services may store information outside Pakistan, for example in the United States or the European Union. We may also share information when the law requires it.</p>
    </>
  ) },
  { id: 'cookies', title: 'Cookies', body: (
    <p>This website doesn&rsquo;t use advertising or tracking cookies. To stop a form being sent twice by accident, your browser keeps a note of when you last sent one; it contains no personal information and disappears when you close the tab.{recaptcha && ' Google reCAPTCHA may set its own cookies to tell people and bots apart.'}</p>
  ) },
  { id: 'how-long-we-keep-it', title: 'How long we keep it', body: (
    <p>We keep enquiries while we need them to reply and follow up, and delete them within two years of our last contact unless you become a client. For clients, we keep project records for as long as our contract and the law require.</p>
  ) },
  { id: 'your-rights', title: 'Your rights', body: (
    <>
      <p>You can ask us at any time to show you the personal information we hold about you, correct it, delete it, or stop using it. Email <Email /> and we&rsquo;ll reply within 30 days.</p>
      <p>If you are in the UK or the European Union and you&rsquo;re unhappy with how we handled your information, you can also complain to your local data protection authority.</p>
    </>
  ) },
  { id: 'security', title: 'Security', body: (
    <p>The whole site uses HTTPS, strict browser security settings and a short list of trusted services, and only the people who need your details can see them. No system is perfectly secure, but we take reasonable care to protect your information.</p>
  ) },
  { id: 'children', title: 'Children', body: (
    <p>This website is for businesses and isn&rsquo;t aimed at children under 16. We don&rsquo;t knowingly collect their information.</p>
  ) },
  { id: 'changes', title: 'Changes to this policy', body: (
    <p>If we change this policy, we&rsquo;ll update this page and the date at the top.</p>
  ) },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy" path="/privacy-policy"
        description="How Worklancer handles the details you share through our website: what we collect, why, who we share it with, and how to see, correct or delete it."
        jsonLd={breadcrumbs([['Home', '/'], ['Privacy Policy', '/privacy-policy']])} />
      <PageHeader eyebrow="Legal" title="Privacy Policy" text="How we handle the details you share with us. In short: we use them to reply to you, and we never sell them." />

      <Section className="!pt-12 sm:!pt-16">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">On this page</p>
              <ol className="space-y-2.5 border-l border-line text-sm">
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-ink transition hover:border-violet-400 hover:text-fg">{s.title}</a></li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-3xl">
            <p className="text-sm text-muted">Last updated <time dateTime={UPDATED}>{formatDate(UPDATED)}</time></p>

            <div className="mt-6 rounded-xl2 border border-violet-500/25 bg-gradient-to-br from-violet-600/15 via-card to-card p-6 sm:p-8">
              <h2 className="text-xl">The short version</h2>
              <ul className="mt-5 space-y-3">
                {summary.map((t) => (
                  <li key={t} className="flex gap-3 text-ink">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-500/15 text-violet-300"><Check size={14} aria-hidden="true" /></span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 space-y-5 text-lg leading-relaxed text-ink">
              {sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id} className="space-y-5">
                  <h2 id={s.id} className="!mt-12 scroll-mt-28 text-2xl sm:text-3xl">{s.title}</h2>
                  {s.body}
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-xl2 border border-line bg-card p-6 text-ink sm:p-8">
              <h2 className="text-xl">Questions?</h2>
              <p className="mt-3 leading-relaxed">Email <Email /> or message us on <WhatsApp />. You can also use our <Link to="/contact" className={link}>contact page</Link>.</p>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
