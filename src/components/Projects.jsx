import { useScrollReveal, useStaggerReveal, useTilt } from '../hooks/useAnimations';
import './Projects.css';

const PROJECTS = [
  {
    title: 'Vertical Eden Garden',
    category: 'Full Stack · MERN',
    description: 'Full-Stack MERN Platform enabling users to browse gardening services, book appointments, and make secure online payments. Features AI chatbot (Gemini), Razorpay payments, WhatsApp integration, admin dashboard with analytics, and OTP-based authentication.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Razorpay', 'Gemini AI', 'JWT'],
    featured: true,
    gradient: 'linear-gradient(135deg, #0f2b1d 0%, #1a4d2e 30%, #0d3320 60%, #0a1f14 100%)',
    icon: '🌿',
    liveUrl: 'https://verticaledengarden.in/',
    codeUrl: 'https://github.com/prabhat1530/vertical_eden_garden1',
    date: 'April 2026',
  },
  {
    title: 'Memory Visualisation Allocators',
    category: 'Interactive Simulator · Next.js',
    description: 'Interactive OS memory allocation simulator with First Fit, Best Fit, and Worst Fit algorithms. Custom simulation engine for allocation, deallocation, compaction, and lifecycle management with real-time visualization.',
    tags: ['Next.js', 'TypeScript', 'Algorithms', 'Data Structures', 'State Management'],
    featured: true,
    gradient: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 30%, #1e1450 60%, #0f1b35 100%)',
    icon: '🧩',
    liveUrl: 'https://memory-visualisation-allocators.vercel.app/',
    codeUrl: 'https://github.com/prabhat1530/Memory_Visualisation_Allocators',
    date: 'March 2026',
  },
  {
    title: 'Nexus — Social Media Platform',
    category: 'Full Stack · Real-time',
    description: 'Full-stack real-time social media platform with live chat, notifications, online status using Socket.IO. Secure JWT auth with refresh tokens, bcrypt hashing, RESTful APIs with Sequelize ORM, infinite scrolling, and debounce search.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Sequelize', 'JWT', 'Tailwind'],
    featured: true,
    gradient: 'linear-gradient(135deg, #1a2035 0%, #25304d 30%, #1d2842 60%, #101828 100%)',
    icon: '💬',
    liveUrl: 'https://nexus-three-inky.vercel.app/',
    codeUrl: 'https://github.com/prabhat1530/Nexus.git',
    date: 'April 2024',
  },
  {
    title: 'ISB — NLP Judgment Analysis',
    category: 'AI/ML · NLP',
    description: 'NLP-based judgment analysis system using Legal-BERT transformer models to classify case outcomes and extract insights. Built loan defaulter prediction with Random Forest/XGBoost. Automated data scraping with Selenium for large-scale legal data collection.',
    tags: ['Python', 'Legal-BERT', 'XGBoost', 'Selenium', 'NLP', 'SMOTE', 'Scikit-learn'],
    featured: false,
    gradient: 'linear-gradient(135deg, #2a1f3d 0%, #3d1f5c 30%, #2e1548 60%, #1a0f2e 100%)',
    icon: '⚖️',
    liveUrl: null,
    codeUrl: null,
    date: 'Mar 2025 – Mar 2026',
  },
];

function ProjectCard({ project, index, isRevealed, delay }) {
  const tiltRef = useTilt(6);

  return (
    <div
      ref={tiltRef}
      className="project-card"
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(35px)',
        transition: `opacity 0.6s var(--ease-out-expo) ${delay}, transform 0.6s var(--ease-out-expo) ${delay}`,
      }}
      data-cursor-hover
    >
      <div className="project-image-wrapper">
        <div
          className="project-image"
          style={{
            background: project.gradient,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '3.5rem' }}>{project.icon}</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            {project.date}
          </span>
        </div>
        {project.featured && (
          <span className="project-featured">Featured</span>
        )}
        <div className="project-overlay">
          <div className="project-overlay-actions">
            {project.liveUrl && (
              <a href={project.liveUrl} className="project-overlay-btn project-overlay-btn--primary" target="_blank" rel="noopener noreferrer">
                Live Demo →
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} className="project-overlay-btn project-overlay-btn--secondary" target="_blank" rel="noopener noreferrer">
                Source Code
              </a>
            )}
            {!project.liveUrl && !project.codeUrl && (
              <span className="project-overlay-btn project-overlay-btn--secondary" style={{ cursor: 'default' }}>
                Private Project
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="project-info">
        <div className="project-category">{project.category}</div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerRevealed] = useScrollReveal();
  const [gridRef, gridRevealed, getDelay] = useStaggerReveal(PROJECTS.length, 150);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div
          ref={headerRef}
          className={`projects-header reveal ${headerRevealed ? 'revealed' : ''}`}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>Projects</span>
          <h2 className="projects-heading">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="projects-subheading">
            Real-world projects showcasing full-stack development, AI/ML, and system design expertise
          </p>
        </div>

        <div ref={gridRef} className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isRevealed={gridRevealed}
              delay={getDelay(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
