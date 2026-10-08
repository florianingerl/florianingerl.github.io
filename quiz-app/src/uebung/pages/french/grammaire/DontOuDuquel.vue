<template>

<div>
   
<VueExercise instruction="Remplis les trous avec dont ou duquel">

<VueGaps lg="fr" :gaptext="gaptext">

</VueGaps>

</VueExercise>

</div>


    
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueExercise from "../../../atoms/VueExercise.vue";
import VueGaps from "../../../atoms/VueGaps.vue";

const gaptext = ref(["Est-ce que tu vois le graine de blé près {duquel} il y a un petit animal.",
"Je ne connais pas le nom des petits animals à cause {desquels} mes graines de céréales ont disparu.",
"Regarde là-bas. Il y a un de ces petits animals {dont} le ventre est plein de graines.",
"J'aime bien mes repas au bout {desquels} je me sens plein d'énergie.",
"Est-ce que tu vois ce graine de seigle au coeur {duquel} se cache beaucoup de force?",
"Est-ce que tu comprends ce {dont} je viens de te parler?",
"La nourriture saine est un sujet {dont} nous devons tous nous préoccuper.",
"Les haricots de mungo {dont} mon corps a besoin sont aussi financièrment à ma portée.",
"La femme {dont} je suis amoureux ne mange que des haricots de mungo."]);
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
