<template>
    <vue-quiz :lg="lg" :questions="questions"></vue-quiz>
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
			topics: ["Conjugation of to be"],
		    instruction: "Conjugate the verb to be !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "The woman {is|am|are} beautiful."
		},

		{
			topics: ["Conjugation of to be"],
		    instruction: "Conjugate the verb to be !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "This car {is|am|are} red!"
		}

	
		

]
    };
  },
 
};
</script>

<style scoped>

</style>