<template>
<div v-if="exercise != undefined" class="container">

<h2>Exercise</h2>
    <p>
        {{ exercise.instruction }}
    </p>

    <p>Find:</p>
    <input type="text" name="regex" id="regex" v-model="find"/>
    <p>Replace by:</p>
    <input type="text" name="replace" id="replace" v-model="replaceby"/>
    <br>
    <button @click="replaceAll">Replace all</button>
    <span class="correct" v-if="score==1">
      You have solved this exercise correctly!
    </span>
    <div v-if="score==-1">
      <span class="incorrect" >
        You haven't replaced correctly! Click reset to try again!
      </span>
      <button @click="reset">Reset</button>
    </div>
    <br>
    <textarea style="height:200px;" v-model="editor">
        
    </textarea>
   
   </div>
</template>

<script>
export default {
  
  props: ["exercise"],

  setup: function() {
     console.log("The component is setup!");
     console.log(this);
     //console.log(this.exercise);
  },

  mounted(){
    console.log("The component is mounted!");
    console.log(this);
    console.log(this.exercise);
  },
 
  data() {
    return {
        find : "",
        replaceby : "",
        editor: this.exercise.editor,
        score: 0
    };
  },

  methods: {
    replaceAll(){
        console.log("The button was clicked!");
        let editorText = this.editor;
        let regEx = new RegExp(this.find, 'g')
        this.editor = editorText.replace(regEx, this.replaceby);

        let regExCor = new RegExp(this.exercise.find, 'g');
        let editorTextCor = editorText.replace(regExCor, this.exercise.replaceby);

        if(this.editor == editorTextCor ){
            this.score = 1;
        }
        else {
            this.score = -1;
        }
    },

    reset(){
      this.editor = this.exercise.editor;
      this.score = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid green;
}

textarea {
    width: 500px;
    height: 50px;
}

input {
  width: 75%;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}
</style>
