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
    topics: [
      "Wechselpräpositionen",
      "Dativ",
      "Akkusativ"
    ],
    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau hat ihre Hand unter {ihrem|ihr} Kinn!"
  },
  {
    topics: [
      "Wechselpräpositionen",
      "Dativ",
      "Akkusativ"
    ],
    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau legt ihre Hand unter {ihr|ihrem} Kinn."
  },
  {
    topics: [
      "Wechselpräpositionen",
      "Dativ",
      "Akkusativ"
    ],
    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Das Auto fährt schon seit 100km auf {der} langen Straße."
  },
  {
    topics: [
      "Wechselpräpositionen",
      "Dativ",
      "Akkusativ"
    ],
    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Das Auto biegt in {die|der} Straße ein!"
  },
  {
    topics: [
      "Wechselpräpositionen",
      "Dativ",
      "Akkusativ"
    ],
    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Die leckeren Nudeln noch in {der|die} Maschine."
  },
  {
    topics: [
      "Wechselpräpositionen",
      "Dativ",
      "Akkusativ"
    ],
    instruction: "Ist die Präposition gefolgt vom Akkusativ oder vom Dativ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Die leckeren Nudeln fallen aus der Maschine heraus und auf {den|dem} Tisch."
  },
  {
    topics: [
      "Futur 1"
    ],
    instruction: "Konjugiere werden für das Futur 1 !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Ich {werde} auf den Baum klettern."
  },
  {
    topics: [
      "Futur 1"
    ],
    instruction: "Konjugiere werden für das Futur 1 !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Die vier Männer {werden} ihren Urlaub zusammen genießen."
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Ein Tourist fotografiert die 4 Männer. {Die 4 Männer werden von einem Touristen fotografiert.}"
  },
  {
    topics: [
      "Futur 1"
    ],
    instruction: "Konjugiere werden für das Futur 1 !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {wird} nicht jünger werden."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {ist} schön."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Ich {bin} in meinem roten Auto."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Du {bist} ein guter Koch ."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Wir {sind} im Schatten des Baumes."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Diese Männer {sind} Freunde."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Ihr {seid} nicht so schön wie diese Frau."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {ist} jung."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Du {bist} in meinem roten Auto."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Die leckeren Nudeln {sind} noch in der Maschine."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Wir {sind} unter einem Baum."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Die vier Männer {sind} nicht dick"
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Deine Frau und du {seid} deutsch."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {ist} schön."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Ich {bin} in meinem roten Auto."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Du {bist} ein guter Koch ."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Wir {sind} im Schatten des Baumes."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Diese Männer {sind} Freunde."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Ihr {seid} nicht so schön wie diese Frau."
  },
  {
    topics: [
      "Kausalsätze mit weil,da,denn,deshalb,nämlich",
      "Neben-und unterordnende Konjunktionen"
    ],
    instruction: "Nämlich, denn oder deshalb!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau verdreht den Männern die Köpfe. Sie ist {nämlich|deshalb|weil} sehr schön."
  },
  {
    topics: [
      "Kausalsätze mit weil,da,denn,deshalb,nämlich",
      "Neben-und unterordnende Konjunktionen"
    ],
    instruction: "Nämlich, denn oder deshalb!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Das Auto ist sehr günstig. {Deshalb|Nämlich|Weil} ist es sehr begehrt.."
  },
  {
    topics: [
      "Kausalsätze mit weil,da,denn,deshalb,nämlich",
      "Neben-und unterordnende Konjunktionen"
    ],
    instruction: "Nämlich, denn oder deshalb!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Ich brauche keine Nudelmaschine, {weil|deshalb|nämlich} ich nur Getreidebrei esse."
  },
  {
    topics: [
      "Kausalsätze mit weil,da,denn,deshalb,nämlich",
      "Neben-und unterordnende Konjunktionen"
    ],
    instruction: "Nämlich, denn oder deshalb!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Ich muss mich in den Schatten eines Baumes setzen. Es ist {nämlich|weil|deshalb} sehr heiß."
  },
  {
    topics: [
      "Präpositionen des Ortes"
    ],
    instruction: "Finde die richtige Präposition des Ortes!",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Der Hut ist {auf} dem Kopf von dem Mann mit der Jeansjacke."
  },
  {
    topics: [
      "Modalverben"
    ],
    instruction: "Fülle die Lücke mit der richtigen Konjugation von können, dürfen oder müssen !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {kann} Spanisch sprechen."
  },
  {
    topics: [
      "Modalverben"
    ],
    instruction: "Fülle die Lücke mit der richtigen Konjugation von können, dürfen oder müssen !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Das Auto {kann} 200km/h fahren."
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/coche.jpg",
    gapText: "Deine Mutter fährt das Auto. {Das Auto wird von deiner Mutter gefahren.}"
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Ich benutze die Nudelmaschine. {Die Nudelmaschine wird von mir benutzt}."
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Der Forster fällt den Baum. {Der Baum wird von dem Forster gefällt.}"
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Der Regen gießt den Baum.{Der Baum wird von dem Regen gegossen.}"
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/fahrraeder.png",
    gapText: "Die Frau folgt dem Mann. {Der Mann wird von der Frau gefolgt.}"
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/picknick.png",
    gapText: "Die Frau streichelt den Hund. {Der Hund wird von der Frau gestreichelt.}"
  },
  {
    topics: [
      "Passiv"
    ],
    instruction: "Forme den Passivsatz !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/volleyball.png",
    gapText: "Der Spieler schlägt den Ball. {Der Ball wird von dem Spieler geschlagen.}"
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Die Nudeln {sind} noch in der Maschine."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/botella.jpg",
    gapText: "Die Flasche {ist} grün."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/piso.jpg",
    gapText: "Dank der Putzfrau {ist} der Boden wieder sauber {geworden} (werden)."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/34203.gif",
    gapText: "Nachdem der Mann {geschlafen hat} (schlafen), muss er die Straße putzen."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Das Öl {ist} nicht richtig durch die Maschine {geflossen} (fließen}. Deshalb ist sie jetzt verstopft."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Die Männer {sind} zusammen in den Urlaub {geflogen} (fliegen)."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/hombres.jpeg",
    gapText: "Die Männer {sind} alle gleich groß."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/36473.gif",
    gapText: "Die Frau mit ihren Koffern {ist} schnell."
  },
  {
    topics: [
      "Konjugation des Verbs sein"
    ],
    instruction: "Konjugiere sein !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/34203.gif",
    gapText: "Der Bauarbeit {ist} betrunken."
  },
  {
    topics: [
      "Konjugation von haben"
    ],
    instruction: "Konjugiere haben !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/96735.jpg",
    gapText: "Der Einbrecher {hat} eine große Nase."
  },
  {
    topics: [
      "Konjugation von haben"
    ],
    instruction: "Konjugiere haben !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/arbol.jpg",
    gapText: "Der Baum {hat} eine grüne Krone und einen braunen Stamm."
  },
  {
    topics: [
      "Präsens"
    ],
    instruction: "Konjugiere im Präsens !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/maccina.jpg",
    gapText: "Die Nudeln {fallen} (fallen) auf den Tisch."
  },
  {
    topics: [
      "Präsens"
    ],
    instruction: "Konjugiere im Präsens !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/36132.gif",
    gapText: "Das Telefon {macht} (machen) viel Lärm."
  },
  {
    topics: [
      "Präsens"
    ],
    instruction: "Konjugiere im Präsens !",
    type: "gapText",
    imageUrl: "assets/img/spanisch/32850.gif",
    gapText: "Die Maus {kratzt} (kratzen) sich mit der Hand am Kopf."
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Traduis ! La femme aime se regarder dans le miroir.",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "{Die Frau schaut sich gern im Spiegel an.}\n"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Traduis ! Selma aime les lunettes de Harry Potter.",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/9e/a8/V4C87aZUTBT3t7Ku.jpg",
    gapText: "{Selma mag die Brille von Harry Potter.}"
  },
  {
    topics: [],
    instruction: "Konjugiere im Präteritum !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/9e/a8/V4C87aZUTBT3t7Ku.jpg",
    gapText: "Harry Potter {studierte} (studieren) in Hogwarts, der besten Schule in England für Hexerei und Zauberei."
  },
  {
    topics: [
      "Präteritum"
    ],
    instruction: "Konjugiere im Präteritum !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/46/51/7PvlbZzh.jpg",
    gapText: "Das Baby {schlug} (schlagen) mit der Faust gegen die Wand."
  },
  {
    topics: [
      "Präteritum"
    ],
    instruction: "Konjugiere im Präteritum !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/92/a6/bIvvaLIU.jpg",
    gapText: "Die Boxer{bekämpften} (bekämpfen) sich 3 Stunden lang."
  },
  {
    topics: [
      "Präteritum"
    ],
    instruction: "Konjugiere im Präteritum !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/4e/2b/cadzuZVup7fOMpPA0OQi.jpg",
    gapText: "Die Frau {trug} (tragen) rote Boxhandschuhe."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/46/51/7PvlbZzh.jpg",
    gapText: "Der Boxer hat {schon} seine Boxhandschuhe angezogen und ist {schon} bereit zum Kampf."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/4e/2b/cadzuZVup7fOMpPA0OQi.jpg",
    gapText: "Die Boxerin mit den rooten Handschuhen muss {erst} das Finale gewinnen, bevor sie Weltmeisterin ist."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/81/2a/1sXb6kmCCNcGGZhHW1B1.jpg",
    gapText: "Die grüne Partei hat {nur} 12 Prozent der Stimmen bekommen."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/1c/d8/I8BLx9nGnJVB.jpg",
    gapText: "Man sollte {erst} heiraten und dann {erst} Kinder kriegen."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/71b2873e478b9d8d0482ea3ec777ba7f/d6/7b/la1zOSdIYzQKVx0B.jpg",
    gapText: "Obelix sollte sich {erst} die Hände waschen, bevor er zu essen anfängt."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/75/a4/QxwGueIm1NgeZmS3hK6.jpg",
    gapText: "Idefix hat {nur} einen Helm als Bettersatz ?"
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/43/60/LTIQ3WXDNuwOyO3.jpg",
    gapText: "Miraculix hat {schon} viele Haare verloren."
  },
  {
    topics: [
      "Schon, erst oder nur"
    ],
    instruction: "Schon, erst oder nur ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/fe/fe/vFr4uKPN54zFCG4.jpg",
    gapText: "Ronaldo muss {erst} trainieren, bevor er mit seiner Frau essen gehen kann."
  },
  {
    topics: [
      "Fragen,bitten,verlangen oder erfordern"
    ],
    instruction: "Fragen,bitten,verlangen oder erfodern?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Es {erfordert} Mut, diese Frau um ein Date zu {bitten}. Man kann sie höflich {fragen}, ob sie heute Abend Zeit hat, um Essen zu gehen. Aber man kann nicht von ihr {verlangen}, dass sie Ja sagt."
  },
  {
    topics: [
      "(Sich) fühlen,riechen,stinken,spüren,fühlen"
    ],
    instruction: "(Sich) fühlen,riechen,stinken oder spüren?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Lisa {fühlt} sich gut. Um nicht zu {stinken}, hat sie gerade eben geduscht und ihre Haare {riechen} noch nach dem Shampoo. Sie {spürt} das Verlangen, ihr Shampoo ihrer Freundin zu empfehlen."
  },
  {
    topics: [
      "Stellen oder stehen"
    ],
    instruction: "Stellen oder stehen ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {steht} vor der Kamera. "
  },
  {
    topics: [
      "Stellen oder stehen"
    ],
    instruction: "Stellen oder stehen ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {stellt} sich vor die Kamera."
  },
  {
    topics: [
      "Legen oder liegen"
    ],
    instruction: "Legen oder liegen ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/46/8f/xenr5clK6aiVBiPl5q.jpg",
    gapText: "Nach seiner Rede {legt|liegt} der Politiker das Mikrofon zurück auf den Tisch."
  },
  {
    topics: [
      "Legen oder liegen"
    ],
    instruction: "Legen oder liegen ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/a9/21/6XGGFLgv.jpg",
    gapText: "Die Antwort {liegt|legt} dem Primer Minister auf der Zunge."
  },
  {
    topics: [
      "Stellen oder stehen"
    ],
    instruction: "Stellen oder stehen ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/46/51/7PvlbZzh.jpg",
    gapText: "Sein Gegner {steht|stellt} vor ihm."
  },
  {
    topics: [
      "Stellen oder stehen"
    ],
    instruction: "Stellen oder stehen ?",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/13/55/kpmTcUXmyB0mkifX.jpg",
    gapText: "Der Trainer hat die Trinkflaschen in die Ecke {gestellt|gestanden}."
  },
  {
    topics: [
      "Setzen oder sitzen"
    ],
    instruction: "Setzen oder sitzen ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {setzt|sitzt} sich auf den Stuhl."
  },
  {
    topics: [
      "Setzen oder sitzen"
    ],
    instruction: "Setzen oder sitzen ?",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau {sitzt|setzt} auf dem Stuhl."
  },
  {
    topics: [
      "gehängt oder gehangen"
    ],
    instruction: "Gehängt oder gehangen",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Frau hat ihre Jacke in den Schrank {gehängt|gehangen}."
  },
  {
    topics: [
      "gehängt oder gehangen"
    ],
    instruction: "Gehängt oder gehangen",
    type: "gapText",
    imageUrl: "assets/img/spanisch/bonitamuyer.jpg",
    gapText: "Die Jacke der Frau ist im Schrank {gehangen|gehängt}."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/89/ec/jk9zROLk7STQJZ70UXD.jpg",
    gapText: "Pawel {ist} schonmal in einem ähnlichen LKW gefahren."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/ee/31/h33ZeOCjrSAbLuq.jpg",
    gapText: "Der alte Simpson {ist} einen Marathon gelaufen."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/67/03/WDOJDAFb.jpg",
    gapText: "Die Affen {sind} im Pool geschwommen."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/67/03/WDOJDAFb.jpg",
    gapText: "Die Affen {haben} im Pool zusammen eine tolle Zeit gehabt."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/ee/31/h33ZeOCjrSAbLuq.jpg",
    gapText: "Der alte Simpson {hat} während dem ganzen Marathon überhaupt nichts getrunken."
  },
  {
    topics: [
      "Perfekt"
    ],
    instruction: "Konjugiere im Perfekt !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/89/ec/jk9zROLk7STQJZ70UXD.jpg",
    gapText: "Die Fahrer beider Wagen {haben} viel Benzin verbraucht."
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Mögen oder gern machen",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d6b0ce929193df3c242ac34b5654d2ce/33/4e/cz2ZXNVTD0edMr29IOG.jpg",
    gapText: "Ali dribbelt gerne. {Ali mag Dribbeln}"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Traduis ! La femme aime se regarder dans le miroir.",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/42/88/qxtto1Rv07.jpg",
    gapText: "Das Mädchen mag Schokolade. (essen) { Das Mädchen isst gerne Schokolade.}\n"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Traduis ! La femme aime se regarder dans le miroir.",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/8ce8357c78ea940b9c2015daf05ce1a5/3a/bb/6yzLkao7LkD2sWKS4.jpg",
    gapText: "Er mag Computerspiele. (spielen) {Er spielt gern Computerspiele.}"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Dis-le d'une autre manière avec gerne !",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/2711dd8a75a85be822d136ec94899b3f/00/dd/cczqaY3azsTw.jpg",
    gapText: "Die Katze mag Komiks. (lesen) {Die Katze liest gerne Komiks.}"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Dis-le d'une autre manière avec gerne ! Suject + verb + adverbe (gern) + ",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/3e/ec/NC2TNM6yoJZ8.jpg",
    gapText: "Der Mann mag Tennis. (spielen) { Er spielt gerne Tennis.}"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Dis-le d'une autre manière avec gerne ! Suject + verb + adverbe (gern) + nom",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/39/7e/aIfSn7Ul.jpg",
    gapText: "Die Männer mögen Basketball. (spielen) {Die Männer spielen gerne Basketball.}"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Dis-le d'une autre manière avec gerne ! Suject + verb + adverbe (gern) + nom",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/f87f46a2c5aeaeed4c68910815f73eaf/e5/b1/OF2DHkRu.jpg",
    gapText: "Die Frau mag Volleyball. (spielen) { Die Frau spielt gerne Volleyball.}"
  },
  {
    topics: [
      "Mögen oder gern machen"
    ],
    instruction: "Dis-le d'une autre manière avec gerne ! Suject + verb + adverbe (gern) + nom",
    type: "gapText",
    imageUrl: "https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/e8/54/O0PGx8sQrT5XsRstd.jpg",
    gapText: "Der Mann mag Fahrrad fahren. {Der Mann fährt gerne Fahrrad.}"
  }
],
    };
  },
 
};
</script>

<style scoped>

</style>