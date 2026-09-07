/**
 * JEE MAIN ORGANIC CHEMISTRY - PEDAGOGICAL CHAPTER RUNNER ENGINE
 * Standardized single-topic focus & natural teacher flow:
 * Topic Header → Teaching Explanation (with inline dotted-underline definitions) → Key Idea
 * → Worked Examples (Algorithm, Solution, Shortcut, Mistake) → Common Mistake Warning
 * → Guided Practice (Interactive Hint & Solution) → Remember / Quick Recap
 * → Topic Test (5 questions with instant feedback & explanations) → Mastery Calculation
 * → Topic Stepper & Sequential Navigation
 * + Chapter Summary, Mind Map, Timed Chapter Test with Palette, Chapter PYQs, and Next Chapter Bridge.
 */

window.ChapterRunner = (function() {
  let currentChapter = null;
  let activeTopicIndex = 0; // 0 to topics.length - 1, or 'summary'
  let activeTest = null; // for chapter test simulator
  const selectedTopicOptions = {}; // qId -> optIdx

  // Format chemical notation: CO2 -> CO<sub>2</sub>, H2O -> H<sub>2</sub>O, etc.
  function formatChemistry(text) {
    if (!text || typeof text !== "string") return text;
    let s = text;
    // Common chemical species subscripts and superscripts
    s = s.replace(/\bCO2\b/g, "CO<sub>2</sub>")
         .replace(/\bH2O\b/g, "H<sub>2</sub>O")
         .replace(/\bCH4\b/g, "CH<sub>4</sub>")
         .replace(/\bC2H6\b/g, "C<sub>2</sub>H<sub>6</sub>")
         .replace(/\bC3H8\b/g, "C<sub>3</sub>H<sub>8</sub>")
         .replace(/\bC4H10\b/g, "C<sub>4</sub>H<sub>10</sub>")
         .replace(/\bC2H4\b/g, "C<sub>2</sub>H<sub>4</sub>")
         .replace(/\bC2H2\b/g, "C<sub>2</sub>H<sub>2</sub>")
         .replace(/\bNH3\b/g, "NH<sub>3</sub>")
         .replace(/\bNH4\+/g, "NH<sub>4</sub><sup>+</sup>")
         .replace(/\bOH\-/g, "OH<sup>-</sup>")
         .replace(/\bH3O\+/g, "H<sub>3</sub>O<sup>+</sup>")
         .replace(/\bO2\b/g, "O<sub>2</sub>")
         .replace(/\bN2\b/g, "N<sub>2</sub>")
         .replace(/\bH2\b/g, "H<sub>2</sub>")
         .replace(/\bCl2\b/g, "Cl<sub>2</sub>")
         .replace(/\bBr2\b/g, "Br<sub>2</sub>")
         .replace(/\bI2\b/g, "I<sub>2</sub>")
         .replace(/\bsp3\b/gi, "sp<sup>3</sup>")
         .replace(/\bsp2\b/gi, "sp<sup>2</sup>")
         .replace(/\bsp\b/gi, "sp")
         .replace(/\b1s2\b/g, "1s<sup>2</sup>")
         .replace(/\b2s2\b/g, "2s<sup>2</sup>")
         .replace(/\b2p2\b/g, "2p<sup>2</sup>")
         .replace(/\b2p6\b/g, "2p<sup>6</sup>");

    // Enrich with dotted-underline definitions if Definitions engine exists
    if (window.Definitions && window.Definitions.enrich) {
      s = window.Definitions.enrich(s);
    }
    return s;
  }

  function render(chapterNum) {
    if (!window.ChemDiagrams && !document.querySelector('script[src*="diagrams.js"]')) {
      const sc = document.createElement("script");
      sc.src = "js/diagrams.js";
      sc.onload = () => {
        if (currentChapter) renderView();
      };
      document.head.appendChild(sc);
    }

    if (!window.CHEM_CURRICULUM || !window.CHEM_CURRICULUM.CHAPTERS) {
      setTimeout(() => render(chapterNum), 100);
      return;
    }

    currentChapter = window.CHEM_CURRICULUM.CHAPTERS.find(c => c.number === chapterNum);
    if (!currentChapter) {
      const mount = document.getElementById("chapter-content-mount");
      if (mount) {
        mount.innerHTML = `
          <div class="card" style="text-align:center;padding:40px;">
            <h2>Chapter ${chapterNum} Not Found</h2>
            <p style="margin-top:10px;"><a href="dashboard.html" class="btn-primary">Back to Dashboard</a></p>
          </div>
        `;
      }
      return;
    }

    // Check hash for direct topic navigation (e.g. #topic-3 or #summary)
    const hash = window.location.hash;
    if (hash === "#summary" || hash === "#chapter-test") {
      activeTopicIndex = "summary";
    } else if (hash.startsWith("#topic-")) {
      const target = hash.replace("#topic-", "");
      const idx = currentChapter.topics.findIndex(t => t.id === target || t.number === target);
      if (idx >= 0) activeTopicIndex = idx;
    } else {
      activeTopicIndex = 0;
    }

    renderView();
  }

  function renderView() {
    const mount = document.getElementById("chapter-content-mount");
    if (!mount || !currentChapter) return;

    // Track learning position in storage
    const activeTopic = typeof activeTopicIndex === "number" ? currentChapter.topics[activeTopicIndex] : null;
    if (window.CourseStorage && activeTopic) {
      window.CourseStorage.updateCurrentPosition(
        currentChapter.id,
        currentChapter.number,
        activeTopic.id,
        activeTopic.number,
        activeTopic.title
      );
    }

    const totalTopics = currentChapter.topics ? currentChapter.topics.length : 0;
    const completedCount = getCompletedTopicsCount();
    const chapterPct = totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100);

    let html = `
      <!-- Chapter Breadcrumb & Main Header (Section 44) -->
      <div style="margin-bottom:16px;">
        <div class="topbar-title-crumb" style="margin-bottom:8px;">
          <a href="dashboard.html">Course</a> <span>›</span>
          <a href="learning-path.html">Chapters</a> <span>›</span>
          <span style="color:var(--text-primary);">Chapter ${currentChapter.number}</span>
        </div>
        
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span class="badge badge-vhigh">Chapter ${currentChapter.number}</span>
              <span style="font-size:13px;font-weight:700;color:var(--text-muted);">${currentChapter.ncert || 'JEE Main'}</span>
            </div>
            <h1 style="font-size:24px;font-weight:800;color:var(--text-primary);letter-spacing:-0.02em;">
              ${currentChapter.title}
            </h1>
            <p style="font-size:14px;color:var(--text-muted);margin-top:4px;">
              ${currentChapter.subtitle || currentChapter.whyImportant || ''}
            </p>
          </div>

          <!-- Quick Progress Badge -->
          <div style="text-align:right;min-width:140px;">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:4px;">
              ${completedCount}/${totalTopics} Topics Completed
            </div>
            <div class="progress-bar-container" style="height:6px;width:140px;">
              <div class="progress-bar-fill" style="width: ${chapterPct}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Topic Stepper / Selector Bar -->
      ${renderTopicStepperHTML(totalTopics)}

      <!-- Active View: Topic Content OR Chapter Summary & Test -->
      <div id="active-view-mount">
        ${activeTopicIndex === "summary" ? renderChapterSummaryViewHTML() : renderSingleTopicHTML(activeTopic, activeTopicIndex, totalTopics)}
      </div>
    `;

    mount.innerHTML = html;

    // Scroll to top of content smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getCompletedTopicsCount() {
    if (!currentChapter || !currentChapter.topics) return 0;
    const s = window.CourseStorage ? window.CourseStorage.getState() : { completedTopics: {} };
    let count = 0;
    currentChapter.topics.forEach(t => {
      if (s.completedTopics && s.completedTopics[t.id]) count++;
    });
    return count;
  }

  // Render horizontal topic selector buttons
  function renderTopicStepperHTML(totalTopics) {
    if (!currentChapter || !currentChapter.topics) return "";
    const s = window.CourseStorage ? window.CourseStorage.getState() : { completedTopics: {}, topicMastery: {} };

    let buttons = "";
    currentChapter.topics.forEach((t, idx) => {
      const isCurrent = activeTopicIndex === idx;
      const isDone = s.completedTopics && s.completedTopics[t.id];
      const mastery = s.topicMastery ? s.topicMastery[t.id] : null;

      let icon = "";
      if (isDone) {
        icon = `<span style="color:var(--success);font-size:11px;">✓</span>`;
      }

      buttons += `
        <button class="stepper-btn ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}"
                onclick="ChapterRunner.switchTopic(${idx})"
                title="${t.title}">
          ${icon} <span>${t.number}</span>
        </button>
      `;
    });

    const isSummaryActive = activeTopicIndex === "summary";
    buttons += `
      <button class="stepper-btn ${isSummaryActive ? 'active' : ''}"
              onclick="ChapterRunner.switchTopic('summary')"
              style="font-weight:800;border-left:2px solid var(--primary-border);">
        <span>🏁 Chapter Test & Summary</span>
      </button>
    `;

    return `
      <div class="topic-stepper-wrap">
        <span class="topic-stepper-label">Topics:</span>
        ${buttons}
      </div>
    `;
  }

  function switchTopic(target) {
    activeTopicIndex = target;
    if (typeof target === "number" && currentChapter && currentChapter.topics[target]) {
      window.location.hash = `topic-${currentChapter.topics[target].id}`;
    } else if (target === "summary") {
      window.location.hash = "summary";
    }
    renderView();
  }

  // Render a SINGLE topic following the exact 8-step pedagogical flow
  function renderSingleTopicHTML(topic, index, totalTopics) {
    if (!topic) return "";
    const topicId = topic.id;
    const mastery = window.CourseStorage ? window.CourseStorage.getTopicMastery(topicId) : null;
    const masteryPct = mastery ? mastery.pct : 0;
    const isBookmarked = window.CourseStorage ? window.CourseStorage.isBookmarked("topics", topicId) : false;
    const noteObj = window.CourseStorage ? window.CourseStorage.getNote(topicId) : null;

    // Clean mastery badge
    let masteryBadge = "";
    if (mastery) {
      let badgeClass = "badge-med";
      let statusLabel = "Learning";
      if (masteryPct >= 90) { badgeClass = "badge-vhigh"; statusLabel = "Mastered"; }
      else if (masteryPct >= 80) { badgeClass = "badge-vhigh"; statusLabel = "Strong"; }
      else if (masteryPct >= 60) { badgeClass = "badge-high"; statusLabel = "Good"; }
      masteryBadge = `<span class="badge ${badgeClass}">● ${statusLabel} (${masteryPct}%)</span>`;
    }

    // 1 & 2. Continuous Teacher Teaching Narrative
    const narrativeHtml = renderTeachingExplanation(topic);

    // 3. Key Idea Box
    const keyIdeaHtml = renderKeyIdea(topic);

    // 4. Educational Chemical Diagram (Section 8 & 55)
    const diagramHtml = window.ChemDiagrams ? window.ChemDiagrams.renderForTopic(topic, currentChapter) : "";

    // 5. Worked Examples
    const examplesHtml = renderWorkedExamples(topic);

    // 6. Common Mistake Card
    const mistakeHtml = renderCommonMistake(topic);

    // 7. Guided Practice (Try it)
    const guidedHtml = renderGuidedPractice(topic);

    // 8. Quick Recap / Remember
    const recapHtml = renderQuickRecap(topic);

    // 9. Topic Test (5 questions with instant feedback)
    const testHtml = renderTopicTest(topic);

    return `
      <div class="card" style="padding:24px 28px;margin-bottom:24px;">
        <!-- A. Topic Header (Section 8) -->
        <div style="border-bottom:1px solid var(--border-subtle);padding-bottom:16px;margin-bottom:20px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;">
            <div>
              <div style="font-size:12px;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:0.04em;">
                Topic ${index + 1} of ${totalTopics}
              </div>
              <h2 style="font-size:22px;font-weight:800;color:var(--text-primary);margin-top:2px;">
                ${topic.number} ${topic.title}
              </h2>
            </div>
            
            <div style="display:flex;align-items:center;gap:8px;">
              <span id="topic-mastery-pill-${topicId}">${masteryBadge}</span>
              <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleTopicBookmark('${topicId}', '${topic.title.replace(/'/g, "\\'")}')" id="bookmark-btn-${topicId}">
                ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
              <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleNotes('${topicId}')">
                📝 Notes
              </button>
            </div>
          </div>

          <!-- Notes Drawer -->
          <div class="topic-notes-container" id="notes-box-${topicId}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <strong style="font-size:12.5px;color:var(--text-secondary);">Your Personal Notes for Topic ${topic.number}</strong>
              <span style="font-size:11px;color:var(--text-muted);">Auto-saved locally</span>
            </div>
            <textarea class="topic-notes-textarea" id="note-input-${topicId}" placeholder="Write your personal formulas, mnemonic tricks, or key insights here..." onblur="ChapterRunner.saveNote('${topicId}')">${noteObj ? noteObj.text : ''}</textarea>
          </div>
        </div>

        <!-- B. Teaching Explanation -->
        <div class="teaching-narrative">
          ${narrativeHtml}
        </div>

        <!-- C. Key Idea Box -->
        ${keyIdeaHtml}

        <!-- D. Interactive Educational Chemical Diagram -->
        ${diagramHtml}

        <!-- E. Worked Examples -->
        ${examplesHtml}

        <!-- E. Common Mistake Warning -->
        ${mistakeHtml}

        <!-- F. Guided Practice (Try It) -->
        ${guidedHtml}

        <!-- G. Quick Recap / Remember -->
        ${recapHtml}

        <!-- H. Topic Test (5 Questions) -->
        ${testHtml}

        <!-- Sequential Navigation Footer -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:30px;border-top:1px solid var(--border-subtle);padding-top:16px;">
          ${index > 0 ? `
            <button class="btn-secondary" onclick="ChapterRunner.switchTopic(${index - 1})">
              ← Topic ${currentChapter.topics[index - 1].number}
            </button>
          ` : `<span></span>`}

          ${index < totalTopics - 1 ? `
            <button class="btn-primary" onclick="ChapterRunner.switchTopic(${index + 1})">
              Next: Topic ${currentChapter.topics[index + 1].number} →
            </button>
          ` : `
            <button class="btn-primary" onclick="ChapterRunner.switchTopic('summary')">
              Go to Chapter Summary & Test →
            </button>
          `}
        </div>
      </div>
    `;
  }

  // Generate natural teacher explanation: NO LEVEL 1/2/3 labels!
  function renderTeachingExplanation(topic) {
    if (!topic.lesson) return "";
    let html = "";

    // The intuitive concept introduction
    if (topic.lesson.simple) {
      html += `
        <div style="margin-bottom:14px;">
          <p>${formatChemistry(topic.lesson.simple)}</p>
        </div>
      `;
    }

    // The formal chemistry explanation
    if (topic.lesson.formal) {
      html += `
        <div style="margin-bottom:14px;">
          <div class="teaching-subheading">The Chemistry Explained</div>
          <p>${formatChemistry(topic.lesson.formal)}</p>
        </div>
      `;
    }

    // JEE Main perspective and key insights
    if (topic.lesson.jee) {
      html += `
        <div style="margin-bottom:14px;">
          <div class="teaching-subheading">JEE Main Perspective & Important Insights</div>
          <p>${formatChemistry(topic.lesson.jee)}</p>
        </div>
      `;
    }

    return html;
  }

  // Key Idea Card
  function renderKeyIdea(topic) {
    // Generate a punchy key idea from title and lesson
    let keyIdeaText = "";
    if (topic.lesson && topic.lesson.formal) {
      // First sentence of formal or summary of concept
      const firstSentence = topic.lesson.formal.split(". ")[0] + ".";
      keyIdeaText = firstSentence;
    } else {
      keyIdeaText = `Mastering ${topic.title} is essential for accurate problem solving and structural reasoning in JEE Main Organic Chemistry.`;
    }

    return `
      <div class="key-idea-box">
        <div class="key-idea-title">🔑 Core Principle</div>
        <div class="key-idea-content">${formatChemistry(keyIdeaText)}</div>
      </div>
    `;
  }

  // Worked Examples (Given, Thinking, Steps, Answer, Why - Section 11)
  function renderWorkedExamples(topic) {
    if (!topic.examples || topic.examples.length === 0) return "";
    let html = `<div style="margin:24px 0;"><h3 style="font-size:17px;font-weight:800;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;gap:8px;"><span>🧪</span> Worked Examples</h3>`;

    topic.examples.forEach((ex, exIdx) => {
      const whyText = ex.why || (ex.shortcut ? ex.shortcut : 'This result directly minimizes electronic strain and yields the thermodynamically preferred product.');
      html += `
        <div class="example-card">
          <div class="example-header">
            <span>Example ${exIdx + 1}: ${ex.concept || 'Application Problem'}</span>
            <span class="badge badge-med">Complete Solution</span>
          </div>
          <div class="example-body">
            <div class="example-section-block example-given">
              <strong>Given:</strong> ${formatChemistry(ex.question)}
            </div>
            
            <div class="example-section-block example-thinking">
              <strong>Thinking:</strong> ${formatChemistry(ex.thinking || 'Identify the core functional group or electronic principle to determine reactivity and stability.')}
            </div>

            <div class="example-section-block example-steps">
              <strong>Steps:</strong>
              <div style="margin-top:4px;white-space:pre-line;color:var(--text-secondary);">${formatChemistry(ex.solution)}</div>
            </div>

            <div class="example-answer-box">
              <strong>Final Answer:</strong> ${formatChemistry(ex.answer)}
            </div>

            <div class="example-why-box">
              <strong>Why This Works:</strong> ${formatChemistry(whyText)}
            </div>

            ${ex.shortcut ? `
              <div class="example-shortcut">
                <strong>⚡ JEE Main Tip / Memory Rule:</strong> ${formatChemistry(ex.shortcut)}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  }

  // Common Mistake Warning
  function renderCommonMistake(topic) {
    let mistakeText = "";
    if (topic.examples && topic.examples[0] && topic.examples[0].commonMistake) {
      mistakeText = topic.examples[0].commonMistake;
    } else if (topic.examples && topic.examples[1] && topic.examples[1].commonMistake) {
      mistakeText = topic.examples[1].commonMistake;
    }

    if (!mistakeText) return "";

    return `
      <div class="common-mistake-box">
        <div class="common-mistake-title">⚠️ Common Student Mistake</div>
        <div class="common-mistake-content">
          ${formatChemistry(mistakeText)}
        </div>
      </div>
    `;
  }

  // Guided Practice with Progressive Hints (Section 12)
  function renderGuidedPractice(topic) {
    if (!topic.guidedPractice || topic.guidedPractice.length === 0) return "";
    let html = `<div style="margin:24px 0;"><h3 style="font-size:17px;font-weight:800;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;gap:8px;"><span>✍️</span> Guided Practice (Try It Yourself)</h3>`;

    topic.guidedPractice.forEach((gp, gpIdx) => {
      const hint1Id = `${topic.id}-hint1-${gpIdx}`;
      const hint2Id = `${topic.id}-hint2-${gpIdx}`;
      const solId = `${topic.id}-sol-${gpIdx}`;

      html += `
        <div class="guided-box">
          <div style="font-weight:700;font-size:14.5px;color:var(--text-primary);margin-bottom:10px;">
            ${formatChemistry(gp.question)}
          </div>
          <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
            <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleCollapsible('${hint1Id}')">
              💡 Hint 1: Concept Direction
            </button>
            <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleCollapsible('${hint2Id}')">
              🔍 Hint 2: Reactive Step
            </button>
            <button class="btn-secondary" style="padding:6px 12px;font-size:12.5px;" onclick="ChapterRunner.toggleCollapsible('${solId}')">
              ✓ Show Full Solution
            </button>
          </div>
          <div id="${hint1Id}" class="hint-collapsible">
            <strong>Hint 1 (Concept):</strong> ${formatChemistry(gp.hint)}
          </div>
          <div id="${hint2Id}" class="hint-collapsible" style="border-left:3px solid var(--info, #3b82f6);">
            <strong>Hint 2 (Next Step):</strong> Examine how the electron pair moves or how the intermediate achieves octet or resonance stabilization before proceeding.
          </div>
          <div id="${solId}" class="hint-collapsible" style="border-left:3px solid var(--success);">
            <strong>Complete Solution:</strong> ${formatChemistry(gp.solution)}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  }

  // Quick Recap
  function renderQuickRecap(topic) {
    // Collect 3-4 key points
    const points = [];
    if (topic.lesson && topic.lesson.simple) {
      points.push(topic.lesson.simple.split(". ")[0] + ".");
    }
    if (topic.examples && topic.examples[0] && topic.examples[0].shortcut) {
      points.push(topic.examples[0].shortcut);
    }
    if (topic.lesson && topic.lesson.jee) {
      points.push(topic.lesson.jee.split(". ")[0] + ".");
    }

    if (points.length === 0) return "";

    return `
      <div class="quick-recap-box">
        <div class="quick-recap-title">📌 Remember / Quick Recap</div>
        <ul class="quick-recap-list">
          ${points.map(p => `<li>${formatChemistry(p)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  // Topic Test (5 Questions)
  function renderTopicTest(topic) {
    if (!topic.topicTest || topic.topicTest.length === 0) return "";
    let html = `
      <div style="margin-top:28px;border-top:2px solid var(--border-subtle);padding-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3 style="font-size:18px;font-weight:800;color:var(--text-primary);">Topic Test — ${topic.number}</h3>
            <div style="font-size:13px;color:var(--text-muted);">
              ${topic.topicTest.length} Questions • Instant feedback & detailed chemistry explanations
            </div>
          </div>
          <span class="badge badge-high">Immediate Feedback</span>
        </div>
    `;

    topic.topicTest.forEach((q, qIdx) => {
      html += `
        <div class="question-card" id="card-${q.id}">
          <div class="question-prompt">
            Q${qIdx + 1}. ${formatChemistry(q.question)}
          </div>
          <div class="option-list" id="opts-${q.id}">
      `;

      q.options.forEach((opt, optIdx) => {
        html += `
          <div class="option-item" id="opt-${q.id}-${optIdx}" onclick="ChapterRunner.selectTopicOption('${topic.id}', '${q.id}', ${optIdx}, ${q.answer})">
            <span class="option-marker">${String.fromCharCode(65 + optIdx)}</span>
            <span>${formatChemistry(opt)}</span>
          </div>
        `;
      });

      html += `
          </div>
          <div class="question-feedback" id="feedback-${q.id}"></div>
        </div>
      `;
    });

    html += `
      <div style="text-align:right;margin-top:16px;">
        <button class="btn-primary" onclick="ChapterRunner.calculateTopicMastery('${topic.id}', '${currentChapter.id}', '${topic.number}', '${topic.title.replace(/'/g, "\\'")}')">
          Check Answers & Calculate Topic Mastery
        </button>
      </div>
      <div id="mastery-box-${topic.id}" style="display:none;margin-top:16px;"></div>
    </div>
    `;

    return html;
  }

  // Topic option selection & immediate feedback
  function selectTopicOption(topicId, qId, chosenIdx, correctIdx) {
    selectedTopicOptions[qId] = chosenIdx;
    const parent = document.getElementById(`opts-${qId}`);
    if (!parent) return;

    // Visual selection
    const items = parent.querySelectorAll(".option-item");
    items.forEach((item, idx) => {
      item.classList.remove("selected");
      if (idx === chosenIdx) item.classList.add("selected");
    });
  }

  // Calculate topic test mastery and display the completion banner (Section 14 & 45)
  function calculateTopicMastery(topicId, chapterId, topicNum, topicTitle) {
    const topic = currentChapter.topics.find(t => t.id === topicId);
    if (!topic || !topic.topicTest) return;

    let score = 0;
    const total = topic.topicTest.length;

    topic.topicTest.forEach(q => {
      const chosen = selectedTopicOptions[q.id];
      const fb = document.getElementById(`feedback-${q.id}`);

      if (chosen === undefined) {
        if (fb) {
          fb.className = "question-feedback show feedback-incorrect";
          fb.innerHTML = `⚠️ <strong>Not Attempted!</strong> Correct answer was <strong>${String.fromCharCode(65 + q.answer)}</strong>.<br>${formatChemistry(q.explanation)}`;
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
          fb.innerHTML = `✓ <strong>Correct!</strong> ${formatChemistry(q.explanation)}`;
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
          fb.innerHTML = `✕ <strong>Incorrect.</strong> You selected (${String.fromCharCode(65 + chosen)}). Correct option is <strong>(${String.fromCharCode(65 + q.answer)})</strong>.<br>${formatChemistry(q.explanation)}`;
        }
        if (window.CourseStorage) {
          window.CourseStorage.recordQuestionAttempt(q, chosen, false, chapterId, topicId);
        }
      }
    });

    const masteryObj = window.CourseStorage.setTopicMastery(topicId, score, total, chapterId, topicNum, topicTitle);
    const pct = masteryObj.pct;

    // Display Mastery Completion Banner (Section 45)
    const mBox = document.getElementById(`mastery-box-${topicId}`);
    if (mBox) {
      mBox.style.display = "block";
      let statusText = "Mastered 🎉";
      let statusClass = "mastery-3";
      let msg = "Outstanding! You have mastered this concept and can confidently proceed.";

      if (pct >= 90) {
        statusText = "Mastered (90–100%)";
        statusClass = "mastery-3";
      } else if (pct >= 80) {
        statusText = "Strong (80–89%)";
        statusClass = "mastery-3";
        msg = "Great comprehension! You have a solid grasp of this topic.";
      } else if (pct >= 60) {
        statusText = "Good (60–79%)";
        statusClass = "mastery-2";
        msg = "Satisfactory progress. Review the questions you missed to reinforce this foundation.";
      } else if (pct >= 40) {
        statusText = "Learning (40–59%)";
        statusClass = "mastery-1";
        msg = "Developing understanding. We recommend reviewing the worked examples and retrying the test.";
      } else {
        statusText = "Needs Foundation Review (0–39%)";
        statusClass = "mastery-0";
        msg = "Foundation check recommended before advancing. Review the lesson explanation above.";
      }

      const nextTopicIdx = activeTopicIndex + 1;
      const hasNext = nextTopicIdx < currentChapter.topics.length;

      mBox.innerHTML = `
        <div class="mastery-meter ${statusClass}">
          <div>
            <div style="font-weight:800;font-size:16px;">
              Topic Score: ${score}/${total} (${pct}%) — ${statusText}
            </div>
            <div style="font-size:13px;margin-top:3px;">${msg}</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
            <button class="btn-secondary" style="font-size:12.5px;" onclick="ChapterRunner.retryTopicTest('${topicId}')">
              Retry Test
            </button>
            ${hasNext ? `
              <button class="btn-primary" style="font-size:12.5px;" onclick="ChapterRunner.switchTopic(${nextTopicIdx})">
                Continue to Topic ${currentChapter.topics[nextTopicIdx].number} →
              </button>
            ` : `
              <button class="btn-primary" style="font-size:12.5px;" onclick="ChapterRunner.switchTopic('summary')">
                Continue to Chapter Test & Summary →
              </button>
            `}
          </div>
        </div>
      `;

      // Update topic header badge
      const pill = document.getElementById(`topic-mastery-pill-${topicId}`);
      if (pill) {
        pill.innerHTML = `<span class="badge badge-vhigh">● ${statusText} (${pct}%)</span>`;
      }
    }
  }

  function retryTopicTest(topicId) {
    const topic = currentChapter.topics.find(t => t.id === topicId);
    if (!topic || !topic.topicTest) return;

    topic.topicTest.forEach(q => {
      delete selectedTopicOptions[q.id];
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

  // Collapsible toggle helper
  function toggleCollapsible(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("open");
  }

  // Notes toggle & save
  function toggleNotes(topicId) {
    const box = document.getElementById(`notes-box-${topicId}`);
    if (box) box.classList.toggle("open");
  }

  function saveNote(topicId) {
    const input = document.getElementById(`note-input-${topicId}`);
    if (input && window.CourseStorage) {
      window.CourseStorage.setNote(topicId, input.value, `Topic ${topicId}`);
    }
  }

  function toggleTopicBookmark(topicId, title) {
    if (!window.CourseStorage) return;
    const added = window.CourseStorage.toggleBookmark("topics", topicId, {
      id: topicId,
      title: title,
      chapterNum: currentChapter.number
    });
    const btn = document.getElementById(`bookmark-btn-${topicId}`);
    if (btn) {
      btn.textContent = added ? '★ Bookmarked' : '☆ Bookmark';
    }
  }

  // CHAPTER SUMMARY & TEST VIEW
  function renderChapterSummaryViewHTML() {
    const ch = currentChapter;
    return `
      <div class="card" style="padding:24px 28px;margin-bottom:24px;">
        <div style="border-bottom:1px solid var(--border-subtle);padding-bottom:16px;margin-bottom:20px;">
          <h2 style="font-size:22px;font-weight:800;color:var(--text-primary);">
            Chapter ${ch.number} — Comprehensive Summary & Test
          </h2>
          <p style="font-size:14px;color:var(--text-muted);margin-top:4px;">
            Review key takeaways, test your full chapter understanding, and bridge forward.
          </p>
        </div>

        <!-- What You Learned Checklist -->
        ${ch.summary ? `
          <div style="margin-bottom:24px;">
            <h4 style="font-size:15px;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:10px;">
              What You Learned (Key Concepts Checklist)
            </h4>
            <ul style="margin-left:20px;font-size:14px;color:var(--text-secondary);line-height:1.7;">
              ${ch.summary.whatYouLearned.map(item => `<li>${formatChemistry(item)}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        <!-- Important Rules & Formulas -->
        ${ch.summary && ch.summary.importantRules ? `
          <div style="margin-bottom:24px;background:var(--warning-subtle);border:1px solid var(--warning-border);border-left:4px solid var(--warning);padding:14px 18px;border-radius:var(--radius-sm);">
            <h4 style="font-size:14px;font-weight:800;color:var(--warning);text-transform:uppercase;margin-bottom:8px;">
              Important Rules & Formulas
            </h4>
            <ul style="margin-left:18px;font-size:13.5px;color:var(--text-primary);line-height:1.65;">
              ${ch.summary.importantRules.map(rule => `<li>${formatChemistry(rule)}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        <!-- Common Traps -->
        ${ch.summary && ch.summary.commonTraps ? `
          <div style="margin-bottom:24px;background:var(--danger-subtle);border:1px solid var(--danger-border);border-left:4px solid var(--danger);padding:14px 18px;border-radius:var(--radius-sm);">
            <h4 style="font-size:14px;font-weight:800;color:var(--danger);text-transform:uppercase;margin-bottom:8px;">
              Common JEE Traps to Avoid
            </h4>
            <ul style="margin-left:18px;font-size:13.5px;color:var(--text-primary);line-height:1.65;">
              ${ch.summary.commonTraps.map(trap => `<li>${formatChemistry(trap)}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        <!-- Chapter Mind Map -->
        ${ch.mindMap ? `
          <div style="margin-bottom:28px;">
            <h4 style="font-size:16px;font-weight:800;color:var(--text-primary);margin-bottom:12px;">
              Visual Concept Hierarchy — ${ch.mindMap.title}
            </h4>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;">
              ${ch.mindMap.branches.map(b => `
                <div style="background:var(--bg-card-subtle);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:14px;">
                  <div style="font-weight:800;font-size:14px;color:var(--primary);margin-bottom:8px;">${b.title}</div>
                  <ul style="margin-left:16px;font-size:13px;color:var(--text-secondary);line-height:1.6;">
                    ${b.nodes.map(n => `<li>${formatChemistry(n)}</li>`).join("")}
                  </ul>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ''}

        <!-- Chapter Test Simulator -->
        ${renderChapterTestHTML(ch)}

        <!-- Next Chapter Bridge -->
        ${renderNextChapterBridgeHTML(ch)}
      </div>
    `;
  }

  // Chapter Test Simulator Component
  function renderChapterTestHTML(ch) {
    if (!ch.chapterTest || ch.chapterTest.length === 0) return "";
    return `
      <div style="margin:28px 0;border-top:2px solid var(--border-subtle);padding-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <h3 style="font-size:18px;font-weight:800;color:var(--text-primary);">Chapter ${ch.number} Test Simulator</h3>
            <div style="font-size:13.5px;color:var(--text-muted);">
              ${ch.chapterTest.length} Comprehensive Questions • Mixed Difficulty • Timed (90s / Question)
            </div>
          </div>
          <button class="btn-primary" onclick="ChapterRunner.startChapterTest()">
            Start Chapter Test Simulator
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
        <div class="question-prompt">Q${activeTest.currentIndex + 1}. ${formatChemistry(q.question)}</div>
        <div class="option-list">
          ${q.options.map((opt, optIdx) => `
            <div class="option-item ${activeTest.userAnswers[activeTest.currentIndex] === optIdx ? 'selected' : ''}" onclick="ChapterRunner.selectChapterTestOption(${optIdx})">
              <span class="option-marker">${String.fromCharCode(65 + optIdx)}</span>
              <span>${formatChemistry(opt)}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;flex-wrap:wrap;gap:10px;">
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
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
          <button class="btn-secondary" onclick="ChapterRunner.startChapterTest()">Retry Test</button>
          <a href="${currentChapter.nextChapterId ? `chapter-${currentChapter.number + 1}.html` : 'dashboard.html'}" class="btn-primary">
            Continue to Next Chapter →
          </a>
        </div>
      </div>
    `;
  }

  // Next Chapter Bridge
  function renderNextChapterBridgeHTML(ch) {
    const nextNum = ch.number + 1;
    const isLast = ch.number >= 25;

    return `
      <div class="card" style="margin-top:28px;background:var(--primary-subtle);border-color:var(--primary-border);padding:20px 24px;">
        <div style="font-size:12px;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">
          What Comes Next?
        </div>
        <h3 style="font-size:18px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">
          ${ch.nextChapterTitle || `Chapter ${nextNum}`}
        </h3>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:16px;line-height:1.6;">
          ${formatChemistry(ch.bridgeText || 'Continue your structured journey into the next chapter.')}
        </p>
        <a href="${isLast ? 'mock-tests.html' : `chapter-${nextNum}.html`}" class="btn-primary">
          ${isLast ? 'Start Full Mock Tests' : `Start Chapter ${nextNum} →`}
        </a>
      </div>
    `;
  }

  return {
    render,
    switchTopic,
    toggleCollapsible,
    toggleNotes,
    saveNote,
    toggleTopicBookmark,
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
