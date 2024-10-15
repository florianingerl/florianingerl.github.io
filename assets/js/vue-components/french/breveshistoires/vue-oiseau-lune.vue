<template>
<div>

<h1>Linda et son oiseau</h1>
<h4><i>par Florian Ingerl et Edwin Jeanson</i></h4>



<img src="assets/img/francais/oiseaudecompanie.png" style="float:right; height: 200px;"></img>

Linda avait toujours eu envie de posséder un amimal de companie mais ses parents l'avaient toujours défendu.
Comme sa couleur préférée était l'orange, elle voulait un animal de compagnie ayant une couleur orange.

<VueExercise lg="fr" :topics="['Gérondif']" instruction="Remplis les trous avec le verbe donné au gérondif">
<VueMCGaps lg="fr" :gaptext="['{Étant}(être) donné que Linda était une humain, elle ne pouvait pas voler comme un oiseau.',
'{Ayant}(avoir) toujours peur de l\'obscurité, Linda aime les nuits au pleine lune.']">

</VueMCGaps>
</VueExercise>

C'était le plus beau oiseau qui ait jamais volé au-dessus de la Terre qu'elle recut enfin pour son dixième anniversaire.
 Et bien sûr, ses ailles étaitent oranges comme les fruits du même nom bien que cet oiseau ne mangeait pas de fruits 
 mais seulement des graines.
<VueExercise lg="fr" :topics="['Subjonctif']" instrction="Remplis les trous avec le verbe donné au subjonctif!">
<VueMCGaps lg="fr" :gaptext="['Bien que Linda n\'avait que dix ans, elle {apprenne} (apprendre) très vite comment il faut s\'occuper d\'un oiseau.',
'Linda donne des graines à son oiseau pour que celui-ci n\' {aie} (avoir) plus faim.']">

</VueMCGaps>
</VueExercise>

Elle s'attendait à ne pas devoir s'occuper beaucoup de l´oiseau. Mais l´oiseau avait besoin de beaucoup d'attention. 
C'est une autre paire de manche à ce qu'elle s'attendait.
"L'oiseau et moi" pensa Linda. "On pourrait voler ensemble jusqu'à Mars et y rencontrer des extraterrestes. 
Je ne volerai pas moi-même bien sûr. Mais mon animal me portera."

<VueExercise lg="fr" :topics="['Le Futur simple']" instruction="Remplis les trous avec le verbe donné au futur simple!">
<VueMCGaps lg="fr" :gaptext="['']">

</VueMCGaps>
</VueExercise>

"Tu veux voler jusqu'à la planète Mars!" s'exclama  l´oiseau.
"Je suis d'accord de t' y amener à condition que mon ami Wilfried, le singe, fasse partie du voyage."
"Ok allons-y" Dans l´obscurité de la nuit. Il commencèrent leur voyage à travers l´espace.
"Je suis tellement excité de visiter Mars parce que je n'ai jamais été là-bas" révéla Wilfrid et
pas besoin de dire, que les deux autres étaient aussi excités que lui.
"Si nous rencontrons des extraterrestres et s´ils veulent nous manger. Nous devons d'abord réfléchir à une ruse avant de mettre un pied sur mars" disa le singe Wilfried d'un ton inquiet.
"J'ai une idée!" commenca Linda. "Pour que les extraterrestes n'aient plus envie de nous manger, on va tous se donner la couleur bleu et on va se donner une mauvaise odeur en mangeant de l'ail avant de mettre un pied sur Mars. Comme mesures de précaution.
"Quand est-ce qu'on arrive? J'ai faim" s'exprima le singe. "Nous sommes bientôt arrivés" réponda Linda. "Avant de manger, il faudra faire connaissance avec les extraterrestres pour ne pas avoir d'ennuis" continua Linda.
Lorsque Linda vit les extraterrestes et leur apparence physique, elle était très inquiete. Leurs visages étaient très pales et elle soupconna immédiatement un manque de Jod dans leur nourriture.
"Vous pauvres créatures!" elle leur adressa la parole. "Est-ce que vous voulez manger ces alges que j'ai apporté de la Terre. Cela vous débarassera de votre manque de Jod qui est évident."
Tu peux m'envoyer un lien pour le Zoom
"Bonjour et bienvue sur Mars" répondu l'extraterrestre. "Merci beaucoup pour ce cadeau j´en suis très reconnaissant" ajouta-t-il.
Cela dura un peu avant que les extraterrestes s'apercevaient vraiment qu'ils étaitent guéri
et qu'ils pouvaient maintenant faire leurs travaux de programmation (ils étaient tous des dévelopeurs de logiciels ) plus efficacement  qu'avant.


Fin

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






