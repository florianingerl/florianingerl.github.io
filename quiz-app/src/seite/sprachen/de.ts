import type { Seite } from "./index";
import { florian } from "./florian";
import Nachhilfeangebot from "../organisms/de/Nachhilfeangebot.vue";
import MatheUni from "../organisms/de/MatheUni.vue";
import InfoUni from "../organisms/de/InfoUni.vue";
import PhysikUni from "../organisms/de/PhysikUni.vue";
import Ingenieurwesen from "../organisms/de/Ingenieurwesen.vue";
import Chemie from "../organisms/de/Chemie.vue";
import MatheSchule from "../organisms/de/MatheSchule.vue";
import PhysikSchule from "../organisms/de/PhysikSchule.vue";
import InfoSchule from "../organisms/de/InfoSchule.vue";
import ChemieSchule from "../organisms/de/ChemieSchule.vue";
import Franzoesisch from "../organisms/de/Franzoesisch.vue";
import Englisch from "../organisms/de/Englisch.vue";
import Spanisch from "../organisms/de/Spanisch.vue";
import Italienisch from "../organisms/de/Italienisch.vue";
import Deutsch from "../organisms/de/Deutsch.vue";
import Ernaehrung from "../organisms/de/Ernaehrung.vue";
import Reiki from "../organisms/de/Reiki.vue";
import LernenUndLehren from "../organisms/de/LernenUndLehren.vue";
import Bewusstsein from "../organisms/de/Bewusstsein.vue";
import Schach from "../organisms/de/Schach.vue";
import WebsitenUndFlyer from "../organisms/de/WebsitenUndFlyer.vue";
import Preise from "../organisms/de/Preise.vue";
import Unterrichtsmethode from "../organisms/de/Unterrichtsmethode.vue";
import Tutorium from "../organisms/de/Tutorium.vue";
import Online from "../organisms/de/Online.vue";
import Praesenz from "../organisms/de/Praesenz.vue";
import Feedbacks from "../organisms/de/Feedbacks.vue";
import Links from "../organisms/de/Links.vue";
import Impressum from "../organisms/de/Impressum.vue";
import UeberMich from "../organisms/de/UeberMich.vue";
import WarumNachhilfeBeiFlorian from "../organisms/de/WarumNachhilfeBeiFlorian.vue";

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
