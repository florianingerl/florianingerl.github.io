<template>
    <vue-quiz :lg="lg" :questions="questions" :name="English-Quiz"></vue-quiz>
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
      "Conjugation of to be"
    ],
    instruction: "Conjugate the verb to be !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "The woman {is|am|are} beautiful."
  },
  {
    topics: [
      "Conjugation of to be"
    ],
    instruction: "Conjugate the verb to be !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "This car {is|am|are} red!"
  },
  {
    topics: [
      "Who or what"
    ],
    instruction: "Conjugate the verb to be !",
    type: "multipleChoice",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/d0/8d/CLziaZ2mV28uUhflLcq.jpg",
    gapText: "The woman {is|am|are} beautiful.",
    question: "_____ is from Pakistan ?  - Keideasum.",
    options: [
      {
        option: "Who",
        correct: true
      },
      {
        option: "What",
        correct: false
      }
    ]
  },
  {
    topics: [
      "Who or what"
    ],
    instruction: "Conjugate the verb to be !",
    type: "multipleChoice",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/d0/8d/CLziaZ2mV28uUhflLcq.jpg",
    gapText: "The woman {is|am|are} beautiful.",
    question: "__________ is this man from Pakistan carrying ? - The flag of Pakistan.",
    options: [
      {
        option: "Who",
        correct: false,
        checked: false
      },
      {
        option: "What",
        correct: true,
        checked: true
      }
    ],
    correctlyAnswered: true
  },
  {
    topics: [
      "Which or who"
    ],
    instruction: "Conjugate the verb to be !",
    type: "multipleChoice",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/d0/8d/CLziaZ2mV28uUhflLcq.jpg",
    gapText: "The woman {is|am|are} beautiful.",
    question: "The flag from Pakistan, __________ is being carried by the man, is green.",
    options: [
      {
        option: "which",
        correct: true
      },
      {
        option: "who",
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


