<template>
<div class="nice">
<h2>Exercise</h2>
<h4>{{instruction}}</h4>
<slot> </slot>
</div>

    
</template>

<script>

export default {
  name: "VueExercise",
  components: {
    
  },
  props: ['instruction'],

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