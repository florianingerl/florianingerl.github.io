import type { Seite } from "./index";
import { florian } from "./florian";
import Nachhilfeangebot from "../abschnitte/es/Nachhilfeangebot.vue";
import MatheUni from "../abschnitte/es/MatheUni.vue";
import InfoUni from "../abschnitte/es/InfoUni.vue";
import PhysikUni from "../abschnitte/es/PhysikUni.vue";
import Ingenieurwesen from "../abschnitte/es/Ingenieurwesen.vue";
import MatheSchule from "../abschnitte/es/MatheSchule.vue";
import PhysikSchule from "../abschnitte/es/PhysikSchule.vue";
import InfoSchule from "../abschnitte/es/InfoSchule.vue";
import Deutsch from "../abschnitte/es/Deutsch.vue";
import Englisch from "../abschnitte/es/Englisch.vue";
import Ernaehrung from "../abschnitte/es/Ernaehrung.vue";
import Bewusstsein from "../abschnitte/es/Bewusstsein.vue";
import Schach from "../abschnitte/es/Schach.vue";
import WebsitenUndFlyer from "../abschnitte/es/WebsitenUndFlyer.vue";
import Preise from "../abschnitte/es/Preise.vue";
import MethodeEnseignement from "../abschnitte/es/MethodeEnseignement.vue";
import Online from "../abschnitte/es/Online.vue";
import UeberMich from "../abschnitte/es/UeberMich.vue";

// Spanische Startseite (indexesp.html)
const es: Seite = {
  logo: "Pregúntale\u00a0a Florian!",
  knopf: "Escríbeme un mensaje",
  heroBild: "assets/img/ingenieurwesenSpanischMitKopf.png",
  flaggen: florian.flaggen,
  menue: [
    {
      titel: "Universidad",
      ziel: "#matheuni",
      eintraege: [
        { titel: "Matemáticas", ziel: "#matheuni" },
        { titel: "Informática", ziel: "#infouni" },
        { titel: "Física", ziel: "#physikuni" },
        { titel: "Ingeniería", ziel: "#ingenieurwesen" },
      ],
    },
    {
      titel: "Colegio",
      ziel: "#matheschule",
      eintraege: [
        { titel: "Matemáticas", ziel: "#matheschule" },
        { titel: "Física", ziel: "#physikschule" },
        { titel: "Informatíca", ziel: "#infoschule" },
        { titel: "Alemán", ziel: "#deutsch" },
        { titel: "Inglés", ziel: "#englisch" },
      ],
    },
    {
      titel: "Vida",
      ziel: "#ernaehrung",
      eintraege: [
        { titel: "Nutrición", ziel: "#ernaehrung" },
        { titel: "Consciencia", ziel: "#bewusstsein" },
        { titel: "Ajedrez", ziel: "#schach" },
        { titel: "Páginas web", ziel: "#websitenundflyer" },
      ],
    },
    {
      titel: "Precio y otra información",
      ziel: "#preise",
      eintraege: [
        { titel: "Precios y otra información", ziel: "#preise" },
        { titel: "Método de enseñanza", ziel: "#methodeenseignement" },
        { titel: "Clases en grupo", ziel: "#tutorium" },
        { titel: "Clases privadas en línea", ziel: "#online" },
      ],
    },
    { titel: "Acerca de mí", ziel: "#uebermich", eintraege: [] },
  ],
  kontakt: {
    karteHoehe: "200px",
    karte: florian.karte,
    adresse: "Dirección:",
    email: "Dirección de correo electrónico:",
    strasse: florian.strasse,
    ort: florian.ort,
    mailadresse: florian.mailadresse,
    absatz:
      "Puedes utilizar este formulario para contactarme, pero es mejor si me contactas por correo electrónico y me envías suficientes ejercicios para que podamos discutir durante una lección privada.",
    formular: {
      action: "https://api.web3forms.com/submit",
      accessKey: "aaa027db-e72d-41d2-9b3b-7603e4908475",
      weiterleitung: "https://florianingerl.github.io/formsubmissionconfirmation.html",
      botcheck: true,
      name: "Tu nombre",
      mail: "Tu email",
      betreff: "Asunto",
      nachricht: "Mensaje",
      knopf: "Enviar mensaje",
    },
  },
  fuss: { telefon: "Teléfono:", telefonnummer: florian.telefonnummer, mailadresse: florian.mailadresse, sozial: true },
  // das Schachrätsel kennt kein Spanisch und zeigt hier wie bisher Deutsch
  schach: "de",
  abschnitte: [
    Nachhilfeangebot, MatheUni, InfoUni, PhysikUni, Ingenieurwesen,
    MatheSchule, PhysikSchule, InfoSchule, Deutsch, Englisch,
    Ernaehrung, Bewusstsein, Schach, WebsitenUndFlyer,
    Preise, MethodeEnseignement, Online, UeberMich,
  ],
};

export default es;
