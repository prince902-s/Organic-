/**
 * JEE MAIN ORGANIC CHEMISTRY - DEFINITIONS DICTIONARY & INTERACTIVE POPUP ENGINE
 * Central dictionary for chemistry terminology with interactive dotted-underline tooltips/popups.
 */

window.CHEM_DEFINITIONS = {
  "atom": {
    term: "Atom",
    definition: "The smallest constituent unit of ordinary matter that retains the chemical identity of an element. It consists of a dense central nucleus surrounded by an electron cloud.",
    example: "A carbon atom has 6 protons, 6 neutrons, and 6 electrons."
  },
  "subatomic particles": {
    term: "Subatomic Particles",
    definition: "The fundamental particles that make up an atom: positively charged protons and neutral neutrons inside the nucleus, and negatively charged electrons orbiting outside.",
    example: "Protons (+1), Neutrons (0), Electrons (-1)."
  },
  "proton": {
    term: "Proton",
    definition: "A subatomic particle in the atomic nucleus with a positive electric charge of +1 elementary charge and a mass of approximately 1 atomic mass unit (amu).",
    example: "The number of protons uniquely defines the atomic number (Z)."
  },
  "neutron": {
    term: "Neutron",
    definition: "A neutral subatomic particle in the atomic nucleus with zero electric charge and a mass approximately equal to that of a proton (~1 amu).",
    example: "Carbon-12 has 6 neutrons; Carbon-14 has 8 neutrons."
  },
  "electron": {
    term: "Electron",
    definition: "A subatomic particle carrying a negative elementary charge (-1) with very small mass (~1/1836 of a proton). Outermost electrons govern all chemical bonding.",
    example: "Carbon has 6 total electrons; 4 of them are valence electrons."
  },
  "valence electron": {
    term: "Valence Electrons",
    definition: "Electrons located in the outermost occupied electron shell of an atom. They are the only electrons directly involved in forming chemical bonds.",
    example: "Carbon has 4 valence electrons; Oxygen has 6; Nitrogen has 5."
  },
  "valence electrons": {
    term: "Valence Electrons",
    definition: "Electrons located in the outermost occupied electron shell of an atom. They are the only electrons directly involved in forming chemical bonds.",
    example: "Carbon has 4 valence electrons; Oxygen has 6; Nitrogen has 5."
  },
  "valency": {
    term: "Valency",
    definition: "The combining capacity of an atom, measured by the number of chemical bonds it can form with other atoms to achieve a stable noble gas electron octet.",
    example: "Carbon is tetravalent (valency = 4); Oxygen is divalent (valency = 2); Hydrogen is monovalent (valency = 1)."
  },
  "octet rule": {
    term: "Octet Rule",
    definition: "The chemical principle that main-group atoms tend to gain, lose, or share electrons until they are surrounded by eight valence electrons (resembling a stable noble gas).",
    example: "In methane (CH₄), carbon shares 4 electron pairs, completing its 8-electron octet."
  },
  "octet": {
    term: "Octet",
    definition: "A stable arrangement of eight electrons in the outermost electron shell of an atom.",
    example: "Neon and Argon have an outermost octet (s²p⁶) and are completely inert."
  },
  "duplet": {
    term: "Duplet",
    definition: "A stable outer shell configuration of two electrons, characteristic of Helium and achieved by Hydrogen through bonding.",
    example: "Hydrogen shares one electron pair in H₂ to achieve a stable duplet."
  },
  "atomic number": {
    term: "Atomic Number (Z)",
    definition: "The total number of protons found in the nucleus of every atom of a given chemical element. It uniquely identifies the element.",
    example: "Carbon has Z = 6; Nitrogen has Z = 7; Oxygen has Z = 8."
  },
  "mass number": {
    term: "Mass Number (A)",
    definition: "The integer sum of the number of protons and neutrons in an atomic nucleus: A = Z + N.",
    example: "Carbon-12 has mass number A = 12 (6 protons + 6 neutrons)."
  },
  "isotope": {
    term: "Isotope",
    definition: "Atoms of the same chemical element having the same atomic number (protons) but different mass numbers due to differing counts of neutrons.",
    example: "¹H (Protium) has 0 neutrons, ²H (Deuterium) has 1 neutron; both behave similarly in organic reactions."
  },
  "isotopes": {
    term: "Isotopes",
    definition: "Atoms of the same element with the same number of protons but different numbers of neutrons.",
    example: "¹²C, ¹³C, and radioactive ¹⁴C are isotopes of carbon."
  },
  "element": {
    term: "Element",
    definition: "A pure chemical substance composed of only one type of atom that cannot be broken down into simpler substances by ordinary chemical methods.",
    example: "Carbon (C), Hydrogen (H), Nitrogen (N), Oxygen (O)."
  },
  "compound": {
    term: "Compound",
    definition: "A pure substance formed when two or more different chemical elements are chemically bonded together in fixed stoichiometric proportions by mass.",
    example: "Ethanol (C₂H₅OH) is a compound made of C, H, and O in a fixed 2:6:1 ratio."
  },
  "mixture": {
    term: "Mixture",
    definition: "A physical combination of two or more substances that are not chemically bonded and retain their individual physical and chemical properties.",
    example: "Air is a mixture of N₂, O₂, Ar, and CO₂ gases."
  },
  "covalent bond": {
    term: "Covalent Bond",
    definition: "A chemical bond formed by the mutual sharing of one or more pairs of electrons between two nonmetal atoms.",
    example: "In H–C bonds, carbon shares one electron with hydrogen's one electron."
  },
  "covalent bonding": {
    term: "Covalent Bonding",
    definition: "The process of joining atoms together through the sharing of valence electron pairs.",
    example: "Virtually all bonds in organic chemistry are covalent bonds."
  },
  "ionic bond": {
    term: "Ionic Bond",
    definition: "A chemical bond formed through electrostatic attraction between oppositely charged ions, formed by the complete transfer of one or more valence electrons.",
    example: "Sodium chloride (Na⁺ Cl⁻) is held by ionic bonding."
  },
  "coordinate bond": {
    term: "Coordinate (Dative) Bond",
    definition: "A type of covalent bond where both shared electrons in the bond are donated by only one of the participating atoms.",
    example: "In ammonium ion (NH₄⁺), the lone pair on NH₃ forms a coordinate bond with H⁺."
  },
  "electronegativity": {
    term: "Electronegativity",
    definition: "The relative tendency or ability of a bonded atom to attract shared electron pairs towards itself in a covalent bond.",
    example: "Pauling scale: F (4.0) > O (3.5) > N (3.0) ≈ Cl (3.0) > Br (2.8) > C (2.5) > H (2.1)."
  },
  "polar bond": {
    term: "Polar Covalent Bond",
    definition: "A covalent bond between two atoms with differing electronegativities, resulting in an unequal sharing of electrons and partial charges (δ+ and δ-).",
    example: "In a C–Cl bond, chlorine pulls electron density, creating C(δ+) and Cl(δ-)."
  },
  "polar molecule": {
    term: "Polar Molecule",
    definition: "A molecule possessing a net non-zero dipole moment due to asymmetric arrangement of polar bonds.",
    example: "Water (H₂O) has a bent shape and is polar (μ > 0); CCl₄ is tetrahedral and non-polar (μ = 0)."
  },
  "dipole moment": {
    term: "Dipole Moment (μ)",
    definition: "A vector measure of the electrical polarity of a bond or molecule, calculated as charge magnitude times distance (μ = q × d), measured in Debye (D).",
    example: "Trans-1,2-dichloroethene has opposing bond vectors canceling to μ = 0."
  },
  "lewis structure": {
    term: "Lewis Structure",
    definition: "A 2D structural representation of a molecule showing all bonding electron pairs (as lines) and unshared valence electrons (as lone pair dots).",
    example: "Water is drawn as H–Ö–H with two lone pairs on oxygen."
  },
  "formal charge": {
    term: "Formal Charge",
    definition: "The theoretical electric charge assigned to an atom in a molecule, calculated as: Formal Charge = (Valence e⁻) - (Non-bonding e⁻) - ½(Bonding e⁻).",
    example: "In hydronium (H₃O⁺), oxygen has a formal charge of 6 - 2 - 3 = +1."
  },
  "cation": {
    term: "Cation",
    definition: "A positively charged ion formed when a neutral atom or group loses one or more valence electrons.",
    example: "Sodium loses 1 electron to form Na⁺; a carbocation has a positively charged carbon (C⁺)."
  },
  "anion": {
    term: "Anion",
    definition: "A negatively charged ion formed when a neutral atom or group gains one or more electrons.",
    example: "Chloride ion (Cl⁻) and hydroxide ion (OH⁻) are anions."
  },
  "ion": {
    term: "Ion",
    definition: "An atom or group of atoms that has acquired an electric charge by losing or gaining one or more electrons.",
    example: "Cations (+ charge) and Anions (- charge)."
  },
  "electrophile": {
    term: "Electrophile",
    definition: "An electron-deficient species (Lewis acid) that seeks and accepts a pair of electrons from a nucleophile to form a new covalent bond.",
    example: "H⁺, Br⁺, AlCl₃, and carbocations (CH₃⁺) are strong electrophiles."
  },
  "nucleophile": {
    term: "Nucleophile",
    definition: "An electron-rich chemical species (Lewis base) that donates an electron pair to an electrophile to form a chemical bond.",
    example: "OH⁻, CN⁻, NH₃, and H₂O with lone pairs act as nucleophiles."
  },
  "carbocation": {
    term: "Carbocation",
    definition: "A reactive intermediate containing a trivalent carbon atom with a positive charge and only six valence electrons (sp² hybridized, planar).",
    example: "Tertiary carbocation (CH₃)₃C⁺ is far more stable than primary CH₃CH₂⁺."
  },
  "carbanion": {
    term: "Carbanion",
    definition: "A trivalent carbon intermediate carrying a negative charge and an unshared electron pair (total 8 valence electrons, usually sp³ pyramidal).",
    example: "Carbanions act as powerful nucleophiles and strong bases."
  },
  "free radical": {
    term: "Free Radical",
    definition: "A highly reactive chemical species possessing an unpaired electron in its valence shell, formed via homolytic bond cleavage.",
    example: "Chlorine radical (Cl•) in photochemical halogenation of methane."
  },
  "hybridisation": {
    term: "Hybridisation",
    definition: "The theoretical intermixing of atomic orbitals of slightly different energies to produce a new set of equivalent hybrid orbitals with specific spatial geometry.",
    example: "Carbon forms sp³ (tetrahedral, 109.5°), sp² (trigonal planar, 120°), or sp (linear, 180°)."
  },
  "sigma bond": {
    term: "Sigma (σ) Bond",
    definition: "A strong covalent bond formed by the direct head-on (axial) overlap of atomic or hybrid orbitals along the internuclear axis.",
    example: "Every single covalent bond in an organic molecule is a sigma bond."
  },
  "pi bond": {
    term: "Pi (π) Bond",
    definition: "A covalent bond formed by the lateral (sideways) overlap of parallel unhybridized p-orbitals above and below the internuclear axis.",
    example: "A carbon-carbon double bond (C=C) consists of one strong σ bond and one weaker π bond."
  },
  "resonance": {
    term: "Resonance",
    definition: "The phenomenon where a molecule cannot be adequately represented by a single Lewis structure, but rather exists as a hybrid of two or more canonical forms involving delocalized pi electrons.",
    example: "In benzene, the double bonds are delocalized across all 6 carbons in a uniform ring."
  },
  "inductive effect": {
    term: "Inductive Effect (I-effect)",
    definition: "The permanent polarization of sigma bonds induced by the electronegativity difference between an atom or group and the rest of the carbon chain.",
    example: "-I groups (like -NO₂, -F, -Cl) pull electron density; +I groups (alkyl groups) push electron density."
  },
  "hyperconjugation": {
    term: "Hyperconjugation",
    definition: "The stabilizing interaction involving delocalization of electrons from a C–H sigma bond into an adjacent empty or partially filled p-orbital (no-bond resonance).",
    example: "More alpha-hydrogens (α-H) provide greater hyperconjugative stability to carbocations and alkenes."
  },
  "aromaticity": {
    term: "Aromaticity",
    definition: "A special thermodynamic stabilization exhibited by completely conjugated, cyclic, planar molecules containing (4n + 2) π-electrons (Hückel's Rule).",
    example: "Benzene (6 π-electrons, n=1) is aromatic and resists simple addition reactions."
  },
  "isomerism": {
    term: "Isomerism",
    definition: "The phenomenon in which two or more chemical compounds have the exact same molecular formula but different structural arrangements or 3D spatial orientations.",
    example: "Butane (straight chain) and 2-methylpropane (branched chain) are structural isomers of C₄H₁₀."
  },
  "chiral center": {
    term: "Chiral (Asymmetric) Center",
    definition: "A tetrahedral atom (usually carbon) bonded to four entirely different atoms or groups, rendering the molecule non-superimposable on its mirror image.",
    example: "Lactic acid has a chiral carbon bonded to –H, –OH, –CH₃, and –COOH."
  },
  "enantiomers": {
    term: "Enantiomers",
    definition: "A pair of stereoisomers that are non-superimposable mirror images of each other, rotating plane-polarized light in equal and opposite directions (+ and -).",
    example: "D-lactic acid and L-lactic acid are enantiomers."
  },
  "oxidation": {
    term: "Oxidation in Organic Chemistry",
    definition: "A chemical transformation resulting in an increase in the oxidation state of carbon, commonly seen as an increase in C–O, C–N, or C–X bonds and/or loss of C–H bonds.",
    example: "Primary alcohol (–CH₂OH) oxidizes to aldehyde (–CHO) and then to carboxylic acid (–COOH)."
  },
  "reduction": {
    term: "Reduction in Organic Chemistry",
    definition: "A chemical transformation resulting in a decrease in the oxidation state of carbon, typically manifested as gain of C–H bonds and/or loss of C–O or C–X bonds.",
    example: "Hydrogenation of ethene (CH₂=CH₂) with H₂/Ni gives ethane (CH₃–CH₃)."
  },
  "catenation": {
    term: "Catenation",
    definition: "The unique ability of atoms of an element (especially carbon) to link together via strong covalent bonds to form long continuous chains, branched trees, and rings.",
    example: "Carbon's high C–C bond energy (~348 kJ/mol) enables millions of stable organic structures."
  },
  "markovnikov's rule": {
    term: "Markovnikov's Rule",
    definition: "In the electrophilic addition of an unsymmetrical reagent (like H–X) to an unsymmetrical alkene, the electrophilic proton (H⁺) adds to the carbon with more hydrogen atoms to form the more stable carbocation.",
    example: "CH₃–CH=CH₂ + HBr → CH₃–CH(Br)–CH₃ (2-bromopropane as major product)."
  }
};

window.Definitions = (function() {
  let modalElement = null;

  function init() {
    createPopupDOM();
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => {
      if (modalElement && modalElement.classList.contains("active")) {
        const card = modalElement.querySelector(".definition-popup-card");
        if (card && !card.contains(e.target) && !e.target.classList.contains("def-term")) {
          close();
        }
      }
    });
  }

  function createPopupDOM() {
    if (document.getElementById("chem-def-modal")) return;
    const div = document.createElement("div");
    div.id = "chem-def-modal";
    div.className = "definition-popup-overlay";
    div.innerHTML = `
      <div class="definition-popup-card" role="dialog" aria-modal="true">
        <div class="definition-popup-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;">📖</span>
            <span class="definition-popup-title" id="def-title">Term</span>
          </div>
          <button class="definition-popup-close" onclick="Definitions.close()" aria-label="Close">✕</button>
        </div>
        <div class="definition-popup-body">
          <p class="definition-popup-text" id="def-text"></p>
          <div class="definition-popup-example" id="def-example-box">
            <strong style="color:var(--primary);font-size:12px;text-transform:uppercase;letter-spacing:0.04em;">Example:</strong>
            <span id="def-example" style="display:block;margin-top:2px;"></span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    modalElement = div;
  }

  function show(termKey, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!modalElement) createPopupDOM();

    const normalizedKey = termKey.toLowerCase().trim();
    const item = window.CHEM_DEFINITIONS[normalizedKey];
    if (!item) return;

    document.getElementById("def-title").textContent = item.term;
    document.getElementById("def-text").textContent = item.definition;

    const exBox = document.getElementById("def-example-box");
    const exSpan = document.getElementById("def-example");
    if (item.example) {
      exSpan.textContent = item.example;
      exBox.style.display = "block";
    } else {
      exBox.style.display = "none";
    }

    modalElement.classList.add("active");
  }

  function close() {
    if (modalElement) {
      modalElement.classList.remove("active");
    }
  }

  // Helper to enrich raw text with dotted-underline spans for defined terms
  function enrich(html) {
    if (!html || typeof html !== "string") return html;
    // Common terms to auto-mark if not already in tags
    const terms = [
      "valence electrons", "valence electron", "valency", "octet rule", "electronegativity",
      "polar covalent bond", "covalent bond", "ionic bond", "electrophile", "electrophiles",
      "nucleophile", "nucleophiles", "carbocation", "carbanion", "free radical",
      "hybridisation", "sigma bond", "pi bond", "resonance", "inductive effect",
      "hyperconjugation", "aromaticity", "catenation", "isotope", "isotopes",
      "atomic number", "mass number", "markovnikov's rule", "enantiomers", "chiral center"
    ];

    let result = html;
    terms.forEach(term => {
      // Negative lookbehind and lookahead to avoid matching inside HTML tags or attributes
      const regex = new RegExp(`(?<!<[^>]*)(\\b${term}\\b)(?![^<]*>)`, "gi");
      result = result.replace(regex, (match) => {
        return `<span class="def-term" onclick="Definitions.show('${term.toLowerCase()}', event)" title="Click for definition">${match}</span>`;
      });
    });

    return result;
  }

  // Auto-init on DOM load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {
    show,
    close,
    enrich
  };
})();
