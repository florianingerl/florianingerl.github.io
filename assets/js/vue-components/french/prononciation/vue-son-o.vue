<template>

<div>

<h1>Le son o</h1>

<p>
Merci de lire par exemple <a style="text-transform: none" target="_blank" href="https://www.jerevise.fr/son-e-er-et-phoneme-mots.html">ce cours</a> sur le son é en francais. Puis,
revenez ici et faites mon test en remplissant les trous! Bonne chance!
</p>
   
<VueExercise instruction="Remplis les trous avec eau, eaux, o, ô, ot!">

<VueMCGaps lg="fr" :gaptext="gaptext">

</VueMCGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  name: "VueSonE",
  components: {
    VueExercise,
    VueHideShow,
    VueMCGaps
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       gaptext: "Commenç{o}ns avec une autre petite histoire ! Aujourd'hui, il faisait très ch{au}d et b{eau}coup de gens" +
" avaient besoin de porter un chap{eau} pour pr{o}téger leur tête c{o}ntre le soleil. Mais pas moi qui ne peux avoir jamais" +
" tr{o}p de s{o}leil et de chaleur. On peut encore mieux savourer le b{o}n temps si on vient d'{o}btenir s{o}n baccal{au}reat, comme " +
" dans le cas de b{eau}coup de jenues adultes. Ésper{o}ns que le b{o}n temps ne se chachera jamais comme les fant{ô}mes. Ça," +
" je ne le trouverais pas dr{ô}le du tout. Car je n'ai pas de m{o}to, j'ai pris mon vél{o} pour faire un tour aujourd'hui." +
" Les pann{eaux} m'indiquaient toujours la bonne direction. Pour la plupart de mon tour, je conduisait mon vélo à c{ô}té d'une fleuve" +
" sur laquelle il y avait pas mal de gens dans leur bat{eau}. Ils chantaient des chans{o}ns et les enfants jouaient avec" +
" des ballons. Utiliser le m{o}t balle au lieu de ball{o}n serait f{aux} si sa taille n'est pas si grand. Pas sûr si cela v{au}t la peine" +
" maintenant de vous expliquer la différence entre bille, balle et ballon ou cela ne vous intéresse pas. Lorsque j'ai rencontré" +
" une feu rouge, j'ai toujours vérifier qu'il n'y avait pas de flics alentour avant de la traverser. Parce que je n'aime pas" +
" les flics sur mes tal{o}ns. Au contraire, je suis un garç{o}n qui chérit sa liberté. Mais j'ai vu la p{o}lice qui avait arreté" +
" un homme qui avait tr{o}p chargé son chari{ot}. Quand je suis rentré, je n'ai pas mangé de gât{eau} mais des pousses de br{o}k{o}li. " +
" Ça v{au}t toujours la peine d'en faire bien que ce soit b{eau}coup de boul{ot} de l'arr{o}ser. Maintenant, c'est la fin de" +
" mon histoire. A bient{ô}t !"
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