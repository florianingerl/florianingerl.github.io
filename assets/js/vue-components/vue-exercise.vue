<template>
<div class="nice">
<h2 v-if="lg==='fr'">Exercice</h2>
<h2 v-else>Exercise</h2>
<h4 class="instruction">{{instruction}}</h4>
<slot> </slot>
</div>

    
</template>

<script>

export default {
  name: "VueExercise",
  components: {
    
  },
  props: ['instruction','lg'],

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       
    };
  },
  methods: {
  
  }
}
</script>

<style scoped>

.nice {
  padding: 10px;
  border: solid 2px blue;
  background-color: #ccffff;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 30px;
}

.instruction {
  background-color: yellow;
  color: black;
}



</style>