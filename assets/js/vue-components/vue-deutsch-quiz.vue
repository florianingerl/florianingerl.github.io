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
			topics: ["Wechselpräpositionen", "Dativ", "Akkusativ"],
		    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau hat ihre Hand unter {ihrem|ihr} Kinn!"
		},

		{
			topics: ["Wechselpräpositionen", "Dativ", "Akkusativ"],
		    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau legt ihre Hand unter {ihr|ihrem} Kinn."
		},

		

			{
				topics: ["Wechselpräpositionen", "Dativ", "Akkusativ"],
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto fährt schon seit 100km auf {der} langen Straße."
		},

			{
				topics: ["Wechselpräpositionen", "Dativ", "Akkusativ"],
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto biegt in {die|der} Straße ein!"
		},

	
		 {
			topics: ["Wechselpräpositionen", "Dativ", "Akkusativ"],
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Die leckeren Nudeln noch in {der|die} Maschine."
		 },

		 {
			topics: ["Wechselpräpositionen", "Dativ", "Akkusativ"],
			instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Die leckeren Nudeln fallen aus der Maschine heraus und auf {den|dem} Tisch."
		 },

		  {
			topics : ["Futur 1"],
			instruction: "Konjugiere werden für das Futur 1 !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Ich {werde} auf den Baum klettern."
		 },
		  {
			topics : ["Futur 1"],
			instruction: "Konjugiere werden für das Futur 1 !",
		    type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Die vier Männer {werden} ihren Urlaub zusammen genießen."
		 },

		 { topics : ["Futur 1"],
		    instruction: "Konjugiere werden für das Futur 1 !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {wird} nicht jünger werden."
		},


	  {
			topics : ["Konjugation des Verbs sein"],
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {ist} schön."
		},


			{
				topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Ich {bin} in meinem roten Auto."
		},

		
		 {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Du {bist} ein guter Koch ."
		 },

		  {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Wir {sind} im Schatten des Baumes."
		 },
		  {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Diese Männer {sind} Freunde."
		 },

		 {
			topics : ["Konjugation des Verbs sein"],
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Ihr {seid} nicht so schön wie diese Frau."
		},

	    {
			topics : ["Konjugation des Verbs sein"],
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {ist} jung."
		},


			{
				topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Du {bist} in meinem roten Auto."
		},

		
		 {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Die leckeren Nudeln {sind} noch in der Maschine."
		 },

		  {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Wir {sind} unter einem Baum."
		 },
		  {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
		    type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Die vier Männer {sind} nicht dick"
		 },

		 {
			topics : ["Konjugation des Verbs sein"],
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Deine Frau und du {seid} deutsch."
		},


	  {
		topics : ["Konjugation des Verbs sein"],
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {ist} schön."
		},


			{
				topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Ich {bin} in meinem roten Auto."
		},

		
		 {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Du {bist} ein guter Koch ."
		 },

		  {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Wir {sind} im Schatten des Baumes."
		 },
		  {
			topics : ["Konjugation des Verbs sein"],
			instruction: "Konjugiere sein !",
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Diese Männer {sind} Freunde."
		 },

		 {
			topics : ["Konjugation des Verbs sein"],
		    instruction: "Konjugiere sein !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Ihr {seid} nicht so schön wie diese Frau."
		},

{
			topics: ["Kausalsätze mit weil,da,denn,deshalb,nämlich", "Neben-und unterordnende Konjunktionen"],
		    instruction: "Nämlich, denn oder deshalb!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau verdreht den Männern die Köpfe. Sie ist {nämlich|deshalb|weil} sehr schön."
		},

		{
			topics: ["Kausalsätze mit weil,da,denn,deshalb,nämlich", "Neben-und unterordnende Konjunktionen"],
			instruction: "Nämlich, denn oder deshalb!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto ist sehr günstig. {Deshalb|Nämlich|Weil} ist es sehr begehrt.."
		},

		 {
			topics: ["Kausalsätze mit weil,da,denn,deshalb,nämlich", "Neben-und unterordnende Konjunktionen"],
			instruction: "Nämlich, denn oder deshalb!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Ich brauche keine Nudelmaschine, {weil|deshalb|nämlich} ich nur Getreidebrei esse."
		 },

		 {
			topics: ["Kausalsätze mit weil,da,denn,deshalb,nämlich", "Neben-und unterordnende Konjunktionen"],
			instruction: "Nämlich, denn oder deshalb!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Ich muss mich in den Schatten eines Baumes setzen. Es ist {nämlich|weil|deshalb} sehr heiß."
		 },
		  {
		  topics: ["Präpositionen des Ortes"],	
		  instruction: "Finde die richtige Präposition des Ortes!",
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Der Hut ist {auf} dem Kopf von dem Mann mit der Jeansjacke."
		 },

		   {
			topics: ["Modalverben"],
			instruction: "Fülle die Lücke mit der richtigen Konjugation von können, dürfen oder müssen !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Die Frau {kann} Spanisch sprechen."
		},

		 {
			topics: ["Modalverben"],
			instruction: "Fülle die Lücke mit der richtigen Konjugation von können, dürfen oder müssen !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Das Auto {kann} 200km/h fahren."
		},
			 {
				topics: ["Passiv"],
				instruction: "Forme den Passivsatz !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Deine Mutter fährt das Auto. {Das Auto wird von deiner Mutter gefahren.}"
		},

		   {
			topics: ["Passiv"],
				instruction: "Forme den Passivsatz !",
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