<template>
<div @dblclick="openDict" @keypress="openDictOnPressingK">

    <h4>Double-click on any word on this page to see a translation!</h4>
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
   else if( this.$route.params.language === 'deutsch' ){
     this.dictionaries = [ { name: "The free dictionary Deutsch - Deutsch", url: "https://de.thefreedictionary.com/" },
                         { name: "Word Reference Deutsch - Englisch", url: "https://www.wordreference.com/deen/" },
                         { name: "Word Reference Deutsch - Französisch", url: "https://www.wordreference.com/defr/" },
                         { name: "Word Reference Deutsch - Spanisch", url: "https://www.wordreference.com/dees/" },
                         { name: "Pons Deutsch - Russisch", url: "https://de.pons.com/%C3%BCbersetzung-2/deutsch-russisch/" }
                        ];
   }

   this.selectedDict = this.dictionaries[0].name;

    },
    openDict(event){
        
         let str = this.window.getSelection().toString();
          var baseUrl = "https://fr.thefreedictionary.com/";
         let i = this.dictionaries.findIndex( (dict) => dict.name === this.selectedDict );
         if( i!= -1 ){
            baseUrl = this.dictionaries[i].url;
         }
         window.open(baseUrl + str, "_blank").focus();
       
      
       
        console.log("This script has been executed!");  
    },

    openDictOnPressingK(event){
      console.log("A key was pressed!");

      console.log( event.keyName );
      console.log( event);
    }
  }
}
</script>

<style scoped>



</style>