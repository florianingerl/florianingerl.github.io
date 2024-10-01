<template>
<div>

<h1>Lie lion Simba</h1>
<h4><i>par Max et Florian</i></h4>


<VueImage imageUrl="assets/img/francais/lion.png">
<p>
Le lion Simba est très fier de ses muscles forts. Son corps est orange. Ses cheveux et son poil sont plutôt rouges.
</p>
</VueImage>

<VueExercise lg="fr" instruction="Remplis les trous avec mon, ma, sa ou son!">
<VueMCGaps lg="fr" :gaptext="['J\'aime {ma} soeur.',
'Il est grand et {son} père est grand aussi.', 'Elle porte une jube et {sa} mère porte une robe.', '{Mon} chien veut jouer avec moi.']">

</VueMCGaps>
</VueExercise>

Sa queue est très longue et ses jambes aussi. Il a beaucoup de dents pointus. Son nez est noir et il a des yeux rouges comme l'amour.

<VueExercise lg="fr" instruction="Trouve le contraire!">
<VueMCGaps lg="fr" :gaptext="['long -> {court}', 'noir -> {blanc}', 'petit -> {grand}', 'joli -> {moche}', 'sale -> {propre}', 'matin -> {soir}', 'midi -> {minuit}', 'jour -> {nuit}', 'sur -> {sous}', 'devant -> {derrière}', 'froid -> {chaud}', 'fort -> {faible}']">

</VueMCGaps>
</VueExercise>

Il habite en Afrique, plus précisement à Alexandria qui est la capitale d'Égypte. Il y habite avec sa femme, une lionne qui s'appelle
Alexandra.
D'habitude, les deux mangent des lapins et des souris qu'ils chassent aussi ensemble. Il joue volontiers avec un ballon. En outre,
il aime sauter à travers des anneaux.

<VueExercise lg="fr" instruction="Trouve le mot feminin!">
<VueMCGaps lg="fr" :gaptext="['lion -> {lionne}', 'vendeur -> {vendeuse}', 'docteur -> {doctrice}', 'danseur -> {danseuse}', 'musicien -> {musicienne}', 'professeur -> {professeur}']">

</VueMCGaps>

</VueExercise>

Il aime la natation et souvent, il et sa femme Alexandra vont au lac au centre d'Alexandria. Il a peur du zoo parce qu'il
veut plutôt vivre dans la nature. Il a non seulement peur du zoo, mais aussi des employés qui y travaillent et aussi des gens
qui aiment chasser des animaux sauvages.

<VueExercise lg="fr" instruction="Remplis les trous avec à la, au, de la, du, de la, du !">
<VueMCGaps lg="fr" :gaptext="['Je vais souvent {au} cinéma de mon village.', 'Simba se réjouit {des} yeux de sa femme.',
'Simba se réjouit {du} visage de Alexandra.', 'Simba est fier {du} lapin qu\'il a récemment chassé.', 'Sa femme est fière {de la} vache qu\'elle a récemment chassée.', 'Simba a besoin {du} repas que sa femme fait pour lui.']">

</VueMCGaps>

</VueExercise>

<p>
Il sait qu'il va avoir un aventure. 
Il y a des lions étrangers dans son territoire. Il doit les combattre.
Il connaît tous les arbres dans son territoire.
Les arbres dans son territoire ne sont pas aussi hauts qu'une montagne.
</p>

<p>
 Il a un plan. Il va grimper sur l'un des arbres et sauter de là sur ses ennemies.
 Il saute sur les ennemies qui sont le plus proches. De cette façon, il les tue tout.
 Mais il ne les mange pas après parce qu'ils ne sont pas aussi bon que les lapins ou les souris.
 </p>

 <p>
Il est dans le lac qu'il boit parce qu'il a soif. Bien sûr, il ne boit pas tout le lac. Après avoir bu,
il se met à dormir sous un arbre.
 </p>

 <p>
Puis, il chasse un lapin dans son territoire. Le résultat en est qu'il n'a plus faim. Où sont ses autres proies?
 </p>

 <p>
Quelqu'un, qui n'est pas son ami, a probablement volé tous ses autres proies. Tant mieux, pas bon de ne manger que de la viande. Au lieu de cela,
il va manger de la salade.
 </p>

 <p>
Il rencontre un homme qui porte un pull bleu. Il fait la connaissance de cet homme dans une grotte où il cherche normalement des souris.
<< Mais pourquoi il n'y a plus de souris dans la grotte ? >> demande-t-il à l'homme qui porte le pull bleu. << Parce que ce serpent-ci les a déjà tout
mangé. >> reponds l'homme.  
 </p>

 <p>
Le lion parle à l'homme et l'homme met sa main sur le lion. << Pas de raison pour mourir de faim! >> dit l'homme au lion. << Je connais un
couloir secret où il y a beaucoup de souris à manger ! >> Et l'homme montre le couloir au lion. Mais le lion a peur de l'homme.
 </p>


</div>


</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueImage from "./../../vue-image.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise,
     VueWholeSentence,
     VueHideShow,
     VueImage,
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
               
        };
  },
  methods: {
       
  }
}
</script>

<style scoped>



</style>