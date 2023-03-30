<template>
    <p>
        Please replace all i=i+5; by i+=5;!
    </p>

    <p>Find:</p>
    <input type="text" name="regex" id="regex" v-model="find"/>
    <p>Replace by:</p>
    <input type="text" name="replace" id="replace" v-model="replaceby"/>
    <br>
    <button @click="replaceAll">Replace all</button>
    <br>
    <textarea  v-model="editor">
        
    </textarea>
   
   
</template>

<script>
export default {
  name: 'RegexExercise',
 
  data() {
    return {
        find : "",
        replaceby : "",
        editor: "let i =7;\ni=i+5;\ni=i*78;\nlet s = 5;\ns = s - 1;\ns = s/2;\n"
        /*
            Regex: (j|s)\s*=\s*(\1)\s*(\+|\*)\s*(\d+)
            ReplaceString: $1$3=$4
        */
    }
  },

  methods: {
    replaceAll(){
        console.log("The button was clicked!");
        let regEx = new RegExp(this.find, 'g')
        this.editor = this.editor.replace(regEx, this.replaceby);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
    width: 500px;
    height: 500px;
}
</style>
