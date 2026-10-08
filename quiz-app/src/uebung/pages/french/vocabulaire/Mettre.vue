<template>

<div>
<h1 class=".text-danger">Mettre à présent de l'indicatif</h1>

<p>
Cherche le mot mettre dans un dictionnaire, par exemple celui de <a style="text-transform: none" href="https://www.larousse.fr/dictionnaires/francais/mettre">Larousse</a>.
Puis fais le test!
</p>
   
<VueExercise lg="fr" instruction="Remplis les trous avec la bonne conjugaison du verbe mettre à présent de l'indicatif! Bonne chance!">

<VueMCGaps lg="fr" :gaptext="['Ne te {mets} pas en colère, s\'il te plaît. L\'affaire n\'est pas tellement important.',
'Je {mets} mes gants parce que mes mains sont froides.',
'Camille {met} la table avant que les invités n\'arrivent.',
'Les élèves {mettent} leur cahier sur leur table pour y copier ce que l\'écrit le prof sur le tableau noir.',
'Le prof commande aux élèves: << {Mettez} vos jouets dans votre cartable et faites attention à ce que j\'enseigne! >> ',
'<< {Mettons} la salade dans cette boîte à salade! >>  dit Camille à Joséphine avec qui elle fait la cuisine.']">

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
