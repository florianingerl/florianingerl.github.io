<template>
<div>
<ol style="list-style-type: none">
<li v-for="innergaps in gaps">
<span v-for="gap in innergaps" >
  {{ gap.text }} 
  <select :disabled="validated" v-if="gap.gap!='' && Array.isArray(gap.gap)" :class="{ notcorrect: validated && gap.guess != gap.gap[0], correct: validated && gap.guess === gap.gap[0] }" v-model="gap.guess">
    <option disabled value="">Please select one</option>
    <option v-for="op in suffle(gap.gap)">{{ op }}</option>
  </select> 

  <input :disabled="validated" v-if="gap.gap!='' && !Array.isArray(gap.gap)" :style="{ width: ( gap.gap.length + 2 ) + 'ch' }" :class="{ notcorrect: validated && gap.guess != gap.gap, correct: validated && gap.guess === gap.gap }" type="text" v-model="gap.guess"> 
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
  name: "VueMCGaps",
  components: {
  
  },
  props: ['gapfile','gaptext', 'same', 'lg', 'numbering'],

  data() {
    return {
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

     console.log( "The value of this.same is " + this.same );
     if(this.same){
       let alloptions = [];
        console.log( "The value of this.gaps is " + this.gaps );
       this.gaps.forEach( innergaps => {
           innergaps.forEach( gap => {
           if(Array.isArray(gap.gap) ) { 
           gap.gap.forEach( option => {
              if( alloptions.indexOf(option) == -1 && option != '' ){
                alloptions.push(option);
              }
           });
           }
       });

       });
       this.gaps.forEach( innergaps => {
        innergaps.forEach(
        gap => {
          if( Array.isArray( gap.gap) ){
          if(gap.gap[0] != ''){
           let i = alloptions.indexOf(gap.gap[0]);
           gap.gap = [...alloptions];
           let s = gap.gap[0];
           gap.gap[0] = gap.gap[i];
           gap.gap[i] = s;
          }
          }

       });

     });
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
          innergaps.forEach( gap => {
             gap.guess = Array.isArray(gap.gap) ? gap.gap[0] : gap.gap; 
             } );
          
        } );
     },

     suffle(array){
      if(this.same){
        return array;
      }
      let newarray = [...array];
      newarray.sort( (a,b) => 0.5 - Math.random() );
      return newarray;
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
        gap.gap = data.substring(j+1,i).split("|");
        if( gap.gap.length == 1){ //This is just a normal gap, not a multiple options gap, | didn't appear
          gap.gap = gap.gap[0];
        }

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