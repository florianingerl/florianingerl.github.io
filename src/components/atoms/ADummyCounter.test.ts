import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ADummyCounter from "./ADummyCounter.vue";

describe("ADummyCounter", () => {
  it("increments the counter when the button is clicked", async () => {
    const wrapper = mount(ADummyCounter);
    const button = wrapper.get('[data-testid="increment"]');

    expect(button.text()).toContain("count is 0");
    await button.trigger("click");
    expect(button.text()).toContain("count is 1");
  });

  it("shows the parity of the counter", async () => {
    const wrapper = mount(ADummyCounter);

    expect(wrapper.get('[data-testid="parity"]').text()).toBe("even");
    await wrapper.get('[data-testid="increment"]').trigger("click");
    expect(wrapper.get('[data-testid="parity"]').text()).toBe("odd");
  });

  it("greets the entered name", async () => {
    const wrapper = mount(ADummyCounter);

    expect(wrapper.get('[data-testid="greeting"]').text()).toBe("Hello world");
    await wrapper.get('[data-testid="name"]').setValue("Florian");
    expect(wrapper.get('[data-testid="greeting"]').text()).toBe("Hello Florian");
  });
});
