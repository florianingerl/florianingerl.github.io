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
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34187.gif",
    gapText: "il politco, la testa, il brazo, parlare, urlare, il microfono, arrabiato, azurro, blanco, agitato, l'argumento",
    topics: [
      "Vocabuli di Ezquiel"
    ],
    instruction: "Fai una frase con i vocabuli ché Ezquiel ti ha dato !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "la donna, la signora, giovane, bello/a, pollaca, bionda, guardare, sembrare, occhi, orecchi, mani, vertirsi, i capelli, lungo, lunghi, ",
    topics: [
      "Vocabuli di Ezquiel"
    ],
    instruction: "Fai una frase con i vocabuli ché Ezquiel ti ha dato !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/piso.jpg",
    gapText: "la sedia, il tavolo, il divano, la lampara, il cuadro, l'immagine, pianta, coperta, tapeto, coperta, finestra, armadio, sole, cielo, aria, spazio, abitare, cuscino, dormire, lavorare, televisione, mangiare, grande, piccolo, bello, verde, arancione, elegante, pulito,   ",
    topics: [
      "Vocabuli di Ezquiel"
    ],
    instruction: "Fai una frase con i vocabuli ché Ezquiel ti ha dato !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34203.gif",
    gapText: "L'uomo, dormire, bere, lavorare, stare=yacer , stanco, giallo, capello=sombrero, i piedi, azurro, rosso, bianco, cemento, sacchi, respirare, grigio, sognare, il sogno, bottiglia, lo stomaco,  ",
    topics: [
      "Vocabuli di Ezquiel"
    ],
    instruction: "Fai una frase con i vocabuli ché Ezquiel ti ha dato !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "i capelli corti, giovane, la barba, serio, l'allenatore, il giocatore, calcio, pallone, allenarsi=entrenarse, ",
    topics: [
      "Vocabuli di Ezquiel"
    ],
    instruction: "Fai una frase con i vocabuli ché Ezquiel ti ha dato !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Quando mia nonna {era} (essere) giovane, {era} (essere) bella.",
    topics: [
      "Imperfetto"
    ],
    instruction: "Konjugiere im Imperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34187.gif",
    gapText: "Il politico {parlava} (parlare) con una voce molto forte.",
    topics: [
      "Imperfetto"
    ],
    instruction: "Konjugiere im Imperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34203.gif",
    gapText: "Essendo che il suo padrone non lo {guardava}, il muratore {stava} (stare) dormendo.",
    topics: [
      "Imperfetto"
    ],
    instruction: "Konjugiere im Imperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/piso.jpg",
    gapText: "Il sole {lasciava} (lasciare) entrare molta luce.",
    topics: [
      "Imperfetto"
    ],
    instruction: "Konjugiere im Imperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34187.gif",
    gapText: "Parlando con una voce molto forte, il politico {alzava} (alzare) anche il suo braccio senza pausa.",
    topics: [
      "Imperfetto"
    ],
    instruction: "Konjugiere im Imperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/fahrraeder.png",
    gapText: "L'uomo e sua moglie {avevano fatto} (fare) un giro lungo e quindi erano stanci.",
    instruction: "Konjugiere im Plusquamperfekt !",
    topics: [
      "Plusquamperfekt"
    ]
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Anton e i suoi amici stavano giocando con il pallone che gli {aveva offerto} (offrire) suo padre. ",
    topics: [
      "Plusquamperfekt"
    ],
    instruction: "Konjugiere im Plusquamperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34203.gif",
    gapText: "Questo muratore ha devuto dormire perché {aveva bevuto} (bere) troppo vino.",
    topics: [
      "Plusquamperfekt"
    ],
    instruction: "Konjugiere im Plusquamperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Quest'albero non anchora aveva frutti perché lo {avevo piantato} (piantare) soltanto due anni fa.",
    topics: [
      "Plusquamperfekt"
    ],
    instruction: "Konjugiere im Plusquamperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/34190.gif",
    gapText: "Questo pompiere è arrivato perché {era stato chiamato} (chiamare-Passiv) .",
    topics: [
      "Plusquamperfekt"
    ],
    instruction: "Konjugiere im Plusquamperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Non mi piaceva la pasta che {aveva produtta} (produrre) questa macchina.",
    topics: [
      "Plusquamperfekt"
    ],
    instruction: "Konjugiere im Plusquamperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/22278.jpg",
    gapText: "Non mi piaceva la pasta che {aveva produtta} (produrre) questa macchina.",
    topics: [
      "Plusquamperfekt"
    ],
    instruction: "Konjugiere im Plusquamperfekt !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/9e/a8/V4C87aZUTBT3t7Ku.jpg",
    gapText: "Il libro che Harry legge ha 300 pagine.{il quale|la quale|i quali|le quali}",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Ersetze che durch il quale,la quale,i quali oder le quali !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/925f17378dd1893b674a723c07535afe/1d/9b/RlD7nCgh.jpg",
    gapText: "Il professor Silente che è il ottimo mago del mundo ha una barba molto lunga. {il quale|la quale|i quali,le quali}",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Ersetze che durch il quale,la quale,i quali oder le quali !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/f9/97/dvvZX3qpeuDerxv.jpg",
    gapText: "I tortellini che il ragazzo non vuole mangiare sono troppo picanti.{i quali|le quali|il quale|la quale}.",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Ersetze che durch il quale,la quale,i quali oder le quali !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/d7/dd/ur8vjyafdRGn.jpg",
    gapText: "Harry leggette una lettera di Ron che gli aveva dato il suo gufo Edvige. {la quale|il quale|i quali|le quali}",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Ersetze che durch il quale,la quale,i quali oder le quali !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/97/7f/IhL5kQM0qKhOR.jpg",
    gapText: "Ci sono cuattro cavalleri sulla scacchiera che possono saltare sopra i altri pezzi.{i quali|le quali|il quale|la quale}",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Ersetze che durch il quale,la quale,i quali oder le quali !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/8ce8357c78ea940b9c2015daf05ce1a5/cd/35/V8UulugehPVt74LF6.jpg",
    gapText: "Crabbe e Goyle che sono i amici di Malfoy non sono molto intelligenti.{i quali|le quali|il quale|la quale}",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Ersetze che durch il quale,la quale,i quali oder le quali !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/33/4e/cz2ZXNVTD0edMr29IOG.jpg",
    gapText: "Anton {colui|colei} che è un buono giocatore di calcio non perde mai il pallone.",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Colui oder Colei ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/28/ac/c2spneAq48r8Q.jpg",
    gapText: "CR7 {colui|colei} que sta  ridendo sull'imagine non è più un giocatore di calcio di Real Madrid.",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Colui oder Colei ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/c5/15/Atjl9i06i0RF.jpg",
    gapText: "La madre {colei|colui} sta parlando con il suo telefono non ha voglia di giocare a calcio con suo figlio.",
    topics: [
      "Relatifpronomen"
    ],
    instruction: "Colui oder Colei ?"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "Questo giocatore di calcio è giovane {e} (und) può correre.",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/9e/a8/V4C87aZUTBT3t7Ku.jpg",
    gapText: "Hermine sa come pronunciare questo incantesimo guistamente {e} (und,et) Harry lo sa {anche} (auch,aussi).",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/27/8b/obhjelvhefyai5I4.jpg",
    gapText: "A Harry non piacionno {né} le pene che gli dà il professor Piton {né} quando Piton ride sopra i suoi pozioni cattivi.\n(weder noch, ni...ni )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/d6/f7/rxoB9uCZcx3rUaiB.jpg",
    gapText: "Hermione è molto intelligente {nonché} bella.\n(et en plus, und außerdem)",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/ce286d05b8e1a47cd4f32b0e1b6dec0e/d7/34/rzjvoOAE.jpg",
    gapText: "La professora McGonagall non può decidere come penare il suo studente Harry. Gli dare molti compiti {o} non gli dar il permesso di andare al villaggio Hogsmeade.   (oder)",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/8ce8357c78ea940b9c2015daf05ce1a5/93/3d/VcRI1su5ZNHSblICJD.jpg",
    gapText: "Harry giocarà il partito di Quidditch {sia} Piton farà il arbito {sia} non lo farà. (Ob .... oder nicht )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/a15b48460c436e1e92c85ffc680932cc/56/3b/dXID7uNgYTiWwtp4Hv.jpg",
    gapText: "Ron vuole essere famoso come il suo amico Harry {ma} non lo è. (aber, mais, but, pero )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/c4/cb/tiRMtfmExo7eLsDGl.jpg",
    gapText: "{Invece di} lasciare il serpente in pace il cugino Dudley di Harry golpa contra la finestra della gabbia senza pausa.\n(statt, en lugar de, instead of, au lieu de )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/6a/61/VOtiTITpnF1dizL4EP.jpg",
    gapText: "Allo zio Vernon non piace la magia, {anzi} la odia. (au contraire, im Gegenteil)",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/d0/8d/l4grzG9bmIv0.jpg",
    gapText: "Ai Dursley non piace Harry, {tuttavia} gli permettono d'abitare con loro. (Nichtsdestotrotz, still, nevertheless, toutefois )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/cb/92/GqBRMSObsm5EElHikhUq.jpg",
    gapText: "I Dursley non sono pobri , {infatti} hanno molti soldi. (In fact, en effet, tatsächlich )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/98/c0/sVHJW2mIPu5WjM0cm.jpg",
    gapText: "Petunia è la zia di Harry, {cioè} la sorella di sua madre. (c'est à dire, das heißt )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/75/d1/d32T4ZL6k2b4BQ.jpg",
    gapText: "A Harry non hanno piacuto le parole si sua zia Marge, {quindi} ha lanciato una maldizione a lei. {Folglich, Donc, Also, So)",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/49/28/sCgO4A47iyg2g.jpg",
    gapText: "Gringotts non era più un luogo sicuro per la pietra filosofale,{perciò} ne la hanno salita Harry e Hagrid. (That's why, c'est pourquoi, Deswegen )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/b2/cb/pHCIvPqC12z2wYkd8.jpg",
    gapText: "Ron ha rotto la sua bacchetta di magia, {quindi} ha bisogna di una nuova. (Folglich, Donc, So , Entonces )",
    topics: [
      "Vokabeln - Nebenordnende Konjunktionen"
    ],
    instruction: "Traduis les conjonctions de coordination !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/39/4a/Lsbqe2CmgqwM4heXIiss.jpg",
    gapText: "Quest'uomo sempre lava il suo unico dento {afinché} non lo perda come gli altri. (damit, afin que, so that )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/e1b92bb53e0c9e442408bc677a56c789/cc/b4/YhvT1NU4lFp1ouIXAZ.jpg",
    gapText: "{Benché }sia notte, Spongebob non è anchora stanco. (Obwohl, Although, Bien que, aunque)",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/8c/8e/3eWDeQGeTKpME7.jpg",
    gapText: "{Dacché} questo maniaco è libero, tutti sono in peligro. (depuis, seit, since, desde )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/7b/59/IfO8y4dz4OCD5Mf.jpg",
    gapText: "{Dopo ché} Sirius s'è transformato in un cane, s'è escapato del prigion di Azkaban. (Nachdem, Après que, After, después)",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/d1/de/fBMGBekGb0uUOxFC7cb.jpg",
    gapText: "Ron et Hermione non aspettano {finché} il serpente li mangii. (Jusqu'à ce que, bis, hasta, until )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/4f/03/p3ZpuQx7hcQJpt.jpg",
    gapText: "Il gufo ha aperto i sui occhi {perché} vuole vedere tutti i topi. (weil, parce que, porque, because )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/7d/17/4MrBL3lP.jpg",
    gapText: "Questo gufo non vuole uscire, {piuttosto ché} vuole cerare anche l'altro occo e dormire. (plutôt que, vielmehr)",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/a15b48460c436e1e92c85ffc680932cc/c2/0f/w5hkdO90OQDGgP1.jpg",
    gapText: "{Prima ché} il gato possa mangiare un topo, ne deve trovare uno. (Avant que, Bevor, Before )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/9294a2e836d178ddc22430dd7765727e/62/5d/i4ZkZAT0S2B9wV5LN.jpg",
    gapText: "Hermione fa sempre i suoi compiti {talché} i professori sono sorpresi dalla sua intelligenzia. (de sorte que)",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/33/8c/nY7XT7GMPL6kRCzF.jpg",
    gapText: "{Quando} Hagrid disse a Harry che era un mago, Harry fu molto sorpreso. (Quand, Als, When )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/85/2e/PHOg318kgMV8RZOXnw.jpg",
    gapText: "{Mentre} il tren va alla scuola Hogwarts, gli studenti si vestono. (Während,While, Pendant que, Mientras)",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/f1/84/4jvAqLMy4dZPV7Ta.jpg",
    gapText: "{Ogni volta che} Harry ritorna a Hogwarts dai Dursley, diventa felice. (Chaque fois que, Jedesmal wenn )",
    topics: [
      "Unterordnende Konjunktionen"
    ],
    instruction: "Übersetze !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "{Il} giocatore di calcio si chiama Ivan Botella.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/9e/a8/V4C87aZUTBT3t7Ku.jpg",
    gapText: "Harry ha comprato {la} sua bacchetta magica nel negozio de Ollivander.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/925f17378dd1893b674a723c07535afe/1d/9b/RlD7nCgh.jpg",
    gapText: "{Gli} studenti non fanno sempre quello ché ha detto il professor Silente.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/d4/3d/4MIz2RXb.jpg",
    gapText: "{I} capelli di Harry sono neri.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/27/8b/obhjelvhefyai5I4.jpg",
    gapText: "{Lo} studente che il professor Piton preferisce sempre si chiama Draco Malfoy.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/71b2873e478b9d8d0482ea3ec777ba7f/0b/2d/p9dRtrVvu9YCj2fHKsp.jpg",
    gapText: "{L'} amico di Harry si chiama Ronald Weasley.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/a0/db/PyaHBxeP8agDO.jpg",
    gapText: "Il segnor Ollivander vende soltanto {le} bacchette magiche che ha fabricate se stesso.",
    topics: [
      "Bestimmer Artikel"
    ],
    instruction: "Setze den richtigen bestimmten Artikel ein !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/d0/8d/l4grzG9bmIv0.jpg",
    gapText: "Harry non manda mai una lettera ai Dursley. Harry mai manda {loro} una lettera.",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/9e/a8/V4C87aZUTBT3t7Ku.jpg",
    gapText: "Harry lanca un incantesimo a Draco Malfoy. Harry {gli} lanca un incantesimo.",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/d6/f7/rxoB9uCZcx3rUaiB.jpg",
    gapText: "Hermione spiega a Harry e Ron come si pronuncia quest'incantesimo. Hermione {lo} spiega a {loro}.",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/df/d7/bF94xAjupFFMoLYzh.jpg",
    gapText: "Il famoso giocatore di Quidditch Victor Krum ha chiuso a Hermione se {gli} permetterebbe di andare con {lei} a la fiesta.",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/56/c1/qb1cfUCF378h.jpg",
    gapText: "Nelle lezione di pozioni Hermione è seduta vicino a Neville e {lo} aiuta sempre con i suoi pozioni.",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/f0/71/474tKmgQdL81c6.jpg",
    gapText: "Hermione va in un ristorante, ordena una biera e {la} beve.",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/d0/8d/l4grzG9bmIv0.jpg",
    gapText: "Abbiamo fame. Abbiamo bisogno di la cena. Alora Harry, {falla} (fare) !",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/bd/62/PT0Xgb62MpCMJMbtliaA.jpg",
    gapText: "I miei denti hanno bisogno di essere lavato. Alora Harry, {lavalli} (lavare) !",
    topics: [
      "Direkte und indirekte Personalpronomen"
    ],
    instruction: "Find the correct direct or indirect pronoun !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "Non {conosco} (io) il nome di questo giocatore di calcio.",
    topics: [
      "Conoscere o sapere"
    ],
    instruction: "Conoscere o sapere ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/c9/65/Gch0YhNanlbfr.jpg",
    gapText: "Quello che ha visto i film di Harry Potter {conosce} tutte le persone sull'immagine.",
    topics: [
      "Conoscere o sapere"
    ],
    instruction: "Conoscere o sapere ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/f87f46a2c5aeaeed4c68910815f73eaf/bb/b7/HQbCbnPh.jpg",
    gapText: "Normalmente, i giocatori di Quidditch non {sanno} giocare a calcio.",
    topics: [
      "Conoscere o sapere"
    ],
    instruction: "Conoscere o sapere ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/f87f46a2c5aeaeed4c68910815f73eaf/bb/b7/HQbCbnPh.jpg",
    gapText: "Ron gioca meglio a scacchi {che|di} a Quidditch.",
    topics: [
      "Comparatif"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/da290b156d64898341638f3c299e7478/98/ef/eyRt5xjT5n9Y.jpg",
    gapText: "Il ragazzo sulla sua scopa sta superiore {dei nubi|che i nubi}.",
    topics: [
      "Comparatif"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/8a/58/SI2AaejvMWQ4e.jpg",
    gapText: "Ron è cosi buono {come|quanto} Oliver Wood quando è in forma.",
    topics: [
      "Comparatif"
    ],
    instruction: "Fill in the gaps !"
  },
  {
    type: "gapText",
    imageUrl: "assets/img/spanisch/jugadordefutbol.jpg",
    gapText: "Ieri Ivan Botella ha giocato tanto bene come se {fosse|era} il fratello di Lionel Messi.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/b4/18/9XnvbbLbLGQ4z3E8XG1.jpg",
    gapText: "La bacchetta magica scelglie il mago quasi {potesse|può} pensare se stesso.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/b4/18/9XnvbbLbLGQ4z3E8XG1.jpg",
    gapText: "Communque {sia|è} la bacchetta magica che sceglie Harry, Harry ha abbastanza soldi nel banco Gringotts per comprarla.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/27/8b/obhjelvhefyai5I4.jpg",
    gapText: "A Harry non piace il modo in cui lo {pune|puna|punisse} il professore Piton.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/27/8b/obhjelvhefyai5I4.jpg",
    gapText: "Harry fa i compiti di pocioni come gli {ha|avesse} detto il professore Piton.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/58/88/8XwmLyfZNTESBkOMKNla.jpg",
    gapText: "Harry teme che il suo gufo Edvige non {ritorni|ritorna}.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/7b/df/4SVr8VXKG9kPwrQEX.jpg",
    gapText: "Che i gati non {sappiano|sanno} leggere, tutti lo sanno.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/7b/df/4SVr8VXKG9kPwrQEX.jpg",
    gapText: "Tutti sanno che i gati non {sanno|sappiano} leggere.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/c1/87/dqUExlIf8aYK1KINdbz9.jpg",
    gapText: "Tutti sanno che i cani {sono|fossero} i megliori amici dei humani.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/c1/87/dqUExlIf8aYK1KINdbz9.jpg",
    gapText: "Che i cani {siano|sonno} i melgiori amici dei humani, tutti lo sanno.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/c1/87/dqUExlIf8aYK1KINdbz9.jpg",
    gapText: "Nessuno pensava che {posso|possa} insegnare al mio cane come stare in piedi.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/c1/87/dqUExlIf8aYK1KINdbz9.jpg",
    gapText: "Che {possa|posso} insegnare al mio cane a stare in piedi, nessuno lo pensava.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/5b/cb/ObR6SQGxZjE7V.jpg",
    gapText: "Nel supermercato, mi hanno affermato con certezza che le patate {sono|siamo} di qualità bio.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/5b/cb/ObR6SQGxZjE7V.jpg",
    gapText: "Che le patate {siamo|sono} di qualità bio, mi lo hanno affermato con certezza nel supermercato.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/feea28532d9709f5128558f418c779d0/dc/22/XNuoBiu82NCK7ckAG.jpg",
    gapText: "Che {sia|sei} un pedone di mele, lo ho intuito perché ci sono sempre mele vicino di te.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  },
  {
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/feea28532d9709f5128558f418c779d0/dc/22/XNuoBiu82NCK7ckAG.jpg",
    gapText: "Ho intuito che {sei|sia} un pedone di mele perché si sono sempre mele vicino di te.",
    topics: [
      "Konjunktiv oder Indikativ"
    ],
    instruction: "Konjunktiv oder Indikativ ?"
  }
],
    };
  },
 
};
</script>

<style scoped>

</style>