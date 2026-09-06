import { createApp } from "vue";
import VueQuiz from "./components/VueQuiz.vue";
import VuePaypal from "./components/vue-paypal.vue";
import type { Lang, QuizName } from "./types";

// Jeder <div data-quiz="..." auf der Seite bekommt ein eigenes Quiz
document.querySelectorAll<HTMLElement>("[data-quiz]").forEach((el) => {
  createApp(VueQuiz, {
    quiz: el.dataset.quiz as QuizName,
    lg: (el.dataset.lg ?? "de") as Lang,
  }).mount(el);
});

// Jeder <div data-paypal="..."> bekommt den PayPal-Kasten
document.querySelectorAll<HTMLElement>("[data-paypal]").forEach((el) => {
  createApp(VuePaypal, { sprache: el.dataset.paypal ?? "" }).mount(el);
});
