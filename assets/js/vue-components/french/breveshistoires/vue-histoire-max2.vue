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
<VueMCGaps lg="fr" :same="true" :gaptext="['Un {renard|} est intelligent, mange de la viande et son poil est rouge.',
'Un {crocodile|} mange aussi de la viande, est verte est vit dans l\'eau.',
'Un {perroquet|} repète tous ce qu\'on lui dit!']">

</VueMCGap>
</VueExercise>

Il peut cuisinier. Il met une assiette sur la table.

Il prépare le renard avec de la souce épicé. Bien sûr, il enleve le poil du renard avant de le manger.

Il veut manger parce qu'il a faim.

Il coupe le renard en de petits morceaux et il ajoute des épices pour le bon goût.

<VueExercise lg="fr" :topics="['Les 5 saveurs en français','Acide, amer, sucré, salé, umami']" instruction="Remplis les trous par le saveur qui convient parmi Acide, amer, sucré, salé, umami!">
<VueMCGaps lg="fr" :same="true" :gaptext="['Ce qui a un goût {amer|} est souvent bon pour la santé.',
'Les fruits mûrs ont un goût {sucré|}.',
'Les fruits qui ne sont pas encore mûrs ont un goût {acide|}.',
'L\'eau de la mer a un goût {salé|}.']">

</VueMCGaps>
</VueExercise>

<img src="assets/img/francais/antoineloupe.png" style="height:200px; float: right;"></img>
Antoine pense à la forêt qu'il connaît bien et où il a trouvé le renard.

Après avoir mangé ce renard-ci, il a toujours faim. Alors, il sort de sa maison et va dans la forêt pour y chasser un autre renard.

Antoine a un pistolet. Il va dans la même forêt où il a trouvé le dernier renard.

Il cherche des renards dans toute la forêt, mais il n'en trouve pas un.

Il a besoin d'un poulet pour attirer les renards. 

<VueExercise lg="fr" :topics="['Même ou autre']" instruction="Remplis les trous avec même ou autre!">
<VueMCGaps lg="fr" :gaptext="['Les cheveaux d\'Antoine et le poil d\'un renard ont la {même} couleur.',
'Les {autres} animaux ne sont pas aussi intelligents que les renards.']">

</VueMCGaps>
</VueExercise>

Antoine connaît la ruse des renards.

La ruse des renards, c'est de se cacher dans le sous-sole. Il espère que les renards vont sortir du sous-sole quand ils
sentent l'odeur des poulets.

Antoine batte sur l'arbre avec une pioche.

Pourquoi? Parce que'il y a des poulets assis sur l'arbre.

Tout d'un coup, un arbre mort tombe sur le sol. 

Probablement, l'arbre est mort parce qu'il ne peut plus porter le poids de toutes les poulets.

Les poulets sont aussi tombé au sol avec l'arbre.

<VueExercise lg="fr" :topics="['Les conjunctions']" instruction="Remplis les trous avec la bonne conjunction!">
<VueMCGaps lg="fr" :same="true" :gaptext="['{Avant|} de le manger, Antoine a préparé le renard dans sa cuisine.',
'{Après|} avoir mangé le renard, Antoine a des maux de ventre. C\'était trop de viande qui n\'était pas facile à digérer.',
'{Parce que|} Antoine a un pistolet, tous les renards dans la forêt ont peur de lui.',
'{Quand|} Antoine fait la chasse, il est toujours très attentif pour ne pas rater un animal sauvage.']">

</VueMCGaps>
</VueExercise>

<img src="assets/img/francais/antoineloupe.png" style="height:200px; float: right;"></img>
Antoine range la forêt. Il est gai parce que la forêt n'est plus sale.

Alors, il y a becaucoup de poulets mortes sur le sol qui attirent les renards.

Antoine attend jusqu'à ce que un renard arrive.

En seulement 5 minutes, un renard vient. Antoine prend son pistolet, tire et tue le renard.

Il rentre à la maison en 50 minutes. Il est fier du renard qu'il vient de tuer.

<VueExercise lg="fr" :topics="['Préposition du temps']" instruction="Remplis les trous avec la bonne préposition du temps!">
<VueMCGaps lg="fr" :gaptext="['Antoine a préparé le renard {en} 20 minutes.',
'{Dans} 10 minutes, l\'émission préférée d\'Antoine à la télé commence.',
'Antoine a range sa cuisine {en} dix minutes. Pour ranger toute la forêt, il lui faudrait beaucoup plus de temps!',
'{Dans} 2 heures, Antoine va au lit.']">

</VueMCGaps>
</VueExercise>

Il ne veut pas le manger lui-même. Il veut le vendre au marché pour beaucoup d'argent.

C'est samedi. Il fait la connaissance d'une nouvelle forêt. 

Antoine y va et y respire l'air fraîche. 

<VueExercise lg="fr" :topics="['Les jours de la semaine']" instruction="Remplis les trous avec le bon jour de la semaine!">
<VueMCGaps lg="fr" :same="true" :gaptext="['Le jour avant samedi s\'appelle {vendredi|}.',
'Le jour où Dieu n\'a rien fait s\'appelle {dimanche|}.',
'Le premier jour de la semaine s\'appelle {lundi|}',
'Le jour après lundi s\'appelle {mardi|}.']">

</VueMCGaps>
</VueExercise>

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




