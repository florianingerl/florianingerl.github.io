<template>
<h1>The exclamation mark in French</h1>
<div>
<p>
In the French language, there must be a space before and after the exclamation mark.
</p>

<p>
In the following exercise, do a Find-And-Replace operation such that there is exactly one space before and after the exclamation mark.
</p>

<RegexExercise :exercise="{ instruction: 'Ensure that there is exactly one space before and after the exclamation mark!', 
 editor: 'Hors de ma vue   !Je ne peux plus te supporter. Quelle suprise que tu es là!Je suis enchanté. Quel dommage que tu n\'étais pas là!  La fête était très bonne.', find: '(\\s*)\\!(\\s*)', replaceby: ' ! ' }" ></RegexExercise>

</div>
</template>



<script>
import RegexExercise from './../vue-regex-exercise.vue';

export default {
  name: 'RegexPointDExclamationFrench',
  components: {
    RegexExercise
  },
  data(){
    
  },

  mounted() {
    
  
    
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
