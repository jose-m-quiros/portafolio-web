import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Experience from '@/components/portfolio/Experience';
import Projects from '@/components/portfolio/Projects';
import Education from '@/components/portfolio/Education';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import ScrollProgress from '@/components/ui/scroll-progress';
import ScrollReveal from '@/components/ui/scroll-reveal';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <Skills />
      </ScrollReveal>
      <ScrollReveal direction="left">
        <Experience />
      </ScrollReveal>
      <ScrollReveal direction="right">
        <Projects />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <Education />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={150}>
        <Contact />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
