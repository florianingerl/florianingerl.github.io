<template>

<div>
   
<VueExercise instruction="Remplis les trous avec le verbe donné à l'imparfait ou au passé simple!">

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
  name: "VuePronomEnAvecMengenwort",
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
       gaptext: ["Un jour, un certain buveur {rencontra} (rencontrer) un saint. Car il {fût} (être) si impressioné des bons habitudes du saint, il {prit} (prendre) la décision d'arreter de boire.",
       "Il {emmena} (emmener) toutes les bouteilles dans la cave et {ferma} la cave à clé et il {donna} (donner) la clé à un de ses domestiques en lui commandant: ''Ne me rends pas la clé même si je te le demande. Il faut absolument que je m'arrete de boire.''",
       "De cette façon, il (était) (être) sauve du vin. Quand il {avait} (avoir) envie d'en boire, son domestique n'{était} (être) soit pas là soit il {était} trop gêné de lui demander la clé. "]
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