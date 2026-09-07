/**
 * JEE MAIN ORGANIC CHEMISTRY - COMPLETE EXTENDED CHAPTERS DATA
 * Covers Chapters 2, 3, 5, 9, 11, 12, 14, 15, 16, 18, 20, 22, 24, 25
 * All chapters conform to NCERT Class 10/11/12 and JEE Main standards.
 */

(function() {
  if (!window.CHEM_DATA) return;

  const DIAGRAMS = window.CHEM_DATA.DIAGRAMS;

  const EXTENDED_CHAPTERS = [
    // Chapter 2: Atomic Structure for Organic Chemistry
    {
      id: "ch2-atomic-structure",
      chapterNum: 2,
      title: "Atomic Structure for Organic Chemistry",
      stage: 2,
      ncert: "Class 11 NCERT Chapter 2",
      jeeRelevance: "Essential for understanding orbital overlap, nodal planes, and electron density",
      priority: "high",
      prerequisites: ["ch0-foundation", "ch1-carbon"],
      estTime: "4 Hours",
      topics: [
        {
          id: "orbitals-nodes",
          title: "Atomic Orbitals, Shapes, and Nodal Planes in Organic Molecules",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["Quantum numbers (n, l, m)", "Electronic configuration"],
          estMinutes: 30,
          simpleExplanation: "In organic chemistry, reactions happen where electrons are (electron-rich nucleophiles) or where electrons are missing (electron-deficient electrophiles). Electrons reside in 3D probability clouds called orbitals: s-orbitals are spherical, while p-orbitals are dumbbell-shaped with a nodal plane (where electron probability is zero) passing through the nucleus.",
          formalDefinition: "Orbital: A three-dimensional mathematical wave function ψ where the probability of finding an electron (ψ²) is maximum (~90%).\nNodal plane: A plane where the wave function passes through zero (ψ = 0), meaning electron density is strictly zero.",
          visualHtml: DIAGRAMS.tetrahedral,
          rules: [
            "s-orbital: l = 0 (spherical, 0 nodal planes).",
            "p-orbital: l = 1 (dumbbell-shaped, exactly 1 angular nodal plane passing through the nucleus).",
            "In organic bonding, π-bonds are formed by lateral (sideways) overlap of unhybridized p-orbitals, possessing a nodal plane in the molecular plane."
          ],
          examples: [
            {
              question: "How many nodal planes does the π-bond of ethene (CH₂=CH₂) have?",
              thinking: "A π-bond is formed by sideways overlap of 2pz orbitals perpendicular to the molecular xy-plane.",
              solution: "Because the 2pz lobes lie above and below the xy-plane of the molecule, the molecular plane itself (containing all six atoms: 2 C and 4 H) is a nodal plane where electron density is zero.",
              answer: "1 nodal plane (the molecular plane).",
              proTip: "Every π-bond in an alkene or aromatic ring has exactly 1 nodal plane coincident with the molecular framework!"
            }
          ],
          practice: [
            {
              id: "ch2-p1",
              question: "The total number of nodal planes in a 2px orbital is:",
              options: ["0", "1 (the yz plane)", "2", "3"],
              answer: 1,
              explanation: "For any p-orbital (l=1), the number of angular nodal planes is equal to l = 1. For 2px, the nodal plane is the yz-plane passing through the nucleus.",
              concept: "Atomic Orbitals and Nodes"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch2-t1",
          question: "Which of the following orbitals has zero electron density along the z-axis?",
          options: ["2pz", "2s", "2px", "sp³ directed along z"],
          answer: 2,
          explanation: "The 2px orbital has its electron density concentrated along the x-axis, with the entire yz plane (including the z-axis) serving as a nodal plane.",
          topic: "Atomic Orbitals"
        }
      ]
    },

    // Chapter 3: Periodic Table for Organic Chemistry
    {
      id: "ch3-periodic-table",
      chapterNum: 3,
      title: "Periodic Trends for Organic Chemistry",
      stage: 2,
      ncert: "Class 11 NCERT Chapter 3",
      jeeRelevance: "Dictates bond polarities, leaving group ability, nucleophilicity, and acidity trends",
      priority: "high",
      prerequisites: ["ch0-foundation"],
      estTime: "4 Hours",
      topics: [
        {
          id: "electronegativity-polarizability",
          title: "Electronegativity, Polarizability & Leaving Group Tendency",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["Periodic trends across periods and groups"],
          estMinutes: 30,
          simpleExplanation: "Electronegativity tells you how tightly an atom pulls bonding electrons (F > O > Cl > N > Br > C ≈ H). Across a period, basicity decreases as electronegativity increases. Down a group, size and polarizability dominate: bigger ions (like I⁻) disperse charge over a large volume, making them weak bases and stellar leaving groups!",
          formalDefinition: "Polarizability: The ease with which the electron cloud of an atom or anion can be distorted by an external electrical field.\nLeaving Group Ability: Directly proportional to the stability of the departing conjugate base (weaker base = better leaving group).",
          rules: [
            "Electronegativity order in organic chemistry: F (4.0) > O (3.5) > Cl (3.0) ≈ N (3.0) > Br (2.8) > I (2.5) ≈ C (2.5) > H (2.1).",
            "Leaving group ability down halogen group: I⁻ > Br⁻ > Cl⁻ >> F⁻ (I⁻ is the best leaving group because HI is the strongest acid, pKa ≈ -10).",
            "In polar protic solvents, nucleophilicity follows polarizability down the group: I⁻ > Br⁻ > Cl⁻ > F⁻."
          ],
          examples: [
            {
              question: "Why is iodide (I⁻) a far better leaving group than fluoride (F⁻) in SN2 reactions?",
              thinking: "Leaving group ability correlates with the stability (weak basicity) of the leaving anion.",
              solution: "Iodine is much larger than fluorine. Its valence shell is far from the nucleus, so the negative charge in I⁻ is dispersed over a massive volume. Thus I⁻ is a very weak conjugate base of strong acid HI, making it thermodynamically stable upon departure.",
              answer: "I⁻ is a much weaker base and has a larger, more polarizable charge cloud.",
              proTip: "Weak base = great leaving group! Strong base (like –OH, –NH₂, –F) = terrible leaving group unless protonated."
            }
          ],
          practice: [
            {
              id: "ch3-p1",
              question: "The correct order of leaving group ability among halides is:",
              options: ["F⁻ > Cl⁻ > Br⁻ > I⁻", "I⁻ > Br⁻ > Cl⁻ > F⁻", "Cl⁻ > Br⁻ > I⁻ > F⁻", "Br⁻ > I⁻ > Cl⁻ > F⁻"],
              answer: 1,
              explanation: "I⁻ is the conjugate base of the strongest hydrohalic acid (HI), meaning it is the weakest base and most stable leaving group.",
              concept: "Leaving Group Ability"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch3-t1",
          question: "Which element in organic chemistry has the highest electronegativity?",
          options: ["Carbon", "Nitrogen", "Oxygen", "Fluorine"],
          answer: 3,
          explanation: "Fluorine has the highest electronegativity on the Pauling scale (4.0).",
          topic: "Electronegativity"
        }
      ]
    },

    // Chapter 5: Classification of Organic Compounds
    {
      id: "ch5-classification",
      chapterNum: 5,
      title: "Classification of Organic Compounds",
      stage: 3,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "Taxonomy of acyclic, alicyclic, aromatic, and heterocyclic frameworks",
      priority: "medium",
      prerequisites: ["ch1-carbon", "ch4-bonding"],
      estTime: "3 Hours",
      topics: [
        {
          id: "compound-classes",
          title: "Acyclic, Cyclic, Homocyclic, Heterocyclic & Aromatic Systems",
          priority: "medium",
          difficulty: "Easy",
          prereqList: ["Carbon chains and rings"],
          estMinutes: 25,
          simpleExplanation: "Organic molecules are sorted into structural families: open chain (acyclic/aliphatic) or closed rings (cyclic). If the ring contains only carbon atoms, it is homocyclic (carbocyclic); if an atom like N, O, or S is built into the ring, it is heterocyclic (e.g. pyridine, furan). Rings with special resonance stabilization satisfying Hückel's 4n+2 rule are aromatic.",
          formalDefinition: "Homocyclic: Cyclic compounds containing only carbon atoms in the ring skeleton.\nHeterocyclic: Cyclic compounds containing one or more heteroatoms (N, O, S, P) within the ring framework.",
          rules: [
            "Alicyclic: Aliphatic cyclic compounds (cyclopropane, cyclohexane) that behave like open-chain alkanes.",
            "Heterocyclic Aromatic: Rings containing heteroatoms that participate in the (4n+2) π-electron aromatic sextet (e.g. Pyridine, Pyrrole, Furan, Thiophene)."
          ],
          examples: [
            {
              question: "Classify Pyridine (C₅H₅N) and Cyclohexane (C₆H₁₂) into structural categories.",
              thinking: "Look at ring composition and aromaticity.",
              solution: "Pyridine is a 6-membered planar ring containing 5 carbons and 1 nitrogen with 6 delocalized π electrons. It is heterocyclic and aromatic. Cyclohexane contains only carbons with single bonds, so it is homocyclic (carbocyclic) and alicyclic.",
              answer: "Pyridine is heterocyclic aromatic; Cyclohexane is homocyclic alicyclic.",
              proTip: "In Pyridine, nitrogen's lone pair is in an sp² orbital outside the ring and DOES NOT participate in aromaticity!"
            }
          ],
          practice: [
            {
              id: "ch5-p1",
              question: "Which of the following is a heterocyclic aromatic compound?",
              options: ["Benzene", "Cyclopentadiene", "Furan", "Cyclohexanol"],
              answer: 2,
              explanation: "Furan has a 5-membered ring with 4 carbons and 1 oxygen atom containing 6 delocalized π electrons, making it heterocyclic aromatic.",
              concept: "Classification of Organic Compounds"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch5-t1",
          question: "Which of the following is an alicyclic compound?",
          options: ["Cyclobutane", "Benzene", "Pyridine", "Phenol"],
          answer: 0,
          explanation: "Cyclobutane is a non-aromatic, ring-containing hydrocarbon that resembles aliphatic alkanes in chemical behavior.",
          topic: "Classification"
        }
      ]
    },

    // Chapter 9: Alkanes
    {
      id: "ch9-alkanes",
      chapterNum: 9,
      title: "Alkanes",
      stage: 4,
      ncert: "Class 11 NCERT Chapter 13",
      jeeRelevance: "Conformations, Free Radical Halogenation, Wurtz Reaction & Corey-House",
      priority: "high",
      prerequisites: ["ch8-goc"],
      estTime: "6 Hours",
      topics: [
        {
          id: "alkane-conformations-reactions",
          title: "Conformations (Ethane, Butane) & Free Radical Substitution",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["Newman & Sawhorse projections", "Free radicals"],
          estMinutes: 35,
          simpleExplanation: "Alkanes have single σ-bonds that rotate freely, producing infinite temporary 3D arrangements called conformations. In ethane, the staggered conformation is most stable (minimum torsional strain), while eclipsed is least stable (repulsion between C–H bond electron clouds: 12.5 kJ/mol barrier). In chemical reactions, alkanes undergo free-radical halogenation via initiation, propagation, and termination.",
          formalDefinition: "Conformation: Different spatial arrangements of atoms that can be converted into one another by rotation around single C–C σ-bonds without breaking any bonds.\nTorsional Strain: Electronic repulsion between electron pairs in adjacent parallel σ-bonds in an eclipsed conformation.",
          visualHtml: DIAGRAMS.newman,
          rules: [
            "Conformational stability of n-Butane: Anti-staggered (dihedral angle 180°, most stable) > Gauche (60°, steric strain 3.8 kJ/mol) > Partially Eclipsed (120°) > Fully Eclipsed (0°, steric + torsional strain, least stable).",
            "Exception: Gauche conformation can become MORE stable than anti if intramolecular hydrogen bonding occurs (e.g. Ethylene glycol HO–CH₂–CH₂–OH, 2-fluoroethanol).",
            "Free Radical Halogenation Selectivity: Bromination is highly selective for 3° C–H bonds (3° : 2° : 1° = 1600 : 82 : 1), whereas Chlorination is unselective (3° : 2° : 1° = 5 : 3.8 : 1).",
            "Wurtz Reaction: 2 R–X + 2 Na / dry ether → R–R + 2 NaX (best for symmetrical alkanes with even number of carbons; poor for unsymmetrical alkanes due to 3-product mixture)."
          ],
          examples: [
            {
              question: "Why does 2-fluoroethanol prefer the gauche conformation over the anti conformation?",
              thinking: "Look for special stabilizing interactions between the fluorine and the –OH group.",
              solution: "In the gauche conformation of 2-fluoroethanol (F–CH₂–CH₂–OH), the electronegative fluorine and the hydrogen of the –OH group are positioned 60° apart, enabling an intramolecular hydrogen bond (F···H–O). This stabilization overcomes steric repulsion.",
              answer: "Intramolecular hydrogen bonding stabilizes the gauche form.",
              proTip: "Ethylene glycol and 2-fluoroethanol both show Gauche > Anti stability due to H-bonding! Frequent JEE Main trap!"
            }
          ],
          practice: [
            {
              id: "ch9-p1",
              question: "In the free radical monochlorination of 2-methylbutane, how many structurally isomeric monochloro derivatives are formed?",
              options: ["2", "3", "4", "5"],
              answer: 2,
              explanation: "2-methylbutane has 4 distinct sets of non-equivalent hydrogen atoms: 1-chloro-2-methylbutane, 2-chloro-2-methylbutane, 2-chloro-3-methylbutane (3-chloro-2-methylbutane), and 1-chloro-3-methylbutane. Total = 4 structural isomers.",
              concept: "Free Radical Halogenation"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch9-t1",
          question: "Which conformation of n-butane possesses minimum potential energy and maximum stability?",
          options: ["Fully eclipsed", "Gauche", "Partially eclipsed", "Anti-staggered"],
          answer: 3,
          explanation: "In anti-staggered n-butane, the two bulky methyl groups are oriented 180° apart, giving zero steric strain and zero torsional strain.",
          topic: "Conformations"
        }
      ]
    },

    // Chapter 11: Alkynes
    {
      id: "ch11-alkynes",
      chapterNum: 11,
      title: "Alkynes",
      stage: 4,
      ncert: "Class 11 NCERT Chapter 13",
      jeeRelevance: "Terminal Acidity, Hydration (Kucharov Reaction), Stereoselective Reduction",
      priority: "high",
      prerequisites: ["ch8-goc", "ch10-alkenes"],
      estTime: "5 Hours",
      topics: [
        {
          id: "alkyne-reactions",
          title: "Terminal Alkyne Acidity, Kucharov Hydration & Stereoselective Hydrogenation",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["sp hybridisation", "Electrophilic addition"],
          estMinutes: 35,
          simpleExplanation: "Alkynes contain a cylindrical electron cloud of two π-bonds and one σ-bond. Because sp-hybridized carbons have 50% s-character, their electrons are held extremely close to the nucleus. This makes terminal alkynes (R–C≡C–H) weakly acidic (pKa ≈ 25), reacting with strong bases like NaNH₂ or Na metal to evolve H₂ gas!",
          formalDefinition: "Terminal Alkyne: An alkyne possessing a hydrogen atom directly bonded to an sp-hybridized carbon atom (R–C≡CH).\nKucharov Reaction: Hydration of an alkyne with dilute H₂SO₄ and HgSO₄ catalyst at 60°C to give an enol that tautomerizes into a ketone or aldehyde.",
          rules: [
            "Terminal alkynes form silver mirrors/white precipitates with Tollen's reagent [Ag(NH₃)₂]⁺ and red precipitates with Ammoniacal Cuprous Chloride [Cu(NH₃)₂]⁺, distinguishing them from internal alkynes and alkenes!",
            "Stereoselective Reduction: Alkyne + H₂ / Lindlar's catalyst (Pd/BaSO₄ + quinoline) gives CIS-alkene (syn addition).",
            "Birch Reduction: Alkyne + Na / liquid NH₃ at -33°C gives TRANS-alkene (anti addition).",
            "Kucharov Hydration: Ethyne (HC≡CH) gives Ethanal (acetaldehyde CH₃CHO). ALL other alkynes give KETONES (e.g. Propyne gives Acetone CH₃COCH₃)."
          ],
          examples: [
            {
              question: "How can you distinguish between But-1-yne and But-2-yne chemically?",
              thinking: "Identify which one is a terminal alkyne.",
              solution: "But-1-yne (CH₃CH₂C≡CH) is a terminal alkyne with an acidic sp-hybridized C–H proton. It forms a red precipitate of Copper(I) butynide with ammoniacal Cu₂Cl₂ and white precipitate with Tollens' reagent. But-2-yne (CH₃C≡CCH₃) is an internal alkyne with no acidic acetylenic proton, giving no reaction.",
              answer: "Ammoniacal cuprous chloride or Tollens' reagent gives a precipitate with But-1-yne only.",
              proTip: "Only TERMINAL alkynes (1-alkynes) react with NaNH₂ or ammoniacal AgNO₃/Cu₂Cl₂!"
            }
          ],
          practice: [
            {
              id: "ch11-p1",
              question: "Propyne on reaction with dilute H₂SO₄ in the presence of HgSO₄ gives:",
              options: ["Propanal", "Propan-2-one (Acetone)", "Propan-1-ol", "Propanoic acid"],
              answer: 1,
              explanation: "Hydration of propyne follows Markovnikov addition to yield prop-1-en-2-ol, which tautomerizes spontaneously to acetone (propan-2-one).",
              concept: "Kucharov Reaction"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch11-t1",
          question: "Reduction of but-2-yne with sodium in liquid ammonia yields:",
          options: ["cis-But-2-ene", "trans-But-2-ene", "Butane", "But-1-ene"],
          answer: 1,
          explanation: "Birch reduction (Na/liquid NH₃) of non-terminal alkynes proceeds via radical anion intermediates to yield the trans-alkene (anti-addition).",
          topic: "Alkyne Reduction"
        }
      ]
    },

    // Chapter 12: Aromatic Hydrocarbons
    {
      id: "ch12-aromatics",
      chapterNum: 12,
      title: "Aromatic Hydrocarbons",
      stage: 4,
      ncert: "Class 11 NCERT Chapter 13",
      jeeRelevance: "Hückel's Rule, Arenium Ion (Wheland Intermediate), EAS Directing Groups",
      priority: "very-high",
      prerequisites: ["ch8-goc"],
      estTime: "8 Hours",
      topics: [
        {
          id: "aromaticity-eas",
          title: "Aromaticity (Hückel's 4n+2 Rule) & Electrophilic Aromatic Substitution (EAS)",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Resonance energy", "Carbocations"],
          estMinutes: 40,
          simpleExplanation: "Benzene does NOT undergo addition reactions like alkenes because addition destroys its massive resonance stabilization energy (150 kJ/mol). Instead, benzene undergoes Electrophilic Aromatic Substitution (EAS): an incoming electrophile attacks to form a resonance-stabilized arenium ion (sigma complex), and then a proton is quickly lost to fully restore aromaticity!",
          formalDefinition: "Hückel's Rule of Aromaticity: A monocyclic, planar, completely conjugated system is aromatic if it contains (4n + 2) π-electrons, where n is a non-negative integer (0, 1, 2, 3...).\nArenium Ion (Wheland Intermediate): The non-aromatic, resonance-stabilized carbocation formed in the rate-determining step of EAS.",
          rules: [
            "Aromatic criteria: (1) Cyclic, (2) Planar, (3) Conjugated ring of p-orbitals, (4) (4n+2) π electrons (2, 6, 10, 14...).",
            "Anti-aromatic: Cyclic, planar, conjugated, but has (4n) π electrons (4, 8, 12...). Highly unstable (e.g. Cyclobutadiene).",
            "Activating & Ortho/Para Directing: –OH, –OR, –NH₂, –NHR, –CH₃ (donate electrons by +M or hyperconjugation, stabilizing carbocation at ortho and para positions).",
            "Deactivating & Meta Directing: –NO₂, –CN, –CHO, –COOH, –SO₃H (withdraw electrons by -M/-I, destabilizing carbocation; meta attack is least destabilized).",
            "HALOGEN EXCEPTION: –F, –Cl, –Br, –I are DEACTIVATING (due to strong -I effect), but ORTHO/PARA DIRECTING (due to weak +M lone pair donation)!"
          ],
          examples: [
            {
              question: "Why is Cyclooctatetraene (C₈H₈) non-aromatic rather than anti-aromatic?",
              thinking: "Check if the molecule stays planar with 8 π-electrons.",
              solution: "Cyclooctatetraene has 8 π-electrons (a 4n system). If it were planar, it would be forced into an extremely unstable anti-aromatic state. To avoid this, the molecule twists out of planarity into a 'tub' shape, breaking cyclic orbital overlap. Since it is non-planar, it is non-aromatic.",
              answer: "It adopts a non-planar 'tub' conformation to avoid anti-aromatic instability.",
              proTip: "Anti-aromatic compounds will bend or twist out of planarity if flexible, becoming non-aromatic!"
            }
          ],
          practice: [
            {
              id: "ch12-p1",
              question: "Which of the following species is aromatic according to Hückel's rule?",
              options: ["Cyclobutadiene", "Cyclopentadienyl cation", "Tropylium cation (C₇H₇⁺)", "Cyclooctatetraene"],
              answer: 2,
              explanation: "Tropylium cation is a planar 7-membered ring with complete conjugation and 6 π-electrons (n = 1), satisfying (4n+2) rule for aromaticity.",
              concept: "Hückel's Rule"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch12-t1",
          question: "In the nitration of benzene, the active attacking electrophile is:",
          options: ["NO₂⁻", "NO₂⁺ (Nitronium ion)", "NO⁺", "HNO₃ molecule"],
          answer: 1,
          explanation: "In nitrating mixture (conc. HNO₃ + conc. H₂SO₄), H₂SO₄ acts as an acid to protonate HNO₃, which loses water to generate the linear nitronium ion (NO₂⁺).",
          topic: "EAS Nitration"
        }
      ]
    },

    // Chapter 14: Alcohols
    {
      id: "ch14-alcohols",
      chapterNum: 14,
      title: "Alcohols",
      stage: 6,
      ncert: "Class 12 NCERT Chapter 11",
      jeeRelevance: "Lucas Test, Dehydration Kinetics, Oxidation States, Pinacol Rearrangement",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch13-haloalkanes"],
      estTime: "6 Hours",
      topics: [
        {
          id: "alcohol-tests-reactions",
          title: "Lucas Test (1°/2°/3°), Acidic Dehydration & Esterification",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Carbocation stability", "Nucleophilic substitution"],
          estMinutes: 35,
          simpleExplanation: "Alcohols contain the –OH group. The C–O and O–H bonds can both cleave depending on reaction conditions. When O–H breaks, alcohol acts as a weak acid. When C–O breaks (in acidic medium, e.g. Lucas test: anhydrous ZnCl₂ + conc. HCl), a carbocation intermediate forms: 3° alcohols react instantaneously to give cloudiness/turbidity, 2° alcohols take 5 minutes, and 1° alcohols give no turbidity at room temperature!",
          formalDefinition: "Lucas Reagent: Equimolar mixture of anhydrous ZnCl₂ and concentrated HCl used to classify alcohols based on the rate of SN1 conversion into insoluble alkyl chlorides.",
          rules: [
            "Lucas Test Turbidity Times: 3° alcohol = immediate cloudiness; 2° alcohol = turbidity in 5 minutes; 1° alcohol = no turbidity at room temperature (requires boiling).",
            "Dehydration of Alcohols: Rate order follows carbocation stability: 3° > 2° > 1°. Reagent: conc. H₂SO₄ or H₃PO₄ with heat. Major product follows Saytzeff's rule (more substituted, more stable alkene).",
            "Oxidation of Alcohols: 1° alcohol + PCC → Aldehyde; 1° alcohol + alkaline KMnO₄/K₂Cr₂O₇ → Carboxylic acid; 2° alcohol + CrO₃ → Ketone; 3° alcohol resists oxidation under normal conditions (cleaves under harsh conditions)."
          ],
          examples: [
            {
              question: "Why does 2-methylbutan-2-ol give turbidity immediately with Lucas reagent, while butan-1-ol does not?",
              thinking: "Lucas test proceeds via carbocation formation.",
              solution: "2-methylbutan-2-ol is a tertiary (3°) alcohol. Protonation by HCl and loss of H₂O rapidly produces a stable 3° carbocation, which is captured by Cl⁻ to form water-insoluble 2-chloro-2-methylbutane instantly. Butan-1-ol is a primary (1°) alcohol; its 1° carbocation is too unstable to form at room temperature.",
              answer: "3° alcohol forms a highly stable 3° carbocation rapidly; 1° alcohol cannot.",
              proTip: "Allylic and benzylic alcohols also give IMMEDIATE turbidity with Lucas reagent because their carbocations are resonance stabilized!"
            }
          ],
          practice: [
            {
              id: "ch14-p1",
              question: "An alcohol C₄H₁₀O gives immediate turbidity with Lucas reagent at room temperature. The alcohol is:",
              options: ["Butan-1-ol", "Butan-2-ol", "2-Methylpropan-2-ol (tert-butanol)", "2-Methylpropan-1-ol"],
              answer: 2,
              explanation: "Immediate turbidity at room temperature is the diagnostic fingerprint of a tertiary alcohol. 2-methylpropan-2-ol is a 3° alcohol.",
              concept: "Lucas Test"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch14-t1",
          question: "Vapours of an alcohol passed over heated copper at 573 K yield an alkene. The alcohol is:",
          options: ["Primary alcohol", "Secondary alcohol", "Tertiary alcohol", "Methanol"],
          answer: 2,
          explanation: "Over heated Cu at 573 K, 1° alcohols undergo dehydrogenation to aldehydes, 2° alcohols to ketones, while 3° alcohols undergo dehydration to alkenes.",
          topic: "Alcohol Reactions with Cu"
        }
      ]
    },

    // Chapter 15: Phenols
    {
      id: "ch15-phenols",
      chapterNum: 15,
      title: "Phenols",
      stage: 6,
      ncert: "Class 12 NCERT Chapter 11",
      jeeRelevance: "Acidity (pKa ~ 10), Reimer-Tiemann, Kolbe's, Fries, Cumene Process",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch12-aromatics"],
      estTime: "6 Hours",
      topics: [
        {
          id: "phenol-acidity-reactions",
          title: "Phenol Acidity, Cumene Synthesis, Reimer-Tiemann & Kolbe's Reactions",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Resonance in benzene", "Electrophilic aromatic substitution"],
          estMinutes: 40,
          simpleExplanation: "Phenol (C₆H₅OH) is a million times more acidic than aliphatic alcohols because loss of H⁺ leaves a phenoxide ion whose negative charge is delocalized over the ortho and para positions of the aromatic ring. Phenol is intensely activated towards electrophilic attack: it reacts with chloroform in basic medium (Reimer-Tiemann) via dichlorocarbene (:CCl₂) to make salicylaldehyde, and with CO₂ (Kolbe's) to make salicylic acid.",
          formalDefinition: "Phenol Acidity: Driven by the resonance stabilization of the conjugate phenoxide ion, which distributes negative charge over the 2, 4, and 6 ring carbons.\nCumene Process: Industrial synthesis of phenol from cumene (isopropylbenzene) by aerial oxidation to cumene hydroperoxide, followed by acid-catalyzed cleavage to phenol and acetone.",
          rules: [
            "Industrial Synthesis: Cumene (isopropylbenzene) + O₂ → Cumene hydroperoxide + dilute H₂SO₄ → Phenol + Acetone (valuable byproduct!).",
            "Substituent Effect on Phenol Acidity: Electron-withdrawing groups (–NO₂, –CN, –Cl) at ortho and para positions strongly INCREASE acidity (Picric acid 2,4,6-trinitrophenol has pKa = 0.38, more acidic than acetic acid!).",
            "Electron-donating groups (–CH₃, –OCH₃) DECREASE acidity.",
            "Test for Phenols: Gives violet/purple colouration with neutral FeCl₃ solution due to formation of complex [Fe(OC₆H₅)₆]³⁻."
          ],
          examples: [
            {
              question: "Why is o-nitrophenol steam volatile, while p-nitrophenol is not?",
              thinking: "Examine intermolecular vs intramolecular hydrogen bonding.",
              solution: "In o-nitrophenol, the –OH and –NO₂ groups are adjacent, allowing intramolecular hydrogen bonding (chelation). This prevents molecules from bonding to each other. In p-nitrophenol, the groups are on opposite ends, forming extensive intermolecular hydrogen bonding between different molecules, raising its boiling point and preventing steam distillation.",
              answer: "Intramolecular H-bonding in ortho isomer vs intermolecular H-bonding in para isomer.",
              proTip: "Steam distillation is used to separate o-nitrophenol from p-nitrophenol! Guaranteed JEE question!"
            }
          ],
          practice: [
            {
              id: "ch15-p1",
              question: "Which of the following compounds has the lowest pKa (is most acidic)?",
              options: ["Phenol", "p-Cresol", "p-Nitrophenol", "Picric acid (2,4,6-trinitrophenol)"],
              answer: 3,
              explanation: "Picric acid has three powerful electron-withdrawing nitro groups (-M, -I) at all ortho and para positions, stabilizing the phenoxide ion so intensely that its pKa is 0.38.",
              concept: "Phenol Acidity"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch15-t1",
          question: "The electrophile involved in the Reimer-Tiemann reaction of phenol with CHCl₃ and NaOH is:",
          options: ["Trichloromethyl anion (:CCl₃⁻)", "Dichlorocarbene (:CCl₂)", "Formyl cation (CHO⁺)", "Chloronium ion (Cl⁺)"],
          answer: 1,
          explanation: "In basic medium, CHCl₃ undergoes α-elimination to generate neutral, electron-deficient Dichlorocarbene (:CCl₂), which acts as the electrophile.",
          topic: "Reimer-Tiemann Mechanism"
        }
      ]
    },

    // Chapter 16: Ethers
    {
      id: "ch16-ethers",
      chapterNum: 16,
      title: "Ethers",
      stage: 6,
      ncert: "Class 12 NCERT Chapter 11",
      jeeRelevance: "Williamson Synthesis Kinetics, Cleavage with HI, Anisole EAS",
      priority: "high",
      prerequisites: ["ch13-haloalkanes", "ch14-alcohols"],
      estTime: "4 Hours",
      topics: [
        {
          id: "ether-synthesis-cleavage",
          title: "Williamson Synthesis & Cleavage with Concentrated HI",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["SN2 vs E2", "Leaving groups"],
          estMinutes: 30,
          simpleExplanation: "Ethers (R–O–R') are relatively inert solvent molecules because the C–O bond is strong and alkoxide is a terrible leaving group. To break an ether, strong acidic conditions are needed (concentrated HI). The ether oxygen gets protonated into an oxonium ion (R–O⁺H–R'). Then, iodide (I⁻) attacks via SN2 on the less hindered carbon, forming an alcohol and an alkyl iodide!",
          formalDefinition: "Williamson Ether Synthesis: An SN2 reaction between a sodium alkoxide (R–O⁻Na⁺) and a primary alkyl halide (R'–X) to produce an ether.\nHI Ether Cleavage: Acid-catalyzed nucleophilic cleavage of dialkyl ethers by HI, where I⁻ attacks the less sterically hindered alkyl group (unless a 3° carbocation can form).",
          rules: [
            "Williamson Synthesis Rule: Alkyl halide MUST be 1° or methyl. If a 3° alkyl halide is used, alkoxide acts as strong base and gives 100% E2 elimination to alkene!",
            "HI Cleavage with 1° or 2° alkyl groups: Follows SN2 mechanism. Iodide attacks the LESS substituted carbon (e.g. CH₃–O–CH₂CH₃ + HI → CH₃I + CH₃CH₂OH).",
            "HI Cleavage with 3° alkyl group: Follows SN1 mechanism! The 3° C–O bond cleaves to give a stable 3° carbocation, yielding tertiary alkyl iodide and primary alcohol!",
            "Aryl Alkyl Ethers (Anisole Ph–O–CH₃): The Ph–O bond has partial double bond character due to resonance and CANNOT be broken. Product is ALWAYS Phenol (PhOH) and Methyl iodide (CH₃I)!"
          ],
          examples: [
            {
              question: "What products are formed when tert-butyl methyl ether is heated with 1 mole of concentrated HI?",
              thinking: "Identify the nature of the carbons attached to oxygen: one is methyl (1°), one is tert-butyl (3°).",
              solution: "Because a tertiary alkyl group is present, the protonated ether cleaves via an SN1 pathway to generate the highly stable tert-butyl carbocation [(CH₃)₃C⁺]. Iodide captures this carbocation to form tert-butyl iodide [(CH₃)₃C–I], while the remaining fragment is Methanol (CH₃OH).",
              answer: "tert-Butyl iodide and Methanol.",
              proTip: "If one group is 3°, the iodide ALWAYS attaches to the 3° carbon! If both groups are 1° or 2°, iodide attaches to the SMALLER carbon!"
            }
          ],
          practice: [
            {
              id: "ch16-p1",
              question: "Anisole (methoxybenzene) on treatment with concentrated HI at high temperature yields:",
              options: ["Phenol and Methyl iodide", "Iodobenzene and Methanol", "Benzene and Methyl alcohol", "Phenol and Methane"],
              answer: 0,
              explanation: "Due to resonance donation of oxygen lone pairs into the benzene ring, the phenyl C–O bond acquires partial double bond character and does not cleave. The aliphatic C–O bond cleaves via SN2 to yield Phenol and CH₃I.",
              concept: "HI Cleavage of Anisole"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch16-t1",
          question: "Which combination of reagents is best suited for the preparation of tert-butyl ethyl ether?",
          options: [
            "tert-Butyl bromide + Sodium ethoxide",
            "Sodium tert-butoxide + Ethyl bromide",
            "tert-Butyl alcohol + Ethanol in equal ratio",
            "tert-Butyl alcohol + Ethyl chloride"
          ],
          answer: 1,
          explanation: "In Williamson synthesis, the alkyl halide must be primary (Ethyl bromide) to avoid E2 elimination. Sodium tert-butoxide acts as the nucleophile.",
          topic: "Williamson Synthesis"
        }
      ]
    },

    // Chapter 18: Carboxylic Acids and Derivatives
    {
      id: "ch18-carboxylic-acids",
      chapterNum: 18,
      title: "Carboxylic Acids and Derivatives",
      stage: 6,
      ncert: "Class 12 NCERT Chapter 12",
      jeeRelevance: "Acidity (pKa ~ 4.5), HVZ Halogenation, Decarboxylation, Esterification",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch17-carbonyls"],
      estTime: "6 Hours",
      topics: [
        {
          id: "acid-acidity-reactions",
          title: "Acidity Factors, Hell-Volhard-Zelinsky (HVZ) & Decarboxylation",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Resonance in carboxylate", "Inductive effects"],
          estMinutes: 35,
          simpleExplanation: "Carboxylic acids (R–COOH) are the strongest organic acids (pKa 3–5). When they lose a proton, the resulting carboxylate anion (R–COO⁻) has two identical equivalent resonance structures with negative charge equally shared across both electronegative oxygens. Carboxylic acids effervesce with aqueous NaHCO₃ releasing CO₂ gas (a test distinguishing them from phenols!).",
          formalDefinition: "Hell-Volhard-Zelinsky (HVZ) Reaction: Halogenation of carboxylic acids possessing an α-hydrogen using Cl₂ or Br₂ in the presence of red phosphorus to form α-halocarboxylic acids.\nKolbe Electrolytic Decarboxylation: Electrolysis of aqueous sodium/potassium carboxylate solution yielding symmetrical alkanes at the anode.",
          rules: [
            "Test for Carboxylic Acid: Reacts with 5% NaHCO₃ with brisk effervescence of CO₂ gas (Phenols do not react with NaHCO₃, except picric acid).",
            "HVZ Reaction: R–CH₂–COOH + Br₂ / Red P, followed by H₂O → R–CH(Br)–COOH (selective α-bromination). Formic acid (HCOOH) cannot undergo HVZ because it has no α-carbon!",
            "Decarboxylation: Heating with Soda-lime (NaOH + CaO in 3:1 ratio) removes the carboxyl group as Na₂CO₃, yielding an alkane with 1 LESS carbon atom: R–COONa + NaOH (CaO, heat) → R–H + Na₂CO₃.",
            "Acidity Order: CF₃COOH > CCl₃COOH > CHCl₂COOH > CH₂ClCOOH > HCOOH > C₆H₅COOH > CH₃COOH."
          ],
          examples: [
            {
              question: "Arrange the following in decreasing order of acidic strength: (I) Benzoic acid, (II) 4-Nitrobenzoic acid, (III) 4-Methoxybenzoic acid, (IV) 2-Nitrobenzoic acid.",
              thinking: "Consider inductive, resonance, and the special ortho-effect.",
              solution: "Ortho-substituted benzoic acids are stronger acids than benzoic acid or meta/para substituted isomers due to the ortho-effect (steric hindrance forces –COOH out of the ring plane, enhancing resonance of carboxylate). Therefore, 2-Nitrobenzoic acid (IV) is most acidic. At the 4-position, –NO₂ is electron-withdrawing (-M, -I) so II > I. 4-Methoxy has –OCH₃ (+M), making it least acidic. Order: IV > II > I > III.",
              answer: "IV > II > I > III.",
              proTip: "The Ortho Effect: ANY substituent (electron donating or withdrawing) at the ortho position of benzoic acid INCREASES its acidity compared to benzoic acid!"
            }
          ],
          practice: [
            {
              id: "ch18-p1",
              question: "Which of the following carboxylic acids does NOT undergo the Hell-Volhard-Zelinsky (HVZ) reaction?",
              options: ["Ethanoic acid", "Propanoic acid", "2-Methylpropanoic acid", "2,2-Dimethylpropanoic acid"],
              answer: 3,
              explanation: "HVZ requires at least one α-hydrogen atom on the carbon adjacent to –COOH. In 2,2-dimethylpropanoic acid [(CH₃)₃C–COOH], the α-carbon has zero hydrogens.",
              concept: "HVZ Reaction"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch18-t1",
          question: "Sodium acetate on heating with soda-lime (NaOH + CaO) produces:",
          options: ["Ethane", "Methane", "Propane", "Carbon dioxide"],
          answer: 1,
          explanation: "Soda-lime decarboxylation removes the carboxyl carbon: CH₃COONa + NaOH (CaO, heat) → CH₄ + Na₂CO₃, producing methane.",
          topic: "Decarboxylation"
        }
      ]
    },

    // Chapter 20: Diazonium Salts
    {
      id: "ch20-diazonium-salts",
      chapterNum: 20,
      title: "Diazonium Salts",
      stage: 7,
      ncert: "Class 12 NCERT Chapter 13",
      jeeRelevance: "Sandmeyer, Gattermann, Balz-Schiemann, Azo Dye Coupling",
      priority: "very-high",
      prerequisites: ["ch19-amines"],
      estTime: "4 Hours",
      topics: [
        {
          id: "diazonium-reactions",
          title: "Diazotisation & Synthetic Transformations of Arenediazonium Salts",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Aromatic amines", "Good leaving groups (N₂ gas)"],
          estMinutes: 35,
          simpleExplanation: "Benzenediazonium chloride (C₆H₅N₂⁺Cl⁻) is synthesized by reacting aniline with nitrous acid (NaNO₂ + HCl) at 0–5°C. The –N₂⁺ group is the world's best leaving group because it departs as extremely stable, inert nitrogen gas (N₂). This makes diazonium salts the ultimate chemical bridge to convert aniline into chlorobenzene, bromobenzene, iodobenzene, fluorobenzene, phenol, benzonitrile, or brightly colored azo dyes!",
          formalDefinition: "Diazotisation: Conversion of primary aromatic amines into arenediazonium salts using NaNO₂ and mineral acid (HCl) at ice-cold temperatures (273–278 K).\nAzo Coupling: Electrophilic attack of diazonium cation on electron-rich phenols (pH 9-10) or aromatic amines (pH 4-5) yielding colored azo dyes containing –N=N– linkage.",
          rules: [
            "Temperature Control: Must be kept at 0–5°C (273–278 K). Above 5°C, diazonium salt hydrolyzes rapidly into Phenol and N₂ gas!",
            "Sandmeyer Reaction: C₆H₅N₂⁺Cl⁻ + Cu₂Cl₂/HCl → C₆H₅Cl + N₂; with Cu₂Br₂/HBr → C₆H₅Br; with CuCN/KCN → C₆H₅CN.",
            "Gattermann Reaction: Uses Copper powder (Cu/HCl or Cu/HBr) instead of cuprous halide (lower yield).",
            "Iodobenzene: Formed by simply shaking with KI at room temp (no copper catalyst needed!).",
            "Balz-Schiemann Reaction: C₆H₅N₂⁺Cl⁻ + HBF₄ → C₆H₅N₂⁺BF₄⁻ (precipitates), heat → Fluorobenzene (C₆H₅F) + BF₃ + N₂.",
            "Deamination (Reduction to Benzene): C₆H₅N₂⁺Cl⁻ + H₃PO₂ (hypophosphorous acid) + H₂O → C₆H₆ + H₃PO₃ + N₂ + HCl (or with CH₃CH₂OH)."
          ],
          examples: [
            {
              question: "How is Fluorobenzene prepared from Aniline in high yield?",
              thinking: "Direct fluorination of benzene is explosive, and Sandmeyer doesn't work for fluorine.",
              solution: "First, diazotize aniline with NaNO₂ + HCl at 0–5°C to form Benzenediazonium chloride. Then treat with fluoroboric acid (HBF₄) to precipitate Benzenediazonium fluoroborate (C₆H₅N₂⁺BF₄⁻). Isolating and gently heating the dry salt yields pure Fluorobenzene, BF₃, and N₂ (Balz-Schiemann reaction).",
              answer: "Via the Balz-Schiemann reaction using HBF₄ and heat.",
              proTip: "Balz-Schiemann is the ONLY standard method to introduce Fluorine onto a benzene ring!"
            }
          ],
          practice: [
            {
              id: "ch20-p1",
              question: "Benzenediazonium chloride on reaction with hypophosphorous acid (H₃PO₂) in the presence of Cu⁺ gives:",
              options: ["Chlorobenzene", "Phenol", "Benzene", "Aniline"],
              answer: 2,
              explanation: "H₃PO₂ acts as a reducing agent, replacing the diazonium group with hydrogen to produce benzene, while being oxidized to H₃PO₃.",
              concept: "Reduction of Diazonium Salts"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch20-t1",
          question: "Azo coupling of benzenediazonium chloride with phenol is carried out in which pH medium?",
          options: ["Strongly acidic (pH 1-2)", "Mildly basic (pH 9-10)", "Neutral (pH 7)", "Anhydrous medium"],
          answer: 1,
          explanation: "In mildly basic medium (pH 9-10), phenol is converted into phenoxide ion, which is far more electron-rich and readily attacked by the weak diazonium electrophile.",
          topic: "Azo Coupling"
        }
      ]
    },

    // Chapter 22: Purification and Characterisation
    {
      id: "ch22-purification",
      chapterNum: 22,
      title: "Purification and Characterisation of Organic Compounds",
      stage: 9,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "Steam Distillation, Fractional Distillation, Chromatography Rf Values",
      priority: "high",
      prerequisites: ["ch0-foundation"],
      estTime: "4 Hours",
      topics: [
        {
          id: "distillation-chromatography",
          title: "Distillation Techniques, Steam Distillation & Chromatography (Rf Values)",
          priority: "high",
          difficulty: "Medium",
          prereqList: ["Vapour pressure & boiling point", "Adsorption vs partition"],
          estMinutes: 30,
          simpleExplanation: "Before testing any organic compound, it must be purified. Simple distillation works when boiling points differ by >25°C. Fractional distillation is required when boiling points are close (<25°C). Steam distillation purifies substances that are steam-volatile and water-immiscible (boiling mixture boils when P_total = P_water + P_organic = 1 atm, always below 100°C!). Chromatography separates components based on differing adsorption on a stationary phase.",
          formalDefinition: "Steam Distillation: A separation technique applied to steam-volatile, water-immiscible liquids that decompose at their normal boiling points.\nRetardation Factor (Rf): The ratio of the distance moved by the substance to the distance moved by the solvent front on a chromatogram.",
          rules: [
            "Steam Distillation criterion: Substance must be insoluble in water, steam volatile, and have high vapour pressure near 100°C (e.g. o-nitrophenol, aniline, essential oils).",
            "Distillation under reduced pressure (Vacuum Distillation): Used for liquids with very high boiling points that decompose at or below their normal boiling point (e.g. Glycerol boils at 290°C with decomposition, but at 180°C under 12 mmHg).",
            "Rf Value Formula: Rf = (Distance traveled by compound) / (Distance traveled by solvent front). Rf is always between 0 and 1."
          ],
          examples: [
            {
              question: "Why is glycerol purified by distillation under reduced pressure?",
              thinking: "What happens to glycerol when heated to its normal boiling point?",
              solution: "Glycerol has a normal boiling point of 290°C at 1 atm. At this high temperature, it undergoes thermal decomposition into acrolein (CH₂=CH–CHO). By lowering the external pressure to 12 mmHg, its boiling point drops to 180°C, allowing distillation safely without decomposition.",
              answer: "Because it decomposes at its normal atmospheric boiling point.",
              proTip: "Glycerol = Vacuum distillation. o-Nitrophenol = Steam distillation. Chloroform & Aniline = Simple distillation."
            }
          ],
          practice: [
            {
              id: "ch22-p1",
              question: "A mixture of o-nitrophenol and p-nitrophenol can be conveniently separated by:",
              options: ["Fractional crystallization", "Steam distillation", "Sublimation", "Chromatography on alumina"],
              answer: 1,
              explanation: "o-Nitrophenol has intramolecular hydrogen bonding, making it steam-volatile, whereas p-nitrophenol has intermolecular hydrogen bonding and is non-volatile with steam.",
              concept: "Steam Distillation"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch22-t1",
          question: "In thin layer chromatography (TLC), if the compound moves 3.0 cm and the solvent front moves 5.0 cm, the Rf value is:",
          options: ["0.60", "1.67", "0.30", "0.50"],
          answer: 0,
          explanation: "Rf = distance moved by compound / distance moved by solvent front = 3.0 / 5.0 = 0.60.",
          topic: "TLC Rf Calculation"
        }
      ]
    },

    // Chapter 24: Quantitative Organic Analysis
    {
      id: "ch24-quantitative",
      chapterNum: 24,
      title: "Quantitative Organic Analysis",
      stage: 9,
      ncert: "Class 11 NCERT Chapter 12",
      jeeRelevance: "Dumas Method, Kjeldahl Method, Carius Method Numerical Calculations",
      priority: "very-high",
      prerequisites: ["ch0-foundation", "ch23-qualitative"],
      estTime: "5 Hours",
      topics: [
        {
          id: "kjeldahl-dumas-carius",
          title: "Estimation of Carbon, Hydrogen, Nitrogen (Dumas/Kjeldahl) & Halogens (Carius)",
          priority: "very-high",
          difficulty: "Hard",
          prereqList: ["Mole concept", "Acid-base titration calculations"],
          estMinutes: 40,
          simpleExplanation: "Quantitative analysis determines the percentage composition of elements in an organic compound. Carbon and Hydrogen are estimated by burning with CuO to CO₂ and H₂O. Nitrogen is estimated by Dumas method (converting to N₂ gas measured in a nitrometer) or Kjeldahl method (converting to (NH₄)₂SO₄, releasing NH₃ into standard acid). Halogens and Sulphur are estimated by the Carius method (heating with fuming HNO₃ to precipitate AgX or BaSO₄).",
          formalDefinition: "Dumas Method: The nitrogenous organic compound is heated with copper oxide in an atmosphere of CO₂ to produce N₂ gas, which is collected over concentrated KOH solution.\nKjeldahl Method: Organic compound is heated with conc. H₂SO₄ (with K₂SO₄ and CuSO₄) to convert nitrogen into (NH₄)₂SO₄, neutralized with NaOH to evolve NH₃, which is titrated against standard acid.",
          rules: [
            "% Carbon = (12 / 44) × (Mass of CO₂ / Mass of compound) × 100",
            "% Hydrogen = (2 / 18) × (Mass of H₂O / Mass of compound) × 100",
            "% Nitrogen (Kjeldahl) = (1.4 × Normality of acid × Volume of acid neutralized by NH₃ in mL) / (Mass of sample in g)",
            "CRUCIAL KJELDAHL EXCEPTION: Kjeldahl's method CANNOT be used for compounds containing nitrogen in: (1) Nitro groups (–NO₂), (2) Azo groups (–N=N–), or (3) In the ring (Pyridine, Quinoline), because their nitrogen cannot be converted into ammonium sulphate under standard digestion conditions!",
            "% Halogen (Carius) = (Atomic mass of X / Molecular mass of AgX) × (Mass of AgX / Mass of compound) × 100",
            "% Sulphur (Carius) = (32 / 233) × (Mass of BaSO₄ / Mass of compound) × 100"
          ],
          examples: [
            {
              question: "In Carius method, 0.186 g of an organic compound gave 0.320 g of AgBr. Find the percentage of bromine in the compound. (Molar mass of Ag = 108, Br = 80)",
              thinking: "Molar mass of AgBr = 108 + 80 = 188 g/mol.",
              solution: "% Br = (80 / 188) × (0.320 / 0.186) × 100 = 0.4255 × 1.7204 × 100 = 73.2%.",
              answer: "73.2% Bromine.",
              proTip: "Memorize the multipliers: (12/44) for C, (2/18) for H, (1.4*N*V/W) for Kjeldahl N, (32/233) for S, and (80/188) for AgBr!"
            }
          ],
          practice: [
            {
              id: "ch24-p1",
              question: "Which of the following compounds CANNOT be estimated for nitrogen by Kjeldahl's method?",
              options: ["Urea", "Glycine", "Nitrobenzene", "Aniline"],
              answer: 2,
              explanation: "Nitrobenzene contains nitrogen in a –NO₂ group, which does not get converted into ammonium sulphate upon digestion with concentrated H₂SO₄.",
              concept: "Kjeldahl Limitations"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch24-t1",
          question: "In Dumas method for nitrogen estimation, the volume of N₂ gas is measured over an aqueous solution of:",
          options: ["Water", "Saturated NaCl", "Concentrated KOH", "Concentrated H₂SO₄"],
          answer: 2,
          explanation: "N₂ is collected over concentrated KOH solution so that CO₂ gas produced in combustion is completely absorbed as K₂CO₃, leaving pure dry N₂.",
          topic: "Dumas Method"
        }
      ]
    },

    // Chapter 25: Functional Group Detection & Practical Chemistry
    {
      id: "ch25-functional-groups",
      chapterNum: 25,
      title: "Functional Group Detection & Practical Organic Tests",
      stage: 9,
      ncert: "Class 11/12 NCERT Lab Manual",
      jeeRelevance: "Spot Tests, Distinction Tests, Diagnostic Color Reactions (Guaranteed 4 Marks)",
      priority: "very-high",
      prerequisites: ["ch8-goc", "ch23-qualitative"],
      estTime: "5 Hours",
      topics: [
        {
          id: "diagnostic-tests",
          title: "Chemical Tests for Unsaturation, Alcohols, Carbonyls, Acids & Amines",
          priority: "very-high",
          difficulty: "Medium",
          prereqList: ["Functional groups", "Oxidation-reduction"],
          estMinutes: 35,
          simpleExplanation: "In JEE Main practical chemistry, questions ask how to chemically distinguish between two organic compounds. Each functional group has unique fingerprint reactions: alkenes decolorize bromine water; 1°/2°/3° alcohols react differently with Lucas reagent; aldehydes reduce Tollens' and Fehling's reagents; methyl ketones give yellow iodoform (CHI₃); carboxylic acids effervesce with NaHCO₃; and 1° amines produce foul-smelling isocyanides (Carbylamine test)!",
          formalDefinition: "Diagnostic Organic Test: A rapid, visible colorimetric, precipitate-forming, or gas-evolving reaction uniquely characteristic of a specific functional group.",
          rules: [
            "Unsaturation Test: Decolorizes Bromine in CCl₄ (red-brown to colorless without HBr gas) and Baeyer's reagent (cold alkaline KMnO₄ pink to brown MnO₂).",
            "Ceric Ammonium Nitrate (CAN) Test: Alcohols give a red/pink colouration.",
            "Neutral FeCl₃ Test: Phenols give a characteristic violet/purple colouration.",
            "Tollens' Test (Silver Mirror): Aldehydes (aliphatic and aromatic) give silver mirror with [Ag(NH₃)₂]⁺. Ketones do NOT react!",
            "Fehling's Test: Aliphatic aldehydes reduce Fehling's solution to red Cu₂O precipitate. Benzaldehyde does NOT reduce Fehling's!",
            "Iodoform Test (I₂ + NaOH): Compounds having CH₃–C=O or CH₃–CH(OH)– give a yellow precipitate of Iodoform (CHI₃, m.p. 119°C) with antiseptic smell.",
            "Sodium Bicarbonate Test: Carboxylic acids evolve CO₂ with effervescence with 5% NaHCO₃.",
            "Carbylamine Test: Primary (1°) aliphatic or aromatic amines heated with CHCl₃ and alc. KOH give an extremely foul-smelling isocyanide (carbylamine, R–NC). 2° and 3° amines DO NOT react!",
            "Hinsberg's Test: Benzene sulphonyl chloride (C₆H₅SO₂Cl) reacts with 1° amines to give a precipitate soluble in alkali; with 2° amines to give a precipitate INSOLUBLE in alkali; 3° amines do not react."
          ],
          examples: [
            {
              question: "How can you chemically distinguish between Benzaldehyde and Acetophenone?",
              thinking: "Benzaldehyde is an aldehyde; Acetophenone is a methyl ketone.",
              solution: "Benzaldehyde (C₆H₅CHO) reduces Tollens' reagent to give a bright silver mirror, whereas Acetophenone (C₆H₅COCH₃) is a ketone and does not react with Tollens'. Conversely, Acetophenone possesses a methyl ketone group (CH₃–CO–) and gives a positive yellow iodoform (CHI₃) precipitate with I₂/NaOH, which benzaldehyde cannot give.",
              answer: "Tollens' reagent (positive for benzaldehyde) or Iodoform test (positive for acetophenone).",
              proTip: "The Iodoform test requires either a CH₃–CO– group or a CH₃–CH(OH)– group! Ethanol is the ONLY 1° alcohol that gives a positive iodoform test!"
            }
          ],
          practice: [
            {
              id: "ch25-p1",
              question: "Which of the following alcohols will give a positive Iodoform test?",
              options: ["Methanol", "Ethanol", "Propan-1-ol", "Butan-1-ol"],
              answer: 1,
              explanation: "Ethanol (CH₃–CH₂OH) has the requisite CH₃–CH(OH)– structural unit. In presence of I₂ and NaOH, it is first oxidized to acetaldehyde (CH₃CHO) and then iodinated to give yellow CHI₃ precipitate.",
              concept: "Iodoform Test"
            },
            {
              id: "ch25-p2",
              question: "A primary amine can be distinguished from secondary and tertiary amines by:",
              options: ["Lucas test", "Carbylamine test", "Tollens' test", "Fehling's test"],
              answer: 1,
              explanation: "The Carbylamine test (heating with CHCl₃ and alcoholic KOH) is exclusively given by primary (1°) amines, forming foul-smelling isocyanides (R–NC).",
              concept: "Carbylamine Test"
            }
          ]
        }
      ],
      chapterTest: [
        {
          id: "ch25-t1",
          question: "An organic compound gives effervescence with NaHCO₃ solution and also gives a positive 2,4-DNP test. The compound contains which functional groups?",
          options: ["Ester and alcohol", "Carboxylic acid and carbonyl group", "Amine and ether", "Phenol and alkene"],
          answer: 1,
          explanation: "Effervescence with NaHCO₃ confirms a carboxylic acid group (–COOH). Reaction with 2,4-DNP confirms a carbonyl group (aldehyde or ketone).",
          topic: "Diagnostic Functional Group Tests"
        }
      ]
    }
  ];

  // Merge extended chapters into master CURRICULUM
  EXTENDED_CHAPTERS.forEach(newCh => {
    const existingIdx = window.CHEM_DATA.CURRICULUM.findIndex(c => c.id === newCh.id || c.chapterNum === newCh.chapterNum);
    if (existingIdx >= 0) {
      window.CHEM_DATA.CURRICULUM[existingIdx] = newCh;
    } else {
      window.CHEM_DATA.CURRICULUM.push(newCh);
    }
  });

  // Sort CURRICULUM by chapterNum strictly
  window.CHEM_DATA.CURRICULUM.sort((a, b) => a.chapterNum - b.chapterNum);

})();
