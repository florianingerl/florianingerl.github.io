<template>

<div>
<h1>Mithelfen</h1>

<p>
Sprache ist besonders für den kopflastigen Mathematiker, Informatiker oder Physiker ganz wichtig,
um ein bisschen Farbe und Kreativität neben dem logischen Denken zu erlernen.
</p>
<p>
Deswegen erstelle ich hier regelmäßig kleine Deutsch-,Englisch- oder Französisch-Tests oder Geschichten.
Wenn du gerne mithelfen möchtest an dieser Internetseite, z.B. um mit mir zusammen eine Kurzgeschichte oder einen Grammatik-Test zu schreiben oder um
etwas zu programmieren, dann schreib mir eine Email an <a style="text-transform: none" href="mailto:imelflorianingerl@gmail.com">imelflorianingerl@gmail.com</a>.
Evtl. kannst du sogar bezahlt werden.
</p>
</div>
    
</template>

<script>

export default {
  name: "VueMithelfen",
  components: {
  
  },
  data() {
    return {
       
    };
  },

  mounted(){
    console.log("Mounted function of vue-mithelfen is executed!");
    console.log(this.$route);
  },
  setup(){
   console.log("The setup function is executed!");

   
  },
  
  methods: {
     
  },
  computed: {
     
  }
}
</script>

<style scoped>


</style>