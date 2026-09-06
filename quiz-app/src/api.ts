import axios from "axios";
import type { Exercise, QuizName } from "./types";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const client = axios.create({
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

export async function getExercises(quiz: QuizName): Promise<Exercise[]> {
  const r = await client.get<Exercise[]>(`/api/exercise`, { params: { quiz } });
  return r.data;
}

export async function createExercise(e: Exercise): Promise<Exercise> {
  const r = await client.post<Exercise>(`/api/exercise`, bereinigen(e));
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
