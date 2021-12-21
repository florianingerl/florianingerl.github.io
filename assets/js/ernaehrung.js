var questions = [
	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: ["Tomate", "Roote Beete"],
		correct: 1

	},

	{
		question: "Wie heißt dieses Gemüse?",
		imageUrl: "assets/img/rawfood/kohlrabi.jpg",
		type: "multiple choice",
		options: ["Kartoffel", "Kohlrabi"],
		correct: 1
	},

	{
		question: "Was eignet sich zur Wasseraufbereitung?",
		imageUrl: "assets/img/rawfood/wasserwirbler.png",
		type: "multiple choice",
		options: ["Wasserwirbler", "Sirup"],
		correct: 0
	}
	,
	{
		question: "In welcher Form sollte man Getreide nach dem Rohkost-Guru Dr.Schnitzer am besten essen?",
		imageUrl: "assets/img/rawfood/weizensprossen.jpg",
		type: "multiple choice",
		options: ["als Getreidebrei oder als Keimlinge", "Brot", "Nudeln"],
		correct: 0
	},
	{ question: "Welche Zutat gehört nicht! in einen Frischkornbrei?",
	type: "multiple choice",
	imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
	options: ["Roggen", "Haselnüsse", "Apfel", "Marmelade", "Leinsamen"],
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
		question: "Wie heißt dieses Gemüse? Gebe die richtige Antwort in das Textfeld ein!",
		imageUrl: "assets/img/rawfood/rotkohl.jpg",
		type: "eingabe",
		correct: ["Blaukraut", "Rotkohl"]
	},
	{
		question: "Wie schmeckt roote Beete?",
		imageUrl: "assets/img/rawfood/rooteBeete1.jpg",
		type: "multiple choice",
		options: ["bitter", "süß"],
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
		question: "Die Bagavhad-Gita (Bibel der Hindus) teilt Lebensmittel in sattvische, rajasische und tamasische Lebensmittel ein. Rajasische Lebensmittel erzeugen im Übermaß konsumiert Ruhelosigkeit und sind meistens sehr! scharf, süß oder salzig. Welches Gemüse ist nicht! rajasisch?",
		imageUrl: "assets/img/rawfood/zwiebeln.jpg",
		type: "multiple choice",
		options: ["Zwiebel", "Radiesschen", "Gurke" ,"Chili"],
		correct: 2
	},
	{
		question: "Die Bagavad-Gita teilt Lebensmittel in sattvische, rajasische und tamasische ein. Sattvische erzeugen Harmonie und erheitern den Geist, sind voller Lebenskraft und schmecken meistens kräftig und mild. Welche Speisen sind sattvisch?",
		imageUrl: "assets/img/rawfood/mungobohnen.jpg",
		type: "multiple choice",
		options: ["Mungobohnen", "Tiefkühl-Pizza", "Dosen-Ravioli" ],
		correct: 0
	},
	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
		imageUrl: "assets/img/rawfood/frischkornbrei.jpg",
		type: "multiple choice",
		options: ["Wasser", "Dinkel", "Milch", "Sonnenblumenkerne", "Himbeeren" ],
		correct: 2
	},
	
	{
		question: "Wie heißt dieser Salat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: ["Zuckerhut", "Kopfsalat", "Chicoree", "Endiviensalat" ],
		correct: 3
	},
	
	{
		question: "Wie schmeckt Endiviensalat?",
		imageUrl: "assets/img/rawfood/endivien.jpg",
		type: "multiple choice",
		options: ["süß", "bitter", "scharf" ],
		correct: 1
	},
	
	{
		question: "Warum werdem Rohköstler satt?",
		imageUrl: "assets/img/rawfood/kichererbsensalat.jpg",
		type: "multiple choice",
		options: ["Weil sie tonnenweise Salat essen", "Weil sie Sprossen aus Getreide und Hülsenfrüchten essen" ],
		correct: 1
	},
	
	{
		question: "Welche Zutat braucht man nicht für einen gesunden, stattmachenden Salat?",
		imageUrl: "assets/img/rawfood/zuckerhutsalatmitsüßlupinen.JPG",
		type: "multiple choice",
		options: ["Olivenöl", "Süßlupinen", "Zuckerhut", "Karotte", "Essig"],
		correct: 4
	},
	
	{
		question: "Woran erkennt man laut dem Rohkost-Guru und Zahnarzt Dr. Schnitzer am eindeutigsten, dass der Mensch ein Fruchtesser (Samen, Wurzelknollen, Blattschösslinge) ist?",
		imageUrl: "assets/img/rawfood/johannschnitzer.gif",
		type: "multiple choice",
		options: ["an der Länge seines Darms", "an seinem Gebiss", "an der chemischen Zusammensetzung der Magensäure" ],
		correct: 1
	}


];

var q = 0;

function createQuestion() {
	var c = document.getElementById("rohkost");
	while (c.firstChild) {
		c.removeChild(c.firstChild);
	}
	var s = document.createElement("p");
	s.appendChild(document.createTextNode(questions[q].question));
	c.appendChild(s);
	s = document.createElement("img");
	s.src = questions[q].imageUrl;
	s.alt = "Can't display this image";
	s.style = "width: 300px";
	c.appendChild(s);

	s = document.createElement("div");
	c.appendChild(s);

	s.class = "optionQuestOptions";
	s.id = s.class;
	if (questions[q].type == "multiple choice") {
		for (var i = 0; i < questions[q].options.length; i++) {
			var s1 = document.createElement("div");
			s.appendChild(s1);
			var s2 = document.createElement("input");
			s2.type = "checkbox";
			s2.id = "vehicle" + i;
			s2.name = s2.id;
			s2.value = "Bike";
			s1.appendChild(s2);
			var s3 = document.createElement("label");
			s3.for = s2.id;
			s3.appendChild(document.createTextNode(questions[q].options[i]));
			s1.appendChild(s3);
		}
	}
	else if (questions[q].type == "eingabe") {
		var s1 = document.createElement("div");
		s1.class = "textQuest";
		s.appendChild(s1);
		var s2 = document.createElement("input");
		s2.id = "theinputfield";
		s2.type = "text";
		s2.name = "1";
		s1.appendChild(s2);

	}

	s = document.createElement("div");
	s.class = "buttonContainer";
	c.appendChild(s);

	var b = document.createElement("button");
	b.id = "checkButton";
	b.onclick = checkButtonClicked;
	b.appendChild(document.createTextNode("Aufgabe überprüfen"));
	s.appendChild(b);

	b = document.createElement("button");
	b.id = "solveButton";
	b.onclick = solveButtonClicked;
	b.appendChild(document.createTextNode("Lösung zeigen"));
	s.appendChild(b);

	if (q != questions.length - 1) {
		b = document.createElement("button");
		b.id = "nextButton";
		b.onclick = nextButtonClicked;
		b.appendChild(document.createTextNode("Nächste Aufgabe"));
		c.appendChild(b);
	}
}

function nextButtonClicked() {
	q++;
	createQuestion();
}

function solveButtonClicked() {
	console.log("The solve button was clicked!");

	console.log("The check button was clicked!");
	if (questions[q].type == "multiple choice") {
		var inputFields = document.getElementById('optionQuestOptions').getElementsByTagName('input');
		for (var index = 0; index < inputFields.length; ++index) {
			var element = inputFields[index];
			if (element.value || element.checked) {

				if (element.type == "radio" || element.type == "checkbox") {
					element.parentElement.style.backgroundColor = "white";
					element.checked = index == questions[q].correct;
				}
			}
		}
	}
	else if (questions[q].type == "eingabe") {
		var element = document.getElementById("theinputfield");
		element.type.backgroundColor = "white";
		element.value = questions[q].correct[0];
	}
}

function checkButtonClicked() {
	console.log("The check button was clicked!");
	if (questions[q].type == "multiple choice") {
		var inputFields = document.getElementById('optionQuestOptions').getElementsByTagName('input');
		for (var index = 0; index < inputFields.length; ++index) {
			var element = inputFields[index];
			if (element.value || element.checked) {
				if (element.type == "text") {
					element.style.backgroundColor = "white";
					if (element.value == questions[q].correct) {
						element.style.backgroundColor = "#7bf27b";
					} else {
						element.style.backgroundColor = "#fc5c5c";
					}
				} else if (element.type == "radio" || element.type == "checkbox") {
					element.parentElement.style.backgroundColor = "white";

					if (element.checked) {
						if (index == questions[q].correct) {
							element.parentElement.style.backgroundColor = "#7bf27b";
						} else {
							element.parentElement.style.backgroundColor = "#fc5c5c";
						}
					}

				}
			}
		}
	}
	else if (questions[q].type == "eingabe") {
		var element = document.getElementById("theinputfield");

		element.style.backgroundColor = "white";


		if (contains(questions[q].correct, element.value)) {
			element.style.backgroundColor = "#7bf27b";
		} else {
			element.style.backgroundColor = "#fc5c5c";
		}

	}
}

function contains(a, value) {
	for (var i = 0; i < a.length; ++i) {
		if (a[i] == value) {
			return true;
		}
	}
	return false;
}

createQuestion();
