import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import fs from "node:fs";

// Diese Dateien werden zur Laufzeit über echte URLs angesprochen (z.B.
// <img src="assets/img/...">, Links zu PDFs oder das Schachbrett). Vite
// kann sie deshalb nicht bündeln, sie werden unverändert in den Build
// nach dist/ kopiert. Dadurch verhält sich `npm run start` (vite preview)
// genauso wie die veröffentlichte Seite auf GitHub Pages.
const STATIC_PATHS = [
  "assets",
  "Pdfs",
  "chessboardjs-1.0.0",
  "formsubmissionconfirmation.html",
];

function staticCopy(): Plugin {
  return {
    name: "static-copy",
    apply: "build",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      for (const entry of STATIC_PATHS) {
        const from = path.resolve(__dirname, entry);
        if (fs.existsSync(from)) {
          fs.cpSync(from, path.join(dist, entry), { recursive: true });
        }
      }
      // GitHub Pages würde sonst Jekyll ausführen; damit liefert es
      // Dateien (vor allem solche mit Unterstrichen) garantiert aus.
      fs.writeFileSync(path.join(dist, ".nojekyll"), "");
    },
  };
}

export default defineConfig({
  plugins: [vue(), staticCopy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    // Eigener Ordner, damit die gebauten Dateien nicht in assets/ (Bilder,
    // Pdfs, Vendor-Dateien der alten Seite) landen.
    assetsDir: "static",
    emptyOutDir: true,
  },
});
