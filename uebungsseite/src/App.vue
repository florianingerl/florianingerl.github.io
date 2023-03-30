<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <RegexExercise />
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import RegexExercise from './components/RegexExercise.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, RegexExercise
  }

  /*computed: {
    exercises(){
      fetch("./public/regexexercises.json")
      .then((response) => response.json())
      .then((data) => { console.log(data); return data; } );

    }
  }*/
  
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
