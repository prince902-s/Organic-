/**
 * JEE MAIN ORGANIC CHEMISTRY - CHAPTER RUNNER ENGINE
 * Powers all chapter-X.html pages with the standardized 10-step topic flow:
 * Learn → Understand (3-layers) → Examples → Guided Practice → Topic Test → Mastery → Next Topic
 * plus Chapter Summary, Mind Map, Timed Chapter Test with Palette, and Next Chapter Bridge.
 */

window.ChapterRunner = (function() {
  let currentChapter = null;
  let activeTest = null; // for chapter test simulator

  function render(chapterNum) {
    if (!window.CHEM_CURRICULUM || !window.CHEM_CURRICULUM.CHAPTERS) {
      setTimeout(() => render(chapterNum), 100);
      return;
    }

    currentChapter = window.CHEM_CURRICULUM.CHAPTERS.find(c => c.number === chapterNum);
    if (!currentChapter) {
      document.getElementById("chapter-content-mount").innerHTML = `
        <div class="card" style="text-align:center;padding:40px;">
          <h2>Chapter ${chapterNum} Not Found</h2>
          <p style="margin-top:10px;"><a href="dashboard.html" class="btn-primary">Back to Dashboard</a></p>
        </div>
      `;
      return;
    }

    // Update current learning position in storage
    if (window.CourseStorage && currentChapter.topics && currentChapter.topics[0]) {
      const t0 = currentChapter.topics[0];
      window.CourseStorage.updateCurrentPosition(
        currentChapter.id,
        currentChapter.number,
        t0.id,
        t0.number,
        t0.title
      );
    }

    // Mount chapter UI
    const mount = document.getElementById("chapter-content-mount");
    if (!mount) return;

    let html = `
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom:20px;">
        <div class="topbar-title-crumb" style="margin-bottom:8px;">
          <a href="dashboard.html">Course</a> <span>›</span>
          <a href="learning-path.html">Chapters</a> <span>›</span>
          <span style="color:var(--text-primary);">Chapter ${currentChapter.number}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
          <span class="badge badge-${currentChapter.priority === 'very-high' ? 'vhigh' : (currentChapter.priority === 'high' ? 'high' : 'med')}">
            Priority: ${currentChapter.priority.toUpperCase()}
          </span>
          <span class="badge badge-ncert">${currentChapter.ncert}</span>
        </div>
        <h1 style="font-size:26px;font-weight:800;color:var(--text-primary);letter-spacing:-0.02em;">
          Chapter ${currentChapter.number} — ${currentChapter.title}
        </h1>
        <p style="font-size:14.5px;color:var(--text-muted);margin-top:6px;">
          ${currentChapter.subtitle || currentChapter.whyImportant}
        </p>
      </div>

      <!-- Chapter Prerequisites Alert -->
      <div class="callout-box callout-prereq" style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:18px;">💡</span>
        <div>
          <strong>Prerequisites Check:</strong> ${currentChapter.prerequisites.join(", ")}
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">
            Make sure you have reviewed these before advancing to ensure uninterrupted comprehension.
          </div>
        </div>
      </div>

      <!-- Learning Progress Bar -->
      <div class="card" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;">
          <span>Chapter Progress</span>
          <span id="chapter-pct-text">0% Complete</span>
        </div>
        <div class="progress-bar-container">
          <div id="chapter-pct-fill" class="progress-bar-fill" style="width: 0%;"></div>
        </div>
      </div>

      <!-- Topics Container -->
      <div id="topics-list-container">
    `;

    // Render each topic
    if (currentChapter.topics) {
      currentChapter.topics.forEach((topic, idx) => {
        html += renderTopicHTML(topic, idx, currentChapter.topics.length);
      });
    }

    // Chapter Summary, Mind Map, Chapter Test & Next Chapter Bridge
    html += `
      </div>

      <!-- Chapter Summary Section -->
      ${renderChapterSummaryHTML(currentChapter)}

      <!-- Chapter Mind Map -->
      ${renderMindMapHTML(currentChapter)}

      <!-- Chapter Test Simulator -->
      ${renderChapterTestHTML(currentChapter)}

      <!-- Next Chapter Bridge -->
      ${renderNextChapterBridgeHTML(currentChapter)}
    `;

    mount.innerHTML = html;
    updateChapterProgress();
  }

  function renderTopicHTML(topic, index, totalTopics) {
    const topicId = topic.id;
    const mastery = window.CourseStorage ? window.CourseStorage.getTopicMastery(topicId) : null;
    const masteryStatus = mastery ? mastery.status : null;
    const masteryPct = mastery ? mastery.pct : 0;

    let masteryBadge = "";
    if (masteryStatus === "mastered") {
      masteryBadge = `<span class="badge" style="background:var(--success-subtle);color:var(--success);border:1px solid var(--success-border);">✓ Mastered (${masteryPct}%)</span>`;
    } else if (masteryStatus === "good") {
      masteryBadge = `<span class="badge" style="background:var(--primary-subtle);color:var(--primary);border:1px solid var(--primary-border);">● Good (${masteryPct}%)</span>`;
    } else if (masteryStatus === "developing") {
      masteryBadge = `<span class="badge" style="background:var(--warning-subtle);color:var(--warning);border:1px solid var(--warning-border);">▲ Developing (${masteryPct}%)</span>`;
    } else if (masteryStatus === "needs-foundation") {
      masteryBadge = `<span class="badge" style="background:var(--danger-subtle);color:var(--danger);border:1px solid var(--danger-border);">⚠ Needs Foundation (${masteryPct}%)</span>`;
    }

    let examplesHtml = "";
    if (topic.examples && topic.examples.length > 0) {
      topic.examples.forEach((ex, exIdx) => {
        examplesHtml += `
          <div class="example-card">
            <div class="example-header">
              <span>Example ${exIdx + 1}: ${ex.concept || 'Worked Problem'}</span>
              <span class="badge badge-med">Worked Solution</span>
            </div>
            <div class="example-body">
              <div style="font-weight:700;font-size:14.5px;margin-bottom:10px;">${ex.question}</div>
              <div class="example-step">
                <span class="step-label">Thinking Algorithm:</span>
                <div style="font-size:13.5px;color:var(--text-secondary);">${ex.thinking}</div>
              </div>
              <div class="example-step">
                <span class="step-label">Step-by-Step Solution:</span>
                <div style="font-size:13.5px;white-space:pre-line;color:var(--text-secondary);">${ex.solution}</div>
              </div>
              <div style="margin-top:10px;font-weight:700;font-size:14px;color:var(--primary);">
                Final Answer: ${ex.answer}
              </div>
              ${ex.shortcut ? `
                <div class="example-shortcut">
                  <strong>⚡ JEE Shortcut:</strong> ${ex.shortcut}
                </div>
              ` : ''}
              ${ex.commonMistake ? `
                <div style="margin-top:8px;font-size:12.5px;color:var(--danger);font-weight:600;">
                  ⚠️ Common Mistake: ${ex.commonMistake}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      });
    }

    let guidedHtml = "";
    if (topic.guidedPractice && topic.guidedPractice.length > 0) {
      topic.guidedPractice.forEach((gp, gpIdx) => {
        guidedHtml += `
          <div class="guided-box">
            <div style="font-weight:700;font-size:14.5px;color:var(--text-primary);margin-bottom:8px;">
              Guided Practice ${gpIdx + 1}: ${gp.question}
            </div>
            <div style="display:flex;gap:10px;margin-top:10px;">
              <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleHint('${topicId}-hint-${gpIdx}')">
                💡 Need a Hint?
              </button>
              <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleHint('${topicId}-sol-${gpIdx}')">
                🔍 Show Solution
              </button>
            </div>
            <div id="${topicId}-hint-${gpIdx}" class="hint-collapsible">
              <strong>Hint:</strong> ${gp.hint}
            </div>
            <div id="${topicId}-sol-${gpIdx}" class="hint-collapsible" style="border-left:3px solid var(--success);">
              <strong>Solution:</strong> ${gp.solution}
            </div>
          </div>
        `;
      });
    }

    let testHtml = "";
    if (topic.topicTest && topic.topicTest.length > 0) {
      testHtml += `
        <div style="margin-top:20px;border-top:1px dashed var(--border-subtle);padding-top:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <h4 style="font-size:16px;font-weight:800;">Topic Test — ${topic.number} (${topic.topicTest.length} Questions)</h4>
            <span style="font-size:12px;color:var(--text-muted);">Instant Feedback</span>
          </div>
      `;

      topic.topicTest.forEach((q, qIdx) => {
        testHtml += `
          <div class="question-card" id="card-${q.id}">
            <div class="question-prompt">
              Q${qIdx + 1}. ${q.question}
            </div>
            <div class="option-list" id="opts-${q.id}">
        `;
        q.options.forEach((opt, optIdx) => {
          testHtml += `
            <div class="option-item" id="opt-${q.id}-${optIdx}" onclick="ChapterRunner.selectTopicOption('${topic.id}', '${q.id}', ${optIdx}, ${q.answer})">
              <span class="option-marker">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </div>
          `;
        });
        testHtml += `
            </div>
            <div class="question-feedback" id="feedback-${q.id}"></div>
          </div>
        `;
      });

      testHtml += `
        <div style="text-align:right;margin-top:12px;">
          <button class="btn-primary" onclick="ChapterRunner.calculateTopicMastery('${topic.id}', '${currentChapter.id}', '${topic.number}', '${topic.title.replace(/'/g, "\\'")}')">
            Submit Topic Test & Calculate Mastery
          </button>
        </div>
        <div id="mastery-box-${topic.id}" style="display:none;"></div>
      </div>
      `;
    }

    return `
      <div class="card" id="topic-${topic.id}" style="margin-bottom:30px;scroll-margin-top:80px;">
        <!-- Topic Header -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;border-bottom:1px solid var(--border-subtle);padding-bottom:14px;margin-bottom:16px;">
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:0.04em;">
              Topic ${topic.number} of Chapter ${currentChapter.number}
            </div>
            <h2 style="font-size:20px;font-weight:800;color:var(--text-primary);margin-top:2px;">
              ${topic.title}
            </h2>
          </div>
          <div id="mastery-badge-${topic.id}">
            ${masteryBadge}
          </div>
        </div>

        <!-- Why You Are Learning This -->
        ${topic.whyMatters ? `
          <div class="callout-box callout-why">
            <strong>🎯 Why are you learning this?</strong> ${topic.whyMatters}
          </div>
        ` : ''}

        <!-- 3-Layer Concept Explanation -->
        <div class="concept-layer-container">
          <div class="concept-layer layer-1">
            <span class="layer-tag">Level 1 — Simple Intuitive Concept</span>
            <div style="font-size:14px;color:var(--text-primary);">${topic.lesson.simple}</div>
          </div>

          <div class="concept-layer layer-2">
            <span class="layer-tag">Level 2 — Formal Chemistry Explanation</span>
            <div style="font-size:14px;color:var(--text-primary);">${topic.lesson.formal}</div>
          </div>

          <div class="concept-layer layer-3">
            <span class="layer-tag">Level 3 — JEE Main Perspective & Traps</span>
            <div style="font-size:14px;color:var(--text-primary);">${topic.lesson.jee}</div>
          </div>
        </div>

        <!-- You Will Use This Later -->
        ${topic.useLaterIn && topic.useLaterIn.length > 0 ? `
          <div class="callout-box callout-later">
            <strong>🔗 You will use this later in:</strong> ${topic.useLaterIn.join(" • ")}
          </div>
        ` : ''}

        <!-- Worked Examples -->
        ${examplesHtml}

        <!-- Guided Practice -->
        ${guidedHtml}

        <!-- Topic Test -->
        ${testHtml}

        <!-- Topic Footer Navigation -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;border-top:1px solid var(--border-subtle);padding-top:14px;">
          ${index > 0 ? `
            <a href="#topic-${currentChapter.topics[index - 1].id}" class="btn-secondary" style="font-size:13px;">
              ← Topic ${currentChapter.topics[index - 1].number}
            </a>
          ` : `<span></span>`}

          ${index < totalTopics - 1 ? `
            <a href="#topic-${currentChapter.topics[index + 1].id}" class="btn-primary" style="font-size:13px;">
              Next: Topic ${currentChapter.topics[index + 1].number} →
            </a>
          ` : `
            <a href="#chapter-summary-mount" class="btn-primary" style="font-size:13px;">
              Go to Chapter Summary & Test →
            </a>
          `}
        </div>
      </div>
    `;
  }

  function toggleHint(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("open");
    }
  }

  // Topic test option tracking
  const selectedOptions = {}; // qId -> optIdx

  function selectTopicOption(topicId, qId, chosenIdx, correctIdx) {
    selectedOptions[qId] = chosenIdx;
    const parent = document.getElementById(`opts-${qId}`);
    if (!parent) return;

    // Remove previous selection styling
    const items = parent.querySelectorAll(".option-item");
    items.forEach((item, idx) => {
      item.classList.remove("selected");
      if (idx === chosenIdx) item.classList.add("selected");
    });
  }

  function calculateTopicMastery(topicId, chapterId, topicNum, topicTitle) {
    const topic = currentChapter.topics.find(t => t.id === topicId);
    if (!topic || !topic.topicTest) return;

    let score = 0;
    const total = topic.topicTest.length;

    topic.topicTest.forEach(q => {
      const chosen = selectedOptions[q.id];
      const fb = document.getElementById(`feedback-${q.id}`);
      const card = document.getElementById(`card-${q.id}`);

      if (chosen === undefined) {
        if (fb) {
          fb.className = "question-feedback show feedback-incorrect";
          fb.innerHTML = `⚠️ Not attempted! Correct option was <strong>${String.fromCharCode(65 + q.answer)}</strong>.<br>${q.explanation}`;
        }
        if (window.CourseStorage) {
          window.CourseStorage.recordQuestionAttempt(q, -1, false, chapterId, topicId);
        }
      } else if (chosen === q.answer) {
        score += 1;
        const optEl = document.getElementById(`opt-${q.id}-${chosen}`);
        if (optEl) optEl.classList.add("correct");
        if (fb) {
          fb.className = "question-feedback show feedback-correct";
          fb.innerHTML = `✓ <strong>Correct!</strong> ${q.explanation}`;
        }
        if (window.CourseStorage) {
          window.CourseStorage.recordQuestionAttempt(q, chosen, true, chapterId, topicId);
        }
      } else {
        const wrongOptEl = document.getElementById(`opt-${q.id}-${chosen}`);
        const rightOptEl = document.getElementById(`opt-${q.id}-${q.answer}`);
        if (wrongOptEl) wrongOptEl.classList.add("incorrect");
        if (rightOptEl) rightOptEl.classList.add("correct");
        if (fb) {
          fb.className = "question-feedback show feedback-incorrect";
          fb.innerHTML = `✕ <strong>Incorrect.</strong> You chose ${String.fromCharCode(65 + chosen)}. Correct is <strong>${String.fromCharCode(65 + q.answer)}</strong>.<br>${q.explanation}`;
        }
        if (window.CourseStorage) {
          window.CourseStorage.recordQuestionAttempt(q, chosen, false, chapterId, topicId);
        }
      }
    });

    const masteryObj = window.CourseStorage.setTopicMastery(topicId, score, total, chapterId, topicNum, topicTitle);
    
    // Show mastery result banner
    const mBox = document.getElementById(`mastery-box-${topicId}`);
    if (mBox) {
      mBox.style.display = "block";
      let statusClass = "mastery-3";
      let statusText = "Mastered 🎉";
      let tip = "Outstanding work! You have mastered this concept and can confidently proceed.";

      if (masteryObj.pct < 50) {
        statusClass = "mastery-0";
        statusText = "Needs Foundation (Review Recommended)";
        tip = "Don't rush ahead. Review these concepts first before continuing to the next topic.";
      } else if (masteryObj.pct < 70) {
        statusClass = "mastery-1";
        statusText = "Developing";
        tip = "Good effort, but review the explanation of missed questions to solidify this concept.";
      } else if (masteryObj.pct < 85) {
        statusClass = "mastery-2";
        statusText = "Good Concept Grasp";
        tip = "Solid understanding! Continue forward.";
      }

      mBox.innerHTML = `
        <div class="mastery-meter ${statusClass}">
          <div>
            <div style="font-weight:800;font-size:16px;">Topic Score: ${score}/${total} (${masteryObj.pct}%) — ${statusText}</div>
            <div style="font-size:13px;margin-top:2px;">${tip}</div>
          </div>
          <div style="display:flex;gap:8px;">
            <a href="#topic-${topicId}" class="btn-secondary" style="font-size:12.5px;">Review Topic</a>
            <button class="btn-primary" style="font-size:12.5px;" onclick="ChapterRunner.retryTopicTest('${topicId}')">Retry Test</button>
          </div>
        </div>
      `;
    }

    // Update chapter progress
    updateChapterProgress();
  }

  function retryTopicTest(topicId) {
    const topic = currentChapter.topics.find(t => t.id === topicId);
    if (!topic || !topic.topicTest) return;

    topic.topicTest.forEach(q => {
      delete selectedOptions[q.id];
      const fb = document.getElementById(`feedback-${q.id}`);
      if (fb) {
        fb.className = "question-feedback";
        fb.innerHTML = "";
      }
      for (let i = 0; i < q.options.length; i++) {
        const o = document.getElementById(`opt-${q.id}-${i}`);
        if (o) o.className = "option-item";
      }
    });

    const mBox = document.getElementById(`mastery-box-${topicId}`);
    if (mBox) mBox.style.display = "none";
  }

  function updateChapterProgress() {
    if (!currentChapter || !currentChapter.topics) return;
    const s = window.CourseStorage.getState();
    let completedCount = 0;

    currentChapter.topics.forEach(t => {
      if (s.completedTopics[t.id]) completedCount += 1;
    });

    const pct = Math.round((completedCount / currentChapter.topics.length) * 100);
    const txt = document.getElementById("chapter-pct-text");
    const fill = document.getElementById("chapter-pct-fill");

    if (txt) txt.textContent = `${completedCount}/${currentChapter.topics.length} Topics Mastered (${pct}%)`;
    if (fill) fill.style.width = `${pct}%`;
  }

  function renderChapterSummaryHTML(ch) {
    if (!ch.summary) return "";
    return `
      <div class="card" id="chapter-summary-mount" style="margin-top:30px;">
        <h3 style="font-size:19px;font-weight:800;margin-bottom:14px;">Chapter ${ch.number} Comprehensive Summary</h3>
        
        <div style="margin-bottom:14px;">
          <h5 style="font-size:13px;font-weight:700;color:var(--primary);text-transform:uppercase;">What You Learned</h5>
          <ul style="margin-left:18px;margin-top:6px;font-size:14px;color:var(--text-secondary);">
            ${ch.summary.whatYouLearned.map(item => `<li style="margin-bottom:4px;">${item}</li>`).join("")}
          </ul>
        </div>

        ${ch.summary.importantDefinitions ? `
          <div style="margin-bottom:14px;">
            <h5 style="font-size:13px;font-weight:700;color:var(--purple);text-transform:uppercase;">Important Definitions</h5>
            <ul style="margin-left:18px;margin-top:6px;font-size:14px;color:var(--text-secondary);">
              ${ch.summary.importantDefinitions.map(item => `<li style="margin-bottom:4px;">${item}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        ${ch.summary.importantRules ? `
          <div style="margin-bottom:14px;">
            <h5 style="font-size:13px;font-weight:700;color:var(--warning);text-transform:uppercase;">Key Rules & Formulas</h5>
            <ul style="margin-left:18px;margin-top:6px;font-size:14px;color:var(--text-secondary);">
              ${ch.summary.importantRules.map(item => `<li style="margin-bottom:4px;">${item}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        ${ch.summary.commonTraps ? `
          <div style="margin-bottom:14px;">
            <h5 style="font-size:13px;font-weight:700;color:var(--danger);text-transform:uppercase;">Common JEE Traps to Avoid</h5>
            <ul style="margin-left:18px;margin-top:6px;font-size:14px;color:var(--text-secondary);">
              ${ch.summary.commonTraps.map(item => `<li style="margin-bottom:4px;">${item}</li>`).join("")}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderMindMapHTML(ch) {
    if (!ch.mindMap) return "";
    return `
      <div class="card" style="margin-top:20px;">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:10px;">Visual Mind Map — ${ch.mindMap.title}</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">Structured conceptual hierarchy connecting all principles of this chapter.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
          ${ch.mindMap.branches.map(branch => `
            <div style="background:var(--bg-card-subtle);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:14px;">
              <div style="font-weight:800;font-size:14px;color:var(--primary);margin-bottom:8px;">${branch.title}</div>
              <ul style="margin-left:16px;font-size:13px;color:var(--text-secondary);">
                ${branch.nodes.map(node => `<li style="margin-bottom:4px;">${node}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderChapterTestHTML(ch) {
    if (!ch.chapterTest || ch.chapterTest.length === 0) return "";
    return `
      <div class="card" id="chapter-test-mount" style="margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <h3 style="font-size:19px;font-weight:800;">Chapter ${ch.number} Test Simulator</h3>
            <div style="font-size:13.5px;color:var(--text-muted);">
              ${ch.chapterTest.length} Questions • Mixed Difficulty • Timed (90s / Question)
            </div>
          </div>
          <button class="btn-primary" onclick="ChapterRunner.startChapterTest()">
            Start Chapter Test
          </button>
        </div>
        <div id="chapter-test-active-box" style="display:none;margin-top:20px;"></div>
      </div>
    `;
  }

  function startChapterTest() {
    const ch = currentChapter;
    if (!ch || !ch.chapterTest) return;

    const box = document.getElementById("chapter-test-active-box");
    if (!box) return;
    box.style.display = "block";

    activeTest = {
      questions: ch.chapterTest,
      currentIndex: 0,
      userAnswers: {},
      markedForReview: {},
      timeLeft: ch.chapterTest.length * 90,
      timerId: null
    };

    activeTest.timerId = setInterval(() => {
      activeTest.timeLeft -= 1;
      const tEl = document.getElementById("ctest-timer");
      if (tEl) {
        const m = Math.floor(activeTest.timeLeft / 60);
        const s = activeTest.timeLeft % 60;
        tEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
      if (activeTest.timeLeft <= 0) {
        clearInterval(activeTest.timerId);
        submitChapterTest();
      }
    }, 1000);

    renderActiveTestScreen();
  }

  function renderActiveTestScreen() {
    const box = document.getElementById("chapter-test-active-box");
    if (!box || !activeTest) return;

    const q = activeTest.questions[activeTest.currentIndex];
    const total = activeTest.questions.length;

    let paletteHtml = "";
    activeTest.questions.forEach((_, idx) => {
      let stateClass = "";
      if (idx === activeTest.currentIndex) stateClass = "current";
      else if (activeTest.markedForReview[idx]) stateClass = "review";
      else if (activeTest.userAnswers[idx] !== undefined) stateClass = "answered";

      paletteHtml += `
        <button class="palette-btn ${stateClass}" onclick="ChapterRunner.gotoTestQuestion(${idx})">
          ${idx + 1}
        </button>
      `;
    });

    box.innerHTML = `
      <div class="test-sticky-bar">
        <div style="font-weight:700;font-size:14px;">Question ${activeTest.currentIndex + 1} of ${total}</div>
        <div class="test-timer" id="ctest-timer">--:--</div>
        <div>
          <button class="btn-secondary" style="padding:4px 10px;font-size:12px;" onclick="ChapterRunner.toggleMarkReview()">
            ${activeTest.markedForReview[activeTest.currentIndex] ? 'Unmark Review' : 'Mark for Review'}
          </button>
        </div>
      </div>

      <div style="margin:16px 0;">
        <div class="test-palette">${paletteHtml}</div>
      </div>

      <div class="question-card" style="margin-top:16px;">
        <div class="question-prompt">${q.question}</div>
        <div class="option-list">
          ${q.options.map((opt, optIdx) => `
            <div class="option-item ${activeTest.userAnswers[activeTest.currentIndex] === optIdx ? 'selected' : ''}" onclick="ChapterRunner.selectChapterTestOption(${optIdx})">
              <span class="option-marker">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
        <button class="btn-secondary" onclick="ChapterRunner.gotoTestQuestion(${activeTest.currentIndex - 1})" ${activeTest.currentIndex === 0 ? 'disabled' : ''}>
          ← Previous
        </button>
        <button class="btn-secondary" onclick="ChapterRunner.submitChapterTest()">
          Submit Test Early
        </button>
        <button class="btn-primary" onclick="ChapterRunner.gotoTestQuestion(${activeTest.currentIndex + 1})" ${activeTest.currentIndex === total - 1 ? 'disabled' : ''}>
          Next Question →
        </button>
      </div>
    `;
  }

  function selectChapterTestOption(optIdx) {
    if (!activeTest) return;
    activeTest.userAnswers[activeTest.currentIndex] = optIdx;
    renderActiveTestScreen();
  }

  function toggleMarkReview() {
    if (!activeTest) return;
    const cur = activeTest.currentIndex;
    activeTest.markedForReview[cur] = !activeTest.markedForReview[cur];
    renderActiveTestScreen();
  }

  function gotoTestQuestion(idx) {
    if (!activeTest) return;
    if (idx < 0 || idx >= activeTest.questions.length) return;
    activeTest.currentIndex = idx;
    renderActiveTestScreen();
  }

  function submitChapterTest() {
    if (!activeTest) return;
    clearInterval(activeTest.timerId);

    let score = 0;
    const total = activeTest.questions.length;

    activeTest.questions.forEach((q, idx) => {
      const chosen = activeTest.userAnswers[idx];
      if (chosen === q.answer) {
        score += 1;
        window.CourseStorage.recordQuestionAttempt(q, chosen, true, currentChapter.id, "chapter-test");
      } else {
        window.CourseStorage.recordQuestionAttempt(q, chosen !== undefined ? chosen : -1, false, currentChapter.id, "chapter-test");
      }
    });

    window.CourseStorage.saveChapterTestResult(currentChapter.id, score, total);
    const pct = Math.round((score / total) * 100);

    const box = document.getElementById("chapter-test-active-box");
    if (!box) return;

    box.innerHTML = `
      <div style="background:var(--bg-card);border:2px solid var(--border-focus);border-radius:var(--radius-md);padding:24px;text-align:center;">
        <div style="font-size:36px;margin-bottom:8px;">${pct >= 70 ? '🏆' : '📚'}</div>
        <h3 style="font-size:22px;font-weight:800;">Chapter Test Complete!</h3>
        <div style="font-size:18px;font-weight:700;color:var(--primary);margin:8px 0;">
          Score: ${score} / ${total} (${pct}%)
        </div>
        <p style="font-size:14px;color:var(--text-secondary);max-width:500px;margin:0 auto 16px auto;">
          ${pct >= 70 
            ? 'Congratulations! You have demonstrated strong competency in this chapter. Proceed to the next chapter.' 
            : 'Review the topics highlighted below and retry to strengthen your foundation.'}
        </p>
        <div style="display:flex;justify-content:center;gap:10px;">
          <button class="btn-secondary" onclick="ChapterRunner.startChapterTest()">Retry Test</button>
          <a href="${currentChapter.nextChapterId ? `chapter-${currentChapter.number + 1}.html` : 'dashboard.html'}" class="btn-primary">
            Continue to Next Chapter →
          </a>
        </div>
      </div>
    `;
  }

  function renderNextChapterBridgeHTML(ch) {
    const nextNum = ch.number + 1;
    const isLast = ch.number >= 25;

    return `
      <div class="card" style="margin-top:24px;background:var(--primary-subtle);border-color:var(--primary-border);">
        <div style="font-size:12px;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">
          What Comes Next?
        </div>
        <h3 style="font-size:18px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">
          ${ch.nextChapterTitle || `Chapter ${nextNum}`}
        </h3>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:16px;">
          ${ch.bridgeText}
        </p>
        <a href="${isLast ? 'mock-tests.html' : `chapter-${nextNum}.html`}" class="btn-primary">
          ${isLast ? 'Start Full Mock Tests' : `Start Chapter ${nextNum} →`}
        </a>
      </div>
    `;
  }

  return {
    render,
    toggleHint,
    selectTopicOption,
    calculateTopicMastery,
    retryTopicTest,
    startChapterTest,
    selectChapterTestOption,
    toggleMarkReview,
    gotoTestQuestion,
    submitChapterTest
  };
})();
