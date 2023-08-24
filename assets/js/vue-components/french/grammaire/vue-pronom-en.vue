<template>

<div>
    <p>Der Pronomen <span class="fst-italic">en</span> kommt als Ersatz für verschiedene Ververbindungen von <span class="fst-italic">de</span> und Nomen zum Einsatz</p>
<div class="nice">
<table>
<tr><td>Tu profites de mon aide? <br> Oui, j'en profite.</td><td>Profitierst du von meiner Hilfe? <br> Ja, ich profitiere davon.</td></tr>
<tr><td>Tu parles de ton tourbillon d'eau? <br> Oui, j'en parle.</td><td>Sprichst du von deinem Wasserwirbler? <br> Ja, ich spreche davon.</tr>
</table>

</div>

<VueExercise instruction="Traduis les phrases suivantes!">
<ol>
<li>Kommt ihr von der Schule zurück? <br> Ja, wir kommen von dort.</li>
<li>Sprichst du über deine Hausaufgabe? <br> Nein, ich spreche nicht davon. </li> 
<li>Profitierst du von den Ferien. <br> Ja, ich profitiere von ihnen.</li>
</ol>

<VueHideShow>
<ol>
<li>Est-ce que vous rentrez de l'école? <br> Oui, nous en rentrons.</li>
<li>Est-ce que tu parles de ton devoir? <br> Non, je n'en parle pas.</li>
<li>Est-ce que tu profites des vacances? <br> Oui, j'en profite.</li>
</ol>
</VueHideShow>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";

export default {
  name: "VuePronomEn",
  components: {
    VueExercise,
    VueHideShow
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       
    };
  }
}
</script>

<style scoped>
.nice {
    padding: 10px;
    border: solid 1px blue;
    border-radius: 5px;
    background-color: #ffe6ff;
    width: 70%;
    margin: 10px;
}

td {
    padding: 5px;
}




</style>