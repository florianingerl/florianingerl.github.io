<template>

<div>


<VueExercise instruction="Forme des phrases du type conditionelle 3!">
<div>
<p>Exemple:</p>
<p>Tu m'as menti. Je t'ai évité par la suite.</p>
<p>Si tu ne m'avais pas menti, je ne t'aurais pas évité par la suite.</p>
</div>

<VueWholeSentence lg="fr" :sentences="sentences1" />



</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";

export default {
  name: "VueConditionelle3",
  components: {
    VueExercise,
    VueHideShow,
    VueGaps,
    VueWholeSentence
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       sentences1: [{task: "J.K.Rowling a écrit le livre de Harry Potter. Elle est devenue riche et célèbre.",
       solution: "Si J.K.Rowling n'avait pas écrit le livre de Harry Potter, elle ne serait pas devenue riche et célèbre." },
       {task: "Mon réveilleur n'a pas marché. Je me suis levé tard.", solution: "Si mon réveilleur avait marché, je ne me serais pas levé tard."},
       {task: "La porte était fermée à clé. Je ne pouvais pas entrer.", solution: "Si la porte n'aurait pas été fermée, j'aurais pu entrer." },
       {task: "Ma tante et mon oncle m'avaient souvent offert des livres. J'ai appris à aimer les livres.", solution: "Si ma tante et mon oncle ne m'avaient pas souvent offert de livres, je n'aurais pas appris à aimer les livres."},
       {task: "Je me suis prépare pour le cours. Je pouvais suivre le cours facilement.", solution: "Si je ne m'étais pas préparé pour le cours, je n'aurais pas pu suivre le cours facilement."},
       {task: "Il ne m'a pas remboursé. Je ne lui ai pas prêté d'argent une deuxième fois.", solution: "S'il m'avait remboursé, je lui aurais prête de l'argent une deuxième fois."},
       {task: "Elle a énervé le chien. Le chien l'a mordue.", solution:"Si elle n'avait pas énervé le chien, le chien ne l'aurait pas mordue."}]
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