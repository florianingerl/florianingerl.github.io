<template>

<div>

This is just a stupid test

<VueExercise lg="fr" instruction="This is just a stupid test">
<VueMCGaps lg="fr" gaptext="{His|My|Your} bag belongs to {him}. The bag belongs to Paul.">

</VueMCGaps>
</VueExercise>
   
<VueExercise instruction="Mettez les mots dans le bon ordre!">

<VueWordOrder lg="fr" :sentences="[
    'Ainsi a Paul mouru.',
    'Devant ma fenêtre sont mes pousses de brokoli.',
    'Ce que m\'a dit Paul me semble faux.',
    'Ce qu\'il a dit me semble juste.',
    'Bientôt viendra le crépuscule.',
    'Que penses tu?',
    'Ton ami partira?',
    'As-tu peur des chien?',
    'Quand part le train pour Paris?',
    'Quand l\'avion pour l\'Allemagne part-il?',
    'À quoi penses-tu?',
    'À propos de quoi discutent-ils?',
    'Ton patron a-t-il des enfants?',
    'Les vacances sont-ils trop courts?',
    'La fille des voisins te plaît?',
    'Ton mari a-t-il des liaison avec autres femmes?',
    'Court-il vite!',
    'Combien de pommes as-tu mangées?',
    'Quel livre as-tu lu?',
    'Quel chemin est à prendre'



]">

</VueWordOrder>

</VueExercise>

</div>


    
</template>

<script setup lang="ts">
import VueExercise from "../../../atoms/VueExercise.vue";
import VueMCGaps from "../../../atoms/VueMCGaps.vue";
import VueWordOrder from "../../../atoms/VueWordOrder.vue";
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
