<template>
<h1>Quotation marks in the French language</h1>
<div>
<p>
These <code>« »</code> are French inverted commas that introduce for example direct speech.
You need a space before and after each of the inverted commas.
</p>

<p>
In the following exercise, do a Find-And-Replace operation such that the English inverted commas are replayed by French ones and such that there is exactly one space before and after each of the inverted commas.
You can get <code>«</code> on your keyboard by pressing <code>Alt+0171</code> or by copying from this sentence and you can get <code>»</code> by pressing <code>Alt+0187</code>.
</p>

<RegexExercise :exercise="{ instruction: 'Replace the English inverted commas by the French ones! ', 
 editor: editorContent ,  find: findString,  replaceby: ' « $1 » ' }" ></RegexExercise>

<h2>Tipps</h2>
<p> <code>\s</code> matches a whitespace character, such as a space or a tab.</p>
<p> The <code>*</code> means that the letter or the group before can be repeated an arbitrary number of times, including not at all.
E.g. <code>\d*</code> matches the empty word and any number of digits, i.e. it matches <code>0324</code> or <code>0789</code>
</p>
<p>

</p>


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
