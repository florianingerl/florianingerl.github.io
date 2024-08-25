<template>

<div>

<h1>Dont ou duquel - petit exercice avec des tamis de cresson</h1>

<p>
<img style="height: 100px" src="assets/img/rawfood/tamisdecresson.jpg"  alt="Tamis de cresson"></img>
Merci de lire <a href="https://www.francaisfacile.com/exercices/exercice-francais-2/exercice-francais-105504.php">ce cours</a> sur francaisfacile.com. Puis,
revenez ici et fais mon test! Bonne chance!
</p>
   
<VueExercise instruction="Remplis les trous avec dont ou duquel">

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
  name: "VueDontDuquelCresson",
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
       gaptext: "L'ordinateur {dont} le clavier me sert à cet instant pour écrire ce test est assez nouveau. Mon père près {duquel} j'habite me l'a offert. Mon père achète tout le temps des trucs " +
"{dont} il n'a pas besoin et cet ordinateur n'en fait pas d'exception. La souris à côté {de laquelle} est posé mon ordinateur est aussi un cadeau de mon père. Les souris {dont} mon père a une dizaine sont bien sûr des souris d'ordinateur, pas de souris qui peuvent vous mordre. Les courses au cours " +
"{desquels} mon père obtient toutes ces souris se déroulent dans les Aldis, une chaîne de magasins en Allemagne où il peut acheter beaucoup de déchet pour presque gratuit. Contrairement à mon père, ma passion " +
"{dont} je suis très fier, c'est d'économiser autant d'argent que possible, n'achetons que des choses " +
"{dont} je profite parce qu'elles sont utiles. Par exemple hier, j'ai acheté un tamis à cresson " +
"{dont} le diamètre est de 20 centimètres. Quelques tamis à cresson à cause " +
"{desquels} j'ai dépensé tant d'argent se trouvent en ce moment devant ma fenêtre et les regarder remplis de cresson me réjouit. Les autres tamis à cresson à l'intérieur " +
"{desquels} se trouvent maintenant des graines de lin sont posés sur la table de ma cuisine. La brosse " +
"{dont} mes tamis à cresson sont nettoyés y est également. Je suis un peu fatigué maintenant et satisfait de ce test à la fin " +
"{duquel} vous êtes arrivé."
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