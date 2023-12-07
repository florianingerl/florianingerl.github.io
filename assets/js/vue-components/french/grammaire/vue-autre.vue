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
   
<VueExercise instruction="Remplis les trous avec certain(e(s)), autre(s), des autres, d'autres, un/une autre">

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

  methods() {
    
  },
  
  data() {
    return {
       gaptext: ["J'ai fait assez. Je ne peux plus faire {autre|d'autre|des autres} chose.",
       "Je n'ai confiance qu'en moi. Je n'ai pas confiance en {les autres|des autres|autres}.",
"Mon ordinateur n'a plus assez de mémoire. Il faut en achèter {un autre|des autres|d'autres}.",
"Il y avait tant de neige que seulement Hans et Erwin sont venus au cours. {Les autres|D'autres|Des autres} sont restés à la maison.",
"Parmi mes graines de blé, {certains|les autres|d'autres} sont cassés, mais {les autres|d'autres|des autres} poussent très bien.",
"Pour se procurer des bons habitudes, il faut observer les bons habitutes {des autres|d'autres}.",
"Elle a déjà une dizaine de chaussures, mais elle veux en acheter encore {d'autres|des autres|les autres}."

       ]
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