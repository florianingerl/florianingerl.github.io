<template>
<div v-if="$route.params.page == 1">
<h1>PART ONE</h1>
<h2>How I Conceived the Idea of Raw-Eating</h2>

<VueWholeSentence />

<VueExercise instruction="Fill in the gaps" type="gaps" data="A nice {Lueckentext}"/>
Raw vegetable food should be the only nourishment taken by man. The habit of eating
cooked food should be abandoned in this world once for all. This is the unerring demand of
nature. The consumption of cooked food is the most terrible barbarism in the history of
mankind, a barbarism that no one seems to be aware of and to which everybody falls an
unconscious victim. No matter how strange the idea may seem to some, it is the absolute truth
with which we cannot but acquiesce.
<h2>Exercise: Make one sentence out of the two</h2>
Example: 
<p>Cooking food is the greatest barbarism. No one seems to be aware of this.</p>
<p>Cooking food is the greatest barbarism that no one seems to be aware of.</p>

<!-- to be good at something, to be bad at something, to care for something -->
<VueGaps gaptext="
<p>Going to the doctor is a risk. No one seems to be afraid of it.</p>
<p>{Going to the doctor is a risk that no one seems to be aware of.}</p>
<p>Ones health is a gift. No one seems to care for it. </p>
<p>{Ones health is a gift that no one seems to care for}</p>
{}" />

This truth became evident to me when, after 18 years of careful study and investigation, I
became convinced that the deaths of my 10-year-old son and 14-year-old daughter were caused
by unnatural nutrition. The great number of medical examinations carried out in Iran, France,
Germany and Switzerland in various attempts made to discover some specific disease in their
organisms and the subsequent administration of numerous remedies had a considerable share,
too, in bringing the tragedy to a head. My children died of the gradual emaciation and wasting
away of all their organs caused by unnatural feeding and poisonous medicines.

<h2>Exercise: Transform these sentences into passive</h2>
Example:
<p>Unnatural nutrition caused the deaths of my children</p>
<p>The deaths of my children was caused by unnatural nutrition.</p>

<p>Poisonous medicines killed my children.</p>
<p>My children were killed by poisonous medicines.</p>

I have been able to penetrate into the secrets of medical science and to observe its good and
bad aspects all the more clearly, because I have not been inspired by the prospect of becoming a
doctor or of making any financial gains. My incentive has been in the first place the wish to do my
best for the recovery of the health of my beloved children, and later the ardent desire to
perpetuate their memory by being useful to humanity.

<h2>Exercise: Translate! </h2>
Example:
<p>Ich spare Geld und Zeit, indem ich nicht zum Doktor gehe.</p>
<p>I save money and time by not going to the doctor.</p>

<p>Ich bin gut zu meinen Zähnen, indem ich kein Obst esse</p>
<p>I am kind to my teeth by not eating fruits.</p>


</div>


<div v-if="$route.params.page == 2">
This is page 2
</div>
</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise,
     VueWholeSentence
  },

  mounted(){
     console.log("The mounted function of VueRowFood was called!");
     
  },
  setup(){
   console.log("The setup function of VueRawFood  is executed!");
  }
}
</script>

<style scoped>



</style>