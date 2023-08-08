
import MyApp2 from "./MyApp2.vue"
import { createApp } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"
import MyHome from "./components/MyHome.vue"

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/bloed', component: MyHome }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(MyApp2)
app.use(router)

app.mount('#app')


