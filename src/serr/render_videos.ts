import {
  INTRO_VIDEOS,
  TOPIC_PROFILES,
  type AgeBandId,
  type IntroVideoItem,
  type OfflineVideoScene,
  type SerrTopicId
} from "./data_intro_videos.ts";

export interface VideoPageContext {
  esc: (s: string) => string;
  initialAgeBand?: AgeBandId;
  onSyncLevel?: (lvl: "primaria" | "secondaria" | "entrambi") => void;
  onJumpSection?: (sec: string) => void;
  onOpenLab?: (tab: string) => void;
}

const videoUi = {
  topicFilter: "tutte" as "tutte" | SerrTopicId,
  selectedComune: "" as "" | SerrTopicId,
  ageBand: "tutte" as AgeBandId,
  onlyAgeMatch: false,
  modeById: {} as Record<string, "embed" | "offline">,
  offlineSceneIdx: {} as Record<string, number>,
  speakingVideoId: ""
};

const mapVideoUi = {
  selectedBandByTown: {} as Record<string, "primaria" | "media" | "tutte">,
  selectedIdxByTown: {} as Record<string, number>,
  modeByTown: {} as Record<string, "embed" | "offline">,
  sceneIdxByTown: {} as Record<string, number>
};

function levelToAgeBand(lvl?: string): AgeBandId {
  if (lvl === "primaria") return "primaria";
  if (lvl === "secondaria") return "media";
  return "tutte";
}

function stopOfflineSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  videoUi.speakingVideoId = "";
}

function speakItalian(text: string, videoId: string, onDone?: () => void): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
  utter.rate = 0.96;
  videoUi.speakingVideoId = videoId;
  utter.onend = () => {
    if (videoUi.speakingVideoId === videoId) videoUi.speakingVideoId = "";
    onDone?.();
  };
  window.speechSynthesis.speak(utter);
}

function offlineIllustrationSvg(visualType: OfflineVideoScene["visualType"], color: string): string {
  if (visualType === "water") {
    return `<svg viewBox="0 0 180 110" width="150" height="92" aria-hidden="true">
      <rect x="4" y="4" width="172" height="102" rx="12" fill="#e6f4fc" stroke="${color}" stroke-width="2"/>
      <path d="M90 18 C72 44 66 58 66 70 a24 24 0 0 0 48 0 C114 58 108 44 90 18 Z" fill="#0284c7"/>
      <path d="M82 65 a9 9 0 0 0 12 10" stroke="#e0f2fe" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="42" cy="78" r="10" fill="#22c55e"/><circle cx="138" cy="78" r="10" fill="#f59e0b"/>
    </svg>`;
  }
  if (visualType === "supply") {
    return `<svg viewBox="0 0 180 110" width="150" height="92" aria-hidden="true">
      <rect x="4" y="4" width="172" height="102" rx="12" fill="#eaf7ef" stroke="${color}" stroke-width="2"/>
      <circle cx="48" cy="56" r="18" fill="#16a34a"/><rect x="82" y="42" width="40" height="24" rx="5" fill="#0284c7"/>
      <circle cx="92" cy="72" r="6" fill="#1e293b"/><circle cx="114" cy="72" r="6" fill="#1e293b"/>
      <path d="M132 54 H156" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/>
      <circle cx="144" cy="54" r="14" fill="none" stroke="#16a34a" stroke-width="3"/>
    </svg>`;
  }
  if (visualType === "repair") {
    return `<svg viewBox="0 0 180 110" width="150" height="92" aria-hidden="true">
      <rect x="4" y="4" width="172" height="102" rx="12" fill="#ecfdf5" stroke="${color}" stroke-width="2"/>
      <circle cx="90" cy="55" r="30" fill="none" stroke="#0f766e" stroke-width="6" stroke-dasharray="130 35"/>
      <path d="M76 68 L106 38" stroke="#0f766e" stroke-width="6" stroke-linecap="round"/>
      <circle cx="76" cy="68" r="7" fill="#14b8a6"/><circle cx="106" cy="38" r="7" fill="#14b8a6"/>
    </svg>`;
  }
  if (visualType === "forest") {
    return `<svg viewBox="0 0 180 110" width="150" height="92" aria-hidden="true">
      <rect x="4" y="4" width="172" height="102" rx="12" fill="#f3fae8" stroke="${color}" stroke-width="2"/>
      <polygon points="56,22 32,74 80,74" fill="#15803d"/>
      <polygon points="124,26 100,74 148,74" fill="#166534"/>
      <rect x="52" y="74" width="8" height="18" fill="#78350f"/>
      <rect x="120" y="74" width="8" height="18" fill="#78350f"/>
      <ellipse cx="90" cy="92" rx="68" ry="6" fill="#65a30d"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 180 110" width="150" height="92" aria-hidden="true">
    <rect x="4" y="4" width="172" height="102" rx="12" fill="#fff7ed" stroke="${color}" stroke-width="2"/>
    <rect x="58" y="24" width="64" height="44" rx="6" fill="#334155"/>
    <rect x="64" y="30" width="52" height="30" rx="3" fill="#38bdf8"/>
    <path d="M46 78 H134" stroke="#9a3412" stroke-width="4" stroke-linecap="round"/>
    <circle cx="90" cy="86" r="9" fill="#ea580c"/>
  </svg>`;
}

function renderVideoPlayerFrame(
  item: IntroVideoItem,
  mode: "embed" | "offline",
  sceneIdx: number,
  prefix: string,
  e: (s: string) => string
): string {
  const profile = TOPIC_PROFILES[item.topicId];
  const scenes = item.offlineScenes;
  const idx = Math.max(0, Math.min(sceneIdx, scenes.length - 1));
  const scene = scenes[idx];
  const isSpeaking = videoUi.speakingVideoId === `${prefix}-${item.id}`;

  if (mode === "embed") {
    const embedSrc = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}?rel=0&cc_load_policy=1&cc_lang_pref=it`;
    return `
      <div style="position:relative;width:100%;aspect-ratio:16/9;background:#0f172a;border-radius:10px;overflow:hidden;border:1px solid var(--border);">
        <iframe
          title="${e(item.title)}"
          src="${embedSrc}"
          loading="lazy"
          style="position:absolute;inset:0;width:100%;height:100%;border:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }

  return `
    <div style="width:100%;aspect-ratio:16/9;background:#f8fafc;border-radius:10px;border:1px solid #cbd5e1;padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;gap:6px;box-sizing:border-box;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:0.75rem;color:var(--text-muted);">
        <span><strong>Modalità Offline Animata</strong> · Scena ${idx + 1} / ${scenes.length}</span>
        <span>${e(item.tematica)}</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;flex:1 1 auto;min-height:0;">
        <div style="flex:0 0 auto;">${offlineIllustrationSvg(scene.visualType, profile.color)}</div>
        <div style="min-width:0;">
          <div style="font-weight:800;font-size:0.88rem;color:#0f172a;margin-bottom:4px;">${e(scene.sceneTitle)}</div>
          <p style="margin:0;font-size:0.82rem;line-height:1.4;color:#334155;">${e(scene.caption)}</p>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;border-top:1px solid #e2e8f0;padding-top:6px;">
        <div style="display:flex;gap:5px;">
          <button type="button" class="btn btn-sm" data-vid-scene-prev="${e(item.id)}" ${idx === 0 ? "disabled" : ""}>◀</button>
          <button type="button" class="btn btn-sm" data-vid-scene-next="${e(item.id)}" ${idx >= scenes.length - 1 ? "disabled" : ""}>▶</button>
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-vid-speak="${e(item.id)}">
          ${isSpeaking ? "Ferma voce ITA" : "Ascolta voce ITA"}
        </button>
      </div>
    </div>
  `;
}

export function setVideoAgeSuggestion(lvl: "primaria" | "secondaria" | "entrambi"): void {
  videoUi.ageBand = levelToAgeBand(lvl);
}

export function setVideoTopicFilter(topic?: string): void {
  const valid: SerrTopicId[] = ["mezzovalle", "villacolle", "cefalana", "dragano", "campolieto"];
  if (topic && valid.includes(topic as SerrTopicId)) {
    videoUi.topicFilter = topic as SerrTopicId;
    videoUi.selectedComune = topic as SerrTopicId;
  } else {
    videoUi.topicFilter = "tutte";
    videoUi.selectedComune = "";
  }
}

export function renderVideoEmbedPage(container: HTMLElement, ctx: VideoPageContext): void {
  const e = ctx.esc;
  if (ctx.initialAgeBand && videoUi.ageBand === "tutte") {
    videoUi.ageBand = ctx.initialAgeBand;
  }

  const effectiveTopic: "tutte" | SerrTopicId = videoUi.selectedComune || videoUi.topicFilter;

  const matchingVideos = INTRO_VIDEOS.filter((v) => {
    if (effectiveTopic !== "tutte" && v.topicId !== effectiveTopic) return false;
    if (videoUi.onlyAgeMatch && videoUi.ageBand !== "tutte" && v.ageBand !== videoUi.ageBand) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (videoUi.ageBand === "tutte") return 0;
    const aHit = a.ageBand === videoUi.ageBand ? 0 : 1;
    const bHit = b.ageBand === videoUi.ageBand ? 0 : 1;
    return aHit - bHit;
  });

  const activeComuneProfile = videoUi.selectedComune ? TOPIC_PROFILES[videoUi.selectedComune] : null;
  const ageLabelText =
    videoUi.ageBand === "primaria"
      ? "Suggerimenti prioritari per 6–10 anni (Scuola Primaria)"
      : videoUi.ageBand === "media"
      ? "Suggerimenti prioritari per 11–14 anni (Scuola Media)"
      : "Tutte le fasce d'età visibili (6–14 anni)";

  container.innerHTML = `
    <div class="serr-hero-box" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
        <div>
          <div class="serr-kicker">VIDEO BREVI INTRODUTTIVI (3–5 MINUTI) PER TEMATICA &amp; FASCIA D'ETÀ</div>
          <h3 style="margin:3px 0 5px;font-size:1.15rem;">Introduzione alle 5 Tematiche — Primaria e Scuola Media</h3>
          <p style="margin:0;font-size:0.86rem;max-width:86ch;">
            Brevi video pronti da riprodurre in classe per presentare ciascuna tematica prima delle slide e dei laboratori. Puoi passare in ogni momento dall'<strong>Embed YouTube</strong> alla <strong>Versione Animata Offline con voce italiana</strong>.
          </p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm" id="vid-go-map">Apri Mappa con Video accanto →</button>
          <button type="button" class="btn btn-sm" id="vid-go-portal">Portale &amp; Film lunghi</button>
        </div>
      </div>
    </div>

    <div class="serr-card" style="margin-bottom:12px;display:grid;gap:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
        <div>
          <div class="serr-label" style="margin-bottom:4px;">Suggerisci i contenuti per fascia d'età (${e(ageLabelText)})</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;" role="group" aria-label="Suggerisci per fascia d'età">
            <button type="button" class="serr-pill ${videoUi.ageBand === "tutte" ? "active" : ""}" data-vid-age="tutte">Tutte le età (6–14 anni)</button>
            <button type="button" class="serr-pill ${videoUi.ageBand === "primaria" ? "active" : ""}" data-vid-age="primaria">Consiglia 6–10 anni (Primaria)</button>
            <button type="button" class="serr-pill ${videoUi.ageBand === "media" ? "active" : ""}" data-vid-age="media">Consiglia 11–14 anni (Scuola Media)</button>
          </div>
        </div>
        <label style="display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:600;cursor:pointer;">
          <input type="checkbox" id="vid-only-age" ${videoUi.onlyAgeMatch ? "checked" : ""} ${videoUi.ageBand === "tutte" ? "disabled" : ""} />
          <span>Mostra solo la fascia scelta</span>
        </label>
      </div>

      <div style="display:grid;grid-template-columns:minmax(220px, 1.5fr) minmax(220px, 1fr);gap:10px;align-items:end;border-top:1px solid var(--border);padding-top:10px;">
        <div>
          <div class="serr-label" style="margin-bottom:4px;">Filtra per Tematica</div>
          <div class="serr-filter-row" style="margin-bottom:0;">
            <button type="button" class="serr-chip ${effectiveTopic === "tutte" ? "active" : ""}" data-vid-topic="tutte">Tutte le 5 tematiche</button>
            ${(Object.keys(TOPIC_PROFILES) as SerrTopicId[])
              .map((tid) => {
                const p = TOPIC_PROFILES[tid];
                return `<button type="button" class="serr-chip ${effectiveTopic === tid ? "active" : ""}" data-vid-topic="${tid}">${e(p.shortTematica)}</button>`;
              })
              .join("")}
          </div>
        </div>
        <div>
          <label class="serr-label" for="vid-comune-select">Oppure seleziona un Comune per vedere la sua tematica</label>
          <select id="vid-comune-select" class="serr-select" style="width:100%;">
            <option value="">Tutti i Comuni (filtra per tematica)</option>
            ${(Object.keys(TOPIC_PROFILES) as SerrTopicId[])
              .map((tid) => {
                const p = TOPIC_PROFILES[tid];
                return `<option value="${tid}" ${videoUi.selectedComune === tid ? "selected" : ""}>${e(p.comune)} → ${e(p.shortTematica)}</option>`;
              })
              .join("")}
          </select>
        </div>
      </div>

      ${activeComuneProfile ? `
        <div class="serr-feedback ok" style="margin-top:2px;">
          <strong>Comune selezionato: ${e(activeComuneProfile.comune)}</strong> ·
          Tematica associata: <strong>${e(activeComuneProfile.tematica)}</strong> — ${e(activeComuneProfile.summary)}
        </div>
      ` : ""}
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:12px;">
      ${matchingVideos
        .map((item) => {
          const mode = videoUi.modeById[item.id] || "embed";
          const sceneIdx = videoUi.offlineSceneIdx[item.id] || 0;
          const isSuggested = videoUi.ageBand !== "tutte" && item.ageBand === videoUi.ageBand;
          const borderHighlight = isSuggested ? "border:2px solid var(--accent);" : "";

          return `
            <article class="serr-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:8px;${borderHighlight}">
              <div>
                <div class="meta-line" style="margin-bottom:4px;">
                  <span>Tematica: ${e(item.tematica)}</span>
                  <span aria-hidden="true">·</span>
                  <span>${e(item.durationLabel)}</span>
                  <span aria-hidden="true">·</span>
                  <span>${e(item.languageNote)}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                  <span style="font-size:0.78rem;font-weight:700;color:${item.ageBand === "primaria" ? "#166534" : "#075985"};">
                    ${e(item.ageRangeLabel)}
                  </span>
                  ${isSuggested ? `<span style="font-size:0.74rem;font-weight:800;color:var(--accent);">★ Consigliato per la fascia scelta</span>` : ""}
                </div>
                <h4 style="margin:0 0 4px;font-size:1rem;">${e(item.title)}</h4>
                <div style="font-size:0.77rem;color:var(--text-muted);margin-bottom:8px;">Canale: ${e(item.channel)}</div>

                ${renderVideoPlayerFrame(item, mode, sceneIdx, "page", e)}

                <p style="margin:8px 0 6px;font-size:0.83rem;line-height:1.42;">${e(item.synopsis)}</p>
                <div style="font-size:0.79rem;background:#f4f8fb;border:1px solid #cce0ef;border-radius:8px;padding:6px 8px;color:#0f3d5e;">
                  <strong>Domanda introduttiva in classe:</strong> ${e(item.classQuestion)}
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;padding-top:6px;border-top:1px solid var(--border);">
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  <button type="button" class="btn btn-sm ${mode === "embed" ? "btn-primary" : ""}" data-vid-mode="embed" data-vid-id="${e(item.id)}">Video Embed</button>
                  <button type="button" class="btn btn-sm ${mode === "offline" ? "btn-primary" : ""}" data-vid-mode="offline" data-vid-id="${e(item.id)}">Offline Animato</button>
                </div>
                <a href="https://www.youtube.com/watch?v=${encodeURIComponent(item.youtubeId)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="text-decoration:none;">Apri su YouTube ↗</a>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-vid-age]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const band = (btn.dataset.vidAge || "tutte") as AgeBandId;
      videoUi.ageBand = band;
      if (band === "tutte") videoUi.onlyAgeMatch = false;
      ctx.onSyncLevel?.(band === "primaria" ? "primaria" : band === "media" ? "secondaria" : "entrambi");
      renderVideoEmbedPage(container, ctx);
    })
  );

  container.querySelector<HTMLInputElement>("#vid-only-age")?.addEventListener("change", (ev) => {
    videoUi.onlyAgeMatch = Boolean((ev.target as HTMLInputElement).checked);
    renderVideoEmbedPage(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>("[data-vid-topic]").forEach((btn) =>
    btn.addEventListener("click", () => {
      videoUi.selectedComune = "";
      videoUi.topicFilter = (btn.dataset.vidTopic || "tutte") as typeof videoUi.topicFilter;
      renderVideoEmbedPage(container, ctx);
    })
  );

  container.querySelector<HTMLSelectElement>("#vid-comune-select")?.addEventListener("change", (ev) => {
    const val = (ev.target as HTMLSelectElement).value as "" | SerrTopicId;
    videoUi.selectedComune = val;
    if (val) videoUi.topicFilter = val;
    renderVideoEmbedPage(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>("[data-vid-mode]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      const id = btn.dataset.vidId || "";
      const m = (btn.dataset.vidMode || "embed") as "embed" | "offline";
      videoUi.modeById[id] = m;
      renderVideoEmbedPage(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-vid-scene-prev]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      const id = btn.dataset.vidScenePrev || "";
      videoUi.offlineSceneIdx[id] = Math.max(0, (videoUi.offlineSceneIdx[id] || 0) - 1);
      renderVideoEmbedPage(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-vid-scene-next]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      const id = btn.dataset.vidSceneNext || "";
      const item = INTRO_VIDEOS.find((v) => v.id === id);
      const maxIdx = item ? item.offlineScenes.length - 1 : 2;
      videoUi.offlineSceneIdx[id] = Math.min(maxIdx, (videoUi.offlineSceneIdx[id] || 0) + 1);
      renderVideoEmbedPage(container, ctx);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-vid-speak]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.vidSpeak || "";
      const key = `page-${id}`;
      if (videoUi.speakingVideoId === key) {
        stopOfflineSpeech();
        renderVideoEmbedPage(container, ctx);
        return;
      }
      const item = INTRO_VIDEOS.find((v) => v.id === id);
      if (!item) return;
      const sIdx = videoUi.offlineSceneIdx[id] || 0;
      const sc = item.offlineScenes[sIdx];
      speakItalian(`${sc.sceneTitle}. ${sc.caption}`, key, () => renderVideoEmbedPage(container, ctx));
      renderVideoEmbedPage(container, ctx);
    })
  );

  container.querySelector<HTMLButtonElement>("#vid-go-map")?.addEventListener("click", () => {
    ctx.onJumpSection?.("tema");
  });
  container.querySelector<HTMLButtonElement>("#vid-go-portal")?.addEventListener("click", () => {
    ctx.onJumpSection?.("portale");
  });
}

export function renderSupportVideoWidget(
  container: HTMLElement,
  item: IntroVideoItem,
  mode: "embed" | "offline",
  sceneIdx: number,
  esc: (s: string) => string,
  onChangeMode: (nextMode: "embed" | "offline") => void,
  onChangeScene: (nextIdx: number) => void
): void {
  const e = esc;
  const key = `lab-${item.id}`;
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">${e(item.ageRangeLabel)} · ${e(item.durationLabel)} · ${e(item.channel)}</div>
          <div style="font-weight:800;font-size:0.95rem;">${e(item.title)}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm ${mode === "embed" ? "btn-primary" : ""}" data-sup-mode="embed">Embed YouTube</button>
          <button type="button" class="btn btn-sm ${mode === "offline" ? "btn-primary" : ""}" data-sup-mode="offline">Offline Animato</button>
        </div>
      </div>
      ${renderVideoPlayerFrame(item, mode, sceneIdx, "lab", e)}
      <p style="margin:0;font-size:0.83rem;color:var(--text-muted);line-height:1.4;">${e(item.synopsis)}</p>
      <div style="font-size:0.79rem;background:#eef6fc;border:1px solid #bfdcf0;border-radius:8px;padding:6px 8px;color:#0f3c5c;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <span><strong>Domanda guida:</strong> ${e(item.classQuestion)}</span>
        <a href="https://www.youtube.com/watch?v=${encodeURIComponent(item.youtubeId)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="text-decoration:none;">Apri su YouTube ↗</a>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-sup-mode]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      onChangeMode((btn.dataset.supMode || "embed") as "embed" | "offline");
    })
  );
  container.querySelector<HTMLButtonElement>(`[data-vid-scene-prev="${item.id}"]`)?.addEventListener("click", () => {
    stopOfflineSpeech();
    onChangeScene(Math.max(0, sceneIdx - 1));
  });
  container.querySelector<HTMLButtonElement>(`[data-vid-scene-next="${item.id}"]`)?.addEventListener("click", () => {
    stopOfflineSpeech();
    onChangeScene(Math.min(item.offlineScenes.length - 1, sceneIdx + 1));
  });
  container.querySelector<HTMLButtonElement>(`[data-vid-speak="${item.id}"]`)?.addEventListener("click", () => {
    if (videoUi.speakingVideoId === key) {
      stopOfflineSpeech();
      renderSupportVideoWidget(container, item, mode, sceneIdx, esc, onChangeMode, onChangeScene);
      return;
    }
    const sc = item.offlineScenes[Math.max(0, Math.min(sceneIdx, item.offlineScenes.length - 1))];
    speakItalian(`${sc.sceneTitle}. ${sc.caption}`, key, () =>
      renderSupportVideoWidget(container, item, mode, sceneIdx, esc, onChangeMode, onChangeScene)
    );
    renderSupportVideoWidget(container, item, mode, sceneIdx, esc, onChangeMode, onChangeScene);
  });
}

export function renderMapTownVideoBox(
  container: HTMLElement,
  topicId: SerrTopicId,
  preferredLevel: string,
  esc: (s: string) => string,
  onOpenAllVideos?: () => void
): void {
  const e = esc;
  const profile = TOPIC_PROFILES[topicId] || TOPIC_PROFILES.mezzovalle;
  const allTownVideos = INTRO_VIDEOS.filter((v) => v.topicId === topicId);
  const defaultBand: "primaria" | "media" | "tutte" = preferredLevel === "primaria" ? "primaria" : preferredLevel === "secondaria" ? "media" : "tutte";
  const activeBand = mapVideoUi.selectedBandByTown[topicId] || defaultBand;
  const bandVideos = activeBand === "tutte" ? allTownVideos : allTownVideos.filter((v) => v.ageBand === activeBand);
  const pool = bandVideos.length > 0 ? bandVideos : allTownVideos;
  const idx = Math.min(pool.length - 1, Math.max(0, mapVideoUi.selectedIdxByTown[topicId] || 0));
  const item = pool[idx];
  if (!item) return;

  const mode = mapVideoUi.modeByTown[topicId] || "embed";
  const sIdx = mapVideoUi.sceneIdxByTown[topicId] || 0;

  container.innerHTML = `
    <div class="card-soft" style="padding:10px 12px;display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <div>
          <div class="meta-line" style="margin-bottom:2px;font-size:0.75rem;">
            <span>Tematica: ${e(profile.tematica)}</span>
            <span aria-hidden="true">·</span>
            <span>${allTownVideos.length} video disponibili</span>
            <span aria-hidden="true">·</span>
            <span>${e(item.durationLabel)}</span>
          </div>
          <div style="font-weight:800;font-size:0.9rem;">${e(item.title)}</div>
        </div>
        <div class="segmented" role="group" aria-label="Scegli fascia d'età dei video introduttivi">
          <button type="button" class="seg-btn" style="min-height:28px;padding:3px 8px;font-size:0.75rem;" data-mapvid-band="tutte" aria-pressed="${activeBand === "tutte"}">Tutti (${allTownVideos.length})</button>
          <button type="button" class="seg-btn" style="min-height:28px;padding:3px 8px;font-size:0.75rem;" data-mapvid-band="primaria" aria-pressed="${activeBand === "primaria"}">Primaria</button>
          <button type="button" class="seg-btn" style="min-height:28px;padding:3px 8px;font-size:0.75rem;" data-mapvid-band="media" aria-pressed="${activeBand === "media"}">Media</button>
        </div>
      </div>

      ${pool.length > 1 ? `
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
          <span style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">Video del borgo (${idx + 1}/${pool.length}):</span>
          ${pool.map((pv, pIdx) => `<button type="button" class="serr-chip ${pIdx === idx ? "active" : ""}" style="min-height:26px;padding:2px 8px;font-size:0.74rem;" data-mapvid-pick="${pIdx}">Video ${pIdx + 1}: ${e(pv.channel)} (${pv.ageBand === "primaria" ? "Prim." : "Media"})</button>`).join("")}
        </div>
      ` : ""}

      ${renderVideoPlayerFrame(item, mode, sIdx, "map", e)}

      <p style="margin:0;font-size:0.81rem;color:var(--text-muted);line-height:1.38;">${e(item.synopsis)}</p>
      <div style="font-size:0.78rem;background:#eef6fc;border:1px solid #bfdcf0;border-radius:7px;padding:5px 8px;color:#0f3c5c;">
        <strong>In classe:</strong> ${e(item.classQuestion)}
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;" class="no-print">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm ${mode === "embed" ? "btn-primary" : ""}" data-mapvid-mode="embed">Embed YouTube</button>
          <button type="button" class="btn btn-sm ${mode === "offline" ? "btn-primary" : ""}" data-mapvid-mode="offline">Offline Animato</button>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <a href="https://www.youtube.com/watch?v=${encodeURIComponent(item.youtubeId)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="text-decoration:none;">YouTube ↗</a>
          <button type="button" class="btn btn-sm" id="btn-mapvid-all">Tutti i Video Intro →</button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-mapvid-band]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      mapVideoUi.selectedBandByTown[topicId] = (btn.dataset.mapvidBand || "tutte") as "primaria" | "media" | "tutte";
      mapVideoUi.selectedIdxByTown[topicId] = 0;
      mapVideoUi.sceneIdxByTown[topicId] = 0;
      renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-mapvid-pick]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      mapVideoUi.selectedIdxByTown[topicId] = Number(btn.dataset.mapvidPick) || 0;
      mapVideoUi.sceneIdxByTown[topicId] = 0;
      renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
    })
  );

  container.querySelectorAll<HTMLButtonElement>("[data-mapvid-mode]").forEach((btn) =>
    btn.addEventListener("click", () => {
      stopOfflineSpeech();
      mapVideoUi.modeByTown[topicId] = (btn.dataset.mapvidMode || "embed") as "embed" | "offline";
      renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
    })
  );

  container.querySelector<HTMLButtonElement>(`[data-vid-scene-prev="${item.id}"]`)?.addEventListener("click", () => {
    stopOfflineSpeech();
    mapVideoUi.sceneIdxByTown[topicId] = Math.max(0, (mapVideoUi.sceneIdxByTown[topicId] || 0) - 1);
    renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
  });

  container.querySelector<HTMLButtonElement>(`[data-vid-scene-next="${item.id}"]`)?.addEventListener("click", () => {
    stopOfflineSpeech();
    mapVideoUi.sceneIdxByTown[topicId] = Math.min(item.offlineScenes.length - 1, (mapVideoUi.sceneIdxByTown[topicId] || 0) + 1);
    renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
  });

  container.querySelector<HTMLButtonElement>(`[data-vid-speak="${item.id}"]`)?.addEventListener("click", () => {
    const key = `map-${item.id}`;
    if (videoUi.speakingVideoId === key) {
      stopOfflineSpeech();
      renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
      return;
    }
    const sc = item.offlineScenes[mapVideoUi.sceneIdxByTown[topicId] || 0];
    speakItalian(`${sc.sceneTitle}. ${sc.caption}`, key, () =>
      renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos)
    );
    renderMapTownVideoBox(container, topicId, preferredLevel, esc, onOpenAllVideos);
  });

  container.querySelector<HTMLButtonElement>("#btn-mapvid-all")?.addEventListener("click", () => {
    onOpenAllVideos?.();
  });
}
