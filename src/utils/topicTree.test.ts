import { describe, expect, it } from "vitest";
import type { Topic } from "@/types/quiz";
import {
  buildTopicTree,
  findTopicPath,
  topicPathString,
} from "./topicTree";

// Eine kleine Hierarchie: Elektrotechnik -> Dioden -> Zehnerdiode und eine
// zweite Wurzel Elektrotechnik -> Widerstaende.
const themen: Topic[] = [
  {
    _id: "et",
    subject: "elektrotechnik",
    title: "Elektrotechnik",
    tutorial: "",
  },
  {
    _id: "dio",
    subject: "elektrotechnik",
    title: "Dioden",
    tutorial: "",
    parentId: "et",
  },
  {
    _id: "zeh",
    subject: "elektrotechnik",
    title: "Zehnerdiode",
    tutorial: "",
    parentId: "dio",
  },
  {
    _id: "wid",
    subject: "elektrotechnik",
    title: "Widerstaende",
    tutorial: "",
    parentId: "et",
  },
  {
    _id: "mathe",
    subject: "mathematics",
    title: "Lineare Algebra",
    tutorial: "",
  },
];

describe("topicTree", () => {
  it("baut aus der flachen Liste einen Baum mit Wurzeln und Kindern", () => {
    const baum = buildTopicTree(themen);
    const wurzeln = baum.map((n) => n.label).sort();
    expect(wurzeln).toEqual(["Elektrotechnik", "Lineare Algebra"]);

    const et = baum.find((n) => n.label === "Elektrotechnik")!;
    expect(et.children!.map((c) => c.label).sort()).toEqual([
      "Dioden",
      "Widerstaende",
    ]);

    const dio = et.children!.find((c) => c.label === "Dioden")!;
    expect(dio.children!.map((c) => c.label)).toEqual(["Zehnerdiode"]);
  });

  it("liefert den Pfad von der Wurzel bis zum Thema", () => {
    expect(findTopicPath(themen, "zeh").map((t) => t.title)).toEqual([
      "Elektrotechnik",
      "Dioden",
      "Zehnerdiode",
    ]);
  });

  it("schreibt den Pfad mit '->' getrennt", () => {
    expect(topicPathString(themen, "zeh")).toBe(
      "Elektrotechnik->Dioden->Zehnerdiode",
    );
  });

  it("gibt bei unbekannter Id einen leeren Pfad zurueck", () => {
    expect(findTopicPath(themen, "gibt-es-nicht")).toEqual([]);
  });
});
