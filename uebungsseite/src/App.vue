<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <RegexExercise v-for="exercise in exercises" v-bind:key="exercise.id" :exercise="exercise" />
     

  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import RegexExercise from './components/RegexExercise.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, RegexExercise
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
