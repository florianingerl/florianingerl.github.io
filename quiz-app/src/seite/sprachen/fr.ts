import type { Seite } from "./index";
import { florian } from "./florian";
import Nachhilfeangebot from "../abschnitte/fr/Nachhilfeangebot.vue";
import MatheUni from "../abschnitte/fr/MatheUni.vue";
import InfoUni from "../abschnitte/fr/InfoUni.vue";
import PhysikUni from "../abschnitte/fr/PhysikUni.vue";
import Ingenieurwesen from "../abschnitte/fr/Ingenieurwesen.vue";
import MatheSchule from "../abschnitte/fr/MatheSchule.vue";
import PhysikSchule from "../abschnitte/fr/PhysikSchule.vue";
import InfoSchule from "../abschnitte/fr/InfoSchule.vue";
import Deutsch from "../abschnitte/fr/Deutsch.vue";
import Englisch from "../abschnitte/fr/Englisch.vue";
import Ernaehrung from "../abschnitte/fr/Ernaehrung.vue";
import Bewusstsein from "../abschnitte/fr/Bewusstsein.vue";
import Schach from "../abschnitte/fr/Schach.vue";
import WebsitenUndFlyer from "../abschnitte/fr/WebsitenUndFlyer.vue";
import Preise from "../abschnitte/fr/Preise.vue";
import Tutorium from "../abschnitte/fr/Tutorium.vue";
import MethodeEnseignement from "../abschnitte/fr/MethodeEnseignement.vue";
import Online from "../abschnitte/fr/Online.vue";
import UeberMich from "../abschnitte/fr/UeberMich.vue";

// Französische Startseite (indexfranz.html)
const fr: Seite = {
  logo: "Demande\u00a0à Florian!",
  knopf: "Écris-moi un message",
  heroBild: "assets/img/AnnonceMathsAvecLaTete.png",
  flaggen: florian.flaggen,
  menue: [
    {
      titel: "Université",
      ziel: "#matheuni",
      eintraege: [
        { titel: "Mathématique", ziel: "#matheuni" },
        { titel: "Informatique", ziel: "#infouni" },
        { titel: "Physique", ziel: "#physikuni" },
        { titel: "Sciences d'ingénieur", ziel: "#ingenieurwesen" },
      ],
    },
    {
      titel: "Lycée",
      ziel: "#matheschule",
      eintraege: [
        { titel: "Mathématique", ziel: "#matheschule" },
        { titel: "Physique", ziel: "#physikschule" },
        { titel: "Informatique", ziel: "#infoschule" },
        { titel: "Allemand", ziel: "#deutsch" },
        { titel: "Anglais", ziel: "#englisch" },
      ],
    },
    {
      titel: "Vie",
      ziel: "#ernaehrung",
      eintraege: [
        { titel: "Nourriture", ziel: "#ernaehrung" },
        { titel: "Conscience", ziel: "#bewusstsein" },
        { titel: "Échec", ziel: "#schach" },
        { titel: "Websites", ziel: "#websitenundflyer" },
      ],
    },
    {
      titel: "Prix et d'autres infos",
      ziel: "#preise",
      eintraege: [
        { titel: "Prix, rendez-vous et paiement", ziel: "#preise" },
        { titel: "Méthode d'enseignement", ziel: "#methodeenseignement" },
        { titel: "Cours particuliers en groupe", ziel: "#tutorium" },
        { titel: "Cours particuliers en ligne", ziel: "#online" },
      ],
    },
    { titel: "Sur moi", ziel: "#uebermich", eintraege: [] },
  ],
  kontakt: {
    karteHoehe: "200px",
    karte: florian.karte,
    adresse: "Adresse:",
    email: "Email:",
    strasse: florian.strasse,
    ort: florian.ort,
    mailadresse: florian.mailadresse,
    absatz:
      "Tu peux utiliser cette formulaire pour me contacter, mais il est préférable si tu me contactes via e-mail et si tu m'envoies assez d'exercices dont on peut parler pendant un cours particulier.",
    formular: {
      action: "https://api.web3forms.com/submit",
      accessKey: "aaa027db-e72d-41d2-9b3b-7603e4908475",
      weiterleitung: "https://florianingerl.github.io/formsubmissionconfirmation.html",
      botcheck: true,
      name: "Ton nom",
      mail: "Ton Email",
      betreff: "Subject",
      nachricht: "Message",
      knopf: "Envoie-moi le message!",
    },
  },
  fuss: { telefon: "Téléphone:", telefonnummer: florian.telefonnummer, mailadresse: florian.mailadresse, sozial: true },
  schach: "fr",
  abschnitte: [
    Nachhilfeangebot, MatheUni, InfoUni, PhysikUni, Ingenieurwesen,
    MatheSchule, PhysikSchule, InfoSchule, Deutsch, Englisch,
    Ernaehrung, Bewusstsein, Schach, WebsitenUndFlyer,
    Preise, Tutorium, MethodeEnseignement, Online, UeberMich,
  ],
};

export default fr;
