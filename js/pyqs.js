/**
 * JEE MAIN ORGANIC CHEMISTRY - PYQS & EXAM QUESTIONS BANK
 * Strictly categorizes verified JEE Main PYQs and JEE-Main-Style questions.
 */

window.CHEM_PYQS = (function() {
  const QUESTIONS = [
    {
      id: "pyq-2024-01",
      type: "verified-pyq",
      exam: "JEE Main",
      year: 2024,
      session: "Session 1",
      chapterId: "ch-08",
      chapterTitle: "General Organic Chemistry",
      topic: "Carbocation Stability",
      difficulty: "Medium",
      question: "The correct order of stability of the following carbocations is:\n(I) (CH₃)₃C⁺  (II) (CH₃)₂CH⁺  (III) CH₃CH₂⁺  (IV) ⁺CH₃",
      options: [
        "I > II > III > IV",
        "IV > III > II > I",
        "I > III > II > IV",
        "II > I > III > IV"
      ],
      answer: 0,
      conceptTested: "Hyperconjugation and +I inductive effect in carbocation stability.",
      approach: "Count the number of alpha-hydrogens (α-H) attached to carbons adjacent to the sp² carbocation center.",
      explanation: "Tertiary carbocation (I) has 9 α-H (maximum hyperconjugation). Secondary carbocation (II) has 6 α-H. Primary (III) has 3 α-H. Methyl cation (IV) has 0 α-H. Order: 3° > 2° > 1° > methyl.",
      wrongOptionsAnalysis: "Options B, C, D reverse or misplace the 3° vs 2° order, ignoring the 9 vs 6 hyperconjugative structures.",
      commonTrap: "Confusing carbocation stability (3° > 2° > 1°) with carbanion stability (1° > 2° > 3°)."
    },
    {
      id: "pyq-2024-02",
      type: "verified-pyq",
      exam: "JEE Main",
      year: 2024,
      session: "Session 1",
      chapterId: "ch-10",
      chapterTitle: "Alkenes",
      topic: "Ozonolysis",
      difficulty: "Hard",
      question: "An alkene 'A' on reductive ozonolysis (O₃, Zn/H₂O) gives propan-2-one and methanal in equimolar amounts. Alkene 'A' is:",
      options: [
        "2-Methylprop-1-ene (Isobutylene)",
        "But-2-ene",
        "But-1-ene",
        "2-Methylbut-2-ene"
      ],
      answer: 0,
      conceptTested: "Reductive ozonolysis of alkenes to carbonyl compounds.",
      approach: "Place the two carbonyl oxygen atoms face to face: (CH₃)₂C=O + O=CH₂. Remove the oxygens and connect the carbons with a double bond.",
      explanation: "Rejoining (CH₃)₂C= and =CH₂ gives (CH₃)₂C=CH₂, which is 2-methylprop-1-ene. Reductive cleavage of this terminal alkene yields acetone and formaldehyde.",
      wrongOptionsAnalysis: "But-2-ene gives only ethanal. But-1-ene gives propanal and methanal. 2-Methylbut-2-ene gives acetone and ethanal.",
      commonTrap: "Using oxidative ozonolysis conditions (H₂O₂/KMnO₄) which would convert formaldehyde to formic acid/CO₂."
    },
    {
      id: "pyq-2023-01",
      type: "verified-pyq",
      exam: "JEE Main",
      year: 2023,
      session: "Session 2",
      chapterId: "ch-08",
      chapterTitle: "General Organic Chemistry",
      topic: "Aromaticity and Huckel's Rule",
      difficulty: "Medium",
      question: "Which of the following species is NOT aromatic according to Hückel's Rule?",
      options: [
        "Benzene",
        "Cyclopentadienyl anion",
        "Cycloheptatrienyl cation (Tropylium ion)",
        "Cyclooctatetraene (COT)"
      ],
      answer: 3,
      explanation: "Cyclooctatetraene (COT) has 8 π electrons (4n system). To avoid antiaromatic destabilization, it adopts a non-planar 'tub' conformation, rendering it non-aromatic.",
      wrongOptionsAnalysis: "Benzene has 6 π electrons (aromatic). Cyclopentadienyl anion has 6 π electrons (aromatic). Tropylium has 6 π electrons (aromatic).",
      commonTrap: "Assuming COT is planar and antiaromatic; COT is actually non-planar and non-aromatic."
    },
    {
      id: "pyq-2023-02",
      type: "verified-pyq",
      exam: "JEE Main",
      year: 2023,
      session: "Session 1",
      chapterId: "ch-15",
      chapterTitle: "Phenols",
      topic: "Acidity of Substituted Phenols",
      difficulty: "Medium",
      question: "The correct increasing order of pKa values for: (I) p-Nitrophenol, (II) Phenol, (III) p-Cresol, (IV) p-Methoxyphenol is:",
      options: [
        "I < II < III < IV",
        "IV < III < II < I",
        "II < I < III < IV",
        "I < IV < III < II"
      ],
      answer: 0,
      conceptTested: "Substituent effects on phenol acidity and pKa relationship.",
      approach: "Stronger acid = lower pKa. Electron-withdrawing groups (–NO₂) increase acidity (lower pKa). Electron-donating groups (+I, +R) decrease acidity (raise pKa).",
      explanation: "–NO₂ is strongly electron-withdrawing (-M, -I), making p-nitrophenol the strongest acid (lowest pKa ~7.15). Phenol is next (~9.95). –CH₃ (+I, hyperconjugation) and –OCH₃ (+M > -I) are electron donating, raising pKa. Hence pKa order: I < II < III < IV.",
      wrongOptionsAnalysis: "Option B lists decreasing pKa (increasing acidity) instead of increasing pKa.",
      commonTrap: "Confusing acid strength (which is highest for p-nitrophenol) with pKa value (which is lowest for p-nitrophenol)."
    },
    {
      id: "pyq-style-01",
      type: "jee-main-style",
      exam: "JEE Main",
      year: 2024,
      session: "Practice Specimen",
      chapterId: "ch-00",
      chapterTitle: "Chemistry Foundation",
      topic: "Valency and Electronic Configuration",
      difficulty: "Easy",
      question: "A neutral carbon atom in its ground state has 2 unpaired electrons, yet forms 4 covalent bonds in CH₄. This tetravalency is explained by:",
      options: [
        "Excitation of one 2s electron into the vacant 2pz orbital followed by orbital hybridisation",
        "Loss of 4 electrons to form C⁴⁺",
        "Gain of 4 electrons to form C⁴⁻",
        "Formation of coordinate bonds only"
      ],
      answer: 0,
      conceptTested: "Ground state vs excited state carbon and hybridisation.",
      approach: "Review ground state (1s² 2s² 2px¹ 2py¹ 2pz⁰) vs excited state (1s² 2s¹ 2px¹ 2py¹ 2pz¹).",
      explanation: "Promoting one 2s electron to 2pz provides 4 unpaired electrons. The energy required for promotion is compensated by the release of energy when 4 strong covalent bonds form.",
      wrongOptionsAnalysis: "Carbon does not form ionic C⁴⁺ or C⁴⁻ salts due to prohibitively high ionization enthalpy.",
      commonTrap: "Thinking carbon stays in its ground state while bonding."
    },
    {
      id: "pyq-style-02",
      type: "jee-main-style",
      exam: "JEE Main",
      year: 2024,
      session: "Practice Specimen",
      chapterId: "ch-01",
      chapterTitle: "Carbon and Its Compounds",
      topic: "Homologous Series",
      difficulty: "Easy",
      question: "Which of the following pairs belong to the same homologous series?",
      options: [
        "CH₃OH and CH₃CH₂OH",
        "CH₄ and C₂H₄",
        "CH₃OCH₃ and CH₃CH₂OH",
        "CH₃COOH and CH₃CHO"
      ],
      answer: 0,
      conceptTested: "Homologous series definition.",
      approach: "Both compounds must have the same functional group and differ by –CH₂–.",
      explanation: "CH₃OH (methanol) and CH₃CH₂OH (ethanol) are both aliphatic primary alcohols differing by exactly one –CH₂– unit.",
      wrongOptionsAnalysis: "CH₄ is an alkane, C₂H₄ is an alkene. Ether and alcohol are functional isomers, not homologs. Carboxylic acid and aldehyde are different functional groups.",
      commonTrap: "Confusing functional isomers (same formula, different groups) with homologs (same group, different carbon chain length)."
    }
  ];

  return {
    QUESTIONS
  };
})();
