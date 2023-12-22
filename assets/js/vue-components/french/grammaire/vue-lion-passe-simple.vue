<template>

<div>
<img src="assets/img/francais/lion.png" />
<VueExercise instruction="Remplis les trous avec le verbe donné à l'imparfait ou au passé simple!">
<h3 class="text-center">Un spectacle merveilleux d'un lion</h3>
<VueGaps lg="fr" :gaptext="gaptext">

</VueGaps>
<h4 class="text-center">La fin de l'histoire</h4>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";

export default {
  name: "VueLionPasseSimple",
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
       gaptext: ["Le lion Simba {travaillait} (travailler) ainsi que d'autres lions pour le cirque du soleil qui {résidait} (résider) à l'époque à Paris. D'habitude, Simba ne {devait} (devoir) faire pas grande chose lors d'un spectacle dans le manège à part que enlever une patte, sauter à travers un anneau ou sauter d'une chaise à une autre.",
       "Lors d'un certain spectacle,  ça se {passa} (passer) bien différent. La salle {était} (être) remplie jusqu'au bout. De même que chaque fois, Simba {était} (être) anxieux non seulement à cause de la foule qui {applaudissait} (applaudir) avec beaucoup de bruit, mais surtout à cause de la lionne Chiara dont il {était} (être) un peu amoureux et qu'il {voulait} (vouloir) toujours impressioner par ses sauts.",
       "Comme d'habitude, il {émit} (émettre) un grognement simplement pour vérifier si sa voix {était} (être) en bonne forme et telle qu'elle {pouvait} (pouvoir) impressioner et même un peu éffrayer l'audience. Mais quelle panne! Sa voix n'{émit} (émettre) qu'un faible bruit dont aucun bébé ne serait effrayé. Il {essaya} (essayer) encore une fois. Plus qu'il essaya, plus il {devint} (devenir) nerveux. Finalement, il essaya avec tant de force que tous les hommes et tous les animaux proche de lui {sursautèrent} (sursauter). Mais la foule l'{applaudit} (applaudir). En conséquence, il {fut} (être) très fier de lui et en même temps soulagé que sa voix {marchait} (marcher) si bien. Rien ne {pouvait} (pouvoir) l'empêcher d'entrer la manège maintenant.",
       "Quand les haut-parleurs {annonçèrent} (annonçer) la performence des lions, il {éprouva} (éprouver) un peu de peur: ''Est-ce que je vais être capable de sauter à travers les anneaux avec mes muscles toujours un peu froids?'' Bien qu'il s'était échauffé, il se {sentait} (sentir) toujours un peu froid. ",
       "C'était son tour maintenant! Il {fixa} (fixer) l'anneau, {respira} (respirer) profondement avant de sauter, et ne {rata} (rater) pas l'anneau! Des applaudissements! De même pour ses 3 premiers sauts.",
       "Lors de son quatrième saut, un malheur se {produisit} (produire). Il le {vit} (voir) trop tard. Le chanteur qui {accompagnait} (accompagner) le spectacle des lions, était juste derrière l'anneau. Impossible de l'éviter!",
       "Simba le {frappa} (frapper) et le pauvre chanteur {tomba} (tomber) par terre et se {blessa} (blesser) gravement, mais encore pire, il avait cessé de chanter! Que va devenir le spectacle!",
       "Il {fallut} (falloir) agir vite, afin que le spectacle soit toujours un succès. Il {ordonna} (ordonner) à un autre lion de sauter à travers les anneaux à sa place, {ramassa} (ramasser) le microphone et {commença} (commencer) à chanter si bien qu'il le {put} (pouvoir).",
       "Malgré son manque d'entrainement, l'audience {fut} (être) impressionné par sa chanson qu'il {accompagna} (accompagner) avec une danse.",
       "Après le spectacle bien réussi, tout le monde le {félicita} (féliciter) et il {reçut} (reçevoir) une augmentation de son salaire de la part du cirque."   ]
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

img {
  width: 200px;
}




</style>