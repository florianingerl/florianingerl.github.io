import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/quiz";
import LoginToEditComponent from "./LoginToEditComponent.vue";

// Ein frischer Pinia-Store pro Test; die Knopfleiste liest den Benutzer aus
// dem Auth-Store.
function mountBar(props: Record<string, unknown> = {}) {
  const pinia = createPinia();
  setActivePinia(pinia);
  const auth = useAuthStore();
  const wrapper = mount(LoginToEditComponent, {
    props,
    global: { plugins: [pinia] },
  });
  return { auth, wrapper };
}

describe("LoginToEditComponent: angemeldet", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("zeigt Anlegen/Bearbeiten/Loeschen, den Profil-Knopf links vom Logout und den Benutzer", async () => {
    const { auth, wrapper } = mountBar({ canEdit: true, canDelete: true });
    auth.token = "test-token";
    auth.user = { name: "Tester", email: "tester@example.com" } as User;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[title="Add a new exercise"]').exists()).toBe(true);
    expect(wrapper.find('[title="Edit the exercise"]').exists()).toBe(true);
    expect(wrapper.find('[title="Delete the exercise"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("You are logged in as tester@example.com");

    // Der Anmelde-Hinweis und die Anmelde-Knoepfe sind ausgeblendet.
    expect(wrapper.text()).not.toContain("Log in to create");
    expect(wrapper.text()).not.toContain("Sign up");

    // Der Profil-Knopf steht links vom Logout-Knopf.
    const buttons = wrapper.findAll(".login-to-edit button");
    const profileIndex = buttons.findIndex((b) => b.text().includes("Profile"));
    const logoutIndex = buttons.findIndex((b) => b.text().includes("Logout"));
    expect(profileIndex).toBeGreaterThanOrEqual(0);
    expect(logoutIndex).toBeGreaterThan(profileIndex);
    expect(buttons[profileIndex].attributes("title")).toBe(
      "Modify your profile or your settings"
    );
  });

  it("meldet das Anklicken von Profil, Anlegen, Bearbeiten und Loeschen", async () => {
    const { auth, wrapper } = mountBar({ canEdit: true, canDelete: true });
    auth.token = "test-token";
    auth.user = { name: "Tester", email: "tester@example.com" } as User;
    await wrapper.vm.$nextTick();

    await wrapper.get('[title="Add a new exercise"]').trigger("click");
    await wrapper.get('[title="Edit the exercise"]').trigger("click");
    await wrapper.get('[title="Delete the exercise"]').trigger("click");
    await wrapper.get('[title="Modify your profile or your settings"]').trigger("click");
    await wrapper.get("button.btn-outline-danger").trigger("click");

    const emitted = wrapper.emitted();
    expect(emitted["create-clicked"]).toHaveLength(1);
    expect(emitted["edit-clicked"]).toHaveLength(1);
    expect(emitted["delete-clicked"]).toHaveLength(1);
    expect(emitted["profile-clicked"]).toHaveLength(1);
    expect(emitted["logout-clicked"]).toHaveLength(1);
  });

  it("blendet die Knopfleiste aus, solange das Formular offen ist", async () => {
    const { auth, wrapper } = mountBar({ formOpen: true, canEdit: true, canDelete: true });
    auth.token = "test-token";
    auth.user = { name: "Tester", email: "tester@example.com" } as User;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[title="Add a new exercise"]').exists()).toBe(false);
    expect(wrapper.find('[title="Edit the exercise"]').exists()).toBe(false);
    expect(wrapper.find('[title="Delete the exercise"]').exists()).toBe(false);
  });
});

describe("LoginToEditComponent: abgemeldet", () => {
  it("zeigt den Anmelde-Hinweis sowie Sign up und Login, aber kein Profil", () => {
    const { auth, wrapper } = mountBar();
    auth.abmelden();

    expect(wrapper.text()).toContain(
      "Log in to create, edit or delete exercises and tutorials."
    );
    expect(wrapper.text()).toContain("Sign up");
    expect(wrapper.text()).toContain("Login");
    expect(wrapper.text()).not.toContain("Profile");
    expect(wrapper.find('[title="Add a new exercise"]').exists()).toBe(false);
  });

  it("meldet Anmelden und Registrieren", async () => {
    const { auth, wrapper } = mountBar();
    auth.abmelden();

    await wrapper.get("button.btn-primary").trigger("click");
    await wrapper.get("button.btn-outline-primary").trigger("click");

    const emitted = wrapper.emitted();
    expect(emitted["login-clicked"]).toHaveLength(1);
    expect(emitted["signup-clicked"]).toHaveLength(1);
  });
});
