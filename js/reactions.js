/**
 * JEE MAIN ORGANIC CHEMISTRY - NAMED REACTIONS LIBRARY
 * Authentic catalog with Reactants, Reagents, Conditions, Products, Mechanisms, and JEE Tricks.
 */

window.CHEM_REACTIONS = [
  {
    id: "rxn-01",
    name: "Aldol Condensation & Cross Aldol",
    chapter: "Aldehydes & Ketones (Ch 17)",
    reactants: "Aldehydes or Ketones containing at least one α-hydrogen",
    reagent: "Dilute NaOH or Ba(OH)₂ (Base catalyzed)",
    conditions: "Warm / Heat (for dehydration)",
    products: "β-Hydroxyaldehyde/ketone (Aldol) → α,β-Unsaturated carbonyl compound upon heating",
    mechanism: "Enolate ion formation via α-H abstraction → Nucleophilic addition of enolate to another carbonyl carbon → Protonation to β-hydroxy compound → E1cB dehydration to conjugate enone.",
    exceptions: "Compounds lacking α-hydrogen (e.g. HCHO, C₆H₅CHO) cannot undergo self-aldol (they undergo Cannizzaro reaction instead).",
    jeeTrick: "To quickly find the dehydration product: Place two molecules side-by-side, take the C=O of molecule 1 and two α-H's of molecule 2, remove H₂O, and join with a double bond (=C–C=C–C=O).",
    relatedReactions: ["Cannizzaro Reaction", "Claisen-Schmidt Condensation", "Perkin Reaction"]
  },
  {
    id: "rxn-02",
    name: "Cannizzaro Reaction & Cross Cannizzaro",
    chapter: "Aldehydes & Ketones (Ch 17)",
    reactants: "Aldehydes having NO α-hydrogen (e.g. Benzaldehyde, Formaldehyde, Pivalaldehyde)",
    reagent: "Concentrated (50%) NaOH or KOH",
    conditions: "High base concentration, room temperature or mild heating",
    products: "1 mole oxidized to Carboxylate salt + 1 mole reduced to Alcohol (Disproportionation / Redox)",
    mechanism: "Nucleophilic attack of OH⁻ on carbonyl C → Hydride transfer (:H⁻) from tetrahedral intermediate to a second aldehyde molecule (Rate Determining Step) → Acid-base proton transfer.",
    exceptions: "If mixed with formaldehyde (HCHO), HCHO is always preferentially oxidized to formate (HCOONa) because it has the most electrophilic, sterically unhindered carbonyl carbon (Cross Cannizzaro).",
    jeeTrick: "In Cross Cannizzaro between Formaldehyde and Benzaldehyde: Formaldehyde oxidizes to Formate, Benzaldehyde reduces to Benzyl Alcohol.",
    relatedReactions: ["Aldol Condensation", "Tischenko Reaction"]
  },
  {
    id: "rxn-03",
    name: "Reimer-Tiemann Reaction",
    chapter: "Phenols (Ch 15)",
    reactants: "Phenol",
    reagent: "CHCl₃ (Chloroform) + aqueous NaOH",
    conditions: "60°C (Reflux)",
    products: "Salicylaldehyde (2-Hydroxybenzaldehyde) as major product",
    mechanism: "Generation of neutral electrophile Dichlorocarbene (:CCl₂) via α-elimination from CHCl₃ → Electrophilic aromatic substitution on phenoxide ortho position → Hydrolysis of –CHCl₂ to –CHO.",
    exceptions: "If CCl₄ (carbon tetrachloride) is used instead of CHCl₃, the major product is Salicylic acid (2-hydroxybenzoic acid) instead of salicylaldehyde!",
    jeeTrick: "Intermediate is Dichlorocarbene (:CCl₂), which has an electron sextet (acts as an electrophile). Ortho isomer predominates due to intramolecular H-bonding in salicylaldehyde.",
    relatedReactions: ["Kolbe's Reaction", "Carbylamine Test"]
  },
  {
    id: "rxn-04",
    name: "Kolbe's Reaction (Kolbe-Schmitt)",
    chapter: "Phenols (Ch 15)",
    reactants: "Sodium phenoxide (C₆H₅ONa)",
    reagent: "CO₂ followed by H⁺ (Acidification)",
    conditions: "120–140°C under 4–7 atm pressure",
    products: "Salicylic acid (2-Hydroxybenzoic acid)",
    mechanism: "Phenoxide ion has very high electron density and attacks weak electrophile CO₂ at ortho position → Proton transfer → Acidification yields salicylic acid (precursor for Aspirin).",
    exceptions: "Higher temperature (>200°C) or potassium phenoxide favors the para-hydroxybenzoic acid isomer.",
    jeeTrick: "Reaction with acetic anhydride ((CH₃CO)₂O) in presence of H⁺ converts Salicylic acid into Acetylsalicylic acid (Aspirin, an analgesic/antipyretic).",
    relatedReactions: ["Reimer-Tiemann Reaction", "Aspirin synthesis"]
  },
  {
    id: "rxn-05",
    name: "Williamson Ether Synthesis",
    chapter: "Ethers (Ch 16)",
    reactants: "Sodium alkoxide (R–O⁻Na⁺) + Alkyl halide (R'–X)",
    reagent: "Alcoholic or dry solvent",
    conditions: "Reflux",
    products: "Ether (R–O–R') via SN2 pathway",
    mechanism: "Concerted backside attack of alkoxide ion (nucleophile) on primary alkyl halide, with inversion of configuration.",
    exceptions: "Alkyl halide R'–X MUST be primary (1°) or methyl. If a 3° alkyl halide is used, alkoxide acts as a strong base causing E2 elimination to yield an alkene exclusively!",
    jeeTrick: "To synthesize tert-butyl ethyl ether: Use Sodium tert-butoxide + Ethyl bromide (1° halide). NEVER use tert-butyl bromide + Sodium ethoxide (gives isobutylene via E2)!",
    relatedReactions: ["Alcohol dehydration", "Alkoxymercuration-demercuration"]
  },
  {
    id: "rxn-06",
    name: "Hoffmann Bromamide Degradation",
    chapter: "Amines (Ch 19)",
    reactants: "Primary acid amide (R–CONH₂)",
    reagent: "Br₂ + 4 NaOH (or KOH)",
    conditions: "Heating",
    products: "Primary amine (R–NH₂) with ONE LESS carbon atom + Na₂CO₃ + 2 NaBr + 2 H₂O",
    mechanism: "Deprotonation of amide → N-Bromoamide → Loss of proton and bromide with simultaneous alkyl group migration from carbonyl to nitrogen (Nitrene intermediate / Isocyanate R–N=C=O) → Alkaline hydrolysis yields primary amine.",
    exceptions: "Only primary amides undergo this reaction. Secondary or tertiary amides do not react because they lack two acidic N–H protons.",
    jeeTrick: "This is a step-down reaction (removes 1 carbon atom). Retention of configuration occurs at the migrating chiral center (R group).",
    relatedReactions: ["Curtius Rearrangement", "Lossen Rearrangement", "Schmidt Reaction"]
  },
  {
    id: "rxn-07",
    name: "Gabriel Phthalimide Synthesis",
    chapter: "Amines (Ch 19)",
    reactants: "Phthalimide + KOH + Primary alkyl halide (R–X)",
    reagent: "Hydrazine (H₂NNH₂) or alkaline hydrolysis (NaOH/H₂O)",
    conditions: "Reflux",
    products: "Pure aliphatic primary (1°) amine (R–NH₂)",
    mechanism: "Phthalimide deprotonated by KOH → Potassium phthalimide nucleophile attacks 1° alkyl halide via SN2 → N-alkylphthalimide cleaved by hydrazine or base to give 1° amine.",
    exceptions: "Aromatic primary amines (Aniline, C₆H₅NH₂) CANNOT be prepared by this method because aryl halides do not undergo nucleophilic substitution (SN2) with phthalimide anion.",
    jeeTrick: "Exclusively yields pure 1° aliphatic amines without contamination by 2° or 3° amines (unlike simple ammonolysis).",
    relatedReactions: ["Hoffmann Degradation", "Ammonolysis of Halides"]
  },
  {
    id: "rxn-08",
    name: "Sandmeyer and Gattermann Reactions",
    chapter: "Diazonium Salts (Ch 20)",
    reactants: "Benzenediazonium chloride (C₆H₅N₂⁺Cl⁻)",
    reagent: "Cu₂Cl₂/HCl (for Chlorobenzene), Cu₂Br₂/HBr (for Bromobenzene), CuCN/KCN (for Benzonitrile)",
    conditions: "0–5°C initial preparation, then warm",
    products: "Aryl halides (C₆H₅Cl, C₆H₅Br) or Aryl cyanide (C₆H₅CN) with evolution of N₂ gas",
    mechanism: "Single electron transfer from cuprous ion (Cu⁺) generating an aryl radical, followed by halogen atom transfer.",
    exceptions: "For Iodobenzene (C₆H₅I), no copper catalyst is needed! Simply warming diazonium salt with aqueous KI gives iodobenzene cleanly.",
    jeeTrick: "Sandmeyer uses Cuprous salts (Cu₂X₂/HX); Gattermann uses Copper powder (Cu/HX). Sandmeyer gives significantly higher yield.",
    relatedReactions: ["Balz-Schiemann Reaction (for Ar-F)", "Gomberg-Bachmann Reaction"]
  }
];
