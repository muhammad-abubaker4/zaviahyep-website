import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_PATH = path.join(ROOT, "public", "og-preview.png");

const BRAND = {
  bg: "#253439",
  fg: "#F8FAFC",
  muted: "rgba(248,250,252,0.72)",
  line: "rgba(248,250,252,0.16)",
};

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mesh" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BRAND.bg}"/>
      <stop offset="1" stop-color="#1e2a2e"/>
    </linearGradient>
    <radialGradient id="glow1" cx="25%" cy="30%" r="55%">
      <stop offset="0" stop-color="rgba(255,255,255,0.10)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="78%" cy="62%" r="65%">
      <stop offset="0" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="rgba(0,0,0,0.30)"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#mesh)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <g opacity="0.35">
    ${Array.from({ length: 11 })
      .map((_, i) => {
        const y = 70 + i * 48;
        return `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="${BRAND.line}" stroke-width="1" />`;
      })
      .join("")}
    ${Array.from({ length: 18 })
      .map((_, i) => {
        const x = 70 + i * 64;
        return `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="${BRAND.line}" stroke-width="1" />`;
      })
      .join("")}
  </g>

  <g filter="url(#softShadow)">
    <rect x="78" y="88" width="1044" height="454" rx="40" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
  </g>

  <g font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" fill="${BRAND.fg}">
    <text x="132" y="190" font-size="56" font-weight="800" letter-spacing="-1">Zaviah</text>
    <text x="132" y="246" font-size="20" font-weight="600" fill="${BRAND.muted}" letter-spacing="3">YOUTH EMPOWERMENT PLATFORM</text>

    <text x="132" y="326" font-size="64" font-weight="900" letter-spacing="-1.5">Empowering the Next</text>
    <text x="132" y="392" font-size="64" font-weight="900" opacity="0.62" letter-spacing="-1.5">Generation</text>

    <text x="132" y="454" font-size="24" font-weight="600" fill="${BRAND.muted}">
      Connecting students across Pakistan with mentors, workshops, and opportunities.
    </text>
  </g>

  <g>
    <rect x="132" y="486" width="300" height="56" rx="28" fill="rgba(248,250,252,0.92)"/>
    <text x="174" y="523" font-size="18" font-weight="800" fill="${BRAND.bg}" font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial">
      Join Our Community
    </text>
  </g>
</svg>`;

await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(OUT_PATH);

console.log(`Generated ${OUT_PATH}`);

