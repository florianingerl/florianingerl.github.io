<template>
    <vue-question v-if="i < questions.length" :question="questions[i]"></vue-question>
    <div v-if="i == questions.length">
        Gratulation! Du hast alle Fragen des Quiz beantwortet!
    </div>
    <button v-if="i < questions.length-1" @click="nextExerciseClicked">Nächste Aufgabe</button>
</template>

<script>

export default {

  components: {
    
    VueQuestion : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-question.vue', options)),
  
  },
  props: ['questions'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       i : 0
    };
  },
  methods: {
     nextExerciseClicked(){
        this.i++;
        console.log(this.i);
     }
  },
  mounted() {
    console.log('Vue Questions Component mounted');

    if(!this.questions){
      this.questions = [
             {
		question: "Das ist eine Test-Frage aus vue-quiz.vue?",
		imageUrl: "assets/img/rawfood/brokolisalat.JPG",
		type: "multiple choice",
		options: [{option:"Süßlupinen", correct: false },
     {option:"Brokoli", correct: false }, 
     {option:"Karotte", correct: false },
      {option:"Löwenzahn", correct: true },
       {option:"Weizen", correct: false }]
	    },

         {
		question: "Das ist die zweite Test-Frage aus vue-quiz.vue!",
		imageUrl: "assets/img/rawfood/brokolisalat.JPG",
		type: "multiple choice",
		options: [{option:"Süßlupinen", correct: false },
     {option:"Brokoli", correct: false }, 
     {option:"Karotte", correct: false },
      {option:"Löwenzahn", correct: true },
       {option:"Weizen", correct: false }]
	    }

       ];
    }

  }
};
</script>

<style scoped>

</style>