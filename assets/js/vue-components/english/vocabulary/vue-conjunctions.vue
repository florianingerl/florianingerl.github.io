<template>

<div>
<h1 class=".text-danger">Conjunctions</h1>

<table>
<tr>
<th>Group</th> <th>Conjunctions</th> <th>Example</th>
</tr>

<tr>
<td rowspan="2">Place</td> <td>Where</td> <td>Germany is the country where I grew up.</td>
</tr>

<tr>
<td>Wherever</td> <td>Wherever you go, I will follow you.</td>
</tr>

<tr>
<td rowspan="9">Time</td> <td>When</td> <td>When the sun's light is extinguised, I will be dead long ago.</td>
</tr>

<tr>
<td>As soon as</td> <td>As soon as I will have picked enough dandelions, we can have lunch.</td>
</tr>

<tr>
<td>Before</td> <td>Before you enter my room, please put off your shoes.</td>
</tr>

<tr>
<td>After</td> <td>After a meal, you shouldn't drink anything for at least half an hour.</td>
</tr>

<tr>
<td>While</td> <td>While you were on holiday, I cleaned our house from top to bottom.</td>
</tr>

<tr>
<td>Until</td> <td>I won't talk to you any more until you have apologized.</td>
</tr>

<tr>
<td>As</td> <td>As I was riding my bike, it suddenly started to rain.</td>
</tr>

<tr>
<td>As long as</td><td>I will support you as long as you need it.</td>
</tr>

<tr>
<td>Once</td> <td>Once you have understood, these kind of exercises are pretty easy.</td>
</tr>

<tr>
<td rowspan="3">Reason</td> <td>Because</td> <td>Because of your ingratitude, I won't give you presents any more.</td>
</tr>

<tr>
<td>Since</td> <td>Since English is a very nice language, I like to make up small example sentences.</td>
</tr>

<tr>
<td>For</td> <td>I tell you this just for your information.</td>
</tr>

<tr>
<td rowspan="3">Consequence</td> <td>so (that)</td> <td>I put on the light so that I can see.</td>
</tr>

<tr>
<td>such+noun ... + (that)</td> <td>English is such a nice language that I can read English books until midnight.</td>
</tr>

<tr>
<td>(in order) to</td> <td>I pay attention to healthy nutrition to make my life easier.</td>
</tr>

   
<tr>
<td rowspan="2">Manner</td> <td>as if/though</td> <td>He talked as if he knew his stuff.</td>
</tr>

<tr>
<td>as</td> <td>He works as a teacher.</td>
</tr>

</table>

<VueExercise instruction="Choose the correct conjunction!">

<VueMCGaps lg="fr" :gaptext="gaptext">

</VueMCGaps>

</VueExercise>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  name: "VueConjunctions",
  components: {
    VueExercise,
    VueMCGaps
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },

  methods() {
    
  },
  
  data() {
    return {
       gaptext: [ "{As long as|Although|For} you keep away from me, I don't care that you never take a shower.",
       "{Until|After|So that} you have done your homework, you mustn\'t go to bed.",
"You need to do your homework {before|after|as long as} you go to bed.",
"I go into bed early enough {to|so that|for} be fit tomorrow.",
"{Since|For|After} you are so lazy, you won't achieve your goals.",
"{Once|Before|Although} you got used to me, we will get on very well.",
"Ses mains {couraient} vite sur le clavier de mon ordinateur et, en que peu de temps, il avait réparé mon ordinateur.",
"Peu importe dans quelle équipe Cristiano Ronaldo joue, il {conduit} son équipe vers la finale de la ligue des champions.",
"Laisse tes pensées {courir} et les observe simplement. De cette façon, tu obtiendras de la paix et la maîtrise de ton esprit.",
"Les critiques perpetuels des profs l\'ont {conduit} à l\'abondonce de tous ses efforts.",
"Le patron {conduisait} bien son entreprise et par conséquent, tous les employés étaitent heureux d\'y travailler.",
"Si l\'argent ne {conduisait} pas le monde, il y {aurait} probablement simplement beaucoup de confusion.",
"{Conduis}-toi bien! Sinon, je dois t\'enseigner de bonnes manières.",
"Ls rumeur {court} dans l\'entreprise que le patron démissionnera.",
"Demain, la mère {conduira} ses enfants chez leur père qu\'ils ne peuvent rendre visite qu\'une fois par mois après le divorce.",
"L\'eau ne {conduit} l\'électritité que si on y ajoute du sel."
       ]
    };
  }
}
</script>

<style scoped>
table, th, td {
    border: ridge 1px red;
    border-collapse: collapse;

}

th {
    background-color: rgb(255, 80, 80)
}

th, td {
    padding: 10px;
}


</style>