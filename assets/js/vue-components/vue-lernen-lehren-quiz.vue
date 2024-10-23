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
		question: "Wo kann man Nachhilfeunterricht für Sprachen und MINT-Fächer kostenlos anbieten?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Kleinanzeigen", correct: true }, { option : "An den Türen von Toiletten.", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
    {
		question: "Wo kann man eigene Tests für romanische Fremdsprachen ins Internet stellen?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Beim Gymnasium Gröbenzell auf der Homepage", correct: false }, { option : "Auf francaisfacile.com, anglaisfacile.com, espagnolfacile.com...", correct: true }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
     {
		question: "Was sollte man am Tag vor einer Prüfung tun?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Nur noch Waldspaziergang und andere meditative, entspannende Tätigkeiten, um in der Prüfung einen frischen Kopf zu haben", correct: true }, { option : "Bis zur letzten Sekunde vor der Prüfung Stoff in den Schädel stopfen!", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
    {
		question: "Sollte man vor einer Prüfung um ca. 9 Uhr frühstücken?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Nein, sonst ist die Energie im Bauch und nicht voll im Kopf", correct: true }, { option : "Ja, denn bei leerem Magen kann man doch nicht denken. Außerdem braucht das Gehirn viel Zucker.", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	}

]
    };
  },
 
};
</script>

<style scoped>

</style>