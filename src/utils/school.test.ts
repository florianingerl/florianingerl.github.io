import { describe, expect, it } from "vitest";
import type { Exercise, School } from "@/types/quiz";
import {
  getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz,
  getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject,
} from "./school";

const SCHULEN: School[] = [
  { _id: "s1", name: "8.Klasse Gymnasium Bayern" },
  { _id: "s2", name: "9.Klasse Gymnasium Bayern" },
  { _id: "s3", name: "Hochschule Wismar" },
];

function aufgabe(
  id: string,
  quiz: string,
  school?: Exercise["school"],
  subject = "french",
): Exercise {
  return {
    _id: id,
    quiz,
    subject,
    type: "gapText",
    imageUrl: "",
    questionOrInstruction: "",
    school,
  };
}

// e1 und e2 gehoeren zu q1, e3 nur zu q2; e4 hat gar keine Schule.
const AUFGABEN: Exercise[] = [
  aufgabe("e1", "q1", "s2"),
  aufgabe("e2", "q1", SCHULEN[0]),
  aufgabe("e3", "q2", "s3"),
  aufgabe("e4", "q1"),
];

describe("getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz", () => {
  it("liefert nur die Schulen, die in Aufgaben dieses Quizzes vorkommen", () => {
    // s1 und s2 stecken in q1, s3 nur in q2. Die Reihenfolge folgt der
    // geladenen Schulliste.
    expect(
      getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
        AUFGABEN,
        SCHULEN,
        "q1",
      ),
    ).toEqual([SCHULEN[0], SCHULEN[1]]);
  });

  it("liefert die Schulen des anderen Quizzes", () => {
    expect(
      getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
        AUFGABEN,
        SCHULEN,
        "q2",
      ),
    ).toEqual([SCHULEN[2]]);
  });

  it("betrachtet ohne Quiz-_id alle Aufgaben", () => {
    expect(
      getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
        AUFGABEN,
        SCHULEN,
        "",
      ),
    ).toEqual([SCHULEN[0], SCHULEN[1], SCHULEN[2]]);
  });

  it("nimmt eine nur eingebettete Schule aus der Aufgabe auf", () => {
    const eingebettet: School = { _id: "s9", name: "Neue Schule" };
    const aufgaben = [aufgabe("e1", "q1", eingebettet)];

    expect(
      getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
        aufgaben,
        SCHULEN,
        "q1",
      ),
    ).toEqual([eingebettet]);
  });

  it("laesst Aufgaben ohne Schule und Schulen ohne _id weg", () => {
    const aufgaben = [
      aufgabe("e1", "q1"),
      aufgabe("e2", "q1", { name: "Ohne id" }),
    ];

    expect(
      getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
        aufgaben,
        [{ name: "Auch ohne id" }],
        "q1",
      ),
    ).toEqual([]);
  });
});

describe("getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject", () => {
  it("liefert alle Schulen des Faches, unabhaengig vom Quiz", () => {
    // e1, e2 (q1) und e3 (q2) liegen im Fach "french".
    expect(
      getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject(
        AUFGABEN,
        SCHULEN,
        "french",
      ),
    ).toEqual([SCHULEN[0], SCHULEN[1], SCHULEN[2]]);
  });

  it("liefert nichts fuer ein Fach ohne Aufgaben", () => {
    expect(
      getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject(
        AUFGABEN,
        SCHULEN,
        "mathematics",
      ),
    ).toEqual([]);
  });

  it("betrachtet ohne Fach alle Aufgaben", () => {
    expect(
      getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject(
        AUFGABEN,
        SCHULEN,
        "",
      ),
    ).toEqual([SCHULEN[0], SCHULEN[1], SCHULEN[2]]);
  });
});
