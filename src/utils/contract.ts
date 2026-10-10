import { jsPDF } from "jspdf";
import type { AppLocale } from "@/i18n";

// ---------------------------------------------------------------------------
// Daten, die der Schueler im Dialog eingibt. Die Haeuser werden im Vertrag
// durch die Platzhalter <...> des Mustervertrags ersetzt.
// ---------------------------------------------------------------------------
export interface ContractFields {
  firstName: string;
  lastName: string;
  address: string;
  subject: string;
  goal: string;
  institution: string;
  date: string;
  price: number;
}

// Eine Zeile des Vertrags. Der Text darf **fett** enthalten (Markdown-Stil),
// die Ausgabefunktionen wandeln das in fette Schrift um.
export interface ContractBlock {
  kind: "title" | "heading" | "para" | "item" | "sig";
  text: string;
}

// Schriftgroessen (Mustervertrag 3): Titel 18 pt, Ueberschriften 16.5 pt,
// Fliesstext 12 pt. Der Zeilenabstand ist immer grosszuegig (>= 1.5 Zeilen),
// damit keine Zeile die naechste ueberlappt.
const FS_TITLE = 18;
const FS_HEADING = 16.5;
const FS_BODY = 12;

// ---------------------------------------------------------------------------
// Sprachen: erkennt, ob ein Fach eine Sprache ist (fuer den guenstigeren Preis).
// Die Namen werden in allen Sprachen der Website erkannt, Gross-/Kleinschreibung
// und Akzente spielen keine Rolle.
// ---------------------------------------------------------------------------
const LANGUAGE_TERMS = [
  "franc",
  "franz",
  "french",
  "francais",
  "engl",
  "angl",
  "english",
  "spanisch",
  "spanish",
  "espan",
  "espagn",
  "ital",
  "italien",
  "italiano",
  "deutsch",
  "german",
  "allemand",
  "tedesco",
  "aleman",
];

function ohneAkzente(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function isALangue(fach: string): boolean {
  const f = ohneAkzente(fach);
  return LANGUAGE_TERMS.some((term) => f.includes(term));
}

// ---------------------------------------------------------------------------
// Preisberechnung
//   Preis = Wochen bis zur Pruefung (Gleitkommazahl) *
//           (isALangue(fach) ? 3*15 : 3*30) + 100
// Die 100 Euro am Ende sind das Risiko-Entgelt: falls der Schueler sein Ziel
// nicht erreicht, muss ich das Geld zurueckzahlen. Die Formel geht von 3
// Nachhilfestunden a 60 min pro Woche aus - eine grobe Richtlinie, nicht fix.
// ---------------------------------------------------------------------------
export interface PriceResult {
  weeks: number;
  isLanguage: boolean;
  price: number;
}

export function weeksUntilExam(
  examDate: string,
  today: Date = new Date()
): number {
  if (!examDate) return 0;
  const exam = new Date(examDate + "T00:00:00");
  if (Number.isNaN(exam.getTime())) return 0;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = exam.getTime() - start.getTime();
  return Math.max(0, diffMs / (7 * 24 * 60 * 60 * 1000));
}

export function computePrice(
  subject: string,
  examDate: string,
  today: Date = new Date()
): PriceResult {
  const weeks = weeksUntilExam(examDate, today);
  const isLanguage = isALangue(subject);
  const ratePerWeek = isLanguage ? 3 * 15 : 3 * 30;
  const price = Math.round(weeks * ratePerWeek + 100);
  return { weeks, isLanguage, price };
}

// ---------------------------------------------------------------------------
// Vertragstexte in allen Sprachen - orientiert am formatierten Mustervertrag 3.
// Fett wird gelassen, was im Mustervertrag fett ist (Platzhalter und die
// Felder der Unterschriften), **...** kennzeichnet Fettschrift.
// ---------------------------------------------------------------------------
const EURO = (n: number): string => `${n} €`;

type Builder = (f: ContractFields) => ContractBlock[];

const BLANK = "__".repeat(13);
const BLANK_ADRESSE = "__".repeat(28);
const BLANK_SIGN = "__".repeat(22);

function sigSchueler(f: ContractFields): ContractBlock[] {
  return [
    { kind: "sig", text: `**Vorname:** ${f.firstName.trim() || BLANK}` },
    { kind: "sig", text: `**Nachname:** ${f.lastName.trim() || BLANK}` },
    { kind: "sig", text: `**Adresse:** ${f.address.trim() || BLANK_ADRESSE}` },
  ];
}

const CONTRACT_BUILDERS: Record<AppLocale, Builder> = {
  de: (f) => {
    const fn = f.firstName.trim() || "…";
    return [
      {
        kind: "title",
        text: `Vertrag für ein Alles-oder-Nichts-Paket zwischen ${fn} und Florian`,
      },
      { kind: "para", text: `Hallo **${fn}**,` },
      {
        kind: "para",
        text: "im Folgenden schreibe ich dir meine Bedingungen für das Alles-oder-Nichts-Paket.",
      },
      { kind: "heading", text: "1. Leistung und Preis" },
      {
        kind: "para",
        text:
          `Das Paket kostet dich **${EURO(f.price)}**. Das Geld ist im Voraus zu bezahlen. ` +
          `Dafür bereiten wir uns mit 60-minütigen Nachhilfestunden auf die **${f.subject}**-Prüfung ` +
          `der **${f.institution}** am **${f.date}** vor. Du erhältst so viele Stunden, wie du ` +
          `brauchst; 2–6 Stunden pro Woche bis zur Klausur sind eine grobe Richtlinie.`,
      },
      { kind: "heading", text: "2. Rückzahlung" },
      {
        kind: "para",
        text:
          `Nur in einem einzigen Fall bin ich verpflichtet, das Geld zurückzuzahlen: Du zeigst mir ` +
          `Bilder der korrigierten Prüfung mit dem nicht erreichten Ziel (**${f.goal}**) aus der ` +
          `Einsicht.`,
      },
      {
        kind: "para",
        text: "Insbesondere ist das Geld fällig und wird nicht zurückgezahlt, wenn:",
      },
      {
        kind: "item",
        text: "du aus irgendeinem Grund (Krankheit etc.) nicht zur Prüfung antrittst;",
      },
      {
        kind: "item",
        text: `du die Prüfung schreibst, dein Ziel (**${f.goal}**) nicht erreichst und dann keine Bilder von der Einsicht liefern kannst;`,
      },
      {
        kind: "item",
        text:
          "auf den Bildern der korrigierten Prüfung mit dem nicht erreichten Ziel das Datum, " +
          "der Name oder die Schule/Hochschule/Universität nicht sichtbar sind, sodass es sich um " +
          "eine andere Prüfung handeln könnte;",
      },
      {
        kind: "item",
        text:
          "auf den Bildern der Einsicht nicht sichtbar ist, dass du versucht hast, die Aufgaben zu " +
          "lösen (d. h. es ist nicht möglich, sich krank zur Prüfung zu schleppen, nur den Namen " +
          "darauf zu schreiben und dann Bilder leerer Seiten zu schicken).",
      },
      { kind: "heading", text: "3. Absagen und Nichterscheinen" },
      {
        kind: "para",
        text:
          "Jedes Absagen oder Nichterscheinen bei einem gemeinsam vereinbarten 60-minütigen " +
          "Nachhilfetermin ist mit 30 Euro extra zu bezahlen.",
      },
      {
        kind: "para",
        text:
          "Wird spätestens die zweite Fehlstunde nicht extra bezahlt, kann ich entscheiden, die " +
          "bisherigen Stunden mit jeweils 30 Euro abzurechnen, das Paket zu stornieren und das " +
          "restliche Geld zurückzusenden oder die Zusammenarbeit trotzdem fortzusetzen.",
      },
      { kind: "heading", text: "4. Stornierung" },
      {
        kind: "para",
        text:
          `Eine Stornierung von deiner Seite nach Zahlung des Geldes ist nicht möglich. Das ganze ` +
          `Geld gibt es nur zurück, wenn Bilder der korrigierten Prüfung mit dem nicht erreichten ` +
          `Ziel (**${f.goal}**) aus der Einsicht geliefert werden (siehe oben).`,
      },
      {
        kind: "para",
        text:
          "Eine Stornierung meinerseits ist jederzeit durch Rücküberweisung des vollen Betrags " +
          "möglich. Ausgenommen ist der oben beschriebene Fall mit mehr als zwei nicht extra " +
          "bezahlten Fehlstunden.",
      },
      { kind: "heading", text: "5. Annahme des Vertrags" },
      {
        kind: "para",
        text:
          "Durch Überweisung des Geldes und Rücksendung dieses Dokuments mit Unterschrift " +
          "akzeptierst du diese Bedingungen. Wenn ich den Vertrag ebenfalls akzeptiere, werde ich " +
          "ihn dir unterschrieben zurücksenden. Andernfalls lehne ich den Vertrag durch " +
          "Rücküberweisung des Geldes ab.",
      },
      { kind: "para", text: "Mit freundlichen Grüßen" },
      { kind: "para", text: "Florian Ingerl" },
      { kind: "heading", text: "6. Angaben und Unterschriften" },
      { kind: "para", text: "**Schüler:**" },
      ...sigSchueler(f),
      {
        kind: "para",
        text:
          `Ich akzeptiere die oben genannten Bedingungen des Alles-oder-Nichts-Lernpakets für die ` +
          `Prüfung am **${f.date}** in **${f.subject}** an der **${f.institution}**.`,
      },
      { kind: "sig", text: `**Unterschrift des Schülers:** ${BLANK_SIGN}` },
      { kind: "para", text: "**Lehrer:**" },
      { kind: "sig", text: "**Vorname:** Florian" },
      { kind: "sig", text: "**Nachname:** Ingerl" },
      { kind: "sig", text: "**Adresse:** Rainerstraße 6a, 82178 Puchheim" },
      { kind: "sig", text: `**Unterschrift des Lehrers:** ${BLANK_SIGN}` },
    ];
  },

  en: (f) => {
    const fn = f.firstName.trim() || "…";
    return [
      {
        kind: "title",
        text: `Contract for an all-or-nothing package between ${fn} and Florian`,
      },
      { kind: "para", text: `Hello **${fn}**,` },
      {
        kind: "para",
        text: "below I set out my terms for the all-or-nothing package.",
      },
      { kind: "heading", text: "1. Service and price" },
      {
        kind: "para",
        text:
          `The package will cost you **${EURO(f.price)}**. The money must be paid in advance. In ` +
          `return, we prepare with 60-minute tutoring sessions for the **${f.subject}** exam at ` +
          `**${f.institution}** on **${f.date}**. You receive as many hours as you need; ` +
          `2–6 hours per week until the exam is a rough guideline.`,
      },
      { kind: "heading", text: "2. Refund" },
      {
        kind: "para",
        text:
          `Only in one single case am I obliged to refund the money: you show me pictures of the ` +
          `corrected exam with the goal not reached (**${f.goal}**) from the exam inspection.`,
      },
      {
        kind: "para",
        text: "In particular, the money is due and will not be refunded if:",
      },
      {
        kind: "item",
        text: "you do not sit the exam for any reason (illness, etc.);",
      },
      {
        kind: "item",
        text: `you sit the exam, do not reach your goal (**${f.goal}**) and then cannot provide pictures from the inspection;`,
      },
      {
        kind: "item",
        text:
          "the date, the name or the school/college/university are not visible on the pictures of " +
          "the corrected exam with the goal not reached, so that it could be a different exam;",
      },
      {
        kind: "item",
        text:
          "the pictures from the inspection do not show that you tried to solve the tasks (that " +
          "is, it is not possible to drag yourself to the exam while ill, only write your name on " +
          "it and then send pictures of blank pages).",
      },
      { kind: "heading", text: "3. Cancellations and non-appearance" },
      {
        kind: "para",
        text:
          "Every cancellation or non-appearance at a mutually agreed 60-minute tutoring " +
          "appointment must be paid extra at 30 euros.",
      },
      {
        kind: "para",
        text:
          "If, at the latest, the second missed session is not paid extra, I may decide to charge " +
          "the hours so far at 30 euros each, cancel the package and refund the remaining money, or " +
          "continue the cooperation anyway.",
      },
      { kind: "heading", text: "4. Cancellation" },
      {
        kind: "para",
        text:
          `Cancellation on your part after payment of the money is not possible. The full money is ` +
          `refunded only if pictures of the corrected exam with the goal not reached (**${f.goal}**) ` +
          `from the inspection are provided (see above).`,
      },
      {
        kind: "para",
        text:
          "Cancellation on my part is possible at any time by transferring back the full amount, " +
          "except for the case described above with more than two sessions not paid extra.",
      },
      { kind: "heading", text: "5. Acceptance of the contract" },
      {
        kind: "para",
        text:
          "By transferring the money and returning this document with your signature, you accept " +
          "these terms. If I also accept the contract, I will return it to you signed. Otherwise I " +
          "decline the contract by transferring the money back.",
      },
      { kind: "para", text: "Kind regards" },
      { kind: "para", text: "Florian Ingerl" },
      { kind: "heading", text: "6. Details and signatures" },
      { kind: "para", text: "**Student:**" },
      { kind: "sig", text: `**First name:** ${f.firstName.trim() || BLANK}` },
      { kind: "sig", text: `**Last name:** ${f.lastName.trim() || BLANK}` },
      { kind: "sig", text: `**Address:** ${f.address.trim() || BLANK_ADRESSE}` },
      {
        kind: "para",
        text:
          `I accept the above terms of the all-or-nothing learning package for the exam on ` +
          `**${f.date}** in **${f.subject}** at **${f.institution}**.`,
      },
      { kind: "sig", text: `**Signature of the student:** ${BLANK_SIGN}` },
      { kind: "para", text: "**Teacher:**" },
      { kind: "sig", text: "**First name:** Florian" },
      { kind: "sig", text: "**Last name:** Ingerl" },
      { kind: "sig", text: "**Address:** Rainerstraße 6a, 82178 Puchheim" },
      { kind: "sig", text: `**Signature of the teacher:** ${BLANK_SIGN}` },
    ];
  },

  fr: (f) => {
    const fn = f.firstName.trim() || "…";
    return [
      {
        kind: "title",
        text: `Contrat pour un forfait tout ou rien entre ${fn} et Florian`,
      },
      { kind: "para", text: `Bonjour **${fn}**,` },
      {
        kind: "para",
        text: "ci-dessous, je t'expose mes conditions pour le forfait tout ou rien.",
      },
      { kind: "heading", text: "1. Prestation et prix" },
      {
        kind: "para",
        text:
          `Le forfait te coûtera **${EURO(f.price)}**. Ce montant doit être payé à l'avance. En ` +
          `échange, nous nous préparons, par des cours particuliers de 60 minutes, à l'examen de ` +
          `**${f.subject}** à **${f.institution}** le **${f.date}**. Tu reçois autant d'heures que ` +
          `nécessaire ; 2 à 6 heures par semaine jusqu'à la copie sont une ligne directrice ` +
          `approximative.`,
      },
      { kind: "heading", text: "2. Remboursement" },
      {
        kind: "para",
        text:
          `Dans un seul cas je suis obligé de rembourser l'argent : tu me montres les photos de la ` +
          `copie corrigée avec l'objectif non atteint (**${f.goal}**) prises lors de la ` +
          `consultation des copies.`,
      },
      {
        kind: "para",
        text: "En particulier, l'argent est dû et ne sera pas remboursé si :",
      },
      {
        kind: "item",
        text: "tu ne te présentes pas à l'examen pour une raison quelconque (maladie, etc.) ;",
      },
      {
        kind: "item",
        text: `tu passes la copie, tu n'atteins pas ton objectif (**${f.goal}**) et tu ne peux ensuite fournir aucune photo de la consultation ;`,
      },
      {
        kind: "item",
        text:
          "la date, le nom ou l'école/collège/université ne sont pas visibles sur les photos de la " +
          "copie corrigée avec l'objectif non atteint, de sorte qu'il pourrait s'agir d'une autre " +
          "copie ;",
      },
      {
        kind: "item",
        text:
          "il ne ressort pas des photos de la consultation que tu as essayé de résoudre les " +
          "exercices (c'est-à-dire qu'il n'est pas possible de se traîner malade à la copie, d'y " +
          "écrire seulement son nom et d'envoyer ensuite les photos des pages blanches).",
      },
      { kind: "heading", text: "3. Annulations et absences" },
      {
        kind: "para",
        text:
          "Chaque annulation ou absence à un rendez-vous de cours de 60 minutes convenu ensemble " +
          "doit être payée en plus, à hauteur de 30 euros.",
      },
      {
        kind: "para",
        text:
          "Si, au plus tard, la deuxième absence n'est pas payée en plus, je peux décider de " +
          "facturer les heures effectuées à 30 euros chacune, d'annuler le forfait et de rembourser " +
          "le reste, ou de poursuivre tout de même la collaboration.",
      },
      { kind: "heading", text: "4. Annulation" },
      {
        kind: "para",
        text:
          `Une annulation de ta part après le paiement du montant n'est pas possible. L'argent ` +
          `n'est entièrement remboursé que si des photos de la copie avec l'objectif non atteint ` +
          `(**${f.goal}**) issues de la consultation sont fournies (voir ci-dessus).`,
      },
      {
        kind: "para",
        text:
          "Une annulation de ma part est possible à tout moment par le virement de retour du " +
          "montant total, à l'exception du cas décrit ci-dessus avec plus de deux absences non " +
          "payées en plus.",
      },
      { kind: "heading", text: "5. Acceptation du contrat" },
      {
        kind: "para",
        text:
          "En virant l'argent et en renvoyant ce document signé, tu acceptes ces conditions. Si " +
          "j'accepte aussi le contrat, je te le renverrai signé. Sinon, je refuse le contrat en " +
          "remboursant l'argent.",
      },
      { kind: "para", text: "Cordialement" },
      { kind: "para", text: "Florian Ingerl" },
      { kind: "heading", text: "6. Informations et signatures" },
      { kind: "para", text: "**Élève :**" },
      { kind: "sig", text: `**Prénom :** ${f.firstName.trim() || BLANK}` },
      { kind: "sig", text: `**Nom :** ${f.lastName.trim() || BLANK}` },
      { kind: "sig", text: `**Adresse :** ${f.address.trim() || BLANK_ADRESSE}` },
      {
        kind: "para",
        text:
          `J'accepte les conditions ci-dessus du forfait tout ou rien pour l'examen du ` +
          `**${f.date}** en **${f.subject}** à **${f.institution}**.`,
      },
      { kind: "sig", text: `**Signature de l'élève :** ${BLANK_SIGN}` },
      { kind: "para", text: "**Enseignant :**" },
      { kind: "sig", text: "**Prénom :** Florian" },
      { kind: "sig", text: "**Nom :** Ingerl" },
      { kind: "sig", text: "**Adresse :** Rainerstraße 6a, 82178 Puchheim" },
      { kind: "sig", text: `**Signature de l'enseignant :** ${BLANK_SIGN}` },
    ];
  },

  es: (f) => {
    const fn = f.firstName.trim() || "…";
    return [
      {
        kind: "title",
        text: `Contrato para un paquete todo o nada entre ${fn} y Florian`,
      },
      { kind: "para", text: `Hola **${fn}**,` },
      {
        kind: "para",
        text: "a continuación te expongo mis condiciones para el paquete todo o nada.",
      },
      { kind: "heading", text: "1. Prestación y precio" },
      {
        kind: "para",
        text:
          `El paquete te costará **${EURO(f.price)}**. Este dinero debe pagarse por adelantado. A ` +
          `cambio, nos preparamos con clases particulares de 60 minutos para el examen de ` +
          `**${f.subject}** en **${f.institution}** el **${f.date}**. Recibes tantas horas como ` +
          `necesites; 2 a 6 horas por semana hasta el examen son una pauta aproximada.`,
      },
      { kind: "heading", text: "2. Reembolso" },
      {
        kind: "para",
        text:
          `Solo en un único caso estoy obligado a devolver el dinero: me muestras las fotos del ` +
          `examen corregido con el objetivo no alcanzado (**${f.goal}**) realizadas en la consulta ` +
          `del examen.`,
      },
      {
        kind: "para",
        text: "En particular, el dinero se debe y no se devolverá si:",
      },
      {
        kind: "item",
        text: "no te presentas al examen por cualquier motivo (enfermedad, etc.);",
      },
      {
        kind: "item",
        text: `haces el examen, no alcanzas tu objetivo (**${f.goal}**) y luego no puedes aportar fotos de la consulta;`,
      },
      {
        kind: "item",
        text:
          "en las fotos del examen corregido con el objetivo no alcanzado no se ven la fecha, el " +
          "nombre o la escuela/colegio/universidad, de modo que podría tratarse de otro examen;",
      },
      {
        kind: "item",
        text:
          "en las fotos de la consulta no se ve que intentaste resolver las tareas (es decir, no " +
          "es posible arrastrarte enfermo al examen, escribir solo tu nombre y luego enviar fotos " +
          "de las páginas en blanco).",
      },
      { kind: "heading", text: "3. Cancelaciones e inasistencias" },
      {
        kind: "para",
        text:
          "Cada cancelación o ausencia en una cita de clase de 60 minutos acordada conjuntamente " +
          "debe pagarse aparte, a razón de 30 euros.",
      },
      {
        kind: "para",
        text:
          "Si, a más tardar, la segunda ausencia no se paga aparte, puedo decidir facturar las " +
          "horas realizadas a 30 euros cada una, cancelar el paquete y devolver el dinero " +
          "restante, o continuar la colaboración de todos modos.",
      },
      { kind: "heading", text: "4. Cancelación" },
      {
        kind: "para",
        text:
          `Una cancelación por tu parte tras el pago del dinero no es posible. El dinero solo se ` +
          `devuelve íntegramente si se aportan fotos del examen corregido con el objetivo no ` +
          `alcanzado (**${f.goal}**) de la consulta (véase arriba).`,
      },
      {
        kind: "para",
        text:
          "Una cancelación por mi parte es posible en cualquier momento devolviendo el importe " +
          "completo, excepto en el caso descrito anteriormente con más de dos ausencias no pagadas " +
          "aparte.",
      },
      { kind: "heading", text: "5. Aceptación del contrato" },
      {
        kind: "para",
        text:
          "Al transferir el dinero y devolver este documento firmado, aceptas estas condiciones. " +
          "Si yo también acepto el contrato, te lo devolveré firmado. De lo contrario, rechazo el " +
          "contrato devolviendo el dinero.",
      },
      { kind: "para", text: "Un saludo" },
      { kind: "para", text: "Florian Ingerl" },
      { kind: "heading", text: "6. Datos y firmas" },
      { kind: "para", text: "**Alumno/a:**" },
      { kind: "sig", text: `**Nombre:** ${f.firstName.trim() || BLANK}` },
      { kind: "sig", text: `**Apellidos:** ${f.lastName.trim() || BLANK}` },
      { kind: "sig", text: `**Dirección:** ${f.address.trim() || BLANK_ADRESSE}` },
      {
        kind: "para",
        text:
          `Acepto las condiciones anteriores del paquete todo o nada para el examen del ` +
          `**${f.date}** de **${f.subject}** en **${f.institution}**.`,
      },
      { kind: "sig", text: `**Firma del alumno/a:** ${BLANK_SIGN}` },
      { kind: "para", text: "**Profesor:**" },
      { kind: "sig", text: "**Nombre:** Florian" },
      { kind: "sig", text: "**Apellidos:** Ingerl" },
      { kind: "sig", text: "**Dirección:** Rainerstraße 6a, 82178 Puchheim" },
      { kind: "sig", text: `**Firma del profesor:** ${BLANK_SIGN}` },
    ];
  },

  it: (f) => {
    const fn = f.firstName.trim() || "…";
    return [
      {
        kind: "title",
        text: `Contratto per un pacchetto tutto o nulla tra ${fn} e Florian`,
      },
      { kind: "para", text: `Ciao **${fn}**,` },
      {
        kind: "para",
        text: "qui di seguito ti scrivo le mie condizioni per il pacchetto tutto o nulla.",
      },
      { kind: "heading", text: "1. Prestazione e prezzo" },
      {
        kind: "para",
        text:
          `Il pacchetto ti costerà **${EURO(f.price)}**. Questo importo va pagato in anticipo. In ` +
          `cambio ci prepariamo, con lezioni di 60 minuti, all'esame di **${f.subject}** presso ` +
          `**${f.institution}** il **${f.date}**. Ricevi tutte le ore di cui hai bisogno; ` +
          `2–6 ore a settimana fino alla prova sono una linea guida approssimativa.`,
      },
      { kind: "heading", text: "2. Rimborso" },
      {
        kind: "para",
        text:
          `In un solo caso sono obbligato a rimborsare il denaro: mi mostri le foto della prova ` +
          `corretta con l'obiettivo non raggiunto (**${f.goal}**) scattate durante la ` +
          `consultazione delle prove.`,
      },
      {
        kind: "para",
        text: "In particolare, il denaro è dovuto e non verrà rimborsato se:",
      },
      {
        kind: "item",
        text: "non ti presenti all'esame per qualsiasi motivo (malattia, ecc.);",
      },
      {
        kind: "item",
        text: `sostieni la prova, non raggiungi il tuo obiettivo (**${f.goal}**) e poi non puoi fornire foto della consultazione;`,
      },
      {
        kind: "item",
        text:
          "nelle foto della prova corretta con l'obiettivo non raggiunto non sono visibili la " +
          "data, il nome o la scuola/college/università, cosicché potrebbe trattarsi di un'altra " +
          "prova;",
      },
      {
        kind: "item",
        text:
          "dalle foto della consultazione non risulta che hai provato a risolvere gli esercizi " +
          "(cioè non è possibile trascinarti malato alla prova, scriverci solo il tuo nome e poi " +
          "inviare le foto delle pagine vuote).",
      },
      { kind: "heading", text: "3. Disdette e assenze" },
      {
        kind: "para",
        text:
          "Ogni disdetta o assenza a un appuntamento di lezione di 60 minuti concordato insieme va " +
          "pagata in aggiunta, a 30 euro.",
      },
      {
        kind: "para",
        text:
          "Se al più tardi la seconda assenza non viene pagata in aggiunta, posso decidere di " +
          "fatturare le ore svolte a 30 euro ciascuna, annullare il pacchetto e restituire il " +
          "denaro rimanente, oppure proseguire comunque la collaborazione.",
      },
      { kind: "heading", text: "4. Annullamento" },
      {
        kind: "para",
        text:
          `Un annullamento da parte tua dopo il pagamento del denaro non è possibile. Il denaro ` +
          `viene restituito per intero solo se vengono fornite foto della prova corretta con ` +
          `l'obiettivo non raggiunto (**${f.goal}**) tratte dalla consultazione (vedi sopra).`,
      },
      {
        kind: "para",
        text:
          "Un annullamento da parte mia è possibile in qualsiasi momento tramite la restituzione " +
          "dell'intero importo, fatta eccezione per il caso sopra descritto con più di due assenze " +
          "non pagate in aggiunta.",
      },
      { kind: "heading", text: "5. Accettazione del contratto" },
      {
        kind: "para",
        text:
          "Con il pagamento del denaro e la restituzione di questo documento firmato accetti " +
          "queste condizioni. Se accetto anch'io il contratto, te lo restituirò firmato. In caso " +
          "contrario, rifiuto il contratto restituendo il denaro.",
      },
      { kind: "para", text: "Cordiali saluti" },
      { kind: "para", text: "Florian Ingerl" },
      { kind: "heading", text: "6. Dati e firme" },
      { kind: "para", text: "**Studente/studentessa:**" },
      { kind: "sig", text: `**Nome:** ${f.firstName.trim() || BLANK}` },
      { kind: "sig", text: `**Cognome:** ${f.lastName.trim() || BLANK}` },
      { kind: "sig", text: `**Indirizzo:** ${f.address.trim() || BLANK_ADRESSE}` },
      {
        kind: "para",
        text:
          `Accetto le condizioni di cui sopra del pacchetto tutto o nulla per l'esame del ` +
          `**${f.date}** in **${f.subject}** presso **${f.institution}**.`,
      },
      { kind: "sig", text: `**Firma dello studente/della studentessa:** ${BLANK_SIGN}` },
      { kind: "para", text: "**Insegnante:**" },
      { kind: "sig", text: "**Nome:** Florian" },
      { kind: "sig", text: "**Cognome:** Ingerl" },
      { kind: "sig", text: "**Indirizzo:** Rainerstraße 6a, 82178 Puchheim" },
      { kind: "sig", text: `**Firma dell'insegnante:** ${BLANK_SIGN}` },
    ];
  },
};

export function buildContract(
  lang: AppLocale,
  fields: ContractFields
): ContractBlock[] {
  return CONTRACT_BUILDERS[lang](fields);
}

// ---------------------------------------------------------------------------
// Ausgabe: HTML (fuer Word), RTF und PDF - mit **fett**-Unterstuetzung.
// Zeilenabstaende sind immer grosszuegig gewaehlt, damit nichts ueberlappt.
// ---------------------------------------------------------------------------
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineHtml(s: string): string {
  return escapeHtml(s)
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export function contractToHtml(blocks: ContractBlock[]): string {
  const body = blocks
    .map((b) => {
      if (b.kind === "title") return `<h1>${inlineHtml(b.text)}</h1>`;
      if (b.kind === "heading") return `<p class="heading">${inlineHtml(b.text)}</p>`;
      if (b.kind === "item") return `<p class="item">&#8226;&nbsp;&nbsp;${inlineHtml(b.text)}</p>`;
      if (b.kind === "sig") return `<p class="sig">${inlineHtml(b.text)}</p>`;
      return `<p>${inlineHtml(b.text)}</p>`;
    })
    .join("\n");
  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>Alles-oder-Nichts-Paket</title>
<style>
  body { font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.6; color: #000; }
  h1 { font-size: 18pt; font-weight: bold; text-align: center; margin: 0 0 14pt 0; }
  p { margin: 0 0 10pt 0; text-align: justify; }
  p.heading { font-size: 16.5pt; font-weight: bold; margin: 14pt 0 8pt 0; text-align: left; }
  p.item { margin-left: 20pt; }
  p.sig { margin: 14pt 0; }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

function escapeRtf(s: string): string {
  let out = "";
  for (const ch of s) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === "\\") out += "\\\\";
    else if (ch === "{") out += "\\{";
    else if (ch === "}") out += "\\}";
    else if (ch === "\n") out += "\\line ";
    else if (code > 127) {
      const signed = code > 32767 ? code - 65536 : code;
      out += `\\u${signed}?`;
    } else out += ch;
  }
  return out;
}

function inlineRtf(s: string): string {
  const re = /\*\*(.+?)\*\*/g;
  let out = "";
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    out += escapeRtf(s.slice(last, m.index));
    out += `\\b ${escapeRtf(m[1])}\\b0 `;
    last = re.lastIndex;
  }
  out += escapeRtf(s.slice(last));
  return out;
}

// Zeilenabstand als Vielfaches der Einzelzeile (240 = eine Zeile). Grosszuegig
// gewaehlt (1.5x), damit sich Zeilen nie ueberlappen.
const SL_BODY = "\\sl360\\slmult1";
const SL_HEADING = "\\sl460\\slmult1";
const SL_TITLE = "\\sl520\\slmult1";

export function contractToRtf(blocks: ContractBlock[]): string {
  const header =
    "{\\rtf1\\ansi\\ansicpg1252\\deff0" +
    "{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}}" +
    "{\\colortbl;\\red0\\green0\\blue0;\\red255\\green0\\blue0;}";
  const content = blocks
    .map((b) => {
      const text = inlineRtf(b.text);
      if (b.kind === "title") {
        return `\\pard\\qc\\sa240\\sb120 ${SL_TITLE}\\f0\\fs${FS_TITLE * 2}\\b ${text}\\b0\\par`;
      }
      if (b.kind === "heading") {
        return `\\pard\\qj\\sa200\\sb200 ${SL_HEADING}\\f0\\fs${FS_HEADING * 2}\\b ${text}\\b0\\par`;
      }
      if (b.kind === "item") {
        return `\\pard\\li720\\fi-360\\sa120 ${SL_BODY}\\f0\\fs${FS_BODY * 2} \\bullet  ${text}\\par`;
      }
      if (b.kind === "sig") {
        return `\\pard\\sa180 ${SL_BODY}\\f0\\fs${FS_BODY * 2} ${text}\\par`;
      }
      return `\\pard\\qj\\sa180 ${SL_BODY}\\f0\\fs${FS_BODY * 2} ${text}\\par`;
    })
    .join("\n");
  return `${header}\n${content}\n}`;
}

// ---------------------------------------------------------------------------
// PDF: Zeilen ziehen sich beim Umbrechen mit, fette Teilstuecke werden in der
// Schrift "times bold" gesetzt. Zeilenabstand = 1.5x Schriftgroesse.
// ---------------------------------------------------------------------------
interface StyledWord {
  w: string;
  bold: boolean;
}

function parseStyledWords(s: string): StyledWord[] {
  const words: StyledWord[] = [];
  const add = (seg: string, bold: boolean): void => {
    const parts = seg.split(" ");
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] !== "") words.push({ w: parts[i], bold });
      if (i < parts.length - 1) words.push({ w: " ", bold });
    }
  };
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    add(s.slice(last, m.index), false);
    add(m[1], true);
    last = re.lastIndex;
  }
  add(s.slice(last), false);
  return words;
}

export function createContractPdf(
  blocks: ContractBlock[],
  title: string
): Blob {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 60;
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const maxW = pw - margin * 2;
  const bottom = ph - margin;
  let y = margin;

  doc.setProperties({ title: title.replace(/\*\*/g, "") });

  const lineHeight = (fs: number): number => Math.ceil(fs * 1.5);

  const drawParagraph = (
    text: string,
    opts: { fontSize?: number; bold?: boolean; center?: boolean } = {}
  ): void => {
    const fs = opts.fontSize ?? FS_BODY;
    const lh = lineHeight(fs);
    doc.setFont("times", opts.bold ? "bold" : "normal");
    doc.setFontSize(fs);

    if (opts.center) {
      const wrapped = doc.splitTextToSize(text, maxW);
      const txtH = wrapped.length * lh;
      if (y + txtH > bottom) {
        doc.addPage();
        y = margin;
      }
      doc.text(wrapped, pw / 2, y, { align: "center" });
      y += txtH + 12;
      return;
    }

    const spaceW = doc.getTextWidth(" ");
    let x = margin;
    const right = margin + maxW;
    for (const line of text.split("\n")) {
      if (line.trim() === "") {
        y += lh;
        continue;
      }
      x = margin;
      for (const w of parseStyledWords(line)) {
        doc.setFont("times", w.bold ? "bold" : "normal");
        doc.setFontSize(fs);
        const wordW = doc.getTextWidth(w.w + " ");
        if (w.w !== " " && x + wordW > right) {
          x = margin;
          y += lh;
          if (y > bottom) {
            doc.addPage();
            y = margin;
            x = margin;
          }
        }
        if (w.w !== " ") {
          doc.text(w.w, x, y);
          x += doc.getTextWidth(w.w) + spaceW;
        } else {
          x += spaceW;
        }
      }
      y += 3;
    }
    y += 6;
  };

  for (const b of blocks) {
    if (b.kind === "title") {
      drawParagraph(b.text, { fontSize: FS_TITLE, bold: true, center: true });
    } else if (b.kind === "heading") {
      drawParagraph(b.text, { fontSize: FS_HEADING, bold: true });
      y += 4;
    } else {
      drawParagraph((b.kind === "item" ? "\u2022  " : "") + b.text);
      if (b.kind === "sig") y += 6;
    }
  }

  return doc.output("blob");
}

// ---------------------------------------------------------------------------
// Datei-Download. Chrome blockiert blob-Downloads unter Umstaenden mit
// "Du musst die Berechtigung haben, um diese Datei herunterzuladen" (z. B.
// wenn die automatischen Downloads der Seite blockiert sind, oder weil die
// blob-URL zu frueh widerrufen wird). Deshalb bevorzugen wir die File System
// Access API (nativer "Speichern unter"-Dialog), die nicht am Download-System
// haengt, und fallen sonst auf den klassischen Anchor-Download zurueck.
// ---------------------------------------------------------------------------
interface SaveFilePickerHandle {
  createWritable: () => Promise<{
    write: (data: Blob) => Promise<void>;
    close: () => Promise<void>;
  }>;
}

type SaveFilePicker = (options: {
  suggestedName?: string;
  types?: { description: string; accept: Record<string, string[]> }[];
}) => Promise<SaveFilePickerHandle>;

const MIME_BY_EXT: Record<string, { mime: string; description: string }> = {
  pdf: { mime: "application/pdf", description: "PDF-Dokument" },
  doc: { mime: "application/msword", description: "Word-Dokument" },
  rtf: { mime: "application/rtf", description: "RTF-Dokument" },
};

export async function downloadBlob(blob: Blob, filename: string): Promise<void> {
  const picker = (window as unknown as { showSaveFilePicker?: SaveFilePicker }).showSaveFilePicker;
  if (typeof picker === "function") {
    const ext = filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();
    const info = MIME_BY_EXT[ext];
    const types = info ? [{ description: info.description, accept: { [info.mime]: ["." + ext] } }] : undefined;
    try {
      const handle = await picker.call(window, { suggestedName: filename, types });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      // Abbruch durch den Nutzer: nichts weiter tun.
      if (err instanceof DOMException && err.name === "AbortError") return;
      // Jeder andere Fehler (API hier nicht erlaubt): klassischer Download.
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Die Objekt-URL darf NICHT synchron widerrufen werden: Chrome startet den
  // Download asynchron und verwirft ihn sonst ("keine Berechtigung").
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export function contractFilename(
  lang: AppLocale,
  date: string,
  ext: string
): string {
  const safeDate = date.replace(/[^0-9-]/g, "") || "ohne-Datum";
  return `Alles-oder-Nichts-Paket_${lang}_${safeDate}.${ext}`;
}