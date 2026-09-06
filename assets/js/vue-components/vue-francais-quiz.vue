<template>
    <vue-quiz :lg="lg" :questions="questions" name="French-Quiz" quiz="french"></vue-quiz>
</template>

<script>
import VueQuiz from "./vue-quiz.vue";

export default {

  components: {
    
    VueQuiz ,
  
  },

  props: ['lg'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       questions: []
    };
  },
 
};
</script>

<style scoped>

</style>