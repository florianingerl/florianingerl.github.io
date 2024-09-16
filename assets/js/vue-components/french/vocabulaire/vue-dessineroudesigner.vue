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
       gaptext: [ "J'ai découvert un logiciel qui me {désigne} les erreur d'orthographe et de grammaire en les soulignant en bleu.",
       "Antoine a été {désigné} comme represantant de classe parce qu'il est aimé par tout le monde et a obtenu le plus de votes.",
"x dans les équations désigne un nombre qu'il faut trouver de sorte que l'équation soit vérfié.",
"Dirk Novizki est {désigné} pour être joueur de basketball parce qu'il est tellement grand.",
"Le lion {désigna} l'antilope le plus faible comme sa victime, puis le chassa.",
"C\'est le sentier le plus court qui vous {conduise} au sommet de la montagne.",
"Si les fausses indications sur les panneaux ne m\'avaient pas {conduit} dans cette forêt sombre, je serais déjà rentré et aurais pris un bain chaud.",
"Ses mains {couraient} vite sur le clavier de mon ordinateur et, en que peu de temps, il avait réparé mon ordinateur.",
"Peu importe dans quelle équipe Cristiano Ronaldo joue, il {conduit} son équipe vers la finale de la ligue des champions.",
"Laisse tes pensées {courir} et les observe simplement. De cette façon, tu obtiendras de la paix et la maîtrise de ton esprit.",
"Les critiques perpetuels des profs l\'ont {conduit} à l\'abondonce de tous ses efforts.",
"Le patron {conduisait} bien son entreprise et par conséquent, tous les employés étaitent heureux d\'y travailler.",
"Si l\'argent ne {conduisait} pas le monde, il y {aurait} probablement simplement beaucoup de confusion.",
"{Conduis}-toi bien! Sinon, je dois t\'enseigner de bonnes manières.",
"Ls rumeur {court} dans l\'entreprise que le patron démissionnera.",
"Demain, la mère {conduira} ses enfants chez leur père qu\'ils ne peuvent rendre visite qu\'une fois par mois après le divorce.",
"L\'eau ne {conduit} l\'électritité que si on y ajoute du sel."
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