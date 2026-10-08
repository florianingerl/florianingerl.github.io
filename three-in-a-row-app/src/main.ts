import { createApp } from "vue";
import VueThreeInARow from "./components/VueThreeInARow.vue";
import "./style.css";

// Jeder <div data-three-in-a-row> auf der Seite bekommt das Spiel.
document.querySelectorAll<HTMLElement>("[data-three-in-a-row]").forEach((el) => {
  createApp(VueThreeInARow).mount(el);
});
