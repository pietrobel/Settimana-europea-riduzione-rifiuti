export interface DiaryEntry {
  id: string;
  dateIso: string;
  dateLabel: string;
  pathway: "mezzovalle" | "villacolle" | "comune";
  activityRef: string;
  learned: string;
  surprised: string;
  problem: string;
  behavior: string;
  proposal: string;
}

export interface DecalogoRule {
  id: string;
  authorPath: "mezzovalle" | "villacolle" | "comune";
  title: string;
  motivation: string;
  votes: number;
}

export interface SchoolAuditIssue {
  id: string;
  category: string;
  problem: string;
  situation: string;
  resources: string;
  solution: string;
  expectedOutcome: string;
  verification: string;
}

export interface SerrLabPersistedState {
  version: number;
  studentAlias: string;
  studentClass: string;
  completedActivities: string[];
  studiedUnits: string[];
  gameScores: Record<string, { score: number; total: number; attempts: number; lastDate: string }>;
  completedMissions: string[];
  diaryEntries: DiaryEntry[];
  decalogoRules: DecalogoRule[];
  decalogoDiscoveriesMezz: string[];
  decalogoDiscoveriesVilla: string[];
  schoolAudit: SchoolAuditIssue[];
  posterDraft: {
    title: string;
    issueId: string;
    proposal: string;
    theme: string;
  };
  supermarketSavedCartA: string[];
  supermarketSavedCartB: string[];
}

const DB_NAME = "Serr2026LabDB";
const DB_VERSION = 1;
const STORE_NAME = "labState";
const RECORD_KEY = "main";
const LS_KEY = "serr2026_lab_persist_v1";

export function createDefaultLabState(): SerrLabPersistedState {
  return {
    version: 1,
    studentAlias: "RiccioEsploratore01",
    studentClass: "2A · Secondaria I grado",
    completedActivities: [],
    studiedUnits: [],
    gameScores: {},
    completedMissions: [],
    diaryEntries: [
      {
        id: "seed_1",
        dateIso: "2026-11-21T09:00:00",
        dateLabel: "21/11/2026 09:00",
        pathway: "mezzovalle",
        activityRef: "Mezzovalle · A1 Acqua Nascosta",
        learned: "Per produrre 1 kg di pane servono circa 1.608 litri di acqua virtuale (stima media globale WFN).",
        surprised: "Una T-shirt di cotone da 250 g richiede circa 2.495 litri d'acqua tra campi e lavorazioni.",
        problem: "Quando buttiamo avanzi a mensa sprechiamo anche l'acqua dolce impiegata lungo tutta la filiera.",
        behavior: "Chiedere una porzione adeguata e fare il bis solo se ho davvero ancora fame.",
        proposal: "Installare una bacheca mensile in mensa con i chili di pane recuperati e le ricette di recupero."
      }
    ],
    decalogoRules: [
      { id: "r1", authorPath: "mezzovalle", title: "Porzioni giuste e bis su richiesta", motivation: "Evita avanzi in mensa salvando acqua virtuale, suolo ed energia.", votes: 14 },
      { id: "r2", authorPath: "villacolle", title: "Merenda in portamerenda rigido e borraccia", motivation: "Elimina fino a 180 involucri monouso l'anno per ciascuno studente.", votes: 18 },
      { id: "r3", authorPath: "mezzovalle", title: "Regola FIFO e lettura corretta del TMC", motivation: "Distinguere 'entro' da 'preferibilmente entro' impedisce di buttare cibo ancora buono.", votes: 12 },
      { id: "r4", authorPath: "villacolle", title: "Frutta e verdura locali di stagione", motivation: "Riduce i chilometri refrigerati e il fabbisogno energetico delle serre riscaldate.", votes: 15 },
      { id: "r5", authorPath: "comune", title: "Acquisti sfusi prima del confezionato (Precycling)", motivation: "Taglia alla fonte imballaggi secondari e vaschette superflue.", votes: 11 },
      { id: "r6", authorPath: "mezzovalle", title: "Alternanza proteica varia senza eccessi né restrizioni", motivation: "Includere legumi e cereali locali riduce l'impronta idrica e di carbonio complessiva.", votes: 10 },
      { id: "r7", authorPath: "villacolle", title: "Controllo critico di serre, trasporto e imballo", motivation: "Il km zero è davvero sostenibile se unito a stagionalità naturale e imballi leggeri.", votes: 9 },
      { id: "r8", authorPath: "comune", title: "Raccolta differenziata pulita e senza frazioni estranee", motivation: "Svuotare e pulire i contenitori permette il vero riciclo nei circuiti comunali.", votes: 13 },
      { id: "r9", authorPath: "mezzovalle", title: "Recupero creativo del cibo e cura dell'acqua in aula", motivation: "Segnalare rubinetti che gocciolano e usare ricette anti-spreco a casa.", votes: 8 },
      { id: "r10", authorPath: "comune", title: "Monitoraggio trasparente prima–dopo a scuola", motivation: "Misurare i risultati rende verificabile ogni miglioramento ambientale.", votes: 11 }
    ],
    decalogoDiscoveriesMezz: [
      "1 kg di carne bovina richiede in media ~15.415 L d'acqua contro ~822 L/kg di mele e ~287 L/kg di patate (WFN 2011).",
      "Le mandorle hanno alta impronta idrica ma bassa impronta di carbonio rispetto ai formaggi stagionati: acqua e CO₂e vanno lette separatamente.",
      "Buttare metà panino significa sprecare acqua verde, blu, lavoro agricolo ed energia di cottura."
    ],
    decalogoDiscoveriesVilla: [
      "A novembre in Sicilia mandarini, arance, cachi, mele e finocchi crescono al sole senza serre riscaldate.",
      "Un cibo locale coltivato fuori stagione in serra riscaldata a gasolio può avere più emissioni di un prodotto di pieno campo.",
      "Gli imballaggi secondari e monoporzione aumentano la tara anche oltre il 20% del peso acquistato."
    ],
    schoolAudit: [
      {
        id: "audit_food",
        category: "Spreco alimentare",
        problem: "Pane e frutta avanzati a fine merenda o mensa.",
        situation: "Circa 3–4 kg di pane e frutta interi o metà porzioni lasciati ogni settimana nei cestini.",
        resources: "Acqua virtuale (~1.608 L/kg pane), energia di cottura, suolo agricolo.",
        solution: "Tavolo della condivisione per frutta integra non consumata e porzioni graduate.",
        expectedOutcome: "Riduzione stimata del 40% degli scarti alimentari evitabili in un mese.",
        verification: "Pesatura settimanale dello scarto prima e dopo l'introduzione del tavolo."
      },
      {
        id: "audit_bottles",
        category: "Bottigliette e contenitori monouso",
        problem: "Uso quotidiano di bottigliette PET e bicchieri usa e getta.",
        situation: "Molti alunni portano bottigliette usa e getta invece di borracce lavabili.",
        resources: "Plastica PET vergine, energia di stampaggio, trasporto acqua imbottigliata.",
        solution: "Sfida 'Classe Borraccia 100%' e richiesta erogatore d'acqua filtrata in corridoio.",
        expectedOutcome: "Eliminazione di oltre 800 bottigliette al mese su 4 classi.",
        verification: "Conteggio settimanale delle bottigliette nei contenitori della plastica."
      },
      {
        id: "audit_pack",
        category: "Eccesso di imballaggi",
        problem: "Merendine e snack con doppio o triplo involucro.",
        situation: "Presenza di pellicole, vaschette in plastica e cartoncini per singole porzioni.",
        resources: "Polipropilene, poliaccoppiati C/PAP difficili da riciclare, carta.",
        solution: "Adozione del portamerenda lavabile con frutta sfusa o pane del forno locale.",
        expectedOutcome: "Dimezzamento del volume dei rifiuti secchi prodotti durante l'intervallo.",
        verification: "Audit visivo dei cestini di classe il lunedì e il venerdì."
      },
      {
        id: "audit_diff",
        category: "Raccolta differenziata",
        problem: "Errori di conferimento e frazioni estranee nella carta e nella plastica.",
        situation: "Fazzoletti usati o carte unte messi nel bidone della carta.",
        resources: "Cellulosa riciclabile e materie prime seconde contaminate.",
        solution: "Etichette visive sui cestini concordate con il regolamento comunale e turni Custodi.",
        expectedOutcome: "Carichi di carta e plastica puliti senza contaminazione organica.",
        verification: "Controllo a campione a fine giornata da parte dei Custodi dell'Aula."
      },
      {
        id: "audit_water",
        category: "Consumo di acqua",
        problem: "Rubinetti lasciati aperti o piccoli gocciolamenti nei bagni.",
        situation: "Alcuni rubinetti perdono acqua o restano aperti durante l'insaponatura.",
        resources: "Acqua potabile trattata ed energia elettrica di pompaggio.",
        solution: "Segnalazione immediata ai collaboratori scolastici e adesivi 'Chiudi mentre insaponi'.",
        expectedOutcome: "Risparmio continuo di acqua potabile e riduzione perdite.",
        verification: "Registro settimanale delle segnalazioni risolte con il personale ATA."
      },
      {
        id: "audit_energy",
        category: "Consumo di energia",
        problem: "Luci e LIM accese in aule vuote durante la ricreazione o la palestra.",
        situation: "Plafoniere accese anche con forte luce naturale dalle finestre.",
        resources: "Energia elettrica di rete ed emissioni indirette associate.",
        solution: "Turno responsabile luce/LIM in ogni classe prima di uscire dall'aula.",
        expectedOutcome: "Riduzione delle ore di accensione inutile durante l'orario scolastico.",
        verification: "Griglia di spunta giornaliera alla porta dell'aula."
      }
    ],
    posterDraft: {
      title: "A scuola scegliamo la borraccia e zero imballaggi!",
      issueId: "audit_bottles",
      proposal: "Ogni studente porta la borraccia lavabile e il portamerenda rigido, riducendo la plastica monouso in tutta la scuola.",
      theme: "water_school"
    },
    supermarketSavedCartA: ["succo_brick", "fragole_fuori", "bistecca_imp", "merendina_tripla"],
    supermarketSavedCartB: ["acqua_borraccia", "mele_locali", "legumi_sfusi", "pane_forno"]
  };
}

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      resolve(null);
      return;
    }
    try {
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function mergeWithDefaults(raw: Partial<SerrLabPersistedState> | null): SerrLabPersistedState {
  const def = createDefaultLabState();
  if (!raw || typeof raw !== "object") return def;
  return {
    ...def,
    ...raw,
    completedActivities: Array.isArray(raw.completedActivities) ? raw.completedActivities : def.completedActivities,
    studiedUnits: Array.isArray(raw.studiedUnits) ? raw.studiedUnits : def.studiedUnits,
    completedMissions: Array.isArray(raw.completedMissions) ? raw.completedMissions : def.completedMissions,
    gameScores: raw.gameScores && typeof raw.gameScores === "object" ? raw.gameScores : def.gameScores,
    diaryEntries: Array.isArray(raw.diaryEntries) ? raw.diaryEntries : def.diaryEntries,
    decalogoRules: Array.isArray(raw.decalogoRules) && raw.decalogoRules.length > 0 ? raw.decalogoRules : def.decalogoRules,
    decalogoDiscoveriesMezz: Array.isArray(raw.decalogoDiscoveriesMezz) ? raw.decalogoDiscoveriesMezz : def.decalogoDiscoveriesMezz,
    decalogoDiscoveriesVilla: Array.isArray(raw.decalogoDiscoveriesVilla) ? raw.decalogoDiscoveriesVilla : def.decalogoDiscoveriesVilla,
    schoolAudit: Array.isArray(raw.schoolAudit) && raw.schoolAudit.length > 0 ? raw.schoolAudit : def.schoolAudit,
    posterDraft: raw.posterDraft && typeof raw.posterDraft === "object" ? { ...def.posterDraft, ...raw.posterDraft } : def.posterDraft,
    supermarketSavedCartA: Array.isArray(raw.supermarketSavedCartA) ? raw.supermarketSavedCartA : def.supermarketSavedCartA,
    supermarketSavedCartB: Array.isArray(raw.supermarketSavedCartB) ? raw.supermarketSavedCartB : def.supermarketSavedCartB
  };
}

export async function loadLabState(): Promise<{ state: SerrLabPersistedState; backend: string }> {
  const db = await openDb();
  if (db) {
    try {
      const stored = await new Promise<Partial<SerrLabPersistedState> | null>((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(RECORD_KEY);
        req.onsuccess = () => resolve((req.result as Partial<SerrLabPersistedState>) || null);
        req.onerror = () => resolve(null);
      });
      if (stored) {
        return { state: mergeWithDefaults(stored), backend: "IndexedDB locale (offline)" };
      }
    } catch {
      /* fallback below */
    }
  }
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) {
      return { state: mergeWithDefaults(JSON.parse(raw)), backend: "Archivio locale browser" };
    }
  } catch {
    /* ignore */
  }
  return { state: createDefaultLabState(), backend: db ? "IndexedDB locale (offline)" : "Memoria sessione + Esportazione JSON" };
}

export async function saveLabState(data: SerrLabPersistedState): Promise<string> {
  let savedVia = "Memoria sessione";
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(data));
    savedVia = "Archivio locale browser";
  } catch {
    /* ignore restricted storage */
  }
  const db = await openDb();
  if (db) {
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(data, RECORD_KEY);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
      savedVia = "IndexedDB locale (offline)";
    } catch {
      /* ignore */
    }
  }
  return savedVia;
}

export function exportLabJson(data: SerrLabPersistedState): void {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "SERR 2026 · Rete Cinque Borghi (Mezzovalle & Villacolle)",
    data
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `serr2026-risultati-${(data.studentAlias || "classe").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImportedLabJson(rawText: string): SerrLabPersistedState {
  const parsed = JSON.parse(rawText);
  const candidate = parsed && parsed.data && typeof parsed.data === "object" ? parsed.data : parsed;
  if (!candidate || typeof candidate !== "object") {
    throw new Error("Formato JSON non valido.");
  }
  return mergeWithDefaults(candidate);
}
