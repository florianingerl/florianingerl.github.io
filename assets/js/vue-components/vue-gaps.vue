<template>
<!-- <input class="frenchinput" type="text"><div>A lot of Sonderzeichen</div></input> -->
<div>
<p>
<span v-for="gap in gaps" >
  {{ gap.text }} 
  <div class="frenchinput"> 
  <input v-if="gap.gap!=''" @focus="(e) => { gap.target = e.target; gap.hasFocus = true; }" @blur="if(!gap.mouseover)gap.hasFocus=false;" :class="{ notcorrect: validated && gap.guess != gap.gap, correct: validated && gap.guess === gap.gap }" type="text" v-model="gap.guess"> 
  <div v-if="gap.hasFocus" :style="'left:'+gap.target.selectionStart+'ch;'" @mouseover="gap.mouseover=true" @mouseout="gap.mouseover=false">
    <span v-for="symbol in frenchSymbols" @click="insertSymbol(gap,symbol)" v-html="symbol"></span>
  </div>

  
  </div>
</span>
</p>

<p>
<button @click="buttonValidateClicked">Valider ma solution</button>
<button @click="showSolutionClicked">Montre-moi la solution</button>
</p>


</div>

    
</template>

<script>

export default {
  name: "VueGaps",
  components: {
  
  },
  props: ['gapfile','gaptext','french'],

  data() {
    return {
       //gaps : [{text: "Florian est le ", gap: "frère", guess:""}, {text: " de sa ", gap: "soeur", guess:""}, {text: " qui s'appelle ", gap: "Sonja", guess:""}],
       gaps: [],
       validated: false ,
       frenchSymbols : ['é','è','\u00E7']
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
  
  
  methods: {
    insertSymbol(gap, symbol){
    let p = gap.target.selectionStart;
    console.log(p);
    gap.guess = gap.guess.substring(0,p) + symbol + gap.guess.substring(p);
    gap.target.focus();
    console.log("Setting selection!");
    gap.target.setSelectionRange(p+1,p+1);
  },

    textTyped(e){
      console.log("Text was inserted!");
      this.testGap.target = e.target;
      console.log(e.target.selectionStart);
    },
     frenchSymbolClicked(e){
        console.log("Event handler was clicked!");
        this.testGap.guess = "Hallo Welt!";
        e.stopPropagation();
        return false;
     },

     buttonValidateClicked(){
        this.validated = true;
        console.log("The button validated was clicked!");
     },
     showSolutionClicked(){
        this.validated = true;
        this.gaps.forEach( gap => {
          gap.guess = gap.gap;
          
        } );
     },
     parseGapText(data){
      if(!data.endsWith("}")){
        data += "{}";
      }
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


.frenchinput {
  position: relative;
  display: inline;
}

.frenchinput div span {
  padding: 3px;
  border: solid 1px black;
}

.frenchinput div {
  position: absolute;
  top: 103%;
  background-color: orange;
  border: solid 2px black;
  z-index: 1;

}


</style>