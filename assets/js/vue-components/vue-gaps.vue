<template>
<!-- <input class="frenchinput" type="text"><div>A lot of Sonderzeichen</div></input> -->
<div>
<p>
<span v-for="gap in gaps" >
  {{ gap.text }} <input v-if="gap.gap!=''" :class="{ notcorrect: validated && gap.guess != gap.gap}" :class="{ correct: validated && gap.guess === gap.gap }" type="text" v-model="gap.guess">
</span>
</p>

<p>
<button @click="buttonValidateClicked">Valider ma solution</button>
</p>

</div>

    
</template>

<script>

export default {
  name: "VueGaps",
  components: {
  
  },
  props: ['gapfile','gaptext'],

  mounted(){
     console.log("The setup function is executed!");
     if( this.gapfile ){
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = () => {
     if (xhttp.readyState == 4 && xhttp.status == 200) {
       // Typical action to be performed when the document is ready:
        let data = xhttp.responseText;
        console.log("The ajax query works!");
        console.log(data);

        console.log("I can read the file!");
      console.log(data);
      this.parseGapText(data);
    }
};
xhttp.open("GET", this.gapfile, true);
xhttp.send();

     }
     else if(this.gaptext){
      this.parseGapText(this.gaptext);
     }

  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       //gaps : [{text: "Florian est le ", gap: "frère", guess:""}, {text: " de sa ", gap: "soeur", guess:""}, {text: " qui s'appelle ", gap: "Sonja", guess:""}],
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
      this.gaps = [];
      let i = 0;
      while (true){
        let gap = {};
        let j = data.indexOf("{",i);
        if(j == -1){
            break;
        }
        gap.text = data.substring(i,j);
        i = data.indexOf("}",j);
        gap.gap = data.substring(j+1,i);
        i++;
        gap.guess = "";
        this.gaps.push(gap);
      }
      console.log(this.gaps);
     }
  }
}
</script>

<style scoped>

.correct {
    color: green;
    border: 1px solid green
}

.notcorrect {
    color: red;
    border: 1px solid red
}


</style>