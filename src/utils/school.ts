import type { Exercise, School } from "@/types/quiz";

// Die _id der Schule einer Aufgabe - egal ob der Server das School-Dokument
// mitgeschickt hat (populate) oder nur die _id.
function schoolId(exercise: Exercise): string {
  const s = exercise.school;
  if (!s) return "";
  return typeof s === "string" ? s : s._id ?? "";
}

// Die _id des Quizzes einer Aufgabe. Der Server schickt sie als String; bei
// alten Bestaenden kann das Quiz auch als Dokument vorliegen.
function quizIdOf(exercise: Exercise): string {
  const q = exercise.quiz;
  if (!q) return "";
  return typeof q === "string" ? q : q._id ?? "";
}

// Sammelt alle bekannten Schulen, die in mindestens einer der uebergebenen
// Aufgaben vorkommen. Bekannte Schulen kommen aus der geladenen Schulliste
// (knownSchools) und aus den eingebetteten School-Dokumenten der Aufgaben.
// Schulen ohne _id oder ohne Aufgabe bleiben weg. Die Reihenfolge folgt der
// Schulliste; nur eingebettet vorkommende Schulen haengen hinten an.
function collectSchools(exercises: Exercise[], knownSchools: School[]): School[] {
  const bekannt = new Map<string, School>();
  knownSchools.forEach((s) => {
    if (s._id) bekannt.set(s._id, s);
  });

  const verwendet = new Set<string>();
  exercises.forEach((q) => {
    const id = schoolId(q);
    if (!id) return;
    verwendet.add(id);
    const s = q.school;
    if (s && typeof s !== "string" && !bekannt.has(id)) bekannt.set(id, s);
  });

  return [...bekannt.values()].filter(
    (s) => s._id !== undefined && verwendet.has(s._id),
  );
}

// Alle Schulen, die in mindestens einer Aufgabe des gegebenen Quizzes
// vorkommen. Ohne bekannte Quiz-_id (z.B. noch nicht migrierte Daten) zaehlen
// alle Aufgaben.
export function getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
  exercises: Exercise[],
  knownSchools: School[],
  quizId: string,
): School[] {
  const aufgaben = exercises.filter((q) => !quizId || quizIdOf(q) === quizId);
  return collectSchools(aufgaben, knownSchools);
}

// Alle Schulen, die in mindestens einer Aufgabe des gegebenen Faches (subject)
// vorkommen. Ohne Angabe des Faches zaehlen alle Aufgaben.
export function getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject(
  exercises: Exercise[],
  knownSchools: School[],
  subject: string,
): School[] {
  const aufgaben = exercises.filter((q) => !subject || q.subject === subject);
  return collectSchools(aufgaben, knownSchools);
}
