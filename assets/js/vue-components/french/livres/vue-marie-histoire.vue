<template>
<div v-if="$route.params.page == 1">
<h1>Un livre sur Fred</h1>
<h4><i>par Florian Ingerl et Marie Faure</i></h4>

<h1>Chapitre 1</h1>
<h2>Fred et ses relations</h2>

Fred n'était pas paresseux bien que son père l'était. Fred travaillait sans cesse tandis que
son père demeurait assis dans son fauteuil toute la journée en jouant avec son portable.
Bien évidemment, son père était bien plus vieux que lui, mais cela n'aurait pas dû l'empêcher d'être plus actif comme l'était sa mère, bien entendu plus vieille que Fred.
"Souviens-toi de ce que tu m'as promis!" dit la mère de Fred à son fils. Toute la famille était rassemblée autour de la table de la cuisine. À l'ordre de sa mère, en effet, Fred avait du mal à se rappeler ce à quoi elle faisait référence.

<VueExercise><VueQuestion lg="fr" :question="{
		question: 'Quelle est la difference entre rassembler et assembler? Cochez les phrases qui sont correctes!',
		type: 'multiple choice',
		options: [{option:'Les membres de la famille se sont rassemblés aujourd\'hui pour fêter Noël.', correct: true },
     {option:'Les membres de la famille se sont rassemblées aujourd\'hui pour fêter Noël.', correct: false },
     {option:'Le jeune garçon assemble les pièces du puzzle avec justesse.', correct: true } ,
     {option:'Le jeune garçon assemble les pièces de la puzzle avec justesse.', correct: false }
     ]
	    }" :hasNextButton="false" /></VueExercise>

Brusquement, Fred eut une idée. "Est-ce que tu fais référence à moi, qui dois t'emmener à l'aéroport demain?"
La mère , Josephine, disait souvent qu'elle ne pouvait plus respirer en compagnie perpétuelle du père et avait désespérément besoin de quelques jours de congés à l'autre bout du monde.


<VueExercise><VueQuestion lg="fr" :question=" {
		question: 'Dans quelles phrases pourrait-on aussi utiliser brusquement sans en changer le sens?',
		type: 'multiple choice',
		options: [{option:'Il leva soudain le bras au-dessus de sa tête.', correct: true },
     {option:'Malheureusement il avait oublié son parapluie.', correct: false },
     {option:'Tout à coup, minuit sonna à l\'horloge.', correct: true } ,
     {option:'Evidemment personne ne la croyait capable d\'une telle prouesse.', correct: false }
     ]
	    }" :hasNextButton="false" /></VueExercise>

Fred admirait le courage de sa mère! Il aurait eu peur seulement à la pensée de se rendre à l'autre bout du monde. Mais, c'était tout planifié. Demain, Joséphine embarquera dans l'avion pour l'Australie à l'aéroport de Nice.        

<VueExercise>
Quels mots désignent des qualités et lesquels désignent des défauts? <br>
courage, orgueil, générosité, vanité, sérénité, patience, médiocrité, vantardise, paresse, bravoure, nervosité, rigeur, vigeur, préservance, humilité
<VueHideShow>
<p>Qualités: courage, générosité, vanité, sérénité, patience</p>
<p>Défauts: orgueil, vanité, médiocrité, vantardise, paresse</p>
</VueHideShow>
</VueExercise>


"Mon billet pour l'avion n'a couté que 100 euros!" dit Joséphine. "Mais je ne veux quand même pas les gaspiller en ratant l'avion. Donc, j'ai absolument besoin de toi pour m'emmener à l'aéroport demain!" Incrédule, Fred répliqua: "100 euros pour une destination si lointaine! Tu est sûre de ne pas avoir rêvé ?"


<VueExercise><VueQuestion lg="fr" :question=" {
		question: 'Quelle phrase est correcte?',
		type: 'multiple choice',
		options: [{option:'Il pensait n\'avoir pas le temps de manger avant de partir.', correct: false },
     {option:'Il pensait ne pas avoir le temps de manger avant de partir.', correct: false }
     ]
	    }" :hasNextButton="false" /></VueExercise>


</div>

<button @click="nextPageClicked">Next page</button>
</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueMcGaps from "./../../vue-mc-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";
import VueHideShow from "./../../vue-hideshow.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise,
     VueWholeSentence,
     VueHideShow
  },

  mounted(){
     console.log("The mounted function of VueRowFood was called!");
     
  },
  setup(){
   console.log("The setup function of VueRawFood  is executed!");
  },
  data(){
        return {
                numPages: 3
        };
  },
  methods: {
       nextPageClicked(){
      
      let page = parseInt(this.$route.params.page);
      if(page == this.numPages){
         alert("There is no next page!");
         return;
      }
      this.$router.push({ ...this.$route, params: { page: page +1 } });
      //this.$router.push("/french/alimentation/" + (page+1) );
    }
  }
}
</script>

<style scoped>



</style>