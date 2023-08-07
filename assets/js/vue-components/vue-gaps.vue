<template>
<h1>Remplis les trous!</h1>
<div>
<span v-for="gap in gaps" >
  {{ gap.text }} <input :class="{ notcorrect: validated && gap.guess != gap.gap}" :class="{ correct: validated && gap.guess === gap.gap }" type="text" v-model="gap.guess">
</span>

</div>
<button @click="buttonValidateClicked">Valider ma solution</button>
    
</template>

<script>

export default {

  components: {
  
  },
  props: ['gapfile'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       gaps : [{text: "Florian est le ", gap: "frère", guess:""}, {text: " de sa ", gap: "soeur", guess:""}, {text: " qui s'appelle ", gap: "Sonja", guess:""}],
       validated: false 
    };
  },
  methods: {
     buttonValidateClicked(){
        this.validated = true;
        console.log("The button validated was clicked!");
     }
  }
}
</script>

<style scoped>

.correct {
    color: green;
    border: 1px solid green
}

.notcorrect {
    color: red;
    border: 1px solid red
}

</style>