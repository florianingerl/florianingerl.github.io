<template>

<div>
<h1 class=".text-danger">D'autres</h1>
D'autres signifie "en plus" ou "davantage".
<p>Exemple:<br>
Je n'ai pas assez de lentilles. Il faut que j'en achète d'autres.
</p>

<h1 class=".text-danger">Des autres</h1>
Des est l'abbreviation de de + les. 
<p>Exemple:<br>
Un écrivain prend souvent de l'inspiration des autres écrivains.
</p>
   
<VueExercise instruction="Remplis les trous avec autres, des autres ou d'autres">

<VueMCGaps lg="fr" :gaptext="gaptext">

</VueMCGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  name: "VueAutre",
  components: {
    VueExercise,
    VueMCGaps
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       gaptext: ["J'ai fait assez. Je ne peux plus faire {autre|d'autre|des autres} chose.",
       "Je n'ai confiance qu'en moi. Je n'ai pas confiance en {les autres|des autres|autres}."]
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