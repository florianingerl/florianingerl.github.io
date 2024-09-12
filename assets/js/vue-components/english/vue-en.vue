<template>
<div @dblclick="openDict">
    <h1>Double click on any word on this page to get a translation!</h1>
    <router-view/>
</div>

 
</template>

<script>

export default {
  name: "VueEn",
  components: {
  
  },
  props: [],

  data() {
    return {
       
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
         window.open("https://www.wordreference.com/enfr/" + str, "_blank").focus();
       
        console.log("This script has been executed!");  
    }
  }
}
</script>

<style scoped>



</style>