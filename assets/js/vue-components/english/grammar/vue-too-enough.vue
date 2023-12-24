<template>

<div>
<h1>Enough and Too</h1>
You can say the same thing in three different ways:
<ul class="withborder">
<li>I couldn't carry that bag of wheat. It was too heavy.</li>
<li>The bag of wheat was so heavy that I couldn't carry it.</li>
<li>The bag of wheat was too heavy to carry.</li>
</ul>
Some more examples like this:
<ol>
<li>
<p>The pencil is too long to put in your pencil case.</p>
<p>(and not too long to put <i>it</i> in your pencil case)</p>
</li>

<li>
<p>The horse is too tall to climb on without a chair.</p>
<p>(and not too tall to climb on <i>it</i> without a chair)</p>
</li>

<li>
<p>The story was not exciting enough to remember.</p>
<p>(and not exiting enough to remember <i>it</i>)</p>
</li>

</ol>

<h4>Now it's up to you!</h4>


<VueExercise instruction="Make one sentence from two like in the example">
<div>
<p>Exemple:</p>
<p>These children can't go to school. They are not old enough.</p>
<p>These children aren't old enough to go to school.</p>
</div>

<VueWholeSentence :sentences="sentences1" />



</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";

export default {
  name: "VueEnoughToo",
  components: {
    VueExercise,
    VueHideShow,
    VueGaps,
    VueWholeSentence
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       sentences1: [{task: "He can wait until his turn. He is patient enough.",
       solution: "He is patient enough to wait until his turn." },
       {task: "Sabine can run 100 m in 10 s. She is fast enough.", solution: "Sabine is fast enough to run 100 m in 10s"},
       {task: "You can reach the ceiling with that stick. It is long enough.", solution: "The stick is long enough to reach the ceiling." },
       {task: "Anton can't be fooled. He is too intelligent.", solution: "Anton is too intelligent to be fooled."},
       {task: "You can't sit on that chair. It is not stable enough.", solution: "That chair isn't stable enough to sit on."},
       {task: "You can see through the window. It is clean enough.", solution: "The window is clean enough to see through."},
       {task: "You can't publish the story. It is too stupid.", solution:"The story is too stupid to publish."}]
    };
  }
}
</script>

<style scoped>
.nice {
    padding: 10px;
    border: solid 1px blue;
    border-radius: 5px;
    background-color: #ffe6ff;
    width: 70%;
    margin: 10px;
}

td {
    padding: 5px;
}

.withborder {
    border: solid 2px blue;
    background-color: white;
}




</style>