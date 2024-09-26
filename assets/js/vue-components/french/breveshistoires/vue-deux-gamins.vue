<template>
<div>

<h1>Antoine et Fred, meilleurs amis</h1>
<h4><i>par Florian Ingerl et Marie Faure</i></h4>
<p><img style="float: right; height: 200px" src="assets/img/francais/deuxgamins.png"></img> Antoine et Fred s'entendaient toujours bien.
Ils se portaient l'un l'autre aux nues.
Antoine était le meilleur ami que Fred ait jamais eu,
et inversement.</p>
<VueExercise lg="fr" instruction="Remplis les trous avec la bonne conjugaison du verbe donné au subjonctif passé!">
<VueMCGaps lg="fr" :gaptext="['Il est fort probable que cet fou {ait tué} (tuer) ses propes enfants.',
'Il est possible que Camille {se soit trompée} (se tromper) dans son calcul.',
'Je ne crois pas que mon frère {ait volé} (voler) cette voiture.',
'C\'est le meilleur choux-rave que j\'{aie} jamais {acheté} (acheter).',
'Je suis content qu\'ils {aient accepté} ma proposition.']">

</VueMCGaps>
</VueExercise>

<p>
Antoine était content qu'il puisse raconter tous ses problèmes à son copain.
Il était clair comme de l'eau de roche que les deux comparses étaient et resteraient inséparables tout au long de leur vie.
</p>

<VueExercise lg="fr" instruction="Remplis les trous avec l'une des préposition en face de, au bout de, au long de, en fond de">
<VueMCGaps lg="fr" :gaptext="['{Au fond de} son cœur, Fabrice n\'aimait pas son épouse mais une autre femme.',
'{En face de} mon appartement, il y a une discothèque. Souvent, je n\'arrive pas à dormir à cause du bruit.',
'Les deux amoureux se promènèrent {le long de} la Seine en se tenant la main.']">

</VueMCGaps>
</VueExercise>

<p>
Cependant, il y avait une différence entre les deux. Antoine avait des parents très riches,
tandis que les parents de Fred étaient pauvres.
</p>

<VueExercise lg="fr" instruction="Remplis les trous avec l'une des préposition du temps: tandis que, avant que, en ou dans">
<VueMCGaps lg="fr" :gaptext="['Antoine peut courir 20 kilomètres {en} dix minutes.',
'{Dans} 10 minutes, le cours de français commencera!',
'{Tandis} que tu as dormi, j\'ai nettoyé la salle de bains.',
'{Avant} que tu ne me juges, essaye de me comprendre!']">

</VueMCGaps>
</VueExercise>

<p>
Ce déséquilibre provoqua très tôt dans leur relation un conflit qui restait toutefois dissimulé: en effet, Fred ne pouvait s'empêcher d'être jaloux de l'aisance financière dont bénéficiait son ami.
Bien que Fred fît semblant d'admirer les nouveautés toujours plus modernes
de son ami, en réalité, il lui en voulait car son ami ne partageait pas davantage ses richesses.
Antoine ne s'attendait donc pas à ce que Fred allait faire, à ses réactions impulsives et empreintes de jalousie, lui semblait-il.
</p>

<VueExercise lg="fr" instruction="Reponds à la question!">
<VueQuestion lg="fr" :question="{
		question: 'Qu\'est qui est l\'infinitif du verbe et le temps du verbe dans la phrase: Bien que Fred fît semblant de.... ?',
		type: 'multiple choice',
		options: [{option:'être, subjonctif', correct: false },
     {option:'faire, subjcontif', correct: false },
     {option:'faire, subjcontif imparfait', correct: true } ,
     {option:'être, subjcontif imparfait', correct: false }
     ]
	    }" :hasNextButton="false" />
</VueExercise>

<p>
Pourtant, Antoine savait qu'il pouvait compter sur Fred parce que Fred était toujours à l'heure et l'aidait à faire ses devoirs quand il en avait besoin. La plupart du temps,
Fred ne se laissait pas mener par sa jalousie, mais était conscient d'elle et choisissait de rester honnête.
</p>
<VueExercise lg="fr" instruction="Choisis le sens dans lequel le mot toujours aparaît dans la phrase!">
<VueMCGaps lg="fr" :gaptext="['Malgré tes soupçons, je suis toujours convaincu que j\'ai raison. {opposition à ne...plus|}',
'Camille se lève toujours à quatre heure le matin. {habituellement|}',
'Les enfants veulent toujours jouer. {perpetuellement|}']" :same="true">

</VueMCGaps>

</VueExercise>

Au lieu de céder à ses instincts primaires, Antoine avait pris l'habitude de prendre la clé des champs quand il sentait la moutarde lui monter au nez.
Puis, pour se calmer, il prenait une douche avec de l'eau très froide.
Un jour, il alla se plonger dans le lac et il faillit même se noyer tellement l'envie de remonter à la surface lui déplaisait.
Mais en remontant à temps, il avait retrouvé son sang froid et avait oublié sa jalousie grâce à l'eau et aussi grâce au soleil qui lui rendait la peau sèche.

<VueExercise lg="fr" instruction="Remplis les trous avec l'adjectif donné au feminin!">
<VueMCGaps lg="fr" :gaptext="['La chaussée est bien {sèche} (sec). On peut conduire son moto.',
'Elle ne gagnera pas la coupe du monde bien qu\'elle le dise. Elle est simplement {prétentieuse}(prétentieux).',
'Ta coiffure est vraiment {affreuse} (affreux). As-tu coupé tes cheveux toi-même?',
'Tu n\'as pas besoin de beaucoup de temps pour lire cette histoire car elle est très {brève}(bref).']">

</VueMCGaps>
</VueExercise>

<p>
Ce dernier conflit larvé avait failli séparer les deux amis pour toujours. Or, l'admiration et le respect que chacun éprouvait l'un pour l'autre étaient aussi régénérants que les rayons du soleil et la réconciliation vit le jour.

Heureusement, il n'y avait pas souvent de conflit entre les deux amis, et s'il en avait un, ce n'était pas un grand. Celui qui a failli mener à la mort de Fred dans le lac était simplement à cause d'un stylo de 500 euros que les parents d'Antoine lui avaient offert et dont Antoine s'était trop vanté devant son ami.
</p>
<h3>Fin</h3>
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