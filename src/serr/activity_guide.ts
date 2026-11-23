import type { SerrTopicId } from "./data_intro_videos.ts";

export interface ActivityGuideConfig {
  title: string;
  steps: string[];
  deepDiveTitle?: string;
  deepDiveHtml: string;
  videoTopic?: SerrTopicId;
  videoLabel?: string;
  disciplines?: string[];
}

export function renderActivityGuide(
  cfg: ActivityGuideConfig,
  esc: (s: string) => string
): string {
  const topic = cfg.videoTopic || "mezzovalle";
  const videoBtnLabel = cfg.videoLabel || "Guarda Video Intro (3–5 min)";
  const deepTitle = cfg.deepDiveTitle || "Approfondimento didattico e scientifico (espandi per leggere)";
  const discHtml = cfg.disciplines?.length
    ? `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px;">
        ${cfg.disciplines.map((d) => `<span class="serr-badge-small">${esc(d)}</span>`).join("")}
       </div>`
    : "";

  return `
    <div class="serr-card" style="background:#f4faf6;border:1px solid #b7dfc5;margin-bottom:12px;padding:12px 14px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;">
        <div style="flex:1 1 280px;">
          ${discHtml}
          <div style="font-weight:800;font-size:0.94rem;color:#14532d;margin-bottom:4px;">Cosa devi fare · ${esc(cfg.title)}</div>
          <ol style="margin:0;padding-left:18px;font-size:0.84rem;line-height:1.45;color:#1e293b;">
            ${cfg.steps.map((s) => `<li>${esc(s)}</li>`).join("")}
          </ol>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;" class="no-print">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            onclick="window.openSerrModule && window.openSerrModule('video', '${esc(topic)}')"
          >
            ▶ ${esc(videoBtnLabel)}
          </button>
        </div>
      </div>

      <details class="ws-details" style="margin:8px 0 0;background:#ffffff;">
        <summary>${esc(deepTitle)}</summary>
        <div class="ws-details-body" style="font-size:0.84rem;line-height:1.5;color:#334155;">
          ${cfg.deepDiveHtml}
        </div>
      </details>
    </div>
  `;
}
