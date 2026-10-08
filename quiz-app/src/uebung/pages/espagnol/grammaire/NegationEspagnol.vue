<template>
<div>

<h1>Le négation en espagnol</h1>
<h4><i>by Florian Ingerl and <a href="https://www.professeurparticulier.com/voir-les-coordonnees-refK8jxCGxMMx37WoM6qFxCMzp2Unqi95JJ4T7wqu82S10FgCBw7Y.html">Olivia Voisin</a></i></h4>


<p class="instruction">
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
'El alumno nunca regala chocolates a su profesora.',
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
'El niño no quiere comer nada.',
'El hombre nunca quiere una mujer estúpida.',
'Nadie le da dinero.']">

</VueWordOrder>
</VueExercise>

</div>

</template>

<script setup lang="ts">
import VueExercise from "../../../atoms/VueExercise.vue";
import VueWordOrder from "../../../atoms/VueWordOrder.vue";
</script>

<style scoped>
h3 {
    color: red;
}

.exemple {
    color: blue;
}

.instruction {
  background-color: yellow;
  color: black;
}


</style>
