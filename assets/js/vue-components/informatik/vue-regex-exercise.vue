<template>
<div v-if="exercise != undefined" class="container">

<h2>Exercise</h2>
    <p>
        {{ exercise.instruction }}
    </p>

    <p>Find:</p>
    <input type="text" name="regex" id="regex" v-model="find"/> 
    <br>
    <button @click="findAll">Find all</button>
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
    <div class="editor">
    <span v-for="match in matches">
        <span v-for="(pre, i) in match.preSplit">
          {{pre}} <br v-if="i+1!= match.preSplit.length" />
        </span>
        <span v-for="(m, i) in match.matchSplit" style="background-color: orange; color:black"> 
        {{ m }} <br v-if="i+1!=match.matchSplit.length" />
        </span>
    </span>
        
    </div>
   
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
    this.reset();
  },
 
  data() {
    return {
        find : "",
        replaceby : "",
        editor: this.exercise.editor,
        score: 0,
        matches : []
    };
  },

  methods: {
    findAll() {
        console.log("Find all was called!");
        let pattern = new RegExp(this.find, 'g');
        console.log("We are still here!");
        let text = this.exercise.editor;
        let result;
        let i = 0;
        let matches = [];
        console.log(matches);
        while( (result = pattern.exec(text) ) != null ) {
          console.log("Linie 76");
            let match = { pre: text.substring( i, result.index), match: result[0] };
            match.preSplit = match.pre.split("\n");
            console.log("Line 84");
            match.matchSplit = match.match.split("\n");
            i = pattern.lastIndex; 
            console.log(match);
            matches.push(match);
        }
        let match = {pre: text.substring( i ), match: "" };
        match.preSplit = match.pre.split("\n");
        console.log("Line 92");
        match.matchSplit = [];
        matches.push( match );
        console.log("Line 95");
        this.matches = matches;
        console.log("Line 97");
    },
    replaceAll(){
        console.log("The button was clicked!");
        let editorText = this.exercise.editor;
        let regEx = new RegExp(this.find, 'g');
        
        this.editor = editorText.replace(regEx, this.replaceby);
        this.matches = [ {pre: this.editor, preSplit: this.editor.split("\n"), match: "", matchSplit: [] }];

        let regExCor = new RegExp(this.exercise.find, 'g');
        let editorTextCor = editorText.replace(regExCor, this.exercise.replaceby);

        console.log("EditorTextCor\n" + editorTextCor);

        if(this.editor == editorTextCor ){
            this.score = 1;
        }
        else {
            this.score = -1;
        }
    },

    reset(){
      this.editor = this.exercise.editor;
      this.matches = [{ pre: this.editor, preSplit: this.editor.split("\n"), match: "", matchSplit: [] }];
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

.editor {
  border: 2px solid black;
  background-color: beige;
  color: black;
  height: 400px;
}
</style>
