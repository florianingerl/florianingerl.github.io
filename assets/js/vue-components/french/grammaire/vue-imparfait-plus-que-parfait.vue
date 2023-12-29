<template>

<div>
   
<VueExercise instruction="Remplis les trous avec le verbe donné à l'imparfait ou au plus-que-parfait!">
<img src="assets/img/francais/vers.png" style="float: right; height: 200px;" />
<h3 class="text-center">L'histoire d'un vers trop prudent</h3>
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
       gaptext: ["Un jour, un petit ver (Wurm) {vivait} (vivre) avec sa mère dans une petite maison de quelques feuilles de ampfers.",
       "Car le père {avait été mangé} (manger en passif) par un oiseau, les deux étaient très prudent que la même chose ne se produisse pas pour eux.",
       "En effet, en ne jamais quittant la maison sauf pour faire des achats absolument nécessaires, aucun oiseau ne les {voyait} (voire).",
       "Ils {savaient} (savoir) aussi que d'autres dangers {existaient} (exister) parce que, par exemple, un autre vers parent {avait creusé} (creuser) son tunnel sous un plate-bande d'un homme et {a été tué} (tuer en passif) par sa pioche. C'est la raison pour laquelle ils {tenaient} (tenir) tous les humains à distance.",
       "En plus, un autre parent d'eux {avait quitté} (quitter) sa maison quand il {avait plu} comme vache qui pisse. Il s'{était procuré} (procurer) une maladie de cette façon et en {était mouru} (mourir). C'est la raison pour laquelle le petit ver et sa mère ne quittaient que la maison par beau temps.",
       "De plus, afin qu'ils ne soient pas fatigués le lendemain, ils se {couchaient} (coucher) tôt et {manquaient} (manquer) donc à tous les évènements après 20h .",
       "En outre, ils {étaient} (être) très prudents de ne pas rencontrer de mauvais vers. Afin que la même chose qu'avec l'oncle Erwin ne se produisse par pour eux. L'oncle Erwin {s'était laissé} (se laisser) persuadé par de mauvais vers que boire de coca le rendrait heureux et puis, en les croyant, il {avait perdu} (perdre) toutes ses dents. En tirant leur leçon de cette histoire, ils {évitaient} (éviter) tous les autres vers.",
       "Par ailleurs, ils étaient très attentifs de ne pas faire trop de sport parce que ça n'{avait rapporté} (rapporter) qu'une queue cassé au cousin Dudley qui {avait creusé} son tunnel trop rapidement. Il {valait} (valoir) donc mieux de ne jamais faire un effort physique car non seulement n'{était} (être) cela désagréable mais aussi {heurtait} (heurter) le corps.",
       "De cette façon, le vers ne {faisait} (faire) ni de mal à son corps ni {fréquantait} (fréquenter) quelqu'un de mauvais.",
       "Malgré tous ces advantages, son ésprit devint malade car rester à la maison toute la journée sans rien faire et sans companie {ètait} (être) très ennuyeux.",
       "Heureusement, il rencontra un jour quelqu'un qui lui expliqua comment on peut éviter les périls de la vie en pensant soi-même et en même temps vivre et entreprendre beaucoup de chose."     ]
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