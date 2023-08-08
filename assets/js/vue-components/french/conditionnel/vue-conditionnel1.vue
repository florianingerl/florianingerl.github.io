<template>
    <h1>Practice conditional sentences of type 1</h1>
    <VueGaps gapfile="uebung/franz/test.txt" />
</template>

<script>
import VueGaps from "./../../vue-gaps.vue";

export default {
  
  components: {
     VueGaps
  },

  mounted(){
     console.log("The mounted function of VueConditionnel1 was called!");
     
  },
  setup(){
   console.log("The setup function of VueConditionnel1  is executed!");
  }
}
</script>

<style scoped>



</style>