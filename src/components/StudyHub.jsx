import { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLocalStorage } from '../hooks/useLocalStorage';
import DSA_TOPICS from '../data/dsaTopics';
import SQL_TOPICS from '../data/sqlTopics';
import INTERVIEW_TOPICS from '../data/interviewTopics';
import './StudyHub.css';

const TABS = [
  { id: 'dsa', label: '🧮 DSA Tracker' },
  { id: 'sql', label: '🗃️ SQL Notes' },
  { id: 'interview', label: '🎯 Interview Prep' },
  { id: 'notes', label: '📝 Quick Notes' },
];

// Cycle: not-started → in-progress → done → not-started
function cycleStatus(status) {
  if (status === 'not-started') return 'in-progress';
  if (status === 'in-progress') return 'done';
  return 'not-started';
}

function renderMarkdown(text) {
  // Minimal markdown renderer for SQL notes
  let html = text
    .replace(/```sql\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n/g, '<br/>');
  return html;
}

/* ================================
   DSA TAB
   ================================ */
function DSATab({ progress, setProgress }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleProblem = (problemId) => {
    setProgress(prev => ({
      ...prev,
      [problemId]: cycleStatus(prev[problemId] || 'not-started'),
    }));
  };

  const getTopicProgress = (topic) => {
    const total = topic.problems.length;
    const done = topic.problems.filter(p => progress[p.id] === 'done').length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const getProgressClass = (percent) => {
    if (percent === 100) return 'full';
    if (percent >= 60) return 'high';
    if (percent >= 30) return 'mid';
    return 'low';
  };

  return (
    <div className="study-topics">
      {DSA_TOPICS.map(topic => {
        const prog = getTopicProgress(topic);
        const isExpanded = expandedTopic === topic.id;

        return (
          <div key={topic.id} className={`topic-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="topic-header" onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}>
              <span className="topic-icon">{topic.icon}</span>
              <div className="topic-info">
                <div className="topic-title">{topic.title}</div>
                <div className="topic-meta">
                  <span className="topic-count">{prog.done}/{prog.total} solved</span>
                  <div className="topic-progress-bar">
                    <div
                      className={`topic-progress-fill ${getProgressClass(prog.percent)}`}
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="topic-toggle">▼</span>
            </div>
            <div className="topic-body">
              <div className="topic-problems">
                {topic.problems.map(problem => {
                  const status = progress[problem.id] || 'not-started';
                  return (
                    <div key={problem.id} className={`problem-item ${status}`}>
                      <button
                        className={`problem-checkbox ${status}`}
                        onClick={() => toggleProblem(problem.id)}
                        title={`Status: ${status}`}
                      >
                        {status === 'done' ? '✓' : status === 'in-progress' ? '◐' : ''}
                      </button>
                      <span className="problem-name">{problem.title}</span>
                      <span className={`problem-difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
                      {problem.link && (
                        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="problem-link">
                          LeetCode →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================
   SQL TAB
   ================================ */
function SQLTab({ progress, setProgress }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleProblem = (problemId) => {
    setProgress(prev => ({
      ...prev,
      [problemId]: cycleStatus(prev[problemId] || 'not-started'),
    }));
  };

  const getTopicProgress = (topic) => {
    const total = topic.problems.length;
    const done = topic.problems.filter(p => progress[p.id] === 'done').length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const getProgressClass = (percent) => {
    if (percent === 100) return 'full';
    if (percent >= 60) return 'high';
    if (percent >= 30) return 'mid';
    return 'low';
  };

  return (
    <div className="study-topics">
      {SQL_TOPICS.map(topic => {
        const prog = getTopicProgress(topic);
        const isExpanded = expandedTopic === topic.id;

        return (
          <div key={topic.id} className={`topic-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="topic-header" onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}>
              <span className="topic-icon">{topic.icon}</span>
              <div className="topic-info">
                <div className="topic-title">{topic.title}</div>
                <div className="topic-meta">
                  <span className="topic-count">{prog.done}/{prog.total} done</span>
                  <div className="topic-progress-bar">
                    <div
                      className={`topic-progress-fill ${getProgressClass(prog.percent)}`}
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="topic-toggle">▼</span>
            </div>
            <div className="topic-body">
              {/* Notes */}
              {topic.notes && (
                <div className="sql-notes-content">
                  <div
                    className="sql-note-block"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(topic.notes) }}
                  />
                </div>
              )}
              {/* Problems */}
              <div className="topic-problems">
                {topic.problems.map(problem => {
                  const status = progress[problem.id] || 'not-started';
                  return (
                    <div key={problem.id} className={`problem-item ${status}`}>
                      <button
                        className={`problem-checkbox ${status}`}
                        onClick={() => toggleProblem(problem.id)}
                        title={`Status: ${status}`}
                      >
                        {status === 'done' ? '✓' : status === 'in-progress' ? '◐' : ''}
                      </button>
                      <span className="problem-name">{problem.title}</span>
                      <span className={`problem-difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================
   INTERVIEW TAB
   ================================ */
function InterviewTab({ confidence, setConfidence }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const setItemConfidence = (itemId, level) => {
    setConfidence(prev => ({ ...prev, [itemId]: level }));
  };

  const getTopicConfidence = (topic) => {
    const total = topic.items.length * 5;
    const current = topic.items.reduce((sum, item) => sum + (confidence[item.id] || 0), 0);
    return total > 0 ? Math.round((current / total) * 100) : 0;
  };

  const getProgressClass = (percent) => {
    if (percent === 100) return 'full';
    if (percent >= 60) return 'high';
    if (percent >= 30) return 'mid';
    return 'low';
  };

  return (
    <div className="study-topics">
      {INTERVIEW_TOPICS.map(topic => {
        const confPercent = getTopicConfidence(topic);
        const isExpanded = expandedTopic === topic.id;

        return (
          <div key={topic.id} className={`topic-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="topic-header" onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}>
              <span className="topic-icon">{topic.icon}</span>
              <div className="topic-info">
                <div className="topic-title">{topic.title}</div>
                <div className="topic-meta">
                  <span className="topic-count">{confPercent}% confident</span>
                  <div className="topic-progress-bar">
                    <div
                      className={`topic-progress-fill ${getProgressClass(confPercent)}`}
                      style={{ width: `${confPercent}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="topic-toggle">▼</span>
            </div>
            <div className="topic-body">
              <div className="topic-problems">
                {topic.items.map(item => (
                  <div key={item.id} className="interview-item">
                    <span className="interview-text">{item.text}</span>
                    <div className="confidence-dots">
                      {[1, 2, 3, 4, 5].map(level => (
                        <button
                          key={level}
                          className={`confidence-dot ${(confidence[item.id] || 0) >= level ? 'filled' : ''}`}
                          onClick={() => setItemConfidence(item.id, level === confidence[item.id] ? 0 : level)}
                          title={`Confidence: ${level}/5`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================
   QUICK NOTES TAB
   ================================ */
function NotesTab({ notes, setNotes }) {
  return (
    <div className="quick-notes-wrapper">
      <textarea
        className="quick-notes-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={`📝 Write your study notes here...\n\nYou can use this space for:\n- Quick revision notes\n- Important formulas & patterns\n- Interview talking points\n- Code snippets\n\nEverything is saved automatically!`}
        spellCheck={false}
      />
      <div className="quick-notes-hint">Auto-saved to your browser • {notes.length} characters</div>
    </div>
  );
}

/* ================================
   MAIN STUDY HUB COMPONENT
   ================================ */
export default function StudyHub() {
  const [activeTab, setActiveTab] = useState('dsa');
  const [headerRef, headerRevealed] = useScrollReveal();

  // Persisted state
  const [dsaProgress, setDsaProgress] = useLocalStorage('pk-dsa-progress', {});
  const [sqlProgress, setSqlProgress] = useLocalStorage('pk-sql-progress', {});
  const [interviewConfidence, setInterviewConfidence] = useLocalStorage('pk-interview-confidence', {});
  const [quickNotes, setQuickNotes] = useLocalStorage('pk-quick-notes', '');

  // Calculate overall stats
  const overallStats = useMemo(() => {
    const allDsaProblems = DSA_TOPICS.flatMap(t => t.problems);
    const dsaDone = allDsaProblems.filter(p => dsaProgress[p.id] === 'done').length;
    const dsaInProgress = allDsaProblems.filter(p => dsaProgress[p.id] === 'in-progress').length;

    const allSqlProblems = SQL_TOPICS.flatMap(t => t.problems);
    const sqlDone = allSqlProblems.filter(p => sqlProgress[p.id] === 'done').length;

    const allInterviewItems = INTERVIEW_TOPICS.flatMap(t => t.items);
    const interviewTotal = allInterviewItems.length * 5;
    const interviewCurrent = allInterviewItems.reduce((sum, item) => sum + (interviewConfidence[item.id] || 0), 0);

    const totalProblems = allDsaProblems.length + allSqlProblems.length;
    const totalDone = dsaDone + sqlDone;

    return {
      dsaTotal: allDsaProblems.length,
      dsaDone,
      dsaInProgress,
      sqlTotal: allSqlProblems.length,
      sqlDone,
      interviewPercent: interviewTotal > 0 ? Math.round((interviewCurrent / interviewTotal) * 100) : 0,
      overallPercent: totalProblems > 0 ? Math.round((totalDone / totalProblems) * 100) : 0,
    };
  }, [dsaProgress, sqlProgress, interviewConfidence]);

  return (
    <section className="study-hub section" id="study-hub">
      <div className="container">
        <div
          ref={headerRef}
          className={`study-hub-header reveal ${headerRevealed ? 'revealed' : ''}`}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>Study Hub</span>
          <h2 className="study-hub-heading">
            Learning <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="study-hub-subheading">
            Track your DSA progress, master SQL, and prepare for interviews — all in one place
          </p>
        </div>

        {/* Overall Progress */}
        <div className="study-overall-progress">
          <div className="overall-progress-stats">
            <div className="overall-stat">
              <div className="overall-stat-number">{overallStats.dsaDone}/{overallStats.dsaTotal}</div>
              <div className="overall-stat-label">DSA Solved</div>
            </div>
            <div className="overall-stat">
              <div className="overall-stat-number">{overallStats.sqlDone}/{overallStats.sqlTotal}</div>
              <div className="overall-stat-label">SQL Done</div>
            </div>
            <div className="overall-stat">
              <div className="overall-stat-number">{overallStats.interviewPercent}%</div>
              <div className="overall-stat-label">Interview Ready</div>
            </div>
          </div>
          <div className="overall-progress-bar-wrapper">
            <div
              className="overall-progress-bar"
              style={{ width: `${overallStats.overallPercent}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="study-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`study-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              data-cursor-hover
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dsa' && <DSATab progress={dsaProgress} setProgress={setDsaProgress} />}
        {activeTab === 'sql' && <SQLTab progress={sqlProgress} setProgress={setSqlProgress} />}
        {activeTab === 'interview' && <InterviewTab confidence={interviewConfidence} setConfidence={setInterviewConfidence} />}
        {activeTab === 'notes' && <NotesTab notes={quickNotes} setNotes={setQuickNotes} />}
      </div>
    </section>
  );
}
