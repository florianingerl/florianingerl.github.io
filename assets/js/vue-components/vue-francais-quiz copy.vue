<template>
    <vue-quiz :lg="lg" :questions="questions" :name="French-Quiz"></vue-quiz>
</template>

<script>
import VueQuiz from "./vue-quiz.vue";

export default {

  components: {
    
    VueQuiz ,
  
  },

  props: ['lg'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       questions: 
     [
  {
    topics: [
      "Que ou qui"
    ],
    instruction: "Fais la bonne choix entre qui ou que!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "La femme,{qui|que} tient sa main sous son menton, est très jolie."
  },
  {
    topics: [
      "Que ou qui"
    ],
    instruction: "Fais la bonne choix entre qui ou que!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "La vielle voiture {que|qui} je me suis achetée il y a quinze ans marche toujours!"
  },
  {
    topics: [
      "Que ou qui"
    ],
    instruction: "Fais la bonne choix entre qui ou que!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Cette machine {qui|que} peut fabriquer des pattes, n'était pas chère."
  },
  {
    topics: [
      "Futur 1"
    ],
    instruction: "Konjugiere werden für das Futur 1 !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "L'arbre {que|qui} tu vois dans l'image fournit un ombre agréable durant l'été."
  },
  {
    topics: [
      "Que ou qui"
    ],
    instruction: "Fais la bonne choix entre qui ou que!",
    type: "multipleChoice",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/cb/5f/vLRDitVFuLocFn.jpg",
    gapText: "Le drapeau de Camerun {qui} a une étaile au mileu, se bouge dans le vent.",
    question: "Le drapeau de Camerun ____ a une étoile au mileau, se bouge dans le vent.",
    options: [
      {
        option: "qui",
        correct: true,
        checked: true
      },
      {
        option: "que",
        correct: false,
        checked: false
      }
    ],
    correctlyAnswered: true
  },
  {
    topics: [
      "Que ou qui"
    ],
    instruction: "Fais la bonne choix entre qui ou que!",
    type: "multipleChoice",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/cb/5f/vLRDitVFuLocFn.jpg",
    gapText: "Le drapeau de Camerun {qui} a une étaile au mileu, se bouge dans le vent.",
    question: "Le drapeau de Camerun ____ a une étoile au milieu, se bouge dans le vent.",
    options: [
      {
        option: "qui",
        correct: true
      },
      {
        option: "que",
        correct: false
      }
    ],
    correctlyAnswered: true
  }
],
    };
  },
 
};
</script>

<style scoped>

</style>