<template>
  <RegexExercise v-for="exercise in exercises" :exercise="exercise" />
</template>

<script>
import RegexExercise from './vue-regex-exercise.vue';

export default {
  name: 'RegexExercises',
  components: {
    RegexExercise
  },
  data(){
    return {
      exercises : []
    }
  },

  mounted() {
    console.log("Mounted!!!");

    fetch("uebung/informatik/regexexercises.json")
      .then((response) => response.json())
      .then((data) => { console.log(data); this.exercises = data; console.log(this.exercises); console.log(this.exercises[0]); } );
  
    
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
