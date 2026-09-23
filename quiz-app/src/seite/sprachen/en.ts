import type { Seite } from "./index";
import { florian } from "./florian";
import Nachhilfeangebot from "../abschnitte/en/Nachhilfeangebot.vue";
import MatheUni from "../abschnitte/en/MatheUni.vue";
import InfoUni from "../abschnitte/en/InfoUni.vue";
import PhysikUni from "../abschnitte/en/PhysikUni.vue";
import Ingenieurwesen from "../abschnitte/en/Ingenieurwesen.vue";
import MatheSchule from "../abschnitte/en/MatheSchule.vue";
import PhysikSchule from "../abschnitte/en/PhysikSchule.vue";
import InfoSchule from "../abschnitte/en/InfoSchule.vue";
import Franzoesisch from "../abschnitte/en/Franzoesisch.vue";
import German from "../abschnitte/en/German.vue";
import Ernaehrung from "../abschnitte/en/Ernaehrung.vue";
import Bewusstsein from "../abschnitte/en/Bewusstsein.vue";
import Schach from "../abschnitte/en/Schach.vue";
import WebsitenUndFlyer from "../abschnitte/en/WebsitenUndFlyer.vue";
import Preise from "../abschnitte/en/Preise.vue";
import Unterrichtsmethode from "../abschnitte/en/Unterrichtsmethode.vue";
import Online from "../abschnitte/en/Online.vue";
import UeberMich from "../abschnitte/en/UeberMich.vue";

// Englische Startseite (indexeng.html)
const en: Seite = {
  logo: "Ask Florian!",
  knopf: "Send me a message!",
  heroBild: "assets/img/PendelFlyerEnglischMitKopfUndSchrift.png",
  flaggen: florian.flaggen,
  menue: [
    {
      titel: "University",
      ziel: "#matheuni",
      eintraege: [
        { titel: "Mathematics", ziel: "#matheuni" },
        { titel: "Computer science", ziel: "#infouni" },
        { titel: "Physics", ziel: "#physikuni" },
        { titel: "Engineering", ziel: "#ingenieurwesen" },
      ],
    },
    {
      titel: "High School",
      ziel: "#matheschule",
      eintraege: [
        { titel: "Mathematics", ziel: "#matheschule" },
        { titel: "Physics", ziel: "#physikschule" },
        { titel: "Computer science", ziel: "#infoschule" },
        { titel: "German", ziel: "#german" },
        { titel: "French", ziel: "#franzoesisch" },
      ],
    },
    {
      titel: "Life",
      ziel: "#ernaehrung",
      eintraege: [
        { titel: "Nutrition", ziel: "#ernaehrung" },
        { titel: "Consciousness", ziel: "#bewusstsein" },
        { titel: "Chess", ziel: "#schach" },
        { titel: "Websites", ziel: "#websitenundflyer" },
      ],
    },
    {
      titel: "Prices and other info",
      ziel: "#preise",
      eintraege: [
        { titel: "Prices, appointements and payment", ziel: "#preise" },
        { titel: "Teaching method", ziel: "#teachingmethod" },
        { titel: "Online-Tutoring", ziel: "#online" },
      ],
    },
    { titel: "About me", ziel: "#uebermich", eintraege: [] },
  ],
  kontakt: {
    karteHoehe: "350px",
    karte: florian.karte,
    adresse: "Adresse:",
    email: "Email:",
    strasse: florian.strasse,
    ort: florian.ort,
    mailadresse: florian.mailadresse,
    absatz:
      "The best thing to do is to contact me via e-mail and send along a few worksheets that can be discussed in a private lesson. But you can also use the form below.",
    formular: {
      action: "https://getform.io/f/bddcb2ba-fb16-4fa3-baf2-aabd7227b87a",
      botcheck: false,
      name: "Your name",
      mail: "Your mail",
      nachricht: "Message",
      roboterFrage: {
        hinweis: "Please answer the following question so that I know that you aren't a roboter.",
        frage: "What is 3+4?",
        antwort: "7",
        fehler: "Please tell me the result of 3+4",
      },
      gesendet: "Your message was sent! Thanks!",
      knopf: "Send message",
    },
  },
  fuss: { telefon: "Phone:", telefonnummer: florian.telefonnummer, mailadresse: florian.mailadresse, sozial: true },
  schach: "en",
  abschnitte: [
    Nachhilfeangebot, MatheUni, InfoUni, PhysikUni, Ingenieurwesen,
    MatheSchule, PhysikSchule, InfoSchule, Franzoesisch, German,
    Ernaehrung, Bewusstsein, Schach, WebsitenUndFlyer,
    Preise, Unterrichtsmethode, Online, UeberMich,
  ],
};

export default en;
