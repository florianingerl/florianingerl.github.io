<template>

<div v-for="(sentence,index) in sentences">
<p>{{index+1}}.{{sentence.task}}</p>
<p><input v-model="sentence.guess" type="text" :class="{ correct: validated && sentence.guess == sentence.solution }"  :class="{ notcorrect: validated && sentence.guess != sentence.solution }"/></p>
</div>

<button @click="validateSolutionClicked">Validate my answer</button>

    
</template>

<script>

export default {
  name: "VueWholeSentence",
  components: {
    
  },
  props: [],

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       sentences: [
        { task: "Edwin likes fishing. He is good at it.", solution: "Edwin is good at fishing.", guess: "" },
        { task: "Edwin likes climbing. He is good at it.", solution: "Edwin is good at climbing.", guess: "" }
       ],
       validated: false
    };
  },
  methods: {
    validateSolutionClicked(){
        console.log("The button was clicked!");
        this.validated = true;
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