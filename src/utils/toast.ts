import ToastEventBus from "primevue/toasteventbus";
import { i18n } from "@/i18n";

export function showSuccessToast(messageKey: string): void {
  ToastEventBus.emit("add", {
    severity: "success",
    summary: i18n.global.t(messageKey),
    life: 5000,
  });
}
