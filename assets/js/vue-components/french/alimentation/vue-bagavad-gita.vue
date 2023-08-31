<template>

<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link" :class="{ active: livreVisible }" @click="livreVisible=true;">Livre</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{ active: !livreVisible }" @click="livreVisible=false;">Vocabulaire</a>
  </li>
  
</ul>

<div v-if="$route.params.page==1">
<div v-if="livreVisible">
<h2>INTRODUCTION À LA BHAGAVAD GÎTÂ</h2>
<h3>Message à l'Humanité :</h3>
Aujourd'hui, après deux guerres mondiales, l'histoire semble répéter ses leçons à l'humanité d'une 
voix plus forte que jamais parce que la turbulence et la souffrance sont généralement inhérentes 
à l'histoire politique, affectent directement ou indirectement des sections toujours plus grandes 
de l'humanité. Et, pourtant, il ne semble pas que ces leçons aient été mieux apprises qu'avant.
 Pour un esprit réfléchi, plus poignante et plus navrante que les nombreux exemples individuels de 
 souffrance que fournit l'histoire récente un peu partout dans le monde, 
 est l'étrange et tragique monotonie de conduite qui pousse l'humanité à un nouvel accès de folie 
 qu'on appelle la guerre. Le même vieux mécanisme est de nouveau en marche, 
 l'interaction de la convoitise et de la crainte. 
 A ce monde malade et vraiment insensé qu'est la nôtre, vient un enseignement ancien de vérité et de 
 sagesse éternelle, de conduite infaillible, qu'est la Doctrine de la Bhagavad Gîtâ, résumé des livres
Sacrés de l'Hindouisme.

<VueExercise lg="fr" instruction="Remplis les trous avec le bon pronom possessif!">

<VueGaps gaptext="Arjuna avait un ésprit moins fou que le {mien}. Je n'ai pas de Bhagavad-Gita. Est-ce que tu peux me prêter le {tien}? Non! J'en ai besoin moi-même.
Mais regarde! Hermann est là. Prends le {sien}."></VueGaps>
</VueExercise>

Elle vient avec la question ardente, pleine de bienveillance, mais calme et discrète, de savoir si, cette fois,
 l'humanité sera prête à saisir la main secourable que le Seigneur Krishna et Arjuna ont tendu à l'humanité souffrante à travers l'Enseignement éternel, en particulier de la Gîtâ. 
 
<VueExercise lg="fr" instruction="Remplis les trous avec la proposition ou le pronom qui convient (à ou de, y ou en)!">
<VueGaps gaptext="Pourquoi est-ce que je devrais avoir besoin {de} la main du Seigneur Krishna? Je peux rester débout moi-même. 
Non. Je n'{en} ai pas besoin. Ou est-ce qu'il peut m'aider {à} arrèter les guerres dans mon propre esprit? Comment s'{y} prendre pour les arrèter?">

</VueGaps>
</VueExercise>

 Ou bien le monde attendra-t-il encore jusqu'à ce qu'il ait réussi à conjurer une épreuve encore plus macabre que la dernière guerre mondiale et d'aujourd'hui dans bien de pays dans le monde qui peuvent se terminer par le déclin final de l'humanité, 
 tant matériel que spirituel ? Le message du Seigneur Krishna vient au monde comme un moyen d'aide efficace aux afflictions et problèmes actuels et comme un remède radical contre le mal.
  Le dialogue du Seigneur Krishna et son charretier Arjuna, vieux de 3000 ans, 
  cette vraie sagesse est toujours jeune et toujours à la portée de l'esprit ouvert qui atteint péniblement ses hauteurs en Occident, 
  mais qui a une époque de déclin religieux a quand-même chance d'être écouté.

<VueExercise lg="fr" instruction="Formez des questions?">
<h6>Example:</h6>
Est-ce que le monde attendra jusqu'au plus jeune jour? -> <br>
Le monde attendra-t-il jusqu'au plus jeune jour?
<ol>
<li>Comment est-ce que le message du Seigneur Krishna vient au monde?</li>
<li>Combien des années est-ce que le dialogue entre Krishna et Arjuna a?</li>
<li>Est-ce que la Bhagavad-Gita est un livre avec beaucoup de pages?</li>
</ol>

<VueHideShow>
<ol>
<li>Comment le message du Seigneur Krishna vient-t-il au monde?</li>
<li>Combien des années le dialogue entre Krishna et Arjuna a-t-il?</li>
<li>La Bhagavad-Gita est-elle un livre avec beaucoup de pages?</li>
</ol>
</VueHideShow>

</VueExercise>

Principaux commentaires :
La Bhagavad Gîtâ, « Le Chant du Seigneur », 
occupe une place unique parmi les Saintes Écritures de l'Inde, 
et en est le résumé. La Gîtâ affirme l'unité de la vie et sert parfaitement
 de guide pour l'homme d'aujourd'hui de part les quatre coins du monde, 
 de toute race et culture, grâce à son approche pragmatique de la vie qui en fait un véritable guide. 
 
 La Gîtâ ne nous cache rien, car elle met l'homme devant les faits de la vie en tant que champs 
 de bataille, car rien ne s'accomplit sans efforts. Dans la lutte de la vie, le petit livre 
 de 700 versets invite l'homme à découvrir l'action juste au coeur même de l'existence. 
 La vie elle-même est une alternance de trois étapes, la création, la préservation, et la destruction,
  qui sont indissociable de l'activité incessante de l'éternel recommencement 
 de la Nature comme le déroulement des quatre saisons. La Gîtâ est une porte ouverte vers la vie intérieure et à la fois extérieure, nous aidant à nous maintenir dans cette vie, croître et nous renforcer, prendre conscience, en nous apprenant à fonctionner suivant l'attitude juste, inspirée par l'amour grâce à la perception de l'Existence éternelle, le Suprême Absolu.

</div>
</div>

<button @click="nextPageClicked">Page suivante</button>

</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueWholeSentences from "./../../vue-whole-sentence.vue"; 

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise,
     VueHideShow,
     VueWholeSentences
  },

  mounted(){
     console.log("The mounted function of VueConditionnel1 was called!");
     
  },
  setup(){
   console.log("The setup function of VueConditionnel1  is executed!");
  },
  data(){
   return {
      numPages : 5,
      livreVisible: true
   };
  },
  methods: {
    nextPageClicked(){
      
      let page = parseInt(this.$route.params.page);
      if(page == this.numPages){
         alert("Il n'y a pas de page suivante");
         return;
      }
      this.$router.push({ ...this.$route, params: { page: page +1 } });
      
    }
  }
}
</script>

<style scoped>

td {
   width: 30%;
}

</style>