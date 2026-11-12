import { m } from 'framer-motion';
import Seo from '../components/Seo';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <Seo title="Page Not Found" path="/404" noindex />
      <m.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="text-gradient text-8xl font-bold">404</m.p>
      <h1 className="mt-4 text-2xl">Page not found</h1>
      <p className="mt-2 text-muted">The page you are looking for does not exist, but your next project could.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button to="/">Back to Home</Button>
        <Button to="/contact" variant="outline">Get a Free Quote</Button>
      </div>
    </div>
  );
}
