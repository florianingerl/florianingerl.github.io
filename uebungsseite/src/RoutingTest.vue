<script>
import MyHome from './components/MyHome.vue'
import MyAbout from './components/MyAbout.vue'
import NotFound from './components/NotFound.vue'
//import VueRouter from 'vue'

const routes = {
  '/': MyHome,
  '/about': MyAbout
};



export default {
  name: 'RoutingTest',
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound;
    }
  },
  mounted() {
    window.addEventListener('hashchange', ()=> {
        this.currentPath = window.location.hash;
    });
  }
}
</script>


<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />

  <button 
  class="btn btn-primary" 
  data-bs-target="#collapseTarget" 
  data-bs-toggle="collapse">
  Bootstrap collapse
</button>
<div class="collapse py-2" id="collapseTarget">
  This is the toggle-able content!
</div>

<p>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>


</template>