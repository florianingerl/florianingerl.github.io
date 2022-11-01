let questionslesmaths = [
	{
		question: "Quelle comparison n'est pas correcte?",
		imageUrl: "assets/img/lesmaths/comparison.png",
		type: "multiple choice",
		options: ["5 est plus grand que 3", "3 est plus petit que 5", "5 est supérieur à 3", "3 est inférieur à 5", "5 est moins grand que 3", "3 est moins grand que 5"],
		correct: 4

	},
	{
		question: "Quelle phrase est incorrecte?",
		imageUrl: "assets/img/lesmaths/comparison2.png",
		type: "multiple choice",
		options: ["y ( igrek ) est moins grand ou égale de 13", "y est inférieur ou égale à 13", "y est plus petit ou aussi grand que 13"],
		correct: 0

	},
	{
		question: "Qu'est-ce la racine carré de neuf?",
		imageUrl: "assets/img/lesmaths/racinecarredeneuf.png",
		type: "multiple choice",
		options: ["quatre virgule cinq, c'est à dire 4,5", "trois"],
		correct: 1

	},

	{
		question: "Qu'est-ce la troisième carré de huit?",
		imageUrl: "assets/img/lesmaths/troisiemecarredehuit.png",
		type: "multiple choice",
		options: ["deux", "trois huitième", "huit tiers"],
		correct: 0
	},
	{
		question: "Quelle phrase est incorrecte?",
		imageUrl: "assets/img/lesmaths/ensemble.png",
		type: "multiple choice",
		options: ["L'ensemble contient trois éléments.", "L'ensemble est composé de trois éléments.", "Trois éléments sont contenus dans l'ensemble.", "L'ensemble s'écrit avec des accolades." ,"Trois éléments compose l'ensemble."],
		correct: 4
	},
	{
		question: "Qu'est qu'il faut faire pour résoudre l'équation?",
		imageUrl: "assets/img/lesmaths/equation.png",
		type: "multiple choice",
		options: ["Diviser les deux cotés de l'équation par cinq", "Soustraire cinq des deux cotés de l'équation"],
		correct: 0
	},
	{
		question: "Qu'est qu'il faut faire pour résoudre l'équation?",
		imageUrl: "assets/img/lesmaths/equation2.png",
		type: "multiple choice",
		options: ["Soustraire cinq des deux cotés de l'équation", "Ajouter cinq aux deux cotés", "Diviser par cinq"],
		correct: 0
	},
	{
		question: "Comment est-ce qu'on divise par une fraction?",
		imageUrl: "assets/img/lesmaths/fractionsdiviser.png",
		type: "multiple choice",
		options: ["On divise par une fraction en multipliant avec l'inverse de la fraction", "Il faut d'abord trouver le plus petit dénominateur commun"],
		correct: 0
	},
	{
		question: "Quelle affirmation est vraie pour cette fraction?",
		imageUrl: "assets/img/lesmaths/fractionirreductible.png",
		type: "multiple choice",
		options: ["La fraction est irréductible", "On peut réduire la fraction en divisant le numérateur et le dénominateur par 6"],
		correct: 1
	},
	{
		question: "Quel ensemble manque à gauche?",
		imageUrl: "assets/img/lesmaths/ensemblesdesnombres.png",
		type: "multiple choice",
		options: ["Les nombres entiers", "Les nombres rationnels", "Les nombres complexes", "Les nombres réels", "Les nombres naturels"],
		correct: 2
	},
	{
		question: "Quelle phrase n'est pas correcte?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: ["0,2,4,6,8 et ainsi de suite sont tous des nombres pairs", "1,3,5,7,9 .... sont des nombres impair", "2,3,5,7,11,13,17,19 sont des nombres premiers"],
		correct: 1
	},
	{
		question: "Quelle phrase n'est pas correcte?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: ["Un nombre premier est toujours impair", "2 est un nombre premier parce qu'il est divisible juste par lui-même et 1", "quatre-vingt-dix-sept est un nombre premier"],
		correct: 0
	},
	{
		question: "Qu'est-ce la contraposition de \"Si je mange quelque chose, j'ai faim.\"?",
		imageUrl: "assets/img/lesmaths/contraposition.png",
		type: "multiple choice",
		options: ["Si je ne mange rien, je n'ai pas faim.", "Si je n'ai pas faim, je ne mange rien."],
		correct: 1
	},

	{
		question: "Qu'est-ce la contraposition de \"S'il pleut, je reste à la maison.\"?",
		imageUrl: "assets/img/lesmaths/contraposition.png",
		type: "multiple choice",
		options: ["S'il ne pleut pas, je ne reste pas à la maison", "Si je ne reste pas à la maison, il ne pleut pas."],
		correct: 1
	},
	{
		question: "Qu'est-ce la négation (pas le contraire!) de \"Tous les profs sont bêtes\"?",
		imageUrl: "assets/img/lesmaths/negation.png",
		type: "multiple choice",
		options: ["Tous les profs sont intélligents!", "Il y au moins un prof qui est intélligent"],
		correct: 1
	},
	{
		question: "Qu'est-ce la négation (pas le contraire!) de \"Il existe un prof qui est intélligent\"?",
		imageUrl: "assets/img/lesmaths/negation.png",
		type: "multiple choice",
		options: ["Il existe un prof qui est stupide!", "Tous les profs sont stupides"],
		correct: 1
	}


];

new Quiz("quizlesmaths", questionslesmaths);