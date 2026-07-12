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
			type: 'gapText',
			imageUrl: "assets/img/rawfood/kressefensterbrett.JPG",
			gapText: 'Yo {soy|estoy} Florian.'
		},

        {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Esta muyer {es|está} bonita."
		},

         {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Mi coche {es|está} rojo."
		}

]
    };
  },
 
};
</script>

<style scoped>

</style>