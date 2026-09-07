/**
 * JEE MAIN ORGANIC CHEMISTRY - CHEMICAL DIAGRAMS & VISUAL LEARNING ENGINE
 * Sharp, responsive, accessible, interactive SVG & HTML/CSS diagrams.
 * Adheres to Section 8, 55, 56 of the master prompt.
 */

window.ChemDiagrams = (function() {
  // Store diagram state (e.g. active tab in a diagram)
  const diagramStates = {};

  function setDiagramTab(diagramId, tabKey) {
    diagramStates[diagramId] = tabKey;
    const container = document.getElementById(diagramId);
    if (!container) return;

    // Update tab button classes
    const tabs = container.querySelectorAll(".diagram-tab-btn");
    tabs.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabKey) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    // Re-render SVG content inside wrapper
    const svgWrap = container.querySelector(".chem-diagram-svg-wrap");
    const captionEl = container.querySelector(".chem-diagram-caption");
    const infoEl = container.querySelector(".diagram-interactive-info");

    const renderFunc = container.getAttribute("data-renderer");
    if (renderFunc && diagramGenerators[renderFunc]) {
      const data = diagramGenerators[renderFunc](tabKey, diagramId);
      if (svgWrap && data.svg) svgWrap.innerHTML = data.svg;
      if (captionEl && data.caption) captionEl.innerHTML = data.caption;
      if (infoEl) {
        infoEl.className = "diagram-interactive-info";
        infoEl.innerHTML = "";
      }
    }
  }

  function showInteractiveInfo(diagramId, htmlContent) {
    const container = document.getElementById(diagramId);
    if (!container) return;
    const infoEl = container.querySelector(".diagram-interactive-info");
    if (infoEl) {
      infoEl.innerHTML = htmlContent;
      infoEl.classList.add("visible");
    }
  }

  // --- DIAGRAM GENERATORS ---
  const diagramGenerators = {
    // 1. ATOMIC STRUCTURE & BOHR SHELLS
    atomBohr: function(element = 'carbon', diagramId = 'diag-atom') {
      let title = "Carbon Atom (Z = 6)";
      let protons = 6, neutrons = 6, innerE = 2, outerE = 4;
      let outerLabel = "4 Valence Electrons (Tetravalent)";
      let caption = "<strong>Carbon (Z=6, 1s² 2s² 2p²):</strong> The inner K-shell contains 2 tightly held core electrons. The outer L-shell contains 4 valence electrons that undergo sp³ hybridisation to form 4 covalent bonds.";

      if (element === 'oxygen') {
        title = "Oxygen Atom (Z = 8)";
        protons = 8; neutrons = 8; innerE = 2; outerE = 6;
        outerLabel = "6 Valence Electrons (Divalent)";
        caption = "<strong>Oxygen (Z=8, 1s² 2s² 2p⁴):</strong> 6 valence electrons; shares 2 electrons to complete its octet, leaving 2 non-bonding lone pairs.";
      } else if (element === 'nitrogen') {
        title = "Nitrogen Atom (Z = 7)";
        protons = 7; neutrons = 7; innerE = 2; outerE = 5;
        outerLabel = "5 Valence Electrons (Trivalent)";
        caption = "<strong>Nitrogen (Z=7, 1s² 2s² 2p³):</strong> 5 valence electrons; forms 3 covalent bonds and retains 1 lone pair.";
      } else if (element === 'hydrogen') {
        title = "Hydrogen Atom (Z = 1)";
        protons = 1; neutrons = 0; innerE = 1; outerE = 0;
        outerLabel = "1 Valence Electron (Monovalent)";
        caption = "<strong>Hydrogen (Z=1, 1s¹):</strong> Only 1 electron in the K-shell. Shares 1 electron to achieve a stable helium duplet.";
      }

      // Generate SVG
      const w = 340, h = 260, cx = 170, cy = 130;
      let svg = `<svg viewBox="0 0 ${w} ${h}" width="100%" height="240" style="max-width:360px;" role="img" aria-label="${title}">
        <!-- Defs for gradient shading -->
        <defs>
          <radialGradient id="nucGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#b91c1c" />
          </radialGradient>
          <radialGradient id="elecGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#60a5fa" />
            <stop offset="100%" stop-color="#1d4ed8" />
          </radialGradient>
          <radialGradient id="valGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="100%" stop-color="#059669" />
          </radialGradient>
        </defs>

        <!-- K-Shell (n=1) -->
        <circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="var(--border-subtle, #cbd5e1)" stroke-width="1.5" stroke-dasharray="4,3" />
        <text x="${cx + 42}" y="${cy - 34}" font-size="10" font-weight="700" fill="var(--text-muted, #64748b)">K (n=1)</text>

        <!-- L-Shell (n=2) -->
        ${outerE > 0 ? `
          <circle cx="${cx}" cy="${cy}" r="92" fill="none" stroke="var(--primary-border, #93c5fd)" stroke-width="1.8" stroke-dasharray="5,4" />
          <text x="${cx + 80}" y="${cy - 60}" font-size="10" font-weight="700" fill="var(--primary, #2563eb)">L (Valence)</text>
        ` : ''}

        <!-- Nucleus -->
        <circle cx="${cx}" cy="${cy}" r="26" fill="url(#nucGrad)" style="cursor:pointer;" onclick="ChemDiagrams.showInteractiveInfo('${diagramId}', '<strong>Nucleus:</strong> Contains ${protons} protons (+1 charge) and ${neutrons} neutrons (0 charge). Holds 99.9% of the atomic mass.')" />
        <text x="${cx}" y="${cy - 3}" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">${protons}p⁺</text>
        <text x="${cx}" y="${cy + 10}" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">${neutrons}n⁰</text>
      `;

      // Draw K shell electrons (blue)
      for (let i = 0; i < innerE; i++) {
        const angle = (i * Math.PI) - (Math.PI / 2);
        const ex = cx + 50 * Math.cos(angle);
        const ey = cy + 50 * Math.sin(angle);
        svg += `
          <circle cx="${ex}" cy="${ey}" r="6" fill="url(#elecGrad)" style="cursor:pointer;" onclick="ChemDiagrams.showInteractiveInfo('${diagramId}', '<strong>Inner Core Electron:</strong> Tightly bound to the positive nucleus. Does not participate in organic reactions.')" />
          <text x="${ex}" y="${ey + 3}" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">-</text>
        `;
      }

      // Draw L shell electrons (green valence)
      for (let i = 0; i < outerE; i++) {
        const angle = (i * (2 * Math.PI / outerE)) - (Math.PI / 4);
        const ex = cx + 92 * Math.cos(angle);
        const ey = cy + 92 * Math.sin(angle);
        svg += `
          <circle cx="${ex}" cy="${ey}" r="7" fill="url(#valGrad)" style="cursor:pointer;" onclick="ChemDiagrams.showInteractiveInfo('${diagramId}', '<strong>Valence Electron:</strong> Outermost electron. Available for covalent sharing and bond formation.')" />
          <text x="${ex}" y="${ey + 3.5}" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">-</text>
        `;
      }

      svg += `</svg>`;
      return { svg, caption };
    },

    // 2. ORBITALS & HYBRIDISATION (s, p, sp³, sp², sp)
    orbitals: function(type = 'sp3', diagramId = 'diag-orbitals') {
      const w = 360, h = 230, cx = 180, cy = 115;
      let svg = "";
      let caption = "";

      if (type === 'sp3') {
        caption = "<strong>sp³ Hybridisation (Methane CH₄):</strong> Mixing of one 2s and three 2p orbitals yields 4 equivalent sp³ hybrid orbitals pointing to vertices of a regular tetrahedron with <strong>109.5°</strong> bond angles.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="sp3 Hybrid Orbital Tetrahedral">
            <defs>
              <radialGradient id="sp3Lobe" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#1e40af" />
              </radialGradient>
            </defs>
            <!-- Central Carbon -->
            <circle cx="${cx}" cy="${cy}" r="14" fill="#0f172a" />
            <text x="${cx}" y="${cy + 5}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>

            <!-- Lobe 1 (Top) -->
            <ellipse cx="${cx}" cy="${cy - 48}" rx="18" ry="34" fill="url(#sp3Lobe)" opacity="0.9" />
            <circle cx="${cx}" cy="${cy - 78}" r="11" fill="#f8fafc" stroke="#3b82f6" stroke-width="1.8" />
            <text x="${cx}" y="${cy - 74}" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle">H</text>

            <!-- Lobe 2 (Bottom Right) -->
            <g transform="rotate(110, ${cx}, ${cy})">
              <ellipse cx="${cx}" cy="${cy - 48}" rx="18" ry="34" fill="url(#sp3Lobe)" opacity="0.9" />
              <circle cx="${cx}" cy="${cy - 78}" r="11" fill="#f8fafc" stroke="#3b82f6" stroke-width="1.8" />
              <text x="${cx}" y="${cy - 74}" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle">H</text>
            </g>

            <!-- Lobe 3 (Bottom Left) -->
            <g transform="rotate(-110, ${cx}, ${cy})">
              <ellipse cx="${cx}" cy="${cy - 48}" rx="18" ry="34" fill="url(#sp3Lobe)" opacity="0.9" />
              <circle cx="${cx}" cy="${cy - 78}" r="11" fill="#f8fafc" stroke="#3b82f6" stroke-width="1.8" />
              <text x="${cx}" y="${cy - 74}" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle">H</text>
            </g>

            <!-- Lobe 4 (Wedge-Forward) -->
            <g transform="rotate(180, ${cx}, ${cy})">
              <ellipse cx="${cx}" cy="${cy - 44}" rx="16" ry="28" fill="#60a5fa" opacity="0.85" />
              <circle cx="${cx}" cy="${cy - 68}" r="11" fill="#f8fafc" stroke="#3b82f6" stroke-width="1.8" />
              <text x="${cx}" y="${cy - 64}" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle">H</text>
            </g>

            <!-- Angle Indicator -->
            <path d="M ${cx + 15} ${cy - 20} A 25 25 0 0 1 ${cx + 30} ${cy + 10}" fill="none" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="3,2" />
            <text x="${cx + 42}" y="${cy - 12}" font-size="11" font-weight="bold" fill="#e11d48">109.5°</text>
          </svg>
        `;
      } else if (type === 'sp2') {
        caption = "<strong>sp² Hybridisation (Ethene C₂H₄):</strong> 3 sp² hybrid orbitals in a single plane at <strong>120°</strong> bond angles forming σ-bonds, with 1 unhybridized 2p orbital perpendicular forming a lateral π-bond.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="sp2 Trigonal Planar">
            <defs>
              <radialGradient id="sp2Lobe" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#047857" />
              </radialGradient>
            </defs>
            <!-- Central Carbon -->
            <circle cx="${cx}" cy="${cy}" r="14" fill="#0f172a" />
            <text x="${cx}" y="${cy + 5}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>

            <!-- 3 sp2 lobes at 120 deg -->
            <!-- Lobe 1 (Right) -->
            <g transform="rotate(0, ${cx}, ${cy})">
              <ellipse cx="${cx + 48}" cy="${cy}" rx="34" ry="16" fill="url(#sp2Lobe)" opacity="0.85" />
            </g>
            <!-- Lobe 2 (Top-Left 120) -->
            <g transform="rotate(120, ${cx}, ${cy})">
              <ellipse cx="${cx + 48}" cy="${cy}" rx="34" ry="16" fill="url(#sp2Lobe)" opacity="0.85" />
            </g>
            <!-- Lobe 3 (Bottom-Left 240) -->
            <g transform="rotate(240, ${cx}, ${cy})">
              <ellipse cx="${cx + 48}" cy="${cy}" rx="34" ry="16" fill="url(#sp2Lobe)" opacity="0.85" />
            </g>

            <!-- Unhybridized p-orbital (vertical dumbbell, purple) -->
            <ellipse cx="${cx}" cy="${cy - 48}" rx="14" ry="32" fill="#8b5cf6" opacity="0.75" />
            <ellipse cx="${cx}" cy="${cy + 48}" rx="14" ry="32" fill="#a855f7" opacity="0.75" />
            <text x="${cx + 20}" y="${cy - 50}" font-size="10" font-weight="bold" fill="#7c3aed">p-orbital (π)</text>

            <!-- Angle label -->
            <text x="${cx - 75}" y="${cy - 20}" font-size="11" font-weight="bold" fill="#047857">120° (Trigonal Planar)</text>
          </svg>
        `;
      } else if (type === 'sp') {
        caption = "<strong>sp Hybridisation (Ethyne C₂H₂):</strong> 2 linear sp hybrid orbitals at <strong>180°</strong> forming σ-bonds, with two mutually perpendicular unhybridized p-orbitals (py, pz) forming 2 π-bonds.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="sp Linear">
            <!-- Central Carbon -->
            <circle cx="${cx}" cy="${cy}" r="14" fill="#0f172a" />
            <text x="${cx}" y="${cy + 5}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>

            <!-- Linear sp Lobes (Left & Right) -->
            <ellipse cx="${cx - 52}" cy="${cy}" rx="38" ry="17" fill="#f59e0b" opacity="0.9" />
            <ellipse cx="${cx + 52}" cy="${cy}" rx="38" ry="17" fill="#f59e0b" opacity="0.9" />

            <!-- Pz orbital (Vertical, Blue) -->
            <ellipse cx="${cx}" cy="${cy - 48}" rx="13" ry="30" fill="#3b82f6" opacity="0.7" />
            <ellipse cx="${cx}" cy="${cy + 48}" rx="13" ry="30" fill="#3b82f6" opacity="0.7" />

            <!-- Py orbital (Tilted, Violet) -->
            <g transform="rotate(45, ${cx}, ${cy})">
              <ellipse cx="${cx}" cy="${cy - 48}" rx="12" ry="28" fill="#8b5cf6" opacity="0.6" />
              <ellipse cx="${cx}" cy="${cy + 48}" rx="12" ry="28" fill="#8b5cf6" opacity="0.6" />
            </g>

            <text x="${cx}" y="${cy - 86}" font-size="11" font-weight="bold" fill="#b45309" text-anchor="middle">180° Linear Geometry</text>
          </svg>
        `;
      } else {
        // s and p atomic orbitals
        caption = "<strong>Pure Atomic Orbitals:</strong> The <strong>s-orbital</strong> is spherically symmetrical with zero angular nodes. The <strong>p-orbitals (px, py, pz)</strong> are dumbbell-shaped with two lobes of opposite phase separated by a nodal plane.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="s and p atomic orbitals">
            <!-- s orbital -->
            <circle cx="90" cy="115" r="42" fill="#60a5fa" opacity="0.8" />
            <circle cx="90" cy="115" r="4" fill="#0f172a" />
            <text x="90" y="178" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">2s Orbital (Spherical)</text>

            <!-- Divider -->
            <line x1="180" y1="30" x2="180" y2="190" stroke="var(--border-subtle, #cbd5e1)" stroke-dasharray="3,3" />

            <!-- px orbital -->
            <ellipse cx="236" cy="115" rx="30" ry="16" fill="#34d399" opacity="0.85" />
            <ellipse cx="304" cy="115" rx="30" ry="16" fill="#10b981" opacity="0.85" />
            <circle cx="270" cy="115" r="4" fill="#0f172a" />
            <text x="270" y="178" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">2px Orbital (Dumbbell)</text>
          </svg>
        `;
      }

      return { svg, caption };
    },

    // 3. CHEMICAL BONDING & LEWIS OCTET SHARING
    bondingSharing: function(molecule = 'methane', diagramId = 'diag-bonding') {
      const w = 340, h = 240, cx = 170, cy = 120;
      let svg = "";
      let caption = "";

      if (molecule === 'water') {
        caption = "<strong>Water (H₂O):</strong> Oxygen has 6 valence electrons; it shares 2 with two Hydrogen atoms, leaving <strong>2 non-bonding lone pairs</strong> that compress the bond angle to <strong>104.5°</strong> (Bent shape).";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="Lewis structure of Water">
            <!-- Central Oxygen -->
            <circle cx="${cx}" cy="${cy}" r="22" fill="#ef4444" />
            <text x="${cx}" y="${cy + 6}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">O</text>

            <!-- Lone pairs on Oxygen (top) -->
            <circle cx="${cx - 8}" cy="${cy - 34}" r="3.5" fill="#3b82f6" />
            <circle cx="${cx + 8}" cy="${cy - 34}" r="3.5" fill="#3b82f6" />
            <circle cx="${cx - 28}" cy="${cy - 16}" r="3.5" fill="#3b82f6" />
            <circle cx="${cx - 28}" cy="${cy - 3}" r="3.5" fill="#3b82f6" />
            <text x="${cx}" y="${cy - 44}" font-size="10" font-weight="bold" fill="#1d4ed8" text-anchor="middle">2 Lone Pairs</text>

            <!-- Bond to H1 -->
            <line x1="${cx - 16}" y1="${cy + 16}" x2="${cx - 55}" y2="${cy + 55}" stroke="#0f172a" stroke-width="3.5" />
            <circle cx="${cx - 65}" cy="${cy + 65}" r="15" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx - 65}" y="${cy + 70}" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <!-- Bond to H2 -->
            <line x1="${cx + 16}" y1="${cy + 16}" x2="${cx + 55}" y2="${cy + 55}" stroke="#0f172a" stroke-width="3.5" />
            <circle cx="${cx + 65}" cy="${cy + 65}" r="15" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx + 65}" y="${cy + 70}" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <!-- Angle label -->
            <path d="M ${cx - 22} ${cy + 25} A 28 28 0 0 0 ${cx + 22} ${cy + 25}" fill="none" stroke="#e11d48" stroke-width="1.8" />
            <text x="${cx}" y="${cy + 42}" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">104.5° (Bent)</text>
          </svg>
        `;
      } else if (molecule === 'ammonia') {
        caption = "<strong>Ammonia (NH₃):</strong> Nitrogen shares 3 valence electrons with three H atoms, retaining <strong>1 lone pair</strong> at the apex. The geometry is <strong>trigonal pyramidal</strong> (bond angle ~107°).";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="Lewis structure of Ammonia">
            <!-- Central Nitrogen -->
            <circle cx="${cx}" cy="${cy}" r="22" fill="#3b82f6" />
            <text x="${cx}" y="${cy + 6}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>

            <!-- Lone pair on Nitrogen -->
            <circle cx="${cx - 7}" cy="${cy - 34}" r="3.5" fill="#e11d48" />
            <circle cx="${cx + 7}" cy="${cy - 34}" r="3.5" fill="#e11d48" />
            <text x="${cx}" y="${cy - 44}" font-size="10" font-weight="bold" fill="#be123c" text-anchor="middle">1 Lone Pair</text>

            <!-- 3 H bonds -->
            <line x1="${cx - 16}" y1="${cy + 16}" x2="${cx - 60}" y2="${cy + 50}" stroke="#0f172a" stroke-width="3" />
            <circle cx="${cx - 70}" cy="${cy + 58}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx - 70}" y="${cy + 63}" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <line x1="${cx}" y1="${cy + 22}" x2="${cx}" y2="${cy + 60}" stroke="#0f172a" stroke-width="3" />
            <circle cx="${cx}" cy="${cy + 74}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx}" y="${cy + 79}" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <line x1="${cx + 16}" y1="${cy + 16}" x2="${cx + 60}" y2="${cy + 50}" stroke="#0f172a" stroke-width="3" />
            <circle cx="${cx + 70}" cy="${cy + 58}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx + 70}" y="${cy + 63}" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>
          </svg>
        `;
      } else {
        // Methane CH4
        caption = "<strong>Methane (CH₄):</strong> Carbon shares its 4 valence electrons with 4 Hydrogens. Carbon completes a stable <strong>octet (8 e⁻)</strong>; each Hydrogen achieves a stable <strong>duplet (2 e⁻)</strong>.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" role="img" aria-label="Lewis structure of Methane">
            <!-- Central Carbon -->
            <circle cx="${cx}" cy="${cy}" r="24" fill="#0f172a" />
            <text x="${cx}" y="${cy + 6}" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>

            <!-- 4 H atoms with shared pairs -->
            <!-- Top H -->
            <line x1="${cx}" y1="${cy - 24}" x2="${cx}" y2="${cy - 60}" stroke="#2563eb" stroke-width="3.5" />
            <circle cx="${cx - 5}" cy="${cy - 42}" r="3" fill="#2563eb" />
            <circle cx="${cx + 5}" cy="${cy - 42}" r="3" fill="#2563eb" />
            <circle cx="${cx}" cy="${cy - 76}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx}" y="${cy - 71}" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <!-- Bottom H -->
            <line x1="${cx}" y1="${cy + 24}" x2="${cx}" y2="${cy + 60}" stroke="#2563eb" stroke-width="3.5" />
            <circle cx="${cx - 5}" cy="${cy + 42}" r="3" fill="#2563eb" />
            <circle cx="${cx + 5}" cy="${cy + 42}" r="3" fill="#2563eb" />
            <circle cx="${cx}" cy="${cy + 76}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx}" y="${cy + 81}" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <!-- Left H -->
            <line x1="${cx - 24}" y1="${cy}" x2="${cx - 60}" y2="${cy}" stroke="#2563eb" stroke-width="3.5" />
            <circle cx="${cx - 42}" cy="${cy - 5}" r="3" fill="#2563eb" />
            <circle cx="${cx - 42}" cy="${cy + 5}" r="3" fill="#2563eb" />
            <circle cx="${cx - 76}" cy="${cy}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx - 76}" y="${cy + 5}" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>

            <!-- Right H -->
            <line x1="${cx + 24}" y1="${cy}" x2="${cx + 60}" y2="${cy}" stroke="#2563eb" stroke-width="3.5" />
            <circle cx="${cx + 42}" cy="${cy - 5}" r="3" fill="#2563eb" />
            <circle cx="${cx + 42}" cy="${cy + 5}" r="3" fill="#2563eb" />
            <circle cx="${cx + 76}" cy="${cy}" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
            <text x="${cx + 76}" y="${cy + 5}" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">H</text>
          </svg>
        `;
      }

      return { svg, caption };
    },

    // 4. SIGMA (σ) VS PI (π) BOND OVERLAP
    sigmaVsPi: function(tab = 'compare', diagramId = 'diag-sigmapi') {
      const w = 360, h = 210;
      const caption = "<strong>Sigma (σ) vs Pi (π) Covalent Bonds:</strong> A <strong>σ-bond</strong> is formed by direct head-on axial overlap along the internuclear axis (freely rotatable). A <strong>π-bond</strong> is formed by sideways lateral overlap of unhybridized p-orbitals (restricts rotation, source of alkene reactivity).";

      const svg = `
        <svg viewBox="0 0 ${w} ${h}" width="100%" height="210" role="img" aria-label="Sigma versus Pi Bond Overlap">
          <!-- Left: Sigma (σ) Bond -->
          <g>
            <text x="85" y="24" font-size="13" font-weight="800" fill="#2563eb" text-anchor="middle">Sigma (σ) Bond</text>
            <text x="85" y="40" font-size="10.5" fill="var(--text-muted, #64748b)" text-anchor="middle">Head-on / Axial Overlap</text>

            <!-- Internuclear axis line -->
            <line x1="20" y1="100" x2="150" y2="100" stroke="#cbd5e1" stroke-dasharray="3,3" stroke-width="1.5" />

            <!-- Orbitals overlapping -->
            <ellipse cx="60" cy="100" rx="28" ry="20" fill="#60a5fa" opacity="0.8" />
            <ellipse cx="110" cy="100" rx="28" ry="20" fill="#3b82f6" opacity="0.8" />

            <!-- Overlap region highlight -->
            <ellipse cx="85" cy="100" rx="14" ry="18" fill="#1d4ed8" opacity="0.95" />

            <!-- Nuclei -->
            <circle cx="50" cy="100" r="4" fill="#0f172a" />
            <circle cx="120" cy="100" r="4" fill="#0f172a" />

            <text x="85" y="150" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Axial Electron Cloud</text>
            <text x="85" y="168" font-size="10" fill="var(--text-secondary, #475569)" text-anchor="middle">Free Rotation Allowed</text>
          </g>

          <!-- Divider -->
          <line x1="175" y1="15" x2="175" y2="195" stroke="var(--border-subtle, #e2e8f0)" stroke-width="1.5" />

          <!-- Right: Pi (π) Bond -->
          <g>
            <text x="265" y="24" font-size="13" font-weight="800" fill="#7c3aed" text-anchor="middle">Pi (π) Bond</text>
            <text x="265" y="40" font-size="10.5" fill="var(--text-muted, #64748b)" text-anchor="middle">Lateral / Sideways Overlap</text>

            <!-- Internuclear axis line -->
            <line x1="200" y1="100" x2="330" y2="100" stroke="#cbd5e1" stroke-dasharray="3,3" stroke-width="1.5" />

            <!-- Left p-orbital (vertical dumbbell) -->
            <ellipse cx="235" cy="65" rx="13" ry="26" fill="#a78bfa" opacity="0.85" />
            <ellipse cx="235" cy="135" rx="13" ry="26" fill="#8b5cf6" opacity="0.85" />

            <!-- Right p-orbital (vertical dumbbell) -->
            <ellipse cx="295" cy="65" rx="13" ry="26" fill="#a78bfa" opacity="0.85" />
            <ellipse cx="295" cy="135" rx="13" ry="26" fill="#8b5cf6" opacity="0.85" />

            <!-- Pi overlap clouds (top and bottom) -->
            <path d="M 235 60 Q 265 42 295 60" fill="none" stroke="#7c3aed" stroke-width="4" stroke-dasharray="4,2" />
            <path d="M 235 140 Q 265 158 295 140" fill="none" stroke="#7c3aed" stroke-width="4" stroke-dasharray="4,2" />

            <!-- Nuclei -->
            <circle cx="235" cy="100" r="4" fill="#0f172a" />
            <circle cx="295" cy="100" r="4" fill="#0f172a" />

            <text x="265" y="104" font-size="10" font-weight="bold" fill="#64748b" text-anchor="middle">Nodal Plane</text>
            <text x="265" y="180" font-size="10" fill="var(--text-secondary, #475569)" text-anchor="middle">Restricted Rotation (Cis/Trans)</text>
          </g>
        </svg>
      `;

      return { svg, caption };
    },

    // 5. CHEMICAL REPRESENTATIONS (Lewis vs Condensed vs Skeletal)
    representations: function(tab = 'butane', diagramId = 'diag-rep') {
      const w = 360, h = 200;
      let caption = "<strong>Skeletal (Bond-Line) Formula:</strong> Vertices and line ends represent Carbon atoms with enough Hydrogens implicitly attached to fulfill tetravalency (4 bonds).";
      let svg = "";

      if (tab === 'isobutane') {
        caption = "<strong>2-Methylpropane (Isobutane, C₄H₁₀):</strong> Branched alkane. Notice how the skeletal formula shows 3 lines meeting at the central tertiary (3°) carbon.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="190" role="img" aria-label="Isobutane representations">
            <!-- Left: Structural -->
            <text x="80" y="24" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">Condensed</text>
            <text x="80" y="70" font-size="14" font-weight="bold" fill="var(--text-primary)" text-anchor="middle">CH₃–CH(CH₃)–CH₃</text>
            <text x="80" y="120" font-size="11" fill="var(--text-muted)" text-anchor="middle">Central C is 3° (tertiary)</text>

            <line x1="170" y1="20" x2="170" y2="170" stroke="#cbd5e1" stroke-dasharray="3,3" />

            <!-- Right: Skeletal (Y-shape) -->
            <text x="260" y="24" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">Skeletal (Bond-Line)</text>
            <path d="M 220 120 L 260 90 L 300 120 M 260 90 L 260 45" fill="none" stroke="#059669" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="260" cy="90" r="5" fill="#e11d48" />
            <text x="260" y="150" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">3° Carbon Vertex</text>
          </svg>
        `;
      } else if (tab === 'propanol') {
        caption = "<strong>2-Propanol (Isopropyl alcohol):</strong> Skeletal formulas draw heteroatoms (like –OH) explicitly attached to the carbon backbone.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="190" role="img" aria-label="2-Propanol representations">
            <!-- Left: Condensed -->
            <text x="85" y="24" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">Condensed</text>
            <text x="85" y="70" font-size="14" font-weight="bold" fill="var(--text-primary)" text-anchor="middle">CH₃–CH(OH)–CH₃</text>
            <text x="85" y="120" font-size="11" fill="var(--text-muted)" text-anchor="middle">Secondary (2°) Alcohol</text>

            <line x1="170" y1="20" x2="170" y2="170" stroke="#cbd5e1" stroke-dasharray="3,3" />

            <!-- Right: Skeletal with OH -->
            <text x="260" y="24" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">Skeletal (Bond-Line)</text>
            <path d="M 215 110 L 255 85 L 295 110" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
            <line x1="255" y1="85" x2="255" y2="48" stroke="#ef4444" stroke-width="3.5" />
            <text x="255" y="40" font-size="13" font-weight="800" fill="#ef4444" text-anchor="middle">OH</text>
            <text x="255" y="145" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">Zigzag 3-Carbon Chain</text>
          </svg>
        `;
      } else {
        // n-Butane
        caption = "<strong>n-Butane (C₄H₁₀):</strong> In skeletal notation, 4 carbons form a 3-segment zigzag line. Line ends are –CH₃, inner vertices are –CH₂–.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="190" role="img" aria-label="Butane representations">
            <!-- Left: Condensed -->
            <text x="85" y="24" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">Condensed Formula</text>
            <text x="85" y="75" font-size="15" font-weight="bold" fill="var(--text-primary)" text-anchor="middle">CH₃–CH₂–CH₂–CH₃</text>
            <text x="85" y="125" font-size="11" fill="var(--text-muted)" text-anchor="middle">Linear 4-Carbon Alkane</text>

            <line x1="175" y1="20" x2="175" y2="170" stroke="#cbd5e1" stroke-dasharray="3,3" />

            <!-- Right: Skeletal zigzag -->
            <text x="265" y="24" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">Skeletal Formula</text>
            <path d="M 210 110 L 245 75 L 285 110 L 320 75" fill="none" stroke="#059669" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="210" cy="110" r="4" fill="#2563eb" />
            <circle cx="245" cy="75" r="4" fill="#2563eb" />
            <circle cx="285" cy="110" r="4" fill="#2563eb" />
            <circle cx="320" cy="75" r="4" fill="#2563eb" />
            <text x="265" y="150" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">C1 — C2 — C3 — C4</text>
          </svg>
        `;
      }

      return { svg, caption };
    },

    // 6. RESONANCE DELOCALIZATION & CURVED ARROWS
    resonance: function(tab = 'benzene', diagramId = 'diag-resonance') {
      const w = 360, h = 210;
      let caption = "<strong>Resonance in Benzene (C₆H₆):</strong> Benzene is a resonance hybrid of two Kekulé forms. The 6 π-electrons are delocalized uniformly across the 6-carbon ring, creating equal C–C bond lengths (1.39 Å).";
      let svg = "";

      if (tab === 'allyl') {
        caption = "<strong>Allyl Carbocation Delocalization:</strong> The π-electron pair shifts towards the empty p-orbital of the positive carbon (curved arrow), distributing the +1 charge equally between C1 and C3.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="200" role="img" aria-label="Allyl cation resonance">
            <!-- Canonical Form 1 -->
            <text x="80" y="70" font-size="14" font-weight="bold" fill="var(--text-primary)" text-anchor="middle">CH₂=CH–CH₂⁺</text>
            <!-- Curved arrow -->
            <path d="M 70 50 Q 85 30 100 50" fill="none" stroke="#e11d48" stroke-width="2.5" marker-end="url(#arrow)" />

            <!-- Resonance Double Arrow ↔ -->
            <text x="175" y="75" font-size="22" font-weight="bold" fill="#7c3aed" text-anchor="middle">⟷</text>

            <!-- Canonical Form 2 -->
            <text x="270" y="70" font-size="14" font-weight="bold" fill="var(--text-primary)" text-anchor="middle">⁺CH₂–CH=CH₂</text>

            <!-- Resonance Hybrid below -->
            <rect x="70" y="115" width="220" height="50" rx="6" fill="var(--bg-card-subtle)" stroke="#7c3aed" stroke-width="1.5" />
            <text x="180" y="136" font-size="12" font-weight="bold" fill="#7c3aed" text-anchor="middle">Resonance Hybrid (Equal Charge)</text>
            <text x="180" y="154" font-size="13.5" font-weight="800" fill="var(--text-primary)" text-anchor="middle">[ δ⁺CH₂ ⤹ CH ⤸ CH₂δ⁺ ]</text>
          </svg>
        `;
      } else {
        // Benzene
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="200" role="img" aria-label="Benzene resonance">
            <!-- Kekule 1 -->
            <g transform="translate(60, 95)">
              <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="#0f172a" stroke-width="3" />
              <line x1="26" y1="-15" x2="26" y2="15" stroke="#2563eb" stroke-width="3" />
              <line x1="-5" y1="32" x2="-28" y2="18" stroke="#2563eb" stroke-width="3" />
              <line x1="-28" y1="-18" x2="-5" y2="-32" stroke="#2563eb" stroke-width="3" />
              <text x="0" y="58" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">Kekulé A</text>
            </g>

            <!-- Resonance ↔ -->
            <text x="145" y="105" font-size="24" font-weight="bold" fill="#7c3aed" text-anchor="middle">⟷</text>

            <!-- Kekule 2 -->
            <g transform="translate(215, 95)">
              <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="#0f172a" stroke-width="3" />
              <line x1="-26" y1="-15" x2="-26" y2="15" stroke="#2563eb" stroke-width="3" />
              <line x1="5" y1="32" x2="28" y2="18" stroke="#2563eb" stroke-width="3" />
              <line x1="28" y1="-18" x2="5" y2="-32" stroke="#2563eb" stroke-width="3" />
              <text x="0" y="58" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">Kekulé B</text>
            </g>

            <!-- Resonance Hybrid (right) -->
            <text x="278" y="105" font-size="16" font-weight="bold" fill="#059669" text-anchor="middle">≡</text>
            <g transform="translate(315, 95)">
              <polygon points="0,-36 30,-18 30,18 0,36 -30,18 -30,-18" fill="none" stroke="#0f172a" stroke-width="2.5" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#059669" stroke-width="2.5" stroke-dasharray="4,3" />
              <text x="0" y="54" font-size="10" font-weight="bold" fill="#059669" text-anchor="middle">Hybrid</text>
            </g>
          </svg>
        `;
      }

      return { svg, caption };
    },

    // 7. CARBOCATION, CARBANION, & FREE RADICAL INTERMEDIATES
    intermediates: function(tab = 'all', diagramId = 'diag-intermediates') {
      const w = 360, h = 210;
      const caption = "<strong>Reaction Intermediates Comparison:</strong><br>• <strong>Carbocation (C⁺):</strong> sp² planar, 6 valence electrons, vacant p-orbital. Stability: 3° > 2° > 1°.<br>• <strong>Carbanion (C⁻):</strong> sp³ pyramidal, 8 valence electrons with lone pair. Stability: 1° > 2° > 3°.<br>• <strong>Free Radical (C•):</strong> sp² planar, 7 valence electrons, single unpaired electron. Stability: 3° > 2° > 1°.";

      const svg = `
        <svg viewBox="0 0 ${w} ${h}" width="100%" height="210" role="img" aria-label="Reaction Intermediates Comparison">
          <!-- 1. Carbocation -->
          <g transform="translate(65, 85)">
            <text x="0" y="-55" font-size="12" font-weight="800" fill="#ef4444" text-anchor="middle">Carbocation (C⁺)</text>
            <!-- Empty p-orbital (vertical lobes) -->
            <ellipse cx="0" cy="-24" rx="10" ry="22" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3,2" />
            <ellipse cx="0" cy="24" rx="10" ry="22" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3,2" />
            <circle cx="0" cy="0" r="14" fill="#0f172a" />
            <text x="0" y="4" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">C⁺</text>
            <text x="0" y="58" font-size="10" font-weight="bold" fill="#ef4444" text-anchor="middle">sp² Planar (6 e⁻)</text>
            <text x="0" y="72" font-size="9" fill="var(--text-muted)" text-anchor="middle">Empty p-orbital</text>
          </g>

          <!-- Divider -->
          <line x1="125" y1="20" x2="125" y2="185" stroke="#cbd5e1" stroke-dasharray="3,3" />

          <!-- 2. Free Radical -->
          <g transform="translate(180, 85)">
            <text x="0" y="-55" font-size="12" font-weight="800" fill="#f59e0b" text-anchor="middle">Free Radical (C•)</text>
            <!-- Half-filled p-orbital with single dot -->
            <ellipse cx="0" cy="-24" rx="10" ry="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.8" />
            <circle cx="0" cy="-24" r="3.5" fill="#d97706" />
            <ellipse cx="0" cy="24" rx="10" ry="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.8" />
            <circle cx="0" cy="0" r="14" fill="#0f172a" />
            <text x="0" y="4" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">C•</text>
            <text x="0" y="58" font-size="10" font-weight="bold" fill="#d97706" text-anchor="middle">sp² Planar (7 e⁻)</text>
            <text x="0" y="72" font-size="9" fill="var(--text-muted)" text-anchor="middle">Unpaired 1 e⁻</text>
          </g>

          <!-- Divider -->
          <line x1="235" y1="20" x2="235" y2="185" stroke="#cbd5e1" stroke-dasharray="3,3" />

          <!-- 3. Carbanion -->
          <g transform="translate(295, 85)">
            <text x="0" y="-55" font-size="12" font-weight="800" fill="#3b82f6" text-anchor="middle">Carbanion (C⁻)</text>
            <!-- Lone pair at apex -->
            <circle cx="-5" cy="-28" r="3" fill="#2563eb" />
            <circle cx="5" cy="-28" r="3" fill="#2563eb" />
            <ellipse cx="0" cy="-26" rx="12" ry="10" fill="none" stroke="#3b82f6" stroke-width="1.5" />
            <circle cx="0" cy="0" r="14" fill="#0f172a" />
            <text x="0" y="4" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">C⁻</text>
            <text x="0" y="58" font-size="10" font-weight="bold" fill="#2563eb" text-anchor="middle">sp³ Pyramidal (8 e⁻)</text>
            <text x="0" y="72" font-size="9" fill="var(--text-muted)" text-anchor="middle">1 Lone Pair</text>
          </g>
        </svg>
      `;

      return { svg, caption };
    },

    // 8. INDUCTIVE EFFECT & TRANSMISSION
    inductive: function(tab = 'minusI', diagramId = 'diag-inductive') {
      const w = 360, h = 180;
      let caption = "<strong>-I Inductive Effect (Electron-Withdrawing):</strong> The electronegative Chlorine atom pulls σ-electron density towards itself, inducing permanent partial positive charges along the carbon chain: <strong>δ⁺ > δδ⁺ > δδδ⁺</strong> (dies out after 3 carbons).";

      const svg = `
        <svg viewBox="0 0 ${w} ${h}" width="100%" height="180" role="img" aria-label="Inductive effect along carbon chain">
          <!-- Carbon Chain C3 - C2 - C1 - Cl -->
          <!-- C3 -->
          <circle cx="50" cy="90" r="18" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
          <text x="50" y="95" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">C3</text>
          <text x="50" y="128" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">δδδ⁺</text>

          <!-- Bond 1 with arrow -->
          <line x1="68" y1="90" x2="132" y2="90" stroke="#0f172a" stroke-width="3" />
          <polygon points="104,86 112,90 104,94" fill="#0f172a" />

          <!-- C2 -->
          <circle cx="150" cy="90" r="18" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
          <text x="150" y="95" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">C2</text>
          <text x="150" y="128" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">δδ⁺</text>

          <!-- Bond 2 with double arrow -->
          <line x1="168" y1="90" x2="232" y2="90" stroke="#0f172a" stroke-width="3" />
          <polygon points="198,86 206,90 198,94" fill="#0f172a" />
          <polygon points="208,86 216,90 208,94" fill="#0f172a" />

          <!-- C1 -->
          <circle cx="250" cy="90" r="18" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
          <text x="250" y="95" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">C1</text>
          <text x="250" y="128" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">δ⁺</text>

          <!-- Bond 3 to Cl with triple arrow -->
          <line x1="268" y1="90" x2="312" y2="90" stroke="#e11d48" stroke-width="3.5" />
          <polygon points="288,86 296,90 288,94" fill="#e11d48" />

          <!-- Cl -->
          <circle cx="330" cy="90" r="18" fill="#fee2e2" stroke="#ef4444" stroke-width="2.5" />
          <text x="330" y="95" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">Cl</text>
          <text x="330" y="128" font-size="12" font-weight="800" fill="#dc2626" text-anchor="middle">δ⁻</text>

          <!-- Title / label -->
          <text x="180" y="35" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">Electron Drift Direction (Towards Electronegative Cl)</text>
        </svg>
      `;

      return { svg, caption };
    },

    // 9. NUCLEOPHILE & ELECTROPHILE INTERACTION
    nuEl: function(tab = 'attack', diagramId = 'diag-nuel') {
      const w = 360, h = 180;
      const caption = "<strong>Nucleophile-Electrophile Attack:</strong> The electron-rich <strong>Nucleophile (Nu:⁻)</strong> donates an unshared electron pair (indicated by the red curved arrow) to the electron-deficient <strong>Electrophile (E⁺ or δ⁺ carbonyl carbon)</strong> to form a new covalent bond.";

      const svg = `
        <svg viewBox="0 0 ${w} ${h}" width="100%" height="180" role="img" aria-label="Nucleophile attacking electrophile">
          <!-- Nucleophile (Left) -->
          <g transform="translate(80, 90)">
            <circle cx="0" cy="0" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
            <text x="0" y="5" font-size="13" font-weight="800" fill="#1d4ed8" text-anchor="middle">Nu:⁻</text>
            <text x="0" y="42" font-size="11" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Nucleophile</text>
            <text x="0" y="55" font-size="9" fill="var(--text-muted)" text-anchor="middle">(Electron-Rich Lewis Base)</text>
          </g>

          <!-- Curved Arrow showing 2-electron donation -->
          <path d="M 106 75 Q 180 25 240 75" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round" />
          <polygon points="234,70 248,78 244,65" fill="#e11d48" />
          <text x="180" y="44" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">Electron Pair Attack</text>

          <!-- Electrophile (Right) -->
          <g transform="translate(280, 90)">
            <circle cx="0" cy="0" r="24" fill="#fee2e2" stroke="#ef4444" stroke-width="2" />
            <text x="0" y="5" font-size="14" font-weight="800" fill="#dc2626" text-anchor="middle">E⁺</text>
            <text x="0" y="42" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">Electrophile</text>
            <text x="0" y="55" font-size="9" fill="var(--text-muted)" text-anchor="middle">(Electron-Deficient Lewis Acid)</text>
          </g>
        </svg>
      `;

      return { svg, caption };
    },

    // 10. ISOMERISM (GEOMETRICAL CIS/TRANS & OPTICAL CHIRAL)
    isomerism: function(tab = 'geometrical', diagramId = 'diag-isomer') {
      const w = 360, h = 200;
      let caption = "<strong>Geometrical Isomerism (Cis vs Trans 2-Butene):</strong> Restricted rotation around the C=C double bond allows two stereoisomers. <strong>Cis</strong> has similar –CH₃ groups on the same side (polar, μ > 0). <strong>Trans</strong> has them on opposite sides (nonpolar, μ = 0).";
      let svg = "";

      if (tab === 'optical') {
        caption = "<strong>Optical Isomerism & Chiral Center:</strong> A carbon bonded to four completely different groups (–H, –OH, –CH₃, –COOH) is an asymmetric <strong>chiral center (C*)</strong>. Its non-superimposable mirror image form constitutes a pair of <strong>enantiomers</strong>.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="190" role="img" aria-label="Optical isomerism chiral center">
            <!-- Left Enantiomer -->
            <g transform="translate(100, 95)">
              <circle cx="0" cy="0" r="16" fill="#0f172a" />
              <text x="0" y="5" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">C*</text>
              <line x1="0" y1="-16" x2="0" y2="-45" stroke="#0f172a" stroke-width="3" />
              <text x="0" y="-52" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">COOH</text>
              <line x1="-16" y1="5" x2="-45" y2="15" stroke="#0f172a" stroke-width="3" />
              <text x="-58" y="20" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">H</text>
              <line x1="16" y1="5" x2="45" y2="15" stroke="#ef4444" stroke-width="3" />
              <text x="58" y="20" font-size="11" font-weight="bold" fill="#ef4444" text-anchor="middle">OH</text>
              <line x1="0" y1="16" x2="0" y2="45" stroke="#0f172a" stroke-width="3" />
              <text x="0" y="58" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">CH₃</text>
            </g>

            <!-- Mirror Line -->
            <line x1="180" y1="20" x2="180" y2="175" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4,3" />
            <text x="180" y="190" font-size="10" font-weight="bold" fill="#7c3aed" text-anchor="middle">Mirror Plane</text>

            <!-- Right Enantiomer (Inverted) -->
            <g transform="translate(260, 95)">
              <circle cx="0" cy="0" r="16" fill="#0f172a" />
              <text x="0" y="5" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">C*</text>
              <line x1="0" y1="-16" x2="0" y2="-45" stroke="#0f172a" stroke-width="3" />
              <text x="0" y="-52" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">COOH</text>
              <line x1="16" y1="5" x2="45" y2="15" stroke="#0f172a" stroke-width="3" />
              <text x="58" y="20" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">H</text>
              <line x1="-16" y1="5" x2="-45" y2="15" stroke="#ef4444" stroke-width="3" />
              <text x="-58" y="20" font-size="11" font-weight="bold" fill="#ef4444" text-anchor="middle">OH</text>
              <line x1="0" y1="16" x2="0" y2="45" stroke="#0f172a" stroke-width="3" />
              <text x="0" y="58" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">CH₃</text>
            </g>
          </svg>
        `;
      } else {
        // Cis vs Trans
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="190" role="img" aria-label="Cis and Trans 2-butene">
            <!-- Cis-2-Butene (Left) -->
            <g transform="translate(90, 85)">
              <text x="0" y="-50" font-size="12" font-weight="800" fill="#2563eb" text-anchor="middle">cis-2-Butene (μ ≠ 0)</text>
              <line x1="-22" y1="-4" x2="22" y2="-4" stroke="#0f172a" stroke-width="3.5" />
              <line x1="-22" y1="4" x2="22" y2="4" stroke="#0f172a" stroke-width="3.5" />
              <!-- Top groups: CH3 & CH3 -->
              <line x1="-22" y1="-4" x2="-50" y2="-32" stroke="#2563eb" stroke-width="3" />
              <text x="-55" y="-38" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">CH₃</text>
              <line x1="22" y1="-4" x2="50" y2="-32" stroke="#2563eb" stroke-width="3" />
              <text x="55" y="-38" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">CH₃</text>
              <!-- Bottom groups: H & H -->
              <line x1="-22" y1="4" x2="-45" y2="30" stroke="#64748b" stroke-width="2.5" />
              <text x="-50" y="44" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">H</text>
              <line x1="22" y1="4" x2="45" y2="30" stroke="#64748b" stroke-width="2.5" />
              <text x="50" y="44" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">H</text>
              <text x="0" y="65" font-size="10" font-weight="bold" fill="#2563eb" text-anchor="middle">Same Side (Higher BP)</text>
            </g>

            <!-- Divider -->
            <line x1="180" y1="20" x2="180" y2="180" stroke="#cbd5e1" stroke-dasharray="3,3" />

            <!-- Trans-2-Butene (Right) -->
            <g transform="translate(270, 85)">
              <text x="0" y="-50" font-size="12" font-weight="800" fill="#059669" text-anchor="middle">trans-2-Butene (μ = 0)</text>
              <line x1="-22" y1="-4" x2="22" y2="-4" stroke="#0f172a" stroke-width="3.5" />
              <line x1="-22" y1="4" x2="22" y2="4" stroke="#0f172a" stroke-width="3.5" />
              <!-- Opposite groups -->
              <line x1="-22" y1="-4" x2="-50" y2="-32" stroke="#059669" stroke-width="3" />
              <text x="-55" y="-38" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">CH₃</text>
              <line x1="22" y1="4" x2="50" y2="32" stroke="#059669" stroke-width="3" />
              <text x="55" y="44" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">CH₃</text>
              <line x1="-22" y1="4" x2="-45" y2="30" stroke="#64748b" stroke-width="2.5" />
              <text x="-50" y="44" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">H</text>
              <line x1="22" y1="-4" x2="45" y2="-30" stroke="#64748b" stroke-width="2.5" />
              <text x="50" y="-38" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">H</text>
              <text x="0" y="65" font-size="10" font-weight="bold" fill="#059669" text-anchor="middle">Opposite Sides (Higher MP)</text>
            </g>
          </svg>
        `;
      }

      return { svg, caption };
    },

    // 11. REACTION MECHANISMS (SN2 vs SN1)
    mechanism: function(tab = 'sn2', diagramId = 'diag-mech') {
      const w = 360, h = 210;
      let caption = "<strong>SN2 Mechanism (Concerted Bimolecular Substitution):</strong> Nucleophile attacks from the backside 180° opposite to the leaving group. Passes through a pentacoordinate planar transition state with simultaneous bond making and breaking, causing <strong>100% Walden Inversion</strong>.";
      let svg = "";

      if (tab === 'sn1') {
        caption = "<strong>SN1 Mechanism (Stepwise Unimolecular Substitution):</strong> Step 1 (Slow RDS): Leaving group departs to generate a planar sp² carbocation intermediate. Step 2 (Fast): Nucleophile attacks equally from top or bottom face, resulting in <strong>Racemization (Inversion + Retention)</strong>.";
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="200" role="img" aria-label="SN1 Mechanism">
            <!-- Step 1: Substrate -> Carbocation -->
            <g transform="translate(60, 95)">
              <text x="0" y="-35" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">R₃C–Br</text>
              <text x="0" y="-15" font-size="10" fill="#64748b" text-anchor="middle">3° Substrate</text>
            </g>
            <!-- Step 1 Arrow (Slow) -->
            <line x1="95" y1="85" x2="145" y2="85" stroke="#ef4444" stroke-width="2.5" />
            <polygon points="140,81 150,85 140,89" fill="#ef4444" />
            <text x="120" y="75" font-size="9" font-weight="bold" fill="#ef4444" text-anchor="middle">Step 1 (Slow RDS)</text>
            <text x="120" y="102" font-size="8.5" fill="#ef4444" text-anchor="middle">– Br⁻</text>

            <!-- Planar Intermediate -->
            <g transform="translate(195, 95)">
              <rect x="-30" y="-35" width="60" height="70" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.8" />
              <text x="0" y="-10" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">R₃C⁺</text>
              <text x="0" y="12" font-size="9" font-weight="bold" fill="#dc2626" text-anchor="middle">Planar sp²</text>
              <text x="0" y="24" font-size="8.5" fill="#64748b" text-anchor="middle">Carbocation</text>
            </g>

            <!-- Step 2 Arrows (Two-face attack) -->
            <path d="M 235 75 Q 260 55 285 70" fill="none" stroke="#2563eb" stroke-width="2" />
            <path d="M 235 95 Q 260 115 285 100" fill="none" stroke="#2563eb" stroke-width="2" />

            <!-- Product -->
            <g transform="translate(320, 95)">
              <text x="0" y="-10" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">R₃C–Nu</text>
              <text x="0" y="10" font-size="9.5" font-weight="bold" fill="#059669" text-anchor="middle">Racemic Mixture</text>
              <text x="0" y="24" font-size="8" fill="#64748b" text-anchor="middle">(50% Inv + 50% Ret)</text>
            </g>
          </svg>
        `;
      } else {
        // SN2
        svg = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="200" role="img" aria-label="SN2 Mechanism">
            <!-- Nu attacking backside -->
            <g transform="translate(45, 95)">
              <circle cx="0" cy="0" r="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
              <text x="0" y="4" font-size="11" font-weight="bold" fill="#1d4ed8" text-anchor="middle">OH⁻</text>
              <text x="0" y="28" font-size="9" fill="#1d4ed8" text-anchor="middle">Backside</text>
            </g>

            <!-- Curved Arrow -->
            <path d="M 65 95 L 115 95" fill="none" stroke="#e11d48" stroke-width="2.5" />
            <polygon points="110,91 120,95 110,99" fill="#e11d48" />

            <!-- Transition State [HO ··· C ··· Br]‡ -->
            <g transform="translate(180, 95)">
              <rect x="-48" y="-38" width="96" height="76" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,3" />
              <text x="44" y="-22" font-size="14" font-weight="800" fill="#e11d48">‡</text>
              <text x="-32" y="4" font-size="11" font-weight="bold" fill="#2563eb">δ⁻HO</text>
              <line x1="-10" y1="0" x2="2" y2="0" stroke="#2563eb" stroke-dasharray="2,2" stroke-width="2" />
              <circle cx="10" cy="0" r="9" fill="#0f172a" />
              <text x="10" y="3.5" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
              <line x1="19" y1="0" x2="31" y2="0" stroke="#ef4444" stroke-dasharray="2,2" stroke-width="2" />
              <text x="40" y="4" font-size="11" font-weight="bold" fill="#ef4444">Brδ⁻</text>
              <text x="0" y="28" font-size="9" font-weight="bold" fill="#475569" text-anchor="middle">Transition State</text>
            </g>

            <!-- Arrow to Inverted Product -->
            <line x1="235" y1="95" x2="275" y2="95" stroke="#059669" stroke-width="2.5" />
            <polygon points="270,91 280,95 270,99" fill="#059669" />

            <!-- Inverted Product -->
            <g transform="translate(315, 95)">
              <text x="0" y="4" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">HO–CH₃</text>
              <text x="0" y="24" font-size="9" font-weight="bold" fill="#059669" text-anchor="middle">Walden Inversion</text>
              <text x="0" y="38" font-size="8.5" fill="#64748b" text-anchor="middle">+ Br⁻ Leaving</text>
            </g>
          </svg>
        `;
      }

      return { svg, caption };
    }
  };

  // --- TOPIC TO DIAGRAM MAPPING ENGINE ---
  // Intelligently matches a topic to the most pedagogically valuable interactive diagram
  function renderForTopic(topic, chapter) {
    if (!topic) return "";

    const tNum = String(topic.number || "");
    const tTitle = (topic.title || "").toLowerCase();
    const chNum = chapter ? chapter.number : 0;
    const diagramId = `diag-${topic.id || 'current'}`;

    let renderer = "";
    let defaultTab = "";
    let tabs = [];
    let title = "Interactive Chemical Concept Model";

    // Matching logic
    if (chNum === 0) {
      if (tTitle.includes("matter") || tTitle.includes("atom") || tTitle.includes("first idea")) {
        renderer = "atomBohr";
        defaultTab = "carbon";
        tabs = [
          { key: "carbon", label: "Carbon Atom (Z=6)" },
          { key: "oxygen", label: "Oxygen Atom (Z=8)" },
          { key: "nitrogen", label: "Nitrogen Atom (Z=7)" },
          { key: "hydrogen", label: "Hydrogen Atom (Z=1)" }
        ];
        title = "Atomic Structure & Electron Shells";
      } else if (tTitle.includes("electron") || tTitle.includes("energy") || tTitle.includes("orbital")) {
        renderer = "orbitals";
        defaultTab = "sp3";
        tabs = [
          { key: "sp3", label: "sp³ (Tetrahedral)" },
          { key: "sp2", label: "sp² (Planar)" },
          { key: "sp", label: "sp (Linear)" },
          { key: "sp_atomic", label: "Pure s & p Orbitals" }
        ];
        title = "Orbitals & Hybridisation Geometry";
      } else if (tTitle.includes("valency") || tTitle.includes("bond") || tTitle.includes("octet")) {
        renderer = "bondingSharing";
        defaultTab = "methane";
        tabs = [
          { key: "methane", label: "Methane CH₄ (Octet)" },
          { key: "water", label: "Water H₂O (2 Lone Pairs)" },
          { key: "ammonia", label: "Ammonia NH₃ (1 Lone Pair)" }
        ];
        title = "Chemical Bonding & Electron Sharing";
      } else {
        renderer = "sigmaVsPi";
        defaultTab = "compare";
        tabs = [
          { key: "compare", label: "Sigma (σ) vs Pi (π) Bond" }
        ];
        title = "Covalent Bond Overlap & Rotation";
      }
    } else if (chNum === 1 || tTitle.includes("classification") || tTitle.includes("structure") || tTitle.includes("representation")) {
      renderer = "representations";
      defaultTab = "butane";
      tabs = [
        { key: "butane", label: "n-Butane" },
        { key: "propanol", label: "2-Propanol (–OH)" },
        { key: "isobutane", label: "Isobutane (Branched)" }
      ];
      title = "Structural & Skeletal Formula Representations";
    } else if (chNum === 3 || tTitle.includes("isomerism") || tTitle.includes("stereochemistry") || tTitle.includes("chiral")) {
      renderer = "isomerism";
      defaultTab = "geometrical";
      tabs = [
        { key: "geometrical", label: "Geometrical (Cis vs Trans)" },
        { key: "optical", label: "Optical & Chiral Center (C*)" }
      ];
      title = "Isomerism & Stereochemical Spatial Arrangement";
    } else if (chNum === 4 || tTitle.includes("goc") || tTitle.includes("resonance") || tTitle.includes("mesomeric") || tTitle.includes("inductive") || tTitle.includes("hyperconjugation")) {
      if (tTitle.includes("inductive")) {
        renderer = "inductive";
        defaultTab = "minusI";
        tabs = [
          { key: "minusI", label: "-I Electron Withdrawal" }
        ];
        title = "Inductive Effect & σ-Polarization Transmission";
      } else {
        renderer = "resonance";
        defaultTab = "benzene";
        tabs = [
          { key: "benzene", label: "Benzene Delocalization" },
          { key: "allyl", label: "Allyl Cation ⟷" }
        ];
        title = "Resonance Hybrid & Electron Delocalization";
      }
    } else if (chNum === 5 || tTitle.includes("intermediate") || tTitle.includes("carbocation") || tTitle.includes("carbanion") || tTitle.includes("radical")) {
      renderer = "intermediates";
      defaultTab = "all";
      tabs = [
        { key: "all", label: "Carbocation vs Carbanion vs Radical" }
      ];
      title = "Reaction Intermediates Comparison";
    } else if (chNum === 6 || chNum === 7 || tTitle.includes("mechanism") || tTitle.includes("sn1") || tTitle.includes("sn2") || tTitle.includes("substitution") || tTitle.includes("elimination")) {
      renderer = "mechanism";
      defaultTab = "sn2";
      tabs = [
        { key: "sn2", label: "SN2 (Backside Attack & Inversion)" },
        { key: "sn1", label: "SN1 (Carbocation & Racemization)" }
      ];
      title = "Reaction Mechanism & Electron Pushing";
    } else if (tTitle.includes("nucleophile") || tTitle.includes("electrophile")) {
      renderer = "nuEl";
      defaultTab = "attack";
      tabs = [
        { key: "attack", label: "Nu:⁻ Attack on E⁺" }
      ];
      title = "Nucleophile & Electrophile Interaction";
    } else {
      // Fallback: Sigma vs Pi or Intermediates depending on context
      renderer = "sigmaVsPi";
      defaultTab = "compare";
      tabs = [
        { key: "compare", label: "Sigma (σ) vs Pi (π) Bond" }
      ];
      title = "Covalent Bonding Overlap";
    }

    if (!diagramGenerators[renderer]) return "";

    const activeTab = diagramStates[diagramId] || defaultTab;
    const generated = diagramGenerators[renderer](activeTab, diagramId);

    return `
      <div class="chem-diagram-card" id="${diagramId}" data-renderer="${renderer}">
        <div class="chem-diagram-header">
          <div class="chem-diagram-title">
            <span>🔬</span>
            <span>${title}</span>
          </div>
          ${tabs.length > 1 ? `
            <div class="chem-diagram-tabs">
              ${tabs.map(t => `
                <button class="diagram-tab-btn ${t.key === activeTab ? 'active' : ''}" data-tab="${t.key}" onclick="ChemDiagrams.setDiagramTab('${diagramId}', '${t.key}')">
                  ${t.label}
                </button>
              `).join("")}
            </div>
          ` : ''}
        </div>

        <div class="chem-diagram-svg-wrap">
          ${generated.svg}
        </div>

        <div class="diagram-interactive-info"></div>

        <div class="chem-diagram-caption">
          ${generated.caption}
        </div>
      </div>
    `;
  }

  return {
    renderForTopic,
    setDiagramTab,
    showInteractiveInfo
  };
})();
