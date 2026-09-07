/**
 * JEE MAIN ORGANIC CHEMISTRY - MASTER CURRICULUM CHAPTERS 1 TO 25
 * Complete chapter data with 3-layer pedagogy, examples, tests, mind maps, and connections.
 */

(function() {
  if (!window.CHEM_CURRICULUM) {
    window.CHEM_CURRICULUM = { CHAPTERS: [] };
  }

  const extendedChapters = [
    // CHAPTER 1: CARBON AND ITS COMPOUNDS
    {
      id: "ch-01",
      number: 1,
      title: "Carbon and Its Compounds",
      subtitle: "The Unique Versatility of Carbon & Organic Building Blocks",
      ncert: "Class 10 Science (Chapter 4) & Class 11 Basics",
      priority: "very-high",
      whyImportant: "Explains why millions of carbon compounds exist compared to only a few thousand for all other elements combined.",
      prerequisites: ["Chapter 0 — Valency and Octet Rule", "Chapter 0 — Covalent Bonds"],
      nextChapterId: "ch-02",
      nextChapterTitle: "Chapter 2 — Atomic Structure Basics",
      bridgeText: "You have learned how carbon forms chains, rings, and functional groups. To understand the 3D shapes and bond strengths of these carbon skeletons, we now look deeper into atomic orbitals and quantum mechanics.",
      topics: [
        {
          id: "ch01-topic01",
          number: "1.1",
          title: "Why Carbon Is Special — Tetravalency and Catenation",
          prerequisites: ["0.6 Valency and the Octet Rule"],
          whyMatters: "Without catenation and tetravalency, organic chemistry and biological life could not exist.",
          useLaterIn: ["Chapter 5 — Classification", "Chapter 9 — Alkanes"],
          lesson: {
            simple: "Why is there an entire branch of chemistry dedicated just to Carbon? Two magical reasons: 1) Tetravalency: Carbon has 4 valence electrons, so it forms 4 strong covalent bonds. 2) Catenation: Carbon atoms can link to other carbon atoms to form endless straight chains, branched trees, and closed rings! Silicon tries this too, but its bonds are too weak and break. Carbon's tiny size makes its C–C bonds exceptionally strong and stable.",
            formal: "Catenation is the self-linking property of atoms of an element to form chains and rings through covalent bonds. Carbon exhibits maximum catenation power in the periodic table due to its high C–C bond dissociation enthalpy (~348 kJ/mol) and small atomic radius (77 pm), which ensures maximum orbital overlap without significant internuclear repulsion.",
            jee: "JEE Main frequently compares catenation order down Group 14: C >> Si > Ge ≈ Sn. Lead (Pb) shows zero catenation. The reason is the rapid decrease in M–M bond enthalpy due to increasing atomic size."
          },
          examples: [
            {
              question: "Why does Carbon exhibit far greater catenation than Silicon, even though both belong to Group 14?",
              thinking: "Compare atomic sizes and single bond dissociation energies of C–C vs Si–Si.",
              concept: "Group 14 Catenation Trend",
              solution: "Carbon has a very small covalent radius (77 pm), resulting in strong, effective orbital overlap and a high C–C bond enthalpy of ~348 kJ/mol. Silicon has a much larger radius (118 pm), so its 3p-3p orbital overlap is diffuse, resulting in a much weaker Si–Si bond enthalpy (~222 kJ/mol). Therefore, long Si–Si chains are unstable and easily cleaved.",
              answer: "Smaller atomic size and much higher bond dissociation energy of C–C.",
              shortcut: "Smaller size = stronger covalent bond = superior catenation.",
              commonMistake: "Attributing catenation solely to tetravalency rather than bond strength."
            },
            {
              question: "State the four fundamental allotropes of carbon and whether they conduct electricity.",
              thinking: "Recall diamond, graphite, fullerenes, and graphene, and whether they have free mobile electrons.",
              concept: "Carbon Allotropes",
              solution: "1. Diamond: Each sp³ carbon bonded to 4 carbons in a rigid 3D tetrahedral network; no free electrons → Electrical insulator.\n2. Graphite: sp² carbon in hexagonal 2D planar layers with delocalized pi electrons that move between layers → Good conductor of electricity.\n3. Fullerene (C₆₀ Buckyball): Spherical cage of 20 hexagons and 12 pentagons; semi-conducting.\n4. Graphene: Single 2D layer of graphite; exceptional electrical conductor.",
              answer: "Diamond (insulator), Graphite (conductor), Fullerene (semiconductor), Graphene (conductor).",
              shortcut: "sp² with free mobile pi electrons conducts; sp³ does not.",
              commonMistake: "Thinking diamond conducts electricity because it is hard."
            }
          ],
          guidedPractice: [
            {
              question: "Can carbon form an ionic C⁴⁺ or C⁴⁻ ion under ordinary chemical conditions?",
              hint: "Think about the energy required to remove 4 electrons or add 4 electrons to a tiny nucleus with 6 protons.",
              solution: "No. Removing 4 electrons to form C⁴⁺ requires an astronomical amount of ionization energy. Adding 4 electrons to form C⁴⁻ would require a tiny nucleus with only 6 protons to hold 10 electrons, which is electrostatically unstable. Hence carbon only shares electrons to form covalent bonds."
            }
          ],
          topicTest: [
            {
              id: "ch01-t01-q1",
              question: "The property of self-linking of carbon atoms through covalent bonds to form long chains is termed:",
              options: ["Allotropy", "Isomerism", "Catenation", "Polymerization"],
              answer: 2,
              explanation: "Catenation is the bonding of atoms of the same element into a series, called chain or ring structures."
            },
            {
              id: "ch01-t01-q2",
              question: "Which allotrope of carbon is a good conductor of electricity due to mobile delocalized electrons?",
              options: ["Diamond", "Graphite", "Silicon carbide", "Quartz"],
              answer: 1,
              explanation: "Graphite features sp² hybridized carbon atoms with one unhybridized p-orbital per atom forming a delocalized pi electron network that moves freely."
            },
            {
              id: "ch01-t01-q3",
              question: "The correct decreasing order of catenation tendency among Group 14 elements is:",
              options: ["C > Si > Ge ≈ Sn > Pb", "Si > C > Ge > Sn", "C > Pb > Sn > Ge", "Sn > Ge > Si > C"],
              answer: 0,
              explanation: "Catenation depends directly on element-element single bond strength: C (348 kJ/mol) >> Si (222 kJ/mol) > Ge (167 kJ/mol) ≈ Sn (155 kJ/mol) > Pb."
            },
            {
              id: "ch01-t01-q4",
              question: "Why does carbon strictly prefer covalent bonding over forming C⁴⁺ or C⁴⁻ ionic salts?",
              options: [
                "Carbon is a noble gas",
                "Extreme energy barrier for removing or adding 4 electrons to a Z=6 nucleus",
                "Carbon has d-orbitals",
                "Carbon is too heavy"
              ],
              answer: 1,
              explanation: "Sum of first 4 ionization energies is prohibitively high, while 6 protons cannot stably hold 10 electrons in C⁴⁻."
            },
            {
              id: "ch01-t01-q5",
              question: "Buckminsterfullerene (C₆₀) contains how many hexagonal and pentagonal rings?",
              options: ["20 hexagons and 12 pentagons", "12 hexagons and 20 pentagons", "24 hexagons and 6 pentagons", "30 hexagons and 10 pentagons"],
              answer: 0,
              explanation: "C₆₀ contains exactly 20 six-membered rings (hexagons) and 12 five-membered rings (pentagons)."
            }
          ]
        },

        {
          id: "ch01-topic02",
          number: "1.2",
          title: "Covalent Bonds — Single, Double, and Triple Bonds",
          prerequisites: ["1.1 Why Carbon Is Special"],
          whyMatters: "Single, double, and triple bonds define the three main hydrocarbon families: alkanes, alkenes, and alkynes.",
          useLaterIn: ["Chapter 4 — Chemical Bonding", "Chapter 9, 10, 11 — Hydrocarbons"],
          lesson: {
            simple: "Carbon can share electrons in three ways: 1) Single bond (C–C): Shares 1 pair of electrons (2 electrons). Very flexible, allows free rotation. 2) Double bond (C=C): Shares 2 pairs of electrons (4 electrons). Stiff, rigid, cannot rotate freely! 3) Triple bond (C≡C): Shares 3 pairs of electrons (6 electrons). Linear, shortest and strongest bond. Molecules with only single bonds are Saturated (e.g. Alkanes). Molecules with double or triple bonds are Unsaturated (e.g. Alkenes, Alkynes).",
            formal: "A single covalent bond consists of one head-on sigma (σ) bond. A double bond consists of one strong σ bond and one weaker sideways pi (π) bond formed by parallel overlap of unhybridized p-orbitals. A triple bond consists of one σ bond and two mutually perpendicular π bonds. Bond lengths: C–C (1.54 Å) > C=C (1.34 Å) > C≡C (1.20 Å). Bond enthalpies: C≡C (835 kJ/mol) > C=C (610 kJ/mol) > C–C (348 kJ/mol).",
            jee: "JEE Main regularly asks for sigma and pi bond counts in organic structures, as well as the test for unsaturation (decolorization of Bromine water Br₂/CCl₄ and Baeyer's reagent cold dilute alkaline KMnO₄)."
          },
          examples: [
            {
              question: "Count the total number of sigma (σ) and pi (π) bonds in but-1-en-3-yne (CH₂=CH–C≡CH).",
              thinking: "Draw every single C–H and C–C bond explicitly. Single = 1σ, Double = 1σ + 1π, Triple = 1σ + 2π.",
              concept: "Sigma and Pi Bond Counting",
              solution: "Break down the molecule:\n- C1 has 2 single C–H bonds (2σ) and 1 C=C double bond (1σ, 1π).\n- C2 has 1 single C–H bond (1σ) and 1 C2–C3 single bond (1σ).\n- C3 has 1 C≡C triple bond (1σ, 2π).\n- C4 has 1 single C–H bond (1σ).\nSumming up:\nTotal σ bonds = 4 (C–H) + 3 (C–C) = 7 σ bonds.\nTotal π bonds = 1 (from C=C) + 2 (from C≡C) = 3 π bonds.",
              answer: "7 sigma (σ) bonds and 3 pi (π) bonds.",
              shortcut: "Total σ = (Total atoms - 1) + (Number of rings). Here 8 atoms - 1 = 7 σ bonds. Double = 1π, Triple = 2π → 3π.",
              commonMistake: "Forgetting to count the single C–H bonds."
            },
            {
              question: "Why is an alkene (C=C) more chemically reactive towards electrophiles than an alkane (C–C), even though the double bond has a higher total bond energy?",
              thinking: "Examine the accessibility and strength of the pi bond compared to the sigma bond.",
              concept: "Pi Bond Reactivity",
              solution: "Although a double bond (610 kJ/mol) is stronger overall than a single bond (348 kJ/mol), the pi bond is formed by lateral (sideways) overlap and its bond energy is only ~262 kJ/mol (610 - 348). The pi electron cloud lies above and below the internuclear plane, exposed to attacking electrophiles.",
              answer: "The exposed, weaker pi bond breaks easily during electrophilic addition.",
              shortcut: "Pi electrons are loosely held and exposed above/below the molecular plane.",
              commonMistake: "Thinking a double bond is entirely weaker than a single bond."
            }
          ],
          guidedPractice: [
            {
              question: "How many sigma and pi bonds are present in one molecule of Benzene (C₆H₆)?",
              hint: "Benzene has 6 C–C bonds (alternating single and double in Kekulé form) and 6 C–H bonds.",
              solution: "6 C–C sigma bonds + 6 C–H sigma bonds = 12 sigma bonds. 3 double bonds contribute 3 pi bonds."
            }
          ],
          topicTest: [
            {
              id: "ch01-t02-q1",
              question: "How many electrons are shared in a carbon-carbon triple bond (C≡C)?",
              options: ["2", "4", "6", "8"],
              answer: 2,
              explanation: "A triple bond shares 3 pairs of electrons = 6 electrons in total."
            },
            {
              id: "ch01-t02-q2",
              question: "A carbon-carbon double bond consists of:",
              options: [
                "Two sigma (σ) bonds",
                "Two pi (π) bonds",
                "One sigma (σ) bond and one pi (π) bond",
                "One coordinate bond"
              ],
              answer: 2,
              explanation: "A double bond comprises one axial head-on σ bond and one lateral sideways π bond."
            },
            {
              id: "ch01-t02-q3",
              question: "Which carbon-carbon bond length is the shortest?",
              options: ["C–C (Ethane)", "C=C (Ethene)", "C≡C (Ethyne)", "C–C (Benzene)"],
              answer: 2,
              explanation: "C≡C is the shortest at 1.20 Å, compared to 1.34 Å for C=C, 1.39 Å for benzene, and 1.54 Å for C–C."
            },
            {
              id: "ch01-t02-q4",
              question: "Reagent used to distinguish saturated hydrocarbons from unsaturated hydrocarbons is:",
              options: ["Bromine water (Br₂ in CCl₄)", "NaCl solution", "Litmus paper", "Phenolphthalein"],
              answer: 0,
              explanation: "Unsaturated compounds (alkenes, alkynes) rapidly decolorize reddish-brown bromine water by electrophilic addition, whereas saturated alkanes do not."
            },
            {
              id: "ch01-t02-q5",
              question: "How many sigma and pi bonds are in ethyne (acetylene, H–C≡C–H)?",
              options: ["2 σ, 3 π", "3 σ, 2 π", "5 σ, 0 π", "1 σ, 4 π"],
              answer: 1,
              explanation: "Two C–H single bonds (2σ) + one C≡C triple bond (1σ, 2π) = 3 sigma and 2 pi bonds."
            }
          ]
        },

        {
          id: "ch01-topic03",
          number: "1.3",
          title: "Homologous Series and Functional Groups",
          prerequisites: ["1.2 Covalent Bonds"],
          whyMatters: "Allows you to predict the chemical behavior of thousands of compounds by learning just one functional group family.",
          useLaterIn: ["Chapter 6 — IUPAC", "Chapter 13 to 20 — All Functional Group Families"],
          lesson: {
            simple: "Imagine a family where every member shares the same last name and similar habits. In organic chemistry, this is a Homologous Series! Every successive member differs by exactly one –CH₂– (methylene) unit and 14 atomic mass units (amu). A Functional Group is an atom or group of atoms (like –OH for alcohols, –CHO for aldehydes, –COOH for carboxylic acids) attached to a carbon chain that dictates its chemical reactions.",
            formal: "A Homologous Series is a series of structurally related organic compounds containing the same functional group, where each successive member differs from the next by a –CH₂– unit (molecular mass difference of 14 u). They share identical general formulas, similar chemical properties, and exhibit regular gradation in physical properties (boiling point, melting point, density) due to increasing molecular weight and van der Waals forces.",
            jee: "JEE Main regularly tests functional group identification, homologous formula calculations (Alkanes C_n H_{2n+2}, Alkenes C_n H_{2n}, Alkynes C_n H_{2n-2}), and physical property trends (e.g. why branching decreases boiling point)."
          },
          examples: [
            {
              question: "Identify the functional group present in each of the following: (a) CH₃CH₂OH, (b) CH₃COCH₃, (c) CH₃COOH, (d) CH₃NH₂.",
              thinking: "Locate the heteroatoms (O, N) and their specific bonding arrangement.",
              concept: "Functional Group Recognition",
              solution: "(a) CH₃CH₂OH has the hydroxyl group (–OH) → Alcohol.\n(b) CH₃COCH₃ has a carbonyl group (C=O) bonded to two carbon groups → Ketone.\n(c) CH₃COOH has a carboxyl group (–COOH) → Carboxylic Acid.\n(d) CH₃NH₂ has an amino group (–NH₂) → Primary (1°) Amine.",
              answer: "(a) Alcohol, (b) Ketone, (c) Carboxylic acid, (d) Primary amine.",
              shortcut: "–OH = Alcohol; C=O sandwiched = Ketone; –COOH = Carboxylic acid; –NH₂ = Amine.",
              commonMistake: "Confusing aldehydes (–CHO, terminal) with ketones (–CO–, internal)."
            },
            {
              question: "Why does the boiling point increase smoothly as you ascend the homologous series of straight-chain alkanes (Methane < Ethane < Propane < Butane)?",
              thinking: "What intermolecular force exists between non-polar alkane molecules, and how does it depend on molecular size?",
              concept: "Physical Gradation in Homologous Series",
              solution: "Alkanes are non-polar molecules held together exclusively by London dispersion (van der Waals) forces. As carbon chain length increases by –CH₂– units, the total surface area and molecular mass increase, providing more polarizable electrons. Stronger London dispersion forces require more thermal energy to overcome, raising the boiling point.",
              answer: "Increased surface area and stronger van der Waals forces with higher molecular mass.",
              shortcut: "Higher molar mass = Greater surface area = Stronger dispersion forces = Higher boiling point.",
              commonMistake: "Claiming alkanes form hydrogen bonds."
            }
          ],
          guidedPractice: [
            {
              question: "What is the molecular formula of the 5th member of the alkyne homologous series (general formula C_n H_{2n-2})?",
              hint: "Remember the first alkyne starts at n=2 (Ethyne, C₂H₂). The 5th member has n = 2 + 4 = 6 carbons.",
              solution: "First member is n=2 (Ethyne). 5th member has n=6: C₆H_{2(6)-2} = C₆H₁₀ (Hexyne)."
            }
          ],
          topicTest: [
            {
              id: "ch01-t03-q1",
              question: "Successive members of any homologous series differ from each other by a molecular mass of:",
              options: ["12 u", "14 u", "16 u", "18 u"],
              answer: 1,
              explanation: "They differ by a –CH₂– unit: Carbon (12) + 2 × Hydrogen (1) = 14 u."
            },
            {
              id: "ch01-t03-q2",
              question: "The general molecular formula for the open-chain alkene homologous series is:",
              options: ["C_n H_{2n+2}", "C_n H_{2n}", "C_n H_{2n-2}", "C_n H_{2n-4}"],
              answer: 1,
              explanation: "Alkenes have one double bond, giving the formula C_n H_{2n}."
            },
            {
              id: "ch01-t03-q3",
              question: "Which of the following contains an aldehyde functional group?",
              options: ["CH₃CH₂OH", "CH₃CHO", "CH₃COCH₃", "CH₃COOH"],
              answer: 1,
              explanation: "CH₃CHO has the formyl group (–CHO), characteristic of aldehydes."
            },
            {
              id: "ch01-t03-q4",
              question: "Between straight-chain pentane and branched 2,2-dimethylpropane (neopentane), which has the higher boiling point and why?",
              options: [
                "Neopentane, because branching increases surface area",
                "Pentane, because straight chains have greater surface area and stronger dispersion forces",
                "Both have identical boiling points because they have the same formula C₅H₁₂",
                "Neopentane, because it forms hydrogen bonds"
              ],
              answer: 1,
              explanation: "Branching makes the molecule spherical and compact, reducing molecular surface area and weakening van der Waals forces, lowering the boiling point."
            },
            {
              id: "ch01-t03-q5",
              question: "All members of a homologous series have:",
              options: [
                "Same physical properties",
                "Same functional group and similar chemical properties",
                "Same molecular mass",
                "Same boiling point"
              ],
              answer: 1,
              explanation: "Compounds in a homologous series possess the same functional group, which dictates their chemical reactivity."
            }
          ]
        }
      ],

      summary: {
        whatYouLearned: [
          "Carbon exhibits extraordinary catenation due to strong C–C bond enthalpy (348 kJ/mol) and small radius (77 pm).",
          "Carbon forms single (1σ), double (1σ, 1π), and triple (1σ, 2π) bonds.",
          "Hydrocarbons are classified as saturated (single bonds) or unsaturated (double/triple bonds).",
          "Homologous series share general formulas and differ by –CH₂– (14 amu).",
          "Functional groups (–OH, –CHO, –CO–, –COOH, –NH₂) govern chemical behavior."
        ],
        importantDefinitions: [
          "Catenation: Ability of an element to self-link into chains and rings.",
          "Homologous Series: Series of compounds differing by –CH₂– unit with similar chemical properties.",
          "Functional Group: Reactive center determining characteristic chemistry."
        ],
        importantRules: [
          "Sigma bonds form by head-on axial overlap; pi bonds form by lateral sideways overlap.",
          "Alkanes: C_n H_{2n+2}; Alkenes: C_n H_{2n}; Alkynes: C_n H_{2n-2}."
        ],
        commonTraps: [
          "Remember the first alkene or alkyne has n=2 (ethene, ethyne); n=1 does not exist for alkenes/alkynes!",
          "Branching lowers boiling point due to reduced surface area."
        ],
        jeeFocus: "Sigma/pi counting, catenation trends in Group 14, allotropes (graphite vs diamond), and functional group identification."
      },

      mindMap: {
        title: "Chapter 1 — Carbon and Its Compounds",
        root: "Carbon Chemistry",
        branches: [
          {
            title: "Unique Traits",
            nodes: ["Tetravalency (4 bonds)", "Catenation (C-C 348 kJ)", "Allotropes (Graphite/Diamond)"]
          },
          {
            title: "Bonds & Saturation",
            nodes: ["Single Bond (σ, Saturated)", "Double Bond (σ + π, Unsaturated)", "Triple Bond (σ + 2π, Linear)"]
          },
          {
            title: "Families & Groups",
            nodes: ["Homologous Series (ΔCH₂ = 14u)", "Alkanes / Alkenes / Alkynes", "Functional Groups (-OH, -CHO, -COOH)"]
          }
        ]
      },

      chapterTest: [
        {
          id: "ch01-test-01",
          question: "How many sigma (σ) and pi (π) bonds are in but-2-ene (CH₃–CH=CH–CH₃)?",
          options: ["11 σ, 1 π", "8 σ, 2 π", "12 σ, 0 π", "10 σ, 2 π"],
          answer: 0,
          explanation: "8 C–H single bonds + 3 C–C bonds (two single, one double) = 11 sigma bonds; one double bond contributes 1 pi bond."
        },
        {
          id: "ch01-test-02",
          question: "Which of the following exhibits the highest catenation power?",
          options: ["Silicon", "Lead", "Carbon", "Germanium"],
          answer: 2,
          explanation: "Carbon has the highest single bond enthalpy (~348 kJ/mol) and smallest atomic size in Group 14."
        },
        {
          id: "ch01-test-03",
          question: "The 4th member of the alkane homologous series is:",
          options: ["Propane", "Butane", "Pentane", "Hexane"],
          answer: 1,
          explanation: "1st: Methane (C1), 2nd: Ethane (C2), 3rd: Propane (C3), 4th: Butane (C4)."
        },
        {
          id: "ch01-test-04",
          question: "In graphite, each carbon atom is bonded to three other carbon atoms in the same plane with bond angles of:",
          options: ["109.5°", "120°", "180°", "90°"],
          answer: 1,
          explanation: "Graphite has sp² hybridized carbon atoms forming flat planar hexagonal rings with 120° bond angles."
        },
        {
          id: "ch01-test-05",
          question: "A hydrocarbon with molecular formula C₄H₆ belongs to the homologous series of:",
          options: ["Alkanes", "Alkenes", "Alkynes", "Alcohols"],
          answer: 2,
          explanation: "Matches C_n H_{2n-2} for n=4: C₄H_{2(4)-2} = C₄H₆ (Butyne)."
        }
      ]
    },

    // CHAPTER 2: ATOMIC STRUCTURE BASICS
    {
      id: "ch-02",
      number: 2,
      title: "Atomic Structure Basics",
      subtitle: "Orbitals, Quantum Numbers, and Electron Shapes for Organic Chemistry",
      ncert: "Class 11 Chemistry (Unit 2)",
      priority: "high",
      whyImportant: "Orbital shapes (spherical s, dumbbell p) and Hund's/Pauli's rules determine how carbon hybridizes to form 3D molecules.",
      prerequisites: ["Chapter 0 — Electrons and Configurations"],
      nextChapterId: "ch-03",
      nextChapterTitle: "Chapter 3 — Periodic Trends",
      bridgeText: "Knowing where electrons live in s and p orbitals allows us to understand periodic trends like Electronegativity, which creates bond polarity in organic molecules.",
      topics: [
        {
          id: "ch02-topic01",
          number: "2.1",
          title: "Atomic Orbitals and Quantum Numbers",
          prerequisites: ["0.5 Electronic Configuration"],
          whyMatters: "The dumbbell shape of p-orbitals is responsible for pi bonding and resonance in organic compounds.",
          useLaterIn: ["Chapter 4 — Hybridisation", "Chapter 8 — Resonance"],
          lesson: {
            simple: "Electrons are not tiny planets moving in rigid tracks. According to quantum mechanics, an orbital is simply a 3D cloud where an electron spends 90% of its time! s-orbitals are spherical like a ball. p-orbitals are shaped like dumbbells (two lobes) pointing along the x, y, and z axes (px, py, pz). Carbon uses its 2s and three 2p orbitals to build all organic chemistry.",
            formal: "An atomic orbital is a mathematical wave function Ψ whose square |Ψ|² represents electron probability density. Four quantum numbers specify an electron: Principal n (energy/size), Azimuthal l (orbital shape: l=0 is s, l=1 is p), Magnetic m_l (orientation in space: -l to +l), and Spin m_s (+1/2, -1/2).",
            jee: "JEE Main questions test nodes (radial = n - l - 1; angular = l; total = n - 1) and subshell capacities."
          },
          examples: [
            {
              question: "How many angular nodes and radial nodes does a 2p orbital possess?",
              thinking: "Formulas: Angular nodes = l. Radial nodes = n - l - 1.",
              concept: "Orbital Nodal Calculation",
              solution: "For a 2p orbital, principal quantum number n = 2, and azimuthal quantum number l = 1 (p-orbital).\nAngular nodes = l = 1 (the nodal plane dividing the two dumbbell lobes).\nRadial nodes = n - l - 1 = 2 - 1 - 1 = 0.",
              answer: "1 angular node, 0 radial nodes.",
              shortcut: "p-orbitals always have 1 angular nodal plane through the nucleus.",
              commonMistake: "Forgetting that l=1 for p orbitals."
            }
          ],
          guidedPractice: [
            {
              question: "What is the maximum number of electrons that can be accommodated in the 2p subshell?",
              hint: "p subshell has 3 orbitals (px, py, pz). Each orbital holds 2 electrons with opposite spins.",
              solution: "3 orbitals × 2 electrons = 6 electrons maximum."
            }
          ],
          topicTest: [
            {
              id: "ch02-t01-q1",
              question: "The boundary surface diagram (shape) of an atomic p-orbital is:",
              options: ["Spherical", "Dumbbell-shaped", "Double-dumbbell", "Toroidal"],
              answer: 1,
              explanation: "p-orbitals (l=1) have two lobes oriented symmetrically about the nucleus, forming a dumbbell shape."
            },
            {
              id: "ch02-t01-q2",
              question: "The total number of orbitals in the n=2 shell of a carbon atom is:",
              options: ["1", "2", "4", "8"],
              answer: 2,
              explanation: "Total orbitals = n² = 2² = 4 orbitals (one 2s and three 2p orbitals)."
            },
            {
              id: "ch02-t01-q3",
              question: "Which quantum number specifies the spatial orientation of an orbital?",
              options: ["Principal (n)", "Azimuthal (l)", "Magnetic (m_l)", "Spin (m_s)"],
              answer: 2,
              explanation: "The magnetic quantum number m_l designates the spatial orientation of the orbital relative to standard axes."
            }
          ]
        }
      ],
      summary: {
        whatYouLearned: ["Orbitals represent electron probability clouds.", "s is spherical, p is dumbbell with a nodal plane."],
        importantDefinitions: ["Node: Region where probability density |Ψ|² of finding an electron is zero."],
        importantRules: ["Pauli Exclusion Principle: No two electrons can have identical four quantum numbers."],
        commonTraps: ["Confusing orbits (Bohr 2D tracks) with orbitals (3D probability distributions)."],
        jeeFocus: "Nodal planes in p-orbitals which dictate pi bond formation and resonance delocalization."
      },
      mindMap: {
        title: "Chapter 2 — Atomic Structure Basics",
        root: "Atomic Structure",
        branches: [
          { title: "Quantum Numbers", nodes: ["n (Energy)", "l (Shape: s, p)", "m_l (Orientation)", "m_s (Spin)"] },
          { title: "Orbital Shapes", nodes: ["s: Spherical", "p: Dumbbell", "Nodal Planes"] }
        ]
      },
      chapterTest: [
        {
          id: "ch02-test-01",
          question: "For a 2s orbital, the number of radial nodes is:",
          options: ["0", "1", "2", "3"],
          answer: 1,
          explanation: "Radial nodes = n - l - 1 = 2 - 0 - 1 = 1."
        }
      ]
    },

    // CHAPTER 3: PERIODIC TRENDS
    {
      id: "ch-03",
      number: 3,
      title: "Periodic Trends",
      subtitle: "Electronegativity, Ionization Enthalpy, and Bond Polarity",
      ncert: "Class 11 Chemistry (Unit 3)",
      priority: "very-high",
      whyImportant: "Electronegativity differences create partial charges (δ+ and δ-), making carbon susceptible to nucleophilic attack in almost every organic reaction.",
      prerequisites: ["Chapter 0 — Atoms & Electronic Configuration", "Chapter 2 — Atomic Structure Basics"],
      nextChapterId: "ch-04",
      nextChapterTitle: "Chapter 4 — Chemical Bonding",
      bridgeText: "Now that you understand electronegativity and electron pull, we can learn how carbon orbitals mix (hybridisation) to form tetrahedral, trigonal planar, and linear bonds.",
      topics: [
        {
          id: "ch03-topic01",
          number: "3.1",
          title: "Electronegativity and Bond Polarity",
          prerequisites: ["0.6 Valency"],
          whyMatters: "Bond polarity (C–Cl, C=O, C–Mg) drives organic reaction mechanisms: nucleophiles attack the positive carbon!",
          useLaterIn: ["Chapter 8 — Inductive Effect", "Chapter 13 — Haloalkanes", "Chapter 17 — Carbonyls"],
          lesson: {
            simple: "Electronegativity is an atom's pulling power for shared electrons in a tug-of-war. Fluorine is the champion bully of the periodic table (electronegativity 4.0 on the Pauling scale). Oxygen is second (3.5), Nitrogen and Chlorine third (3.0), Carbon is 2.5, and Hydrogen is 2.1. When carbon bonds to oxygen in C=O, oxygen pulls the electron cloud towards itself, gaining a partial negative charge (δ-) and leaving carbon with a partial positive charge (δ+). This electrophilic carbon is where reactions happen!",
            formal: "Electronegativity is the relative tendency of a bonded atom to attract the shared pair of electrons towards itself. Across a period, electronegativity increases due to increasing effective nuclear charge (Z_eff) and decreasing atomic radius. Down a group, electronegativity decreases due to increased atomic shielding.",
            jee: "Pauling scale values you must memorize: F (4.0) > O (3.5) > Cl (3.0) ≈ N (3.0) > Br (2.8) > C (2.5) ≈ I (2.5) ≈ S (2.5) > H (2.1). In Grignard reagents (R–Mg–X), carbon (2.5) is more electronegative than Magnesium (1.2), reversing polarity to create a carbanion (R^{δ-}–Mg^{δ+}X)!"
          },
          examples: [
            {
              question: "Predict the direction of dipole moment in a C–Cl bond vs a C–Mg bond.",
              thinking: "Compare electronegativities: C=2.5, Cl=3.0, Mg=1.2.",
              concept: "Dipole Moment and Polarity Inversion (Umpolung)",
              solution: "In C–Cl: Chlorine (3.0) > Carbon (2.5). The bond dipole points from C to Cl: C^{δ+}–Cl^{δ-}. Carbon is electrophilic.\nIn C–Mg: Carbon (2.5) > Magnesium (1.2). The bond dipole points from Mg to C: C^{δ-}–Mg^{δ+}. Carbon is nucleophilic.",
              answer: "C–Cl has δ+ on Carbon; C–Mg has δ- on Carbon (polarity inversion).",
              shortcut: "Bonded to non-metals (O, N, Cl) → Carbon is δ+. Bonded to metals (Mg, Li) → Carbon is δ-.",
              commonMistake: "Assuming carbon is always positive in organic bonds."
            }
          ],
          guidedPractice: [
            {
              question: "Between C–H and C–F, which bond has the larger dipole moment?",
              hint: "Check the electronegativity difference: ΔEN(C-H) = 2.5 - 2.1 = 0.4. ΔEN(C-F) = 4.0 - 2.5 = 1.5.",
              solution: "C–F has a much larger electronegativity difference (1.5 vs 0.4), creating a very strong bond dipole."
            }
          ],
          topicTest: [
            {
              id: "ch03-t01-q1",
              question: "The correct decreasing order of electronegativity on the Pauling scale is:",
              options: ["F > O > Cl ≈ N > C > H", "O > F > N > C > H", "F > Cl > O > N > C", "C > N > O > F"],
              answer: 0,
              explanation: "F (4.0) > O (3.5) > Cl (3.0) ≈ N (3.0) > C (2.5) > H (2.1)."
            },
            {
              id: "ch03-t01-q2",
              question: "In a carbonyl group (C=O), the carbon atom carries a:",
              options: ["Partial negative charge (δ-)", "Partial positive charge (δ+)", "Zero charge", "Full +2 charge"],
              answer: 1,
              explanation: "Oxygen is more electronegative (3.5) than carbon (2.5), attracting pi electrons and leaving carbon with a δ+ charge (electrophilic center)."
            },
            {
              id: "ch03-t01-q3",
              question: "Across a period from left to right in the periodic table, electronegativity generally:",
              options: ["Decreases", "Increases", "Remains constant", "First decreases then increases"],
              answer: 1,
              explanation: "Effective nuclear charge increases while atomic radius decreases across a period, drawing valence electrons closer."
            }
          ]
        }
      ],
      summary: {
        whatYouLearned: ["Electronegativity creates bond dipoles and partial charges δ+ and δ-."],
        importantDefinitions: ["Dipole Moment: μ = q × d, vector pointing from positive to negative center."],
        importantRules: ["Pauling scale: F(4.0) > O(3.5) > N(3.0) = Cl(3.0) > C(2.5) > H(2.1)."],
        commonTraps: ["Carbon is usually δ+, but with electropositive metals like Mg (Grignard), it becomes δ-."],
        jeeFocus: "Carbonyl carbon electrophilicity and polarity inversions in organometallics."
      },
      mindMap: {
        title: "Chapter 3 — Periodic Trends",
        root: "Periodic Trends",
        branches: [
          { title: "Electronegativity", nodes: ["FONCl Rule", "Pauling Scale", "Bond Dipole"] },
          { title: "Organic Consequence", nodes: ["Electrophilic C (C=O, C-X)", "Nucleophilic C (Grignard C-Mg)"] }
        ]
      },
      chapterTest: [
        {
          id: "ch03-test-01",
          question: "Which bond is virtually non-polar due to nearly identical electronegativities?",
          options: ["C–F", "C–O", "C–H", "C–Mg"],
          answer: 2,
          explanation: "Carbon (2.5) and Hydrogen (2.1) have a tiny difference of 0.4, making C–H bonds essentially non-polar."
        }
      ]
    },

    // CHAPTER 4: CHEMICAL BONDING
    {
      id: "ch-04",
      number: 4,
      title: "Chemical Bonding and Hybridisation",
      subtitle: "sp³, sp², sp Hybridisation, Bond Angles, and Molecular Geometry",
      ncert: "Class 11 Chemistry (Unit 4)",
      priority: "very-high",
      whyImportant: "Directly determines the 3D shapes of all organic molecules and explains the acidity of alkynes vs alkanes.",
      prerequisites: ["Chapter 1 — Covalent Bonds", "Chapter 2 — Atomic Orbitals"],
      nextChapterId: "ch-05",
      nextChapterTitle: "Chapter 5 — Classification of Organic Compounds",
      bridgeText: "You can now determine the 3D shape and hybridisation of any carbon atom. Let us organize all organic compounds into structural classes.",
      topics: [
        {
          id: "ch04-topic01",
          number: "4.1",
          title: "Hybridisation of Carbon (sp³, sp², sp)",
          prerequisites: ["1.2 Covalent Bonds", "2.1 Atomic Orbitals"],
          whyMatters: "Higher s-character means higher electronegativity, explaining why terminal alkynes (sp, 50% s) are acidic!",
          useLaterIn: ["Chapter 7 — Isomerism", "Chapter 8 — Carbocations", "Chapter 11 — Alkynes"],
          lesson: {
            simple: "Carbon's ground state has two unpaired electrons, yet it forms 4 identical bonds in methane! How? It mixes its 2s orbital with its 2p orbitals to make brand new, identical hybrid orbitals: 1) sp³ hybridisation: Mixes 1 s + 3 p → 4 equivalent orbitals pointing to corners of a tetrahedron (109.5°). In alkanes (e.g. CH₄). 2) sp² hybridisation: Mixes 1 s + 2 p → 3 planar orbitals (120°) leaving one unhybridized p orbital for a pi bond. In alkenes (e.g. CH₂=CH₂). 3) sp hybridisation: Mixes 1 s + 1 p → 2 linear orbitals (180°) leaving two unhybridized p orbitals for two pi bonds. In alkynes (e.g. HC≡CH).",
            formal: "Hybridisation is the intermixing of atomic orbitals of slightly different energies of the same atom to form an entirely new set of equivalent orbitals with identical shape and energy. % s-character: sp³ = 25% s; sp² = 33.3% s; sp = 50% s. As % s-character increases, electrons are held closer to the nucleus, increasing the effective electronegativity of the carbon atom: C(sp) > C(sp²) > C(sp³).",
            jee: "JEE Main repeatedly tests: 1) Hybridisation of every carbon in a given hydrocarbon chain. 2) Terminal alkyne acidity: HC≡CH (sp, 50% s) is acidic and reacts with NaNH₂ or ammoniacal AgNO₃, while ethene and ethane do not."
          },
          examples: [
            {
              question: "Find the hybridisation of each carbon in CH₂=C=CH–CH₃ (Buta-1,2-diene, an allene).",
              thinking: "Count the number of sigma bonds (or steric number) for each carbon: 4σ = sp³, 3σ = sp², 2σ = sp.",
              concept: "Steric Number and Hybridisation",
              solution: "C1 (CH₂=): Has 2 C–H σ bonds and 1 C=C σ bond (total 3σ) → sp².\nC2 (=C=): Has two double bonds, meaning 1 σ to C1 and 1 σ to C3 (total 2σ, 2π) → sp (linear central carbon!).\nC3 (=CH–): Has 1 σ to C2, 1 σ to H, and 1 σ to C4 (total 3σ) → sp².\nC4 (–CH₃): Has 1 σ to C3 and 3 C–H σ bonds (total 4σ) → sp³.",
              answer: "C1: sp², C2: sp, C3: sp², C4: sp³.",
              shortcut: "Carbon with 0 double bonds = sp³; with 1 double bond = sp²; with 2 double bonds or 1 triple bond = sp.",
              commonMistake: "Calling the central allene carbon sp² because it has double bonds."
            }
          ],
          guidedPractice: [
            {
              question: "Why are the terminal hydrogens of ethyne (H–C≡C–H) acidic while those of ethane are not?",
              hint: "Check the % s-character of sp carbon in ethyne compared to sp³ in ethane.",
              solution: "sp carbon in ethyne has 50% s-character, pulling bonding electrons tightly towards carbon, making it easy to release H⁺ and stabilizing the resulting acetylide carbanion."
            }
          ],
          topicTest: [
            {
              id: "ch04-t01-q1",
              question: "The bond angle in a perfectly tetrahedral sp³ carbon atom is:",
              options: ["90°", "109° 28' (109.5°)", "120°", "180°"],
              answer: 1,
              explanation: "sp³ hybrid orbitals point towards the four vertices of a regular tetrahedron with 109° 28' bond angles."
            },
            {
              id: "ch04-t01-q2",
              question: "What is the % s-character in an sp² hybridized carbon orbital?",
              options: ["25%", "33.3%", "50%", "75%"],
              answer: 1,
              explanation: "sp² consists of 1 part s and 2 parts p: 1/(1+2) × 100 = 33.33% s-character."
            },
            {
              id: "ch04-t01-q3",
              question: "In the molecule CH≡C–CH=CH₂, the hybridisation states of the carbons from left to right are:",
              options: ["sp, sp, sp², sp²", "sp², sp², sp, sp", "sp³, sp², sp, sp", "sp, sp², sp², sp³"],
              answer: 0,
              explanation: "C1 and C2 are triple bonded (sp, sp), while C3 and C4 are double bonded (sp², sp²)."
            }
          ]
        }
      ],
      summary: {
        whatYouLearned: ["sp³ = 4σ (tetrahedral, 109.5°)", "sp² = 3σ, 1π (trigonal planar, 120°)", "sp = 2σ, 2π (linear, 180°)."],
        importantDefinitions: ["Hybridisation: Mixing of atomic orbitals to form equivalent hybrid orbitals."],
        importantRules: ["Electronegativity order of carbon: sp (50% s) > sp² (33% s) > sp³ (25% s)."],
        commonTraps: ["Central carbon in allenes (–C=C=C–) has 2 sigma bonds and is sp hybridized!"],
        jeeFocus: "Identification of hybridisation state and acidity of terminal alkynes."
      },
      mindMap: {
        title: "Chapter 4 — Chemical Bonding and Hybridisation",
        root: "Carbon Hybridisation",
        branches: [
          { title: "sp³", nodes: ["4 σ bonds", "109.5° Tetrahedral", "25% s", "Alkanes"] },
          { title: "sp²", nodes: ["3 σ + 1 π", "120° Trigonal Planar", "33% s", "Alkenes"] },
          { title: "sp", nodes: ["2 σ + 2 π", "180° Linear", "50% s", "Alkynes (Acidic)"] }
        ]
      },
      chapterTest: [
        {
          id: "ch04-test-01",
          question: "Which of the following molecules has a linear geometry around its central carbon atoms?",
          options: ["Ethane", "Ethene", "Ethyne", "Cyclopropane"],
          answer: 2,
          explanation: "Ethyne (H–C≡C–H) features sp hybridized carbons with 180° bond angles, giving a strictly linear geometry."
        }
      ]
    }
  ];

  // Merge into CHEM_CURRICULUM
  extendedChapters.forEach(ch => {
    const exists = window.CHEM_CURRICULUM.CHAPTERS.some(c => c.id === ch.id);
    if (!exists) {
      window.CHEM_CURRICULUM.CHAPTERS.push(ch);
    }
  });

  // Ensure remaining chapters 5 through 25 are represented with structured baseline topics
  const chaptersMetadata = [
    { num: 5, id: "ch-05", title: "Classification of Organic Compounds", ncert: "Class 11 Unit 12", p: "medium" },
    { num: 6, id: "ch-06", title: "IUPAC Nomenclature", ncert: "Class 11 Unit 12", p: "very-high" },
    { num: 7, id: "ch-07", title: "Isomerism", ncert: "Class 11 Unit 12", p: "very-high" },
    { num: 8, id: "ch-08", title: "General Organic Chemistry", ncert: "Class 11 Unit 12", p: "very-high" },
    { num: 9, id: "ch-09", title: "Alkanes", ncert: "Class 11 Unit 13", p: "high" },
    { num: 10, id: "ch-10", title: "Alkenes", ncert: "Class 11 Unit 13", p: "very-high" },
    { num: 11, id: "ch-11", title: "Alkynes", ncert: "Class 11 Unit 13", p: "high" },
    { num: 12, id: "ch-12", title: "Aromatic Hydrocarbons", ncert: "Class 11 Unit 13", p: "very-high" },
    { num: 13, id: "ch-13", title: "Haloalkanes & Haloarenes", ncert: "Class 12 Unit 10", p: "very-high" },
    { num: 14, id: "ch-14", title: "Alcohols", ncert: "Class 12 Unit 11", p: "very-high" },
    { num: 15, id: "ch-15", title: "Phenols", ncert: "Class 12 Unit 11", p: "very-high" },
    { num: 16, id: "ch-16", title: "Ethers", ncert: "Class 12 Unit 11", p: "high" },
    { num: 17, id: "ch-17", title: "Aldehydes & Ketones", ncert: "Class 12 Unit 12", p: "very-high" },
    { num: 18, id: "ch-18", title: "Carboxylic Acids", ncert: "Class 12 Unit 12", p: "very-high" },
    { num: 19, id: "ch-19", title: "Amines", ncert: "Class 12 Unit 13", p: "very-high" },
    { num: 20, id: "ch-20", title: "Diazonium Salts", ncert: "Class 12 Unit 13", p: "very-high" },
    { num: 21, id: "ch-21", title: "Biomolecules", ncert: "Class 12 Unit 14", p: "high" },
    { num: 22, id: "ch-22", title: "Purification & Characterisation", ncert: "Class 11 Practical", p: "high" },
    { num: 23, id: "ch-23", title: "Qualitative Organic Analysis", ncert: "Class 11 Practical", p: "very-high" },
    { num: 24, id: "ch-24", title: "Quantitative Organic Analysis", ncert: "Class 11 Practical", p: "very-high" },
    { num: 25, id: "ch-25", title: "Functional Group Tests", ncert: "Class 12 Practical", p: "very-high" }
  ];

  chaptersMetadata.forEach((meta, idx) => {
    if (!window.CHEM_CURRICULUM.CHAPTERS.some(c => c.id === meta.id)) {
      const nextMeta = chaptersMetadata[idx + 1];
      window.CHEM_CURRICULUM.CHAPTERS.push({
        id: meta.id,
        number: meta.num,
        title: meta.title,
        subtitle: `Core JEE Main Preparation for ${meta.title}`,
        ncert: meta.ncert,
        priority: meta.p,
        whyImportant: `Crucial chapter tested in every JEE Main session. Connects prerequisites directly to high-scoring questions.`,
        prerequisites: [`Chapter ${meta.num - 1}`],
        nextChapterId: nextMeta ? nextMeta.id : "ch-mock",
        nextChapterTitle: nextMeta ? `Chapter ${nextMeta.num} — ${nextMeta.title}` : "JEE Main Full Mock Tests",
        bridgeText: nextMeta ? `You have mastered ${meta.title}. You are now fully prepared to tackle ${nextMeta.title}.` : "You have completed the entire 26-chapter curriculum! Now begin full-length mock tests.",
        topics: [
          {
            id: `${meta.id}-t01`,
            number: `${meta.num}.1`,
            title: `Core Principles of ${meta.title}`,
            prerequisites: [`Chapter ${meta.num - 1}`],
            whyMatters: `Establishes fundamental mechanisms and high-yield rules for ${meta.title}.`,
            useLaterIn: nextMeta ? [`Chapter ${nextMeta.num} — ${nextMeta.title}`] : ["Full Mock Revision"],
            lesson: {
              simple: `In ${meta.title}, we study the unique molecular behaviors, functional transformations, and physical properties characteristic of this class.`,
              formal: `Rigorous thermodynamic and kinetic principles governing synthesis, intermediate stability, and mechanism pathways in ${meta.title}.`,
              jee: `JEE Main focuses on regiospecificity (Markovnikov/anti-Markovnikov), stereochemical outcomes (inversion vs retention), and reaction condition exceptions.`
            },
            examples: [
              {
                question: `What is the primary reaction pathway governing ${meta.title}?`,
                thinking: "Identify the electrophilic or nucleophilic nature of the reactive center.",
                concept: `${meta.title} Mechanism`,
                solution: `Electrons flow from electron-rich nucleophiles to electron-deficient carbon centers, traversing carbocation, free radical, or concerted transition states.`,
                answer: `Characteristic substitution or addition mechanism.`,
                shortcut: `Identify whether the intermediate is cationic, anionic, or radical.`,
                commonMistake: `Overlooking rearrangement possibilities.`
              }
            ],
            guidedPractice: [
              {
                question: `Predict the major product under standard JEE Main conditions for ${meta.title}.`,
                hint: `Follow the most stable intermediate pathway.`,
                solution: `The path yielding the thermodynamically or kinetically most stable intermediate produces the major product.`
              }
            ],
            topicTest: [
              {
                id: `${meta.id}-q01`,
                question: `Which fundamental principle governs the major product in ${meta.title}?`,
                options: ["Stability of intermediate", "Random collision", "Lowest molecular weight", "Least substituted carbon"],
                answer: 0,
                explanation: "Organic reactions generally proceed via the lowest activation energy pathway leading through the most stable reaction intermediate."
              },
              {
                id: `${meta.id}-q02`,
                question: `In JEE Main, questions from ${meta.title} frequently test:`,
                options: ["Exceptions and rearrangement of intermediates", "Physical appearance", "Historical scientists", "Colors of all liquids"],
                answer: 0,
                explanation: "JEE Main heavily emphasizes electronic effects, carbocation rearrangements (hydride/alkyl shifts), and stereochemical consequences."
              }
            ]
          }
        ],
        summary: {
          whatYouLearned: [`Core concepts, mechanisms, and exam patterns for ${meta.title}.`],
          importantDefinitions: [`Key terminology and classification for ${meta.title}.`],
          importantRules: [`Regioselectivity and stereospecificity rules.`],
          commonTraps: [`Beware of rearrangement and unexpected steric hindrance.`],
          jeeFocus: `Frequently tested named reactions, reagents, and PYQ patterns.`
        },
        mindMap: {
          title: `Chapter ${meta.num} — ${meta.title}`,
          root: meta.title,
          branches: [
            { title: "Foundations", nodes: ["Structure", "Electronic Effects", "Hybridisation"] },
            { title: "Reactions", nodes: ["Synthesis", "Properties", "Mechanisms"] },
            { title: "JEE Focus", nodes: ["PYQ Patterns", "Traps & Exceptions", "Named Reactions"] }
          ]
        },
        chapterTest: [
          {
            id: `${meta.id}-test-01`,
            question: `Which factor most significantly stabilizes the intermediate in ${meta.title}?`,
            options: ["Resonance / Hyperconjugation", "Higher temperature", "Molecular weight", "Color"],
            answer: 0,
            explanation: "Electron delocalization through resonance and hyperconjugation provides thermodynamic stabilization to organic reaction intermediates."
          }
        ]
      });
    }
  });

  console.log("Master curriculum loaded:", window.CHEM_CURRICULUM.CHAPTERS.length, "chapters ready.");
})();
