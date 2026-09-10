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
<input :disabled="question2.correctlyAnswered != undefined"  type="checkbox" v-model="option.checked" @change="onOptionChanged"/>
<label>{{option.option}}</label>
</div>


<div v-if="lg==='en'" class="d-flex flex-row">
<button @click="validate">Validate</button>
<button @click="showSolution">Show solution</button>
<button @click="retryClicked">Retry</button>
<button v-if="hasNextButton">Next exercise</button>
</div>

<div v-else-if="lg==='fr'" class="d-flex flex-row">
<button @click="validate">Valider</button>
<button @click="showSolution">Montre-moi la solution</button>
<button @click="retryClicked">Essayez encore une fois</button>
<button v-if="hasNextButton">Prochain exercice</button>
</div>

<div v-else class="d-flex flex-row">
<button @click="validate">Aufgabe überprüfen</button>
<button @click="showSolution">Lösung anzeigen</button>
<button @click="retryClicked">Nochmal versuchen</button>
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
      delete this.question2.correctlyAnswered;
      this.updateQuestion();
      
    }
  },
  methods: {
    retryClicked(){
      console.log("Retry was called !");
      delete this.question2.correctlyAnswered;

      this.getOptionsForLg().forEach( (option) => { delete option.checked; } );
      this.$emit("answered-event");
    },

    isSomeOptionWronglyChecked(){

      this.getOptionsForLg().forEach( (option) => {
        if(option.checked == undefined ){
          option.checked = false;
        }
          console.log( "checked: " + option.checked + " correct: " + option.correct );
          if(option.checked && !option.correct ){
            return true;
          }
      });
      return false;
    },

    onOptionChanged(){
      console.log("Option changed was called!");
      console.log(this.questions2);

      if(this.isSomeOptionWronglyChecked() ){
        this.question2.correctlyAnswered = false;
        this.$emit("answered-event");
        return;
      }

      let b = this.preValidate();
      console.log("Pre validate returns " + b) ;
      if( b ){
        this.question2.correctlyAnswered = true;
        this.$emit("answered-event");
      }
     
    },

    updateQuestion(){
      this.question2 = this.question;
      delete this.question2.correctlyAnswered;
    this.question2.options.forEach( option => { option.checked = false; });
    this.shuffle(this.question2.options);
    },
shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
},

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
    preValidate(){
   
      let correctlyAnswered = true;

      this.getOptionsForLg().forEach( (option) => {
        if(option.checked == undefined ){
          option.checked = false;
        }
          console.log( "checked: " + option.checked + " correct: " + option.correct );
          if(option.checked != option.correct ){
            console.log("It thought that option.checked wasn't option.correct!");
            correctlyAnswered = false;
          }
      });
      return correctlyAnswered;
    },

    validate(){
      console.log("The validate button was clicked!");
      if(this.question2.correctlyAnswered != undefined ) return;

      this.question2.correctlyAnswered = this.preValidate();

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
    this.updateQuestion();
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