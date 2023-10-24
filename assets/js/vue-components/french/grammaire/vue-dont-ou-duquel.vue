<template>

<div>
   
<VueExercise instruction="Remplis les trous avec dont ou duquel">

<VueGaps lg="fr" gaptext="Est-ce que tu vois le graine de blé près {duquel} il y a un petit animal.
Je ne connais pas le nom des petits animals à cause {desquels} mes graines de céréales ont disparu.
Regarde là-bas. Il y a un de ces petits animals {dont} le ventre est plein de graines.
J'aime bien mes repas au bout {desquels} je me sens plein d'énergie.
Est-ce que tu vois ce graine de seigle au coeur {duquel} se cache beaucoup de force?
Est-ce que tu comprends ce {dont} je viens de te parler?">

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