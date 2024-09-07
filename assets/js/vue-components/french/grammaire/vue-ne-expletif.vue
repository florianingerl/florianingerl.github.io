<template>

<div>
<h1 class=".text-danger">Ne explétif</h1>

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
"Je ne la connais guère. Par conséquent, il n'est pas juste de la juger. {négation}",
"Il est moins intelligent qu'il ne le laisse paraître. {explétif}",
"J'évite ma mère de peur qu'elle ne me blesse encore avec ses paroles. {explétif}",
"Il y a longtemps que Marie n'a vu son chère amie de Canada. {explétif}",
"Personne ne fera peut-être ce test. {négation}",
"Rien ne m'êmpeche de l'écrire quand-même. {négation}",
"Il y a longtemps que je n'ai pris un jour de congé. {explétif}",
"Je fais toujours un grand arc autour de ma mère de peur qu'elle ne me frappe encore avec son bâton. {explétif}",
"Si tu fais du pipi dans les herbes, évite qu'on ne te voie. {explétif}",
"C'est rare que je ne mange des fruits parque mes dents n'aiment pas le sucre. {explétif}",
"Avant que tu ne me fasses des reproches, regarde ce que j'ai déjà accompli. {explétif}",
"J'ai peur de ce que le chien ne me morde. {explétif}",
"Je n'ai pas du tout peur des chien. {négation}",
"Je n'ai trouvé personne qui veut m'aider. {négation}",
"Je n'ai aucun sujet qui m'intéresse. {négation}",
"Je doute qu'il ne gagne autant d'argent qu'il ne le dise. {explétif}",
"Je doute que les politiciens n'aient des bonnes intentions. {explétif}",
"J'appréhende que mon mari n'aie une liason avec une autre femme et qu'il ne me quitte. {explétif} ",
"Ni Ron ni Hermione ne pouvaient consoler le Harry triste {négation}."
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