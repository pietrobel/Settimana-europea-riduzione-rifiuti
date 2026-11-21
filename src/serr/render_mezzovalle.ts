import { FOODS_WATER_DATA, MEAL_BUILDER_ITEMS, type FoodWaterItem } from "./data_scientific.ts";
import {
  MEZZOVALLE_INVISIBLE_JOURNEYS,
  MEZZ_MATCH_PAIRS,
  MEZZ_QUIZ_15,
  WASTE_DETECTIVE_CASES
} from "./data_games_quizzes.ts";
import { getFoodSvg } from "./svg_illustrations.ts";
import type { SerrLabPersistedState } from "./persistence.ts";

export interface MezzovalleContext {
  state: SerrLabPersistedState;
  saveAndRefresh: () => void;
  markActivityDone: (id: string, xp?: number) => void;
  recordGameScore: (gameId: string, score: number, total: number) => void;
  navigateTo: (tab: string) => void;
  esc: (s: string) => string;
}

const uiState = {
  subTab: "home" as "home" | "a1" | "a2" | "a3" | "a4" | "a5" | "giochi",
  a1SelectedId: "pane",
  a1CompareB: "manzo",
  a1Category: "Tutte",
  a1OrderIds: ["manzo", "pane", "mela", "cioccolato", "pomodoro", "formaggio"],
  a1OrderChecked: false,
  a2MealA: [
    { foodId: "manzo", grams: 150 },
    { foodId: "patata", grams: 200 },
    { foodId: "pane", grams: 60 }
  ],
  a2MealB: [
    { foodId: "uovo", grams: 120 },
    { foodId: "pomodoro", grams: 200 },
    { foodId: "pane", grams: 60 },
    { foodId: "mela", grams: 150 }
  ],
  a3JourneyId: "journey_pane",
  a3PhaseIdx: 0,
  a4CaseIdx: 0,
  a4ProblemChoice: -1,
  a4SolutionChoice: -1,
  a4SolvedIds: [] as string[],
  a5Chosen: { cereali: "m_pasta", proteine: "p_pollo", ortaggi: "v_pomodoro", frutta: "f_mela" },
  quizAnswers: {} as Record<string, number>,
  quizSubmitted: false,
  matchLeftSelected: "" as string,
  matchPairsSolved: [] as string[],
  matchError: ""
};

export function setMezzovalleSubTab(tab: typeof uiState.subTab): void {
  uiState.subTab = tab;
}

export function renderMezzovalleView(container: HTMLElement, ctx: MezzovalleContext): void {
  const e = ctx.esc;
  const subNav = `
    <div class="serr-subnav" role="tablist" aria-label="Attività Percorso Mezzovalle">
      <button type="button" class="serr-pill ${uiState.subTab === "home" ? "active" : ""}" data-m-tab="home">Panoramica Percorso A</button>
      <button type="button" class="serr-pill ${uiState.subTab === "a1" ? "active" : ""}" data-m-tab="a1">A1 · Acqua Nascosta (15 cibi)</button>
      <button type="button" class="serr-pill ${uiState.subTab === "a2" ? "active" : ""}" data-m-tab="a2">A2 · Calcolatore Impronta</button>
      <button type="button" class="serr-pill ${uiState.subTab === "a3" ? "active" : ""}" data-m-tab="a3">A3 · Viaggio in 7 Fasi</button>
      <button type="button" class="serr-pill ${uiState.subTab === "a4" ? "active" : ""}" data-m-tab="a4">A4 · Detective Spreco (10 casi)</button>
      <button type="button" class="serr-pill ${uiState.subTab === "a5" ? "active" : ""}" data-m-tab="a5">A5 · Pasto Sostenibile</button>
      <button type="button" class="serr-pill ${uiState.subTab === "giochi" ? "active" : ""}" data-m-tab="giochi">Giochi e Verifiche (15 quiz)</button>
    </div>
  `;

  let bodyHtml = "";
  if (uiState.subTab === "home") bodyHtml = renderHome(ctx);
  else if (uiState.subTab === "a1") bodyHtml = renderA1(ctx);
  else if (uiState.subTab === "a2") bodyHtml = renderA2(ctx);
  else if (uiState.subTab === "a3") bodyHtml = renderA3(ctx);
  else if (uiState.subTab === "a4") bodyHtml = renderA4(ctx);
  else if (uiState.subTab === "a5") bodyHtml = renderA5(ctx);
  else bodyHtml = renderGames(ctx);

  container.innerHTML = `
    <div class="serr-path-banner serr-path-mezz">
      <div>
        <div class="serr-kicker">PERCORSO A · MEZZOVALLE</div>
        <h3 style="margin:2px 0 4px;">L'Impronta Nascosta: calcolare il valore del cibo e delle risorse</h3>
        <p style="margin:0;font-size:0.86rem;opacity:0.94;">Percorso laboratoriale di analisi dell'impronta idrica ed ecologica degli alimenti, per comprendere il consumo invisibile di acqua, suolo ed energia nascosto dietro le nostre scelte quotidiane.</p>
      </div>
      <div class="serr-path-actions">
        <button type="button" class="btn btn-sm" data-m-jump="studio">Materiali di studio</button>
        <button type="button" class="btn btn-sm" data-m-jump="schede">Schede A4</button>
        <button type="button" class="btn btn-sm" data-m-jump="diario">Diario</button>
        <button type="button" class="btn btn-sm" data-m-jump="missioni">Missione finale</button>
      </div>
    </div>
    ${subNav}
    <div class="serr-work-area">${bodyHtml}</div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-m-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.mTab as typeof uiState.subTab;
      if (t) {
        uiState.subTab = t;
        renderMezzovalleView(container, ctx);
      }
    });
  });

  container.querySelectorAll<HTMLButtonElement>("[data-m-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.mJump) ctx.navigateTo(btn.dataset.mJump);
    });
  });

  bindEvents(container, ctx, e);
}

function renderHome(ctx: MezzovalleContext): string {
  const doneCount = ctx.state.completedActivities.filter((x) => x.startsWith("M_")).length;
  return `
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Obiettivi didattici di Mezzovalle</h4>
        <ul class="serr-list">
          <li>Distinguere l'<strong>acqua visibile</strong> (rubinetto) dall'<strong>acqua virtuale</strong> (verde, blu e grigia) necessaria per produrre il cibo.</li>
          <li>Confrontare impronta idrica (L/kg, WFN 2011) e impronta di carbonio (kg CO₂e/kg, Poore &amp; Nemecek 2018) come grandezze distinte e non sovrapponibili.</li>
          <li>Ricostruire le 7 fasi produttive e capire perché ridurre gli sprechi alimentari tutela risorse già consumate.</li>
          <li>Comporre pasti vari ed equilibrati senza restrizioni né competizioni alimentari tra studenti.</li>
        </ul>
        <div class="serr-progress-note">Attività Mezzovalle completate: <strong>${doneCount} / 6</strong></div>
      </div>
      <div class="serr-card">
        <h4 style="margin-top:0;">Accedi subito ai laboratori</h4>
        <div class="serr-mini-cards">
          <button type="button" class="serr-action-tile" data-m-tab="a1"><strong>A1 · L'Acqua Nascosta</strong><span>15 alimenti, grafici proporzionali, confronto e gioco di ordinamento</span></button>
          <button type="button" class="serr-action-tile" data-m-tab="a2"><strong>A2 · Calcolatore Impronta</strong><span>Seleziona grammi e confronta Pasto A vs Pasto B</span></button>
          <button type="button" class="serr-action-tile" data-m-tab="a3"><strong>A3 · Viaggio in 7 Fasi</strong><span>Dalla preparazione del terreno fino al consumo finale</span></button>
          <button type="button" class="serr-action-tile" data-m-tab="a4"><strong>A4 · Detective dello Spreco</strong><span>10 casi interattivi su acquisti, TMC, frigo, porzioni e avanzi</span></button>
          <button type="button" class="serr-action-tile" data-m-tab="a5"><strong>A5 · Pasto Sostenibile</strong><span>Componi un pasto completo, vario ed equilibrato</span></button>
          <button type="button" class="serr-action-tile" data-m-tab="giochi"><strong>Verifiche &amp; Missione</strong><span>Quiz 15 domande, gioco di associazione e Custode delle Risorse</span></button>
        </div>
      </div>
    </div>
  `;
}

function renderA1(ctx: MezzovalleContext): string {
  const e = ctx.esc;
  const cats = ["Tutte", "Frutta", "Verdura", "Cereali", "Uova e Latticini", "Carni", "Frutta secca e Cacao"];
  const list = uiState.a1Category === "Tutte"
    ? FOODS_WATER_DATA
    : FOODS_WATER_DATA.filter((f) => f.category === uiState.a1Category);
  const selected = FOODS_WATER_DATA.find((f) => f.id === uiState.a1SelectedId) || FOODS_WATER_DATA[0];
  const compB = FOODS_WATER_DATA.find((f) => f.id === uiState.a1CompareB) || FOODS_WATER_DATA[FOODS_WATER_DATA.length - 1];
  const maxWater = Math.max(...FOODS_WATER_DATA.map((f) => f.waterLPerKg));
  const maxCo2 = Math.max(...FOODS_WATER_DATA.map((f) => f.co2eKgPerKg));

  const orderItems = uiState.a1OrderIds
    .map((id) => FOODS_WATER_DATA.find((f) => f.id === id))
    .filter((x): x is FoodWaterItem => Boolean(x));

  const correctSortedIds = [...orderItems].sort((a, b) => a.waterLPerKg - b.waterLPerKg).map((x) => x.id);
  const isOrderCorrect = uiState.a1OrderIds.every((id, idx) => id === correctSortedIds[idx]);

  return `
    <div class="serr-info-strip">
      <strong>Nota scientifica:</strong> valori medi indicativi globali riferiti a <strong>1 kg di alimento</strong> (WFN – Mekonnen &amp; Hoekstra 2011; CO₂e – Poore &amp; Nemecek 2018). Variano in base a clima, irrigazione e gestione aziendale.
    </div>

    <div class="serr-filter-row">
      ${cats.map((c) => `<button type="button" class="serr-chip ${uiState.a1Category === c ? "active" : ""}" data-a1-cat="${e(c)}">${e(c)}</button>`).join("")}
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Catalogo 15 alimenti e grafici proporzionali (L/kg)</h4>
        <div class="serr-food-bars">
          ${list.map((f) => {
            const pct = Math.max(4, Math.round((f.waterLPerKg / maxWater) * 100));
            const active = f.id === selected.id;
            return `
              <button type="button" class="serr-food-row ${active ? "active" : ""}" data-a1-food="${f.id}">
                ${getFoodSvg(f.id, 38)}
                <div style="flex:1;min-width:0;text-align:left;">
                  <div style="display:flex;justify-content:space-between;font-size:0.84rem;font-weight:700;">
                    <span>${e(f.name)}</span>
                    <span>${f.waterLPerKg.toLocaleString("it-IT")} L/kg</span>
                  </div>
                  <div class="serr-bar-track"><div class="serr-bar-fill" style="width:${pct}%"></div></div>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="serr-card">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:10px;">
          ${getFoodSvg(selected.id, 64)}
          <div>
            <div class="serr-badge-small">${e(selected.category)}</div>
            <h4 style="margin:2px 0;">${e(selected.name)}</h4>
            <div style="font-size:0.86rem;"><strong>${selected.waterLPerKg.toLocaleString("it-IT")} L / 1 kg</strong> · Stima CO₂e: <strong>${selected.co2eKgPerKg.toLocaleString("it-IT")} kg CO₂e/kg</strong></div>
          </div>
        </div>
        <p style="font-size:0.84rem;margin:6px 0;">${e(selected.explanation)}</p>
        <p style="font-size:0.8rem;color:var(--text-muted);margin:6px 0;"><strong>Variabilità reale:</strong> ${e(selected.variabilityNote)}</p>
        <div class="serr-stack-bar" aria-label="Composizione acqua verde blu grigia">
          <div style="width:${selected.greenPct}%;background:#2d8659" title="Acqua verde ${selected.greenPct}%">Verde ${selected.greenPct}%</div>
          <div style="width:${selected.bluePct}%;background:#2b7bb9" title="Acqua blu ${selected.bluePct}%">Blu ${selected.bluePct}%</div>
          <div style="width:${selected.greyPct}%;background:#6b7780" title="Acqua grigia ${selected.greyPct}%">Grigia ${selected.greyPct}%</div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">
          Fonti: ${e(selected.waterSource)} · ${e(selected.carbonSource)}
        </div>

        <hr style="border:none;border-top:1px solid var(--border);margin:12px 0;" />
        <h5 style="margin:0 0 6px;">Confronto diretto tra due alimenti (su 1 kg)</h5>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px;">
          <span><strong>${e(selected.name)}</strong> vs</span>
          <select id="a1-compare-select" class="serr-select" aria-label="Scegli secondo alimento">
            ${FOODS_WATER_DATA.map((f) => `<option value="${f.id}" ${f.id === compB.id ? "selected" : ""}>${e(f.name)} (${f.waterLPerKg.toLocaleString("it-IT")} L/kg)</option>`).join("")}
          </select>
        </div>
        <div class="serr-comp-box">
          <div><strong>Acqua (L/kg):</strong> ${e(selected.name)} = ${selected.waterLPerKg.toLocaleString("it-IT")} L · ${e(compB.name)} = ${compB.waterLPerKg.toLocaleString("it-IT")} L
            (rapporto: <strong>${(Math.max(selected.waterLPerKg, compB.waterLPerKg) / Math.min(selected.waterLPerKg, compB.waterLPerKg)).toFixed(1)}×</strong>)
          </div>
          <div class="serr-bar-track" style="margin:4px 0;"><div class="serr-bar-fill" style="width:${Math.round((selected.waterLPerKg / maxWater) * 100)}%"></div></div>
          <div class="serr-bar-track" style="margin:4px 0;"><div class="serr-bar-fill alt" style="width:${Math.round((compB.waterLPerKg / maxWater) * 100)}%"></div></div>
          <div style="margin-top:6px;"><strong>Carbonio (kg CO₂e/kg):</strong> ${e(selected.name)} = ${selected.co2eKgPerKg} · ${e(compB.name)} = ${compB.co2eKgPerKg}</div>
          <div class="serr-bar-track" style="margin:4px 0;"><div class="serr-bar-fill co2" style="width:${Math.round((selected.co2eKgPerKg / maxCo2) * 100)}%"></div></div>
          <div class="serr-bar-track" style="margin:4px 0;"><div class="serr-bar-fill co2-alt" style="width:${Math.round((compB.co2eKgPerKg / maxCo2) * 100)}%"></div></div>
        </div>
      </div>
    </div>

    <div class="serr-card" style="margin-top:12px;">
      <h4 style="margin-top:0;">Gioco di ordinamento: dal minore al maggiore consumo idrico (1 kg)</h4>
      <p style="font-size:0.84rem;margin-top:0;">Sposta gli alimenti usando le frecce fino a ordinarli dal consumo idrico più basso (1°) al più alto (6°), poi verifica la risposta.</p>
      <div class="serr-order-list">
        ${orderItems.map((item, idx) => `
          <div class="serr-order-item">
            <span class="serr-order-num">${idx + 1}°</span>
            ${getFoodSvg(item.id, 34)}
            <strong style="flex:1;">${e(item.name)}</strong>
            ${uiState.a1OrderChecked ? `<span class="serr-badge-small">${item.waterLPerKg.toLocaleString("it-IT")} L/kg</span>` : ""}
            <button type="button" class="btn btn-sm" data-a1-move="${idx}:-1" ${idx === 0 ? "disabled" : ""} aria-label="Sposta su">↑</button>
            <button type="button" class="btn btn-sm" data-a1-move="${idx}:1" ${idx === orderItems.length - 1 ? "disabled" : ""} aria-label="Sposta giù">↓</button>
          </div>
        `).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
        <button type="button" class="btn btn-primary btn-sm" id="btn-a1-check-order">Verifica ordinamento</button>
        <button type="button" class="btn btn-sm" id="btn-a1-reset-order">Mescola di nuovo</button>
      </div>
      ${uiState.a1OrderChecked ? `
        <div class="serr-feedback ${isOrderCorrect ? "ok" : "warn"}" style="margin-top:10px;">
          ${isOrderCorrect
            ? "<strong>Esatto!</strong> Hai ordinato correttamente dal pomodoro (~214 L/kg) fino a manzo (~15.415 L/kg) e cioccolato (~17.196 L/kg). Nota come ortaggi e frutta consumino molta meno acqua per kg rispetto a prodotti zootecnici e cacao."
            : `<strong>Quasi!</strong> Osserva i litri/kg ora mostrati accanto a ogni alimento: l'ordine crescente corretto è ${correctSortedIds.map((id) => FOODS_WATER_DATA.find((x) => x.id === id)?.name).join(" → ")}.`}
        </div>
      ` : ""}
    </div>
  `;
}

function calcMealTotals(items: { foodId: string; grams: number }[]): { waterL: number; co2Kg: number; grams: number } {
  let waterL = 0;
  let co2Kg = 0;
  let grams = 0;
  for (const row of items) {
    const f = FOODS_WATER_DATA.find((x) => x.id === row.foodId);
    if (!f) continue;
    const factor = row.grams / 1000;
    waterL += f.waterLPerKg * factor;
    co2Kg += f.co2eKgPerKg * factor;
    grams += row.grams;
  }
  return { waterL: Math.round(waterL), co2Kg: Number(co2Kg.toFixed(2)), grams };
}

function renderA2(ctx: MezzovalleContext): string {
  const e = ctx.esc;
  const totA = calcMealTotals(uiState.a2MealA);
  const totB = calcMealTotals(uiState.a2MealB);
  const maxW = Math.max(totA.waterL, totB.waterL, 500);
  const maxC = Math.max(totA.co2Kg, totB.co2Kg, 1);

  const renderEditor = (label: string, key: "A" | "B", list: { foodId: string; grams: number }[], tot: { waterL: number; co2Kg: number; grams: number }) => `
    <div class="serr-card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <h4 style="margin:0;">${label}</h4>
        <span class="serr-badge-small">${tot.grams} g · ~${tot.waterL.toLocaleString("it-IT")} L · ~${tot.co2Kg.toLocaleString("it-IT")} kg CO₂e</span>
      </div>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
        ${list.map((row, idx) => {
          const f = FOODS_WATER_DATA.find((x) => x.id === row.foodId) || FOODS_WATER_DATA[0];
          const w = Math.round((f.waterLPerKg * row.grams) / 1000);
          return `
            <div class="serr-calc-row">
              <select class="serr-select" data-a2-food="${key}:${idx}" aria-label="Alimento">
                ${FOODS_WATER_DATA.map((opt) => `<option value="${opt.id}" ${opt.id === row.foodId ? "selected" : ""}>${e(opt.name)}</option>`).join("")}
              </select>
              <input type="number" min="20" max="1000" step="10" class="serr-input-num" value="${row.grams}" data-a2-grams="${key}:${idx}" aria-label="Grammi" />
              <span style="font-size:0.78rem;min-width:74px;">g (~${w} L)</span>
              <button type="button" class="btn btn-sm" data-a2-del="${key}:${idx}" ${list.length <= 1 ? "disabled" : ""} aria-label="Rimuovi">✕</button>
            </div>
          `;
        }).join("")}
      </div>
      <button type="button" class="btn btn-sm" style="margin-top:8px;" data-a2-add="${key}">+ Aggiungi alimento</button>
    </div>
  `;

  const waterDiff = totA.waterL - totB.waterL;
  return `
    <div class="serr-info-strip">
      <strong>Valori indicativi di stima didattica:</strong> il calcolatore moltiplica le porzioni scelte per le medie WFN (L/kg) e Poore &amp; Nemecek (kg CO₂e/kg). Non sono misurazioni cliniche né esatte del singolo prodotto locale.
    </div>
    <div class="serr-grid-2">
      ${renderEditor("Combinazione A (es. Pasto di partenza)", "A", uiState.a2MealA, totA)}
      ${renderEditor("Combinazione B (es. Alternativa studiata)", "B", uiState.a2MealB, totB)}
    </div>
    <div class="serr-card" style="margin-top:12px;">
      <h4 style="margin-top:0;">Confronto visivo tra Combinazione A e Combinazione B</h4>
      <div class="serr-grid-2">
        <div>
          <div style="font-size:0.84rem;font-weight:700;">Impronta idrica stimata (Litri)</div>
          <div style="margin:6px 0 2px;font-size:0.82rem;">Combinazione A: <strong>${totA.waterL.toLocaleString("it-IT")} L</strong></div>
          <div class="serr-bar-track"><div class="serr-bar-fill" style="width:${Math.round((totA.waterL / maxW) * 100)}%"></div></div>
          <div style="margin:6px 0 2px;font-size:0.82rem;">Combinazione B: <strong>${totB.waterL.toLocaleString("it-IT")} L</strong></div>
          <div class="serr-bar-track"><div class="serr-bar-fill alt" style="width:${Math.round((totB.waterL / maxW) * 100)}%"></div></div>
        </div>
        <div>
          <div style="font-size:0.84rem;font-weight:700;">Impronta di carbonio stimata (kg CO₂e)</div>
          <div style="margin:6px 0 2px;font-size:0.82rem;">Combinazione A: <strong>${totA.co2Kg.toLocaleString("it-IT")} kg CO₂e</strong></div>
          <div class="serr-bar-track"><div class="serr-bar-fill co2" style="width:${Math.round((totA.co2Kg / maxC) * 100)}%"></div></div>
          <div style="margin:6px 0 2px;font-size:0.82rem;">Combinazione B: <strong>${totB.co2Kg.toLocaleString("it-IT")} kg CO₂e</strong></div>
          <div class="serr-bar-track"><div class="serr-bar-fill co2-alt" style="width:${Math.round((totB.co2Kg / maxC) * 100)}%"></div></div>
        </div>
      </div>
      <div class="serr-feedback ok" style="margin-top:10px;">
        <strong>Differenza stimata:</strong> la Combinazione B ${waterDiff >= 0 ? `risparmia circa <strong>${waterDiff.toLocaleString("it-IT")} litri</strong> d'acqua virtuale` : `impiega circa <strong>${Math.abs(waterDiff).toLocaleString("it-IT")} litri</strong> in più`} rispetto alla Combinazione A. Prova a sostituire un ingrediente o ridurre gli sprechi per osservare come cambia il grafico!
      </div>
      <button type="button" class="btn btn-primary btn-sm" style="margin-top:8px;" id="btn-a2-save-progress">Registra analisi calcolatore</button>
    </div>
  `;
}

function renderA3(ctx: MezzovalleContext): string {
  const e = ctx.esc;
  const sc = MEZZOVALLE_INVISIBLE_JOURNEYS.find((x) => x.id === uiState.a3JourneyId) || MEZZOVALLE_INVISIBLE_JOURNEYS[0];
  const activeStep = sc.steps[uiState.a3PhaseIdx] || sc.steps[0];

  return `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
      ${MEZZOVALLE_INVISIBLE_JOURNEYS.map((j) => `<button type="button" class="serr-chip ${j.id === sc.id ? "active" : ""}" data-a3-journey="${j.id}">${e(j.name)}</button>`).join("")}
    </div>
    <div class="serr-card">
      <h4 style="margin:0 0 4px;">${e(sc.name)}</h4>
      <div style="font-size:0.84rem;color:var(--text-muted);margin-bottom:8px;">${e(sc.subtitle)} · <strong>${e(sc.indicativeTotals)}</strong></div>
      <div class="serr-phase-stepper">
        ${sc.steps.map((s, idx) => `
          <button type="button" class="serr-step-btn ${idx === uiState.a3PhaseIdx ? "active" : ""}" data-a3-step="${idx}">
            <span>Fase ${s.phaseNum}</span>
            <small>${e(s.title)}</small>
          </button>
        `).join("")}
      </div>
      <div class="serr-phase-detail" style="margin-top:12px;">
        <h5 style="margin:0 0 8px;">Fase ${activeStep.phaseNum}/7: ${e(activeStep.title)}</h5>
        <div class="serr-grid-3">
          <div class="serr-mini-stat"><strong>Acqua</strong><p>${e(activeStep.waterNote)}</p></div>
          <div class="serr-mini-stat"><strong>Energia</strong><p>${e(activeStep.energyNote)}</p></div>
          <div class="serr-mini-stat"><strong>Suolo e Materiali</strong><p>${e(activeStep.soilAndMaterialNote)}</p></div>
        </div>
        <div class="serr-feedback ok" style="margin-top:10px;">
          <strong>Punto critico della fase:</strong> ${e(activeStep.criticalPoint)}
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <button type="button" class="btn btn-sm" id="btn-a3-prev" ${uiState.a3PhaseIdx === 0 ? "disabled" : ""}>← Fase precedente</button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-a3-next">${uiState.a3PhaseIdx < sc.steps.length - 1 ? "Fase successiva →" : "Completa simulazione 7 fasi ✓"}</button>
        </div>
      </div>
    </div>
  `;
}

function renderA4(ctx: MezzovalleContext): string {
  const e = ctx.esc;
  const c = WASTE_DETECTIVE_CASES[uiState.a4CaseIdx] || WASTE_DETECTIVE_CASES[0];
  const probDone = uiState.a4ProblemChoice !== -1;
  const solDone = uiState.a4SolutionChoice !== -1;
  const bothCorrect = uiState.a4ProblemChoice === c.correctProblemIdx && uiState.a4SolutionChoice === c.correctSolutionIdx;

  return `
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
      ${WASTE_DETECTIVE_CASES.map((item, i) => {
        const solved = uiState.a4SolvedIds.includes(item.id);
        return `<button type="button" class="serr-chip ${i === uiState.a4CaseIdx ? "active" : ""}" data-a4-case="${i}">Caso ${i + 1} ${solved ? "✓" : ""}</button>`;
      }).join("")}
    </div>
    <div class="serr-card">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;">
        <span class="serr-badge-small">${e(c.category)}</span>
        <span style="font-size:0.82rem;">Casi risolti: <strong>${uiState.a4SolvedIds.length} / ${WASTE_DETECTIVE_CASES.length}</strong></span>
      </div>
      <h4 style="margin:6px 0;">Caso ${uiState.a4CaseIdx + 1}: ${e(c.title)}</h4>
      <p style="font-size:0.9rem;margin:6px 0;">${e(c.scene)}</p>
      <div class="serr-info-strip" style="margin:8px 0;">${e(c.hiddenWasteNote)}</div>

      <div class="serr-grid-2" style="margin-top:10px;">
        <div>
          <strong style="font-size:0.86rem;">1. Individua il problema: ${e(c.problemQuestion)}</strong>
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px;">
            ${c.problemOptions.map((opt, idx) => {
              const cls = probDone && uiState.a4ProblemChoice === idx
                ? (idx === c.correctProblemIdx ? "is-ok" : "is-err")
                : "";
              return `<button type="button" class="serr-opt-btn ${cls}" data-a4-prob="${idx}">${e(opt)}</button>`;
            }).join("")}
          </div>
        </div>
        <div>
          <strong style="font-size:0.86rem;">2. Scegli la soluzione: ${e(c.solutionQuestion)}</strong>
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px;">
            ${c.solutionOptions.map((opt, idx) => {
              const cls = solDone && uiState.a4SolutionChoice === idx
                ? (idx === c.correctSolutionIdx ? "is-ok" : "is-err")
                : "";
              return `<button type="button" class="serr-opt-btn ${cls}" data-a4-sol="${idx}">${e(opt)}</button>`;
            }).join("")}
          </div>
        </div>
      </div>

      ${(probDone || solDone) ? `
        <div class="serr-feedback ${bothCorrect ? "ok" : "warn"}" style="margin-top:10px;">
          ${bothCorrect
            ? `<strong>Indagine risolta!</strong> ${e(c.explanation)}`
            : `<strong>Controlla entrambe le risposte:</strong> ${e(c.explanation)}`}
        </div>
      ` : ""}

      <div style="display:flex;justify-content:space-between;margin-top:10px;">
        <button type="button" class="btn btn-sm" id="btn-a4-prev" ${uiState.a4CaseIdx === 0 ? "disabled" : ""}>← Caso precedente</button>
        <button type="button" class="btn btn-primary btn-sm" id="btn-a4-next" ${uiState.a4CaseIdx >= WASTE_DETECTIVE_CASES.length - 1 ? "disabled" : ""}>Caso successivo →</button>
      </div>
    </div>
  `;
}

function renderA5(ctx: MezzovalleContext): string {
  const e = ctx.esc;
  const groups: Array<{ key: "cereali" | "proteine" | "ortaggi" | "frutta"; label: string }> = [
    { key: "cereali", label: "1. Cereali o tuberi" },
    { key: "proteine", label: "2. Fonti proteiche varie" },
    { key: "ortaggi", label: "3. Ortaggi di stagione" },
    { key: "frutta", label: "4. Frutta o spuntino" }
  ];

  const chosenItems = groups.map((g) => {
    const opts = MEAL_BUILDER_ITEMS.filter((x) => x.group === g.key);
    return opts.find((x) => x.id === uiState.a5Chosen[g.key]) || opts[0];
  });
  const itemWater = (it: typeof MEAL_BUILDER_ITEMS[number]) => Math.round((it.waterLPerKg * it.servingG) / 1000);
  const itemCo2 = (it: typeof MEAL_BUILDER_ITEMS[number]) => Number(((it.co2eKgPerKg * it.servingG) / 1000).toFixed(2));
  const totalWater = chosenItems.reduce((acc, x) => acc + itemWater(x), 0);
  const totalCo2 = Number(chosenItems.reduce((acc, x) => acc + itemCo2(x), 0).toFixed(2));
  const baselineWater = 2780;
  const diff = baselineWater - totalWater;

  return `
    <div class="serr-info-strip">
      <strong>Principio educativo:</strong> un pasto sostenibile è <strong>completo, vario ed equilibrato</strong> (contiene tutte e 4 le categorie), riduce gli sprechi e varia le fonti proteiche <strong>senza mai incoraggiare restrizioni o rinunce alimentari</strong>.
    </div>
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Componi il tuo pasto completo nelle 4 categorie</h4>
        ${groups.map((g) => {
          const opts = MEAL_BUILDER_ITEMS.filter((x) => x.group === g.key);
          return `
            <div style="margin-bottom:10px;">
              <div style="font-size:0.84rem;font-weight:700;margin-bottom:4px;">${g.label}</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${opts.map((o) => `
                  <button type="button" class="serr-chip ${uiState.a5Chosen[g.key] === o.id ? "active" : ""}" data-a5-pick="${g.key}:${o.id}">
                    ${e(o.name)} (${itemWater(o)} L)
                  </button>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="serr-card">
        <h4 style="margin-top:0;">Analisi del pasto composto</h4>
        <ul class="serr-list">
          ${chosenItems.map((it) => `<li><strong>${e(it.name)}:</strong> ~${itemWater(it)} L acqua · ~${itemCo2(it)} kg CO₂e — <em>${e(it.note)}</em></li>`).join("")}
        </ul>
        <div class="serr-comp-box" style="margin-top:10px;">
          <div>Impronta idrica stimata del pasto: <strong>~${totalWater.toLocaleString("it-IT")} L</strong></div>
          <div>Impronta carbonio stimata: <strong>~${totalCo2.toLocaleString("it-IT")} kg CO₂e</strong></div>
          <div style="margin-top:4px;font-size:0.82rem;">Confronto con un menu standard ad alta intensità (~2.780 L): ${diff > 0 ? `<strong style="color:#1b6b3e;">risparmio indicativo di ${diff.toLocaleString("it-IT")} L</strong>` : "<strong>pasto ad alta densità idrica: prova l'alternanza con legumi o uova!</strong>"}</div>
        </div>
        <button type="button" class="btn btn-primary btn-sm" style="margin-top:10px;" id="btn-a5-confirm">Salva il mio Pasto Equilibrato</button>
      </div>
    </div>
  `;
}

function renderGames(ctx: MezzovalleContext): string {
  const e = ctx.esc;
  const quizScore = MEZZ_QUIZ_15.reduce((acc, q) => acc + (uiState.quizAnswers[q.id] === q.correctIdx ? 1 : 0), 0);
  const allAnswered = MEZZ_QUIZ_15.every((q) => typeof uiState.quizAnswers[q.id] === "number");

  return `
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Gioco di associazione · Concetti di Mezzovalle</h4>
        <p style="font-size:0.83rem;margin-top:0;">Seleziona un concetto a sinistra e poi la sua definizione corretta a destra.</p>
        <div class="serr-grid-2">
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${MEZZ_MATCH_PAIRS.map((p) => {
              const solved = uiState.matchPairsSolved.includes(p.id);
              const sel = uiState.matchLeftSelected === p.id;
              return `<button type="button" class="serr-opt-btn ${solved ? "is-ok" : sel ? "is-sel" : ""}" data-mm-left="${p.id}" ${solved ? "disabled" : ""}>${e(p.left)} ${solved ? "✓" : ""}</button>`;
            }).join("")}
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${[...MEZZ_MATCH_PAIRS].reverse().map((p) => {
              const solved = uiState.matchPairsSolved.includes(p.id);
              return `<button type="button" class="serr-opt-btn ${solved ? "is-ok" : ""}" data-mm-right="${p.id}" ${solved ? "disabled" : ""}>${e(p.right)}</button>`;
            }).join("")}
          </div>
        </div>
        ${uiState.matchError ? `<div class="serr-feedback warn" style="margin-top:8px;">${e(uiState.matchError)}</div>` : ""}
        ${uiState.matchPairsSolved.length === MEZZ_MATCH_PAIRS.length ? `<div class="serr-feedback ok" style="margin-top:8px;"><strong>Tutte le 6 coppie associate correttamente!</strong></div>` : ""}
        <button type="button" class="btn btn-sm" style="margin-top:8px;" id="btn-mm-reset">Ricomincia associazione</button>
      </div>

      <div class="serr-card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
          <h4 style="margin:0;">Verifica Mezzovalle · ${MEZZ_QUIZ_15.length} Domande</h4>
          <span class="serr-badge-small">Ripetibile senza limiti</span>
        </div>
        <div class="serr-quiz-scroll">
          ${MEZZ_QUIZ_15.map((q, qi) => {
            const ans = uiState.quizAnswers[q.id];
            return `
              <div class="serr-q-block">
                <div style="font-weight:700;font-size:0.85rem;margin-bottom:4px;">${qi + 1}. ${e(q.question)}</div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  ${q.options.map((opt, oi) => {
                    let cls = "";
                    if (uiState.quizSubmitted) {
                      if (oi === q.correctIdx) cls = "is-ok";
                      else if (ans === oi) cls = "is-err";
                    } else if (ans === oi) cls = "is-sel";
                    return `<button type="button" class="serr-opt-btn ${cls}" data-mq-pick="${q.id}:${oi}">${e(opt)}</button>`;
                  }).join("")}
                </div>
                ${uiState.quizSubmitted ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">${e(q.explanation)}</div>` : ""}
              </div>
            `;
          }).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;align-items:center;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-mq-submit" ${!allAnswered ? "disabled" : ""}>Verifica punteggio (${Object.keys(uiState.quizAnswers).length}/${MEZZ_QUIZ_15.length})</button>
          <button type="button" class="btn btn-sm" id="btn-mq-retry">Ripeti quiz</button>
          ${uiState.quizSubmitted ? `<strong>Risultato: ${quizScore}/${MEZZ_QUIZ_15.length}</strong>` : ""}
        </div>
      </div>
    </div>
  `;
}

function bindEvents(container: HTMLElement, ctx: MezzovalleContext, _e: (s: string) => string): void {
  container.querySelectorAll<HTMLButtonElement>("[data-a1-cat]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a1Category = b.dataset.a1Cat || "Tutte";
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-a1-food]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a1SelectedId = b.dataset.a1Food || "pane";
      ctx.markActivityDone("M_A1", 10);
      renderMezzovalleView(container, ctx);
    })
  );
  const cmpSel = container.querySelector<HTMLSelectElement>("#a1-compare-select");
  if (cmpSel) {
    cmpSel.addEventListener("change", () => {
      uiState.a1CompareB = cmpSel.value;
      renderMezzovalleView(container, ctx);
    });
  }
  container.querySelectorAll<HTMLButtonElement>("[data-a1-move]").forEach((b) =>
    b.addEventListener("click", () => {
      const [idxStr, deltaStr] = (b.dataset.a1Move || "").split(":");
      const idx = Number(idxStr);
      const delta = Number(deltaStr);
      const target = idx + delta;
      if (target >= 0 && target < uiState.a1OrderIds.length) {
        const arr = [...uiState.a1OrderIds];
        const tmp = arr[idx];
        arr[idx] = arr[target];
        arr[target] = tmp;
        uiState.a1OrderIds = arr;
        uiState.a1OrderChecked = false;
        renderMezzovalleView(container, ctx);
      }
    })
  );
  container.querySelector("#btn-a1-check-order")?.addEventListener("click", () => {
    uiState.a1OrderChecked = true;
    ctx.markActivityDone("M_A1", 15);
    renderMezzovalleView(container, ctx);
  });
  container.querySelector("#btn-a1-reset-order")?.addEventListener("click", () => {
    uiState.a1OrderIds = ["manzo", "mela", "cioccolato", "pomodoro", "pane", "formaggio"];
    uiState.a1OrderChecked = false;
    renderMezzovalleView(container, ctx);
  });

  // A2 Calculator
  container.querySelectorAll<HTMLSelectElement>("[data-a2-food]").forEach((sel) =>
    sel.addEventListener("change", () => {
      const [key, idxStr] = (sel.dataset.a2Food || "").split(":");
      const arr = key === "A" ? uiState.a2MealA : uiState.a2MealB;
      const idx = Number(idxStr);
      if (arr[idx]) arr[idx].foodId = sel.value;
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLInputElement>("[data-a2-grams]").forEach((inp) =>
    inp.addEventListener("change", () => {
      const [key, idxStr] = (inp.dataset.a2Grams || "").split(":");
      const arr = key === "A" ? uiState.a2MealA : uiState.a2MealB;
      const idx = Number(idxStr);
      const v = Math.max(20, Math.min(1000, Number(inp.value) || 100));
      if (arr[idx]) arr[idx].grams = v;
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-a2-del]").forEach((b) =>
    b.addEventListener("click", () => {
      const [key, idxStr] = (b.dataset.a2Del || "").split(":");
      const arr = key === "A" ? uiState.a2MealA : uiState.a2MealB;
      if (arr.length > 1) arr.splice(Number(idxStr), 1);
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-a2-add]").forEach((b) =>
    b.addEventListener("click", () => {
      const arr = b.dataset.a2Add === "A" ? uiState.a2MealA : uiState.a2MealB;
      arr.push({ foodId: "arancia", grams: 150 });
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelector("#btn-a2-save-progress")?.addEventListener("click", () => {
    ctx.markActivityDone("M_A2", 15);
  });

  // A3 7-phase journey
  container.querySelectorAll<HTMLButtonElement>("[data-a3-journey]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a3JourneyId = b.dataset.a3Journey || "journey_pane";
      uiState.a3PhaseIdx = 0;
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-a3-step]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a3PhaseIdx = Number(b.dataset.a3Step) || 0;
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelector("#btn-a3-prev")?.addEventListener("click", () => {
    if (uiState.a3PhaseIdx > 0) uiState.a3PhaseIdx--;
    renderMezzovalleView(container, ctx);
  });
  container.querySelector("#btn-a3-next")?.addEventListener("click", () => {
    if (uiState.a3PhaseIdx < 6) uiState.a3PhaseIdx++;
    else ctx.markActivityDone("M_A3", 15);
    renderMezzovalleView(container, ctx);
  });

  // A4 Waste Detective
  container.querySelectorAll<HTMLButtonElement>("[data-a4-case]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a4CaseIdx = Number(b.dataset.a4Case) || 0;
      uiState.a4ProblemChoice = -1;
      uiState.a4SolutionChoice = -1;
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-a4-prob]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a4ProblemChoice = Number(b.dataset.a4Prob);
      const c = WASTE_DETECTIVE_CASES[uiState.a4CaseIdx];
      if (uiState.a4ProblemChoice === c.correctProblemIdx && uiState.a4SolutionChoice === c.correctSolutionIdx) {
        if (!uiState.a4SolvedIds.includes(c.id)) uiState.a4SolvedIds.push(c.id);
        if (uiState.a4SolvedIds.length >= 3) ctx.markActivityDone("M_A4", 20);
      }
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-a4-sol]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.a4SolutionChoice = Number(b.dataset.a4Sol);
      const c = WASTE_DETECTIVE_CASES[uiState.a4CaseIdx];
      if (uiState.a4ProblemChoice === c.correctProblemIdx && uiState.a4SolutionChoice === c.correctSolutionIdx) {
        if (!uiState.a4SolvedIds.includes(c.id)) uiState.a4SolvedIds.push(c.id);
        if (uiState.a4SolvedIds.length >= 3) ctx.markActivityDone("M_A4", 20);
      }
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelector("#btn-a4-prev")?.addEventListener("click", () => {
    if (uiState.a4CaseIdx > 0) {
      uiState.a4CaseIdx--;
      uiState.a4ProblemChoice = -1;
      uiState.a4SolutionChoice = -1;
      renderMezzovalleView(container, ctx);
    }
  });
  container.querySelector("#btn-a4-next")?.addEventListener("click", () => {
    if (uiState.a4CaseIdx < WASTE_DETECTIVE_CASES.length - 1) {
      uiState.a4CaseIdx++;
      uiState.a4ProblemChoice = -1;
      uiState.a4SolutionChoice = -1;
      renderMezzovalleView(container, ctx);
    }
  });

  // A5 Meal builder
  container.querySelectorAll<HTMLButtonElement>("[data-a5-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      const [g, id] = (b.dataset.a5Pick || "").split(":") as ["cereali" | "proteine" | "ortaggi" | "frutta", string];
      uiState.a5Chosen[g] = id;
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelector("#btn-a5-confirm")?.addEventListener("click", () => {
    ctx.markActivityDone("M_A5", 15);
    renderMezzovalleView(container, ctx);
  });

  // Matching + Quiz
  container.querySelectorAll<HTMLButtonElement>("[data-mm-left]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.matchLeftSelected = b.dataset.mmLeft || "";
      uiState.matchError = "";
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-mm-right]").forEach((b) =>
    b.addEventListener("click", () => {
      const rightId = b.dataset.mmRight || "";
      if (!uiState.matchLeftSelected) {
        uiState.matchError = "Prima seleziona un termine nella colonna di sinistra.";
      } else if (uiState.matchLeftSelected === rightId) {
        if (!uiState.matchPairsSolved.includes(rightId)) uiState.matchPairsSolved.push(rightId);
        uiState.matchLeftSelected = "";
        uiState.matchError = "";
        if (uiState.matchPairsSolved.length === MEZZ_MATCH_PAIRS.length) {
          ctx.recordGameScore("mezz_match", MEZZ_MATCH_PAIRS.length, MEZZ_MATCH_PAIRS.length);
        }
      } else {
        uiState.matchError = "Abbinamento non corrispondente: rileggi il concetto e riprova!";
      }
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelector("#btn-mm-reset")?.addEventListener("click", () => {
    uiState.matchPairsSolved = [];
    uiState.matchLeftSelected = "";
    uiState.matchError = "";
    renderMezzovalleView(container, ctx);
  });
  container.querySelectorAll<HTMLButtonElement>("[data-mq-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      if (uiState.quizSubmitted) return;
      const [qid, idxStr] = (b.dataset.mqPick || "").split(":");
      uiState.quizAnswers[qid] = Number(idxStr);
      renderMezzovalleView(container, ctx);
    })
  );
  container.querySelector("#btn-mq-submit")?.addEventListener("click", () => {
    uiState.quizSubmitted = true;
    const score = MEZZ_QUIZ_15.reduce((acc, q) => acc + (uiState.quizAnswers[q.id] === q.correctIdx ? 1 : 0), 0);
    ctx.recordGameScore("mezz_quiz_15", score, MEZZ_QUIZ_15.length);
    ctx.markActivityDone("M_QUIZ", 25);
    renderMezzovalleView(container, ctx);
  });
  container.querySelector("#btn-mq-retry")?.addEventListener("click", () => {
    uiState.quizAnswers = {};
    uiState.quizSubmitted = false;
    renderMezzovalleView(container, ctx);
  });
}
