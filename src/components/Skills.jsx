import { useState } from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useAnimations';
import './Skills.css';

const SKILL_CATEGORIES = {
  All: null,
  Languages: 'languages',
  'Frontend': 'frontend',
  'Backend': 'backend',
  'AI/ML': 'aiml',
  'Tools': 'tools',
};

const SKILLS = [
  // Languages
  { name: 'JavaScript', icon: '🟨', category: 'languages', level: 92 },
  { name: 'TypeScript', icon: '🔷', category: 'languages', level: 85 },
  { name: 'Python', icon: '🐍', category: 'languages', level: 88 },
  { name: 'Java', icon: '☕', category: 'languages', level: 75 },
  { name: 'C', icon: '⚙️', category: 'languages', level: 72 },
  { name: 'SQL', icon: '🗃️', category: 'languages', level: 82 },
  { name: 'HTML/CSS', icon: '🎨', category: 'languages', level: 95 },

  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend', level: 92 },
  { name: 'Next.js', icon: '▲', category: 'frontend', level: 88 },
  { name: 'Tailwind CSS', icon: '🌊', category: 'frontend', level: 90 },
  { name: 'Socket.IO', icon: '🔌', category: 'frontend', level: 78 },

  // Backend
  { name: 'Node.js', icon: '💚', category: 'backend', level: 88 },
  { name: 'Express.js', icon: '🚀', category: 'backend', level: 85 },
  { name: 'MongoDB', icon: '🍃', category: 'backend', level: 85 },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend', level: 80 },
  { name: 'MySQL', icon: '🐬', category: 'backend', level: 78 },
  { name: 'Firebase', icon: '🔥', category: 'backend', level: 75 },
  { name: 'Prisma ORM', icon: '◆', category: 'backend', level: 78 },

  // AI/ML
  { name: 'Machine Learning', icon: '🧠', category: 'aiml', level: 82 },
  { name: 'NumPy', icon: '🔢', category: 'aiml', level: 80 },
  { name: 'Pandas', icon: '🐼', category: 'aiml', level: 82 },
  { name: 'Matplotlib', icon: '📊', category: 'aiml', level: 78 },
  { name: 'OpenCV', icon: '👁️', category: 'aiml', level: 72 },

  // Tools
  { name: 'Git & GitHub', icon: '📦', category: 'tools', level: 90 },
  { name: 'Postman', icon: '📮', category: 'tools', level: 85 },
  { name: 'Playwright', icon: '🎭', category: 'tools', level: 72 },
  { name: 'Figma', icon: '🎯', category: 'tools', level: 78 },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [headerRef, headerRevealed] = useScrollReveal();
  const [gridRef, gridRevealed, getDelay] = useStaggerReveal(SKILLS.length, 50);

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === SKILL_CATEGORIES[activeCategory]);

  return (
    <section className="skills section" id="skills">
      {/* SVG gradient definition for skill rings */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c6aff" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container">
        <div
          ref={headerRef}
          className={`skills-header reveal ${headerRevealed ? 'revealed' : ''}`}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>Skills</span>
          <h2 className="skills-heading">
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="skills-subheading">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="skills-categories">
          {Object.keys(SKILL_CATEGORIES).map(cat => (
            <button
              key={cat}
              className={`skills-category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="skills-grid">
          {filteredSkills.map((skill, i) => {
            const circumference = 2 * Math.PI * 24;
            const offset = circumference - (skill.level / 100) * circumference;

            return (
              <div
                key={skill.name}
                className="skill-card"
                style={{
                  opacity: gridRevealed ? 1 : 0,
                  transform: gridRevealed ? 'translateY(0)' : 'translateY(25px)',
                  transition: `opacity 0.5s var(--ease-out-expo) ${getDelay(i)}, transform 0.5s var(--ease-out-expo) ${getDelay(i)}`,
                }}
                data-cursor-hover
              >
                <div className="skill-ring">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle className="skill-ring-bg" cx="30" cy="30" r="24" />
                    <circle
                      className="skill-ring-progress"
                      cx="30"
                      cy="30"
                      r="24"
                      strokeDasharray={circumference}
                      strokeDashoffset={gridRevealed ? offset : circumference}
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                    }}
                  >
                    {skill.icon}
                  </div>
                </div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-level">{skill.level}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
