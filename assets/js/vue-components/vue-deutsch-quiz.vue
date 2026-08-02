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
		    instruction: "Wähle zwischen nämllich, deshalb oder weil!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau verdreht den Männern die Köpfe. Sie ist {nämlich|deshalb|weil} sehr schön."
		},

		{
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto ist sehr günstig. {Deshalb|Nämlich|Weil} ist es sehr begehrt.."
		},

		 {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Ich brauche keine Nudelmaschine, {weil|deshalb|nämlich} ich nur Getreidebrei esse."
		 },

		 {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Ich muss mich in den Schatten eines Baumes setzen. Es ist {nämlich|weil|deshalb} sehr heiß."
		 },
		  {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Der Hut ist {auf} dem Kopf von dem Mann mit der Jeansjacke."
		 },

		   {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {kann} Spanisch sprechen."
		},

		 {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto {kann} 200km/h fahren."
		},
			 {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Deine Mutter fährt das Auto. {Das Auto wird von deiner Mutter gefahren.}"
		},

		   {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Der Regen gießt den Baum.{Der Baum wird von dem Regen gegossen.}"
		 },






]
    };
  },
 
};
</script>

<style scoped>

</style>