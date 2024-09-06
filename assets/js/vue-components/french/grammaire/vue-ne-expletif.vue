<template>

<div>
<h1 class=".text-danger">Le mot encore</h1>

<p>
Renseigne-toi sur ne explétif sur l'Internet, par exemple  <a href="https://www.lawlessfrench.com/grammar/ne-expletif/">là-bas</a>
Puis reviens et fais le test ci-dessous.
</p>
   
<VueExercise instruction="Choisis s'il s'agit d'un ne explétif ou d'une négation!">

<VueMCGaps lg="fr" :gaptext="gaptext" :same="true">

</VueMCGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  name: "VueNeExpletif",
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
       gaptext: [ "Je ne veux plus parler à toi au moins que tu ne t'excuse. {explétif}",
"J'ai mangé plus que mon estomac ne peut digester. {explétif}",
"Nous ne nous connaissons à peine et tu veux déjà m'épouser? {négation}",
"Ne me raconte pas de mensonges!{négation}",
"J'ai un autre charactère que tu ne le penses.{explétif}",
"Elle craint que son mari n'aie une liasion avec une autre femme. {explétif}",
"Le chien ne veux que jouer, il ne te mordra pas. {négation}",
"Le moindre que tu ne peux faire, c'est de t'excuser. {explétif}",
"Je veux voyager en France pour notres vacances d'été. Je ne veux aller nulle part ailleurs. {négation}",
"Je ne vois aucun bouton indiquant Annuler l'achat.{négation}",
"Merci de ne plus m'embêter. {négation}",
"Tu m'embêtes autant que je ne peux plus le supporter. {négation}",
"Camille a rangé sa chambre de peur que sa mère ne se fâche. {explétif}",
"Je ne la connais guère. Par conséquent, il n'est pas juste de la juger. {négation}"
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