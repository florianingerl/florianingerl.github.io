import { createApp } from "vue";
import { createPinia } from "pinia";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

// Einstiegspunkt nur für die Playwright-E2E-Tests (siehe auth.html). Er bindet
// das Quiz ein, damit sich der Login- und der Registrierdialog im echten
// Browser öffnen lassen.
createApp(VueQuiz, { quiz: "english", lg: "en" })
  .use(createPinia())
  .mount("#auth-app");
