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

export function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950">
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
    </div>
  );
}
