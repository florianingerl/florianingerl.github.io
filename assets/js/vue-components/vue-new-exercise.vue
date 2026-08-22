<template>
<div class="container">
   
  <div class="row">
    <span class="fw-bold">Topics:</span> {{allTopicsString }}
    <button @click="deleteAllTopics">Clear</button>
  </div>

  <div class="row mb-3">
  <label for="formGroupExampleInput" class="col-3">New topic:</label>
  <input v-model="newTopic" type="text" class="col-7" placeholder="Enter a new topic" />
  <button class="col-2" @click="addNewTopicClicked">Add</button>
</div>

<div>
  <label for="type" class="form-label">Type:</label>
  <select v-model="newExercise.type">
  <option value="gapText">Gap text</option>
  <option value="multipleChoice">Multiple choice</option>
</select>
</div>
   

   <div v-if="newExercise.type=='gapText'" class="mb-3 mt-3">
    <label for="instruction" class="form-label">Instruction:</label>
    <input v-model="newExercise.instruction" type="text" class="form-control"  >
  </div>

  <div v-if="newExercise.type=='multipleChoice'" class="mb-3 mt-3">
    <label for="question" class="form-label">Question:</label>
    <input v-model="newExercise.question" type="text" class="form-control">
  </div>

  <div style="display:flex;">
    <VueImage :imageUrl="newExercise.imageUrl"></VueImage>


    <textarea v-if="newExercise.type=='gapText'" rows="3"  v-model="newExercise.gapText">
    </textarea>

    <div v-if="newExercise.type=='multipleChoice'">
        <div class="container py-3" style="max-width: 360px;">
  <ul class="list-group">
    <li v-for="option in allOptions" :key="option" class="list-group-item d-flex align-items-center gap-2 selectable" data-value="1" role="button">
      <span>{{ option }}</span>
    </li>
  </ul>
  
  <input type="hidden" name="selectedItem" id="selectedItem" value="1">
</div>



         <div class="mb-3 mt-3">
    <label for="newOption" class="form-label">New option:</label>
    <input v-model="newOption" type="text" class="form-control" placeholder=""/>
    <button @click="addNewOptionClicked">Add</button>
    <button @click="allOptions=[]">Clear</button>
  </div>
    </div>
  </div>
  <button v-if="!editMode" @click="calcRandomImage">Change image</button>
  <button v-if="!editMode" @click="getGifUrlFromKlipy">Change image 2</button>
    <button class="btn-primary btn" @click="newExerciseClicked">Save</button>
    <button class="btn-primary btn" @click="$emit('cancelClicked')">Cancel</button>
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
  props: ["questionOfQuiz", "editMode"],

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
    newOption: "",
    allOptions: ["Farah","Hermann", "Flori"]

  };
  },
 watch: {
    
  },

  methods: {

    async findGifUrls(searchTerm) {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const KLIPY_API_KEY = "GblaAUO3H2fVadJMh2BBPfeNpoAcdpI0TQKEx7HGN2GDeCVNpLY9CgEB10yhcnZb";
let url =  new URL(`https://api.klipy.com/api/v1/${KLIPY_API_KEY}/gifs/search`);
url.searchParams.set("q", searchTerm);
url.searchParams.set("page",1);
url.searchParams.set("per_page",10);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Klipy request failed: ${response.status}`);
  }

  const result = await response.json();

  console.log("Here is the result");
  console.log(result);

  return result.data.data
    .map(e=> e.file.hd.jpg.url);
},


    deleteAllTopics() {
      this.newExercise.topics = [];
    },

    randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
},
    calcRandomImage() {
      if(this.editMode) return;
     
      const allImages =  ["22278.jpg", "32850.gif", "34187.gif", "34190.gif", "34203.gif", "36132.gif", "36473.gif", "96735.jpg", "arbol.jpg", "bonitamuyer.jpg", "botella.jpg", "chilis.jpg", "coche.jpg", "fahrraeder.png", "hombres.jpeg", "jugadordefutbol.jpg", "maccina.jpg", "maths2.png", "newlogo.gif", "picknick.png", "piso.jpg", "pisodemoneda.jpg", "volleyball.png"];

      const i = this.randInt(0,allImages.length - 1);
      this.newExercise.imageUrl = "assets/img/spanisch/" + allImages[i];

    },

    async getGifUrlFromKlipy(){
       console.log("The function getGifUrlFromKlipy was called!");
       let urls = await this.findGifUrls("Harry Potter");
       this.newExercise.imageUrl = urls[0]; 
    },

    newExerciseClicked(){
      console.log("The button newExercise was clicked!");
      //TODO: Should just emit a signal , so the new exercise is inserted into the quiz
      if(this.newExercise.type=='multipleChoice'){
        this.newExercise.options = [];
        this.allOptions.forEach( (o, i) => {
          this.newExercise.options.push( { option: o , correct: i == 0 } );
        } );
      }

      console.log(this.newExercise );

      try {
      this.$emit('newExerciseCreated', 
       this.newExercise );
      }catch(e){
        console.error("emit failed",e);
      }

       console.log("The event was emitted!");

    },

    addNewTopicClicked(){
    console.log( this.newTopic );
    this.newExercise.topics ??= []; //is executed only when this.newExercise.topics is null or undefined
      console.log( this.newExercise.topics );
      this.newExercise.topics.push(this.newTopic );
      console.log(  this.newExercise.topics );
    },

    addNewOptionClicked() {
      console.log("The add new option button was clicked");
      console.log("New option = " + this.newOption );
      this.allOptions.push(this.newOption);
    }
    
  },
  mounted() {
    console.log('Vue New Exercise mponent mounted');
    this.newExercise = {
      ...this.questionOfQuiz
    };
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