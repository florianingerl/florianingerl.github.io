import type { Nachrichten, Seite } from "./index";
import Angebot from "../organisms/vorlage/Angebot.vue";
import Mathe from "../organisms/vorlage/Mathe.vue";
import Englisch from "../organisms/vorlage/Englisch.vue";
import Franzoesisch from "../organisms/vorlage/Franzoesisch.vue";
import Preise from "../organisms/vorlage/Preise.vue";
import UeberMich from "../organisms/vorlage/UeberMich.vue";
import Impressum from "../organisms/vorlage/Impressum.vue";

// Beispielseite "Frag Lena!" für weitere Nachhilfelehrer (vorlage.html).
// Eine neue Lehrerseite braucht nur diese Datei, den Ordner organisms/<name>/ und eine Hülle wie vorlage.html.
const vorlage: Seite = {
  start: "vorlage.html",
  heroBild: "assets/img/vorlage/hero.svg",
  menue: [
    {
      titel: "Fächer",
      ziel: "#mathe",
      eintraege: [
        { titel: "Mathematik", ziel: "#mathe" },
        { titel: "Englisch", ziel: "#englisch" },
        { titel: "Französisch", ziel: "#franzoesisch" },
      ],
    },
    {
      titel: "Preise und Infos",
      ziel: "#preise",
      eintraege: [
        { titel: "Preise und Termine", ziel: "#preise" },
        { titel: "Impressum", ziel: "#impressum" },
      ],
    },
    { titel: "Über mich", ziel: "#uebermich", eintraege: [] },
  ],
  kontakt: {
    karteHoehe: "200px",
    containerId: "schreibmirnachricht",
    strasse: "Musterstraße 1",
    ort: "12345 Musterstadt",
    mailadresse: "lena@beispiel.de",
    formular: {
      // Hier gehört der eigene Schlüssel von web3forms.com hinein, sonst kommt die Nachricht nicht an.
      action: "https://api.web3forms.com/submit",
      botcheck: true,
    },
  },
  fuss: { telefonnummer: "0123/456789", mailadresse: "lena@beispiel.de", sozial: false },
  schach: "de",
  abschnitte: [Angebot, Mathe, Englisch, Franzoesisch, Preise, UeberMich, Impressum],
};

// Oberflächentexte dieser Sprache, vue-i18n reicht sie per t("...") an die Bausteine
export const nachrichten: Nachrichten = {
  titel: "Frag Lena! - Nachhilfe in Mathe, Englisch und Französisch",
  logo: "Frag Lena!",
  knopf: "Schreib mir eine Nachricht",
  kontakt: { adresse: "Adresse:", email: "Email:", absatz: "Schreib mir am besten eine E-Mail mit dem Thema, das gerade dran ist, oder benutze dieses Kontaktformular. Ich melde mich innerhalb eines Tages zurück." },
  formular: {
    name: "Dein Name",
    mail: "Deine Email",
    betreff: "Betreff",
    nachricht: "Nachricht",
    knopf: "Nachricht senden",
  },
  fuss: { telefon: "Telefon:" },
};

export default vorlage;
