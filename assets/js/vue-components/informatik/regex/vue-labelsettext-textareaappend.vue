<template>
<h1>Append text to a text area instead of setting the text of a label</h1>
<div>
<p>
Tasks like the one mentioned in the title of this exercise appear frequently in Programming and can be solved quickly with regular expressions.
</p>

<p>
In the following exercise, do a Find-And-Replace operation such that all label.setText("some Text"); are replaced by textArea.appendText("some Text" + "\n");
</p>

<RegexExercise :exercise="{ instruction: 'Do the Find-Replace-Operation mentioned above.', 
 editor: editorContent ,  find: findString,  replaceby: replaceString }" ></RegexExercise>

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
        editorContent: 'label.setText("Amen"); label.setText("God is good to humanity"); label.setText("Regular expressions work");',
        findString: 'label\\.setText\\("([^"]*)',
        replaceString: 'textArea.appendText("$1"+"\\n'
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
