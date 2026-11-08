import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    // reducedMotion="user" turns off transform animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-sky-400" style={{ scaleX: progress }} aria-hidden="true" />
        <Navbar />
        <motion.main key={pathname} className="flex-1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
          <Outlet />
        </motion.main>
        <Footer />
        <WhatsAppButton />
      </div>
    </MotionConfig>
  );
}
