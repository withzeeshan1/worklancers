import { recaptchaEnabled } from '../services/recaptcha';

// Google's required wording when its floating reCAPTCHA badge is hidden (see index.css):
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
export default function RecaptchaNotice({ className = '' }) {
  if (!recaptchaEnabled()) return null;
  const link = 'underline underline-offset-2 transition hover:text-fg';
  return (
    <p className={`text-center text-[11px] leading-relaxed text-muted ${className}`}>
      This site is protected by reCAPTCHA and the Google{' '}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={link}>Privacy Policy</a> and{' '}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className={link}>Terms of Service</a> apply.
    </p>
  );
}
