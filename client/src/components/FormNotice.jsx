import { Link } from 'react-router-dom';
import { recaptchaEnabled } from '../services/recaptcha';

// Small print under every form: what we do with the details, linking to the Privacy Policy.
// When reCAPTCHA is on, it adds Google's required wording, because its floating badge is hidden (see index.css):
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
export default function FormNotice({ className = '' }) {
  const link = 'underline underline-offset-2 transition hover:text-fg';
  return (
    <p className={`text-center text-[11px] leading-relaxed text-muted ${className}`}>
      We only use your details to reply to your enquiry. See our <Link to="/privacy-policy" className={link}>Privacy Policy</Link>.
      {recaptchaEnabled() && (
        <>
          {' '}This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={link}>Privacy Policy</a> and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className={link}>Terms of Service</a> apply.
        </>
      )}
    </p>
  );
}
