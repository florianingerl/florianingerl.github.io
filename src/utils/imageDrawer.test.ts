import { describe, expect, it } from "vitest";
import type { WhiteboardObject } from "@/types/whiteboard";
import { parseWhiteboardFile } from "./whiteboardDatei";
import {
  drawnImageJson,
  IMAGE_DRAWER_HEIGHT,
  IMAGE_DRAWER_TITLE,
  IMAGE_DRAWER_WIDTH,
} from "./imageDrawer";

describe("imageDrawer", () => {
  it("nutzt die feste Groesse 640x400 und schreibt ein gueltiges Whiteboard-Archiv", () => {
    const objekt: WhiteboardObject = {
      id: "strich1",
      type: "pen",
      x: 10,
      y: 20,
      w: 30,
      h: 40,
      z: 1,
      color: "#123456",
      points: [0, 0, 5, 5],
    };

    const gelesen = parseWhiteboardFile(drawnImageJson([objekt]));

    expect([IMAGE_DRAWER_WIDTH, IMAGE_DRAWER_HEIGHT]).toEqual([640, 400]);
    expect(gelesen?.title).toBe(IMAGE_DRAWER_TITLE);
    expect(gelesen?.objects).toEqual([objekt]);
  });
});
