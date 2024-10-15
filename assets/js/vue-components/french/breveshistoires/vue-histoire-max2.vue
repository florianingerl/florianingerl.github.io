<template>
<div>

<h1>Antoine et la chasse</h1>
<h4><i>par Max et Florian</i></h4>

<img src="assets/img/francais/antoineloupe.png" style="height:200px; float: right;"></img>
Antoine porte un chapeau jaune pour se proteger du soleil.

<VueExercise lg="fr" instruction="Décris l'image ci-contre!">
<VueMCGaps lg="fr" :same="true" :gaptext="['Antoine a des {cheveux|} rouges.',
'Pour mieux voir, il porte des {lunettes|}',
'Dans sa {main|} gauche, il tient une loupe.',
'Son {pull|} a la même couleur que son chapeau.']">

</VueMCGaps>
</VueExercise>

Il met un animal rouge sur la table.

L'animal rouge est un renard. Il l'a tué hier.

<VueExercise lg="fr" :topics="['Les animaux en français']" instruction="Remplis les trous avec le bon animal!">
<VueMCGaps lg="fr" :gaptext="['']">

</VueMCGap>
</VueExercise>

Il peut cuisinier. Il met une assiette sur la table.

Il prépare le renard avec de la souce épicé. Bien sûr, il enleve le poil du renard avant de le manger.

Il veut manger parce qu'il a faim.

Il coupe le renard en de petits morceaux et il ajoute des épices pour le bon goût.

Antoine pense à la forêt qu'il connaît bien et où il a trouvé le renard.

Après avoir mangé ce renard-ci, il a toujours faim. Alors, il sort de sa maison et va dans la forêt pour y chasser un autre renard.

Antoine a un pistolet. Il va dans la même forêt où il a trouvé le dernier renard.

Il cherche des renards dans toute la forêt, mais il n'en trouve pas un.

Il a besoin d'un poulet pour attirer les renards. 

Antoine connaît la ruse des renards.

La ruse des renards, c'est de se cacher dans le sous-sole. Il espère que les renards vont sortir du sous-sole quand ils
sentent l'odeur des poulets.

Antoine batte sur l'arbre avec une pioche.

Pourquoi? Parce que'il y a des poulets assis sur l'arbre.

Tout d'un coup, un arbre mort tombe sur le sol. 

Probablement, l'arbre est mort parce qu'il ne peut plus porter le poids de toutes les poulets.

Les poulets sont aussi tombé au sol avec l'arbre.

Antoine range la forêt. Il est gai parce que la forêt n'est plus sale.

Alors, il y a becaucoup de poulets mortes sur le sol qui attirent les renards.

Antoine attend jusqu'à ce que un renard arrive.

En seulement 5 minutes, un renard vient. Antoine prend son pistolet, tire et tue le renard.

Il rentre à la maison en 50 minutes. Il est fier du renard qu'il vient de tuer.

Il ne veut pas le manger lui-même. Il veut le vendre au marché pour beaucoup d'argent.

C'est samedi. Il fait la connaissance d'une nouvelle forêt. 

Antoine y va et y respire l'air fraîche. 

Antoine qui a soif met de l'eau dans un verre.

Il a aussi faim. Par conséquent, il mange quelques plantes sauvages de la forêt.

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




