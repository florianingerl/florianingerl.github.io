import type { Seite } from "./index";
import { florian } from "./florian";
import Nachhilfeangebot from "../abschnitte/de/Nachhilfeangebot.vue";
import MatheUni from "../abschnitte/de/MatheUni.vue";
import InfoUni from "../abschnitte/de/InfoUni.vue";
import PhysikUni from "../abschnitte/de/PhysikUni.vue";
import Ingenieurwesen from "../abschnitte/de/Ingenieurwesen.vue";
import Chemie from "../abschnitte/de/Chemie.vue";
import MatheSchule from "../abschnitte/de/MatheSchule.vue";
import PhysikSchule from "../abschnitte/de/PhysikSchule.vue";
import InfoSchule from "../abschnitte/de/InfoSchule.vue";
import ChemieSchule from "../abschnitte/de/ChemieSchule.vue";
import Franzoesisch from "../abschnitte/de/Franzoesisch.vue";
import Englisch from "../abschnitte/de/Englisch.vue";
import Spanisch from "../abschnitte/de/Spanisch.vue";
import Italienisch from "../abschnitte/de/Italienisch.vue";
import Deutsch from "../abschnitte/de/Deutsch.vue";
import Ernaehrung from "../abschnitte/de/Ernaehrung.vue";
import Reiki from "../abschnitte/de/Reiki.vue";
import LernenUndLehren from "../abschnitte/de/LernenUndLehren.vue";
import Bewusstsein from "../abschnitte/de/Bewusstsein.vue";
import Schach from "../abschnitte/de/Schach.vue";
import WebsitenUndFlyer from "../abschnitte/de/WebsitenUndFlyer.vue";
import Preise from "../abschnitte/de/Preise.vue";
import Unterrichtsmethode from "../abschnitte/de/Unterrichtsmethode.vue";
import Tutorium from "../abschnitte/de/Tutorium.vue";
import Online from "../abschnitte/de/Online.vue";
import Praesenz from "../abschnitte/de/Praesenz.vue";
import Feedbacks from "../abschnitte/de/Feedbacks.vue";
import Links from "../abschnitte/de/Links.vue";
import Impressum from "../abschnitte/de/Impressum.vue";
import UeberMich from "../abschnitte/de/UeberMich.vue";
import WarumNachhilfeBeiFlorian from "../abschnitte/de/WarumNachhilfeBeiFlorian.vue";

// Deutsche Startseite (index.html)
const de: Seite = {
  logo: "Frag Florian!",
  knopf: "Schreib mir eine Nachricht",
  heroBild: "assets/img/PendelFlyerNeu3.png",
  flaggen: florian.flaggen,
  menue: [
    {
      titel: "Uni",
      ziel: "#matheuni",
      eintraege: [
        { titel: "Mathematik", ziel: "#matheuni" },
        { titel: "Informatik", ziel: "#infouni" },
        { titel: "Physik", ziel: "#physikuni" },
        { titel: "Ingenieurwesen", ziel: "#ingenieurwesen" },
        { titel: "Chemie", ziel: "#chemie" },
      ],
    },
    {
      titel: "Schule",
      ziel: "#matheschule",
      eintraege: [
        { titel: "Mathematik", ziel: "#matheschule" },
        { titel: "Physik", ziel: "#physikschule" },
        { titel: "Informatik", ziel: "#infoschule" },
        { titel: "Chemie", ziel: "#chemieschule" },
        { titel: "Französisch", ziel: "#franzoesisch" },
        { titel: "Englisch", ziel: "#englisch" },
        { titel: "Spanisch", ziel: "#spanisch" },
        { titel: "Italienisch", ziel: "#italienisch" },
        { titel: "Deutsch", ziel: "#deutsch" },
      ],
    },
    {
      titel: "Leben, Lernen und Lehren",
      ziel: "#ernaehrung",
      eintraege: [
        { titel: "Länger lernen mit Sprossen", ziel: "#ernaehrung" },
        { titel: "Reiki", ziel: "#reiki" },
        { titel: "Lernen und Lehren", ziel: "#lernenundlehren" },
        { titel: "Bewusstsein", ziel: "#bewusstsein" },
        { titel: "Schach", ziel: "#schach" },
        { titel: "Websiten", ziel: "#websitenundflyer" },
      ],
    },
    {
      titel: "Preise und andere Infos",
      ziel: "#preise",
      eintraege: [
        { titel: "Preise, Termine und Bezahlung", ziel: "#preise" },
        { titel: "Ablauf einer Nachhilfestunde", ziel: "#unterrichtsmethode" },
        { titel: "Tutorium/Gruppenunterricht", ziel: "#tutorium" },
        { titel: "Online-Nachhilfe", ziel: "#online" },
        { titel: "Präsenz-Nachhilfe", ziel: "#praesenz" },
        { titel: "Feedbacks", ziel: "#feedbacks" },
        { titel: "Links", ziel: "#links" },
        { titel: "Impressum", ziel: "#impressum" },
      ],
    },
    {
      titel: "Über mich",
      ziel: "#uebermich",
      eintraege: [
        { titel: "Über mich", ziel: "#uebermich" },
        { titel: "Warum Nachhilfe bei Florian?", ziel: "#warumnachhilfebeiflorian" },
        { titel: "Feedbacks", ziel: "#feedbacks" },
        { titel: "Links", ziel: "#links" },
      ],
    },
  ],
  kontakt: {
    karteHoehe: "200px",
    karte: florian.karte,
    containerId: "schreibmirnachricht",
    adresse: "Adresse:",
    email: "Email:",
    strasse: florian.strasse,
    ort: florian.ort,
    mailadresse: florian.mailadresse,
    absatz:
      "Am besten du kontaktierst mich via E-Mail und schickst gleich ein paar Aufgabenblätter mit, die man in einer Nachhilfestunde besprechen könnte. Aber du kannst auch dieses Kontaktformular benutzen.",
    formular: {
      action: "https://api.web3forms.com/submit",
      accessKey: "aaa027db-e72d-41d2-9b3b-7603e4908475",
      weiterleitung: "https://florianingerl.github.io/formsubmissionconfirmation.html",
      botcheck: true,
      name: "Dein Name",
      mail: "Deine Email",
      betreff: "Betreff",
      nachricht: "Nachricht",
      knopf: "Nachricht senden",
    },
  },
  fuss: { mailadresse: florian.mailadresse, sozial: false },
  schach: "de",
  abschnitte: [
    Nachhilfeangebot, MatheUni, InfoUni, PhysikUni, Ingenieurwesen, Chemie,
    MatheSchule, PhysikSchule, InfoSchule, ChemieSchule,
    Franzoesisch, Englisch, Spanisch, Italienisch, Deutsch,
    Ernaehrung, Reiki, LernenUndLehren, Bewusstsein, Schach, WebsitenUndFlyer,
    Preise, Unterrichtsmethode, Tutorium, Online, Praesenz, Feedbacks, Links, Impressum,
    UeberMich, WarumNachhilfeBeiFlorian,
  ],
};

export default de;
