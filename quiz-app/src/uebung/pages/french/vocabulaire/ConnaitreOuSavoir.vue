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

<script setup lang="ts">
import VueExercise from "../../../atoms/VueExercise.vue";
import VueMCGaps from "../../../atoms/VueMCGaps.vue";
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
