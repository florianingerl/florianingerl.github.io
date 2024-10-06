<template>
    <div>
    
    <h1>Mit Vögeln Äpfel teilen</h1>
    <h4><i>von Florian Ingerl und Marcia Poletti</i></h4>
    
    <img style="float: right; height: 200px" src="assets/img/deutsch/vogel.jpg"></img>

    Es war einmal ein Vogel, dessen Federn schwarz waren, und der Anton hieß.
Anton flog gerne in der Luft, aber an jenem Tag regnete es. Die Luft war nass und Anton mochte ausschlafen. Der Baum war grün und die Blumen waren schön. Anton war in dem Baum.

<VueExercise lg="de" instruction="Fülle die Lücken mit dem Artikel im Datif oder Akkusativ aus!">
<VueMCGaps lg="de" :gaptext="['Der Vogel sitzt auf {einem|einen} Ast.',
    'Der Vogel fliegt auf {einen|einem} Ast.',
    'Der Vogel wohnt in {dem|den} Baum.',
    'Der Vogel fliegt in {den|dem} Baum.']">

</VueMCGaps>
</VueExercise>

Leider konnte Anton nicht den ganzen Tag schlafen, denn er bekam Hunger.
Deswegen musste er losfliegen, um einen Wurm oder einen Apfel zu finden.
"Wo ist ein Apfel?" dachte Anton. Ich will einen schönen, roten Apfel essen. Anton sah einen großen Baum in dem Garten der Nachbarin. Anton flog zu dem (zu dem = zum) Baum und aß einen Apfel. In dem Apfel war ein Wurm. "Mmm" denkt Anton - "Nachtisch und Abendessen zusammen!".
<VueExercise lg="de" instruction="Fülle die Lücken mit der passenden Präposition und Artikel aus und kontrahiere Präposition und Artikel wie im Beispiel!">
<p>
    Beispiel: Ich gehe _______ Kino. -> Ich gehe ins (in das) Kino. 
</p>
    <VueMCGaps lg="de" :gaptext="['Der Vogel wohnt nicht {im} Zoo.',
        'Der Vogel fliegt {aufs} Dach.',
        '{Unterm} Baum liegen Äpfel.']">
</VueMCGaps>
</VueExercise>

Gerne hätte Anton den ganzen Tag Äpfel mit Würmern gegessen. Unglücklicherweise wollte die Nachbarin Apfelkuchen backen und brauchte deshalb alle Äpfel. Sie kam zum Apfelbaum spaziert mit einem Korb.
Ein Apfelkuchen braucht drei Äpfel. In dem Baum sind vier rote Äpfel (und ein Vogel). Die Nachbarin ist sehr verärgert! "Du stiehlst meinen Apfel!". Die Nachbarin verscheuchte den Vogel, aber Anton kam wieder. "Du hast vier rote Äpfel in dem ( in dem = im ) Baum. Wie viele Äpfel brauchst du?", "Ich habe einen großen Hunger. Wir müssen den Apfel teilen. Ich will Musik machen und du kannst einen Apfelkuchen backen, und wir werden glücklich zusammen leben..

<VueExercise lg="de" instruction="Fülle die Lücken mit dem Präteritum des entsprechenden Verbs aus!">
<VueMCGaps lg="de" :gaptext="['Der Vogel {stahl} (stehlen) einen Apfel.',
    'Der Vogel {flog} (fliegen) in den Süden.',
    'Der Vogel {kam} (kommen) in den Garten.',
    'Die Nachbarin {fuhr} (fahren) ihr Enkelkind zur Schule.'
]">

    </VueMCGaps>
</VueExercise>

"Dein Vorschlag, lieber Vogel, gefällt mir nicht!" Mit diesen Worten lehnte die Nachbarin
den Vorschlag von Anton verärgert ab. "Ich will die Äpfel nicht mit Vögeln wie dir teilen! Ich brauche Apfelkuchen für meine Enkelkinder!"
In diesem Moment, eine madchen kommt in der garten. "Oma" schien das madchen "Wo ist dich?'
"Ich bin hier in der garten. Ich will der vogel verschenchen."
"Oma, das ist nicht schon, das ist eklig.Wir mussen mit der vogel etwas teilen".
Das Oma denke ein bisschen. "Ein Apfel mit ein wurm ist eklig. Ich will nicht ein Apfel mit ein wurm. Der vogel kann der Apfel mit der wurm essen. Iche will mit anderen Apfel backen ein Apfelkuche, und wir werden die Apfelkuche essen unter der baum.
"Veilen danke" sagen der vogel und das madchen zusamen!. 
"Humph" denke die alt Frau "Ich will nicht gern mein Apfel teilen, aber ich liebe meine enkeltochter"



    
    
    </div>
    
    
    </template>
    
    <script>
    import VueHideShow from "./../../vue-hideshow.vue";

import VueExercise from "./../../vue-exercise.vue";

import VueMCGaps from "./../../vue-mc-gaps.vue";
    
    export default {
      
      components: {
         VueExercise,
         VueHideShow,
         VueMCGaps,
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
                   
            };
      },
      methods: {
           
      }
    }
    </script>
    
    <style scoped>
    
    
    
    </style>

