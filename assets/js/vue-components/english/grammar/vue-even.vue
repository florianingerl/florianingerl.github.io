<template>

<div class="cours">
<h1>Even</h1>
<section>
With this tutoriel, I want to prove that <span style="font-style:italic">even</span> I can write one. And I want to teach
you the correct use of "even". 
</section>

<section>
Let's look at some more examples:

<ol class="exemple">
<li>Dave is a workaholic. He works even on Sundays.</li>
<li>Florian never visits his relatives, not even on Christmas Eve.</li>
<li>Florian never eats cake, not even the one his grandmother has made.</li>
</ol>

As we saw in the above examples, we use "even" to say that something is <em>unusual</em> or <em>suprising</em>.
More examples:

<ol class="exemple">
<li>Hermann can't digest raw, healthy food - not even ice lettuce. (And ice lettuce is really easy to digest.)</li>
<li>Denis is so stupid that he always wears his mask, even when he sleeps. (And there aren't many people who are so stupid.)</li>
</ol>

</section>

<section>
<VueExercise instruction="Make sentences with even or not even using the words in brackets!" >

<p class="exemple"><img style="float: right; width: 200px" src="assets/img/rawfood/rooteBeete1.jpg"></img>Example: Dave can't solve any problem of the assignment sheet. (simplest) --> Dave can't even solve the simplest problem of the assignment sheet.</p>

<ol>
<li>He doesn't like vegetables. (beetroot) </li>
<li>He can not speak a word in English. (hello) </li>
<li>Yesterday, I have done so much sport, that all my limbs are aching today. (fingers) </li>
<li>All of the beetroot is eadible. (skin)</li>
<li>She speaks a lot of languages. (Japanese) </li>
<li>His business is open everytime. (Christmas Even)</li>
</ol>

<VueHideShow>
<ol>
<li>He doesn't even like beetroot. (And beetroot is really delicious)</li>
<li>He can't even say hello.</li>
<li>Even my fingers are aching today.</li>
<li>Even the skin of the beetroot is eadible.</li>
<li>She even speaks Japanese.</li>
<li>His business is open even on Christmas Eve. </li>


</ol>

</VueHideShow>

</VueExercise>
</section>

</div>


    
</template>

<script>
import VueExercise from "./../../vue-exercise.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueGaps from "./../../vue-gaps.vue";

export default {
  name: "VueEven",
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
    };
  }
}
</script>

<style scoped>

</style>