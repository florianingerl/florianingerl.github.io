
//import App from './App.vue'
import RoutingTest from './RoutingTest.vue'
import VueRouter from 'vue'
import Vue from 'vue'
import MyHome from "./components/MyHome.vue"
import MyAbout from "./components/MyAbout.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
        path: '/home',
        name: 'home',
        component: MyAbout
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/settings',
        name: 'settings',
        component: MyHome
    }]
})


// Now the app has started!
/*
new VueRouter({
    mode: 'history',
   
}); */

const app = Vue.createApp(RoutingTest)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')
