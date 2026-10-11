import { createApp } from "vue";
import ADummyCounter from "@/components/atoms/ADummyCounter.vue";

// Einstiegspunkt nur für die Playwright-E2E-Tests (siehe dummy.html).
createApp(ADummyCounter).mount("#dummy-app");
