import type { SchoolAuditIssue } from "./persistence.ts";

export function getFoodSvg(foodId: string, size = 56): string {
  const s = size;
  const wrap = (inner: string, bg = "#f0f7ef") =>
    `<svg width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true" style="display:block;flex-shrink:0;"><rect x="2" y="2" width="60" height="60" rx="14" fill="${bg}" stroke="#d5e2d5" stroke-width="1.5"/>${inner}</svg>`;

  switch (foodId) {
    case "pomodoro":
      return wrap(
        `<path d="M32 14c2-4 6-5 9-4-2 3-4 4-6 5 3-1 7 0 9 3-4 1-7 1-9-1-1 3-3 5-5 5 1-3 1-5-1-6-2 2-6 2-9 0 3-3 6-3 9-2-2-2-1-4 3 0z" fill="#2f7d4d"/><circle cx="32" cy="36" r="16" fill="#d93829"/><ellipse cx="26" cy="30" rx="4" ry="6" transform="rotate(-20 26 30)" fill="#f27d72" opacity="0.55"/>`,
        "#fff2f0"
      );
    case "patata":
      return wrap(
        `<path d="M16 37c-2-9 6-18 18-19 11-1 17 6 16 15-1 10-11 16-22 15-7-1-11-5-12-11z" fill="#c99e63" stroke="#99723c" stroke-width="1.5"/><circle cx="26" cy="30" r="1.6" fill="#7a5728"/><circle cx="39" cy="27" r="1.4" fill="#7a5728"/><circle cx="35" cy="40" r="1.6" fill="#7a5728"/>`,
        "#fbf6eb"
      );
    case "arancia":
      return wrap(
        `<circle cx="32" cy="35" r="16" fill="#ef7d1a"/><path d="M32 19c4-6 10-7 13-4-3 5-8 6-13 4z" fill="#2d8649"/><circle cx="26" cy="29" r="3" fill="#ffad5c" opacity="0.55"/><circle cx="37" cy="40" r="1" fill="#c25806"/><circle cx="40" cy="33" r="1" fill="#c25806"/><circle cx="31" cy="43" r="1" fill="#c25806"/>`,
        "#fff5ea"
      );
    case "mela":
      return wrap(
        `<path d="M32 22c-6-4-15 1-15 12 0 11 7 18 13 18 2 0 2-1 2-1s0 1 2 1c6 0 13-7 13-18 0-11-9-16-15-12z" fill="#d42f39"/><path d="M32 21c0-5 2-8 4-9" stroke="#5b3a1d" stroke-width="2.4" stroke-linecap="round"/><path d="M33 17c5-4 10-3 11 1-4 3-9 2-11-1z" fill="#3a8f50"/><ellipse cx="24" cy="31" rx="2.5" ry="5" transform="rotate(-15 24 31)" fill="#ff8f96" opacity="0.55"/>`,
        "#fef1f2"
      );
    case "latte":
      return wrap(
        `<path d="M23 18h18l3 7v25a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V25l3-7z" fill="#ffffff" stroke="#3a75a8" stroke-width="2"/><path d="M20 26h24v8H20z" fill="#4f93cc"/><circle cx="32" cy="41" r="4" fill="#d9ecf9" stroke="#4f93cc" stroke-width="1.2"/><path d="M24 14h16v4H24z" fill="#2f6696"/>`,
        "#eef6fd"
      );
    case "pane":
      return wrap(
        `<path d="M14 40c0-10 8-18 18-18s18 8 18 18c0 5-4 8-10 8H24c-6 0-10-3-10-8z" fill="#d89645" stroke="#9b6321" stroke-width="1.5"/><path d="M23 26l4 7M31 24l4 8M39 27l3 6" stroke="#f6d298" stroke-width="2.4" stroke-linecap="round"/>`,
        "#fdf6ea"
      );
    case "pasta":
      return wrap(
        `<path d="M15 36h34c0 9-7 15-17 15s-17-6-17-15z" fill="#e86a42"/><path d="M18 35c3-9 10-12 14-12s11 3 14 12" fill="#f3c14b" stroke="#c9931c" stroke-width="1.5"/><path d="M22 33c4-5 15-5 20 0M25 28c4-3 10-3 14 0" stroke="#c9931c" stroke-width="1.6" fill="none"/><circle cx="32" cy="27" r="3" fill="#d63d2c"/>`,
        "#fff6e8"
      );
    case "riso":
      return wrap(
        `<path d="M14 35h36c-1 9-8 15-18 15s-17-6-18-15z" fill="#2f6f6d"/><path d="M17 35c1-8 7-13 15-13s14 5 15 13z" fill="#ffffff" stroke="#cbd5d4" stroke-width="1.3"/><ellipse cx="26" cy="30" rx="2" ry="1" fill="#d6dfd9"/><ellipse cx="34" cy="28" rx="2" ry="1" fill="#d6dfd9"/><ellipse cx="38" cy="32" rx="2" ry="1" fill="#d6dfd9"/>`,
        "#eef7f6"
      );
    case "uovo":
      return wrap(
        `<path d="M32 14c8 0 14 14 14 23 0 9-6 14-14 14s-14-5-14-14c0-9 6-23 14-23z" fill="#f3d2b0" stroke="#b98758" stroke-width="1.6"/><ellipse cx="27" cy="28" rx="2.5" ry="5" transform="rotate(-14 27 28)" fill="#fff8ef" opacity="0.7"/>`,
        "#fcf5ec"
      );
    case "formaggio":
      return wrap(
        `<path d="M14 42l22-22 14 12v14H14v-4z" fill="#f5c542" stroke="#bd8b13" stroke-width="1.6"/><path d="M14 42l36-10v14H14v-4z" fill="#e6ae25"/><circle cx="28" cy="39" r="3.2" fill="#bd8b13" opacity="0.55"/><circle cx="40" cy="40" r="2.4" fill="#bd8b13" opacity="0.55"/><circle cx="36" cy="31" r="2.2" fill="#bd8b13" opacity="0.55"/>`,
        "#fff9e6"
      );
    case "pollo":
      return wrap(
        `<path d="M22 25c6-7 17-7 22 0 4 6 1 15-7 17l-7 1-7-7c-3-4-4-8-1-11z" fill="#d47b39" stroke="#8f4a19" stroke-width="1.5"/><path d="M22 39l-7 7" stroke="#f3e6d3" stroke-width="5" stroke-linecap="round"/><circle cx="14" cy="48" r="2.5" fill="#f3e6d3" stroke="#b9a58c"/><circle cx="17" cy="49" r="2.5" fill="#f3e6d3" stroke="#b9a58c"/>`,
        "#fdf2ea"
      );
    case "maiale":
      return wrap(
        `<path d="M16 33c0-8 8-14 17-14 9 0 16 5 16 12 0 8-8 15-18 15-8 0-15-5-15-13z" fill="#df7b82" stroke="#a6434b" stroke-width="1.5"/><circle cx="29" cy="32" r="4.5" fill="#fff3f3" stroke="#a6434b" stroke-width="1.2"/><path d="M22 25c5-2 12-2 17 0" stroke="#f7bdc1" stroke-width="2" fill="none"/>`,
        "#fdf0f1"
      );
    case "manzo":
      return wrap(
        `<path d="M14 35c0-10 9-16 20-16 10 0 16 6 16 14 0 9-9 15-20 15-9 0-16-5-16-13z" fill="#9c2c2c" stroke="#611717" stroke-width="1.6"/><path d="M21 30c6-4 14-3 18 2M24 38c6 3 12 1 16-3" stroke="#f2d6d0" stroke-width="2.2" stroke-linecap="round" fill="none"/>`,
        "#f9ecec"
      );
    case "cioccolato":
      return wrap(
        `<rect x="18" y="14" width="28" height="36" rx="4" fill="#59321b" stroke="#361c0d" stroke-width="1.6"/><path d="M27 14v36M37 14v36M18 26h28M18 38h28" stroke="#7d4a2b" stroke-width="1.4"/><path d="M16 34l32-5v16a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3V34z" fill="#c7392b"/>`,
        "#f5eee9"
      );
    case "mandorle":
      return wrap(
        `<path d="M28 16c9 4 13 18 8 28-4 8-12 7-16 0-5-10-1-24 8-28z" fill="#b77b43" stroke="#784b21" stroke-width="1.4"/><path d="M40 22c7 4 9 15 5 22-3 6-9 5-12 0-3-7 0-18 7-22z" fill="#cc8d52" stroke="#784b21" stroke-width="1.4"/>`,
        "#f9f1e7"
      );
    default:
      return wrap(`<circle cx="32" cy="32" r="14" fill="#2d8659"/>`);
  }
}

export function renderStudyInfographicSvg(type: string): string {
  switch (type) {
    case "eco_footprint_slices":
    case "food_water_ladder":
      return `<svg viewBox="0 0 560 200" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#f4fafc;border:1px solid #d4e8ef;" role="img" aria-label="Schema acqua visibile contro acqua virtuale">
        <rect x="20" y="28" width="160" height="144" rx="12" fill="#e0f2fa" stroke="#75b6d4"/>
        <text x="100" y="54" text-anchor="middle" font-size="13" font-weight="700" fill="#174f6b">ACQUA VISIBILE</text>
        <circle cx="100" cy="96" r="26" fill="#3a98c9"/>
        <text x="100" y="101" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">2 L/giorno</text>
        <text x="100" y="148" text-anchor="middle" font-size="11" fill="#2b5f7a">Bere, lavarsi, cucinare</text>
        <text x="210" y="105" text-anchor="middle" font-size="22" font-weight="800" fill="#174f6b">≪</text>
        <rect x="240" y="20" width="300" height="160" rx="12" fill="#e8f6ee" stroke="#7bc29b"/>
        <text x="390" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="#195236">ACQUA VIRTUALE (NASCOSTA)</text>
        <rect x="260" y="64" width="260" height="24" rx="6" fill="#2d8659"/>
        <text x="390" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Acqua Verde (pioggia nei campi)</text>
        <rect x="260" y="96" width="260" height="24" rx="6" fill="#2f7cb8"/>
        <text x="390" y="112" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Acqua Blu (fiumi, falde, irrigazione)</text>
        <rect x="260" y="128" width="260" height="24" rx="6" fill="#6f7d87"/>
        <text x="390" y="144" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Acqua Grigia (diluizione inquinanti)</text>
      </svg>`;
    case "wf_three_colors":
      return `<svg viewBox="0 0 560 185" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#fafcfb;border:1px solid #dce5e1;" role="img" aria-label="Tre colori dell'impronta idrica">
        <rect x="18" y="20" width="166" height="145" rx="12" fill="#e9f6ee" stroke="#7bc29b"/>
        <text x="101" y="46" text-anchor="middle" font-size="14" font-weight="800" fill="#1a5e3b">VERDE</text>
        <text x="101" y="74" text-anchor="middle" font-size="11" fill="#254d38">Acqua piovana nel suolo</text>
        <text x="101" y="94" text-anchor="middle" font-size="11" fill="#254d38">Evapotraspirata dalle</text>
        <text x="101" y="110" text-anchor="middle" font-size="11" fill="#254d38">colture senza pompe</text>
        <rect x="197" y="20" width="166" height="145" rx="12" fill="#e7f3fc" stroke="#6aa9dc"/>
        <text x="280" y="46" text-anchor="middle" font-size="14" font-weight="800" fill="#1a4e7c">BLU</text>
        <text x="280" y="74" text-anchor="middle" font-size="11" fill="#214666">Acqua prelevata da</text>
        <text x="280" y="94" text-anchor="middle" font-size="11" fill="#214666">fiumi, laghi e falde</text>
        <text x="280" y="110" text-anchor="middle" font-size="11" fill="#214666">per irrigazione/impianti</text>
        <rect x="376" y="20" width="166" height="145" rx="12" fill="#eff2f5" stroke="#8b99a6"/>
        <text x="459" y="46" text-anchor="middle" font-size="14" font-weight="800" fill="#3b4854">GRIGIA</text>
        <text x="459" y="74" text-anchor="middle" font-size="11" fill="#465361">Volume teorico per</text>
        <text x="459" y="94" text-anchor="middle" font-size="11" fill="#465361">diluire fertilizzanti</text>
        <text x="459" y="110" text-anchor="middle" font-size="11" fill="#465361">e scarichi agricoli</text>
      </svg>`;
    case "carbon_vs_water":
    case "sustainable_plate_balance":
      return `<svg viewBox="0 0 560 190" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#fcfaf6;border:1px solid #e7dfd1;" role="img" aria-label="Confronto acqua vs CO2e">
        <text x="280" y="28" text-anchor="middle" font-size="13" font-weight="800" fill="#2f3b35">Attenzione: Acqua (L/kg) e Carbonio (kg CO₂e/kg) NON sono sinonimi!</text>
        <rect x="24" y="46" width="246" height="122" rx="10" fill="#fff" stroke="#d8cfc0"/>
        <text x="147" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#704a1e">Mandorle (1 kg)</text>
        <rect x="44" y="82" width="206" height="18" rx="4" fill="#2f7cb8"/><text x="147" y="95" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Acqua molto alta: ~16.095 L/kg</text>
        <rect x="44" y="110" width="52" height="18" rx="4" fill="#d47228"/><text x="104" y="123" font-size="10" font-weight="700" fill="#6b3b12">CO₂e bassa: ~2,3 kg</text>
        <text x="147" y="150" text-anchor="middle" font-size="10" fill="#59625d">Alberi fissano carbonio ma richiedono acqua</text>
        <rect x="290" y="46" width="246" height="122" rx="10" fill="#fff" stroke="#d8cfc0"/>
        <text x="413" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#7c2f23">Formaggio stagionato (1 kg)</text>
        <rect x="310" y="82" width="82" height="18" rx="4" fill="#2f7cb8"/><text x="398" y="95" font-size="10" font-weight="700" fill="#1d4d73">Acqua: ~3.178 L</text>
        <rect x="310" y="110" width="206" height="18" rx="4" fill="#b8342a"/><text x="413" y="123" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CO₂e molto alta: ~21,2 kg</text>
        <text x="413" y="150" text-anchor="middle" font-size="10" fill="#59625d">Metano enterico + ~10 L di latte per kg</text>
      </svg>`;
    case "waste_fifo_labels":
      return `<svg viewBox="0 0 560 175" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#fafbfd;border:1px solid #dce2e8;" role="img" aria-label="Differenza tra Scadenza e TMC">
        <rect x="20" y="22" width="248" height="132" rx="12" fill="#fff1f0" stroke="#e4a49d"/>
        <text x="144" y="46" text-anchor="middle" font-size="13" font-weight="800" fill="#9c2922">DA CONSUMARSI ENTRO</text>
        <text x="144" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#4f201c">Data di Sicurezza (Cibi freschi)</text>
        <text x="144" y="92" text-anchor="middle" font-size="11" fill="#4f201c">Latte fresco, carne, pesce, yogurt:</text>
        <text x="144" y="112" text-anchor="middle" font-size="11" fill="#4f201c">NON consumare dopo la data.</text>
        <text x="144" y="135" text-anchor="middle" font-size="10" font-weight="700" fill="#9c2922">Rimedio: usa o congela prima!</text>
        <rect x="292" y="22" width="248" height="132" rx="12" fill="#eef8f1" stroke="#84c99c"/>
        <text x="416" y="46" text-anchor="middle" font-size="13" font-weight="800" fill="#1b633c">PREFERIBILMENTE ENTRO</text>
        <text x="416" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#1f4731">TMC - Qualità (Cibi secchi)</text>
        <text x="416" y="92" text-anchor="middle" font-size="11" fill="#1f4731">Pasta, riso, legumi, biscotti, olio:</text>
        <text x="416" y="112" text-anchor="middle" font-size="11" fill="#1f4731">Se integri, controlla vista e odore.</text>
        <text x="416" y="135" text-anchor="middle" font-size="10" font-weight="700" fill="#1b633c">Rimedio: non buttare alla cieca!</text>
      </svg>`;
    case "short_vs_long_chain":
    case "km_zero_radius":
    case "seasonal_wheel":
      return `<svg viewBox="0 0 560 185" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#fafbf8;border:1px solid #d9e0d3;" role="img" aria-label="Confronto critico locale vs serra riscaldata">
        <text x="280" y="28" text-anchor="middle" font-size="13" font-weight="800" fill="#23372b">Non basta leggere 'km zero': servono 4 domande critiche!</text>
        <rect x="22" y="44" width="166" height="118" rx="10" fill="#e9f7ee" stroke="#6cbf8a"/>
        <text x="105" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#1a5c38">Locale + Stagione</text>
        <text x="105" y="92" text-anchor="middle" font-size="11" fill="#284c38">Sole naturale</text>
        <text x="105" y="110" text-anchor="middle" font-size="11" fill="#284c38">Pochi chilometri</text>
        <text x="105" y="128" text-anchor="middle" font-size="11" fill="#284c38">Cassette a rendere</text>
        <text x="105" y="149" text-anchor="middle" font-size="11" font-weight="800" fill="#1a5c38">Impatto MOLTO BASSO</text>
        <rect x="198" y="44" width="166" height="118" rx="10" fill="#fff4e5" stroke="#e2a858"/>
        <text x="281" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#824c0e">Locale + Serra Invernale</text>
        <text x="281" y="92" text-anchor="middle" font-size="11" fill="#5e3e17">Bruciatori a gasolio/gas</text>
        <text x="281" y="110" text-anchor="middle" font-size="11" fill="#5e3e17">Teli plastici</text>
        <text x="281" y="128" text-anchor="middle" font-size="11" fill="#5e3e17">Bassi km MA alta energia</text>
        <text x="281" y="149" text-anchor="middle" font-size="11" font-weight="800" fill="#9c480a">Attenzione al paradosso!</text>
        <rect x="374" y="44" width="166" height="118" rx="10" fill="#fdeceb" stroke="#df8a84"/>
        <text x="457" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#8c251d">Aereo + Extra-UE</text>
        <text x="457" y="92" text-anchor="middle" font-size="11" fill="#5b241f">Trasporto aereo veloce</text>
        <text x="457" y="110" text-anchor="middle" font-size="11" fill="#5b241f">Celle frigo continue</text>
        <text x="457" y="128" text-anchor="middle" font-size="11" fill="#5b241f">Vaschetta PET sigillata</text>
        <text x="457" y="149" text-anchor="middle" font-size="11" font-weight="800" fill="#9c2922">Impatto ELEVATO</text>
      </svg>`;
    case "packaging_three_tiers":
    case "material_codes_bins":
    case "smart_shopping_steps":
      return `<svg viewBox="0 0 560 205" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#f8fbfa;border:1px solid #d5e2dd;" role="img" aria-label="Le 5R originali in inglese: Refuse, Reduce, Reuse, Recycle, Rot">
        <rect x="20" y="12" width="520" height="32" rx="8" fill="#1e7a52"/><text x="280" y="33" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">1. Refuse</text>
        <rect x="60" y="50" width="440" height="32" rx="8" fill="#2f9468"/><text x="280" y="71" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">2. Reduce</text>
        <rect x="100" y="88" width="360" height="32" rx="8" fill="#3a86a8"/><text x="280" y="109" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">3. Reuse</text>
        <rect x="140" y="126" width="280" height="32" rx="8" fill="#475569"/><text x="280" y="147" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">4. Recycle</text>
        <rect x="180" y="164" width="200" height="32" rx="8" fill="#92400e"/><text x="280" y="185" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">5. Rot</text>
      </svg>`;
    default:
      return `<svg viewBox="0 0 560 170" width="100%" style="max-width:560px;height:auto;border-radius:12px;background:#f5f9f6;border:1px solid #d6e4da;" role="img" aria-label="Schema concettuale filiera e risorse">
        <rect x="24" y="34" width="114" height="100" rx="12" fill="#e6f4ec" stroke="#62b285"/>
        <text x="81" y="72" text-anchor="middle" font-size="12" font-weight="800" fill="#185937">TERRITORIO</text>
        <text x="81" y="92" text-anchor="middle" font-size="10" fill="#264f39">Suolo, pioggia,</text>
        <text x="81" y="107" text-anchor="middle" font-size="10" fill="#264f39">stagione naturale</text>
        <path d="M144 84h26" stroke="#2d8659" stroke-width="3" marker-end="url(#arr)"/>
        <rect x="176" y="34" width="114" height="100" rx="12" fill="#e7f2fa" stroke="#65a2cf"/>
        <text x="233" y="72" text-anchor="middle" font-size="12" font-weight="800" fill="#1a4e7c">FILIERA</text>
        <text x="233" y="92" text-anchor="middle" font-size="10" fill="#254869">Lavorazione, imballi,</text>
        <text x="233" y="107" text-anchor="middle" font-size="10" fill="#254869">trasporto e freddo</text>
        <path d="M296 84h26" stroke="#2d8659" stroke-width="3"/>
        <rect x="328" y="34" width="104" height="100" rx="12" fill="#fff4e4" stroke="#df9d4a"/>
        <text x="380" y="72" text-anchor="middle" font-size="12" font-weight="800" fill="#7d4a11">SCELTA</text>
        <text x="380" y="92" text-anchor="middle" font-size="10" fill="#5e3d18">Sfuso, borraccia,</text>
        <text x="380" y="107" text-anchor="middle" font-size="10" fill="#5e3d18">porzioni adeguate</text>
        <path d="M438 84h16" stroke="#2d8659" stroke-width="3"/>
        <rect x="458" y="34" width="84" height="100" rx="12" fill="#edf7ed" stroke="#53a467"/>
        <text x="500" y="75" text-anchor="middle" font-size="12" font-weight="800" fill="#1f6339">IMPATTO</text>
        <text x="500" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#1f6339">RIDOTTO</text>
      </svg>`;
  }
}

function wrapTextLines(text: string, maxChars: number, maxLines: number): string[] {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length <= maxChars) {
      cur = (cur + " " + w).trim();
    } else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

function escXml(str: string): string {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderSchoolPosterSvg(
  draft: { title: string; issueId: string; proposal: string; theme: string },
  issue?: SchoolAuditIssue
): string {
  const palettes: Record<string, { bg1: string; bg2: string; accent: string; badge: string }> = {
    water_school: { bg1: "#eef7fb", bg2: "#d6eef8", accent: "#175e8a", badge: "#1c7a56" },
    zero_pack: { bg1: "#f1f9f2", bg2: "#dceddc", accent: "#1f6f46", badge: "#c57618" },
    food_rescue: { bg1: "#fff7ed", bg2: "#fce8d2", accent: "#9e4b14", badge: "#1e6e48" }
  };
  const pal = palettes[draft.theme] || palettes.water_school;
  const titleLines = wrapTextLines(draft.title || "La Nostra Scuola a Impatto Ridotto", 26, 2);
  const problemLines = wrapTextLines(issue?.problem || "Ridurre rifiuti e sprechi quotidiani a scuola", 44, 2);
  const propLines = wrapTextLines(draft.proposal || "Azioni concrete quotidiane di classe", 44, 4);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" role="img" aria-label="Manifesto digitale scolastico SERR">
    <defs>
      <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${pal.bg1}"/>
        <stop offset="100%" stop-color="${pal.bg2}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1000" rx="28" fill="url(#pbg)"/>
    <rect x="28" y="28" width="744" height="944" rx="22" fill="none" stroke="${pal.accent}" stroke-width="5"/>
    <rect x="56" y="58" width="440" height="44" rx="10" fill="${pal.badge}"/>
    <text x="276" y="86" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#ffffff">SETTIMANA EUROPEA RIDUZIONE RIFIUTI · SERR 2026</text>

    ${titleLines.map((l, i) => `<text x="400" y="${178 + i * 54}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="900" fill="${pal.accent}">${escXml(l)}</text>`).join("")}

    <!-- Illustrazione vettoriale scuola sostenibile -->
    <g transform="translate(150, 275)">
      <rect x="20" y="30" width="460" height="250" rx="28" fill="#ffffff" stroke="${pal.accent}" stroke-width="3" opacity="0.92"/>
      <!-- Edificio scolastico -->
      <path d="M120 220V125l130-55 130 55v95H120z" fill="#f7f2e7" stroke="${pal.accent}" stroke-width="4"/>
      <polygon points="105,130 250,65 395,130" fill="#c95b3c"/>
      <rect x="224" y="160" width="52" height="60" rx="4" fill="#2b6b58"/>
      <rect x="148" y="148" width="42" height="36" rx="4" fill="#9cd2eb" stroke="${pal.accent}" stroke-width="2"/>
      <rect x="310" y="148" width="42" height="36" rx="4" fill="#9cd2eb" stroke="${pal.accent}" stroke-width="2"/>
      <!-- Borraccia + Mela + Foglia -->
      <rect x="64" y="140" width="38" height="72" rx="12" fill="#2c84b5"/>
      <rect x="74" y="128" width="18" height="14" rx="4" fill="#174c6b"/>
      <circle cx="425" cy="182" r="28" fill="#d93b34"/>
      <path d="M425 154c6-12 18-13 24-6-6 9-16 10-24 6z" fill="#2b864c"/>
    </g>

    <!-- Box Problema -->
    <rect x="60" y="590" width="680" height="125" rx="16" fill="#ffffff" stroke="#d5dfe4" stroke-width="2.5"/>
    <text x="90" y="625" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#9c2d23">PROBLEMA OSSERVATO (${escXml(issue?.category || "Scuola")})</text>
    ${problemLines.map((l, i) => `<text x="90" y="${660 + i * 28}" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="#24312b">${escXml(l)}</text>`).join("")}

    <!-- Box Proposta -->
    <rect x="60" y="736" width="680" height="164" rx="16" fill="#ffffff" stroke="${pal.accent}" stroke-width="2.5"/>
    <text x="90" y="772" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="${pal.accent}">LA NOSTRA PROPOSTA CONCRETA</text>
    ${propLines.map((l, i) => `<text x="90" y="${808 + i * 28}" font-family="system-ui, -apple-system, sans-serif" font-size="21" font-weight="600" fill="#1c2722">${escXml(l)}</text>`).join("")}

    <text x="400" y="944" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="${pal.accent}">Mezzovalle &amp; Villacolle · Rete Cinque Borghi · Esportazione pronta per Canva</text>
  </svg>`;
}

export function renderMissionCertificateSvg(opts: {
  studentName: string;
  studentClass: string;
  badgeTitle: string;
  missionTitle: string;
  commitment: string;
  dateStr: string;
}): string {
  const commLines = wrapTextLines(opts.commitment || "Impegno quotidiano per ridurre gli sprechi alimentari e gli imballaggi.", 56, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 790" width="1120" height="790" role="img" aria-label="Attestato SERR">
    <rect width="1120" height="790" fill="#fbf9f3"/>
    <rect x="28" y="28" width="1064" height="734" rx="20" fill="none" stroke="#1f6e49" stroke-width="6"/>
    <rect x="44" y="44" width="1032" height="702" rx="14" fill="none" stroke="#c89a3d" stroke-width="2"/>
    <rect x="330" y="72" width="460" height="40" rx="8" fill="#1f6e49"/>
    <text x="560" y="98" text-anchor="middle" font-family="Georgia, serif" font-size="17" font-weight="700" fill="#ffffff">SETTIMANA EUROPEA PER LA RIDUZIONE DEI RIFIUTI · 2026</text>
    <text x="560" y="176" text-anchor="middle" font-family="Georgia, serif" font-size="44" font-weight="700" fill="#1c3528">ATTESTATO DI MERITO AMBIENTALE</text>
    <text x="560" y="220" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#b47b19">${escXml(opts.badgeTitle)}</text>
    <text x="560" y="275" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" fill="#4f5f56">Conferito con stima a</text>
    <text x="560" y="340" text-anchor="middle" font-family="Georgia, serif" font-size="48" font-weight="700" fill="#154d32">${escXml(opts.studentName || "Studente SERR")}</text>
    <text x="560" y="382" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#526058">${escXml(opts.studentClass || "Secondaria I grado · Rete Cinque Borghi")}</text>
    <line x1="250" y1="408" x2="870" y2="408" stroke="#d5c6a3" stroke-width="2"/>
    <text x="560" y="454" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#23372d">Per aver completato la missione: ${escXml(opts.missionTitle)}</text>
    <rect x="160" y="486" width="800" height="130" rx="14" fill="#ffffff" stroke="#d9e3dc" stroke-width="2"/>
    <text x="560" y="516" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#1f6e49">IMPEGNO PERSONALE / DI CLASSE</text>
    ${commLines.map((l, i) => `<text x="560" y="${548 + i * 26}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="19" fill="#27362e">${escXml(l)}</text>`).join("")}
    <text x="200" y="685" font-family="system-ui, sans-serif" font-size="16" fill="#4f5f56">Data: ${escXml(opts.dateStr)}</text>
    <text x="920" y="685" text-anchor="end" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#1f6e49">Percorsi Mezzovalle &amp; Villacolle</text>
  </svg>`;
}

export function downloadSvgFile(svgMarkup: string, filename: string): void {
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSvgAsPng(svgMarkup: string, filename: string, width = 1200, height = 1500): Promise<void> {
  return new Promise((resolve) => {
    const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const pUrl = URL.createObjectURL(pngBlob);
            const a = document.createElement("a");
            a.href = pUrl;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(pUrl);
          }
          URL.revokeObjectURL(url);
          resolve();
        }, "image/png");
      } else {
        URL.revokeObjectURL(url);
        resolve();
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });
}
