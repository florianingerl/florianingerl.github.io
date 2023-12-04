<template>

<div>

<h1>Tant ou si</h1>

<p>Cas 1: +tant+de+Nom+que :</p>

     J'avais tant faim que je pouvais manger un kilo de lentilles à un seul repas.

<p>Cas 2: si+adjectif+que</p>

      Il me fait si froid que je veux plutot mourir.
   
<VueExercise instruction="Remplis les trous avec si ou tant!">

<VueGaps lg="fr" :gaptext="gaptext" />

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";

export default {
  name: "VueNiNi",
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
       gaptext: ["J'avais {tant} peur que je me cachait sous mon lit.",
"Il chantait {si} fort qu'il faillait mettre les doigts dans les oreilles.",
"Ils faisaient {tant} de bruit qu'on ne pouvait plus entendre ses propres mots.",
"Il y a {tant} de choses à faire.",
"J'ai {tant} de soucis que je ne peux plus dormir.",
"Je suis {si} occupé que je n'ai pas le temps de me faire des soucis.",
"Je suis {si} inquiète que je ne peux presque plus respirer.",
"Une {si} simple chose comme une occupation peut nous aider à chasser tous nos problèmes.",
"J'étais plongé {si} profondement dans mon travail que je ne pensait plus à mes problèmes."]
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




</style>