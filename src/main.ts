import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { i18n, resolveInitialLocale } from "./i18n";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "aos/dist/aos.css";
import "../assets/css/style.css";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVue);

document.documentElement.lang = resolveInitialLocale();

app.mount("#app");
