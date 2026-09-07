/**
 * JEE MAIN ORGANIC CHEMISTRY - REAGENTS MASTER REFERENCE
 * Comprehensive catalog of reducing, oxidizing, halogenating, and dehydrating agents.
 */

window.CHEM_REAGENTS = [
  {
    name: "Lithium Aluminium Hydride (LiAlH₄ / LAH)",
    category: "Reducing Agent",
    solvent: "Dry ether or THF (Violently decomposes in water or alcohol)",
    reduces: "Aldehydes, ketones, carboxylic acids, esters, acid chlorides, anhydrides, amides, nitriles, nitro groups, azides, and alkyl halides.",
    exceptions: "Does NOT reduce isolated non-conjugated carbon-carbon double (C=C) or triple (C≡C) bonds (reduces only C=C conjugated with phenyl such as cinnamaldehyde to cinnamyl alcohol).",
    products: "Acids/esters → Primary alcohols; Ketones → Secondary alcohols; Amides/nitriles/nitro → Amines.",
    jeeTrick: "Strongest nucleophilic hydride donor. Converts all carbonyl-oxygen groups (acids, esters, acyl halides) down to alcohols."
  },
  {
    name: "Sodium Borohydride (NaBH₄)",
    category: "Reducing Agent",
    solvent: "Methanol, Ethanol, or aqueous alkaline solution",
    reduces: "ONLY aldehydes, ketones, and acid chlorides.",
    exceptions: "Does NOT reduce carboxylic acids, esters, amides, lactones, or nitro groups. Does NOT reduce double bonds.",
    products: "Aldehydes → 1° Alcohols; Ketones → 2° Alcohols; Acid chlorides → 1° Alcohols.",
    jeeTrick: "Safe, selective hydride donor. If a molecule contains BOTH a ketone and an ester, NaBH₄ selectively reduces ONLY the ketone, leaving the ester untouched!"
  },
  {
    name: "Pyridinium Chlorochromate (PCC / Corey's Reagent)",
    category: "Oxidizing Agent",
    solvent: "Anhydrous CH₂Cl₂ (Dichloromethane)",
    oxidizes: "Primary (1°) alcohols to Aldehydes; Secondary (2°) alcohols to Ketones.",
    exceptions: "Stops oxidation at aldehyde without over-oxidizing to carboxylic acid (unlike aqueous KMnO₄ or H₂CrO₄). Does not affect double bonds.",
    products: "1° Alcohol → Aldehyde; 2° Alcohol → Ketone.",
    jeeTrick: "The reagent of choice for R–CH₂OH → R–CHO. Also useful: Pyridinium dichromate (PDC) and Dess-Martin Periodinane (DMP)."
  },
  {
    name: "Potassium Permanganate (Alkaline / Acidic KMnO₄)",
    category: "Powerful Oxidizing Agent",
    solvent: "Water / Dilute acid or base",
    oxidizes: "Alkenes (cleaves to ketones/carboxylic acids on hot conditions), 1° alcohols to carboxylic acids, alkylbenzenes with benzylic hydrogen to Benzoic acid.",
    exceptions: "tert-Butylbenzene cannot be oxidized to benzoic acid because it lacks benzylic hydrogen!",
    products: "Toluene → Benzoic acid; 1° Alcohol → Carboxylic acid; Secondary Alcohol → Ketone.",
    jeeTrick: "Cold, dilute, alkaline KMnO₄ is Baeyer's Reagent (pink/purple), which adds syn-dihydroxylation (cis-vicinal diol) across alkenes with decolorization (test for unsaturation)."
  },
  {
    name: "Lindlar's Catalyst (Pd / CaCO₃ poisoned with Pb(OAc)₂ & Quinoline)",
    category: "Selective Hydrogenation Catalyst",
    solvent: "Methanol or hexane",
    reduces: "Alkynes (C≡C) selectively to cis-Alkenes (Z-alkene).",
    exceptions: "Does not reduce alkenes to alkanes due to catalyst poisoning.",
    products: "R–C≡C–R' + H₂ → cis-Alkene (syn addition of hydrogen).",
    jeeTrick: "Lindlar's gives cis-alkene (syn addition). In contrast, Birch Reduction (Na in liquid NH₃) gives trans-alkene (anti addition)!"
  },
  {
    name: "Grignard Reagent (R–Mg–X)",
    category: "Organometallic Nucleophile / Strong Base",
    solvent: "Strictly anhydrous dry ether (moisture destroys it to RH alkane)",
    reactsWith: "Carbonyls (HCHO → 1° alcohol; RCHO → 2° alcohol; R₂CO → 3° alcohol; Esters → 3° alcohol; CO₂ → Carboxylic acid).",
    exceptions: "Reacts violently with ANY compound containing acidic hydrogen (H₂O, ROH, RCOOH, RNH₂, terminal alkynes), producing RH alkane.",
    products: "Nucleophilic addition to carbonyls creating new C–C bonds.",
    jeeTrick: "Formaldehyde + RMgX → 1° alcohol; Any other aldehyde + RMgX → 2° alcohol; Ketone + RMgX → 3° alcohol."
  }
];
