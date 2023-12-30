<template>

<div>
<!--
Voilà la conjugation des verbes de la prèmiere, deuxième et troisième groupe (des verbes réguliers).
<table class="table table-striped">
<thead>
      <tr>
        <th></th>
        <th>1er groupe (regarder)</th>
        <th>2ièm groupe (attendre)</th>
        <th>3ième groupe (sentir)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Je</td><td>regardai</td><td>attendis</td><td>sentis</td></tr>
      <tr><td>Tu</td><td>regardas</td><td>attendis</td><td>sentis</td></tr>
      <tr><td>Il/Elle/On</td><td>regarda</td><td>attendit</td><td>sentit</td></tr>
      <tr><td>Nous</td><td>regardâmes</td><td>attendîmes</td><td>sentîmes</td></tr>

    </tbody>
</table>    

Voilà la conjugation du verbe être au passé simple.
<table class="table table-striped">
<tr><td>Je</td><td>fus</td></tr>
<tr><td>Tu</td><td>fus</td></tr>
<tr><td>Il/Elle/On</td><td>fut</td></tr>
<tr><td>Nous</td><td>fûmes</td></tr>
<tr><td>Vous</td><td>fûtes</td></tr>
<tr><td>Ils</td><td>furent</td></tr>
</table> -->
   
<VueExercise instruction="Remplis les trous avec le verbe donné à l'imparfait ou au passé simple!">
<img src="assets/img/francais/buveur.png" style="float: right; height: 300px" ></img>
<h3 class="text-center">L'histoire d'un buveur avec de bonnes résolutions</h3>
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
       gaptext: ["Un jour, un certain buveur {rencontra} (rencontrer) un saint. Car il {fut} (être) si impressioné des bons habitudes du saint, il {prit} (prendre) la décision d'arreter de boire.",
       "Il {emmena} (emmener) toutes les bouteilles de vin dans la cave et {ferma} (fermer) la cave à clé et il {donna} (donner) la clé à un de ses domestiques en lui commandant: ''Ne me rends pas la clé même si je te le demande. Il faut absolument que je m'arrête de boire.''",
       "De cette façon, il {était} (être) sauve du vin. Quand il {avait} (avoir) envie d'en boire, son domestique n'{était} (être) soit pas là soit il {était} (être) trop gêné de lui demander la clé. ",
       "Environ 10 jours se {passèrent} (passer) ainsi. Puis il {fut} (être) invité au restaurant par des camarades. Car ses camarades en {burent} (boire), il le {fit} (faire) aussi et il se {rappela} (rappeler) du bon goût. Alors il {eut} (avoir) une idée.",
       "Il {pria} (prier) son domestique de lui rendre la clé. Bienque il lui {avait} (avoir) commandé de ne pas le faire, c'{était} maintenant autre chose, parce qu'il {était} (être) maintenant complètement sauve du vin et {voulait} (vouloir) simplement mettre quelques bouteilles sur la table pour en donner à ses invités et pour simplement les regarder sans en boire.",
       "Le domestique {fut} (être) d'accord.",
       "Quelques jours se {passèrent} (passer) ainsi. Puis, en pensant qu'il {était} (être) complètement sauve du vin maintenant, il {crut} (croire) que c'était une bonne idée de simplement ouvrir une des bouteilles sur sa table pour respirer l'odeur du vin sans en boire.",
       "Et il se {réjouissait} (réjouir) pendant quelques jours de l'odeur du vin et {était} (être) tres fier de lui d'avoir vaincu son mauvais habitude de boire.",
       "Après quelques jours, se croyant tout libére de son mauvais habitude de jadis, il {pensa} (penser): ''Il ne ferait pas grand mal de prendre simplement une gorgée du vin. Juste pour vérifier s'il soit assez bon pour être servi aux invités.'' ",
       "Et le vin {fut} (être) assez bon et il en {prit} (prendre) une deuxième gorgée et une troisième et ne {put} (pouvoir) s'arrêter et {devint} (devenir) un buveur comme auparavant."  ]
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