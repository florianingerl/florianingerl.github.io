import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Baut die ganze Seite nach ../app/ (app.js + app.css), die index.html einbindet.
export default defineConfig({
  plugins: [
    vue({
      template: {
        // Bilder bleiben relative Pfade nach assets/, Vite soll sie nicht einpacken.
        transformAssetUrls: false,
        // Leerzeichen zwischen den Tags bleiben stehen, damit der Text genauso umbricht wie vorher.
        compilerOptions: { whitespace: "preserve" },
      },
    }),
  ],
  base: "./",
  build: {
    // seite.ts wartet mit await auf die Sprachdatei, das können erst Browser ab 2021
    target: "es2022",
    outDir: "../app",
    emptyOutDir: true,
    // Alles CSS in eine app.css, auch das der nachgeladenen Teile
    cssCodeSplit: false,
    rollupOptions: {
      input: "src/seite.ts",
      output: {
        entryFileNames: "app.js",
        chunkFileNames: "app-[name].js",
        assetFileNames: "app.[ext]",
        // Bibliotheken, Quiz und gemeinsame Bausteine stecken in allen Sprachen und bekommen eigene Dateien
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes("/src/components/")) return "quiz";
          if (id.includes("/src/seite/atoms/")) return "bausteine";
        },
      },
    },
  },
});
