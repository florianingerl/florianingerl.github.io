<template>
<h1>Regular Expression to find and replace text</h1>
<div>
<p>
Regular expressions can be used to find and replace text that match a certain pattern.
<h3>Matching digits</h3>
For example, you can write "\d" to search for a digit. So the search for "\d" in the string
"Hallo123goodby45" would find 5 things.

<RegexExercise :exercise="{ instruction: 'Replace every digit by the word young', 
 editor: 'Baby Alfred is 2. Baby Dennis is 3. Baby Frieda is 5.', find: '\\d', replaceby: 'young' }" ></RegexExercise>
<h3>Repetitions</h3>
By searching for "\d+", you can search for a sequence of at least one digit. So the search for
"\d+" in "Hallo123goodby45" would find 2 things, i.e. "123" and "45".

<RegexExercise :exercise="{ instruction: 'Replace every age by a teenager', 
 editor: 'Alfred is 12. Dennis is 15. Frieda is 16.', find: '\\d+', replaceby: 'a teenager' }" ></RegexExercise>
</p>
<p>
<h3>Using groups in the replace string</h3>
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

  <RegexExercise :exercise="{ instruction: 'Please swap the arguments of the addEdge function. For example g.addEdge(3,4) should become g.addEdge(4,3)',
   editor: 'g.addEdge(3,4)\ng.addEge(100,3)\ng.addEdge(56,3)', find: '(\\d+),(\\d+)', replaceby: '$2,$1' }">

  </RegexExercise>

<div>
<h3>Match any character</h3>
"." matches any character except the newline-character. So ".*" would match anything until the end of this line. If you write "(.*)" it matches everything until the end of this line
and capture the result in a group to be used in the replace string.
<h3>Match spaces</h3>
"\s" matches any space-character including spaces and tabs. This is frequently used. So "\s+" would match at least one space character.
</div>

<RegexExercise :exercise="{ instruction: 'Replace each point by a html list entry, for example -le sommeil should be replaced by <li>le sommeil</li>. Possible whitespace characters after the - should be removed!',
 editor: '- le sommeil\n- l’eau\n- la nourriture\n- le soleil\n- les liens sociaux\n- l’exercice physique',
 find: '-\\s*(.*)',
 replaceby: '<li>$1</li>' }" > </RegexExercise>

<RegexExercise :exercise="{instruction:'Replace each point by a html list entry, for example 1. Des fruits should be  replaced by <li>Des fruits</li>. Please also get rid of useless whitespace.',
editor: '1. Des fruits et légumes de qualité (carburant et nutriments)\n2. Des feuilles vertes (nutriments et fibres)\n3. Une source grasse protéinée (noix, olive, fruit gras, oeuf, poisson, viande)',
find: '\d+\.\s*(.*)',
replaceby: '<li>$1</li>' }" ></RegexExercise>

<div>
<h3>Backreferences</h3>
With "\n" , you can match whatever the n-th group captured. E.g. "\1" matches whatever the first group captured.
E.g. "(i|s)=\1+5" would match "i=i+5" and it would match "s=s+5" but would not match "s=i+5".

<h3>Escape special characters</h3>
Certain characters have a special meaning in Regular Expressions like +,*,.,| and so on.
If you want to match these and not have them interpreted as metacharacters of the Regular Expressions, you need to escape them, i.e.
write "\." if you want to match "." and write "\+" if you want to match a "+".

</div>

 <RegexExercise :exercise="{ instruction: 'Try to use the +=, *=, -= operators whereever possible. For example i=i+5 should become i+=5', 
 editor: 'let i=7;\ni=i+5;\ni=i*78;\nlet s=5;\ns=s-1;\n', find: '(i|s)\\s*=\\s*(\\1)\\s*(\\+|\\*|\\-)\\s*(\\d+)', replaceby: '$1$3=$4' }" ></RegexExercise>


<h3>Negative look-behind</h3>
With "(? < !regex1)regex2" you can match anything that matches regex2 but is not proceded by anything matching regex1.
E.g. "(? < !a)b" would find the "b" in "ccccb" but would not find the "b" in "ccccab" because it is proceded by an a.


<RegexExercise :exercise="{ instruction: 'Replace every score by labelscore, that includes that labelscore should not become labellabelscore! So use a negative lookbehind!', 
 editor: 'score is high. labelscore is a variable name for a label where the score is displayed. score can be increased or score can be decreased which the score label then displays.', find: '(?<!label)score', replaceby: 'labelscore' }" ></RegexExercise>

 <h3>Negative look-ahead</h3>
With "regex1(?!regex2)" you can match anything that matches regex1 but is not followed by anything matching regex2.
E.g. "b(?!a)" would find the "b" in "bccc" but would not find the "b" in "baccc" because it is followed by an a.

<RegexExercise :exercise="{ instruction: 'Replace every info by information, that includes that information should not become infoinformation! So use a negative lookahead!', 
 editor: 'info is the abbreviation of information. infos are available through the Internet. info makes you smarter', find: 'info(?!rmation)', replaceby: 'information' }" ></RegexExercise>

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
