import { SITE, whatsappLink } from '../utils/config';
import { getRecaptchaToken, recaptchaEnabled } from './recaptcha';

// Static-site lead handling, no backend needed.
// - With VITE_WEB3FORMS_KEY set, submissions are emailed to you via Web3Forms (free: https://web3forms.com).
// - Without a key, nothing is sent; the form instead offers a WhatsApp link with the message pre-filled.
//
// Abuse protection (in addition to Web3Forms' own server-side checks):
// - Google reCAPTCHA v3: every submission carries a fresh token, verified by Web3Forms with the
//   secret key saved in its dashboard (see services/recaptcha.js)
// - honeypot: a hidden `botcheck` field only bots fill in
// - speed trap: forms completed faster than a human could are treated as bots
// - throttle: one submission per browser tab every THROTTLE_MS
// - every field is cleaned of control characters and capped in length
//
// A real visitor is never stuck: if reCAPTCHA can't load (ad blocker, network) or rejects them,
// the form hands their message over to WhatsApp instead of losing the lead.

const LABELS = { fullName: 'Name', email: 'Email', phone: 'Phone', companyName: 'Company', service: 'Service', budget: 'Budget', description: 'Details' };
// Maximum length per field; one-line fields also lose line breaks (prevents email header injection).
const LIMITS = { fullName: 100, email: 254, phone: 30, companyName: 120, service: 120, budget: 60, description: 4000 };
const MULTILINE = new Set(['description']);
const MIN_FILL_MS = 2500;
const THROTTLE_MS = 30000;
const THROTTLE_KEY = 'wl:lastLeadAt';

function clean(key, value) {
  if (typeof value !== 'string') return '';
  // Remove invisible control characters; multi-line fields keep line breaks and tabs.
  const v = MULTILINE.has(key) ? value.replace(/[^\P{C}\n\t]/gu, '') : value.replace(/\p{C}/gu, ' ');
  return v.trim().slice(0, LIMITS[key] ?? 500);
}

function toText(lead) {
  return Object.entries(LABELS)
    .filter(([k]) => lead[k])
    .map(([k, label]) => `${label}: ${lead[k]}`)
    .join('\n');
}

const lastSentAt = () => { try { return Number(sessionStorage.getItem(THROTTLE_KEY)) || 0; } catch { return 0; } };
const markSent = () => { try { sessionStorage.setItem(THROTTLE_KEY, String(Date.now())); } catch { /* storage unavailable */ } };

/**
 * @param payload form values; may include `form` (reCAPTCHA action name, e.g. 'contact'),
 *   `botcheck` (honeypot) and `startedAt` (ms timestamp when the form appeared)
 * @returns {Promise<{ sent: true } | { sent: false, whatsappUrl: string }>}
 */
export async function submitLead(payload) {
  // Bots: hidden field filled in, or the form was completed impossibly fast. Pretend success, send nothing.
  if (payload.botcheck) return { sent: true };
  if (payload.startedAt && Date.now() - payload.startedAt < MIN_FILL_MS) return { sent: true };

  if (Date.now() - lastSentAt() < THROTTLE_MS) {
    throw new Error('Your request was just sent. Please wait a few seconds before sending another one.');
  }

  const lead = Object.fromEntries(Object.keys(LABELS).map((k) => [k, clean(k, payload[k])]));
  const viaWhatsapp = () => ({ sent: false, whatsappUrl: whatsappLink(`Hello Worklancers, I'd like to get in touch.\n\n${toText(lead)}`) });

  if (!SITE.web3formsKey) return viaWhatsapp();

  let recaptcha = {};
  if (recaptchaEnabled()) {
    try {
      recaptcha = { recaptcha_response: await getRecaptchaToken(payload.form || 'lead') };
    } catch {
      return viaWhatsapp();
    }
  }

  const post = async (extra) => {
    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: SITE.web3formsKey,
        subject: `New inquiry from ${lead.fullName} (${lead.service})`,
        from_name: `${SITE.name} website`,
        replyto: lead.email,
        botcheck: '', // Web3Forms rejects the submission server-side if this is ever non-empty
        ...extra,
        ...Object.fromEntries(Object.entries(LABELS).filter(([k]) => lead[k]).map(([k, label]) => [label, lead[k]])),
      }),
    });
    return [r, await r.json().catch(() => ({}))];
  };

  let res, data;
  try {
    [res, data] = await post(recaptcha);
    // Web3Forms' free plan rejects any reCAPTCHA token ("You are trying to use a Pro feature").
    // Never lose a lead over account settings: send it again without the token. (Not a bypass: if
    // reCAPTCHA is enforced in the Web3Forms dashboard, a token-less submission is refused anyway.)
    if (!data.success && recaptcha.recaptcha_response && /pro feature|upgrade/i.test(data.message || '')) {
      [res, data] = await post({});
    }
  } catch {
    throw new Error('Could not send your request. Please check your connection or contact us on WhatsApp.');
  }
  // reCAPTCHA said "probably a bot". If it's actually a person (VPN, privacy browser), WhatsApp still works.
  if (!data.success && /captcha/i.test(data.message || '')) return viaWhatsapp();
  if (!res.ok || !data.success) throw new Error(data.message || 'Something went wrong. Please try again or contact us on WhatsApp.');
  markSent();
  return { sent: true };
}
