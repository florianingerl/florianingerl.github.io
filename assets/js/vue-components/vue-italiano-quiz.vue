<template>
    <vue-quiz :lg="lg" :questions="questions"></vue-quiz>
</template>

<script>
import VueQuiz from "./vue-quiz.vue";

export default {

  components: {
    
    VueQuiz ,
  
  },

  props: ['lg'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       questions: 
[
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "È un giocatore di calcio ? {Sì|Si}."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/chilis.jpg",
    gapText: "Carla {si|sì} compra spesso chili perché {si|sì} gli piacciono molto."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/botella.jpg",
    gapText: "Carla {dà|da} una bottiglia di vino a sua madre per il suo compleanno."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "L'albero {dà|da} i frutti in agosto."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Né mio padre {né|ne} io mangiamo la pasta."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "La macchina non ha bisogno di bere {tè|te} ma di benzina."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Sei una bella donna. Voglio uscire con {te|té}."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Dopo della festa, Carla se {ne|né} è andata in macchina."
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "{Se|Sé} guardo un albero, sono felice."
  },
  {
    topics: [
      "Metterci or volerci"
    ],
    instruction: "Fill in the gap with the right conjugation of metterci or volerci!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "{Ci vogliono|Ci metto} cuatro cinque ore per andare da Roma a Milano in macchina."
  },
  {
    topics: [
      "Metterci or volerci"
    ],
    instruction: "Fill in the gap with the right conjugation of metterci or volerci!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "{Ci metto|Ci vogliono} due ore per andare della mia casa fino a questo albero."
  },
  {
    topics: [
      "Esserci"
    ],
    instruction: "Fill in the gaps using esserci !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "{Ci sono|c'è} quattro uomini nell’immagine."
  },
  {
    topics: [
      "Esserci"
    ],
    instruction: "Fill in the gaps using esserci !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "{C'è|Ci sono} soltanto una donna nell'immagine."
  },
  {
    topics: [
      "Esserci"
    ],
    instruction: "Fill in the gaps using esserci !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/botella.jpg",
    gapText: "{Ci sono|C'è} anchora botellas nell'armadio ? Sí, {ce n'è una|ci ne sono due}."
  },
  {
    topics: [
      "Esserci"
    ],
    instruction: "Fill in the gaps using esserci !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball",
    gapText: "{Ci sono|C'è} persone nel campio di volley che stanno giocando ? Sì, {ce ne sono cuattro|ne ci sono cuattro}."
  },
  {
    topics: [
      "Tanto,troppo,poco,molto"
    ],
    instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Non è {troppo} caldo per giocare a volley."
  },
  {
    topics: [
      "Tanto,troppo,poco,molto"
    ],
    instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Non è {troppo} caldo per giocare a volley."
  },
  {
    topics: [
      "Tanto,troppo,poco,molto"
    ],
    instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Non ho {molta} voglia di giocare a volley oggi perché è {molto} caldo ."
  },
  {
    topics: [
      "Tanto,troppo,poco,molto"
    ],
    instruction: "Fill in the gaps using tanto,troppo.poco or molto !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Se il uomo tutto a sinistra dice qualcosa, i altri tre cuattro uomi ci credono sempre {}"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Ezquiel ha comprato questa rossa macchina. {Questa rossa macchina è stata comprata da Ezquiel.}",
    topics: [
      "Passiv"
    ],
    instruction: "Form the passiv sentence !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "Mia madre {non} sà giocare a calcio e mia sorella {neanche}.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps with nessun,nessuno/a,niente,neanche,nemmeno,mai,mica,affatto,non,non...più,neppure !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/botella.jpg",
    gapText: "{Non} bevo qualcosa di molto forte come Wodka e {nemmeno} vino.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps with nessun,nessuno/a,niente,neanche,nemmeno,mai,mica,affatto,non,non...più,neppure !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34190.gif",
    gapText: "Il pompiere {non} ha {mai} rifiutato lavorare quando una casa era in fiamme.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps with nessun,nessuno/a,niente,neanche,nemmeno,mai,mica,affatto,non,non...più,neppure !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/32850.gif",
    gapText: "Sai {mica} come si chiama questo topo ? No, {non} mi piacciono {mica} tanto i comics. ",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps with nessun,nessuno/a,niente,neanche,nemmeno,mai,mica,affatto,non,non...più,neppure !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/96735.jpg",
    gapText: "Al ladro non gli piace {affatto} lavorare. Quindi preferisce rubare.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps with nessun,nessuno/a,niente,neanche,nemmeno,mai,mica,affatto,non,non...più,neppure !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Sai {mica|niente} come piantare un'albero? Non lo so {mica|nulla} ma ho un seme.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/botella.jpg",
    gapText: "Non bevo {niente|nessuno} di forte come la Wodka e {neanche|mica} come il vino.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "{Nessuno|Niente} può giocare come questo giocatore di calcio.",
    topics: [
      "Verneinung"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34187.gif",
    gapText: "Vieni a ascoltare il politico ? No, {non ci vado} perché il politico non racconta mai la verità.",
    topics: [
      "Ci"
    ],
    instruction: "Reply to the question !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/96735.jpg",
    gapText: "Vieni con me in una casa dove sono nascosti molti soldi ? No, {non ci vengo} perché non voglio rubare.",
    topics: [
      "Ci"
    ],
    instruction: "Reply to the question !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/36473.gif",
    gapText: "Va la donna in Germania ? Sì, {ci va} domani.",
    topics: [
      "Ci"
    ],
    instruction: "Reply to the question !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/chilis.jpg",
    gapText: "I chili crescono in Africa ? No, {non ci crescono} lì.",
    topics: [
      "Ci"
    ],
    instruction: "Reply to the question !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Vuoì andare in Italia in macchina con me ? Sì, {ci voglio andare}.",
    topics: [
      "Ci"
    ],
    instruction: "Reply to the question !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "{Ho dovuto} (dovere) nascondermi dietro del albero perché ho avevo paura dei cani.",
    topics: [
      "Passato prossimo con potere,volere,dovere"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Quest'uomi {hanno dovuto} (dovere) tomare il avione per andare in Africa.",
    topics: [
      "Passato prossimo con potere,volere,dovere"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/pisodemoneda.jpg",
    gapText: "Oggi Anton {ha potuto} (potere) ganare un po' di soldi.",
    topics: [
      "Passato prossimo con potere,volere,dovere"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Oggi Anton {ha potuto} (potere) ganare un po' di soldi.",
    topics: [
      "Passato prossimo con potere,volere,dovere"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/pisodemoneda.jpg",
    gapText: "Non {perdere} (perdere} il tuoi soldi.",
    topics: [
      "Imperatif"
    ],
    instruction: "Konjugiere im Imperatif !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "{Mostrate} (mostrare) la vostra ottimma risa.",
    topics: [
      "Imperatif"
    ],
    instruction: "Konjugiere im Imperatif !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "{Sii} (essere) patiente se vuoi diventare un buono giocatore di calcio come Ivan Botella.",
    topics: [
      "Imperatif"
    ],
    instruction: "Konjugiere im Imperatif !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/pisodemoneda.jpg",
    gapText: "{Da'} (dare - tu) un po' di soldi ai bambini.",
    topics: [
      "Imperatif"
    ],
    instruction: "Konjugiere im Imperatif !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/botella.jpg",
    gapText: "{Abbi} (avere-tu) la forza di non bere troppo vino.",
    topics: [
      "Imperatif"
    ],
    instruction: "Konjugiere im Imperatif !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34203.gif",
    gapText: "L'uomo {dormì} (dormire) invece di lavorare.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Un'uomo forte {portò} (portare) la macchina fino a sul tavolo.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/piso.jpg",
    gapText: "Mia sorella non {potette} (potere) decidersi di comprare questa casa.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/96735.jpg",
    gapText: "In questa notte, il ladro {volle} (volere) rubare molte bottiglie di vino veccio.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34190.gif",
    gapText: "Il pompiere {avanzò} (avanzare) fino al cuore del fuoco.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "Questo giocatore di calcio {tolse} (togliere) i capelli se stesso ieri.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Quest'amici {giocarono}(giocare) a volley ieri.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/chilis.jpg",
    gapText: "Anton e suo padre {mangiarono} (mangiare) alcuni chili picanti la settimana passata.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "Tutti i giocatori della scuadra {si lavarono} (lavarsi) i occhi per meglio sentire i istruzioni del suo padrone.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Tutti i arboli {perdettero} (perdere) i suoi foglii ieri.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/pisodemoneda.jpg",
    gapText: "Ieri {perdei} (perdere) tutti i miei soldi nella strada.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "L'anno passato, quest'uomi {andarono} (andare) insieme in vacanze.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "La pasta {fu} (essere) fatta dalla macchina.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Ieri, {condussi} (condurre) al lavoro con la macchina rossa di mio padre.",
    instruction: "Conjugate in the simple past !",
    topics: [
      "Passato semplice"
    ]
  }
],
    };
  },
 
};
</script>

<style scoped>

</style>