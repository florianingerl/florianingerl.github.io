<template>
<h1>Normal brackets () and these brackets [] in the French language</h1>
<div>
<p>
There must be a space before and after the brackets, but not inside of them. Correct example: He was intelligent (and also sympathetic) .
Wrong example: He was intelligent( and also sympathetic ). It's the same with these brackets [].
</p>

<p>
In the following exercise, do a Find-And-Replace operation such that the spaces around the brackets are correct.
</p>

<RegexExercise :exercise="{ instruction: 'Ensure that the spaces around the brackets are correct.', 
 editor: 'Je n\'ai rien mangé depuis longtemps( vingt minutes ). Il faut traverser la rue(en s\'assurant d\'abord qu\'il n y a aucune voiture   ).' ,  find: findString,  replaceby: ' ($1) ' }" ></RegexExercise>

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
     return {
        findString: '\\s*\\(\\s*(([^)])*?)\\s*\\)\\s*'
     }
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
