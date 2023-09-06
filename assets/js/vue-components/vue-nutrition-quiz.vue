<template>
    <vue-quiz :lg="lg" :questions="questions"></vue-quiz>
</template>

<script>

export default {

  components: {
    
    VueQuiz : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-quiz.vue', options)),
  
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
		question: "Wie heißt dieses Gemüse?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "How do you call this vegetable?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: [{ option : "Tomate", correct: false }, { option : "Roote Beete", correct: true }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},

	{
		question: "Wie heißt dieses Gemüse?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "How do you call this vegetable?",
		imageUrl: "assets/img/rawfood/kohlrabi.jpg",
		type: "multiple choice",
		options: [{ option : "Kartoffel", correct: false }, { option : "Kohlrabi", correct: true }],
		optionsFr : [{ option : "pomme de terre", correct: false }, { option : "chou-rave", correct: true }],
		optionsEn: [{ option : "potato", correct: false }, { option : "kohlrabi", correct: true }],
		correct: 1
	},

	{
		question: "Was eignet sich zur Wasseraufbereitung?",
		questionFr : "Quel instrument est utile pour améliorer la qualité de l'eau?",
		questionEn : "Which instrument is useful to improve the quality of water?",
		imageUrl: "assets/img/rawfood/wasserwirbler.png",
		type: "multiple choice",
		options: [{ option : "Wasserwirbler", correct: true }, { option : "Sirup", correct: false }],
		optionsFr: [{ option : "un tourbillon d'eau", correct: true }, { option : "sirop", correct: false }],
		optionsEn: [{ option : "un tourbillon d'eau", correct: true }, { option : "sirop", correct: false }],
		correct: 0
	}
	,
	{
		question:"In welcher Form sollte man Getreide laut dem Rohkost-Guru Dr. Schnitzer am besten essen?",
		questionFranc: "Sous quelle forme est-ce qu'on dois manger les céréales selon le guru d'alimentation crue Dr. Schnitzer?",
		questionEn: "Under which form should you eat grain according to the Raw Food-Guru Dr.Schnitzer?",
		imageUrl: "assets/img/rawfood/weizensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "als Getreidebrei oder als Keimlinge", correct: true }, { option : "Brot", correct: false }, { option : "Nudeln", correct: false }],
		optionsFr: [{ option : "purée ou graines germés", correct: true }, { option : "pain", correct: false }, { option : "nouilles", correct: false }],
		optionsEn: [{ option : "as sprouts", correct: true }, { option : "bread", correct: false }, { option : "pasta", correct: false }],
		correct: 0
	},
	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		questionFr: "Quel ingrédient ne se trouve pas dans un purée de céréales?",
		questionEn: "Which ingredient doesn't belong to a porridge of grains?",
		type: "multiple choice",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		options: [{ option : "Roggen", correct: false }, { option : "Haselnüsse", correct: false }, { option : "Apfel", correct: false }, { option : "Marmelade", correct: true }, { option : "Leinsamen", correct: false }],
		optionsFr: ["seigle","noisette", "pomme", "confiture","graine de line"],
		optionsFr:  [{ option : "seigle", correct: false }, { option : "noisette", correct: false }, { option : "pomme", correct: false }, { option : "confiture", correct: true }, { option : "graine de lin", correct: false }],
		optionsEn:  [{ option : "rye", correct: false }, { option : "hazelnuts", correct: false }, { option : "apple", correct: false }, { option : "marmelade", correct: true }, { option : "linseeds", correct: false }],
		correct: 3

	},
	{
		question: "Warum fügt ein Rohköstler seinem Getreidebrei Hanfsprossen hinzu?",
		questionFr: "Pourquoi un crusinier ajoute-t-il des pousses de chanvre à son purée de céréales? ",
		questionEn: "Why does a raw fooder add hempsprouts to his porridge of grains?",
		imageUrl: "assets/img/rawfood/hanfsprossen.jpg",
		type: "multiple choice",
		options: [{ option : "wegen der berauschenden Wirkung", correct: false }, { option : "wegen dem vielen Fett und dem würzigen Geschmack", correct: true }],
		optionsEn: [{ option : "wegen der berauschenden Wirkung", correct: false }, { option : "wegen dem vielen Fett und dem würzigen Geschmack", correct: true }],
		optionsFr: [{ option : "wegen der berauschenden Wirkung", correct: false }, { option : "wegen dem vielen Fett und dem würzigen Geschmack", correct: true }],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		question: "Comment est-ce qu'on appelle ce légume?",
		questionEn: "What is the name of this vegetable?",
		imageUrl: "assets/img/rawfood/rotkohl.jpg",
		type: "multiple choice",
		options: [{ option : "Rotkohl", correct: true }, { option : "Weißkohl", correct: false }, { option : "Grünkohl", correct: false }],
		optionsFr: [{ option : "Rotkohl", correct: true }, { option : "Weißkohl", correct: false }, { option : "Grünkohl", correct: false }],
		optionsEn: [{ option : "Rotkohl", correct: true }, { option : "Weißkohl", correct: false }, { option : "Grünkohl", correct: false }],
		correct: 0
	},
	
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/knollensellerie.jpg",
		type: "multiple choice",
		options: [{ option : "Knollensellerie", correct: true }, { option : "Radiesschen", correct: false }],
		correct: 0
	},
	
	{
		question: "Wie schmeckt roote Beete?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: [{ option : "bitter", correct: false }, { option : "süß", correct: true }, { option : "scharf", correct: false }],
		correct: 1
	},
	{
		question: "Sprossen aus Leinsamen sind wertvoll, weil sie viel Fett enthalten. Wie schmecken wohl Leinsamensprossen?",
		imageUrl: "assets/img/rawfood/leinsamensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "scharf", correct: false }, { option : "wie Schokolade", correct: true }],
		correct: 1
	},
	{
		question: "Wie schmeckt Kresse?",
		imageUrl: "assets/img/rawfood/kresse.jpg",
		type: "multiple choice",
		options: [{ option : "scharf", correct: true }, { option : "bitter", correct: false }, { option : "süß", correct: false }],
		correct: 0
	},

	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Wasser", correct: false }, { option : "Dinkel", correct: false }, { option : "Milch", correct: true }, { option : "Sonnenblumenkerne", correct: false }, { option : "Himbeeren", correct: false }],
		correct: 2
	},

	{
		question: "Wie heißt dieser Salat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: [{ option : "Zuckerhut", correct: false }, { option : "Kopfsalat", correct: false }, { option : "Chicoree", correct: false }, { option : "Endiviensalat", correct: true }],
		correct: 3
	},

	{
		question: "Wie schmeckt Endiviensalat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: [{ option : "süß", correct: false }, { option : "bitter", correct: true }, { option : "scharf", correct: false }],
		correct: 1
	},

	{
		question: "Warum werden Rohköstler satt?",
		imageUrl: "assets/img/rawfood/kichererbsensalat.jpg",
		type: "multiple choice",
		options: [{ option : "Weil sie tonnenweise Salat essen", correct: false }, { option : "Weil sie Sprossen aus Getreide und Hülsenfrüchten essen", correct: true }],
		correct: 1
	},



	{
		question: "Woran erkennt man laut dem Rohkost-Guru und Zahnarzt Dr. Schnitzer am eindeutigsten, dass der Mensch ein Fruchtesser (Samen, Wurzelknollen, Blattschösslinge) ist?",
		imageUrl: "assets/img/rawfood/johannschnitzer.gif",
		type: "multiple choice",
		options: [{ option : "an der Länge seines Darms", correct: false }, { option : "an seinem Gebiss", correct: true }, { option : "an der chemischen Zusammensetzung der Magensäure", correct: false }],
		correct: 1
	},


	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/weißkohl.jpg",
		type: "multiple choice",
		options: [{ option : "Rotkohl", correct: false }, { option : "Weißkohl", correct: true }],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/steckrübe.jpg",
		type: "multiple choice",
		options: [{ option : "Gelbe Rübe", correct: false }, { option : "Rote Rübe", correct: false }, { option : "Steckrübe", correct: true }],
		correct: 2
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/weißkohlsalat.jpg",
		type: "multiple choice",
		options: [{ option : "Weißkohl", correct: false }, { option : "Weizen", correct: false }, { option : "Roote Beete", correct: false }, { option : "Karotte", correct: true }, { option : "Süßlupinen", correct: false }],
		correct: 3
	},
	
	{
		question: "Sollte man zu einer Mahlzeit auch was trinken? Welche Aussage ist richtig?",
		imageUrl: "assets/img/rawfood/verredeleau2.png",
		type: "multiple choice",
		options: [{ option : "Nein, weil man Geld sparen kann, wenn man im Restaurant nichts zu Trinken bestellt.", correct: false }, { option : "Nein, weil es die Magensäure verdünnt.", correct: true }, { option : "Ja, weil Säfte und Energie-Drinks gut für die Zähne sind.", correct: false }],
		correct: 1
	},
	
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/rotkohlsalat.JPG",
		type: "multiple choice",
		options: [{ option : "Gerste", correct: false }, { option : "Rotkohl", correct: false }, { option : "Linsen", correct: false }, { option : "Gurke", correct: true }, { option : "Rote Beete", correct: false }],
		correct: 3
	},
	{
		question: "Wasser macht verschiedene Kristalle, je nachdem wie man es vorher behandelt? Mit welcher Musik wurde dieses Wasser bespielt?",
		imageUrl: "assets/img/rawfood/mozartsymphonie40.png",
		type: "multiple choice",
		options: [{ option : "The Rolling Stones - I can't get no satisfaction", correct: false }, { option : "Mozart - Symphonie 40", correct: true }],
		correct: 1
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/knollenselleriesalat.jpg",
		type: "multiple choice",
		options: [{ option : "Knollensellerie", correct: false }, { option : "Bockshornklee", correct: false }, { option : "Tomate", correct: true }, { option : "Weizen", correct: false }, { option : "Karotte", correct: false }],
		correct: 2
	},
	{
		question: "Warum essen Rohköstler Rohkost?",
		imageUrl: "assets/img/rawfood/rohkost.png",
		type: "multiple choice",
		options: [{ option : "um gesund und leistungsfähig zu sein", correct: true }, { option : "Wegen ihrer Allergien vertragen sie gute, normale Ernährung nicht. Sie bräuchten viel Geld und Zeit, um ihre Allergien von einem guten Medizyniker behandeln zu lassen", correct: false }],
		correct: 2
	},

	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/steckrübensalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßlupinen", correct: false }, { option : "Karotte", correct: false }, { option : "Steckrübe", correct: false }, { option : "Petersilie", correct: true }, { option : "Weizen", correct: false }],
		correct: 3
	},
    {
		question: "Warum schwitzen Rohköstler nachts (und auch sonst) nicht?",
		imageUrl: "assets/img/rawfood/schwitzen.png",
		type: "multiple choice",
		options: [{ option : "Weil bei ihnen die Ausscheidung von Giftstoffen über die Haut nicht funktioniert", correct: false }, { option : "Weil in Getreidebrei, Gemüse, Sprossen und Wildkräutern keine Gifte zum Ausscheiden über die Haut drin sind", correct: true },
		{ option: "Weil sie so wenig trinken, dass ihr Körper keine Flüssigkeit mehr hergeben kann.", correct: false }],
		correct: 3
	},

	{
		question: "Welche Zutat ist nicht in diesem Getreidebrei?",
		imageUrl: "assets/img/rawfood/roggenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Roggen", correct: false }, { option : "Hanf", correct: false }, { option : "Erdbeeren", correct: true }, { option : "Braunhirse", correct: false }, { option : "Sonnenblumenkerne", correct: false }],
		correct: 2
	},
	{
		question: "Wo kann man keimfähiges Getreide, Hülsenfrüchte und Ölsaaten online bestellen?",
		imageUrl: "assets/img/rawfood/demeterhofschwab.png",
		type: "multiple choice",
		options: [{ option : "Demeterhof Schwab", correct: true }, { option : "Wiesenhof", correct: false }],
		correct: 0
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/salatmitspeisewicke.jpg",
		type: "multiple choice",
		options: [{ option : "Blaukraut", correct: false }, { option : "Roggen", correct: false }, { option : "Pastinake", correct: false }, { option : "Speisewicke", correct: false }, { option : "Basilikum", correct: true }],
		correct: 4
	},
	{
		question: "Warum sind Rohköstler 365 Tage 24 h im Jahr gesund und leistungsfähig?",
		imageUrl: "assets/img/rawfood/loewenzahn.png",
		type: "multiple choice",
		options: [{ option : "Weil sie mehr als 500 Euro im Monat Zwangsgebühren an die Krankenkasse zahlen müssen", correct: false }, { option : "Weil Krankheit durch falsche, artfremde Ernährung und medizynische Behandlung entsteht und Rohköstler aus Zeit-und Kostengründen auf beides verzichten.", correct: true }, { option : "Weil sie Glück haben, dass der mörderische Fuchsbandwurm im Löwenzahn sie noch nicht umgebracht hat.", correct: false }],
		correct: 4
	},
	{
		question: "Wie heißt diese essbare Wildpflanze?",
		imageUrl: "assets/img/rawfood/breitwegerich.png",
		type: "multiple choice",
		options: [{ option : "Löwenzahn", correct: false }, { option : "Spitzwegerich", correct: true }, { option : "Breitwegerich", correct: true }, { option: "Gänseblümchen", correct : false }],
		correct: 4
	},

	{
		question: "Warum essen bestimmte Rohköstler kein Obst?",
		imageUrl: "assets/img/rawfood/zahnarzt.png",
		type: "multiple choice",
		options: [{ option : "Weil sie sich das Geld und die Zeit für das Obstessen und den anschließenden Gang zum Zahnmedizyniker sparen wollen", correct: true }, { option : "Weil sie sind wissen, was gut und teuer ist", correct: false }],
		correct: 4
	},
	
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/salatmitmungobohnen.jpg",
		type: "multiple choice",
		options: [{ option : "Knollensellerie", correct: false }, { option : "Karotte", correct: false }, { option : "Mungobohnen", correct: false }, { option : "Weizen", correct: false }, { option : "Paprika", correct: true }],
		correct: 4
	},
	{
		question: "Welche Zutat ist nicht in diesem Getreidebrei?",
		imageUrl: "assets/img/rawfood/breimitkuerbis.jpg",
		type: "multiple choice",
		options: [{ option : "Roggen", correct: false }, { option : "Hanf", correct: false }, { option : "Kürbiskerne", correct: false }, { option : "Braunhirse", correct: false }, { option : "Banane", correct: true }],
		correct: 4
	},
		{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/blumenkohlsalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßkartoffel", correct: false }, { option : "Blumenkohl", correct: false }, { option : "Sojabohnen", correct: false }, { option : "Löwenzahn", correct: true }, { option : "Weizen", correct: false }],
		correct: 3
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/brokolisalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßlupinen", correct: false }, { option : "Brokoli", correct: false }, { option : "Karotte", correct: false }, { option : "Löwenzahn", correct: true }, { option : "Weizen", correct: false }],
		correct: 3
	},
	{
		question: "Wie heißt diese essbare Wildpflanze?",
		imageUrl: "assets/img/rawfood/giersch.png",
		type: "multiple choice",
		options: [{ option : "Gänseblümchen", correct: false }, { option : "Giersch", correct: true }, { option : "Löwenzahn", correct: false }, { option : "Gänsedistel", correct: false }],
		correct: 3
	},
	{
		question: "Wie viel spart ein Rohköstler pro Jahr an Strom, weil er keinen Kühlschrank benutzt?",
		imageUrl: "assets/img/rawfood/kuelschrank.png",
		type: "multiple choice",
		options: [{ option : "80kWh = 40 Euro", correct: true }, { option : "Er zahlt mit seiner Gesundheit", correct: false }],
		correct: 3
	},
	{
		question: "Warum haben Rohköstler Zeit und Geld?",
		imageUrl: "assets/img/rawfood/rohkost.png",
		type: "multiple choice",
		options: [{ option : "Weil bei ihnen die Zeit und das Geld für die Medizyniker-Besuche entfällt", correct: true }, { option : "Weil sie 60 Euro-Zwangs-GEZ-Gebühren alle 3 Monate zahlen müssen, ohne einen Radio-oder Fernseher zu besitzen", correct: false }, {option: "Weil das Zu-und Aufräumen von Salaten und Getreidebreien nur <5 min Zeit kostet", correct: true} ],
		correct: 3
	}

]
    };
  },
 
};
</script>

<style scoped>

</style>