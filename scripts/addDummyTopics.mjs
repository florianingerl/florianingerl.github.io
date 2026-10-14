// Legt ein paar Dummy-Themen (mit Schule und Unterthemen) fuer das
// Spanisch-Quiz an, damit sich der Themenbaum gut ausprobieren laesst.
//
// Aufruf (Node 18+):
//   node scripts/addDummyTopics.mjs
//
// Standardmaessig wird die lokale API (http://localhost:8080) verwendet. Eine
// andere Adresse laesst sich mit der Umgebungsvariable API_URL setzen, z.B.
//   API_URL=https://14ofbe9.cserverhost.cloud node scripts/addDummyTopics.mjs
//
// Das Anlegen von Themen verlangt eine Anmeldung. Deshalb entweder vorher mit
// E-Mail und Passwort anmelden:
//   EMAIL=ich@example.com PASSWORD=geheim node scripts/addDummyTopics.mjs
// oder ein bereits vorhandenes Token mitgeben:
//   AUTH_TOKEN=... node scripts/addDummyTopics.mjs

const API_URL = process.env.API_URL ?? "http://localhost:8080";
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
let token = process.env.AUTH_TOKEN ?? "";

// subject "espagnol" ist das Spanisch-Quiz auf der Website.
const SUBJECT = process.env.SUBJECT ?? "espagnol";

async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "x-auth-token": token } : {}),
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  const daten = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(
      `${options.method ?? "GET"} ${path} -> ${res.status}: ${
        daten?.message ?? text
      }`,
    );
  }
  return daten;
}

// Der Baum, der angelegt werden soll. "children" sind Unterthemen; die Schule
// wird nur an der Wurzel gesetzt und vererbt sich auf die Kinder.
const tree = [
  {
    title: "Grammatik",
    school: "9.Klasse Gymnasium Bayern",
    children: [
      {
        title: "Verben",
        children: [{ title: "Presente" }, { title: "Subjuntivo" }],
      },
      { title: "Pronomen" },
    ],
  },
  {
    title: "Vokabeln",
    school: "LMU Muenchen",
    children: [{ title: "Reisen" }, { title: "Familie" }],
  },
];

async function anmelden() {
  if (token) return;
  if (!EMAIL || !PASSWORD) {
    throw new Error(
      "Bitte EMAIL und PASSWORD (oder AUTH_TOKEN) setzen, um Themen anzulegen.",
    );
  }
  const antwort = await api("/api/login", {
    method: "POST",
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  token = antwort.token;
  console.log(`Angemeldet als ${antwort.user?.email ?? EMAIL}.`);
}

async function themaAnlegen(thema, parentId) {
  const neu = await api("/api/topic", {
    method: "POST",
    body: JSON.stringify({
      subject: SUBJECT,
      title: thema.title,
      tutorial: "",
      school: thema.school,
      parentId,
    }),
  });
  console.log(
    `  angelegt: ${neu.title}${parentId ? ` (unter ${parentId})` : ""}` +
      `${thema.school ? ` [${thema.school}]` : ""} -> _id=${neu._id}`,
  );
  return neu;
}

async function baumAnlegen(knoten, parentId) {
  for (const thema of knoten) {
    const neu = await themaAnlegen(thema, parentId);
    if (thema.children?.length) {
      await baumAnlegen(thema.children, neu._id);
    }
  }
}

async function main() {
  await anmelden();
  console.log(`Lege Dummy-Themen fuer "${SUBJECT}" an ${API_URL} an:`);
  await baumAnlegen(tree, undefined);
  console.log("Fertig.");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
