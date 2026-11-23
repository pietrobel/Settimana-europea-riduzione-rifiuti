export type SerrTopicId = "mezzovalle" | "villacolle" | "cefalana" | "dragano" | "campolieto";
export type AgeBandId = "tutte" | "primaria" | "media";

export interface TopicProfile {
  topicId: SerrTopicId;
  tematica: string;
  shortTematica: string;
  comune: string;
  color: string;
  summary: string;
}

export interface OfflineVideoScene {
  sceneTitle: string;
  durationSec: number;
  visualType: "water" | "supply" | "repair" | "forest" | "raee";
  caption: string;
}

export interface IntroVideoItem {
  id: string;
  topicId: SerrTopicId;
  tematica: string;
  comune: string;
  ageBand: "primaria" | "media";
  ageRangeLabel: string;
  title: string;
  channel: string;
  durationLabel: string;
  languageNote: string;
  youtubeId: string;
  synopsis: string;
  classQuestion: string;
  offlineScenes: OfflineVideoScene[];
}

export const TOPIC_PROFILES: Record<SerrTopicId, TopicProfile> = {
  mezzovalle: {
    topicId: "mezzovalle",
    tematica: "Acqua, Cibo & Impronta Nascosta",
    shortTematica: "Acqua & Cibo",
    comune: "Mezzovalle",
    color: "#1d6fa5",
    summary: "Scoprire l'acqua invisibile (virtuale) negli alimenti e azzerare gli sprechi a mensa e a casa."
  },
  villacolle: {
    topicId: "villacolle",
    tematica: "Filiera Corta, Stagionalità & Imballaggi",
    shortTematica: "Km Zero & Imballi",
    comune: "Villacolle",
    color: "#1f7a4c",
    summary: "Dal campo alla scuola: leggere i chilometri reali, la stagione giusta e tagliare gli imballi inutili."
  },
  cefalana: {
    topicId: "cefalana",
    tematica: "Riparazione, Acqua Storica & Ecodesign",
    shortTematica: "Riparazione & Ecodesign",
    comune: "Cefalana",
    color: "#0f766e",
    summary: "Progettare oggetti che durano e si riparano (viti vs colla), tutelando le risorse idriche."
  },
  dragano: {
    topicId: "dragano",
    tematica: "Bosco Pulito, Natura & Compostaggio",
    shortTematica: "Bosco & Compost",
    comune: "Dragano",
    color: "#3f6212",
    summary: "Imparare dai cicli naturali del bosco per non abbandonare plastica e trasformare l'umido in compost."
  },
  campolieto: {
    topicId: "campolieto",
    tematica: "RAEE, Digitale Sostenibile & Energia",
    shortTematica: "RAEE & Energia",
    comune: "Campolieto",
    color: "#7c2d12",
    summary: "Recuperare i materiali preziosi nascosti nei dispositivi elettronici e ridurre lo spreco energetico."
  }
};

export const INTRO_VIDEOS: IntroVideoItem[] = [
  /* ===== 1. ACQUA, CIBO & IMPRONTA NASCOSTA (Mezzovalle) ===== */
  {
    id: "vid-mezz-primaria",
    topicId: "mezzovalle",
    tematica: "Acqua, Cibo & Impronta Nascosta",
    comune: "Mezzovalle",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "Impronta idrica, ogni goccia conta! (Dany, la gocciolina di Auri)",
    channel: "Arpa Umbria",
    durationLabel: "4 min 40 sec",
    languageNote: "Italiano",
    youtubeId: "2m0TEEuV3hI",
    synopsis:
      "Cartone animato divulgativo che accompagna i bambini alla scoperta dell'acqua invisibile contenuta nel cibo e negli oggetti di tutti i giorni.",
    classQuestion: "Quanta acqua invisibile risparmiamo se finiamo tutto il nostro panino senza buttarlo?",
    offlineScenes: [
      {
        sceneTitle: "1. L'acqua che vedi e quella che non vedi",
        durationSec: 45,
        visualType: "water",
        caption: "Quando apri il rubinetto vedi l'acqua blu. Ma ogni frutto, quaderno o maglietta ha usato tantissima acqua per nascere!"
      },
      {
        sceneTitle: "2. Quanta acqua c'è nella merenda?",
        durationSec: 55,
        visualType: "water",
        caption: "Una mela da 150 g usa circa 123 litri indicativi; una fetta di formaggio o cioccolato ne richiede molti di più."
      },
      {
        sceneTitle: "3. Regola d'oro contro lo spreco",
        durationSec: 45,
        visualType: "water",
        caption: "Chiedere la porzione giusta a mensa e usare la borraccia lavabile protegge ogni giorno le sorgenti."
      }
    ]
  },
  {
    id: "vid-mezz-media",
    topicId: "mezzovalle",
    tematica: "Acqua, Cibo & Impronta Nascosta",
    comune: "Mezzovalle",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "L'acqua che mangiamo (Pillole di conoscenza)",
    channel: "Pillole di Conoscenza / ISIS Europa",
    durationLabel: "4 min",
    languageNote: "Italiano",
    youtubeId: "JOz0bhslLkA",
    synopsis:
      "Video scolastico chiaro e diretto sul concetto di acqua virtuale (verde, blu e grigia) e sull'impatto idrico delle nostre scelte alimentari.",
    classQuestion: "Qual è la differenza tra acqua blu di irrigazione, acqua verde piovana e acqua grigia?",
    offlineScenes: [
      {
        sceneTitle: "1. Il concetto di Impronta Idrica (WFN)",
        durationSec: 50,
        visualType: "water",
        caption: "L'impronta idrica somma acqua verde (pioggia), acqua blu (fiumi/falde) e acqua grigia (necessaria a diluire gli inquinanti)."
      },
      {
        sceneTitle: "2. Confronto tra filiere alimentari",
        durationSec: 60,
        visualType: "water",
        caption: "Colture vegetali, legumi e cereali hanno impronte molto inferiori rispetto agli alimenti che richiedono lunghi cicli di foraggio."
      },
      {
        sceneTitle: "3. Dallo spreco alimentare allo spreco idrico",
        durationSec: 50,
        visualType: "water",
        caption: "Buttare 1 kg di cibo significa sprecare anche tutta l'acqua e l'energia già investite nei campi."
      }
    ]
  },
  {
    id: "vid-mezz-spreco-primaria",
    topicId: "mezzovalle",
    tematica: "Acqua, Cibo & Impronta Nascosta",
    comune: "Mezzovalle",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "Spreco alimentare – Renato lo scienziato",
    channel: "Mela Educational",
    durationLabel: "3 min 30 sec",
    languageNote: "Italiano",
    youtubeId: "5tPecq7hh_E",
    synopsis:
      "Episodio animato e giocoso pensato per la scuola primaria su come evitare lo spreco del cibo a tavola e proteggere le risorse usate per produrlo.",
    classQuestion: "Quali tre gesti semplici possiamo fare a mensa e a casa per salvare il cibo avanzato?",
    offlineScenes: [
      {
        sceneTitle: "1. Il cibo nasce con acqua, terra e lavoro",
        durationSec: 45,
        visualType: "water",
        caption: "Dietro a una fetta di pane o a un frutto ci sono mesi di pioggia, sole e cure degli agricoltori."
      },
      {
        sceneTitle: "2. La regola FIFO in dispensa e frigo",
        durationSec: 45,
        visualType: "water",
        caption: "First In, First Out: mettiamo davanti i prodotti già aperti o più vicini alla scadenza per non dimenticarli."
      },
      {
        sceneTitle: "3. Zero avanzi con creatività",
        durationSec: 45,
        visualType: "water",
        caption: "Pane raffermo trasformato in crostini o polpette e frutta matura in frullati salvano migliaia di litri d'acqua nascosta."
      }
    ]
  },
  {
    id: "vid-mezz-mase-media",
    topicId: "mezzovalle",
    tematica: "Acqua, Cibo & Impronta Nascosta",
    comune: "Mezzovalle",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "Acqua: una risorsa vitale (Dipende Da Noi)",
    channel: "Ministero Ambiente e Sicurezza Energetica (MASE)",
    durationLabel: "4 min 30 sec",
    languageNote: "Italiano",
    youtubeId: "Ic9x4N9Ik8c",
    synopsis:
      "Videolezione istituzionale MASE sull'uso della risorsa idrica in agricoltura, nell'industria e nelle scelte alimentari quotidiane.",
    classQuestion: "In che modo alternare proteine vegetali locali e ridurre gli sprechi protegge l'acqua dolce?",
    offlineScenes: [
      {
        sceneTitle: "1. L'acqua dolce disponibile sulla Terra è poca",
        durationSec: 50,
        visualType: "water",
        caption: "Meno dell'1% dell'acqua del pianeta è acqua dolce accessibile: agricoltura e produzione alimentare assorbono la quota maggiore."
      },
      {
        sceneTitle: "2. Confrontare stili alimentari e filiere",
        durationSec: 55,
        visualType: "water",
        caption: "Legumi, cereali integrali e ortaggi di pieno campo hanno un fabbisogno idrico nettamente più sostenibile."
      },
      {
        sceneTitle: "3. Obiettivo 12.3: dimezzare lo spreco",
        durationSec: 50,
        visualType: "water",
        caption: "Pianificare spesa, porzioni e recupero delle eccedenze è la leva più rapida per risparmiare acqua blu e grigia."
      }
    ]
  },

  /* ===== 2. FILIERA CORTA, STAGIONALITA & IMBALLAGGI (Villacolle) ===== */
  {
    id: "vid-villa-primaria",
    topicId: "villacolle",
    tematica: "Filiera Corta, Stagionalità & Imballaggi",
    comune: "Villacolle",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "La straordinaria storia degli imballaggi e del riciclo",
    channel: "CONAI",
    durationLabel: "3 min 30 sec",
    languageNote: "Italiano",
    youtubeId: "uH04E_8dXjs",
    synopsis:
      "Animazione chiara per ragazzi che spiega a cosa servono gli imballaggi, come evitare quelli superflui e perché vanno differenziati con cura.",
    classQuestion: "Quando entriamo al mercato o al supermercato, quali confezioni doppie possiamo lasciare sullo scaffale?",
    offlineScenes: [
      {
        sceneTitle: "1. A cosa serve un imballaggio?",
        durationSec: 45,
        visualType: "supply",
        caption: "L'imballaggio protegge il cibo dagli urti. Ma una banana o un'arancia hanno già la loro buccia naturale!"
      },
      {
        sceneTitle: "2. Scegliere sfuso e di stagione",
        durationSec: 50,
        visualType: "supply",
        caption: "La frutta di stagione cresciuta vicino a casa non ha bisogno di vaschette sigillate né di lunghi viaggi in nave o aereo."
      },
      {
        sceneTitle: "3. Differenziare quando serve",
        durationSec: 45,
        visualType: "supply",
        caption: "Quando un imballaggio è necessario, separiamo bene carta, vetro, plastica, alluminio e legno per dargli nuova vita."
      }
    ]
  },
  {
    id: "vid-villa-media",
    topicId: "villacolle",
    tematica: "Filiera Corta, Stagionalità & Imballaggi",
    comune: "Villacolle",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "Qual è la differenza tra filiera corta e Km 0?",
    channel: "Altroconsumo",
    durationLabel: "2 min 36 sec",
    languageNote: "Italiano",
    youtubeId: "AlRe5fH0UnE",
    synopsis:
      "Spiegazione sintetica e rigorosa che distingue distanza geografica (Km 0), numero di passaggi commerciali (filiera corta) ed efficienza logistica/serre.",
    classQuestion: "Un pomodoro locale coltivato in serra riscaldata a gennaio inquina meno di un prodotto di stagione trasportato su ferrovia?",
    offlineScenes: [
      {
        sceneTitle: "1. Filiera corta non significa sempre Km 0",
        durationSec: 50,
        visualType: "supply",
        caption: "La filiera corta riduce gli intermediari tra produttore e cittadino; il Km 0 indica invece la vicinanza territoriale."
      },
      {
        sceneTitle: "2. Il ruolo decisivo della stagionalità",
        durationSec: 55,
        visualType: "supply",
        caption: "Coltivare fuori stagione in serre riscaldate può consumare molta più energia del trasporto su scala regionale."
      },
      {
        sceneTitle: "3. Lettura critica dello scaffale",
        durationSec: 45,
        visualType: "supply",
        caption: "Valutiamo insieme origine, mese di raccolta, peso dell'imballaggio e modalità di conservazione."
      }
    ]
  },
  {
    id: "vid-villa-stagione-primaria",
    topicId: "villacolle",
    tematica: "Filiera Corta, Stagionalità & Imballaggi",
    comune: "Villacolle",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "W il cibo di stagione (Educazione alimentare e stagionalità)",
    channel: "Cooperativa Il Cammino",
    durationLabel: "3 min",
    languageNote: "Italiano",
    youtubeId: "Zpe9JPGPb9U",
    synopsis:
      "Video educativo per i più piccoli per scoprire perché ogni frutta e verdura ha i suoi mesi naturali, con più gusto e meno trasporti e serre.",
    classQuestion: "Quali frutti di novembre possiamo mettere nella merenda di domani senza usare vaschette di plastica?",
    offlineScenes: [
      {
        sceneTitle: "1. Ogni stagione ha i suoi colori",
        durationSec: 40,
        visualType: "supply",
        caption: "In autunno maturano arance, mandarini, cachi, mele e finocchi; fragole e angurie invece aspettano primavera ed estate."
      },
      {
        sceneTitle: "2. Più buoni, più vicini, meno imballi",
        durationSec: 45,
        visualType: "supply",
        caption: "Quando raccogliamo vicino a casa nella stagione giusta, il cibo non deve fare lunghi viaggi né stare chiuso nella plastica."
      },
      {
        sceneTitle: "3. Regola Refuse & Reduce alla spesa",
        durationSec: 45,
        visualType: "supply",
        caption: "Applichiamo le prime R inglesi: Refuse (rifiuta la bustina inutile) e Reduce (riduci le confezioni multiple)."
      }
    ]
  },
  {
    id: "vid-villa-stagione-media",
    topicId: "villacolle",
    tematica: "Filiera Corta, Stagionalità & Imballaggi",
    comune: "Villacolle",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "La stagionalità di frutta e verdura",
    channel: "CEMAD · Policlinico Universitario Gemelli",
    durationLabel: "3 min 30 sec",
    languageNote: "Italiano",
    youtubeId: "jS4lMag3IoQ",
    synopsis:
      "Spiegazione chiara del legame tra stagionalità naturale, qualità nutrizionale, filiera agroalimentare e riduzione dell'impatto energetico.",
    classQuestion: "Come cambia l'impatto di un ortaggio tra pieno campo di stagione e serra riscaldata fuori stagione?",
    offlineScenes: [
      {
        sceneTitle: "1. Ciclo naturale vs coltivazione forzata",
        durationSec: 50,
        visualType: "supply",
        caption: "Coltivare in pieno campo sfrutta sole e pioggia naturali; fuori stagione invece servono serre riscaldate o lunghi trasporti."
      },
      {
        sceneTitle: "2. Leggere l'etichetta di origine obbligatoria",
        durationSec: 50,
        visualType: "supply",
        caption: "In UE frutta e verdura fresche devono indicare il Paese di origine: confrontiamolo sempre con la stagione dell'anno."
      },
      {
        sceneTitle: "3. Filiera corta, prezzo al kg e imballaggi",
        durationSec: 50,
        visualType: "supply",
        caption: "Unire prodotti di stagione, formati sfusi e cassette riutilizzabili massimizza qualità nutrizionale e risparmio di risorse."
      }
    ]
  },

  /* ===== 3. RIPARAZIONE, ACQUA STORICA & ECODESIGN (Cefalana) ===== */
  {
    id: "vid-cefa-primaria",
    topicId: "cefalana",
    tematica: "Riparazione, Acqua Storica & Ecodesign",
    comune: "Cefalana",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "The Secret Six – Operazione 5: L'Economia Circolare",
    channel: "COREPLA",
    durationLabel: "3 min",
    languageNote: "Italiano",
    youtubeId: "QFAeHaQ6fdI",
    synopsis:
      "Avventura animata breve e coinvolgente per comprendere il passaggio dal modello usa-e-getta al cerchio virtuoso di riuso, riparazione e riciclo.",
    classQuestion: "Se si stacca la ruota a un giocattolo o si scarica la batteria, come possiamo allungargli la vita?",
    offlineScenes: [
      {
        sceneTitle: "1. Linea dritta vs Cerchio della natura",
        durationSec: 45,
        visualType: "repair",
        caption: "Usare una cosa una volta sola e buttarla crea montagne di rifiuti. In un cerchio invece tutto torna utile!"
      },
      {
        sceneTitle: "2. La forza della riparazione",
        durationSec: 50,
        visualType: "repair",
        caption: "Riparare un astuccio, cucire uno strappo o scambiare giochi raddoppia il tempo di utilizzo senza consumare risorse nuove."
      },
      {
        sceneTitle: "3. Oggetti progettati con intelligenza",
        durationSec: 45,
        visualType: "repair",
        caption: "Le viti si aprono e si aggiustano; la colla sigillata invece costringe spesso a buttare l'intero oggetto."
      }
    ]
  },
  {
    id: "vid-cefa-media",
    topicId: "cefalana",
    tematica: "Riparazione, Acqua Storica & Ecodesign",
    comune: "Cefalana",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "L'economia circolare (HUB Scuola)",
    channel: "HUB Scuola",
    durationLabel: "3 min 50 sec",
    languageNote: "Italiano",
    youtubeId: "7xPx1JpeN4o",
    synopsis:
      "Videolezione didattica per la scuola secondaria su economia lineare, progettazione ecocompatibile (ecodesign), diritto alla riparazione e riciclo dei materiali.",
    classQuestion: "Perché secondo l'Unione Europea oltre l'80% dell'impatto ambientale di un prodotto si decide già in fase di progettazione?",
    offlineScenes: [
      {
        sceneTitle: "1. Limiti del modello lineare Estrarre-Produrre-Gettare",
        durationSec: 55,
        visualType: "repair",
        caption: "Le materie prime del pianeta non sono infinite: continuare a estrarre e scartare porta rapidamente all'esaurimento."
      },
      {
        sceneTitle: "2. Ecodesign e Diritto alla Riparazione",
        durationSec: 60,
        visualType: "repair",
        caption: "Progettare in modo modulare significa usare parti standard, viti accessibili, batterie sostituibili e manuali aperti."
      },
      {
        sceneTitle: "3. Ciclo tecnico vs ciclo biologico",
        durationSec: 55,
        visualType: "repair",
        caption: "Vetro e metalli possono essere rifusi più volte, ma prevenire e riparare (Refuse, Reduce, Reuse) restano in cima."
      }
    ]
  },
  {
    id: "vid-cefa-vetro-primaria",
    topicId: "cefalana",
    tematica: "Riparazione, Acqua Storica & Ecodesign",
    comune: "Cefalana",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "Riciclo del vetro: le 3 regole del riciclo perfetto con Pietro",
    channel: "CoReVe (Consorzio Recupero Vetro)",
    durationLabel: "3 min",
    languageNote: "Italiano",
    youtubeId: "KCn-luHg4Bw",
    synopsis:
      "Cartone educativo CoReVe per imparare perché il vetro è un materiale permanente riutilizzabile all'infinito e cosa NON deve finire nella campana (ceramica, lampadine).",
    classQuestion: "Perché una tazzina di ceramica rotta rovina l'intero carico della campana del vetro?",
    offlineScenes: [
      {
        sceneTitle: "1. Il vetro: dal vuoto a rendere alla rifusione",
        durationSec: 45,
        visualType: "repair",
        caption: "Una bottiglia in vetro si può lavare e riusare tale e quale, oppure rifondere infinite volte senza perdere qualità."
      },
      {
        sceneTitle: "2. I falsi amici del vetro",
        durationSec: 50,
        visualType: "repair",
        caption: "Ceramica, porcellana, specchi e lampadine fondono a temperature diverse e rovinano le nuove bottiglie!"
      },
      {
        sceneTitle: "3. Svuota e separa i tappi",
        durationSec: 45,
        visualType: "repair",
        caption: "Togliere liquidi e coperchi metallici (da conferire secondo le regole locali) assicura un riciclo perfetto."
      }
    ]
  },
  {
    id: "vid-cefa-alu-media",
    topicId: "cefalana",
    tematica: "Riparazione, Acqua Storica & Ecodesign",
    comune: "Cefalana",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "Come si ricicla l'alluminio?",
    channel: "RSI Edu",
    durationLabel: "4 min",
    languageNote: "Italiano",
    youtubeId: "Z31ZbryFlFI",
    synopsis:
      "Video divulgativo svizzero in italiano sul ciclo dell'alluminio (ALU 41): dall'estrazione energivora della bauxite al risparmio energetico del ~95% tramite riciclo.",
    classQuestion: "Perché usare una borraccia in metallo o riciclare l'alluminio pulito risparmia fino al 95% di energia?",
    offlineScenes: [
      {
        sceneTitle: "1. Dalla bauxite all'alluminio primario",
        durationSec: 50,
        visualType: "repair",
        caption: "Estrarre e raffinare nuovo alluminio dalla bauxite richiede quantità enormi di elettricità e acqua."
      },
      {
        sceneTitle: "2. Materiale permanente e leggero",
        durationSec: 55,
        visualType: "repair",
        caption: "Riciclare una lattina o una vaschetta ALU 41 pulita usa circa il 5% dell'energia necessaria a produrla da zero."
      },
      {
        sceneTitle: "3. Borraccia + Ecodesign vincono sempre",
        durationSec: 50,
        visualType: "repair",
        caption: "Scegliere oggetti durevoli riparabili con viti evita continui cicli industriali e tutela le sorgenti locali."
      }
    ]
  },

  /* ===== 4. BOSCO PULITO, NATURA & COMPOSTAGGIO (Dragano) ===== */
  {
    id: "vid-drag-primaria",
    topicId: "dragano",
    tematica: "Bosco Pulito, Natura & Compostaggio",
    comune: "Dragano",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "Che fine fa la plastica che gettiamo via?",
    channel: "TED-Ed (sottotitoli in italiano)",
    durationLabel: "4 min 07 sec",
    languageNote: "Sottotitoli ITA attivabili (pulsante CC)",
    youtubeId: "_6xlNyWPpB8",
    synopsis:
      "Animazione di 4 minuti che segue il viaggio di tre bottigliette di plastica dalla strada al suolo, ai fiumi e al mare, mostrando l'alternativa del riuso.",
    classQuestion: "Quanto tempo resta nell'ambiente una bottiglia o un sacchetto abbandonato nel bosco rispetto a una foglia o buccia?",
    offlineScenes: [
      {
        sceneTitle: "1. Cosa succede nel bosco alle foglie cadute",
        durationSec: 45,
        visualType: "forest",
        caption: "Nel bosco lombrichi, funghi e microrganismi trasformano foglie e rametti in humus fertile: zero rifiuti!"
      },
      {
        sceneTitle: "2. Perché la plastica non diventa mai cibo per la terra",
        durationSec: 55,
        visualType: "forest",
        caption: "Un involucro dimenticato in campagna non sparisce: si spezzetta in frammenti minuscoli che finiscono nell'acqua."
      },
      {
        sceneTitle: "3. Piccoli gesti di cura e compostaggio",
        durationSec: 45,
        visualType: "forest",
        caption: "Riportiamo sempre a casa ogni rifiuto della gita e trasformiamo bucce e sfalci nel compost della scuola."
      }
    ]
  },
  {
    id: "vid-drag-media",
    topicId: "dragano",
    tematica: "Bosco Pulito, Natura & Compostaggio",
    comune: "Dragano",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "The Story of Bottled Water – Impatto sui corsi d'acqua e prevenzione",
    channel: "The Story of Stuff Project (Sub ITA)",
    durationLabel: "5 min (estratto) / 8 min",
    languageNote: "Sottotitoli ITA (pulsante CC)",
    youtubeId: "Se12y9hSOM0",
    synopsis:
      "Spiega in modo critico come nasce la domanda superflua di plastica monouso, quanto inquina la dispersione nei suoli e nei fiumi e come prevenirla alla fonte.",
    classQuestion: "Quante bottigliette eviterebbe in un anno tutta la nostra classe scegliendo esclusivamente la borraccia con acqua pubblica?",
    offlineScenes: [
      {
        sceneTitle: "1. Dalla sorgente naturale alla plastica monouso",
        durationSec: 55,
        visualType: "forest",
        caption: "Imbottigliare acqua potabile pubblica consuma petrolio, energia di trasporto e genera miliardi di involucri monouso."
      },
      {
        sceneTitle: "2. Microplastiche nei suoli forestali e nei fiumi",
        durationSec: 55,
        visualType: "forest",
        caption: "Gli imballaggi leggeri dispersi dal vento risalgono fiumi, terreni agricoli e catene alimentari."
      },
      {
        sceneTitle: "3. Compostaggio organico & Zero Littering",
        durationSec: 50,
        visualType: "forest",
        caption: "Mantenere pulita la frazione organica dalla plastica permette al compost di rigenerare davvero i boschi e i campi."
      }
    ]
  },
  {
    id: "vid-drag-organico-primaria",
    topicId: "dragano",
    tematica: "Bosco Pulito, Natura & Compostaggio",
    comune: "Dragano",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "Pensa a Mario – Episodio educational sull'organico",
    channel: "Gruppo Hera",
    durationLabel: "3 min",
    languageNote: "Italiano",
    youtubeId: "Cua6s2p24vU",
    synopsis:
      "Storia animata in italiano dedicata ai bambini per capire cosa va nella frazione organica ('Rot' -> compost!) e perché non bisogna mescolarci plastica.",
    classQuestion: "Cosa succede a una buccia di banana trasformata in compost rispetto a una lasciata con un sacchetto di plastica?",
    offlineScenes: [
      {
        sceneTitle: "1. La natura non produce spazzatura",
        durationSec: 45,
        visualType: "forest",
        caption: "Nel bosco gli scarti vegetali diventano nutrimento nuovo (humus): è l'ultima delle 5R originali, 'Rot' (composta!)."
      },
      {
        sceneTitle: "2. Scegli solo sacchetti certificati EN 13432",
        durationSec: 45,
        visualType: "forest",
        caption: "Per raccogliere l'umido usa sacchetti compostabili certificati o carta, mai buste di plastica tradizionale!"
      },
      {
        sceneTitle: "3. Dai sentieri all'orto di classe",
        durationSec: 45,
        visualType: "forest",
        caption: "Tenere pulito l'organico regala fertilizzante naturale ai giardini e lascia puliti i boschi di Dragano."
      }
    ]
  },
  {
    id: "vid-drag-compost-media",
    topicId: "dragano",
    tematica: "Bosco Pulito, Natura & Compostaggio",
    comune: "Dragano",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "W il compost! (Cortometraggio Scuola Secondaria I Grado)",
    channel: "CinemAmbiente",
    durationLabel: "4 min",
    languageNote: "Italiano",
    youtubeId: "GKa-X1yLOrk",
    synopsis:
      "Cortometraggio realizzato da studenti italiani della Scuola Media sul compostaggio scolastico, il rapporto tra scarti verdi/umidi e la tutela del suolo.",
    classQuestion: "Qual è il corretto rapporto tra scarti umidi verdi e materiale secco legnoso dentro una compostiera scolastica?",
    offlineScenes: [
      {
        sceneTitle: "1. Equilibrio tra 'verde' (azoto) e 'marrone' (carbonio)",
        durationSec: 50,
        visualType: "forest",
        caption: "Una compostiera funziona senza cattivi odori mescolando bucce umide e foglie secche, cartone non patinato e rametti."
      },
      {
        sceneTitle: "2. Biodegradabile generico vs Compostabile EN 13432",
        durationSec: 55,
        visualType: "forest",
        caption: "Solo la norma EN 13432 garantisce la decomposizione in compost di qualità entro tempi controllati, e mai va abbandonata nei boschi."
      },
      {
        sceneTitle: "3. Biodiversità e sentieri senza tracce",
        durationSec: 50,
        visualType: "forest",
        caption: "Proteggere i suoli forestali dalla plastica protegge insetti impollinatori, microrganismi e sorgenti d'acqua."
      }
    ]
  },

  /* ===== 5. RAEE, DIGITALE SOSTENIBILE & ENERGIA (Campolieto) ===== */
  {
    id: "vid-camp-primaria",
    topicId: "campolieto",
    tematica: "RAEE, Digitale Sostenibile & Energia",
    comune: "Campolieto",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "Che fine fanno elettronica e oggetti tecnologici? (The Story of Electronics)",
    channel: "The Story of Stuff Project (Sub ITA)",
    durationLabel: "5 min (estratto) / 7 min 45 sec",
    languageNote: "Sottotitoli ITA (o Audio-storia offline ITA qui sotto)",
    youtubeId: "sW_7i6T_H78",
    synopsis:
      "Mostra perché vecchi giochi a pile, tablet e telefoni non vanno MAI nell'indifferenziata e quali tesori nascosti si possono recuperare.",
    classQuestion: "Che cos'hanno in comune un telecomando rotto, una torcia e un vecchio cellulare nel cassetto?",
    offlineScenes: [
      {
        sceneTitle: "1. Cosa sono i RAEE?",
        durationSec: 45,
        visualType: "raee",
        caption: "Ogni oggetto che funziona con la spina elettrica o con le pile, quando smette di funzionare, è un RAEE!"
      },
      {
        sceneTitle: "2. Una miniera di metalli nel cassetto",
        durationSec: 50,
        visualType: "raee",
        caption: "Dentro smartphone e giocattoli elettronici ci sono rame, oro, argento e metalli rari da proteggere e recuperare."
      },
      {
        sceneTitle: "3. Mai nell'indifferenziata!",
        durationSec: 45,
        visualType: "raee",
        caption: "Consegnando i vecchi dispositivi all'isola ecologica o nei contenitori dei negozi aiutiamo sia l'ambiente sia l'energia."
      }
    ]
  },
  {
    id: "vid-camp-media",
    topicId: "campolieto",
    tematica: "RAEE, Digitale Sostenibile & Energia",
    comune: "Campolieto",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "Il riciclo dei dispositivi elettronici (RifiUTILE – Come si ricicla)",
    channel: "Geopop",
    durationLabel: "5 min",
    languageNote: "Italiano",
    youtubeId: "BRjXSv3FU0w",
    synopsis:
      "Approfondimento scientifico italiano su cosa c'è dentro i nostri dispositivi elettronici, il valore delle materie prime critiche e le fasi reali di trattamento dei RAEE.",
    classQuestion: "Perché la sostituzione frequente di dispositivi ancora funzionanti pesa più del solo consumo di elettricità quotidiana?",
    offlineScenes: [
      {
        sceneTitle: "1. Le materie prime critiche dentro uno smartphone",
        durationSec: 55,
        visualType: "raee",
        caption: "Circa 30–40 elementi della tavola periodica, inclusi litio, cobalto, rame e terre rare, lavorano dentro ogni dispositivo."
      },
      {
        sceneTitle: "2. Dal cassetto all'impianto di recupero RAEE",
        durationSec: 60,
        visualType: "raee",
        caption: "Separare batterie, schermature e schede elettroniche permette il recupero sicuro ed evita la dispersione di metalli pesanti."
      },
      {
        sceneTitle: "3. Digitale sostenibile e allungamento della vita",
        durationSec: 50,
        visualType: "raee",
        caption: "Pulire la memoria, sostituire la batteria e riutilizzare i dispositivi riduce drasticamente l'impatto digitale."
      }
    ]
  },
  {
    id: "vid-camp-baz-primaria",
    topicId: "campolieto",
    tematica: "RAEE, Digitale Sostenibile & Energia",
    comune: "Campolieto",
    ageBand: "primaria",
    ageRangeLabel: "Consigliato 6–10 anni · Scuola Primaria",
    title: "A scuola di RAEE con Baz (Clip didattica Primaria)",
    channel: "RAEE@scuola / ANCI",
    durationLabel: "3 min",
    languageNote: "Italiano",
    youtubeId: "XUcUYYcfFBg",
    synopsis:
      "Video divertente in italiano pensato per le classi della scuola primaria per riconoscere giocattoli elettrici, telecomandi, pile e piccoli apparecchi da portare all'isola ecologica.",
    classQuestion: "Cosa dobbiamo fare sempre prima di consegnare un giocattolo elettronico rotto ai punti di raccolta RAEE?",
    offlineScenes: [
      {
        sceneTitle: "1. Togli le pile dal gioco rotto!",
        durationSec: 45,
        visualType: "raee",
        caption: "Le pile esauste vanno nei raccoglitori gialli/dedicati per pile, mentre il giocattolo elettrico va nei RAEE."
      },
      {
        sceneTitle: "2. Il servizio gratuito Uno contro Zero",
        durationSec: 45,
        visualType: "raee",
        caption: "I piccoli RAEE sotto i 25 cm (cavi, mouse, caricatori, torce) si consegnano gratis nei grandi negozi di elettronica senza comprare nulla."
      },
      {
        sceneTitle: "3. Energia spenta in aula",
        durationSec: 45,
        visualType: "raee",
        caption: "Spegnere LIM, ciabatte e luci quando usciamo dall'aula taglia gli sprechi invisibili di elettricità."
      }
    ]
  },
  {
    id: "vid-camp-scs-media",
    topicId: "campolieto",
    tematica: "RAEE, Digitale Sostenibile & Energia",
    comune: "Campolieto",
    ageBand: "media",
    ageRangeLabel: "Consigliato 11–14 anni · Scuola Media",
    title: "RAEE – I rifiuti elettronici: impariamo a conoscerli",
    channel: "SCS Società Canavesana Servizi",
    durationLabel: "3 min 45 sec",
    languageNote: "Italiano",
    youtubeId: "SVB1Crqtcis",
    synopsis:
      "Spiegazione chiara in italiano dei 5 raggruppamenti RAEE (R1–R5), dei rischi ambientali di piombo/mercurio e del valore dell'economia circolare per i metalli rari.",
    classQuestion: "In quale raggruppamento RAEE (R1–R5) rientrano lampadine LED, piccoli elettrodomestici e smartphone?",
    offlineScenes: [
      {
        sceneTitle: "1. I 5 Raggruppamenti RAEE (R1–R5)",
        durationSec: 50,
        visualType: "raee",
        caption: "Freddo e clima (R1), Grandi bianchi (R2), TV e monitor (R3), Piccoli elettrodomestici ed elettronica di consumo (R4), Sorgenti luminose (R5)."
      },
      {
        sceneTitle: "2. Urban Mining: la miniera urbana",
        durationSec: 50,
        visualType: "raee",
        caption: "Recuperare rame, oro e litio da una tonnellata di vecchie schede richiede molta meno energia che estrarli da miniera."
      },
      {
        sceneTitle: "3. Fact-checking sull'IA & Digitale sobri",
        durationSec: 45,
        visualType: "raee",
        caption: "Anche i data center e l'IA consumano elettricità e acqua di raffreddamento: usiamo il digitale con scopo e senso critico!"
      }
    ]
  }
];
