export interface FoodWaterItem {
  id: string;
  name: string;
  category: "Frutta" | "Verdura" | "Cereali" | "Uova e Latticini" | "Carni" | "Frutta secca e Cacao";
  waterLPerKg: number;
  greenPct: number;
  bluePct: number;
  greyPct: number;
  co2eKgPerKg: number;
  standardServingG: number;
  waterSource: string;
  carbonSource: string;
  explanation: string;
  variabilityNote: string;
}

/*
 * DATI SCIENTIFICI DOCUMENTATI:
 * - Impronta idrica (L/kg): Mekonnen & Hoekstra (2011), Water Footprint Network (WFN) – medie globali ponderate.
 * - Impronta di carbonio (kg CO2e/kg): Poore & Nemecek (2018), Science 360(6392) / sintesi FAO GLEAM.
 * Tutti i valori sono espressi in unita coerenti per 1 kg di alimento e segnalati come stime medie indicative.
 */
export const FOODS_WATER_DATA: FoodWaterItem[] = [
  {
    id: "pomodoro",
    name: "Pomodoro",
    category: "Verdura",
    waterLPerKg: 214,
    greenPct: 50,
    bluePct: 30,
    greyPct: 20,
    co2eKgPerKg: 1.4,
    standardServingG: 150,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Ortaggio ad alto contenuto d'acqua naturale con impronta idrica tra le più basse per chilogrammo.",
    variabilityNote: "In serra riscaldata fuori stagione le emissioni di CO₂e salgono molto rispetto al pieno campo estivo."
  },
  {
    id: "patata",
    name: "Patata",
    category: "Verdura",
    waterLPerKg: 287,
    greenPct: 67,
    bluePct: 11,
    greyPct: 22,
    co2eKgPerKg: 0.5,
    standardServingG: 200,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Alimento energetico di base con consumo d'acqua ed emissioni particolarmente contenuti.",
    variabilityNote: "Dipende dal clima locale e dall'eventuale irrigazione estiva."
  },
  {
    id: "arancia",
    name: "Arancia",
    category: "Frutta",
    waterLPerKg: 560,
    greenPct: 72,
    bluePct: 20,
    greyPct: 8,
    co2eKgPerKg: 0.4,
    standardServingG: 150,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Frutto tipico mediterraneo autunnale-invernale con ottimo apporto vitaminico e basso impatto.",
    variabilityNote: "Gli agrumi di stagione locali riducono fortemente trasporti e celle frigorifere."
  },
  {
    id: "mela",
    name: "Mela",
    category: "Frutta",
    waterLPerKg: 822,
    greenPct: 68,
    bluePct: 16,
    greyPct: 16,
    co2eKgPerKg: 0.4,
    standardServingG: 150,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Una mela da 150 g equivale a circa 123 litri di acqua virtuale indicativa.",
    variabilityNote: "La conservazione prolungata in celle refrigerate aumenta leggermente i consumi elettrici."
  },
  {
    id: "latte",
    name: "Latte vaccino",
    category: "Uova e Latticini",
    waterLPerKg: 1020,
    greenPct: 85,
    bluePct: 8,
    greyPct: 7,
    co2eKgPerKg: 3.0,
    standardServingG: 250,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Circa 255 litri per un bicchiere da 250 ml, legati soprattutto al foraggio delle vacche.",
    variabilityNote: "Varia tra allevamenti al pascolo (prevalenza acqua verde) e stalla con mangimi irrigui."
  },
  {
    id: "pane",
    name: "Pane di frumento",
    category: "Cereali",
    waterLPerKg: 1608,
    greenPct: 70,
    bluePct: 19,
    greyPct: 11,
    co2eKgPerKg: 1.4,
    standardServingG: 60,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science (prodotti da grano)",
    explanation: "Quasi tutta l'acqua serve nei campi per coltivare il grano prima di molitura e forno.",
    variabilityNote: "Il grano duro collinare in asciutta usa quasi solo acqua piovana (verde)."
  },
  {
    id: "pasta",
    name: "Pasta di semola",
    category: "Cereali",
    waterLPerKg: 1849,
    greenPct: 71,
    bluePct: 18,
    greyPct: 11,
    co2eKgPerKg: 1.6,
    standardServingG: 80,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science / filiera grano",
    explanation: "Una porzione da 80 g di pasta secca richiede circa 148 litri di acqua virtuale.",
    variabilityNote: "Cottura efficiente (coperchio e acqua giusta) evita sprechi energetici domestici."
  },
  {
    id: "riso",
    name: "Riso",
    category: "Cereali",
    waterLPerKg: 2497,
    greenPct: 46,
    bluePct: 40,
    greyPct: 14,
    co2eKgPerKg: 4.0,
    standardServingG: 80,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Richiede molta acqua blu irrigua; le risaie allagate emettono inoltre gas metano.",
    variabilityNote: "Tecniche di irrigazione intermittente possono ridurre sia acqua sia metano."
  },
  {
    id: "formaggio",
    name: "Formaggio stagionato",
    category: "Uova e Latticini",
    waterLPerKg: 3178,
    greenPct: 84,
    bluePct: 9,
    greyPct: 7,
    co2eKgPerKg: 21.2,
    standardServingG: 50,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Occorrono circa 8–10 litri di latte per 1 kg di formaggio stagionato.",
    variabilityNote: "Alta impronta di carbonio rispetto al latte fluido a causa della concentrazione di massa."
  },
  {
    id: "uovo",
    name: "Uovo",
    category: "Uova e Latticini",
    waterLPerKg: 3265,
    greenPct: 79,
    bluePct: 8,
    greyPct: 13,
    co2eKgPerKg: 4.5,
    standardServingG: 60,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Un uovo da 60 g equivale a circa 196 litri indicativi dovuti ai cereali del mangime.",
    variabilityNote: "Tra le proteine animali ha un'impronta di carbonio molto inferiore alla carne rossa."
  },
  {
    id: "pollo",
    name: "Carne di pollo",
    category: "Carni",
    waterLPerKg: 4325,
    greenPct: 82,
    bluePct: 7,
    greyPct: 11,
    co2eKgPerKg: 6.1,
    standardServingG: 120,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Richiede mangimi per tutto il ciclo di crescita, ma molto meno dei bovini.",
    variabilityNote: "La sostenibilità dipende molto dall'origine della soia e dei cereali da mangime."
  },
  {
    id: "maiale",
    name: "Carne di maiale",
    category: "Carni",
    waterLPerKg: 5988,
    greenPct: 82,
    bluePct: 8,
    greyPct: 10,
    co2eKgPerKg: 7.6,
    standardServingG: 120,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Impronta idrica intermedia tra pollo e bovino, legata all'alimentazione suina.",
    variabilityNote: "Porzioni moderate evitano eccedenze e scarti costosi in risorse."
  },
  {
    id: "manzo",
    name: "Carne di manzo",
    category: "Carni",
    waterLPerKg: 15415,
    greenPct: 94,
    bluePct: 3,
    greyPct: 3,
    co2eKgPerKg: 60.0,
    standardServingG: 120,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Richiede grandi quantità di foraggio per 2–3 anni e genera metano ruminale.",
    variabilityNote: "Ampissima variabilità tra pascolo estensivo e allevamenti industriali con mangimi."
  },
  {
    id: "mandorle",
    name: "Mandorle sgusciate",
    category: "Frutta secca e Cacao",
    waterLPerKg: 16095,
    greenPct: 48,
    bluePct: 38,
    greyPct: 14,
    co2eKgPerKg: 2.3,
    standardServingG: 30,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Altissima impronta idrica al kg (si consumano però piccole porzioni da 25–30 g!), ma bassa CO₂e.",
    variabilityNote: "In Sicilia i mandorleti tradizionali non irrigati usano soprattutto acqua verde piovana."
  },
  {
    id: "cioccolato",
    name: "Cioccolato fondente",
    category: "Frutta secca e Cacao",
    waterLPerKg: 17196,
    greenPct: 98,
    bluePct: 1,
    greyPct: 1,
    co2eKgPerKg: 18.7,
    standardServingG: 25,
    waterSource: "Water Footprint Network (Mekonnen & Hoekstra, 2011)",
    carbonSource: "Poore & Nemecek (2018), Science",
    explanation: "Il cacao richiede molta pioggia tropicale (98% acqua verde) e lunghi processi di lavorazione.",
    variabilityNote: "Un quadratino da 25 g ha circa 430 L: è la quantità e l'eventuale spreco a fare la differenza."
  }
];

/* Punteggi nutrizionali semplificati per Pasto Equilibrato (educazione alimentare non restrittiva) */
export interface MealComponent {
  id: string;
  name: string;
  group: "cereali" | "proteine" | "ortaggi" | "frutta";
  servingG: number;
  waterLPerKg: number;
  co2eKgPerKg: number;
  note: string;
}

export const MEAL_BUILDER_ITEMS: MealComponent[] = [
  { id: "m_pasta", name: "Pasta di semola locale (80 g)", group: "cereali", servingG: 80, waterLPerKg: 1849, co2eKgPerKg: 1.6, note: "Carboidrati complessi da grano duro." },
  { id: "m_pane", name: "Pane integrale di borgo (60 g)", group: "cereali", servingG: 60, waterLPerKg: 1608, co2eKgPerKg: 1.4, note: "Ottimo recupero anche se raffermo (crostini)." },
  { id: "m_riso", name: "Riso (80 g)", group: "cereali", servingG: 80, waterLPerKg: 2497, co2eKgPerKg: 4.0, note: "Richiede più acqua blu irrigua rispetto al grano." },
  { id: "m_patate", name: "Patate al forno (180 g)", group: "cereali", servingG: 180, waterLPerKg: 287, co2eKgPerKg: 0.5, note: "Bassa impronta idrica ed energetica." },

  { id: "p_legumi", name: "Lenticchie / Ceci secchi (60 g)", group: "proteine", servingG: 60, waterLPerKg: 4055, co2eKgPerKg: 0.9, note: "WFN medie legumi ~4.055 L/kg (~243 L a porzione); fissano azoto nel suolo." },
  { id: "p_uova", name: "Uova (2 uova · 120 g)", group: "proteine", servingG: 120, waterLPerKg: 3265, co2eKgPerKg: 4.5, note: "Proteine complete a impronta carbonio contenuta." },
  { id: "p_pollo", name: "Pollo (120 g)", group: "proteine", servingG: 120, waterLPerKg: 4325, co2eKgPerKg: 6.1, note: "Impronta inferiore alle carni rosse." },
  { id: "p_formaggio", name: "Formaggio stagionato (50 g)", group: "proteine", servingG: 50, waterLPerKg: 3178, co2eKgPerKg: 21.2, note: "Porzione moderata equilibrata (~159 L acqua)." },
  { id: "p_manzo", name: "Manzo (120 g)", group: "proteine", servingG: 120, waterLPerKg: 15415, co2eKgPerKg: 60.0, note: "Da gustare con equilibrio e zero avanzi (~1.850 L)." },

  { id: "v_pomodoro", name: "Insalata di pomodori di campo (150 g)", group: "ortaggi", servingG: 150, waterLPerKg: 214, co2eKgPerKg: 1.4, note: "Appena ~32 L di acqua virtuale a porzione." },
  { id: "v_verdura", name: "Verdura di stagione cotta (180 g)", group: "ortaggi", servingG: 180, waterLPerKg: 322, co2eKgPerKg: 0.7, note: "WFN media ortaggi ~322 L/kg (~58 L a porzione)." },

  { id: "f_arancia", name: "Arancia locale di stagione (150 g)", group: "frutta", servingG: 150, waterLPerKg: 560, co2eKgPerKg: 0.4, note: "Solo ~84 L di acqua virtuale." },
  { id: "f_mela", name: "Mela di stagione (150 g)", group: "frutta", servingG: 150, waterLPerKg: 822, co2eKgPerKg: 0.4, note: "~123 L di acqua virtuale, zero imballaggi." }
];

/* VILLACOLLE – 22 PRODOTTI ORTOFRUTTICOLI ITALIANI (CREA / stagionalità indicativa) */
export interface SeasonalProduce {
  id: string;
  name: string;
  kind: "Frutta" | "Verdura";
  months: number[]; // 1..12
  localTip: string;
  note: string;
}

export const SEASONAL_PRODUCE: SeasonalProduce[] = [
  { id: "sp_arancia", name: "Arancia", kind: "Frutta", months: [1, 2, 3, 4, 11, 12], localTip: "Agrumeti collinari e della valle siciliana", note: "Massima dolcezza naturale da novembre ad aprile." },
  { id: "sp_mandarino", name: "Mandarino / Clementina", kind: "Frutta", months: [1, 2, 11, 12], localTip: "Frutto simbolo della merenda autunnale", note: "Buccia protettiva naturale: zero plastica." },
  { id: "sp_limone", name: "Limone", kind: "Frutta", months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12], localTip: "Colture storiche siciliane quasi tutto l'anno", note: "Ottimo anche in scorza non trattata per ricette." },
  { id: "sp_mela", name: "Mela", kind: "Frutta", months: [1, 2, 3, 8, 9, 10, 11, 12], localTip: "Mela collinare (es. etnea / italiana)", note: "Si conserva naturalmente al fresco per molti mesi." },
  { id: "sp_pera", name: "Pera", kind: "Frutta", months: [1, 2, 8, 9, 10, 11, 12], localTip: "Varietà locali autunnali", note: "Perfetta sfusa nei mercati rionali." },
  { id: "sp_cachi", name: "Cachi", kind: "Frutta", months: [10, 11, 12], localTip: "Alberi dei giardini contadini di Villacolle", note: "Raccolta tipicamente tra ottobre e dicembre." },
  { id: "sp_kiwi", name: "Kiwi italiano", kind: "Frutta", months: [1, 2, 3, 4, 11, 12], localTip: "Frutticoltura italiana invernale", note: "Fonte naturale di vitamina C in inverno." },
  { id: "sp_fragola", name: "Fragola di pieno campo", kind: "Frutta", months: [4, 5, 6], localTip: "Solo primavera naturale", note: "A novembre/gennaio proviene da serre o paesi lontani." },
  { id: "sp_ciliegia", name: "Ciliegia", kind: "Frutta", months: [5, 6, 7], localTip: "Raccolta di tarda primavera", note: "Periodo brevissimo: fuori stagione comporta lunghi trasporti." },
  { id: "sp_pesca", name: "Pesca / Nettarina", kind: "Frutta", months: [6, 7, 8, 9], localTip: "Frutteti estivi locali", note: "Scegliere in estate per gusto pieno e zero celle." },
  { id: "sp_anguria", name: "Anguria / Melone", kind: "Frutta", months: [6, 7, 8, 9], localTip: "Pieni campi estivi soleggiati", note: "Maturazione naturale estiva." },
  { id: "sp_uva", name: "Uva da tavola", kind: "Frutta", months: [8, 9, 10, 11], localTip: "Vigneti collinari di fine estate-autunno", note: "Ottima merenda sfusa in contenitore rigido." },

  { id: "sp_carciofo", name: "Carciofo", kind: "Verdura", months: [1, 2, 3, 4, 11, 12], localTip: "Orti invernali siciliani e mediterranei", note: "Ortaggio tipico della tradizione rurale." },
  { id: "sp_finocchio", name: "Finocchio", kind: "Verdura", months: [1, 2, 3, 4, 10, 11, 12], localTip: "Orti autunnali e invernali", note: "Croccante e ottimo anche crudo a merenda." },
  { id: "sp_broccolo", name: "Broccolo & Cavolfiore", kind: "Verdura", months: [1, 2, 3, 10, 11, 12], localTip: "Campi invernali della valle", note: "Le foglie e i gambi teneri sono ottimi per ricette anti-spreco." },
  { id: "sp_spinaci", name: "Spinaci", kind: "Verdura", months: [1, 2, 3, 4, 5, 10, 11, 12], localTip: "Ortaggio a foglia fresco di stagione fredda", note: "Meglio sfusi o in mazzi legati." },
  { id: "sp_zucca", name: "Zucca", kind: "Verdura", months: [9, 10, 11, 12, 1], localTip: "Orti autunnali locali", note: "Zero scarti: buccia e semi tostati sono commestibili." },
  { id: "sp_pomodoro", name: "Pomodoro di pieno campo", kind: "Verdura", months: [6, 7, 8, 9], localTip: "Orto estivo naturale", note: "D'inverno richiede serre riscaldate o conserve estive." },
  { id: "sp_zucchina", name: "Zucchina di campo", kind: "Verdura", months: [5, 6, 7, 8, 9], localTip: "Orto estivo", note: "Fuori stagione arriva da serre o trasporti lunghi." },
  { id: "sp_melanzana", name: "Melanzana", kind: "Verdura", months: [6, 7, 8, 9, 10], localTip: "Orto estivo-primo autunno", note: "Evita gli acquisti in pieno inverno." },
  { id: "sp_peperone", name: "Peperone", kind: "Verdura", months: [6, 7, 8, 9, 10], localTip: "Orto soleggiato estivo", note: "Coltivazione estiva naturale." },
  { id: "sp_carota", name: "Carota", kind: "Verdura", months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], localTip: "Radice italiana disponibile tutto l'anno", note: "Ottimo snack croccante nel portamerenda." }
];

/* VILLACOLLE A3 & COMUNE A6 – PRODOTTI SUPERMERCATO E SPESA KM ZERO */
export interface SupermarketProduct {
  id: string;
  pairGroup: string;
  name: string;
  originTier: "locale" | "italia" | "europa" | "extraue";
  originLabel: string;
  km: number;
  productionType: string;
  seasonal: boolean;
  seasonLabel: string;
  packagingDesc: string;
  packagingGrams: number;
  waterL: number;
  energyIndicator: number; // Indicatore didattico esplicito 1..5 (dichiarato!)
  priceEur: number;
  isBetterChoice: boolean;
  ruleReason: string;
}

export const SUPERMARKET_CATALOG: SupermarketProduct[] = [
  {
    id: "acqua_bott",
    pairGroup: "Bevanda",
    name: "Acqua minerale in bottiglia PET (0,5 L × 2)",
    originTier: "italia",
    originLabel: "Altra regione italiana (~450 km)",
    km: 450,
    productionType: "Imbottigliamento industriale",
    seasonal: true,
    seasonLabel: "Sempre disponibile",
    packagingDesc: "2 bottiglie plastica PET 1 usa e getta",
    packagingGrams: 36,
    waterL: 3,
    energyIndicator: 4,
    priceEur: 1.40,
    isBetterChoice: false,
    ruleReason: "Plastica monouso + trasporto su gomma di liquidi pesanti."
  },
  {
    id: "acqua_borraccia",
    pairGroup: "Bevanda",
    name: "Ricarica acqua potabile di rete in borraccia (1 L)",
    originTier: "locale",
    originLabel: "Rete idrica locale (0 km)",
    km: 0,
    productionType: "Acquedotto locale controllato",
    seasonal: true,
    seasonLabel: "Sempre disponibile",
    packagingDesc: "Borraccia riutilizzabile (0 g scarto)",
    packagingGrams: 0,
    waterL: 1,
    energyIndicator: 1,
    priceEur: 0.05,
    isBetterChoice: true,
    ruleReason: "Zero plastica monouso e zero chilometri su strada."
  },
  {
    id: "succo_brick",
    pairGroup: "Bevanda Frutta",
    name: "6 Mini-brick succo con cannuccia (1,2 L tot)",
    originTier: "europa",
    originLabel: "Impianto europeo (~1.200 km)",
    km: 1200,
    productionType: "Succo trasformato in poliaccoppiato",
    seasonal: false,
    seasonLabel: "Concentrato tutto l'anno",
    packagingDesc: "6 brick C/PAP + pellicola + 6 cannucce",
    packagingGrams: 92,
    waterL: 1100,
    energyIndicator: 4,
    priceEur: 2.90,
    isBetterChoice: false,
    ruleReason: "Elevata tara poliaccoppiata difficile da separare e molte porzioni."
  },
  {
    id: "spremuta_local",
    pairGroup: "Bevanda Frutta",
    name: "Arance locali sfuse da spremuta (1,5 kg)",
    originTier: "locale",
    originLabel: "Produttore locale (<25 km)",
    km: 20,
    productionType: "Agrumeto naturale di stagione",
    seasonal: true,
    seasonLabel: "Di stagione (novembre)",
    packagingDesc: "Sfuse in borsa di tela (0 g plastica)",
    packagingGrams: 0,
    waterL: 840,
    energyIndicator: 1,
    priceEur: 2.10,
    isBetterChoice: true,
    ruleReason: "Filiera corta, zero involucri e vitamine fresche (WFN ~560 L/kg)."
  },
  {
    id: "fragole_fuori",
    pairGroup: "Frutta",
    name: "Fragole fuori stagione in vaschetta (400 g)",
    originTier: "extraue",
    originLabel: "Paese extraeuropeo / serra (~4.500 km)",
    km: 4500,
    productionType: "Serra riscaldata o trasporto rapido refrigerato",
    seasonal: false,
    seasonLabel: "Fuori stagione (novembre)",
    packagingDesc: "Vaschetta rigida PET + pellicola termosaldata",
    packagingGrams: 28,
    waterL: 138,
    energyIndicator: 5,
    priceEur: 3.80,
    isBetterChoice: false,
    ruleReason: "Massima energia per trasporto/refrigerazione + doppio imballo plastica."
  },
  {
    id: "mele_locali",
    pairGroup: "Frutta",
    name: "Mele e cachi locali sfusi (1 kg)",
    originTier: "locale",
    originLabel: "Produttore locale (<20 km)",
    km: 18,
    productionType: "Coltura stagionale collinare",
    seasonal: true,
    seasonLabel: "Di stagione (novembre)",
    packagingDesc: "Sfusi senza vaschetta (0 g imballo)",
    packagingGrams: 0,
    waterL: 822,
    energyIndicator: 1,
    priceEur: 1.90,
    isBetterChoice: true,
    ruleReason: "Stagionali, senza plastica e filiera corta."
  },
  {
    id: "merendina_tripla",
    pairGroup: "Merenda",
    name: "Confezione 8 merendine incartate singolarmente (320 g)",
    originTier: "italia",
    originLabel: "Stabilimento nazionale (~650 km)",
    km: 650,
    productionType: "Prodotto industriale multi-ingrediente",
    seasonal: true,
    seasonLabel: "Confezionato lunga durata",
    packagingDesc: "Cartone esterno + vassoio + 8 bustine PP",
    packagingGrams: 54,
    waterL: 780,
    energyIndicator: 4,
    priceEur: 3.20,
    isBetterChoice: false,
    ruleReason: "Triplo strato d'imballo e molti ingredienti trasformati."
  },
  {
    id: "pane_forno",
    pairGroup: "Merenda",
    name: "Pane fresco del forno del borgo (500 g)",
    originTier: "locale",
    originLabel: "Forno locale (<5 km)",
    km: 4,
    productionType: "Panificazione artigianale locale",
    seasonal: true,
    seasonLabel: "Sempre fresco",
    packagingDesc: "Sacchetto carta o telo riutilizzabile (5 g)",
    packagingGrams: 5,
    waterL: 804,
    energyIndicator: 2,
    priceEur: 1.60,
    isBetterChoice: true,
    ruleReason: "Imballo minimo compostabile/riciclabile e filiera cortissima."
  },
  {
    id: "bistecca_imp",
    pairGroup: "Proteine",
    name: "Fettine bovine importate in vaschetta (300 g)",
    originTier: "extraue",
    originLabel: "Filiera internazionale (~8.500 km)",
    km: 8500,
    productionType: "Allevamento intensivo + catena del freddo",
    seasonal: true,
    seasonLabel: "Tutto l'anno",
    packagingDesc: "Vaschetta polistirolo PS + assorbente + pellicola",
    packagingGrams: 26,
    waterL: 4625,
    energyIndicator: 5,
    priceEur: 5.90,
    isBetterChoice: false,
    ruleReason: "Altissima impronta idrica (~15.415 L/kg WFN), trasporto lungo e polistirolo."
  },
  {
    id: "legumi_sfusi",
    pairGroup: "Proteine",
    name: "Ceci e lenticchie locali in vetro/sfusi (400 g)",
    originTier: "locale",
    originLabel: "Azienda agricola della valle (<30 km)",
    km: 25,
    productionType: "Agricoltura in rotazione fissatrice d'azoto",
    seasonal: true,
    seasonLabel: "Raccolta secca annuale",
    packagingDesc: "Sacchetto carta o barattolo a rendere (8 g)",
    packagingGrams: 8,
    waterL: 1622,
    energyIndicator: 1,
    priceEur: 2.20,
    isBetterChoice: true,
    ruleReason: "Ottime proteine vegetali, meno CO₂e e quasi zero plastica."
  },
  {
    id: "pomodoro_serra",
    pairGroup: "Ortaggi",
    name: "Pomodorini fuori stagione in vaschetta (500 g)",
    originTier: "europa",
    originLabel: "Serra riscaldata europea (~1.400 km)",
    km: 1400,
    productionType: "Serra riscaldata invernale",
    seasonal: false,
    seasonLabel: "Fuori stagione (novembre)",
    packagingDesc: "Cestino plastica + rete/pellicola (24 g)",
    packagingGrams: 24,
    waterL: 107,
    energyIndicator: 5,
    priceEur: 2.60,
    isBetterChoice: false,
    ruleReason: "Consumo energetico molto alto per riscaldare le serre d'inverno."
  },
  {
    id: "finocchi_locali",
    pairGroup: "Ortaggi",
    name: "Finocchi e broccoli di campo locali sfusi (1 kg)",
    originTier: "locale",
    originLabel: "Orti della valle (<15 km)",
    km: 12,
    productionType: "Pieno campo di stagione",
    seasonal: true,
    seasonLabel: "Di stagione (novembre)",
    packagingDesc: "Sfusi senza plastica (0 g imballo)",
    packagingGrams: 0,
    waterL: 280,
    energyIndicator: 1,
    priceEur: 1.70,
    isBetterChoice: true,
    ruleReason: "Pieno campo senza serre, basso consumo idrico ed energetico."
  }
];

/* VILLACOLLE A4 – 15 PRODOTTI CACCIA AGLI IMBALLAGGI */
export interface PackagingItem {
  id: string;
  product: string;
  material: string;
  code: string;
  necessity: "Necessario per igiene/conservazione" | "Riducibile con formato/sfuso" | "Superfluo (evitabile)";
  disposalBucket: "carta" | "plastica_metalli" | "vetro" | "organico" | "indifferenziato";
  disposalLabel: string;
  alternative: string;
}

export const PACKAGING_HUNT_ITEMS: PackagingItem[] = [
  { id: "pk1", product: "Banana dentro vaschetta di polistirolo e pellicola", material: "Polistirolo PS + Pellicola", code: "PS 6 / LDPE 4", necessity: "Superfluo (evitabile)", disposalBucket: "plastica_metalli", disposalLabel: "Plastica (se pulita; regole locali)", alternative: "Banana sfusa: ha già la sua buccia protettiva naturale!" },
  { id: "pk2", product: "Bottiglietta acqua monouso da 0,5 L", material: "Plastica PET", code: "PET 1", necessity: "Superfluo (evitabile)", disposalBucket: "plastica_metalli", disposalLabel: "Plastica (schiacciata col tappo)", alternative: "Borraccia riutilizzabile in acciaio o alluminio alimentare." },
  { id: "pk3", product: "Barattolo di passata di pomodoro", material: "Vetro trasparente + tappo metallo", code: "GL 70 / FE 40", necessity: "Necessario per igiene/conservazione", disposalBucket: "vetro", disposalLabel: "Vetro (tappo nei metalli/plastica secondo Comune)", alternative: "Lavare e riusare il vasetto in casa o preferire vuoto a rendere." },
  { id: "pk4", product: "Sacchetto di carta del forno locale", material: "Carta vergine/riciclata pulita", code: "PAP 22", necessity: "Riducibile con formato/sfuso", disposalBucket: "carta", disposalLabel: "Carta (se priva di unto o plastica)", alternative: "Sacchetto di stoffa lavabile portato da casa." },
  { id: "pk5", product: "Brick piccolo di succo con cannuccia", material: "Poliaccoppiato carta-alluminio-plastica", code: "C/PAP 84", necessity: "Superfluo (evitabile)", disposalBucket: "carta", disposalLabel: "Carta o Plastica secondo gestore comunale (verificare C/PAP 84)", alternative: "Frutta fresca locale o brocca/borraccia con spremuta fatta in casa." },
  { id: "pk6", product: "Lattina di bibita", material: "Alluminio", code: "ALU 41", necessity: "Riducibile con formato/sfuso", disposalBucket: "plastica_metalli", disposalLabel: "Metalli / Plastica-Lattine (riciclabile all'infinito)", alternative: "Acqua di rete con fetta di limone in borraccia." },
  { id: "pk7", product: "Scatola esterna dei biscotti con busta interna", material: "Cartone (esterno) + Plastica PP (interna)", code: "PAP 21 + PP 5", necessity: "Riducibile con formato/sfuso", disposalBucket: "carta", disposalLabel: "Separare: scatola in Carta (PAP 21), busta pulita in Plastica", alternative: "Biscotti sfusi di pasticceria o formato famiglia monomateriale." },
  { id: "pk8", product: "Scontrino fiscale su carta termica", material: "Carta chimica termica", code: "Non riciclabile carta", necessity: "Riducibile con formato/sfuso", disposalBucket: "indifferenziato", disposalLabel: "Indifferenziato (i reagenti termici contaminano la carta)", alternative: "Scontrino digitale quando disponibile." },
  { id: "pk9", product: "Vaschetta compostabile certificata", material: "Bioplastica certificata EN 13432", code: "EN 13432", necessity: "Riducibile con formato/sfuso", disposalBucket: "organico", disposalLabel: "Organico / Umido (solo se certificata EN 13432 e ammessa dal Comune)", alternative: "Piatti e contenitori lavabili alle feste scolastiche." },
  { id: "pk10", product: "Vaschetta di gelato in polistirolo sporca non lavabile", material: "Polistirolo con residui alimentari", code: "PS 6", necessity: "Riducibile con formato/sfuso", disposalBucket: "plastica_metalli", disposalLabel: "Plastica se svuotata/pulita (altrimenti Indifferenziato locale)", alternative: "Cono di cialda edibile o coppetta lavabile." },
  { id: "pk11", product: "Vasetto di miele locale in vetro", material: "Vetro + capsula metallica", code: "GL 70", necessity: "Necessario per igiene/conservazione", disposalBucket: "vetro", disposalLabel: "Vetro (pulito e senza tappo)", alternative: "Riutilizzo in aula o vuoto a rendere con l'apicoltore." },
  { id: "pk12", product: "Merendina con triplo incarto (cartone+vassoio+bustina)", material: "Cartone + PS/PET + PP", code: "PAP 21 / PP 5", necessity: "Superfluo (evitabile)", disposalBucket: "plastica_metalli", disposalLabel: "Separare i diversi strati secondo etichetta", alternative: "Pane locale con marmellata in portamerenda rigido." },
  { id: "pk13", product: "Rete e targhetta delle arance confezionate", material: "Plastica PE + etichetta mista", code: "LDPE 4", necessity: "Riducibile con formato/sfuso", disposalBucket: "plastica_metalli", disposalLabel: "Plastica (etichetta spesso indifferenziato)", alternative: "Scegliere agrumi sfusi in cassetta." },
  { id: "pk14", product: "Tazzina rotta di ceramica da caffè", material: "Ceramica cotta", code: "Ceramica", necessity: "Necessario per igiene/conservazione", disposalBucket: "indifferenziato", disposalLabel: "Indifferenziato (MAI nel vetro: rovina la fusione!)", alternative: "Usare con cura o riparare/riutilizzare come vasetto per talee." },
  { id: "pk15", product: "Buccia d'arancia e torsolo di mela", material: "Scarto vegetale naturale", code: "Organico", necessity: "Necessario per igiene/conservazione", disposalBucket: "organico", disposalLabel: "Organico / Compostiera scolastica", alternative: "Le bucce non trattate possono profumare torte o detersivi didattici." }
];

/* SEZIONE 5 – IMPARIAMO PRIMA DI GIOCARE (14 MODULI COMPLETI SECONDARIA I GRADO) */
export interface StudyUnit {
  id: string;
  pathway: "mezzovalle" | "villacolle";
  order: number;
  title: string;
  subtitle: string;
  deepTheory: string[];
  simplifiedReview: string[];
  infographicType: string;
  conceptMap: { root: string; branches: { label: string; children: string[] }[] };
  glossary: { term: string; def: string }[];
  dailyExample: string;
}

export const STUDY_UNITS: StudyUnit[] = [
  {
    id: "m_study_1",
    pathway: "mezzovalle",
    order: 1,
    title: "Che cos'è l'impronta idrica",
    subtitle: "Acqua verde, acqua blu e acqua grigia dietro ogni prodotto",
    deepTheory: [
      "L'impronta idrica (Water Footprint, ideata da Arjen Hoekstra e sviluppata dal Water Footprint Network) misura il volume totale di acqua dolce consumata o inquinata lungo l'intera filiera di produzione di un bene o alimento, espresso in genere in litri per chilogrammo (L/kg) o metri cubi per tonnellata.",
      "Si divide in tre componenti distinte: l'acqua verde (acqua piovana immagazzinata nel suolo e usata dalle piante), l'acqua blu (acqua superficiale o di falda prelevata per irrigazione e processi industriali) e l'acqua grigia (volume teorico di acqua dolce necessario a diluire gli inquinanti fino a rispettare gli standard ambientali).",
      "Questa distinzione è cruciale: due alimenti possono avere un consumo totale simile ma pesare in modo diverso sul territorio. Prelevare molta acqua blu in zone aride crea stress idrico immediato, mentre l'agricoltura in asciutta sfrutta soprattutto acqua verde."
    ],
    simplifiedReview: [
      "L'acqua virtuale è tutta l'acqua invisibile usata per far crescere, trasformare e portare un alimento fino a noi.",
      "Acqua verde = pioggia nel terreno; Acqua blu = acqua di fiumi, laghi e pozzi per irrigare; Acqua grigia = acqua necessaria a diluire l'inquinamento.",
      "Confrontare i tre colori aiuta a capire quando una coltura prosciuga le riserve idriche locali."
    ],
    infographicType: "wf_three_colors",
    conceptMap: {
      root: "Impronta Idrica (Water Footprint)",
      branches: [
        { label: "Acqua Verde", children: ["Pioggia naturale nel suolo", "Non sottrae acqua ai fiumi"] },
        { label: "Acqua Blu", children: ["Irrigazione da fiumi e falde", "Critica nelle aree siccitose"] },
        { label: "Acqua Grigia", children: ["Diluizione fertilizzanti e scarti", "Si riduce con meno chimica"] }
      ]
    },
    glossary: [
      { term: "Acqua virtuale", def: "Quantità nascosta di acqua incorporata nella produzione di un bene o alimento." },
      { term: "Stress idrico", def: "Situazione in cui il prelievo d'acqua supera la capacità naturale di ricarica di fiumi e falde." }
    ],
    dailyExample: "Un panino lasciato a metà nel cestino da 100 g significa circa 161 litri d'acqua invisibile buttati insieme alle briciole."
  },
  {
    id: "m_study_2",
    pathway: "mezzovalle",
    order: 2,
    title: "Che cos'è l'impronta ecologica",
    subtitle: "Superficie biologicamente produttiva richiesta dai nostri consumi",
    deepTheory: [
      "L'impronta ecologica (Ecological Footprint) misura la superficie di terra e mare biologicamente produttiva (espressa in ettari globali, gha) necessaria a rigenerare le risorse consumate da una popolazione e ad assorbire i rifiuti e le emissioni prodotte.",
      "Comprende terreni agricoli per il cibo, pascoli per gli allevamenti, foreste per legno e carta, zone di pesca, suolo urbanizzato per edifici/strade e superficie forestale necessaria ad assorbire la CO₂ non catturata dagli oceani.",
      "Non va confusa con l'impronta idrica (espressa in litri o m³ d'acqua) né con la sola impronta di carbonio (espressa in kg CO₂e): l'impronta ecologica è un indicatore territoriale integrato di pressione sugli ecosistemi."
    ],
    simplifiedReview: [
      "L'impronta ecologica misura 'quanto pianeta' (in ettari globali) serve per sostenere il nostro stile di vita.",
      "Include campi, pascoli, boschi, mari pescosi, suolo costruito e foreste assorbi-CO₂.",
      "È diversa dall'impronta idrica (litri) e da quella di carbonio (kg CO₂e): non vanno mai confuse."
    ],
    infographicType: "eco_footprint_slices",
    conceptMap: {
      root: "Impronta Ecologica (gha)",
      branches: [
        { label: "Risorse biologiche", children: ["Campi agricoli e pascoli", "Foreste e aree di pesca"] },
        { label: "Suolo e Assorbimento", children: ["Suolo urbanizzato", "Foreste per assorbire CO₂"] },
        { label: "Confronto corretto", children: ["Unità: ettari globali", "Distinta da acqua (L) e CO₂e"] }
      ]
    },
    glossary: [
      { term: "Ettaro globale (gha)", def: "Unità standardizzata equivalente a un ettaro con produttività biologica media mondiale." },
      { term: "Biocapacità", def: "Capacità naturale degli ecosistemi di rigenerare risorse e assorbire scarti." }
    ],
    dailyExample: "Recuperare i quaderni iniziati e comprare cibo locale riduce insieme la pressione su foreste e terreni agricoli."
  },
  {
    id: "m_study_3",
    pathway: "mezzovalle",
    order: 3,
    title: "Che cos'è l'impronta di carbonio",
    subtitle: "Gas serra e CO₂ equivalente lungo la filiera alimentare",
    deepTheory: [
      "L'impronta di carbonio (Carbon Footprint) quantifica il totale dei gas a effetto serra (anidride carbonica CO₂, metano CH₄, protossido di azoto N₂O) emessi direttamente e indirettamente da un'attività o prodotto, convertiti in un'unica unità: chilogrammi di CO₂ equivalente (kg CO₂e).",
      "Nel settore alimentare, studi globali su larga scala (Poore & Nemecek, Science 2018) mostrano che le emissioni dipendono soprattutto da uso del suolo, fermentazione enterica dei ruminanti, risaie allagate, fertilizzanti azotati ed energia per serre riscaldate o trasporti aerei.",
      "Un confronto cruciale dimostra perché i diversi indicatori vanno separati: le mandorle hanno un'impronta idrica molto elevata (oltre 16.000 L/kg) ma emissioni contenute (~2,3 kg CO₂e/kg), mentre il formaggio stagionato ha impronta idrica moderata (~3.178 L/kg) ma emissioni elevate (~21,2 kg CO₂e/kg)."
    ],
    simplifiedReview: [
      "L'impronta di carbonio somma i gas serra in chilogrammi di CO₂ equivalente (kg CO₂e).",
      "Dipende da allevamenti, fertilizzanti, serre riscaldate e trasporti ad alto consumo (es. aereo).",
      "Un alimento può consumare molta acqua ma poca CO₂e (mandorle) o viceversa (pomodoro in serra riscaldata)."
    ],
    infographicType: "carbon_vs_water",
    conceptMap: {
      root: "Impronta di Carbonio (kg CO₂e)",
      branches: [
        { label: "Fonti Agricole", children: ["Metano ruminanti e risaie", "Fertilizzanti azotati"] },
        { label: "Fonti Energetiche", children: ["Serre riscaldate a gasolio", "Trasporti aerei e refrigerazione"] },
        { label: "Unità e Limiti", children: ["Espressa in kg CO₂e/kg", "Non confondere con L/kg acqua"] }
      ]
    },
    glossary: [
      { term: "CO₂ equivalente (CO₂e)", def: "Unità che esprime l'effetto climalterante di diversi gas rapportato a quello dell'anidride carbonica." },
      { term: "LCA", def: "Life Cycle Assessment: analisi dell'intero ciclo di vita dalla produzione al fine vita." }
    ],
    dailyExample: "Sostituire un frutto esotico trasportato in aereo con frutta locale di stagione taglia drasticamente i kg CO₂e del trasporto."
  },
  {
    id: "m_study_4",
    pathway: "mezzovalle",
    order: 4,
    title: "Quanta acqua serve per produrre gli alimenti",
    subtitle: "Ordini di grandezza tra vegetali, cereali e proteine animali",
    deepTheory: [
      "I dati medi globali del Water Footprint Network (Mekonnen & Hoekstra, 2011) evidenziano differenze di uno o due ordini di grandezza tra gli alimenti: ortaggi e frutta fresca oscillano tra 200 e 900 L/kg (pomodoro ~214, patata ~287, arancia ~560, mela ~822), mentre cereali e derivati vanno da 1.600 a 2.500 L/kg (pane ~1.608, pasta ~1.849, riso ~2.497).",
      "Nei prodotti di origine animale l'acqua virtuale cresce notevolmente perché somma l'acqua bevuta dall'animale, quella di lavaggio delle stalle e soprattutto tutta l'acqua necessaria a coltivare i mangimi lungo mesi o anni di crescita (latte ~1.020, formaggio ~3.178, pollo ~4.325, suino ~5.988, bovino ~15.415 L/kg).",
      "È fondamentale leggere sempre la quantità reale di consumo: 1 kg di cioccolato (~17.196 L/kg) supera la carne bovina, ma una porzione tipica è di 20–25 g (~400 L), non di 150–200 g!"
    ],
    simplifiedReview: [
      "Ortaggi e frutta consumano di solito poche centinaia di litri per kg; pasta e pane intorno a 1.600–1.850 L/kg.",
      "Carni e derivati hanno valori molto più alti perché sommano l'acqua dei mangimi lungo tutto l'allevamento.",
      "Confronta sempre i valori per 1 kg ma ricordati la porzione reale mangiata a pasto."
    ],
    infographicType: "food_water_ladder",
    conceptMap: {
      root: "Scala Acqua Virtuale (L/kg)",
      branches: [
        { label: "Fascia bassa (200–900 L)", children: ["Pomodoro 214 · Patata 287", "Arancia 560 · Mela 822"] },
        { label: "Fascia media (1.000–4.500 L)", children: ["Latte 1.020 · Pane 1.608 · Riso 2.497", "Formaggio 3.178 · Uovo 3.265 · Pollo 4.325"] },
        { label: "Fascia alta (>5.500 L)", children: ["Maiale 5.988 · Manzo 15.415", "Mandorle 16.095 · Cioccolato 17.196"] }
      ]
    },
    glossary: [
      { term: "Conversione trofica", def: "Rapporto tra chili di mangime vegetale necessari e chili di carne prodotta." },
      { term: "Porzione di riferimento", def: "Quantità effettivamente consumata in un pasto (es. 80 g pasta, 30 g frutta secca)." }
    ],
    dailyExample: "Due cucchiai di legumi secchi (60 g) apportano proteine e fibre consumando circa un settimo dell'acqua virtuale di una porzione di manzo."
  },
  {
    id: "m_study_5",
    pathway: "mezzovalle",
    order: 5,
    title: "Le risorse utilizzate nell'agricoltura e negli allevamenti",
    subtitle: "Suolo, acqua, energia, nutrienti e catena del freddo",
    deepTheory: [
      "Ogni alimento attiva sette grandi fasi materiali: preparazione del suolo (aratura, carburanti agricoli), coltivazione o allevamento (sementi, fertilizzanti, mangimi), prelievi idrici, raccolta e lavorazione industriale, trasporto, conservazione refrigerata e consumo finale (cottura e lavaggio stoviglie).",
      "In agricoltura l'uso eccessivo di concimi chimici e fitofarmaci aumenta la componente 'acqua grigia' e può impoverire la fertilità biologica del suolo nel lungo periodo; pratiche come la rotazione con leguminose fissano naturalmente l'azoto atmosferico.",
      "Negli allevamenti, oltre all'acqua per i foraggi, incidono suolo occupato (spesso legato a deforestazione in aree extra-UE per la soia), energia elettrica per mungitura/ventilazione e gestione dei reflui."
    ],
    simplifiedReview: [
      "Dietro un piatto lavorano sette fasi: suolo, coltivazione/allevamento, acqua, energia, trasporto, conservazione e cottura.",
      "Rotazioni agricole e meno concimi chimici proteggono l'acqua di falda e riducono l'acqua grigia.",
      "La conservazione al freddo e la cottura in casa consumano energia elettrica e gas."
    ],
    infographicType: "seven_phases_resources",
    conceptMap: {
      root: "7 Fasi Risorse del Cibo",
      branches: [
        { label: "In Campo", children: ["Suolo e gasolio agricolo", "Acqua irrigua e fertilizzanti"] },
        { label: "Dopo Raccolta", children: ["Molitura e cottura", "Celle frigo e trasporti"] },
        { label: "A Casa e Scuola", children: ["Frigorifero ed energia cucina", "Prevenzione avanzi"] }
      ]
    },
    glossary: [
      { term: "Fissazione dell'azoto", def: "Capacità dei legumi (ceci, lenticchie, fave) di arricchire naturalmente il terreno riducendo concimi chimici." },
      { term: "Catena del freddo", def: "Insieme di magazzini e mezzi refrigerati necessari a conservare alimenti deperibili." }
    ],
    dailyExample: "Mettere il coperchio sulla pentola mentre bolle l'acqua della pasta riduce fino al 20–30% l'energia domestica di cottura."
  },
  {
    id: "m_study_6",
    pathway: "mezzovalle",
    order: 6,
    title: "Il problema dello spreco alimentare",
    subtitle: "Cause scolastiche/domestiche, regola FIFO e differenza Entro / TMC",
    deepTheory: [
      "Secondo dati FAO e ISPRA, circa un terzo del cibo prodotto globalmente viene perso lungo la filiera o sprecato nel consumo finale (Target 12.3 Agenda 2030: dimezzare lo spreco alimentare pro capite entro il 2030). Nelle famiglie e nelle scuole le cause principali sono acquisti senza lista, cattiva conservazione in frigo, porzioni eccessive e confusione sulle etichette.",
      "La normativa europea distingue nettamente: 'Da consumare entro' (data di scadenza per alimenti microbiologicamente deperibili come latte fresco o carne, da rispettare per sicurezza) da 'Da consumarsi preferibilmente entro' (Termine Minimo di Conservazione, TMC: indica fino a quando il prodotto mantiene caratteristiche organolettiche ottimali, ma resta spesso sicuro se conservato integro).",
      "La regola organizzativa FIFO ('First In, First Out' — primo ad entrare, primo ad uscire) consiste nel posizionare davanti gli alimenti già aperti o più vicini alla scadenza, azzerando gli sprechi dimenticati sul fondo."
    ],
    simplifiedReview: [
      "Sprecando cibo buttiamo via acqua, terra, energia e produciamo gas metano se l'umido finisce nell'indifferenziato.",
      "'Da consumare entro' = sicurezza igienica (rispettala!). 'Preferibilmente entro' (TMC) = qualità al top (controlla con vista e olfatto prima di buttare!).",
      "Usa la regola FIFO in frigo e dispensa: metti davanti i prodotti già aperti o più vecchi."
    ],
    infographicType: "waste_fifo_labels",
    conceptMap: {
      root: "Stop Spreco Alimentare",
      branches: [
        { label: "Cause Principali", children: ["Spesa senza lista", "Porzioni eccessive · Frigo disordinato"] },
        { label: "Etichette UE", children: ["Entro = Sicurezza", "Preferibilmente (TMC) = Qualità"] },
        { label: "Soluzioni Pratiche", children: ["Regola FIFO", "Ricette di recupero avanzi"] }
      ]
    },
    glossary: [
      { term: "TMC", def: "Termine Minimo di Conservazione ('da consumarsi preferibilmente entro'): indica qualità ottimale, non pericolo immediato." },
      { term: "FIFO", def: "First In, First Out: consumare prima ciò che è stato acquistato prima." }
    ],
    dailyExample: "Uno yogurt chiuso ben conservato 3 giorni dopo il TMC va osservato e annusato prima di decidere, anziché gettato automaticamente."
  },
  {
    id: "m_study_7",
    pathway: "mezzovalle",
    order: 7,
    title: "Come ridurre l'impatto delle scelte alimentari",
    subtitle: "Dieta varia, equilibrio nutrizionale e azioni quotidiane senza privazioni",
    deepTheory: [
      "Ridurre l'impronta idrica ed ecologica dell'alimentazione non significa privarsi di nutrienti o seguire diete restrittive: l'educazione alimentare sostenibile (modello Dieta Mediterranea) promuove varietà, porzioni adeguate al fabbisogno e alternanza equilibrata tra fonti proteiche vegetali (legumi e cereali integrali) e animali.",
      "Tre leve quotidiane producono l'impatto maggiore senza rinunce: 1) azzerare gli sprechi a mensa e casa (impatto immediato -20/30%); 2) ruotare le fonti proteiche includendo legumi locali 3–4 volte a settimana; 3) bere acqua potabile di rete con borraccia anziché bevande zuccherate imbottigliate.",
      "L'approccio critico insegna a valutare il quadro completo della classe e della famiglia senza colpevolizzare mai le abitudini personali degli alunni."
    ],
    simplifiedReview: [
      "Mangiare sostenibile vuol dire mangiare in modo vario ed equilibrato, non fare rinunce rigide!",
      "Tre mosse d'oro: zero avanzi nel piatto, più legumi e cereali della Dieta Mediterranea, acqua del rubinetto in borraccia.",
      "Ogni piccola scelta ripetuta ogni giorno in classe crea un risparmio enorme a fine anno."
    ],
    infographicType: "sustainable_plate_balance",
    conceptMap: {
      root: "Scelte Sostenibili ed Equilibrate",
      branches: [
        { label: "Varietà nel piatto", children: ["Metà ortaggi e frutta", "Cereali + alternanza legumi/proteine"] },
        { label: "Zero Sprechi", children: ["Porzioni calibrate", "Recupero pane e frutta matura"] },
        { label: "Risparmio Indiretto", children: ["Acqua di rete in borraccia", "Meno snack ultra-processati"] }
      ]
    },
    glossary: [
      { term: "Dieta Mediterranea", def: "Modello alimentare equilibrato ricco di ortaggi, frutta, cereali, legumi e olio d'oliva, riconosciuto patrimonio UNESCO." },
      { term: "Sostenibilità alimentare", def: "Insieme di scelte che proteggono salute, risorse naturali e reddito dei produttori." }
    ],
    dailyExample: "Un piatto unico di pasta e ceci locali con pomodori di stagione e un frutto sfuso sazia, nutre in modo completo e risparmia oltre 1.400 L d'acqua rispetto a un menù con carne bovina."
  },
  {
    id: "v_study_1",
    pathway: "villacolle",
    order: 1,
    title: "Che cos'è la filiera alimentare",
    subtitle: "Dalla produzione primaria al consumo: i 7 anelli della catena",
    deepTheory: [
      "La filiera alimentare (food supply chain) rappresenta l'insieme organizzato di tutti gli attori, passaggi e trasformazioni che portano un alimento dal campo o dall'allevamento fino alla tavola del consumatore.",
      "Si articola in sette fasi principali: 1) Produzione primaria (campo, orto, pascolo); 2) Raccolta o primo conferimento; 3) Lavorazione e confezionamento; 4) Stoccaggio e logistica; 5) Trasporto; 6) Distribuzione all'ingrosso o al dettaglio; 7) Acquisto e consumo domestico o scolastico.",
      "Più passaggi intermedi e trasformazioni industriali attraversa un alimento, maggiore diventa di norma il bisogno di imballaggi protettivi multipli, conservanti, stoccaggi refrigerati ed energia logistica."
    ],
    simplifiedReview: [
      "La filiera alimentare è tutto il percorso che fa un cibo dal campo al nostro banco o piatto.",
      "Comprende 7 passaggi: produzione, raccolta, lavorazione, trasporto, distribuzione, acquisto e consumo.",
      "Ogni passaggio in più richiede imballaggi, energia e trasporti aggiuntivi."
    ],
    infographicType: "supply_chain_7",
    conceptMap: {
      root: "Filiera Alimentare",
      branches: [
        { label: "Origine e Trasformazione", children: ["Campo/Allevamento → Raccolta", "Lavorazione e imballaggio"] },
        { label: "Logistica", children: ["Trasporto su strada/mare/aereo", "Magazzini e supermercati"] },
        { label: "Fine percorso", children: ["Acquisto consapevole", "Consumo senza scarti"] }
      ]
    },
    glossary: [
      { term: "Filiera alimentare", def: "Insieme dei soggetti e delle fasi che dalla terra portano il cibo al consumo." },
      { term: "Intermediazione", def: "Numero di passaggi commerciali tra chi produce e chi acquista." }
    ],
    dailyExample: "Un'arancia raccolta nel borgo e venduta al mercato del sabato fa 2 passaggi; una merendina industriale passa per molini, raffinerie, stabilimenti, centri logistici e supermercati."
  },
  {
    id: "v_study_2",
    pathway: "villacolle",
    order: 2,
    title: "Filiera corta e filiera lunga",
    subtitle: "Confronto critico su chilometri, passaggi, serre ed efficienza",
    deepTheory: [
      "La filiera corta riduce al minimo (zero o un solo intermediario) la distanza relazionale e geografica tra produttore agricolo e consumatore: ne sono esempi mercati contadini, vendita diretta in azienda, gruppi di acquisto solidale (GAS) e mense scolastiche a fornitura locale.",
      "La filiera lunga coinvolge grossisti, importatori, centri di smistamento interregionali o internazionali e grandi catene distributive. È particolarmente impattante quando ricorre al trasporto aereo per frutta esotica fresca fuori stagione.",
      "Attenzione al pensiero critico scientifico: il prodotto locale NON è automaticamente meno impattante in ogni caso! Un pomodoro coltivato a 10 km in pieno inverno dentro una serra riscaldata a gasolio può generare molte più emissioni di CO₂e di un pomodoro coltivato al sole naturale e trasportato via nave o camion efficiente."
    ],
    simplifiedReview: [
      "Filiera corta = pochissimi passaggi tra contadino e famiglia (es. mercato rionale o forno locale).",
      "Filiera lunga = molti intermediari, lunghi viaggi e più strati di plastica protettiva.",
      "Attenzione critica: locale + serra riscaldata d'inverno può consumare più energia del cibo di pieno campo!"
    ],
    infographicType: "short_vs_long_chain",
    conceptMap: {
      root: "Confronto Filiere",
      branches: [
        { label: "Filiera Corta", children: ["0–1 intermediari", "Meno imballi e legame con il borgo"] },
        { label: "Filiera Lunga", children: ["Molti passaggi logistici", "Trasporto aereo = picco emissioni"] },
        { label: "Valutazione Critica", children: ["Km brevi + Stagione naturale = Top", "Serre riscaldate = alto costo energia"] }
      ]
    },
    glossary: [
      { term: "Filiera corta", def: "Circuito commerciale diretto o con al massimo un intermediario tra agricoltore e consumatore." },
      { term: "GAS", def: "Gruppo di Acquisto Solidale: famiglie che acquistano insieme direttamente dai produttori locali." }
    ],
    dailyExample: "Scegliere a novembre finocchi e arance di Villacolle invece di pomodorini coltivati in serra riscaldata riduce insieme chilometri e gas serra."
  },
  {
    id: "v_study_3",
    pathway: "villacolle",
    order: 3,
    title: "Che cosa significa chilometro zero",
    subtitle: "Food miles, economia locale, biodiversità agricola e limiti",
    deepTheory: [
      "L'espressione 'chilometro zero' (Km 0) indica prodotti agricoli coltivati, trasformati e venduti nello stesso territorio (tipicamente entro poche decine di chilometri dal luogo di consumo), riducendo al minimo le cosiddette 'food miles' (miglia alimentari).",
      "I benefici principali riguardano freschezza nutrizionale, minore necessità di imballaggi rigidi anti-urto, sostegno diretto agli agricoltori dei borghi rurali e tutela delle varietà tradizionali locali (biodiversità agricola).",
      "Tuttavia, le food miles rappresentano spesso solo il 5–15% delle emissioni totali di un alimento: ecco perché il Km 0 dà il massimo risultato ambientale quando si combina con stagionalità naturale, colture a basso consumo energetico e zero sprechi a tavola."
    ],
    simplifiedReview: [
      "Km zero significa cibo prodotto e venduto vicino a casa, sostenendo i produttori dei nostri borghi.",
      "Permette di comprare alimenti più freschi e spesso sfusi senza scatole per lunghi viaggi.",
      "Funziona al meglio quando si unisce a stagionalità naturale e niente sprechi."
    ],
    infographicType: "km_zero_radius",
    conceptMap: {
      root: "Chilometro Zero (Km 0)",
      branches: [
        { label: "Vantaggi Territoriali", children: ["Sostegno aziende della valle", "Varietà locali e meno imballi"] },
        { label: "Food Miles", children: ["Distanza percorsa dal cibo", "Conta anche il mezzo (aereo vs nave)"] },
        { label: "Regola Completa", children: ["Locale + Di stagione", "+ Sfuso + Zero spreco"] }
      ]
    },
    glossary: [
      { term: "Food miles", def: "Distanza complessiva percorsa da un alimento dal campo di produzione al luogo d'acquisto." },
      { term: "Agrobiodiversità", def: "Varietà di specie e cultivar agricole tradizionali adattate al clima locale." }
    ],
    dailyExample: "Comprare miele di acacia o millefiori da un apicoltore del borgo con barattoli a rendere unisce Km 0, biodiversità delle api e zero rifiuti."
  },
  {
    id: "v_study_4",
    pathway: "villacolle",
    order: 4,
    title: "La stagionalità degli alimenti",
    subtitle: "Rispettare il ciclo naturale del clima e leggere le etichette di origine",
    deepTheory: [
      "Seguire la stagionalità significa scegliere frutta e verdura nel periodo dell'anno in cui maturano naturalmente all'aperto secondo il clima del territorio, sfruttando luce solare e piogge naturali.",
      "In Italia e nell'area mediterranea, l'autunno-inverno offre agrumi (arance, mandarini, limoni), mele, pere, cachi, kiwi, broccoli, finocchi, carciofi, zucche e spinaci; la primavera-estate offre fragole, ciliegie, pesche, albicocche, angurie, pomodori, zucchine, melanzane e peperoni.",
      "Acquistare ortaggi tipicamente estivi in pieno inverno implica quasi sempre serre riscaldate artificialmente oppure importazioni intercontinentali con conservazione refrigerata per settimane."
    ],
    simplifiedReview: [
      "Ogni frutto e ortaggio ha i suoi mesi naturali di maturazione al sole.",
      "Autunno/Inverno = arance, mandarini, cachi, mele, finocchi, broccoli, carciofi.",
      "Primavera/Estate = fragole, ciliegie, pesche, pomodori, zucchine, melanzane."
    ],
    infographicType: "seasonal_wheel",
    conceptMap: {
      root: "Stagionalità Naturale",
      branches: [
        { label: "Autunno / Inverno", children: ["Agrumi, mele, cachi, kiwi", "Broccoli, finocchi, carciofi, zucca"] },
        { label: "Primavera / Estate", children: ["Fragole, ciliegie, pesche, angurie", "Pomodori, zucchine, peperoni"] },
        { label: "Beneficio", children: ["Zero riscaldamento serre", "Gusto migliore e prezzo equo"] }
      ]
    },
    glossary: [
      { term: "Pieno campo", def: "Coltivazione all'aperto esposta al ciclo naturale di sole e temperature." },
      { term: "Origine obbligatoria", def: "Indicazione di legge sul Paese di raccolta obbligatoria per frutta e verdura fresche in UE." }
    ],
    dailyExample: "Controllare sempre il cartellino del Paese d'origine al banco ortofrutta prima di mettere la frutta nel sacchetto riutilizzabile."
  },
  {
    id: "v_study_5",
    pathway: "villacolle",
    order: 5,
    title: "Gli imballaggi e il loro impatto",
    subtitle: "Imballo primario, secondario, terziario e strategia Precycling",
    deepTheory: [
      "Un imballaggio protegge e conserva l'alimento evitando che si rovini prima del consumo, ma una quota crescente dei rifiuti urbani proviene da confezioni ridondanti o monoporzione.",
      "Si distinguono tre livelli: imballaggio primario (a diretto contatto con l'alimento, come un barattolo o una bustina), secondario (raggruppa più unità, come la scatola di cartone esterna delle merendine) e terziario (pallet e film estensibile per il trasporto logistico).",
      "Pesando alimento netto e imballo (tara) emerge il costo nascosto del monoporzione: Tara % = (Peso Imballaggio ÷ Peso Lordo) × 100. Su 100 g di biscotti in vaschetta e pellicola da 25 g (125 g lordi), il 20% del peso acquistato è rifiuto immediato. Il Precycling applica le prime due 'R' inglesi — Refuse (rifiuta il superfluo) e Reduce (riduci) — prima ancora di creare il rifiuto."
    ],
    simplifiedReview: [
      "Primario = tocca il cibo; Secondario = scatola esterna di più pezzi; Terziario = bancale per camion.",
      "Le confezioni monoporzione aumentano molto la Tara % (plastica in più rispetto al cibo netto)!",
      "Precycling applica Refuse e Reduce (le prime R inglesi delle 5R): scegli sfuso già in negozio."
    ],
    infographicType: "packaging_three_tiers",
    conceptMap: {
      root: "Imballaggi & Precycling",
      branches: [
        { label: "3 Livelli", children: ["Primario (contatto cibo)", "Secondario (multiplo) · Terziario (trasporto)"] },
        { label: "Calcolo Tara %", children: ["(Imballo ÷ Lordo) × 100", "Monoporzioni multi-strato = alto spreco"] },
        { label: "5R Originali (EN)", children: ["Refuse · Reduce · Reuse", "Recycle · Rot (Composta)"] }
      ]
    },
    glossary: [
      { term: "Precycling", def: "Scelta d'acquisto preventiva (Refuse e Reduce delle 5R inglesi) per evitare alla fonte materiali destinati a diventare rifiuto." },
      { term: "Poliaccoppiato", def: "Imballaggio formato da due o più materiali diversi incollati insieme (es. carta+plastica+alluminio)." }
    ],
    dailyExample: "Una bottiglia grande di succo in vetro (o frutta fresca) al posto di 6 brick piccoli elimina 6 cannucce, 6 brick e pellicole esterne."
  },
  {
    id: "v_study_6",
    pathway: "villacolle",
    order: 6,
    title: "La raccolta differenziata degli imballaggi",
    subtitle: "Codici alfanumerici ambientali, frazione estranea e regole comunali",
    deepTheory: [
      "In Italia ogni imballaggio riporta obbligatoriamente il codice identificativo alfanumerico del materiale (Decisione 97/129/CE): PAP 20–22 per carta/cartone, PET 1 / HDPE 2 / LDPE 4 / PP 5 / PS 6 per le plastiche, ALU 41 e FE 40 per alluminio e acciaio, GL 70–72 per il vetro, e sigle C/... per materiali compositi prevalenti (es. C/PAP 84).",
      "Il valore reale del riciclaggio dipende dalla qualità della separazione: una frazione estranea elevata (carta unta o sporca di cibo, ceramica nella campana del vetro, scontrini termici nella carta) contamina interi lotti destinati alle cartiere o vetrerie.",
      "Poiché impianti e consorzi locali variano da territorio a territorio, è regola scientifica imprescindibile verificare sempre il regolamento ufficiale del proprio Comune per gli imballaggi compositi e le bioplastiche EN 13432."
    ],
    simplifiedReview: [
      "Leggi le sigle sulle confezioni: PAP (carta), PET/PP (plastica), ALU (alluminio), GL (vetro).",
      "Separa sempre gli strati diversi (es. coperchio di alluminio dal vasetto dello yogurt) e svuota i residui.",
      "Mai ceramica nel vetro e mai scontrini nella carta! Verifica sempre il calendario del tuo Comune."
    ],
    infographicType: "material_codes_bins",
    conceptMap: {
      root: "Raccolta Pulita & Codici",
      branches: [
        { label: "Codici Principali", children: ["PAP (Carta) · GL (Vetro)", "PET/PP (Plastica) · ALU (Alluminio)"] },
        { label: "Errori da Evitare", children: ["Ceramica nel vetro", "Scontrini chimici e carta unta nella carta"] },
        { label: "Regola Locale", children: ["Compositi C/... e EN 13432", "Verificare sempre calendario Comune"] }
      ]
    },
    glossary: [
      { term: "Frazione estranea", def: "Materiale non conforme conferito per errore in un contenitore di raccolta differenziata." },
      { term: "EN 13432", def: "Norma europea che certifica la compostabilità industriale di un imballaggio biodegradabile." },
      { term: "Tethered Caps (SUP)", def: "Tappi di plastica ancorati al collo di bottiglie e cartoni (Direttiva UE 2019/904) per facilitarne il recupero insieme al contenitore ed evitare la dispersione in ambiente." }
    ],
    dailyExample: "Schiacciare per lungo la bottiglia PET e lasciare il tappo ancorato (Tethered Cap, Direttiva SUP) riduce il volume nel bidone ed evita che il tappo finisca in natura."
  },
  {
    id: "v_study_7",
    pathway: "villacolle",
    order: 7,
    title: "Come organizzare una spesa sostenibile",
    subtitle: "Lista pre-spesa, borse riutilizzabili, budget e valutazione critica",
    deepTheory: [
      "Una spesa sostenibile inizia prima di uscire di casa: controllare dispensa e frigorifero applicando la regola FIFO evita doppioni destinati a scadere. Scrivere una lista mirata riduce gli acquisti d'impulso promossi dal marketing sugli scaffali.",
      "In negozio o al mercato, portare borse di tela, reti per l'ortofrutta e contenitori lavabili taglia gli imballi superflui. Confrontare il prezzo al chilogrammo (anziché a confezione) rivela spesso che cibi freschi sfusi, cereali secchi e legumi costano meno delle monoporzioni industriali.",
      "Saper leggere insieme provenienza, stagione, imballaggio e bisogno reale trasforma lo studente e la famiglia in cittadini consapevoli, equilibrando tutela ambientale e convenienza economica."
    ],
    simplifiedReview: [
      "1. Controlla prima cosa c'è già in casa (regola FIFO) e fai la lista.",
      "2. Porta borse di tela e scegli prodotti sfusi, di stagione e vicini.",
      "3. Confronta il prezzo al kg e non farti guidare solo da confezioni colorate o offerte multiple inutili."
    ],
    infographicType: "smart_shopping_steps",
    conceptMap: {
      root: "Spesa Sostenibile in 5 Mosse",
      branches: [
        { label: "Prima di uscire", children: ["Controllo frigo FIFO", "Lista e borse riutilizzabili"] },
        { label: "Davanti allo scaffale", children: ["Leggi origine e stagione", "Evita monoporzioni e doppie scatole"] },
        { label: "Budget & Qualità", children: ["Confronta prezzo al kg", "Premia legumi e prodotti locali"] }
      ]
    },
    glossary: [
      { term: "Prezzo al kg", def: "Indicazione obbligatoria sugli scaffali che permette di confrontare il costo reale senza farsi ingannare dal formato." },
      { term: "Acquisto d'impulso", def: "Acquisto non pianificato stimolato da esposizioni, sconti 3×2 inutili o grafica accattivante." }
    ],
    dailyExample: "Con 10 euro di spesa mirata (mele locali, ceci, pane del forno, finocchi) ottieni più pasti completi, meno rifiuti e un carrello più sano rispetto a snack e bibite confezionate."
  }
];

/* SEZIONE 6 – 13 SCHEDE OPERATIVE STAMPABILI FORMATO A4 */
export interface PrintableWorksheetDef {
  id: string;
  pathway: "mezzovalle" | "villacolle" | "comune";
  code: string;
  title: string;
  objective: string;
  materials: string;
  steps: string[];
  tableCols: string[];
  defaultRows: string[][];
  observationPrompt: string;
  conclusionPrompt: string;
}

export const PRINTABLE_WORKSHEETS: PrintableWorksheetDef[] = [
  {
    id: "ws_m1", pathway: "mezzovalle", code: "M-01",
    title: "Quanto costa in acqua ciò che mangiamo?",
    objective: "Calcolare la stima di acqua virtuale (fonti WFN indicative) presente nella merenda reale degli alunni.",
    materials: "Tabella valori indicativi WFN (L/kg), bilancia didattica o peso in etichetta, calcolatrice, penna.",
    steps: [
      "Annota almeno 3 alimenti della tua giornata alimentare o merenda scolastica.",
      "Rileva o stima il peso in grammi e convertilo in chilogrammi (g ÷ 1000).",
      "Moltiplica i kg per il valore indicativo WFN (L/kg) e somma il risultato stimato."
    ],
    tableCols: ["Alimento osservato", "Peso (g)", "Valore WFN (L/kg)", "Acqua stimata (L)", "Alternativa a minor impatto"],
    defaultRows: [
      ["Pane di frumento", "60", "1.608", "96 L", "Non sprecare nessuna briciola"],
      ["Mela locale", "150", "822", "123 L", "Acquista sfusa senza sacchetto plastica"],
      ["Formaggio stagionato", "40", "3.178", "127 L", "Porzione calibrata + legumi a rotazione"]
    ],
    observationPrompt: "Quale alimento della tua tabella ha l'impronta idrica più alta per singola porzione? Perché (acqua verde, blu o mangimi)?",
    conclusionPrompt: "Scrivi una regola concreta per ridurre lo spreco di acqua nascosta a scuola o a casa."
  },
  {
    id: "ws_m2", pathway: "mezzovalle", code: "M-02",
    title: "Classifica gli alimenti (Acqua vs Carbonio)",
    objective: "Ordinare gli alimenti dal minore al maggiore consumo idrico distinguendo l'impronta idrica da quella di carbonio.",
    materials: "Schede dei 15 alimenti dell'app, righello, matite colorate.",
    steps: [
      "Seleziona 6 alimenti dalle diverse categorie (verdura, frutta, cereali, latticini, carne, frutta secca).",
      "Ordina i 6 alimenti dal valore WFN più basso (es. pomodoro 214 L/kg) al più alto.",
      "Confronta accanto il rispettivo valore indicativo di CO₂e (kg/kg): l'ordine resta identico?"
    ],
    tableCols: ["Posizione", "Alimento", "Acqua (L/kg WFN)", "CO₂e (kg/kg)", "Nota sulle differenze"],
    defaultRows: [
      ["1", "Pomodoro (pieno campo)", "214", "1,4", "Acqua e CO₂e basse se di stagione"],
      ["2", "Pane di frumento", "1.608", "1,4", "Soprattutto acqua verde nei campi"],
      ["3", "Formaggio stagionato", "3.178", "21,2", "CO₂e alta rispetto all'acqua"]
    ],
    observationPrompt: "Perché un alimento come le mandorle ha molta acqua virtuale per kg ma meno kg CO₂e di formaggio o manzo?",
    conclusionPrompt: "Perché non bisogna mai confondere impronta idrica e impronta di carbonio?"
  },
  {
    id: "ws_m3", pathway: "mezzovalle", code: "M-03",
    title: "Il diario dello spreco alimentare",
    objective: "Monitorare per 3 giorni gli alimenti non consumati a casa o a scuola individuandone le cause.",
    materials: "Scheda di rilevazione giornaliera, bilancia cucina (facoltativa).",
    steps: [
      "Registra per 3 giorni ogni avanzo finito nei rifiuti (es. pane, frutta, yogurt, pasta).",
      "Classifica la causa principale: porzione eccessiva, scadenza dimenticata (FIFO), cattiva conservazione.",
      "Proponi un rimedio immediato applicabile già dal giorno successivo."
    ],
    tableCols: ["Giorno", "Cibo sprecato", "Stima quantità", "Causa individuata", "Soluzione anti-spreco"],
    defaultRows: [
      ["Giorno 1", "Pane raffermo", "80 g", "Acquistato in eccesso", "Crostini o pangrattato"],
      ["Giorno 2", "Yogurt vicino al TMC", "125 g", "Posizionato dietro in frigo", "Regola FIFO + controllo visivo"]
    ],
    observationPrompt: "Qual è stata la causa più frequente di spreco osservata nei 3 giorni?",
    conclusionPrompt: "Quale abitudine familiare o scolastica avete già modificato grazie al rilevamento?"
  },
  {
    id: "ws_m4", pathway: "mezzovalle", code: "M-04",
    title: "Confrontiamo due pasti",
    objective: "Valutare l'impatto idrico e climatico stimato di due menù completi equilibrati.",
    materials: "Calcolatore Impronta Alimentare dell'app, tabella WFN & Poore/Nemecek.",
    steps: [
      "Costruisci il Pasto A (menù tradizionale ad alta intensità idrica/climatica).",
      "Costruisci il Pasto B (menù vario ed equilibrato con cereali, legumi/uova e ortaggi di stagione).",
      "Calcola la differenza stimata in litri d'acqua e kg CO₂e tra i due menù."
    ],
    tableCols: ["Elemento del pasto", "Pasto A (g / L / CO₂e)", "Pasto B (g / L / CO₂e)", "Differenza osservata"],
    defaultRows: [
      ["Primo piatto / Cereale", "Riso 80 g (200 L · 0,32 kg)", "Pasta locale 80 g (148 L · 0,13 kg)", "-52 L · -0,19 kg"],
      ["Secondo / Proteina", "Manzo 120 g (1.850 L · 7,2 kg)", "Lenticchie 60 g (243 L · 0,05 kg)", "-1.607 L · -7,15 kg"]
    ],
    observationPrompt: "Il Pasto B mantiene un apporto nutrizionale vario ed equilibrato pur riducendo acqua e CO₂e?",
    conclusionPrompt: "Come si può proporre questa alternanza settimanale nella mensa o in famiglia senza rinunce?"
  },
  {
    id: "ws_m5", pathway: "mezzovalle", code: "M-05",
    title: "Progetta un pasto sostenibile",
    objective: "Ideare un pasto completo, sano e accessibile che integri risparmio di risorse e zero avanzi.",
    materials: "Laboratorio Pasto Sostenibile dell'app, linee guida stagionalità.",
    steps: [
      "Scegli un alimento per ciascuno dei 4 gruppi: cereali/tuberi, proteine, ortaggi di stagione, frutta.",
      "Verifica la stima idrica totale, la CO₂e stimata e la stagionalità degli ingredienti.",
      "Indica come riutilizzare eventuali scarti edibili (bucce, foglie esterne, pane)."
    ],
    tableCols: ["Gruppo alimentare", "Alimento scelto e porzione", "Acqua stimata (L)", "Idea zero scarti"],
    defaultRows: [
      ["Cereale", "Pasta locale 80 g", "148 L", "Cottura con coperchio"],
      ["Proteine", "Ceci locali 60 g", "243 L", "Acqua di cottura recuperabile"],
      ["Ortaggio", "Broccoli e pomodori 150 g", "45 L", "Gambi tagliati fini nel sugo"],
      ["Frutta", "Arancia di stagione 150 g", "84 L", "Scorza non trattata per dolci"]
    ],
    observationPrompt: "Quali risorse invisibili hai protetto progettando in anticipo questo pasto?",
    conclusionPrompt: "Impegno della coppia o del gruppo per replicare questo pasto a casa."
  },
  {
    id: "ws_v1", pathway: "villacolle", code: "V-01",
    title: "Ricostruiamo la filiera alimentare",
    objective: "Mappare i 7 anelli dal campo alla tavola confrontando un alimento locale con uno di filiera lunga.",
    materials: "Etichette reali di due alimenti portati da casa o simulazione dell'app.",
    steps: [
      "Scegli due prodotti simili (es. frutto locale sfuso vs snack alla frutta confezionato).",
      "Ricostruisci per entrambi le 7 fasi: campo, raccolta, lavorazione, trasporto, distribuzione, acquisto, consumo.",
      "Evidenzia dove compaiono imballaggi aggiuntivi, refrigerazione o serre riscaldate."
    ],
    tableCols: ["Fase della filiera", "Prodotto Filiera Corta", "Prodotto Filiera Lunga", "Risorse extra / Imballi"],
    defaultRows: [
      ["1-2. Campo e Raccolta", "Agrumeto vicino (<25 km)", "Piantagione estera / serra", "Distanze e metodi colturali"],
      ["3. Lavorazione", "Nessuna (prodotto fresco)", "Succo concentrato + zucchero", "Energia industriale + brick"],
      ["4-5. Trasporto e Negozio", "Cassetta riutilizzabile locale", "Camion frigo + centro logistico", "Carburante e plastica estensibile"]
    ],
    observationPrompt: "In quale caso particolare un prodotto locale potrebbe consumare più energia di uno lontano (es. serra riscaldata)?",
    conclusionPrompt: "Sintetizza in una frase perché filiera corta + stagione sono la coppia vincente."
  },
  {
    id: "ws_v2", pathway: "villacolle", code: "V-02",
    title: "Il calendario dei prodotti stagionali",
    objective: "Classificare i principali prodotti ortofrutticoli italiani mese per mese riconoscendo i fuori stagione.",
    materials: "Calendario interattivo della Stagionalità nell'app, cartellone di classe.",
    steps: [
      "Seleziona il mese attuale (es. Novembre per la SERR 2026) e un mese estivo (es. Luglio).",
      "Elenca 4 frutti e 4 verdure di stagione naturale per ciascuno dei due mesi.",
      "Segna due prodotti che in quel mese risulterebbero fuori stagione."
    ],
    tableCols: ["Mese analizzato", "Frutta di stagione", "Verdura di stagione", "Prodotti fuori stagione da evitare"],
    defaultRows: [
      ["Novembre", "Arance, mandarini, cachi, mele", "Carciofi, finocchi, broccoli, zucca", "Fragole, pomodori di campo, anguria"],
      ["Luglio", "Pesche, albicocche, angurie, ciliegie", "Pomodori, zucchine, melanzane, peperoni", "Arance fresche, cachi, broccoli"]
    ],
    observationPrompt: "Come si conserva naturalmente in inverno la produzione estiva senza comprare serre riscaldate?",
    conclusionPrompt: "Proponi un menù stagionale per la settimana SERR di novembre nella tua scuola."
  },
  {
    id: "ws_v3", pathway: "villacolle", code: "V-03",
    title: "La spesa a chilometro zero",
    objective: "Pianificare una spesa settimanale rispettando il budget e massimizzando provenienza locale, stagione e sfuso.",
    materials: "Simulatore Spesa a Km Zero nell'app, foglio di calcolo o calcolatrice.",
    steps: [
      "Disponi di un budget simulato di 18,00 € per la merenda e verdura/frutta di casa.",
      "Scegli almeno 5 prodotti indicando provenienza, km stimati, stagione e tipo di imballo.",
      "Verifica l'indicatore didattico di provenienza locale e il peso degli imballaggi generati."
    ],
    tableCols: ["Prodotto scelto", "Provenienza (km)", "Stagione (Sì/No)", "Imballaggio (g)", "Prezzo (€)"],
    defaultRows: [
      ["Mele e cachi locali (1 kg)", "Locale (18 km)", "Sì", "0 g (sfusi)", "1,90 €"],
      ["Pane del borgo (500 g)", "Locale (4 km)", "Sì", "5 g (carta)", "1,60 €"]
    ],
    observationPrompt: "Quale scelta ha permesso di risparmiare sia denaro sia grammi di plastica?",
    conclusionPrompt: "Perché il prezzo al chilogrammo aiuta a fare scelte più sostenibili ed eque?"
  },
  {
    id: "ws_v4", pathway: "villacolle", code: "V-04",
    title: "Analizziamo gli imballaggi & Calcolo della Tara %",
    objective: "Classificare gli involucri per codice materiale, calcolare l'incidenza della tara (Tara ÷ Lordo × 100), valutare l'alternativa sfusa e il conferimento locale.",
    materials: "Confezioni vuote e pulite portate da casa, bilancia di precisione, tabella codici imballo e Calcolatore Tara % dell'app (B4).",
    steps: [
      "Esamina almeno 5 confezioni cercando la sigla ambientale (PAP, PET, ALU, GL, C/PAP 84) e verifica eventuali Tethered Caps (Direttiva SUP).",
      "Pesa alimento netto e imballaggio calcolando la Tara % = (Peso Imballo ÷ Peso Lordo) × 100.",
      "Applica Refuse e Reduce (le prime 'R' inglesi delle 5R): valuta l'alternativa sfusa e controlla il calendario del tuo Comune."
    ],
    tableCols: ["Prodotto", "Materiale & Codice", "Tara % (Imballo/Lordo)", "Alternativa 5R (Refuse/Reduce)", "Conferimento (Comune)"],
    defaultRows: [
      ["Banana in vaschetta", "PS 6 + LDPE 4", "15 g / 165 g = 9,1%", "Banana sfusa (0 g imballo)", "Plastica (da evitare all'acquisto)"],
      ["Mini-brick succo", "C/PAP 84", "14 g / 214 g = 6,5%", "Spremuta o acqua in borraccia", "Verificare regola comunale C/PAP"]
    ],
    observationPrompt: "Quali imballaggi hanno avuto la Tara % più alta o strati compositi difficili da riciclare?",
    conclusionPrompt: "Regola d'oro del Precycling (Refuse & Reduce) da applicare al prossimo giro al supermercato."
  },
  {
    id: "ws_v5", pathway: "villacolle", code: "V-05",
    title: "Progettiamo una merenda senza sprechi",
    objective: "Organizzare la merenda settimanale della classe unendo stagionalità, produttori locali e contenitori riutilizzabili.",
    materials: "Laboratorio Merenda Sostenibile nell'app, portamerenda e borraccia.",
    steps: [
      "Pianifica la merenda per i 5 giorni scolastici (Lunedì–Venerdì).",
      "Abbina sempre frutto/cibo fresco di stagione, bevanda da borraccia e zero incarti usa e getta.",
      "Confronta il numero di rifiuti prodotti in una settimana rispetto a merendine e bottigliette."
    ],
    tableCols: ["Giorno", "Merenda principale", "Frutta / Ortaggio", "Contenitore usato", "Rifiuti monouso"],
    defaultRows: [
      ["Lunedì", "Pane locale e olio", "Mandarino sbucciato", "Portamerenda + borraccia", "0 g plastica (buccia in organico)"],
      ["Mercoledì", "Torta fatta in casa", "Mela locale sfusa", "Tovagliolo stoffa + borraccia", "0 g plastica"]
    ],
    observationPrompt: "Quanti involucri di plastica e brick risparmia l'intera classe di 20 studenti in un solo mese?",
    conclusionPrompt: "Come coinvolgere le famiglie per mantenere questa buona abitudine tutto l'anno?"
  },
  {
    id: "ws_c1", pathway: "comune", code: "C-06",
    title: "Il supermercato delle scelte (Confronto A vs B)",
    objective: "Simulare due carrelli entro il budget confrontando acqua, energia, trasporti e grammi di imballaggio.",
    materials: "Simulatore Attività 6 dell'app, foglio di registrazione.",
    steps: [
      "Componi il Carrello Iniziale scegliendo prodotti comuni senza badare a imballi o provenienza.",
      "Registra spesa (€), acqua (L), indicatore energia, km trasporti e grammi imballi.",
      "Sostituisci i prodotti critici creando il Carrello Migliorato e analizza i risparmi ottenuti."
    ],
    tableCols: ["Indicatore", "Carrello Iniziale (A)", "Carrello Migliorato (B)", "Variazione (+/-)"],
    defaultRows: [
      ["Spesa totale (€)", "14,90 €", "7,35 €", "-7,55 €"],
      ["Acqua virtuale stimata (L)", "5.753 L", "4.049 L", "-1.704 L"],
      ["Distanza trasporti (km)", "15.550 km", "59 km", "-15.491 km"],
      ["Peso imballaggi (g)", "210 g", "13 g", "-197 g"]
    ],
    observationPrompt: "È stato possibile migliorare tutti e quattro gli indicatori spendendo persino meno?",
    conclusionPrompt: "Quale criterio di sostituzione ha avuto l'impatto maggiore sul trasporto e sugli imballaggi?"
  },
  {
    id: "ws_c2", pathway: "comune", code: "C-07",
    title: "La sfida delle due scuole (Verso il Decalogo)",
    objective: "Integrare le scoperte di Mezzovalle (risorse invisibili) e Villacolle (filiera e imballi) in 10 regole condivise.",
    materials: "Bacheca Comune nell'app (Attività 7), fogli per gruppo.",
    steps: [
      "Raccogli 2 scoperte chiave sul consumo nascosto d'acqua/spreco (Mezzovalle).",
      "Abbinale a 2 scoperte chiave su stagione/filiera corta/imballaggi (Villacolle).",
      "Formula una nuova regola motivata per il Decalogo del Cibo Sostenibile."
    ],
    tableCols: ["Scoperta Mezzovalle", "Scoperta Villacolle", "Regola proposta", "Motivazione ambientale"],
    defaultRows: [
      ["1 kg pane = ~1.608 L acqua", "Il pane del forno locale ha quasi zero plastica", "Scegli pane locale in telo e finisci le fette", "Unisce tutela acqua virtuale e stop imballi"],
      ["TMC vs Scadenza salva cibo sano", "Le monoporzioni generano troppa tara", "Porzioni giuste da contenitori familiari", "Taglia insieme spreco alimentare e plastica"]
    ],
    observationPrompt: "Perché i percorsi di Mezzovalle e Villacolle si completano a vicenda anziché ripetersi?",
    conclusionPrompt: "Trascrivi la regola che la tua classe ha votato come prioritaria."
  },
  {
    id: "ws_c3", pathway: "comune", code: "C-08",
    title: "La nostra scuola a impatto ridotto (Audit)",
    objective: "Analizzare un problema reale dell'edificio scolastico progettando una soluzione misurabile prima e dopo.",
    materials: "Modulo Audit nell'app (Attività 8), griglia osservazione in classe.",
    steps: [
      "Individua un ambito critico a scuola (spreco cibo, bottigliette, imballi, raccolta, acqua o luce).",
      "Descrivi situazione attuale, risorse coinvolte e proposta concreta a costo zero o minimo.",
      "Stabilisci esattamente come verificare il miglioramento dopo due settimane."
    ],
    tableCols: ["Voce di Audit", "Descrizione rilevata dalla classe"],
    defaultRows: [
      ["Problema osservato", "Esempio: troppi bicchieri e bottigliette usa e getta dopo educazione fisica"],
      ["Risorse coinvolte", "Plastica PET, energia di produzione e volume rifiuti secchi"],
      ["Soluzione & Verifica", "Patto borraccia di classe + conteggio bottigliette nel cestino il venerdì"]
    ],
    observationPrompt: "Chi nella scuola (studenti, docenti, collaboratori, dirigente, Comune) può collaborare per rendere stabile il cambiamento?",
    conclusionPrompt: "Sintetizza il titolo e lo slogan del Manifesto Digitale realizzato in classe."
  }
];
