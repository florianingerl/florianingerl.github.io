let questionscs = [
	{
		question: "In welcher Situation bist du bewusster?",
		questionFranc: "Dans quelle situation est-ce que tu es le plus conscient?",
		imageUrl: "assets/img/cs/atem.jpg",
		type: "multiple choice",
		options: ["Wenn du gerade deinen eigenen Atem fühlen kannst.", "Wenn du weißt, dass dein Gegenüber gerade unrecht hat."],
		optionsFranc: ["Quand tu peux sentir ta propre respiration", "Quand tu sais que les autres ont tort"],
		correct: 0

	},

	{
		question: "In welcher Situation bist du bewusster?",
		questionFranc: "Dans quelle situation est-ce que tu es le plus conscient?",
		imageUrl: "assets/img/cs/schwerkraft.jpg",
		type: "multiple choice",
		options: ["Wenn du die Schwerkraft gerade fühlen kannst.", "Wenn du dir der globalen Probleme bewusst bist."],
		optionsFranc: ["Quand tu peux sentir la pesanteur en ce moment", "Quand tu es conscient des problèmes globales"],
		correct: 0
	},
	
	{
		question: "Was ist wichtiger?",
		questionFranc: "Qu'est-ce qui est le plus important?",
		imageUrl: "assets/img/cs/wald.jpg",
		type: "multiple choice",
		options: ["Die neuesten Neuigkeiten aus der Welt zu kennen.", "Dir der Stille und des Raumes um dich herum jetzt bewusst bist zu sein."],
		optionsFranc: ["Connaitre les plus dernières nouvelles des journaux", "Être conscient de l'espace et du silence autour de toi"],
		correct: 1
	},
	
	
	{
		question: "Was ist ein Tor zum gegenwärtigen Moment?",
		questionFranc: "Quelle est une porte pour entrer dans ce moment?",
		imageUrl: "assets/img/cs/amsel.jpg",
		type: "multiple choice",
		options: ["Der Gedanke an die nächste Mahlzeit.", "Den Geräuschen und der Stille um dich herum zu lauschen."],
		optionsFranc: ["La pensée au prochain repas", "Ecouter le bruit et la silence autour de vous"],
		correct: 1
	},
	
	{
		question: "Du bist unzufrieden in deiner Arbeit. Welcher der folgenden 4 Optionen ist nicht gut?",
		questionFranc: "Tu n'est pas heureux avec ton travail. Quelle option parmi les quatre suivantes n'est pas bonne?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: ["Situation verändern", "Situation komplett akzeptieren", "Situation trotz innerer Widerstände aushalten", "Arbeit kündigen und gehen"],
		optionsFranc: ["Changer la situation", "Accepter la situation complètement", "Rester dans la situation et se plaindre", "Fuir la situation"],
		correct: 2
	},
	
	{
		question: "Was ist eine Emotion?",
		questionFranc: "Qu'est-ce une émotion?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: ["Etwas, was man mit Tabletten betäuben kann", "Etwas, wovon man sich mithilfe der Nachrichten ablenken kann", "Alte Gefühle, die damals nicht bewusst verarbeitet wurden, im Körper jetzt noch feststecken und getriggert werden können", "Sowas wie Liebe"],
		optionsFranc: ["Quelque chose qu'on peut supprimer en prenant des comprimés", "Quelque chose dont on peut se distraire avec l'aide des nouvelles", "Vieux sentiments qui n'ont pas été traîts consciemment, qui habite toujours dans le corps et qui peut être basculé", "Quelque chose comme l'amour"],
		correct: 2
	},
	
	{
		question: "Womit kann man Gefühle fühlen?",
		questionFranc: "Avec quel instrument est-ce qu'on peut sentir des sentiments?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: ["Mit dem Verstand", "mit dem Körper", "mit den Ratschlägen deiner Eltern", "mit den Ratschlägen des Staates"],
		optionsFranc: ["Avec la tête", "avec le corps", "avec les conseils de tes parents", "avec les conseils du gouvernement"],
		correct: 1
	}

];

new Quiz("conciousness", questionscs);