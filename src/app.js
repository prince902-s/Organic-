/**
 * JEE MAIN ORGANIC CHEMISTRY - APPLICATION CONTROLLER & UI ENGINE
 * Pure Vanilla JavaScript, Mobile-first, Offline-first, Zero Frameworks.
 */

window.app = (function() {
  const DATA = window.CHEM_DATA;

  // State Structure
  const STORAGE_KEY = "organicChemistryProgress_v2";

  let state = {
    completedTopics: {},
    completedChapters: {},
    questionAttempts: {},
    testScores: {},
    bookmarks: {
      topics: [],
      questions: [],
      reactions: [],
      reagents: []
    },
    currentTopic: {
      chapterId: "ch8-goc",
      topicId: "electronic-effects"
    },
    streak: {
      count: 1,
      lastDate: new Date().toISOString().split("T")[0]
    },
    todayStats: {
      date: new Date().toISOString().split("T")[0],
      topicsCompleted: 0,
      questionsAnswered: 0,
      correctCount: 0,
      studyMinutes: 12
    },
    theme: "light",
    fontSize: 15,
    studyMode: false
  };

  // Active Test Session State
  let activeTest = null;
  let testTimerInterval = null;

  // Initialize from LocalStorage
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
      }
    } catch (e) {
      console.warn("Could not load local storage", e);
    }

    // Update streak for today
    const today = new Date().toISOString().split("T")[0];
    if (state.todayStats.date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (state.streak.lastDate === yesterday) {
        state.streak.count += 1;
      } else if (state.streak.lastDate !== today) {
        state.streak.count = 1;
      }
      state.streak.lastDate = today;
      state.todayStats = {
        date: today,
        topicsCompleted: 0,
        questionsAnswered: 0,
        correctCount: 0,
        studyMinutes: 0
      };
      saveState();
    }

    // Apply saved theme
    if (state.theme === "dark" || (!state.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.setAttribute("data-theme", "dark");
      state.theme = "dark";
      const btn = document.getElementById("theme-toggle-btn");
      if (btn) btn.innerText = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      state.theme = "light";
      const btn = document.getElementById("theme-toggle-btn");
      if (btn) btn.innerText = "🌙";
    }

    // Update topbar badges
    updateBadges();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateBadges();
    } catch (e) {
      console.error("Storage save failed", e);
    }
  }

  function updateBadges() {
    const streakEl = document.getElementById("streak-counter");
    if (streakEl) streakEl.innerText = state.streak.count;

    const mistakesCount = getIncorrectQuestions().length;
    const mb = document.getElementById("sidebar-mistakes-count");
    if (mb) mb.innerText = mistakesCount;

    const totalBookmarks = (state.bookmarks.topics?.length || 0) +
                           (state.bookmarks.questions?.length || 0) +
                           (state.bookmarks.reactions?.length || 0);
    const bb = document.getElementById("sidebar-bookmarks-count");
    if (bb) bb.innerText = totalBookmarks;
  }

  // Navigation Controller
  let currentView = "dashboard";

  function navigate(viewName, params = {}) {
    currentView = viewName;
    window.scrollTo(0, 0);

    // Update sidebar / bottom nav active states
    document.querySelectorAll(".nav-item, .bottom-nav-btn").forEach(el => el.classList.remove("active"));
    const dBtn = document.getElementById("nav-d-" + viewName);
    if (dBtn) dBtn.classList.add("active");
    const bBtn = document.getElementById("bnav-" + viewName);
    if (bBtn) bBtn.classList.add("active");

    const viewport = document.getElementById("app-viewport");
    if (!viewport) return;

    if (viewName === "dashboard") {
      renderDashboard(viewport);
    } else if (viewName === "learning-path") {
      renderLearningPath(viewport);
    } else if (viewName === "curriculum") {
      renderCurriculum(viewport);
    } else if (viewName === "topic") {
      renderTopic(viewport, params.chapterId, params.topicId);
    } else if (viewName === "chapter-tests-list") {
      renderChapterTestsList(viewport);
    } else if (viewName === "chapter-test") {
      startChapterTest(viewport, params.chapterId);
    } else if (viewName === "pyqs") {
      renderPYQs(viewport, params);
    } else if (viewName === "checklist") {
      renderChecklist(viewport);
    } else if (viewName === "reactions") {
      renderReactions(viewport);
    } else if (viewName === "reagents") {
      renderReagents(viewport);
    } else if (viewName === "quick-revision") {
      renderQuickRevision(viewport);
    } else if (viewName === "revision") {
      renderRevision(viewport);
    } else if (viewName === "bookmarks") {
      renderBookmarks(viewport);
    } else if (viewName === "settings") {
      renderSettings(viewport);
    }
  }

  // Calculation Utilities
  function getOverallProgress() {
    let totalTopics = 0;
    DATA.CURRICULUM.forEach(ch => {
      totalTopics += (ch.topics ? ch.topics.length : 0);
    });
    const completedCount = Object.keys(state.completedTopics).length;
    return totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100);
  }

  function getChapterProgress(chapterId) {
    const ch = DATA.CURRICULUM.find(c => c.id === chapterId);
    if (!ch || !ch.topics || ch.topics.length === 0) return 0;
    let completed = 0;
    ch.topics.forEach(t => {
      if (state.completedTopics[t.id]) completed++;
    });
    return Math.round((completed / ch.topics.length) * 100);
  }

  function getWeakTopics() {
    const topicStats = {};
    Object.keys(state.questionAttempts).forEach(qId => {
      const att = state.questionAttempts[qId];
      if (!att.topicId) return;
      if (!topicStats[att.topicId]) {
        topicStats[att.topicId] = { total: 0, correct: 0, chapterId: att.chapterId };
      }
      topicStats[att.topicId].total += 1;
      if (att.isCorrect) topicStats[att.topicId].correct += 1;
    });

    const weak = [];
    Object.keys(topicStats).forEach(tId => {
      const s = topicStats[tId];
      if (s.total >= 1) {
        const acc = Math.round((s.correct / s.total) * 100);
        if (acc < 65) {
          // Find topic title
          let tTitle = tId;
          const ch = DATA.CURRICULUM.find(c => c.id === s.chapterId);
          if (ch) {
            const top = ch.topics.find(t => t.id === tId);
            if (top) tTitle = top.title;
          }
          weak.push({
            topicId: tId,
            chapterId: s.chapterId,
            title: tTitle,
            accuracy: acc,
            attempts: s.total
          });
        }
      }
    });

    // Sort by lowest accuracy
    weak.sort((a, b) => a.accuracy - b.accuracy);
    return weak;
  }

  function getIncorrectQuestions() {
    const incorrect = [];
    Object.keys(state.questionAttempts).forEach(qId => {
      const att = state.questionAttempts[qId];
      if (!att.isCorrect) {
        incorrect.push({
          id: qId,
          chapterId: att.chapterId,
          topicId: att.topicId,
          chosen: att.chosen
        });
      }
    });
    return incorrect;
  }

  // View: DASHBOARD
  function renderDashboard(container) {
    const overallPct = getOverallProgress();
    const weakList = getWeakTopics();

    // Find current active topic & chapter details
    const currCh = DATA.CURRICULUM.find(c => c.id === state.currentTopic.chapterId) || DATA.CURRICULUM[3];
    const currTop = currCh.topics.find(t => t.id === state.currentTopic.topicId) || currCh.topics[0];
    const currChProgress = getChapterProgress(currCh.id);

    const accuracyPct = state.todayStats.questionsAnswered > 0
      ? Math.round((state.todayStats.correctCount / state.todayStats.questionsAnswered) * 100)
      : 0;

    let weakHtml = "";
    if (weakList.length === 0) {
      weakHtml = `
        <div style="padding:14px;background:var(--success-subtle);border:1px solid rgba(34,197,94,0.2);border-radius:var(--radius-sm);font-size:13.5px;color:var(--success);">
          🎯 <strong>Outstanding!</strong> You have no critical weak areas (<65% accuracy). Keep solving practice questions and chapter tests to maintain sharpness!
        </div>
      `;
    } else {
      weakHtml = weakList.slice(0, 3).map(w => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--border-subtle);border-radius:var(--radius-sm);margin-bottom:8px;background:var(--bg-card);">
          <div>
            <div style="font-weight:700;font-size:13.5px;">${w.title}</div>
            <div style="font-size:11.5px;color:var(--text-muted);">${w.attempts} attempts recorded</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="badge badge-vhigh">${w.accuracy}% Acc</span>
            <button class="btn-secondary" style="padding:4px 10px;font-size:12px;" onclick="app.navigate('topic', {chapterId:'${w.chapterId}', topicId:'${w.topicId}'})">Practice</button>
          </div>
        </div>
      `).join("");
    }

    container.innerHTML = `
      <div class="dashboard-hero">
        <span class="badge badge-med mb-2">Class 10 Foundation → Class 12 → JEE Main</span>
        <h2 class="hero-title">JEE Main Organic Chemistry</h2>
        <p class="hero-subtitle">Your complete zero-to-exam-ready platform: intuitive foundational concepts, step-by-step mechanisms, progressive practice, and authentic PYQs.</p>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;">
          <span style="font-weight:700;font-size:14px;">Total Course Completion</span>
          <span style="font-weight:800;color:var(--primary);font-size:16px;">${overallPct}%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width:${overallPct}%;"></div>
        </div>
      </div>

      <!-- Continue Learning Card -->
      <div class="continue-card">
        <div>
          <span style="font-size:11px;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:0.05em;">Current Chapter In Progress</span>
          <h3 style="font-size:18px;font-weight:800;margin:4px 0;">${currCh.title}</h3>
          <p style="font-size:13.5px;color:var(--text-secondary);margin-bottom:8px;">Topic: <strong>${currTop.title}</strong> (${currChProgress}% chapter done)</p>
          <div class="progress-bar-container" style="max-width:280px;">
            <div class="progress-bar-fill" style="width:${currChProgress}%;"></div>
          </div>
        </div>
        <div>
          <button class="btn-primary" onclick="app.navigate('topic', {chapterId:'${currCh.id}', topicId:'${currTop.id}'})">
            ▶ Continue Topic
          </button>
        </div>
      </div>

      <!-- Today's Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${state.todayStats.topicsCompleted}</div>
          <div class="stat-label">Topics Today</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${state.todayStats.questionsAnswered}</div>
          <div class="stat-label">Questions Solved</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${accuracyPct}%</div>
          <div class="stat-label">Today's Accuracy</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">🔥 ${state.streak.count}</div>
          <div class="stat-label">Day Streak</div>
        </div>
      </div>

      <!-- Weak Areas Panel -->
      <div class="card">
        <div class="flex-between mb-3">
          <div>
            <h3 style="font-size:16px;font-weight:800;">Targeted Weak Areas</h3>
            <p style="font-size:12.5px;color:var(--text-muted);">Concepts where your accuracy is below 65%</p>
          </div>
          <button class="btn-secondary" style="font-size:12px;padding:6px 12px;" onclick="app.navigate('revision')">
            Review Mistakes
          </button>
        </div>
        ${weakHtml}
      </div>

      <!-- Rapid Access Hub -->
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px;">
        <button class="btn-secondary" style="padding:14px;justify-content:flex-start;text-align:left;" onclick="app.navigate('learning-path')">
          <span style="font-size:20px;">🗺️</span>
          <div>
            <div style="font-weight:700;font-size:13.5px;">Learning Path</div>
            <div style="font-size:11px;color:var(--text-muted);">Prerequisite Flow</div>
          </div>
        </button>
        <button class="btn-secondary" style="padding:14px;justify-content:flex-start;text-align:left;" onclick="app.navigate('curriculum')">
          <span style="font-size:20px;">📚</span>
          <div>
            <div style="font-weight:700;font-size:13.5px;">All Chapters</div>
            <div style="font-size:11px;color:var(--text-muted);">Stages 0 to 9</div>
          </div>
        </button>
        <button class="btn-secondary" style="padding:14px;justify-content:flex-start;text-align:left;" onclick="app.navigate('chapter-tests-list')">
          <span style="font-size:20px;">📝</span>
          <div>
            <div style="font-weight:700;font-size:13.5px;">Chapter Tests</div>
            <div style="font-size:11px;color:var(--text-muted);">Exam Simulator</div>
          </div>
        </button>
        <button class="btn-secondary" style="padding:14px;justify-content:flex-start;text-align:left;" onclick="app.navigate('pyqs')">
          <span style="font-size:20px;">🎯</span>
          <div>
            <div style="font-weight:700;font-size:13.5px;">JEE Main PYQs</div>
            <div style="font-size:11px;color:var(--text-muted);">2020-2024 Bank</div>
          </div>
        </button>
        <button class="btn-secondary" style="padding:14px;justify-content:flex-start;text-align:left;" onclick="app.navigate('reactions')">
          <span style="font-size:20px;">🧪</span>
          <div>
            <div style="font-weight:700;font-size:13.5px;">Reaction Library</div>
            <div style="font-size:11px;color:var(--text-muted);">Named Reactions</div>
          </div>
        </button>
        <button class="btn-secondary" style="padding:14px;justify-content:flex-start;text-align:left;" onclick="app.navigate('quick-revision')">
          <span style="font-size:20px;">⚡</span>
          <div>
            <div style="font-weight:700;font-size:13.5px;">Cheat Sheets</div>
            <div style="font-size:11px;color:var(--text-muted);">Acidity, Basicity, Traps</div>
          </div>
        </button>
      </div>
    `;
  }

  // View: LEARNING PATH (Flowchart & Stage Prerequisite Roadmap)
  function renderLearningPath(container) {
    const stagesHtml = DATA.STAGES.map((st, idx) => {
      const chaps = DATA.CURRICULUM.filter(c => c.stage === st.id);
      let totalT = 0, compT = 0;
      chaps.forEach(c => {
        if (c.topics) {
          totalT += c.topics.length;
          c.topics.forEach(t => {
            if (state.completedTopics[t.id]) compT++;
          });
        }
      });
      const pct = totalT === 0 ? 0 : Math.round((compT / totalT) * 100);

      return `
        <div class="card" style="position:relative;margin-bottom:20px;">
          <div class="flex-between">
            <div>
              <span class="badge badge-med">Stage ${st.id}</span>
              <h3 style="font-size:17px;font-weight:800;margin-top:4px;">${st.title}</h3>
              <p style="font-size:12.5px;color:var(--text-muted);">${st.subtitle} • Est. ${st.estimatedHours}</p>
            </div>
            <div style="text-align:right;">
              <span style="font-size:18px;font-weight:800;color:var(--primary);">${pct}%</span>
            </div>
          </div>

          <p style="font-size:13.5px;color:var(--text-secondary);margin:10px 0;">${st.description}</p>

          <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">
            🔒 <strong>Prerequisites:</strong> ${st.prerequisites}
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${pct}%;"></div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">
            ${chaps.map(c => `
              <button class="btn-secondary" style="font-size:12px;padding:6px 12px;" onclick="app.navigate('topic', {chapterId:'${c.id}', topicId:'${c.topics[0].id}'})">
                ${c.title} (${getChapterProgress(c.id)}%)
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Recommended Study Order</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Organic chemistry is strictly sequential. Follow this connected progression from Class 10 fundamentals to high-scoring JEE Main chapters without skipping prerequisites.
        </p>
      </div>

      <div>
        ${stagesHtml}
      </div>
    `;
  }

  // View: CURRICULUM (Chapters & Topics List)
  function renderCurriculum(container) {
    const chaptersHtml = DATA.CURRICULUM.map(ch => {
      const prog = getChapterProgress(ch.id);
      const prioClass = ch.priority === "very-high" ? "badge-vhigh" : (ch.priority === "high" ? "badge-high" : "badge-med");

      const topicsListHtml = (ch.topics || []).map(t => {
        const isDone = !!state.completedTopics[t.id];
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border-subtle);background:var(--bg-card);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:16px;">${isDone ? "✅" : "⚪"}</span>
              <div>
                <a style="font-weight:700;font-size:13.5px;color:var(--text-primary);cursor:pointer;text-decoration:none;" onclick="app.navigate('topic', {chapterId:'${ch.id}', topicId:'${t.id}'})">
                  ${t.title}
                </a>
                <div style="font-size:11.5px;color:var(--text-muted);">${t.estMinutes} min • ${t.difficulty}</div>
              </div>
            </div>
            <div>
              <button class="btn-secondary" style="padding:4px 10px;font-size:12px;" onclick="app.navigate('topic', {chapterId:'${ch.id}', topicId:'${t.id}'})">
                ${isDone ? "Revise" : "Start"}
              </button>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="card" style="margin-bottom:18px;padding:0;overflow:hidden;">
          <div style="padding:16px;background:var(--bg-card-subtle);border-bottom:1px solid var(--border-subtle);">
            <div class="flex-between">
              <div>
                <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;">
                  <span class="badge ${prioClass}">${ch.priority.toUpperCase()} PRIORITY</span>
                  <span style="font-size:11.5px;color:var(--text-muted);font-weight:600;">${ch.ncert}</span>
                </div>
                <h3 style="font-size:17px;font-weight:800;">Ch ${ch.chapterNum}: ${ch.title}</h3>
                <p style="font-size:12px;color:var(--text-muted);">JEE Main Relevance: ${ch.jeeRelevance} • Est. ${ch.estTime}</p>
              </div>
              <div style="text-align:right;">
                <span style="font-size:16px;font-weight:800;color:var(--primary);">${prog}%</span>
              </div>
            </div>
            <div class="progress-bar-container" style="margin-top:10px;">
              <div class="progress-bar-fill" style="width:${prog}%;"></div>
            </div>
          </div>

          <div>
            ${topicsListHtml}
          </div>

          <div style="padding:12px 16px;display:flex;justify-content:space-between;background:var(--bg-card);">
            <button class="btn-secondary" style="font-size:12px;padding:6px 12px;" onclick="app.navigate('chapter-test', {chapterId:'${ch.id}'})">
              ✍️ Take Chapter Test
            </button>
            <button class="btn-secondary" style="font-size:12px;padding:6px 12px;" onclick="app.navigate('pyqs', {chapterId:'${ch.id}'})">
              🎯 Solve Chapter PYQs
            </button>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Complete Syllabus Curriculum</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Structured into 10 progressive stages from Class 10 basics to Class 12 Advanced JEE Main chapters.
        </p>
      </div>

      <div>
        ${chaptersHtml}
      </div>
    `;
  }

  // View: TOPIC LEARNING INTERFACE
  function renderTopic(container, chapterId, topicId) {
    const ch = DATA.CURRICULUM.find(c => c.id === chapterId) || DATA.CURRICULUM[0];
    const top = ch.topics.find(t => t.id === topicId) || ch.topics[0];

    // Save as current topic
    state.currentTopic = { chapterId: ch.id, topicId: top.id };
    saveState();

    const isTopicCompleted = !!state.completedTopics[top.id];
    const prioBadge = top.priority === "very-high" ? "badge-vhigh" : (top.priority === "high" ? "badge-high" : "badge-med");

    // Prerequisites chips
    const prereqsHtml = (top.prereqList || []).map(p => `
      <span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-pill);font-size:12px;font-weight:600;">
        ✓ ${p}
      </span>
    `).join("");

    // Rules
    const rulesHtml = (top.rules || []).map(r => `
      <li style="margin-bottom:6px;line-height:1.5;">${r}</li>
    `).join("");

    // Worked Examples
    const examplesHtml = (top.examples || []).map((ex, idx) => `
      <div class="example-card">
        <div class="example-header">
          <span>WORKED EXAMPLE ${idx + 1}</span>
          <span class="badge badge-med">JEE Application</span>
        </div>
        <div class="example-body">
          <p style="font-weight:700;font-size:14.5px;margin-bottom:12px;color:var(--text-primary);">${ex.question}</p>

          <div class="example-step">
            <span class="step-tag">💡 Thinking Process</span>
            <p style="font-size:13.5px;color:var(--text-secondary);">${ex.thinking}</p>
          </div>

          <div class="example-step">
            <span class="step-tag">🔍 Step-by-Step Solution</span>
            <p style="font-size:13.5px;color:var(--text-secondary);white-space:pre-line;">${ex.solution}</p>
          </div>

          <div class="example-answer">
            Final Answer: ${ex.answer}
          </div>

          ${ex.proTip ? `
            <div class="rule-box" style="margin-top:12px;margin-bottom:0;">
              <div class="rule-title">⚡ JEE Pro-Tip & Shortcut</div>
              <p style="font-size:13px;">${ex.proTip}</p>
            </div>
          ` : ""}
        </div>
      </div>
    `).join("");

    // Practice Questions
    const practiceHtml = (top.practice || []).map((q, idx) => {
      const qAttempt = state.questionAttempts[q.id];
      const isSolved = !!qAttempt;

      return `
        <div class="question-card" id="q-card-${q.id}">
          <div class="flex-between mb-2">
            <span style="font-size:12px;font-weight:700;color:var(--primary);text-transform:uppercase;">Practice Question ${idx + 1}</span>
            <span class="badge badge-med">${q.concept || "Concept Test"}</span>
          </div>

          <p class="question-prompt">${q.question}</p>

          <div class="option-list">
            ${q.options.map((opt, oIdx) => {
              let optClass = "option-item";
              if (isSolved) {
                if (oIdx === q.answer) optClass += " correct";
                else if (oIdx === qAttempt.chosen && !qAttempt.isCorrect) optClass += " incorrect";
              }
              return `
                <div class="${optClass}" id="opt-${q.id}-${oIdx}" onclick="app.selectOption('${q.id}', ${oIdx})">
                  <span class="option-marker">${String.fromCharCode(65 + oIdx)}</span>
                  <span>${opt}</span>
                </div>
              `;
            }).join("")}
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;">
            <button class="btn-primary" id="submit-btn-${q.id}" onclick="app.submitPracticeQuestion('${ch.id}', '${top.id}', '${q.id}', ${q.answer})" ${isSolved ? 'disabled style="opacity:0.5;cursor:default;"' : ""}>
              ${isSolved ? "Attempted" : "Submit Answer"}
            </button>
            <button class="btn-secondary" style="padding:6px 12px;font-size:12px;" onclick="app.toggleBookmark('questions', '${q.id}')">
              ⭐ Bookmark
            </button>
          </div>

          <div class="question-feedback ${isSolved ? (qAttempt.isCorrect ? 'show feedback-correct' : 'show feedback-incorrect') : ''}" id="feedback-${q.id}">
            <div style="font-weight:700;">
              ${isSolved ? (qAttempt.isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer!') : ''}
            </div>
            <div class="feedback-desc">
              ${q.explanation}
              ${q.commonMistake ? `<div style="margin-top:6px;color:var(--danger);font-weight:600;">⚠️ Common Mistake: ${q.commonMistake}</div>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Find next and previous topics
    let prevTopic = null;
    let nextTopic = null;
    const allTopics = [];
    DATA.CURRICULUM.forEach(c => {
      (c.topics || []).forEach(t => {
        allTopics.push({ chapterId: c.id, topicId: t.id });
      });
    });
    const currIdx = allTopics.findIndex(x => x.chapterId === ch.id && x.topicId === top.id);
    if (currIdx > 0) prevTopic = allTopics[currIdx - 1];
    if (currIdx < allTopics.length - 1) nextTopic = allTopics[currIdx + 1];

    container.innerHTML = `
      <!-- Topic Header -->
      <div style="margin-bottom:20px;">
        <button class="btn-secondary" style="padding:4px 10px;font-size:12px;margin-bottom:10px;" onclick="app.navigate('curriculum')">
          ← Back to Chapters
        </button>

        <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
          <span class="badge ${prioBadge}">${top.priority.toUpperCase()}</span>
          <span style="font-size:12px;color:var(--text-muted);font-weight:600;">Stage ${ch.stage} • Ch ${ch.chapterNum}: ${ch.title}</span>
        </div>

        <h2 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.3;">${top.title}</h2>
        <div style="display:flex;align-items:center;gap:12px;margin-top:6px;font-size:13px;color:var(--text-muted);">
          <span>⏱️ ${top.estMinutes} Minutes</span>
          <span>•</span>
          <span>Difficulty: <strong>${top.difficulty}</strong></span>
          <span>•</span>
          <span>Status: <strong>${isTopicCompleted ? "✅ Completed" : "⚪ In Progress"}</strong></span>
        </div>
      </div>

      <!-- What You Should Know Before This -->
      <div class="card" style="background:var(--bg-card-subtle);">
        <div style="font-weight:700;font-size:13px;margin-bottom:8px;color:var(--text-primary);">
          🧠 WHAT YOU SHOULD KNOW BEFORE THIS (PREREQUISITES)
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${prereqsHtml}
        </div>
      </div>

      <!-- Section 1: Intuitive Foundation -->
      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:8px;color:var(--primary);">1. Simple Intuitive Foundation</h3>
        <p style="font-size:14.5px;color:var(--text-secondary);line-height:1.7;">${top.simpleExplanation}</p>

        <!-- Visual Diagram if available -->
        ${top.visualHtml ? `
          <div class="chem-diagram-box">
            ${top.visualHtml}
          </div>
        ` : ""}
      </div>

      <!-- Section 2: Formal JEE Definition & Rules -->
      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:8px;color:var(--primary);">2. Formal JEE Definition & Core Principles</h3>
        <div class="rule-box" style="margin-top:6px;">
          <div class="rule-title">📖 Exam Definition</div>
          <p style="font-size:14px;line-height:1.6;">${top.formalDefinition}</p>
        </div>

        <div style="margin-top:16px;">
          <h4 style="font-size:14px;font-weight:700;margin-bottom:8px;">Crucial JEE Rules & Takeaways:</h4>
          <ul style="padding-left:20px;font-size:14px;color:var(--text-secondary);">
            ${rulesHtml}
          </ul>
        </div>
      </div>

      <!-- Section 3: Worked Examples -->
      <div style="margin:24px 0;">
        <h3 style="font-size:18px;font-weight:800;letter-spacing:-0.01em;margin-bottom:4px;">3. Step-by-Step Worked Examples</h3>
        <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:14px;">Master the thinking algorithm before solving yourself.</p>
        ${examplesHtml}
      </div>

      <!-- Section 4: Practice Zone -->
      <div style="margin:28px 0;">
        <div class="flex-between mb-2">
          <div>
            <h3 style="font-size:18px;font-weight:800;">4. Topic Practice Zone</h3>
            <p style="font-size:13.5px;color:var(--text-muted);">Instant submission with step-by-step reasoning</p>
          </div>
          <span class="badge badge-med">${(top.practice || []).length} Questions</span>
        </div>

        ${practiceHtml}
      </div>

      <!-- Topic Completion & Navigation Bar -->
      <div class="card" style="display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center;padding:24px;">
        <h3 style="font-size:17px;font-weight:800;">Ready to complete this topic?</h3>
        <p style="font-size:13.5px;color:var(--text-secondary);max-width:500px;">
          Marking this topic as complete updates your overall progress, strengthens your study streak, and tracks syllabus mastery.
        </p>
        <button class="btn-primary" style="padding:12px 24px;font-size:15px;" onclick="app.completeTopic('${top.id}')">
          ${isTopicCompleted ? "✓ Topic Completed (Click to toggle)" : "✓ Mark Topic as Complete"}
        </button>

        <div style="display:flex;gap:12px;margin-top:8px;width:100%;justify-content:space-between;">
          ${prevTopic ? `
            <button class="btn-secondary" style="font-size:12px;" onclick="app.navigate('topic', {chapterId:'${prevTopic.chapterId}', topicId:'${prevTopic.topicId}'})">
              ← Previous Topic
            </button>
          ` : `<div></div>`}

          ${nextTopic ? `
            <button class="btn-primary" style="font-size:12px;" onclick="app.navigate('topic', {chapterId:'${nextTopic.chapterId}', topicId:'${nextTopic.topicId}'})">
              Next Topic →
            </button>
          ` : `<div></div>`}
        </div>
      </div>
    `;

    // Update study mode title
    const stTitle = document.getElementById("study-mode-title");
    if (stTitle) stTitle.innerText = top.title;
  }

  // Question Engine Methods
  const selectedOptions = {};

  function selectOption(questionId, optionIndex) {
    selectedOptions[questionId] = optionIndex;
    const card = document.getElementById("q-card-" + questionId);
    if (!card) return;
    card.querySelectorAll(".option-item").forEach((el, idx) => {
      el.classList.remove("selected");
      if (idx === optionIndex) el.classList.add("selected");
    });
  }

  function submitPracticeQuestion(chapterId, topicId, questionId, correctAnswer) {
    if (selectedOptions[questionId] === undefined) {
      alert("Please select an option before submitting.");
      return;
    }

    const chosen = selectedOptions[questionId];
    const isCorrect = (chosen === correctAnswer);

    // Save attempt in state
    state.questionAttempts[questionId] = {
      chapterId: chapterId,
      topicId: topicId,
      chosen: chosen,
      isCorrect: isCorrect,
      timestamp: Date.now()
    };

    // Update today's stats
    state.todayStats.questionsAnswered += 1;
    if (isCorrect) state.todayStats.correctCount += 1;

    saveState();

    // Update UI styling
    const card = document.getElementById("q-card-" + questionId);
    if (card) {
      card.querySelectorAll(".option-item").forEach((el, idx) => {
        el.classList.remove("selected");
        if (idx === correctAnswer) el.classList.add("correct");
        if (idx === chosen && !isCorrect) el.classList.add("incorrect");
      });

      const feedback = document.getElementById("feedback-" + questionId);
      if (feedback) {
        feedback.className = "question-feedback show " + (isCorrect ? "feedback-correct" : "feedback-incorrect");
        feedback.querySelector("div:first-child").innerHTML = isCorrect ? "✓ Correct Answer!" : "✗ Incorrect Answer!";
      }

      const btn = document.getElementById("submit-btn-" + questionId);
      if (btn) {
        btn.innerText = "Attempted";
        btn.disabled = true;
        btn.style.opacity = "0.5";
      }
    }
  }

  function completeTopic(topicId) {
    if (state.completedTopics[topicId]) {
      delete state.completedTopics[topicId];
    } else {
      state.completedTopics[topicId] = true;
      state.todayStats.topicsCompleted += 1;
    }
    saveState();

    // Re-render current topic view
    if (currentView === "topic") {
      renderTopic(document.getElementById("app-viewport"), state.currentTopic.chapterId, state.currentTopic.topicId);
    }
  }

  // View: CHAPTER TESTS LIST
  function renderChapterTestsList(container) {
    const testsHtml = DATA.CURRICULUM.map(ch => {
      const scoreObj = state.testScores[ch.id];
      const hasScore = !!scoreObj;
      const pct = hasScore ? Math.round((scoreObj.score / scoreObj.total) * 100) : 0;

      return `
        <div class="card" style="margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-size:11.5px;color:var(--text-muted);font-weight:700;">CHAPTER TEST • CH ${ch.chapterNum}</div>
            <h3 style="font-size:16px;font-weight:800;margin:3px 0;">${ch.title}</h3>
            <p style="font-size:12.5px;color:var(--text-secondary);">${(ch.chapterTest || []).length} Multi-Concept Questions • Timed</p>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            ${hasScore ? `
              <div style="text-align:right;">
                <span class="badge ${pct >= 75 ? 'badge-ncert' : (pct >= 50 ? 'badge-med' : 'badge-vhigh')}">${pct}% Score</span>
                <div style="font-size:11px;color:var(--text-muted);">${scoreObj.score}/${scoreObj.total} Correct</div>
              </div>
            ` : `
              <span class="badge badge-med">Unattempted</span>
            `}
            <button class="btn-primary" style="padding:8px 16px;font-size:13px;" onclick="app.navigate('chapter-test', {chapterId:'${ch.id}'})">
              ${hasScore ? "Retake" : "Start Test"}
            </button>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Chapter Test Series</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Simulate full-length chapter tests with timer, question review palette, instant analytics, and weak concept diagnosis.
        </p>
      </div>

      <div>
        ${testsHtml}
      </div>
    `;
  }

  // View: ACTIVE CHAPTER TEST SIMULATOR
  function startChapterTest(container, chapterId) {
    const ch = DATA.CURRICULUM.find(c => c.id === chapterId) || DATA.CURRICULUM[0];
    const questions = ch.chapterTest || [];

    if (questions.length === 0) {
      alert("No test questions available for this chapter yet.");
      navigate("chapter-tests-list");
      return;
    }

    // Initialize test session
    activeTest = {
      chapterId: ch.id,
      chapterTitle: ch.title,
      questions: questions,
      currentIndex: 0,
      answers: {}, // questionId -> chosenOptionIndex
      markedForReview: {},
      timeRemaining: questions.length * 90, // 90 seconds per question
      totalTime: questions.length * 90
    };

    // Start timer
    if (testTimerInterval) clearInterval(testTimerInterval);
    testTimerInterval = setInterval(() => {
      if (activeTest && activeTest.timeRemaining > 0) {
        activeTest.timeRemaining -= 1;
        updateTestTimerDisplay();
      } else {
        clearInterval(testTimerInterval);
        submitChapterTest();
      }
    }, 1000);

    renderTestInterface(container);
  }

  function updateTestTimerDisplay() {
    const timerEl = document.getElementById("test-timer-digits");
    if (!timerEl || !activeTest) return;
    const mins = Math.floor(activeTest.timeRemaining / 60);
    const secs = activeTest.timeRemaining % 60;
    timerEl.innerText = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function renderTestInterface(container) {
    if (!activeTest) return;

    const q = activeTest.questions[activeTest.currentIndex];
    const qNum = activeTest.currentIndex + 1;
    const totalQ = activeTest.questions.length;
    const chosen = activeTest.answers[q.id];
    const isReview = !!activeTest.markedForReview[q.id];

    // Palette buttons
    const paletteHtml = activeTest.questions.map((ques, idx) => {
      let pClass = "palette-btn";
      if (idx === activeTest.currentIndex) pClass += " current";
      else if (activeTest.markedForReview[ques.id]) pClass += " review";
      else if (activeTest.answers[ques.id] !== undefined) pClass += " answered";

      return `
        <button class="${pClass}" onclick="app.jumpToTestQuestion(${idx})">
          ${idx + 1}
        </button>
      `;
    }).join("");

    container.innerHTML = `
      <!-- Sticky Test Timer Bar -->
      <div class="test-timer-bar">
        <div>
          <span style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Test In Progress</span>
          <div style="font-weight:800;font-size:14px;">${activeTest.chapterTitle}</div>
        </div>
        <div class="test-timer">
          ⏱️ <span id="test-timer-digits">--:--</span>
        </div>
        <button class="btn-primary" style="background:var(--danger);padding:6px 14px;font-size:13px;" onclick="app.confirmSubmitTest()">
          Submit Test
        </button>
      </div>

      <!-- Question Card -->
      <div class="card" style="margin-top:16px;">
        <div class="flex-between mb-2">
          <span style="font-size:13px;font-weight:700;color:var(--primary);">Question ${qNum} of ${totalQ}</span>
          <span class="badge badge-med">${q.topic || "Core Concept"}</span>
        </div>

        <p class="question-prompt" style="font-size:16px;">${q.question}</p>

        <div class="option-list">
          ${q.options.map((opt, oIdx) => `
            <div class="option-item ${chosen === oIdx ? 'selected' : ''}" onclick="app.selectTestOption('${q.id}', ${oIdx})">
              <span class="option-marker">${String.fromCharCode(65 + oIdx)}</span>
              <span>${opt}</span>
            </div>
          `).join("")}
        </div>

        <div class="flex-between mt-3">
          <button class="btn-secondary" style="font-size:12px;padding:6px 12px;" onclick="app.toggleMarkReview('${q.id}')">
            ${isReview ? "💜 Unmark Review" : "💜 Mark for Review"}
          </button>

          <div style="display:flex;gap:8px;">
            <button class="btn-secondary" style="font-size:13px;" onclick="app.prevTestQuestion()" ${activeTest.currentIndex === 0 ? 'disabled style="opacity:0.4;"' : ''}>
              ← Previous
            </button>
            <button class="btn-primary" style="font-size:13px;" onclick="app.nextTestQuestion()" ${activeTest.currentIndex === totalQ - 1 ? 'disabled style="opacity:0.4;"' : ''}>
              Next →
            </button>
          </div>
        </div>
      </div>

      <!-- Question Palette -->
      <div class="card">
        <div class="flex-between mb-2">
          <span style="font-size:13px;font-weight:700;">Question Palette</span>
          <div style="display:flex;gap:10px;font-size:11.5px;">
            <span style="color:var(--success);">● Answered</span>
            <span style="color:var(--purple);">● Review</span>
            <span style="color:var(--text-muted);">○ Unanswered</span>
          </div>
        </div>
        <div class="test-palette">
          ${paletteHtml}
        </div>
      </div>
    `;

    updateTestTimerDisplay();
  }

  function selectTestOption(questionId, optionIndex) {
    if (!activeTest) return;
    activeTest.answers[questionId] = optionIndex;
    renderTestInterface(document.getElementById("app-viewport"));
  }

  function toggleMarkReview(questionId) {
    if (!activeTest) return;
    if (activeTest.markedForReview[questionId]) {
      delete activeTest.markedForReview[questionId];
    } else {
      activeTest.markedForReview[questionId] = true;
    }
    renderTestInterface(document.getElementById("app-viewport"));
  }

  function jumpToTestQuestion(idx) {
    if (!activeTest) return;
    activeTest.currentIndex = idx;
    renderTestInterface(document.getElementById("app-viewport"));
  }

  function prevTestQuestion() {
    if (!activeTest || activeTest.currentIndex <= 0) return;
    activeTest.currentIndex -= 1;
    renderTestInterface(document.getElementById("app-viewport"));
  }

  function nextTestQuestion() {
    if (!activeTest || activeTest.currentIndex >= activeTest.questions.length - 1) return;
    activeTest.currentIndex += 1;
    renderTestInterface(document.getElementById("app-viewport"));
  }

  function confirmSubmitTest() {
    const answeredCount = Object.keys(activeTest.answers).length;
    const totalCount = activeTest.questions.length;
    if (confirm(`You have answered ${answeredCount} out of ${totalCount} questions. Do you want to submit your test?`)) {
      submitChapterTest();
    }
  }

  function submitChapterTest() {
    if (!activeTest) return;
    if (testTimerInterval) clearInterval(testTimerInterval);

    let score = 0;
    const results = [];

    activeTest.questions.forEach(q => {
      const chosen = activeTest.answers[q.id];
      const isCorrect = (chosen === q.answer);
      if (isCorrect) score += 1;

      // Log question attempt
      state.questionAttempts[q.id] = {
        chapterId: activeTest.chapterId,
        topicId: q.topic || "test-topic",
        chosen: chosen,
        isCorrect: isCorrect,
        timestamp: Date.now()
      };

      results.push({
        question: q,
        chosen: chosen,
        isCorrect: isCorrect
      });
    });

    const total = activeTest.questions.length;
    const timeSpent = activeTest.totalTime - activeTest.timeRemaining;

    // Save test score
    state.testScores[activeTest.chapterId] = {
      score: score,
      total: total,
      date: Date.now()
    };

    state.todayStats.questionsAnswered += total;
    state.todayStats.correctCount += score;
    saveState();

    // Render result page
    renderTestResult(document.getElementById("app-viewport"), activeTest.chapterTitle, activeTest.chapterId, score, total, timeSpent, results);
    activeTest = null;
  }

  function renderTestResult(container, chapterTitle, chapterId, score, total, timeSpent, results) {
    const pct = Math.round((score / total) * 100);
    const mins = Math.floor(timeSpent / 60);
    const secs = timeSpent % 60;

    const analysisHtml = results.map((r, idx) => `
      <div class="question-card" style="margin-bottom:14px;border-left:4px solid ${r.isCorrect ? 'var(--success)' : 'var(--danger)'};">
        <div class="flex-between mb-1">
          <span style="font-weight:700;font-size:12px;color:var(--text-muted);">QUESTION ${idx + 1}</span>
          <span class="badge ${r.isCorrect ? 'badge-ncert' : 'badge-vhigh'}">${r.isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}</span>
        </div>
        <p style="font-weight:700;font-size:14.5px;margin-bottom:8px;">${r.question.question}</p>

        <div style="font-size:13px;margin-bottom:6px;">
          Your Answer: <strong>${r.chosen !== undefined ? r.question.options[r.chosen] : 'Unattempted'}</strong>
        </div>
        <div style="font-size:13px;color:var(--success);font-weight:700;margin-bottom:8px;">
          Correct Answer: ${r.question.options[r.question.answer]}
        </div>

        <div style="background:var(--bg-card-subtle);padding:10px 12px;border-radius:var(--radius-sm);font-size:12.5px;color:var(--text-secondary);">
          <strong>Explanation:</strong> ${r.question.explanation}
        </div>
      </div>
    `).join("");

    container.innerHTML = `
      <div class="card" style="text-align:center;padding:28px 20px;">
        <span class="badge badge-med mb-2">${chapterTitle} Test Summary</span>
        <h2 style="font-size:32px;font-weight:800;color:var(--primary);margin:4px 0;">${score} / ${total}</h2>
        <div style="font-size:18px;font-weight:700;margin-bottom:8px;">${pct}% Accuracy</div>
        <p style="font-size:13px;color:var(--text-muted);">Completed in ${mins}m ${secs}s</p>

        <div style="display:flex;justify-content:center;gap:12px;margin-top:20px;">
          <button class="btn-primary" onclick="app.navigate('chapter-test', {chapterId:'${chapterId}'})">
            🔄 Retry Test
          </button>
          <button class="btn-secondary" onclick="app.navigate('pyqs', {chapterId:'${chapterId}'})">
            🎯 Continue to PYQs
          </button>
          <button class="btn-secondary" onclick="app.navigate('chapter-tests-list')">
            Back to Tests
          </button>
        </div>
      </div>

      <div style="margin-top:24px;">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:12px;">Detailed Question Analysis</h3>
        ${analysisHtml}
      </div>
    `;
  }

  // View: JEE MAIN PYQs EXPLORER
  let pyqFilter = {
    year: "All",
    difficulty: "All",
    chapterId: "All"
  };

  function renderPYQs(container, params = {}) {
    if (params.chapterId) pyqFilter.chapterId = params.chapterId;

    let list = DATA.ALL_PYQS.filter(p => {
      if (pyqFilter.year !== "All" && p.year !== pyqFilter.year) return false;
      if (pyqFilter.difficulty !== "All" && p.difficulty !== pyqFilter.difficulty) return false;
      if (pyqFilter.chapterId !== "All" && p.chapterId !== pyqFilter.chapterId) return false;
      return true;
    });

    const pyqsHtml = list.map((q, idx) => {
      const qAttempt = state.questionAttempts[q.id];
      const isSolved = !!qAttempt;

      return `
        <div class="question-card" id="q-card-${q.id}">
          <div class="flex-between mb-2">
            <div>
              <span class="badge badge-med">JEE Main ${q.year}</span>
              <span style="font-size:11.5px;color:var(--text-muted);margin-left:6px;">${q.session} • ${q.chapter}</span>
            </div>
            <span class="badge ${q.sourceType === 'verified-pyq' ? 'badge-ncert' : 'badge-high'}">
              ${q.sourceType === 'verified-pyq' ? '✓ Verified PYQ' : 'JEE-Style'}
            </span>
          </div>

          <p class="question-prompt" style="font-size:15.5px;">${q.question}</p>

          <div class="option-list">
            ${q.options.map((opt, oIdx) => {
              let optClass = "option-item";
              if (isSolved) {
                if (oIdx === q.answer) optClass += " correct";
                else if (oIdx === qAttempt.chosen && !qAttempt.isCorrect) optClass += " incorrect";
              }
              return `
                <div class="${optClass}" onclick="app.selectOption('${q.id}', ${oIdx})">
                  <span class="option-marker">${String.fromCharCode(65 + oIdx)}</span>
                  <span>${opt}</span>
                </div>
              `;
            }).join("")}
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;">
            <button class="btn-primary" id="submit-btn-${q.id}" onclick="app.submitPracticeQuestion('${q.chapterId}', '${q.topic}', '${q.id}', ${q.answer})" ${isSolved ? 'disabled style="opacity:0.5;"' : ""}>
              ${isSolved ? "Attempted" : "Submit Answer"}
            </button>
            <button class="btn-secondary" style="padding:6px 12px;font-size:12px;" onclick="app.toggleBookmark('questions', '${q.id}')">
              ⭐ Bookmark
            </button>
          </div>

          <div class="question-feedback ${isSolved ? (qAttempt.isCorrect ? 'show feedback-correct' : 'show feedback-incorrect') : ''}" id="feedback-${q.id}">
            <div style="font-weight:700;">
              ${isSolved ? (qAttempt.isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer!') : ''}
            </div>
            <div class="feedback-desc">
              ${q.explanation}
            </div>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">JEE Main Previous Year Questions Bank</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Filter verified JEE Main PYQs and realistic exam-level problems with official keys and step-by-step reasoning.
        </p>

        <!-- Filters -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
          <select class="btn-secondary" style="font-size:13px;padding:8px 12px;" onchange="app.setPYQFilter('year', this.value)">
            <option value="All" ${pyqFilter.year === 'All' ? 'selected' : ''}>All Years</option>
            <option value="2024" ${pyqFilter.year === '2024' ? 'selected' : ''}>2024 Sessions</option>
            <option value="2023" ${pyqFilter.year === '2023' ? 'selected' : ''}>2023 Sessions</option>
            <option value="2022" ${pyqFilter.year === '2022' ? 'selected' : ''}>2022 Sessions</option>
          </select>

          <select class="btn-secondary" style="font-size:13px;padding:8px 12px;" onchange="app.setPYQFilter('difficulty', this.value)">
            <option value="All" ${pyqFilter.difficulty === 'All' ? 'selected' : ''}>All Difficulties</option>
            <option value="Easy" ${pyqFilter.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
            <option value="Medium" ${pyqFilter.difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="Hard" ${pyqFilter.difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
          </select>

          <select class="btn-secondary" style="font-size:13px;padding:8px 12px;" onchange="app.setPYQFilter('chapterId', this.value)">
            <option value="All" ${pyqFilter.chapterId === 'All' ? 'selected' : ''}>All Chapters</option>
            ${DATA.CURRICULUM.map(c => `
              <option value="${c.id}" ${pyqFilter.chapterId === c.id ? 'selected' : ''}>${c.title}</option>
            `).join("")}
          </select>
        </div>
      </div>

      <div>
        ${list.length > 0 ? pyqsHtml : `
          <div class="card" style="text-align:center;padding:32px;color:var(--text-muted);">
            No PYQs found matching the selected filter criteria.
          </div>
        `}
      </div>
    `;
  }

  function setPYQFilter(key, val) {
    pyqFilter[key] = val;
    renderPYQs(document.getElementById("app-viewport"));
  }

  // View: SYLLABUS CHECKLIST
  function renderChecklist(container) {
    const checklistHtml = DATA.STAGES.map(st => {
      const chaps = DATA.CURRICULUM.filter(c => c.stage === st.id);

      return `
        <div class="checklist-stage">
          <div class="checklist-stage-header">
            <span>Stage ${st.id}: ${st.title}</span>
            <span style="font-size:12px;color:var(--text-muted);">${chaps.length} Chapters</span>
          </div>

          <div class="checklist-chapter-list">
            ${chaps.map(c => `
              <div class="card" style="margin-top:8px;padding:12px 16px;">
                <div class="flex-between mb-2">
                  <div style="font-weight:700;font-size:14px;">Ch ${c.chapterNum}: ${c.title}</div>
                  <button class="btn-secondary" style="font-size:11px;padding:3px 8px;" onclick="app.markChapterComplete('${c.id}')">
                    ✓ Complete All Topics
                  </button>
                </div>

                ${(c.topics || []).map(t => {
                  const isDone = !!state.completedTopics[t.id];
                  return `
                    <div class="checklist-topic-row">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
                        <input type="checkbox" ${isDone ? 'checked' : ''} onchange="app.completeTopic('${t.id}')" style="width:16px;height:16px;" />
                        <span style="font-weight:600;${isDone ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${t.title}</span>
                      </label>
                      <span class="badge ${t.priority === 'very-high' ? 'badge-vhigh' : (t.priority === 'high' ? 'badge-high' : 'badge-med')}">${t.priority}</span>
                    </div>
                  `;
                }).join("")}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">My Organic Chemistry Checklist</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Keep track of every single subtopic across Class 10, 11, and 12. Check items off as you learn or review.
        </p>
      </div>

      <div>
        ${checklistHtml}
      </div>
    `;
  }

  function markChapterComplete(chapterId) {
    const ch = DATA.CURRICULUM.find(c => c.id === chapterId);
    if (!ch || !ch.topics) return;
    ch.topics.forEach(t => {
      state.completedTopics[t.id] = true;
    });
    saveState();
    renderChecklist(document.getElementById("app-viewport"));
  }

  // View: REACTION LIBRARY
  let activeReactionFamily = "All";

  function renderReactions(container) {
    const families = ["All", "Aldehydes & Ketones", "Phenols", "Ethers", "Amines", "Diazonium Salts"];

    const list = DATA.REACTIONS_DATA.filter(r => {
      if (activeReactionFamily !== "All" && r.family !== activeReactionFamily) return false;
      return true;
    });

    const rxnHtml = list.map(rxn => `
      <div class="reaction-card">
        <div class="flex-between">
          <h3 style="font-size:16px;font-weight:800;color:var(--primary);">${rxn.name}</h3>
          <span class="badge badge-med">${rxn.family}</span>
        </div>

        <div class="reaction-flow">
          <span>${rxn.reactants}</span>
          <div class="reaction-arrow">
            <span class="reaction-reagent-text">${rxn.reagent}</span>
            <span>─────▶</span>
          </div>
          <span style="font-weight:700;color:var(--success);">${rxn.products}</span>
        </div>

        <div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">
          <strong>Mechanism:</strong> ${rxn.mechanism}
        </div>

        ${rxn.conditions ? `
          <div style="font-size:12.5px;color:var(--text-muted);">
            📌 <strong>Conditions:</strong> ${rxn.conditions}
          </div>
        ` : ""}

        ${rxn.exceptions ? `
          <div style="font-size:12.5px;color:var(--danger);font-weight:600;">
            ⚠️ <strong>Crucial Exception:</strong> ${rxn.exceptions}
          </div>
        ` : ""}

        <div class="rule-box" style="margin-top:8px;margin-bottom:0;padding:10px 14px;">
          <div class="rule-title" style="font-size:12px;">⚡ JEE Main Tip</div>
          <p style="font-size:12.5px;">${rxn.jeeTip}</p>
        </div>
      </div>
    `).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Named Reactions Library</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Reactant → Reagent → Product transformations with reaction mechanisms, condition requirements, and exam traps.
        </p>

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;">
          ${families.map(f => `
            <button class="btn-secondary ${activeReactionFamily === f ? 'btn-primary' : ''}" style="font-size:12px;padding:5px 12px;" onclick="app.setReactionFamily('${f}')">
              ${f}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="library-grid">
        ${rxnHtml}
      </div>
    `;
  }

  function setReactionFamily(family) {
    activeReactionFamily = family;
    renderReactions(document.getElementById("app-viewport"));
  }

  // View: REAGENT MASTER LIBRARY
  function renderReagents(container) {
    const reagentsHtml = DATA.REAGENTS_DATA.map(rg => `
      <div class="reaction-card">
        <div class="flex-between">
          <h3 style="font-size:16px;font-weight:800;color:var(--primary);">${rg.name}</h3>
          <span class="badge badge-med">${rg.category}</span>
        </div>

        <div style="font-family:var(--font-mono);font-size:12.5px;background:var(--bg-card-subtle);padding:6px 10px;border-radius:var(--radius-sm);color:var(--text-secondary);">
          ${rg.formula}
        </div>

        <div style="font-size:13.5px;color:var(--text-secondary);">
          <strong>Action:</strong> ${rg.action}
        </div>

        <div style="font-size:13px;color:var(--text-secondary);">
          <strong>Selectivity:</strong> ${rg.selectivity}
        </div>

        <div class="rule-box" style="margin-top:6px;margin-bottom:0;padding:10px 14px;">
          <div class="rule-title" style="font-size:12px;">⚡ JEE Pro-Tip</div>
          <p style="font-size:12.5px;">${rg.jeeTip}</p>
        </div>
      </div>
    `).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Reagent Master Library</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Master oxidizing agents, reducing agents, halogenating agents, and organometallics for major product prediction.
        </p>
      </div>

      <div class="library-grid">
        ${reagentsHtml}
      </div>
    `;
  }

  // View: QUICK REVISION & CHEAT SHEET
  function renderQuickRevision(container) {
    const carbocations = DATA.COMPARISONS_DATA.carbocationStability;
    const acidity = DATA.COMPARISONS_DATA.acidityTrends;
    const traps = DATA.COMPARISONS_DATA.commonTraps;

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Quick Revision & High-Yield Sheets</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Instant lookup for relative stability orders, pKa acidity rankings, aqueous basicity orders, and common exam traps.
        </p>
      </div>

      <!-- Carbocation Stability Table -->
      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:10px;">1. Carbocation Stability Hierarchy</h3>
        <div class="table-container">
          <table class="chem-table">
            <thead>
              <tr>
                <th>Intermediate</th>
                <th>Stabilization Factor</th>
                <th>Relative Stability</th>
              </tr>
            </thead>
            <tbody>
              ${carbocations.map(c => `
                <tr>
                  <td style="font-weight:700;color:var(--text-primary);">${c.intermediate}</td>
                  <td>${c.reason}</td>
                  <td><span class="badge badge-med">${c.relative}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Acidity Order Table -->
      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:10px;">2. Organic Acidity (pKa) Hierarchy</h3>
        <div class="table-container">
          <table class="chem-table">
            <thead>
              <tr>
                <th>Compound</th>
                <th>Approx pKa</th>
                <th>Dominant Factor</th>
              </tr>
            </thead>
            <tbody>
              ${acidity.map(a => `
                <tr>
                  <td style="font-weight:700;color:var(--text-primary);">${a.compound}</td>
                  <td><span class="text-mono">${a.pKa}</span></td>
                  <td>${a.factor}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Common Exam Traps -->
      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;">3. Common JEE Main Mistakes & Trap Busters</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${traps.map(t => `
            <div class="rule-box trap" style="margin:0;">
              <div class="rule-title" style="color:var(--danger);">⚠️ Frequent Trap: ${t.trap}</div>
              <p style="font-size:13.5px;color:var(--text-primary);margin-top:4px;"><strong>Remedy:</strong> ${t.remedy}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // View: REVISION & MISTAKES HUB
  function renderRevision(container) {
    const incorrect = getIncorrectQuestions();
    const weakTopics = getWeakTopics();

    const mistakesHtml = incorrect.map((item, idx) => {
      // Find question
      let foundQ = null;
      DATA.CURRICULUM.forEach(c => {
        (c.topics || []).forEach(t => {
          (t.practice || []).forEach(pq => {
            if (pq.id === item.id) foundQ = pq;
          });
        });
        (c.chapterTest || []).forEach(tq => {
          if (tq.id === item.id) foundQ = tq;
        });
      });
      DATA.ALL_PYQS.forEach(pyq => {
        if (pyq.id === item.id) foundQ = pyq;
      });

      if (!foundQ) return "";

      return `
        <div class="question-card" style="border-left:4px solid var(--danger);">
          <div class="flex-between mb-2">
            <span style="font-size:12px;font-weight:700;color:var(--danger);">MISTAKE RECORD #${idx + 1}</span>
            <span class="badge badge-vhigh">Needs Review</span>
          </div>

          <p style="font-weight:700;font-size:14.5px;margin-bottom:8px;">${foundQ.question}</p>

          <div style="font-size:13px;color:var(--danger);margin-bottom:4px;">
            Your Answer: ${item.chosen !== undefined && foundQ.options[item.chosen] ? foundQ.options[item.chosen] : "Unattempted"}
          </div>
          <div style="font-size:13px;color:var(--success);font-weight:700;margin-bottom:8px;">
            Correct Answer: ${foundQ.options[foundQ.answer]}
          </div>

          <div style="background:var(--bg-card-subtle);padding:10px 12px;border-radius:var(--radius-sm);font-size:12.5px;color:var(--text-secondary);">
            ${foundQ.explanation}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Revision & Mistakes Notebook</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Review questions you missed during practice and chapter tests to eliminate conceptual gaps.
        </p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--danger);">${incorrect.length}</div>
          <div class="stat-label">Total Mistakes</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--warning);">${weakTopics.length}</div>
          <div class="stat-label">Weak Concepts</div>
        </div>
      </div>

      <div>
        ${incorrect.length > 0 ? mistakesHtml : `
          <div class="card" style="text-align:center;padding:36px;color:var(--text-muted);">
            🎉 <strong>Zero Recorded Mistakes!</strong> Attempt practice questions and tests to populate your revision notebook.
          </div>
        `}
      </div>
    `;
  }

  // View: BOOKMARKS
  function renderBookmarks(container) {
    const bTopics = state.bookmarks.topics || [];
    const bQuestions = state.bookmarks.questions || [];

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Starred Bookmarks</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Quickly access starred topics, tricky questions, and reactions you saved for last-minute revision.
        </p>
      </div>

      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;">Saved Questions (${bQuestions.length})</h3>
        ${bQuestions.length === 0 ? `
          <p style="font-size:13.5px;color:var(--text-muted);">No questions starred yet. Click the "⭐ Bookmark" button on any question to add it here.</p>
        ` : bQuestions.map(qId => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--border-subtle);">
            <span style="font-weight:600;font-size:13.5px;">Question ID: ${qId}</span>
            <button class="btn-secondary" style="font-size:12px;padding:4px 8px;" onclick="app.toggleBookmark('questions', '${qId}'); app.navigate('bookmarks');">
              Remove
            </button>
          </div>
        `).join("")}
      </div>
    `;
  }

  function toggleBookmark(type, id) {
    if (!state.bookmarks[type]) state.bookmarks[type] = [];
    const idx = state.bookmarks[type].indexOf(id);
    if (idx >= 0) {
      state.bookmarks[type].splice(idx, 1);
      alert("Bookmark removed.");
    } else {
      state.bookmarks[type].push(id);
      alert("Added to Bookmarks!");
    }
    saveState();
  }

  // View: SETTINGS & BACKUP
  function renderSettings(container) {
    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;">Settings & Data Backup</h2>
        <p style="font-size:14px;color:var(--text-secondary);">
          Manage display preferences, export study progress, or backup your test history.
        </p>
      </div>

      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;">Display Preferences</h3>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <span>Color Theme</span>
          <button class="btn-secondary" onclick="app.toggleTheme()">
            ${state.theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
          </button>
        </div>
      </div>

      <div class="card">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;">Data Management</h3>
        <p style="font-size:13.5px;color:var(--text-secondary);margin-bottom:14px;">
          All progress is automatically saved to your browser's local storage.
        </p>

        <div style="display:flex;gap:10px;">
          <button class="btn-secondary" onclick="app.exportData()">
            📥 Export Backup JSON
          </button>
          <button class="btn-secondary" style="color:var(--danger);" onclick="app.resetProgress()">
            🗑️ Reset Progress
          </button>
        </div>
      </div>
    `;
  }

  function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `jee-organic-chemistry-backup-${Date.now()}.json`);
    dlAnchor.click();
  }

  function resetProgress() {
    if (confirm("Are you sure you want to reset all progress, completed topics, and test scores? This action cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }

  // Global Search Modal
  function openSearch() {
    const modal = document.getElementById("search-modal");
    if (modal) {
      modal.classList.add("active");
      const input = document.getElementById("global-search-input");
      if (input) {
        input.value = "";
        input.focus();
        handleSearchInput("");
      }
    }
  }

  function closeSearch() {
    const modal = document.getElementById("search-modal");
    if (modal) modal.classList.remove("active");
  }

  function handleSearchInput(query) {
    const resultsBox = document.getElementById("search-results-box");
    if (!resultsBox) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsBox.innerHTML = `
        <div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13.5px;">
          Type a chapter name, topic, reaction (e.g. Cannizzaro, Aldol), or reagent (e.g. PCC, LiAlH4) to search.
        </div>
      `;
      return;
    }

    const matches = [];

    // Search topics
    DATA.CURRICULUM.forEach(c => {
      (c.topics || []).forEach(t => {
        if (t.title.toLowerCase().includes(q) || t.simpleExplanation.toLowerCase().includes(q)) {
          matches.push({
            type: "Topic",
            title: t.title,
            meta: `Ch ${c.chapterNum}: ${c.title}`,
            action: () => {
              closeSearch();
              navigate("topic", { chapterId: c.id, topicId: t.id });
            }
          });
        }
      });
    });

    // Search reactions
    DATA.REACTIONS_DATA.forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.reactants.toLowerCase().includes(q) || r.products.toLowerCase().includes(q)) {
        matches.push({
          type: "Named Reaction",
          title: r.name,
          meta: `${r.family} • ${r.reagent}`,
          action: () => {
            closeSearch();
            navigate("reactions");
          }
        });
      }
    });

    // Search reagents
    DATA.REAGENTS_DATA.forEach(rg => {
      if (rg.name.toLowerCase().includes(q) || rg.action.toLowerCase().includes(q)) {
        matches.push({
          type: "Reagent",
          title: rg.name,
          meta: rg.category,
          action: () => {
            closeSearch();
            navigate("reagents");
          }
        });
      }
    });

    if (matches.length === 0) {
      resultsBox.innerHTML = `
        <div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13.5px;">
          No results found for "${query}".
        </div>
      `;
      return;
    }

    resultsBox.innerHTML = matches.slice(0, 10).map((m, idx) => `
      <div class="search-result-item" onclick="app.executeSearchMatch(${idx})">
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="badge badge-med" style="font-size:10px;">${m.type}</span>
          <span class="search-result-title">${m.title}</span>
        </div>
        <span class="search-result-meta">${m.meta}</span>
      </div>
    `).join("");

    window._searchMatches = matches;
  }

  function executeSearchMatch(idx) {
    if (window._searchMatches && window._searchMatches[idx]) {
      window._searchMatches[idx].action();
    }
  }

  // Theme & Study Mode Toggles
  function toggleTheme() {
    if (state.theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      state.theme = "light";
      const btn = document.getElementById("theme-toggle-btn");
      if (btn) btn.innerText = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      state.theme = "dark";
      const btn = document.getElementById("theme-toggle-btn");
      if (btn) btn.innerText = "☀️";
    }
    saveState();
  }

  function toggleStudyMode() {
    state.studyMode = !state.studyMode;
    if (state.studyMode) {
      document.body.classList.add("study-mode");
    } else {
      document.body.classList.remove("study-mode");
    }
  }

  function changeFontSize(delta) {
    state.fontSize = Math.max(13, Math.min(20, (state.fontSize || 15) + delta));
    document.body.style.fontSize = state.fontSize + "px";
  }

  // Keyboard shortcuts (Ctrl+K for search, Escape to close)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape") {
      closeSearch();
    }
  });

  // Boot Application
  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    navigate("dashboard");
  });

  return {
    navigate,
    selectOption,
    submitPracticeQuestion,
    completeTopic,
    markChapterComplete,
    startChapterTest,
    selectTestOption,
    toggleMarkReview,
    jumpToTestQuestion,
    prevTestQuestion,
    nextTestQuestion,
    confirmSubmitTest,
    setPYQFilter,
    setReactionFamily,
    toggleBookmark,
    openSearch,
    closeSearch,
    handleSearchInput,
    executeSearchMatch,
    toggleTheme,
    toggleStudyMode,
    changeFontSize,
    exportData,
    resetProgress
  };
})();
