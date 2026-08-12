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
		    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau hat ihre Hand unter {ihrem|ihr} Kinn!"
		},

		{
		    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau legt ihre Hand unter {ihr|ihrem} Kinn."
		},

		

			{
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto fährt schon seit 100km auf {der} langen Straße."
		},

			{
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto biegt in {die|der} Straße ein!"
		},

	
		 {
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Die leckeren Nudeln noch in {der|die} Maschine."
		 },

		 {
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Die leckeren Nudeln fallen aus der Maschine heraus und auf {den|dem} Tisch."
		 },

		  {
			instruction: "Konjugiere werden für das Futur 1 !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Ich {werde} auf den Baum klettern."
		 },
		  {
			instruction: "Konjugiere werden für das Futur 1 !",
		    type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Die vier Männer {werden} ihren Urlaub zusammen genießen."
		 },

		 {
		    instruction: "Konjugiere werden für das Futur 1 !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {wird} nicht jünger werden."
		},


	  {
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {ist} schön."
		},


			{
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Ich {bin} in meinem roten Auto."
		},

		
		 {
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Du {bist} ein guter Koch ."
		 },

		  {
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Wir {sind} im Schatten des Baumes."
		 },
		  {
			instruction: "Konjugiere sein !",
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Diese Männer {sind} Freunde."
		 },

		 {
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Ihr {seid} nicht so schön wie diese Frau."
		},

	    {
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {ist} jung."
		},


			{
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Du {bist} in meinem roten Auto."
		},

		
		 {
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Die leckeren Nudeln {sind} noch in der Maschine."
		 },

		  {
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Wir {sind} unter einem Baum."
		 },
		  {
			instruction: "Konjugiere sein !",
		    type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Die vier Männer {sind} nicht dick"
		 },

		 {
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Deine Frau und du {seid} deutsch."
		},


	  {
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {ist} schön."
		},


			{
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Ich {bin} in meinem roten Auto."
		},

		
		 {
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Du {bist} ein guter Koch ."
		 },

		  {
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Wir {sind} im Schatten des Baumes."
		 },
		  {
			instruction: "Konjugiere sein !",
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Diese Männer {sind} Freunde."
		 },

		 {
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Ihr {seid} nicht so schön wie diese Frau."
		},

{
		    instruction: "Nämlich, denn oder deshalb!",
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