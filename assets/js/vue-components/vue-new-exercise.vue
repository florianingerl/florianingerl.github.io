<template>
<div>
    <textarea rows="3" v-model="gapText">
        Flori {is|are} very intelligent.
    </textarea>

    <button class="btn-primary btn" @click="newExerciseClicked">Save</button>
</div>

    
</template>

<script>
import VueMCGaps from "./vue-mc-gaps.vue";
import VueQuestion from "./vue-question.vue";
import VueImage from "./vue-image.vue";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';


export default {

  components: {
    
    VueQuestion,
    VueMCGaps,
    VueImage
  
  },
  props: ['questions', 'lg'],

  setup(){
     console.log("The setup  of Vue-New-Exercise function is executed!");

     console.log("Estoy programando con Ezquiel!");
     
  },
  
  data() {
    return {
       i : 0,
       scoreText: "",
       topics : new Set([]),
       selectedTopic : "",
       newExercise: false,
       gapText: ""
    };
  },
 watch: {
    selectedTopic(newVal, oldVal) {
      console.log("The selected topic changed!");
      // only if it actually changed (optional check)
      if (newVal !== oldVal) {
        this.i = 0;
      }
    }
  },

  methods: {
   

    calcAllTopics() {
      console.log("calcAllTopics was called!");

      this.questions.forEach( (question) => {
        if(question.topics){
        question.topics.forEach( (topic) => { this.topics.add(topic); }  );
        }
      } );
    },

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
      if (Number.isNaN(u)) return;    
      if( u < 0 || u >= this.displayedQuestions.length ){
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
        if(this.i + 5 < this.displayedQuestions.length)
          this.i+=5;
        else
          this.i = this.displayedQuestions.length - 1;
     },
     jumpBackwardClicked(){
        if(this.i - 5 >= 0)
          this.i -=5;
        else
          this.i = 0;
     },
     imageClicked(){
      console.log("The image was clicked!");
      let fullPage = document.getElementById('fullpage');

		  fullPage.style.backgroundImage = 'url(' + this.displayedQuestions[this.i].imageUrl + ')';
		  fullPage.style.display = 'block';
    }
  },
  computed : {
    

      displayedQuestions(){
        console.log("Displayed questions is called once again!");
         
         return this.selectedTopic ? this.questions.filter( (question) => (question.topics || [] ).includes(this.selectedTopic) ) : this.questions;
        
      },
       displayedQuestionsIndices(){
       console.log("Displayed questions indices is called once again!");
         let a = [];
        
         let j = Math.floor(this.i/5);
         j=j*5;
         let k = 0;
         while(k < 5 && j < this.displayedQuestions.length ){
           a.push(j);
           ++j;
           ++k;
         }
         console.log("a.length = " + a.length );
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
    this.calcAllTopics();

  }
};
</script>

<style scoped>

.textarea {
    height: 10px
}

</style>