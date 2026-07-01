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

export default function Navbar({ isStudyPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isStudyPage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map(item => item.href.slice(1)).filter(s => s !== 'study-hub');
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
  }, [isStudyPage]);

  const handleNavClick = (e, href) => {
    if (isStudyPage) return; // let natural link routing do it

    e.preventDefault();
    setMenuOpen(false);
    
    if (href === '#/study') {
      window.location.hash = '#/study';
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled || isStudyPage ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#/" className="nav-logo" data-cursor-hover onClick={() => { if (!isStudyPage) window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
          {isStudyPage ? (
            <a
              href="#/"
              className="nav-link active"
              onClick={() => setMenuOpen(false)}
              data-cursor-hover
            >
              ← Back to Portfolio
            </a>
          ) : (
            <>
              {NAV_ITEMS.map(item => {
                const targetHref = item.label === 'Study Hub' ? '#/study' : item.href;
                return (
                  <NavLink
                    key={item.href}
                    href={targetHref}
                    label={item.label}
                    active={activeSection === item.href.slice(1)}
                    onClick={(e) => handleNavClick(e, targetHref)}
                  />
                );
              })}
              <a
                href="#contact"
                className="nav-cta"
                data-cursor-hover
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Let's Talk
              </a>
            </>
          )}
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
