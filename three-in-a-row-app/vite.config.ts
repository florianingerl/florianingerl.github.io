import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Baut anschliessend three-in-a-row.js + three-in-a-row.css nach ../three-in-a-row/,
// die index.html einbindet - genau wie das quiz-app nach ../quiz/.
export default defineConfig({
  plugins: [vue()],
  base: "/three-in-a-row/",
  build: {
    outDir: "../three-in-a-row",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        entryFileNames: "three-in-a-row.js",
        chunkFileNames: "three-in-a-row-[name].js",
        assetFileNames: "three-in-a-row.[ext]",
      },
    },
  },
});
