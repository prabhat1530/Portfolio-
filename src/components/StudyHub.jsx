import { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLocalStorage } from '../hooks/useLocalStorage';
import DSA_TOPICS from '../data/dsaTopics';
import SQL_TOPICS from '../data/sqlTopics';
import AI_TOPICS from '../data/aiTopics';
import INTERVIEW_TOPICS from '../data/interviewTopics';
import './StudyHub.css';

const TABS = [
  { id: 'dsa', label: '🧮 DSA Tracker' },
  { id: 'sql', label: '🗃️ SQL Notes' },
  { id: 'ai', label: '🤖 AI/ML' },
  { id: 'interview', label: '🎯 Interview Prep' },
  { id: 'assistant', label: '✨ AI Assistant' },
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
function DSATab({ progress, setProgress, askAI }) {
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
                      <button
                        className="problem-ai-btn"
                        onClick={() => askAI(`Explain the LeetCode problem "${problem.title}" under "${topic.title}". Provide an optimal solution in Python and JavaScript with time/space complexity analysis.`)}
                        title="Ask AI Assistant"
                      >
                        🤖 Ask AI
                      </button>
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
function SQLTab({ progress, setProgress, askAI }) {
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
                      <button
                        className="problem-ai-btn"
                        onClick={() => askAI(`Explain the SQL practice task "${problem.title}" under "${topic.title}". Write an optimized SQL query with explanation.`)}
                        title="Ask AI Assistant"
                      >
                        🤖 Ask AI
                      </button>
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
   AI/ML TAB
   ================================ */
function AITab({ progress, setProgress, askAI }) {
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
      {AI_TOPICS.map(topic => {
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
                      <button
                        className="problem-ai-btn"
                        onClick={() => askAI(`Explain the Machine Learning concept/task "${problem.title}" under "${topic.title}". Detail standard architectures, formulas, and how to implement it.`)}
                        title="Ask AI Assistant"
                      >
                        🤖 Ask AI
                      </button>
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
   AI STUDY ASSISTANT TAB
   ================================ */
function AIStudyAssistantTab({ presetQuery, setPresetQuery }) {
  const [apiKey, setApiKey] = useLocalStorage('pk-gemini-api-key', '');
  const [messages, setMessages] = useLocalStorage('pk-ai-chat-history', [
    {
      role: 'model',
      content: 'Hello! I am your AI Study Assistant. Ask me anything about Data Structures & Algorithms, SQL databases, or Artificial Intelligence, and I will explain it with code examples!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!apiKey) {
      alert('Please enter a Gemini API Key in the box above to use the Study Assistant.');
      return;
    }

    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(false); // don't block yet
    setLoading(true);

    try {
      const contents = updatedMessages.slice(-8).map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      contents.unshift({
        role: 'user',
        parts: [{
          text: "System Instruction: You are an AI Study Assistant for Prabhat Kumar. Your goal is to explain Data Structures & Algorithms (DSA), SQL databases, Python, and Machine Learning concepts. Be highly educational, clear, concise, and provide clean, readable code snippets (using markdown) when explaining code solutions."
        }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please check your API key or network connection.";
      
      setMessages([...updatedMessages, { role: 'model', content: reply }]);
    } catch (e) {
      setMessages([...updatedMessages, { role: 'model', content: 'Error: Failed to connect to Gemini API. Please check your network and API key.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger preset query if it arrives from other tabs
  const handlePresetTrigger = () => {
    if (presetQuery) {
      sendMessage(presetQuery);
      setPresetQuery('');
    }
  };

  useMemo(() => {
    handlePresetTrigger();
  }, [presetQuery]);

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      setMessages([
        {
          role: 'model',
          content: 'Hello! I am your AI Study Assistant. Ask me anything about Data Structures & Algorithms, SQL databases, or Artificial Intelligence, and I will explain it with code examples!'
        }
      ]);
    }
  };

  const PRESETS = [
    "Explain Binary Search patterns",
    "Show SQL query for second highest salary",
    "Explain standard Normalization forms (1NF, 2NF, 3NF)",
    "Explain Gradient Descent in Neural Networks",
  ];

  return (
    <div className="study-ai-container">
      {/* Key Input */}
      <div className="ai-key-banner">
        <label htmlFor="gemini-key">🔑 Gemini API Key:</label>
        <input
          id="gemini-key"
          type="password"
          placeholder="Paste Gemini API Key here..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="key-help-link">
          Get Free Key →
        </a>
      </div>

      {/* Chat Area */}
      <div className="ai-chat-window">
        <div className="ai-chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`ai-message-wrapper ${m.role}`}>
              <div className="ai-message-avatar">{m.role === 'model' ? '🤖' : '👤'}</div>
              <div className="ai-message-bubble">
                <div
                  className="ai-message-text"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className="ai-message-wrapper model loading">
              <div className="ai-message-avatar">🤖</div>
              <div className="ai-message-bubble">
                <div className="ai-loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preset Questions */}
        {messages.length <= 1 && (
          <div className="ai-presets">
            {PRESETS.map((p, i) => (
              <button key={i} className="ai-preset-btn" onClick={() => sendMessage(p)}>
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input Controls */}
        <form className="ai-chat-input-form" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
          <input
            type="text"
            className="ai-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={apiKey ? "Ask a doubt or explain a topic..." : "Please configure your API Key above first"}
            disabled={loading || !apiKey}
          />
          <button type="submit" className="ai-chat-send-btn" disabled={loading || !input.trim() || !apiKey}>
            Send
          </button>
          <button type="button" className="ai-chat-clear-btn" onClick={clearChat} title="Clear Chat">
            🗑️
          </button>
        </form>
      </div>
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
  const [aiPresetQuery, setAiPresetQuery] = useState('');

  // Persisted state
  const [dsaProgress, setDsaProgress] = useLocalStorage('pk-dsa-progress', {});
  const [sqlProgress, setSqlProgress] = useLocalStorage('pk-sql-progress', {});
  const [aiProgress, setAiProgress] = useLocalStorage('pk-ai-progress', {});
  const [interviewConfidence, setInterviewConfidence] = useLocalStorage('pk-interview-confidence', {});
  const [quickNotes, setQuickNotes] = useLocalStorage('pk-quick-notes', '');

  const askAI = (query) => {
    setAiPresetQuery(query);
    setActiveTab('assistant');
  };

  // Calculate overall stats
  const overallStats = useMemo(() => {
    const allDsaProblems = DSA_TOPICS.flatMap(t => t.problems);
    const dsaDone = allDsaProblems.filter(p => dsaProgress[p.id] === 'done').length;
    const dsaInProgress = allDsaProblems.filter(p => dsaProgress[p.id] === 'in-progress').length;

    const allSqlProblems = SQL_TOPICS.flatMap(t => t.problems);
    const sqlDone = allSqlProblems.filter(p => sqlProgress[p.id] === 'done').length;

    const allAiProblems = AI_TOPICS.flatMap(t => t.problems);
    const aiDone = allAiProblems.filter(p => aiProgress[p.id] === 'done').length;

    const allInterviewItems = INTERVIEW_TOPICS.flatMap(t => t.items);
    const interviewTotal = allInterviewItems.length * 5;
    const interviewCurrent = allInterviewItems.reduce((sum, item) => sum + (interviewConfidence[item.id] || 0), 0);

    const totalProblems = allDsaProblems.length + allSqlProblems.length + allAiProblems.length;
    const totalDone = dsaDone + sqlDone + aiDone;

    return {
      dsaTotal: allDsaProblems.length,
      dsaDone,
      dsaInProgress,
      sqlTotal: allSqlProblems.length,
      sqlDone,
      aiTotal: allAiProblems.length,
      aiDone,
      interviewPercent: interviewTotal > 0 ? Math.round((interviewCurrent / interviewTotal) * 100) : 0,
      overallPercent: totalProblems > 0 ? Math.round((totalDone / totalProblems) * 100) : 0,
    };
  }, [dsaProgress, sqlProgress, aiProgress, interviewConfidence]);

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
              <div className="overall-stat-number">{overallStats.aiDone}/{overallStats.aiTotal}</div>
              <div className="overall-stat-label">AI/ML Done</div>
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
        {activeTab === 'dsa' && <DSATab progress={dsaProgress} setProgress={setDsaProgress} askAI={askAI} />}
        {activeTab === 'sql' && <SQLTab progress={sqlProgress} setProgress={setSqlProgress} askAI={askAI} />}
        {activeTab === 'ai' && <AITab progress={aiProgress} setProgress={setAiProgress} askAI={askAI} />}
        {activeTab === 'interview' && <InterviewTab confidence={interviewConfidence} setConfidence={setInterviewConfidence} />}
        {activeTab === 'assistant' && <AIStudyAssistantTab presetQuery={aiPresetQuery} setPresetQuery={setAiPresetQuery} />}
        {activeTab === 'notes' && <NotesTab notes={quickNotes} setNotes={setQuickNotes} />}
      </div>
    </section>
  );
}
