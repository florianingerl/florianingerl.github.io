<template>

<div>

<h1>La négation par ne...ni...ni</h1>

<p>Ne...ni...ni est la forme négative de "et" ou "ou". Les articles indéfinis et partitifs (un, une, des, du, de la, de l') disparaissent.  Les articles définis (le, la, l', les), les adjectifs possessifs, les adjectifs démonstratifs et les prépositions ne changent pas. </p> 

<p>Question: Est-ce que tu as des frères ou des soeurs?</p>

<p>Réponse : Non, je n'ai ni frères ni soeurs</p>

<p>Question: Parlez-vous le russe ou l'espagnol?</p>

<p>Réponse : Non, je ne parle ni le russe ni l'espagnol.</p>

<p>Cas 1: +ne+verbe+ni+infinitif+ni+infinitif :</p>

     Il ne peut ni arrèter de penser ni dormir. 

<p>Cas 2: +ne+verbe+ni+Nom(G.N.,pronom)+ni+Nom(G.N.,pronom)</p>

      Je n'ai besoin ni de conseil ni d'argent de toi. 

<p>Cas 3: +Ni+Nom(G.N.,pronom)+ne+Verbe.... </p>

     Ni ceux qui dorment trop ni ceux qui ne dorment pas assez ont atteint l'équilibre.


   
<VueExercise instruction="Répondons à la question ou mettons les phrases suivantes à la forme négative en utilisant la négation par NI...NI.">
<div>
<p>Exemple:</p>
<p>Mon père et ma mère peuvent me reconciler quand je suis triste.</p>
<p>Ni mon père ni ma mère ne peuvent me reconciler quand je suis triste.</p>
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
  name: "VueNiNi",
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
       sentences1: [{task: "Est-ce que préparer une salade coûte du temps ou de l'élécrité?",
       solution: "Préparer une salade ne coûte ni de temps ni d'éléctricité." },
       {task: "Est-ce que ta grand-mère peut coudre ou tricoter?", solution: "Ma grand-mère ne sait ni coudre ni tricoter."},
       {task: "Est-ce que les lentilles ou les haricots de mungo sont difficiles à digester?", solution: "Ni les lentils ne les haricots de mungo ne sont difficiles à digster." },
       {task: "Est-ce que le médecin ou ses pillules sont utiles quand on souffres d'un alimentation unnaturel?", solution: "Ni le médecin ni ses pillules ne sont utiles quand on souffre d'un alimentation unnaturel."},
       ]
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