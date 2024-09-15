<template>

<div>
<h1 class=".text-danger">Courir et conduire à tous les temps et modes</h1>

<p>
Cherche les mot conduire et courir dans un dictionnaire, par exemple celui de <a style="text-transform: none" href="https://www.larousse.fr/dictionnaires/francais/courir">Larousse</a> .
Puis fais le test!
</p>
   
<VueExercise instruction="Remplis les trous avec la bonne conjugaison du verbe courir ou conduire! Bonne chance!">

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
       gaptext: [ "Si Paul avait déjà son permis de {conduire}, il ne prendrait plus le métro.",
       "Ce weekend, notre équipe de football {coura} 20 kilomètres pour nous entraîner pour le semi-marathon de Berlin.",
"En {conduissant} ses enfants à l\'école, la mère a l\'occasion de leur parler et d\'apprendre quelque chose sur leurs vies.",
"Il faut que tu {coures} s\'il ne te reste que peu de temps pour atteindre un rendez-vous.",
"Le prof {a conduit} ses élèves dans la nature et leur a enseigné les noms des fleurs les plus courants.",
"C\'est le sentier le plus court qui vous {conduisse} au sommet de la montagne.",
"Si les fausses indictions sur les panneaux ne m\'avaient pas {conduit} dans cette forêt sombre, je serais déjà rentré et aurais pris un bain chaud.",
"Ses mains {couraient} vite sur le clavier de mon ordinateur et, en que peu de temps, il avait réparé mon ordinateur.",
"Peut importe dans quelle équipe Christiano Ronaldo joue, il {conduit} son équipe vers la finale de la ligue de Champions.",
"Laisse tes pensées {courir} et les observe simplement. De cette façon, tu obtiendras de la paix et maîtrise de ton esprit.",
"Les critiques perpetuels des profs l\'ont {conduit} à l\'abondonce de tous ses efforts.",
"Le prof {conduisait} bien son entreprise et par conséquant, tous les employées étaitent heureux d\'y travailler.",
"Si l\'argent ne {conduisait} pas le monde, il y {aurait} probablement simplement beaucoup de confusion.",
"{Conduis}-toi bien! Sinon, je dois t\'enseigner de bonnes manières.",
"Le rumeur {court} dans l\'entreprise que le patron démissionera.",
"Demain, la mère {conduira} ses enfants chez leur peur qu\'ils ne peuvent rendre visite qu\'une fois par mois après le divorce.",
"L\'eau ne {conduit} l\'éléctritité que si en ajoute du sel."
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