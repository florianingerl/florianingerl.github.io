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

<script setup lang="ts">
import { ref } from "vue";
import RegexExercise from "../../../atoms/RegexExercise.vue";

const editorContent = ref('label.setText("Amen"); label.setText("God is good to humanity"); label.setText("Regular expressions work");');
const findString = ref('label\\.setText\\("([^"]*)');
const replaceString = ref('textArea.appendText("$1"+"\\n');
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
