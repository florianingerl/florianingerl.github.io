<template>

<div class="cours">
<h1>Rajouter ou ajouter</h1>
Cette article a pour but de vous enseigner la différence entre "rajouter" et "ajouter".

<section>
<h2>Ajouter</h2>
On ajoute quelque chose de nouveau qui n'était pas là avant.
<div class="exemple">
<h3>Exemple:</h3><br>
J'ajoute des pousses du blé à ma salade. (La salade ne contenait pas encore de pousses du blé.)
</div>
</section>

<section>
<h2>Rajouter</h2>
On rajoute quelque chose d'avantage/de plus. Il y en avait déjà mais pas assez.
<div class="exemple">
<h3>Exemple:</h3><br>
Il y a déjà de l'huile d'olive dans ma salade. Pourtant, j'en rajoute un peu pour le bon goût.
</div>
</section>


<VueExercise instruction="Remplis les trous avec la correcte conjugation du verbe ''rajouter'' ou ''ajouter'' en présence de l'indicatif, imparfait, conditionel présent ou passe composé!" lg="fr" >
<VueGaps lg="fr" :gaptext="gaptext" >

</VueGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";

export default {
  name: "VuePronomEnAvecMengenwort",
  components: {
    VueExercise,
    VueHideShow,
    VueGaps
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       gaptext: ["Sans pousses de lentilles, ma salade ne me donne pas d'énergie. Donc, j'en {ajoute} beaucoup.",
"Je veux que mon cours contienne 10 questions, mais pour l'instant il ne contient que une. Donc, j'en {rajoute.} 9.",
"L'ensemble contient les éléments 1,2 et 100. Si tu {ajoute} l'élément 55, tu auras 4 éléments différentes dans l'ensemble.",
"Je pourrais sûrement {rajouter} de la compétence à votre entreprise qui bien sûr emploie déjà beaucoup d'ingénieurs savants.",
"Mon cours est complet. Je n'ai rien à {ajouter} qui n'est pas répétitif.",
"Si je n'avais pas {ajouté} des explications, personne ne serait capable de remplir les cases.",
"Je dois {ajouter} que je ne sais pas tout. Mais ayez confiance en moi que je sais la différence entre ''rajouter'' et ''ajouter''.",
"En {ajoutant} de l'huile de lin à ma salade, celle-ci prend un très bon goût.",
"En empilant des petites pierres, j'ai construit une très grand tour. Mais si j'y {rajoutais} des pierres, je risquerais que la tour tombe."]
    };
  }
}
</script>

<style scoped>

</style>