<template>
<div class="nice">
<h2>Exercise: {{ instruction }}</h2>
<VueGaps v-if="type=='gaps'" :gaptext="data" />
</div>

    
</template>

<script>
import VueGaps from "./vue-gaps.vue";

export default {
  name: "VueExercise",
  components: {
    VueGaps
  },
  props: ['data','type', 'instruction'],

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       gaps: [],
       validated: false 
    };
  },
  methods: {
     buttonValidateClicked(){
        this.validated = true;
        console.log("The button validated was clicked!");
     },
     parseGapText(data){
     }
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
}



</style>