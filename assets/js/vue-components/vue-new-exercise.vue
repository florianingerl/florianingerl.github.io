<template>
<div>
    <textarea rows="3" v-model="gapText">
        Flori {is|are} very intelligent.
    </textarea>

    <button class="btn-primary btn" @click="newExerciseClicked">Save</button>
</div>

    
</template>

<script>
import VueMCGaps from "./vue-mc-gaps.vue";
import VueQuestion from "./vue-question.vue";
import VueImage from "./vue-image.vue";


export default {

  components: {
    
    VueQuestion,
    VueMCGaps,
    VueImage
  
  },
  props: [],

  setup(){
     console.log("The setup  of Vue-New-Exercise function is executed!");

     console.log("Estoy programando con Ezquiel!");
     
  },
  
  data() {
    return {
       topics : new Set([]),
       gapText: ""
    };
  },
 watch: {
    
  },

  methods: {
    newExerciseClicked(){
      console.log("The button newExercise was clicked!");
      //TODO: Should just emit a signal , so the new exercise is inserted into the quiz
    }
    
  },
  mounted() {
    console.log('Vue New Exercise mponent mounted');
  } //end of mounted
};
</script>

<style scoped>

.textarea {
    height: 10px
}

</style>