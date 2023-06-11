<template>
    <vue-quiz :questions="questions"></vue-quiz>
</template>

<script>

export default {

  components: {
    
    VueQuiz : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-quiz.vue', options)),
  
  },

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       questions: 
      [
	{
		question: "Wie heißt dieses Gemüse?",
		questionFranc : "Comment s'appelle ce légume?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: [{ option : "Tomate", correct: false }, { option : "Roote Beete", correct: true }],
		optionsFranc : ["tomate", "betterave rouge"],
		correct: 1

	},

	{
		question: "Wie heißt dieses Gemüse?",
		questionFranc : "Comment s'appelle ce légume?",
		imageUrl: "assets/img/rawfood/kohlrabi.jpg",
		type: "multiple choice",
		options: [{ option : "Kartoffel", correct: false }, { option : "Kohlrabi", correct: true }],
		optionsFranc : ["pomme de terre", "chou-rave"],
		correct: 1
	},

	{
		question: "Was eignet sich zur Wasseraufbereitung?",
		questionFranc : "Quel instrument est utile pour améliorer la qualité de l'eau?",
		imageUrl: "assets/img/rawfood/wasserwirbler.png",
		type: "multiple choice",
		options: [{ option : "Wasserwirbler", correct: true }, { option : "Sirup", correct: false }],
		optionsFranc: ["Un tourbillon d'eau", "sirop"],
		correct: 0
	}
	,
	{
		question:"In welcher Form sollte man Getreide laut dem Rohkost-Guru Dr. Schnitzer am besten essen?",
		questionFranc: "Sous quelle forme est-ce qu'on dois manger les céréales selon le guru d'alimentation cure Dr. Schnitzer?",
		imageUrl: "assets/img/rawfood/weizensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "als Getreidebrei oder als Keimlinge", correct: true }, { option : "Brot", correct: false }, { option : "Nudeln", correct: false }],
		optionsFranc: ["purée ou graines germés", "pain", "nouilles"],
		correct: 0
	},
	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		questionFranc: "Quel ingrédient ne se trouve pas dans un purée de céréales?",
		type: "multiple choice",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		options: [{ option : "Roggen", correct: false }, { option : "Haselnüsse", correct: false }, { option : "Apfel", correct: false }, { option : "Marmelade", correct: true }, { option : "Leinsamen", correct: false }],
		optionsFranc: ["seigle","noisette", "pomme", "confiture","graine de line"],
		correct: 3

	},
	{
		question: "Warum fügt ein Rohköstler seinem Getreidebrei Hanfsprossen hinzu?",
		imageUrl: "assets/img/rawfood/hanfsprossen.jpg",
		type: "multiple choice",
		options: [{ option : "wegen der berauschenden Wirkung", correct: false }, { option : "wegen dem vielen Fett und dem würzigen Geschmack", correct: true }],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/rotkohl.jpg",
		type: "multiple choice",
		options: [{ option : "Rotkohl", correct: true }, { option : "Weißkohl", correct: false }, { option : "Grünkohl", correct: false }],
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
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/steckrübensalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßlupinen", correct: false }, { option : "Karotte", correct: false }, { option : "Steckrübe", correct: false }, { option : "Petersilie", correct: true }, { option : "Weizen", correct: false }],
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
	}

]
    };
  },
 
};
</script>

<style scoped>

</style>