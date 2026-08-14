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
			topics: ["Que ou qui"],
		    instruction: "Fais la bonne choix entre qui ou que!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "La femme,{qui|que} qui tient sa main sous son mouton, est très jolie."
		},

		

			{
				topics: ["Que ou qui"],
		    instruction: "Fais la bonne choix entre qui ou que!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "La vielle voiture {que|qui} je me suis achetée il y a quinze ans marche toujours!"
		},

	
		 {
			topics: ["Que ou qui"],
		    instruction: "Fais la bonne choix entre qui ou que!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Cette machine {qui|que} peut fabriquer des pattes, n'était pas chère."
		 },


		  {
			topics : ["Futur 1"],
			instruction: "Konjugiere werden für das Futur 1 !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "L'arbre {que|qui} tu vois dans l'image fournit un ombre agréable durant l'été."
		 }






]
    };
  },
 
};
</script>

<style scoped>

</style>