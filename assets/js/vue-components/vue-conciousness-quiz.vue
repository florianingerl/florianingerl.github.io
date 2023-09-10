<template>
    <vue-quiz :lg="lg" :questions="questions"></vue-quiz>
</template>

<script>

export default {

  components: {
    
    VueQuiz : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-quiz.vue', options)),
  
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
		question: "In welcher Situation bist du bewusster?",
		questionFr: "Dans quelle situation est-ce que tu es le plus conscient?",
		imageUrl: "assets/img/cs/atem.jpg",
		type: "multiple choice",
		options: [ {option: "Wenn du gerade deinen eigenen Atem fühlen kannst.", correct: true }, { option: "Wenn du weißt, dass dein Gegenüber gerade unrecht hat.", correct: false } ],
		optionsFr:  [ {option: "Quand tu peux sentir ta propre respiration", correct: true }, { option: "Quand tu sais que les autres ont tort", correct: false } ],
		correct: 0

	}

	

]
    };
  },
 
};
</script>

<style scoped>

</style>