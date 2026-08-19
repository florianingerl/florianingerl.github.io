<template>
<div class="container">
   
  <div class="row">
    <span class="fw-bold">Topics:</span> {{allTopicsString }}
    <button @click="deleteAllTopics">Clear</button>
  </div>

  <div class="row mb-3">
  <label for="formGroupExampleInput" class="col-3">New topic:</label>
  <input v-model="newExercise.newTopic" type="text" class="col-7" id="newTopic" placeholder="Enter a new topic" />
  <button class="col-2" @click="addNewTopicClicked">Add</button>
</div>

<div>
  <label for="type" class="form-label">Type:</label>
  <select v-model="newExercise.type">
  <option value="gapText" selected>Gap text</option>
  <option value="multipleChoice">Multiple choice</option>
</select>
</div>
   

   <div class="mb-3 mt-3">
    <label for="instruction" class="form-label">Instruction:</label>
    <input v-model="newExercise.instruction" type="text" class="form-control" id="instruction" placeholder="" name="instruction" >
  </div>

  <div style="display:flex;">
    <VueImage :imageUrl="newExercise.imageUrl"></VueImage>


    <textarea v-if="newExercise.type=='gapText'" rows="3"  v-model="newExercise.gapText">
        Flori {is|are} very intelligent.
    </textarea>

    <div v-if="newExercise.type=='multipleChoice'">
        Here you should be able to enter the multiple choice exercise.
         <div class="mb-3 mt-3">
    <label for="newOption" class="form-label">New option:</label>
    <input v-model="newOption" type="text" class="form-control" placeholder=""/>
    <button @click="addNewOptionClicked">Add</button>
  </div>
    </div>
  </div>
  <button @click="calcRandomImage">Change image</button>
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
  props: ["questionOfQuiz"],

  setup(){
     console.log("The setup  of Vue-New-Exercise function is executed!");

     console.log("Estoy programando con Ezquiel!");
     
  },
  
  data() {
    
    return  {
     newExercise: {
       topics : [],
       gapText : "",
       instruction : "",
       type : "gapText",
       imageUrl : "assets/img/spanisch/bonitamuyer.jpg"
    },
    newTopic: "",
    newOption: ""
  };
  },
 watch: {
    
  },

  methods: {

    deleteAllTopics() {
      this.newExercise.topics = [];
    },

    randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
},
    calcRandomImage() {
     
      const allImages =  ["22278.jpg", "32850.gif", "34187.gif", "34190.gif", "34203.gif", "36132.gif", "36473.gif", "96735.jpg", "arbol.jpg", "bonitamuyer.jpg", "botella.jpg", "chilis.jpg", "coche.jpg", "fahrraeder.png", "hombres.jpeg", "jugadordefutbol.jpg", "maccina.jpg", "maths2.png", "newlogo.gif", "picknick.png", "piso.jpg", "pisodemoneda.jpg", "volleyball.png"];

      const i = this.randInt(0,allImages.length - 1);
      this.newExercise.imageUrl = "assets/img/spanisch/" + allImages[i];

    },

    newExerciseClicked(){
      console.log("The button newExercise was clicked!");
      //TODO: Should just emit a signal , so the new exercise is inserted into the quiz

      this.$emit('newExerciseCreated', 
       this.newExercise );

    },

    addNewTopicClicked(){
      this.newExercise.topics.push(this.newTopic );
    },

    addNewOptionClicked() {
      console.log("The add new option button was clicked");
      console.log("New option = " + this.newOption );
    }
    
  },
  mounted() {
    console.log('Vue New Exercise mponent mounted');
    this.newExercise = this.questionOfQuiz;
    this.calcRandomImage();

  } //end of mounted
  ,

   computed : {
        allTopicsString(){
          let s = "";
          let first = true;
          if(this.newExercise.topics){
          this.newExercise.topics.forEach( (topic) => {
            if(first){
              first = false;
              s = topic;
            }else {
              s = s + "," + topic;
            }

          } ); }
          return s;
        }
   }
};
</script>

<style scoped>

.textarea {
    height: 10px;
    flex:1;
    min-width: 0;
}

</style>