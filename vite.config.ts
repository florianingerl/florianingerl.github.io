import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// Die ganze Website ist jetzt eine einzige Vue3 + Vite Anwendung.
// Gebaut wird nach dist/, das auf GitHub Pages über den Workflow
// .github/workflows/pages.yml auf die Wurzel der Seite kopiert wird.
export default defineConfig({
  plugins: [vue()],
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
