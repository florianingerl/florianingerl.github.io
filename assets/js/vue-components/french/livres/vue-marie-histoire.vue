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
     {option:'Il pensait ne pas avoir le temps de manger avant de partir.', correct: true }
     ]
	    }" :hasNextButton="false" /></VueExercise>


</div>

"Presque personne ne veut voyager de France en Australie à cette période de l'année.
C'est pourquoi ils vendent les billets pas cher."
C'était pour Joséphine une opportunité inattendue et elle n'hésita pas une seconde à la saisir.
Le lendemain, Fred ayant consenti à emmener sa mère à l'aéroport, il remarqua qu'il n'y avait pas grand-chose à mettre à l'arrière de la voiture, parce sa mère n'emportait presque aucun bagage. Elle n'emportait que quelques livres et vêtements, et ses bijoux.
Elle avait laissé chez elle presque toutes ses affaires, ce qui étonna Fred qui avait l'habitude de voir sa mère habituellement beaucoup trop chargée lorsqu'elle partait en vacances.

<VueExercise lg="fr" instruction="Remplis les trous avec emporter, apporter ou rapporter à la bonne conjugaison ! ">
<VueMCGaps lg="fr" :gaptext="['Fred était intrigué par le fait que sa mère n\'{emportait} que si peu.',
'Quand tu vas à un entraînement de football, tu dois {apporter} tes chaussures.',
'Merci de m\'avoir prêté ton livre. Je te le {rapporte} maintenant.',
'Le chien a été {emporté} par une grosse vague sur le rivage.',
'As-tu {apporté} ce que je t\'ai demandé?',
'Merci de {rapporter} vos bouteilles vides pour la consigne.']">

</VueMCGaps>
</VueExercise>

"Mais pourquoi n'a-t-elle presque pas de bagage pour un voyage si lointain?" songea Fred.
"Et pourquoi voyager à cette période de l'année en Australie?" Fred soupçonna sa mère d'avoir des plans malveillants. A partir de ce moment-là, il eut la puce à l'oreille. Et quand sa mère regarda ailleurs, il fouilla un peu dans ses affaires.
Alors qu'elle saluait justement une connaissance qui passait par là par hasard, Fred découvrit dans ses affaires un paquet bien mystérieux adressé à un certain Monsieur Legrand.
Le paquet était léger. Si Fred avait eu le temps d'ouvrir le paquet, inspecter son contenu et puis le refermer à nouveau sans que sa mère s'en apercoive, il l'aurait certainement fait. Mais il n'osa pas le faire.

<VueExercise lg="fr" instruction="Comment est-ce qu'on écrit le son o en francais? Remplis les trous avec o, ô, eau, au!">
<VueMCGaps lg="fr" :gaptext="['C\'était bien tr{o}p risqué, il ne pouvait se le permettre.' +
'Il retira son chap{eau} qui lui tenait bien tr{o}p ch{au}d.' +
'\'\'Est-ce que ce mystérieux paquet v{au}t-il la peine de prendre le risque de se faire prendre pour un fouineur par ma mère ? \'\' se dit-il.' +
'Au contraire, c\'était un garç{o}n h{ô}nnête qui avait obtenu son baccal{au}réat avec mention. Il pouvait quand même ouvrir le paquet et prétendre après qu\'un fant{ô}me l\'avait ouvert.']">

</VueMCGaps>

</VueExercise>

Mais il était aussi impossible de simplement questionner sa mère à propos du paquet. Si elle refusait, il ne parviendrait jamais à découvrir son secret. Par conséquent, il lui fallait une ruse pour distraire sa mère pour avoir assez de temps pour ouvrir le paquet discrètement.
Il mis alors en oeuvre un plan qu'il jugea de prime abord excellent.
S' il avait eu plus de temps avant l'embarquement du vol, il aurait eu plus de temps
pour réfléchir. Mais étant donné qu'il n' en avait pas, il fallait agir tout de suite.
Il prit son café à emporter dont il n'avait bu que la moitié, et gaspilla son contenu sur la chemise de sa mère. De plus, il la bascula de sorte qu'elle tomba par terre.
Evidemment, cet incident n'était pas arrivé par hasard et c'est ce qui interloqua sa mère: " Mais que fais-tu là? Enfin, me voici toute sale et tombée à la renverse! " 
"Désolé, bredouilla-t-il, tu devrais aller te changer aux toilettes."
"Tandis que tu seras aux toilettes, je prendrai bien soin de tes affaires et en particulier de tes paquets!"
La mère fit comme proposé et Fred saisit immédiatement l'occasion d'ouvrir le paquet et découvrit son contenu.
C'était quelque chose de bleu en forme de cube qui avait la taille d'un ballon de football.
En le balançant entre ses bras, il sentait que le paquet était presque creux.
Il décida de l'ouvrir tant sa curiosité était grande et découvrit une sorte de boîte qui semblait vide mais qui contenait en réalité une sorte de poudre dorée qui lui rappela immédiatement celle qu'il avait utilisée un jour lorsqu'il était gamin.
Quand on avalait cette poudre dorée, on ne se souvenait plus de tous ses mauvais souvenirs. Par conséquent, Fred ne savait plus comment était sa vie avant d'avoir pris la poudre quand il était un gamin de 14 ans. "Pourquoi sa mère avait-elle besoin d'en prendre ?" se demanda-t-il.

Il se sentit désespéré quand sa mère surgit subitement près de lui. Elle eut pitié de lui en le voyant son paquet à la main, réclamant des explications concernant cette mystérieuse poudre dorée. Allait-elle lui offrir son aide après ce qu'il avait fait?
Fred était complètement déconcerté et ne trouva aucun mot pour défendre son comportement. Il balbutia simplement: "Dommage que j'aie ouvert ton paquet.... C'était
par hasard...."
Sa mère lui répondit aussitôt: " Je ne te permets pas de fouiller dans mes affaires quand je suis en train de faire quelque chose sans surveiller mes affaires. Je ne les ai justement pas abandonnées là, c'était à toi de les surveiller."
"Ok!", dit Fred. "Arrête de me faire des reproches! Sinon, ton avion s'envolera sans toi!"
Sa mère se demandait ce qui trottait dans la tête de son fils, pourquoi cette drôle d'attitude depuis qu'ils étaient à l'aéroport. "Je veux partir avec toi en Australie, lui avoua-t-il finalement. "
"Et pourquoi, s'enquit-elle, surprise"
"Je m'inquiète pour toi, je ne sais pas ce qui t'attend là-bas."
Heureusement, on pouvait encore acheter un billet pour le vol, bien que ce ne fusse plus 100 euros, mais déjà 120 euros. Alors, le fils et sa mère embarquèrent dans l'avion.
Malheureusement, leurs places n'étaient pas tout à côté l'une de l'autre mais il y avait seulement un homme assis entre eux. Celui-ci avait l'air d'être un buveur. Ca puait!

<button @click="nextPageClicked">Next page</button>
</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";
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
     VueHideShow,
     VueMCGaps
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