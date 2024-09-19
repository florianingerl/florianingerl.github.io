<template>

<div>
<p v-if="lg==='de' || lg === 'en' && question2.questionEn == undefined || lg === 'fr' && question2.questionFr == undefined">
{{ question2.question }}
</p>
<p v-else-if="lg==='en'">
{{ question2.questionEn }}
</p>
<p v-else-if="lg==='fr'">
{{ question2.questionFr }}
</p>
<div v-for="option in getOptionsForLg()" :key="option" :class="{correct : question2.correctlyAnswered != undefined && option.checked && option.correct, notcorrect : question2.correctlyAnswered != undefined && option.checked && !option.correct}">
<input :disabled="question2.correctlyAnswered != undefined" type="checkbox" v-model="option.checked"/>
<label>{{option.option}}</label>
</div>


<div v-if="lg==='en'" class="d-flex flex-row">
<button @click="validate">Validate</button>
<button @click="showSolution">Show solution</button>
<button v-if="hasNextButton">Next exercise</button>
</div>

<div v-else-if="lg==='fr'" class="d-flex flex-row">
<button @click="validate">Valider</button>
<button @click="showSolution">Montre-moi la solution</button>
<button v-if="hasNextButton">Prochain exercice</button>
</div>

<div v-else class="d-flex flex-row">
<button @click="validate">Aufgabe überprüfen</button>
<button @click="showSolution">Lösung anzeigen</button>
<button v-if="hasNextButton">Nächste Aufgabe</button>
</div>

</div>

</template>

<script>
export default {
  name: "VueQuestion",
  setup(){
     console.log("The setup function is executed!");
     
  },
  
  props: ['question', 'hasNextButton', 'lg'],
  
  data() {
    return {
       question2: {}
    };
  },
  watch: {
    question(newQuestion, oldQuestion){
      console.log("The watcher was called!");
      this.question2 = newQuestion;
      
    }
  },
  methods: {
    getOptionsForLg(){
      if(this.lg == undefined || this.lg==='de' || this.lg === 'en' && this.question2.optionsEn == undefined || this.lg === 'fr' && this.question2.optionsFr == undefined){
        console.log("this.question2.options is returned!");
        return this.question2.options;
      }
      else if(this.lg === 'en'){
        return this.question2.optionsEn;
      }
      else if(this.lg === 'fr'){
        return this.question2.optionsFr;
      }
    },
    validate(){
      console.log("The validate button was clicked!");
      if(this.question2.correctlyAnswered != undefined ) return;
      
      this.question2.correctlyAnswered = true;

      this.getOptionsForLg().forEach( (option) => {
        if(option.checked == undefined ){
          option.checked = false;
        }
          console.log( "checked: " + option.checked + " correct: " + option.correct );
          if(option.checked != option.correct ){
            console.log("It thought that option.checked wasn't option.correct!");
            this.question2.correctlyAnswered = false;
          }
      });

      this.$emit("answered-event");
    },
    showSolution(){
      console.log("The show solution button was clicked!");
     
      this.getOptionsForLg().forEach( option => { option.checked = option.correct; });
      if(this.question2.correctlyAnswered == undefined){
        this.question2.correctlyAnswered = false;
      }
    }
  },
  mounted() {
    console.log('Vue Question Component mounted');
    this.question2 = this.question;

    if(!this.question2){
      this.question2 = 
      {
		question: "Das ist eine Test-Frage aus vue-question.vue?",
		imageUrl: "assets/img/rawfood/brokolisalat.JPG",
		type: "multiple choice",
		options: [{option:"Süßlupinen", correct: false },
     {option:"Brokoli", correct: false }, 
     {option:"Karotte", correct: false },
      {option:"Löwenzahn", correct: true },
       {option:"Weizen", correct: false }]
	    };
    }

    this.question2.options.forEach( option => { option.checked = false; });
    
  }
};
</script>

<style scoped>

.correct {
  background-color: #7bf27b
}

.notcorrect {
  background-color: #fc5c5c
}


#topcontainer {
  margin-bottom: 15px;
}
</style>