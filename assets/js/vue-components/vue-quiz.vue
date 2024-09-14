<template>
    <vue-question v-if="i < questions.length" :question="questions[i]" :lg="lg" @answered-event="calcScore"></vue-question>
    <div v-if="i == questions.length && lg=='de'">
        Gratulation! Du hast alle Fragen des Quiz beantwortet!
    </div>
    <div v-if="i == questions.length && lg=='en'">
        Congratulations! You have answered all the questions of this quiz!
    </div>
    <div v-if="i == questions.length && lg=='fr'">
       Félicitations! Tu viens de répondre à toutes les questions!
    </div>
  <ul class="pagination" v-if="lg==='de'">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked" data-bs-toggle="tooltip" title="Gehe 5 Aufgaben zurück"><i class="fa fa-fast-backward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked" data-bs-toggle="tooltip" title="Vorige Aufgabe"><i class="fa fa-backward" aria-hidden="true"></i></button></li>
  <li v-for="q in displayedQuestions" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked" data-bs-toggle="tooltip" title="Nächste Aufgabe"><i class="fa fa-forward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked" data-bs-toggle="tooltip" title="Gehe 5 Aufgaben weiter"><i class="fa fa-fast-forward" aria-hidden="true"></i></button></li>
  <input @keypress="onlyNumberKey" @change="goToQuestionClicked" type="text" :value="i" style="width: 50px;"/> <span style="vertical-align: baseline;"> / {{ questions.length - 1}} </span>
  </ul>
  <ul class="pagination" v-else-if="lg==='en'">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked" data-bs-toggle="tooltip" title="Jump 5 exercises backward"><i class="fa fa-fast-backward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked" data-bs-toggle="tooltip" title="Previous exercise"><i class="fa fa-backward" aria-hidden="true"></i></button></li>
  <li v-for="q in displayedQuestions" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked" data-bs-toggle="tooltip" title="Next Exercise"><i class="fa fa-forward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked" data-bs-toggle="tooltip" title="Jump 5 exercises forward"><i class="fa fa-fast-forward" aria-hidden="true"></i></button></li>
  <input @keypress="onlyNumberKey" @change="goToQuestionClicked" type="text" :value="i" style="width: 50px;"/> <span style="text-align: center;"> / {{ questions.length - 1 }} </span>
  </ul>
   <ul class="pagination" v-else-if="lg==='fr'">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked" data-bs-toggle="tooltip" title="Sauter 5 exercices en arrière"><i class="fa fa-fast-backward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked" data-bs-toggle="tooltip" title="Question précédente"><i class="fa fa-backward" aria-hidden="true"></i></button></li>
  <li v-for="q in displayedQuestions" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked" data-bs-toggle="tooltip" title="Question suivante"><i class="fa fa-forward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked" data-bs-toggle="tooltip" title="Sauter 5 questions"><i class="fa fa-fast-forward" aria-hidden="true"></i></button></li>
  <input @keypress="onlyNumberKey" @change="goToQuestionClicked" type="text" :value="i" style="width: 50px;"/> <span style="text-align: center;"> / {{ questions.length - 1 }} </span>
  </ul>

  <p>Your score: {{ scoreText }} </p>


    
</template>

<script>

export default {

  components: {
    
    VueQuestion : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-question.vue', options)),
  
  },
  props: ['questions', 'lg'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       i : 0,
       scoreText: ""
    };
  },
  methods: {
    calcScore(){
      let answered = 0;
      let correct = 0;
      this.questions.forEach( (question) => {
         if( question.correctlyAnswered == undefined )
            return;
         answered++;
         console.log(question.correctlyAnswered);
         if( question.correctlyAnswered ) {
           correct++;
         }
      } );

      if(this.lg === "en"){
        this.scoreText = "You have answered "+ correct + " of " + answered + " questions correctly.";
      }
      else if(this.lg === "fr"){
        this.scoreText = "Tu as répondu à " + correct + " parmi " + answered + " questions correctement.";
      }
      else {
        this.scoreText = "Du hast " + correct + " von " + answered + " Fragen richtig beantwortet.";
      }

        

    },

    goToQuestionClicked(e){
      console.log("Go to question was clicked!");
      let u = parseInt( e.target.value );
      if( u < 0 || u >= this.questions.length ){
        return;
      }
      this.i = u;
    },

    onlyNumberKey(evt) {
            console.log("A key was pressed!"); 
            // Only ASCII character in that range allowed
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
                console.log("False is returned!");
                evt.stopPropagation();
                return false;
            }
            console.log("True is returned!");
            return true;
        },
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