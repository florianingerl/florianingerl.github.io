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
		question: "Wie heißt dieses Gemüse?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
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
		questionEn : "What is the name of this vegetable?",
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
		questionEn: "According to raw food guru Dr. Schnitzer, in what form is it best to eat grains?",
		imageUrl: "assets/img/rawfood/weizensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "als Getreidebrei oder als Keimlinge", correct: true }, { option : "Brot", correct: false }, { option : "Nudeln", correct: false }],
		optionsFr: [{ option : "en tant que bouillie de céréales ou en tant que pousses", correct: true }, { option : "pain", correct: false }, { option : "nouilles", correct: false }],
		optionsEn: [{ option : "as cereal porrdige or as sprouts", correct: true }, { option : "bread", correct: false }, { option : "pasta", correct: false }],
		correct: 0
	},
	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		questionFr: "Quel ingrédient n'a pas sa place dans une bouillie de céréales fraîches?",
		questionEn: "Which ingredient doesn't belong to a fresh grain porridge?",
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
		questionFr: "Pourquoi un crudivore ajoute-t-il des pousses de chanvre à sa bouillie de céréales fraîches? ",
		questionEn: "Why does a raw fooder add hempsprouts to his fresh grain porridge?",
		imageUrl: "assets/img/rawfood/hanfsprossen.jpg",
		type: "multiple choice",
		options: [{ option : "wegen der berauschenden Wirkung", correct: false }, { option : "wegen dem vielen Fett und dem würzigen Geschmack", correct: true }],
		optionsEn: [{ option : "because of the intoxicating effect", correct: false }, { option : "because of the fat and the spicey taste", correct: true }],
		optionsFr: [{ option : "à cause de l'effet intoxicant", correct: false }, { option : "à cause du gras et du goût épicé", correct: true }],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		question: "Comment est-ce qu'on appelle ce légume?",
		questionEn: "What is the name of this vegetable?",
		imageUrl: "assets/img/rawfood/rotkohl.jpg",
		type: "multiple choice",
		options: [{ option : "Rotkohl", correct: true }, { option : "Weißkohl", correct: false }, { option : "Grünkohl", correct: false }],
		optionsFr: [{ option : "chou rouge", correct: true }, { option : "chou blanc", correct: false }, { option : "chou frisé", correct: false }],
		optionsEn: [{ option : "red cabbage", correct: true }, { option : "white cabbage", correct: false }, { option : "kale", correct: false }],
		correct: 0
	},
	
	{
		question: "Wie heißt dieses Gemüse?",
		questionEn: "What is the name of this vegetable?",
		questionFr: "Comment est-ce qu'on appelle ce légume?",
		imageUrl: "assets/img/rawfood/knollensellerie.jpg",
		type: "multiple choice",
		options: [{ option : "Knollensellerie", correct: true }, { option : "Radiesschen", correct: false }],
		optionsEn: [{ option : "celeriac", correct: true }, { option : "radishes", correct: false }],
		optionsFr: [{ option : "céleri-rave", correct: true }, { option : "radis", correct: false }],
		correct: 0
	},
	
	{
		question: "Wie schmeckt roote Beete?",
		questionFr: "Quel goût la betterave a-t-elle?",
		questionEn: "How does beet root taste?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: [{ option : "bitter", correct: false }, { option : "süß", correct: true }, { option : "scharf", correct: false }],
		optionsEn: [{ option : "bitter", correct: false }, { option : "sweet", correct: true }, { option : "spicey", correct: false }],
		optionsFr: [{ option : "amer", correct: false }, { option : "sucré", correct: true }, { option : "épicé", correct: false }],
		correct: 1
	},
	{
		question: "Sprossen aus Leinsamen sind wertvoll, weil sie viel Fett enthalten. Wie schmecken wohl Leinsamensprossen?",
		questionEn: "Linseed sprouts are valuable because they contain a lot of fat? What do linseed sprouts taste like?",
		questionFr: "Les pousses de lin sont précieuses parce qu'elles contiennent beaucoup de graisse? Quel goût les pousses de lin ont-t-elles?",
		imageUrl: "assets/img/rawfood/leinsamensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "scharf", correct: false }, { option : "wie Schokolade", correct: true }],
		optionsEn: [{ option : "spicey", correct: false }, { option : "like chocolate", correct: true }],
		optionsFr: [{ option : "épicé", correct: false }, { option : "comme du chocolat", correct: true }],
		correct: 1
	},
	{
		question: "Wie schmeckt Kresse?",
		questionEn: "What does cress taste like?",
		questionFr: "Quel est le goût du cresson?",
		imageUrl: "assets/img/rawfood/kresse.jpg",
		type: "multiple choice",
		options: [{ option : "scharf", correct: true }, { option : "bitter", correct: false }, { option : "süß", correct: false }],
		optionsEn: [{ option : "spicey", correct: true }, { option : "bitter", correct: false }, { option : "sweet", correct: false }],
		options: [{ option : "épicé", correct: true }, { option : "amer", correct: false }, { option : "sucré", correct: false }],
		correct: 0
	},

	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		questionEn: "Which ingredient does not belong in a fresh grain porridge?",
		questionFr: "Quel ingrédient n'a pas sa place dans une bouillie de céréales fraîches?",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Wasser", correct: false }, { option : "Dinkel", correct: false }, { option : "Milch", correct: true }, { option : "Sonnenblumenkerne", correct: false }, { option : "Himbeeren", correct: false }],
		optionsEn: [{ option : "water", correct: false }, { option : "spelled", correct: false }, { option : "milk", correct: true }, { option : "sunflower seeds", correct: false }, { option : "rasperries", correct: false }],
		optionsFr: [{ option : "de l'eau", correct: false }, { option : "épeautre", correct: false }, { option : "du lait", correct: true }, { option : "graines de tournesol", correct: false }, { option : "framboises", correct: false }],
		correct: 2
	},

	{
		question: "Wie heißt dieser Salat?",
		questionEn: "What is this salad called?",
		questionFr: "Wie heißt dieser Salat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: [{ option : "Zuckerhut", correct: false }, { option : "Kopfsalat", correct: false }, { option : "Chicoree", correct: false }, { option : "Endiviensalat", correct: true }],
		optionsEn: [{ option : "sugar loaf", correct: false }, { option : "lettuce", correct: false }, { option : "chicory", correct: false }, { option : "endive", correct: true }],
		optionsFr: [{ option : "pain de sucre", correct: false }, { option : "laitue", correct: false }, { option : "chicorée", correct: false }, { option : "endive", correct: true }],
		correct: 3
	},

	{
		question: "Wie schmeckt Endiviensalat?",
		questionEn: "What is the taste of endive?",
		questionFr: "Quel est le goût de l'endive?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: [{ option : "süß", correct: false }, { option : "bitter", correct: true }, { option : "scharf", correct: false }],
		optionsEn: [{ option : "sweet", correct: false }, { option : "bitter", correct: true }, { option : "spicey", correct: false }],
		optionsFr: [{ option : "sucré", correct: false }, { option : "amer", correct: true }, { option : "épicé", correct: false }],
		correct: 1
	},

	{
		question: "Warum werden Rohköstler satt?",
		questionEn: "How do raw food eaters get full?",
		questionFr: "Pourquoi les mangeurs de nourriture crue sont-ils rassasiés?",
		imageUrl: "assets/img/rawfood/kichererbsensalat.jpg",
		type: "multiple choice",
		options: [{ option : "Weil sie tonnenweise Salat essen", correct: false }, { option : "Weil sie Sprossen aus Getreide und Hülsenfrüchten essen", correct: true }],
		optionsEn: [{ option : "Because they eat tons of salad", correct: false }, { option : "Because they eat sprouts from grains and legumes", correct: true }],
		optionsFr: [{ option : "Parce qu'ils mangent des tonnes de salade", correct: false }, { option : "Parce qu'ils mangent des germes de céréales et de légumineuses", correct: true }],
		correct: 1
	},



	{
		question: "Woran erkennt man laut dem Rohkost-Guru und Zahnarzt Dr. Schnitzer am eindeutigsten, dass der Mensch ein Fruchtesser (Samen, Wurzelknollen, Blattschösslinge) ist?",
		questionEn: "According to raw food guru and dentist Dr. Schnitzer, how can you see most clearly that humans are fruit eaters (seeds, root tubers, leafy shoots)?",
		questionFr: "Selon le gourou des aliments crus et dentiste Dr. Schnitzer, comment est-ce qu'on peut voir très clairement que les humains sont des mangeurs de fruits (graines, tubercules, pousses feuillues)?",
		imageUrl: "assets/img/rawfood/johannschnitzer.gif",
		type: "multiple choice",
		options: [{ option : "an der Länge seines Darms", correct: false }, { option : "an seinem Gebiss", correct: true }, { option : "an der chemischen Zusammensetzung der Magensäure", correct: false }],
		optionsEn: [{ option : "by the length of this intestines", correct: false }, { option : "by his teeth", correct: true }, { option : "by the chemical composition of his stomach acid", correct: false }],
		optionsFr: [{ option : "par la longueur de ses intestins", correct: false }, { option : "par ses dents", correct: true }, { option : "par la composition chimique de son acide gastrique", correct: false }],
		correct: 1
	},


	{
		question: "Wie heißt dieses Gemüse?",
		questionFr: "Comment s'appelle ce légume?",
		questionEn: "What is the name of this vegetable?",
		imageUrl: "assets/img/rawfood/weißkohl.jpg",
		type: "multiple choice",
		options: [{ option : "Rotkohl", correct: false }, { option : "Weißkohl", correct: true }],
		optionsFr: [{ option : "chou rouge", correct: false }, { option : "chou blanc", correct: true }],
		options: [{ option : "red cabbage", correct: false }, { option : "white cabbage", correct: true }],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		questionFr: "Comment s'appelle ce légume?",
		questionEn: "What is the name of this vegetable?",
		imageUrl: "assets/img/rawfood/steckrübe.jpg",
		type: "multiple choice",
		options: [{ option : "Gelbe Rübe", correct: false }, { option : "Rote Rübe", correct: false }, { option : "Steckrübe", correct: true }],
		optionsFr: [{ option : "navet jaune", correct: false }, { option : "navet rouge", correct: false }, { option : "navet", correct: true }],
		optionsEn: [{ option : "yellow turnip", correct: false }, { option : "red turnip", correct: false }, { option : "turnip", correct: true }],
		correct: 2
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "Which ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/weißkohlsalat.jpg",
		type: "multiple choice",
		options: [{ option : "Weißkohl", correct: false }, { option : "Weizen", correct: false }, { option : "Roote Beete", correct: false }, { option : "Karotte", correct: true }, { option : "Süßlupinen", correct: false }],
		optionsFr: [{ option : "chou blanc", correct: false }, { option : "blé", correct: false }, { option : "betterave", correct: false }, { option : "carotte", correct: true }, { option : "lupin doux", correct: false }],
		optionsEn: [{ option : "white cabbage", correct: false }, { option : "wheat", correct: false }, { option : "beetroot", correct: false }, { option : "carrot", correct: true }, { option : "sweet lupins", correct: false }],
		correct: 3
	},
	
	{
		question: "Sollte man zu einer Mahlzeit auch was trinken? Welche Aussage ist richtig?",
		questionEn: "Should you drink something with your meal?",
		questionFr: "Faut-il boire quelque chose avec un repas?",
		imageUrl: "assets/img/rawfood/verredeleau2.png",
		type: "multiple choice",
		options: [{ option : "Nein, weil man Geld sparen kann, wenn man im Restaurant nichts zu Trinken bestellt.", correct: false }, { option : "Nein, weil es die Magensäure verdünnt.", correct: true }, { option : "Ja, weil Säfte und Energie-Drinks gut für die Zähne sind.", correct: false }],
		optionsEn: [{ option : "No, because you can save money by not ordering a drink in a restaurant", correct: false }, { option : "No, because it dilutes the stomach acid", correct: true }, { option : "Yes, because energy drinks are good for your teeth.", correct: false }],
		optionsFr: [{ option : "Non, parce qu'on peut économiser de l'argent en ne commandant pas de boisson dans un restaurant", correct: false }, { option : "Non, parce que cela dilue l'acide gastrique", correct: true }, { option : "Oui, parce que les boissons énergisantes sont bonnes pour les dents.", correct: false }],
		correct: 1
	},
	
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionEn: "Which ingredient is not in this salad?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		imageUrl: "assets/img/rawfood/rotkohlsalat.JPG",
		type: "multiple choice",
		options: [{ option : "Gerste", correct: false }, { option : "Rotkohl", correct: false }, { option : "Linsen", correct: false }, { option : "Gurke", correct: true }, { option : "Rote Beete", correct: false }],
		optionsEn: [{ option : "barley", correct: false }, { option : "red cabbage", correct: false }, { option : "lentils", correct: false }, { option : "cucumber", correct: true }, { option : "beetroot", correct: false }],
		optionsFr: [{ option : "orge", correct: false }, { option : "chou rouge", correct: false }, { option : "lentilles", correct: false }, { option : "concombre", correct: true }, { option : "beetroot", correct: false }],
		correct: 3
	},
	{
		question: "Wasser macht verschiedene Kristalle, je nachdem wie man es vorher behandelt? Mit welcher Musik wurde dieses Wasser bespielt?",
		questionFr: "L'eau produit des cristeaux différents selon la facon dont tu la traites au préalable? Quelle musique jouait-on sur cette eau?",
		questionEn: "Water makes different cristals depending on how you treat it beforehand? What music was played on this water?",
		imageUrl: "assets/img/rawfood/mozartsymphonie40.png",
		type: "multiple choice",
		options: [{ option : "The Rolling Stones - I can't get no satisfaction", correct: false }, { option : "Mozart - Symphonie 40", correct: true }],
		optionsFr: [{ option : "The Rolling Stones - I can't get no satisfaction", correct: false }, { option : "Mozart - Symphonie 40", correct: true }],
		optionsEn: [{ option : "The Rolling Stones - I can't get no satisfaction", correct: false }, { option : "Mozart - Symphonie 40", correct: true }],
		correct: 1
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionEn: "Which ingredient is not in this salad?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		imageUrl: "assets/img/rawfood/knollenselleriesalat.jpg",
		type: "multiple choice",
		options: [{ option : "Knollensellerie", correct: false }, { option : "Bockshornklee", correct: false }, { option : "Tomate", correct: true }, { option : "Weizen", correct: false }, { option : "Karotte", correct: false }],
		optionsEn: [{ option : "celeriac", correct: false }, { option : "fenugreek", correct: false }, { option : "tomato", correct: true }, { option : "wheat", correct: false }, { option : "carrot", correct: false }],
		optionsFr: [{ option : "céleri-rave", correct: false }, { option : "fenugrec", correct: false }, { option : "tomate", correct: true }, { option : "blé", correct: false }, { option : "carotte", correct: false }],
		correct: 2
	},
	{
		question: "Warum essen Rohköstler Rohkost?",
		questionFr: "Pourquoi les crudivores mangent-t-ils des aliment crus?",
		questionEn: "Why do raw food eaters eat raw food?",
		imageUrl: "assets/img/rawfood/rohkost.png",
		type: "multiple choice",
		options: [{ option : "um gesund und leistungsfähig zu sein", correct: true }, { option : "Wegen ihrer Allergien vertragen sie gute, normale Ernährung nicht. Sie bräuchten viel Geld und Zeit, um ihre Allergien von einem guten Medizyniker behandeln zu lassen", correct: false }],
		optionsFr: [{ option : "pour être en bonne santé et productif", correct: true }, { option : "En raison de leurs allergies, ils ne peuvent tolérer une alimentation saine et normale. Il leur faudrait beaucoup d'argent et de temps pour faire traiter leurs allergies par un bon médecin.", correct: false }],
		optionsEn: [{ option : "to be healthy and productive", correct: true }, { option : "Because of their allergies, they cannot tolerate good, normal nutrition. They would need a lot of money and time to have their allergies treated by a good doctor", correct: false }],
		correct: 2
	},

	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionEn: "Which ingredient is not in this salad?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		imageUrl: "assets/img/rawfood/steckrübensalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßlupinen", correct: false }, { option : "Karotte", correct: false }, { option : "Steckrübe", correct: false }, { option : "Petersilie", correct: true }, { option : "Weizen", correct: false }],
		optionsEn: [{ option : "sweet lupins", correct: false }, { option : "carrot", correct: false }, { option : "turnip", correct: false }, { option : "parsley", correct: true }, { option : "wheat", correct: false }],
		optionsFr: [{ option : "lupins doux", correct: false }, { option : "carotte", correct: false }, { option : "navet", correct: false }, { option : "persil", correct: true }, { option : "blé", correct: false }],
		correct: 3
	},
    {
		question: "Warum schwitzen Rohköstler nachts (und auch sonst) nicht?",
		questionFr: "Pourquoi les crudivores ne transpirent-ils pas la nuit (ou à d'autres moments)?",
		questionEn: "Why don't raw food eaters sweat at night (or at other times)?",
		imageUrl: "assets/img/rawfood/schwitzen.png",
		type: "multiple choice",
		options: [{ option : "Weil bei ihnen die Ausscheidung von Giftstoffen über die Haut nicht funktioniert", correct: false }, { option : "Weil in Getreidebrei, Gemüse, Sprossen und Wildkräutern keine Gifte zum Ausscheiden über die Haut drin sind", correct: true },
		{ option: "Weil sie so wenig trinken, dass ihr Körper keine Flüssigkeit mehr hergeben kann.", correct: false }],
		optionsFr: [{ option : "Parce que l'élimination de toxines par la peau ne fonctionne pas pour eux.", correct: false }, { option : "Parce que les céréales, les légumes, les germes et les herbes sauvages ne contiennent aucune toxine pouvant être excrétée par la peau.", correct: true },
		{ option: "Parce qu’ils boivent si peu que leur corps ne peut plus se débarasser de liquide.", correct: false }],
		optionsEn: [{ option : "Because the excretion of toxins through the skin doesn't work for them.", correct: false }, { option : "Because cereal porridge, vegetables, sprouts and wild herbs do not contain any toxins that can be excreted through the skin. ", correct: true },
		{ option: "Because they drink so little that their bodies can no longer give away any fluid.", correct: false }],
		correct: 3
	},

	{
		question: "Welche Zutat ist nicht in diesem Getreidebrei?",
		questionEn: "What ingredient is not in this fresh grain porridge?",
		questionFr: "Quel ingrédient n'est pas dans cette bouillie de céréales fraîches?",
		imageUrl: "assets/img/rawfood/roggenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Roggen", correct: false }, { option : "Hanf", correct: false }, { option : "Erdbeeren", correct: true }, { option : "Braunhirse", correct: false }, { option : "Sonnenblumenkerne", correct: false }],
		optionsEn: [{ option : "rye", correct: false }, { option : "hemp", correct: false }, { option : "strawberries", correct: true }, { option : "brown millet", correct: false }, { option : "sunflower seeds", correct: false }],
		optionsFr: [{ option : "seigle", correct: false }, { option : "chanvre", correct: false }, { option : "fraises", correct: true }, { option : "millet brun", correct: false }, { option : "graines de tournesol", correct: false }],
		correct: 2
	},
	{
		question: "Wo kann man keimfähiges Getreide, Hülsenfrüchte und Ölsaaten online bestellen?",
		questionEn: "Where can you order germinable seeds, legumes and oilseeds online?",
		questionFr: "Où peux-tu commander des céréales, des légumineuses et et des oléagineux germinables?",
		imageUrl: "assets/img/rawfood/demeterhofschwab.png",
		type: "multiple choice",
		options: [{ option : "Demeterhof Schwab", correct: true }, { option : "Wiesenhof", correct: false }],
		optionsEn: [{ option : "Demeterhof Schwab", correct: true }, { option : "Wiesenhof", correct: false }],
		optionsFr: [{ option : "Demeterhof Schwab", correct: true }, { option : "Wiesenhof", correct: false }],
		correct: 0
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionEn: "Which ingredient is not in this salad?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		imageUrl: "assets/img/rawfood/salatmitspeisewicke.jpg",
		type: "multiple choice",
		options: [{ option : "Blaukraut", correct: false }, { option : "Roggen", correct: false }, { option : "Pastinake", correct: false }, { option : "Speisewicke", correct: false }, { option : "Basilikum", correct: true }],
		options: [{ option : "red cabbage", correct: false }, { option : "rye", correct: false }, { option : "parsnip", correct: false }, { option : "sweet pea", correct: false }, { option : "basil", correct: true }],
		options: [{ option : "chou rouge", correct: false }, { option : "seigle", correct: false }, { option : "panais", correct: false }, { option : "pois de senteur", correct: false }, { option : "basilic", correct: true }],
		correct: 4
	},
	{
		question: "Warum sind Rohköstler 365 Tage 24 h im Jahr gesund und leistungsfähig?",
		questionEn: "Why are raw food eaters healthy and productive 365 days, 24 h a year?",
		questionFr: "Pourquoi les crudivores sont-ils en bonne santé et productifs 365 jours, 24 h par an?",
		imageUrl: "assets/img/rawfood/loewenzahn.png",
		type: "multiple choice",
		options: [{ option : "Weil sie mehr als 500 Euro im Monat Zwangsgebühren an die Krankenkasse zahlen müssen", correct: false }, { option : "Weil Krankheit durch falsche, artfremde Ernährung und medizynische Behandlung entsteht und Rohköstler aus Zeit-und Kostengründen auf beides verzichten.", correct: true }, { option : "Weil sie Glück haben, dass der mörderische Fuchsbandwurm im Löwenzahn sie noch nicht umgebracht hat.", correct: false }],
		optionsEn: [{ option : "Because they have to pay compulsory fees to the health insurance company of more than 500 euros a month. ", correct: false }, { option : "Because illness is caused by incorrect, non-human-specific nutrition and medical treatment and raw foodists avoid both for reasons of time and money.", correct: true }, { option : "Because they're lucky that the murderous fox tapeworm in the dandelions hasn't killed them yet.", correct: false }],
		optionsFr: [{ option : "Parce qu'ils doivent payer des frais obligatoires à la caisse d'assurance maladie de plus de 500 euros par mois.", correct: false }, { option : "Parce que la maladie est causée par une alimentation et un traitement médical incorrects et non spécifiques à l'éspèce humaine, et que les crudivoires évitent les deux pour des raisons de temps et d'argent.", correct: true }, { option : "Parce qu'ils ont de la chance que le ténia meurtrier du renard ne les ait pas encore tués.", correct: false }],
		correct: 4
	},
	{
		question: "Wie heißt diese essbare Wildpflanze?",
		questionEn: "What is the name of this edible wild plant?",
		questionFr: "Comment s'appelle cette plante sauvage comestible?",
		imageUrl: "assets/img/rawfood/breitwegerich.png",
		type: "multiple choice",
		options: [{ option : "Löwenzahn", correct: false }, { option : "Spitzwegerich", correct: true }, { option : "Breitwegerich", correct: true }, { option: "Gänseblümchen", correct : false }],
		optionsFr: [{ option : "Pissenlits", correct: false }, { option : ", plantain lancéolé", correct: true }, { option : "plantain large", correct: true }, { option: "marguerite", correct : false }],
		optionsEn: [{ option : "dandelions", correct: false }, { option : "ribwort plantain", correct: true }, { option : "broad plantain", correct: true }, { option: "daisies", correct : false }],
		correct: 4
	},

	{
		question: "Warum essen bestimmte Rohköstler kein Obst?",
		questionEn: "Why do certain raw food eaters not eat fruit?",
		questionFr: "Pourquoi certains crudivores ne mangent-ils pas de fruits?",
		imageUrl: "assets/img/rawfood/zahnarzt.png",
		type: "multiple choice",
		options: [{ option : "Weil sie sich das Geld und die Zeit für das Obstessen und den anschließenden Gang zum Zahnmedizyniker sparen wollen", correct: true }, { option : "Weil sie nicht wissen, was gut und teuer ist", correct: false }],
		optionsEn: [{ option : "Because they want to save the time and the money of eating fruit and then going to the dentist.", correct: true }, { option : "Because they don't know what is good and expensive", correct: false }],
		optionsFr: [{ option : "Parce qu'ils veulent économiser de l'argent et du temps en ne pas mangeant de fruits et ensuite allant chez le dentiste.", correct: true }, { option : "Parce qu'ils ne savent pas ce qui est bon et cher.", correct: false }],
		correct: 4
	},
	
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "What ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/salatmitmungobohnen.jpg",
		type: "multiple choice",
		options: [{ option : "Knollensellerie", correct: false }, { option : "Karotte", correct: false }, { option : "Mungobohnen", correct: false }, { option : "Weizen", correct: false }, { option : "Paprika", correct: true }],
		optionsEn: [{ option : "celeriac", correct: false }, { option : "carrot", correct: false }, { option : "mung beans", correct: false }, { option : "wheat", correct: false }, { option : "peppers", correct: true }],
		optionsFr: [{ option : "céleri-rave", correct: false }, { option : "carotte", correct: false }, { option : "haricots mungo", correct: false }, { option : "blé", correct: false }, { option : "poivrons", correct: true }],
		correct: 4
	},
	{
		question: "Welche Zutat ist nicht in diesem Getreidebrei?",
		questionFr: "Quel ingrédient n'est pas dans cette bouillie de céréales fraîches?",
		questionEn: "Which ingredient is not in this fresh grain porridge?",
		imageUrl: "assets/img/rawfood/breimitkuerbis.jpg",
		type: "multiple choice",
		options: [{ option : "Roggen", correct: false }, { option : "Hanf", correct: false }, { option : "Kürbiskerne", correct: false }, { option : "Braunhirse", correct: false }, { option : "Banane", correct: true }],
		optionsEn: [{ option : "rye", correct: false }, { option : "hemp", correct: false }, { option : "pumpkin seeds", correct: false }, { option : "brown millet", correct: false }, { option : "banana", correct: true }],
		optionsFr: [{ option : "seigle", correct: false }, { option : "chanvre", correct: false }, { option : "graines de citrouille", correct: false }, { option : "millet brun", correct: false }, { option : "banane", correct: true }],
		correct: 4
	},
		{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "What ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/blumenkohlsalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßkartoffel", correct: false }, { option : "Blumenkohl", correct: false }, { option : "Sojabohnen", correct: false }, { option : "Löwenzahn", correct: true }, { option : "Weizen", correct: false }],
		optionsEn: [{ option : "sweet potato", correct: false }, { option : "cauliflower", correct: false }, { option : "soybeans", correct: false }, { option : "dandelions", correct: true }, { option : "wheat", correct: false }],
		optionsFr: [{ option : "patate douce", correct: false }, { option : "chou-fleur", correct: false }, { option : "soja", correct: false }, { option : "pissenlit", correct: true }, { option : "blé", correct: false }],
		correct: 3
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionEn: "Which ingredient is not in this salad?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		imageUrl: "assets/img/rawfood/brokolisalat.jpg",
		type: "multiple choice",
		options: [{ option : "Süßlupinen", correct: false }, { option : "Brokoli", correct: false }, { option : "Karotte", correct: false }, { option : "Löwenzahn", correct: true }, { option : "Weizen", correct: false }],
		optionsEn: [{ option : "sweet lupins", correct: false }, { option : "broccoli", correct: false }, { option : "carrot", correct: false }, { option : "dandelions", correct: true }, { option : "wheat", correct: false }],
		optionsFr: [{ option : "lupins doux", correct: false }, { option : "brocoli", correct: false }, { option : "carotte", correct: false }, { option : "pissenlit", correct: true }, { option : "blé", correct: false }],
		correct: 3
	},
	{
		question: "Wie heißt diese essbare Wildpflanze?",
		questionFr: "Comment s'appelle cette plante sauvage comestible?",
		questionEn: "What is the name of this edible wild plant?",
		imageUrl: "assets/img/rawfood/giersch.png",
		type: "multiple choice",
		options: [{ option : "Gänseblümchen", correct: false }, { option : "Giersch", correct: true }, { option : "Löwenzahn", correct: false }, { option : "Gänsedistel", correct: false }],
		optionsEn: [{ option : "daisies", correct: false }, { option : "groundweed", correct: true }, { option : "dandelion", correct: false }, { option : "goose thistle", correct: false }],
		optionsFr: [{ option : "Gänseblümchen", correct: false }, { option : "herbe de sol", correct: true }, { option : "pissenlit", correct: false }, { option : "chardon d'oie", correct: false }],
		correct: 3
	},
	{
		question: "Wie viel spart ein Rohköstler pro Jahr an Strom, weil er keinen Kühlschrank benutzt?",
		questionEn: "How much money does a raw food eater save per year by not using a refrigerator?",
		questionFr: "Combien d'argent un crudivore économise-t-il en ne pas utilisant de réfrigérateur?",
		imageUrl: "assets/img/rawfood/kuelschrank.png",
		type: "multiple choice",
		options: [{ option : "80kWh = 40 Euro", correct: true }, { option : "Er zahlt mit seiner Gesundheit", correct: false }],
		optionsEn: [{ option : "80kWh = 40 euros", correct: true }, { option : "He has to pay with his health", correct: false }],
		optionsFr: [{ option : "80kWh = 40 euros", correct: true }, { option : "Il doit payer avec sa santé.", correct: false }],
		correct: 3
	},
	{
		question: "Warum haben Rohköstler Zeit und Geld?",
		questionEn: "Why do raw food eaters have time and money?",
		questionFr: "Pourquoi les crudivores ont-il du temps et de l'argent?",
		imageUrl: "assets/img/rawfood/rohkost.png",
		type: "multiple choice",
		options: [{ option : "Weil bei ihnen die Zeit und das Geld für die Medizyniker-Besuche entfällt", correct: true }, { option : "Weil sie 60 Euro-Zwangs-GEZ-Gebühren alle 3 Monate zahlen müssen, ohne einen Radio-oder Fernseher zu besitzen", correct: false }, {option: "Weil das Zu-und Aufräumen von Salaten und Getreidebreien nur <5 min Zeit kostet", correct: true} ],
		optionsEn: [{ option : "Because they don't have the time and money for medical visits.", correct: true }, { option : "Because they have to pay 60 euro compulsory GEZ fees every 3 months without owning a radio or television.", correct: false }, {option: "Because preparing and cleaning up salads and cereal porridges only takes <5 minutes.", correct: true} ],
		optionsFr: [{ option : "Parce qu'ils n'ont ni le temps ni l'argent pour les visites médicales.", correct: true }, { option : "Parce qu'ils doivent payer 60 euros de frais GEZ obligatoires tous les 3 mois sans posséder de radio ou de télévision.", correct: false }, {option: "Parce que préparer et nettoyer les salades et les bouillies de céréales ne prend que <5 minutes.", correct: true} ],
		correct: 3
	}

]
    };
  },
 
};
</script>

<style scoped>

</style>