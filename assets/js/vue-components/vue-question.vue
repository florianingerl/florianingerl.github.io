<template>
<div id="topcontainer" class="d-flex flex-row">
<img v-if="question.imageUrl != undefined" :src="question.imageUrl" @click="imageClicked"/>
<div>
<p>
{{ question.question }}
</p>
<div>
<div v-for="option in question.options" :key="option" :class="{correct : validated && option.checked && option.correct}" :class="{notcorrect : validated && option.checked && !option.correct}">
<input type="checkbox" v-model="option.checked"/>
<label>{{option.option}}</label>
</div>


</div>

<div class="d-flex flex-row">
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
  props: ['question', 'hasNextButton'],
  
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