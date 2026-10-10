import { jsPDF } from "jspdf";
import type { AppLocale } from "@/i18n";

// ---------------------------------------------------------------------------
// Daten, die der Schueler im Dialog eingibt.
// ---------------------------------------------------------------------------
export interface ContractFields {
  name: string;
  subject: string;
  goal: string;
  institution: string;
  date: string;
  price: number;
}

// Eine Zeile des Vertrags. "title" und "item" werden in den Ausgabedateien
// anders formatiert als ein normaler Absatz.
export interface ContractBlock {
  kind: "title" | "para" | "item" | "sig";
  text: string;
}

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
// Vertragstexte in allen Sprachen. Die rot markierten Stellen des Muster-
// vertrags werden hier durch die eingegebenen Daten ersetzt.
// ---------------------------------------------------------------------------
const DATEI_ZU_EURO = (n: number): string => `${n} €`;

type Builder = (f: ContractFields) => ContractBlock[];

function signatureLines(
  labels: {
    firstName: string;
    lastName: string;
    address: string;
    student: string;
    signature: string;
    placeDate: string;
  },
  f: ContractFields
): ContractBlock[] {
  const line =
    "_________________________________________________________________";
  const blocks: ContractBlock[] = [];
  if (f.name.trim() === "") {
    blocks.push({ kind: "sig", text: `${labels.firstName}: ${line}` });
    blocks.push({ kind: "sig", text: `${labels.lastName}: ${line}` });
    blocks.push({ kind: "sig", text: `${labels.address}: ${line}` });
  } else {
    blocks.push({ kind: "sig", text: `${labels.address}: ${f.name}` });
  }
  blocks.push({ kind: "sig", text: `${labels.student}: ${line}` });
  blocks.push({ kind: "sig", text: `${labels.placeDate}: ${line}` });
  return blocks;
}

const CONTRACT_BUILDERS: Record<AppLocale, Builder> = {
  de: (f) => [
    { kind: "title", text: "Bedingungen für das Alles-oder-Nichts-Paket" },
    { kind: "para", text: `Hallo ${f.name.trim() || "…"},` },
    {
      kind: "para",
      text:
        `im Folgenden schreibe ich dir meine Bedingungen für das Alles-oder-Nichts-Paket. ` +
        `Es würde für dich ${DATEI_ZU_EURO(f.price)} kosten. Dieses Geld ist im Voraus zu bezahlen. ` +
        `Dafür bereiten wir uns mit 60-Minuten-Nachhilfestunden auf die Prüfung im Fach ${f.subject} ` +
        `(Ziel: ${f.goal || "Bestehen der Prüfung"}) an der ${f.institution} am ${f.date} vor. ` +
        `Du erhältst so viele Stunden, wie du brauchst; 2–6 Stunden pro Woche bis zur Prüfung sind eine grobe Richtlinie.`,
    },
    {
      kind: "para",
      text:
        `Nur in einem einzigen Fall bin ich verpflichtet, das Geld zurückzuzahlen: ` +
        `Du zeigst mir Bilder der nicht bestandenen, korrigierten Prüfung vom ${f.date} aus der Einsicht.`,
    },
    {
      kind: "para",
      text: "Insbesondere ist das Geld fällig und wird nicht zurückgezahlt, wenn:",
    },
    {
      kind: "item",
      text: "du aus irgendeinem Grund (Krankheit etc.) nicht zur Prüfung antrittst,",
    },
    {
      kind: "item",
      text: "du die Prüfung schreibst, nicht bestehst und dann keine Bilder aus der Einsicht liefern kannst,",
    },
    {
      kind: "item",
      text:
        "auf den Bildern der nicht bestandenen Prüfung Datum, Name sowie Schule/Hochschule/Universität " +
        "nicht sichtbar sind, sodass es sich um eine andere Prüfung handeln könnte, oder",
    },
    {
      kind: "item",
      text:
        "auf den Bildern aus der Einsicht nicht sichtbar ist, dass du die Aufgaben zu lösen versucht hast " +
        "(sich krank zur Prüfung zu schleppen, nur den Namen daraufzuschreiben und die Bilder der leeren " +
        "Seiten zu schicken, genügt nicht).",
    },
    {
      kind: "para",
      text:
        `Jedes Absagen oder Nicht-Erscheinen bei einem gemeinsam vereinbarten 60-minütigen Nachhilfetermin ` +
        `ist mit 30 Euro extra zu bezahlen. Wird spätestens die zweite Fehlstunde nicht extra bezahlt, so ` +
        `kann ich entscheiden, die bisherigen Stunden mit 30 Euro pro Stunde abzurechnen, das Paket zu ` +
        `stornieren und das restliche Geld zurückzusenden oder die Zusammenarbeit trotzdem fortzusetzen.`,
    },
    {
      kind: "para",
      text:
        `Eine Stornierung deinerseits nach Zahlung des Geldes ist nicht möglich. Das ganze Geld gibt es ` +
        `nur zurück, wenn Bilder der nicht bestandenen Prüfung aus der Einsicht geliefert werden (siehe ` +
        `oben). Eine Stornierung meinerseits ist jederzeit möglich durch Rücküberweisung des vollen Betrags ` +
        `(Ausnahme: der obige Fall mit mehr als zwei nicht extra bezahlten Fehlstunden).`,
    },
    {
      kind: "para",
      text:
        `Durch die Überweisung des Geldes und die Rücksendung dieses Dokuments mit Unterschrift akzeptierst ` +
        `du diese Bedingungen. Wenn ich den Vertrag ebenfalls akzeptiere, sende ich ihn dir unterschrieben ` +
        `zurück; andernfalls lehne ich den Vertrag durch Rücküberweisung des Geldes ab.`,
    },
    { kind: "para", text: "Mit freundlichen Grüßen,\nFlorian Ingerl" },
    ...signatureLines(
      {
        firstName: "Vorname",
        lastName: "Nachname",
        address: "Adresse",
        student: "Unterschrift (Schüler/in)",
        signature: "Unterschrift",
        placeDate: "Ort, Datum",
      },
      f
    ),
    {
      kind: "para",
      text:
        `Ich akzeptiere die obigen Bedingungen des Alles-oder-Nichts-Lernpakets für die Prüfung am ` +
        `${f.date} im Fach ${f.subject} (Ziel: ${f.goal || "Bestehen der Prüfung"}) an der ${f.institution}.`,
    },
    {
      kind: "sig",
      text:
        "Unterschrift: _______________________________________________________________",
    },
    {
      kind: "para",
      text: "Unterschrift von Florian Ingerl, Rainerstraße 6a, 82178 Puchheim",
    },
    {
      kind: "sig",
      text:
        "Unterschrift: _______________________________________________________________",
    },
  ],

  en: (f) => [
    { kind: "title", text: "Terms of the all-or-nothing package" },
    { kind: "para", text: `Hello ${f.name.trim() || "…"},` },
    {
      kind: "para",
      text:
        `below I set out my terms for the all-or-nothing package. It would cost you ${DATEI_ZU_EURO(f.price)}. ` +
        `This money must be paid in advance. In return, we prepare with 60-minute tutoring sessions for the ` +
        `exam in ${f.subject} (goal: ${f.goal || "passing the exam"}) at ${f.institution} on ${f.date}. ` +
        `You receive as many hours as you need; 2–6 hours per week until the exam is a rough guideline.`,
    },
    {
      kind: "para",
      text:
        `Only in a single case am I obliged to refund the money: you show me pictures of the failed, ` +
        `corrected exam of ${f.date} from the exam inspection.`,
    },
    {
      kind: "para",
      text: "In particular, the money is due and will not be refunded if:",
    },
    {
      kind: "item",
      text: "you do not sit the exam for any reason (illness, etc.),",
    },
    {
      kind: "item",
      text: "you sit the exam, fail it and then cannot provide pictures from the inspection,",
    },
    {
      kind: "item",
      text:
        "the date, name and school/university are not visible on the pictures of the failed exam, so that " +
        "it could be a different exam, or",
    },
    {
      kind: "item",
      text:
        "the pictures from the inspection do not show that you tried to solve the tasks (dragging yourself " +
        "to the exam while ill, only writing your name on it and sending pictures of the blank pages is not enough).",
    },
    {
      kind: "para",
      text:
        `Every cancellation or non-appearance for a mutually agreed 60-minute tutoring appointment must be ` +
        `paid extra at 30 euros. If, at the latest, the second missed session is not paid extra, I may decide ` +
        `to charge the hours so far at 30 euros per hour, cancel the package and refund the remaining money, ` +
        `or continue the cooperation anyway.`,
    },
    {
      kind: "para",
      text:
        `Cancellation on your part after payment of the money is not possible. The full money is refunded ` +
        `only if pictures of the failed exam from the inspection are provided (see above). Cancellation on ` +
        `my part is possible at any time by transferring back the full amount (exception: the above case ` +
        `with more than two sessions not paid extra).`,
    },
    {
      kind: "para",
      text:
        `By transferring the money and returning this document with your signature, you accept these terms. ` +
        `If I also accept the contract, I will return it to you signed; otherwise I decline the contract by ` +
        `transferring the money back.`,
    },
    { kind: "para", text: "Kind regards,\nFlorian Ingerl" },
    ...signatureLines(
      {
        firstName: "First name",
        lastName: "Last name",
        address: "Address",
        student: "Signature (student)",
        signature: "Signature",
        placeDate: "Place, date",
      },
      f
    ),
    {
      kind: "para",
      text:
        `I accept the above terms of the all-or-nothing learning package for the exam on ${f.date} in ` +
        `${f.subject} (goal: ${f.goal || "passing the exam"}) at ${f.institution}.`,
    },
    {
      kind: "sig",
      text:
        "Signature: _________________________________________________________________",
    },
    {
      kind: "para",
      text: "Signature of Florian Ingerl, Rainerstraße 6a, 82178 Puchheim",
    },
    {
      kind: "sig",
      text:
        "Signature: _________________________________________________________________",
    },
  ],

  fr: (f) => [
    { kind: "title", text: "Conditions du forfait tout ou rien" },
    { kind: "para", text: `Bonjour ${f.name.trim() || "…"},` },
    {
      kind: "para",
      text:
        `ci-dessous, je t'expose mes conditions pour le forfait tout ou rien. Il te coûterait ${DATEI_ZU_EURO(f.price)}. ` +
        `Ce montant doit être payé à l'avance. En échange, nous nous préparons, par des cours particuliers de ` +
        `60 minutes, à l'examen de ${f.subject} (objectif : ${f.goal || "réussir l'examen"}) à ${f.institution} ` +
        `le ${f.date}. Tu reçois autant d'heures que nécessaire ; 2 à 6 heures par semaine jusqu'à l'examen ` +
        `constituent une ligne directrice approximative.`,
    },
    {
      kind: "para",
      text:
        `Dans un seul cas je suis obligé de rembourser l'argent : tu me montres les photos de l'examen raté ` +
        `et corrigé du ${f.date} prises lors de la consultation des copies.`,
    },
    {
      kind: "para",
      text: "En particulier, l'argent est dû et ne sera pas remboursé si :",
    },
    {
      kind: "item",
      text: "tu ne te présentes pas à l'examen pour une raison quelconque (maladie, etc.),",
    },
    {
      kind: "item",
      text: "tu passes l'examen, tu échoues et tu ne peux pas fournir de photos de la consultation,",
    },
    {
      kind: "item",
      text:
        "la date, le nom et l'école/l'université ne sont pas visibles sur les photos de l'examen raté, de " +
        "sorte qu'il pourrait s'agir d'un autre examen, ou",
    },
    {
      kind: "item",
      text:
        "les photos de la consultation ne montrent pas que tu as essayé de résoudre les exercices (te " +
        "traîner malade à l'examen, n'y écrire que ton nom et envoyer les photos des pages blanches ne suffit pas).",
    },
    {
      kind: "para",
      text:
        `Chaque annulation ou absence à un rendez-vous de cours de 60 minutes convenu ensemble doit être ` +
        `payée en plus, à hauteur de 30 euros. Si, au plus tard, la deuxième absence n'est pas payée en plus, ` +
        `je peux décider de facturer les heures effectuées à 30 euros par heure, d'annuler le forfait et de ` +
        `rembourser le reste, ou de poursuivre tout de même la collaboration.`,
    },
    {
      kind: "para",
      text:
        `Une annulation de ta part après le paiement n'est pas possible. L'argent n'est entièrement remboursé ` +
        `que si des photos de l'examen raté issues de la consultation sont fournies (voir ci-dessus). Une ` +
        `annulation de ma part est possible à tout moment par le virement de retour du montant total ` +
        `(exception : le cas ci-dessus avec plus de deux absences non payées en plus).`,
    },
    {
      kind: "para",
      text:
        `En virant l'argent et en renvoyant ce document signé, tu acceptes ces conditions. Si j'accepte aussi ` +
        `le contrat, je te le renverrai signé ; sinon je refuserai le contrat en remboursant l'argent.`,
    },
    { kind: "para", text: "Cordialement,\nFlorian Ingerl" },
    ...signatureLines(
      {
        firstName: "Prénom",
        lastName: "Nom",
        address: "Adresse",
        student: "Signature (élève)",
        signature: "Signature",
        placeDate: "Lieu, date",
      },
      f
    ),
    {
      kind: "para",
      text:
        `J'accepte les conditions ci-dessus du forfait tout ou rien pour l'examen du ${f.date} en ${f.subject} ` +
        `(objectif : ${f.goal || "réussir l'examen"}) à ${f.institution}.`,
    },
    {
      kind: "sig",
      text:
        "Signature : ________________________________________________________________",
    },
    {
      kind: "para",
      text: "Signature de Florian Ingerl, Rainerstraße 6a, 82178 Puchheim",
    },
    {
      kind: "sig",
      text:
        "Signature : ________________________________________________________________",
    },
  ],

  es: (f) => [
    { kind: "title", text: "Condiciones del paquete todo o nada" },
    { kind: "para", text: `Hola ${f.name.trim() || "…"},` },
    {
      kind: "para",
      text:
        `a continuación te expongo mis condiciones para el paquete todo o nada. Te costaría ${DATEI_ZU_EURO(f.price)}. ` +
        `Este dinero debe pagarse por adelantado. A cambio, nos preparamos con clases particulares de 60 minutos ` +
        `para el examen de ${f.subject} (objetivo: ${f.goal || "aprobar el examen"}) en ${f.institution} el ${f.date}. ` +
        `Recibes tantas horas como necesites; de 2 a 6 horas por semana hasta el examen son una pauta aproximada.`,
    },
    {
      kind: "para",
      text:
        `Solo en un único caso estoy obligado a devolver el dinero: me muestras las fotos del examen suspendido ` +
        `y corregido del ${f.date} realizadas en la consulta del examen.`,
    },
    {
      kind: "para",
      text: "En particular, el dinero se debe y no se devolverá si:",
    },
    {
      kind: "item",
      text: "no te presentas al examen por cualquier motivo (enfermedad, etc.),",
    },
    {
      kind: "item",
      text: "haces el examen, lo suspendes y luego no puedes aportar fotos de la consulta,",
    },
    {
      kind: "item",
      text:
        "en las fotos del examen suspendido no se ven la fecha, el nombre y la escuela/universidad, de modo " +
        "que podría tratarse de otro examen, o",
    },
    {
      kind: "item",
      text:
        "las fotos de la consulta no muestran que intentaste resolver las tareas (arrastrarte enfermo al " +
        "examen, escribir solo tu nombre y enviar fotos de las páginas en blanco no basta).",
    },
    {
      kind: "para",
      text:
        `Cada cancelación o ausencia en una cita de clase de 60 minutos acordada conjuntamente debe pagarse ` +
        `aparte, a razón de 30 euros. Si, a más tardar, la segunda ausencia no se paga aparte, puedo decidir ` +
        `facturar las horas realizadas a 30 euros por hora, cancelar el paquete y devolver el dinero restante, ` +
        `o continuar la colaboración de todos modos.`,
    },
    {
      kind: "para",
      text:
        `Una cancelación por tu parte tras el pago del dinero no es posible. El dinero solo se devuelve ` +
        `íntegramente si se aportan fotos del examen suspendido de la consulta (véase arriba). Una cancelación ` +
        `por mi parte es posible en cualquier momento mediante la devolución del importe completo (excepción: ` +
        `el caso anterior con más de dos ausencias no pagadas aparte).`,
    },
    {
      kind: "para",
      text:
        `Al transferir el dinero y devolver este documento firmado, aceptas estas condiciones. Si yo también ` +
        `acepto el contrato, te lo devolveré firmado; de lo contrario, rechazaré el contrato devolviendo el dinero.`,
    },
    { kind: "para", text: "Un saludo,\nFlorian Ingerl" },
    ...signatureLines(
      {
        firstName: "Nombre",
        lastName: "Apellidos",
        address: "Dirección",
        student: "Firma (alumno/a)",
        signature: "Firma",
        placeDate: "Lugar y fecha",
      },
      f
    ),
    {
      kind: "para",
      text:
        `Acepto las condiciones anteriores del paquete todo o nada para el examen del ${f.date} de ${f.subject} ` +
        `(objetivo: ${f.goal || "aprobar el examen"}) en ${f.institution}.`,
    },
    {
      kind: "sig",
      text:
        "Firma: ____________________________________________________________________",
    },
    {
      kind: "para",
      text: "Firma de Florian Ingerl, Rainerstraße 6a, 82178 Puchheim",
    },
    {
      kind: "sig",
      text:
        "Firma: ____________________________________________________________________",
    },
  ],

  it: (f) => [
    { kind: "title", text: "Condizioni del pacchetto tutto o nulla" },
    { kind: "para", text: `Ciao ${f.name.trim() || "…"},` },
    {
      kind: "para",
      text:
        `qui di seguito ti scrivo le mie condizioni per il pacchetto tutto o nulla. Ti costerebbe ${DATEI_ZU_EURO(f.price)}. ` +
        `Questo importo va pagato in anticipo. In cambio ci prepariamo, con lezioni di 60 minuti, all'esame di ` +
        `${f.subject} (obiettivo: ${f.goal || "superare l'esame"}) presso ${f.institution} il ${f.date}. ` +
        `Ricevi tutte le ore di cui hai bisogno; 2–6 ore a settimana fino all'esame sono una linea guida approssimativa.`,
    },
    {
      kind: "para",
      text:
        `In un solo caso sono obbligato a rimborsare il denaro: mi mostri le foto dell'esame non superato e ` +
        `corretto del ${f.date} scattate durante la consultazione delle prove.`,
    },
    {
      kind: "para",
      text: "In particolare, il denaro è dovuto e non verrà rimborsato se:",
    },
    {
      kind: "item",
      text: "non ti presenti all'esame per qualsiasi motivo (malattia, ecc.),",
    },
    {
      kind: "item",
      text: "sostieni l'esame, non lo superi e poi non puoi fornire foto della consultazione,",
    },
    {
      kind: "item",
      text:
        "nelle foto dell'esame non superato non sono visibili la data, il nome e la scuola/università, " +
        "cosicché potrebbe trattarsi di un altro esame, oppure",
    },
    {
      kind: "item",
      text:
        "le foto della consultazione non mostrano che hai cercato di risolvere gli esercizi (trascinarti " +
        "malato all'esame, scriverci solo il tuo nome e inviare le foto delle pagine vuote non basta).",
    },
    {
      kind: "para",
      text:
        `Ogni disdetta o assenza a un appuntamento di lezione di 60 minuti concordato insieme va pagata in ` +
        `aggiunta, a 30 euro. Se al più tardi la seconda assenza non viene pagata in aggiunta, posso decidere ` +
        `di fatturare le ore svolte a 30 euro all'ora, annullare il pacchetto e restituire il denaro rimanente, ` +
        `oppure proseguire comunque la collaborazione.`,
    },
    {
      kind: "para",
      text:
        `Una disdetta da parte tua dopo il pagamento del denaro non è possibile. Il denaro viene restituito ` +
        `per intero solo se vengono fornite foto dell'esame non superato tratte dalla consultazione (vedi ` +
        `sopra). Una disdetta da parte mia è possibile in qualsiasi momento tramite la restituzione dell'intero ` +
        `importo (eccezione: il caso precedente con più di due assenze non pagate in aggiunta).`,
    },
    {
      kind: "para",
      text:
        `Con il pagamento del denaro e la restituzione di questo documento firmato accetti queste condizioni. ` +
        `Se accetto anch'io il contratto, te lo restituirò firmato; altrimenti rifiuterò il contratto ` +
        `restituendo il denaro.`,
    },
    { kind: "para", text: "Cordiali saluti,\nFlorian Ingerl" },
    ...signatureLines(
      {
        firstName: "Nome",
        lastName: "Cognome",
        address: "Indirizzo",
        student: "Firma (studente/studentessa)",
        signature: "Firma",
        placeDate: "Luogo e data",
      },
      f
    ),
    {
      kind: "para",
      text:
        `Accetto le condizioni di cui sopra del pacchetto tutto o nulla per l'esame del ${f.date} in ${f.subject} ` +
        `(obiettivo: ${f.goal || "superare l'esame"}) presso ${f.institution}.`,
    },
    {
      kind: "sig",
      text:
        "Firma: ____________________________________________________________________",
    },
    {
      kind: "para",
      text: "Firma di Florian Ingerl, Rainerstraße 6a, 82178 Puchheim",
    },
    {
      kind: "sig",
      text:
        "Firma: ____________________________________________________________________",
    },
  ],
};

export function buildContract(
  lang: AppLocale,
  fields: ContractFields
): ContractBlock[] {
  return CONTRACT_BUILDERS[lang](fields);
}

// ---------------------------------------------------------------------------
// Ausgabe: HTML (fuer Word), RTF und PDF
// ---------------------------------------------------------------------------
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function contractToHtml(blocks: ContractBlock[]): string {
  const body = blocks
    .map((b) => {
      const text = escapeHtml(b.text).replace(/\n/g, "<br>");
      if (b.kind === "title") return `<h1>${text}</h1>`;
      if (b.kind === "item") return `<p class="item">&#8226;&nbsp;&nbsp;${text}</p>`;
      if (b.kind === "sig") return `<p class="sig">${text}</p>`;
      return `<p>${text}</p>`;
    })
    .join("\n");
  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>Alles-oder-Nichts-Paket</title>
<style>
  body { font-family: "Times New Roman", Times, serif; font-size: 11pt; line-height: 1.45; }
  h1 { font-size: 16pt; text-align: center; }
  p { margin: 0 0 8pt 0; text-align: justify; }
  p.item { margin-left: 18pt; }
  p.sig { margin: 12pt 0; }
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
      // RTF-Unicode: \uN mit vorzeichenbehafteter 16-Bit-Zahl und Ersatzzeichen.
      const signed = code > 32767 ? code - 65536 : code;
      out += `\\u${signed}?`;
    } else out += ch;
  }
  return out;
}

export function contractToRtf(blocks: ContractBlock[]): string {
  const header =
    "{\\rtf1\\ansi\\ansicpg1252\\deff0" +
    "{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}}" +
    "{\\colortbl;\\red0\\green0\\blue0;\\red255\\green0\\blue0;}";
  const content = blocks
    .map((b) => {
      const text = escapeRtf(b.text);
      if (b.kind === "title") {
        return `\\pard\\qc\\b\\fs32\\f0 ${text}\\par\\b0\\fs22 `;
      }
      if (b.kind === "item") {
        return `\\pard\\li720\\fi-360\\sa120\\sl276\\slmult1\\f0\\fs22 \\bullet  ${text}\\par`;
      }
      if (b.kind === "sig") {
        return `\\pard\\sa160\\sl276\\slmult1\\f0\\fs22 ${text}\\par`;
      }
      return `\\pard\\qj\\sa160\\sl276\\slmult1\\f0\\fs22 ${text}\\par`;
    })
    .join("\n");
  return `${header}\n${content}\n}`;
}

export function createContractPdf(
  blocks: ContractBlock[],
  title: string
): Blob {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxW = pageW - margin * 2;
  const lh = 15;
  let y = margin;

  doc.setProperties({ title });

  const ensure = (h: number): void => {
    if (y + h > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  for (const b of blocks) {
    if (b.kind === "title") {
      doc.setFont("times", "bold");
      doc.setFontSize(17);
      const lines = doc.splitTextToSize(b.text, maxW);
      ensure(lines.length * lh * 1.3);
      doc.text(lines, pageW / 2, y, { align: "center" });
      y += lines.length * lh * 1.4 + 6;
      doc.setFont("times", "normal");
      doc.setFontSize(11);
      continue;
    }

    doc.setFont("times", "normal");
    doc.setFontSize(11);
    const prefix = b.kind === "item" ? "\u2022  " : "";
    const indent = b.kind === "item" ? 16 : 0;
    const paragraphs = b.text.split("\n");
    paragraphs.forEach((paragraph, pi) => {
      const lines = doc.splitTextToSize(prefix + paragraph, maxW - indent);
      for (let li = 0; li < lines.length; li++) {
        ensure(lh);
        doc.text(lines[li], margin + indent, y);
        y += lh;
      }
      if (pi < paragraphs.length - 1) y += 2;
    });
    y += b.kind === "sig" ? 8 : 6;
  }

  return doc.output("blob");
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function contractFilename(
  lang: AppLocale,
  date: string,
  ext: string
): string {
  const safeDate = date.replace(/[^0-9-]/g, "") || "ohne-Datum";
  return `Alles-oder-Nichts-Paket_${lang}_${safeDate}.${ext}`;
}
