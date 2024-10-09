<template>
<div class="nice">
<h2 v-if="lg==='fr'">Exercice</h2>
<h2 v-if="lg==='en'">Exercise</h2>
<h2 v-if="lg==='de'">Übung</h2>
<h4 class="instruction">{{instruction}}</h4>
<p v-if="topics !== undefined" class="topics">
Topics:
<div v-for="topic in topics" style="display: inline;">
<span  class="topic">{{ topic }} </span>
<button @click="google(topic)">Google</button>
</div>
</p>
<slot> </slot>
</div>

    
</template>

<script>

export default {
  name: "VueExercise",
  components: {
    
  },
  props: ['instruction','topics','lg'],

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
     google(topic){
        let baseUrl = "https://www.google.com/search?q=";
        //topic = "adjectif+attribut+ou+%C3%A9pith%C3%A8te";
        this.window.open(baseUrl + topic, "_blank").focus();
        
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
  margin-top: 30px;
}

.instruction {
  background-color: yellow;
  color: black;
}

.topics {
  color: orange;
}



</style>