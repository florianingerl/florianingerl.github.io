import { createApp } from "vue";
import { createPinia } from "pinia";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

// Einstiegspunkt nur für die Playwright-E2E-Tests (siehe login.html). Er bindet
// das Quiz ein, damit sich der Login-Dialog im echten Browser öffnen lässt.
createApp(VueQuiz, { quiz: "english", lg: "en" })
  .use(createPinia())
  .mount("#login-app");
