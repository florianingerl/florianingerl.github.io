<template>

<div class = "row justify-content-between">
<button v-if="!newExercise" @click="newExercise=true; editMode = false" type="button"  class="col-3 btn btn-success"  data-bs-toggle="tooltip" data-bs-placement="top" title="Add a new exercise">
        <i class="bi bi-plus-lg" aria-hidden="true"></i>
      </button>

      <button v-if="!newExercise" @click="newExercise=true; editMode = true"
        type="button"
        class="col-3 btn btn-primary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Edit the exercise"
      >
        <i class="bi bi-pencil-square" aria-hidden="true"></i>
       
      </button>

      <button @click="deleteExerciseClicked"
        type="button"
        class="col-3 btn btn-danger"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Delete the exercise"
      >
        <i class="bi bi-trash" aria-hidden="true"></i>
      </button>
</div>

<div v-if="newExercise">
  <VueNewExercise :questionOfQuiz="displayedQuestions[i]" :editMode="editMode"  @new-exercise-created="(exercise) => { newExerciseCreated(exercise); }" @cancel-clicked="newExercise=false"></VueNewExercise>
</div>

<div v-if="!newExercise" class="row">
    <select v-model="selectedTopic">
  <option disabled value="">Bitte wähle ein Thema !</option>
  <option v-for="topic in topics">
        {{ topic }}
      </option>
  
</select>

    <VueImage v-if="i < displayedQuestions.length" :imageUrl="displayedQuestions[i].imageUrl">
      <VueMCGaps v-if="displayedQuestions[i].type === 'gapText'" :instruction="displayedQuestions[i].instruction" :gaptext="displayedQuestions[i].gapText" :lg="lg" :key="i"></VueMCGaps>
      <VueQuestion v-if="displayedQuestions[i].type === 'multiple choice' || displayedQuestions[i].type === 'multipleChoice'" :question="displayedQuestions[i]" :lg="lg" @answered-event="calcScore"></VueQuestion>
    </VueImage>
    <div v-if="i == displayedQuestions.length && lg=='de'">
        Gratulation! Du hast alle Fragen des Quiz beantwortet!
    </div>
    <div v-if="i == displayedQuestions.length && lg=='en'">
        Congratulations! You have answered all the questions of this quiz!
    </div>
    <div v-if="i == displayedQuestions.length && lg=='fr'">
       Félicitations! Tu viens de répondre à toutes les questions!
    </div>
  <ul class="pagination" v-if="lg==='de'">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked" data-bs-toggle="tooltip" title="Gehe 5 Aufgaben zurück"><i class="fa fa-fast-backward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked" data-bs-toggle="tooltip" title="Vorige Aufgabe"><i class="fa fa-backward" aria-hidden="true"></i></button></li>
  <li v-for="q in displayedQuestionsIndices" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked" data-bs-toggle="tooltip" title="Nächste Aufgabe"><i class="fa fa-forward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked" data-bs-toggle="tooltip" title="Gehe 5 Aufgaben weiter"><i class="fa fa-fast-forward" aria-hidden="true"></i></button></li>
  <input @keypress="onlyNumberKey" @change="goToQuestionClicked" type="text" :value="i" style="width: 50px;"/> <span style="vertical-align: baseline;"> / {{ displayedQuestions.length - 1}} </span>
  </ul>
  <ul class="pagination" v-else-if="lg==='en'">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked" data-bs-toggle="tooltip" title="Jump 5 exercises backward"><i class="fa fa-fast-backward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked" data-bs-toggle="tooltip" title="Previous exercise"><i class="fa fa-backward" aria-hidden="true"></i></button></li>
  <li v-for="q in displayedQuestionsIndices" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked" data-bs-toggle="tooltip" title="Next Exercise"><i class="fa fa-forward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked" data-bs-toggle="tooltip" title="Jump 5 exercises forward"><i class="fa fa-fast-forward" aria-hidden="true"></i></button></li>
  <input @keypress="onlyNumberKey" @change="goToQuestionClicked" type="text" :value="i" style="width: 50px;"/> <span style="text-align: center;"> / {{ displayedQuestions.length - 1 }} </span>
  </ul>
   <ul class="pagination" v-else-if="lg==='fr'">
  <li class="page-item"><button class="page-link" @click="jumpBackwardClicked" data-bs-toggle="tooltip" title="Sauter 5 exercices en arrière"><i class="fa fa-fast-backward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="previousExerciseClicked" data-bs-toggle="tooltip" title="Question précédente"><i class="fa fa-backward" aria-hidden="true"></i></button></li>
  <li v-for="q in displayedQuestionsIndices" class="page-item" :class="{active : q == i}" :key="q"><button class="page-link" @click="i=q;">{{q}}</button></li>
  <li class="page-item"><button class="page-link" @click="nextExerciseClicked" data-bs-toggle="tooltip" title="Question suivante"><i class="fa fa-forward" aria-hidden="true"></i></button></li>
  <li class="page-item"><button class="page-link" @click="jumpForwardClicked" data-bs-toggle="tooltip" title="Sauter 5 questions"><i class="fa fa-fast-forward" aria-hidden="true"></i></button></li>
  <input @keypress="onlyNumberKey" @change="goToQuestionClicked" type="text" :value="i" style="width: 50px;"/> <span style="text-align: center;"> / {{ displayedQuestions.length - 1 }} </span>
  </ul>

  <p>Your score: {{ scoreText }} </p>
</div>

    
</template>

<script>
import VueMCGaps from "./vue-mc-gaps.vue";
import VueQuestion from "./vue-question.vue";
import VueImage from "./vue-image.vue";
import VueNewExercise from "./vue-new-exercise.vue";

export default {

  components: {
    
    VueQuestion,
    VueMCGaps,
    VueImage,
    VueNewExercise
  
  },
  props: ['questions', 'lg'],

  setup(){
     console.log("The setup function is executed!");

     console.log("Estoy programando con Ezquiel!");
     
  },
  
  data() {
    return {
       i : 0,
       scoreText: "",
       topics : new Set([]),
       selectedTopic : "",
       newExercise: false,
       editMode: false,
       firstModification: true
    };
  },
 watch: {
    selectedTopic(newVal, oldVal) {
      console.log("The selected topic changed!");
      // only if it actually changed (optional check)
      if (newVal !== oldVal) {
        this.i = 0;
      }
    }
  },

  methods: {
    addExercisesFromDB(){

const client = axios.create({
  baseURL: 'http://localhost:8080',
});

(async () => {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    const response = await client.get('/api/exercise', config);

    console.log(response);

    const exercises = response.data;

    exercises.forEach((exercise) => {
      console.log(exercise.gapText);
    });

    this.questions.push(...exercises);
  } catch (err) {
    console.error(err);
  }
})();

    },

    deleteExerciseFromDB(exercise){
      const client = axios.create({
  baseURL: 'http://localhost:8080',
});

async function deleteExercise(id) {
  try {
    await client.delete(`/api/exercise/${encodeURIComponent(id)}`);

    console.log('Exercise deleted successfully');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Delete failed:',
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Example:
const exerciseId = exercise._id;
deleteExercise(exerciseId);
    },

    deleteExerciseClicked(){
      const confirm = window.confirm("Do you really want to delete this question?");
      if(!confirm){
        return;
      }
      let j = this.questions.findIndex(q => q === this.displayedQuestions[this.i] );
      if(j != -1){

        console.log("Exercise to be deleted now:");
        console.log(this.questions[j]);

        this.deleteExerciseFromDB(this.questions[j]);

        this.questions.splice(j,1);
      }
    },

    updateExerciseInDB(exercise){

const client = axios.create({
  baseURL: "http://localhost:8080",
});

(async () => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {

    const response = await client.put(
      `/api/exercise/${exercise._id}`,
      exercise,
      config
    );

    console.log(response.data);
    console.log(response.status);
    console.log(response.data.json);
    console.log(response.data.message);
  } catch (err) {
    console.error(err);
  }
})();

    },

    newExerciseCreated(exercise){
      console.log("The function newExerciseCreated is executed!");
      console.log(exercise);
      
        if(!this.editMode ) { this.questions.push(exercise);}
        else {
          let j = this.questions.findIndex( q => q === this.displayedQuestions[this.i] );
          console.log("i="+this.i + " j="+j);
           this.questions[j] = exercise; 
           this.updateExerciseInDB(exercise);
          }
        this.calcAllTopics();
        this.selectedTopic = exercise.topics.length > 0 ? exercise.topics[0] : null;
        if(!this.editMode){
        this.i = this.displayedQuestions.length - 1;
        }else {
          this.i = this.displayedQuestions.findIndex(x => x === exercise);
        }
        
      this.newExercise = false;

      let questionCode = JSON.stringify(this.questions, null, 2) + ",";
      questionCode = this.modifyKeys(questionCode);

      console.log(questionCode);
      navigator.clipboard.writeText(questionCode);

      if(this.firstModification){
        this.firstModification = false;
        alert("Please send an email to imelflorianingerl@gmail.com with the contents of your clipboard at the end of all your work if you want it to be permanent!");
      }
    },

    modifyKeys(questionCode){
const pattern = /"(\w+)"\s*:/g;

const replaced = questionCode.replace(pattern, "$1:");

return replaced
    },

    calcAllTopics() {
      console.log("calcAllTopics was called!");
      this.topics = new Set([]);
      this.questions.forEach( (question) => {
        if(question.topics){
        question.topics.forEach( (topic) => { this.topics.add(topic); }  );
        }
      } );
    },

    calcScore(){
      
      let answered = 0;
      let correct = 0;
      this.questions.forEach( (question) => {
         if( question.correctlyAnswered == undefined )
            return;
         answered++;
         console.log(question.correctlyAnswered);
         if( question.correctlyAnswered ) {
           correct++;
         }
      } );

      if(this.lg === "en"){
        this.scoreText = "You have answered "+ correct + " of " + answered + " questions correctly.";
      }
      else if(this.lg === "fr"){
        this.scoreText = "Tu as répondu à " + correct + " parmi " + answered + " questions correctement.";
      }
      else {
        this.scoreText = "Du hast " + correct + " von " + answered + " Fragen richtig beantwortet.";
      }

        

    },

    goToQuestionClicked(e){
      console.log("Go to question was clicked!");
      let u = parseInt( e.target.value );
      if (Number.isNaN(u)) return;    
      if( u < 0 || u >= this.displayedQuestions.length ){
        return;
      }
      this.i = u;
    },

    onlyNumberKey(evt) {
            console.log("A key was pressed!"); 
            // Only ASCII character in that range allowed
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
                console.log("False is returned!");
                evt.stopPropagation();
                return false;
            }
            console.log("True is returned!");
            return true;
        },
     nextExerciseClicked(){
      if(this.i < this.displayedQuestions.length - 1){
        this.i++;
      }
        
        console.log(this.i);
     },
     previousExerciseClicked(){
      if(this.i > 0){
        this.i--;
      }
        
        console.log(this.i);
     },
     jumpForwardClicked(){
        if(this.i + 5 < this.displayedQuestions.length)
          this.i+=5;
        else
          this.i = this.displayedQuestions.length - 1;
     },
     jumpBackwardClicked(){
        if(this.i - 5 >= 0)
          this.i -=5;
        else
          this.i = 0;
     },
     imageClicked(){
      console.log("The image was clicked!");
      let fullPage = document.getElementById('fullpage');

		  fullPage.style.backgroundImage = 'url(' + this.displayedQuestions[this.i].imageUrl + ')';
		  fullPage.style.display = 'block';
    }
  },
  computed : {
    

      displayedQuestions(){
        console.log("Displayed questions is called once again!");
         
         return this.selectedTopic ? this.questions.filter( (question) => (question.topics || [] ).includes(this.selectedTopic) ) : this.questions;
        
      },
       displayedQuestionsIndices(){
       console.log("Displayed questions indices is called once again!");
         let a = [];
        
         let j = Math.floor(this.i/5);
         j=j*5;
         let k = 0;
         while(k < 5 && j < this.displayedQuestions.length ){
           a.push(j);
           ++j;
           ++k;
         }
         console.log("a.length = " + a.length );
         return a;
     }
  },
  mounted() {
    console.log('Vue Questions Component mounted');

    this.addExercisesFromDB();

    this.calcAllTopics();

  }
};
</script>

<style scoped>

</style>