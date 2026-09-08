import { useRef } from 'react';
import { Capabilities } from './components/Capabilities';
import { Contact } from './components/Contact';
import { Differentials } from './components/Differentials';
import { Engineering } from './components/Engineering';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Method } from './components/Method';
import { Tiers } from './components/Tiers';
import { WhatsAppFab } from './components/WhatsAppFab';
import { Work } from './components/Work';
import { useRevealRoot } from './lib/hooks';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealRoot(rootRef);

  return (
    <div ref={rootRef}>
      <Header />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Capabilities />
        <Method />
        <Work />
        <Tiers />
        <Engineering />
        <Differentials />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
