declare module "primevue/toasteventbus" {
  export interface ToastMessage {
    severity?: "success" | "info" | "warn" | "error" | "secondary" | "contrast";
    summary?: string;
    detail?: string;
    life?: number;
    closable?: boolean;
    sticky?: boolean;
  }

  const ToastEventBus: {
    on(type: string, fn: (message: ToastMessage) => void): void;
    off(type: string, fn: (message: ToastMessage) => void): void;
    emit(type: string, message?: ToastMessage): void;
  };

  export default ToastEventBus;
}
