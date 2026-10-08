import type { RouteRecordRaw } from "vue-router";
import VueDict from "./atoms/VueDict.vue";

// Jede Übung wird erst geladen, wenn ihre Adresse aufgerufen wird
export const routen: RouteRecordRaw[] = [
  {
    name: "Mithelfen",
    path: "/mithelfen",
    component: () => import("./pages/Mithelfen.vue"),
  },
  {
    name: "Espagnol",
    path: "/esp/:language",
    component: VueDict,
    children: [
      { name: "Navigation espagnol", path: "", component: () => import("./pages/espagnol/Espagnol.vue") },
      { name: "La négation en espagnol (esp)", path: "negationenespagnol", component: () => import("./pages/espagnol/grammaire/NegationEspagnol.vue") },
      {
        name: "Grammaire espagnol",
        path: "grammaire",
        children: [
          { name: "La négation en espagnol (grammaire)", path: "negationenespagnol", component: () => import("./pages/espagnol/grammaire/NegationEspagnol.vue") },
        ],
      },
    ],
  },
  {
    name: "English",
    path: "/en/:language",
    component: VueDict,
    children: [
      { name: "Navigation english", path: "", component: () => import("./pages/english/English.vue") },
      {
        name: "Vocabulary",
        path: "vocabulary",
        children: [
          { name: "Conjunctions", path: "conjunctions", component: () => import("./pages/english/vocabulary/Conjunctions.vue") },
        ],
      },
      {
        name: "Books",
        path: "books",
        children: [
          { name: "Raw food", path: "rawfood/:page", component: () => import("./pages/english/rawfood/Rawfood.vue") },
          { name: "Fred", path: "fred/:page", component: () => import("./pages/english/books/AnnaStory.vue") },
        ],
      },
      {
        name: "Short stories",
        path: "shortstories",
        children: [
          { name: "The cat detective", path: "thecatdetective", component: () => import("./pages/english/shortstories/AnnaCat.vue") },
          { name: "Lara and her bird", path: "laraandherbird", component: () => import("./pages/english/shortstories/BirdStory.vue") },
          { name: "Advertisement and turtoises", path: "annaturtoises", component: () => import("./pages/english/shortstories/AnnaTurtoise.vue") },
        ],
      },
      {
        name: "Grammar",
        path: "grammar",
        children: [
          { name: "Enough and Too", path: "enoughtoo", component: () => import("./pages/english/grammar/TooEnough.vue") },
          { name: "Even", path: "even", component: () => import("./pages/english/grammar/Even.vue") },
        ],
      },
    ],
  },
  {
    name: "Deutsch",
    path: "/de/:language",
    component: VueDict,
    children: [
      { name: "Navigation deutsch", path: "", component: () => import("./pages/deutsch/Deutsch.vue") },
      {
        name: "Kurzgeschichten",
        path: "kurzgeschichten",
        children: [
          { name: "Ein Vogel und ein Eichhörnchen", path: "vogelundeichhoernchen", component: () => import("./pages/deutsch/kurzgeschichten/VogelUndEichhoernchen.vue") },
          { name: "Eine Katze, die Fisch mag", path: "katzemagfisch", component: () => import("./pages/deutsch/kurzgeschichten/KatzeVanessa.vue") },
          { name: "Mit Vögeln Äpfel teilen", path: "vogelmarcia", component: () => import("./pages/deutsch/kurzgeschichten/MarciaVogel.vue") },
        ],
      },
    ],
  },
  {
    name: "Français",
    path: "/fr/:language",
    component: VueDict,
    children: [
      { name: "Navigation français", path: "", component: () => import("./pages/french/Francais.vue") },
      { name: "La négation en espagnol (fr)", path: "negationenespagnol", component: () => import("./pages/espagnol/grammaire/NegationEspagnol.vue") },
      {
        name: "Brèves histoires",
        path: "breveshistoires",
        children: [
          { name: "Antoine et Fred, meilleurs ami", path: "deuxgamins", component: () => import("./pages/french/breveshistoires/DeuxGamins.vue") },
          { name: "Un renard religeux", path: "renardreligeux", component: () => import("./pages/french/breveshistoires/RenardPoule.vue") },
          { name: "L'histoire d'amour de deux oiseaux", path: "deuxoiseauxamoureux", component: () => import("./pages/french/breveshistoires/MarieDeuxOiseaux.vue") },
          { name: "Monument d'un poisson", path: "monumentpoisson", component: () => import("./pages/french/breveshistoires/MonumentPoisson.vue") },
          { name: "Le lion Simba et sa femme Alexandra", path: "lelionsimba", component: () => import("./pages/french/breveshistoires/HistoireMax.vue") },
          { name: "Antoine et la chasse", path: "antoineetlachasse", component: () => import("./pages/french/breveshistoires/HistoireMax2.vue") },
          { name: "Linda et son oiseau", path: "lindaetsonoiseau", component: () => import("./pages/french/breveshistoires/OiseauLune.vue") },
        ],
      },
      {
        name: "Livres",
        path: "livres",
        children: [
          { name: "Alimentation vivante", path: "alimentation/:page", component: () => import("./pages/french/alimentation/Alimentation1.vue") },
          { name: "Bhagavad Gita", path: "bhagavadgita/:page", component: () => import("./pages/french/alimentation/BagavadGita.vue") },
          { name: "Livre sur Fred", path: "livresurfred/:page", component: () => import("./pages/french/livres/MarieHistoire.vue") },
        ],
      },
      {
        name: "Prononciation",
        path: "prononciation",
        children: [
          { name: "Le son é", path: "sone", component: () => import("./pages/french/prononciation/SonE.vue") },
          { name: "Le son o", path: "sono", component: () => import("./pages/french/prononciation/SonO.vue") },
        ],
      },
      {
        name: "Grammaire",
        path: "grammaire",
        children: [
          { name: "Inversion du sujet et verbe", path: "inversionsujetverbe", component: () => import("./pages/french/grammaire/InversionSujet.vue") },
          { name: "Ne explétif", path: "neexpletif", component: () => import("./pages/french/grammaire/NeExpletif.vue") },
          { name: "Celui, celle, ceux ou celles", path: "celuioucelle", component: () => import("./pages/french/grammaire/CeluiCelle.vue") },
          { name: "Rajouter ou ajouter", path: "rajouterouajouter", component: () => import("./pages/french/grammaire/RajouterOuAjouter.vue") },
          { name: "Pronom en", path: "en", component: () => import("./pages/french/grammaire/PronomEn.vue") },
          { name: "Pronom en mit Mengenwort", path: "enmengenwort", component: () => import("./pages/french/grammaire/PronomEnMengenwort.vue") },
          { name: "Dont ou duquel", path: "dontouduquel", component: () => import("./pages/french/grammaire/DontOuDuquel.vue") },
          { name: "Dont ou duquel - exercice avec des tamis de cresson", path: "dontouduquelcresson", component: () => import("./pages/french/grammaire/DontOuDuquelCresson.vue") },
          { name: "Négation avec ne...ni...ni", path: "nenini", component: () => import("./pages/french/grammaire/NiNi.vue") },
          { name: "Tant ou si", path: "tantousi", component: () => import("./pages/french/grammaire/SiTant.vue") },
          { name: "Du,de ou le temps", path: "dudeouletemps", component: () => import("./pages/french/grammaire/DuDeLeTemps.vue") },
          { name: "En,d'en,dans ou dent", path: "endendansdent", component: () => import("./pages/french/grammaire/EnDenDansDent.vue") },
          { name: "Des autres ou d'autres", path: "autre", component: () => import("./pages/french/grammaire/Autre.vue") },
          { name: "Phrase conditionelle 3", path: "conditionelle3", component: () => import("./pages/french/grammaire/PhraseConditionelle3.vue") },
          { name: "Passe simple", path: "passesimple", component: () => import("./pages/french/grammaire/PasseSimple.vue") },
          { name: "Imparfait ou Plus-que-parfait", path: "imparfaitouplusqueparfait", component: () => import("./pages/french/grammaire/ImparfaitPlusQueParfait.vue") },
          { name: "L'histoire d'un lion - Passé simple ou l'imparfait", path: "lionpassesimpleouimparfait", component: () => import("./pages/french/grammaire/LionPasseSimple.vue") },
        ],
      },
      {
        name: "Vocabulaire",
        path: "vocabulaire",
        children: [
          { name: "Let mot encore", path: "encore", component: () => import("./pages/french/vocabulaire/Encore.vue") },
          { name: "Conduire ou courir à tous les temps et modes", path: "conduireoucourir", component: () => import("./pages/french/vocabulaire/Conduireoucourir.vue") },
          { name: "Connaître ou savoir à présent de l'indicatif", path: "connaitreousavoir", component: () => import("./pages/french/vocabulaire/ConnaitreOuSavoir.vue") },
          { name: "Mettre à présent de l'indicatif", path: "mettre", component: () => import("./pages/french/vocabulaire/Mettre.vue") },
        ],
      },
    ],
  },
  {
    name: "Informatik",
    path: "/informatik",
    children: [
      { name: "Navigation informatik", path: "", component: () => import("./pages/informatik/ComputerScience.vue") },
      { name: "Regular expressions", path: "regex", component: () => import("./pages/informatik/RegexExercises.vue") },
      {
        name: "Regex exercises",
        path: "regexexercises",
        children: [
          { name: "Appending text to text area instead of setting text of label", path: "labelsettexttextareaappend", component: () => import("./pages/informatik/regex/LabelsettextTextareaappend.vue") },
          { name: "Exclamation mark in French", path: "pointdexclamationfr", component: () => import("./pages/informatik/regex/PointDexclamation.vue") },
          { name: "Guillemets en francais", path: "guillemetsfrancais", component: () => import("./pages/informatik/regex/Guillements.vue") },
          { name: "Parentheses en francais", path: "parenthesesfrancais", component: () => import("./pages/informatik/regex/Parentheses.vue") },
        ],
      },
    ],
  },
];
