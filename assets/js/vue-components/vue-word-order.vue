<template>

<div v-for="(sentence,index) in sentences2">
<p>{{index+1}}.{{ sentence.wrongOrder }}</p>
<p><input :disabled="validated" style="display:block;width:100%" v-model="sentence.guess" type="text" :class="{ correct: validated && sentence.guess == sentence.solution, notcorrect: validated && sentence.guess != sentence.solution }"/></p>
</div>

<p v-if="lg==='fr'">
<button @click="validateSolutionClicked">Valider</button>
<button @click="showSolutionClicked">Montre-moi la solution!</button>
</p>
<p v-else>
<button @click="validateSolutionClicked">Validate my answer</button>
<button @click="showSolutionClicked">Show solution</button>
</p>

    
</template>

<script>

export default {
  name: "VueWordOrder",
  components: {
    
  },
  props: ['sentences', 'lg'],

  mounted(){
     console.log("The setup function is executed!");
     this.sentences2 = [];
     this.sentences.forEach( (sentence) => {
        this.sentences2.push( { wrongOrder: this.shuffleWords(sentence), solution: sentence, guess: "" } );
     });
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       validated: false,
       sentences2 : []
    };
  },
  methods: {
    shuffleWords(text){
       // const text = "What's up, world? 你好世界！ こんにちは世界！สวัสดีชาวโลก";
const segmenter = new Intl.Segmenter([], { granularity: 'word' });
const segmentedText = segmenter.segment(text);
const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
this.shuffle(words);
let s = "";
words.forEach( (word,index) => { s = s + word; if(index != words.length-1 ){ s = s + " / "; } } );
return s;
    },

    shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
},

    validateSolutionClicked(){
        console.log("The button was clicked!");
        this.validated = true;
    },
    showSolutionClicked(){
        console.log("Button show solution was clicked!");
        this.validated = true;
        this.sentences2.forEach( sentence => {
            sentence.guess = sentence.solution;
        });
    }
  }
}
</script>

<style scoped>

.correct {
    color: green;
    border-color: green;
}

.notcorrect {
    color: red;
    border-color: red;
}


</style>