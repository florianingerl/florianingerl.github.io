<template>
<h1>Cours d'alimentation vivante 2</h1>
<h3>Qu'est-ce que l'Hygiénisme ?</h3>
L'hygiénisme est l'art de vivre en bonne santé par le respect des lois de
la nature et par la bonne connaissance des aliments spécifiques à
l'espèce humaine.
Cette conception est révolutionnaire parce qu'elle est aux antipodes des modes de
pensée habituels.
Contrairement à la médecine officielle qui traite les symptômes, l’Hygiénisme part
du principe de supprimer la cause pour faire disparaitre l'effet.
<VueExercise><VueQuestion :question="question1" :hasNextButton="false" /></VueExercise>
L’hygiénisme est donc un enseignement tiré directement de l’observation des Lois
de la vie. En un mot, c'est un véritable art de vivre.
L'Hygiénisme enseigne les principes de base pour tous, mais chacun doit doser
chaque facteur de santé selon son propre pouvoir d'assimilation et devenir ainsi
l'artisan de sa santé.
<VueExercise instruction="Remplis les trous avec tout,toute,tous,toutes ou chaque!">
<VueGaps gaptext="{Tout} ce que je viens de lire me semble logique. {Chaque} phrase fait du sens.
Dans {toute} ma vie, je n'ai jamais entendu parler de {tout} cela. {Toute} ma santé depend aussi
de mon alimentation.{}" /> </VueExercise>

L’école hygiéniste est simple. Elle redonne au corps son plein potentiel de
guérison. On parlera d’homéostasie*. On ne contre pas, on accompagne. On
permet aux mécanismes de régénération de faire leur travail en agissant sur
l’équilibre du terrain.
<VueExercise instruction="Remplis les trous avec le gérondif des verbes répondre et lire!">
<VueGaps gaptext="En {lisant} ce livre, je peux passer mon temps d'une manière utile. En {répondant} aux questions,
j'arrive à ne pas tomber en sommeil.{}" /> </VueExercise>
C’est pour cela qu’un minimum de connaissances en physiologie vous sera
nécessaire.
*La loi de l’homéostasie dit que : « Tout système laissé à lui-même revient
spontanément à l’état d’équilibre en passant par des processus
régulateurs »
   
</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise
  },

  mounted(){
     console.log("The mounted function of VueConditionnel1 was called!");
     
  },
  setup(){
   console.log("The setup function of VueConditionnel1  is executed!");
  },
  data() {
    return {
      question1 :  {
		question: "Qu'est-ce que l'hygiénisme?",
		imageUrl: "assets/img/rawfood/brokolisalat.JPG",
		type: "multiple choice",
		options: [{option:"L'art de suivre les conseils du médecin", correct: false },
     {option:"L'art de suivre les lois de la nature", correct: true }, 
     ]
	    }
    };
  },
}
</script>

<style scoped>



</style>