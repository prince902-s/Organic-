/**
 * JEE MAIN ORGANIC CHEMISTRY - MASTER CURRICULUM & QUESTION DATA
 * Chemically authentic, NCERT Class 10/11/12 aligned, JEE Main oriented.
 */

window.CHEM_DATA = (function() {

  const STAGES = [
    {
      id: 0,
      title: "Stage 0 — Class 10 Foundation",
      subtitle: "Bridge Course for Absolute Beginners",
      description: "Fundamental chemical concepts from Class 9 & 10 required before beginning any organic chemistry study.",
      estimatedHours: "4 Hours",
      prerequisites: "None (Entry level)"
    },
    {
      id: 1,
      title: "Stage 1 — Carbon Foundation",
      subtitle: "Class 10 Carbon & Its Compounds",
      description: "Catenation, tetravalency, covalent bonds, electron dot structures, and basic organic functional groups.",
      estimatedHours: "6 Hours",
      prerequisites: "Stage 0 (Basic atomic structure & valency)"
    },
    {
      id: 2,
      title: "Stage 2 — Class 11 Prerequisites",
      subtitle: "Orbital Overlap, Periodic Trends & Bonding",
      description: "Hybridisation (sp, sp², sp³), electronegativity differences, dipole moments, and resonance foundations.",
      estimatedHours: "8 Hours",
      prerequisites: "Stage 1 (Covalent bonding)"
    },
    {
      id: 3,
      title: "Stage 3 — General Organic Chemistry (GOC)",
      subtitle: "The Backbone of Organic Chemistry (High Weightage)",
      description: "Classification, IUPAC rules, structural & stereo isomerism, electronic effects (+I/-I, +M/-M, hyperconjugation), and reaction intermediates.",
      estimatedHours: "16 Hours",
      prerequisites: "Stage 2 (Hybridisation & Resonance)"
    },
    {
      id: 4,
      title: "Stage 4 — Hydrocarbons",
      subtitle: "Alkanes, Alkenes, Alkynes & Arenes",
      description: "Conformations, free radical substitution, electrophilic addition, Markovnikov rule, ozonolysis, aromaticity (Hückel's Rule), and EAS.",
      estimatedHours: "14 Hours",
      prerequisites: "Stage 3 (GOC, Carbocations & Reaction Mechanisms)"
    },
    {
      id: 5,
      title: "Stage 5 — Halogen Compounds",
      subtitle: "Haloalkanes & Haloarenes",
      description: "Nucleophilic substitution (SN1 vs SN2 kinetics, stereochemistry, solvent effects), elimination (E1/E2), and haloarene unreactivity.",
      estimatedHours: "10 Hours",
      prerequisites: "Stage 3 & 4 (Carbocations, leaving groups & nucleophiles)"
    },
    {
      id: 6,
      title: "Stage 6 — Oxygen-Containing Compounds",
      subtitle: "Alcohols, Phenols, Ethers, Carbonyls & Carboxylic Acids",
      description: "Acidity comparisons, Grignard additions, Aldol condensation, Cannizzaro, Iodoform, Clemmensen/Wolff-Kishner, and carboxylic acid derivatives.",
      estimatedHours: "20 Hours",
      prerequisites: "Stage 4 & 5 (SN reactions, carbonyl polarity)"
    },
    {
      id: 7,
      title: "Stage 7 — Nitrogen Compounds",
      subtitle: "Amines & Diazonium Salts",
      description: "Basicity anomalies in gas vs aqueous phase, Gabriel phthalimide, Hoffmann bromamide, carbylamine, Hinsberg test, and diazonium coupling.",
      estimatedHours: "8 Hours",
      prerequisites: "Stage 6 (Carboxylic acid derivatives & nucleophilic attack)"
    },
    {
      id: 8,
      title: "Stage 8 — Biomolecules",
      subtitle: "Carbohydrates, Amino Acids, Proteins & Nucleic Acids",
      description: "Glucose & fructose structures, mutarotation, reducing sugars, peptide bonds, protein denaturation, nucleic acids, and vitamins.",
      estimatedHours: "8 Hours",
      prerequisites: "Stage 6 (Hemiacetal/acetal chemistry, carbonyls, chirality)"
    },
    {
      id: 9,
      title: "Stage 9 — Practical Organic Chemistry (POC)",
      subtitle: "Purification, Qualitative & Quantitative Analysis",
      description: "Lassaigne's test for N, S, Halogens, Kjeldahl/Dumas method, chromatography principles, and functional group diagnostic tests.",
      estimatedHours: "6 Hours",
      prerequisites: "All functional groups"
    }
  ];

  // SVG Chemical Illustrations
  const DIAGRAMS = {
    tetrahedral: `
      <svg viewBox="0 0 200 160" width="180" height="144">
        <circle cx="100" cy="80" r="16" fill="#2563eb" />
        <text x="100" y="85" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">C</text>
        <!-- Top bond -->
        <line x1="100" y1="64" x2="100" y2="24" stroke="#475569" stroke-width="3" />
        <circle cx="100" cy="20" r="10" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
        <text x="100" y="24" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">H</text>
        <!-- Left bond in plane -->
        <line x1="86" y1="88" x2="50" y2="120" stroke="#475569" stroke-width="3" />
        <circle cx="44" cy="126" r="10" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
        <text x="44" y="130" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">H</text>
        <!-- Wedge bond forward -->
        <polygon points="112,88 152,126 142,134" fill="#0f172a" />
        <circle cx="154" cy="132" r="10" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
        <text x="154" y="136" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">H</text>
        <!-- Dash bond backward -->
        <line x1="110" y1="74" x2="140" y2="52" stroke="#475569" stroke-width="3" stroke-dasharray="4,4" />
        <circle cx="148" cy="46" r="10" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
        <text x="148" y="50" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">H</text>
        <text x="100" y="155" text-anchor="middle" font-size="11" font-weight="600" fill="#64748b">sp³ Hybridised Carbon (109.5° angle)</text>
      </svg>
    `,
    carbocation: `
      <svg viewBox="0 0 240 160" width="220" height="144">
        <!-- Lobes of unhybridised p orbital -->
        <ellipse cx="120" cy="45" rx="16" ry="32" fill="rgba(37,99,235,0.25)" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" />
        <ellipse cx="120" cy="115" rx="16" ry="32" fill="rgba(37,99,235,0.25)" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" />
        <!-- Central C+ -->
        <circle cx="120" cy="80" r="18" fill="#ef4444" />
        <text x="120" y="85" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">C⁺</text>
        <!-- Three planar bonds 120 deg apart -->
        <line x1="102" y1="80" x2="50" y2="80" stroke="#0f172a" stroke-width="3" />
        <text x="35" y="85" font-size="12" font-weight="bold" fill="#0f172a">R₁</text>
        <line x1="130" y1="68" x2="175" y2="40" stroke="#0f172a" stroke-width="3" />
        <text x="185" y="40" font-size="12" font-weight="bold" fill="#0f172a">R₂</text>
        <line x1="130" y1="92" x2="175" y2="120" stroke="#0f172a" stroke-width="3" />
        <text x="185" y="125" font-size="12" font-weight="bold" fill="#0f172a">R₃</text>
        <text x="120" y="20" text-anchor="middle" font-size="10" font-weight="700" fill="#2563eb">Vacant 2p Orbital</text>
        <text x="120" y="155" text-anchor="middle" font-size="11" font-weight="600" fill="#64748b">sp² Trigonal Planar (6 valence e⁻, 120°)</text>
      </svg>
    `,
    benzene: `
      <svg viewBox="0 0 180 160" width="160" height="144">
        <!-- Benzene hexagon -->
        <polygon points="90,25 140,55 140,110 90,140 40,110 40,55" fill="none" stroke="#0f172a" stroke-width="3" />
        <!-- Inner resonance circle -->
        <circle cx="90" cy="82.5" r="28" fill="rgba(37,99,235,0.15)" stroke="#2563eb" stroke-width="2" stroke-dasharray="5,3" />
        <text x="90" y="87" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">6π e⁻</text>
        <text x="90" y="155" text-anchor="middle" font-size="11" font-weight="600" fill="#64748b">Aromatic (Hückel 4n+2, n=1)</text>
      </svg>
    `,
    newman: `
      <svg viewBox="0 0 200 160" width="180" height="144">
        <!-- Rear carbon circle -->
        <circle cx="100" cy="75" r="38" fill="none" stroke="#2563eb" stroke-width="2.5" />
        <!-- Front carbon center dot -->
        <circle cx="100" cy="75" r="4" fill="#0f172a" />
        <!-- Front bonds (meet in center) -->
        <line x1="100" y1="75" x2="100" y2="28" stroke="#0f172a" stroke-width="2.5" />
        <text x="100" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">H</text>
        <line x1="100" y1="75" x2="60" y2="100" stroke="#0f172a" stroke-width="2.5" />
        <text x="50" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">H</text>
        <line x1="100" y1="75" x2="140" y2="100" stroke="#0f172a" stroke-width="2.5" />
        <text x="150" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">H</text>
        <!-- Rear bonds (start outside circle) -->
        <line x1="100" y1="113" x2="100" y2="135" stroke="#2563eb" stroke-width="2" />
        <text x="100" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">H</text>
        <line x1="68" y1="56" x2="50" y2="40" stroke="#2563eb" stroke-width="2" />
        <text x="44" y="36" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">H</text>
        <line x1="132" y1="56" x2="150" y2="40" stroke="#2563eb" stroke-width="2" />
        <text x="156" y="36" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">H</text>
        <text x="100" y="158" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Staggered Ethane (θ = 60°, Minimum Torsion)</text>
      </svg>
    `,
    sn2Transition: `
      <svg viewBox="0 0 240 140" width="220" height="128">
        <!-- Central Carbon -->
        <circle cx="120" cy="70" r="14" fill="#0f172a" />
        <text x="120" y="74" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">C</text>
        <!-- Entering Nu- -->
        <text x="40" y="74" text-anchor="middle" font-size="12" font-weight="bold" fill="#16a34a">Nuᵟ⁻</text>
        <line x1="60" y1="70" x2="106" y2="70" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="4,3" />
        <!-- Leaving Lg- -->
        <line x1="134" y1="70" x2="180" y2="70" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4,3" />
        <text x="200" y="74" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">Lgᵟ⁻</text>
        <!-- Trigonal bipyramidal equatorial groups -->
        <line x1="120" y1="56" x2="120" y2="25" stroke="#475569" stroke-width="2" />
        <text x="120" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">H</text>
        <line x1="110" y1="78" x2="95" y2="105" stroke="#475569" stroke-width="2" />
        <text x="90" y="118" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">R</text>
        <line x1="130" y1="78" x2="145" y2="105" stroke="#475569" stroke-width="2" />
        <text x="150" y="118" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">H</text>
        <text x="120" y="135" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Pentacoordinate Transition State (Walden Inversion)</text>
      </svg>
    `
  };

  // Comprehensive Curriculum Definition: Chapters 0 to 25
  const CURRICULUM = [
    {
      id: "ch0-foundation",
      chapterNum: 0,
      title: "Chemistry Foundation",
      stage: 0,
      ncert: "Class 9 & 10 Science",
      jeeRelevance: "Bridge course for beginners",
      priority: "medium",
      prerequisites: ["Basic science curiosity"],
      estTime: "3.5 Hours",
      topics: [
        {
          id: "matter-atoms-config",
          title: "Matter, Atomic Structure & Electronic Configuration",
          priority: "medium",
          difficulty: "Easy",
          prereqList: ["Concept of pure elements", "Atoms as basic units of elements"],
          estMinutes: 25,
          simpleExplanation: "Everything around us is composed of atoms. An atom has a positively charged nucleus in the center containing protons (positive) and neutrons (neutral), surrounded by negatively charged electrons occupying defined shells (K, L, M, N) or subshells (s, p, d, f). For organic chemistry, the arrangement of electrons in the outermost shell determines how elements bond.",
          formalDefinition: "Bohr-Bury Rule: Maximum electrons in n-th shell is 2n². Valence electrons are the electrons residing in the outermost principal quantum shell, governing chemical bonding and reactivity.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Atomic Number (Z) = Number of protons = Number of electrons in a neutral atom.",
            "Octet Rule: Atoms gain, lose, or share electrons to attain the stable configuration of the nearest noble gas (8 valence electrons, or 2 for Helium).",
            "Carbon has Z = 6: Electronic configuration is 1s² 2s² 2p² (2 electrons in K shell, 4 in L shell)."
          ],
          examples: [
            {
              question: "State the number of valence electrons and the valency of Carbon (Z=6), Nitrogen (Z=7), and Oxygen (Z=8).",
              thinking: "Write electronic configuration in K, L shells: Carbon (2, 4), Nitrogen (2, 5), Oxygen (2, 6). Valency is the combining capacity to complete an octet.",
              solution: "• Carbon: 4 valence electrons; needs 4 electrons → Valency = 4 (tetravalent).\n• Nitrogen: 5 valence electrons; needs 3 electrons → Valency = 3 (trivalent).\n• Oxygen: 6 valence electrons; needs 2 electrons → Valency = 2 (divalent).",
              answer: "Carbon = 4, Nitrogen = 3, Oxygen = 2",
              proTip: "Organic chemistry is overwhelmingly built on C (valency 4), N (valency 3), O (valency 2), H (valency 1), and Halogens X (valency 1)."
            }
          ],
          practice: [
            {
              id: "fnd-01",
              question: "What is the ground state electronic configuration of a neutral carbon atom?",
              options: ["1s² 2s¹ 2p³", "1s² 2s² 2p²", "1s² 2s² 2p⁴", "1s² 2p⁴"],
              answer: 1,
              explanation: "Carbon has atomic number 6. Ground state configuration fills Aufbau orbitals in order: 1s² 2s² 2p².",
              commonMistake: "Confusing ground state (1s² 2s² 2p²) with excited state (1s¹ 2s¹ 2p¹ 2p¹ 2p¹).",
              concept: "Electronic Configuration"
            },
            {
              id: "fnd-02",
              question: "Why does carbon not readily form C⁴⁺ cation or C⁴⁻ anion in ionic bonding?",
              options: [
                "Carbon has no nucleus",
                "Removing 4 electrons requires unfeasibly huge ionisation enthalpy, while adding 4 electrons makes it impossible for 6 protons to hold 10 electrons",
                "Carbon is a radioactive noble gas",
                "Carbon only bonds with metals"
              ],
              answer: 1,
              explanation: "Removing 4 electrons requires massive energy (ΣIE₁₋₄). Gaining 4 electrons gives C⁴⁻ where 6 protons cannot stably hold 10 electrons. Hence, carbon exclusively shares electrons to form covalent bonds.",
              commonMistake: "Thinking carbon is too small to form bonds.",
              concept: "Covalent Bonding Tendency"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch0-t1",
          question: "An element X has electronic configuration 2, 8, 4. To which group and valency does it belong?",
          options: ["Group 14, Valency 4", "Group 4, Valency 4", "Group 12, Valency 2", "Group 16, Valency 2"],
          answer: 0,
          explanation: "4 valence electrons place it in Group 14 (Silicon family). Valency to complete octet is 8 - 4 = 4.",
          topic: "Electronic Configuration"
        },
        {
          id: "ch0-t2",
          question: "A covalent bond between two identical atoms (e.g. C–C) is classified as:",
          options: ["Coordinate ionic", "Purely non-polar covalent", "Polar covalent with permanent dipole", "Hydrogen bond"],
          answer: 1,
          explanation: "Identical atoms possess zero electronegativity difference (ΔEN = 0), sharing the electron pair symmetrically.",
          topic: "Covalent Bonding"
        }
      ],
      pyqs: [
        {
          id: "ch0-p1",
          year: "2023",
          session: "Jan Session 1",
          difficulty: "Easy",
          sourceType: "jee-main-style",
          question: "The maximum number of covalent bonds formed by a second period element (such as C, N, O) is restricted to four due to:",
          options: ["Availability of d-orbitals", "Non-availability of vacant d-orbitals in valence shell", "Very high nuclear charge", "Large atomic radius"],
          answer: 1,
          explanation: "Second period elements have principal quantum number n=2, possessing only 2s and three 2p orbitals (total 4 orbitals). Absence of 2d orbitals restricts their covalency to a maximum of 4.",
          topic: "Octet and Covalency"
        }
      ]
    },

    {
      id: "ch1-carbon",
      chapterNum: 1,
      title: "Carbon and Its Compounds",
      stage: 1,
      ncert: "Class 10 NCERT Chapter 4",
      jeeRelevance: "Essential Foundation for Organic Chemistry",
      priority: "high",
      prerequisites: ["ch0-foundation"],
      estTime: "5 Hours",
      topics: [
        {
          id: "catenation-tetravalency",
          title: "Tetravalency, Catenation & Covalent Bonding",
          priority: "high",
          difficulty: "Easy",
          prereqList: ["Ground state carbon configuration (1s² 2s² 2p²)", "Octet rule"],
          estMinutes: 30,
          simpleExplanation: "Carbon has the unique superpower to bind with other carbon atoms to form infinitely long straight chains, branched networks, and closed rings. This property is called catenation. It arises because the C–C single bond is exceptionally strong (bond enthalpy ~348 kJ/mol) due to carbon's compact atomic size.",
          formalDefinition: "Catenation: The property of self-linking of atoms of an element through covalent bonds to form straight, branched chains or rings. Tetravalency: Carbon exhibits a constant covalency of four by sharing four valence electrons.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Carbon ALWAYS forms four bonds in stable neutral molecules.",
            "Catenation order in Group 14: C >> Si > Ge ≈ Sn. Carbon's small size allows strong orbital overlap.",
            "Hydrocarbons: Compounds composed purely of carbon and hydrogen."
          ],
          examples: [
            {
              question: "Explain why silicon shows far less catenation capability than carbon despite both having 4 valence electrons.",
              thinking: "Catenation depends on the single bond strength of E–E. Relate bond strength to atomic radius.",
              solution: "Silicon has a larger atomic radius (n=3) with diffuse 3p orbitals. The Si–Si bond is significantly longer and weaker (~222 kJ/mol) compared to the strong C–C bond (~348 kJ/mol). Thus, long Si chains are unstable.",
              answer: "Weaker Si–Si bond due to larger atomic size and less effective orbital overlap.",
              proTip: "JEE Main frequently compares catenation ability of Group 14: C >> Si > Ge > Sn."
            }
          ],
          practice: [
            {
              id: "c-01",
              question: "Which of the following elements possesses the maximum catenation tendency?",
              options: ["Lead (Pb)", "Silicon (Si)", "Carbon (C)", "Germanium (Ge)"],
              answer: 2,
              explanation: "Carbon has the maximum catenation property because of its high C–C bond enthalpy (348 kJ/mol) and small atomic size.",
              commonMistake: "Choosing Silicon due to silicate rock abundance.",
              concept: "Catenation"
            },
            {
              id: "c-02",
              question: "In ethyne (acetylene, H–C≡C–H), how many single bonds and triple bonds are present?",
              options: ["3 single, 0 triple", "2 single, 1 triple", "1 single, 2 triple", "0 single, 3 triple"],
              answer: 1,
              explanation: "Structure is H–C≡C–H: two C–H single bonds and one C≡C triple bond.",
              commonMistake: "Forgetting the terminal C–H bonds.",
              concept: "Multiple Bonding"
            }
          ]
        },
        {
          id: "homologous-series",
          title: "Homologous Series & Functional Groups Introduction",
          priority: "high",
          difficulty: "Easy",
          prereqList: ["Tetravalency of carbon", "Alkane general formula CnH2n+2"],
          estMinutes: 30,
          simpleExplanation: "A homologous series is like a family of organic compounds sharing the same functional group and chemical properties, where each successive member differs from the next by a constant –CH₂– (methylene) unit (14 mass units).",
          formalDefinition: "A series of structurally related organic compounds containing the same functional group, exhibiting a regular gradation in physical properties and identical chemical characteristics, represented by a general molecular formula.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Successive members differ by –CH₂– and a molecular mass of 14 u.",
            "As molecular mass increases, boiling point and melting point rise steadily due to increased van der Waals forces.",
            "Chemical reactivity is governed by the functional group (e.g. –OH for alcohols, –COOH for carboxylic acids)."
          ],
          examples: [
            {
              question: "Write the molecular formulas of the first 3 members of the alkyne series and state the mass difference between member 1 and member 2.",
              thinking: "Alkyne general formula is CnH2n-2, starting at n=2 (ethyne).",
              solution: "• n=2: C₂H₂ (Ethyne, M = 26 u)\n• n=3: C₃H₄ (Propyne, M = 40 u)\n• n=4: C₄H₆ (Butyne, M = 54 u)\nDifference between C₂H₂ and C₃H₄ is –CH₂– (12 + 2 = 14 u).",
              answer: "C₂H₂, C₃H₄, C₄H₆; mass difference = 14 u",
              proTip: "Branched chain isomers always have lower boiling points than straight-chain isomers of identical molecular formula due to lower surface area."
            }
          ],
          practice: [
            {
              id: "hs-01",
              question: "What is the general molecular formula for non-cyclic saturated ketones and aldehydes?",
              options: ["CnH2n+2O", "CnH2nO", "CnH2n-2O", "CnH2nO2"],
              answer: 1,
              explanation: "Both aliphatic aldehydes and ketones have 1 double bond equivalent (the C=O pi bond). Their general formula is CnH2nO.",
              commonMistake: "Choosing CnH2n+2O which corresponds to saturated alcohols and ethers.",
              concept: "Homologous Series"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch1-t1",
          question: "Which of the following pairs represent functional group isomers?",
          options: ["Ethanol and Dimethyl ether", "Methanol and Ethanol", "Ethane and Ethene", "Propanal and Ethanoic acid"],
          answer: 0,
          explanation: "Both Ethanol (CH₃CH₂OH) and Dimethyl ether (CH₃–O–CH₃) have identical molecular formula C₂H₆O but different functional groups (alcohol vs ether).",
          topic: "Functional Groups"
        }
      ],
      pyqs: [
        {
          id: "ch1-p1",
          year: "2022",
          session: "July Session",
          difficulty: "Easy",
          sourceType: "jee-main-style",
          question: "The boiling point of pentane is significantly higher than that of 2,2-dimethylpropane (neopentane). The predominant reason is:",
          options: [
            "Pentane has polar bonds",
            "Linear pentane has greater surface area and stronger London dispersion forces",
            "Neopentane has hydrogen bonding",
            "Neopentane has an incomplete octet"
          ],
          answer: 1,
          explanation: "Branching makes the molecule spherical, decreasing surface area of contact, which lowers intermolecular London dispersion van der Waals forces.",
          topic: "Physical Properties"
        }
      ]
    },

    {
      id: "ch4-bonding",
      chapterNum: 4,
      title: "Chemical Bonding for Organic Chemistry",
      stage: 2,
      ncert: "Class 11 NCERT Chapter 4",
      jeeRelevance: "Foundational for 100% of Organic Chemistry Mechanisms",
      priority: "very-high",
      prerequisites: ["ch0-foundation", "ch1-carbon"],
      estTime: "6 Hours",
      topics: [
        {
          id: "hybridisation-geometry",
          title: "Hybridisation (sp³, sp², sp), Geometry & Bond Parameters",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Valence orbital concepts", "Tetravalency of carbon"],
          estMinutes: 35,
          simpleExplanation: "To form 4 identical bonds with 109.5° angles in methane, carbon mixes one 2s orbital and three 2p orbitals to create four equivalent hybrid orbitals of equal energy called sp³ orbitals. If it mixes 2s with two 2p orbitals, it forms three sp² hybrid orbitals (planar, 120°) leaving one unhybridised p-orbital to make a π-bond.",
          formalDefinition: "Hybridisation is the intermixing of atomic orbitals of slightly different energies to produce a new set of equivalent orbitals having identical energy, shape, and directional properties.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Steric Number = (Number of attached atoms) + (Number of lone pairs on central atom).",
            "Steric Number 4 → sp³ hybridised (tetrahedral, 109.5°). Example: CH₄, CH₃OH.",
            "Steric Number 3 → sp² hybridised (trigonal planar, 120°). Example: H₂C=CH₂, carbocation C⁺, benzene.",
            "Steric Number 2 → sp hybridised (linear, 180°). Example: H–C≡C–H, CO₂.",
            "Electronegativity increases with s-character: sp (50% s) > sp² (33.3% s) > sp³ (25% s)."
          ],
          examples: [
            {
              question: "Find the hybridisation state of each carbon in CH₂=C=CH₂ (Allene).",
              thinking: "Count the number of σ-bonds for each carbon. Terminal carbons have 2 C-H σ-bonds and 1 C-C σ-bond. Central carbon has 2 C-C σ-bonds and no lone pairs.",
              solution: "• Carbon 1: 3 σ-bonds, 0 lone pairs → Steric number 3 → sp²\n• Carbon 2 (central): 2 σ-bonds (one to each adjacent C), 0 lone pairs → Steric number 2 → sp\n• Carbon 3: 3 σ-bonds, 0 lone pairs → Steric number 3 → sp²",
              answer: "C1: sp², C2: sp, C3: sp²",
              proTip: "Because central carbon in allene uses perpendicular p-orbitals to form the two π-bonds, the two terminal =CH₂ groups are in mutually perpendicular planes! This makes properly substituted allenes chiral without a chiral center!"
            }
          ],
          practice: [
            {
              id: "bnd-01",
              question: "What is the hybridisation of the positively charged carbon in a methyl carbocation (CH₃⁺)?",
              options: ["sp³", "sp²", "sp", "dsp²"],
              answer: 1,
              explanation: "Carbon has 3 single C–H σ-bonds and zero lone pairs. Steric number is 3, yielding sp² hybridisation with an empty, unhybridised 2p orbital perpendicular to the molecular plane.",
              commonMistake: "Assuming carbon is always sp³.",
              concept: "Carbocation Geometry"
            },
            {
              id: "bnd-02",
              question: "Arrange the hydrocarbons Ethane (I), Ethene (II), and Ethyne (III) in order of increasing C–H bond acidity:",
              options: ["I < II < III", "III < II < I", "II < I < III", "I < III < II"],
              answer: 0,
              explanation: "Ethyne carbon is sp (50% s-character), ethene is sp² (33% s), ethane is sp³ (25% s). Higher s-character concentrates electron density closer to carbon nucleus, stabilising the conjugate carbanion conjugate base. Hence acidity: Ethane < Ethene < Ethyne.",
              commonMistake: "Inverting the acidity order.",
              concept: "s-character and Acidity"
            }
          ]
        },
        {
          id: "resonance-concept",
          title: "Resonance, Delocalisation & Hybrid Stability",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["sp² hybridisation", "π-bonds & p-orbitals"],
          estMinutes: 40,
          simpleExplanation: "When a single Lewis formula cannot accurately describe all physical and chemical properties of a molecule, we draw multiple contributing Lewis structures. The real molecule is a resonance hybrid that is lower in energy and much more stable than any individual contributing form. Electrons don't bounce between forms; they are permanently delocalised over the whole conjugated system.",
          formalDefinition: "Resonance represents the delocalisation of π-electrons or lone pairs across continuous parallel p-orbitals, leading to an overall lowering of molecular potential energy termed Resonance Energy.",
          visualHtml: DIAGRAMS.benzene,
          rules: [
            "Conjugation requires continuous parallel p-orbitals. Common patterns: (1) π–σ–π, (2) π–σ–⊕ (carbocation), (3) π–σ–⊖ (carbanion), (4) π–σ–Lone Pair, (5) π–σ–• (free radical).",
            "Atoms NEVER move during resonance! ONLY π-electrons and unshared lone pairs shift.",
            "Rules for contributing structure stability: (1) Complete octets > incomplete octets. (2) More covalent bonds > fewer bonds. (3) Negative charge on more electronegative atom (O, N) > on carbon. (4) Minimum charge separation."
          ],
          examples: [
            {
              question: "Between (A) CH₂=CH–O⁻ and (B) ⁻CH₂–CH=O, which contributing structure is more stable?",
              thinking: "Both have identical number of bonds and octets. Compare the electronegativity of the atom bearing the negative charge.",
              solution: "In structure (A), negative formal charge is on Oxygen (electronegativity = 3.5). In structure (B), negative formal charge is on Carbon (electronegativity = 2.5). More electronegative atoms stabilize negative charge better.",
              answer: "(A) CH₂=CH–O⁻ is the major contributor.",
              proTip: "A neutral structure with complete octets is almost always more stable than any dipolar charge-separated structure."
            }
          ],
          practice: [
            {
              id: "res-01",
              question: "Which of the following sets represents a conjugated system capable of resonance?",
              options: [
                "CH₃–CH₂–CH₂–CH₃",
                "CH₂=CH–CH₂–CH=CH₂",
                "CH₂=CH–CH=CH₂",
                "CH₄"
              ],
              answer: 2,
              explanation: "CH₂=CH–CH=CH₂ has the conjugated π–σ–π pattern where all four carbons are sp² with overlapping p-orbitals. In 1,4-pentadiene, an sp³ CH₂ isolates the double bonds.",
              commonMistake: "Assuming two double bonds anywhere in a molecule will resonate.",
              concept: "Conjugation Conditions"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch4-t1",
          question: "The C–C single bond length between sp²–sp² carbons in 1,3-butadiene is 1.48 Å, which is shorter than in ethane (1.54 Å). Why?",
          options: [
            "Higher s-character of sp² carbons and partial double-bond character due to resonance",
            "Steric hindrance makes it shorter",
            "Carbon has an expanded octet",
            "Inductive withdrawal by hydrogens"
          ],
          answer: 0,
          explanation: "sp² carbons have 33.3% s-character pulling electrons closer, and resonance delocalises π-electrons giving partial double bond character.",
          topic: "Resonance and Bond Length"
        }
      ],
      pyqs: [
        {
          id: "ch4-p1",
          year: "2023",
          session: "April Session 2",
          difficulty: "Medium",
          sourceType: "verified-pyq",
          question: "Which of the following compounds exhibits intramolecular hydrogen bonding?",
          options: ["o-Nitrophenol", "p-Nitrophenol", "m-Nitrophenol", "Phenol"],
          answer: 0,
          explanation: "In o-nitrophenol, the –OH and –NO₂ groups are adjacent, forming a stable 6-membered chelate ring via intramolecular hydrogen bonding. In the para and meta isomers, distance prevents this.",
          topic: "Hydrogen Bonding"
        }
      ]
    },

    {
      id: "ch6-iupac",
      chapterNum: 6,
      title: "IUPAC Nomenclature of Organic Compounds",
      stage: 3,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "Guaranteed 4 marks in JEE Main every year",
      priority: "very-high",
      prerequisites: ["ch1-carbon", "ch4-bonding"],
      estTime: "8 Hours",
      topics: [
        {
          id: "iupac-priority-rules",
          title: "Principal Functional Groups, Priority Order & Locant Rules",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Functional groups identification", "Parent carbon chain rules"],
          estMinutes: 45,
          simpleExplanation: "IUPAC naming is a logical language with four parts: Prefix + Infix (Root word) + Primary Suffix + Secondary Suffix. If a molecule contains multiple functional groups, one takes supreme authority as the Principal Functional Group (determining the suffix), while all other groups are demoted to mere substituents (prefixes).",
          formalDefinition: "Systematic IUPAC format: [Secondary Prefix (substituents)] + [Primary Prefix (cyclo)] + [Root Word (longest C chain)] + [Primary Suffix (an/en/yn)] + [Secondary Suffix (principal functional group)].",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Supreme Priority Order for Suffix:\n–COOH (oic acid) > –SO₃H > –COOR (ester) > –COCl (acyl halide) > –CONH₂ (amide) > –CN (nitrile) > –CHO (al) > >C=O (one) > –OH (ol) > –SH > –NH₂ (amine) > >C=C< (ene) > –C≡C– (yne).",
            "Lowest Locant Rule: Number the chain so that the set of locants for principal groups / substituents has the lowest number at the first point of difference.",
            "Substituents are always cited in strictly ALPHABETICAL order, ignoring multiplicative prefixes (di-, tri-) but considering iso- and neo-."
          ],
          examples: [
            {
              question: "Give the IUPAC name for CH₃–CH(OH)–CH₂–CO–CH₃.",
              thinking: "Identify groups: Ketone (>C=O at C2) and Alcohol (–OH at C4). Check priority chart: Ketone > Alcohol.",
              solution: "1. Principal functional group is ketone → Suffix is '-one'.\n2. –OH is demoted to a substituent prefix named 'hydroxy'.\n3. Longest carbon chain has 5 carbons → Root 'pentan'.\n4. Numbering from right to give lowest locant to carbonyl: C1(CH₃) - C2(=O) - C3(CH₂) - C4(CH-OH) - C5(CH₃).\n5. Locants: 4-hydroxy, 2-one.",
              answer: "4-Hydroxypentan-2-one",
              proTip: "Never number from the end that gives lower number to a substituent over the principal functional group!"
            }
          ],
          practice: [
            {
              id: "iupac-01",
              question: "What is the correct IUPAC name of the compound CH₂=CH–CH₂–C≡CH?",
              options: ["Pent-1-en-4-yne", "Pent-4-en-1-yne", "Pent-1-yn-4-ene", "Pent-4-yn-1-ene"],
              answer: 0,
              explanation: "When a double bond and triple bond are at equidistant positions from the chain ends, the double bond gets lower locant priority (alphabetical 'en' before 'yn'). Thus C1 is the double bond: Pent-1-en-4-yne.",
              commonMistake: "Giving triple bond lower locant.",
              concept: "Multiple Bond Priority"
            },
            {
              id: "iupac-02",
              question: "The prefix used for the substituent –CHO when it is not part of the parent chain or when a higher priority group like –COOH is present is:",
              options: ["Oxo or Formyl", "Al", "Carboxaldehyde", "Keto"],
              answer: 0,
              explanation: "When –CHO carbon is included in numbering, it is named 'oxo'. When excluded, it is named 'formyl'.",
              commonMistake: "Using suffix 'al' for substituent.",
              concept: "Substituent Prefixes"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch6-t1",
          question: "The correct IUPAC name of 2-ethyl-3-methylpent-1-ene is valid, but what is the parent chain length?",
          options: ["5 carbons", "6 carbons", "7 carbons", "4 carbons"],
          answer: 0,
          explanation: "The longest chain containing the double bond has 5 carbons: pent-1-ene with ethyl at C2 and methyl at C3.",
          topic: "IUPAC Naming"
        }
      ],
      pyqs: [
        {
          id: "ch6-p1",
          year: "2024",
          session: "Jan Session 2",
          difficulty: "Easy",
          sourceType: "verified-pyq",
          question: "The IUPAC name of the compound HO–CH₂–CH₂–COOH is:",
          options: ["3-Hydroxypropanoic acid", "2-Hydroxyethanoic acid", "3-Carboxyethanol", "1-Hydroxypropan-3-oic acid"],
          answer: 0,
          explanation: "–COOH is carbon 1. At carbon 3, there is a hydroxy substituent. Parent chain has 3 carbons → 3-Hydroxypropanoic acid.",
          topic: "IUPAC Nomenclature"
        }
      ]
    },

    {
      id: "ch7-isomerism",
      chapterNum: 7,
      title: "Isomerism in Organic Compounds",
      stage: 3,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "Crucial for counting isomers and stereochemistry questions",
      priority: "very-high",
      prerequisites: ["ch6-iupac"],
      estTime: "8 Hours",
      topics: [
        {
          id: "structural-isomerism",
          title: "Structural Isomerism (Chain, Position, Functional, Metamerism, Tautomerism)",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["Molecular formulas", "Functional groups"],
          estMinutes: 35,
          simpleExplanation: "Structural isomers share the exact same molecular formula but differ in the connectivity of their atoms. A special, crucial dynamic type is tautomerism (keto-enol), where a proton (H⁺) rapidly migrates between two atoms along with a shifting π-bond.",
          formalDefinition: "Isomers having identical molecular formula but differing in structural arrangement or connectivity of constituent atoms.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Tautomerism requires at least one α-hydrogen adjacent to the carbonyl (C=O) group.",
            "Generally, the keto form is much more stable than the enol form (~99% keto in acetone) because C=O bond is much stronger than C=C.",
            "Exceptions where enol dominates (>90%): β-dicarbonyls (e.g. acetylacetone) due to resonance conjugation + intramolecular H-bonding, and Phenol due to aromaticity!"
          ],
          examples: [
            {
              question: "Between Acetone and Acetylacetone (CH₃–CO–CH₂–CO–CH₃), which has a higher percentage of enol form at equilibrium?",
              thinking: "Examine what stabilises the enol of acetylacetone compared to acetone.",
              solution: "Enolisation of acetylacetone yields CH₃–C(OH)=CH–CO–CH₃. This enol is exceptionally stable because (1) the C=C is conjugated with C=O, and (2) it forms a planar 6-membered ring stabilized by intramolecular hydrogen bonding (O–H···O). Thus enol content is ~76% compared to 0.0001% for acetone.",
              answer: "Acetylacetone has a drastically higher enol content.",
              proTip: "Phenol is theoretically the enol form of cyclohexadienone, but exists 100% as enol because of aromatic resonance energy (150 kJ/mol)!"
            }
          ],
          practice: [
            {
              id: "iso-01",
              question: "Diethyl ether (C₂H₅–O–C₂H₅) and Methyl propyl ether (CH₃–O–C₃H₇) are related as:",
              options: ["Metamers", "Functional isomers", "Chain isomers only", "Geometrical isomers"],
              answer: 0,
              explanation: "Metamers possess the same functional group (ether) but unequal distribution of alkyl groups on either side of the divalent heteroatom.",
              commonMistake: "Calling them position isomers.",
              concept: "Metamerism"
            }
          ]
        },
        {
          id: "optical-isomerism",
          title: "Optical Isomerism: Chirality, Enantiomers, Diastereomers & Meso",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Tetrahedral geometry", "3D wedge-dash notation"],
          estMinutes: 45,
          simpleExplanation: "Look at your left and right hands: they are mirror images, but you cannot superimpose them palm-to-palm facing the same way. A molecule is chiral if its mirror image is non-superimposable. A carbon bonded to four different groups is an asymmetric chiral center.",
          formalDefinition: "Chirality: Property of asymmetry where a molecule cannot be superimposed on its mirror image, lacking an internal plane of symmetry (σ) or center of inversion (i).",
          visualHtml: DIAGRAMS.newman,
          rules: [
            "Enantiomers: Non-superimposable mirror images. They have identical melting point, boiling point, density, but rotate plane-polarized light in equal and opposite directions (+d and -l).",
            "Diastereomers: Stereoisomers that are NOT mirror images of each other. They have different physical properties and can be separated by fractional distillation!",
            "Meso Compound: A molecule having 2 or more chiral centers that is OPTICALLY INACTIVE due to an internal plane of symmetry (internal compensation)."
          ],
          examples: [
            {
              question: "Does Tartaric acid [HOOC–CH(OH)–CH(OH)–COOH] have a meso isomer? Explain.",
              thinking: "Check if a stereoisomer can have an internal plane of symmetry splitting the top and bottom halves.",
              solution: "Yes! When both –OH groups are on the same side in Fischer projection, the top half (–CH(OH)COOH) is an exact mirror reflection of the bottom half. An internal plane of symmetry (σ) exists. The optical rotation of the upper half cancels the lower half.",
              answer: "Yes, meso-tartaric acid is optically inactive due to internal plane of symmetry.",
              proTip: "A 50:50 equimolar mixture of enantiomers is a Racemic mixture (±), optically inactive by external compensation."
            }
          ],
          practice: [
            {
              id: "opt-01",
              question: "Which of the following compounds is chiral and optically active?",
              options: ["2-Chloropropane", "2-Chlorobutane", "1-Chlorobutane", "Propanoic acid"],
              answer: 1,
              explanation: "In 2-chlorobutane, C2 is bonded to 4 distinctly different groups: –H, –Cl, –CH₃, and –C₂H₅. Hence it is chiral.",
              commonMistake: "Selecting 2-chloropropane which has two identical –CH₃ groups on C2.",
              concept: "Chiral Carbon"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch7-t1",
          question: "How many stereoisomers exist for 2,3-dichlorobutane?",
          options: ["4", "3 (1 pair of enantiomers + 1 meso compound)", "2", "8"],
          answer: 1,
          explanation: "Because the two chiral centers have identical sets of substituents, the formula is 2^(n-1) = 2¹ = 2 active forms (1 pair enantiomers) and 2^(n/2-1) = 1 meso form. Total = 3.",
          topic: "Stereoisomer Counting"
        }
      ],
      pyqs: [
        {
          id: "ch7-p1",
          year: "2023",
          session: "Jan Session 2",
          difficulty: "Medium",
          sourceType: "verified-pyq",
          question: "A solution of pure (+)-enantiomer has a specific optical rotation of +40°. A mixture containing 75% (+) and 25% (-) of this substance will have an observed optical rotation of:",
          options: ["+20°", "+40°", "+10°", "-20°"],
          answer: 0,
          explanation: "Optical purity (Enantiomeric Excess, ee) = % major - % minor = 75% - 25% = 50%. Observed rotation = ee × [α] = 0.50 × (+40°) = +20°.",
          topic: "Optical Rotation & Enantiomeric Excess"
        }
      ]
    },

    {
      id: "ch8-goc",
      chapterNum: 8,
      title: "General Organic Chemistry & Reaction Mechanisms",
      stage: 3,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "HEART of Organic Chemistry (12-16 Marks direct & indirect)",
      priority: "very-high",
      prerequisites: ["ch4-bonding", "ch6-iupac", "ch7-isomerism"],
      estTime: "14 Hours",
      topics: [
        {
          id: "electronic-effects",
          title: "Inductive (+I, -I), Resonance (+M, -M) & Hyperconjugation",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Electronegativity", "Resonance structures", "p-orbitals"],
          estMinutes: 50,
          simpleExplanation: "Why do reactions happen? Because electrons flow from regions of high electron density to regions of low electron density! Electronic effects determine where electrons pile up or where positive charges develop.",
          formalDefinition: "1. Inductive Effect (I): Permanent polarization of σ-bonds due to electronegativity differences, weakening with distance.\n2. Mesomeric/Resonance Effect (M/R): Delocalisation of π-electrons or lone pairs through conjugated p-orbitals.\n3. Hyperconjugation: Delocalisation of σ(C–H) electrons into an adjacent vacant or partially filled p-orbital.",
          visualHtml: DIAGRAMS.carbocation,
          rules: [
            "Hierarchy of Effect Strengths: Mesomeric (Resonance) > Hyperconjugation > Inductive Effect (AERHI: Aromaticity > Equiv Resonance > Resonance > Hyperconjugation > Inductive).",
            "Exception: Halogens attached to benzene act as net electron-withdrawing by -I (inductive dominates resonance for deactivated rate), but orient incoming electrophiles ortho/para (+M controls orientation)!",
            "+I Order: –O⁻ > –COO⁻ > –C(CH₃)₃ > –CH(CH₃)₂ > –CH₂CH₃ > –CH₃ > –T > –D > –H.",
            "-I Order: –NR₃⁺ > –NO₂ > –CN > –SO₃H > –CHO > –COOH > –F > –Cl > –Br > –I > –OH > –OR > –NH₂ > –C₆H₅ > –H."
          ],
          examples: [
            {
              question: "Arrange in order of increasing acidity: (A) CH₃COOH, (B) Cl–CH₂COOH, (C) Cl₂CHCOOH, (D) F–CH₂COOH.",
              thinking: "Acidity depends on stabilization of the carboxylate anion (RCOO⁻). Electron-withdrawing groups (-I) disperse negative charge and increase acidity.",
              solution: "• Fluorine has higher electronegativity than Chlorine (-I: F > Cl).\n• Two chlorine atoms in (C) provide stronger inductive pull than one fluorine in (D).\n• Order of -I withdrawal: Cl₂CH– > F–CH₂– > Cl–CH₂– > CH₃–.",
              answer: "CH₃COOH < Cl–CH₂COOH < F–CH₂COOH < Cl₂CHCOOH",
              proTip: "-I effect decreases drastically with distance: it is practically zero after 3 carbon atoms!"
            }
          ],
          practice: [
            {
              id: "goc-01",
              question: "Which of the following groups exhibits a +M (electron-donating by resonance) effect when attached to a benzene ring?",
              options: ["–NO₂", "–CN", "–OCH₃", "–CHO"],
              answer: 2,
              explanation: "Oxygen in –OCH₃ has unshared lone pairs on an atom directly attached to the benzene ring, which can be donated into the conjugated ring system (+M). –NO₂, –CN, and –CHO all pull electrons away (-M).",
              commonMistake: "Thinking oxygen is electronegative so it can only withdraw.",
              concept: "Mesomeric Effect"
            },
            {
              id: "goc-02",
              question: "How many hyperconjugative α-hydrogens are present in the tert-butyl carbocation, (CH₃)₃C⁺?",
              options: ["3", "6", "9", "0"],
              answer: 2,
              explanation: "There are three methyl groups directly attached to the sp² carbocation carbon. Each methyl has 3 C–H bonds. Total α-hydrogens = 3 × 3 = 9.",
              commonMistake: "Counting hydrogens attached to the positive carbon (which are 0).",
              concept: "Hyperconjugation"
            }
          ]
        },
        {
          id: "reaction-intermediates",
          title: "Reaction Intermediates: Carbocations, Carbanions & Free Radicals",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Homolytic vs heterolytic bond fission", "Electronic effects"],
          estMinutes: 45,
          simpleExplanation: "When a covalent C–X bond breaks heterolytically, if X takes both electrons, Carbon is left with a positive charge (Carbocation). If Carbon takes both electrons, it becomes a Carbanion. In homolytic fission, each atom takes one electron, producing a Free Radical.",
          formalDefinition: "Short-lived, high-energy reactive species generated in elementary reaction steps whose stability dictates activation energy and product distribution.",
          visualHtml: DIAGRAMS.carbocation,
          rules: [
            "Carbocation Stability: 3° > 2° > 1° > methyl (stabilized by +I, hyperconjugation, and resonance).",
            "Carbocations undergo REARRANGEMENT via 1,2-hydride shift or 1,2-methyl shift whenever a more stable carbocation can be formed!",
            "Carbanion Stability: methyl > 1° > 2° > 3° (destabilized by +I alkyl groups; stabilized by -I, -M, and higher s-character).",
            "Free Radical Stability: 3° > 2° > 1° > methyl (stabilized by hyperconjugation and resonance, similar to carbocations)."
          ],
          examples: [
            {
              question: "Predict the major intermediate formed when 3,3-dimethylbutan-2-ol is treated with H₂SO₄.",
              thinking: "1. Protonation of –OH gives –OH₂⁺. 2. Loss of H₂O gives secondary carbocation CH₃–C(CH₃)₂–CH⁺–CH₃. 3. Check for rearrangement.",
              solution: "The formed 2° carbocation is adjacent to a quaternary carbon with methyl groups. A 1,2-methyl shift occurs instantly to convert the 2° carbocation into an immensely more stable 3° carbocation: (CH₃)₂C⁺–CH(CH₃)₂.",
              answer: "3° carbocation: (CH₃)₂C⁺–CH(CH₃)₂",
              proTip: "Whenever an organic mechanism generates a carbocation, ALWAYS check if a 1,2-hydride, 1,2-methyl, or ring-expansion shift can create a more stable intermediate!"
            }
          ],
          practice: [
            {
              id: "goc-03",
              question: "Which of the following carbocations is the most stable?",
              options: ["(CH₃)₃C⁺", "C₆H₅–CH₂⁺ (Benzyl)", "(C₆H₅)₃C⁺ (Triphenylmethyl)", "CH₂=CH–CH₂⁺ (Allyl)"],
              answer: 2,
              explanation: "The triphenylmethyl carbocation (trityl) is stabilized by resonance across three full benzene rings (total 10 resonance contributors), making it stable enough to isolate as salts!",
              commonMistake: "Choosing tert-butyl carbocation.",
              concept: "Carbocation Stability"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch8-t1",
          question: "Which of the following species is aromatic according to Hückel's Rule?",
          options: ["Cyclopentadienyl cation (4π e⁻)", "Cyclopentadienyl anion (6π e⁻)", "Cycloheptatrienyl anion (8π e⁻)", "Cyclooctatetraene (8π e⁻)"],
          answer: 1,
          explanation: "Cyclopentadienyl anion is planar, completely conjugated, and possesses 6 π-electrons (4 from double bonds + 2 from carbanion lone pair), satisfying 4n+2 for n=1.",
          topic: "Aromaticity"
        },
        {
          id: "ch8-t2",
          question: "The correct order of stability of carbanions is:",
          options: [
            "HC≡C⁻ > CH₂=CH⁻ > CH₃–CH₂⁻",
            "CH₃–CH₂⁻ > CH₂=CH⁻ > HC≡C⁻",
            "CH₂=CH⁻ > HC≡C⁻ > CH₃–CH₂⁻",
            "HC≡C⁻ = CH₂=CH⁻ = CH₃–CH₂⁻"
          ],
          answer: 0,
          explanation: "Stability increases with s-character: sp (50% s in HC≡C⁻) > sp² (33% s in CH₂=CH⁻) > sp³ (25% s in CH₃–CH₂⁻). Higher s-character holds negative charge closer to the nucleus.",
          topic: "Carbanion Stability"
        }
      ],
      pyqs: [
        {
          id: "ch8-p1",
          year: "2024",
          session: "Jan Session 1",
          difficulty: "Medium",
          sourceType: "verified-pyq",
          question: "The correct order of basicity for the following substituted anilines is: (I) Aniline, (II) p-Nitroaniline, (III) p-Methoxyaniline, (IV) p-Chloroaniline:",
          options: [
            "III > I > IV > II",
            "II > IV > I > III",
            "III > IV > I > II",
            "I > III > IV > II"
          ],
          answer: 0,
          explanation: "Electron-donating groups (+M: –OCH₃) increase electron density on nitrogen, increasing basicity (III is most basic). Electron-withdrawing groups decrease basicity (-M: –NO₂ makes II the weakest base; -I of Cl makes IV weaker than aniline I).",
          topic: "Basicity of Anilines"
        }
      ]
    },

    {
      id: "ch10-alkenes",
      chapterNum: 10,
      title: "Alkenes & Electrophilic Additions",
      stage: 4,
      ncert: "Class 11 NCERT Chapter 13",
      jeeRelevance: "Very High (Markovnikov, Peroxide effect, Ozonolysis)",
      priority: "very-high",
      prerequisites: ["ch8-goc"],
      estTime: "8 Hours",
      topics: [
        {
          id: "electrophilic-addition-markovnikov",
          title: "Markovnikov Addition vs Kharasch Anti-Markovnikov Peroxide Effect",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Carbocation stability", "Free radical stability"],
          estMinutes: 40,
          simpleExplanation: "Alkenes are electron-rich due to their loosely held π-electron cloud. When an electrophile (like H⁺ from HBr) attacks, it adds to form the most stable carbocation. Markovnikov's rule is simply the natural consequence of carbocation stability! But with HBr in the presence of organic peroxides (R–O–O–R), a free-radical mechanism takes over, reversing the orientation.",
          formalDefinition: "Markovnikov's Rule: In electrophilic addition of an unsymmetrical reagent (HX) to an unsymmetrical alkene, the positive part (H⁺) attaches to the carbon with more hydrogen atoms to yield the more stable carbocation intermediate.",
          visualHtml: DIAGRAMS.carbocation,
          rules: [
            "Peroxide effect (Kharasch effect) operates ONLY with HBr! It fails with HF (H–F bond too strong to break homolytically), HCl (H–Cl bond too strong), and HI (I–I combination is favored over addition to alkene).",
            "Markovnikov addition goes through a planar carbocation intermediate (rearrangement possible).",
            "Ozonolysis (O₃ followed by Zn/H₂O) cleanly cleaves C=C double bonds into aldehydes and ketones without over-oxidation to acids."
          ],
          examples: [
            {
              question: "Predict the major product of 3-methylbut-1-ene + HCl.",
              thinking: "1. Protonation of CH₂=CH–CH(CH₃)₂ gives 2° carbocation: CH₃–C⁺H–CH(CH₃)₂. 2. Adjacent carbon has a tertiary H. 1,2-hydride shift occurs!",
              solution: "• Protonation yields 2° carbocation: CH₃–C⁺H–CH(CH₃)₂.\n• 1,2-Hydride shift gives 3° carbocation: CH₃–CH₂–C⁺(CH₃)₂.\n• Chloride ion attacks the 3° carbocation to give 2-chloro-2-methylbutane as the major rearranged product.",
              answer: "2-Chloro-2-methylbutane (rearranged product)",
              proTip: "Standard Markovnikov without rearrangement would incorrectly predict 2-chloro-3-methylbutane. In JEE Main, ALWAYS test for rearrangement in HX additions!"
            }
          ],
          practice: [
            {
              id: "alk-01",
              question: "Propene reacts with HBr in the presence of benzoyl peroxide to yield primarily:",
              options: ["1-Bromopropane", "2-Bromopropane", "2,2-Dibromopropane", "Propane"],
              answer: 0,
              explanation: "In presence of peroxide, HBr adds via a free-radical mechanism. The Br• radical adds to C1 to produce the more stable secondary free radical (CH₃–C•H–CH₂Br), which then abstracts H from HBr giving 1-bromopropane (anti-Markovnikov).",
              commonMistake: "Choosing 2-bromopropane (which is obtained in absence of peroxide).",
              concept: "Peroxide Effect"
            },
            {
              id: "alk-02",
              question: "An alkene on reductive ozonolysis (O₃ followed by Zn/H₂O) yields Acetone and Formaldehyde. The alkene is:",
              options: ["2-Methylpropene", "But-2-ene", "But-1-ene", "Pent-2-ene"],
              answer: 0,
              explanation: "Combine the fragments by joining the carbonyl carbons with a double bond: (CH₃)₂C=O + O=CH₂ → (CH₃)₂C=CH₂ (2-methylpropene or isobutylene).",
              commonMistake: "Misassembling the fragment carbons.",
              concept: "Ozonolysis"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch10-t1",
          question: "Treatment of cis-but-2-ene with Br₂ in CCl₄ yields:",
          options: ["Racemic (±)-2,3-dibromobutane", "Meso-2,3-dibromobutane", "Only d-isomer", "Only l-isomer"],
          answer: 0,
          explanation: "Bromination is an anti-addition via a cyclic bromonium ion. Anti-addition on a cis-alkene produces a racemic pair of enantiomers (CAR: Cis + Anti → Racemic; TAM: Trans + Anti → Meso).",
          topic: "Stereochemistry of Alkene Additions"
        }
      ],
      pyqs: [
        {
          id: "ch10-p1",
          year: "2024",
          session: "Jan Session 2",
          difficulty: "Medium",
          sourceType: "verified-pyq",
          question: "Major product formed when 1-methylcyclohexene is treated with B₂H₆ followed by alkaline H₂O₂ is:",
          options: [
            "trans-2-Methylcyclohexanol",
            "cis-2-Methylcyclohexanol",
            "1-Methylcyclohexanol",
            "Methylcyclohexane"
          ],
          answer: 0,
          explanation: "Hydroboration-oxidation gives anti-Markovnikov addition of H and OH with overall SYN addition. Addition of H and OH to the same face of 1-methylcyclohexene forces the methyl and –OH groups into a trans relationship.",
          topic: "Hydroboration Oxidation"
        }
      ]
    },

    {
      id: "ch13-haloalkanes",
      chapterNum: 13,
      title: "Haloalkanes and Haloarenes",
      stage: 5,
      ncert: "Class 12 NCERT Chapter 10",
      jeeRelevance: "SN1, SN2, E1, E2 Mechanisms (Extremely High Frequency)",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch10-alkenes"],
      estTime: "10 Hours",
      topics: [
        {
          id: "sn1-vs-sn2",
          title: "Nucleophilic Substitution: SN1 vs SN2 Mechanisms & Stereochemistry",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Carbocation stability", "Transition states", "Chirality & Walden inversion"],
          estMinutes: 50,
          simpleExplanation: "In nucleophilic substitution, a nucleophile displaces a halogen leaving group. It can happen in two completely different ways:\n• SN2: A one-step concerted backside attack. As the nucleophile pushes in from the back, the leaving group pops off the front, causing a complete Walden inversion (like an umbrella in a storm).\n• SN1: A two-step process. First, the leaving group falls off, creating a planar carbocation. Then, the nucleophile can attack equally from either the top or bottom face, causing racemisation.",
          formalDefinition: "SN2: Substitution Nucleophilic Bimolecular; Rate = k[R-X][Nu⁻]; 2nd order kinetics, no intermediate, complete stereochemical inversion.\nSN1: Substitution Nucleophilic Unimolecular; Rate = k[R-X]; 1st order kinetics, carbocation intermediate, racemisation with partial inversion.",
          visualHtml: DIAGRAMS.sn2Transition,
          rules: [
            "Substrate Reactivity:\n• SN2 Order: Methyl > 1° > 2° >> 3° (governed by steric hindrance).\n• SN1 Order: 3° > 2° >> 1° > Methyl (governed by carbocation stability).",
            "Nucleophile & Solvent:\n• SN2 requires STRONG nucleophiles (OH⁻, CN⁻, I⁻) in Polar Aprotic Solvents (Acetone, DMSO, DMF).\n• SN1 is favored by WEAK nucleophiles (H₂O, EtOH) in Polar Protic Solvents (H₂O, MeOH) which stabilize carbocations and leaving groups by hydrogen bonding.",
            "Haloarenes (chlorobenzene) are exceptionally unreactive to SN2 and SN1 due to partial double bond character from resonance, sp² carbon electronegativity, and instability of phenyl cation!"
          ],
          examples: [
            {
              question: "Arrange in order of increasing SN2 reactivity: 1-Bromobutane, 2-Bromobutane, 2-Bromo-2-methylpropane, 1-Bromo-2,2-dimethylpropane.",
              thinking: "SN2 is controlled by steric hindrance at the reaction center.",
              solution: "• 2-Bromo-2-methylpropane is 3° → virtually inert to SN2 (least reactive).\n• 1-Bromo-2,2-dimethylpropane (neopentyl bromide) is 1° but has an extremely bulky tert-butyl group blocking backside attack → extremely slow.\n• 2-Bromobutane is 2° → moderate.\n• 1-Bromobutane is unhindered 1° → fastest.",
              answer: "2-Bromo-2-methylpropane < Neopentyl bromide < 2-Bromobutane < 1-Bromobutane",
              proTip: "Neopentyl halides are primary (1°) yet notoriously unreactive in SN2 because the bulky tert-butyl umbrella physically shields the backside!"
            }
          ],
          practice: [
            {
              id: "halo-01",
              question: "An optically active alkyl halide undergoes nucleophilic substitution with aqueous NaOH to give an optically inactive racemic alcohol. The reaction mechanism is:",
              options: ["SN1", "SN2", "E2", "SNi"],
              answer: 0,
              explanation: "SN1 proceeds via a planar achiral carbocation intermediate. Attack by nucleophile from either face occurs with equal probability, leading to racemisation and optical inactivity.",
              commonMistake: "Selecting SN2 which gives 100% inversion of configuration.",
              concept: "SN1 Stereochemistry"
            },
            {
              id: "halo-02",
              question: "Which solvent is most suitable for promoting an SN2 reaction between 1-bromobutane and sodium cyanide?",
              options: ["Water", "Ethanol", "Dimethylformamide (DMF)", "Acetic acid"],
              answer: 2,
              explanation: "DMF is a polar aprotic solvent. It dissolves sodium cations effectively without solvating the CN⁻ anion with hydrogen bonds, leaving the nucleophile 'naked' and highly reactive for SN2 backside attack.",
              commonMistake: "Choosing water or ethanol which solvate anions and suppress SN2.",
              concept: "Solvent Effect"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch13-t1",
          question: "Heating 2-bromopentane with alcoholic KOH yields primarily pent-2-ene rather than pent-1-ene. This regioselectivity is governed by:",
          options: ["Saytzeff (Zaitsev) Rule", "Hofmann Rule", "Markovnikov Rule", "Kharasch Effect"],
          answer: 0,
          explanation: "Saytzeff Rule states that in dehydrohalogenation, the more substituted and more stable alkene (having more hyperconjugative α-hydrogens) is the major product.",
          topic: "Elimination Reactions"
        }
      ],
      pyqs: [
        {
          id: "ch13-p1",
          year: "2023",
          session: "April Session 1",
          difficulty: "Medium",
          sourceType: "verified-pyq",
          question: "Which of the following compounds gives positive iodoform test upon treatment with I₂ and aqueous NaOH?",
          options: ["Pentan-3-one", "Butan-2-ol", "Methanol", "Pentan-1-ol"],
          answer: 1,
          explanation: "Positive iodoform test is given by compounds containing CH₃–C=O (methyl ketone) or CH₃–CH(OH)– group (which oxidises to methyl ketone). Butan-2-ol has CH₃–CH(OH)–C₂H₅ and yields yellow CHI₃ precipitate.",
          topic: "Iodoform Test"
        }
      ]
    },

    {
      id: "ch17-carbonyls",
      chapterNum: 17,
      title: "Aldehydes and Ketones",
      stage: 6,
      ncert: "Class 12 NCERT Chapter 12",
      jeeRelevance: "HIGHEST PRIORITY CHAPTER IN ENTIRE JEE MAIN (16-20 Marks)",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch13-haloalkanes"],
      estTime: "16 Hours",
      topics: [
        {
          id: "aldol-cannizzaro",
          title: "Aldol Condensation & Cannizzaro Reaction",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Acidity of α-hydrogen", "Enolate ion formation", "Nucleophilic addition to carbonyl"],
          estMinutes: 50,
          simpleExplanation: "Because the carbonyl oxygen strongly pulls electrons, the hydrogens on the adjacent α-carbon are unusually acidic (pKa ~20). A base abstracts an α-hydrogen to make a resonance-stabilized enolate ion, which then attacks another carbonyl molecule (Aldol Condensation).\nIf an aldehyde lacks any α-hydrogens (like Benzaldehyde or Formaldehyde), it cannot form an enolate! Under concentrated base, it undergoes self redox (disproportionation) into an alcohol and a carboxylate salt (Cannizzaro Reaction).",
          formalDefinition: "Aldol: Base-catalyzed dimerization of carbonyls with α-H forming β-hydroxy aldehydes/ketones, dehydrating upon heating to α,β-unsaturated carbonyls.\nCannizzaro: Disproportionation of aldehydes lacking α-H in 50% KOH into corresponding alcohol and carboxylic acid salt via hydride transfer.",
          visualHtml: DIAGRAMS.carbocation,
          rules: [
            "Test for Aldol: Must have at least one α-hydrogen (e.g. CH₃CHO, CH₃COCH₃, CH₃CH₂CHO).",
            "Test for Cannizzaro: Must have ZERO α-hydrogens (e.g. HCHO, C₆H₅CHO, (CH₃)₃C–CHO).",
            "Cross Cannizzaro with HCHO: Formaldehyde is always oxidized to formate (HCOO⁻) because its carbonyl is least sterically hindered and most electrophilic, reducing the other aldehyde to alcohol!",
            "Tollens' Reagent ([Ag(NH₃)₂]⁺) and Fehling's solution oxidize aldehydes to give a silver mirror / red Cu₂O, but do not oxidize normal aliphatic ketones."
          ],
          examples: [
            {
              question: "When a mixture of Benzaldehyde and Formaldehyde is treated with concentrated NaOH, what are the major products?",
              thinking: "Both lack α-hydrogens → Cross Cannizzaro. Which one oxidizes?",
              solution: "• Formaldehyde (HCHO) is smaller and more electrophilic than Benzaldehyde.\n• Hydroxide preferentially attacks HCHO, which then transfers hydride (H⁻) to Benzaldehyde.\n• Formaldehyde is oxidized to sodium formate (HCOONa), and Benzaldehyde is reduced to Benzyl alcohol (C₆H₅CH₂OH).",
              answer: "Benzyl alcohol + Sodium formate",
              proTip: "In any cross-Cannizzaro reaction involving HCHO, HCHO is ALWAYS oxidized to formate!"
            }
          ],
          practice: [
            {
              id: "carb-01",
              question: "Which of the following compounds will NOT undergo Aldol condensation when treated with dilute NaOH?",
              options: ["Acetaldehyde", "Propanal", "2,2-Dimethylpropanal", "Acetone"],
              answer: 2,
              explanation: "2,2-Dimethylpropanal (neopentanal, (CH₃)₃C–CHO) has a quaternary α-carbon bearing zero α-hydrogens. Therefore it cannot form an enolate and undergoes Cannizzaro reaction instead.",
              commonMistake: "Assuming all aldehydes undergo Aldol.",
              concept: "Aldol vs Cannizzaro"
            },
            {
              id: "carb-02",
              question: "Clemmensen reduction of a ketone into an alkane employs which reagent combination?",
              options: ["Zn-Hg and concentrated HCl", "NH₂NH₂ and KOH / ethylene glycol", "LiAlH₄ in ether", "H₂ with Pd/C"],
              answer: 0,
              explanation: "Clemmensen reduction uses amalgamated zinc (Zn-Hg) and concentrated HCl. (NH₂NH₂/KOH is Wolff-Kishner reduction, preferred for acid-sensitive molecules).",
              commonMistake: "Confusing Clemmensen (acidic) with Wolff-Kishner (basic).",
              concept: "Carbonyl Reduction"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch17-t1",
          question: "An organic compound (A) with formula C₃H₆O gives a positive 2,4-DNP test, positive iodoform test, but negative Tollens test. Compound (A) is:",
          options: ["Propanal", "Propan-2-one (Acetone)", "Prop-2-en-1-ol", "Methoxyethene"],
          answer: 1,
          explanation: "Positive 2,4-DNP indicates carbonyl. Negative Tollens confirms it is a ketone, not an aldehyde. Positive iodoform confirms CH₃–C=O group. Formula C₃H₆O matches acetone.",
          topic: "Carbonyl Identification Tests"
        }
      ],
      pyqs: [
        {
          id: "ch17-p1",
          year: "2024",
          session: "Jan Session 1",
          difficulty: "Medium",
          sourceType: "verified-pyq",
          question: "Treatment of Acetophenone with I₂ and aqueous NaOH produces a yellow precipitate (A) and an organic sodium salt (B). Acidification of (B) gives:",
          options: ["Benzoic acid", "Acetic acid", "Phthalic acid", "Cinnamic acid"],
          answer: 0,
          explanation: "Acetophenone is C₆H₅–CO–CH₃. The methyl group is cleaved as yellow iodoform (CHI₃), leaving sodium benzoate (C₆H₅COONa). Acidification yields Benzoic acid (C₆H₅COOH).",
          topic: "Haloform Reaction"
        }
      ]
    },

    {
      id: "ch19-amines",
      chapterNum: 19,
      title: "Amines and Nitrogen Compounds",
      stage: 7,
      ncert: "Class 12 NCERT Chapter 13",
      jeeRelevance: "High Priority (Basicity trends, Gabriel, Hoffmann Bromamide, Hinsberg)",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch13-haloalkanes", "ch17-carbonyls"],
      estTime: "8 Hours",
      topics: [
        {
          id: "amine-basicity-tests",
          title: "Amine Basicity Anomalies, Gabriel Phthalimide & Hinsberg Test",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Lone pair availability", "Solvation effect", "Steric hindrance"],
          estMinutes: 45,
          simpleExplanation: "Amines are organic bases due to the nitrogen lone pair. In the gas phase, basicity simply follows inductive effect: 3° > 2° > 1° > NH₃. But in aqueous solution, hydration (hydrogen bonding of conjugate ammonium cation) and steric hindrance collide with inductive effect, creating an anomalous experimental basicity order!",
          formalDefinition: "Basicity of amines in aqueous medium is governed by the combined balance of: (1) Inductive effect (+I), (2) Solvation energy of substituted ammonium ion, and (3) Steric hindrance.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Aqueous Basicity Orders (Crucial JEE Memory Rule):\n• Methyl substituted: 2° > 1° > 3° > NH₃ [(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃] (Code: 213).\n• Ethyl substituted: 2° > 3° > 1° > NH₃ [(C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃] (Code: 231).",
            "Aniline (C₆H₅NH₂) is vastly weaker than aliphatic amines because the nitrogen lone pair is delocalised into the benzene ring.",
            "Gabriel Phthalimide Synthesis prepares ONLY pure 1° aliphatic amines (cannot make aromatic amines like aniline because aryl halides do not undergo SN2 with phthalimide anion).",
            "Hinsberg Test (Benzenesulphonyl chloride, C₆H₅SO₂Cl):\n• 1° amine → Soluble in alkali (acidic H on sulfonamide).\n• 2° amine → Insoluble in alkali (no acidic H).\n• 3° amine → Does not react."
          ],
          examples: [
            {
              question: "Why cannot aniline be prepared by Gabriel Phthalimide synthesis?",
              thinking: "Recall the key nucleophilic substitution step in Gabriel synthesis.",
              solution: "Gabriel synthesis involves nucleophilic attack of potassium phthalimide anion on an alkyl halide via an SN2 displacement. Aryl halides (like chlorobenzene) do not undergo SN2 displacement due to resonance partial double bond character of C–Cl and steric repulsion from the π-cloud.",
              answer: "Aryl halides do not undergo SN2 displacement with phthalimide anion.",
              proTip: "Hoffmann Bromamide Degradation (R–CONH₂ + Br₂ + 4KOH → R–NH₂ + K₂CO₃ + 2KBr + 2H₂O) shortens the carbon chain by exactly ONE carbon atom!"
            }
          ],
          practice: [
            {
              id: "amn-01",
              question: "Carbylamine test is specifically used for the detection of:",
              options: ["Primary amines only (both aliphatic and aromatic)", "Secondary amines", "Tertiary amines", "Quaternary ammonium salts"],
              answer: 0,
              explanation: "Heating a primary amine with chloroform (CHCl₃) and alcoholic KOH produces an extremely foul-smelling isocyanide (carbylamine: R–N≡C). Secondary and tertiary amines do not show this reaction.",
              commonMistake: "Thinking it only works for aliphatic amines.",
              concept: "Carbylamine Test"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch19-t1",
          question: "An organic compound (A) C₃H₉N reacts with benzenesulphonyl chloride to give a solid insoluble in alkali. Compound (A) is:",
          options: ["A primary amine", "A secondary amine", "A tertiary amine", "An amide"],
          answer: 1,
          explanation: "Reaction with benzenesulphonyl chloride without solubility in alkali indicates a secondary amine. The product has no remaining acidic hydrogen on nitrogen.",
          topic: "Hinsberg Test"
        }
      ],
      pyqs: [
        {
          id: "ch19-p1",
          year: "2023",
          session: "Jan Session 1",
          difficulty: "Easy",
          sourceType: "verified-pyq",
          question: "The order of basic strength of methyl substituted amines in aqueous solution is:",
          options: [
            "(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃",
            "(CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃",
            "CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N > NH₃",
            "(CH₃)₂NH > (CH₃)₃N > CH₃NH₂ > NH₃"
          ],
          answer: 0,
          explanation: "For methyl group, hydration and steric effects combine to give 2° > 1° > 3° > NH₃ (213 order).",
          topic: "Basicity of Amines"
        }
      ]
    },

    {
      id: "ch21-biomolecules",
      chapterNum: 21,
      title: "Biomolecules",
      stage: 8,
      ncert: "Class 12 NCERT Chapter 14",
      jeeRelevance: "Guaranteed 4 Marks (Carbohydrates, Amino Acids & Proteins)",
      priority: "high",
      prerequisites: ["ch7-isomerism", "ch17-carbonyls"],
      estTime: "6 Hours",
      topics: [
        {
          id: "carbohydrates-proteins",
          title: "Glucose Structure, Reducing Sugars & Amino Acid Zwitterions",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["Aldehyde reactions", "Chirality & Fischer projections"],
          estMinutes: 40,
          simpleExplanation: "Biomolecules bridge organic chemistry with living organisms. D-Glucose is an aldohexose existing in open-chain and cyclic hemiacetal forms (α and β anomers) that interconvert in water (mutarotation). Amino acids contain both –NH₂ and –COOH groups, existing as internal dipoles called zwitterions.",
          formalDefinition: "Reducing sugar: Any carbohydrate with a free anomeric hemiacetal –OH capable of reducing Tollens' and Fehling's reagents.\nZwitterion: A dipolar neutral species formed by internal proton transfer from –COOH to –NH₂.",
          visualHtml: DIAGRAMS.newman,
          rules: [
            "All monosaccharides (glucose, fructose, galactose) and disaccharides with a free hemiacetal (maltose, lactose) are REDUCING sugars.",
            "Sucrose (table sugar) is a NON-REDUCING sugar because the anomeric carbons of both glucose (C1) and fructose (C2) are locked in a glycosidic linkage!",
            "Isoelectric Point (pI): The pH at which an amino acid has no net electric charge and does not migrate in an electric field.",
            "Denaturation of proteins destroys secondary, tertiary, and quaternary structures, but leaves the PRIMARY covalent peptide backbone intact."
          ],
          examples: [
            {
              question: "Explain why sucrose is called an 'invert sugar'.",
              thinking: "Look at the optical rotation of sucrose before and after hydrolysis.",
              solution: "Sucrose is dextrorotatory (+66.5°). On acid or enzymatic hydrolysis, it yields equimolar D-(+)-glucose (+52.5°) and D-(-)-fructose (-92.4°). Because the levorotation of fructose is larger than the dextrorotation of glucose, the overall mixture becomes levorotatory (-19.9°). This inversion of sign of optical rotation gives it the name invert sugar.",
              answer: "Optical rotation inverts from dextro (+) to levo (-) upon hydrolysis.",
              proTip: "Glucose Pentaacetate does not react with hydroxylamine (NH₂OH), proving the absence of a free –CHO group in its cyclic structure!"
            }
          ],
          practice: [
            {
              id: "bio-01",
              question: "Which of the following is a non-reducing sugar?",
              options: ["Glucose", "Maltose", "Lactose", "Sucrose"],
              answer: 3,
              explanation: "In sucrose, C1 of α-D-glucose is linked to C2 of β-D-fructose. Both anomeric carbons are engaged in the glycosidic bond, leaving no free hemiacetal group to reduce Tollens or Fehling solution.",
              commonMistake: "Confusing maltose with sucrose.",
              concept: "Reducing vs Non-reducing Sugars"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch21-t1",
          question: "During denaturation of proteins, which level of protein structure remains unaffected?",
          options: ["Primary structure", "Secondary structure", "Tertiary structure", "Quaternary structure"],
          answer: 0,
          explanation: "Denaturation disrupts hydrogen bonds and hydrophobic interactions (2°, 3°, 4°), but cannot break the strong covalent peptide bonds of the 1° sequence without harsh chemical hydrolysis.",
          topic: "Protein Structure"
        }
      ],
      pyqs: [
        {
          id: "ch21-p1",
          year: "2024",
          session: "Jan Session 2",
          difficulty: "Easy",
          sourceType: "verified-pyq",
          question: "Which of the following vitamins is water-soluble?",
          options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin E"],
          answer: 0,
          explanation: "Vitamins B and C are water-soluble (must be regularly supplied in diet). Vitamins A, D, E, K are fat-soluble.",
          topic: "Vitamins"
        }
      ]
    },

    {
      id: "ch23-qualitative",
      chapterNum: 23,
      title: "Qualitative Organic Analysis & Lassaigne's Test",
      stage: 9,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "Guaranteed JEE Main Practical Chemistry Question (4 Marks)",
      priority: "very-high",
      prerequisites: ["ch0-foundation", "ch1-carbon"],
      estTime: "5 Hours",
      topics: [
        {
          id: "lassaigne-test",
          title: "Lassaigne's Sodium Fusion Extract & Element Detection",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Ionic salts", "Precipitation reactions", "Oxidation states"],
          estMinutes: 35,
          simpleExplanation: "Organic compounds hold elements like N, S, and halogens (X) in covalent bonds, which don't react with standard ionic reagents. In Lassaigne's test, we fuse the organic compound with molten metallic sodium. The violent heat converts covalent bonds into ionic sodium salts: NaCN (for N), Na₂S (for S), and NaX (for halogens), which dissolve in water for ionic detection!",
          formalDefinition: "Lassaigne's Test: Fusion of an organic compound with metallic sodium to convert covalently bonded nitrogen, sulphur, and halogens into ionic water-soluble salts: Na + C + N → NaCN; 2Na + S → Na₂S; Na + X → NaX.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "Detection of Nitrogen: Extract + FeSO₄ + NaOH + boil + acidify with conc. H₂SO₄ + FeCl₃ → Prussian Blue precipitate of Ferric ferrocyanide: Fe₄[Fe(CN)₆]₃.",
            "Compounds containing ONLY Nitrogen and NO Carbon (e.g. Hydrazine NH₂NH₂) do NOT give Lassaigne's test for nitrogen because carbon is required to make NaCN!",
            "Detection of Sulphur: (1) Sodium nitroprusside (Na₂[Fe(CN)₅NO]) + extract → Brilliant Purple/Violet colouration: [Fe(CN)₅NOS]⁴⁻. (2) Lead acetate + acetic acid → Black precipitate of PbS.",
            "When BOTH Nitrogen and Sulphur are present together: Sodium thiocyanate (NaSCN) forms. On adding FeCl₃, a blood-red colouration of [Fe(SCN)]²⁺ appears!"
          ],
          examples: [
            {
              question: "Why is the Lassaigne's extract boiled with concentrated HNO₃ before testing for halogens with AgNO₃?",
              thinking: "What happens if Nitrogen or Sulphur is also present in the organic compound?",
              solution: "If N or S is present, the extract contains NaCN or Na₂S. If AgNO₃ were added directly, it would precipitate white AgCN or black Ag₂S, interfering with halogen testing! Boiling with concentrated HNO₃ decomposes NaCN to HCN gas and Na₂S to H₂S gas, expelling them completely.",
              answer: "To decompose NaCN and Na₂S, preventing interference by AgCN and Ag₂S precipitates.",
              proTip: "Diazo compounds (C₆H₅N₂⁺Cl⁻) lose N₂ as gas upon heating with sodium and do not give Lassaigne's test for nitrogen!"
            }
          ],
          practice: [
            {
              id: "poc-01",
              question: "Prussian blue precipitate obtained in Lassaigne's test for nitrogen has the chemical formula:",
              options: [
                "Fe₄[Fe(CN)₆]₃",
                "Fe₃[Fe(CN)₆]₄",
                "Na₄[Fe(CN)₆]",
                "Fe(CN)₃"
              ],
              answer: 0,
              explanation: "Prussian blue is Iron(III) hexacyanoferrate(II), chemically written as Fe₄[Fe(CN)₆]₃ · xH₂O.",
              commonMistake: "Inverting the oxidation states of iron.",
              concept: "Lassaigne Nitrogen Test"
            },
            {
              id: "poc-02",
              question: "Which of the following compounds will NOT give a positive Prussian blue test for nitrogen?",
              options: ["Aniline", "Urea", "Hydrazine (H₂N–NH₂)", "Glycine"],
              answer: 2,
              explanation: "Hydrazine contains nitrogen but no carbon. Without carbon, it cannot form cyanide ion (CN⁻) upon sodium fusion, failing the Prussian blue test.",
              commonMistake: "Assuming all nitrogen compounds give positive test.",
              concept: "Lassaigne Exceptions"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch23-t1",
          question: "In Lassaigne's test, appearance of a blood-red colouration upon addition of neutral FeCl₃ confirms the simultaneous presence of:",
          options: ["Nitrogen and Sulphur", "Nitrogen and Chlorine", "Sulphur and Bromine", "Phosphorus and Nitrogen"],
          answer: 0,
          explanation: "Simultaneous presence of N and S forms sodium thiocyanate (NaSCN), which reacts with Fe³⁺ to produce blood-red [Fe(SCN)]²⁺.",
          topic: "Lassaigne's Test"
        }
      ],
      pyqs: [
        {
          id: "ch23-p1",
          year: "2024",
          session: "Jan Session 1",
          difficulty: "Easy",
          sourceType: "verified-pyq",
          question: "In the estimation of nitrogen by Kjeldahl's method, 0.5 g of an organic compound neutralized 10 mL of 1 M H₂SO₄. The percentage of nitrogen in the compound is:",
          options: ["56%", "28%", "14%", "42%"],
          answer: 0,
          explanation: "Formula: %N = (1.4 × Normality of acid × Volume of acid used) / Mass of sample. 10 mL of 1 M H₂SO₄ = 10 mL of 2 N acid. %N = (1.4 × 2 × 10) / 0.5 = 28 / 0.5 = 56%.",
          topic: "Quantitative Analysis (Kjeldahl)"
        }
      ]
    }
  ];

  // Curated Reaction Library
  const REACTIONS_DATA = [
    {
      name: "Aldol Condensation",
      family: "Aldehydes & Ketones",
      reactants: "2 R–CH₂–CHO",
      reagent: "Dilute NaOH (room temp, then heat)",
      products: "R–CH₂–CH=C(R)–CHO (α,β-unsaturated aldehyde) + H₂O",
      mechanism: "Enolate formation via α-H deprotonation → Nucleophilic addition to second carbonyl → β-hydroxy aldehyde → E1cB dehydration upon heating.",
      conditions: "Requires at least one α-hydrogen on reactant.",
      exceptions: "Formaldehyde and benzaldehyde lack α-H; undergo Cannizzaro instead.",
      jeeTip: "Cross-aldol between an aldehyde and a ketone favors enolate attack on the more electrophilic aldehyde!"
    },
    {
      name: "Cannizzaro Reaction",
      family: "Aldehydes & Ketones",
      reactants: "2 R₃C–CHO (no α-H)",
      reagent: "50% Concentrated KOH or NaOH",
      products: "R₃C–CH₂OH (alcohol) + R₃C–COO⁻K⁺ (carboxylate salt)",
      mechanism: "Nucleophilic addition of OH⁻ → Hydride (:H⁻) transfer to second carbonyl molecule (rate-determining step) → Disproportionation.",
      conditions: "Aldehydes with ZERO α-hydrogens.",
      exceptions: "Aldehydes with α-H undergo Aldol condensation instead.",
      jeeTip: "Cross-Cannizzaro with HCHO always converts HCHO into formate (HCOO⁻)!"
    },
    {
      name: "Reimer-Tiemann Reaction",
      family: "Phenols",
      reactants: "Phenol (C₆H₅OH)",
      reagent: "CHCl₃ + aqueous NaOH at 60°C, followed by H⁺",
      products: "Salicylaldehyde (o-hydroxybenzaldehyde) as major product",
      mechanism: "Generation of neutral electrophilic Dichlorocarbene (:CCl₂) intermediate → Electrophilic attack on phenoxide at ortho position → Hydrolysis.",
      conditions: "Basic medium generates phenoxide ion and :CCl₂ simultaneously.",
      exceptions: "If CCl₄ is used instead of CHCl₃, Salicylic acid (o-hydroxybenzoic acid) is formed!",
      jeeTip: "The reactive intermediate is neutral Dichlorocarbene (:CCl₂), which has 6 valence electrons and acts as an electrophile."
    },
    {
      name: "Kolbe's Reaction (Kolbe-Schmitt)",
      family: "Phenols",
      reactants: "Sodium Phenoxide (C₆H₅O⁻Na⁺)",
      reagent: "CO₂ at 400 K and 4-7 atm pressure, followed by H⁺",
      products: "Salicylic Acid (o-hydroxybenzoic acid)",
      mechanism: "Electrophilic aromatic substitution by weak electrophile CO₂ on highly activated phenoxide ring.",
      conditions: "High pressure and basic medium.",
      exceptions: "Phenol itself is not nucleophilic enough; sodium phenoxide is required.",
      jeeTip: "Acetylating salicylic acid with acetic anhydride produces Aspirin (Acetylsalicylic acid)!"
    },
    {
      name: "Williamson Ether Synthesis",
      family: "Ethers",
      reactants: "R–O⁻Na⁺ (Sodium alkoxide) + R'–X (Primary alkyl halide)",
      reagent: "Dry conditions, heat",
      products: "R–O–R' (Ether) + NaX",
      mechanism: "Pure SN2 backside displacement of halide by alkoxide nucleophile.",
      conditions: "Alkyl halide R'–X MUST be primary (1°) or methyl.",
      exceptions: "If 3° alkyl halide is used, alkoxide acts as strong base and gives 100% E2 elimination (alkene), NOT ether!",
      jeeTip: "To prepare tert-butyl methyl ether, react Sodium tert-butoxide with Methyl iodide, NEVER tert-butyl bromide with Sodium methoxide!"
    },
    {
      name: "Gabriel Phthalimide Synthesis",
      family: "Amines",
      reactants: "Phthalimide + KOH → Potassium phthalimide + R–X",
      reagent: "Alkyl halide (1°), followed by alkaline hydrolysis (NaOH/H₂O) or hydrazine",
      products: "Pure Primary (1°) Aliphatic Amine (R–NH₂)",
      mechanism: "Deprotonation of phthalimide by KOH → SN2 attack of phthalimide anion on 1° alkyl halide → Hydrazine cleavage.",
      conditions: "Limited to primary aliphatic alkyl halides.",
      exceptions: "Cannot prepare Aniline (aryl halides do not undergo SN2) or 3° amines.",
      jeeTip: "Best method for synthesizing pure 1° aliphatic amines without contamination from 2° or 3° amines!"
    },
    {
      name: "Hoffmann Bromamide Degradation",
      family: "Amines",
      reactants: "R–CONH₂ (Primary acid amide)",
      reagent: "Br₂ + 4 KOH (or NaOBr), heat",
      products: "R–NH₂ (1° amine with 1 LESS carbon atom) + K₂CO₃ + 2 KBr + 2 H₂O",
      mechanism: "N-bromination → Deprotonation → Loss of Br⁻ with concerted 1,2-migration of alkyl group to electron-deficient nitrogen (Isocyanate R–N=C=O intermediate) → Hydrolysis.",
      conditions: "Primary amides only.",
      exceptions: "Migration of R group retains configuration.",
      jeeTip: "The intermediate is an Isocyanate (R–N=C=O). Migration step is intramolecular, so stereochemistry is 100% retained!"
    },
    {
      name: "Sandmeyer Reaction",
      family: "Diazonium Salts",
      reactants: "Benzene diazonium chloride (C₆H₅N₂⁺Cl⁻)",
      reagent: "Cu₂Cl₂ / HCl or Cu₂Br₂ / HBr or CuCN / KCN",
      products: "Chlorobenzene, Bromobenzene, or Benzonitrile + N₂ gas",
      mechanism: "Free radical substitution catalyzed by cuprous ion (Cu⁺).",
      conditions: "Freshly prepared diazonium salt at 0–5°C.",
      exceptions: "Iodobenzene is prepared by simply shaking with KI without copper catalyst!",
      jeeTip: "Gattermann reaction uses Cu powder with HX instead of cuprous salt (lower yield)."
    }
  ];

  // Curated Reagents Master Reference
  const REAGENTS_DATA = [
    {
      name: "PCC (Pyridinium Chlorochromate)",
      formula: "C₅H₅NH⁺ CrO₃Cl⁻ in CH₂Cl₂",
      category: "Mild Oxidizing Agent",
      action: "Oxidizes 1° alcohols to Aldehydes; 2° alcohols to Ketones.",
      selectivity: "STOPS at aldehyde stage! Does NOT oxidize aldehydes to carboxylic acids because of anhydrous non-aqueous medium.",
      exceptions: "Does not touch C=C double bonds or C≡C triple bonds.",
      jeeTip: "Use PCC when you want to convert ethanol to ethanal without over-oxidizing to acetic acid."
    },
    {
      name: "LiAlH₄ (Lithium Aluminium Hydride)",
      formula: "LiAlH₄ in dry ether, followed by H₃O⁺",
      category: "Powerful Reducing Agent",
      action: "Reduces –COOH, –COOR, –COCl, –CHO, and >C=O to primary/secondary alcohols. Reduces –CONH₂ and –CN to primary amines.",
      selectivity: "Does NOT reduce isolated C=C double bonds (exception: cinnamaldehyde Ph–CH=CH–CHO reduces both C=O and C=C).",
      exceptions: "Violently reacts with water and protic solvents; must be handled in dry aprotic ether.",
      jeeTip: "Much stronger than NaBH₄. NaBH₄ only reduces aldehydes, ketones, and acid chlorides, but CANNOT reduce esters or carboxylic acids!"
    },
    {
      name: "NaBH₄ (Sodium Borohydride)",
      formula: "NaBH₄ in ethanol or water",
      category: "Mild Reducing Agent",
      action: "Reduces aldehydes to 1° alcohols; ketones to 2° alcohols; acid chlorides to alcohols.",
      selectivity: "Inert towards carboxylic acids, esters, amides, and nitriles under normal conditions.",
      exceptions: "Safe to use in protic solvents (EtOH, H₂O).",
      jeeTip: "If a molecule contains both a ketone and an ester, NaBH₄ selectively reduces only the ketone, leaving the ester untouched!"
    },
    {
      name: "Ozone with Zinc (O₃ / Zn-H₂O)",
      formula: "O₃ at low temp, followed by Zn dust and H₂O",
      category: "Reductive Ozonolysis",
      action: "Cleaves C=C double bonds into aldehydes and ketones.",
      selectivity: "Zinc dust destroys H₂O₂ byproduct, preventing oxidation of formed aldehydes into carboxylic acids.",
      exceptions: "If Zn is omitted (oxidative ozonolysis O₃ / H₂O₂), aldehydes are converted to carboxylic acids.",
      jeeTip: "Count carbons and carbonyl positions to quickly identify the original alkene."
    },
    {
      name: "Lindlar's Catalyst",
      formula: "H₂ / Pd supported on BaSO₄, poisoned with quinoline or lead acetate",
      category: "Controlled Hydrogenation",
      action: "Selectively reduces Alkynes (–C≡C–) to CIS-Alkenes (syn-addition).",
      selectivity: "Poison prevents further reduction of the alkene to an alkane.",
      exceptions: "To obtain the TRANS-alkene, use Birch reduction (Na in liquid NH₃)!",
      jeeTip: "H₂/Lindlar → cis-alkene. Na/liq NH₃ → trans-alkene. High-frequency JEE question!"
    },
    {
      name: "Grignard Reagent (RMgX)",
      formula: "R–Mg–X in anhydrous ether",
      category: "Organometallic Nucleophile / Strong Base",
      action: "Nucleophilic addition to carbonyls: HCHO gives 1° alcohol; R'CHO gives 2° alcohol; R'₂C=O gives 3° alcohol; CO₂ gives carboxylic acid.",
      selectivity: "Acts as a ferocious base in the presence of ANY active hydrogen (H₂O, ROH, RNH₂, terminal alkynes, RCOOH), yielding alkane R–H!",
      exceptions: "Cannot be prepared in presence of water or acidic protons.",
      jeeTip: "CH₃MgBr + D₂O → CH₃D (monodeuterated methane). Frequently tested!"
    }
  ];

  // Quick Revision & Comparison Tables
  const COMPARISONS_DATA = {
    carbocationStability: [
      { intermediate: "Tropylium cation (C₇H₇⁺)", reason: "Aromatic (6π e⁻ delocalised over 7 carbons)", relative: "Extremely High (isolable)" },
      { intermediate: "Triphenylmethyl cation (Ph₃C⁺)", reason: "10 resonance contributing structures across 3 rings", relative: "Exceptionally Stable" },
      { intermediate: "Cyclopropylmethyl cation", reason: "Bent-bond 'dancing resonance' non-classical overlap", relative: "More stable than 3°" },
      { intermediate: "Tertiary (3°) alkyl, (CH₃)₃C⁺", reason: "9 hyperconjugative α-hydrogens + strong +I", relative: "High" },
      { intermediate: "Secondary (2°) alkyl, (CH₃)₂CH⁺", reason: "6 hyperconjugative α-hydrogens", relative: "Moderate" },
      { intermediate: "Primary (1°) alkyl, CH₃CH₂⁺", reason: "3 hyperconjugative α-hydrogens", relative: "Low" },
      { intermediate: "Methyl cation, CH₃⁺", reason: "Zero hyperconjugation, zero +I", relative: "Extremely Unstable" },
      { intermediate: "Vinyl cation, CH₂=CH⁺", reason: "Positive charge on electronegative sp² carbon", relative: "Very Unstable" }
    ],
    acidityTrends: [
      { compound: "Trifluoroacetic acid (CF₃COOH)", pKa: "0.23", factor: "Strong -I of three fluorines disperses negative charge" },
      { compound: "Formic acid (HCOOH)", pKa: "3.75", factor: "No destabilizing +I alkyl group" },
      { compound: "Benzoic acid (C₆H₅COOH)", pKa: "4.20", factor: "Resonance with phenyl ring, ortho-effect applies" },
      { compound: "Acetic acid (CH₃COOH)", pKa: "4.76", factor: "+I of methyl group destabilizes carboxylate" },
      { compound: "p-Nitrophenol", pKa: "7.15", factor: "Strong -M and -I of nitro group stabilizes phenoxide" },
      { compound: "Phenol (C₆H₅OH)", pKa: "9.95", factor: "Resonance delocalisation of phenoxide negative charge into ring" },
      { compound: "Water (H₂O)", pKa: "14.0", factor: "Standard reference; more acidic than alcohols (except methanol)" },
      { compound: "Ethanol (C₂H₅OH)", pKa: "15.9", factor: "Alkoxide has negative charge localized on oxygen; +I of ethyl destabilizes" },
      { compound: "Ethyne (HC≡CH)", pKa: "25.0", factor: "Acidic H due to 50% s-character on sp carbon" },
      { compound: "Ammonia (NH₃)", pKa: "38.0", factor: "Nitrogen is less electronegative than oxygen" },
      { compound: "Ethane (CH₃–CH₃)", pKa: "50.0", factor: "Extremely weak; sp³ carbon cannot stabilize negative charge" }
    ],
    commonTraps: [
      {
        trap: "Confusing SN1 and SN2 substrate preference",
        remedy: "Remember: SN2 hates crowd (steric hindrance controls: 1° > 2° >> 3°). SN1 loves carbocation stability (3° > 2° >> 1°)."
      },
      {
        trap: "Applying peroxide anti-Markovnikov addition to HCl or HI",
        remedy: "Kharasch peroxide effect works EXCLUSIVELY with HBr. For HCl and HI, Markovnikov product is ALWAYS formed even with peroxide!"
      },
      {
        trap: "Halogen directing effect in benzene",
        remedy: "Halogens (–Cl, –Br) deactivate the benzene ring by strong -I effect, but DIRECT incoming electrophiles ORTHO and PARA due to +M lone pair donation!"
      },
      {
        trap: "Inverting aqueous amine basicity order",
        remedy: "Use mnemonic: For Methyl, 213 [(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N]. For Ethyl, 231 [(C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂]."
      },
      {
        trap: "Predicting Gabriel phthalimide to make Aniline",
        remedy: "Aryl halides cannot undergo SN2 attack. Gabriel synthesis CANNOT prepare aromatic amines like aniline!"
      }
    ]
  };

  // Curated JEE Main PYQs Bank
  const ALL_PYQS = [
    {
      id: "pyq-2024-01",
      year: "2024",
      session: "Jan Session 1",
      chapter: "GOC & Reaction Mechanisms",
      chapterId: "ch8-goc",
      topic: "Electronic Effects & Basicity",
      difficulty: "Medium",
      sourceType: "verified-pyq",
      question: "The correct order of basicity for the following substituted anilines is: (I) Aniline, (II) p-Nitroaniline, (III) p-Methoxyaniline, (IV) p-Chloroaniline:",
      options: [
        "III > I > IV > II",
        "II > IV > I > III",
        "III > IV > I > II",
        "I > III > IV > II"
      ],
      answer: 0,
      explanation: "Basicity of anilines depends on electron density on the –NH₂ group. –OCH₃ (+M) increases electron density → III is most basic. –NO₂ (-M, -I) strongly decreases basicity → II is least basic. –Cl (-I > +M) deactivates ring → IV is less basic than unsubstituted aniline I. Order: III > I > IV > II."
    },
    {
      id: "pyq-2024-02",
      year: "2024",
      session: "Jan Session 2",
      chapter: "Alkenes",
      chapterId: "ch10-alkenes",
      topic: "Hydroboration Oxidation",
      difficulty: "Medium",
      sourceType: "verified-pyq",
      question: "The major product formed when 1-methylcyclohexene is treated with B₂H₆ followed by alkaline H₂O₂ is:",
      options: [
        "trans-2-Methylcyclohexanol",
        "cis-2-Methylcyclohexanol",
        "1-Methylcyclohexanol",
        "Methylcyclohexane"
      ],
      answer: 0,
      explanation: "Hydroboration-oxidation gives anti-Markovnikov syn addition of H and OH across the double bond. Syn addition to 1-methylcyclohexene forces the methyl group and –OH group to end up on opposite sides of the ring (trans-2-methylcyclohexanol)."
    },
    {
      id: "pyq-2023-01",
      year: "2023",
      session: "Jan Session 1",
      chapter: "Amines",
      chapterId: "ch19-amines",
      topic: "Basicity in Aqueous Solution",
      difficulty: "Easy",
      sourceType: "verified-pyq",
      question: "The order of basic strength of methyl substituted amines in aqueous solution is:",
      options: [
        "(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃",
        "(CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃",
        "CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N > NH₃",
        "(CH₃)₂NH > (CH₃)₃N > CH₃NH₂ > NH₃"
      ],
      answer: 0,
      explanation: "In aqueous solution, inductive effect, solvation of ammonium ion, and steric hindrance balance to give the 2° > 1° > 3° > NH₃ (213) order for methyl amines."
    },
    {
      id: "pyq-2023-02",
      year: "2023",
      session: "April Session 2",
      chapter: "Chemical Bonding",
      chapterId: "ch4-bonding",
      topic: "Hydrogen Bonding",
      difficulty: "Medium",
      sourceType: "verified-pyq",
      question: "Which of the following compounds exhibits intramolecular hydrogen bonding?",
      options: ["o-Nitrophenol", "p-Nitrophenol", "m-Nitrophenol", "Phenol"],
      answer: 0,
      explanation: "In o-nitrophenol, the –OH and –NO₂ groups are on adjacent ortho positions, forming a stable six-membered chelate ring through an intramolecular hydrogen bond."
    },
    {
      id: "pyq-2022-01",
      year: "2022",
      session: "July Session",
      chapter: "Haloalkanes",
      chapterId: "ch13-haloalkanes",
      topic: "Iodoform Test",
      difficulty: "Medium",
      sourceType: "verified-pyq",
      question: "Which of the following pairs can be distinguished by the Iodoform test?",
      options: [
        "Pentan-2-one and Pentan-3-one",
        "Methanol and Ethanol",
        "Propanal and Benzaldehyde",
        "Acetophenone and Benzophenone"
      ],
      answer: 0,
      explanation: "Pentan-2-one has a methyl ketone group (CH₃–CO–) and gives yellow CHI₃ precipitate. Pentan-3-one lacks a methyl ketone (CH₃CH₂–CO–CH₂CH₃) and gives negative iodoform test."
    },
    {
      id: "pyq-2024-03",
      year: "2024",
      session: "Jan Session 1",
      chapter: "Practical Organic Chemistry",
      chapterId: "ch23-qualitative",
      topic: "Kjeldahl Method",
      difficulty: "Hard",
      sourceType: "verified-pyq",
      question: "In the estimation of nitrogen by Kjeldahl's method, 0.5 g of an organic compound neutralized 10 mL of 1 M H₂SO₄. The percentage of nitrogen in the compound is:",
      options: ["56%", "28%", "14%", "42%"],
      answer: 0,
      explanation: "Normality of 1 M H₂SO₄ = 1 × 2 = 2 N. % Nitrogen = (1.4 × N × V) / W = (1.4 × 2 × 10) / 0.5 = 28 / 0.5 = 56%."
    }
  ];

  return {
    STAGES,
    CURRICULUM,
    DIAGRAMS,
    REACTIONS_DATA,
    REAGENTS_DATA,
    COMPARISONS_DATA,
    ALL_PYQS
  };
})();
