<template>
<div @dblclick="openDict">
    <h1>Double clique sur n'importe quel mot sur ce cite pour une traduction!</h1>
    <p>Select your preferred dictionary:
     <select v-model="selectedDict">
  <option disabled value="">Please select one</option>
  <option>The free dictionary French - French</option>
  <option>Word Reference French - English</option>
  <option>Word Reference French - German</option>
</select>
</p>
    <router-view/>
</div>

 
</template>

<script>

export default {
  name: "VueFr",
  components: {
  
  },
  props: [],

  data() {
    return {
       selectedDict : "The free dictionary French - French"
    };
  },

  mounted(){
     
   console.log("The mounted function of VueFr is executed!" );

  },
  setup(){
   console.log("The setup function of VueFr is executed!");
  },
  
  
  methods: {
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
        let s = this.window.getSelection();
        console.log("s = " + s );
          var range = s.getRangeAt(0);
          var node = s.anchorNode;
          
        
          // Find starting point
          while(range.toString().search(/[^\w]/) != 0) {                 
             range.setStart(node,(range.startOffset -1));
          }
          range.setStart(node, range.startOffset +1);
          
          // Find ending point
          do{
            range.setEnd(node,range.endOffset + 1);
    
         }while(range.toString().search(/[^\w]/) == -1 && range.toString().trim() != '');
         
         // Alert result
         var str = range.toString().trim();
         console.log(str);
          var baseUrl = "https://fr.thefreedictionary.com/";
         if(this.selectedDict === "Word Reference French - German" ){
             baseUrl = "https://www.wordreference.com/frde/";
         }
         else if(this.selectedDict === "Word Reference French - English" ){
             baseUrl = "https://www.wordreference.com/fren/";
         }
         window.open(baseUrl + str, "_blank").focus();
       
      
       
        console.log("This script has been executed!");  
    }
  }
}
</script>

<style scoped>



</style>