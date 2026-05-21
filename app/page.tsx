import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Work />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
