<template>

<div>
<!-- https://www.francaisfacile.com/forum/lire.php?num=7&msg=111847&titre=Avoir+le+temps+ou+du+temps+%3F -->
<h1 class="text-primary">En, d'en, dans ou dent</h1>

<h2 class="text-danger">La dent</h2>
Une dent est un truc blanc qui se trouve dans la bouche. Si quelqu'un mange beaucoup de sucre,
les dents deviennent jaunes.
<p>Exemple: <br>
Ma grand-mère n'a pas de fausses dents parce qu'elle pratique l'alimentation crue depuis son enfance.
</p>
<h2 class="text-danger">D'en</h2>
C'est le remplacement pour de+en. 
<p>Exemple: <br>
Inutile de se plaindre davantage! Je viens d'en faire pendant des heures et cela n'a servi à rien.
</p>

<h2 class="text-danger">En</h2>
"En" specifie la quantité de temps que prend une action.
<p>Exemple: <br>
J'écris un petit tutoriel de francais en 30 minutes.
</p>

<h2 class="text-danger">Dans</h2>
"Dans" specifie la quantité de temps avant le début d'un événement.
<p>Exemple: <br>
Le train part dans 15 minutes.
</p>

C'est à vous maintenant de remplir les trous avec "en", "d'en", "dans" ou "dent"

<VueExercise instruction="Remplis les trous avec en,d'en,dans ou dent!" >
<VueGaps lg="fr" :gaptext="gaptext" />

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";

export default {
  name: "VueDuDeLeTemps",
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
       gaptext: ["Je ne mange jamais de sucre. Donc, mes {dents} sont très fortes.",
"Inutile d'acheter d'avantage de lentilles! Je viens {d'en} acheter 100 kilos.",
"Est-ce que tu veux ton propre ordinateur? Oui, j'ai envie {d'en} avoir un.",
"Le cours de soutien commence {dans} 10 minutes.",
"En vélo, je vais de ma maison jusqu'à l'université {en} 60 minutes." ]
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