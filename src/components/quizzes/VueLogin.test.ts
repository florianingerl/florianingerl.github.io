import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import VueLogin from "./VueLogin.vue";

// Das Modal von Bootstrap sperrt das Scrollen ueber die body-Klasse
// "modal-open". Der Platzhalter ahmt Bootstrap so nach, dass die Klasse beim
// Oeffnen gesetzt und beim normalen Schliessen (hide) entfernt wird. Beim
// dispose haengen bleiben bleibt: Genau das liess frueher die Seite einrasten,
// wenn der Dialog nach erfolgreicher Anmeldung entfernt wurde, waehrend er
// noch offen war.
vi.mock("bootstrap", () => ({
  Modal: {
    getOrCreateInstance: (element: HTMLElement) => ({
      show: () => {
        element.classList.add("show");
        document.body.classList.add("modal-open");
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        document.body.appendChild(backdrop);
      },
      hide: () => {
        element.classList.remove("show");
        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
      },
      dispose: () => {
        element.classList.remove("show");
      },
    }),
  },
}));

// Wie in VueQuiz: Der Login-Dialog wird entfernt, sobald "logged-in" kommt -
// bei echten Bootstrap-Buchungen mitten in der Einblendphase.
const Host = defineComponent({
  components: { VueLogin },
  setup() {
    const offen = ref(true);
    return { offen };
  },
  template:
    '<VueLogin v-if="offen" @logged-in="offen = false" @cancel-clicked="offen = false" />',
});

async function mountHost() {
  const pinia = createPinia();
  setActivePinia(pinia);
  const wrapper = mount(Host, {
    global: { plugins: [pinia] },
    attachTo: document.body,
  });
  await nextTick();
  return wrapper;
}

describe("VueLogin: Der body bleibt nach dem Entfernen des Modals scrollbar", () => {
  beforeEach(() => {
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
    document.body.removeAttribute("style");
  });

  it("raeumt die Scroll-Sperre auf, wenn der Dialog nach erfolgreicher Anmeldung entfernt wird", async () => {
    const wrapper = await mountHost();
    const login = wrapper.findComponent(VueLogin);

    // Das Modal ist offen: body gesperrt, Backdrop vorhanden.
    expect(document.body.classList.contains("modal-open")).toBe(true);
    expect(document.querySelectorAll(".modal-backdrop").length).toBe(1);

    // Erfolgreiche Anmeldung: Der Aufrufer entfernt den Dialog sofort, obwohl
    // das Modal noch nicht ueber hide() geschlossen wurde.
    login.vm.$emit("logged-in");
    await nextTick();

    // Regressionskern: Der body darf keine Scroll-Sperre behalten und es darf
    // kein Backdrop liegen bleiben.
    expect(document.body.classList.contains("modal-open")).toBe(false);
    expect(document.querySelectorAll(".modal-backdrop").length).toBe(0);

    wrapper.unmount();
  });

  it("raeumt die Scroll-Sperre auch beim normalen Abbrechen auf", async () => {
    const wrapper = await mountHost();
    const login = wrapper.findComponent(VueLogin);

    login.vm.$emit("cancel-clicked");
    await nextTick();

    expect(document.body.classList.contains("modal-open")).toBe(false);
    expect(document.querySelectorAll(".modal-backdrop").length).toBe(0);

    wrapper.unmount();
  });
});