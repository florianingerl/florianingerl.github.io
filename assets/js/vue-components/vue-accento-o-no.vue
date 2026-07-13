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
			imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
			gapText: "È un giocatore di calcio ? {Sì|Si}."
		 },

     {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/chilis.jpg",
			gapText: "Carla {si|sì} compra spesso chili perché {si|sì} gli piacciono molto."
		 },

      {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/botella.jpg",
			gapText: "Carla {dà|da} una bottiglia di vino a sua madre per il suo compleanno."
		 },

     {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "L'albero {dà|da} i frutti in agosto."
		 },

     {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Né mio padre {né|ne} io mangiamo la pasta."
		 },

        {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "La macchina non ha bisogno di bere {tè|te} ma di benzina."
		},

      {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Sei una bella donna. Voglio uscire con {te|té}."
		},

      {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Dopo della festa, Carla se {ne|né} è andata in macchina."
		},

     {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "{Se|Sé} guardo un albero, sono felice."
		 },




]
    };
  },
 
};
</script>

<style scoped>

</style>