import {
  PORTAL_LINKS,
  RECOMMENDED_FILMS,
  type PortalCategory,
  type PortalLinkItem,
  type RecommendedFilmItem
} from "./data_portal.ts";

export interface PortalContext {
  esc: (s: string) => string;
  onJumpSection?: (sec: string) => void;
  onOpenLab?: (tab: string) => void;
}

const portalUi = {
  resourceFilter: "tutte" as "tutte" | PortalCategory,
  borgoFilter: "Tutti" as "Tutti" | "Mezzovalle" | "Villacolle" | "Cefalana" | "Dragano" | "Campolieto",
  filmFilter: "tutti" as "tutti" | "gratis" | "mediateca",
  searchText: "",
  activePromptId: ""
};

function matchesFilters(
  item: { title: string; borgo: string; text: string },
  borgoFilter: string,
  searchText: string
): boolean {
  if (borgoFilter !== "Tutti" && item.borgo !== "Tutti" && item.borgo !== borgoFilter) {
    return false;
  }
  const q = searchText.trim().toLowerCase();
  if (!q) return true;
  return (
    item.title.toLowerCase().includes(q) ||
    item.borgo.toLowerCase().includes(q) ||
    item.text.toLowerCase().includes(q)
  );
}

function categoryTitle(cat: PortalCategory): string {
  if (cat === "pagine") return "Pagina Web Istituzionale / Scientifica";
  if (cat === "app") return "Applicazione / Simulatore Esterno";
  return "Portale Video / Cortometraggio";
}

function renderLinkCard(item: PortalLinkItem, e: (s: string) => string): string {
  return `
    <article class="serr-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:8px;">
      <div>
        <div class="meta-line" style="margin-bottom:4px;">
          <span>${e(categoryTitle(item.category))}</span>
          <span aria-hidden="true">·</span>
          <span>Borgo: ${e(item.borgo)}</span>
          <span aria-hidden="true">·</span>
          <span>${e(item.costLabel)}</span>
        </div>
        <h4 style="margin:0 0 4px;font-size:0.98rem;">${e(item.title)}</h4>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:6px;">
          ${e(item.provider)} · Lingua: ${e(item.language)}
        </div>
        <p style="margin:0 0 6px;font-size:0.84rem;line-height:1.45;">${e(item.description)}</p>
        <div style="font-size:0.79rem;background:#f5f9f6;border:1px solid #d7e5dc;border-radius:8px;padding:6px 8px;color:#17472d;">
          <strong>Uso didattico:</strong> ${e(item.classUse)}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding-top:4px;border-top:1px solid var(--border);">
        <span style="font-size:0.74rem;color:var(--text-muted);word-break:break-all;">${e(item.url)}</span>
        <a href="${e(item.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="text-decoration:none;">Apri risorsa esterna ↗</a>
      </div>
    </article>
  `;
}

function renderFilmCard(film: RecommendedFilmItem, e: (s: string) => string): string {
  const showPrompt = portalUi.activePromptId === film.id;
  const freeAction = film.isFree && film.freeUrl
    ? `<a href="${e(film.freeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="text-decoration:none;">${e(film.freeButtonLabel || "Apri visione gratuita ↗")}</a>`
    : `<span style="font-size:0.77rem;font-weight:700;color:#78350f;">Visione commerciale / Mediateca</span>`;

  const secondaryAction = film.secondaryUrl
    ? `<a href="${e(film.secondaryUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="text-decoration:none;">${e(film.secondaryLabel || "Approfondimento ↗")}</a>`
    : "";

  const accessBg = film.isFree ? "#eaf7ee" : "#fff7ed";
  const accessBorder = film.isFree ? "#86c89d" : "#fdba74";
  const accessText = film.isFree ? "#14532d" : "#9a3412";
  const statusWord = film.isFree ? "VISIONE GRATUITA ONLINE" : "NON GRATUITO / MEDIATECA";

  return `
    <article class="serr-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:8px;">
      <div>
        <div class="meta-line" style="margin-bottom:4px;">
          <span>${film.year}</span>
          <span aria-hidden="true">·</span>
          <span>${film.durationMin} min</span>
          <span aria-hidden="true">·</span>
          <span>Età ${e(film.ageRange)}</span>
          <span aria-hidden="true">·</span>
          <span>${e(film.borgo)}</span>
        </div>
        <h4 style="margin:0 0 3px;font-size:1rem;">${e(film.title)}${film.originalTitle ? ` <span style="font-weight:500;font-size:0.84rem;color:var(--text-muted);">(${e(film.originalTitle)})</span>` : ""}</h4>
        <div style="font-size:0.8rem;color:var(--accent);font-weight:600;margin-bottom:6px;">Tema: ${e(film.theme)}</div>
        <p style="margin:0 0 8px;font-size:0.84rem;line-height:1.45;">${e(film.synopsis)}</p>
        <div style="padding:6px 9px;border-radius:8px;background:${accessBg};border:1px solid ${accessBorder};color:${accessText};font-size:0.79rem;">
          <strong>${statusWord}:</strong> ${e(film.accessLabel)}
        </div>
      </div>

      ${showPrompt ? `
        <div style="padding:7px 9px;border-radius:8px;background:#f0f7fc;border:1px solid #bcd9ed;font-size:0.8rem;color:#0f3e61;">
          <strong>Spunto per il dibattito in classe:</strong> ${e(film.discussionPrompt)}
        </div>
      ` : ""}

      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;padding-top:4px;border-top:1px solid var(--border);">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
          ${freeAction}
          ${secondaryAction}
        </div>
        <button type="button" class="btn btn-sm" data-film-prompt="${e(film.id)}">
          ${showPrompt ? "Nascondi spunto" : "Spunto per la classe"}
        </button>
      </div>
    </article>
  `;
}

export function renderPortalView(container: HTMLElement, ctx: PortalContext): void {
  const e = ctx.esc;

  const filteredLinks = PORTAL_LINKS.filter((item) => {
    if (portalUi.resourceFilter !== "tutte" && item.category !== portalUi.resourceFilter) return false;
    return matchesFilters(
      {
        title: item.title,
        borgo: item.borgo,
        text: `${item.provider} ${item.description} ${item.classUse}`
      },
      portalUi.borgoFilter,
      portalUi.searchText
    );
  });

  const filteredFilms = RECOMMENDED_FILMS.filter((film) => {
    if (portalUi.filmFilter === "gratis" && !film.isFree) return false;
    if (portalUi.filmFilter === "mediateca" && film.isFree) return false;
    return matchesFilters(
      {
        title: `${film.title} ${film.originalTitle || ""}`,
        borgo: film.borgo,
        text: `${film.theme} ${film.synopsis} ${film.accessLabel}`
      },
      portalUi.borgoFilter,
      portalUi.searchText
    );
  });

  const freeFilmsCount = RECOMMENDED_FILMS.filter((f) => f.isFree).length;
  const countPagine = PORTAL_LINKS.filter((x) => x.category === "pagine").length;
  const countApp = PORTAL_LINKS.filter((x) => x.category === "app").length;
  const countVideo = PORTAL_LINKS.filter((x) => x.category === "video").length;

  container.innerHTML = `
    <div class="serr-hero-box" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
        <div>
          <div class="serr-kicker">RISORSE VERIFICATE PER STUDENTI, CLASSI E FAMIGLIE</div>
          <h3 style="margin:3px 0 5px;font-size:1.15rem;">Portale Esterno, Applicazioni, Video &amp; Film Consigliati</h3>
          <p style="margin:0;font-size:0.86rem;max-width:85ch;color:var(--text);">
            Raccolta selezionata di <strong>${countPagine} siti istituzionali e scientifici</strong>, <strong>${countApp} applicazioni e calcolatori interattivi</strong>, <strong>${countVideo} portali video</strong> e <strong>${RECOMMENDED_FILMS.length} film e documentari</strong> (${freeFilmsCount} con link diretto alla visione gratuita online).
          </p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm" id="portal-go-labs">Laboratori SERR →</button>
          <button type="button" class="btn btn-sm" id="portal-go-tools">Lettore YouTube di classe</button>
        </div>
      </div>
    </div>

    <div class="serr-card" style="margin-bottom:12px;">
      <div style="display:grid;grid-template-columns:minmax(220px, 1.3fr) minmax(220px, 1fr);gap:10px;align-items:end;">
        <div>
          <label class="serr-label" for="portal-search-input">Cerca link, app, video o film per argomento</label>
          <input
            type="search"
            id="portal-search-input"
            class="serr-input"
            placeholder="Es: acqua, RAEE, imballaggi, RaiPlay, WALL-E, Junker..."
            value="${e(portalUi.searchText)}"
          />
        </div>
        <div>
          <span class="serr-label">Filtra per borgo / tema</span>
          <div class="serr-filter-row" style="margin-bottom:0;">
            ${(["Tutti", "Mezzovalle", "Villacolle", "Cefalana", "Dragano", "Campolieto"] as const)
              .map(
                (b) =>
                  `<button type="button" class="serr-chip ${portalUi.borgoFilter === b ? "active" : ""}" data-portal-borgo="${b}">${b}</button>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>

    <section aria-labelledby="portal-links-heading" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
        <div>
          <h3 id="portal-links-heading" style="margin:0;font-size:1.05rem;">1. Siti Web, Applicazioni &amp; Video Esterni (${filteredLinks.length})</h3>
          <div style="font-size:0.79rem;color:var(--text-muted);">Tutti i collegamenti si aprono in una nuova scheda sicura (richiedono connessione internet).</div>
        </div>
        <div class="serr-filter-row" style="margin-bottom:0;" role="group" aria-label="Filtra tipologia risorsa esterna">
          <button type="button" class="serr-pill ${portalUi.resourceFilter === "tutte" ? "active" : ""}" data-portal-cat="tutte">Tutte (${PORTAL_LINKS.length})</button>
          <button type="button" class="serr-pill ${portalUi.resourceFilter === "pagine" ? "active" : ""}" data-portal-cat="pagine">Pagine Web (${countPagine})</button>
          <button type="button" class="serr-pill ${portalUi.resourceFilter === "app" ? "active" : ""}" data-portal-cat="app">App &amp; Calcolatori (${countApp})</button>
          <button type="button" class="serr-pill ${portalUi.resourceFilter === "video" ? "active" : ""}" data-portal-cat="video">Video Esterni (${countVideo})</button>
        </div>
      </div>

      ${filteredLinks.length === 0
        ? `<div class="serr-feedback warn">Nessun sito o applicazione corrisponde ai filtri attuali. Prova a selezionare "Tutti" i borghi o a svuotare la ricerca.</div>`
        : `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:10px;">
            ${filteredLinks.map((item) => renderLinkCard(item, e)).join("")}
          </div>`}
    </section>

    <section aria-labelledby="portal-films-heading">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
        <div>
          <h3 id="portal-films-heading" style="margin:0;font-size:1.05rem;">2. Film &amp; Documentari Consigliati su Rifiuti, Cibo e Circolarità (${filteredFilms.length})</h3>
          <div style="font-size:0.79rem;color:var(--text-muted);">
            I titoli disponibili legalmente gratis online includono il <strong>pulsante con collegamento diretto</strong>; gli altri indicano piattaforme on demand o mediateca scolastica.
          </div>
        </div>
        <div class="serr-filter-row" style="margin-bottom:0;" role="group" aria-label="Filtra disponibilità film">
          <button type="button" class="serr-pill ${portalUi.filmFilter === "tutti" ? "active" : ""}" data-film-filter="tutti">Tutti (${RECOMMENDED_FILMS.length})</button>
          <button type="button" class="serr-pill ${portalUi.filmFilter === "gratis" ? "active" : ""}" data-film-filter="gratis">Solo Visione Gratuita (${freeFilmsCount})</button>
          <button type="button" class="serr-pill ${portalUi.filmFilter === "mediateca" ? "active" : ""}" data-film-filter="mediateca">Cinema &amp; Mediateca (${RECOMMENDED_FILMS.length - freeFilmsCount})</button>
        </div>
      </div>

      ${filteredFilms.length === 0
        ? `<div class="serr-feedback warn">Nessun film o documentario trovato con i filtri correnti.</div>`
        : `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:10px;">
            ${filteredFilms.map((film) => renderFilmCard(film, e)).join("")}
          </div>`}
    </section>
  `;

  const searchInput = container.querySelector<HTMLInputElement>("#portal-search-input");
  searchInput?.addEventListener("input", () => {
    const selStart = searchInput.selectionStart ?? searchInput.value.length;
    portalUi.searchText = searchInput.value;
    renderPortalView(container, ctx);
    const nextInput = container.querySelector<HTMLInputElement>("#portal-search-input");
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(selStart, selStart);
    }
  });

  container.querySelectorAll<HTMLButtonElement>("[data-portal-borgo]").forEach((btn) =>
    btn.addEventListener("click", () => {
      portalUi.borgoFilter = (btn.dataset.portalBorgo || "Tutti") as typeof portalUi.borgoFilter;
      renderPortalView(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-portal-cat]").forEach((btn) =>
    btn.addEventListener("click", () => {
      portalUi.resourceFilter = (btn.dataset.portalCat || "tutte") as typeof portalUi.resourceFilter;
      renderPortalView(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-film-filter]").forEach((btn) =>
    btn.addEventListener("click", () => {
      portalUi.filmFilter = (btn.dataset.filmFilter || "tutti") as typeof portalUi.filmFilter;
      renderPortalView(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-film-prompt]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.filmPrompt || "";
      portalUi.activePromptId = portalUi.activePromptId === id ? "" : id;
      renderPortalView(container, ctx);
    })
  );

  container.querySelector<HTMLButtonElement>("#portal-go-labs")?.addEventListener("click", () => {
    ctx.onOpenLab?.("overview");
  });
  container.querySelector<HTMLButtonElement>("#portal-go-tools")?.addEventListener("click", () => {
    ctx.onJumpSection?.("studenti");
  });
}
