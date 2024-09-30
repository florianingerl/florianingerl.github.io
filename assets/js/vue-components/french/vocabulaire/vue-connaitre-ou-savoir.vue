

<template>

<div>
<h1 class=".text-danger">Connaître ou savoir à présent de l'indicatif</h1>

<p>
Cherche les mots savoir et connaître dans un dictionnaire, par exemple celui de <a style="text-transform: none" href="https://www.larousse.fr/dictionnaires/francais/savoir">Larousse</a>.
Puis fais le test!
</p>
   
<VueExercise lg="fr" instruction="Remplis les trous avec la bonne conjugaison du verbe connaître ou savoir! Bonne chance!">

<VueMCGaps lg="fr" :gaptext="['{Connais}-tu le garçon avec les cheveux blonds qui est assis à côté de Jérome?',
'En Allemagne, après avoir quitté le lycée, la plupart des élèves ne {savent} pas tenir une conversation en français.',
'Après l\'école primaire, les élèves {connaissent} les nombres jusqu\'à 100.',
'Un apprenant du français dans un lycée d\'Allemagne ne {connaît} que quelques mots, mais il ne {sait} pas comment en former des phrases.',
'Je {connais} ce genre d\'exercice et par consequent, je {sais} comment le résoudre.',
'Nous {connaissons} l\'Italie parce que nous y voyageons chaque année pour les vacances d\'été.',
'Nous ne {savons} pas ce que tu veux parce que tu ne l\'as pas dit.',
'{Connaissez}-vous tous les joueurs de football de Bayern Munich?',
'{Savez}-vous pas comment traîter une jolie dame? Il faut lui offrir un bouquet de fleurs!',
'Tous les joueurs de Bayern Munich {savent} qu\'ils doivent courir dans l\'autre direction après la récréation.']">

</VueMCGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  name: "VueConnaitreOuSavoir",
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
"En {conduisant} ses enfants à l\'école, la mère a l\'occasion de leur parler et d\'apprendre quelque chose sur leur vie.",
"Il faut que tu {coures} s\'il ne te reste que peu de temps pour atteindre un rendez-vous.",
"Le prof {a conduit} ses élèves dans la nature et leur a enseigné le nom des fleurs les plus courants.",
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