import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { SocialProof } from '../components/SocialProof';
import { Offer } from '../components/Offer';
import { CatalogForm } from '../components/CatalogForm';
import { Guarantee } from '../components/Guarantee';
import { CTA } from '../components/CTA';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { motion, useScroll, useSpring } from 'motion/react';

export function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-amber-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <SocialProof />
      <Offer />
      <CatalogForm />
      <Guarantee />
      <CTA />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
}
