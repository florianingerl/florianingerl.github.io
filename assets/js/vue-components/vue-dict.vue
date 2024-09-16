<template>
<div @dblclick="openDict">

    <h1>Double clique sur n'importe quel mot sur ce cite pour une traduction!</h1>
    Select your preferred dictionary:
     <select  v-model="selectedDict">
  <option disabled value="">Please select one</option>
   <option v-for="dict in dictionaries">{{ dict.name }}</option>
</select>

    <router-view/>
</div>

 
</template>

<script>

export default {
  name: "VueDict",
  components: {
  
  },
  props: [],

  data() {
    return {
       selectedDict : "The free dictionary French - French",
       dictionaries : []
    };
  },

  watch:{
    $route (to, from){
        this.setDictionaries();
    }
  } ,

  mounted(){
     
   console.log("The mounted function of VueFr is executed!" );

   this.setDictionaries();

  },
  setup(){
   console.log("The setup function of VueFr is executed!");
     },
  
  
  methods: {
    setDictionaries() {
         console.log(this.$route.params.language );
   if( this.$route.params.language === 'french' ){
    this.dictionaries = [ { name: "Word Reference French - German", url: "https://www.wordreference.com/frde/" },
                         { name: "Word Reference French - English", url: "https://www.wordreference.com/fren/" }, 
                         { name: "Larousse French - French", url: "https://www.larousse.fr/dictionnaires/francais/"},
                         { name: "The free dictionary French - French", url: "https://fr.thefreedictionary.com/" }];
   }
   else if( this.$route.params.language === 'english' ){
     this.dictionaries = [ { name: "Word Reference English - German", url: "https://www.wordreference.com/ende/" },
                         { name: "Word Reference English - French", url: "https://www.wordreference.com/enfr/" }, 
                         { name: "Oxford Learner's dictionary English - English", url: "https://www.oxfordlearnersdictionaries.com/definition/english/"},
                         { name: "The free dictionary English - English", url: "https://en.thefreedictionary.com/" }];
   }

   this.selectedDict = this.dictionaries[0].name;

    },
    openDict(event){
        console.log("A method in my vue component is executed!");
        console.log(this.$stupidProp);
        console.log(this.$window);
        console.log(this.window);

       console.log(this.$router.$stupidProp );
       console.log(this.$router.stupidProp );
       console.log(this.$router.$window2);
       console.log(this.$router.window2);


        console.log("event.target = " + event.target );
        /*
        let s = this.window.getSelection();
        console.log("s = " + s );
          var range = s.getRangeAt(0);
          var node = s.anchorNode;
          
        
          // Find starting point
          while(range.toString().search(/[^\w]|^/) != 0) {                 
             range.setStart(node,(range.startOffset -1));
          }
          if(range.toString().search(/[^\w]/ == 0) ){
            console.log("This was executed!");
            range.setStart(node, range.startOffset +1);
          }
          
          // Find ending point
          do{
            range.setEnd(node,range.endOffset + 1);
    
         }while(range.toString().search(/[^\w]/) == -1 && range.toString().trim() != '');
         
         // Alert result
         var str = range.toString().trim();
         console.log(str); */
         let str = this.window.getSelection().toString();
          var baseUrl = "https://fr.thefreedictionary.com/";
         let i = this.dictionaries.findIndex( (dict) => dict.name === this.selectedDict );
         if( i!= -1 ){
            baseUrl = this.dictionaries[i].url;
         }
         window.open(baseUrl + str, "_blank").focus();
       
      
       
        console.log("This script has been executed!");  
    }
  }
}
</script>

<style scoped>



</style>