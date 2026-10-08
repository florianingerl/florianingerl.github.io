export interface SprachPreis {
  betrag: number;
  text: string;
  knopfText: string;
}

export const PREISE: Record<string, SprachPreis> = {
  deutsch: {
    betrag: 5,
    text: "Gefallen dir die Deutsch-Übungen? Unterstütze die Arbeit daran.",
    knopfText: "5€ mit Paypal",
  },
  english: {
    betrag: 5,
    text: "Do you like the English exercises? Support the work behind them.",
    knopfText: "Pay 5€ with Paypal",
  },
  french: {
    betrag: 5,
    text: "Les exercices de français te plaisent? Soutiens ce travail.",
    knopfText: "5€ avec Paypal",
  },
  espagnol: {
    betrag: 5,
    text: "¿Te gustan los ejercicios de español? Apoya este trabajo.",
    knopfText: "5€ con Paypal",
  },
  italiano: {
    betrag: 5,
    text: "Ti piacciono gli esercizi di italiano? Sostieni questo lavoro.",
    knopfText: "5€ con Paypal",
  },
};
