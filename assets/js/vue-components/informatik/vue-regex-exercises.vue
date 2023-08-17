<template>
<h1>Regular Expression to find and replace text</h1>
<div>
<p>
Regular expressions can be used to find and replace text that match a certain pattern.
For example, you can write "\d" to search for a digit. So the search for "\d" in the string
"Hallo123goodby45" would find 5 things.
By searching for "\d+", you can search for a sequence of at least one digit. So the search for
"\d+" in "Hallo123goodby45" would find 2 things, i.e. "123" and "45".
</p>
<p>
Whatever was found/matched by the regular expression can then be replaced.
You can use parantheses in the search string to capture parts of the match in a group.
You can then use $1,$2,$3 to refer to group 1,2,3 and so on in the replace string.<br>
Example:
<p>
Florian was born in 1993. Sonja was born in 1991.
</p>
<p>
Let's say you want to replace this automatically to become:<br>
It was in 1993 that Florian was born. It was in 1991 that Sonja was born.
</p>
<p>
To achieve this, you would search for "([a-zA-Z]+) was born in (\d+)" and replace this by
"It was in $2 that $1 was born"
</p>
<img style="width:80%;"src="uebung/informatik/regexIllustration.png"></img>
</p>



</div>
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
