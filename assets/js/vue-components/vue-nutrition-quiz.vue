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
		options: [{ option : "Tomate", correct: false }, { option : "Rote Beete", correct: true }],
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
		question: "Was eignet sich zur Wasserenergetisierung?",
		questionFr : "Quel instrument est utile pour améliorer la qualité de l'eau?",
		questionEn : "Which instrument is useful to improve the quality of water?",
		imageUrl: "assets/img/rawfood/wasserwirbler.png",
		type: "multiple choice",
		options: [{ option : "Wasserwirbler", correct: true }, { option : "Sirup", correct: false }],
		optionsFr: [{ option : "un vitaliseur d'eau", correct: true }, { option : "sirop", correct: false }],
		optionsEn: [{ option : "a vitalizer of water", correct: true }, { option : "sirop", correct: false }],
		correct: 0
	},

	{
		question: "Mit einem Destilliergerät kannst du dein Wasser zum Trinken und zum Einweichen der Sprossen von allen Giftstoffen reinigen. Wie kannst du das Wasser noch energetisieren?",
		questionFr : "Vous pouvez utiliser un distillateur pour purifier votre eau afin de la boire et de faire tremper les germes de toutes les toxines. Sinon, comment pouvez-vous dynamiser l’eau ?",
		questionEn : "You can use a distiller to purify your water from all toxins for drinking purposes and for soaking sprouts. How else can you energize the water?",
		imageUrl: "assets/img/rawfood/reikiwasser.png",
		type: "multiple choice",
		options: [{ option : "mit Reiki", correct: true }, { option : "mit Brausetabletten", correct: false }],
		optionsFr : [{ option : "avec Reiki", correct : true }, { option : "avec comprimés effervescents", correct : false }],
		optionsEn: [{ option : "with Reiki", correct: true }, { option : "with effervescent tablets", correct: false }],
		correct: 0
	}
	,

	{
		question: "Was ist Reiki?",
		questionFr : "Qu'est-ce que c'est Reiki?",
		questionEn : "What is Reiki?",
		imageUrl: "assets/img/rawfood/reikiwasser.png",
		type: "multiple choice",
		options: [{ option : "Japanische Fremdenergie, die die katholische Kirche zurecht mit Misstrauen beäugt", correct: false }, { option : "Universelle Lebensenergie", correct: true }, { option : "Heilung durch Handauflegen und mit Symbolen", correct: true }],
		optionsFr : [{ option : "L'énergie étrangère japonaise que l'Église catholique considère à juste titre avec suspicion", correct : false }, { option : "Énergie vitale universelle", correct : true }, { option : "Guérison par l'imposition des mains et avec des symboles", correct : true }],
		optionsEn: [{ option: "Japanese foreign energy that the Catholic Church rightly views with suspicion", correct: false }, { option: "Universal life energy", correct: true }, { option: "Healing to the laying of hands on somebody or something", correct: true }],
		correct: 0
	}
	,

	{
		question: "Wie kannst du durch Reiki unterscheiden, was wertvolle Nahrung und was Schrott ist?",
		questionFr : "Comment pouvez-vous utiliser le Reiki pour distinguer ce qui est de la nourriture précieuse et ce qui est indésirable ?",
		questionEn : "How can you use Reiki to distinguish what is valuable food and what is junk?",
		imageUrl: "assets/img/rawfood/buchweizenreiki.png",
		type: "multiple choice",
		options: [{ option : "Reiki wirkt nur bei Schrott", correct: false }, { option : "Es macht keinen Spaß oder man fühlt fast nichts, wenn man Schrott mit Reiki behandelt.", correct: true }, { option : "Reiki kann nur das Lebendige heilen und energetisieren", correct: true }],
		optionsFr : [{ option : "Le Reiki ne fonctionne que sur les déchets", correct : false }, { option : "Ce n'est pas amusant ou vous ne ressentez presque rien lorsque vous traitez des déchets avec le Reiki.", correct : true }, { option : "Reiki ne peut que guérir et dynamiser les vivants", correct : true }],
		optionsEn: [{ option : "Reiki only works on junk", correct: false }, { option : "It's no fun or you feel almost nothing when you treat junk with Reiki.", correct: true }, { option : "Reiki can only heal and energize living things", correct: true }],
		correct: 0
	},

	{
		question: "Wie kannst du deine Sprossen geschmacklich noch verbessern und die Verdaulichkeit erhöhen?",
		questionFr : "Comment améliorer le goût de vos pousses et augmenter leur digestibilité ?",
		questionEn : "How can you improve the taste of your sprouts and increase their digestibility?",
		imageUrl: "assets/img/rawfood/buchweizenreiki.png",
		type: "multiple choice",
		options: [{ option : "mit bisschen Zucker und Zimt", correct: false }, { option : "mit Reiki", correct: true }],
		optionsFr : [{ option : "avec un peu de sucre et de cannelle", correct : false }, { option : "avec Reiki", correct : true }],
		optionsEn: [{ option : "with a little sugar and cinnamon", correct: false }, { option : "with Reiki", correct: true }],
		correct: 0
	},

	{
		question:"Welche Zubereitungsform von Getreide fördert die Verdaulichkeit und erhöht den Nährstoffgehalt?",
		questionFr: "Quelle forme de préparation des céréales favorise la digestibilité et augmente la teneur en nutriments ?",
		questionEn: "Which form of preparation of grain promotes digestibility and increases the nuitritional content?",
		imageUrl: "assets/img/rawfood/weizensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "als Getreidebrei oder als Keimlinge", correct: true }, { option : "Brot", correct: false }, { option : "Nudeln", correct: false }],
		optionsFr: [{ option : "en tant que bouillie de céréales ou en tant que pousses", correct: true }, { option : "pain", correct: false }, { option : "nouilles", correct: false }],
		optionsEn: [{ option : "cereal porrdige or sprouts", correct: true }, { option : "bread", correct: false }, { option : "pasta", correct: false }],
		correct: 0
	},
	{
		question: "Welche Zutaten gehören in einen Frischkornbrei?",
		questionFr: "Quels ingrédients composent une bouillie de céréales fraîches ?",
		questionEn: "What ingredients belong in a fresh grain porridge?",
		type: "multiple choice",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		options: [{ option : "außer Sprossen aus Pseudogetreide wie Hirse, Buchweizen, Amaranth und Quinoa gehört da nichts rein.", correct: true }, { option : "Kuhmilch, Marmelade, Nüsse, Obst und viel Zucker! Das schmeckt so gut! Hast du das schon mal probiert?", correct: false } ],
		optionsFr : [{ option : "Rien n'y appartient à part les germes de pseudo-céréales comme le mil, le sarrasin, l'amarante et le quinoa.", correct : true }, { option : "Lait de vache, confiture, noix, fruits et beaucoup de sucre ! C'est tellement bon ! Avez-vous déjà essayé ça ?", correct : false } ],
		optionsEn: [{ option: "Nothing belongs in there except sprouts from pseudo-grains such as millet, buckwheat, amaranth and quinoa.", correct: true }, { option: "Cow's milk, jam, nuts, fruit and a lot of sugar! It tastes so good ! Have you tried this before?", correct: false } ],
		correct: 3

	},

	{
		question: "Wie kannst du niemals Selbstbeherrschung und gute Gewohnheiten beim Essen erlangen?",
		questionFr : "Comment ne jamais parvenir à la maîtrise de soi et à de bonnes habitudes alimentaires ?",
		questionEn : "How can you never achieve self-control and good eating habits?",
		imageUrl: "assets/img/rawfood/imwaldjoggen.jpg",
		type: "multiple choice",
		options: [{ option : "Wenn du dich von der Werbung in S-und U-Bahn bombardieren lässt und den schwer kranken Menschen dort beim Fast-Food-Essen und Cola-Trinken zuschaust.", correct: true }, { option : "Wenn du dich in den Wald begibst, wo es nur Löwenzahn und andere Wildkräuter gibt", correct: false }, { option : "Wenn du ständig mit Sklaven der Sinne verkehrst, die ihre Unterscheidungskraft lange verloren haben und die dir Kuchen essend und Kaffe trinkend erklären, dass der Körper bestimmte Nährstoffe braucht", correct: true }],
		optionsFr : [{ option : "Si vous vous laissez bombarder par la publicité dans le S-Bahn et le métro et que vous regardez les gens gravement malades manger de la restauration rapide et boire du cola.", correct : true }, { option : "Si vous y allez dans la forêt, où il n'y a que des pissenlits et autres herbes sauvages", correct: false }, { option : "Si vous fréquentez constamment des esclaves des sens qui ont depuis longtemps perdu leur pouvoir de discrimination et qui vous donnent du gâteau et du café en buvant , expliquez que le corps a besoin de certains nutriments", correct : true }],
		optionsEn: [{ option: "If you let yourself be bombarded by advertising in the S-Bahn and subway and watch the seriously ill people there eating fast food and drinking cola.", correct: true }, { option: "If you go into the forest, where there are only dandelions and other wild herbs", correct: false }, { option : "If you constantly associate with slaves of the senses who have long lost their power of discrimination and who give you advise on nutrition while drinking coffee.", correct: true }],
		correct: 0
	},

	{
		question: "Du bist ein Sklave der Sinne, der sich gute Essgewohnheiten aneignen will und der jeden Tag von einem Vorort in die Münchner Innenstadt zur Arbeit fahren muss. Wie kommst du dort am besten hin?",
		questionFr : "Vous êtes un esclave des sens qui souhaite développer de bonnes habitudes alimentaires et qui doit chaque jour se rendre au travail en voiture depuis la banlieue jusqu'au centre-ville de Munich. Quelle est la meilleure façon d'y arriver ?",
		questionEn : "You are a slave of the senses who wants to develop good eating habits and who has to drive to work every day from a suburb to downtown Munich. What's the best way to get there?",
		imageUrl: "assets/img/rawfood/fahrrad.PNG",
		type: "multiple choice",
		options: [{ option : "Mit S-und U-Bahn, denn man kann ja einfach an der ganzen Werbung für Fast-Food und den kranken Menschen, die es dort essen und trinken unbeeinflusst vorbei gehen", correct: false }, { option : "Du wirst leider mit dem Fahrrad fahren müssen, selbst bei -12 Grad im Winter. Bonus: Du bekommst frische Luft und Bewegung und entgehst dem Elektrosmog", correct: true }],
		optionsFr : [{ option : "Avec le S-Bahn et le U-Bahn, car vous pouvez simplement passer devant toutes les publicités pour la restauration rapide et les malades qui y mangent et y boivent sans être influencés", correct : false }, { option : "Malheureusement, vous devrez faire du vélo, même à -12 degrés en hiver. Bonus : vous pourrez prendre l'air, faire de l'exercice et éviter l'électrosmog", correct : true }],
		optionsEn: [{ option: "With S-Bahn and U-Bahn, because you can just walk past all the advertising for fast food and the sick people who eat and drink without being influenced", correct: false }, { option : "Unfortunately, you'll have to ride your bike, even at -12 degrees in winter. Bonus: you'll get fresh air and exercise and avoid the electrosmog", correct: true }],
		correct: 0
	},

	{
		question: "Was macht schlechte Haut?",
		questionFr : "Qu’est-ce qui cause une mauvaise peau ?",
		questionEn : "What causes bad skin?",
		imageUrl: "assets/img/rawfood/haut.PNG",
		type: "multiple choice",
		options: [{ option : "Zucker (z.B. Obst) und Fett (z.B. Öl) und Chemie (z.B. Shampoo, Sonnencreme, etc...)", correct: true }, { option : "Wildkräuter", correct: false }, { option : "Algen", correct: false }, { option : "Leinsamensprossen", correct: false }],
		optionsFr : [{ option : "Sucre (ex. fruits) et graisses (ex. huile) et produits chimiques (ex. shampoing, crème solaire, etc...)", correct : true }, { option : "Herbes sauvages", correct : false } , { option : "Algues", correct : false }, { option : "Pousses de lin", correct : false }],
		optionsEn: [{ option : "Sugar (e.g. fruit) and fat (e.g. oil) and chemicals (e.g. shampoo, sunscreen, etc...)", correct: true }, { option : "Wild herbs", correct: false }, { option : "Algae", correct: false }, { option : "Flaxseed sprouts", correct: false }],
		correct: 0
	},

	{
		question: "Ca. 3 Stunden lang solltest du nach schweren Mahlzeiten (z.B. nach einer 200g-Linsensprossen-Monomahlzeit) nichts trinken? Wann solltest du denn dann trinken?",
		questionFr : "Quel instrument est utile pour améliorer la qualité de l'eau?",
		questionEn : "Which instrument is useful to improve the quality of water?",
		imageUrl: "assets/img/rawfood/verredeleau2.png",
		type: "multiple choice",
		options: [{ option : "Eine halbe Stunde vor einer Mahlzeit", correct: true }, { option : "Während einer Mahlzeit", correct: false }, { option : "gar nichts mehr", correct: false }],
		optionsFr: [{ option : "un vitaliseur d'eau", correct: true }, { option : "sirop", correct: false }],
		optionsEn: [{ option : "a vitalizer of water", correct: true }, { option : "sirop", correct: false }],
		correct: 0
	},

	{
		question: "Warum isst ein Rohköstler Hanfsprossen?",
		questionFr: "Pourquoi un crudivore ajoute-t-il des pousses de chanvre à sa bouillie de céréales fraîches? ",
		questionEn: "Why does a raw fooder add hempsprouts to his fresh grain porridge?",
		imageUrl: "assets/img/rawfood/hanfsprossen.jpg",
		type: "multiple choice",
		options: [{ option : "wegen der berauschenden Wirkung", correct: false }, {option: "Wegen dem optimalen Fettsäurespektrum mit vielen Omega-3-Fettsäuren und dem würzigen Geschmack", correct: true } ],
		optionsEn: [{ option : "because of the intoxicating effect", correct: false }, { option : "because of the fat and the spicey taste", correct: true }],
		optionsFr: [{ option : "à cause de l'effet intoxicant", correct: false }, { option : "à cause du gras et du goût épicé", correct: true }],
		correct: 1
	},
	{
		question: "Wie heißt dieses Gemüse?",
		questionFr: "Comment est-ce qu'on appelle ce légume?",
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
		optionsEn: [{ option : "celeriac", correct: true }, { option : "radish", correct: false }],
		optionsFr: [{ option : "céleri-rave", correct: true }, { option : "radis", correct: false }],
		correct: 0
	},
	{
		question:"Warum lernst du nirgendwo, dass Giersch essbar und gesund ist?",
		questionFr: "Pourquoi n’apprenez-vous nulle part que les plantes de sol sont comestibles et saines?",
		questionEn: "Why don't you learn anywhere that groundweed is edible and healthy?",
		imageUrl: "assets/img/rawfood/giersch.png",
		type: "multiple choice",
		options: [{ option : "weil es keine Werbung einer Gierschindustrie gibt, die den Giersch pasteurisiert, kocht, haltbar macht und dann in Tablettenform verkauft", correct: true }, { option : "Weil der Mensch kein Wiederkäuer ist und Giersch nicht gesund", correct: false }],
		optionsFr: [{ option : "car il n'y a pas de publicité d'une industrie de la courge qui pasteurise la courge, la cuit, la conserve puis la vend sous forme de comprimés", correct: true }, { option : "Parce que les humains ne sont pas des ruminants et que la courge n'est pas saine", correct: false }],
		optionsEn: [{ option : "because there is no advertising from the groundweed industry that pasteurizes the groundweed, cooks it, preserves it and then sells it in tablet form", correct: true }, { option : "Because humans are not ruminants and groundweed is not healthy", correct: false }],
		correct: 0
	},
	
	{
		question: "Wie schmeckt Rote Beete?",
		questionFr: "Quel goût la betterave a-t-elle?",
		questionEn: "How does beetroot taste?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: [{ option : "bitter", correct: false }, { option : "süß", correct: true }, { option : "scharf", correct: false }],
		optionsEn: [{ option : "bitter", correct: false }, { option : "sweet", correct: true }, { option : "spicey", correct: false }],
		optionsFr: [{ option : "amer", correct: false }, { option : "sucré", correct: true }, { option : "épicé", correct: false }],
		correct: 1
	},
	{
		question: "Sprossen aus Leinsamen sind wertvoll, weil sie viel Omega-3-Fettsäuren enthalten. Wie schmecken wohl Leinsamensprossen?",
		questionEn: "Linseed sprouts are valuable because they contain a lot of fat. What do linseed sprouts taste like?",
		questionFr: "Les pousses de lin sont précieuses parce qu'elles contiennent beaucoup de graisse. Quel goût les pousses de lin ont-t-elles?",
		imageUrl: "assets/img/rawfood/leinsamensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "scharf", correct: false }, { option : "wie Schokolade", correct: true }],
		optionsEn: [{ option : "spicey", correct: false }, { option : "like chocolate", correct: true }],
		optionsFr: [{ option : "épicé", correct: false }, { option : "comme du chocolat", correct: true }],
		correct: 1
	},
	{
		question: "Welches Keimgerät ist am besten für gelierende Leinsamen geeignet?",
		questionEn: "Linseed sprouts are valuable because they contain a lot of fat. What do linseed sprouts taste like?",
		questionFr: "Les pousses de lin sont précieuses parce qu'elles contiennent beaucoup de graisse. Quel goût les pousses de lin ont-t-elles?",
		imageUrl: "assets/img/rawfood/leinsamensprossen.jpg",
		type: "multiple choice",
		options: [{ option : "Kressesieb", correct: true }, { option : "Keimglas", correct: false }, { option: "Keimschale mit Vliespapier", correct: true } ],
		optionsEn: [{ option : "spicey", correct: false }, { option : "like chocolate", correct: true }],
		optionsFr: [{ option : "épicé", correct: false }, { option : "comme du chocolat", correct: true }],
		correct: 1
	},
	{
		question: "Wie sollten Kressesprossen schmecken?",
		questionEn: "What does cress taste like?",
		questionFr: "Quel est le goût du cresson?",
		imageUrl: "assets/img/rawfood/kresse.jpg",
		type: "multiple choice",
		options: [{ option : "scharf", correct: true }, { option : "bitter", correct: false }, { option : "süß", correct: false }],
		optionsEn: [{ option : "spicey", correct: true }, { option : "bitter", correct: false }, { option : "sweet", correct: false }],
		optionsFr: [{ option : "épicé", correct: true }, { option : "amer", correct: false }, { option : "sucré", correct: false }],
		correct: 0
	},

	{
		question: "Welche Zutaten gehören in einen Frischkornbrei?",
		questionEn: "Which ingredient does not belong in a fresh grain porridge?",
		questionFr: "Quel ingrédient n'a pas sa place dans une bouillie de céréales fraîches?",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Kuhmilch, Haferflocken, Butter, Sahne, Obst und Nüsse als Konglomerat", correct: false }, { option : "Außer Sprossen aus Pseudogetreide wie Hirse, Buchweizen, Amaranth und Quinoa gehört da nichts rein. Eine leicht verdauliche Monomahlzeit also!", correct: true }],
		optionsEn: [{ option : "water", correct: false }, { option : "spelt", correct: false }, { option : "milk", correct: true }, { option : "sunflower seeds", correct: false }, { option : "rasperries", correct: false }],
		optionsFr: [{ option : "de l'eau", correct: false }, { option : "de l'épeautre", correct: false }, { option : "du lait", correct: true }, { option : "des graines de tournesol", correct: false }, { option : "des framboises", correct: false }],
		correct: 2
	},

	{
		question: "Wer bringt dich schneller um?",
		questionEn: "Who kills you faster?",
		questionFr: "Qui te tuera plus vite?",
		imageUrl: "assets/img/rawfood/lovingcook.png",
		type: "multiple choice",
		options: [{ option : "Ein sehr guter Arzt", correct: false }, { option : "Eine dich liebende Köchin", correct: true }],
		optionsEn: [{ option : "a very good doctor", correct: false }, { option : "a cook who loves you", correct: true }],
		optionsFr: [{ option : "un très bon médecin", correct: false }, { option : "une cuisinière qui t'aime", correct: true }],
		correct: 1
	},

	{
		question: "Deine Großmutter backt dir eine leckere Apfeltorte? Was ist das?",
		questionEn: "Who kills you faster?",
		questionFr: "Qui te tuera plus vite?",
		imageUrl: "assets/img/rawfood/lovingcook.png",
		type: "multiple choice",
		options: [{ option : "Liebe", correct: false }, { option : "Schwere Körperverletzung", correct: true }],
		optionsEn: [{ option : "a very good doctor", correct: false }, { option : "a cook who loves you", correct: true }],
		optionsFr: [{ option : "un très bon médecin", correct: false }, { option : "une cuisinière qui t'aime", correct: true }],
		correct: 1
	},

	{
		questionFr: "Comment est-ce qu'on appelle cette salade?",
		questionEn: "What is this salad called?",
		question: "Wie heißt dieser Salat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: [{ option : "Zuckerhut", correct: false }, { option : "Kopfsalat", correct: false }, { option : "Chicoree", correct: false }, { option : "Endiviensalat", correct: true }],
		optionsEn: [{ option : "sugar loaf", correct: false }, { option : "lettuce", correct: false }, { option : "chicory", correct: false }, { option : "endive", correct: true }],
		optionsFr: [{ option : "pain de sucre", correct: false }, { option : "laitue", correct: false }, { option : "chicorée", correct: false }, { option : "endive", correct: true }],
		correct: 3
	},

	{
		question: "Warum ist es riskant, Essen zu konsumieren, was die Sinne erfreut aber der Körper nicht unbedingt braucht (z.B. Obst, Fruchtgemüse, Zwiebeln, Essig, Gewürz) ?",
		questionEn: "Why is it risky to consume food that pleases the senses but that the body does not necessarily need (fruit, fruit vegetables, vinegar, spices) ?",
		questionFr: "Pourquoi est-il risqué de consommer des aliments qui plaisent aux sens mais dont le corps n'a pas forcément besoin (ex. fruits, oignons, vinaigre, épices) ?",
		imageUrl: "assets/img/rawfood/yogiaufnagelbrett.png",
		type: "multiple choice",
		options: [{ option : "aus Kostengründen", correct: false }, { option : "Du verlierst die Unterscheidungskraft (zwischen Bedürfnissen der Sinne und des Körpers)", correct: true }],
		optionsEn: [{ option : "because of cost", correct: false }, { option : "You lose the power of discrimination (between the needs of the body and the senses)", correct: true }],
		optionsFr: [{ option : "à cause du coût", correct: false }, { option : "Tu perds le pouvoir de distinction (entre les besoins des sens et les besoins du corps)", correct: true }],
		correct: 3
	},


	{
		question: "Wie schmeckt Endiviensalat?",
		questionEn: "How does endivie taste?",
		questionFr: "Quel est le goût de l'endive?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: [{ option : "süß", correct: false }, { option : "bitter", correct: true }, { option : "scharf", correct: false }],
		optionsEn: [{ option : "sweet", correct: false }, { option : "bitter", correct: true }, { option : "spicey", correct: false }],
		optionsFr: [{ option : "sucré", correct: false }, { option : "amer", correct: true }, { option : "épicé", correct: false }],
		correct: 1
	},

		{
		question: "Welches Buch solltest du eher lesen, wenn du Kontrolle über die Sinne und den Geist gewinnen willst ?",
		questionEn: "Which book should you read if you want to gain control over your senses and mind ?",
		questionFr: "Quel livre devrais-tu lire si tu souhaites prendre le contrôle de tes sens et de ton esprit ?",
		imageUrl: "assets/img/rawfood/bhagavadgita.png",
		type: "multiple choice",
		options: [{ option : "Bhagavda Gita", correct: true }, { option : "Schnelle und leckere Rezepte mit nur fünf Zutaten für Fleisch, Fisch, vegetarische und süße Gerichte - mit Ideen für Gewürzmischungen und Rubs", correct: false }],
		optionsEn: [{ option : "Bhagavda Gita", correct: true }, { option : "Men with the Pot Cookbook: Delicious Grilled Meats and Forest Feasts", correct: true }],
		optionsFr: [{ option : "Bhagavda Gita", correct: true }, { option : "Recettes de cuisine traditionnelle de viande de porc", correct: true }],
		correct: 0
	},

		{
		question: "Was ist Geschmack ?",
		questionEn: "Which book should you read if you want to gain control over your senses and mind ?",
		questionFr: "Quel livre devrais-tu lire si tu souhaites prendre le contrôle de tes sens et de ton esprit ?",
		imageUrl: "assets/img/rawfood/bhagavadgita.png",
		type: "multiple choice",
		options: [{ option : "Gewohnheit", correct: true }, { option : "angeboren", correct: false }],
		optionsEn: [{ option : "Bhagavda Gita", correct: true }, { option : "Men with the Pot Cookbook: Delicious Grilled Meats and Forest Feasts", correct: true }],
		optionsFr: [{ option : "Bhagavda Gita", correct: true }, { option : "Recettes de cuisine traditionnelle de viande de porc", correct: true }],
		correct: 0
	},

	{
		question: "Warum werden Rohköstler satt?",
		questionEn: "How do raw food eaters get full?",
		questionFr: "Pourquoi les mangeurs de nourriture crue sont-ils rassasiés?",
		imageUrl: "assets/img/rawfood/kichererbsensalat.jpg",
		type: "multiple choice",
		options: [{option: "Weil sie literweise Orangensaft trinken", correct: false }, { option : "Weil sie tonnenweise Salat essen", correct: false }, { option : "Weil sie balast-und nährstoffreiche Pflanzen wie Sprossen aus Hülsenfrüchten und Getreide konsumieren", correct: true }],
		optionsEn: [{ option : "they eat tons of salad", correct: false }, { option : "they eat sprouts from grains and legumes", correct: true }],
		optionsFr: [{ option : "Parce qu'ils mangent des tonnes de salade", correct: false }, { option : "Parce qu'ils mangent des germes de céréales et de légumineuses", correct: true }],
		correct: 1
	},



	{
		question: "Woran erkennt man laut dem Rohkost-Guru und Zahnarzt Dr. Schnitzer am eindeutigsten, dass der Mensch ein Fruchtesser (Samen, Wurzelknollen, Blattschösslinge) ist ? ",
		questionEn: "According to raw food guru and dentist Dr. Schnitzer, how can you see most clearly that humans are fruit eaters (seeds, root tubers, leafy shoots) ?",
		questionFr: "Selon le gourou des aliments crus et dentiste Dr. Schnitzer, comment est-ce qu'on peut voir très clairement que les humains sont des mangeurs de fruits (graines, tubercules, pousses feuillues) ?",
		imageUrl: "assets/img/rawfood/johannschnitzer.gif",
		type: "multiple choice",
		options: [{ option : "an der Länge seines Darms", correct: false }, { option : "an seinem Gebiss", correct: true }, { option : "an der chemischen Zusammensetzung der Magensäure", correct: false }],
		optionsEn: [{ option : "by the length of their intestines", correct: false }, { option : "by their teeth", correct: true }, { option : "by the chemical composition of their stomach acid", correct: false }],
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
		optionsEn: [{ option : "red cabbage", correct: false }, { option : "white cabbage", correct: true }],
		correct: 1
	},

	{
		question: "Wie viel Zeit braucht es zwischen zwei Mahlzeiten?",
		questionFr: "Combien de temps faut-il entre deux repas?",
		questionEn: "How much time should pass between two meals?",
		imageUrl: "assets/img/rawfood/weißkohl.jpg",
		type: "multiple choice",
		options: [{ option : "Essenspause, bis die letzte Mahlzeit verdaut ist, was bei schweren Mahlzeiten 3-4 Stunden dauert", correct: true }, { option : "Verdauung kann jederzeit alles verarbeiten, solange die Nahrung gesund ist", correct: false }],
		optionsFr: [{ option : "assez jusqu'à ce que le premier soit digéré, de préférence jusqu'à ce que vous ayez vraiment faim et que vous soyez épuisé par le sport ou le travail", correct: true }, { option : "peu importe, ce n'est aucun problème pour la digestion non plus de manger beaucoup de fruits différents en seul repas", correct: false }],
		optionsEn: [{ option : "enough until the first one has been digested, preferably until you are really hungry and exhausted from sport or work", correct: true }, { option : "It doesn't matter. Nor is it a problem for the digestion to eat many different fruits in one meal", correct: false }],
		correct: 1
	},



	{
		question: "In welcher Form sollte man Hülsenfrüchte (Linsen, Süßlupinen, Mungobohnen, Kichererbsen, etc...) im Sinne der Gesundheit und der Leistungsfähigkeit am besten essen ?",
		questionFr: "Sous quelle forme consommer au mieux des légumineuses (lentilles, lupins doux, haricots mungo, pois chiches…) pour la santé et la performance ?",
		questionEn: "In what form should you best eat legumes (lentils, sweet lupins, mung beans, chickpeas, etc.) for health and performance?",
		type: "multiple choice",
		imageUrl: "assets/img/rawfood/sprouttowers.png",
		options: [{ option : "gekocht", correct: false }, { option : "geröstet", correct: false }, { option : "gemahlen", correct: false }, { option : "gesprosst", correct: true }],
		optionsFr:  [{ option : "bouilli", correct: false }, { option : "rôti", correct: false }, { option : "moulu", correct: false }, { option : "germé", correct: true } ],
		optionsEn:  [{ option : "boiled", correct: false }, { option : "roasted", correct: false }, { option : "ground", correct: false }, { option : "sprouted", correct: true } ],
		correct: 3

	},

	{
		question: "Was machen Rohköstler im Winter?",
		questionFr: "Que font les crudivores en hiver?",
		questionEn: "What do raw food eaters do in winter?",
		imageUrl: "assets/img/rawfood/winter.png",
		type: "multiple choice",
		options: [{ option : "Eine warme Jacke anziehen", correct: true }, { option : "Weil die rohen Sprossen, Frischkornbreie und Gemüse von innen wärmen, laufen sie auch im Winter mit kurzer Hose und T-Shirt rum.", correct: false }],
		optionsFr: [{ option : "Porter une veste chaude", correct: true }, { option : "Parce que les pousses crues, la bouillie de céréales fraîches et les légumes les réchauffent de l'intérieur, ils se promènent en short et en T-shirt même en hiver.", correct: false }],
		optionsEn: [{ option : "Wear a warm jacket", correct: true }, { option : "Because the raw sprouts, fresh grain porridges and vegetables warm them from the inside, they walk around in shorts and a T-shirt even in winter", correct: false }],
		correct: 1
	},

	{
		question: "Was hält am besten im Winter warm, wo der Effekt auch noch einen bis zwei Tage nachwirkt ?",
		questionFr: "Que font les crudivores en hiver ?",
		questionEn: "What do raw food eaters do in winter ?",
		imageUrl: "assets/img/rawfood/winter.png",
		type: "multiple choice",
		options: [{ option : "Muskelaufbautraining", correct: true }, { option : "Spazieren gehen", correct: false }],
		optionsFr: [{ option : "Porter une veste chaude", correct: true }, { option : "Parce que les pousses crues, la bouillie de céréales fraîches et les légumes les réchauffent de l'intérieur, ils se promènent en short et en T-shirt même en hiver.", correct: false }],
		optionsEn: [{ option : "Wear a warm jacket", correct: true }, { option : "Because the raw sprouts, fresh grain porridges and vegetables warm them from the inside, they walk around in shorts and a T-shirt even in winter", correct: false }],
		correct: 1
	},

	{
		question: "Was machen Rohköstler im Winter?",
		questionFr: "Que font les crudivores en hiver?",
		questionEn: "What do a raw food eaters do in winter?",
		imageUrl: "assets/img/rawfood/winter.png",
		type: "multiple choice",
		options: [{ option : "Viel Sport zum Muskelaufbau und Yoga", correct: true }, { option : "Im Angesicht der Kälte müssen sie einsehen, dass Nahrung gekocht sein muss", correct: false }],
		optionsEn: [{ option : "A lot of sports and Yoga to warm up", correct: false }, { option : "Facing the cold weather, they have to admit that food must be cooked", correct: false }],
		optionsFr: [{ option : "Beaucoup de sport et de yoga pour se rechauffer", correct: true }, { option : "Face au froid, ils doivent reconnaitre que la nourriture doit être cuite", correct: false }],
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
		question: "Was bedeutet frisch in Frischkornbrei?",
		questionFr: "Que signifie frais dans la bouillie de céréales fraîches?",
		questionEn: "What does fresh mean in fresh grain porridge?",
		imageUrl: "assets/img/rawfood/roggenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Frisch gekocht", correct: false }, { option : "Frisch gemahlen, aus keimfähigem Getreide", correct: true }],
		optionsFr: [{ option : "Fraîchement cuit", correct: false }, { option : "fraîchement moulu, à partir de grains germinables", correct: true }],
		optionsEn: [{ option : "Freshly cooked", correct: false }, { option : "Freshly ground, from germinable grains", correct: true }],
		correct: 1
	},
	{
		question: "Warum sind Getreidesprossen noch besser als Frischkornbrei?",
		questionFr: "Pourquoi les graines germées sont-elles encore meilleures que la bouillie de céréales fraîches?",
		questionEn: "Why are grain sprouts even better than fresh grain porridge?",
		imageUrl: "assets/img/rawfood/roggenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Der Keimprozess reduziert Glutein auf ein verträgliches Minimum", correct: true }, { option : "Weil im Getreidebrei Wasser drin ist, was die Magensäure verdünnt", correct: true }, { option : "Das Kochen der Sprossen erhöht den Nährstoffgehalt", correct: false }],
		optionsFr: [{ option : "Parce que le processus de germination réduit le gluten à un minimum tolérable", correct: true }, { option : "Parce que la bouillie de céréales contient de l'eau, qui dilue l'acide gastrique.", correct: true }, { option : "Car si vous faites cuire les pousses à l’avance, elles sont plus faciles à digérer", correct: false }],
		optionsEn: [{ option : "Because the germination process reduces gluten to a tolerable minimum.", correct: true }, { option : "Because cereal porridge contains water, which dilutes the acid in the stomach.", correct: true },  { option : "Because if you cook the sprouts beforehand, they are easier to digest.", correct: false }],
		correct: 1
	},

	{
		question: "Welche gluteinfreien Getreide und Pseudogetreide eignen sich gut zur Zubereitung eines Breis aus Sprossen?",
		questionFr: "Quelles céréales ne contiennent pas de gluten et peuvent être consommées sous forme de bouillie à base de germes ?",
		questionEn: "Which grains do not contain gluten and can be eaten as a porridge made from sprouts?",
		imageUrl: "assets/img/rawfood/buchweizenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Roggen", correct: false }, { option : "Buchweizen", correct: true }, { option : "Weizen", correct: false },  { option : "Quinoa", correct: true },  { option : "Amaranth", correct: true } ],
		optionsFr: [{ option : "Seigle", correct: false }, { option : "Sarrasin", correct: true }, { option : "Blé", correct: false },  { option : "Quinoa", correct: true },  { option : "Amarante", correct: true }],
		optionsEn: [{ option : "Rye", correct: false }, { option : "Buckwheat", correct: true }, { option : "Wheat", correct: false },  { option : "Quinoa", correct: true },  { option : "Amaranth", correct: true }],
		correct: 1
	},

	{
		question: "Warum ist ein Brei aus Amaranth gegenüber einem aus Roggen-Sprossen eindeutig zu bevorzugen?",
		questionFr: "Pourquoi une bouillie à base d'amarante est-elle nettement préférable à une bouillie à base de pousses de seigle?",
		questionEn: "Why is a porridge made from amaranth clearly preferable to one made from rye sprouts?",
		imageUrl: "assets/img/rawfood/amaranthbrei.jpg",
		type: "multiple choice",
		optionsEn: [{ option : "Because amaranth is gluten-free", correct: true }, { option : "Because amaranth is cheaper", correct: false }, { option : "Because amaranth tastes very bitter, so you don't lose control of your senses", correct: true } ],
		optionsFr: [{ option : "Parce que l'amarante ne contient pas de gluten", correct: true }, { option : "Parce que l'amarante est moins chère", correct: false }, { option : "Parce que l'amarante a un goût très amer, donc vous ne perdez pas le contrôle de vos sens", correct: true } ],
		options: [{ option : "Weil Amaranth glutenfrei ist", correct: true }, { option : "Weil Amaranth billiger ist", correct: false }, { option : "Weil Amaranth nicht den gewohnten süßen Geschmack triggert, sodass du die Herrschaft über deine Sinne nicht verlierst", correct: true } ],
		correct: 1
	},

	{
		question: "Wofür ist Glutein im Getreide gut?",
		questionFr: "À quoi sert le gluten présent dans les céréales?",
		questionEn: "What gluten in grains is good for?",
		imageUrl: "assets/img/rawfood/buchweizenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Glutein ist essentiell für Gesundheit und Leistungsfähigkeit", correct: false }, { option : "Sie liefern den Kleber, damit der Bäcker leichter Produkte zur Befriedung der Sinne backen kann.", correct: true } ],
		optionsFr: [{ option : "Pour la santé", correct: false }, { option : "Il fournit la colle qui permet au boulanger de préparer plus facilement des produits qui satisfont les sens.", correct: true }],
		optionsEn: [{ option : "For your health", correct: false }, { option : "They provide the glue so that the baker can more easily bake products that satisfy the senses.", correct: true }],
		correct: 1
	},

	{
		question: "Was ist der Vorteil von einem Brei aus Reis-Sprossen gegenüber einem Brei aus Roggen-Sprossen?",
		questionFr: "Quel est l'avantage d'une bouillie à base de pousses de riz par rapport à une bouillie à base de pousses de seigle ??",
		questionEn: "What is the advantage of a porridge made from rice sprouts compared to a porridge made from rye sprouts??",
		imageUrl: "assets/img/rawfood/reisbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Reis ist glutenfrei", correct: true }, { option : "Reis ist billiger", correct: false }, { option : "Reis keimt schneller als Roggen", correct: false } ],
		optionsEn: [{ option : "Rice is gluten-free", correct: true }, { option : "Rice is cheaper", correct: false }, { option : "Rice germinates faster than rye", correct: false } ],
		optionsFr: [{ option : "Le riz ne contient pas de gluten", correct: true }, { option : "Le riz est moins cher", correct: false }, { option : "Le riz germe plus vite que le seigle", correct: false } ],
		correct: 1
	},

	{
		question: "Wie kannst du die überschüssige Energie sinnvoll verbrauchen, wenn du einmal zuviele Sprossen gezüchtet hast?",
		questionFr: "Comment pouvez-vous utiliser judicieusement l’excès d’énergie si vous avez fait pousser trop de pousses ??",
		questionEn: "How can you use the excess energy sensibly if you have grown too many sprouts??",
		imageUrl: "assets/img/rawfood/imwaldjoggen.jpg",
		type: "multiple choice",
		options: [{ option : "Barfuß im Wald joggen", correct: true }, { option : "Dich mit deiner Familie streiten", correct: false }, { option : "Chatten und Telefonieren", correct: false } ],
		optionsEn: [{ option : "Jogging barefoot in the forest", correct: true }, { option : "Arguing with your family", correct: false }, { option : "Chatting and making phone calls", correct: false } ],
		optionsFr: [{ option : "Courir pieds nus en forêt", correct: true }, { option : "Se disputer avec votre famille", correct: false }, { option : "Discuter et téléphoner", correct: false } ],
		correct: 1
	},

	{
		question: "Welches Öl ist am besten weil am wenigsten oxidationsanfällig?",
		questionFr: "Quelle huile est la meilleure parce qu’elle est la moins sensible à l’oxydation?",
		questionEn: "Which oil is best because it is the least susceptible to oxidation?",
		imageUrl: "assets/img/rawfood/oliveoil.png",
		type: "multiple choice",
		options: [{ option : "Olivenöl", correct: true }, { option : "Rapsöl", correct: false } ],
		optionsFr: [{ option : "L'huile d'olive", correct: true }, { option : "L'huile de colza", correct: false }],
		optionsEn: [{ option : "Olive oil", correct: true }, { option : "Rapeseed oil", correct: false }],
		correct: 1
	},

	{
		question: "Wie viel spart ein Rohköstler pro Jahr, indem er gar kein Öl verwendet? (Leinsamen sind im Vergleich quasi geschenkt.)",
		questionFr: "Combien un spécialiste de l’alimentation crue économise-t-il par an en n’utilisant pas d’huile du tout? (En comparaison, les graines de lin sont pratiquement gratuites.)",
		questionEn: "How much does a raw foodist save per year by not using oil at all? (In comparison, linseeds are practically free.)",
		imageUrl: "assets/img/rawfood/leinsamen.png",
		type: "multiple choice",
		options: [{ option : "1 Flasche Öl pro Woche = 52* 10 Euro = 520 Euro pro Jahr", correct: true }, { option : "viele Hautunreinheiten", correct: true }, { option : "Er muss mit seiner Gesundheit zahlen", correct: false } ],
		optionsEn: [{ option : "1 bottle of oil per week = 52* 10 euros = 520 euros per year", correct: true }, { option : "many skin blemishes", correct: true }, { option : "He loses his health", correct: false } ],
		optionsFr: [{ option : "1 bouteille d'huile par semaine = 52* 10 euros = 520 euros par an", correct: true }, { option : "de nombreuses imperfections cutanées", correct: true }, { option : "Il perd sa santé", correct: false } ],
		correct: 1
	},

	{
		question: "Welches Prinzip würde dich sofort rundum gesund machen, weil du dadurch selber denken und fühlen lernen könntest?",
		questionFr: "Quel principe vous rendrait immédiatement en parfaite santé car il vous permettrait d'apprendre à penser et à ressentir par vous-même ?",
		questionEn: "Which principle would immediately make you completely healthy because it would allow you to learn to think and feel for yourself?",
		imageUrl: "assets/img/rawfood/satanismus.png",
		type: "multiple choice",
		optionsEn: [{ option : "Pay every doctor's treatment yourself in addition to health insurance and taxes for the satanic-communist system (also don't deduct it from your taxes)", correct: true }, { option : "Go to the doctor as much as possible, because it's free", correct: false } ],
		options: [{ option : "Jede Arztbehandlung zusätzlich zu der Krankenversicherung und den Steuern für's satanistisch-kommunistische System selber zahlen (auch nicht von der Steuer absetzen)", correct: true }, { option : "Soviel zum Arzt gehen wie möglich, weil es ja kostenlos ist", correct: false } ],
		optionsFr: [{ option : "Payez vous-même les soins de chaque médecin en plus de l'assurance maladie et des impôts du système satanique-communiste (ne les déduisez pas non plus de vos impôts)", correct: true }, { option : "Allez au médecin autant que possible, car c'est gratuit", correct: false } ],
		correct: 1
	},

	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "Which ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/weißkohlsalat.jpg",
		type: "multiple choice",
		options: [{ option : "Weißkohl", correct: false }, { option : "Weizen", correct: false }, { option : "Rote Beete", correct: false }, { option : "Karotte", correct: true }, { option : "Süßlupinen", correct: false }],
		optionsFr: [{ option : "chou blanc", correct: false }, { option : "blé", correct: false }, { option : "betterave", correct: false }, { option : "carotte", correct: true }, { option : "lupin doux", correct: false }],
		optionsEn: [{ option : "white cabbage", correct: false }, { option : "wheat", correct: false }, { option : "beetroot", correct: false }, { option : "carrot", correct: true }, { option : "sweet lupins", correct: false }],
		correct: 3
	},

	{
		question: "Was ist der Vorteil von einer Monomahlzeit aus Mungobohnen gegenüber einem Konglomerat?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "Which ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/monomungobohnen.JPG",
		type: "multiple choice",
		options: [{ option : "leicht verdaulich", correct: true }, { option : "günstiger", correct: true }, { option : "schmeckt nicht", correct: false } ],
		optionsFr: [{ option : "chou blanc", correct: false }, { option : "blé", correct: false }, { option : "betterave", correct: false }, { option : "carotte", correct: true }, { option : "lupin doux", correct: false }],
		optionsEn: [{ option : "white cabbage", correct: false }, { option : "wheat", correct: false }, { option : "beetroot", correct: false }, { option : "carrot", correct: true }, { option : "sweet lupins", correct: false }],
		correct: 3
	},

	{
		question: "Warum ist eine Monomahlzeit aus Belugalinsen gegenüber Belugalinsen mit Gemüse zu bevorzugen?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "Which ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/monobelugalinsen.JPG",
		type: "multiple choice",
		options: [{ option : "Das Gemüse aus dem Supermarkt ist nicht frisch", correct: true }, { option : "Nur Sprossen sind wirklich frisch", correct: true }, { option : "Weil Belugalinsen mit Gemüse eine ungünstige chemische Reaktion machen", correct: false } ],
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
		question: "Wie lange sollte man vor einer Mahlzeit nichts trinken, um die Magensäure nicht zu verdünnen?",
		questionEn: "How long should you not drink before and after a meal to avoid diluting your stomach acid?",
		questionFr: "Combien de temps ne faut-il pas boire avant et après un repas pour éviter de diluer l'acide gastrique?",
		imageUrl: "assets/img/rawfood/verredeleau2.png",
		type: "multiple choice",
		options: [{ option : "15-30 min", correct: true }, { option : "5 min", correct: false }],
		optionsEn: [{ option : "30 min", correct: true }, { option : "5 min", correct: false }],
		optionsFr: [{ option : "30 min", correct: true }, { option : "5 min", correct: false }],
		correct: 1
	},

	{
		question: "Wie lange sollte man nach einer Mahlzeit nichts trinken, um die Magensäure nicht zu verdünnen?",
		questionEn: "How long should you not drink before and after a meal to avoid diluting your stomach acid?",
		questionFr: "Combien de temps ne faut-il pas boire avant et après un repas pour éviter de diluer l'acide gastrique?",
		imageUrl: "assets/img/rawfood/verredeleau2.png",
		type: "multiple choice",
		options: [{ option : "bis zu 4 Stunden in Abhängigkeit von der Mahlzeit", correct: true }, { option : "5 min", correct: false }],
		optionsEn: [{ option : "30 min", correct: true }, { option : "5 min", correct: false }],
		optionsFr: [{ option : "30 min", correct: true }, { option : "5 min", correct: false }],
		correct: 1
	},

	{
		question: "Wie kannst du damit aufhören, zwanghaft Schrott zu essen?",
		questionEn: "How can you stop compulsively eating junk?",
		questionFr: "Comment arrêter de manger compulsivement des cochonneries?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "30 Tage und Nächte Fasten, wie Jesus in der Wüste", correct: false }, { option : "Du musst genügend Sprossen essen, damit du den Unterschied zwischen frisch und tot wirklich verstehst und dann ganz natürlich auf Schrott verzichtest", correct: true }],
		optionsEn: [{ option : "Fasting for 30 days and nights, like Jesus in the desert", correct: false }, { option : "You have to eat enough sprouts so that you really understand the difference between fresh and dead and then naturally avoid junk", correct: true }],
		optionsFr: [{ option : "Jeûner pendant 30 jours et nuits, comme Jésus dans le désert", correct: false }, { option : "Vous devez manger suffisamment de pousses pour bien comprendre la différence entre frais et morts et ensuite éviter naturellement les cochonneries", correct: true }],
		correct: 1
	},

	{
		question: "Wie nennt man im Yoga die Muster im Gehirn, die dich dazu zwingen, deine Sinne zu befriedigen und dabei den Körper zu vergiften?",
		questionEn: "In yoga, what do you call the patterns in the brain that force you to satisfy your senses and poison the body in the process?",
		questionFr: "En yoga, comment appelle-t-on les schémas cérébraux qui vous obligent à satisfaire vos sens et empoisonnent ainsi le corps ?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "Samskaras", correct: true }, { option : "Saskia", correct: false }],
		optionsEn: [{ option : "Samskaras", correct: true }, { option : "Saskia", correct: false }],
		optionsFr: [{ option : "Samskaras", correct: true }, { option : "Saskia", correct: false }],
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
		question: "Ist es gut, soviel verschiedenes Zeug in einer Mahlzeit zu haben wie in diesem Salat?",
		questionFr: "Est-ce bon d'avoir autant de choses différentes dans un même repas comme dans cette salade?",
		questionEn: "Is it good to have so many different things in one meal like in this salad?",
		imageUrl: "assets/img/rawfood/rotkohlsalat.JPG",
		type: "multiple choice",
		options: [{ option : "Nein, Monomahlzeiten wären viel besser für die Verdauung", correct: true }, { option : "Ja, weil die Kombination der Nährstoffe und Vielfalt wichtig ist", correct: false }],
		optionsEn: [{ option : "No, mono meals would be much better for digestion", correct: true }, { option : "Yes, because the combination of nutrients and variety is important", correct: false }],
		optionsFr: [{ option : "Non, les mono-repas seraient bien meilleurs pour la digestion", correct: true }, { option : "Oui, car la combinaison de nutriments et de la variété est importante", correct: false }],
		correct: 1
	},

	{
		question: "Wodurch könnte man Gemüse aus dem Biomarkt ersetzen, was nie wirklich frisch ist?",
		questionFr: "Par quoi remplacer les légumes du marché bio qui ne sont jamais vraiment frais?",
		questionEn: "What could you replace vegetables from the organic market with that are never really fresh?",
		imageUrl: "assets/img/rawfood/nursuesslupinen.JPG",
		type: "multiple choice",
		options: [{ option : "Eine leicht-verdauliche Mono-Mahlzeit nur aus Sprossen essen", correct: true }, { option : "Dosenfutter", correct: false }],
		optionsEn: [{ option : "Eat an easy-to-digest mono meal made only from sprouts", correct: true }, { option : "Canned food", correct: false }],
		optionsFr: [{ option : "Mangez un repas mono facile à digérer à base de germes uniquement", correct: true }, { option : "Nourriture en conserve", correct: false }],
		correct: 1
	},

	{
		question: "Ist Vielfalt bei der Ernährung wichtig?",
		questionFr: "La diversité est-elle importante en nutrition?",
		questionEn: "Is diversity important in nutrition?",
		imageUrl: "assets/img/rawfood/amarantsprossen.jpg",
		type: "multiple choice",
		options: [{ option : "Ja, aber nicht innerhalb einer Mahlzeit. Monomahlzeiten sind für die Verdauung besser", correct: true }, { option : "Ja, die Kombination der Nährstoffe innerhalb einer Mahlzeit ist wichtig für die optimale Produktion von Eiweiß", correct: false }, {option : "Ja, deswegen iss zur Abwechslung auch mal einen Brei aus Amaranthsprossen mit Kürbiskernsprossen zum Frühstück anstatt immer nur Buchweizen-Sprossen mit Hanfsprossen", correct: true }],
		optionsEn: [{ option : "Yes, but not within a meal. Mono meals are better for digestion", correct: true }, { option : "Yes, the combination of nutrients within a meal is important for optimal protein production", correct: false }, {option : "Yes, so for a change, eat a porridge made from amaranth sprouts with pumpkin seed sprouts for breakfast instead of always just buckwheat sprouts with hemp sprouts", correct: true }],
		optionsFr: [{ option : "Oui, mais pas au sein d'un repas. Les repas mono sont meilleurs pour la digestion", correct: true }, { option : "Oui, la combinaison de nutriments au sein d'un repas est importante pour une production optimale de protéines", correct: false }, {option : "Oui, c'est pourquoi vous devriez manger un porridge à base de pousses d'amarante et de graines de citrouille au petit-déjeuner au lieu de toujours uniquement des pousses de sarrasin et de chanvre", correct: true }],
		correct: 1
	},

	{
		question: "Wann ist alles neu, spannend, interessant und aufregend?",
		questionEn: "When is everything new, exciting and interesting?",
		questionFr: "Quand est-ce que tout est nouveau, excitant, intéressant et excitant ?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Mit frischer Rohkost und viel Aufmerksamkeit im Hier und Jetzt", correct: true }, { option : "Mit viel Zucker und wenn du immer stärkere Anregungen brauchst", correct: false }],
		optionsEn: [{ option : "With fresh raw food and a lot of attention in the here and now.", correct: true }, { option : "With a lot of sugar and when you need ever stronger stimulation", correct: false } ],
		optionsFr: [{ option : "Avec des aliments frais et crus et beaucoup d'attention ici et maintenant", correct: true }, { option : "Avec beaucoup de sucre et quand vous avez besoin d'une stimulation toujours plus forte", correct: false } ],
		correct: 3
	},

	{
		question: "Wie kannst du die Qualität vom Wasser verbessern?",
		questionFr: "Comment améliorer la qualité de votre eau?",
		questionEn: "How can you improve the quality of your water?",
		imageUrl: "assets/img/rawfood/waterdestiller.JPG",
		type: "multiple choice",
		options: [{ option : "Mit einem Destilliergerät, um alle Schadstoffe aus dem Leitungswasser zu entfernen", correct: true }, { option : "mit Zucker, damit es nach was schmeckt und die Sinne betört und damit sich meine Unterscheidungskraft erhöht", correct: false }],
		optionsFr: [{ option : "Un alambic", correct: true }, { option : "avec du sucre, pour qu'il ait un goût de quelque chose et enivre les sens et augmente ainsi mon pouvoir de discrimination", correct: false }],
		optionsEn: [{ option : "A still", correct: true }, { option : "with sugar, so that it tastes like something and intoxicates the senses and thus increases my power of discrimination", correct: false }],
		correct: 1
	},
	{
		question: "Wasser macht verschiedene Kristalle, je nachdem wie man es vorher behandelt? Mit welcher Musik wurde dieses Wasser bespielt?",
		questionFr: "L'eau produit des cristaux différents selon la façon dont tu la traites au préalable? Quelle musique jouait-on sur cette eau?",
		questionEn: "Water makes different cristals depending on how you treat it beforehand. What music was played to this water?",
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
		question: "Was könnte Ursache für Kopfschmerzen sein?",
		questionEn: "What could be the cause of a headache?",
		questionFr: "Quelle pourrait être la cause d’un mal de tête?",
		imageUrl: "assets/img/rawfood/internetperkabel.png",
		type: "multiple choice",
		options: [{ option : "Strahlung vom WLAN", correct: true }, { option : "Strahlung vom Handy", correct: true }, { option : "Internet per Kabel", correct: false }  ],
		optionsEn: [{ option : "Radiation from WiFi", correct: true }, { option : "radiation from cell phones", correct: true }, { option : "internet via cable", correct: false } ],
		optionsFr: [{ option : "Rayonnement du WiFi", correct: true }, { option : "rayonnement des téléphones portables", correct: true }, { option : "Internet par câble", correct: false } ],
		correct: 3
	},

	{
		question: "Welche Sprossen sind außer den Getreide, Hülsenfrüchten und Ölsaaten-Sprossen noch wichtig und enthalten viele Nährstoffe?",
		questionEn: "Apart from grains, legumes and oilseed sprouts, which sprouts are important and contain many nutrients?",
		questionFr: "Hormis les céréales, les légumineuses et les germes d’oléagineux, quels germes sont importants et contiennent de nombreux nutriments?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "Grüne Sprossen wie z.B. Brokkoli oder Grünkohl-Sprossen", correct: true }, { option : "Sprossen aus dem Biomarkt, die frisch verpackt wurden", correct: false } ],
		optionsEn: [{ option : "Green sprouts such as broccoli or kale sprouts", correct: true }, { option : "Sprouts from the organic market that were freshly packaged", correct: false } ],
		optionsFr: [{ option : "Pousses vertes telles que pousses de brocoli ou de chou frisé", correct: true }, { option : "Pousses du marché biologique fraîchement emballées", correct: false } ],
		correct: 3
	},

	{
		question: "Was zeigt diese Graphik?",
		questionEn: "What does this graphic show?",
		questionFr: "Que montre ce graphique?",
		imageUrl: "assets/img/rawfood/zuckerkurve.png",
		type: "multiple choice",
		options: [{ option : "Vom Quiz-Author geschätzer Verlauf der Energie, nachdem man Zucker (z.B. Obst) gegessen hat", correct: true }, { option : "Energieverlauf, nachdem man Buchweizensprossen gegessen hat", correct: false } ],
		optionsEn: [{ option : "Energy history estimated by the quiz author after eating sugar (e.g. fruit)", correct: true }, { option : "Energy history after eating buckwheat sprouts", correct: false } ],
		optionsFr: [{ option : "Historique énergétique estimé par l'auteur du quiz après avoir mangé du sucre (par exemple des fruits)", correct: true }, { option : "Historique énergétique après avoir mangé des pousses de sarrasin", correct: false } ],
		correct: 3
	},

	{
		question: "Was zeigt diese Graphik?",
		questionEn: "What does this graphic show?",
		questionFr: "Que montre ce graphique?",
		imageUrl: "assets/img/rawfood/buchweizengraphik.png",
		type: "multiple choice",
		options: [{ option : "Vom Quiz-Author geschätzer Verlauf der Energie, nachdem man Buchweizensprossen gegessen hat", correct: true }, { option : "Energieverlauf, nachdem man frisches Obst gegessen hat", correct: false } ],
		optionsEn: [{ option : "Energy history estimated by quiz author after eating buckwheat sprouts", correct: true }, { option : "Energy history after eating fresh fruit", correct: false } ],
		optionsFr: [{ option : "Historique énergétique estimé par l'auteur du quiz après avoir mangé des pousses de sarrasin", correct: true }, { option : "Historique énergétique après avoir mangé des fruits frais", correct: false } ],
		correct: 3
	},

	{
		question: "Was zeigt diese Graphik?",
		questionEn: "What does this graphic show?",
		questionFr: "Que montre ce graphique?",
		imageUrl: "assets/img/rawfood/Obstesser.png",
		type: "multiple choice",
		options: [{ option : "Energieverlauf für 10 min von einem Rohköstler, der zwei bis drei Sprossen-Mono-Mahlzeiten am Tag isst", correct: false }, { option : "Energieverlauf für 10 min vom Angestellten einer Firma, wo Obst kostenlos bereitgestellt wird.", correct: true } ],
		optionsEn: [{ option : "Energy history estimated by quiz author after eating buckwheat sprouts", correct: true }, { option : "Energy history after eating fresh fruit", correct: false } ],
		optionsFr: [{ option : "Historique énergétique estimé par l'auteur du quiz après avoir mangé des pousses de sarrasin", correct: true }, { option : "Historique énergétique après avoir mangé des fruits frais", correct: false } ],
		correct: 3
	},

	{
		question: "Was geben dir die frischen Sprossen noch außer Energie, weil sie regelmäßig gesäht, gegossen und geerntet werden müssen?",
		questionEn: "What does this graphic show?",
		questionFr: "Que montre ce graphique?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "Struktur", correct: true }, { option : "Wertschätzung für unsere Nahrung", correct: true }, { option: "Schlechten Geschmack und Mangel", correct: false } ],
		optionsEn: [{ option : "Energy history estimated by quiz author after eating buckwheat sprouts", correct: true }, { option : "Energy history after eating fresh fruit", correct: false } ],
		optionsFr: [{ option : "Historique énergétique estimé par l'auteur du quiz après avoir mangé des pousses de sarrasin", correct: true }, { option : "Historique énergétique après avoir mangé des fruits frais", correct: false } ],
		correct: 3
	},

	{
		question: "Was ist neben Sprossen noch essentiell für eine Ernährung mit Nährstoffen im Überfluss, weil sie Jod und viele Mineralien enthalten?",
		questionEn: "Besides sprouts, what else is essential for a diet with plenty of nutrients because they contain iodine and many minerals?",
		questionFr: "Outre les germes, quoi d’autre est essentiel pour une alimentation riche en nutriments, car ils contiennent de l’iode et de nombreux minéraux?",
		imageUrl: "assets/img/rawfood/meeresspagetti.png",
		type: "multiple choice",
		options: [{ option : "Algen", correct: true }, { option : "toter Schrott", correct: false }, { option : "Obst", correct: false }, { option : "Nüsse", correct: false } ],
		optionsEn: [{ option : "Algae", correct: true }, { option : "dead scrap", correct: false }, { option : "fruit", correct: false }, { option : "nuts", correct: false } ],
		optionsFr: [{ option : "Algues", correct: true }, { option : "ferraille morte", correct: false }, { option : "fruit", correct: false }, { option : "noix", correct: false } ],
		correct: 3
	},

	{
		question: "Worauf solltest du bei jeder Mahlzeit wenigstens achten, wenn sie nur aus dem üblichen Schrott besteht?",
		questionEn: "What should you at least pay attention to at every meal if it only consists of the usual junk?",
		questionFr: "À quoi devez-vous au moins faire attention à chaque repas s’il ne s’agit que de cochonneries habituelles ?",
		imageUrl: "assets/img/rawfood/yogiaufnagelbrett.png",
		type: "multiple choice",
		options: [{ option : "Dass dieser tote, wertlose Schrott wenigstens nicht schmeckt, damit er nicht die Sinne betört und du jegliche Unterscheidungskraft verlierst", correct: true }, { option : "Dass es gut schmeckt, viel Zucker und Fett enthält, weil die Betörung der Sinne mir Freude im Leben gibt.", correct: false } ],
		optionsEn: [{ option : "That this dead, worthless junk at least doesn't taste good, so that it doesn't beguile your senses and you lose all ability to distinguish", correct: true }, { option : "That it tastes good, contains a lot of sugar and fat, because the intoxication of the senses gives me joy in life.", correct: false } ],
		optionsFr: [{ option : "Que ces cochonneries mortes et sans valeur au moins n'aient pas bon goût, afin qu'elles ne séduisent pas vos sens et que vous ne perdiez toute capacité de distinction", correct: true }, { option : "Que ce soit a bon goût, contient beaucoup de sucre et de graisse, car l'ivresse des sens me donne de la joie de vivre", correct: false } ],
		correct: 3
	},

	{
		question: "Du hast gerade langen, kräftezährenden Sport gemacht und bist körperlich erschöfpt. Was brauchst du nun zum Essen?",
		questionEn: "What should you at least pay attention to at every meal if it only consists of the usual junk?",
		questionFr: "À quoi devez-vous au moins faire attention à chaque repas s’il ne s’agit que de cochonneries habituelles ?",
		imageUrl: "assets/img/rawfood/buchweizenbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Kraftfutter, Kohlehydrate, d.h. Getreide oder Hülsenfrüchte", correct: true }, { option : "Vitamine, d.h. frischen Löwenzahn, Brokoli-oder Grünkohlsprossen", correct: false  } , { option : "Omega-3-Fettsäuren, d.h. Leinsamensprossen", correct: false  } ],
		optionsEn: [{ option : "That this dead, worthless junk at least doesn't taste good, so that it doesn't beguile your senses and you lose all ability to distinguish", correct: true }, { option : "That it tastes good, contains a lot of sugar and fat, because the intoxication of the senses gives me joy in life.", correct: false } ],
		optionsFr: [{ option : "Que ces cochonneries mortes et sans valeur au moins n'aient pas bon goût, afin qu'elles ne séduisent pas vos sens et que vous ne perdiez toute capacité de distinction", correct: true }, { option : "Que ce soit a bon goût, contient beaucoup de sucre et de graisse, car l'ivresse des sens me donne de la joie de vivre", correct: false } ],
		correct: 3
	},

	{
		question: "Du bist vom Sport verletzt, z.B. tut dein Knie weh oder deine Achillesferse reizt? Was brauchst du nun zum Essen?",
		questionEn: "What should you at least pay attention to at every meal if it only consists of the usual junk?",
		questionFr: "À quoi devez-vous au moins faire attention à chaque repas s’il ne s’agit que de cochonneries habituelles ?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "Kraftfutter, Kohlehydrate, d.h. Getreide oder Hülsenfrüchte", correct: false }, { option : "Vitamine, d.h. frischen Löwenzahn, Brokoli-oder Grünkohlsprossen", correct: true  } , { option : "Omega-3-Fettsäuren, d.h. Leinsamensprossen", correct: false  }  ],
		optionsEn: [{ option : "That this dead, worthless junk at least doesn't taste good, so that it doesn't beguile your senses and you lose all ability to distinguish", correct: true }, { option : "That it tastes good, contains a lot of sugar and fat, because the intoxication of the senses gives me joy in life.", correct: false } ],
		optionsFr: [{ option : "Que ces cochonneries mortes et sans valeur au moins n'aient pas bon goût, afin qu'elles ne séduisent pas vos sens et que vous ne perdiez toute capacité de distinction", correct: true }, { option : "Que ce soit a bon goût, contient beaucoup de sucre et de graisse, car l'ivresse des sens me donne de la joie de vivre", correct: false } ],
		correct: 3
	},

	{
		question: "Du hast trockene Haut und Lippen? Was brauchst du nun zum Essen?",
		questionEn: "What should you at least pay attention to at every meal if it only consists of the usual junk?",
		questionFr: "À quoi devez-vous au moins faire attention à chaque repas s’il ne s’agit que de cochonneries habituelles ?",
		imageUrl: "assets/img/rawfood/leinsamen.png",
		type: "multiple choice",
		options: [{ option : "Kraftfutter, Kohlehydrate, d.h. Getreide oder Hülsenfrüchte", correct: false }, { option : "Vitamine, d.h. frischen Löwenzahn, Brokoli-oder Grünkohlsprossen", correct: false  } , { option : "Omega-3-Fettsäuren, d.h. Leinsamensprossen", correct: true  }  ],
		optionsEn: [{ option : "That this dead, worthless junk at least doesn't taste good, so that it doesn't beguile your senses and you lose all ability to distinguish", correct: true }, { option : "That it tastes good, contains a lot of sugar and fat, because the intoxication of the senses gives me joy in life.", correct: false } ],
		optionsFr: [{ option : "Que ces cochonneries mortes et sans valeur au moins n'aient pas bon goût, afin qu'elles ne séduisent pas vos sens et que vous ne perdiez toute capacité de distinction", correct: true }, { option : "Que ce soit a bon goût, contient beaucoup de sucre et de graisse, car l'ivresse des sens me donne de la joie de vivre", correct: false } ],
		correct: 3
	},

	{
		question: "Du hast Pickel und Übergewicht, kannst nachts nicht schlafen, bist vom üblichen Schrott bis unter die Kante vergiftet. Was brauchst du nun?",
		questionEn: "What should you at least pay attention to at every meal if it only consists of the usual junk?",
		questionFr: "À quoi devez-vous au moins faire attention à chaque repas s’il ne s’agit que de cochonneries habituelles ?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Grüne Rohkost zur Entgiftung", correct: true }, { option : "einen guten Medizyniker, der dir Medikamente (noch mehr Gift) verschreibt", correct: false  }  ],
		optionsEn: [{ option : "That this dead, worthless junk at least doesn't taste good, so that it doesn't beguile your senses and you lose all ability to distinguish", correct: true }, { option : "That it tastes good, contains a lot of sugar and fat, because the intoxication of the senses gives me joy in life.", correct: false } ],
		optionsFr: [{ option : "Que ces cochonneries mortes et sans valeur au moins n'aient pas bon goût, afin qu'elles ne séduisent pas vos sens et que vous ne perdiez toute capacité de distinction", correct: true }, { option : "Que ce soit a bon goût, contient beaucoup de sucre et de graisse, car l'ivresse des sens me donne de la joie de vivre", correct: false } ],
		correct: 3
	},

	{
		question: "Zu was führt Obstessen?",
		questionEn: "What should you at least pay attention to at every meal if it only consists of the usual junk?",
		questionFr: "À quoi devez-vous au moins faire attention à chaque repas s’il ne s’agit que de cochonneries habituelles ?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Frieden im Geist, Ausgeglichenheit", correct: false }, { option : "Heißhungerattacken", correct: true  } ],
		optionsEn: [{ option : "That this dead, worthless junk at least doesn't taste good, so that it doesn't beguile your senses and you lose all ability to distinguish", correct: true }, { option : "That it tastes good, contains a lot of sugar and fat, because the intoxication of the senses gives me joy in life.", correct: false } ],
		optionsFr: [{ option : "Que ces cochonneries mortes et sans valeur au moins n'aient pas bon goût, afin qu'elles ne séduisent pas vos sens et que vous ne perdiez toute capacité de distinction", correct: true }, { option : "Que ce soit a bon goût, contient beaucoup de sucre et de graisse, car l'ivresse des sens me donne de la joie de vivre", correct: false } ],
		correct: 3
	},

	{
		question: "Wie viel spart ein Rohköstler, der das nicht ganz frische Gemüse vom Biomarkt nicht mehr braucht und sich nur noch von Sprossen, Algen und Wildkräutern ernährt?",
		questionEn: "How much does a raw foodist save who no longer needs the not-quite-fresh vegetables from the organic market and only eats sprouts, seaweed and wild herbs?",
		questionFr: "Combien d'argent peut économiser un crudivore qui n'a plus besoin des légumes pas tout à fait frais du marché bio et qui ne mange que des pousses, des algues et des herbes sauvages?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "5 Euro pro Tag an Gemüse = 365 * 5 Euro = 1825 Euro pro Jahr", correct: true }, { option : "Er bezahlt mit seiner Gesundheit", correct: false } ],
		optionsEn: [{ option : "5 euros per day in vegetables = 365 * 5 euros = 1825 euros per year", correct: true }, { option : "He pays with his health", correct: false } ],
		optionsFr: [{ option : "5 euros par jour en légumes = 365 * 5 euros = 1825 euros par an", correct: true }, { option : "Il paie avec sa santé", correct: false } ],
		correct: 3
	},

	{
		question: "Was ist die günstigste und frischeste Rohkosternährung?",
		questionEn: "How much does a raw foodist save who no longer needs the not-quite-fresh vegetables from the organic market and only eats sprouts, seaweed and wild herbs?",
		questionFr: "Combien d'argent peut économiser un crudivore qui n'a plus besoin des légumes pas tout à fait frais du marché bio et qui ne mange que des pousses, des algues et des herbes sauvages?",
		imageUrl: "assets/img/rawfood/brokolisprossen.JPG",
		type: "multiple choice",
		options: [{ option : "Mit vielen Tropenfrüchten", correct: true }, { option : "Mit Wildräutern und Sprossen aus Keimsaaten mit Mengenrabatt", correct: true } , { option: "Mit relativ frischem Gemüse vom Biomarkt" , correct: false }],
		optionsEn: [{ option : "5 euros per day in vegetables = 365 * 5 euros = 1825 euros per year", correct: true }, { option : "He pays with his health", correct: false } ],
		optionsFr: [{ option : "5 euros par jour en légumes = 365 * 5 euros = 1825 euros par an", correct: true }, { option : "Il paie avec sa santé", correct: false } ],
		correct: 3
	},



	{
		question: "In welcher Form sollte man Leinsamen essen, damit diese wirklich als Superfood zählen?",
		questionFr: "Sous quelle forme faut-il manger les graines de lin pour qu’elles soient réellement considérées comme un superaliment?",
		questionEn: "In what form should you eat flaxseeds so that they really count as a superfood?",
		type: "multiple choice",
		imageUrl: "assets/img/rawfood/leinsamen.png",
		options: [{ option : "gekocht", correct: false }, { option : "geröstet", correct: false }, { option : "gemahlen", correct: false }, { option : "gesprosst (im Kressesieb oder im Turm)", correct: true }],
		optionsFr:  [{ option : "bouilli", correct: false }, { option : "rôti", correct: false }, { option : "moulu", correct: false }, { option : "germé (au tamis à cresson ou dans la tour)", correct: true } ],
		optionsEn:  [{ option : "boiled", correct: false }, { option : "roasted", correct: false }, { option : "ground", correct: false }, { option : "sprouted (in the cress sieve or in the tower)", correct: true } ],
		correct: 3

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
		optionsEn: [{ option : "Because the excretion of toxins through the skin doesn't work for them.", correct: false }, { option : "Because fresh grain porridge, vegetables, sprouts and wild herbs do not contain any toxins that can be excreted through the skin. ", correct: true },
		{ option: "Because they drink so little that their bodies can no longer give away any fluid.", correct: false }],
		correct: 3
	},

{
		question: "Was ist Selbstliebe?",
		questionEn: "What is self-love?",
		questionFr: "Qu'est-ce que l'amour de soi?",
		imageUrl: "assets/img/Reikiwater.jpg",
		type: "multiple choice",
		options: [{ option : "Eigenes Reiki-Wasser herstellen", correct: true }, { option : "Eigene Limonade herstellen, die die Zähne schon aushalten", correct: false }],
		optionsEn: [{ option : "Make your own Reiki water", correct: true }, { option : "Make your own lemonade", correct: false }],
		optionsFr: [{ option : "Préparer ta propre eau Reiki", correct: true }, { option : "Préparer ta propre limonade", correct: false }],
		correct: 2
	},

	
	{
		question: "Was ist Selbstliebe?",
		questionEn: "What is self-love?",
		questionFr: "Qu'est-ce que l'amour de soi?",
		imageUrl: "assets/img/rawfood/ReikiBlumenkohl.png",
		type: "multiple choice",
		options: [{ option : "Eigenen Reiki-Blumenkohl herstellen", correct: true }, { option : "Eigenen Blumenkohl-Kuchen backen", correct: false }],
		optionsEn: [{ option : "Make your own Reiki cauliflower", correct: true }, { option : "Bake your own Reiki cake", correct: false }],
		optionsFr: [{ option : "Préparer ton propre chou-fleur Reiki", correct: true}, { option : "Préparer ton propre gâteau au chou-fleur", correct: false }],
		correct: 2
	},

	{
		question: "Zu was hat bei mir Ernährungsberatung in 4-6 Sessions bei Normen Nauber (googlebar) geführt?",
		questionEn: "What is self-love?",
		questionFr: "Qu'est-ce que l'amour de soi?",
		imageUrl: "assets/img/rawfood/meafterernaehrungsberatung.png",
		type: "multiple choice",
		options: [{ option : "Schlankes Gesicht und Nase ohne Hautunreinheiten", correct: true }, { option : "Wache Augen und nur noch 4 Stunden Schlafbedarf", correct: true }, { option : "Totale Abmagerung", correct: false }],
		optionsEn: [{ option : "Make your own Reiki cauliflower", correct: true }, { option : "Bake your own Reiki cake", correct: false }],
		optionsFr: [{ option : "Préparer ton propre chou-fleur Reiki", correct: true}, { option : "Préparer ton propre gâteau au chou-fleur", correct: false }],
		correct: 2
	},

	{
		question: "Was biete ich dir gerne an, wenn du zu mir wegen Nachhilfe in MINT oder Sprachen, Ernährungsberatung oder einer Reiki-Behandlung kommst?",
		questionEn: "What is self-love?",
		questionFr: "Qu'est-ce que l'amour de soi?",
		imageUrl: "assets/img/rawfood/reikiflasche.JPG",
		type: "multiple choice",
		options: [{ option : "Eine kleine Flasche mit destilliertem Reiki-Wasser", correct: true }, { option : "Eine Flasche abgestandenes Leitungswasser", correct: false }],
		optionsEn: [{ option : "Make your own Reiki cauliflower", correct: true }, { option : "Bake your own Reiki cake", correct: false }],
		optionsFr: [{ option : "Préparer ton propre chou-fleur Reiki", correct: true}, { option : "Préparer ton propre gâteau au chou-fleur", correct: false }],
		correct: 2
	},

		{
		question: "Wie heißt dieser Kohlkopf?",
		questionEn: "What is the name of this head of cabbage?",
		questionFr: "Quel est le nom de cette tête de chou?",
		imageUrl: "assets/img/rawfood/wirsing.png",
		type: "multiple choice",
		options: [{ option : "Wirsing", correct: true }, { option : "Grünkohl", correct: false }],
		optionsEn: [{ option : "savoy cabbage", correct: true }, { option : "kale", correct: false }],
		optionsFr: [{ option : "chou de Milan", correct: true }, { option : "chou frisé", correct: false }],
		correct: 4
	},

		{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionEn: "Which ingredient is not in this salad?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		imageUrl: "assets/img/rawfood/wirsingsalat.jpg",
		type: "multiple choice",
		options: [{ option : "Wirsing", correct: false }, { option : "Gelbe Beete", correct: false }, { option : "Weizen", correct: false }, { option : "Linsen", correct: false }, { option : "Banane", correct: true }],
		optionsEn: [{ option : "savoy cabbage", correct: false }, { option : "yellow beetroot", correct: false }, { option : "wheat", correct: false }, { option : "lentils", correct: false }, { option : "banana", correct: true }],
		optionsFr: [{ option : "chou de Milan", correct: false }, { option : "betterave jaune", correct: false }, { option : "blé", correct: false }, { option : "lentilles", correct: false }, { option : "banane", correct: true }],
		correct: 4
	},

	{
		question: "Karma ist das Gesetz von Ursache und Wirkung. Was du sähst, das erntest du. Was erzeugt auf jeden Fall schlechtes Karma?",
		questionEn: "Karma is the law of cause and effect. What you sow is what you reap. What definitely creates bad karma?",
		questionFr: "Le karma est la loi de cause à effet. Ce que vous semez est ce que vous récoltez. Qu’est-ce qui crée définitivement un mauvais karma ?",
		imageUrl: "assets/img/rawfood/yogiaufnagelbrett.png",
		type: "multiple choice",
		options: [{ option : "Nahrung wegwerfen", correct: true }, { option : "Nicht Klavier üben, obwohl von den Eltern befohlen", correct: false }],
		optionsEn: [{ option : "Throw away food", correct: true }, { option : "not practicing the piano despite being told to by parents", correct: false }],
		optionsFr: [{ option : "Jeter de la nourriture", correct: true}, { option : "Ne pas pratiquer le piano malgré les conseils des parents", correct: false }],
		correct: 2
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
		optionsEn: [{ option : "red cabbage", correct: false }, { option : "rye", correct: false }, { option : "parsnip", correct: false }, { option : "sweet pea", correct: false }, { option : "basil", correct: true }],
		optionsFr: [{ option : "chou rouge", correct: false }, { option : "seigle", correct: false }, { option : "panais", correct: false }, { option : "pois de senteur", correct: false }, { option : "basilic", correct: true }],
		correct: 4
	},
	{
		question: "Warum sind Rohköstler 365 Tage 24 h im Jahr gesund und leistungsfähig?",
		questionEn: "Why are raw food eaters healthy and productive 365 days, 24 h a year?",
		questionFr: "Pourquoi les crudivores sont-ils en bonne santé et productifs 365 jours, 24 h par an?",
		imageUrl: "assets/img/rawfood/loewenzahn.png",
		type: "multiple choice",
		options: [{ option : "Weil sie mehr als 500 Euro im Monat Zwangsgebühren an die Krankenkasse zahlen müssen", correct: false }, { option : "Weil Krankheit durch falsche, artfremde Ernährung und medizynische Behandlung entsteht und Rohköstler aus Zeit-und Kostengründen auf beides verzichten.", correct: true }, { option : "Weil sie Glück haben, dass der mörderische Fuchsbandwurm im Löwenzahn sie noch nicht umgebracht hat.", correct: false }],
		optionsEn: [{ option : "Because they have to pay compulsory fees to the health insurance company of more than 500 euros a month. ", correct: false }, { option : "Because illness is caused by incorrect, non-human-specific nutrition and medical treatment and raw foodists avoid both for reasons of time and money.", correct: true }, { option : "Because they're lucky that the murderous fox tapeworms in the dandelions haven't killed them yet.", correct: false }],
		optionsFr: [{ option : "Parce qu'ils doivent payer des frais obligatoires à la caisse d'assurance maladie de plus de 500 euros par mois.", correct: false }, { option : "Parce que la maladie est causée par une alimentation et un traitement médical incorrects et non spécifiques à l'éspèce humaine, et que les crudivoires évitent les deux pour des raisons de temps et d'argent.", correct: true }, { option : "Parce qu'ils ont de la chance que le ténia meurtrier du renard ne les ait pas encore tués.", correct: false }],
		correct: 4
	},
	{
		question: "Wie heißt diese essbare Wildpflanze?",
		questionEn: "What is the name of this edible wild plant?",
		questionFr: "Comment s'appelle cette plante sauvage comestible?",
		imageUrl: "assets/img/rawfood/breitwegerich.png",
		type: "multiple choice",
		options: [{ option : "Löwenzahn", correct: false }, { option : "Spitzwegerich", correct: false }, { option : "Breitwegerich", correct: true }, { option: "Gänseblümchen", correct : false }],
		optionsFr: [{ option : "pissenlits", correct: false }, { option : "plantain lancéolé", correct: true }, { option : "plantain large", correct: true }, { option: "marguerite", correct : false }],
		optionsEn: [{ option : "dandelions", correct: false }, { option : "ribwort plantain", correct: true }, { option : "broad plantain", correct: true }, { option: "daisies", correct : false }],
		correct: 4
	},

	{
		question: "Warum essen bestimmte Rohköstler kein Obst?",
		questionEn: "Why do certain raw food eaters not eat fruits?",
		questionFr: "Pourquoi certains crudivores ne mangent-ils pas de fruits?",
		imageUrl: "assets/img/rawfood/zahnarzt.png",
		type: "multiple choice",
		options: [{ option : "Weil sie sich das Geld und die Zeit für das Obstessen und den anschließenden Gang zum Zahnmedizyniker sparen wollen", correct: true }, { option : "Weil sie nicht wissen, was gut und teuer ist", correct: false }],
		optionsEn: [{ option : "Because they want to save the time and the money of eating fruit and then going to the dentist.", correct: true }, { option : "Because they don't know what is good and expensive", correct: false }],
		optionsFr: [{ option : "Parce qu'ils veulent économiser de l'argent et du temps en ne mangeant pas  de fruits et ensuite en allant chez le dentiste.", correct: true }, { option : "Parce qu'ils ne savent pas ce qui est bon et cher.", correct: false }],
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
		optionsFr: [{ option : "marguerite", correct: false }, { option : "herbe de sol", correct: true }, { option : "pissenlit", correct: false }, { option : "chardon d'oie", correct: false }],
		correct: 3
	},
	{
		question: "Wie viel spart ein Rohköstler pro Jahr an Strom, weil er keinen Kühlschrank benutzt?",
		questionEn: "How much money does a raw food eater save per year by not using a refrigerator?",
		questionFr: "Combien d'argent un crudivore économise-t-il en n'utilisant pas de réfrigérateur?",
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
		optionsEn: [{ option : "Because they don't have the time and money for medical visits.", correct: true }, { option : "Because they have to pay 60 euro compulsory GEZ fees every 3 months without owning a radio or television.", correct: false }, {option: "Because preparing salads and cereal porridges and cleaning up only take <5 minutes.", correct: true} ],
		optionsFr: [{ option : "Parce qu'ils n'ont ni le temps ni l'argent pour les visites médicales.", correct: true }, { option : "Parce qu'ils doivent payer 60 euros de frais GEZ obligatoires tous les 3 mois sans posséder de radio ou de télévision.", correct: false }, {option: "Parce que préparer et nettoyer les salades et les bouillies de céréales ne prend que <5 minutes.", correct: true} ],
		correct: 3
	},
	{
		question: "Wie heißt dieses Gemüse?",
		questionFr: "Comment s'appelle ce légume?",
		questionEn: "What is the name of this vegetable?",
		imageUrl: "assets/img/rawfood/spitzkohl.png",
		type: "multiple choice",
		options: [{ option : "Weißkohl", correct: false }, { option : "Spitzkohl", correct: true }],
		optionsFr: [{ option : "chou blanc", correct: false }, { option : "chou pointu", correct: true }],
		optionsEn: [{ option : "white cabbage", correct: false }, { option : "pointed cabbage", correct: true }],
		correct: 1
	},
	{
		question: "Welche Zutat ist nicht in diesem Salat?",
		questionFr: "Quel ingrédient n'est pas dans cette salade?",
		questionEn: "What ingredient is not in this salad?",
		imageUrl: "assets/img/rawfood/spitzkohlplatterbsensalat.jpg",
		type: "multiple choice",
		options: [{ option : "Platterbsen", correct: false }, { option : "Weizen", correct: false }, { option : "Spitzkohl", correct: false }, { option : "Rote Beete", correct: true }, { option : "Karotte", correct: false }],
		optionsEn: [{ option : "flat peas", correct: false }, { option : "wheat", correct: false }, { option : "pointed cabbage", correct: false }, { option : "beetroot", correct: true }, { option : "carrot", correct: false }],
		optionsFr: [{ option : "petits pois", correct: false }, { option : "blé", correct: false }, { option : "chou pointu", correct: false }, { option : "betterave rouge", correct: true }, { option : "carotte", correct: true }],
		correct: 4
	},

	{
		question: "Was sollte bei dir Ekel erregen?",
		questionFr: "Qu'est-ce qui devrait vous dégoûter ?",
		questionEn: "What should disgust you?",
		imageUrl: "assets/img/rawfood/loewenzahn.png",
		type: "multiple choice",
		options: [{ option : "Löwenzahn, der nicht nass, gelb oder braun ist und wo Hunde vorbei gehen", correct: false }, { option : "Ein Blick und ein Riechen in den Kuhstall, wo deine Milch und dein Fleisch herkommt", correct: true }],
		optionsEn: [{ option : "Dandelions that are not wet, yellow or brown and where dogs walk by", correct: false }, { option : "a look and a smell into a cowshed where your milk and meat comes from", correct: true } ],
		optionsFr: [{ option : "Des pissenlits qui ne sont pas mouillés, jaunes ou bruns et où passent les chiens", correct: false }, { option : "un regard et une odeur dans une étable d'où viennent votre lait et votre viande", correct: true }],
		correct: 4
	},

	{
		question: "Was ist die beste Haltung, um wach und gesund zu bleiben? Ordne in aufsteigender Reihenfolge, d.h. beste Haltung zuletzt!",
		questionFr: "Quelle est la meilleure posture pour rester éveillé et en bonne santé ? Classez par ordre croissant, c'est-à-dire la meilleure posture en dernier !",
		questionEn: "What is the best posture to stay awake and healthy? Arrange in ascending order, i.e. best posture last!",
		imageUrl: "assets/img/rawfood/barfuss.png",
		type: "multiple choice",
		options: [{ option : "Liegen, Sitzen, Knien, Stehen, Gehen, Barfuß gehen", correct: true }, { option : "Barfuß gehen, Gehen, Stehen, Knien, Sitzen, Liegen", correct: false }],
		optionsEn: [{ option : "Lying, sitting, kneeling, standing, walking, walking barefoot", correct: true }, { option : "walking barefoot, walking, standing, kneeling, sitting, lying down", correct: false } ],
		optionsFr: [{ option : "Couché, assis, à genoux, debout, marchant, marchant pieds nus", correct: true }, { option : "marchant pieds nus, marchant, debout, à genoux, assis, couché", correct: false }],
		correct: 4
	},

	{
		question: "Wo kannst du Getreide, Hülsenfrüchte und Ölsaaten in Naturland-Qualität online kaufen?",
		questionFr: "Où acheter en ligne des céréales, des légumineuses et des graines oléagineuses de qualité Naturland?",
		questionEn: "Where can you buy grains, legumes and oilseeds in Naturland quality online?",
		imageUrl: "assets/img/rawfood/biohoflex.png",
		type: "multiple choice",
		options: [{ option : "Bei Monsanto", correct: false}, { option : "Biohof Lex", correct: true },  { option : "Bayer", correct: false }, { option : "Syngenta", correct: false } ],
		optionsEn: [{ option : "At Monsanto", correct: false }, { option : "Biohof Lex", correct: true }, { option : "Bayer", correct: false }, { option : "Syngenta", correct: false } ],
		optionsFr: [{ option : "Chez Monsanto", correct: false }, { option : "Biohof Lex", correct: true }, { option : "Bayer", correct: false }, { option : "Syngenta", correct: false }],
		correct: 4
	},

	{
		question: "Wo kannst du keimfähigen Reis online kaufen?",
		questionFr: "Où peut-on acheter du riz germinable en ligne?",
		questionEn: "Where can you buy germinable rice online?",
		imageUrl: "assets/img/rawfood/reisbrei.jpg",
		type: "multiple choice",
		options: [{ option : "Bei Top-Fruits", correct: true}, { option : "Monsanto", correct: false},  { option : "Bayer", correct: false }, { option : "Syngenta", correct: false } ],
		optionsEn: [{ option : "Top-Fruits", correct: true}, { option : "Monsanto", correct: false},  { option : "Bayer", correct: false }, { option : "Syngenta", correct: false } ],
		optionsFr: [{ option : "Top-Fruits", correct: true}, { option : "Monsanto", correct: false},  { option : "Bayer", correct: false }, { option : "Syngenta", correct: false } ],
		correct: 4
	},

	{
		question: "Was ist pures Gift für deine Zähne, den Kiefer und deine ganze Statik?",
		questionFr: "Qu'est-ce qui est un pur poison pour vos dents, votre mâchoire et toute votre statique?",
		questionEn: "What is pure poison for your teeth, jaw and all your statics?",
		imageUrl: "assets/img/rawfood/zahnspange.png",
		type: "multiple choice",
		options: [{ option : "Zahnspange", correct: true}, { option : "Artgerechte Nahrung, die noch abgebissen und gekaut werden muss", correct: false }, { option : "Im Wald barfuß spazieren gehen", correct: false }  ],
		optionsEn: [{ option : "Braces", correct: true }, { option : "Species-appropriate food that still needs to be bitten off and chewed", correct: false }, { option : "Walking barefoot in the forest", correct: false } ],
		optionsFr: [{ option : "Bracelets", correct: true }, { option : "Des aliments adaptés à l'espèce qui doivent encore être mordus et mâchés", correct: false }, { option : "Marcher pieds nus dans la forêt", correct: false }],
		correct: 4
	},

	{
		question: "Welchen Vorteil hat ein Rohköstler, der keine Zahnpasta mehr braucht?",
		questionFr: "Quel avantage a un crudivore s’il n’a plus besoin de dentifrice ?",
		questionEn: "What advantage does a raw foodist have if he no longer needs toothpaste?",
		imageUrl: "assets/img/rawfood/zahnbuerste.png",
		type: "multiple choice",
		options: [{ option : "Die natürliche Mundflora bleibt erhalten", correct: true}, { option : "Kostenersparnis", correct: true }, { option : "Zeitersparnis", correct: true } , { option : "Er bekommt faule Zähne, weil ihm das Fluor aus der Zahnpasta fehlt", correct: false }  ],
		optionsEn: [{ option : "The natural oral flora is preserved", correct: true }, { option : "Cost savings", correct: true }, { option : "Time savings", correct: true }, { option: "He gets rotten teeth because the fluorine out the toothpaste is missing", correct: false } ],
		optionsFr: [{ option : "La flore buccale naturelle est préservée", correct: true }, { option : "Économies de coûts", correct: false }, { option : "Gain de temps", correct: true },  { option : "Il a des dents pourries à cause du fluor qu'il lui manque", correct: false } ],
		correct: 4
	},

	{
		question: "Was ist frisch?",
		questionFr: "Qu'est-ce qui est frais ?",
		questionEn: "What is fresh?",
		imageUrl: "assets/img/rawfood/kressefensterbrett.JPG",
		type: "multiple choice",
		options: [{ option : "Nüsse, von einem wilden Nussbaum, vom Boden aufgehoben", correct: false}, { option : "Kresse vom eigenen Fensterbrett", correct: true }  ],
		optionsEn: [{ option : "Nuts picked up from a wild walnut tree from the ground", correct: false }, { option : "cress from your own windowsill", correct: true } ],
		optionsFr: [{ option : "Noix d'un noyer sauvage, ramassées sur le sol", correct: false }, { option : "cresson sur le rebord de votre fenêtre", correct: true } ],
		correct: 4
	},

	{
		question: "Wodurch könnte man Nüsse leichter verdaulich machen?",
		questionFr: "Qu'est-ce qui est frais ?",
		questionEn: "What is fresh?",
		imageUrl: "assets/img/rawfood/walnuesse.png",
		type: "multiple choice",
		options: [{ option : "Vorher einweichen, was den Keimprozess schon startet", correct: true}, { option : "braten", correct: false }, {option: "kochen", correct: false }  ],
		optionsEn: [{ option : "Nuts picked up from a wild walnut tree from the ground", correct: false }, { option : "cress from your own windowsill", correct: true } ],
		optionsFr: [{ option : "Noix d'un noyer sauvage, ramassées sur le sol", correct: false }, { option : "cresson sur le rebord de votre fenêtre", correct: true } ],
		correct: 4
	},

	{
		question: "Was ist eine sehr effektive Methode, um wieder Kontrolle über die Sinne zu bekommen?",
		questionFr: "Qu'est-ce qui est frais ?",
		questionEn: "What is fresh?",
		imageUrl: "assets/img/rawfood/yogiaufnagelbrett.png",
		type: "multiple choice",
		options: [{ option : "Saures, bitteres und scharfes mixen und möglichst viel von diesem Konglomgerat runterbekommen", correct: true}, { option : "Viel Süßes, Fettes und Würziges mixen, sodass es richtig gut schmeckt, und versuchen, nicht alles zu essen", correct: false } , {option: "Die erste Option ist zwar effektiv, wird sich aber nie allgemeiner Beliebtheit erfreuen.", correct: true } ],
		optionsEn: [{ option : "Nuts picked up from a wild walnut tree from the ground", correct: false }, { option : "cress from your own windowsill", correct: true } ],
		optionsFr: [{ option : "Noix d'un noyer sauvage, ramassées sur le sol", correct: false }, { option : "cresson sur le rebord de votre fenêtre", correct: true } ],
		correct: 4
	},

	{
		question: "Wo kannst du in Gröbenzell eine Reiki-Behandlung und eine Reiki-Einweihung zum 1.Grad bekommen, damit du deine Sprossen und dein Wasser mit Reiki behandlen kannst?",
		questionFr: "Qu'est-ce qui est frais ?",
		questionEn: "What is fresh?",
		imageUrl: "assets/img/rawfood/mereikimeister.JPG",
		type: "multiple choice",
		options: [{ option : "Bei mir, dem frisch ausgebildeteten Reiki-Meister", correct: true}, { option : "Du musst bis nach Brasilien oder den Philipinen fliegen, wo die besten Heiler leben", correct: false }  ],
		optionsEn: [{ option : "Nuts picked up from a wild walnut tree from the ground", correct: false }, { option : "cress from your own windowsill", correct: true } ],
		optionsFr: [{ option : "Noix d'un noyer sauvage, ramassées sur le sol", correct: false }, { option : "cresson sur le rebord de votre fenêtre", correct: true } ],
		correct: 4
	},

	{
			type: 'gapText',
			imageUrl: "assets/img/rawfood/kressefensterbrett.jpg",
			gapText: 'Ist du {kalt|warm}, dann wirst du {alt}.'
		}

]
    };
  },
 
};
</script>

<style scoped>

</style>