import nodemailer from 'nodemailer';

export const emailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFY_EMAIL);

// Never pretends to succeed: returns { sent: false, reason } when unconfigured or failing.
export async function sendEmail({ subject, text }) {
  if (!emailConfigured()) return { sent: false, reason: 'SMTP is not configured' };
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to: process.env.NOTIFY_EMAIL, subject, text });
    return { sent: true };
  } catch (err) {
    console.error('Email failed:', err.message);
    return { sent: false, reason: err.message };
  }
}
