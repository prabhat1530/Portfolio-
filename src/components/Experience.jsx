import { useScrollReveal, useStaggerReveal } from '../hooks/useAnimations';
import './Experience.css';

const EXPERIENCE = [
  {
    role: 'AI & ML Intern',
    company: 'Indian School of Business (ISB)',
    location: 'Gachibowli, Hyderabad',
    date: 'March 2025 — March 2026',
    points: [
      'Developed NLP-based judgment analysis system using transformer models (Legal-BERT) to classify case outcomes and extract insights',
      'Built loan defaulter prediction model using ML algorithms (Random Forest/XGBoost) on financial datasets',
      'Automated data scraping using Selenium to collect large-scale legal judgments and financial data with reliable workflows',
      'Designed end-to-end ML pipelines covering preprocessing, feature engineering, training, evaluation, and inference',
      'Optimized model performance using hyperparameter tuning, class imbalance handling (SMOTE), and metrics like F1-score & ROC-AUC',
    ],
  },
];

export default function Experience() {
  const [headerRef, headerRevealed] = useScrollReveal();
  const [timelineRef, timelineRevealed, getDelay] = useStaggerReveal(EXPERIENCE.length, 200);
  const [eduRef, eduRevealed] = useScrollReveal();

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <div
          ref={headerRef}
          className={`experience-header reveal ${headerRevealed ? 'revealed' : ''}`}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>Experience</span>
          <h2 className="experience-heading">
            Where I've <span className="gradient-text">Worked</span>
          </h2>
          <p className="experience-subheading">
            Professional experience in AI, Machine Learning, and Software Development
          </p>
        </div>

        <div ref={timelineRef} className="experience-timeline">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={exp.company}
              className="experience-item"
              style={{
                opacity: timelineRevealed ? 1 : 0,
                transform: timelineRevealed ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s var(--ease-out-expo) ${getDelay(i)}, transform 0.6s var(--ease-out-expo) ${getDelay(i)}`,
              }}
            >
              <div className="experience-dot" />
              <div className="experience-card" data-cursor-hover>
                <div className="experience-date">{exp.date}</div>
                <h3 className="experience-role">{exp.role}</h3>
                <div className="experience-company">
                  {exp.company}
                  <span className="experience-location">📍 {exp.location}</span>
                </div>
                <div className="experience-points">
                  {exp.points.map((point, j) => (
                    <div key={j} className="experience-point">{point}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          ref={eduRef}
          className={`education-card reveal ${eduRevealed ? 'revealed' : ''}`}
          data-cursor-hover
        >
          <div className="education-icon">🎓</div>
          <div className="education-details">
            <h3 className="education-degree">B.Tech in Artificial Intelligence</h3>
            <div className="education-school">Newton School of Technology, Rishihood University</div>
            <div className="education-meta">
              <span>📅 2023 — 2027</span>
              <span className="grade">📊 CGPA: 7.0/10.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
