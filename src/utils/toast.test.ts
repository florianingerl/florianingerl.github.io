import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ToastEventBus, { type ToastMessage } from "primevue/toasteventbus";
import { i18n } from "@/i18n";
import { showSuccessToast } from "./toast";

describe("showSuccessToast", () => {
  let messages: ToastMessage[];
  let onAdd: (message: ToastMessage) => void;

  beforeEach(() => {
    messages = [];
    onAdd = (message) => messages.push(message);
    ToastEventBus.on("add", onAdd);
    i18n.global.locale.value = "de";
  });

  afterEach(() => {
    ToastEventBus.off("add", onAdd);
    i18n.global.locale.value = "de";
  });

  it("sendet eine Erfolgsmeldung an den Toast-EventBus", () => {
    showSuccessToast("toasts.exerciseCreated");

    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      severity: "success",
      summary: "Die Aufgabe wurde erfolgreich in der Datenbank erstellt.",
      life: 5000,
    });
  });

  it("uebersetzt die Meldung in die aktuelle Site-Sprache", () => {
    i18n.global.locale.value = "en";

    showSuccessToast("toasts.exerciseDeleted");

    expect(messages).toHaveLength(1);
    expect(messages[0].summary).toBe(
      "The exercise was successfully deleted from the database.",
    );
  });
});
