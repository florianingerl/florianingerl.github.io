<template>
    <vue-question v-if="i < questions.length" :question="questions[i]"></vue-question>
    <div v-if="i == questions.length">
        Gratulation! Du hast alle Fragen des Quiz beantwortet!
    </div>
    <ul class="pagination">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked">Springe rückwärts</button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked">Vorige Aufgabe</button></li>
  <li v-for="q in displayedQuestions" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked">Nächste Aufgabe</button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked">Springe vorwärts</button></li>
</ul>
    
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
     },
     previousExerciseClicked(){
        this.i--;
        console.log(this.i);
     },
     jumpForwardClicked(){
        if(this.i + 5 < this.questions.length)
          this.i+=5;
        else
          this.i = this.questions.length - 1;
     },
     jumpBackwardClicked(){
        if(this.i - 5 >= 0)
          this.i -=5;
        else
          this.i = 0;
     }
  },
  computed : {
      displayedQuestions(){
         let a = [];
         let j = Math.floor(this.i/5);
         j=j*5;
         let k = 0;
         while(k < 5 && j < this.questions.length ){
           a.push(j);
           ++j;
           ++k;
         }
         return a;
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