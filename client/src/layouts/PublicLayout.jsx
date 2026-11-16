import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyMotion, MotionConfig, domMax, m, useScroll, useSpring } from 'framer-motion';

// Animation features load in their own file after first render, keeping the startup bundle small.
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { organization } from '../seo/schema';

export default function PublicLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    // Links like "/#audit" from another page: wait for the new page to render, then scroll to the section.
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  // Feed the cursor position to every .spotlight card so its glow follows the mouse.
  useEffect(() => {
    const onMove = (e) => {
      for (const el of document.querySelectorAll('.spotlight')) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - r.left}px`);
        el.style.setProperty('--y', `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  // Skip the page fade on the very first load so pre-rendered content is visible immediately
  // (better for search engines and loading speed); later page changes still fade in.
  // (The page the visitor landed on is shown immediately; pages they navigate to fade in.)
  const [landingPath] = useState(pathname);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    // reducedMotion="user" turns off transform animations for visitors who ask for less motion.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <Helmet><script type="application/ld+json">{JSON.stringify(organization())}</script></Helmet>
        <div className="flex min-h-screen flex-col">
          <m.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-sky-400" style={{ scaleX: progress }} aria-hidden="true" />
          <Navbar />
          <m.main key={pathname} className="flex-1" initial={pathname === landingPath ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            {/* pages are loaded on demand; the pre-rendered HTML stays on screen until the page code arrives */}
            <Suspense fallback={null}><Outlet /></Suspense>
          </m.main>
          <Footer />
          <WhatsAppButton />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
