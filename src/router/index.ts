import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WhiteboardView from "@/views/WhiteboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/whiteboard",
      name: "whiteboard",
      component: WhiteboardView,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Ein Link wie "#franzoesisch?topic=..." hat hinter dem "#" noch
      // eine Abfrage. Angesprungen wird nur das Element davor.
      return { el: to.hash.split("?")[0] };
    }
    return { top: 0 };
  },
});

export default router;
