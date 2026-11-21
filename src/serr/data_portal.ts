export type PortalCategory = "pagine" | "app" | "video";

export interface PortalLinkItem {
  id: string;
  category: PortalCategory;
  title: string;
  provider: string;
  url: string;
  borgo: "Tutti" | "Mezzovalle" | "Villacolle" | "Cefalana" | "Dragano" | "Campolieto";
  costLabel: string;
  language: string;
  description: string;
  classUse: string;
}

export interface RecommendedFilmItem {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  durationMin: number;
  ageRange: string;
  borgo: "Tutti" | "Mezzovalle" | "Villacolle" | "Cefalana" | "Dragano" | "Campolieto";
  theme: string;
  isFree: boolean;
  freeUrl?: string;
  freeButtonLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  accessLabel: string;
  synopsis: string;
  discussionPrompt: string;
}

export const PORTAL_LINKS: PortalLinkItem[] = [
  /* ----- PAGINE WEB ISTITUZIONALI & SCIENTIFICHE ----- */
  {
    id: "web-ewwr",
    category: "pagine",
    title: "EWWR – European Week for Waste Reduction",
    provider: "Portale Europeo Ufficiale SERR",
    url: "https://www.ewwr.eu",
    borgo: "Tutti",
    costLabel: "Gratuito",
    language: "EN / FR / IT (risorse EU)",
    description:
      "Sito ufficiale della Settimana Europea per la Riduzione dei Rifiuti con tema annuale, materiali ufficiali, mappa delle azioni europee e linee guida per scuole e Comuni.",
    classUse: "Consultazione documenti ufficiali SERR 2026 e confronto con le azioni europee."
  },
  {
    id: "web-envi",
    category: "pagine",
    title: "SERR Italia – Portale Nazionale (ENVI.info)",
    provider: "Comitato Promotore Nazionale SERR",
    url: "https://www.envi.info",
    borgo: "Tutti",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Portale italiano di riferimento per iscrivere azioni scolastiche alla SERR, leggere storie di scuole italiane virtuose e scaricare i kit di comunicazione.",
    classUse: "Idee pratiche dalle scuole italiane per progettazione e evento finale dei Cinque Borghi."
  },
  {
    id: "web-mase",
    category: "pagine",
    title: "MASE – Ministero dell'Ambiente e della Sicurezza Energetica",
    provider: "Istituzione Nazionale",
    url: "https://www.mase.gov.it",
    borgo: "Tutti",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Portale istituzionale su economia circolare, strategie nazionali contro lo spreco alimentare, normative su rifiuti, imballaggi ed educazione allo sviluppo sostenibile.",
    classUse: "Ricerca di educazione civica su normative nazionali e obiettivi di prevenzione."
  },
  {
    id: "web-ispra",
    category: "pagine",
    title: "ISPRA – Rifiuti Urbani & Educazione Ambientale",
    provider: "Istituto Superiore per la Protezione e la Ricerca Ambientale",
    url: "https://www.isprambiente.gov.it",
    borgo: "Campolieto",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Dati ufficiali italiani sulla produzione pro-capite di rifiuti urbani, raccolte differenziate, recupero RAEE e iniziative didattiche per primaria e secondaria.",
    classUse: "Esercizi di matematica e statistica ambientale con dati reali italiani."
  },
  {
    id: "web-wfn",
    category: "pagine",
    title: "Water Footprint Network (Impronta Idrica)",
    provider: "Fondazione Scientifica Internazionale",
    url: "https://www.waterfootprint.org",
    borgo: "Mezzovalle",
    costLabel: "Gratuito",
    language: "Inglese",
    description:
      "Fonte scientifica mondiale di riferimento usata nel percorso di Mezzovalle per distinguere acqua verde, blu e grigia lungo la produzione di alimenti e tessuti.",
    classUse: "Verifica delle fonti scientifiche usate in A1 e A2 sull'acqua virtuale."
  },
  {
    id: "web-fao",
    category: "pagine",
    title: "FAO – Technical Platform on Food Loss and Waste",
    provider: "Organizzazione delle Nazioni Unite (FAO)",
    url: "https://www.fao.org/platform-food-loss-waste/en",
    borgo: "Mezzovalle",
    costLabel: "Gratuito",
    language: "Inglese / Multilingue",
    description:
      "Piattaforma ONU che raccoglie dati globali su perdite agricole e spreco alimentare domestico, distinguendo tra spreco lungo la filiera e spreco al consumo.",
    classUse: "Approfondimento sul Detective dello Spreco e confronto tra Paesi."
  },
  {
    id: "web-crea",
    category: "pagine",
    title: "CREA – Alimenti, Nutrizione & Stagionalità",
    provider: "Consiglio per la ricerca in agricoltura (Italia)",
    url: "https://www.crea.gov.it",
    borgo: "Villacolle",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Ente italiano di ricerca agroalimentare con linee guida su sana alimentazione, biodiversità stagionale e valorizzazione delle produzioni locali senza sprechi.",
    classUse: "Verifica di porzioni equilibrate, varietà alimentare e calendari stagionali."
  },
  {
    id: "web-conai",
    category: "pagine",
    title: "CONAI – Progetti Scuole ed Ecodesign Imballaggi",
    provider: "Consorzio Nazionale Imballaggi",
    url: "https://www.conai.org",
    borgo: "Villacolle",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Informazioni sui consorzi di filiera (carta, plastica, vetro, acciaio, alluminio, legno), prevenzione del packaging e progetti scolastici come Riciclo di Classe.",
    classUse: "Supporto a Caccia agli Imballaggi (B4) e progettazione imballaggi ridotti."
  },
  {
    id: "web-emf",
    category: "pagine",
    title: "Ellen MacArthur Foundation – Economia Circolare",
    provider: "Fondazione Internazionale Economia Circolare",
    url: "https://www.ellenmacarthurfoundation.org",
    borgo: "Cefalana",
    costLabel: "Gratuito",
    language: "Inglese",
    description:
      "Schemi visivi, diagrammi a farfalla e casi reali su ecodesign, riparabilità, eliminazione dei rifiuti alla fonte e rigenerazione dei sistemi naturali.",
    classUse: "Analisi del modello lineare vs circolare nella scuola secondaria."
  },
  {
    id: "web-unric",
    category: "pagine",
    title: "ONU Italia (UNRIC) – Agenda 2030 in Italiano",
    provider: "Centro Regionale d'Informazione ONU",
    url: "https://unric.org/it/agenda-2030/",
    borgo: "Dragano",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Schede ufficiali in italiano sui 17 Obiettivi di Sviluppo Sostenibile, in particolare Goal 12 (Consumo e produzione responsabili) e Goal 15 (Vita sulla Terra).",
    classUse: "Collegamento interdisciplinare di Educazione Civica per tutti i borghi."
  },

  /* ----- APPLICAZIONI & CALCOLATORI ESTERNI ----- */
  {
    id: "app-junker",
    category: "app",
    title: "Junker App – Guida Raccolta Differenziata Comunale",
    provider: "Junker Srl (Italia)",
    url: "https://junkerapp.it",
    borgo: "Villacolle",
    costLabel: "App gratuita",
    language: "Italiano",
    description:
      "Riconosce i materiali degli imballaggi da codice a barre o foto e indica il conferimento corretto in base alle regole reali del singolo Comune italiano.",
    classUse: "Verifica pratica in classe delle etichette ambientali su scatole, flaconi e incarti."
  },
  {
    id: "app-wfn-calc",
    category: "app",
    title: "Water Footprint Interactive Calculator",
    provider: "Water Footprint Network",
    url: "https://www.waterfootprint.org/interactive-tools/",
    borgo: "Mezzovalle",
    costLabel: "Web app gratuita",
    language: "Inglese",
    description:
      "Strumenti interattivi online (Quick & Extended Calculator) per confrontare la propria impronta idrica settimanale legata a dieta e consumi domestici.",
    classUse: "Confronto guidato alla LIM dopo il Calcolatore locale di Mezzovalle (A2)."
  },
  {
    id: "app-overshoot-calc",
    category: "app",
    title: "Personal Footprint Calculator (Quanti Pianeti Usi?)",
    provider: "Global Footprint Network",
    url: "https://www.footprintcalculator.org",
    borgo: "Tutti",
    costLabel: "Web app gratuita",
    language: "Italiano / Multilingue",
    description:
      "Simulatore grafico interattivo che calcola l'Impronta Ecologica individuale e la data personale dell'Earth Overshoot Day in base a cibo, mobilità e consumi.",
    classUse: "Attività di gruppo in laboratorio informatico per visualizzare l'impatto delle scelte quotidiane."
  },
  {
    id: "app-overshoot-portal",
    category: "app",
    title: "Earth Overshoot Day – Dati & Soluzioni",
    provider: "Global Footprint Network",
    url: "https://www.overshootday.org",
    borgo: "Dragano",
    costLabel: "Gratuito",
    language: "Inglese / Risorse globali",
    description:
      "Schede storiche e strumenti educativi per capire in che giorno dell'anno l'umanità esaurisce il budget ecologico annuale della Terra.",
    classUse: "Introduzione al concetto di limite delle risorse e rigenerazione naturale."
  },
  {
    id: "app-ifixit",
    category: "app",
    title: "iFixit – Manuali Gratuiti di Riparazione",
    provider: "Comunità Open-Source iFixit",
    url: "https://www.ifixit.com",
    borgo: "Cefalana",
    costLabel: "Gratuito / Open Source",
    language: "Italiano / Inglese",
    description:
      "Migliaia di guide fotografiche passo-passo per riparare dispositivi elettronici, piccoli elettrodomestici e oggetti di uso comune con indici di riparabilità.",
    classUse: "Osservare con il docente l'indice di riparabilità degli oggetti (modulo Ecodesign)."
  },
  {
    id: "app-openfoodfacts",
    category: "app",
    title: "Open Food Facts – Eco-Score e Imballaggi",
    provider: "Progetto Open Data Collaborativo",
    url: "https://world.openfoodfacts.org",
    borgo: "Villacolle",
    costLabel: "Gratuito / Open Data",
    language: "Italiano / Multilingue",
    description:
      "Database aperto e collaborativo sui prodotti alimentari: permette di esplorare ingredienti, materiali di confezionamento, grado di trasformazione NOVA e Eco-Score.",
    classUse: "Analisi scientifica delle etichette durante le attività del Supermercato delle Scelte."
  },
  {
    id: "app-tgtg",
    category: "app",
    title: "Too Good To Go – Piattaforma Antispreco",
    provider: "Too Good To Go",
    url: "https://www.toogoodtogo.com",
    borgo: "Mezzovalle",
    costLabel: "Informazioni & App gratuite",
    language: "Italiano",
    description:
      "Esempio reale di servizio digitale che mette in contatto panetterie, fruttivendoli e negozi con i cittadini per recuperare invenduti commestibili a fine giornata.",
    classUse: "Caso studio su innovazione sociale e riduzione dello spreco commerciale."
  },
  {
    id: "app-direfareraee",
    category: "app",
    title: "DireFareRAEE – Guida al Riciclo Elettronico",
    provider: "Erion WEEE",
    url: "https://www.direfareraee.it",
    borgo: "Campolieto",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Portale divulgativo dedicato ai Rifiuti di Apparecchiature Elettriche ed Elettroniche: spiega cosa c'è dentro smartphone e pc e come funzionano i punti di raccolta Uno contro Zero.",
    classUse: "Preparazione alle sfide di Campolieto su RAEE, materie prime critiche e raccolta."
  },

  /* ----- VIDEO DIDATTICI & CORTOMETRAGGI ESTERNI ----- */
  {
    id: "vid-storyofstuff-site",
    category: "video",
    title: "The Story of Stuff Project – Libreria Video Completa",
    provider: "The Story of Stuff Project",
    url: "https://www.storyofstuff.org/movies/",
    borgo: "Cefalana",
    costLabel: "Visione gratuita online",
    language: "Inglese (sottotitoli disponibili)",
    description:
      "Raccolta ufficiale gratuita di cortometraggi animati (The Story of Stuff, Bottled Water, Electronics, Microfibers) che illustrano estrazione, produzione, consumo e smaltimento.",
    classUse: "Proiezione alla LIM di un corto da 8–20 minuti seguita da mappa concettuale."
  },
  {
    id: "vid-storyofstuff-yt",
    category: "video",
    title: "Canale YouTube Ufficiale – The Story of Stuff",
    provider: "YouTube (@StoryofStuff)",
    url: "https://www.youtube.com/@StoryofStuff",
    borgo: "Tutti",
    costLabel: "Visione gratuita YouTube",
    language: "Inglese (CC / sottotitoli automatici IT)",
    description:
      "Tutti i mini-documentari animati della serie disponibili gratuitamente in streaming con attivazione dei sottotitoli italiani per le classi.",
    classUse: "Copia il link di un video singolo nello strumento YouTube di Strumenti & IA."
  },
  {
    id: "vid-raiscuola",
    category: "video",
    title: "Rai Scuola – Economia Circolare, Rifiuti e Spreco",
    provider: "Rai Cultura / Rai Scuola",
    url: "https://www.raiscuola.rai.it",
    borgo: "Dragano",
    costLabel: "Visione gratuita",
    language: "Italiano",
    description:
      "Portale pubblico con videolezioni e servizi su economia circolare, bioraffinerie dagli scarti di arance e mele, compostaggio e spreco alimentare.",
    classUse: "Ricerca interna per parole chiave: 'economia circolare', 'bioraffinerie', 'spreco alimentare'."
  },
  {
    id: "vid-erion-raee",
    category: "video",
    title: "Erion WEEE – Risorse Multimediali sui RAEE",
    provider: "Consorzio Erion WEEE",
    url: "https://erionweee.it",
    borgo: "Campolieto",
    costLabel: "Gratuito",
    language: "Italiano",
    description:
      "Sezione informativa e materiali video sulle filiere di recupero dei piccoli elettrodomestici, computer, lampadine e batterie dismesse.",
    classUse: "Approfondimento visivo sul riciclo dei metalli rari per Campolieto."
  }
];

export const RECOMMENDED_FILMS: RecommendedFilmItem[] = [
  {
    id: "film-story-of-stuff",
    title: "La Storia delle Cose (The Story of Stuff)",
    originalTitle: "The Story of Stuff",
    year: 2007,
    durationMin: 20,
    ageRange: "9–14 anni",
    borgo: "Cefalana",
    theme: "Economia dei materiali, consumo e prevenzione rifiuti",
    isFree: true,
    freeUrl: "https://www.storyofstuff.org/movies/",
    freeButtonLabel: "Guarda gratis sul sito ufficiale ↗",
    secondaryUrl: "https://www.youtube.com/@StoryofStuff",
    secondaryLabel: "Canale YouTube",
    accessLabel: "Visione gratuita online (streaming ufficiale libero)",
    synopsis:
      "Celebre film d'animazione alla lavagna che spiega in modo chiarissimo le cinque tappe dell'economia lineare — estrazione, produzione, distribuzione, consumo e smaltimento — e perché comprare meglio e riparare cambia il sistema.",
    discussionPrompt:
      "Chiedi alla classe: quale oggetto nel vostro zaino ha attraversato più continenti prima di arrivare a scuola?"
  },
  {
    id: "film-story-electronics-water",
    title: "The Story of Electronics & The Story of Bottled Water",
    year: 2010,
    durationMin: 16,
    ageRange: "9–14 anni",
    borgo: "Campolieto",
    theme: "Obsolescenza programmata, RAEE e acqua in bottiglia",
    isFree: true,
    freeUrl: "https://www.storyofstuff.org/movies/",
    freeButtonLabel: "Guarda gratis su Story of Stuff ↗",
    accessLabel: "Visione gratuita online (due cortometraggi da 8 min)",
    synopsis:
      "Due corti animati gemelli: il primo svela come molti dispositivi elettronici vengano progettati per durare poco ('designed for the dump'), il secondo confronta l'acqua del rubinetto/borraccia con la plastica delle bottiglie usa e getta.",
    discussionPrompt:
      "Confrontate in classe i vantaggi della borraccia di Rico e dell'indice di riparabilità dei dispositivi."
  },
  {
    id: "film-home",
    title: "HOME – La nostra Terra",
    originalTitle: "HOME (Yann Arthus-Bertrand)",
    year: 2009,
    durationMin: 93,
    ageRange: "10–14 anni",
    borgo: "Mezzovalle",
    theme: "Acqua, agricoltura intensiva, suolo e fragilità degli ecosistemi",
    isFree: true,
    freeUrl: "https://www.goodplanet.org",
    freeButtonLabel: "Vai al progetto gratuito GoodPlanet ↗",
    accessLabel: "Visione gratuita non-profit (finanziato per distribuzione libera su YouTube / GoodPlanet)",
    synopsis:
      "Documentario girato interamente con riprese aeree in oltre 50 Paesi, voluto espressamente senza scopo di lucro per mostrare gratuitamente a scuole e cittadini il legame tra acqua dolce, agricoltura, foreste ed energia.",
    discussionPrompt:
      "Selezionate 15 minuti dedicati all'acqua agricola per collegarli ai grafici di Mezzovalle."
  },
  {
    id: "film-materia-viva",
    title: "Materia Viva",
    year: 2023,
    durationMin: 75,
    ageRange: "11–14 anni",
    borgo: "Campolieto",
    theme: "Economia circolare, smartphone, terre rare e RAEE in Italia",
    isFree: true,
    freeUrl: "https://www.raiplay.it",
    freeButtonLabel: "Cerca su RaiPlay (streaming gratuito) ↗",
    secondaryUrl: "https://www.direfareraee.it",
    secondaryLabel: "Progetto DireFareRAEE",
    accessLabel: "Visione gratuita su RaiPlay (cerca 'Materia Viva' nel catalogo) · promo e info su DireFareRAEE",
    synopsis:
      "Docufilm italiano promosso da Erion WEEE che racconta in modo dinamico e vicino ai ragazzi cosa succede ai dispositivi elettronici quando smettono di funzionare e quali materiali preziosi possono essere recuperati.",
    discussionPrompt:
      "Organizzate un censimento anonimo di classe sui vecchi telefoni o cavi dimenticati nei cassetti di casa."
  },
  {
    id: "film-affamati",
    title: "Affamati di spreco",
    year: 2015,
    durationMin: 52,
    ageRange: "11–14 anni",
    borgo: "Mezzovalle",
    theme: "Spreco alimentare domestico e recupero delle eccedenze in Italia",
    isFree: true,
    freeUrl: "https://www.raiscuola.rai.it",
    freeButtonLabel: "Cerca negli archivi Rai Scuola ↗",
    accessLabel: "Archivio didattico Rai Scuola (speciale e clip informative gratuite)",
    synopsis:
      "Reportage italiano di Maite Carpio con Oxfam che mette a confronto le abitudini quotidiane di spesa e scarto alimentare con iniziative concrete di recupero del cibo ancora buono.",
    discussionPrompt:
      "Collegate le scene della spesa domestica alle 10 situazioni del Detective dello Spreco."
  },
  {
    id: "film-walle",
    title: "WALL·E",
    year: 2008,
    durationMin: 98,
    ageRange: "6–14 anni",
    borgo: "Dragano",
    theme: "Iperconsumo, montagna di rifiuti, biodiversità e speranza",
    isFree: false,
    accessLabel: "Non gratuito online · Disponibile su Disney+, noleggio digitale o mediateca scolastica",
    synopsis:
      "Capolavoro d'animazione Pixar praticamente privo di dialoghi nella prima parte: un piccolo robottino compattatore resta solo su una Terra sommersa dai rifiuti, finché un semplice germoglio riaccende la cura per il pianeta.",
    discussionPrompt:
      "Prima ancora di riciclare, cosa avrebbero dovuto cambiare gli abitanti dell'Axiom? Perfetto per Primaria e Secondaria."
  },
  {
    id: "film-lorax",
    title: "Lorax – Il guardiano della foresta",
    originalTitle: "The Lorax",
    year: 2012,
    durationMin: 86,
    ageRange: "6–11 anni",
    borgo: "Dragano",
    theme: "Tutela dei boschi, domanda inutile di prodotti usa e getta, aria pulita",
    isFree: false,
    accessLabel: "Non gratuito online · Disponibile a noleggio digitale o in DVD / mediateche comunali",
    synopsis:
      "Tratto dal celebre libro illustrato del Dr. Seuss: racconta come l'avidità di produrre sempre più oggetti superflui distrugga una foresta intera finché un bambino decide di piantare l'ultimo seme rimasto.",
    discussionPrompt:
      "In classe: quali oggetti 'Thneed' compriamo oggi anche se non ci servono davvero?"
  },
  {
    id: "film-domani",
    title: "Domani (Demain)",
    originalTitle: "Demain",
    year: 2015,
    durationMin: 118,
    ageRange: "11–14 anni",
    borgo: "Villacolle",
    theme: "Agricoltura locale, filiera corta, scuole virtuose ed economia circolare",
    isFree: false,
    accessLabel: "Non gratuito online · Noleggio digitale (CHILI, Apple TV, Timvision) o cineforum scolastici",
    synopsis:
      "Documentario costruttivo premiato con il Premio César: invece di limitarsi alle emergenze, viaggia tra Francia, Inghilterra, Finlandia e India per mostrare orti urbani, mense sostenibili e scuole che già funzionano bene.",
    discussionPrompt:
      "Prendete spunto dalle comunità mostrate nel film per scrivere un articolo del Decalogo di Mezzovalle e Villacolle."
  },
  {
    id: "film-just-eat-it",
    title: "Just Eat It: A Food Waste Story",
    year: 2014,
    durationMin: 75,
    ageRange: "11–14 anni",
    borgo: "Mezzovalle",
    theme: "Spreco estetico di frutta e verdura, date di scadenza e frigorifero",
    isFree: false,
    accessLabel: "Non gratuito online in Italia · Noleggio digitale / rassegne scolastiche (disponibili estratti sul web)",
    synopsis:
      "Due giovani registi fanno una scommessa: smettere di comprare al supermercato per sei mesi e nutrirsi solo del cibo perfettamente commestibile scartato da negozi e fattorie per difetti estetici o date vicine.",
    discussionPrompt:
      "Discutete la differenza tra 'Da consumarsi entro' e 'Da consumarsi preferibilmente entro'."
  },
  {
    id: "film-before-the-flood",
    title: "Before the Flood – Punto di non ritorno",
    originalTitle: "Before the Flood",
    year: 2016,
    durationMin: 96,
    ageRange: "12–14 anni",
    borgo: "Dragano",
    theme: "Clima, scelte alimentari, deforestazione e transizione energetica",
    isFree: false,
    accessLabel: "Piattaforme on demand (Disney+ / archivi scolastici National Geographic)",
    synopsis:
      "Viaggio documentario prodotto da National Geographic che mostra in modo diretto come produzione alimentare, foreste, energia e consumi quotidiani influenzino l'equilibrio climatico del pianeta.",
    discussionPrompt:
      "Confrontate le scelte energetiche e alimentari mostrate con i laboratori di Mezzovalle e Campolieto."
  },
  {
    id: "film-wasted",
    title: "Wasted! The Story of Food Waste",
    year: 2017,
    durationMin: 90,
    ageRange: "12–14 anni",
    borgo: "Villacolle",
    theme: "Trasformazione creativa degli scarti alimentari e cucina circolare",
    isFree: false,
    accessLabel: "Non gratuito online · Disponibile a noleggio su Prime Video / Apple TV / archivi",
    synopsis:
      "Documentario dinamico che coinvolge chef internazionali e ricercatori per dimostrare come bucce, ossa, pane raffermo e parti meno usate degli alimenti possano diventare piatti gustosi evitando il cassonetto.",
    discussionPrompt:
      "Progettate una ricetta antispreco di classe per la rubrica Cucina di Recupero."
  },
  {
    id: "film-plastic-ocean",
    title: "A Plastic Ocean",
    year: 2016,
    durationMin: 102,
    ageRange: "11–14 anni",
    borgo: "Villacolle",
    theme: "Imballaggi monouso, microplastiche marine e alternative sfuse",
    isFree: false,
    accessLabel: "Non gratuito su catalogo commerciale italiano · Utilizzato in rassegne ambientali scolastiche",
    synopsis:
      "Indagine giornalistica e scientifica girata in venti località marine per documentare dove finiscono milioni di imballaggi in plastica monouso e perché la prevenzione alla fonte è molto più efficace della pulizia a valle.",
    discussionPrompt:
      "Collegate il documentario alle regole dell'Attività 4 'Caccia agli Imballaggi' di Villacolle."
  }
];
