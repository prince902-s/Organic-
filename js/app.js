/**
 * JEE MAIN ORGANIC CHEMISTRY - CORE APPLICATION CONTROLLER
 * Injects standard sidebar, topbar, bottom nav, search modal, and theme handling.
 */

window.App = (function() {
  function init(activePageId = "") {
    setupTheme();
    renderSidebar(activePageId);
    renderMobileBottomNav(activePageId);
    renderSearchModal();
    setupKeyboardShortcuts();
    updateTopbarStats();

    // Heartbeat study time logger (increments study minutes every 60s)
    setInterval(() => {
      if (window.CourseStorage) {
        window.CourseStorage.logStudyMinutes(1);
        updateTopbarStats();
      }
    }, 60000);
  }

  function setupTheme() {
    const state = window.CourseStorage ? window.CourseStorage.getState() : { theme: "light" };
    const theme = state.theme || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    if (window.CourseStorage) {
      const s = window.CourseStorage.getState();
      s.theme = next;
      window.CourseStorage.saveState(s);
    }
  }

  function renderSidebar(activeId) {
    const el = document.getElementById("desktop-sidebar-mount");
    if (!el) return;

    const navItems = [
      { id: "dashboard", label: "Dashboard", href: "dashboard.html", icon: "📊" },
      { id: "learning-path", label: "Learning Path", href: "learning-path.html", icon: "🗺️" },
      { id: "chapter-0", label: "Chapter 0 (Foundation)", href: "chapter-0.html", icon: "🌱", badge: "0.1–0.11" },
      { id: "chapter-1", label: "Chapter 1 (Carbon)", href: "chapter-1.html", icon: "⚗️" },
      { id: "practice", label: "Practice", href: "practice.html", icon: "🎯" },
      { id: "pyqs", label: "JEE Main PYQs", href: "pyqs.html", icon: "⭐" },
      { id: "mock-tests", label: "Mock Tests", href: "mock-tests.html", icon: "📝" },
      { id: "revision", label: "Smart Revision", href: "revision.html", icon: "🔄" },
      { id: "mistakes", label: "Mistake Notebook", href: "mistakes.html", icon: "📓" },
      { id: "reactions", label: "Named Reactions", href: "reactions.html", icon: "🧪" },
      { id: "reagents", label: "Reagents Master", href: "reagents.html", icon: "🔬" },
      { id: "checklist", label: "Syllabus Checklist", href: "checklist.html", icon: "✅" },
      { id: "progress", label: "Progress Analytics", href: "progress.html", icon: "📈" },
      { id: "bookmarks", label: "Bookmarks", href: "bookmarks.html", icon: "🔖" },
      { id: "settings", label: "Settings", href: "settings.html", icon: "⚙️" }
    ];

    let html = `
      <div class="sidebar-header">
        <div class="app-logo-badge">JEE</div>
        <a href="dashboard.html" class="sidebar-brand">
          Organic Chemistry
          <span>Learn Zero to JEE Main</span>
        </a>
      </div>
      <div class="sidebar-nav">
        <div class="nav-section-title">Course Progression</div>
    `;

    navItems.forEach((item, index) => {
      if (index === 4) {
        html += `<div class="nav-section-title" style="margin-top:10px;">Practice & Review</div>`;
      } else if (index === 9) {
        html += `<div class="nav-section-title" style="margin-top:10px;">Reference & Tools</div>`;
      }
      const isActive = activeId === item.id ? "active" : "";
      const badgeHtml = item.badge ? `<span class="nav-badge">${item.badge}</span>` : "";
      html += `
        <a href="${item.href}" class="nav-item ${isActive}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${badgeHtml}
        </a>
      `;
    });

    html += `
      </div>
      <div style="padding:14px 18px;border-top:1px solid var(--border-subtle);font-size:12px;color:var(--text-muted);display:flex;justify-content:space-between;align-items:center;">
        <span>Theme</span>
        <button class="btn-icon" onclick="App.toggleTheme()" title="Toggle Light/Dark">🌓</button>
      </div>
    `;

    el.innerHTML = html;
  }

  function renderMobileBottomNav(activeId) {
    const el = document.getElementById("mobile-bottom-nav-mount");
    if (!el) return;

    const bnav = [
      { id: "dashboard", label: "Home", href: "dashboard.html", icon: "🏠" },
      { id: "learning-path", label: "Path", href: "learning-path.html", icon: "🗺️" },
      { id: "practice", label: "Practice", href: "practice.html", icon: "🎯" },
      { id: "pyqs", label: "PYQs", href: "pyqs.html", icon: "⭐" },
      { id: "revision", label: "Revision", href: "revision.html", icon: "🔄" }
    ];

    let html = "";
    bnav.forEach(item => {
      const active = activeId === item.id ? "active" : "";
      html += `
        <a href="${item.href}" class="bnav-item ${active}">
          <span class="icon">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `;
    });
    el.innerHTML = html;
  }

  function updateTopbarStats() {
    if (!window.CourseStorage) return;
    const stats = window.CourseStorage.getOverallStats();
    
    // Streak element
    const streakEl = document.getElementById("topbar-streak-val");
    if (streakEl) streakEl.textContent = `${stats.streakCount} Day Streak`;

    // Today study minutes element
    const studyEl = document.getElementById("topbar-study-val");
    if (studyEl) studyEl.textContent = `${stats.today.studyMinutes}m / ${stats.dailyGoalMinutes}m`;
  }

  function renderSearchModal() {
    if (document.getElementById("search-modal-backdrop")) return;

    const modal = document.createElement("div");
    modal.id = "search-modal-backdrop";
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="search-modal-content">
        <div class="search-modal-header">
          <span style="font-size:16px;">🔍</span>
          <input type="text" id="global-search-input" class="search-modal-input" placeholder="Search topics, reactions, reagents (e.g. Valency, Carbocation, Aldol, LiAlH₄)..." oninput="App.handleSearchInput(this.value)" />
          <button class="btn-icon" onclick="App.closeSearch()">✕</button>
        </div>
        <div class="search-modal-results" id="global-search-results">
          <div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13.5px;">
            Type any concept, reaction, or chapter name to instantly find it.
          </div>
        </div>
      </div>
    `;
    modal.onclick = (e) => {
      if (e.target === modal) closeSearch();
    };
    document.body.appendChild(modal);
  }

  function openSearch() {
    const m = document.getElementById("search-modal-backdrop");
    if (m) {
      m.classList.add("active");
      const inp = document.getElementById("global-search-input");
      if (inp) {
        inp.value = "";
        inp.focus();
      }
    }
  }

  function closeSearch() {
    const m = document.getElementById("search-modal-backdrop");
    if (m) m.classList.remove("active");
  }

  function handleSearchInput(query) {
    const box = document.getElementById("global-search-results");
    if (!box) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      box.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13.5px;">Type any concept, reaction, or chapter name to instantly find it.</div>`;
      return;
    }

    const results = [];

    // Search Chapters & Topics
    if (window.CHEM_CURRICULUM && window.CHEM_CURRICULUM.CHAPTERS) {
      window.CHEM_CURRICULUM.CHAPTERS.forEach(ch => {
        if (ch.title.toLowerCase().includes(q)) {
          results.push({
            title: `Chapter ${ch.number}: ${ch.title}`,
            type: "Chapter",
            href: `chapter-${ch.number}.html`
          });
        }
        if (ch.topics) {
          ch.topics.forEach(t => {
            if (t.title.toLowerCase().includes(q) || (t.lesson && t.lesson.simple.toLowerCase().includes(q))) {
              results.push({
                title: `Topic ${t.number}: ${t.title}`,
                type: `Chapter ${ch.number}`,
                href: `chapter-${ch.number}.html#topic-${t.id}`
              });
            }
          });
        }
      });
    }

    // Search Reactions
    if (window.CHEM_REACTIONS) {
      window.CHEM_REACTIONS.forEach(rxn => {
        if (rxn.name.toLowerCase().includes(q) || rxn.reagent.toLowerCase().includes(q)) {
          results.push({
            title: rxn.name,
            type: "Named Reaction",
            href: `reactions.html#${rxn.id}`
          });
        }
      });
    }

    // Search Reagents
    if (window.CHEM_REAGENTS) {
      window.CHEM_REAGENTS.forEach(rg => {
        if (rg.name.toLowerCase().includes(q) || rg.category.toLowerCase().includes(q)) {
          results.push({
            title: rg.name,
            type: rg.category,
            href: `reagents.html`
          });
        }
      });
    }

    if (results.length === 0) {
      box.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);">No matches found for "${query}".</div>`;
      return;
    }

    let html = "";
    results.slice(0, 10).forEach(r => {
      html += `
        <a href="${r.href}" class="search-item" onclick="App.closeSearch()">
          <div>
            <div style="font-weight:700;font-size:14px;">${r.title}</div>
            <div style="font-size:11.5px;color:var(--text-muted);">${r.type}</div>
          </div>
          <span style="font-size:12px;color:var(--primary);font-weight:700;">Open →</span>
        </a>
      `;
    });
    box.innerHTML = html;
  }

  function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape") {
        closeSearch();
      }
    });
  }

  return {
    init,
    toggleTheme,
    openSearch,
    closeSearch,
    handleSearchInput
  };
})();
