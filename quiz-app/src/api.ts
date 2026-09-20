import axios from "axios";
import type { Topic, Exercise, QuizName } from "./types";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const client = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json" },
});

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
  const r = await client.put<Topic>(
    `/api/topic/${encodeURIComponent(topic._id)}`,
    topic ,
  );
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

export async function createExercise(e: Exercise): Promise<Exercise> {
  e= bereinigen(e);
  const r = await client.post<Exercise>(`/api/exercise`, {...e, topic: e.topic?._id });
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
