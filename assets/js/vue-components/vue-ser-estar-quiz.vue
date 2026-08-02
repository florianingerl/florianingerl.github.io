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
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "{Mi|Mí} mujer es guapa."
		},

		{
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Este coche es demasiado caro para {mí|mi}. Por lo tanto, no puedo comprarlo."
		},


		 {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "{Con tal que|Para que} estemos juntos, lo pasaremos bien."
		 },

		  {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "Le pago a la muyer {para que|con tal que} me dé un beso."
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
		},


		
         {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "Tengo prisa {así que|para que} conduzco rápidamente."
		},

    {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/maccina.jpg",
			gapText: "Quiero que mi padre me {dé|de} dinero para que pueda comprar una maquina para hacer pasta."
		 },

		  {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Las frutas {de|dé} este arból todavía no se pueden ver porque apenas es primavera."
		 },

		  {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "{Aunque|Así que} estamos en otoño, el árbol todavía no tiene frutas."
		 },

		 
		 {
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "Ayer {estaba|fue} debajo  de un arbol cuando un terremoto sucedió."
		 },

		 {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/chilis.jpg",
			gapText: "Estas chilis {aún|aun} no están listos para ser comido."
		 },

		  {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
			gapText: "{Aun|Aún} este jugador de fútbol gana mucho dinero, no marca muchos goles."
		 },

		 {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/piso.jpg",
			gapText: "No {sé|se} cuanto cuesta este piso."
		 },

		  {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "Estos cuatros hombres {se|sé} están divirtiendo en las vacaciones."
		 },

		  {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/pisodemoneda.jpg",
			gapText: "{Te|Té} puedo prestar mi dinero con tál que me lo devuelvas mañana."
		 },

		   {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/pisodemoneda.jpg",
			gapText: "{Mientras|Aunque} no tenga dinero, no puedo ir de vacaciones."
		 },

		 {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/chilis.jpg",
			gapText: "Esta botella {está|es} vacia."
		 },

		  {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
			gapText: "Ivann Botella {es|está} un jugador de fútbol."
		 }





]
    };
  },
 
};
</script>

<style scoped>

</style>