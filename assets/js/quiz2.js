var de = 0;
var fr = 1;
var en = 2;


function Quiz(id, questions) {
	this.questions = questions;
	this.q = 0;
	this.id = id;

	this.langue = de;
	if (window.location.pathname.endsWith("franz.html")) {
		this.langue = fr;
	}
	
	this.createQuestion();
}

Quiz.prototype.createQuestion = function() {

	var c = document.getElementById(this.id);
	while (c.firstChild) {
		c.removeChild(c.firstChild);
	}
	c.style = "display: flex; orientation: column;";
	
	var s = document.createElement("img");
	s.src = this.questions[this.q].imageUrl;
	s.alt = "Can't display this image";
	s.style = "border-radius: 2px; margin-right: 5px; flex-grow: 1; width: 50%; flex-basis: 30%; align-self: flex-start;";
	s.onclick = function() {
		console.log("The function was called!");

		var fullPage = document.getElementById('fullpage');

		fullPage.style.backgroundImage = 'url(' + this.questions[this.q].imageUrl + ')';
		fullPage.style.display = 'block';
	};
	c.appendChild(s);
	
	var c2 = document.createElement("div");
	c2.style = "flex-grow: 3; flex-basis: 65%;";
	c.appendChild(c2);
	c = c2;
	
	var s = document.createElement("p");
	var qT = this.questions[this.q].question;
	if(this.langue == fr){
		qT = this.questions[this.q].questionFranc;
	}
	s.appendChild(document.createTextNode(qT));
	c.appendChild(s);

	s = document.createElement("div");
	c.appendChild(s);

	s.class = "optionQuestOptions";
	this.optionsQuestOptions = s;
	if (this.questions[this.q].type == "multiple choice") {
		for (var i = 0; i < this.questions[this.q].options.length; i++) {
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
			if(this.langue == de){
			s3.appendChild(document.createTextNode(this.questions[this.q].options[i].opt));
			}
			else if(this.langue == fr){
			s3.appendChild(document.createTextNode(this.questions[this.q].optionsFranc[i]));
			}
			s1.appendChild(s3);
		}
	}
	else if (this.questions[this.q].type == "eingabe") {
		var s1 = document.createElement("div");
		s1.class = "textQuest";
		s.appendChild(s1);
		var s2 = document.createElement("input");
		this.theInputField = s2;
		s2.type = "text";
		s2.name = "1";
		s1.appendChild(s2);

	}

	s = document.createElement("div");
	s.style = "display: flex; orientation: column;";
	c.appendChild(s);

	var b = document.createElement("button");
	b.id = "checkButton";
	b.style = "margin: 5px;";
	//If you use a function flechee, this refers to the context englobant
	//dont la fonction a ete definie
	b.onclick = () => {
		this.checkButtonClicked();
	}
	
	if(this.langue == de){
	b.appendChild(document.createTextNode("Aufgabe überprüfen"));
	}
	else if(this.langue == fr){
		b.appendChild(document.createTextNode("Valider"));
	}
	s.appendChild(b);


	if (this.q != this.questions.length - 1) {
		b = document.createElement("button");
		b.id = "nextButton";
		b.style = "margin: 5px;";
	
		b.onclick = () => {
			this.nextButtonClicked();
		}
		
		if(this.langue == de){
		b.appendChild(document.createTextNode("Nächste Aufgabe"));
		}
		else if(this.langue == fr){
		b.appendChild(document.createTextNode("Suivante"));	
		}
		s.appendChild(b);
	}


}


Quiz.prototype.nextButtonClicked = function() {
	this.q++;
	this.createQuestion();
}

Quiz.prototype.solveButtonClicked = function() {
	console.log("The solve button was clicked!");

	console.log("The check button was clicked!");
	if (this.questions[this.q].type == "multiple choice") {
		var inputFields = this.optionsQuestOptions.getElementsByTagName('input');
		for (var index = 0; index < inputFields.length; ++index) {
			var element = inputFields[index];
			if (element.value || element.checked) {

				if (element.type == "radio" || element.type == "checkbox") {
					element.parentElement.style.backgroundColor = "white";
					element.checked = index == this.questions[this.q].correct;
				}
			}
		}
	}
	else if (this.questions[this.q].type == "eingabe") {
		var element = this.theInputField;
		element.type.backgroundColor = "white";
		element.value = this.questions[this.q].correct[0];
	}
}

Quiz.prototype.checkButtonClicked = function() {
	console.log("The check button was clicked!");
	if (this.questions[this.q].type == "multiple choice") {
		var inputFields = this.optionsQuestOptions.getElementsByTagName('input');
		for (var index = 0; index < inputFields.length; ++index) {
			var element = inputFields[index];
			if (element.value || element.checked) {
				if (element.type == "text") {
					element.style.backgroundColor = "white";
					if (element.value == this.questions[this.q].correct) {
						element.style.backgroundColor = "#7bf27b";
					} else {
						element.style.backgroundColor = "#fc5c5c";
					}
				} else if (element.type == "radio" || element.type == "checkbox") {
					element.parentElement.style.backgroundColor = "white";

					if (element.checked) {
						if (index == this.questions[this.q].correct) {
							element.parentElement.style.backgroundColor = "#7bf27b";
						} else {
							element.parentElement.style.backgroundColor = "#fc5c5c";
						}
					}

				}
			}
		}
	}
	else if (this.questions[this.q].type == "eingabe") {
		var element = this.theInputField;
		
		element.style.backgroundColor = "white";


		if (contains(this.questions[this.q].correct, element.value)) {
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

init();