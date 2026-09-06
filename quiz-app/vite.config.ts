import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Baut anschließend eine quiz.js + quiz.css nach ../quiz/, die index.html einbindet.
export default defineConfig({
  plugins: [vue()],
  base: "/quiz/",
  server: {
    // Im Dev-Modus muss die Adresse vom Python-Server geholt werden!
    proxy: {
      "/quiz/assets": {
        target: "http://127.0.0.1:5500",
        rewrite: (pfad) => pfad.replace(/^\/quiz/, ""),
      },
    },
  },
  build: {
    outDir: "../quiz",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        entryFileNames: "quiz.js",
        chunkFileNames: "quiz-[name].js",
        assetFileNames: "quiz.[ext]",
      },
    },
  },
});
