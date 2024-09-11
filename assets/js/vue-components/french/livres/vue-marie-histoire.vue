<template>
<div v-if="$route.params.page == 1">
<h1>On écrit n'importe quoi et on trouve le titre après</h1>

<h1>Chapitre 1</h1>
<h2>Fred et ses relations</h2>

Fred n'était pas paresseux bien que son père l'était. Fred travaillait sans cesse tandis que
son père demeurait assis dans son fauteuil toute la journée en jouant avec son portable.
Bien évidemment, son père était bien plus vieux que lui, mais cela n'aurait pas dû l'empêcher d'être plus actif comme l'était sa mère, bien entendu plus vieille que Fred.
"Souviens-toi de ce que tu m'as promis!" dit la mère de Fred à son fils. Toute la famille était rassemblée autour de la table de la cuisine. À l'ordre de sa mère, en effet, Fred avait du mal à se rappeler ce à quoi elle faisait référence.

<VueExercise><VueQuestion lg="fr" :question="{
		question: 'Quelle est la difference entre rassembler et assembler? Cochez les phrases qui sont correctes!',
		type: 'multiple choice',
		options: [{option:'Les membres de la famille se sont rassemblés aujourd\'hui pour fêter Noël.', correct: true },
     {option:'Les membres de la famille se sont rassemblées aujourd\'hui pour fêter Noël.', correct: false },
     {option:'Le jeune garçon assemble les pièces du puzzle avec justesse.', correct: true } ,
     {option:'Le jeune garçon assemble les pièces de la puzzle avec justesse.', correct: false }
     ]
	    }" :hasNextButton="false" /></VueExercise>

Brusquement, Fred eut une idée. "Est-ce que tu fais référence à moi, qui dois t'emmener à l'aéroport demain?"
La mère , Josephine, disait souvent qu'elle ne pouvait plus respirer en compagnie perpétuelle du père et avait désespérément besoin de quelques jours de congés à l'autre bout du monde.


<VueExercise><VueQuestion lg="fr" :question=" {
		question: 'Dans quelles phrases pourrait-on aussi utiliser brusquement sans en changer le sens?',
		type: 'multiple choice',
		options: [{option:'Il leva soudain le bras au-dessus de sa tête.', correct: true },
     {option:'Malheureusement il avait oublié son parapluie.', correct: false },
     {option:'Tout à coup, minuit sonna à l\'horloge.', correct: true } ,
     {option:'Evidemment personne ne la croyait capable d\'une telle prouesse.', correct: false }
     ]
	    }" :hasNextButton="false" /></VueExercise>

Fred admirait le courage de sa mère! Il aurait eu peur seulement à la pensée de se rendre à l'autre bout du monde. Mais, c'était tout planifié. Demain, Joséphine embarquera dans l'avion pour l'Australie à l'aéroport de Nice.        

<VueExercise>
Quels mots désignent des qualités et lesquels désignent des défauts? <br>
courage, orgueil, générosité, vanité, sérénité, patience, médiocrité, vantardise, paresse, bravoure, nervosité, rigeur, vigeur, préservance, humilité
<VueHideShow>
<p>Qualités: courage, générosité, vanité, sérénité, patience</p>
<p>Défauts: orgueil, vanité, médiocrité, vantardise, paresse</p>
</VueHideShow>
</VueExercise>


"Mon billet pour l'avion n'a couté que 100 euros!" dit Joséphine. "Mais je ne veux quand même pas les gaspiller en ratant l'avion. Donc, j'ai absolument besoin de toi pour m'emmener à l'aéroport demain!" Incrédule, Fred répliqua: "100 euros pour une destination si lointaine! Tu est sûre de ne pas avoir rêvé ?"


<VueExercise><VueQuestion lg="fr" :question=" {
		question: 'Quelle phrase est correcte?',
		type: 'multiple choice',
		options: [{option:'Il pensait n\'avoir pas le temps de manger avant de partir.', correct: false },
     {option:'Il pensait ne pas avoir le temps de manger avant de partir.', correct: false }
     ]
	    }" :hasNextButton="false" /></VueExercise>



<VueGaps gaptext="He could run five kilometres 2 minutes {faster} (fast) than his sister. He was {thinner} (thin) than he had been one year ago because he kept a new diet.
He could speak English a lot {more fuently} (fluent) than when he had left school because he was forced to talk a lot of English in his job." >

</VueGaps>

<!--
<VueExercise instruction="Make one sentence out of the two">
<VueWholeSentence :sentences="[
        { task: 'Edwin likes fishing. He is good at it.', solution: 'Edwin is good at fishing.', guess: '' },
        { task: 'Edwin likes climbing. He is good at it.', solution: 'Edwin is good at climbing.', guess: '' }
       ]"/>
</VueExercise> -->

<!--
<VueExercise instruction="Fill in the gaps">
<VueGaps gaptext="A nice {Lueckentext}" />
</VueExercise> -->
Raw vegetable food should be the only nourishment taken by man. The habit of eating
cooked food should be abandoned in this world once for all. This is the unerring demand of
nature. The consumption of cooked food is the most terrible barbarism in the history of
mankind, a barbarism that no one seems to be aware of and to which everybody falls an
unconscious victim. No matter how strange the idea may seem to some, it is the absolute truth
with which we cannot but acquiesce.
<VueExercise instruction="Make one sentence out of the two!">
Example:
<p>Cooking food is the greatest barbarism. No one seems to be aware of this.</p>
<p>Cooking food is the greatest barbarism that no one seems to be aware of.</p>

<VueWholeSentence :sentences="[
        { task: 'Going to the doctor is a risk. No one seems to be afraid of it.', solution: 'Going to the doctor is a risk that no one seems to be afraid of.', guess: '' },
        { task: 'Ones health is a gift. No one seems to care for it.', solution: 'Ones health is a gift that no one seems to care for.', guess: '' },
         { task: 'I hate the health insurance. I need to pay for it.', solution: 'I hate the health insurance that I need to pay for.', guess: '' }
       ]"/>
</VueExercise>


This truth became evident to me when, after 18 years of careful study and investigation, I
became convinced that the deaths of my 10-year-old son and 14-year-old daughter were caused
by unnatural nutrition. The great number of medical examinations carried out in Iran, France,
Germany and Switzerland in various attempts made to discover some specific disease in their
organisms and the subsequent administration of numerous remedies had a considerable share,
too, in bringing the tragedy to a head. My children died of the gradual emaciation and wasting
away of all their organs caused by unnatural feeding and poisonous medicines.

<VueExercise instruction="Transform these sentences into passive!">
Example:
<p>Unnatural nutrition caused the deaths of my children</p>
<p>The deaths of my children were caused by unnatural nutrition.</p>

<VueWholeSentence :sentences="[
        { task: 'Poisonous medicines killed my children.', solution: 'My children were killed by poisonous medicines.', guess: '' },
        { task: 'Unnatural feeding killed their organs.', solution: 'Their organs were killed by unnatural feeding.', guess: '' }
       ]"/>
</VueExercise>

I have been able to penetrate into the secrets of medical science and to observe its good and
bad aspects all the more clearly, because I have not been inspired by the prospect of becoming a
doctor or of making any financial gains. My incentive has been in the first place the wish to do my
best for the recovery of the health of my beloved children, and later the ardent desire to
perpetuate their memory by being useful to humanity.

<VueExercise instruction="Translate!">
Example:
<p>Ich spare Geld und Zeit, indem ich nicht zum Doktor gehe.</p>
<p>I save money and time by not going to the doctor.</p>

<VueWholeSentence :sentences="[
        { task: 'Ich bin freundlich zu meinen Zähnen, indem ich kein Obst esse.', solution: 'I am kind to my teeth by not eating fruits.', guess: '' },
        { task: 'Ich bleibe gesund, indem ich viel Wasser drinke.', solution: 'I stay healthy by drinking a lot of water.', guess: '' }
       ]"/>
</VueExercise>


Another factor which has contributed to my better realization. of the shortcomings of
medical science is the entirely new system by which I have carried out my studies by selfeducation,
free from the encumbrance of an academic programme. I have never become
intoxicated by the exaggerated claims of progress made on behalf of medical science or by all the
fanciful tales of the fabulous benefits to be derived from medicines. I have approached these
questions with a critical mind and have always laid greater stress on their shortcomings.

<VueExercise><VueQuestion lg="en" :question=" {
		question: 'What is true about the author?',
		type: 'multiple choice',
		options: [{option:'He has always trusted blindly, without thinking himself', correct: false },
     {option:'He has always been critical.', correct: true },
     {option:'He thinks that his children could have been saved with only the right dose of medicine', correct: false } 
     ]
	    }" :hasNextButton="false" /></VueExercise>


</div>


<div v-if="$route.params.page == 2">
Moreover, I have constantly kept in view the fact that, in spite of the existence of millions of qualified doctors and a large number of Nobel prize-winners,
civilized man falls victim to various illnesses more often than any other animals, and diseases like
sclerosis, diabetes, heart attacks and cancer increase at an alarming rate, threatening to wipe out
mankind from the face of the earth. I have not wasted my time in memorizing the symptoms of
diseases, the names and doses of medicines and those numerous complicated formulae that are
seldom needed, because I have never had the intention of sitting for examinations and obtaining
degrees. Instead, so far as possible, I have devoted my time to the study of a great many branches
of science and to the examination of the multifarious sources of knowledge, from the fundamental
and general principles of which I have been able to draw certain essential, vital conclusions.

<VueExercise><VueQuestion lg="en" :question=" {
		question: 'What is true about the author?',
		type: 'multiple choice',
		options: [{option:'He is jealous of all those doctors with their superb knowledge.', correct: false },
     {option:'He doubts whether modern medicine can be so great if so many deseases exist', correct: true }, 
     ]
	    }" :hasNextButton="false" /></VueExercise>

The results of 18 years of painstaking study and labor have been embodied in a work of two
large volumes, the first of which, a book of 568 pages, was published in Armenian in 1960.
<h2>The Efficient Operation of Every Factory is Subject to the
Uniform Supply of All the Raw Materials
Specified by the Engineer</h2>
Until the discovery of fire, along with the rest of the animal kingdom, man had developed
and carried out his evolution by the consumption of natural, raw nourishment. But since the
discovery of fire, without much reflection, men have put natural foodstuffs on the fire, have
destroyed their essential constituents, have debased them and have then nourished their bodies
with them. As a direct consequence, there have resulted all the diseases from which all mankind
suffer today.

<VueExercise instruction="Make one sentence out of the two!">
Example:
<p>Men discovered the fire. Then they put foodstuff on the fire.</p>
<p>After having discovered the fire, men put foodstuff on the fire.</p>

<VueWholeSentence :sentences="[
        { task: 'Men didn\'t reflect. Then they started to cook food.', solution: 'After not having reflected, men started to cook food.', guess: '' },
        { task: 'Men became ill. Then they continued to cook food.', solution: 'After having become ill, men continued to cook food.', guess: '' }
       ]"/>
</VueExercise>

The human organism is the masterpiece of nature. Man is the most complicated and the
most perfect living factory constructed by the unceasing efforts of nature over a period of 1.5
billion years. Simultaneously, with the construction of this factory, our wonderful nature has
made use of the rays of the sun to develop all the raw materials which are necessary to coordinate
the thousands of complicated operations of our organism and to ensure corresponding
production. Furthermore, nature has placed those raw materials in their entire perfection and in
the faultless harmony of their various constituents in a tiny grain of the corn, in a pulpy seed of
a pomegranate, in a berry of the grape or in a leaf of a plant. Each of the "paltry" foodstuffs taken
separately contains all those factors that are necessary to keep alive the living organism of a being
like man.

<VueExercise instruction="Fill in the gaps with the superlative of the adjective in brackets">
<VueGaps gaptext="Returning to raw and natural food would be {the best} (good) thing, that men could do. 
Continuing to eat cooked food would be {the most stupid} (stupid) thing, that a man could do.{}"/>
</VueExercise>


In the material world the smallest deviation from the details developed by an engineer for
the smooth working of the mechanism of a factory, or a fault in the raw materials specified to
ensure its normal productivity, results in a corresponding breakdown in the operation of the
plant. In the same way, the slightest deterioration or alteration in the raw materials prescribed by nature to ensure the
smooth operation of the complicated processes of the human organism causes disorders in the
normal biological functions of our organs and these disorders appear in the form of diseases.

<VueExercise><VueQuestion lg="en" :question=" {
		question: 'What does the author want to tell us?',
		type: 'multiple choice',
		options: [{option:'We don\'t have to pay attention to our nutrituion because there are doctors and dentists.', correct: false },
     {option:'That human bodies function in a sense like machines and need their proper fuel to function correctly', correct: true }, 
     ]
	    }" :hasNextButton="false" /></VueExercise>

The various methods employed by man in destroying or degenerating the fully-balanced
raw materials prescribed by nature for the normal operation of his organism do not bear
thinking. For that purpose, civilized man has invented demoniacal factories, ovens, furnaces and
kitchens. Every degeneration in the quality of natural foodstuffs is followed by a corresponding
degeneration in the human organism. Natural nutrition ensures the normal operation, of
our organism, while unnatural nutrition is followed by an abnormal discharge of its
functions. The multiplicity of illnesses is the result of the great diversity of degeneration in the
constituents of natural foodstuffs.        

<VueExercise instruction="Make one sentence out of the two! Use the gerund">
Example:
<p>So many people employed various methods to destroy food. The health insurance became more and more expensive.</p>
<p>With so many people employing various methods to destroy food, the health insurance became more and more expensive.</p>

<VueWholeSentence :sentences="[
        { task: 'So many people didn\'t think. So this increase of the health insurance could happen.', solution: 'With so many people not thinking, this increase of the health insurance could happen.', guess: '' },
        { task: 'The body doesn\'t get its proper nutrition. It doesn\'t function any more.', solution: 'With the body not getting its proper nutrition, it doesn\'t function any more.', guess: '' }
       ]"/>
</VueExercise>

Provided that all its needs are satisfied by the laws of nature, the human organism, which is
the most perfect organism in the animal kingdom, can live in excellent health from a
minimum of 150 years to a maximum of 200-250 years. Cooked foodstuffs force human
organs to work in several times their normal capacity, tire them out prematurely, cause various
illnesses and shorten man's life to a fraction of its normal span. In the present age of scientific
advance, man could get rid of all the diseases by complete abstinence from cooked food and
he could then devote his energies to the study of the problems of longevity only.
Simultaneously, with natural nutrition, man must also make certain that the rest of his
natural requirements are satisfied. These are clean air, early sleeping, early rising, physical
labor, abstinence from artificial heating, cleanliness, and so forth.

<VueExercise instruction="Make one sentence out of the two!">
Example:
<p>Illness is something expensive. Man could get rid of it.</p>
<p>Illness is something expensive that man could get rid of.</p>

<VueWholeSentence :sentences="[
        { task: 'Cooking is a time-wasting activity. Man should no longer devote his energy to it.', solution: 'Cooking is a time-wasting activity that man should no longer devote his energy to.', guess: '' }
       ]"/>
</VueExercise>

<h4>Direct and Indirect Nutritional Diseases</h4>
Nutritional diseases are divided into two main categories: direct and indirect
ailments. Direct nutritional diseases are those that are caused by a superabundance of certain
nutritional constituents or a deficiency of others. Fire and animal foodstuffs have the effect of
concentrating and increasing the proteins and the fats in the diet, while at the same time
eliminating substances of high nutritive value. Science has so far been able to recognize only a
negligible number of these substances, which have been named vitamins and without which
life cannot exist. Among the direct nutritional diseases are to be placed all chronic disorders
and deficiency diseases. The diseases develop with extreme slowness and secrecy. So long as the
disease has not entered its final stages and the organs have not stopped working, the individual
regards himself as healthy. In the event of partial and mixed vitamin deficiencies, the disease
does not appear by the symptoms particular to avitaminosis, that are described in
textbooks; rather it makes its appearance by complaints which are not easy to explain.

<VueExercise instruction="Fill in the gaps by it's or its">
<VueGaps gaptext="{It's} noon and I am eating my lunch. {Its} taste is good. {It's} made of lentils, beetroot, cellery root and barley. 
So I have just named all of {its} ingredients."></VueGaps>
</VueExercise>

<h3>Raw Eating</h3>
Indirect digestive ailments are the infectious diseases. In the human organism there
live usually a large variety of microbes which in normal circumstances render useful
service to the organism and which are subject to the control of specialized (differentiated)
human cells, to whose commands they compliantly submit. But through faulty nutrition the
degenerated and emaciated cells are so weakened that by the Law of Survival those
microbes get the upper hand, set themselves free from the control of those cells, rebel against
their masters, become pathogenic and cause the infectious diseases so well-known to us.
Sometimes the invading army of assailing microbes, which would have met with irresistible
opposition in a healthy organism and would have been destroyed at once, do not meet with
such opposition in an emaciated organism and causes its specific infection.

<VueExercise instruction="Practice the use of conditional sentences of type 3!">
<h4>Example:</h4>
I cooked the food. My children died. -> </br>
If I hadn't cooked the food, my children wouldn't have died.

<ol>

<li>I didn't eat any dandelions today. So I had to eat more grains.</li>
<li>I didn't read this book. I acquired an indirect digestive aliment.</li>
<li>I was not able to read English texts. I was not able to read this book.</li>
<li>My cells weren't obedient. So they refused my orders.</li>
</ol>

<VueHideShow>
<ol>
<li>If I had eaten more dandelions today, I wouldn't have had to eat so much grain.</li>
<li>If I had read this book, I wouldn't have acquired an indirect digestive aliment.</li>
<li>If I had been able to read English texts, I would have been able to read this book.</li>
<li>If my cells had been obedient, they wouldn't have refused my orders.</li>
</ol>
</VueHideShow>
</VueExercise>

In the second volume of my Armenian book, I have devoted considerable space to the
problem of infectious diseases, for the examination of which I have analyzed certain portions
of the first volume of the treatise on "Pathological Anatomy and the Pathogenesis of Human
Diseases" by the eminent Soviet scientist I.V. Davydovsky, published in 1956. By means of
numerous convincing facts, the author proves that it is not the microbes themselves that are
guilty of causing infectious diseases, but the poor condition of the body, the decline in its
power of immunity. But unfortunately, like all food addicts,* Davydovsky, too, is unable to
explain how we can restore that immunity or, better still, prevent its decline.

<VueExercise instruction="Use the simple past or present perfect!">
<VueGaps gaptext="I {have read}(read) this book, so now I know everything. Yesterday, someone
{told} (tell) me something interesting, but I {didn't listen} (not listen) because I only {tought} (think) about the book.
 ">

</VueGaps>
</VueExercise>



</div>

<div v-if="$route.params.page == 3">
The fear of microbes has so frightened men that to escape them they have recourse to
the most dangerous measures and yet they obtain entirely opposite results. The cooking of
raw foodstuffs in order to avoid microbes is one of the most fateful mistakes in medical
science. We cannot exterminate microbes from the face of the earth. They are found
everywhere, they will always exist and can enter our organisms through multifarious channels.
In particular, by cooking our food we first of all weaken the resistance of our cells and then we
destroy in our foodstuffs those natural antibiotics that are destined by nature to fight against
microbes. Even those doctors who are addicted to cooked food confirm that many vitamins,
which are destroyed on the fire, have bacterial properties. That is why animals that feed on
rubbish heaps are not nearly so subject to infectious diseases as man is.

<VueExercise instruction="Fill in the gaps by still, yet or already">
<VueGaps gaptext="Do you {still} eat cooked food after having read the first paragraphs of the book?
Indeed, I have {already} read these first paragraphs and I have understood them, and {yet}, I haven't managed {yet} to get rid of my old bad habits.">

</VueGaps>
</VueExercise>

<h2>The Cancer Cell is the Direct</h2>
<h3>Offspring of Degenerated Food</h3>
Many cooked-eaters are inclined to believe that because man has fed on cooked food for
centuries on end, he must be accustomed to it and may now suffer if he starts eating raw food
all at once. In other words, if we have filled a motor-car with dirty and inferior petrol for a certain time, the engine may have become used
to it and it may be damaged if the dirty petrol is replaced by clean fuel.

<VueExercise instruction="Fill in the gaps with all or every">
<VueGaps gaptext="{All} my life, I have cooked {all} the food to get rid of {all} the microbes. Ant yet, although I 
 killed {every} microbe, that might have been in the food, I was tired {all} day and {all} of my body was hurting. I repeat: {Every} limb of my body was aching. And I was addictive to sugar stuff. {Every} time I saw a cake I immediately had to eat it {all}.">
 </VueGaps>
</VueExercise>


First of all, a period of a few thousand years is nothing compared with the 1.5 billion years
during which, along with his ancestors, man lived and developed exclusively on raw food. Besides,
that man has not, in fact, become habituated to cooked food is proven by the very existence of
diseases, which disappear and the organism then returns to its normal functions once man has
recourse to raw nourishment.

<VueExercise instruction="Fill in the gaps with very, too or enough">
<VueGaps gaptext="I am {very} tired although it's only 8 p.m, because I have eaten {too} much cooked food.
Once and for all, I have {enough} of cooked food that only makes me {very} ill. I will from now on eat vegetables and grains to get {enough} nutrients.">

</VueGaps>
</VueExercise>


It is true that by the laws of evolution our organism tries to adapt itself to the food it
receives, but not in the way that some people imagine. Those nutritive constituents of food that
are essential for the complicated processes and the specialized major functions of the cells are
easily destroyed under the influence of fire. Therefore, the foodstuffs that are considered
nutritious by cooked-eaters lack those essential constituents, but instead they have an
abundant supply of proteins, fats and carbohydrates, several times in excess of the demands of
the cells.


</div>

<button @click="nextPageClicked">Next page</button>
</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueMcGaps from "./../../vue-mc-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";
import VueHideShow from "./../../vue-hideshow.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise,
     VueWholeSentence,
     VueHideShow
  },

  mounted(){
     console.log("The mounted function of VueRowFood was called!");
     
  },
  setup(){
   console.log("The setup function of VueRawFood  is executed!");
  },
  data(){
        return {
                numPages: 3
        };
  },
  methods: {
       nextPageClicked(){
      
      let page = parseInt(this.$route.params.page);
      if(page == this.numPages){
         alert("There is no next page!");
         return;
      }
      this.$router.push({ ...this.$route, params: { page: page +1 } });
      //this.$router.push("/french/alimentation/" + (page+1) );
    }
  }
}
</script>

<style scoped>



</style>