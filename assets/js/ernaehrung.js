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
	{
		question: "Welche Zutat gehört nicht in einen Frischkornbrei?",
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
		question: "Warum werdem Rohköstler satt?",
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
		question: "Welche Zutat ist nicht in diesem Salat?",
		imageUrl: "assets/img/rawfood/weißkohlsalat.jpg",
		type: "multiple choice",
		options: ["Weißkohl", "Weizen", "Roote Beete", "Karotte", "Süßlupinen"],
		correct: 3
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
	s.onclick = function() {
		console.log("The function was called!");

		var fullPage = document.getElementById('fullpage');

		fullPage.style.backgroundImage = 'url(' + questions[q].imageUrl + ')';
		fullPage.style.display = 'block';
	};
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

function createPengion() {
	var nav = document.createElement("nav");
	c.appendChild(nav);
	var ul = document.createElement("ul");
	ul.classList.add("pagination");
	nav.appendChild(ul);
	var li = document.createElement("li");
	li.classList.add("page-item");
	var a = document.createElement("a");
	a.classList.add("page-link");
	a.appendChild(document.createTextNode("Vorherige Aufgabe"));
	a.onclick = previousButtonClicked;
	li.appendChild(a);
	ul.appendChild(li);
	for (var i = q / 7; i < q / 7 + 7 && i < questions.length; ++i) {
		li = document.createElement("li");
		li.classList.add("page-item");
		a = document.createElement("a");
		a.classList.add("page-link");
		a.appendChild(document.createTextNode("" + (i + 1)));
		li.appendChild(a);
		ul.appendChild(li);
	}

	li = document.createElement("li");
	li.classList.add("page-item");
	a = document.createElement("a");
	a.classList.add("page-link");
	a.appendChild(document.createTextNode("Nächste Aufgabe"));
	a.onclick = nextButtonClicked;
	li.appendChild(a);
	ul.appendChild(li);
}



function nextButtonClicked() {
	q++;
	createQuestion();
}

function previousButtonClicked() {
	q--;
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


function setImageToFullScreen(imageUrl) {

	console.log("Function setImageToFullScreenCalled!");
	var fullPage = document.getElementById('fullpage');

	fullPage.style.backgroundImage = 'url(' + imageUrl + ')';
	fullPage.style.display = 'block';

}


function init() {
	var fullPage = document.getElementById("fullpage");
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 27) {
			console.log("Escape was pressed!");
			fullPage.style.display = 'none';
		}
	});
}

createQuestion();
init();




