import { createApp } from "vue";
import App from "./seite/App.vue";
import { i18n } from "./seite/i18n";
import { angeboten, erkenneSprache, lade } from "./seite/sprache";
import type { Sprache } from "./seite/sprachen";
// Dasselbe Bootstrap wie im Quiz, damit die Seite genauso aussieht wie mit quiz.css
import "bootstrap/dist/css/bootstrap.min.css";
import "./seite/tailwind.css";

// Die Hülle sagt über data-sprachen am <div id="app">, welche Sprachen sie anbietet (die erste ist die Vorgabe).
const wurzel = document.getElementById("app");
angeboten.push(...((wurzel?.dataset.sprachen ?? "de").split(",") as Sprache[]));

// Erst die Sprache laden, dann einhängen, damit die Seite gleich fertig dasteht
await lade(erkenneSprache());
createApp(App).use(i18n).mount("#app");

// Ein Anker in der Adresse (#contact) zeigt auf Inhalt, den es beim Laden noch nicht gab, also selbst hinspringen,
// und nach dem Laden der Bilder noch einmal, weil sie den Abschnitt bis dahin nach unten geschoben haben.
function springeZumAnker(): void {
  if (location.hash.length < 2) return;
  try {
    document.querySelector(location.hash)?.scrollIntoView();
  } catch {
    // kein gültiger Anker, dann bleibt die Seite oben
  }
}
springeZumAnker();
window.addEventListener("load", springeZumAnker);
