import { useState } from 'react';
import { useScrollReveal, useMagnetic } from '../hooks/useAnimations';
import './Contact.css';

export default function Contact() {
  const [headerRef, headerRevealed] = useScrollReveal();
  const [formRef, formRevealed] = useScrollReveal();
  const [detailsRef, detailsRevealed] = useScrollReveal();
  const submitRef = useMagnetic(0.08);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:prabhat.k23csai@nst.rishihood.edu.in?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.open(mailtoLink);
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact-aurora" />
      
      <div className="container">
        <div className="contact-wrapper">
          {/* Info Side */}
          <div
            ref={headerRef}
            className={`contact-info reveal-left ${headerRevealed ? 'revealed' : ''}`}
          >
            <span className="section-label">Contact</span>
            <h2 className="contact-heading">
              Let's Build Something <span className="gradient-text">Amazing</span> Together
            </h2>
            <p className="contact-text">
              Have a project in mind or just want to chat about technology? 
              I'm always open to new opportunities, internships, and interesting conversations.
            </p>

            <div
              ref={detailsRef}
              className={`contact-details reveal ${detailsRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="contact-detail" data-cursor-hover>
                <div className="contact-detail-icon">📧</div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">prabhat.k23csai@nst.rishihood.edu.in</div>
                </div>
              </div>
              <div className="contact-detail" data-cursor-hover>
                <div className="contact-detail-icon">📱</div>
                <div>
                  <div className="contact-detail-label">Phone</div>
                  <div className="contact-detail-value">+91 7033721604</div>
                </div>
              </div>
              <div className="contact-detail" data-cursor-hover>
                <div className="contact-detail-icon">🎓</div>
                <div>
                  <div className="contact-detail-label">Education</div>
                  <div className="contact-detail-value">B.Tech AI · Newton School of Technology</div>
                </div>
              </div>
              <div className="contact-detail" data-cursor-hover>
                <div className="contact-detail-icon">💼</div>
                <div>
                  <div className="contact-detail-label">Status</div>
                  <div className="contact-detail-value" style={{ color: '#4ade80' }}>
                    Available for Opportunities
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/prabhat1530" className="contact-social" target="_blank" rel="noopener noreferrer" data-cursor-hover aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/prabhat-kumar-9ba33925a/" className="contact-social" target="_blank" rel="noopener noreferrer" data-cursor-hover aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://leetcode.com/u/prabhat15s/" className="contact-social" target="_blank" rel="noopener noreferrer" data-cursor-hover aria-label="LeetCode">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
              </a>
              <a href="mailto:prabhat.k23csai@nst.rishihood.edu.in" className="contact-social" data-cursor-hover aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div
            ref={formRef}
            className={`contact-form-wrapper reveal-right ${formRevealed ? 'revealed' : ''}`}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                ref={submitRef}
                type="submit"
                className="form-submit"
                data-cursor-hover
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
