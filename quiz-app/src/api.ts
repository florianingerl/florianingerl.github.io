import axios from "axios";
import type { Topic, Exercise, QuizName, User } from "./types";
import { getToken } from "./authToken";

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
  const { correctlyAnswered: weg, ...rest } = e;
  return {
    ...rest,
    options: ohneChecked(rest.options),
    optionsEn: ohneChecked(rest.optionsEn),
    optionsFr: ohneChecked(rest.optionsFr),
  };
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

export async function getAllTopics(quiz: QuizName): Promise<Topic[]> {
  const r = await client.get<Topic[]>(`/api/topic`, { params: { quiz } });
  return r.data;
}

export async function getExercises(quiz: QuizName): Promise<Exercise[]> {
  const r = await client.get<Exercise[]>(`/api/exercise`, { params: { quiz } });
  return r.data;
}

// Liefert alle Aufgaben des Quizzes. Das Topic wird bewusst nicht mitgeschickt,
// sondern im Frontend gefiltert.
export async function getAllExercises(quiz: QuizName): Promise<Exercise[]> {
  return getExercises(quiz);
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
  const r = await client.post<Exercise>(`/api/exercise`, {...e, topic: !e.topic ? undefined : ( typeof e.topic === "string" ? e.topic : e.topic._id  ) });
  return r.data;
}

export async function updateExercise(e: Exercise): Promise<Exercise> {
  if (!e._id) throw new Error("updateExercise: _id fehlt");
  const r = await client.put<Exercise>(
    `/api/exercise/${encodeURIComponent(e._id)}`,
    bereinigen(e),
  );
  return r.data;
}

export async function deleteExercise(id: string): Promise<void> {
  await client.delete(`/api/exercise/${encodeURIComponent(id)}`);
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
