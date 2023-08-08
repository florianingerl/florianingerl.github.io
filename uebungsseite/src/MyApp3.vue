<template>

  <img alt="Vue logo" src="./assets/logo.png">
<VueTreeNavigation />
    <vue-tree-navigation />
     

  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VueTreeNavigation from 'vue-tree-navigation';

export default {
  
  name: 'MyApp3',
  components: {
    HelloWorld, VueTreeNavigation
  },
  data(){
    return {
      exercises : []
    }
  },

  mounted() {
    console.log("Mounted!!!");

    fetch("regexexercises.json")
      .then((response) => response.json())
      .then((data) => { console.log(data); this.exercises = data; console.log("Length of exercises" + this.exercises.length); } );
  }


  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
