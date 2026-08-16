<template>
<div>
   
  <div>
    <p>Topics: {{allTopicsString }}</p>
    <p>
      New Topic: <input v-model="newTopic" type="text" class="form-control" /> <button @click="addNewTopicClicked">Add</button>
    </p>
  </div>

   <div class="mb-3 mt-3">
    <label for="instruction" class="form-label">Instruction:</label>
    <input v-model="instruction" type="text" class="form-control" id="instruction" placeholder="" name="instruction" >
  </div>

  <div style="display:flex;">
    <VueImage :imageUrl="imageUrl"></VueImage>

    <textarea rows="3"  v-model="gapText">
        Flori {is|are} very intelligent.
    </textarea>
  </div>

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
       gapText: "",
       newTopic: "",
       instruction: "",
       type: "gapText",
       imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    };
  },
 watch: {
    
  },

  methods: {

    randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
},
    calcRandomImage() {
      let allImages = ["22278.jpg", "32850.gif", "34187.gif", "34190.gif", "34203.gif", "36132.gif", "36473.gif", "96735.jpg", "arbol.jpg", "bonitamuyer.jpg", "botella.jpg", "chilis.jpg", "coche.jpg", "fahrraeder.png", "hombres.jpeg", "jugadordefutbol.jpg", "maccina.jpg", "maths2.png", "newlogo.gif", "picknick.png", "piso.jpg", "pisodemoneda.jpg", "volleyball.png"];
      const i = this.randInt(0,allImages.length - 1);
      this.imageUrl = "assets/img/spanisch/" + allImages[i];

    },

    newExerciseClicked(){
      console.log("The button newExercise was clicked!");
      //TODO: Should just emit a signal , so the new exercise is inserted into the quiz

      this.$emit('newExerciseCreated', 
      { topics: Array.from(this.topics),
        instruction: this.instruction,
        gapText: this.gapText,
        imageUrl: this.imageUrl,
        type: this.type

      } );

    },

    addNewTopicClicked(){
      this.topics.add(this.newTopic );
    }
    
  },
  mounted() {
    console.log('Vue New Exercise mponent mounted');
    this.calcRandomImage();
  } //end of mounted
  ,

   computed : {
        allTopicsString(){
          let s = "";
          let first = true;
          if(this.topics){
          this.topics.forEach( (topic) => {
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