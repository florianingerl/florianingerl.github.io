<template>

<div v-for="(sentence,index) in sentences2">
<p>{{index+1}}.{{sentence.task}}</p>
<p><input style="display:block;width:100%" v-model="sentence.guess" type="text" :class="{ correct: validated && sentence.guess == sentence.solution }"  :class="{ notcorrect: validated && sentence.guess != sentence.solution }"/></p>
</div>

<button @click="validateSolutionClicked">Validate my answer</button>
<button @click="showSolutionClicked">Show solution</button>

    
</template>

<script>

export default {
  name: "VueWholeSentence",
  components: {
    
  },
  props: ['sentences'],

  mounted(){
     console.log("The setup function is executed!");
     this.sentences2 = this.sentences;
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
    validateSolutionClicked(){
        console.log("The button was clicked!");
        this.validated = true;
    },
    showSolutionClicked(){
        console.log("Button show solution was clicked!");
        this.validated = false;
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