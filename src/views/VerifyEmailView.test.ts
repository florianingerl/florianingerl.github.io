import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import { API_URL } from "@/api";
import { i18n } from "@/i18n";
import { server } from "@/mocks/server";
import VerifyEmailView from "./VerifyEmailView.vue";

vi.mock("@/authToken", () => ({ getToken: () => null }));

// Die Seite liest die E-Mail-Adresse aus "?email=..." und schickt den vom
// Benutzer eingegebenen Code an /api/verifyemail.
function routerMit(adresse: string) {
  const leer = { template: "<div />" };
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: leer },
      { path: "/verify-email", component: leer },
    ],
  });
  void router.push(adresse);
  return router;
}

async function mountVerify(adresse = "/verify-email?email=anna%40example.com") {
  const router = routerMit(adresse);
  await router.isReady();
  const wrapper = mount(VerifyEmailView, {
    global: { plugins: [i18n, router] },
  });
  return wrapper;
}

describe("VerifyEmailView", () => {
  it("zeigt die E-Mail-Adresse aus der Adresse an", async () => {
    i18n.global.locale.value = "en";
    const wrapper = await mountVerify();

    expect(wrapper.text()).toContain("anna@example.com");
  });

  it("weist auf einen Link ohne E-Mail-Adresse hin", async () => {
    i18n.global.locale.value = "en";
    const wrapper = await mountVerify("/verify-email");

    expect(wrapper.text()).toContain("doesn't contain an email address");
    expect(wrapper.find("input").exists()).toBe(false);
  });

  it("bestaetigt den Code und zeigt die Erfolgsmeldung des Servers", async () => {
    i18n.global.locale.value = "en";
    let body: { email: string; code: string } | undefined;
    server.use(
      http.post(`${API_URL}/api/verifyemail`, async ({ request }) => {
        body = (await request.json()) as { email: string; code: string };
        return HttpResponse.json({ message: "Your email address has been verified." });
      }),
    );

    const wrapper = await mountVerify();
    await wrapper.get("input").setValue("123456");
    await wrapper.get("form").trigger("submit");
    await flushPromises();

    expect(body).toEqual({ email: "anna@example.com", code: "123456" });
    expect(wrapper.text()).toContain("Your email address has been verified.");
  });

  it("fordert mit dem Knopf einen neuen Code an", async () => {
    i18n.global.locale.value = "en";
    let mail: string | undefined;
    server.use(
      http.post(`${API_URL}/api/resendverification`, async ({ request }) => {
        mail = ((await request.json()) as { email: string }).email;
        return HttpResponse.json({ message: "A new code has been sent." });
      }),
    );

    const wrapper = await mountVerify();
    const resend = wrapper.findAll("button").find((b) => b.text().includes("new code"));
    expect(resend).toBeTruthy();
    await resend!.trigger("click");
    await flushPromises();

    expect(mail).toBe("anna@example.com");
    expect(wrapper.text()).toContain("A new code has been sent.");
  });

  it("zeigt die Fehlermeldung des Servers bei falschem Code", async () => {
    i18n.global.locale.value = "en";
    server.use(
      http.post(`${API_URL}/api/verifyemail`, () =>
        HttpResponse.json(
          { message: "The code is not correct." },
          { status: 400 },
        ),
      ),
    );

    const wrapper = await mountVerify();
    await wrapper.get("input").setValue("000000");
    await wrapper.get("form").trigger("submit");
    await flushPromises();

    expect(wrapper.text()).toContain("The code is not correct.");
  });
});
