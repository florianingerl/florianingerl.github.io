<template>
<h1>Quotation marks in the French language</h1>
<div>
<p>
These « » are French quotation marks that introduce for example direct speech.
You need a space before and after each of the quotation marks.
</p>

<p>
In the following exercise, do a Find-And-Replace operation such that the English quotation marks are replayed by French ones and such that there is exactly one space before and after each of the qutation marks.
You can get « on your keyboard by pressing Alt+0171 or by copying from this sentence and you can get » by pressing Alt+0187.
</p>

<RegexExercise :exercise="{ instruction: 'Replace the English quotation marks by the French ones! ', 
 editor: editorContent ,  find: findString,  replaceby: ' « $1 » ' }" ></RegexExercise>

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
        editorContent: ' "Je suis affamé." dit le petit Prince. "      Je veux manger quelque chose.    "    ',
        findString: '\\s*"\\s*(([^"])*?)\\s*"\\s*'
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
