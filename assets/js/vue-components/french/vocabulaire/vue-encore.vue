<template>

<div>
<h1 class=".text-danger">Le mot encore</h1>

<p>
Cherche le mot encore dans un dictionnaire, par exemple celui de <a href="https://www.larousse.fr/dictionnaires/francais/encore/29244">Larousse</a> .
Puis fais le test!
</p>
   
<VueExercise instruction="Choissez le sens dans lequel encore apparaît dans la phrase! Bonne chance!">

<VueMCGaps lg="fr" :gaptext="gaptext">

</VueMCGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  name: "VueEncore",
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
       gaptext: [ "J'ai terminé mon travail, je vais en demander encore un peu ! {De surcroît, en outre}",
"Erwin n'a pas encore fini ses devoirs. {Opposition à déjà}",
"Ne me pose pas encore la même question ! {Opposition à déjà}",
"L'enfant n'a pas encore brossé ses dents. {Contraire de ne... plus}",
"J'ai encore le temps de jouer avec toi si tu veux ! {Contraire de ne... plus.}",
"Mentir et s'en réjouir est encore pire que de justement mentir .{ degré plus grand}",
"Pour ce poste, il te faut une longue expérience et encore faut-il que tu réussisses tous les entretiens préliminaires. {En addition, un autre}",
"Max n'a pas encore visité Londres. Il s'y rendra bientôt. {Opposition à déjà}",
"Encore une fois des spaghetti! Maman, tu ne peux jamais faire quelque chose d'autre? {l'impatience devant le renouvellement ou la continuation de quelque chose}",
"Vous êtes encore en retard ! Je ne peux plus supporter ce comportement. {Fait à répétition}",
"Il ne suffit pas d'avoir un don pour le football, encore faut-il de l'endurance et beaucoup d'entraînement. {En addition, un/une autre}",
"Pourrais-je avoir encore une tasse de thé ? {En addition, un/une autre}",
"Les pousses de blé sont encore mieux pour la santé que les bouillies de céréales fraîches de blé . {degré plus grand}",
"Encore toi qui a crée un nouveau test sur francaisfacile ! {l'impatience devant le renouvellement ou la continuation de quelque chose}"
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