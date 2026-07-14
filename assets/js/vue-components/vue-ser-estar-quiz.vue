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
			imageUrl: "assets/img/spanisch/chilis.jpg",
			gapText: "Esta botella {está|es} vacia."
		 },

		  {
		 type: 'gapText',
			imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
			gapText: "Ivann Botella {es|está} un jugador de fútbol."
		 },

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