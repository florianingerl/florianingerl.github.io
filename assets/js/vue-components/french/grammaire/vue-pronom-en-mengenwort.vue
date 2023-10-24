<template>

<div>
   

<VueExercise instruction="Réponds aux questions!">
<p>Exemple:</p>
<p>Tu as acheté des graines de céréales?</p>
<p>Oui, j'en ai acheté trois sacs.</p>

<ol>
<li>
Tu as ajouté de l'huile d'olive à ta salade?
</li>
<li>
Est-ce que tu ajoutes du vinaigre à ta salade?
</li>
<li>
Est-ce que tu prends encore des pousses de haricot mungo? 
</li>
<li>
Est-ce que tu bois assez d'eau pure tous les jours?
</li>
<li>
Quel fruit contient beaucoup de magnesium?
</li>
</ol>

<VueHideShow>
<ol>
<li>Oui, j'en ai ajouté trois cuillères.</li>
<li>Non, je n'en ajoute pas.</li>
<li>Oui, j'en prends autant que je peux manger.</li>
<li>Oui, j'en bois trois litres par jour.</li>
<li>Les germes du blé en contient beaucoup.</li>
</ol>
</VueHideShow>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";

export default {
  name: "VuePronomEnAvecMengenwort",
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