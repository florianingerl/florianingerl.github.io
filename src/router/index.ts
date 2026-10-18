import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WhiteboardView from "@/views/WhiteboardView.vue";

// Die Bilder in den Abschnitten haben keine feste Hoehe. Sie laden erst nach
// dem ersten Rendern nach und schieben die weiter unten liegenden Abschnitte
// nach unten. Wuerde sofort zum Anker gescrollt, landete man mehrere Abschnitte
// zu hoch (z.B. bei "Chemie" statt bei "Franzoesisch"). Darum wird gewartet,
// bis die Seite steht (alle Bilder geladen und die Hoehe ruhig), bevor
// gescrollt wird.
function warteAufRuhigeSeite(): Promise<void> {
  return new Promise((fertig) => {
    const start = Date.now();
    let letzteHoehe = -1;
    let ruhigSeit = 0;
    const alleBilderGeladen = (): boolean =>
      Array.from(document.images).every((bild) => bild.complete);
    const pruefen = (): void => {
      const hoehe = document.body.scrollHeight;
      if (hoehe === letzteHoehe) ruhigSeit += 100;
      else ruhigSeit = 0;
      letzteHoehe = hoehe;
      const ruhig = alleBilderGeladen() && ruhigSeit >= 200;
      if (ruhig || Date.now() - start > 5000) {
        fertig();
        return;
      }
      setTimeout(pruefen, 100);
    };
    pruefen();
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/whiteboard",
      name: "whiteboard",
      component: WhiteboardView,
    },
  ],
  async scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Ein Link wie "#franzoesisch?topic=..." hat hinter dem "#" noch
      // eine Abfrage. Angesprungen wird nur das Element davor.
      await warteAufRuhigeSeite();
      // Der fixierte Kopfbereich (.site-top) wuerde die Ueberschrift des
      // Abschnitts verdecken, wenn das Element ganz oben am Viewport landet.
      // Darum wird die Kopfhoehe als Versatz angegeben (equivalent zum
      // scroll-padding-top, das window.scrollTo sonst nicht beruecksichtigt).
      const kopfhoehe =
        document.querySelector<HTMLElement>(".site-top")?.offsetHeight ?? 0;
      return { el: to.hash.split("?")[0], top: kopfhoehe };
    }
    return { top: 0 };
  },
});

export default router;
