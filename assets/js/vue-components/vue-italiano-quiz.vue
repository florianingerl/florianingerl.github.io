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

		  {
			topics: ["Metterci or volerci"],
			instruction: "Fill in the gap with the right conjugation of metterci or volerci!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/coche.jpg",
			gapText: "{Ci vogliono|Ci metto} cuatro cinque ore per andare da Roma a Milano in macchina."
		 },

		  {
			topics: ["Metterci or volerci"],
			instruction: "Fill in the gap with the right conjugation of metterci or volerci!",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/arbol.jpg",
			gapText: "{Ci metto|Ci vogliono} due ore per andare della mia casa fino a questo albero."
		 },

		  {
			topics: ["Esserci"],
			instruction: "Fill in the gaps using esserci !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/hombres.jpeg",
			gapText: "{Ci sono|c'è} quattro uomini nell’immagine."
		 },

		 
		  {
			topics: ["Esserci"],
			instruction: "Fill in the gaps using esserci !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
			gapText: "{C'è|Ci sono} soltanto una donna nell'immagine."
		 },

		  {
			topics: ["Esserci"],
			instruction: "Fill in the gaps using esserci !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/botella.jpg",
			gapText: "{Ci sono|C'è} anchora botellas nell'armadio ? Sí, {ce n'è una|ci ne sono due}."
		 },

		 {
			topics: ["Esserci"],
			instruction: "Fill in the gaps using esserci !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/volleyball",
			gapText: "{Ci sono|C'è} persone nel campio di volley che stanno giocando ? Sì, {ce ne sono cuattro|ne ci sono cuattro}."
		 },

		 {
			topics: ["Tanto,troppo,poco,molto"],
			instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/volleyball.png",
			gapText: "Non è {troppo} caldo per giocare a volley."
		 },


		 {
			topics: ["Tanto,troppo,poco,molto"],
			instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/volleyball.png",
			gapText: "Non è {troppo} caldo per giocare a volley."
		 },

		 {
			topics: ["Tanto,troppo,poco,molto"],
			instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/volleyball.png",
			gapText: "Non ho {molta} voglia di giocare a volley oggi perché è {molto} caldo ."
		 },

		 {
			topics: ["Tanto,troppo,poco,molto"],
			instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
			type: 'gapText',
			imageUrl: "assets/img/spanisch/volleyball.png",
			gapText: "Se il uomo tutto a sinistra dice qualcosa, i altri tre cuattro uomi ci credono sempre {}"
		 },

/*
		 {
		question: "In welcher Situation bist du bewusster?",
questionEn:  "In which situation are you more conscious?",
		questionFr: "Dans quelle situation est-ce que tu es le plus conscient?",
		imageUrl: "assets/img/cs/atem.jpg",
		type: "multiple choice",
		options: [ {option: "Wenn du gerade deinen eigenen Atem fühlen kannst.", correct: true }, { option: "Wenn du weißt, dass dein Gegenüber gerade unrecht hat.", correct: false } ],
optionsEn:  [ {option: "When you can feel your own breath", correct: true }, { option: "When you know that the other person is wrong.", correct: false } ],
		optionsFr:  [ {option: "Quand tu peux sentir ta propre respiration", correct: true }, { option: "Quand tu sais que l'autre a tort", correct: false } ],
		correct: 0

	}

	Ci vuole tempo per andare al telefono.
	Ci sono molti denti nella boca di questa donna .
	Mickey ha risevuto una offerta di lavoro ieri e addesso debe pensarci.
	Ho tre macchine ma ho bisogna di soltanto una. Quindi ne voglio vendere due . 
    La mia camara è tanto piccola che ne voglio uscire tanto pronto come posibile.
	Sempre devo pagare per i tuoi errori. Non ne posso più.

	Non ho pegato niente per questa macchina. È soltanto prestata di mio padre .
	Nessun uomo vale abbastanzza per questa donna. 
	Il pompiere non ha mai rifiutato di aiutare cuando una casa era in fiamme.
	Nessun uomo non ha voluto tomare il immagine . Quindi un toristo l'ha fatta.
	Nessuno responde al telefono. 
	Hai udito qualcuno ? No , non ho udito nessuno. 
	Non ho voglia affatto di bevere cualcosa tanto cattiva come Coca Cola .
	Neanche Mickey Maus ha orecchi tanto grande come i di un elefante.
	Non ho tempo per fare un giro in barca e nemmeno per mangiare lentamente e in paz perche devo lavorare molto. 

	Sicomme essendo molto guapa , tutti gli uomi vogliono essere insieme con lei .
	Facendo finta di pensare , Mickey Topo non deve resondere a sua moglie pronto. */
	

]
    };
  },
 
};
</script>

<style scoped>

</style>