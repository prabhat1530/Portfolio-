import { useMagnetic } from '../hooks/useAnimations';
import './Footer.css';

export default function Footer() {
  const btnRef = useMagnetic(0.15);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <img src="/assets/pk_logo.png" alt="PK Logo" className="footer-logo-img" />
            </span>
            <span className="footer-tagline">Building the future, one line at a time.</span>
          </div>

          <div className="footer-copyright">
            © {new Date().getFullYear()} <span>Prabhat Kumar</span>. Crafted with passion.
          </div>

          <button
            ref={btnRef}
            className="footer-back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            data-cursor-hover
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
