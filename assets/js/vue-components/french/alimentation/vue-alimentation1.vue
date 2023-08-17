<template>
<div v-if="$route.params.page == 1">

    Cette académie est le fruit d’expériences et de recherches personnelles. Son but
    est de vous transmettre des connaissances et mon vécu afin de vous aider à
    sillonner vers l’équilibre.
    <VueExercise instruction="Remplis les trous avec ce,cet ou cette">
    <VueGaps gaptext="Je ne comprends pas {cette} paragraph ci-dessus. {Cet} équilibre dont l'auteur parle, je n'y crois pas.
    {Cet} aide que l'auteur m'offre, je n'en veux pas parce que j'aurais besoin de lire {ce} livre pour apprendre {ces} connaissances
    dont il parle.{}" /> </VueExercise>
Je souhaite vous donner l’envie de trouver cette santé radieuse qui nous a été
promise, que ce soit par la culture de la terre, par la passion des abeilles, ou par
mes recettes de crusine. Nul doute que nos amies Joie et Santé sont là, en nous,
alors laissons-les s’exprimer.
<VueExercise instruction="Remplis les trous avec les corrects propositions à,de ou en ou rien du tout!">
<VueGaps gaptext="Maintenant, ca devient intéressant et j'ai envie {de} continuer {à} lire maintenant.
Je donne {à} l'auteur un peu {de} conviance. J'ai conviance {en} lui. Je laisse moi simplement {} surprendre.
Je m'attends {à} apprendre beaucoup {de} choses.{}" /> </VueExercise>

L’alimentation vivante est pour moi une voie incontournable, mais ne vous attendez
pas à ce que je vous dicte un protocole strict. Chacun doit trouver sa formule et il
me semble important de vous préciser que les écarts font aussi partie du chemin.
Vous allez découvrir le cadre alimentaire qui permettra à votre organisme de
carburer à son optimum. Sachez, que l’alimentation vivante est un des facteurs
importants dans le processus de régénération, mais qu’il n’est pas le seul. Alors
n’oubliez pas de dormir, de prendre l’air et le soleil, d’entretenir de bonnes relations
et d’avoir une activité physique adaptée.
<VueExercise instruction="Remplis les trous avec de la, du, des, de l' ou simplement de!">
<VueGaps gaptext="À partir de maintenant, je ferai {du} sport. Mais seulement assez {de} sport. Pas trop {d'} activité physique.
Je respirai plus profondement à partir de maintenant pour me donner plus {de l'} air. À partir de maintenant,
je me demeure souvent en dehors pour me donner {du} soleil. Je ne lirai que les livres qui me donnent
{de la} joie.{}" /> </VueExercise>

Ce qui importe, c’est d’être à l’écoute de son ressenti, de comprendre les
processus en cours, et de prendre les meilleures décisions pour soi-même.
Je suis une passionnée qui souhaite un monde joyeux et en bonne santé. Et
vous ?
<VueExercise instruction="Remplis les trous avec ce qui, ou ce que!">
<VueGaps gaptext="À partir de maintenant, je m'en fiche de {ce que} les prof à l'école et mes parents disent à propros de ma santé
et je vais faire attention à {ce que} mon propre corps me dit. {Ce qui} me donne des conseils, je l'écouterai bien sûr mais
je déciderai moi-même de suivre les conseils ou pas.{}" /> </VueExercise>

Mettons-nous toutes et tous au service de la vie.
</div>

<div v-if="$route.params.page == 2">
<h3>Qu'est-ce que l'Hygiénisme ?</h3>
L'hygiénisme est l'art de vivre en bonne santé par le respect des lois de
la nature et par la bonne connaissance des aliments spécifiques à
l'espèce humaine.
Cette conception est révolutionnaire parce qu'elle est aux antipodes des modes de
pensée habituels.
Contrairement à la médecine officielle qui traite les symptômes, l’Hygiénisme part
du principe de supprimer la cause pour faire disparaitre l'effet.
<VueExercise><VueQuestion :question=" {
		question: 'Qu\'est-ce que l\'hygiénisme?',
		type: 'multiple choice',
		options: [{option:'L\'art de suivre les conseils du médecin', correct: false },
     {option:'L\'art de suivre les lois de la nature', correct: true }, 
     ]
	    }" :hasNextButton="false" /></VueExercise>
L’hygiénisme est donc un enseignement tiré directement de l’observation des Lois
de la vie. En un mot, c'est un véritable art de vivre.
L'Hygiénisme enseigne les principes de base pour tous, mais chacun doit doser
chaque facteur de santé selon son propre pouvoir d'assimilation et devenir ainsi
l'artisan de sa santé.
<VueExercise instruction="Remplis les trous avec tout,toute,tous,toutes ou chaque!">
<VueGaps gaptext="{Tout} ce que je viens de lire me semble logique. {Chaque} phrase fait du sens.
Dans {toute} ma vie, je n'ai jamais entendu parler de {tout} cela. {Toute} ma santé depend aussi
de mon alimentation.{}" /> </VueExercise>



</div>

<button @click="nextPageClicked">Page suivante</button>

</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise
  },

  mounted(){
     console.log("The mounted function of VueConditionnel1 was called!");
     
  },
  setup(){
   console.log("The setup function of VueConditionnel1  is executed!");
  },
  data(){
   return {
      numPages : 2
   };
  },
  methods: {
    nextPageClicked(){
      
      let page = parseInt(this.$route.params.page);
      if(page == this.numPages){
         alert("Il n'y a pas de page suivante");
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