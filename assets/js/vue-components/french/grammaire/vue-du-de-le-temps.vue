<template>

<div>
//https://www.francaisfacile.com/forum/lire.php?num=7&msg=111847&titre=Avoir+le+temps+ou+du+temps+%3F
<h1>Le temps, du temps ou de temps</h1>

<h2>Le temps</h2>
La location verbale "avoir le temps de faire qc" exprime: J'ai suffisamment de temps
pour faire ce que je veux accomplir.
<p>Exemple: <br>
J'ai maintenant le temps de jouer aux échecs avec toi.
</p>
<h2>Du temps</h2>
On utilise "du temps" si on a du temps libre ou du temps pour soi, pour lire un livre,
faire une promenande, rencontrer des amis, pour faire ce dont on a envie, même pour le perdre, etc.
C'est quantité de temps est souvent inprécise.
<p>Exemple: <br>
Est-ce que tu as du temps après la classe?
</p>

<h2>De temps</h2>
On utilise "de temps" après les mots "beaucoup, assez, suffisamment, peu,etc" qui ne précisent
une quantité pas exactement.

<p>Exemple: <br>
J'ai beaucoup de temps aujourd'hui pour écrire un tutoriel.
</p>

"du temps" dans la phrase positive devient "de temps" si on forme la phrase négative.
<p>Exemple: <br>
Papa, est-ce que tu as du temps aujourd'hui?
Non, je n'ai pas de temps.
</p>

Mais attention: "le temps" reste "le temps" dans la phrase negative.

<p>Exemple: <br>
Papa, tu as le temps de jouer aux cartes avec moi maintenant?
Non, je n'ai pas le temps (de/pour jouer aux cartes avec toi).
</p>
   
<VueExercise instruction="Remplis les trous avec le temps, du temps ou de temps">

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
       gaptext: ["Michael n'a jamais {de temps}. Il s'excuse toujours si on veut quelque chose de lui.",
"Papa a toujours {le temps} de faire du ski, mais il n'a jamais {le temps} de faire un tour de vélo avec moi.",
"Est-ce que je peux t'expliquer mon problème. Oui, mais fais vite. J'ai peu {de temps}.",
"Je n'ai pas {de} temps à perdre."]
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