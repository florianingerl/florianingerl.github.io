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
		options: ["Wirsing", "Kartoffel", "Kohlrabi"],
		correct: 2
	},

	{
		question: "Welches Gerät eignet sich nicht! zur Sprossenzucht?",
		imageUrl: "assets/img/rawfood/sprossengläser.png",
		type: "multiple choice",
		options: ["Sprossenturm", "Sprossengläser mit Abtropfgestell", "Schüssel und Teller zum Abdecken", "Backofen"],
		correct: 3
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
	}

];

var q = 0;

function createQuestion() {
	var c = document.getElementById("rohkost");
	while(c.firstChild){
		c.removeChild(c.firstChild);
	}
	var s = document.createElement("p");
	s.appendChild(document.createTextNode(questions[q].question));
	c.appendChild(s);
	s = document.createElement("img");
	s.src = questions[q].imageUrl;
	s.alt = "Can't display this image";
	s.style ="width: 300px";
	c.appendChild(s);

	s = document.createElement("div");
	c.appendChild(s);

	s.class = "optionQuestOptions";
	s.id = s.class;
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

	b = document.createElement("button");
	b.id = "nextButton";
	b.onclick = nextButtonClicked;
	b.appendChild(document.createTextNode("Nächste Aufgabe"));
	c.appendChild(b);
}

function nextButtonClicked(){
	q++;
	createQuestion();
}

function solveButtonClicked() {
	console.log("The solve button was clicked!");
	
	console.log("The check button was clicked!");
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

function checkButtonClicked() {
	console.log("The check button was clicked!");
	var inputFields = document.getElementById('optionQuestOptions').getElementsByTagName('input');
	for (var index = 0; index < inputFields.length; ++index) {
		var element = inputFields[index];
		if (element.value || element.checked) {
			if (element.type == "text") {
				element.style.backgroundColor = "white";
				if (element.value == questions[q].correct) {
					element.style.backgroundColor = "green";
				} else {
					element.style.backgroundColor = "red";
				}
			} else if (element.type == "radio" || element.type == "checkbox") {
				element.parentElement.style.backgroundColor = "white";

				if (element.checked) {
					if (index == questions[q].correct) {
						element.parentElement.style.backgroundColor = "green";
					} else {
						element.parentElement.style.backgroundColor = "red";
					}
				}

			}
		}
	}
}



createQuestion();


;