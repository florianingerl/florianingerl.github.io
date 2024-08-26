<template>

<div>

<h1>Celui, celle, ceux ou celles - petit exercice avec des voleurs</h1>

<p>
Merci de lire par exemple <a target="_blank" href="https://www.francaisfacile.com/exercices/exercice-francais-2/exercice-francais-2922.php"> ce cours</a> sur les pronoms démonstratifs. Puis,
revenez ici et faites mon test en remplissant les trous avec celui, celle, ceux ou celles! Bonne chance!
</p>
   
<VueExercise instruction="Remplis les trous avec celui, celle, ceux ou celles">

<VueGaps lg="fr" :gaptext="gaptext">

</VueGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";

export default {
  name: "VueCeluiCelle",
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
       gaptext: "Regarde ce garcon! Lequel? {Celui} qui a des cheveux blonds et qui est assis devant le magasin. J'ai oublié mes lunettes. Est-ce que je peux prendre " +
 "{ceux} sur la table pour que je puisse voir le garcon? Non. Approchons-nous plûtot! Est-ce que tu peux maintenant voir la montre? Laquelle? " +
 "{Celle} qu'il porte à la main droite. Il me l'a volée. J'ai acheté cette montre avec mon dernier argent dans le magasin \"Printemps\". Tu sais, " +
 "{celui} à côté de la boulangerie. Qui est-ce, cette femme? Laquelle? " +
 "{Celle} qui est venue de nulle part et qui étreind le voleur maintenant? C'est sa complice qui vend probablement les trucs. Lesquels? " +
 "{Ceux} volés bien sûr. Et est-ce que tu vois son doigt? Lequel ? " +
 "{Celui} qui n'est plus là. Dans le pays d'où elle vient, on arrache un doigt de la main des voleurs. Et regarde! " +
 "{Celui} qui m'a volé la montre a subi la même punition que " +
 "{celle} de sa complice. Lui aussi, il lui manque un doigt. Mais c'est complètement barbare! J'aime mieux les punitions en France que " +
 "{celles} dans les pays sous-développés."
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