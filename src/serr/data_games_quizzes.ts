export interface WasteDetectiveCase {
  id: string;
  title: string;
  category: "Acquisti eccessivi" | "Scadenze" | "Conservazione" | "Avanzi riutilizzabili" | "Porzioni eccessive";
  scene: string;
  hiddenWasteNote: string;
  problemQuestion: string;
  problemOptions: string[];
  correctProblemIdx: number;
  solutionQuestion: string;
  solutionOptions: string[];
  correctSolutionIdx: number;
  explanation: string;
}

export const WASTE_DETECTIVE_CASES: WasteDetectiveCase[] = [
  {
    id: "wd_01",
    title: "Il carrello delle offerte 3x2",
    category: "Acquisti eccessivi",
    scene: "La famiglia di Luca compra 3 confezioni di yogurt in offerta 3x2 perché costano meno al pezzo, ma a casa mangia yogurt solo Luca due volte a settimana.",
    hiddenWasteNote: "Ogni vasetto di yogurt sprecato porta via ~120 L di acqua virtuale tra latte, mangimi ed energia di raffreddamento.",
    problemQuestion: "Qual è l'errore principale alla base dello spreco?",
    problemOptions: [
      "Farsi guidare dal prezzo unitario senza verificare il consumo reale settimanale.",
      "Comprare yogurt bianco invece che alla frutta.",
      "Conservare lo yogurt nel ripiano centrale del frigo."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Qual è la scelta più efficace?",
    solutionOptions: [
      "Fare la lista della spesa controllando prima il frigo e comprare solo ciò che si consuma.",
      "Congelare tutti i vasetti chiusi in blocco appena arrivati a casa.",
      "Buttare il terzo vasetto già nel cestino del supermercato."
    ],
    correctSolutionIdx: 0,
    explanation: "Le offerte multiple convengono solo per prodotti a lunga conservazione usati davvero; altrimenti il risparmio si trasforma in rifiuto organico e plastica."
  },
  {
    id: "wd_02",
    title: "Pasta 'preferibilmente entro' di due settimane fa",
    category: "Scadenze",
    scene: "In dispensa Giulia trova un pacco di pasta integrale chiuso con la scritta: 'Da consumarsi preferibilmente entro il 10 del mese scorso'.",
    hiddenWasteNote: "1 kg di pasta di semola richiede mediamente ~1.849 L d'acqua virtuale per coltivazione del grano e pastificazione (WFN 2011).",
    problemQuestion: "Che cosa indica la dicitura 'preferibilmente entro' (TMC)?",
    problemOptions: [
      "È una data di sicurezza oltre la quale l'alimento diventa subito tossico.",
      "È il Termine Minimo di Conservazione: indica fino a quando il produttore garantisce gusto e fragranza ottimali.",
      "Indica il giorno in cui il pacco deve finire nella raccolta carta."
    ],
    correctProblemIdx: 1,
    solutionQuestion: "Come bisogna comportarsi con questa pasta chiusa e integra?",
    solutionOptions: [
      "Buttarla subito nell'umido per sicurezza.",
      "Controllare vista e odore: se la confezione è integra e asciutta, si può cuocere e consumare normalmente.",
      "Lasciarla fuori dalla dispensa per altri sei mesi senza controllarla."
    ],
    correctSolutionIdx: 1,
    explanation: "Distinguere 'Da consumare entro' (scadenza tassativa su cibi freschi deperibili) da 'Preferibilmente entro' (TMC su pasta, riso, biscotti) riduce una delle prime cause di spreco domestico."
  },
  {
    id: "wd_03",
    title: "Il pane nel sacchetto di plastica al sole",
    category: "Conservazione",
    scene: "Dopo pranzo resta mezza pagnotta di pane artigianale. Viene chiusa ancora tiepida dentro una busta di plastica sul davanzale della cucina.",
    hiddenWasteNote: "Mezzo chilo di pane sprecato corrisponde a circa 804 L di acqua virtuale e lavoro del fornaio.",
    problemQuestion: "Perché il pane ammuffisce o diventa gommoso in un giorno?",
    problemOptions: [
      "La plastica trattiene l'umidità residua favorendo le muffe, mentre il calore accelera il deterioramento.",
      "Il pane di grano duro non si può mai conservare oltre tre ore.",
      "Perché manca la carta stagnola attorno alla pagnotta."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Qual è il modo corretto di conservarlo o recuperarlo?",
    solutionOptions: [
      "Usare un sacchetto di carta o tela in luogo fresco; se non si usa entro 2 giorni, affettarlo e congelarlo, oppure farne pangrattato/bruschette.",
      "Metterlo subito in frigorifero appena sfornato dentro una busta chiusa.",
      "Lasciarlo scoperto accanto al lavandino."
    ],
    correctSolutionIdx: 0,
    explanation: "Tessuto o carta lasciano respirare il pane mantenendolo fragrante; in congelatore a fette si conserva settimane e si scongela solo ciò che serve."
  },
  {
    id: "wd_04",
    title: "Le banane mature e la macedonia scartata",
    category: "Avanzi riutilizzabili",
    scene: "Nel cesto della frutta tre banane hanno la buccia macchiata di scuro e alcune mele sono leggermente ammaccate. Marco pensa di gettarle.",
    hiddenWasteNote: "La frutta matura ha già assorbito tutta l'acqua e l'energia della coltivazione e del trasporto fino a casa.",
    problemQuestion: "Qual è l'errore di valutazione sulle macchie della frutta?",
    problemOptions: [
      "Confondere la maturazione naturale (zuccheri più concentrati e polpa morbida) con cibo marcio da buttare.",
      "Pensare che la buccia scura trasformi la banana in plastica.",
      "Non lavare le banane con il detersivo prima di sbucciarle."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Come valorizzare banane mature e mele ammaccate?",
    solutionOptions: [
      "Usarle per frullati, pancake, torte fatte in casa o compostarle solo se davvero deteriorate.",
      "Buttarle nel secco residuo così non fanno moscerini.",
      "Comprare altra frutta acerba e lasciare lì quelle mature."
    ],
    correctSolutionIdx: 0,
    explanation: "La frutta matura è più dolce naturalmente e permette addirittura di ridurre gli zuccheri aggiunti in frullati e dolci casalinghi."
  },
  {
    id: "wd_05",
    title: "Il piatto ricolmo alla mensa scolastica",
    category: "Porzioni eccessive",
    scene: "A mensa Sofia chiede la porzione doppia di pasta al ragù perché ha molta fame dopo ginnastica, ma dopo metà piatto è già sazia e lascia tutto il resto.",
    hiddenWasteNote: "Pasta e carne di un piatto lasciato a metà rappresentano centinaia di litri d'acqua virtuale e cottura sprecati.",
    problemQuestion: "Dove nasce lo spreco in questa situazione?",
    problemOptions: [
      "Dalla porzione eccessiva rispetto all'appetito reale, che rende l'avanzo non più recuperabile per motivi igienici a mensa.",
      "Dal fatto che la pasta sia stata cotta in acqua bollente.",
      "Dal colore del piatto della mensa."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Come gestire la fame dopo sport senza generare avanzi?",
    solutionOptions: [
      "Chiedere una porzione normale o leggermente ridotta e fare il bis solo dopo aver finito il piatto.",
      "Prendere sempre tre porzioni per non fare due viaggi.",
      "Bere solo bibite gassate in lattina al posto del pasto."
    ],
    correctSolutionIdx: 0,
    explanation: "La regola 'prima porzione giusta, bis su richiesta' è una delle misure scolastiche più efficaci per abbattere lo scarto al piatto."
  },
  {
    id: "wd_06",
    title: "Il frigo disorganizzato in fondo al ripiano",
    category: "Conservazione",
    scene: "Dietro ai vasetti nuovi di marmellata spunta una confezione di formaggio fresco aperta da due settimane, ormai ammuffita e dimenticata.",
    hiddenWasteNote: "I latticini concentrano molta acqua virtuale (~3.178 L/kg per i formaggi) ed elevate emissioni zootecniche.",
    problemQuestion: "Perché quel formaggio è finito nel cestino?",
    problemOptions: [
      "Mancanza di rotazione degli alimenti: i nuovi acquisti sono stati messi davanti coprendo quelli già aperti.",
      "Perché il formaggio va conservato nel cassetto della verdura a 15°C.",
      "Perché mancava l'etichetta verde."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Quale metodo professionale usa anche la ristorazione per evitarlo?",
    solutionOptions: [
      "Metodo FIFO (First In, First Out): mettere davanti gli alimenti che scadono prima o già aperti e dedicare una scatola 'Mangiami presto'.",
      "Alzare la temperatura del frigo a 12°C per risparmiare corrente.",
      "Comperare formaggio solo in confezioni da 2 kg."
    ],
    correctSolutionIdx: 0,
    explanation: "Applicare il metodo FIFO e una zona visibile 'da finire prima' evita che i prodotti scivolino sul fondo del frigorifero."
  },
  {
    id: "wd_07",
    title: "Latte 'da consumare entro' aperto da ieri",
    category: "Scadenze",
    scene: "Una bottiglia di latte fresco pastorizzato riporta 'Da consumare entro domani'. Elena vorrebbe buttarla subito stasera per paura che faccia male.",
    hiddenWasteNote: "Un litro di latte richiede circa 1.020 L d'acqua virtuale media (WFN 2011).",
    problemQuestion: "Che cosa significa 'Da consumare entro domani' su un prodotto fresco tenuto bene in frigo?",
    problemOptions: [
      "Che scade esattamente a mezzanotte e alle 18:00 del giorno prima è già pericoloso.",
      "È la data limite di sicurezza oltre la quale non va consumato; fino a quel giorno, se ben conservato a 0–4°C e senza odori anomali, è ancora consumabile.",
      "Che va bollito per tre ore prima di berlo."
    ],
    correctProblemIdx: 1,
    solutionQuestion: "Qual è l'azione anti-spreco più intelligente?",
    solutionOptions: [
      "Consumarlo entro domani a colazione o usarlo stasera per besciamella, purè, budino o torta di classe.",
      "Versarlo subito nel lavandino.",
      "Lasciarlo fuori dal frigo sul tavolo."
    ],
    correctSolutionIdx: 0,
    explanation: "Pianificare le ricette della sera in base ai prodotti vicini alla data di scadenza azzera gli sprechi senza alcun rischio igienico."
  },
  {
    id: "wd_08",
    title: "Le foglie esterne del finocchio e i gambi dei broccoli",
    category: "Avanzi riutilizzabili",
    scene: "Durante la preparazione della cena vengono gettate le barbe verdi del finocchio, i gambi teneri dei broccoli e le foglie più esterne sane della lattuga.",
    hiddenWasteNote: "Molte parti considerate 'scarti' rappresentano dal 20% al 35% del peso acquistato di un ortaggio.",
    problemQuestion: "Quale errore si commette scartando queste parti commestibili?",
    problemOptions: [
      "Considerare rifiuto ciò che è ricco di fibre, aroma e nutrienti perfettamente utilizzabili in cucina.",
      "Non sapere che le barbe del finocchio sono di plastica.",
      "Lavarle con acqua fredda invece che tiepida."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Come si possono trasformare in cucina?",
    solutionOptions: [
      "In brodi vegetali, vellutate, pesto di foglie/barbe, frittate o paste con gambi a rondelle.",
      "Metterle nel bidone della carta dopo averle asciugate.",
      "Friggerle sempre in olio esausto da buttare."
    ],
    correctSolutionIdx: 0,
    explanation: "La cucina 'circolare' valorizza gambi di broccoli, foglie esterne pulite e barbe aromatiche riducendo il rifiuto organico e arricchendo il gusto."
  },
  {
    id: "wd_09",
    title: "Pasta e verdura cotte per otto persone (ma si è in quattro)",
    category: "Porzioni eccessive",
    scene: "Per timore che manchi qualcosa, domenica vengono cotti 800 g di pasta per 4 persone. Ne avanza metà pentola.",
    hiddenWasteNote: "400 g di pasta condita buttati equivalgono a oltre 740 L di acqua virtuale soltanto per la semola.",
    problemQuestion: "Cosa andava fatto prima di mettere l'acqua a bollire?",
    problemOptions: [
      "Pesare o misurare le porzioni indicative (es. ~80–100 g a testa) con bilancia o tazza dosatrice.",
      "Cuocere sempre un pacco intero perché le mezze dosi fanno male.",
      "Non aggiungere sale nell'acqua."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "E ora che la pasta è già avanzata, qual è la soluzione migliore?",
    solutionOptions: [
      "Raffreddarla rapidamente, conservarla in contenitore chiuso in frigo e trasformarla il giorno dopo in frittata di pasta o pasta al forno.",
      "Lasciarla sul fornello per due giorni a temperatura ambiente e poi gettarla.",
      "Buttarla subito nell'organico per non occupare un contenitore."
    ],
    correctSolutionIdx: 0,
    explanation: "Dosare prima previene lo spreco; se capita un avanzo sano, raffreddarlo e conservarlo chiuso in frigo entro 2 ore permette un ottimo riutilizzo il giorno dopo."
  },
  {
    id: "wd_10",
    title: "Pomodori e patate insieme nel cassetto del frigo",
    category: "Conservazione",
    scene: "Patate, cipolle, banane e pomodori maturi vengono ammassati tutti nello stesso cassetto umido a 3°C in fondo al frigorifero.",
    hiddenWasteNote: "Una conservazione errata dimezza la durata degli ortaggi, aumentando scarti e viaggi al negozio.",
    problemQuestion: "Perché patate e cipolle germogliano o marciscono e i pomodori perdono sapore?",
    problemOptions: [
      "Alcuni ortaggi temono il freddo umido del frigo (patate, cipolle, pomodori interi) o rilasciano etilene che accelera la maturazione dei vicini.",
      "Perché tutti i vegetali vanno messi nel congelatore a -18°C appena comprati.",
      "Perché non sono stati sbucciati al supermercato."
    ],
    correctProblemIdx: 0,
    solutionQuestion: "Qual è la collocazione giusta in casa?",
    solutionOptions: [
      "Patate e cipolle al buio in luogo fresco, asciutto e separato; pomodori a temperatura ambiente lontano dal sole diretto finché non sono tagliati.",
      "Mettere tutto dentro sacchetti di plastica sigillati in frigo.",
      "Tenere la carne cruda insieme alle patate fuori dal frigo."
    ],
    correctSolutionIdx: 0,
    explanation: "Conoscere la temperatura e l'umidità giuste per ogni categoria alimentare allunga la vita dei cibi senza costi né tecnologia extra."
  }
];

export interface PhaseStep {
  phaseNum: number;
  title: string;
  waterNote: string;
  energyNote: string;
  soilAndMaterialNote: string;
  criticalPoint: string;
}

export interface FoodJourneyScenario {
  id: string;
  name: string;
  subtitle: string;
  indicativeTotals: string;
  steps: PhaseStep[];
}

export const MEZZOVALLE_INVISIBLE_JOURNEYS: FoodJourneyScenario[] = [
  {
    id: "journey_pane",
    name: "Pane di grano duro locale (1 kg)",
    subtitle: "Impronta idrica media: ~1.608 L/kg (prevalenza acqua verde piovana) · ~1,4 kg CO₂e/kg",
    indicativeTotals: "Oltre l'85% dell'acqua totale si usa prima che il grano arrivi al forno.",
    steps: [
      { phaseNum: 1, title: "Preparazione del terreno", waterNote: "Umidità naturale del suolo conservata con aratura leggera.", energyNote: "Gasolio agricolo dei trattori per lavorazione letto di semina.", soilAndMaterialNote: "Sostanza organica del terreno e rotazione con leguminose.", criticalPoint: "Lavorazioni eccessive degradano il suolo e riducono la capacità di trattenere pioggia." },
      { phaseNum: 2, title: "Coltivazione del grano", waterNote: "Circa 70% acqua verde (pioggia) + eventuale irrigazione di soccorso.", energyNote: "Semina, concimazione e trebbiatura meccanica.", soilAndMaterialNote: "Terreno agricolo per 7–8 mesi di ciclo colturale.", criticalPoint: "È qui che si concentra la maggior parte dell'impronta idrica totale del pane." },
      { phaseNum: 3, title: "Utilizzo dell'acqua", waterNote: "~1.608 L virtuali/kg complessivi tra campo e impasto (~0,6 L diretti nell'impasto).", energyNote: "Poca acqua blu se il grano cresce in collina senza irrigazione intensiva.", soilAndMaterialNote: "Attenzione a concimi in eccesso per contenere la componente di acqua grigia.", criticalPoint: "Differenza netta tra acqua visibile del rubinetto e acqua invisibile nel chicco." },
      { phaseNum: 4, title: "Consumo energetico (Molitura e Forno)", waterNote: "Lavaggio/condizionamento minimo del grano prima della macinazione.", energyNote: "Elettricità del mulino e calore del forno (elettrico, gas o biomassa).", soilAndMaterialNote: "Sottoprodotti (crusca) riutilizzabili come mangime o fibra.", criticalPoint: "Riempire il forno con più infornate riduce l'energia per singolo chilo di pane." },
      { phaseNum: 5, title: "Trasporto", waterNote: "Impatto idrico quasi nullo.", energyNote: "Carburante ridotto se farina e forno distano poche decine di chilometri.", soilAndMaterialNote: "Cassette lavabili riutilizzabili invece di cartoni monouso.", criticalPoint: "Trasporti brevi in rete locale limitano emissioni e perdite logistiche." },
      { phaseNum: 6, title: "Conservazione", waterNote: "Nullo.", energyNote: "Zero catena del freddo se consumato fresco entro 2–3 giorni; basso consumo se congelato a fette.", soilAndMaterialNote: "Sacchetto di carta o tela riutilizzabile.", criticalPoint: "Una cattiva conservazione domestica fa ammuffire il pane generando il peggior spreco." },
      { phaseNum: 7, title: "Consumo finale", waterNote: "Ogni fetta buttata equivale a ~50 litri di acqua virtuale persi.", energyNote: "Tostatura eventuale o recupero come bruschetta/pangrattato.", soilAndMaterialNote: "Zero rifiuti se dosato e recuperato.", criticalPoint: "Prevenire lo scarto domestico salva tutte le 6 fasi precedenti!" }
    ]
  },
  {
    id: "journey_manzo",
    name: "Carne bovina (1 kg)",
    subtitle: "Impronta idrica media: ~15.415 L/kg · Impronta carbonio molto elevata (Poore & Nemecek 2018)",
    indicativeTotals: "Oltre il 98% dell'acqua serve a produrre i mangimi e i foraggi nell'arco di 18–24 mesi.",
    steps: [
      { phaseNum: 1, title: "Preparazione del terreno", waterNote: "Terreni per pascolo, fieno, mais e soia destinati all'alimentazione animale.", energyNote: "Macchinari agricoli su ampie superfici foraggere.", soilAndMaterialNote: "Fabbisogno elevato di suolo agricolo per unità proteica.", criticalPoint: "Espansione agricola per mangimi può ridurre foreste e biodiversità." },
      { phaseNum: 2, title: "Coltivazione mangimi e Allevamento", waterNote: "Migliaia di litri d'acqua per coltivare cereali, soia e fieno consumati dal capo.", energyNote: "Gestione stalla, mungitura/allevamento e movimento mangimi.", soilAndMaterialNote: "Gestione effluenti zootecnici che se ben trattati tornano concime.", criticalPoint: "Allevamenti al pascolo usano soprattutto acqua verde (pioggia) e custodiscono prati." },
      { phaseNum: 3, title: "Utilizzo dell'acqua", waterNote: "~15.415 L/kg medi (WFN): ~94% verde, ~4% blu (abbeverata + irrigazione mangimi), ~3% grigia.", energyNote: "Pompaggio acqua di abbeverata e irrigazione.", soilAndMaterialNote: "Rischio carico azotato nelle falde se i reflui non vengono gestiti bene.", criticalPoint: "L'acqua bevuta dall'animale è minima rispetto a quella nascosta nei foraggi." },
      { phaseNum: 4, title: "Consumo energetico (Lavorazione)", waterNote: "Acqua di lavaggio e igienizzazione degli impianti.", energyNote: "Energia per lavorazione, sezionamento e raffreddamento immediato.", soilAndMaterialNote: "Imballaggio protettivo alimentare e tracciabilità obbligatoria.", criticalPoint: "Elevati standard igienici richiedono freddo continuo." },
      { phaseNum: 5, title: "Trasporto refrigerato", waterNote: "Minimo.", energyNote: "Automezzi frigoriferi a temperatura controllata.", soilAndMaterialNote: "Dipende molto dall'origine locale o intercontinentale dei mangimi e delle carni.", criticalPoint: "Il trasporto pesa meno della fase agricola/zootecnica, ma conta se via aerea o con grandi distanze." },
      { phaseNum: 6, title: "Conservazione", waterNote: "Nullo diretto.", energyNote: "Banchi frigoriferi al dettaglio e frigorifero/congelatore domestico continui.", soilAndMaterialNote: "Rispettare 'da consumare entro' per evitare sprechi sanitari.", criticalPoint: "L'interruzione della catena del freddo rende l'alimento non sicuro." },
      { phaseNum: 7, title: "Consumo", waterNote: "Spreco di soli 150 g equivale a ~2.300 L d'acqua virtuale.", energyNote: "Cottura domestica (forno/padella con coperchio per risparmiare energia).", soilAndMaterialNote: "Moderazione e varietà alimentare, senza escludere né sprecare.", criticalPoint: "Porzioni corrette e rispetto di ogni grammo riducono enormemente gli impatti." }
    ]
  },
  {
    id: "journey_pomodoro_stagione",
    name: "Pomodoro estivo in pieno campo (1 kg)",
    subtitle: "Impronta idrica media: ~214 L/kg · Bassa CO₂e rispetto alle colture fuori stagione",
    indicativeTotals: "Sole naturale ed estate mediterranea riducono drasticamente energia e imballi.",
    steps: [
      { phaseNum: 1, title: "Preparazione del terreno", waterNote: "Lavorazione primaverile leggera e pacciamatura per trattenere umidità.", energyNote: "Contenuto se si evita la lavorazione profonda.", soilAndMaterialNote: "Sostanza organica o compost locale nel suolo.", criticalPoint: "La pacciamatura riduce l'evaporazione estiva fino al 30%." },
      { phaseNum: 2, title: "Coltivazione al sole estivo", waterNote: "Irrigazione mirata a goccia invece che a scorrimento.", energyNote: "Nessun riscaldamento artificiale: il sole fa tutto!", soilAndMaterialNote: "Sostegni riutilizzabili in campo.", criticalPoint: "Confronto decisivo con l'inverno: zero combustibili per riscaldare le serre." },
      { phaseNum: 3, title: "Utilizzo dell'acqua", waterNote: "~214 L/kg medi (WFN): frutto molto ricco d'acqua e alta resa per ettaro.", energyNote: "Piccole pompe per l'irrigazione a goccia.", soilAndMaterialNote: "Attenzione all'acqua blu nelle estati siccitose del Sud.", criticalPoint: "L'irrigazione a goccia porta acqua solo alle radici evitando sprechi." },
      { phaseNum: 4, title: "Consumo energetico (Raccolta e Selezione)", waterNote: "Lavaggio minimo se venduto fresco sfuso.", energyNote: "Raccolta manuale o semimeccanica, senza trasformazione complessa.", soilAndMaterialNote: "Cassette agricole riutilizzabili.", criticalPoint: "Il prodotto fresco sfuso evita energia di inscatolamento o vaschette." },
      { phaseNum: 5, title: "Trasporto", waterNote: "Nullo.", energyNote: "Basso su filiera regionale estiva.", soilAndMaterialNote: "Trasporto in cassette impilabili.", criticalPoint: "Evitare viaggi lunghi inutili quando il territorio produce in abbondanza." },
      { phaseNum: 6, title: "Conservazione", waterNote: "Nullo.", energyNote: "Non richiede frigo finché è intero; basta luogo fresco e ventilato.", soilAndMaterialNote: "Mantiene meglio aroma e vitamina fuori dal frigo prima del taglio.", criticalPoint: "Evitare sacchetti chiusi che creano condensa e muffe." },
      { phaseNum: 7, title: "Consumo", waterNote: "Solo ~32 L per un pomodoro da 150 g: tra gli alimenti a minor impronta.", energyNote: "Ottimo crudo in insalata (zero energia di cottura) o trasformato in passata estiva.", soilAndMaterialNote: "Scarti minimi (solo picciolo nel compost/organico).", criticalPoint: "Consumare pomodori d'estate e passata d'inverno è una regola d'oro sostenibile." }
    ]
  }
];

export interface SupplyChainComparison {
  id: string;
  label: string;
  badge: string;
  originExample: string;
  stages: {
    stage: string;
    detail: string;
    transportLoad: number; // 1-5 indicative
    packagingLoad: number; // 1-5 indicative
    storageEnergy: number; // 1-5 indicative
  }[];
  criticalLesson: string;
}

export const VILLACOLLE_SUPPLY_CHAINS: SupplyChainComparison[] = [
  {
    id: "short_seasonal",
    label: "Filiera Corta Locale di Stagione",
    badge: "Esempio virtuoso",
    originExample: "Arance o finocchi siciliani raccolti in pieno campo a novembre (distanza ~25 km, cassette a rendere)",
    stages: [
      { stage: "1. Campo o allevamento", detail: "Crescita al sole naturale in stagione, nessun riscaldamento artificiale.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 },
      { stage: "2. Raccolta o produzione", detail: "Raccolta a maturazione ottimale direttamente da azienda agricola locale.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 },
      { stage: "3. Lavorazione", detail: "Solo spazzolatura/cernita minima; nessuna quarta gamma o taglio confezionato.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 },
      { stage: "4. Trasporto", detail: "Furgone agricolo locale per 20–40 km fino al mercato/fornitore scolastico.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 },
      { stage: "5. Distribuzione", detail: "Vendita diretta in cassette riutilizzabili senza magazzini intermedi refrigerati.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 },
      { stage: "6. Acquisto", detail: "Prodotto sfuso pesato direttamente in borsa di tela o retino riutilizzabile.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 },
      { stage: "7. Consumo", detail: "Massima freschezza e durata in casa: meno scarti e gusto pieno.", transportLoad: 1, packagingLoad: 1, storageEnergy: 1 }
    ],
    criticalLesson: "Qui coincidono tre vantaggi reali: stagione naturale, trasporto breve e imballaggio quasi zero."
  },
  {
    id: "long_chain",
    label: "Filiera Lunga di Importazione",
    badge: "Alta complessità logistica",
    originExample: "Mirtilli o asparagi extraeuropei in vaschetta PET trasparente (distanza > 8.000 km)",
    stages: [
      { stage: "1. Campo o allevamento", detail: "Coltivazione in altro emisfero per avere il prodotto fuori stagione qui.", transportLoad: 1, packagingLoad: 1, storageEnergy: 2 },
      { stage: "2. Raccolta o produzione", detail: "Raccolta spesso anticipata (prodotto acerbo) per resistere al lungo viaggio.", transportLoad: 1, packagingLoad: 2, storageEnergy: 2 },
      { stage: "3. Lavorazione", detail: "Pre-raffreddamento rapido e confezionamento in vaschette sigillate.", transportLoad: 2, packagingLoad: 4, storageEnergy: 4 },
      { stage: "4. Trasporto", detail: "Trasporto marittimo refrigerato o aereo intercontinentale + camion refrigerati.", transportLoad: 5, packagingLoad: 4, storageEnergy: 5 },
      { stage: "5. Distribuzione", detail: "Piattaforme logistiche multiple e banchi frigo continui nei supermercati.", transportLoad: 4, packagingLoad: 4, storageEnergy: 4 },
      { stage: "6. Acquisto", detail: "Vaschetta in plastica PET + pellicola termosaldata + etichetta adesiva.", transportLoad: 3, packagingLoad: 5, storageEnergy: 3 },
      { stage: "7. Consumo", detail: "Prodotto già stressato dal viaggio: rischio muffe e scarto domestico rapido.", transportLoad: 2, packagingLoad: 5, storageEnergy: 3 }
    ],
    criticalLesson: "I chilometri pesano moltissimo soprattutto per trasporto aereo di cibi deperibili e per l'imballaggio protettivo obbligatorio."
  },
  {
    id: "local_heated_greenhouse",
    label: "Locale MA Fuori Stagione in Serra Riscaldata",
    badge: "Attenzione al mito del km zero!",
    originExample: "Pomodori o zucchine coltivati a 15 km da casa a gennaio in serra riscaldata a combustibile",
    stages: [
      { stage: "1. Campo o allevamento", detail: "Clima invernale freddo: servono serre chiuse, teli plastici e riscaldamento artificiale.", transportLoad: 1, packagingLoad: 2, storageEnergy: 5 },
      { stage: "2. Raccolta o produzione", detail: "Resa energetica molto costosa rispetto all'estate in pieno campo.", transportLoad: 1, packagingLoad: 2, storageEnergy: 5 },
      { stage: "3. Lavorazione", detail: "Spesso venduto in vaschette rigide per proteggere la buccia più delicata.", transportLoad: 1, packagingLoad: 3, storageEnergy: 3 },
      { stage: "4. Trasporto", detail: "Distanza brevissima (~15 km): il trasporto qui NON è il problema principale!", transportLoad: 1, packagingLoad: 2, storageEnergy: 1 },
      { stage: "5. Distribuzione", detail: "Banco vendita locale.", transportLoad: 1, packagingLoad: 3, storageEnergy: 2 },
      { stage: "6. Acquisto", detail: "Sembra 'a km zero' sull'etichetta di provenienza, ma nasconde l'energia della serra.", transportLoad: 1, packagingLoad: 3, storageEnergy: 2 },
      { stage: "7. Consumo", detail: "Le emissioni complessive per riscaldare la serra possono superare quelle di un prodotto di pieno campo arrivato da una regione più calda.", transportLoad: 1, packagingLoad: 3, storageEnergy: 4 }
    ],
    criticalLesson: "Regola scientifica fondamentale: il prodotto locale NON è automaticamente meno impattante se coltivato fuori stagione in serra riscaldata!"
  }
];

export interface QuizQuestionItem {
  id: string;
  ageBand?: "primaria" | "media" | "entrambi";
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export const MEZZ_QUIZ_15: QuizQuestionItem[] = [
  { id: "mq01", question: "Quale tra questi alimenti ha in media la maggiore impronta idrica per chilogrammo (dati WFN 2011)?", options: ["Pomodoro (214 L/kg)", "Pane (1.608 L/kg)", "Cioccolato (~17.196 L/kg)", "Patata (287 L/kg)"], correctIdx: 2, explanation: "Cacao e carne bovina sono tra gli alimenti a più alta impronta idrica media per kg (~17.196 L/kg e ~15.415 L/kg)." },
  { id: "mq02", question: "Che cos'è l'acqua VERDE nell'impronta idrica di un alimento?", options: ["L'acqua colorata aggiunta nei laboratori", "L'acqua piovana assorbita dal suolo e usata dalle piante", "L'acqua inquinata dalle fabbriche", "L'acqua delle piscine scolastiche"], correctIdx: 1, explanation: "L'acqua verde è la precipitazione naturale immagazzinata nel terreno ed evapotraspirata dalle colture." },
  { id: "mq03", question: "Che cosa indica l'acqua BLU?", options: ["L'acqua dolce di fiumi, laghi e falde prelevata per irrigazione e processi", "L'acqua del mare", "Solo l'acqua piovana", "L'acqua potabile imbottigliata"], correctIdx: 0, explanation: "L'acqua blu è l'acqua dolce superficiale o sotterranea prelevata attivamente dall'uomo." },
  { id: "mq04", question: "Che cosa rappresenta l'acqua GRIGIA secondo il Water Footprint Network?", options: ["L'acqua sporca del lavandino", "Il volume ipotetico di acqua dolce necessario a diluire eventuali inquinanti entro i limiti di legge", "L'acqua torbida dei torrenti di montagna", "La condensa del frigorifero"], correctIdx: 1, explanation: "L'acqua grigia misura l'impatto di fertilizzanti e scarichi in termini di acqua necessaria alla diluizione." },
  { id: "mq05", question: "Quanta acqua virtuale serve in media per 1 kg di patate?", options: ["~287 litri", "~2.870 litri", "~15.415 litri", "~12 litri"], correctIdx: 0, explanation: "Le patate (~287 L/kg) e i pomodori (~214 L/kg) hanno tra le impronte idriche più basse in assoluto." },
  { id: "mq06", question: "È vero che l'alimento con più acqua virtuale ha sempre anche le emissioni di CO₂e più alte?", options: ["Sì, sono sempre identiche", "No: ad esempio le mandorle hanno molta acqua virtuale (~16.095 L/kg) ma CO₂e più bassa (~2,3 kg) rispetto a formaggi stagionati (~21,2 kg CO₂e/kg)", "Sì, perché l'acqua produce anidride carbonica", "Solo per la frutta rossa"], correctIdx: 1, explanation: "Impronta idrica e impronta di carbonio misurano risorse diverse (acqua vs gas serra da ruminanti/energia)." },
  { id: "mq07", question: "In quale fase si consuma la maggior parte dell'acqua virtuale del pane?", options: ["Durante la cottura in forno", "Nella fase agricola di coltivazione del grano", "Nel sacchetto di carta del panettiere", "Quando lo si taglia a tavola"], correctIdx: 1, explanation: "Oltre l'85% dell'acqua del pane è acqua impiegata nei campi per far crescere il frumento." },
  { id: "mq08", question: "Perché i dati dell'impronta idrica sono presentati come 'valori medi indicativi'?", options: ["Perché sono inventati a caso", "Perché variano in base a clima, tipo di suolo, irrigazione e tecniche di allevamento", "Perché cambiano ogni minuto sull'orologio", "Perché valgono solo in inverno"], correctIdx: 1, explanation: "Lo stesso alimento può consumare molta meno acqua blu in terreni piovosi ben gestiti rispetto a zone aride con irrigazione inefficiente." },
  { id: "mq09", question: "Cosa significa il Termine Minimo di Conservazione 'Da consumarsi preferibilmente entro...' su riso o pasta?", options: ["Dopo quella data diventa subito pericoloso per la salute", "Indica fino a quando il cibo conserva al meglio sapore e qualità; se integro e ben conservato può essere ancora sicuro", "Indica il giorno del raccolto nei campi", "Obbliga a gettare il prodotto nel secco"], correctIdx: 1, explanation: "Non confondere TMC ('preferibilmente entro') con scadenza tassativa ('da consumarsi entro')." },
  { id: "mq10", question: "Quale comportamento a mensa scolastica riduce lo spreco senza penalizzare nessuno?", options: ["Vietare il secondo piatto a tutti", "Prendere la porzione adeguata e chiedere il bis solo se si ha ancora fame", "Buttare il pane prima ancora di sedersi", "Portare merendine extra in mensa"], correctIdx: 1, explanation: "Porzioni graduate e bis su richiesta evitano avanzi lasciati nel piatto." },
  { id: "mq11", question: "Come funziona la regola FIFO in frigorifero?", options: ["Chi prima entra, prima esce: mettere davanti i cibi aperti o vicini alla scadenza", "Mettere tutto congelato senza etichetta", "Comprare sempre il formato famiglia 3x2", "Lasciare lo sportello aperto per raffreddare la cucina"], correctIdx: 0, explanation: "FIFO (First In, First Out) impedisce che prodotti aperti vengano dimenticati sul fondo." },
  { id: "mq12", question: "Qual è l'impronta idrica media indicativa di 1 kg di pollo rispetto a 1 kg di carne bovina (WFN)?", options: ["Il pollo usa più acqua del bovino", "Il pollo richiede in media ~4.325 L/kg, meno di un terzo rispetto ai ~15.415 L/kg del bovino", "Sono uguali a 1.000 L/kg", "Il pollo non richiede acqua virtuale"], correctIdx: 1, explanation: "La diversa conversione alimentare e durata del ciclo spiega la forte differenza tra specie." },
  { id: "mq13", question: "Dove è meglio conservare patate e cipolle crude a casa?", options: ["Nel congelatore a -18°C", "In luogo fresco, buio, asciutto e ben aerato (lontano dall'umidità del frigo)", "Immerse in acqua nel lavandino", "Sul termosifone"], correctIdx: 1, explanation: "In frigo l'amido delle patate si trasforma in zuccheri e l'umidità accelera marcescenza e germogli." },
  { id: "mq14", question: "Quale obiettivo ha un pasto sostenibile e bilanciato a scuola?", options: ["Mangiare pochissimo eliminando carboidrati e frutta", "Variare gli alimenti (cereali, verdure, frutta, fonti proteiche alternate) riducendo sprechi e impatti eccessivi", "Mangiare solo patatine in busta", "Evitare completamente l'acqua"], correctIdx: 1, explanation: "La sostenibilità si unisce all'equilibrio nutrizionale (dieta varia mediterranea), mai a restrizioni malsane." },
  { id: "mq15", question: "Se avanzi del pane secco non ammuffito a casa, qual è l'opzione più coerente con la SERR?", options: ["Gettarlo subito nell'indifferenziata", "Trasformarlo in pangrattato, bruschette, panzanella o crostini", "Lasciarlo fuori una settimana finché ammuffisce", "Bruciarlo nel caminetto"], correctIdx: 1, explanation: "Il recupero alimentare prima del rifiuto conserva intatto tutto il valore delle risorse già impiegate." }
];

export const VILLA_QUIZ_20: QuizQuestionItem[] = [
  { id: "vq01", ageBand: "primaria", question: "Quando un prodotto ortofrutticolo siciliano è considerato di piena stagione?", options: ["A novembre: arance, mandarini, cachi, mele dell'Etna, finocchi e broccoli", "A gennaio: fragole e angurie di pieno campo", "A luglio: mandarini e cavolfiori di piena raccolta", "Tutto l'anno senza differenze"], correctIdx: 0, explanation: "Ogni coltura ha una finestra climatica naturale ottimale in cui cresce senza serre riscaldate." },
  { id: "vq02", ageBand: "media", question: "Un pomodoro coltivato a 10 km da casa a gennaio in serra riscaldata a gasolio è sempre più sostenibile di un prodotto di pieno campo?", options: ["Sì, perché conta solo la distanza in chilometri", "No: l'energia per riscaldare la serra in inverno può superare di molte volte l'impatto del trasporto", "Sì, se confezionato in tre vaschette di plastica", "Solo se costa di più"], correctIdx: 1, explanation: "Analisi scientifica critica: trasporto, serra riscaldata, conservazione e imballaggio vanno sempre valutati insieme." },
  { id: "vq03", ageBand: "entrambi", question: "Che cosa si intende per 'Precycling' alla spesa?", options: ["Riciclare dopo che il rifiuto è finito in discarica", "Prevenire i rifiuti già al momento dell'acquisto (Refuse & Reduce) scegliendo prodotti sfusi, ricaricabili o con meno imballo", "Bruciare la plastica nei campi", "Lavare le bottiglie rotte"], correctIdx: 1, explanation: "Il miglior rifiuto è quello che non viene prodotto: applicare Refuse e Reduce allo scaffale evita spazzatura alla fonte." },
  { id: "vq04", ageBand: "entrambi", question: "Perché la regola delle '5R' nasce con 5 parole che iniziano tutte con R in inglese e non in italiano?", options: ["Perché i termini originali sono Refuse, Reduce, Reuse, Recycle, Rot (tradotto in italiano 'Rot' diventa 'Composta', che non inizia per R)", "Perché in italiano ci sono cinque verbi inventati uguali", "Perché si riferisce solo alle automobili", "È un errore di stampa europeo"], correctIdx: 0, explanation: "In inglese tutte iniziano per R (Refuse, Reduce, Reuse, Recycle, Rot); tradotte in italiano perdono la R iniziale (soprattutto la 5ª, Rot = composta) e alcune varianti la cambiano." },
  { id: "vq05", ageBand: "media", question: "Qual è la differenza esatta tra 'Filiera corta' e 'Km 0'?", options: ["La filiera corta indica pochissimi passaggi commerciali (dal produttore a noi); il Km 0 indica la vicinanza geografica dei luoghi di produzione", "Significano esattamente il trasporto in aereo", "La filiera corta riguarda solo i vestiti di nylon", "Il Km 0 indica che il negozio è al piano terra"], correctIdx: 0, explanation: "Un acquisto ideale unisce filiera corta (pochi intermediari), Km 0/locale, stagione naturale e imballaggio minimo." },
  { id: "vq06", ageBand: "entrambi", question: "Cosa indica il codice alfanumerico PAP 21 / PAP 22 sugli imballaggi (Direttiva UE / CONAI)?", options: ["Plastica morbida", "Carta e cartoncino", "Vetro verde", "Alluminio"], correctIdx: 1, explanation: "PAP 20–22 identificano carta e cartone (ondulato, cartoncino non ondulato, sacchetti in carta)." },
  { id: "vq07", ageBand: "media", question: "Che cosa identifica invece il codice C/PAP 84?", options: ["Carta pura al 100%", "Imballaggio poliaccoppiato a prevalenza carta (es. cartone per bevande con plastica/alluminio) da conferire secondo le regole comunali", "Vetro trasparente", "Acciaio per scatolette"], correctIdx: 1, explanation: "La lettera 'C/' indica materiale composito/poliaccoppiato; si controllano sempre le istruzioni del proprio Comune." },
  { id: "vq08", ageBand: "primaria", question: "Qual è l'accoppiata vincente per una merenda scolastica quasi a rifiuti zero?", options: ["Succo in brick con cannuccia + merendina in triplo incarto + tovaglioli di carta", "Frutta fresca di stagione sfusa + pane/focaccia del forno locale in portamerenda rigido + borraccia", "Patatine in sacchetto metallizzato + bibita in bottiglietta PET", "Tre barrette proteiche incartate una ad una"], correctIdx: 1, explanation: "Contenitori lavabili riutilizzabili + alimenti freschi sfusi evitano circa 180 involucri all'anno per studente." },
  { id: "vq09", ageBand: "primaria", question: "Perché molti supermercati vendono banane biologiche dentro una vaschetta di plastica con pellicola?", options: ["Per legge è vietato venderle sfuse", "Spesso per differenziare il codice a barre o per comodità espositiva, creando un imballaggio superfluo", "Perché altrimenti non maturano", "Per risparmiare acqua"], correctIdx: 1, explanation: "Le banane hanno già la propria buccia protettiva naturale: applicare 'Refuse' (prima R inglese) evita plastica inutile." },
  { id: "vq10", ageBand: "entrambi", question: "Che cos'è il codice PET 01?", options: ["Polietilene tereftalato usato spesso per bottigliette d'acqua e vaschette trasparenti", "Legno di abete", "Compostabile certificato", "Vetro incolore"], correctIdx: 0, explanation: "PET 01 è la plastica tipica di bottiglie per bevande e vaschette, riciclabile nella plastica se vuota e schiacciata per il lungo." },
  { id: "vq11", ageBand: "media", question: "In un pacco di biscotti da 200 g netti, la scatola esterna, il vassoio in plastica e la pellicola pesano 50 g (peso lordo 250 g). Qual è la percentuale di tara (imballaggio)?", options: ["20% del peso totale è solo imballaggio (50 g su 250 g)", "5%", "50%", "2%"], correctIdx: 0, explanation: "Tara % = 50 ÷ 250 = 0,20 = 20%. Pesare netto e lordo trasforma la spesa in un laboratorio STEM!" },
  { id: "vq12", ageBand: "entrambi", question: "Quale certificazione garantisce che un sacchetto è davvero biodegradabile e compostabile per l'organico?", options: ["Qualsiasi plastica trasparente sottile", "Norma EN 13432 (marchi OK Compost o CIC)", "La dicitura generica 'sacchetto green ecologico'", "Il codice PVC 03"], correctIdx: 1, explanation: "Solo i manufatti conformi alla norma EN 13432 possono andare nel rifiuto organico/umido (mai abbandonati nei campi)." },
  { id: "vq13", ageBand: "primaria", question: "Quale impatto tipico caratterizza una fragola venduta fresca in Italia a dicembre?", options: ["Zero trasporti e zero serre", "Viene o da serre molto energivore o da trasporti lunghi/aerei e richiede vaschette rigide per proteggere il frutto", "Cresce spontaneamente sulla neve", "È più ricca di acqua dei pomodori"], correctIdx: 1, explanation: "Le fragole italiane di pieno campo sono primaverili (aprile-giugno); a dicembre l'impatto logistico/energetico cresce nettamente." },
  { id: "vq14", ageBand: "primaria", question: "Quando un vasetto di yogurt va nella raccolta differenziata della plastica?", options: ["Sempre senza svuotarlo, pieno a metà", "Dopo aver rimosso completamente i residui di cibo (svuotato e pulito senza sprechi d'acqua)", "Va nella carta perché ha l'etichetta", "Va nell'organico"], correctIdx: 1, explanation: "Svuotare bene i contenitori impedisce di contaminare l'intera balla di plastica riciclabile." },
  { id: "vq15", ageBand: "media", question: "Perché dal 2024 in Europa i tappi restano attaccati alle bottiglie (Tethered Caps, Direttiva SUP)?", options: ["Per impedire la dispersione di milioni di piccoli tappi in spiagge e boschi e avviarli al riciclo insieme alla bottiglia", "Solo per cambiare il colore delle bottiglie", "Per farle pesare di più", "Per renderle non riciclabili"], correctIdx: 0, explanation: "Schiacciando la bottiglia per il lungo e riavvitando il tappo attaccato si recupera il 100% della plastica del contenitore." },
  { id: "vq16", ageBand: "media", question: "Perché la norma UE obbliga i banchi ortofrutta a indicare in modo chiaro il Paese di origine e il prezzo al kg?", options: ["Per permettere al cittadino di confrontare provenienza reale, stagionalità e convenienza tra prodotto sfuso e confezionato", "Solo per decorare i cartellini gialli", "Per vietare di vendere le mele sfuse", "Per nascondere i prodotti locali"], correctIdx: 0, explanation: "Leggere origine e prezzo al chilo smaschera confezioni piccole molto costose arrivate da migliaia di km." },
  { id: "vq17", ageBand: "entrambi", question: "Qual è il vantaggio principale delle cassette agricole riutilizzabili a rendere rispetto ai cartoni monouso?", options: ["Si usano decine di volte (Reuse) riducendo drasticamente i rifiuti da imballaggio secondario e terziario", "Pesano di più e si buttano dopo ogni viaggio", "Non proteggono la frutta", "Non si possono lavare"], correctIdx: 0, explanation: "Gli imballaggi terziari/secondari riutilizzabili tra produttore e mensa tagliano tonnellate di cartone e pellicola." },
  { id: "vq18", ageBand: "entrambi", question: "Perché il vetro (GL 70–72) pesa di più nei trasporti ma è prezioso nella filiera circolare?", options: ["Si scioglie al sole", "È riciclabile al 100% infinite volte e, ancora meglio, le bottiglie possono essere lavate e riutilizzate col vuoto a rendere", "Va gettato nell'indifferenziata dopo il primo uso", "Non serve per le conserve"], correctIdx: 1, explanation: "Il vuoto a rendere (Reuse) o il riciclo infinito (Recycle) compensano il peso maggiore soprattutto sulle brevi distanze." },
  { id: "vq19", ageBand: "primaria", question: "Cosa conviene fare se un cartone della pizza ha la base molto unta di olio e formaggio?", options: ["Buttare l'intera scatola nella carta pulita rovinando la raccolta", "Separare il coperchio pulito (nella carta) dal fondo unto (nell'organico o secco secondo regolamento comunale)", "Mettere tutto nella plastica", "Lasciarlo in aula"], correctIdx: 1, explanation: "Separare la parte pulita da quella sporca salva la cellulosa riciclabile." },
  { id: "vq20", ageBand: "entrambi", question: "Che cos'è il Greenwashing su un'etichetta rispetto a una certificazione ufficiale come l'Ecolabel UE?", options: ["Il Greenwashing usa frasi vaghe ('100% amico della natura') senza prove; l'Ecolabel UE è verificato in modo indipendente sull'intero ciclo di vita", "Sono esattamente la stessa cosa", "Il Greenwashing significa lavare le verdure verdi", "L'Ecolabel UE vale solo per la plastica nera"], correctIdx: 0, explanation: "Per scegliere bene allo scaffale servono sigle verificabili (Ecolabel UE, EN 13432, codici materiali) e mai slogan generici." }
];

export const VILLA_QUIZ_15: QuizQuestionItem[] = VILLA_QUIZ_20.slice(0, 15);

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export const MEZZ_MATCH_PAIRS: MatchPair[] = [
  { id: "mm1", left: "Acqua Verde", right: "Pioggia trattenuta nel suolo e assorbita dalle colture" },
  { id: "mm2", left: "Acqua Blu", right: "Acqua prelevata da fiumi, laghi o falde per irrigazione" },
  { id: "mm3", left: "Acqua Grigia", right: "Volume d'acqua stimato per diluire gli inquinanti agricoli" },
  { id: "mm4", left: "TMC ('Preferibilmente entro')", right: "Data di qualità ottimale su pasta, riso e legumi secchi" },
  { id: "mm5", left: "Metodo FIFO", right: "Mettere davanti in frigo e dispensa i cibi da finire prima" },
  { id: "mm6", left: "1 kg di Patate (~287 L)", right: "Alimento base a impronta idrica e CO₂e molto contenute" }
];

export const VILLA_MATCH_PAIRS: MatchPair[] = [
  { id: "vm1", left: "PET 01", right: "Bottigliette acqua e vaschette trasparenti (Plastica)" },
  { id: "vm2", left: "PAP 21", right: "Astucci e scatole di cartoncino pulito (Carta)" },
  { id: "vm3", left: "ALU 41", right: "Lattine e vaschette pulite di alluminio (Metalli)" },
  { id: "vm4", left: "EN 13432", right: "Sacchetti biodegradabili e compostabili per l'Organico" },
  { id: "vm5", left: "C/PAP 84", right: "Poliaccoppiato carta+plastica+alluminio (verifica regole Comune)" },
  { id: "vm6", left: "Tethered Cap (SUP)", right: "Tappo legato alla bottiglia per riciclarlo senza disperderlo" },
  { id: "vm7", left: "Serra riscaldata a gennaio", right: "Prodotto vicino ma con alto consumo energetico termico" },
  { id: "vm8", left: "Precycling (Refuse & Reduce)", right: "Evitare imballaggi superflui già al negozio scegliendo sfuso" }
];

export interface FinalMissionDef {
  id: string;
  pathway: "mezzovalle" | "villacolle" | "comune";
  badgeTitle: string;
  title: string;
  subtitle: string;
  checklistSteps: string[];
  minScoreHint: string;
  reflectionQuestion: string;
}

export const FINAL_MISSIONS: FinalMissionDef[] = [
  {
    id: "mission_mezzovalle",
    pathway: "mezzovalle",
    badgeTitle: "CUSTODE DELLE RISORSE",
    title: "Diventa Custode delle Risorse (Mezzovalle)",
    subtitle: "Dimostra di saper leggere l'acqua invisibile, calcolare un pasto equilibrato e smascherare lo spreco alimentare.",
    checklistSteps: [
      "Analizza almeno 5 alimenti nel laboratorio dell'Acqua Nascosta (A1).",
      "Calcola un menu equilibrato nel Calcolatore o nel Costruttore Pasto (A2 / A5).",
      "Risolvi almeno 3 casi del Detective dello Spreco (A4) e completa il Quiz di Mezzovalle."
    ],
    minScoreHint: "Puoi sbloccare l'attestato completando la verifica finale della missione qui sotto.",
    reflectionQuestion: "Quale abitudine quotidiana a mensa o a casa cambierai per risparmiare acqua virtuale e cibo?"
  },
  {
    id: "mission_villacolle",
    pathway: "villacolle",
    badgeTitle: "AMBASCIATORE DELLA FILIERA CORTA",
    title: "Diventa Ambasciatore della Filiera Corta (Villacolle)",
    subtitle: "Padroneggia la stagionalità, il controllo critico di serre/trasporti, i codici imballaggio e la merenda sostenibile.",
    checklistSteps: [
      "Esplora almeno 2 stagioni nel Calendario Ortofrutticolo (B2).",
      "Completa una spesa a km zero entro il budget (B3) e classifica gli imballaggi (B4).",
      "Progetta la tua Merenda Sostenibile (B5) e supera la prova finale dell'Ambasciatore."
    ],
    minScoreHint: "Supera la mini-sfida pratica dell'Ambasciatore per ottenere il tuo attestato scaricabile.",
    reflectionQuestion: "Quale imballaggio superfluo eliminerai per primo dalla tua merenda scolastica settimanale?"
  },
  {
    id: "mission_scuola",
    pathway: "comune",
    badgeTitle: "SQUADRA SCUOLA CHE NON SPRECA",
    title: "La Scuola che Non Spreca (Missione Collettiva)",
    subtitle: "Unisci le scoperte di Mezzovalle e Villacolle nel Decalogo Comune e lancia una proposta reale nella tua scuola.",
    checklistSteps: [
      "Vota o proponi almeno una regola nel Decalogo del Cibo Sostenibile (Attività 7).",
      "Compila una scheda di osservazione scolastica e genera un Manifesto (Attività 8).",
      "Salva almeno una voce nel Mio Diario delle Scoperte."
    ],
    minScoreHint: "Valida l'impegno collettivo della classe per generare l'Attestato Collettivo stampabile.",
    reflectionQuestion: "Qual è l'azione concreta verificabile che proponete alla Dirigenza o ai collaboratori della vostra scuola?"
  }
];
