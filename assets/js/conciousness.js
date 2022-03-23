var questionscs = [
	{
		question: "In welcher Situation bist du bewusster?",
		imageUrl: "assets/img/cs/atem.jpg",
		type: "multiple choice",
		options: ["Wenn du gerade deinen eigenen Atem fühlen kannst.", "Wenn du weißt, dass dein Gegenüber gerade unrecht hat."],
		correct: 0

	},

	{
		question: "In welcher Situation bist du bewusster?",
		imageUrl: "assets/img/cs/schwerkraft.jpg",
		type: "multiple choice",
		options: ["Wenn du die Schwerkraft gerade fühlen kannst.", "Wenn du dir der globalen Probleme bewusst bist."],
		correct: 0
	},
	
	{
		question: "Was ist wichtiger?",
		imageUrl: "assets/img/cs/wald.jpg",
		type: "multiple choice",
		options: ["Die neuesten Neuigkeiten aus der Welt zu kennen.", "Dir der Stille und des Raumes um dich herum jetzt bewusst bist zu sein."],
		correct: 1
	},
	
	
	{
		question: "Was ist ein Tor zum gegenwärtigen Moment?",
		imageUrl: "assets/img/cs/amsel.jpg",
		type: "multiple choice",
		options: ["Der Gedanke an die nächste Mahlzeit.", "Den Geräuschen und der Stille um dich herum zu lauschen."],
		correct: 1
	}

];

var q1 = 0;

function createQuestion1() {
	var c = document.getElementById("conciousness");
	while (c.firstChild) {
		c.removeChild(c.firstChild);
	}
	c.style = "height: 300px; display: flex;";
	var d = document.createElement("div");
	d.style = "flex-grow: 1; flex-basis: 30%;";
	c.appendChild(d);
	
	var s = document.createElement("img");
	s.src = questionscs[q1].imageUrl;
	s.alt = "Can't display this image";
	s.style = "width: 100%";
	d.appendChild(s);
	
	var d2 = document.createElement("div");
	d2.style="flex-grow: 4; flex-basis: 65%; position: relative; margin-left: 5px;";
	c.appendChild(d2);
	
	s = document.createElement("p");
	s.appendChild(document.createTextNode(questionscs[q1].question));
	d2.appendChild(s);
	

	s = document.createElement("div");
	d2.appendChild(s);

	s.class = "optionQuestOptions";
	s.id = s.class + "1";
	if (questionscs[q1].type == "multiple choice") {
		for (var i = 0; i < questionscs[q1].options.length; i++) {
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
			s3.appendChild(document.createTextNode(questionscs[q1].options[i]));
			s1.appendChild(s3);
		}
	}
	else if (questionscs[q1].type == "eingabe") {
		var s1 = document.createElement("div");
		s1.class = "textQuest";
		s.appendChild(s1);
		var s2 = document.createElement("input");
		s2.id = "theinputfield1";
		s2.type = "text";
		s2.name = "1";
		s1.appendChild(s2);

	}

	s = document.createElement("div");
	s.style = "margin-top: 10px; display: flex; orientation: column; justify-content: flex-start; ";
	d2.appendChild(s);

	var b = document.createElement("button");
	b.id = "checkButton1";
	b.style = "margin: 2px;";
	b.onclick = checkButtonClicked1;
	b.appendChild(document.createTextNode("Aufgabe überprüfen"));
	s.appendChild(b);

	if (q1 != questionscs.length - 1) {
		b = document.createElement("button");
		b.id = "nextButton1";
		b.style = "margin: 2px;";
		b.onclick = nextButtonClicked1;
		b.appendChild(document.createTextNode("Nächste Aufgabe"));
		s.appendChild(b);
	}


}



function nextButtonClicked1() {
	q1++;
	createQuestion1();
}

function previousButtonClicked1() {
	q1--;
	createQuestion1();
}

function solveButtonClicked1() {
	console.log("The solve button was clicked!");

	console.log("The check button was clicked!");
	if (questionscs[q1].type == "multiple choice") {
		var inputFields = document.getElementById('optionQuestOptions1').getElementsByTagName('input');
		for (var index = 0; index < inputFields.length; ++index) {
			var element = inputFields[index];
			if (element.value || element.checked) {

				if (element.type == "radio" || element.type == "checkbox") {
					element.parentElement.style.backgroundColor = "white";
					element.checked = index == questionscs[q1].correct;
				}
			}
		}
	}
	else if (questionscs[q1].type == "eingabe") {
		var element = document.getElementById("theinputfield1");
		element.type.backgroundColor = "white";
		element.value = questionscs[q1].correct[0];
	}
}

function checkButtonClicked1() {
	console.log("The check button was clicked!");
	if (questionscs[q1].type == "multiple choice") {
		var inputFields = document.getElementById('optionQuestOptions1').getElementsByTagName('input');
		for (var index = 0; index < inputFields.length; ++index) {
			var element = inputFields[index];
			if (element.value || element.checked) {
				if (element.type == "text") {
					element.style.backgroundColor = "white";
					if (element.value == questionscs[q1].correct) {
						element.style.backgroundColor = "#7bf27b";
					} else {
						element.style.backgroundColor = "#fc5c5c";
					}
				} else if (element.type == "radio" || element.type == "checkbox") {
					element.parentElement.style.backgroundColor = "white";

					if (element.checked) {
						if (index == questionscs[q1].correct) {
							element.parentElement.style.backgroundColor = "#7bf27b";
						} else {
							element.parentElement.style.backgroundColor = "#fc5c5c";
						}
					}

				}
			}
		}
	}
	else if (questionscs[q1].type == "eingabe") {
		var element = document.getElementById("theinputfield1");

		element.style.backgroundColor = "white";


		if (contains(questionscs[q1].correct, element.value)) {
			element.style.backgroundColor = "#7bf27b";
		} else {
			element.style.backgroundColor = "#fc5c5c";
		}

	}
}

function contains1(a, value) {
	for (var i = 0; i < a.length; ++i) {
		if (a[i] == value) {
			return true;
		}
	}
	return false;
}




createQuestion1();




