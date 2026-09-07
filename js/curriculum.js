/**
 * JEE MAIN ORGANIC CHEMISTRY - MASTER CURRICULUM DATA (CHAPTERS 0 TO 25)
 * Strict sequential dependency chain, 3-layer explanations, worked examples,
 * guided practice, topic tests, chapter tests, mind maps, and chapter bridges.
 */

window.CHEM_CURRICULUM = (function() {

  const CHAPTERS = [
    // CHAPTER 0: CHEMISTRY FOUNDATION
    {
      id: "ch-00",
      number: 0,
      title: "Chemistry Foundation",
      subtitle: "Bridge Course for Absolute Beginners (From Class 9/10 to Organic Chemistry)",
      ncert: "Class 9 & 10 Science (Foundational)",
      priority: "very-high",
      whyImportant: "You cannot understand covalent bonds without understanding electrons; you cannot understand reaction mechanisms without understanding ions and valency. This chapter builds the bedrock from zero.",
      prerequisites: ["None — Pure beginner entry point"],
      nextChapterId: "ch-01",
      nextChapterTitle: "Chapter 1 — Carbon and Its Compounds",
      bridgeText: "You now understand what an atom is, how electrons populate shells, how valency works, and why atoms bond. Now you are fully ready to understand why Carbon is the most versatile element in the universe.",
      topics: [
        {
          id: "ch00-topic01",
          number: "0.1",
          title: "What Is Matter?",
          prerequisites: ["None"],
          whyMatters: "Everything in chemistry begins with understanding how pure substances and mixtures differ, and why elements combine to form compounds.",
          useLaterIn: ["Chapter 1 — Carbon", "Chapter 22 — Purification"],
          lesson: {
            simple: "Look around you: your desk, water in your bottle, air you breathe, and your own body are all made of matter. Matter is simply anything that has mass and takes up space. If you break matter down to its absolute simplest pure building blocks that cannot be broken down further by chemical means, you get Elements (like pure Carbon or Oxygen). When two or more elements combine in fixed mathematical ratios, you get Compounds (like water H₂O or carbon dioxide CO₂).",
            formal: "Matter is anything that possesses rest mass and volume. Pure substances consist of Elements (single type of atom) and Compounds (two or more elements chemically bonded in fixed stoichiometric proportions by mass, obeying the Law of Definite Proportions). Mixtures contain two or more pure substances combined physically without chemical bonding, retaining their individual properties.",
            jee: "JEE Main tests your ability to distinguish homogeneous mixtures (solutions, alloys) from compounds, and tests separation techniques (fractional distillation, chromatography) in Practical Organic Chemistry based on physical property differences."
          },
          examples: [
            {
              question: "Classify the following as Element, Compound, or Mixture: (a) Diamond, (b) Ethanol (C₂H₅OH), (c) Air, (d) Table salt dissolved in water.",
              thinking: "Ask yourself: Is it a single atomic element, a fixed chemical formula, or physical mixing of different substances?",
              concept: "Classification of Matter",
              solution: "(a) Diamond is pure elemental carbon bonded in a tetrahedral lattice → Element.\n(b) Ethanol is composed of C, H, and O in a fixed 2:6:1 stoichiometric ratio → Compound.\n(c) Air is a blend of N₂, O₂, Ar, CO₂ without fixed bonding → Mixture (homogeneous).\n(d) Salt water contains NaCl and H₂O with variable concentration → Mixture.",
              answer: "Diamond: Element; Ethanol: Compound; Air: Mixture; Salt water: Mixture.",
              shortcut: "If it has a single chemical symbol or formula (like C or C₂H₅OH), it is an element or compound. If its proportions can vary, it is a mixture.",
              commonMistake: "Thinking air is a compound because it is invisible and everywhere."
            },
            {
              question: "Can components of a compound be separated by simple physical filtration?",
              thinking: "Recall how compounds are held together compared to mixtures.",
              concept: "Chemical vs Physical Separation",
              solution: "No. Elements in a compound are locked by strong chemical bonds (covalent or ionic). They can only be broken apart through chemical reactions requiring significant energy, never by physical filtration or physical boiling.",
              answer: "No, chemical methods are required.",
              shortcut: "Mixtures separate physically; compounds separate chemically.",
              commonMistake: "Confusing chemical separation with physical filtration."
            }
          ],
          guidedPractice: [
            {
              question: "Is pure glucose (C₆H₁₂O₆) an element, compound, or mixture?",
              hint: "Check whether carbon, hydrogen, and oxygen atoms are combined in a strict fixed ratio.",
              solution: "It is a compound because the atoms are chemically bonded in a strict 1:2:1 empirical ratio."
            }
          ],
          topicTest: [
            {
              id: "t01-q1",
              question: "Which of the following is an example of a pure compound?",
              options: ["Brass", "Pure distilled water (H₂O)", "Air", "Petroleum"],
              answer: 1,
              explanation: "Distilled water has a fixed chemical composition (2 atoms of H to 1 atom of O) bonded covalently. Brass and petroleum are mixtures."
            },
            {
              id: "t01-q2",
              question: "A substance that cannot be broken down into simpler substances by ordinary chemical reactions is called an:",
              options: ["Element", "Compound", "Homogeneous mixture", "Emulsion"],
              answer: 0,
              explanation: "Elements (such as carbon, oxygen, nitrogen) are the fundamental chemical units composed of identical atoms."
            },
            {
              id: "t01-q3",
              question: "Which of the following represents a chemical compound rather than a mixture?",
              options: ["Methane (CH₄)", "Gasoline", "Sea water", "Milk"],
              answer: 0,
              explanation: "Methane is a pure chemical compound with a fixed covalent structure. Gasoline, sea water, and milk are mixtures."
            },
            {
              id: "t01-q4",
              question: "The constituents of a mixture can be separated by:",
              options: ["Nuclear fusion", "Physical methods such as distillation or filtration", "Only electrolysis", "Burning"],
              answer: 1,
              explanation: "Because mixtures lack chemical bonds between constituent components, physical methods (distillation, extraction) separate them."
            },
            {
              id: "t01-q5",
              question: "Which of the following describes the Law of Definite Proportions?",
              options: [
                "Compounds contain elements in variable ratios depending on preparation",
                "A chemical compound always contains exactly the same proportion of elements by mass",
                "Mixtures always have a fixed boiling point",
                "Elements can never form bonds with each other"
              ],
              answer: 1,
              explanation: "Discovered by Proust, a given chemical compound always contains its component elements in fixed ratio by mass."
            }
          ]
        },

        {
          id: "ch00-topic02",
          number: "0.2",
          title: "What Is an Atom?",
          prerequisites: ["0.1 What Is Matter?"],
          whyMatters: "Organic chemistry is the story of how atoms share electrons. To understand sharing, you must know what sits inside an atom.",
          useLaterIn: ["Chapter 0.3 Atomic Number", "Chapter 1 — Carbon", "Chapter 4 — Bonding"],
          lesson: {
            simple: "Imagine zooming into a carbon pencil lead a billion times. You would see billions of tiny solar systems called Atoms. At the center is a tiny, super-dense ball called the Nucleus, containing positively charged Protons (+) and neutral Neutrons (0). Buzzing around this nucleus in vast empty space are negatively charged Electrons (-). The number of protons determines who the atom is!",
            formal: "An atom is the smallest constituent unit of ordinary matter that retains the chemical identity of an element. It consists of a dense central nucleus (radius ~10⁻¹⁵ m) containing nucleons (protons and neutrons) surrounded by an electron cloud (radius ~10⁻¹⁰ m). In a neutral atom, the number of protons equals the number of electrons.",
            jee: "JEE Main expects you to immediately know that protons define atomic number (Z), neutrons determine isotopes, and only the outermost electrons participate in chemical reactions."
          },
          examples: [
            {
              question: "If an atom has 6 protons and 6 electrons, is it electrically charged? What element is it?",
              thinking: "Compare the total positive charge of protons with negative charge of electrons.",
              concept: "Electrical Neutrality of Atoms",
              solution: "Each proton carries +1 charge (+6 total). Each electron carries -1 charge (-6 total). Net charge = +6 + (-6) = 0. It is electrically neutral. An atom with 6 protons is Carbon (atomic number Z = 6).",
              answer: "Neutral; Carbon.",
              shortcut: "Protons = Electrons → Neutral atom. Protons = 6 is ALWAYS Carbon.",
              commonMistake: "Thinking neutrons affect the electrical charge."
            },
            {
              question: "Which subatomic particle is directly involved in forming covalent bonds in organic molecules?",
              thinking: "Where are protons, neutrons, and electrons located?",
              concept: "Subatomic Roles",
              solution: "Protons and neutrons are locked tightly in the nucleus by strong nuclear forces. Only electrons in the outer perimeter can be shared, lost, or gained in chemical reactions.",
              answer: "Electrons (specifically valence electrons).",
              shortcut: "Chemistry is entirely the physics of valence electrons.",
              commonMistake: "Thinking the nucleus splits during organic reactions."
            }
          ],
          guidedPractice: [
            {
              question: "What holds the negatively charged electrons around the positively charged nucleus?",
              hint: "Think about electrostatic attraction between opposite charges (Coulomb's Law).",
              solution: "The electrostatic force of attraction between the positive nucleus and negative electrons."
            }
          ],
          topicTest: [
            {
              id: "t02-q1",
              question: "The nucleus of an atom consists of:",
              options: ["Protons and electrons", "Neutrons and electrons", "Protons and neutrons", "Electrons only"],
              answer: 2,
              explanation: "Protons and neutrons reside in the nucleus, while electrons orbit outside in the electron cloud."
            },
            {
              id: "t02-q2",
              question: "In an electrically neutral atom, the number of protons must equal the number of:",
              options: ["Neutrons", "Electrons", "Positrons", "Quarks"],
              answer: 1,
              explanation: "To cancel the +1 charge of each proton, an equal number of -1 electrons is required for neutrality."
            },
            {
              id: "t02-q3",
              question: "Which subatomic particle has negligible mass (~1/1836 of a proton) and a negative charge?",
              options: ["Proton", "Neutron", "Alpha particle", "Electron"],
              answer: 3,
              explanation: "Electrons have a mass of approximately 9.1 × 10⁻³¹ kg, roughly 1/1836 that of a proton or neutron."
            },
            {
              id: "t02-q4",
              question: "Most of the physical volume of an atom is composed of:",
              options: ["The dense nucleus", "Solid protons", "Largely empty space occupied by the electron cloud", "Neutrons"],
              answer: 2,
              explanation: "Rutherford's gold foil experiment proved the nucleus occupies ~10⁻¹⁵ of the atomic volume, leaving the rest as empty space where electrons move."
            },
            {
              id: "t02-q5",
              question: "The identity of a chemical element is uniquely determined by its count of:",
              options: ["Neutrons", "Protons", "Electrons in excited state", "Mass number"],
              answer: 1,
              explanation: "The atomic number Z (number of protons) uniquely identifies every element in the periodic table."
            }
          ]
        },

        {
          id: "ch00-topic03",
          number: "0.3",
          title: "Atomic Number",
          prerequisites: ["0.2 What Is an Atom?"],
          whyMatters: "Atomic number tells you how many protons and electrons an element has, which is the starting point for carbon chemistry.",
          useLaterIn: ["0.4 Mass Number", "0.5 Electrons", "Chapter 1 — Carbon"],
          lesson: {
            simple: "Think of the Atomic Number (symbol Z) as an element's official Aadhaar card or Social Security Number. No two elements have the same atomic number! Hydrogen is 1 (1 proton), Helium is 2, and Carbon is 6 (6 protons). If an atom has 6 protons, it is Carbon forever, no matter what it bonds with.",
            formal: "The Atomic Number (Z) is defined as the total number of protons present in the nucleus of an atom of a given element: Z = p⁺. In an uncharged neutral atom, Z also equals the total number of orbital electrons: Z = p⁺ = e⁻.",
            jee: "In JEE Main organic chemistry, you must have the atomic numbers of the key organic elements memorized instantly: H = 1, C = 6, N = 7, O = 8, F = 9, P = 15, S = 16, Cl = 17, Br = 35, I = 53."
          },
          examples: [
            {
              question: "An element has an atomic number of 8. How many protons and electrons does it have when neutral? Name the element.",
              thinking: "Z = protons = electrons in a neutral atom.",
              concept: "Atomic Number Interpretation",
              solution: "Z = 8 means the nucleus has 8 protons. Since it is neutral, it has 8 electrons. The 8th element in the periodic table is Oxygen (O).",
              answer: "8 protons, 8 electrons; Oxygen.",
              shortcut: "Z = 8 is Oxygen. Memorize C=6, N=7, O=8.",
              commonMistake: "Assuming atomic number equals atomic mass."
            },
            {
              question: "Can two different chemical elements have the same atomic number?",
              thinking: "Recall the definition of chemical elements.",
              concept: "Uniqueness of Z",
              solution: "No. The number of protons uniquely defines the element. If the atomic number changes, the elemental identity changes.",
              answer: "No, atomic number is unique to each element.",
              shortcut: "Different Z = Different element.",
              commonMistake: "Confusing atomic number with mass number (isobars can have same mass number, never same Z)."
            }
          ],
          guidedPractice: [
            {
              question: "What is the atomic number of Nitrogen, and how many electrons does a neutral nitrogen atom possess?",
              hint: "Nitrogen sits between Carbon (Z=6) and Oxygen (Z=8).",
              solution: "Atomic number Z = 7, meaning it has 7 protons and 7 electrons."
            }
          ],
          topicTest: [
            {
              id: "t03-q1",
              question: "The atomic number of carbon is:",
              options: ["4", "6", "12", "14"],
              answer: 1,
              explanation: "Carbon has 6 protons in its nucleus, so its atomic number Z = 6."
            },
            {
              id: "t03-q2",
              question: "If an uncharged atom has an atomic number of 17, how many electrons does it possess?",
              options: ["8", "17", "35", "18"],
              answer: 1,
              explanation: "In any neutral atom, number of electrons equals atomic number Z = 17 (Chlorine)."
            },
            {
              id: "t03-q3",
              question: "Which of the following elements has atomic number Z = 7?",
              options: ["Carbon", "Nitrogen", "Oxygen", "Fluorine"],
              answer: 1,
              explanation: "Nitrogen has 7 protons, hence Z = 7."
            },
            {
              id: "t03-q4",
              question: "The atomic number of an atom increases by 1 if you:",
              options: ["Add a neutron", "Add a proton", "Add an electron", "Ionize it"],
              answer: 1,
              explanation: "Atomic number is defined strictly by the count of protons. Adding 1 proton creates the next element."
            },
            {
              id: "t03-q5",
              question: "What is the atomic number of Hydrogen?",
              options: ["0", "1", "2", "1.008"],
              answer: 1,
              explanation: "Hydrogen is element 1, containing 1 proton."
            }
          ]
        },

        {
          id: "ch00-topic04",
          number: "0.4",
          title: "Mass Number and Isotopes",
          prerequisites: ["0.3 Atomic Number"],
          whyMatters: "Mass spectrometry and deuterium labelling in JEE reaction mechanisms depend directly on mass numbers and isotopes.",
          useLaterIn: ["Chapter 8 — GOC (Kinetic Isotope Effect)", "Chapter 22 — Purification"],
          lesson: {
            simple: "Electrons are so light they barely weigh anything. So practically 99.9% of an atom's weight sits in its nucleus: Protons + Neutrons. This total count is the Mass Number (symbol A). Sometimes, atoms of the SAME element have the same protons but different numbers of neutrons. These are called Isotopes! For example, normal Carbon-12 has 6 protons and 6 neutrons, while Carbon-14 has 6 protons and 8 neutrons.",
            formal: "Mass Number (A) is the integer sum of protons and neutrons in an atomic nucleus: A = Z + N. Isotopes are nuclides having the same atomic number (Z) but differing mass numbers (A) due to different neutron counts. In organic chemistry, common isotopes include ¹H (protium), ²H or D (deuterium), ¹²C, ¹³C, and ¹⁴C.",
            jee: "JEE Main frequently uses Deuterium (D) in reaction mechanism questions (e.g. testing whether C–H or C–D bond breaking is the rate-determining step, known as the Primary Kinetic Isotopic Effect)."
          },
          examples: [
            {
              question: "Calculate the number of neutrons in a Carbon-13 (¹³C) atom.",
              thinking: "Use the formula: Neutrons N = Mass Number A - Atomic Number Z.",
              concept: "Neutron Calculation",
              solution: "For Carbon, Z = 6. Given A = 13. N = A - Z = 13 - 6 = 7 neutrons.",
              answer: "7 neutrons.",
              shortcut: "Neutrons = Top number minus Bottom number (A - Z).",
              commonMistake: "Thinking ¹³C has 13 neutrons."
            },
            {
              question: "What is Deuterium (D), and how does its mass compare to ordinary hydrogen (¹H)?",
              thinking: "Look at the nucleus of both hydrogen isotopes.",
              concept: "Isotopes in Organic Chemistry",
              solution: "Ordinary hydrogen (Protium, ¹H) has 1 proton and 0 neutrons (A=1). Deuterium (²H or D) has 1 proton and 1 neutron (A=2). Deuterium has approximately twice the mass of normal hydrogen.",
              answer: "Deuterium is the hydrogen isotope with 1 neutron; mass is ~2 amu.",
              shortcut: "D = H with an extra neutron.",
              commonMistake: "Thinking Deuterium is a completely different element."
            }
          ],
          guidedPractice: [
            {
              question: "How many protons, neutrons, and electrons are in an atom of Carbon-14 (¹⁴C)?",
              hint: "Remember Carbon always has Z = 6 protons. Use N = A - Z.",
              solution: "Protons = 6, Electrons = 6, Neutrons = 14 - 6 = 8."
            }
          ],
          topicTest: [
            {
              id: "t04-q1",
              question: "The mass number (A) of an atom is defined as:",
              options: [
                "The total number of protons only",
                "The sum of protons and neutrons in the nucleus",
                "The sum of protons and electrons",
                "The atomic weight in grams"
              ],
              answer: 1,
              explanation: "Mass number A = Z (protons) + N (neutrons)."
            },
            {
              id: "t04-q2",
              question: "Isotopes of an element have:",
              options: [
                "Same atomic number but different mass numbers",
                "Same mass number but different atomic numbers",
                "Different number of protons",
                "Different chemical properties"
              ],
              answer: 0,
              explanation: "Isotopes possess identical atomic number Z (same protons, same element) but different mass numbers due to differing neutron counts."
            },
            {
              id: "t04-q3",
              question: "Deuterium (²H or D) has how many neutrons in its nucleus?",
              options: ["0", "1", "2", "3"],
              answer: 1,
              explanation: "Deuterium has mass number A = 2 and Z = 1, so neutrons = 2 - 1 = 1."
            },
            {
              id: "t04-q4",
              question: "How many neutrons are present in the nucleus of an atom of Chlorine-35 (Z = 17)?",
              options: ["17", "18", "35", "52"],
              answer: 1,
              explanation: "Neutrons = A - Z = 35 - 17 = 18."
            },
            {
              id: "t04-q5",
              question: "Why do isotopes of carbon (¹²C and ¹³C) show almost identical chemical reactions in organic chemistry?",
              options: [
                "They have identical nuclear masses",
                "They have the same number of valence electrons and electronic structure",
                "They are both radioactive",
                "They have the same number of neutrons"
              ],
              answer: 1,
              explanation: "Chemical reactivity is determined by the electronic configuration, which is identical for all isotopes of an element."
            }
          ]
        },

        {
          id: "ch00-topic05",
          number: "0.5",
          title: "Electrons and Electronic Configuration",
          prerequisites: ["0.3 Atomic Number"],
          whyMatters: "This is where organic chemistry truly begins: valence electrons determine bonding, octets, and shapes.",
          useLaterIn: ["0.6 Valency", "Chapter 1 — Carbon", "Chapter 4 — Hybridisation"],
          lesson: {
            simple: "Electrons do not just swarm chaotically around the nucleus; they live in organized energy levels called Shells (labeled K, L, M, N... or n = 1, 2, 3...). The first shell (K) can only hold a maximum of 2 electrons. The second shell (L) can hold up to 8 electrons. Carbon has 6 electrons in total: 2 go into the inner K shell, and the remaining 4 go into the outer L shell. The electrons in the outermost shell are called Valence Electrons — they are the only ones that make bonds!",
            formal: "Bohr-Bury Rules dictate that the maximum capacity of a principal quantum shell n is given by 2n². For n=1 (K shell), max = 2. For n=2 (L shell), max = 8. For n=3 (M shell), max = 18. Electronic configuration of Carbon (Z=6) in subshell notation is 1s² 2s² 2p². Carbon has 4 valence electrons in its n=2 valence shell.",
            jee: "In JEE Main, you must instantly write valence electron counts for key organic atoms: H = 1, C = 4, N = 5, O = 6, Halogens (F, Cl, Br, I) = 7, Noble gases = 8."
          },
          examples: [
            {
              question: "Write the shell electronic configuration of Oxygen (Z = 8). How many valence electrons does it have?",
              thinking: "Distribute 8 electrons: 2 in K shell, remainder in L shell.",
              concept: "Electronic Distribution",
              solution: "Oxygen has 8 electrons. Shell K takes 2. Shell L takes the remaining 8 - 2 = 6. Configuration is (2, 6). The outermost shell has 6 electrons.",
              answer: "Configuration: (2, 6); Valence electrons: 6.",
              shortcut: "Valence electrons = electrons in outermost shell = 6 for Oxygen.",
              commonMistake: "Thinking all 8 electrons are valence electrons."
            },
            {
              question: "How many valence electrons does a neutral Carbon atom have?",
              thinking: "Carbon has Z = 6. First shell takes 2, remaining go to second shell.",
              concept: "Carbon Valence Shell",
              solution: "Z = 6. K shell = 2; L shell = 4. Since L is the outermost occupied shell, Carbon has exactly 4 valence electrons.",
              answer: "4 valence electrons.",
              shortcut: "Carbon is Group 14 → 4 valence electrons.",
              commonMistake: "Saying Carbon has 6 valence electrons (6 is TOTAL electrons, 4 is VALENCE)."
            }
          ],
          guidedPractice: [
            {
              question: "Nitrogen has atomic number 7. What is its shell electron configuration and how many valence electrons does it possess?",
              hint: "Put 2 in the first shell, and the rest in the second shell.",
              solution: "Configuration: (2, 5). Valence electrons = 5."
            }
          ],
          topicTest: [
            {
              id: "t05-q1",
              question: "The maximum number of electrons that can be accommodated in the second (L) shell is:",
              options: ["2", "6", "8", "18"],
              answer: 2,
              explanation: "According to the 2n² rule, for n=2, capacity = 2(2²) = 8 electrons."
            },
            {
              id: "t05-q2",
              question: "The electronic configuration of a neutral Carbon atom (Z = 6) in shells is:",
              options: ["(2, 4)", "(4, 2)", "(2, 2, 2)", "(6)"],
              answer: 0,
              explanation: "2 electrons fill the K shell, and the remaining 4 occupy the L shell: (2, 4)."
            },
            {
              id: "t05-q3",
              question: "How many valence electrons are present in a neutral Chlorine atom (Z = 17)?",
              options: ["1", "5", "7", "8"],
              answer: 2,
              explanation: "Chlorine has configuration (2, 8, 7). The outermost shell has 7 valence electrons."
            },
            {
              id: "t05-q4",
              question: "Electrons that participate in chemical bonding in organic compounds are located in the:",
              options: ["Innermost K shell", "Outermost valence shell", "Atomic nucleus", "Empty d orbitals only"],
              answer: 1,
              explanation: "Only outermost valence electrons participate in forming covalent bonds and chemical reactions."
            },
            {
              id: "t05-q5",
              question: "Subshell configuration of Carbon (Z = 6) in its ground state is:",
              options: ["1s² 2s² 2p²", "1s² 2s⁴", "1s⁴ 2s²", "2s² 2p⁴"],
              answer: 0,
              explanation: "1s orbital takes 2 electrons, 2s takes 2, and 2p takes 2: 1s² 2s² 2p²."
            }
          ]
        },

        {
          id: "ch00-topic06",
          number: "0.6",
          title: "Valency and the Octet Rule",
          prerequisites: ["0.5 Electrons and Electronic Configuration"],
          whyMatters: "Valency tells you how many bonds an atom MUST form. It explains why Carbon always forms 4 bonds, Nitrogen forms 3, Oxygen forms 2, and Hydrogen forms 1.",
          useLaterIn: ["Chapter 1 — Tetravalency of Carbon", "Chapter 4 — Bonding", "Chapter 8 — GOC"],
          lesson: {
            simple: "Atoms hate being unstable. Noble gases (like Neon and Argon) are supremely stable because their outer shell is completely packed with 8 electrons (an Octet), or 2 for Helium (Duplet). All other atoms form bonds to achieve this magical 8-electron stability! Valency is simply the number of electrons an atom needs to share, gain, or lose to reach 8. Carbon has 4 valence electrons, so it needs 4 more → Valency of Carbon is 4 (Tetravalent). Hydrogen has 1, needs 1 → Valency is 1.",
            formal: "The Octet Rule states that atoms tend to combine by sharing, losing, or gaining electrons until they acquire a stable outer-shell noble gas configuration of eight electrons (ns² np⁶). Valency is the combining capacity of an element. For elements with 1 to 4 valence electrons, Valency = number of valence electrons. For elements with 5 to 8, Valency = 8 - (valence electrons).",
            jee: "In organic chemistry, the HONC rule is your golden rule: H forms 1 bond, O forms 2 bonds, N forms 3 bonds, C forms 4 bonds. Never draw a 5-bonded carbon (the infamous 'Texas Carbon')!"
          },
          examples: [
            {
              question: "Determine the valency of Oxygen (Z = 8).",
              thinking: "Oxygen has 6 valence electrons. How many does it need to reach 8?",
              concept: "Valency Calculation",
              solution: "Oxygen has electronic configuration (2, 6). Number of valence electrons = 6. Since valence electrons > 4, Valency = 8 - 6 = 2. Oxygen needs 2 electrons to complete its octet, so it forms 2 bonds (e.g. in H₂O).",
              answer: "Valency of Oxygen is 2 (Divalent).",
              shortcut: "8 minus 6 = 2 bonds.",
              commonMistake: "Saying Oxygen has a valency of 6 (6 is valence electrons, 2 is valency)."
            },
            {
              question: "Why is a five-bonded carbon atom (e.g. CH₅ with 5 covalent bonds) physically impossible?",
              thinking: "Look at the maximum capacity of carbon's second shell.",
              concept: "Octet Limit for Second Period",
              solution: "Carbon's valence electrons reside in the second shell (n=2), which contains only one 2s and three 2p orbitals (total 4 valence orbitals). Four orbitals can hold a maximum of 4 × 2 = 8 electrons. Five covalent bonds would require 10 valence electrons, violating the octet rule because Carbon has no d-orbitals in n=2 to expand its octet.",
              answer: "Carbon lacks d-orbitals and cannot expand its octet beyond 8 electrons.",
              shortcut: "Period 2 elements (C, N, O, F) NEVER exceed 8 electrons!",
              commonMistake: "Thinking carbon can form 5 bonds like phosphorus (PCl₅)."
            }
          ],
          guidedPractice: [
            {
              question: "What is the valency of Nitrogen (Z = 7)? How many covalent bonds does it normally form in ammonia (NH₃)?",
              hint: "Nitrogen has 5 valence electrons. Calculate 8 - 5.",
              solution: "Valency = 8 - 5 = 3. Nitrogen forms 3 covalent bonds (with 1 unshared lone pair) to complete its octet."
            }
          ],
          topicTest: [
            {
              id: "t06-q1",
              question: "The valency of Carbon in virtually all stable organic compounds is:",
              options: ["1", "2", "3", "4"],
              answer: 3,
              explanation: "Carbon has 4 valence electrons and requires 4 shared electrons to achieve an octet, making it tetravalent (forms 4 bonds)."
            },
            {
              id: "t06-q2",
              question: "The 'HONC' mnemonic for bond counts of hydrogen, oxygen, nitrogen, and carbon corresponds to:",
              options: ["1, 2, 3, 4 bonds respectively", "4, 3, 2, 1 bonds respectively", "2, 4, 6, 8 bonds respectively", "1, 1, 1, 1 bond respectively"],
              answer: 0,
              explanation: "HONC: H forms 1 bond, O forms 2, N forms 3, C forms 4."
            },
            {
              id: "t06-q3",
              question: "Why can Phosphorus form PCl₅ (10 valence electrons) while Nitrogen cannot form NCl₅?",
              options: [
                "Nitrogen is a metal",
                "Nitrogen belongs to Period 2 and lacks vacant d-orbitals to expand its octet",
                "Phosphorus has lower electronegativity",
                "Chlorine does not react with nitrogen"
              ],
              answer: 1,
              explanation: "Nitrogen's valence shell (n=2) has only 2s and 2p orbitals (max 8 electrons). Phosphorus (n=3) has vacant 3d orbitals, allowing octet expansion."
            },
            {
              id: "t06-q4",
              question: "According to the Octet Rule, atoms form chemical bonds in order to acquire the stable electron arrangement of a:",
              options: ["Halogen", "Alkali metal", "Noble gas", "Transition metal"],
              answer: 2,
              explanation: "Noble gases possess completely filled s and p subshells (ns² np⁶), conferring extraordinary thermodynamic stability."
            },
            {
              id: "t06-q5",
              question: "What is the valency of Hydrogen?",
              options: ["0", "1", "2", "4"],
              answer: 1,
              explanation: "Hydrogen has 1 electron and needs 1 more to complete its duplet (like Helium), so its valency is 1."
            }
          ]
        },

        {
          id: "ch00-topic07",
          number: "0.7",
          title: "Ions — Cations and Anions",
          prerequisites: ["0.5 Electrons", "0.6 Valency"],
          whyMatters: "Organic reaction mechanisms consist of electrophiles (positive ions/species) attacking nucleophiles (negative ions/species).",
          useLaterIn: ["Chapter 8 — Carbocations & Carbanions", "Chapter 13 — Haloalkanes"],
          lesson: {
            simple: "What happens if an atom loses or gains electrons instead of sharing them? If an atom loses an electron, it has more positive protons than negative electrons → it becomes a positively charged ion called a Cation (like Na⁺ or Carbocation C⁺). If an atom gains an electron, it becomes a negatively charged ion called an Anion (like Cl⁻ or Carbanion C:⁻). Opposites attract!",
            formal: "An ion is an atom or molecule with a net electric charge due to the loss or gain of one or more electrons. Ionization: Loss of electrons results in a Cation (net positive charge; oxidation). Gain of electrons results in an Anion (net negative charge; reduction). In organic mechanisms, heterolytic bond cleavage creates carbocations (R⁺, sp², 6 valence e⁻) and carbanions (R:⁻, sp³, 8 valence e⁻).",
            jee: "Carbocations (carbon cations) and Carbanions (carbon anions) are the primary reactive intermediates of JEE organic chemistry. Master ions here, and Chapter 8 mechanisms become straightforward."
          },
          examples: [
            {
              question: "How does a neutral Chlorine atom (17 protons, 17 electrons) become a Chloride ion (Cl⁻)?",
              thinking: "Look at charge balance: to become -1, does it lose or gain an electron?",
              concept: "Anion Formation",
              solution: "Chlorine has 17 protons (+17) and configuration (2, 8, 7). By gaining 1 electron, it reaches a stable noble gas configuration (2, 8, 8) with 18 electrons (-18). Net charge = +17 - 18 = -1. It forms the chloride anion Cl⁻.",
              answer: "Gains 1 electron to form Cl⁻.",
              shortcut: "Gain electron = Negative Anion. Lose electron = Positive Cation.",
              commonMistake: "Thinking a positive ion formed because it gained a proton."
            },
            {
              question: "A carbocation (R₃C⁺) is formed when a bond breaks. How many valence electrons surround the positively charged carbon?",
              thinking: "A normal carbon has 4 valence electrons forming 4 bonds (8 shared electrons). When it loses a leaving group with both bonding electrons, how many are left?",
              concept: "Carbocation Valence",
              solution: "Carbon normally has 8 valence electrons in 4 bonds. In a carbocation, one bond breaks heterolytically and the leaving group takes both electrons. Carbon is left with 3 bonds: 3 × 2 = 6 valence electrons and a +1 formal charge.",
              answer: "6 valence electrons (electron-deficient sextet).",
              shortcut: "Carbocation = 6 electrons (hungry for electrons = electrophile).",
              commonMistake: "Assuming a carbocation still satisfies the octet rule."
            }
          ],
          guidedPractice: [
            {
              question: "Is a Carbanion (R₃C:⁻) electron-rich or electron-deficient? How many valence electrons does it have?",
              hint: "It has 3 single bonds to carbon plus one unshared lone pair of electrons.",
              solution: "It has 3 × 2 = 6 (bonding) + 2 (lone pair) = 8 valence electrons. With an unshared pair and negative charge, it is electron-rich (acts as a nucleophile)."
            }
          ],
          topicTest: [
            {
              id: "t07-q1",
              question: "When a neutral atom loses one electron, it forms a:",
              options: ["Positively charged cation", "Negatively charged anion", "Neutral isotope", "Molecule"],
              answer: 0,
              explanation: "Loss of negative electrons leaves an excess of positive nuclear charge, forming a cation."
            },
            {
              id: "t07-q2",
              question: "A carbocation has how many electrons in its valence shell?",
              options: ["4", "6", "8", "10"],
              answer: 1,
              explanation: "A carbocation has three covalent bonds and no lone pairs, meaning 3 × 2 = 6 valence electrons (an incomplete octet sextet)."
            },
            {
              id: "t07-q3",
              question: "Species that possess a full negative charge or unshared electron pairs and seek positive centers are called:",
              options: ["Electrophiles", "Nucleophiles", "Free radicals", "Isomers"],
              answer: 1,
              explanation: "Nucleophiles ('nucleus-loving') are electron-rich species (anions or neutral with lone pairs) that donate electrons to electron-deficient centers."
            },
            {
              id: "t07-q4",
              question: "Which of the following represents an anion?",
              options: ["Na⁺", "NH₄⁺", "OH⁻ (Hydroxide)", "H₃O⁺"],
              answer: 2,
              explanation: "OH⁻ carries a negative net charge, making it an anion."
            },
            {
              id: "t07-q5",
              question: "In heterolytic fission of a C–Cl bond, the bonding electrons are retained by Chlorine because:",
              options: [
                "Carbon is more electronegative",
                "Chlorine is more electronegative than Carbon",
                "Chlorine is larger in size",
                "Chlorine has fewer protons"
              ],
              answer: 1,
              explanation: "Chlorine has higher electronegativity (3.0 vs 2.5), pulling both bonding electrons to become Cl⁻ and leaving a carbocation C⁺."
            }
          ]
        },

        {
          id: "ch00-topic08",
          number: "0.8",
          title: "Chemical Formulae and the Criss-Cross Method",
          prerequisites: ["0.6 Valency", "0.7 Ions"],
          whyMatters: "Understanding how to write correct molecular formulas is essential before naming complex organic structures.",
          useLaterIn: ["Chapter 1 — Hydrocarbons", "Chapter 6 — IUPAC"],
          lesson: {
            simple: "How do you know whether magnesium chloride is MgCl or MgCl₂? You use the Criss-Cross rule of valencies! Write the symbols side by side with their valencies underneath. Then cross the numbers over: Magnesium has valency 2, Chlorine has valency 1. Cross them → Mg₁Cl₂ (written as MgCl₂). For carbon (valency 4) and hydrogen (valency 1), cross them → C₁H₄, giving Methane CH₄!",
            formal: "A chemical formula expresses the proportions of atoms that constitute a particular chemical compound using chemical element symbols and numerical subscripts. For binary compounds, the valencies or oxidation charges of the two constituents are crossed over to become the subscript of the opposing element, simplified to the lowest integer ratio.",
            jee: "In JEE Main, converting structural names to exact molecular formulas (and calculating Degree of Unsaturation / Double Bond Equivalent) requires instantaneous formula literacy."
          },
          examples: [
            {
              question: "Using the criss-cross method, determine the chemical formula of the compound formed between Carbon (valency 4) and Oxygen (valency 2).",
              thinking: "Write symbols C and O with valencies 4 and 2. Cross over, then simplify ratio.",
              concept: "Criss-Cross Formula Derivation",
              solution: "Symbols: C (valency 4), O (valency 2). Criss-cross gives C₂O₄. Divide both subscripts by their greatest common divisor (2) to get the simplest ratio: C₁O₂ = CO₂ (Carbon dioxide).",
              answer: "CO₂",
              shortcut: "Always reduce the ratio to simplest whole numbers: 2:4 reduces to 1:2.",
              commonMistake: "Leaving the formula as C₂O₄ instead of simplifying to CO₂."
            },
            {
              question: "What is the formula of the simplest compound formed between Carbon (valency 4) and Hydrogen (valency 1)?",
              thinking: "Criss-cross valencies 4 and 1.",
              concept: "Hydrocarbon Formula",
              solution: "Symbols: C (4), H (1). Cross over: C₁H₄ = CH₄ (Methane, the simplest alkane).",
              answer: "CH₄ (Methane)",
              shortcut: "Carbon needs 4 bonds, each H gives 1 bond → CH₄.",
              commonMistake: "Writing CH or CH₂ as stable compounds."
            }
          ],
          guidedPractice: [
            {
              question: "What is the formula of the compound formed between Aluminium (valency 3) and Oxygen (valency 2)?",
              hint: "Cross Aluminium's valency (3) to Oxygen, and Oxygen's valency (2) to Aluminium.",
              solution: "Criss-cross gives Al₂O₃ (Aluminium oxide)."
            }
          ],
          topicTest: [
            {
              id: "t08-q1",
              question: "The chemical formula of methane is CH₄ because:",
              options: [
                "Carbon has valency 4 and Hydrogen has valency 1",
                "Carbon has valency 1 and Hydrogen has valency 4",
                "Carbon can only bond with 4 different elements",
                "Hydrogen has 4 valence electrons"
              ],
              answer: 0,
              explanation: "Carbon requires 4 electrons (valency 4) and each hydrogen provides 1 electron (valency 1), requiring 4 H atoms for 1 C atom."
            },
            {
              id: "t08-q2",
              question: "Carbon tetrachloride has the chemical formula:",
              options: ["CCl", "CCl₂", "CCl₃", "CCl₄"],
              answer: 3,
              explanation: "Carbon has valency 4, Chlorine has valency 1. Criss-cross gives CCl₄."
            },
            {
              id: "t08-q3",
              question: "Water has the formula H₂O because:",
              options: [
                "Oxygen has valency 2 and Hydrogen has valency 1",
                "Oxygen has valency 1 and Hydrogen has valency 2",
                "Hydrogen is heavier than oxygen",
                "Both have valency 1"
              ],
              answer: 0,
              explanation: "Oxygen has valency 2 (needs 2 electrons) and Hydrogen has valency 1 (needs 1), yielding H₂O."
            },
            {
              id: "t08-q4",
              question: "The compound formed between Nitrogen (valency 3) and Hydrogen (valency 1) has the formula:",
              options: ["NH", "NH₂", "NH₃ (Ammonia)", "N₃H"],
              answer: 2,
              explanation: "Nitrogen requires 3 bonds to complete its octet, combining with 3 Hydrogen atoms to form NH₃."
            },
            {
              id: "t08-q5",
              question: "When writing chemical formulas using the criss-cross method, subscripts should be:",
              options: [
                "Left as large fractions",
                "Simplified to the lowest whole number ratio",
                "Multiplied by 10",
                "Expressed as negative decimals"
              ],
              answer: 1,
              explanation: "Chemical formulas represent stoichiometry in the simplest integer ratio (e.g. C₂O₄ simplifies to CO₂)."
            }
          ]
        },

        {
          id: "ch00-topic09",
          number: "0.9",
          title: "Chemical Equations and Conservation of Mass",
          prerequisites: ["0.8 Chemical Formulae"],
          whyMatters: "Every organic reaction must balance atoms; unreactive atoms do not vanish into thin air.",
          useLaterIn: ["Chapter 1.18 Basic Organic Reactions", "Chapter 9 — Combustion of Alkanes"],
          lesson: {
            simple: "A chemical equation is a recipe for a chemical reaction: Reactants on the left → Products on the right. Because of the Law of Conservation of Mass, matter cannot be created or destroyed. That means every single atom entering a reaction MUST appear somewhere on the product side! If you burn 1 molecule of methane (CH₄) in oxygen, you need 2 molecules of O₂ to produce 1 molecule of CO₂ and 2 molecules of H₂O.",
            formal: "A balanced chemical equation represents a stoichiometric statement of a chemical transformation conforming strictly to the Law of Conservation of Mass. Stoichiometric coefficients balance the number of atoms of each element on both sides of the equation: CH₄ + 2 O₂ → CO₂ + 2 H₂O.",
            jee: "In JEE Main, general combustion stoichiometry is tested repeatedly: C_x H_y + (x + y/4) O₂ → x CO₂ + (y/2) H₂O. You must be able to use this formula instantly."
          },
          examples: [
            {
              question: "Balance the combustion reaction of Ethane (C₂H₆) with oxygen to form CO₂ and H₂O.",
              thinking: "Balance Carbon first, then Hydrogen, then Oxygen.",
              concept: "Combustion Balancing",
              solution: "1. Carbon: C₂H₆ has 2 carbons → 2 CO₂.\n2. Hydrogen: C₂H₆ has 6 hydrogens → 3 H₂O.\n3. Oxygen on right side: (2 × 2) + (3 × 1) = 4 + 3 = 7 oxygen atoms.\n4. Oxygen needed on left: 7/2 O₂.\nMultiply entire equation by 2 to eliminate fraction: 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O.",
              answer: "2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O",
              shortcut: "Use C_x H_y + (x + y/4) O₂: For x=2, y=6 → 2 + 6/4 = 3.5 = 7/2 O₂.",
              commonMistake: "Forgetting that oxygen in H₂O counts towards total product oxygen."
            },
            {
              question: "In the reaction CH₄ + Cl₂ → CH₃Cl + HCl, how many total hydrogen atoms exist on reactant vs product side?",
              thinking: "Count H atoms on left and right.",
              concept: "Conservation Check",
              solution: "Left side (Reactants): 4 in CH₄ = 4 H atoms. Right side (Products): 3 in CH₃Cl + 1 in HCl = 4 H atoms. Exactly conserved.",
              answer: "4 H atoms on both sides.",
              shortcut: "Atom count left must always equal atom count right.",
              commonMistake: "Assuming the displaced hydrogen disappears."
            }
          ],
          guidedPractice: [
            {
              question: "Balance the reaction: C + O₂ → CO (incomplete combustion).",
              hint: "Two oxygen atoms on left requires 2 CO on right, which needs 2 C on left.",
              solution: "2 C + O₂ → 2 CO"
            }
          ],
          topicTest: [
            {
              id: "t09-q1",
              question: "The complete combustion of 1 mole of propane (C₃H₈) produces how many moles of CO₂?",
              options: ["1", "2", "3", "8"],
              answer: 2,
              explanation: "Each molecule of propane has 3 carbon atoms. Conserving carbon, 1 mole of C₃H₈ produces exactly 3 moles of CO₂."
            },
            {
              id: "t09-q2",
              question: "According to the general combustion formula C_x H_y + (x + y/4) O₂ → x CO₂ + (y/2) H₂O, how many moles of O₂ are needed to completely burn 1 mole of methane (CH₄)?",
              options: ["1", "2", "3", "4"],
              answer: 1,
              explanation: "For methane, x=1 and y=4. Moles of O₂ = x + y/4 = 1 + 4/4 = 2 moles of O₂."
            },
            {
              id: "t09-q3",
              question: "In any balanced chemical equation, which quantity is strictly conserved?",
              options: ["Total number of molecules", "Total number of atoms of each element", "Total volume of gases", "Total number of moles"],
              answer: 1,
              explanation: "Atoms cannot be created or destroyed in chemical reactions; total atom count for every element is conserved."
            },
            {
              id: "t09-q4",
              question: "What are the coefficients a, b, c in the balanced equation: a C₂H₄ + b O₂ → c CO₂ + 2 H₂O?",
              options: ["a=1, b=3, c=2", "a=2, b=4, c=2", "a=1, b=2, c=1", "a=2, b=3, c=4"],
              answer: 0,
              explanation: "For 1 C₂H₄ (a=1): yields 2 CO₂ (c=2) and 2 H₂O. Total oxygens on right = (2×2) + 2 = 6, requiring 3 O₂ (b=3)."
            },
            {
              id: "t09-q5",
              question: "In the organic reaction: CH₃CH₂OH → CH₂=CH₂ + H₂O, what type of reaction is this?",
              options: ["Addition", "Elimination / Dehydration", "Substitution", "Polymerization"],
              answer: 1,
              explanation: "A molecule of water (H₂O) is eliminated from ethanol to form ethene, classifying it as an elimination (dehydration) reaction."
            }
          ]
        },

        {
          id: "ch00-topic10",
          number: "0.10",
          title: "Acids and Bases for Organic Chemistry",
          prerequisites: ["0.7 Ions"],
          whyMatters: "Almost all organic reactions are acid-base reactions! Master proton transfer (Bronsted) and electron donation (Lewis) now.",
          useLaterIn: ["Chapter 8 — Acidity & Basicity", "Chapter 15 — Phenol Acidity", "Chapter 19 — Amine Basicity"],
          lesson: {
            simple: "Forget just litmus paper! In organic chemistry, acids and bases are seen through two clear lenses: Bronsted-Lowry: An Acid is a proton donor (gives H⁺) and a Base is a proton acceptor (takes H⁺). Lewis: A Base has an electron pair to donate (electron-pair donor = nucleophile!), and an Acid has an empty spot to accept an electron pair (electron-pair acceptor = electrophile!). Water (H₂O), alcohols (ROH), and carboxylic acids (RCOOH) donate protons; amines (RNH₂) have a lone pair on nitrogen and act as bases.",
            formal: "Bronsted-Lowry Theory: Acid = species that donates a hydron (H⁺); Base = species that accepts a hydron. Conjugate Acid-Base pair differs by exactly one H⁺. Lewis Theory: Acid = electron-pair acceptor (has vacant orbital, e.g. BF₃, AlCl₃, carbocations); Base = electron-pair donor (has non-bonding lone pair, e.g. :NH₃, H₂O, carbanions).",
            jee: "JEE Main tests organic acidity via conjugate base stability: The more stable the conjugate base (due to resonance or -I effect), the STRONGER the acid! High Ka = Low pKa = Strong acid."
          },
          examples: [
            {
              question: "Classify BF₃ (Boron trifluoride) and NH₃ (Ammonia) as Lewis acids or Lewis bases.",
              thinking: "Check valence electron count and presence of vacant orbitals or lone pairs.",
              concept: "Lewis Acid-Base Definition",
              solution: "Boron in BF₃ has 3 single bonds = 6 valence electrons (an incomplete octet with an empty 2p orbital), so it accepts an electron pair → Lewis Acid. Nitrogen in NH₃ has 3 single bonds and 1 lone pair (8 electrons), which it can donate → Lewis Base.",
              answer: "BF₃ is a Lewis Acid; NH₃ is a Lewis Base.",
              shortcut: "Incomplete octet = Lewis Acid. Lone pair = Lewis Base.",
              commonMistake: "Thinking an acid must contain hydrogen."
            },
            {
              question: "What is the conjugate base of acetic acid (CH₃COOH)?",
              thinking: "Remove exactly one H⁺ from the acid.",
              concept: "Conjugate Base",
              solution: "When CH₃COOH loses a proton (H⁺), the remaining species carries a negative charge: CH₃COO⁻ (Acetate anion).",
              answer: "Acetate ion (CH₃COO⁻).",
              shortcut: "Conjugate Base = Acid minus H⁺.",
              commonMistake: "Removing a hydrogen from the methyl group instead of the –COOH group."
            }
          ],
          guidedPractice: [
            {
              question: "Is a carbocation (R₃C⁺) a Lewis acid or a Lewis base?",
              hint: "Remember it has only 6 valence electrons and an empty p-orbital.",
              solution: "It has an empty orbital and accepts an electron pair from nucleophiles, making it a Lewis Acid (electrophile)."
            }
          ],
          topicTest: [
            {
              id: "t10-q1",
              question: "According to the Lewis definition, an acid is an:",
              options: [
                "Electron-pair donor",
                "Electron-pair acceptor",
                "Proton donor",
                "Hydroxide ion donor"
              ],
              answer: 1,
              explanation: "A Lewis acid is an electron-pair acceptor possessing a vacant orbital (e.g. BF₃, AlCl₃, carbocations)."
            },
            {
              id: "t10-q2",
              question: "Which of the following acts as a Lewis base in organic reactions due to its unshared lone pair?",
              options: ["NH₃ (Ammonia)", "BF₃", "AlCl₃", "H⁺"],
              answer: 0,
              explanation: "Ammonia has an unshared lone pair on the nitrogen atom which it can donate to form coordinate bonds."
            },
            {
              id: "t10-q3",
              question: "A stronger organic acid has a:",
              options: ["Higher pKa value", "Lower pKa value and higher Ka", "Zero dissociation", "Unstable conjugate base"],
              answer: 1,
              explanation: "Acid strength is inversely proportional to pKa: pKa = -log₁₀(Ka). Stronger acids have lower (more negative or smaller) pKa values."
            },
            {
              id: "t10-q4",
              question: "What is the conjugate base of water (H₂O)?",
              options: ["H₃O⁺", "OH⁻ (Hydroxide ion)", "O²⁻", "H₂"],
              answer: 1,
              explanation: "Removing H⁺ from H₂O leaves the hydroxide ion (OH⁻)."
            },
            {
              id: "t10-q5",
              question: "Why is an electrophile considered a Lewis acid?",
              options: [
                "It donates hydroxide ions",
                "It accepts an electron pair from an electron-rich nucleophile",
                "It is always negatively charged",
                "It contains only carbon and hydrogen"
              ],
              answer: 1,
              explanation: "Electrophiles seek electron pairs and accept them to form new covalent bonds, matching the Lewis acid definition."
            }
          ]
        },

        {
          id: "ch00-topic11",
          number: "0.11",
          title: "Oxidation and Reduction Basics for Organic Chemistry",
          prerequisites: ["0.7 Ions", "0.9 Chemical Equations"],
          whyMatters: "Converting an alcohol to an aldehyde or acid is the most frequent transformation in organic chemistry.",
          useLaterIn: ["Chapter 14 — Alcohol Oxidation", "Chapter 17 — Carbonyl Chemistry"],
          lesson: {
            simple: "In general chemistry, you memorized: Oxidation = Loss of electrons, Reduction = Gain of electrons (OIL RIG). In Organic Chemistry, we have a super-convenient visual shortcut: Oxidation means ADDING Oxygen or REMOVING Hydrogen (e.g. Alkane → Alcohol → Aldehyde → Carboxylic Acid). Reduction means ADDING Hydrogen or REMOVING Oxygen (e.g. Carboxylic Acid → Aldehyde → Alcohol → Alkane). Reagents that add oxygen (like KMnO₄, K₂Cr₂O₇, PCC) are Oxidising Agents. Reagents that add hydrogen (like LiAlH₄, NaBH₄, H₂/Pd) are Reducing Agents!",
            formal: "In organic chemistry, oxidation corresponds to an increase in the oxidation state of carbon, typically manifested as an increase in the number of C–O, C–N, or C–X bonds and/or a decrease in C–H bonds. Reduction corresponds to a decrease in the oxidation state of carbon, manifested as an increase in C–H bonds and/or decrease in C–O/C–X bonds.",
            jee: "JEE Main regularly tests oxidation ladders: Primary alcohol + mild oxidizer (PCC) → Aldehyde; Primary alcohol + strong oxidizer (acidic KMnO₄) → Carboxylic acid; Secondary alcohol → Ketone; Tertiary alcohol → Resists oxidation!"
          },
          examples: [
            {
              question: "Is the transformation of ethanol (CH₃CH₂OH) to ethanal (CH₃CHO) an oxidation or a reduction?",
              thinking: "Count the number of C–H and C–O bonds on the functional carbon.",
              concept: "Organic Redox Determination",
              solution: "In ethanol (CH₃CH₂OH), the carbon has two C–H bonds and one C–O single bond. In ethanal (CH₃CHO), the carbon has one C–H bond and a C=O double bond. Two hydrogen atoms have been removed (loss of H) and the carbon-oxygen bond order increased from 1 to 2. This is an Oxidation.",
              answer: "Oxidation (dehydrogenation).",
              shortcut: "Loss of H = Oxidation.",
              commonMistake: "Thinking oxidation requires adding an extra oxygen atom."
            },
            {
              question: "Identify whether LiAlH₄ is an oxidising or reducing agent in organic synthesis.",
              thinking: "What does LiAlH₄ deliver to carbon compounds?",
              concept: "Reagent Classification",
              solution: "Lithium Aluminium Hydride (LiAlH₄) delivers hydride ions (:H⁻) to electron-deficient carbonyl carbons, adding hydrogen and reducing carbonyls/acids to alcohols. It is a powerful Reducing Agent.",
              answer: "Reducing Agent.",
              shortcut: "LiAlH₄ and NaBH₄ are hydride donors → Reducing agents.",
              commonMistake: "Confusing reducing agent with oxidising agent."
            }
          ],
          guidedPractice: [
            {
              question: "When ethene (CH₂=CH₂) is treated with H₂ over a nickel catalyst to form ethane (CH₃–CH₃), is this oxidation or reduction?",
              hint: "Hydrogen atoms are being added across the double bond.",
              solution: "Addition of hydrogen is Reduction (hydrogenation)."
            }
          ],
          topicTest: [
            {
              id: "t11-q1",
              question: "In organic chemistry, the conversion of an alcohol (CH₃CH₂OH) into a carboxylic acid (CH₃COOH) represents:",
              options: ["Reduction", "Oxidation", "Substitution only", "Hydrolysis only"],
              answer: 1,
              explanation: "Oxygen content increases and hydrogen content decreases, which defines an oxidation reaction."
            },
            {
              id: "t11-q2",
              question: "Which of the following is a widely used reducing agent in organic chemistry?",
              options: ["KMnO₄", "K₂Cr₂O₇", "LiAlH₄ (Lithium aluminium hydride)", "O₃ (Ozone)"],
              answer: 2,
              explanation: "LiAlH₄ is a powerful reducing agent that donates hydride (:H⁻) to reduce carbonyl groups, carboxylic acids, and esters to alcohols."
            },
            {
              id: "t11-q3",
              question: "The addition of hydrogen gas (H₂) to an alkene to form an alkane is classified as:",
              options: ["Oxidation", "Reduction (Hydrogenation)", "Dehydration", "Esterification"],
              answer: 1,
              explanation: "Adding hydrogen to unsaturated double bonds is catalytic reduction (hydrogenation)."
            },
            {
              id: "t11-q4",
              question: "Oxidation of a secondary (2°) alcohol yields a:",
              options: ["Carboxylic acid", "Ketone", "Aldehyde", "Alkane"],
              answer: 1,
              explanation: "Secondary alcohols (R–CH(OH)–R') oxidize by loss of two hydrogens to form Ketones (R–CO–R')."
            },
            {
              id: "t11-q5",
              question: "PCC (Pyridinium chlorochromate) is preferred over alkaline KMnO₄ for converting primary alcohols to aldehydes because:",
              options: [
                "It is a strong reducing agent",
                "It stops the oxidation selectively at the aldehyde stage without over-oxidizing to carboxylic acid",
                "It destroys the carbon chain",
                "It turns aldehydes into alkanes"
              ],
              answer: 1,
              explanation: "PCC is a mild, selective oxidizer in anhydrous CH₂Cl₂ that stops at aldehydes, whereas KMnO₄ oxidizes all the way to carboxylic acids."
            }
          ]
        }
      ],

      summary: {
        whatYouLearned: [
          "Matter consists of pure substances (elements, compounds) and mixtures.",
          "Atoms consist of a dense positive nucleus (protons + neutrons) surrounded by electrons.",
          "Atomic number Z = number of protons = number of electrons in a neutral atom.",
          "Valence electrons in the outermost shell govern all chemical bonding.",
          "Valency is the combining capacity: Carbon has 4 valence electrons and forms 4 covalent bonds (tetravalency).",
          "The Octet Rule guides atoms to achieve 8 valence electrons like noble gases.",
          "Ions form by electron loss (cations) or gain (anions).",
          "Chemical formulas are derived via criss-crossing valencies, and equations must balance mass.",
          "Acids are proton donors / electron-pair acceptors (Lewis acids = electrophiles). Bases are proton acceptors / electron-pair donors (Lewis bases = nucleophiles).",
          "Oxidation in organic chemistry means adding oxygen or removing hydrogen; reduction means adding hydrogen or removing oxygen."
        ],
        importantDefinitions: [
          "Atom: Smallest unit of matter retaining chemical identity.",
          "Valency: Combining capacity of an element to reach octet stability.",
          "Cation: Positively charged ion (electron deficient).",
          "Anion: Negatively charged ion (electron rich).",
          "Electrophile: Lewis acid seeking an electron pair.",
          "Nucleophile: Lewis base seeking a positive center with its electron pair."
        ],
        importantRules: [
          "HONC Rule: H forms 1 bond, O forms 2, N forms 3, C forms 4.",
          "Octet Rule: Maximum of 8 valence electrons for Period 2 elements (C, N, O, F).",
          "Criss-Cross Rule: Valencies cross over to become the opposing element's subscript."
        ],
        commonTraps: [
          "Never draw a 5-bonded carbon (Texas Carbon) — carbon's second shell has no d-orbitals!",
          "Do not confuse valence electrons (total in outer shell) with valency (number of bonds formed).",
          "Remember that oxidation in organic chem does not always require adding oxygen; removing two hydrogens is also oxidation!"
        ],
        jeeFocus: "Atomic number of organic elements (C=6, N=7, O=8, Halogens), octet limits, Lewis acid/base concepts as electrophiles/nucleophiles, and redox transformations."
      },

      mindMap: {
        title: "Chapter 0 — Chemistry Foundation",
        root: "Chemistry Foundation",
        branches: [
          {
            title: "Atomic Architecture",
            nodes: ["Protons (Z)", "Neutrons (A-Z)", "Electrons (Shells K, L, M)"]
          },
          {
            title: "Valency & Octet",
            nodes: ["Bohr-Bury Rule", "Valence Electrons", "Octet Rule", "HONC (1,2,3,4)"]
          },
          {
            title: "Chemical Interactions",
            nodes: ["Ions (Cation/Anion)", "Formulae (Criss-Cross)", "Conservation of Mass"]
          },
          {
            title: "Organic Bridge",
            nodes: ["Lewis Acids (Electrophiles)", "Lewis Bases (Nucleophiles)", "Organic Redox (OIL RIG)"]
          }
        ]
      },

      chapterTest: [
        {
          id: "ch00-test-01",
          question: "An element has an atomic number of 6 and a mass number of 14. What are its proton and neutron counts?",
          options: ["6 protons, 8 neutrons", "8 protons, 6 neutrons", "6 protons, 14 neutrons", "14 protons, 6 neutrons"],
          answer: 0,
          explanation: "Protons = Z = 6. Neutrons = A - Z = 14 - 6 = 8. This is the Carbon-14 isotope."
        },
        {
          id: "ch00-test-02",
          question: "How many covalent bonds does a neutral carbon atom form in stable organic molecules?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Carbon has 4 valence electrons and forms 4 covalent bonds to complete its octet (tetravalency)."
        },
        {
          id: "ch00-test-03",
          question: "Which of the following elements CANNOT expand its octet beyond 8 valence electrons?",
          options: ["Sulfur", "Phosphorus", "Carbon", "Chlorine"],
          answer: 2,
          explanation: "Carbon is in Period 2 with principal quantum number n=2, which possesses only 2s and 2p orbitals (max 8 electrons). It has no d-orbitals."
        },
        {
          id: "ch00-test-04",
          question: "A carbocation (R₃C⁺) acts as a:",
          options: ["Lewis base", "Lewis acid / Electrophile", "Oxidizing agent only", "Radical"],
          answer: 1,
          explanation: "A carbocation has an incomplete octet (6 valence electrons) and accepts an electron pair, classifying it as a Lewis acid (electrophile)."
        },
        {
          id: "ch00-test-05",
          question: "What is the formula of the compound formed between Carbon (valency 4) and Chlorine (valency 1)?",
          options: ["CCl", "CCl₂", "CCl₄", "C₄Cl"],
          answer: 2,
          explanation: "Criss-crossing valency 4 of carbon and valency 1 of chlorine gives CCl₄."
        },
        {
          id: "ch00-test-06",
          question: "Converting ethanol (CH₃CH₂OH) to acetic acid (CH₃COOH) involves:",
          options: ["Reduction", "Oxidation", "Substitution only", "Elimination only"],
          answer: 1,
          explanation: "Oxygen content increases and hydrogen content decreases; this is oxidation."
        },
        {
          id: "ch00-test-07",
          question: "The 'HONC' rule indicates that Nitrogen forms how many covalent bonds?",
          options: ["1", "2", "3", "4"],
          answer: 2,
          explanation: "In HONC: H=1, O=2, N=3, C=4."
        },
        {
          id: "ch00-test-08",
          question: "What is the conjugate base of ethanol (CH₃CH₂OH)?",
          options: ["CH₃CH₂O⁻ (Ethoxide ion)", "CH₃CH₂⁺", "CH₃CHO", "CH₂=CH₂"],
          answer: 0,
          explanation: "Loss of H⁺ from the –OH group leaves the ethoxide anion CH₃CH₂O⁻."
        },
        {
          id: "ch00-test-09",
          question: "How many moles of O₂ are required for complete combustion of 1 mole of ethane (C₂H₆)?",
          options: ["2.5", "3.0", "3.5", "7.0"],
          answer: 2,
          explanation: "Formula: x + y/4 = 2 + 6/4 = 2 + 1.5 = 3.5 moles of O₂ (or 7/2 O₂)."
        },
        {
          id: "ch00-test-10",
          question: "An uncharged atom with 8 protons has how many valence electrons?",
          options: ["2", "4", "6", "8"],
          answer: 2,
          explanation: "Element with Z=8 is Oxygen. Configuration: (2, 6). It has 6 valence electrons."
        }
      ]
    }
  ];

  return {
    CHAPTERS
  };
})();
