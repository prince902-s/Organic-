/**
 * JEE MAIN ORGANIC CHEMISTRY - STATE & STORAGE ENGINE
 * Full localStorage persistence for course progress, mastery, streaks, mistakes, and reviews.
 */

window.CourseStorage = (function() {
  const STORAGE_KEY = "jee_organic_chem_master_v3";

  const defaultState = {
    currentPosition: {
      chapterId: "ch-00",
      chapterNum: 0,
      topicId: "ch00-topic01",
      topicNum: "0.1",
      title: "What Is Matter?"
    },
    topicMastery: {}, // topicId -> { score, total, pct, status: "needs-foundation"|"developing"|"good"|"mastered", date, attempts }
    completedTopics: {}, // topicId -> true
    completedChapters: {}, // chapterId -> { score, total, pct, date }
    questionAttempts: {}, // qId -> { chosen, isCorrect, timestamp, topicId, chapterId }
    mistakes: {}, // qId -> { questionObj, userChosen, correctChosen, timestamp, timesMissed }
    mistakeNotebook: {},
    bookmarks: {
      topics: [],
      questions: [],
      reactions: [],
      reagents: []
    },
    streak: {
      count: 1,
      lastDate: new Date().toISOString().split("T")[0],
      activityToday: 0
    },
    todayStats: {
      date: new Date().toISOString().split("T")[0],
      topicsCompleted: 0,
      questionsSolved: 0,
      correctCount: 0,
      studyMinutes: 14
    },
    dailyGoalMinutes: 45,
    spacedReviews: {}, // topicId -> nextReviewDate (YYYY-MM-DD)
    reviewsScheduled: {}, // topicId -> { topicTitle, intervalDays, nextReviewDate, lastReviewed }
    notes: {}, // id -> { text, timestamp, title }
    theme: "light"
  };

  function getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Object.assign({}, defaultState, parsed);
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }
    return Object.assign({}, defaultState);
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Storage save error", e);
    }
  }

  function checkDateRollover() {
    const s = getState();
    const today = new Date().toISOString().split("T")[0];
    if (s.todayStats.date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (s.streak.lastDate === yesterday && s.streak.activityToday >= 1) {
        s.streak.count += 1;
      } else if (s.streak.lastDate !== today) {
        s.streak.count = 1;
      }
      s.streak.lastDate = today;
      s.streak.activityToday = 0;
      s.todayStats = {
        date: today,
        topicsCompleted: 0,
        questionsSolved: 0,
        correctCount: 0,
        studyMinutes: 0
      };
      saveState(s);
    }
  }

  // Topic Mastery (Section 14: 0-39% Not learned, 40-59% Learning, 60-79% Good, 80-89% Strong, 90-100% Mastered)
  function setTopicMastery(topicId, score, total, chapterId, topicNum, topicTitle) {
    const s = getState();
    const pct = total === 0 ? 0 : Math.round((score / total) * 100);
    let status = "not-learned";
    if (pct >= 90) status = "mastered";
    else if (pct >= 80) status = "strong";
    else if (pct >= 60) status = "good";
    else if (pct >= 40) status = "learning";

    const prev = s.topicMastery[topicId] || { attempts: 0 };
    s.topicMastery[topicId] = {
      score,
      total,
      pct,
      status,
      chapterId,
      topicNum,
      topicTitle,
      date: Date.now(),
      attempts: prev.attempts + 1
    };

    if (pct >= 60) {
      s.completedTopics[topicId] = true;
      s.todayStats.topicsCompleted += 1;
    }

    // Schedule spaced review
    const now = new Date();
    let daysToAdd = 1;
    if (status === "mastered") daysToAdd = 4;
    else if (status === "strong") daysToAdd = 3;
    else if (status === "good") daysToAdd = 2;
    const reviewDate = new Date(now.getTime() + daysToAdd * 86400000).toISOString().split("T")[0];
    if (!s.spacedReviews) s.spacedReviews = {};
    if (!s.reviewsScheduled) s.reviewsScheduled = {};
    s.spacedReviews[topicId] = reviewDate;
    s.reviewsScheduled[topicId] = {
      topicTitle: topicTitle || `Topic ${topicNum || topicId}`,
      intervalDays: daysToAdd,
      nextReviewDate: reviewDate,
      lastReviewed: Date.now()
    };

    // Register streak activity
    s.streak.activityToday += 1;
    saveState(s);
    return s.topicMastery[topicId];
  }

  function getTopicMastery(topicId) {
    const s = getState();
    return s.topicMastery[topicId] || null;
  }

  // Question Attempts & Mistakes Notebook
  function recordQuestionAttempt(qObj, chosenIdx, isCorrect, chapterId, topicId) {
    if (!qObj) return;
    const s = getState();
    if (!s.questionAttempts) s.questionAttempts = {};
    if (!s.mistakes) s.mistakes = {};
    if (!s.todayStats) s.todayStats = { questionsSolved: 0, correctCount: 0 };

    const qId = qObj.id || (qObj.question ? "q_" + qObj.question.substring(0, 20).replace(/\W/g, "_") : "q_" + Date.now());

    s.questionAttempts[qId] = {
      chosen: chosenIdx,
      isCorrect: !!isCorrect,
      timestamp: Date.now(),
      chapterId: chapterId || qObj.chapterId || "",
      topicId: topicId || qObj.topicId || ""
    };

    s.todayStats.questionsSolved += 1;
    if (isCorrect) {
      s.todayStats.correctCount += 1;
      // If was in mistakes, remove it
      if (s.mistakes[qId]) {
        delete s.mistakes[qId];
      }
      if (s.mistakeNotebook && s.mistakeNotebook[qId]) {
        delete s.mistakeNotebook[qId];
      }
    } else {
      const prevMistake = s.mistakes[qId] || (s.mistakeNotebook && s.mistakeNotebook[qId]);
      const correctIdx = typeof qObj.answer !== "undefined" ? qObj.answer : (typeof qObj.correctAnswer !== "undefined" ? qObj.correctAnswer : 0);
      const explanationText = qObj.explanation || (qObj.solution && qObj.solution.stepByStep ? qObj.solution.stepByStep : "");

      const mistakeEntry = {
        questionId: qId,
        questionText: qObj.question || qObj.prompt || "Question on " + (topicId || chapterId || "Organic Chemistry"),
        questionObj: qObj,
        lastUserAnswer: chosenIdx,
        userChosen: chosenIdx,
        correctAnswer: correctIdx,
        correctChosen: correctIdx,
        explanation: explanationText || "Review the underlying reaction conditions and mechanism rules to prevent this error.",
        chapterId: chapterId || qObj.chapterId || "",
        topicId: topicId || qObj.topicId || "",
        firstMissedDate: prevMistake ? (prevMistake.firstMissedDate || prevMistake.timestamp) : Date.now(),
        timestamp: Date.now(),
        timesMissed: (prevMistake ? (prevMistake.timesMissed || 1) : 0) + 1
      };

      s.mistakes[qId] = mistakeEntry;
      if (!s.mistakeNotebook) s.mistakeNotebook = {};
      s.mistakeNotebook[qId] = mistakeEntry;
    }

    if (s.todayStats.questionsSolved % 5 === 0) {
      s.streak.activityToday += 1;
    }

    saveState(s);
  }

  function getMistakes() {
    const s = getState();
    const list = [];
    const source = s.mistakes || s.mistakeNotebook || {};
    Object.keys(source).forEach(qId => {
      const entry = source[qId];
      if (!entry) return;
      const q = entry.questionObj || {};
      const chosen = typeof entry.lastUserAnswer !== "undefined" ? entry.lastUserAnswer : (typeof entry.userChosen !== "undefined" ? entry.userChosen : -1);
      const correct = typeof entry.correctAnswer !== "undefined" ? entry.correctAnswer : (typeof entry.correctChosen !== "undefined" ? entry.correctChosen : (typeof q.answer !== "undefined" ? q.answer : 0));
      const exp = entry.explanation || q.explanation || (q.solution && q.solution.stepByStep ? q.solution.stepByStep : "") || "Review this topic to master the reaction rules.";
      const qText = entry.questionText || q.question || q.prompt || `Question (${qId})`;

      list.push({
        questionId: qId,
        questionText: qText,
        questionObj: q,
        lastUserAnswer: chosen,
        userChosen: chosen,
        correctAnswer: correct,
        correctChosen: correct,
        explanation: exp,
        chapterId: entry.chapterId || q.chapterId || "",
        topicId: entry.topicId || q.topicId || "",
        timesMissed: entry.timesMissed || 1,
        firstMissedDate: entry.firstMissedDate || entry.timestamp || Date.now(),
        timestamp: entry.timestamp || Date.now()
      });
    });
    list.sort((a, b) => b.timestamp - a.timestamp);
    return list;
  }

  function removeMistake(qId) {
    const s = getState();
    if (s.mistakes && s.mistakes[qId]) {
      delete s.mistakes[qId];
    }
    if (s.mistakeNotebook && s.mistakeNotebook[qId]) {
      delete s.mistakeNotebook[qId];
    }
    saveState(s);
  }

  function clearMistakes() {
    const s = getState();
    s.mistakes = {};
    s.mistakeNotebook = {};
    saveState(s);
  }

  function scheduleNextReview(topicId, title = "") {
    const s = getState();
    if (!s.reviewsScheduled) s.reviewsScheduled = {};
    if (!s.spacedReviews) s.spacedReviews = {};

    const curr = s.reviewsScheduled[topicId] || { intervalDays: 1 };
    const nextInterval = curr.intervalDays === 1 ? 3 : (curr.intervalDays === 3 ? 7 : (curr.intervalDays === 7 ? 14 : 30));
    const nextDate = new Date(Date.now() + nextInterval * 86400000).toISOString().split("T")[0];

    s.reviewsScheduled[topicId] = {
      topicTitle: title || curr.topicTitle || topicId,
      intervalDays: nextInterval,
      nextReviewDate: nextDate,
      lastReviewed: Date.now()
    };
    s.spacedReviews[topicId] = nextDate;
    s.streak.activityToday += 1;
    saveState(s);
    return s.reviewsScheduled[topicId];
  }

  // Current Position
  function updateCurrentPosition(chapterId, chapterNum, topicId, topicNum, title) {
    const s = getState();
    s.currentPosition = { chapterId, chapterNum, topicId, topicNum, title };
    saveState(s);
  }

  // Bookmarks
  function toggleBookmark(type, id, itemObj) {
    const s = getState();
    if (!s.bookmarks[type]) s.bookmarks[type] = [];
    const idx = s.bookmarks[type].findIndex(b => (typeof b === "string" ? b === id : b.id === id));
    let added = false;
    if (idx >= 0) {
      s.bookmarks[type].splice(idx, 1);
      added = false;
    } else {
      s.bookmarks[type].push(itemObj || id);
      added = true;
    }
    saveState(s);
    return added;
  }

  function isBookmarked(type, id) {
    const s = getState();
    if (!s.bookmarks[type]) return false;
    return s.bookmarks[type].some(b => (typeof b === "string" ? b === id : b.id === id));
  }

  // Chapter Test Completion
  function saveChapterTestResult(chapterId, score, total) {
    const s = getState();
    const pct = total === 0 ? 0 : Math.round((score / total) * 100);
    s.completedChapters[chapterId] = {
      score,
      total,
      pct,
      date: Date.now()
    };
    s.streak.activityToday += 1;
    saveState(s);
  }

  // Overall Statistics
  function getOverallStats(totalCurriculumTopics = 120) {
    const s = getState();
    const completedCount = Object.keys(s.completedTopics).length;
    const overallPct = totalCurriculumTopics === 0 ? 0 : Math.min(100, Math.round((completedCount / totalCurriculumTopics) * 100));

    // Weak topics calculation (<70% mastery)
    const weakTopics = [];
    Object.keys(s.topicMastery).forEach(tId => {
      const m = s.topicMastery[tId];
      if (m.pct < 70) {
        weakTopics.push({
          topicId: tId,
          chapterId: m.chapterId,
          topicNum: m.topicNum,
          topicTitle: m.topicTitle,
          pct: m.pct,
          status: m.status
        });
      }
    });

    // Spaced reviews due today
    const today = new Date().toISOString().split("T")[0];
    const reviewsDue = [];
    if (s.reviewsScheduled) {
      Object.keys(s.reviewsScheduled).forEach(tId => {
        const item = s.reviewsScheduled[tId];
        if (item && item.nextReviewDate && item.nextReviewDate <= today) {
          reviewsDue.push(tId);
        }
      });
    }
    if (s.spacedReviews) {
      Object.keys(s.spacedReviews).forEach(tId => {
        if (s.spacedReviews[tId] <= today && !reviewsDue.includes(tId)) {
          reviewsDue.push(tId);
        }
      });
    }

    return {
      overallPct,
      completedTopicsCount: completedCount,
      weakTopics,
      reviewsDueCount: reviewsDue.length,
      reviewsDueList: reviewsDue,
      streakCount: s.streak.count,
      today: s.todayStats,
      dailyGoalMinutes: s.dailyGoalMinutes,
      currentPosition: s.currentPosition
    };
  }

  // Daily study time increment
  function logStudyMinutes(mins = 1) {
    const s = getState();
    s.todayStats.studyMinutes += mins;
    saveState(s);
  }

  // Student Notes (Section 52)
  function getNote(id) {
    const s = getState();
    return (s.notes && s.notes[id]) ? s.notes[id] : null;
  }

  function setNote(id, text, title = "") {
    const s = getState();
    if (!s.notes) s.notes = {};
    if (!text || text.trim() === "") {
      delete s.notes[id];
    } else {
      s.notes[id] = {
        text: text.trim(),
        title: title || id,
        timestamp: Date.now()
      };
    }
    saveState(s);
    return s.notes[id] || null;
  }

  function getAllNotes() {
    const s = getState();
    return s.notes || {};
  }

  // Settings & Data Management
  function setDailyGoalMinutes(mins) {
    const s = getState();
    s.dailyGoalMinutes = Math.max(10, Math.min(300, parseInt(mins, 10) || 45));
    saveState(s);
  }

  function exportData() {
    const s = getState();
    return JSON.stringify(s, null, 2);
  }

  function importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === "object") {
        saveState(Object.assign({}, defaultState, parsed));
        return { success: true };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
    return { success: false, error: "Invalid JSON format" };
  }

  function resetAllData() {
    localStorage.removeItem(STORAGE_KEY);
    return defaultState;
  }

  // Init
  checkDateRollover();

  return {
    getState,
    saveState,
    getTopicMastery,
    setTopicMastery,
    recordQuestionAttempt,
    getMistakes,
    removeMistake,
    clearMistakes,
    scheduleNextReview,
    updateCurrentPosition,
    toggleBookmark,
    isBookmarked,
    saveChapterTestResult,
    getOverallStats,
    logStudyMinutes,
    getNote,
    setNote,
    getAllNotes,
    setDailyGoalMinutes,
    exportData,
    importData,
    resetAllData
  };
})();
