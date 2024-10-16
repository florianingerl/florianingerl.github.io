<template>
<div>

<h1>Le négation en espagnol</h1>
<h4><i>by Florian Ingerl and Olivia Voisin</h4>


<p>
Remettez les mots de la phrase en le bon ordre!
Voilà le vocabulaire nécessaire pour passer le test:
</p>

<h3>ya no = ne plus</h3>

<p class="exemple">
Exemple :  <br/>
Ya no quiero esperar.
</p>

<h3>nigúno = aucun</h3>

<p class="exemple">
Exemple : <br/>
No quiere leer nigúno libro.
</p>

<h3>Nada = rien</h3>

<p class="exemple">
Exemple : <br/>
No tengo dinero y no puedo comprar nada.
</p>

<h3>Nunca = jamais</h3>

<p class="exemple">
Exemple : <br/>
Nunca voy al cine.
</p>

<h3>Nadie = personne</h3>

<p class="exemple">
Exemple : <br/>
Nadie sabe la repuesta.
</p>




<VueExercise lg="fr" :topics="['la négation en espagnol']" instruction="Mets les mots de la phrase au bon ordre!">
<VueWordOrder lg="fr" :sentences="['Ningúno de estos ninos quiere comer esta manzana',
'No hace nada.',
'El médico no recibe a nadie hoy',
'Este perro de ojos azules no tiene buena salud.',
'El alumno nunca regala chocolates a su profesora',
'La muchacha no va de vacaciones este verano.',
'No quiero nada.',
'Yo no voy al cine esta noche. Yo tampoco.',
'No tomes ningúnas de éstas zanahorias, estan demasiadas maduras.',
'No quiero leer ningún libro.',
'Nadie me regala un libro.',
'Ningún profesor sabe la respuesta.',
'La niña no come su zanahoria.',
'Mi perro ya no es joven.',
'No tengo un hermano.',
'El niño no quiere dormir.',
'A ninguna mujer le gusta.',
'El niño no quiere comer nada.'
'El hombre nunca quiere una mujer estúpida.'
'Nadie le da dinero.']">

</VueWordOrder>
</VueExercise>

</div>

</template>

<script>
import VueGaps from "./../../vue-gaps.vue";
import VueMcGaps from "./../../vue-mc-gaps.vue";
import VueQuestion from "./../../vue-question.vue";
import VueExercise from "./../../vue-exercise.vue";
import VueWholeSentence from "./../../vue-whole-sentence.vue";
import VueWordOrder from "./../../vue-word-order.vue";
import VueHideShow from "./../../vue-hideshow.vue";
import VueMCGaps from "./../../vue-mc-gaps.vue";

export default {
  
  components: {
     VueGaps,
     VueQuestion,
     VueExercise,
     VueWholeSentence,
     VueHideShow,
     VueWordOrder,
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
h3 {
    color: red;
}

.exemple {
    color: blue;
}


</style>

