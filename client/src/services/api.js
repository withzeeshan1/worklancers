import { SITE, whatsappLink } from '../utils/config';

// Static-site lead handling, no backend needed.
// - With VITE_WEB3FORMS_KEY set, submissions are emailed to you via Web3Forms (free: https://web3forms.com).
// - Without a key, nothing is sent; the form instead offers a WhatsApp link with the message pre-filled.

const LABELS = { fullName: 'Name', email: 'Email', phone: 'Phone', companyName: 'Company', service: 'Service', budget: 'Budget', description: 'Details' };

function toText(payload) {
  return Object.entries(LABELS)
    .filter(([k]) => payload[k])
    .map(([k, label]) => `${label}: ${payload[k]}`)
    .join('\n');
}

/** @returns {Promise<{ sent: true } | { sent: false, whatsappUrl: string }>} */
export async function submitLead(payload) {
  if (!SITE.web3formsKey) {
    return { sent: false, whatsappUrl: whatsappLink(`Hello Worklancers, I'd like to get in touch.\n\n${toText(payload)}`) };
  }

  let res;
  try {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: SITE.web3formsKey,
        subject: `New inquiry from ${payload.fullName} (${payload.service})`,
        from_name: `${SITE.name} website`,
        replyto: payload.email,
        ...Object.fromEntries(Object.entries(LABELS).filter(([k]) => payload[k]).map(([k, label]) => [label, payload[k]])),
      }),
    });
  } catch {
    throw new Error('Could not send your request. Please check your connection or contact us on WhatsApp.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || 'Something went wrong. Please try again or contact us on WhatsApp.');
  return { sent: true };
}
