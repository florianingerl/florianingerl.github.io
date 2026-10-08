import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Baut die Übungsseite nach ../app/ (uebung.js + uebung.css), die uebung.html einbindet.
export default defineConfig({
  plugins: [
    vue({
      template: {
        // Bilder bleiben relative Pfade nach assets/, Vite soll sie nicht einpacken.
        transformAssetUrls: false,
      },
    }),
  ],
  base: "./",
  build: {
    target: "es2022",
    outDir: "../app",
    // Die Startseite liegt schon in ../app/ und darf nicht gelöscht werden
    emptyOutDir: false,
    // Alles CSS in eine uebung.css, auch das der nachgeladenen Übungen
    cssCodeSplit: false,
    rollupOptions: {
      input: "src/uebung.ts",
      output: {
        entryFileNames: "uebung.js",
        chunkFileNames: "uebung-[name].js",
        assetFileNames: "uebung.[ext]",
        // Bibliotheken und Bausteine getrennt, die Übungen je Sprache in einer Datei
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes("/src/uebung/atoms/") || id.includes("plugin-vue")) return "bausteine";
          const sprache = id.match(/\/src\/uebung\/pages\/([a-z]+)\//);
          if (sprache) return sprache[1];
        },
      },
    },
  },
});
