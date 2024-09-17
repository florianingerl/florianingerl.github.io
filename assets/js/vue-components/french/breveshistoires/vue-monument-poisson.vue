<template>
<div>

<h1>Un monument pour Antoine, le pêcheur</h1>
<h4><i>par Florian Ingerl</i></h4>


<VueImage imageUrl="assets/img/francais/lion.png">
<p>
Un jour, moi et ma classe, le 5b, devaient inventer chacun une histoire dont la prof leur avaient donnée le titre: "Le monument dans ta ville!"
Difficle de tirer une histoire sur ce thème du néant. Mais Antoine amait bien écrire créativement et commença:
</p>
</VueImage>

<p>
Moi, je suis Antoine, 10 ans, et j'habite dans un petit village au centre duquel il y a un monument. Celui-ci est un pilier sur lequel un
poisson en marbre est posé. Pourquoi ce monument? C'est parce que l'ancien maître du village aimait la pêche et avait un jour
capturé un très grand poisson. Grâce à tous ses mérites pour le bonheur du village, ce monument lui avait été consacré. Et Antoine pensa maintenant que lui aussi méritait
un monument. Au moins s'il parviendrait à attraper un poisson encore plus grand que celui de l'ancien mâitre.
</p>

<VueExercise lg="fr" instruction="Choisis le bon sens dans laquelle le mot encore apparait dans la phrase!">
<VueMCGaps lg="fr" :gaptext="['Tu es encore en retard.{répétition}',
'Mentir et s\'en réjouir et encore pire que simplement mentir.{degré plus grand}',
'Elle n\'a pas encore fait ses devoirs.{Opposition à déjà}']" :same="true" >

</VueMCGaps>
</VueExercise>

Il emporta donc sa canne à pêche et se dirigea vers le très grand lac près du village qui étaient plein de poissons. Il lança  le fil
de son canne à pêche au but de laquelle il avait attaché un appât aussi loin qu'il le put.

<VueExercise lg="fr" instruction="Emporter, apporter ou rapporter? Remplis les trous avec le bon mot!">
<VueMCGaps lg="fr" :gaptext="['Si je fais un tour en vélo, j\'{emporte|rapporte|apporte} toujours au moins deux bouteilles de l\'eau.',
'Si tu es invité pour l\'anniversaire de quelqu\'un, il faut {apporter|rapporter|emporter} un cadeau.',
'Merci de m\'avoir prêté tes outils. Je vous les {rapporte|apporte|emporte} maintenant.']">

</VueMCGaps>
</VueExercise>

Mais pourquoi tremblait-il ? Pas de raison d'avoir peur puisqu'il n'y avait pas de requins dans le lac. Afin de se
calmer, il chassa la pensée des requins de son ésprit et commença à attendre patienement jusqu'à ce que un poisson tire au fil.
Un quart d'heure, une demi heure, une heure.... Puis deux heures s'écoulèrent sans que rien ne se produisit.

<VueExercise lg="fr" instruction="Trouve la bonne préposition!" :same="true" >
<VueMCGaps lg="fr" :gaptext="['On ne peut pas parler {à} un poisson.',
'Le vieil homme s\'appuie {contre} le mur pour ne pas tomber.',
'Elle a peur {de} la solitude.',
'Il avait du mal {à} trouver les bons mots pour consoler son fils.',
'Camille essaie vraiment {de} comprende son mari.']">

</VueMCGaps>
</VueExercise>

Juste au moment où Antoine voulait s'en aller et avait quitté sa position stable, un très grand force tira au fil.
La force était si grande qu'Antoine avait du mal à rester en équilibre. Il essaya de tout son pouvoir de resister
bien que le sol ne lui aidât pas.

<VueExercise lg="fr" instruction="Réponds à la question!">
<VueQuestion lg="fr" :question="{
		questionFr : 'Quel temps/mode est aidât?',
		type: 'multiple choice',
		options: [{ option : 'Subjonctif', correct: false }, { option : 'Subjonctif passé', correct: false }, { option: 'Subjonctif imparfait', correct: true}, { option: 'Imparfait', correct: false }],
		correct: 3
	}" :hasNextButton="false">

</VueQuestion> 
</VueExercise> 


Il approcha dangereusement le bord du lac mais quand-même, il ne voulait pas lâcher sa canne à pêche parce qu'il
voulait son monument à coté de celui de l'ancien maître.

<VueExercise lg="fr" instruction="Remplis les trous par celui, celle, ceux ou celles!">
<VueMCGaps lg="fr" gaptext="Il ne trouve pas sa propre canne à pêche. Il prend donc {celle} de son père. 
Et il ne peut non plus trouver ces appâts. Il prend alors {ceux} de son père. Et où sont ses lunettes? {Celles} qu'il
utilise toujours pour la pêche. Il demande à son père s'il les a vues quelque part mais {celui}-ci n\'a pas envie de lui aider.">

</VueMCGaps>

</VueExercise>

Bien qu'il n'eût aucune chance contre le grand poisson, il ne lâcha pas la canne à pêche. C'est pourquoi il tomba
tête en avant dans le lac. Quelques spectateurs riaient quand il resortit du lac avec ses vêtement tous mouillés et dirent par plaisanterie
que ce garçon méritait bien un monument à coté de celui du mâitre ancien. Mais malheuresement, ce n'était qu'une
connerie.

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