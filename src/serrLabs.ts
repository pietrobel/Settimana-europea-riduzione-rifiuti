import {
  loadLabState,
  saveLabState,
  type SerrLabPersistedState
} from "./serr/persistence.ts";
import {
  renderMezzovalleView,
  setMezzovalleSubTab
} from "./serr/render_mezzovalle.ts";
import {
  renderVillacolleView,
  setVillacolleSubTab
} from "./serr/render_villacolle.ts";
import {
  renderActivity6,
  renderActivity7,
  renderActivity8,
  renderDiaryHub,
  renderLabOverview,
  renderMissionsHub,
  renderMonitoringAndSources,
  renderStudyHub,
  renderWorksheetsHub,
  type CommonHubContext
} from "./serr/render_common_and_hub.ts";
import {
  renderPortalView,
  setPortalAgeSuggestion
} from "./serr/render_portal.ts";
import {
  renderMapTownVideoBox,
  renderVideoEmbedPage,
  setVideoAgeSuggestion
} from "./serr/render_videos.ts";
import type { SerrTopicId } from "./serr/data_intro_videos.ts";

declare global {
  interface Window {
    __SERR_BRIDGE?: {
      setActiveSection?: (id: string) => void;
      addXp?: (pts: number, badgeId?: string | null, tag?: string) => void;
      escHtml?: (str: string) => string;
      setLevel?: (lvl: "primaria" | "secondaria" | "entrambi") => void;
      getLevel?: () => string;
      refreshMapVideo?: () => void;
      openGame?: (num: number) => void;
    };
    __SERR_VIDEOS?: {
      renderMapVideo: (container: HTMLElement, topicId: string, preferredLevel: string) => void;
      syncAgeBand: (lvl: "primaria" | "secondaria" | "entrambi") => void;
    };
    openSerrModule?: (tab: string, subTab?: string) => void;
  }
}

type MainLabTab =
  | "overview"
  | "mezzovalle"
  | "villacolle"
  | "att6"
  | "att7"
  | "att8"
  | "studio"
  | "schede"
  | "diario"
  | "missioni"
  | "monitoraggio";

let activeTab: MainLabTab = "overview";
let labState: SerrLabPersistedState;
let storageBackendLabel = "IndexedDB locale (offline)";

function fallbackEsc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getEsc(): (s: string) => string {
  return window.__SERR_BRIDGE?.escHtml || fallbackEsc;
}

async function persistNow(): Promise<void> {
  if (!labState) return;
  storageBackendLabel = await saveLabState(labState);
}

function markActivityDone(id: string, xp = 10): void {
  if (!labState.completedActivities.includes(id)) {
    labState.completedActivities.push(id);
    window.__SERR_BRIDGE?.addXp?.(xp, null, "serr_lab_" + id);
    void persistNow();
  }
}

function recordGameScore(gameId: string, score: number, total: number): void {
  const prev = labState.gameScores[gameId];
  const best = prev ? Math.max(prev.score, score) : score;
  labState.gameScores[gameId] = {
    score: best,
    total,
    attempts: (prev?.attempts || 0) + 1,
    lastDate: new Date().toLocaleDateString("it-IT")
  };
  window.__SERR_BRIDGE?.addXp?.(15, null, "serr_game_" + gameId);
  void persistNow();
}

function renderRoot(): void {
  const mount = document.getElementById("serr-lab-root");
  if (!mount || !labState) return;

  const navItems: Array<{ id: MainLabTab; label: string }> = [
    { id: "overview", label: "Hub SERR" },
    { id: "mezzovalle", label: "Tematica A · Acqua & Cibo (Mezzovalle)" },
    { id: "villacolle", label: "Tematica B · Km Zero & Imballi (Villacolle)" },
    { id: "att6", label: "6 · Supermercato" },
    { id: "att7", label: "7 · Sfida & Decalogo" },
    { id: "att8", label: "8 · Scuola & Manifesto" },
    { id: "studio", label: "Studia Prima (14)" },
    { id: "schede", label: "Schede A4 (13)" },
    { id: "diario", label: `Diario (${labState.diaryEntries.length})` },
    { id: "missioni", label: "Missioni & Attestati" },
    { id: "monitoraggio", label: "Risultati & Fonti" }
  ];

  mount.innerHTML = `
    <div class="serr-top-tabs" role="tablist" aria-label="Moduli SERR Mezzovalle e Villacolle">
      ${navItems
        .map(
          (n) => `<button type="button" class="serr-tab-btn ${activeTab === n.id ? "active" : ""}" data-serr-nav="${n.id}">${n.label}</button>`
        )
        .join("")}
    </div>
    <div id="serr-tab-body" class="serr-tab-body"></div>
  `;

  mount.querySelectorAll<HTMLButtonElement>("[data-serr-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTab = (btn.dataset.serrNav || "overview") as MainLabTab;
      renderRoot();
    });
  });

  const body = mount.querySelector<HTMLElement>("#serr-tab-body");
  if (!body) return;

  const esc = getEsc();
  const saveAndRefresh = () => {
    void persistNow();
    renderRoot();
  };

  const commonCtx: CommonHubContext = {
    state: labState,
    storageBackend: storageBackendLabel,
    saveAndRefresh,
    markActivityDone,
    navigateTo: (tab: string) => {
      activeTab = tab as MainLabTab;
      renderRoot();
    },
    openMezzSub: (sub) => {
      setMezzovalleSubTab(sub);
      activeTab = "mezzovalle";
      renderRoot();
    },
    openVillaSub: (sub) => {
      setVillacolleSubTab(sub);
      activeTab = "villacolle";
      renderRoot();
    },
    esc
  };

  if (activeTab === "overview") renderLabOverview(body, commonCtx);
  else if (activeTab === "mezzovalle") {
    renderMezzovalleView(body, {
      state: labState,
      saveAndRefresh,
      markActivityDone,
      recordGameScore,
      navigateTo: commonCtx.navigateTo,
      esc
    });
  } else if (activeTab === "villacolle") {
    renderVillacolleView(body, {
      state: labState,
      saveAndRefresh,
      markActivityDone,
      recordGameScore,
      navigateTo: commonCtx.navigateTo,
      esc
    });
  } else if (activeTab === "att6") renderActivity6(body, commonCtx);
  else if (activeTab === "att7") renderActivity7(body, commonCtx);
  else if (activeTab === "att8") renderActivity8(body, commonCtx);
  else if (activeTab === "studio") renderStudyHub(body, commonCtx);
  else if (activeTab === "schede") renderWorksheetsHub(body, commonCtx);
  else if (activeTab === "diario") renderDiaryHub(body, commonCtx);
  else if (activeTab === "missioni") renderMissionsHub(body, commonCtx);
  else renderMonitoringAndSources(body, commonCtx);
}

async function bootSerrLabs(): Promise<void> {
  const loaded = await loadLabState();
  labState = loaded.state;
  storageBackendLabel = loaded.backend;

  const refreshExternalViews = () => {
    const initialLvl = window.__SERR_BRIDGE?.getLevel?.();
    const ageBand = initialLvl === "primaria" ? "primaria" : initialLvl === "secondaria" ? "media" : "tutte";
    const syncLevelCb = (lvl: "primaria" | "secondaria" | "entrambi") => {
      setPortalAgeSuggestion(lvl);
      setVideoAgeSuggestion(lvl);
      window.__SERR_BRIDGE?.setLevel?.(lvl);
    };

    const portaleMount = document.getElementById("portale-root");
    if (portaleMount) {
      renderPortalView(portaleMount, {
        esc: getEsc(),
        initialAgeBand: ageBand,
        onSyncLevel: syncLevelCb,
        onJumpSection: (sec: string) => window.__SERR_BRIDGE?.setActiveSection?.(sec),
        onOpenLab: (tab: string) => window.openSerrModule?.(tab)
      });
    }

    const videoMount = document.getElementById("video-intro-root");
    if (videoMount) {
      renderVideoEmbedPage(videoMount, {
        esc: getEsc(),
        initialAgeBand: ageBand,
        onSyncLevel: syncLevelCb,
        onJumpSection: (sec: string) => window.__SERR_BRIDGE?.setActiveSection?.(sec),
        onOpenLab: (tab: string) => window.openSerrModule?.(tab)
      });
    }
  };

  window.openSerrModule = (tab: string, subTab?: string) => {
    if (tab === "portale") {
      window.__SERR_BRIDGE?.setActiveSection?.("portale");
      return;
    }
    if (tab === "video") {
      window.__SERR_BRIDGE?.setActiveSection?.("video");
      return;
    }
    if (tab === "mezzovalle" && subTab) {
      setMezzovalleSubTab(subTab as "home");
    } else if (tab === "villacolle" && subTab) {
      setVillacolleSubTab(subTab as "home");
    }
    activeTab = (tab || "overview") as MainLabTab;
    window.__SERR_BRIDGE?.setActiveSection?.("serr-lab");
    renderRoot();
  };

  window.__SERR_VIDEOS = {
    renderMapVideo: (container: HTMLElement, topicId: string, preferredLevel: string) => {
      const validIds: SerrTopicId[] = ["mezzovalle", "villacolle", "cefalana", "dragano", "campolieto"];
      const safeId: SerrTopicId = validIds.includes(topicId as SerrTopicId)
        ? (topicId as SerrTopicId)
        : "mezzovalle";
      renderMapTownVideoBox(container, safeId, preferredLevel, getEsc(), () => {
        window.__SERR_BRIDGE?.setActiveSection?.("video");
      });
    },
    syncAgeBand: (lvl: "primaria" | "secondaria" | "entrambi") => {
      setPortalAgeSuggestion(lvl);
      setVideoAgeSuggestion(lvl);
      refreshExternalViews();
    }
  };

  renderRoot();
  refreshExternalViews();
  window.__SERR_BRIDGE?.refreshMapVideo?.();
  (window as unknown as { __SERR_MODULE_LOADED?: boolean }).__SERR_MODULE_LOADED = true;
}

function startBootSafe(): void {
  bootSerrLabs().catch((err) => {
    const win = window as unknown as {
      __SERR_REPORT_ERROR?: (source: string, err: unknown) => void;
    };
    if (typeof win.__SERR_REPORT_ERROR === "function") {
      win.__SERR_REPORT_ERROR("Caricamento moduli SERR (Percorsi / Video / Portale)", err);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startBootSafe);
} else {
  startBootSafe();
}
