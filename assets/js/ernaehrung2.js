let questions = [
	{
		question: "Wie heißt dieses Gemüse?",
		questionFranc : "Comment s'appelle ce légume?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: ["Tomate", "Roote Beete"],
		optionsFranc : ["tomate", "betterave rouge"],
		correct: 1

	},

	{
		question: "Wie heißt dieses Gemüse?",
		questionFranc : "Comment s'appelle ce légume?",
		imageUrl: "assets/img/rawfood/kohlrabi.jpg",
		type: "multiple choice",
		options: ["Kartoffel", "Kohlrabi"],
		optionsFranc : ["pomme de terre", "chou-rave"],
		correct: 1
	},

	{
		question: "Was eignet sich zur Wasseraufbereitung?",
		questionFranc : "Quel instrument est utile pour améliorer la qualité de l'eau?",
		imageUrl: "assets/img/rawfood/wasserwirbler.png",
		type: "multiple choice",
		options: ["Wasserwirbler", "Sirup"],
		optionsFranc: ["Un tourbillon d'eau", "sirop"],
		correct: 0
	}
	,
	{
		question:"In welcher Form sollte man Getreide laut dem Rohkost-Guru Dr. Schnitzer am besten essen?",
		questionFranc: "Sous quelle forme est-ce qu'on dois manger les céréales selon le guru d'alimentation cure Dr. Schnitzer?",
		imageUrl: "assets/img/rawfood/weizensprossen.jpg",
		type: "multiple choice",
		options: ["als Getreidebrei oder als Keimlinge", "Brot", "Nudeln"],
		optionsFranc: ["purée ou graines germés", "pain", "nouilles"],
		correct: 0
	},
	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		questionFranc: "Quel ingrédient ne se trouve pas dans un purée de céréales?",
		type: "multiple choice",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		options: ["Roggen", "Haselnüsse", "Apfel", "Marmelade", "Leinsamen"],
		optionsFranc: ["seigle","noisette", "pomme", "confiture","graine de line"],
		correct: 3

	},
	{
		question: "Warum fügt ein Rohköstler seinem Getreidebrei Hanfsprossen hinzu?",
		imageUrl: "assets/img/rawfood/hanfsprossen.jpg",
		type: "multiple choice",
		options: ["wegen der berauschenden Wirkung", "wegen dem vielen Fett und dem würzigen Geschmack"],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/rotkohl.jpg",
		type: "multiple choice",
		options: ["Rotkohl", "Weißkohl", "Grünkohl"],
		correct: 0
	},
	
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/knollensellerie.jpg",
		type: "multiple choice",
		options: ["Knollensellerie", "Radiesschen"],
		correct: 0
	},
	
	{
		question: "Wie schmeckt roote Beete?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: ["bitter", "süß", "scharf"],
		correct: 1
	},
	{
		question: "Sprossen aus Leinsamen sind wertvoll, weil sie viel Fett enthalten. Wie schmecken wohl Leinsamensprossen?",
		imageUrl: "assets/img/rawfood/leinsamensprossen.jpg",
		type: "multiple choice",
		options: ["scharf", "wie Schokolade"],
		correct: 1
	},
	{
		question: "Wie schmeckt Kresse?",
		imageUrl: "assets/img/rawfood/kresse.jpg",
		type: "multiple choice",
		options: ["scharf", "bitter", "süß"],
		correct: 0
	},

	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		type: "multiple choice",
		options: ["Wasser", "Dinkel", "Milch", "Sonnenblumenkerne", "Himbeeren"],
		correct: 2
	},

	{
		question: "Wie heißt dieser Salat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: ["Zuckerhut", "Kopfsalat", "Chicoree", "Endiviensalat"],
		correct: 3
	},

	{
		question: "Wie schmeckt Endiviensalat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: ["süß", "bitter", "scharf"],
		correct: 1
	},

	{
		question: "Warum werden Rohköstler satt?",
		imageUrl: "assets/img/rawfood/kichererbsensalat.jpg",
		type: "multiple choice",
		options: ["Weil sie tonnenweise Salat essen", "Weil sie Sprossen aus Getreide und Hülsenfrüchten essen"],
		correct: 1
	},



	{
		question: "Woran erkennt man laut dem Rohkost-Guru und Zahnarzt Dr. Schnitzer am eindeutigsten, dass der Mensch ein Fruchtesser (Samen, Wurzelknollen, Blattschösslinge) ist?",
		imageUrl: "assets/img/rawfood/johannschnitzer.gif",
		type: "multiple choice",
		options: ["an der Länge seines Darms", "an seinem Gebiss", "an der chemischen Zusammensetzung der Magensäure"],
		correct: 1
	},


	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/weißkohl.jpg",
		type: "multiple choice",
		options: ["Rotkohl", "Weißkohl"],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/steckrübe.jpg",
		type: "multiple choice",
		options: ["Gelbe Rübe", "Rote Rübe", "Steckrübe"],
		correct: 2
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/weißkohlsalat.jpg",
		type: "multiple choice",
		options: ["Weißkohl", "Weizen", "Roote Beete", "Karotte", "Süßlupinen"],
		correct: 3
	},
	
	{
		question: "Sollte man zu einer Mahlzeit auch was trinken? Welche Aussage ist richtig?",
		imageUrl: "assets/img/rawfood/verredeleau2.png",
		type: "multiple choice",
		options: ["Nein, weil man Geld sparen kann, wenn man im Restaurant nichts zu Trinken bestellt.", "Nein, weil es die Magensäure verdünnt.", "Ja, weil Säfte und Energie-Drinks gut für die Zähne sind."],
		correct: 1
	},
	
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/rotkohlsalat.JPG",
		type: "multiple choice",
		options: ["Gerste", "Rotkohl", "Linsen", "Gurke", "Rote Beete"],
		correct: 3
	},
	{
		question: "Wasser macht verschiedene Kristalle, je nachdem wie man es vorher behandelt? Mit welcher Musik wurde dieses Wasser bespielt?",
		imageUrl: "assets/img/rawfood/mozartsymphonie40.png",
		type: "multiple choice",
		options: ["The Rolling Stones - I can't get no satisfaction", "Mozart - Symphonie 40"],
		correct: 1
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/knollenselleriesalat.jpg",
		type: "multiple choice",
		options: ["Knollensellerie", "Bockshornklee", "Tomate", "Weizen", "Karotte"],
		correct: 2
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/steckrübensalat.jpg",
		type: "multiple choice",
		options: ["Süßlupinen", "Karotte", "Steckrübe", "Petersilie", "Weizen"],
		correct: 3
	},
	{
		question: "Welche Zutat ist nicht in diesem Getreidebrei?",
		imageUrl: "assets/img/rawfood/roggenbrei.jpg",
		type: "multiple choice",
		options: ["Roggen", "Hanf", "Erdbeeren", "Braunhirse", "Sonnenblumenkerne"],
		correct: 2
	},
	{
		question: "Wo kann man keimfähiges Getreide, Hülsenfrüchte und Ölsaaten online bestellen?",
		imageUrl: "assets/img/rawfood/demeterhofschwab.png",
		type: "multiple choice",
		options: ["Demeterhof Schwab", "Wiesenhof"],
		correct: 0
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/salatmitspeisewicke.jpg",
		type: "multiple choice",
		options: ["Blaukraut", "Roggen", "Pastinake", "Speisewicke", "Basilikum"],
		correct: 4
	},
	
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/salatmitmungobohnen.jpg",
		type: "multiple choice",
		options: ["Knollensellerie", "Karotte", "Mungobohnen", "Weizen", "Paprika"],
		correct: 4
	},
	{
		question: "Welche Zutat ist nicht in diesem Getreidebrei?",
		imageUrl: "assets/img/rawfood/breimitkuerbis.jpg",
		type: "multiple choice",
		options: ["Roggen", "Hanf", "Kürbiskerne", "Braunhirse", "Banane"],
		correct: 4
	},
		{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/blumenkohlsalat.jpg",
		type: "multiple choice",
		options: ["Süßkartoffel", "Blumenkohl", "Sojabohnen", "Löwenzahn", "Weizen"],
		correct: 3
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/brokolisalat.jpg",
		type: "multiple choice",
		options: ["Süßlupinen", "Brokoli", "Karotte", "Löwenzahn", "Weizen"],
		correct: 3
	}

];

new Quiz("rohkost", questions);