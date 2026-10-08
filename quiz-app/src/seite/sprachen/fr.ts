import type { Nachrichten, Seite } from "./index";
import { florian } from "./florian";
import Nachhilfeangebot from "../organisms/fr/Nachhilfeangebot.vue";
import MatheUni from "../organisms/fr/MatheUni.vue";
import InfoUni from "../organisms/fr/InfoUni.vue";
import PhysikUni from "../organisms/fr/PhysikUni.vue";
import Ingenieurwesen from "../organisms/fr/Ingenieurwesen.vue";
import MatheSchule from "../organisms/fr/MatheSchule.vue";
import PhysikSchule from "../organisms/fr/PhysikSchule.vue";
import InfoSchule from "../organisms/fr/InfoSchule.vue";
import Deutsch from "../organisms/fr/Deutsch.vue";
import Englisch from "../organisms/fr/Englisch.vue";
import Ernaehrung from "../organisms/fr/Ernaehrung.vue";
import Bewusstsein from "../organisms/fr/Bewusstsein.vue";
import Schach from "../organisms/fr/Schach.vue";
import WebsitenUndFlyer from "../organisms/fr/WebsitenUndFlyer.vue";
import Preise from "../organisms/fr/Preise.vue";
import Tutorium from "../organisms/fr/Tutorium.vue";
import MethodeEnseignement from "../organisms/fr/MethodeEnseignement.vue";
import Online from "../organisms/fr/Online.vue";
import UeberMich from "../organisms/fr/UeberMich.vue";

// Französische Startseite (indexfranz.html)
const fr: Seite = {
  heroBild: "assets/img/AnnonceMathsAvecLaTete.png",
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
    strasse: florian.strasse,
    ort: florian.ort,
    mailadresse: florian.mailadresse,
    formular: {
      action: "https://api.web3forms.com/submit",
      accessKey: "aaa027db-e72d-41d2-9b3b-7603e4908475",
      weiterleitung: "https://florianingerl.github.io/formsubmissionconfirmation.html",
      botcheck: true,
    },
  },
  fuss: { telefonnummer: florian.telefonnummer, mailadresse: florian.mailadresse, sozial: true },
  schach: "fr",
  abschnitte: [
    Nachhilfeangebot, MatheUni, InfoUni, PhysikUni, Ingenieurwesen,
    MatheSchule, PhysikSchule, InfoSchule, Deutsch, Englisch,
    Ernaehrung, Bewusstsein, Schach, WebsitenUndFlyer,
    Preise, Tutorium, MethodeEnseignement, Online, UeberMich,
  ],
};

// Oberflächentexte dieser Sprache, vue-i18n reicht sie per t("...") an die Bausteine
export const nachrichten: Nachrichten = {
  titel: "Demande à Florian - Cours particuliers pour l'université ou l'lycée en mathématiques, physique, informatique, anglais et allemand",
  logo: "Demande\u00a0à Florian!",
  knopf: "Écris-moi un message",
  kontakt: { adresse: "Adresse:", email: "Email:", absatz: "Tu peux utiliser cette formulaire pour me contacter, mais il est préférable si tu me contactes via e-mail et si tu m'envoies assez d'exercices dont on peut parler pendant un cours particulier." },
  formular: {
    name: "Ton nom",
    mail: "Ton Email",
    betreff: "Subject",
    nachricht: "Message",
    knopf: "Envoie-moi le message!",
  },
  fuss: { telefon: "Téléphone:" },
};

export default fr;
