import axios from "axios";
import type { Topic, Exercise, QuizName, Quiz, User, School } from "@/types/quiz";
import type { Book, BookStore } from "@/types/book";
import { getToken } from "@/authToken";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const client = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json" },
});

// Das Backend liest das Token aus dem Header "x-auth-token" (siehe
// authMiddleware im Server), deshalb wird es hier bei jeder Anfrage mitgeschickt.
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.set("x-auth-token", token);
  return config;
});

// Fehlermeldungen der API sind meist brauchbarer als der Text von axios
// ("Request failed with status code 400"), deshalb wird bevorzugt die
// "message" aus der Antwort des Servers genommen.
export function fehlerText(e: unknown, ersatz: string): string {
  if (axios.isAxiosError(e)) {
    const daten = e.response?.data as { message?: string } | undefined;
    if (daten?.message) return daten.message;
    if (e.code === "ERR_NETWORK") return `No connection to the server at ${API_URL}.`;
    return e.message;
  }
  return e instanceof Error ? e.message : ersatz;
}

// 401 heisst: kein oder kein gueltiges Token mehr. Das Token des Servers gilt
// nur eine Stunde, also muss dann erneut angemeldet werden.
export function istNichtAngemeldet(e: unknown): boolean {
  return axios.isAxiosError(e) && e.response?.status === 401;
}

// Laufzeitfelder werden entfernt, bevor etwas an den Server geht.
function bereinigen(e: Exercise): Exercise {
  const ohneChecked = (opts?: Exercise["options"]) =>
    opts?.map(({ option, correct }) => ({ option, correct }));
  const { correctlyAnswered: weg, gaps: auchWeg, ...rest } = e;
  return {
    ...rest,
    // shuffledSentence und guess einer word-order-Aufgabe bleiben im Browser.
    wordorder: rest.wordorder
      ? { sentence: rest.wordorder.sentence }
      : rest.wordorder,
    options: ohneChecked(rest.options),
    optionsEn: ohneChecked(rest.optionsEn),
    optionsFr: ohneChecked(rest.optionsFr),
  };
}

// Ein Feld wie "topic" oder "school" ist entweder ein Objekt mit _id (so
// schickt es der Server mit populate) oder schon eine _id/ein Name. Zum
// Speichern reduziert der Server das auf die _id.
function referenzId(x: { _id?: string } | string | undefined): string | undefined {
  if (!x) return undefined;
  return typeof x === "string" ? x : x._id;
}

export async function createTopic(topic: Topic): Promise<Topic> {
  const r = await client.post<Topic>(`/api/topic`, topic );
  return r.data;
}



export async function updateTopic(topic: Topic): Promise<Topic> {
  console.log("Topic is");
  console.log(topic);
  if (!topic._id) throw new Error("updateTopic: _id fehlt");
  console.log("Trying to insert the topic into the database!");
  const r = await client.put<Topic>(
    `/api/topic/${encodeURIComponent(topic._id)}`,
    topic ,
  );
  console.log("Inserting the topic in the database worked!");
  return r.data;
}

export async function getTopic(_id:string):Promise<Topic>{
  const r = await client.get<Topic>(`/api/topic/${_id}`);
  return r.data;
}

// Der zweite Parameter heisst heute "subject" statt "quiz", der URL-Parameter
// der API bleibt aber derselbe (:quizName), damit alte Seiten weiter
// funktionieren.
export async function getAllTopics(quiz: QuizName | string): Promise<Topic[]> {
  const r = await client.get<Topic[]>(`/api/topic/${encodeURIComponent(quiz)}`);
  return r.data;
}

// "quiz" ist der Name eines Website-Quizzes (z.B. "deutsch") oder die _id
// eines Buch-Quizzes; "subject" ist eine Sprache oder ein Fach (z.B.
// "deutsch", "nutrition"). Der Server entscheidet selbst, wonach gefiltert
// wird: Mit "subject" kommen alle Aufgaben des Faches, mit "quiz" nur die
// Aufgaben dieses Quizzes.
export async function getExercises(
  quiz?: QuizName | string,
  subject?: string,
): Promise<Exercise[]> {
  const params: Record<string, string> = {};
  if (quiz) params.quiz = quiz;
  if (subject) params.subject = subject;
  const r = await client.get<Exercise[]>(`/api/exercise`, { params });
  return r.data;
}

// Liefert alle Aufgaben eines Faches (Sprache/Fach), nicht nur die eines
// einzelnen Quizzes.
export async function getExercisesBySubject(
  subject: string,
): Promise<Exercise[]> {
  return getExercises(undefined, subject);
}

// Liefert alle Aufgaben des Quizzes. Das Topic wird bewusst nicht mitgeschickt,
// sondern im Frontend gefiltert.
export async function getAllExercises(
  quiz?: QuizName | string,
  subject?: string,
): Promise<Exercise[]> {
  return getExercises(quiz, subject);
}

// Antwort des eigenen Servers, wenn er den Export an *facile.com weitergeleitet hat.
export interface ExportFacileAntwort {
  ok: boolean;
  angemeldet?: boolean;
  gespeichert?: boolean;
  status?: number;
  seite?: string;
  testId?: string;
  bytes?: number;
  message?: string;
}

// Der Browser darf das Cookie-Header nicht setzen und die *facile.com-Seiten
// schicken keine CORS-Header. Deshalb geht der Export über den eigenen Server.
export async function exportToFacile(params: {
  site: string;
  testId: number;
  cookie: string;
  body: string;
}): Promise<ExportFacileAntwort> {
  const r = await client.post<ExportFacileAntwort>("/api/exportfacile", params);
  return r.data;
}

export async function createExercise(e: Exercise): Promise<Exercise> {
  e= bereinigen(e);
  const r = await client.post<Exercise>(`/api/exercise`, { ...e, topic: referenzId(e.topic), school: referenzId(e.school) });
  return r.data;
}

export async function updateExercise(e: Exercise): Promise<Exercise> {
  if (!e._id) throw new Error("updateExercise: _id fehlt");
  const bereinigt = bereinigen(e);
  const r = await client.put<Exercise>(
    `/api/exercise/${encodeURIComponent(e._id)}`,
    { ...bereinigt, topic: referenzId(bereinigt.topic), school: referenzId(bereinigt.school) },
  );
  return r.data;
}

export async function deleteExercise(id: string): Promise<void> {
  await client.delete(`/api/exercise/${encodeURIComponent(id)}`);
}

// Schulen (Auswahlliste fuer die Schule einer Aufgabe) ------------

// Alle Schulen, die schon einmal verwendet wurden. Der Server sortiert sie
// nach Namen. Der Name einer Schule ist eindeutig.
export async function getSchools(): Promise<School[]> {
  const r = await client.get<School[]>(`/api/school`);
  return r.data;
}

// Legt eine Schule an und liefert sie zurueck. Existiert schon eine Schule mit
// diesem Namen, liefert der Server diese (statt einen Fehler), damit zweimal
// Anlegen nicht schadet.
export async function createSchool(name: string): Promise<School> {
  const r = await client.post<School>(`/api/school`, { name });
  return r.data;
}

// Ein Bild aus der Zwischenablage wird als Data-URL ("data:image/png;base64,...")
// an den Server geschickt. Er speichert es und antwortet mit der URL, unter der
// es abrufbar ist. "remaining" ist die Anzahl der heute noch erlaubten Uploads
// (-1 = kein Limit).
export interface ImageUploadAntwort {
  id: string;
  url: string;
  remaining: number;
}

export async function uploadImage(dataUrl: string): Promise<ImageUploadAntwort> {
  const r = await client.post<ImageUploadAntwort>("/api/image", { dataUrl });
  return r.data;
}

// Buecher (VueBookWriter / VueBookStore) ---------------------------
//
// Ein Buch-Quizz ist ein normales Quiz-Dokument (website === "book"). Es wird
// mit POST /api/quiz angelegt und mit GET /api/quiz/:id geladen.

export async function getBooks(subject: string): Promise<Book[]> {
  const r = await client.get<Book[]>(`/api/book`, { params: { subject } });
  return r.data;
}

export async function getBook(id: string): Promise<Book> {
  const r = await client.get<Book>(`/api/book/${encodeURIComponent(id)}`);
  return r.data;
}

export async function createBook(book: Book): Promise<Book> {
  const r = await client.post<Book>(`/api/book`, book);
  return r.data;
}

export async function updateBook(book: Book): Promise<Book> {
  if (!book._id) throw new Error("updateBook: _id fehlt");
  const r = await client.put<Book>(
    `/api/book/${encodeURIComponent(book._id)}`,
    book,
  );
  return r.data;
}

export async function deleteBook(id: string): Promise<void> {
  await client.delete(`/api/book/${encodeURIComponent(id)}`);
}

export async function getQuiz(id: string): Promise<Quiz> {
  const r = await client.get<Quiz>(`/api/quiz/${encodeURIComponent(id)}`);
  return r.data;
}

// Das Website-Quiz zu einer Sprache/einem Fach (z.B. "deutsch"). Damit erfaehrt
// der Browser die _id des Quizzes, um zwischen "alle Aufgaben des Faches" und
// "nur Aufgaben dieses Quizzes" unterscheiden zu koennen.
export async function getQuizByName(
  subject: string,
): Promise<Quiz | undefined> {
  const r = await client.get<Quiz[]>(`/api/quiz`, {
    params: { website: "web", subject },
  });
  return r.data[0];
}

export async function createQuiz(quiz: Quiz): Promise<Quiz> {
  const r = await client.post<Quiz>(`/api/quiz`, quiz);
  return r.data;
}

// Buchlaeden (VueBookStore) ----------------------------------------

export async function getBookStores(subject: string): Promise<BookStore[]> {
  const r = await client.get<BookStore[]>(`/api/bookstore`, {
    params: { subject },
  });
  return r.data;
}

export async function createBookStore(store: BookStore): Promise<BookStore> {
  const r = await client.post<BookStore>(`/api/bookstore`, store);
  return r.data;
}

// Anmeldung -------------------------------------------------------

// Antwort von /api/register und /api/login. Beide schicken das Token im Feld
// "token" mit. Der Benutzer wird danach noch einmal ohne Passwort geholt.
export interface AuthAntwort {
  message: string;
  token: string;
  user: User;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthAntwort> {
  const r = await client.post<AuthAntwort>("/api/register", data);
  return r.data;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthAntwort> {
  const r = await client.post<AuthAntwort>("/api/login", data);
  return r.data;
}

// GET /api/auth/user haengt an authMiddleware und liefert den Benutzer
// ohne Passwort.
export async function getAuthenticatedUser(): Promise<User> {
  const r = await client.get<User>("/api/auth/user");
  return r.data;
}

// PUT /api/user/:id aendert nur die uebergebenen Felder.
export async function updateUser(id: string, daten: Partial<User>): Promise<User> {
  const r = await client.put<User>(
    `/api/user/${encodeURIComponent(id)}`,
    daten
  );
  return r.data;
}
