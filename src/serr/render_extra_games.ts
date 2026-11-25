import { renderActivityGuide } from "./activity_guide.ts";

export interface ExtraGamesContext {
  esc: (s: string) => string;
  addXp: (pts: number, badgeId?: string | null, tag?: string) => void;
}

/* ==================== GIOCO 9: ARTE & TECNOLOGIA (ECODESIGN & UPCYCLING) ==================== */
interface G9Challenge {
  id: string;
  objectName: string;
  materialTag: string;
  symptom: string;
  techQuestion: string;
  techOptions: string[];
  techCorrect: number;
  artQuestion: string;
  artOptions: string[];
  artCorrect: number;
  explanation: string;
}

const G9_CHALLENGES: G9Challenge[] = [
  {
    id: "g9_1",
    objectName: "Zaino scolastico con cerniera rotta",
    materialTag: "Tessile misto + cerniera metallica",
    symptom: "La tasca principale non si chiude più, ma il tessuto è integro.",
    techQuestion: "Analisi Tecnologica: qual è l'intervento strutturale corretto?",
    techOptions: [
      "Sostituire solo il cursore metallico o ricucire la cerniera con punto resistente",
      "Incollare lo zaino con colla a caldo sigillandolo per sempre",
      "Gettare tutto nella campana del vetro"
    ],
    techCorrect: 0,
    artQuestion: "Proposta Arte & Upcycling: se resta un graffio vicino alla cucitura, come valorizzarlo?",
    artOptions: [
      "Applicare una toppa geometrica ricamata o dipinta con motivi dei Cinque Borghi",
      "Spruzzare vernice acrilica tossica sull'intera fodera",
      "Tagliare via gli spallacci"
    ],
    artCorrect: 0,
    explanation: "Riparare componenti mobili (cerniere, viti, bottoni) applica il principio tecnologico dell'ecodesign e salva decine di litri d'acqua necessari per un nuovo zaino."
  },
  {
    id: "g9_2",
    objectName: "Vasetti di vetro del miele e marmellata",
    materialTag: "GL 70 Vetro trasparente + tappo metallo",
    symptom: "Contenitori vuoti, puliti e intatti dopo la colazione in famiglia.",
    techQuestion: "Analisi Tecnologica: perché il vetro è superiore alla plastica monouso?",
    techOptions: [
      "È un materiale permanente impermeabile, lavabile ad alte temperature e riciclabile all'infinito",
      "Si scioglie al sole in due ore",
      "Pesa zero grammi e non si lava mai"
    ],
    techCorrect: 0,
    artQuestion: "Progetto Arte: come trasformarli in oggetti d'aula senza usare plastiche aggiunte?",
    artOptions: [
      "Lanterne a mosaico con carta velina recuperata o portapennelli da banco con spago di canapa",
      "Scioglierli in aula a 1.400°C",
      "Avvolgerli in sei strati di pellicola trasparente"
    ],
    artCorrect: 0,
    explanation: "Il vetro lavato e riusato direttamente evita perfino l'energia industriale della rifusione, diventando supporto perfetto per laboratori artistici."
  },
  {
    id: "g9_3",
    objectName: "Scatole robuste di cartone ondulato (PAP 20)",
    materialTag: "Cellulosa a tre strati ondulati",
    symptom: "Imballaggi puliti arrivati in segreteria con i libri scolastici.",
    techQuestion: "Analisi Tecnologica: perché l'onda interna rende resistente il cartone?",
    techOptions: [
      "Crea micro-arcate triangolari che distribuiscono il peso risparmiando materiale e massa",
      "Perché contiene barre di piombo nascoste",
      "Perché è impregnato di cera chimica"
    ],
    techCorrect: 0,
    artQuestion: "Progetto Arte & Design: cosa realizzare in classe con questi pannelli?",
    artOptions: [
      "Scenografie teatrali smontabili, organizer modulari da banco o plastici dei 5 Borghi",
      "Lasciarle sotto la pioggia in cortile",
      "Incollarle con cemento armato ai muri"
    ],
    artCorrect: 0,
    explanation: "La struttura ad arco del cartone ondulato è un capolavoro di ingegneria leggera (Tecnologia) e materia prima ideale per plastici ed eco-design (Arte)."
  },
  {
    id: "g9_4",
    objectName: "Temperino con vite allentata vs temperino fuso in plastica",
    materialTag: "Lega metallica + lama sostituibile",
    symptom: "La lama non taglia più bene dopo tre mesi di scuola.",
    techQuestion: "Analisi Tecnologica: quale progetto rispetta i criteri Ecodesign UE?",
    techOptions: [
      "Il temperino con vite standard apribile per cambiare solo la piccola lametta",
      "Il corpo chiuso in plastica sigillata da gettare ogni mese",
      "Incollare la lama al banco"
    ],
    techCorrect: 0,
    artQuestion: "Proposta Grafica / Arte: come segnalare i criteri di riparabilità in una mostra scolastica?",
    artOptions: [
      "Creare un'infografica bicolore 'Viti ✓ vs Colla ✗' disegnando gli esplosi tecnici degli oggetti",
      "Nascondere gli oggetti dietro un telo nero",
      "Scrivere il testo in caratteri minuscoli illeggibili"
    ],
    artCorrect: 0,
    explanation: "Il disegno esploso (disegno tecnico + comunicazione visiva) rende visibile a tutti perché un oggetto assemblato con viti dura dieci volte più a lungo."
  },
  {
    id: "g9_5",
    objectName: "T-shirt di cotone macchiata su un lato",
    materialTag: "100% Cotone (~2.495 L acqua virtuale per 250 g)",
    symptom: "Una macchia indelebile davanti rende difficile indossarla a scuola.",
    techQuestion: "Analisi Tecnologica: perché conviene recuperare la fibra invece di buttarla?",
    techOptions: [
      "Produrre cotone nuovo richiede enormi quantità d'acqua e tinture; il riuso azzera questo nuovo prelievo",
      "Il cotone è un metallo raro",
      "Per fare una maglietta servono solo 2 bicchieri d'acqua"
    ],
    techCorrect: 0,
    artQuestion: "Proposta Arte Tessile: quale trasformazione creativa a zero rifiuti realizzare?",
    artOptions: [
      "Timbri naturali con colori tessili oppure borsa della spesa a cucitura dritta senza cerniere",
      "Bruciarla per fare cenere",
      "Avvolgerla in plastica e buttarla nell'umido"
    ],
    artCorrect: 0,
    explanation: "Tagliare e cucire il fondo di una T-shirt trasforma un capo macchiato in una robusta tote-bag di classe senza produrre un solo scarto."
  },
  {
    id: "g9_6",
    objectName: "Vecchia tastiera o mouse con tasto bloccato",
    materialTag: "RAEE · Plastica ABS + scheda elettronica",
    symptom: "Un singolo tasto non scatta più oppure il dispositivo è definitivamente guasto.",
    techQuestion: "Analisi Tecnologica: qual è la sequenza corretta prima e dopo la verifica?",
    techOptions: [
      "Pulire/riparare il contatto con un tecnico; se irreparabile, conferire al centro RAEE per recuperare rame e metalli",
      "Gettarlo nella plastica insieme alle bottiglie",
      "Smontare i condensatori senza supervisione né guanti"
    ],
    techCorrect: 0,
    artQuestion: "Proposta Arte & Comunicazione: come sensibilizzare la scuola sui RAEE?",
    artOptions: [
      "Poster tridimensionale realizzato con tasti recuperati da tastiere dismesse ormai bonificate",
      "Lasciare le pile scariche dentro l'installazione",
      "Stampare 500 volantini plastificati"
    ],
    artCorrect: 0,
    explanation: "I RAEE vanno sempre separati in sicurezza nei canali ufficiali; solo parti meccaniche inerti (come tasti in plastica puliti) possono vivere in opere didattiche."
  }
];

/* ==================== GIOCO 10: MUSICA (WEB AUDIO ECO-PERCUSSION) & ED. FISICA ==================== */
interface MobChoice {
  id: string;
  label: string;
  minutesActive: number;
  co2GramsPerWeek: number;
  note: string;
}
const MOBILITY_MODES: MobChoice[] = [
  { id: "piedi", label: "A piedi / Piedibus (1,2 km × 2 al giorno)", minutesActive: 30, co2GramsPerWeek: 0, note: "Zero emissioni e ottimo riscaldamento muscolare mattutino!" },
  { id: "bici", label: "Bicicletta / Pista sicura (2 km × 2 al giorno)", minutesActive: 24, co2GramsPerWeek: 0, note: "Mobilità veloce, zero smog, allena equilibrio e resistenza aerobica." },
  { id: "bus", label: "Scuolabus condiviso + ultimo tratto a piedi", minutesActive: 12, co2GramsPerWeek: 420, note: "Molto meglio dell'auto singola perché divide le emissioni tra decine di alunni." },
  { id: "auto", label: "Auto privata individuale davanti al cancello", minutesActive: 2, co2GramsPerWeek: 2400, note: "Genera traffico davanti a scuola e toglie minuti preziosi di movimento quotidiano." }
];

/* ==================== GIOCO 11: STORIA, GEOGRAFIA & RELIGIONE (IRC) ==================== */
interface G11Case {
  id: string;
  discipline: "Storia" | "Geografia" | "Religione & Etica (IRC)";
  title: string;
  context: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const G11_CASES: G11Case[] = [
  {
    id: "g11_st1",
    discipline: "Storia",
    title: "Qanat, gebbie e cisterne dei borghi siciliani",
    context: "Tra Mezzovalle e Cefalana, già in epoca arabo-normanna e contadina, gli abitanti costruivano canali sotterranei e vasche in pietra per non perdere neppure una goccia di sorgente.",
    question: "Quale insegnamento storico portano queste opere nella SERR 2026?",
    options: [
      "L'acqua era trattata come bene scarso e collettivo da custodire senza sprechi",
      "Gli antichi usavano bottiglie di plastica monouso",
      "L'irrigazione avveniva solo con aerei"
    ],
    correct: 0,
    explanation: "La storia locale dimostra che ingegno tecnico e sobrietà idrica sono radici antiche della sostenibilità."
  },
  {
    id: "g11_st2",
    discipline: "Storia",
    title: "Il 'vuoto a rendere' e le botteghe di paese degli anni '50",
    context: "Prima degli anni '60, nei borghi come Villacolle latte, olio e gazzosa si compravano restituendo la bottiglia di vetro lavabile e portando sporte di vimini.",
    question: "Che differenza fondamentale c'è rispetto all'imballaggio usa-e-getta?",
    options: [
      "Il contenitore restava di proprietà circolare e compiva decine di cicli senza diventare rifiuto",
      "Le bottiglie venivano gettate dopo il primo sorso",
      "Costava dieci volte più rifiuti"
    ],
    correct: 0,
    explanation: "Studiare le testimonianze dei nonni (Storia orale) riscopre pratiche modernissime di prevenzione dei rifiuti."
  },
  {
    id: "g11_geo1",
    discipline: "Geografia",
    title: "Bacini mediterranei e stress idrico stagionale",
    context: "In aree mediterranee e collinari come i Cinque Borghi, le piogge si concentrano in autunno-inverno mentre l'estate è asciutta.",
    question: "Perché in Geografia distinguiamo l'acqua prelevata in un bacino asciutto rispetto a uno piovoso?",
    options: [
      "Per lo stress idrico: sottrarre acqua blu in zone aride mette a rischio fiumi, ecosistemi e agricoltura locale",
      "Perché l'acqua pesa di più sulle colline",
      "Non esiste differenza geografica tra climi"
    ],
    correct: 0,
    explanation: "La Geografia delle risorse insegna a collegare ciò che mangiamo alla capacità reale del territorio che lo produce."
  },
  {
    id: "g11_geo2",
    discipline: "Geografia",
    title: "Dalle serre riscaldate alle reti ferroviarie europee",
    context: "Un pomodoro coltivato a gennaio in serra riscaldata a gasolio vicino casa può emettere più CO₂ di uno cresciuto al sole naturale e trasportato su treno merci.",
    question: "Cosa dimostra questa carta geografica ed energetica delle filiere?",
    options: [
      "Sostenibilità vera unisce territorio (km contenuti), stagione naturale e mezzo di trasporto efficiente",
      "Il 'km zero' va sempre bene anche con serre accese tutto l'inverno",
      "L'aereo è sempre più ecologico del mercato contadino"
    ],
    correct: 0,
    explanation: "Leggere insieme latitudine, clima e trasporti evita scorciatoie superficiali sul concetto di locale."
  },
  {
    id: "g11_rel1",
    discipline: "Religione & Etica (IRC)",
    title: "Custodire la Casa Comune (Laudato si' & Tradizioni Etiche)",
    context: "Nelle tradizioni religiose e nell'enciclica 'Laudato si'' (2015), la Terra non è un deposito da sfruttare senza limite ma un giardino affidato alla responsabilità di tutte le generazioni.",
    question: "Come si traduce il principio della 'Custodia del Creato' nella vita quotidiana a scuola?",
    options: [
      "Sobrietà negli acquisti, cura gratuita degli oggetti, rispetto del cibo e solidarietà verso chi verrà dopo di noi",
      "Comprare il doppio di tutto per paura che finisca",
      "Usare piatti di plastica per evitare di lavare"
    ],
    correct: 0,
    explanation: "IRC ed Educazione Civica convergono: 'ecologia integrale' unisce rispetto della natura, fraternità umana e giustizia intergenerazionale."
  },
  {
    id: "g11_rel2",
    discipline: "Religione & Etica (IRC)",
    title: "Il valore sacro del pane e il rispetto per chi coltiva",
    context: "In tutte le culture mediterranee e religiose, il pane condiviso è simbolo di vita, lavoro umano e gratuità; sprecarlo era considerato una grave mancanza di rispetto.",
    question: "Perché questa visione etica si collega ai calcoli moderni dell'impronta idrica?",
    options: [
      "Perché onorare la fatica di chi lavora i campi e i doni della terra significa anche non gettare l'acqua e il grano già investiti",
      "Perché riguarda solo le panetterie antiche",
      "Perché il pane non usa acqua"
    ],
    correct: 0,
    explanation: "Scienza ed etica dialogano: dietro a ogni pagnotta ci sono natura, acqua e lavoro umano degno di cura."
  }
];

/* ==================== STATO INTERNO GIOCHI 9-11 ==================== */
const extraState = {
  g9Idx: 0,
  g9TechPick: -1,
  g9ArtPick: -1,
  g9Score: 0,
  g9SolvedIds: [] as string[],
  g10Step: 0,
  g10Playing: false,
  g10Bpm: 108,
  g10Timer: null as number | null,
  g10Grid: [
    [true, false, false, false, true, false, false, false], // Tamburo Cartone (kick)
    [false, false, true, false, false, false, true, false], // Barattolo Metallo (snare)
    [false, true, false, true, false, true, false, true],   // Shaker Semi (hi-hat)
    [true, false, false, true, false, false, true, false]   // Bottiglia Vetro intonata
  ] as boolean[][],
  g10AudioCtx: null as AudioContext | null,
  g10MobId: "piedi",
  g10Drink: "borraccia" as "borraccia" | "monouso",
  g11Idx: 0,
  g11Pick: -1,
  g11Score: 0,
  g11DoneIds: [] as string[]
};

function playEcoSynthSound(trackIdx: number): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    if (!extraState.g10AudioCtx) {
      extraState.g10AudioCtx = new AudioCtx();
    }
    const ctx = extraState.g10AudioCtx;
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;

    if (trackIdx === 0) {
      // Tamburo Cartone riciclato (basso morbido)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(48, now + 0.14);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (trackIdx === 1) {
      // Barattolo Metallo (campanaccio / clap metallico)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.11);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (trackIdx === 2) {
      // Shaker con legumi secchi (breve rumore filtrato)
      const bufSize = Math.floor(ctx.sampleRate * 0.06);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 3200;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(now);
    } else {
      // Bottiglia di Vetro intonata (nota cristallina)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    }
  } catch {
    /* Web Audio non disponibile in headless o contesto bloccato */
  }
}

export function stopExtraGame10Audio(): void {
  if (extraState.g10Timer !== null) {
    window.clearInterval(extraState.g10Timer);
    extraState.g10Timer = null;
  }
  extraState.g10Playing = false;
}

/* ==================== RENDER GIOCO 9 (ARTE & TECNOLOGIA) ==================== */
export function renderGame9TechArt(container: HTMLElement, ctx: ExtraGamesContext): void {
  const e = ctx.esc;
  const ch = G9_CHALLENGES[extraState.g9Idx] || G9_CHALLENGES[0];
  const techDone = extraState.g9TechPick !== -1;
  const artDone = extraState.g9ArtPick !== -1;
  const bothOk = techDone && artDone && extraState.g9TechPick === ch.techCorrect && extraState.g9ArtPick === ch.artCorrect;

  const guide = renderActivityGuide(
    {
      title: "Officina Ecodesign & Upcycling (Tecnologia & Arte)",
      disciplines: ["Tecnologia", "Arte e Immagine", "Educazione Civica"],
      videoTopic: "cefalana",
      videoLabel: "Video Intro · Riparazione & Ecodesign (3 min)",
      steps: [
        "Osserva l'oggetto proposto e leggi il materiale che lo compone.",
        "Scegli a sinistra l'analisi tecnica corretta (Tecnologia) e a destra il progetto di riuso creativo o grafica sostenibile (Arte).",
        "Completa tutte e 6 le schede per guadagnare +25 XP sul Passaporto Ecologico!"
      ],
      deepDiveHtml:
        "<p><strong>Ecodesign e Arte Povera:</strong> oltre l'80% dell'impatto ambientale di un oggetto si decide in fase di progettazione (Tecnologia). Sostituire colle permanenti con viti apribili allunga la vita dei prodotti. Quando un materiale non è più riparabile per la sua funzione originaria, l'<em>upcycling artistico</em> ne aumenta il valore estetico e funzionale anziché farlo degradare in rifiuto.</p>"
    },
    e
  );

  container.innerHTML = `
    ${guide}
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
      <div>
        <h3 style="margin:0 0 2px;">Gioco 9 (Arte &amp; Tecnologia): “Officina Ecodesign &amp; Upcycling”</h3>
        <p style="margin:0;font-size:0.86rem;color:var(--text-muted);">Sfide risolte: <strong>${extraState.g9SolvedIds.length} / ${G9_CHALLENGES.length}</strong></p>
      </div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;">
        ${G9_CHALLENGES.map((item, i) => {
          const solved = extraState.g9SolvedIds.includes(item.id);
          return `<button type="button" class="btn btn-sm ${i === extraState.g9Idx ? "btn-primary" : ""}" data-g9-tab="${i}">Oggetto ${i + 1} ${solved ? "✓" : ""}</button>`;
        }).join("")}
      </div>
    </div>

    <div class="card-soft">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
        <span class="serr-badge-small">${e(ch.materialTag)}</span>
        <span style="font-size:0.8rem;color:var(--text-muted);">${extraState.g9Idx + 1} / ${G9_CHALLENGES.length}</span>
      </div>
      <h4 style="margin:0 0 4px;font-size:1.12rem;">${e(ch.objectName)}</h4>
      <p style="margin:0 0 12px;font-size:0.86rem;color:var(--text-muted);"><strong>Situazione:</strong> ${e(ch.symptom)}</p>

      <div class="grid-2" style="gap:12px;">
        <div>
          <strong style="display:block;font-size:0.86rem;margin-bottom:6px;color:#075985;">1. ${e(ch.techQuestion)}</strong>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${ch.techOptions.map((opt, idx) => {
              let sty = "";
              if (techDone && extraState.g9TechPick === idx) {
                sty = idx === ch.techCorrect ? "border-color:var(--ok-border);background:var(--ok-bg);" : "border-color:var(--err-border);background:var(--err-bg);";
              }
              return `<button type="button" class="choice-pick" style="min-height:46px;padding:8px 10px;${sty}" data-g9-tech="${idx}">${e(opt)}</button>`;
            }).join("")}
          </div>
        </div>
        <div>
          <strong style="display:block;font-size:0.86rem;margin-bottom:6px;color:#7c2d12;">2. ${e(ch.artQuestion)}</strong>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${ch.artOptions.map((opt, idx) => {
              let sty = "";
              if (artDone && extraState.g9ArtPick === idx) {
                sty = idx === ch.artCorrect ? "border-color:var(--ok-border);background:var(--ok-bg);" : "border-color:var(--err-border);background:var(--err-bg);";
              }
              return `<button type="button" class="choice-pick" style="min-height:46px;padding:8px 10px;${sty}" data-g9-art="${idx}">${e(opt)}</button>`;
            }).join("")}
          </div>
        </div>
      </div>

      ${(techDone || artDone) ? `
        <div class="notice ${bothOk ? "notice-ok" : "notice-warn"}" style="margin-top:12px;">
          <div><strong>${bothOk ? "Progetto Ecodesign + Arte completato!" : "Suggerimento tecnico-creativo:"}</strong> ${e(ch.explanation)}</div>
        </div>
      ` : ""}

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
        <button type="button" class="btn btn-sm" id="g9-prev" ${extraState.g9Idx === 0 ? "disabled" : ""}>← Precedente</button>
        <button type="button" class="btn btn-primary btn-sm" id="g9-next" ${extraState.g9Idx >= G9_CHALLENGES.length - 1 ? "disabled" : ""}>Prossimo oggetto →</button>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-g9-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      extraState.g9Idx = Number(b.dataset.g9Tab) || 0;
      extraState.g9TechPick = -1;
      extraState.g9ArtPick = -1;
      renderGame9TechArt(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-g9-tech]").forEach((b) =>
    b.addEventListener("click", () => {
      extraState.g9TechPick = Number(b.dataset.g9Tech);
      if (extraState.g9TechPick === ch.techCorrect && extraState.g9ArtPick === ch.artCorrect && !extraState.g9SolvedIds.includes(ch.id)) {
        extraState.g9SolvedIds.push(ch.id);
        extraState.g9Score += 1;
        if (extraState.g9SolvedIds.length === G9_CHALLENGES.length) ctx.addXp(25, null, "g9");
      }
      renderGame9TechArt(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-g9-art]").forEach((b) =>
    b.addEventListener("click", () => {
      extraState.g9ArtPick = Number(b.dataset.g9Art);
      if (extraState.g9TechPick === ch.techCorrect && extraState.g9ArtPick === ch.artCorrect && !extraState.g9SolvedIds.includes(ch.id)) {
        extraState.g9SolvedIds.push(ch.id);
        extraState.g9Score += 1;
        if (extraState.g9SolvedIds.length === G9_CHALLENGES.length) ctx.addXp(25, null, "g9");
      }
      renderGame9TechArt(container, ctx);
    })
  );
  container.querySelector("#g9-prev")?.addEventListener("click", () => {
    if (extraState.g9Idx > 0) {
      extraState.g9Idx -= 1;
      extraState.g9TechPick = -1;
      extraState.g9ArtPick = -1;
      renderGame9TechArt(container, ctx);
    }
  });
  container.querySelector("#g9-next")?.addEventListener("click", () => {
    if (extraState.g9Idx < G9_CHALLENGES.length - 1) {
      extraState.g9Idx += 1;
      extraState.g9TechPick = -1;
      extraState.g9ArtPick = -1;
      renderGame9TechArt(container, ctx);
    }
  });
}

/* ==================== RENDER GIOCO 10 (MUSICA + EDUCAZIONE FISICA) ==================== */
export function renderGame10MusicPe(container: HTMLElement, ctx: ExtraGamesContext): void {
  const e = ctx.esc;
  const trackMeta = [
    { name: "Tamburo Cartone (Scatola)", color: "#b45309", cat: "Membranofono" },
    { name: "Barattolo Metallo (Latta pulita)", color: "#0369a1", cat: "Idiofono metallo" },
    { name: "Shaker Legumi (Vasetto)", color: "#15803d", cat: "Idiofono a scuotimento" },
    { name: "Bottiglia Vetro Intonata", color: "#4338ca", cat: "Idiofono/Aerofono" }
  ];

  const activeTracksCount = extraState.g10Grid.filter((row) => row.some(Boolean)).length;
  const totalBeats = extraState.g10Grid.reduce((acc, row) => acc + row.filter(Boolean).length, 0);
  const musicGoalMet = activeTracksCount === 4 && totalBeats >= 8;

  const mob = MOBILITY_MODES.find((m) => m.id === extraState.g10MobId) || MOBILITY_MODES[0];
  const weekActiveMin = mob.minutesActive * 5;
  const weekCo2Saved = (2400 - mob.co2GramsPerWeek);
  const yearPacksSaved = extraState.g10Drink === "borraccia" ? 200 : 0;

  const guide = renderActivityGuide(
    {
      title: "Studio Eco-Ritmo & Sfida Movimento Sostenibile (Musica & Educazione Fisica)",
      disciplines: ["Musica", "Educazione Fisica", "Educazione Civica"],
      videoTopic: "dragano",
      videoLabel: "Video Intro · Natura, Bosco & Ritmi Puliti (3 min)",
      steps: [
        "Sezione Musica: clicca i riquadri delle 8 battute per comporre un ritmo usando i 4 strumenti a percussione da riuso, poi premi 'Suona Studio Eco-Ritmo' (funziona 100% offline!).",
        "Sfida musicale: usa almeno una nota in tutti e 4 gli strumenti e almeno 8 battute attive.",
        "Sezione Educazione Fisica: scegli il tuo tragitto casa-scuola e la borraccia per misurare i minuti settimanali di movimento OMS e la CO₂ evitata."
      ],
      deepDiveHtml:
        "<p><strong>Liuteria Circolare & Benessere Motorio:</strong> secondo le classificazioni acustiche (Hornbostel-Sachs), barattoli, vasetti di vetro e semi secchi generano reali <em>idiofoni e membranofoni</em> a zero costi e zero rifiuti elettronici. Allo stesso modo, l'OMS consiglia almeno <strong>60 minuti al giorno</strong> di movimento per ragazzi 6–14 anni: camminare o pedalare verso scuola unisce salute fisica e abbattimento delle emissioni urbane.</p>"
    },
    e
  );

  container.innerHTML = `
    ${guide}
    <h3 style="margin:0 0 10px;">Gioco 10 (Musica &amp; Educazione Fisica): “Eco-Ritmo &amp; Movimento Attivo”</h3>
    <div class="grid-2" style="gap:14px;align-items:start;">
      <!-- MUSICA: SEQUENCER -->
      <div class="card-soft">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <div>
            <h4 style="margin:0;">1. Musica · Sequencer Strumenti Riciclati</h4>
            <span style="font-size:0.78rem;color:var(--text-muted);">Audio sintetizzato 100% offline (Web Audio API)</span>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn btn-primary btn-sm" id="g10-play">${extraState.g10Playing ? "■ Ferma" : "▶ Suona Eco-Ritmo"}</button>
            <button type="button" class="btn btn-sm" id="g10-clear">Azzera</button>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:0.82rem;flex-wrap:wrap;">
          <label for="g10-bpm"><strong>Tempo (BPM):</strong> <span id="g10-bpm-val">${extraState.g10Bpm}</span></label>
          <input type="range" id="g10-bpm" min="72" max="144" step="4" value="${extraState.g10Bpm}" />
          <button type="button" class="btn btn-sm" id="g10-preset">Ritmo 5R</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;">
          ${trackMeta.map((tr, rIdx) => `
            <div style="display:grid;grid-template-columns:minmax(130px, 1.1fr) repeat(8, minmax(24px, 1fr));gap:4px;align-items:center;">
              <button type="button" class="btn btn-sm" data-g10-test="${rIdx}" style="text-align:left;justify-content:flex-start;padding:4px 7px;min-height:32px;font-size:0.76rem;border-left:4px solid ${tr.color};">
                <strong>${e(tr.name.split("(")[0].trim())}</strong>
              </button>
              ${extraState.g10Grid[rIdx].map((on, cIdx) => {
                const isNow = extraState.g10Playing && extraState.g10Step === cIdx;
                return `
                  <button
                    type="button"
                    data-g10-cell="${rIdx}:${cIdx}"
                    aria-label="${e(tr.name)} battuta ${cIdx + 1}"
                    aria-pressed="${on}"
                    style="height:32px;border-radius:6px;border:1.5px solid ${isNow ? "#0f172a" : "#cbd5e1"};background:${on ? tr.color : isNow ? "#e2e8f0" : "#ffffff"};color:#fff;font-size:0.72rem;font-weight:800;cursor:pointer;"
                  >${cIdx + 1}</button>
                `;
              }).join("")}
            </div>
          `).join("")}
        </div>

        <div class="notice ${musicGoalMet ? "notice-ok" : "notice-info"}" style="margin-top:10px;margin-bottom:0;font-size:0.82rem;">
          <div>
            ${musicGoalMet
              ? `<strong>Orchestra completa!</strong> Stai suonando tutti e 4 gli strumenti riciclati (${totalBeats} battute attive · +20 XP sbloccati!).`
              : `<strong>Sfida Orchestra SERR:</strong> attiva tutti e 4 gli strumenti (${activeTracksCount}/4) e almeno 8 battute (${totalBeats}/8).`}
          </div>
        </div>
      </div>

      <!-- EDUCAZIONE FISICA: MOBILITA & IDRATAZIONE -->
      <div class="card-soft">
        <h4 style="margin:0 0 6px;">2. Educazione Fisica · Mobilità &amp; Borraccia</h4>
        <p style="font-size:0.82rem;color:var(--text-muted);margin:0 0 8px;">Simula la tua settimana scolastica (5 giorni andata/ritorno) per stimare movimento e impatto:</p>

        <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
          ${MOBILITY_MODES.map((m) => `
            <button type="button" class="choice-pick" style="min-height:42px;padding:7px 10px;${extraState.g10MobId === m.id ? "border-color:var(--accent);background:var(--accent-soft);" : ""}" data-g10-mob="${m.id}">
              <strong style="font-size:0.84rem;">${e(m.label)}</strong>
              <span style="font-size:0.76rem;color:var(--text-muted);">${e(m.note)}</span>
            </button>
          `).join("")}
        </div>

        <div style="font-size:0.84rem;font-weight:700;margin-bottom:5px;">Idratazione dopo lo sport in palestra:</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          <button type="button" class="btn btn-sm ${extraState.g10Drink === "borraccia" ? "btn-primary" : ""}" data-g10-drink="borraccia">Borraccia riutilizzabile (acqua fresca)</button>
          <button type="button" class="btn btn-sm ${extraState.g10Drink === "monouso" ? "btn-primary" : ""}" data-g10-drink="monouso">Bottigliette / Bibite monouso</button>
        </div>

        <div class="notice notice-ok" style="margin:0;font-size:0.84rem;">
          <div>
            <strong>Bilancio settimanale Educazione Fisica:</strong><br/>
            • Movimento attivo tragitto casa-scuola: <strong>${weekActiveMin} minuti / settimana</strong><br/>
            • CO₂ stimata risparmiata vs auto individuale: <strong>~${weekCo2Saved.toLocaleString("it-IT")} g/settimana</strong><br/>
            • Bottigliette evitate in un anno (~200 gg): <strong>${yearPacksSaved} unità</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-g10-test]").forEach((b) =>
    b.addEventListener("click", () => {
      playEcoSynthSound(Number(b.dataset.g10Test) || 0);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-g10-cell]").forEach((b) =>
    b.addEventListener("click", () => {
      const [rStr, cStr] = (b.dataset.g10Cell || "0:0").split(":");
      const r = Number(rStr);
      const c = Number(cStr);
      extraState.g10Grid[r][c] = !extraState.g10Grid[r][c];
      if (extraState.g10Grid[r][c]) playEcoSynthSound(r);
      const nowActive = extraState.g10Grid.filter((row) => row.some(Boolean)).length === 4;
      const nowBeats = extraState.g10Grid.reduce((acc, row) => acc + row.filter(Boolean).length, 0) >= 8;
      if (nowActive && nowBeats) ctx.addXp(20, null, "g10");
      renderGame10MusicPe(container, ctx);
    })
  );

  container.querySelector("#g10-play")?.addEventListener("click", () => {
    if (extraState.g10Playing) {
      stopExtraGame10Audio();
      renderGame10MusicPe(container, ctx);
      return;
    }
    extraState.g10Playing = true;
    const msPerEighth = Math.round((60 / extraState.g10Bpm / 2) * 1000);
    extraState.g10Timer = window.setInterval(() => {
      if (!document.body.contains(container) || container.offsetParent === null) {
        stopExtraGame10Audio();
        return;
      }
      const step = extraState.g10Step;
      for (let r = 0; r < 4; r++) {
        if (extraState.g10Grid[r][step]) playEcoSynthSound(r);
      }
      extraState.g10Step = (extraState.g10Step + 1) % 8;
      container.querySelectorAll<HTMLButtonElement>("[data-g10-cell]").forEach((cell) => {
        const [, cStr] = (cell.dataset.g10Cell || "0:0").split(":");
        cell.style.borderColor = Number(cStr) === step ? "#0f172a" : "#cbd5e1";
      });
    }, msPerEighth);
    renderGame10MusicPe(container, ctx);
  });

  container.querySelector("#g10-clear")?.addEventListener("click", () => {
    stopExtraGame10Audio();
    extraState.g10Grid = extraState.g10Grid.map((r) => r.map(() => false));
    renderGame10MusicPe(container, ctx);
  });

  container.querySelector("#g10-preset")?.addEventListener("click", () => {
    extraState.g10Grid = [
      [true, false, false, false, true, false, true, false],
      [false, false, true, false, false, false, true, false],
      [true, true, true, true, true, true, true, true],
      [false, false, false, true, false, true, false, false]
    ];
    ctx.addXp(20, null, "g10");
    renderGame10MusicPe(container, ctx);
  });

  container.querySelector<HTMLInputElement>("#g10-bpm")?.addEventListener("change", (ev) => {
    extraState.g10Bpm = Number((ev.target as HTMLInputElement).value) || 108;
    if (extraState.g10Playing) {
      stopExtraGame10Audio();
      container.querySelector<HTMLButtonElement>("#g10-play")?.click();
    } else {
      renderGame10MusicPe(container, ctx);
    }
  });

  container.querySelectorAll<HTMLButtonElement>("[data-g10-mob]").forEach((b) =>
    b.addEventListener("click", () => {
      extraState.g10MobId = b.dataset.g10Mob || "piedi";
      renderGame10MusicPe(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-g10-drink]").forEach((b) =>
    b.addEventListener("click", () => {
      extraState.g10Drink = (b.dataset.g10Drink || "borraccia") as "borraccia" | "monouso";
      renderGame10MusicPe(container, ctx);
    })
  );
}

/* ==================== RENDER GIOCO 11 (STORIA, GEOGRAFIA & RELIGIONE/IRC) ==================== */
export function renderGame11HistoryGeoReligion(container: HTMLElement, ctx: ExtraGamesContext): void {
  const e = ctx.esc;
  const item = G11_CASES[extraState.g11Idx] || G11_CASES[0];
  const answered = extraState.g11Pick !== -1;
  const isOk = extraState.g11Pick === item.correct;

  const guide = renderActivityGuide(
    {
      title: "Viaggio nel Tempo, Atlante & Custodia (Storia, Geografia & Religione/IRC)",
      disciplines: ["Storia", "Geografia", "Religione (IRC)"],
      videoTopic: "mezzovalle",
      videoLabel: "Video Intro · Storia dell'Acqua & Cibo (3 min)",
      steps: [
        "Leggi attentamente il contesto storico, geografico o etico-religioso proposto nella scheda.",
        "Scegli la risposta che collega meglio le radici culturali alla prevenzione attuale dei rifiuti.",
        "Esplora tutti e 6 gli scenari delle 3 discipline per ottenere +25 XP!"
      ],
      deepDiveHtml:
        "<p><strong>Un'alleanza tra Discipline Umanistiche e Scienza:</strong> la <em>Storia</em> mostra che il vuoto a rendere e i sistemi idrici ingegnosi erano già realtà prima dell'usa-e-getta; la <em>Geografia</em> collega le scelte alimentari allo stress idrico e alle rotte di trasporto; la <em>Religione (IRC)</em> e l'etica civica richiamano la responsabilità di custodire la Casa Comune e il lavoro umano dietro ogni cibo.</p>"
    },
    e
  );

  container.innerHTML = `
    ${guide}
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
      <div>
        <h3 style="margin:0 0 2px;">Gioco 11 (Storia, Geografia &amp; Religione): “Atlante nel Tempo &amp; Custodia”</h3>
        <p style="margin:0;font-size:0.86rem;color:var(--text-muted);">Scenari esplorati correttamente: <strong>${extraState.g11DoneIds.length} / ${G11_CASES.length}</strong></p>
      </div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;">
        ${G11_CASES.map((c, i) => {
          const done = extraState.g11DoneIds.includes(c.id);
          return `<button type="button" class="btn btn-sm ${i === extraState.g11Idx ? "btn-primary" : ""}" data-g11-tab="${i}">${e(c.discipline.split(" ")[0])} ${i + 1} ${done ? "✓" : ""}</button>`;
        }).join("")}
      </div>
    </div>

    <div class="card-soft">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
        <span class="serr-badge-small">${e(item.discipline)}</span>
        <span class="num" style="font-size:0.82rem;color:var(--text-muted);">Scenario ${extraState.g11Idx + 1} / ${G11_CASES.length}</span>
      </div>
      <h4 style="margin:0 0 6px;font-size:1.15rem;">${e(item.title)}</h4>
      <div class="serr-info-strip" style="margin:0 0 10px;">${e(item.context)}</div>
      <p style="font-weight:700;font-size:0.95rem;margin:0 0 10px;">${e(item.question)}</p>

      <div style="display:flex;flex-direction:column;gap:8px;">
        ${item.options.map((opt, idx) => {
          let sty = "";
          if (answered) {
            if (idx === item.correct) sty = "border-color:var(--ok-border);background:var(--ok-bg);";
            else if (idx === extraState.g11Pick) sty = "border-color:var(--err-border);background:var(--err-bg);";
          }
          return `<button type="button" class="choice-pick" style="min-height:46px;padding:9px 12px;${sty}" data-g11-opt="${idx}" ${answered ? "disabled" : ""}>${e(opt)}</button>`;
        }).join("")}
      </div>

      ${answered ? `
        <div class="notice ${isOk ? "notice-ok" : "notice-err"}" style="margin-top:12px;">
          <div><strong>${isOk ? "Risposta centrata!" : "Da approfondire:"}</strong> ${e(item.explanation)}</div>
        </div>
      ` : ""}

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
        <button type="button" class="btn btn-sm" id="g11-prev" ${extraState.g11Idx === 0 ? "disabled" : ""}>← Precedente</button>
        <button type="button" class="btn btn-primary btn-sm" id="g11-next" ${extraState.g11Idx >= G11_CASES.length - 1 ? "disabled" : ""}>Prossimo scenario →</button>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-g11-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      extraState.g11Idx = Number(b.dataset.g11Tab) || 0;
      extraState.g11Pick = -1;
      renderGame11HistoryGeoReligion(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-g11-opt]").forEach((b) =>
    b.addEventListener("click", () => {
      if (extraState.g11Pick !== -1) return;
      extraState.g11Pick = Number(b.dataset.g11Opt);
      if (extraState.g11Pick === item.correct && !extraState.g11DoneIds.includes(item.id)) {
        extraState.g11DoneIds.push(item.id);
        extraState.g11Score += 1;
        if (extraState.g11DoneIds.length === G11_CASES.length) ctx.addXp(25, null, "g11");
      }
      renderGame11HistoryGeoReligion(container, ctx);
    })
  );

  container.querySelector("#g11-prev")?.addEventListener("click", () => {
    if (extraState.g11Idx > 0) {
      extraState.g11Idx -= 1;
      extraState.g11Pick = -1;
      renderGame11HistoryGeoReligion(container, ctx);
    }
  });
  container.querySelector("#g11-next")?.addEventListener("click", () => {
    if (extraState.g11Idx < G11_CASES.length - 1) {
      extraState.g11Idx += 1;
      extraState.g11Pick = -1;
      renderGame11HistoryGeoReligion(container, ctx);
    }
  });
}
