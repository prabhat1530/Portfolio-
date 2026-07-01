import { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import StudyHub from './components/StudyHub';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader */}
      <div className={`preloader ${loaded ? 'loaded' : ''}`}>
        <div className="preloader-logo">
          <img src="/assets/pk_logo.png" alt="PK Logo" className="preloader-logo-img" />
        </div>
      </div>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Particle Background */}
      <ParticleCanvas />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <StudyHub />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
