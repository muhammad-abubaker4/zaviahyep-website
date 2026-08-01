import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

/**
 * Source path (without the `-<width>w.webp` suffix) of the first hero slide.
 * Must match the first entry of `heroSlides` in src/data/heroSlides.ts.
 */
const HERO_LCP_SOURCE = "src/assets/tahafuz-manzil/WhatsApp Image 2026-07-31 at 22.12.58";
const HERO_SIZES = "(max-width: 1024px) 100vw, 62vw";

/**
 * Preloads the hero image from the HTML itself. Without this the browser can
 * only discover it after the entry chunk has downloaded, parsed, and rendered,
 * which puts the whole JS execution cost in front of the LCP paint.
 *
 * Throws rather than silently skipping: a renamed hero file would otherwise
 * quietly cost the LCP improvement with nothing in the build output to notice.
 */
function heroPreload(): Plugin {
  return {
    name: "zaviah-hero-preload",
    enforce: "post",
    apply: "build",
    transformIndexHtml(html, ctx) {
      const emitted = new Map<number, string>();
      for (const [fileName, chunk] of Object.entries(ctx.bundle ?? {})) {
        if (chunk.type !== "asset") continue;
        for (const original of chunk.originalFileNames ?? []) {
          const match = original.startsWith(HERO_LCP_SOURCE)
            ? original.match(/-(\d+)w\.webp$/)
            : null;
          if (match) emitted.set(Number(match[1]), fileName);
        }
      }

      if (emitted.size === 0) {
        throw new Error(
          `zaviah-hero-preload: no emitted variants for "${HERO_LCP_SOURCE}". ` +
            "Update HERO_LCP_SOURCE in vite.config.ts to match heroSlides[0].",
        );
      }

      const srcset = [...emitted.entries()]
        .sort(([a], [b]) => a - b)
        .map(([width, file]) => `/${file} ${width}w`)
        .join(", ");

      return [
        {
          tag: "link",
          attrs: {
            rel: "preload",
            as: "image",
            type: "image/webp",
            imagesrcset: srcset,
            imagesizes: HERO_SIZES,
            fetchpriority: "high",
          },
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      jpeg: { quality: 80, mozjpeg: true },
      jpg: { quality: 80, mozjpeg: true },
      png: { quality: 85 },
      webp: { quality: 80 },
    }),
    heroPreload(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
