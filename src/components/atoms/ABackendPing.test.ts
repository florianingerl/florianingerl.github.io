import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import ABackendPing from "./ABackendPing.vue";

describe("ABackendPing", () => {
  it("shows the mocked answer of the other server", async () => {
    const wrapper = mount(ABackendPing);
    expect(wrapper.find('[data-testid="ping-idle"]').exists()).toBe(true);

    await wrapper.get('[data-testid="ping"]').trigger("click");
    await flushPromises();

    // "pong (mocked-backend)" kommt aus dem MSW-Handler in src/mocks/handlers.ts.
    expect(wrapper.get('[data-testid="ping-message"]').text()).toBe(
      "pong (mocked-backend)",
    );
  });

  it("lets a single test override the server behaviour", async () => {
    server.use(
      http.get(`${API_URL}/api/ping`, () =>
        HttpResponse.json({ message: "hallo", server: "test" }),
      ),
    );

    const wrapper = mount(ABackendPing);
    await wrapper.get('[data-testid="ping"]').trigger("click");
    await flushPromises();

    expect(wrapper.get('[data-testid="ping-message"]').text()).toBe("hallo (test)");
  });

  it("shows an error when the other server fails", async () => {
    server.use(
      http.get(`${API_URL}/api/ping`, () => new HttpResponse(null, { status: 500 })),
    );

    const wrapper = mount(ABackendPing);
    await wrapper.get('[data-testid="ping"]').trigger("click");
    await flushPromises();

    expect(wrapper.find('[data-testid="ping-error"]').exists()).toBe(true);
  });
});
