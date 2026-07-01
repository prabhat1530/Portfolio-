import { useScrollReveal, useCountUp, useStaggerReveal } from '../hooks/useAnimations';
import './About.css';

const STATS = [
  { number: 5, suffix: '+', label: 'Projects Built' },
  { number: 1, suffix: '+', label: 'Year Experience' },
  { number: 3, suffix: '+', label: 'Tech Stacks' },
];

const TAGS = [
  'React', 'Next.js', 'Node.js', 'Express.js', 'TypeScript',
  'Python', 'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase',
  'Prisma ORM', 'Tailwind CSS', 'Socket.IO', 'Git & GitHub',
  'Machine Learning', 'NumPy', 'Pandas', 'OpenCV',
  'Playwright', 'Postman', 'Figma', 'Java', 'C', 'SQL',
];

function StatItem({ number, suffix, label, isRevealed }) {
  const count = useCountUp(number, 2000, true, isRevealed);
  
  return (
    <div className="about-stat">
      <div className="about-stat-number">{count}{suffix}</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [titleRef, titleRevealed] = useScrollReveal();
  const [textRef, textRevealed] = useScrollReveal();
  const [statsRef, statsRevealed] = useScrollReveal();
  const [tagsContainerRef, tagsRevealed, getTagDelay] = useStaggerReveal(TAGS.length, 40);
  const [portraitRef, portraitRevealed] = useScrollReveal();

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className={`about-portrait reveal-left ${portraitRevealed ? 'revealed' : ''}`}
          >
            <div className="about-shape about-shape--1" />
            <div className="about-shape about-shape--2" />
            <div className="about-image-wrapper">
              <img
                src="/assets/developer_about_avatar.png"
                alt="Developer workspace avatar"
                className="about-image"
              />
            </div>
            <div className="about-badge">
              <div className="about-badge-number">ISB</div>
              <div className="about-badge-text">AI/ML Intern<br/>Hyderabad</div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div
              ref={titleRef}
              className={`reveal ${titleRevealed ? 'revealed' : ''}`}
            >
              <span className="section-label">About Me</span>
              <h2 className="about-heading">
                B.Tech Student & <span className="gradient-text">AI/ML Developer</span> Building Real-World Solutions
              </h2>
            </div>

            <div
              ref={textRef}
              className={`about-description reveal ${textRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.15s' }}
            >
              <p>
                I'm a B.Tech student in Artificial Intelligence at Newton School of Technology, 
                Rishihood University (2023–2027). With a passion for AI/ML and full-stack development, 
                I build web applications and machine learning projects using React, Next.js, Node.js, and Python.
              </p>
              <p>
                As an AI & ML Intern at the Indian School of Business (ISB), Hyderabad, I developed 
                NLP-based judgment analysis systems using transformer models (Legal-BERT), built loan 
                defaulter prediction models, and designed end-to-end ML pipelines. I have a strong 
                understanding of data structures and problem solving, and I'm focused on learning, 
                improving, and building impactful solutions.
              </p>
            </div>

            <div
              ref={statsRef}
              className={`about-stats reveal ${statsRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  {...stat}
                  isRevealed={statsRevealed}
                />
              ))}
            </div>

            <div
              ref={tagsContainerRef}
              className="about-tags"
            >
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="about-tag"
                  style={{
                    opacity: tagsRevealed ? 1 : 0,
                    transform: tagsRevealed ? 'translateY(0)' : 'translateY(15px)',
                    transition: `opacity 0.4s var(--ease-out-expo) ${getTagDelay(i)}, transform 0.4s var(--ease-out-expo) ${getTagDelay(i)}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
