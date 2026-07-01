import { useState, useEffect } from 'react';
import { useMagnetic } from '../hooks/useAnimations';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Study Hub', href: '#study-hub' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#" className="nav-logo" data-cursor-hover onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/assets/pk_logo.png" alt="PK Logo" className="nav-logo-img" />
        </a>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={activeSection === item.href.slice(1)}
              onClick={(e) => handleNavClick(e, item.href)}
            />
          ))}
          <a
            href="#contact"
            className="nav-cta"
            data-cursor-hover
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active, onClick }) {
  const magneticRef = useMagnetic(0.2);

  return (
    <a
      ref={magneticRef}
      href={href}
      className={`nav-link ${active ? 'active' : ''}`}
      onClick={onClick}
      data-cursor-hover
    >
      {label}
    </a>
  );
}
