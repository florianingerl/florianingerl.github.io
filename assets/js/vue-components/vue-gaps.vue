<template>
<div>
<ol>
<li v-for="innergaps in gaps">
<span v-for="gap in innergaps" >
  {{ gap.text }} 
  <input v-if="gap.gap!=''" :class="{ notcorrect: validated && gap.guess != gap.gap, correct: validated && gap.guess === gap.gap }" type="text" v-model="gap.guess"> 
</span>
</li>
</ol>

<p v-if="lg==='fr'">
<button @click="buttonValidateClicked">Valider ma solution</button>
<button @click="showSolutionClicked">Montre-moi la solution</button>
</p>
<p v-else>
<button @click="buttonValidateClicked">Validate</button>
<button @click="showSolutionClicked">Show me the solution</button>
</p>


</div>

    
</template>

<script>

export default {
  name: "VueGaps",
  components: {
  
  },
  props: ['gapfile','gaptext','lg'],

  data() {
    return {
       /*gaps : [[{text: "Florian est le ", gap: "frère", guess:""}, {text: " de sa ", gap: "soeur", guess:""}, {text: " qui s'appelle ", gap: "Sonja", guess:""}],
                [{text: "Florian est le ", gap: "frère", guess:""}, {text: " de sa ", gap: "soeur", guess:""}, {text: " qui s'appelle ", gap: "Sonja", guess:""}] ],
       */
       gaps: [],
       validated: false 
    };
  },

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
      this.parseGapTexts(JSON.parse(data));
    }
};
xhttp.open("GET", this.gapfile, true);
xhttp.send();

     }
     else if(this.gaptext && Array.isArray(this.gaptext) ){ //gaptext is an array of gaptexts
     console.log(this.gaptext);
      this.parseGapTexts(this.gaptext);
     }
     else if(this.gaptext){
      this.parseGapText(this.gaptext);
     }

  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  
  methods: {
    
     buttonValidateClicked(){
        this.validated = true;
        console.log("The button validated was clicked!");
     },
     showSolutionClicked(){
        this.validated = true;
        this.gaps.forEach( innergaps => {
          innergaps.forEach( gap => { gap.guess = gap.gap; } );
          
        } );
     },
     parseGapTexts(gaptexts){
      console.log("parseGapTexts called!");
        gaptexts.forEach( gaptext => {
           console.log(gaptext + " is now parsed!");
           this.parseGapText(gaptext);
        } );
     },
     parseGapText(data){
      if(!data.endsWith("}")){
        data += "{}";
      }
      let gaps = [];
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
        gaps.push(gap);
      }
      console.log(gaps);
      this.gaps.push(gaps);
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