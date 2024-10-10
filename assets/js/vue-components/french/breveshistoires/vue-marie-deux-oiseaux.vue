<template>
<div>

<h1>Une histoire d'amour de deux oiseaux</h1>
<h4><i>par Florian Ingerl et  <a href="https://mariefaure.fr/">Marie Faure</a></i></h4>




Antoine était un petit oiseau dont les ailes étaient noires.

<VueExercise lg="fr" :topics="['Les pronoms relatifs: qui, que, où ou dont']" instruction="Remplis les trous avec le bon pronom!">
<VueMCGaps lg="fr" :gaptext="['Un oiseau, {qui} chante faux, a du mal à trouver une femelle.',
'Une femelle {dont} les ailes sont sales ne trouvera aucun mari.',
'L\'oiseau, {que} tu vois dans l\'image ci-contre, s\'appelle Antoine.',
'Antoine connaît tous les endroits où se cachent les vers.']">
</VueMCGaps>
</VueExercise>

Il était assis sur la branche d'un arbre et savourait le silence qui l'entourait.
Il adorait étendre ses ailes et dès qu'il se sentait suffisamment à l'aise, il prenait aussitôt son envol. Quelle liberté!

<VueExercise lg="fr" instruction="Remplis les trous avec étaler, entamer, éteindre ou étendre à la bonne conjugaison">
<VueMCGaps lg="fr" :gaptext="['Il faut étaler le cresson sur le tamis à cresson pour qu\'il pousse bien.',
'En tant que femelle, l\'épouse d\'Antoine peut toujours entamer les vers avant que Antoine ne peut en avoir.']">

</VueMCGaps>
</VueExercise>
C'était le printemps. Que faire de cette belle journée ? << Pourquoi ne pas chanter sa meilleure chanson et attirer une jolie femelle avec sa voix si merveilleuse?  >> pensa Antoine.
Malgré le fait que cette idée de chanter lui plaisait, il ne pouvait s'empêcher de ressentir de la honte car il pensait que ses mélodies n'étaient pas si jolies que celles de son voisin Victor. Alors, il respira longuement pour évacuer ce sentiment fort désagréable et décida de se jeter à l'eau.
Que ne donnerait-il pas pour qu'une femelle l'aime! Pour l'instant, il essaya de chanter aussi bien qu'il le pouvait. Mais malheureusement, les femelles restèrent à distance et aucune femelle ne s'approcha de lui.
Cependant, une jolie femelle cachée derrière une branche l'entendit et apprécia sincèrement sa mélodie ; il ne s'agissait aucunement d'avoir pitié de ce jeune oiseau. Pour ne point brusquer ce jeune mâle à l'air anxieux, elle décida de rester cachée pour le moment.
Après avoir chanté pendant presque une heure, la voix d'Antoine s'affaiblit. Elle avait besoin d'une pause. Il songea donc à se faire un bon repas qui dégagerait une bonne odeur qui, à son tour, attirerait la femelle de ses rêves.
Puis, il pourrait partager son repas avec elle.
Il mit immédiatement son plan en œuvre en allant chercher des petits vers et des insectes aux alentours, de sorte qu'il passa (sans la voir) devant la belle femelle.
La femelle, qui s'appelait Joséphine, sortit de sa cachette parce qu'elle était intriguée par ce que cherchait Antoine. "Que cherches-tu?" demanda-t-elle.
Antoine faillit répondre << Une jolie femelle telle que toi! >> mais put se maîtriser et dit plûtot : << Je cherche de délicieux vers et insectes. Envie de m'aider? >>
En dépit de son air timide, Joséphine accepta avec allégresse la proposition d'Antoine.
Parce qu'il était le mâle, Antoine se sentit obligé de prendre les commandes.
"Josephine" dit-il. "Veux-tu remuer la terre là-bas avec ton bec? Pendant que tu fais cela, je regarderai par-dessus ton épaule pour voir si tu a trouvé des vers."
Elle lui sourit aussitôt pour lui montrer qu'elle acquiesçait à sa demande et lui en retour sentit son cœur bondir d'amour.
Le plan fut mis en œuvre et marcha immédiatement. Ensemble, les deux amoureux mangèrent les délicieux vers, et comme cela ce passe souvent avec des amoureux frais et enthousiastes, ils se marièrent dès le lendemain et eurent beaucoup d'oisillons.

<h2> The end </h2>

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

