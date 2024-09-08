<template>

<div>

<h1>Celui, celle, ceux ou celles - petit exercice avec des voleurs</h1>

<p>
Merci de lire par exemple <a target="_blank" href="https://www.francaisfacile.com/exercices/exercice-francais-2/exercice-francais-2922.php"> ce cours</a> sur les pronoms démonstratifs. Puis,
revenez ici et faites mon test en remplissant les trous avec celui, celle, ceux ou celles! Bonne chance!
</p>
   
<VueExercise instruction="Remplis les trous avec celui, celle, ceux ou celles">

<VueGaps lg="fr" :gaptext="gaptext">

</VueGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";

export default {
  name: "VueCeluiCelle",
  components: {
    VueExercise,
    VueHideShow,
    VueGaps
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       gaptext: "Aujourd'hui, j'ai pass{é} une bonne journ{ée}. Le ciel était éclair{é} par de la lumière dor{ée} du soleil." +
 "En un tel jour, on ne veut bien sûr pas regard{er} la tél{é} {et} en effet, j'ai décid{é} de faire un tour en vélo." +
 "Mon vélo était gar{é} au rez-de-chaus{ée} de mon appartement." +
 "Après avoir quitt{é} mon canapé, j'ai mis mes chaussures les plus confortables. Elles n'étaient pas trop justes de sorte qu'elles ne blessaient pas mes pi{ed}s.\n" +
 "J'ai commenc{é} mon tour. La chaus{ée} était bien sêche. Car il faisait si chaud, comme un ouvri{er}, j'ai enlevé mon T-shirt pour que ma peau toute nue puisse encore mieux profiter du soleil. Ahhh!" +
 "Ce sont les jours de cong{é} comme celui-là qui me donnent un sentiment de liberté {et} de légèreté. Mes yeux savouraient la beaut{é} de la nature." +
 "{Celui} qui n'est plus là. Dans le pays d'où elle vient, on arrache un doigt de la main des voleurs. Et regarde! " +
 "{Celui} qui m'a volé la montre a subi la même punition que " +
 "{celle} de sa complice. Lui aussi, il lui manque un doigt. Mais c'est complètement barbare! J'aime mieux les punitions en France que " +
 "{celles} dans les pays sous-développés."
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