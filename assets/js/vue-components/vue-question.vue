<template>
<div id="topcontainer" class="d-flex flex-row">
<img v-if="question.imageUrl != undefined" :src="question.imageUrl" @click="imageClicked"/>
<div>
<p v-if="lg==='de'">
{{ question.question }}
</p>
<p v-else-if="lg==='en'">
{{ question.questionEn }}
</p>
<p v-else-if="lg==='fr'">
{{ question.questionFr }}
</p>
<div v-if="lg==='de'">
<div v-for="option in question.options" :key="option" :class="{correct : validated && option.checked && option.correct, notcorrect : validated && option.checked && !option.correct}">
<input type="checkbox" v-model="option.checked"/>
<label>{{option.option}}</label>
</div>
</div>
<div v-if="lg==='en'">
<div v-for="option in question.optionsEn" :key="option" :class="{correct : validated && option.checked && option.correct, notcorrect : validated && option.checked && !option.correct}">
<input type="checkbox" v-model="option.checked"/>
<label>{{option.option}}</label>
</div>
</div>
<div v-if="lg==='fr'">
<div v-for="option in question.optionsFr" :key="option" :class="{correct : validated && option.checked && option.correct, notcorrect : validated && option.checked && !option.correct}">
<input type="checkbox" v-model="option.checked"/>
<label>{{option.option}}</label>
</div>
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
      validated : false
    };
  },
  watch: {
    question(newQuestion, oldQuestion){
      console.log("The watcher was called!");
      this.validated = false;
    }
  },
  methods: {
    getOptionsForLg(question){
      if(lg === 'de'){
        return question.options;
      }
      else if(lg === 'en'){
        return question.optionsEn;
      }
      else if(lg === 'fr'){
        return question.optionsFr;
      }
    },
    validate(){
      console.log("The validate button was clicked!");
      this.validated = true;
    },
    showSolution(){
      this.validated = false;
      this.question.options.forEach( option => { option.checked = option.correct; });
    },
    imageClicked(){
      console.log("The image was clicked!");
      let fullPage = document.getElementById('fullpage');

		  fullPage.style.backgroundImage = 'url(' + this.question.imageUrl + ')';
		  fullPage.style.display = 'block';
    }
  },
  mounted() {
    console.log('Vue Question Component mounted');

    if(!this.question){
      this.question = 
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

    this.question.options.forEach( option => { option.checked = false; });
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

img {
  height: 200px;
}

#topcontainer {
  margin-bottom: 15px;
}
</style>