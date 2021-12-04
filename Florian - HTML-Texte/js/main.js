const results = {
  example1: ["Hallo", "Richtig", "est", true, false, false, true, false, false],
};

// Ab hier Text-Input-Generator
const text = {
  seite1:
    "Si je {gagnais} (gagner) un million d'euros, je {m'achèterais} (me acheter) une nouvelle voiture. Si j' {avais} (avoir) du temps, j' {offrirais} (offrir) des cours de soutien gratuites.",
  seite2: "Tu {es} sympa. Je {suis} sympa. Il {est} sympa.",
};

//const textArea = document.getElementById("textArea");
//const value = textArea.value.trim().split(" ");

let value = "";

console.log(window.location.pathname.split("/").pop());

if (window.location.pathname.split("/").pop() == "index0.html") {
  value = text.seite1.trim().split(" ");
} else if (window.location.pathname.split("/").pop() == "index1.html") {
  value = text.seite2.trim().split(" ");
}

let form = document.getElementById("example1");
let htmlObject = document.createElement("div", (tagName = ""));
htmlObject.setAttribute("class", "textQuest");

let newHTML = `<span>`;

const regex = /{\w*}/;
let newResults = [];

value.forEach((value) => {
  if (value.match(regex) != null) {
    newHTML += `<input name="${Math.floor(
      Math.random() * 1000000
    )}" type="text" /> `;
    newResults.push(value.replace("{", "").replace("}", ""));
  } else {
    newHTML += value + " ";
  }
});

newHTML = newHTML + `</span>`;

let wholeResults = newResults.concat(results.example1);
results.example1 = wholeResults;

htmlObject.innerHTML = newHTML;
form.prepend(htmlObject);

//textArea.value = "";

// Ab hier Text-Input-Generator ENDE

function myFunction() {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((element, index) => {
    if (element.value || element.checked) {
      if (element.type == "text") {
        element.style.backgroundColor = "white";
        if (element.value == results.example1[index]) {
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "red";
        }
      } else if (element.type == "radio" || element.type == "checkbox") {
        element.parentElement.style.backgroundColor = "white";
        if (element.checked) {
          if (element.checked == results.example1[index]) {
            element.parentElement.style.backgroundColor = "green";
          } else {
            element.parentElement.style.backgroundColor = "red";
          }
        }
      }
    }
  });
}

function cleanFunction() {
  document.getElementById("example1").reset();

  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((element, index) => {
    if (element.type == "text") {
      element.style.backgroundColor = "white";
    } else if (element.type == "radio" || element.type == "checkbox") {
      element.parentElement.style.backgroundColor = "white";
    }
  });
}

function solveFunction() {
  document.getElementById("example1").reset();

  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((element, index) => {
    if (element.type == "text") {
      element.value = results.example1[index];
      console.log(element);
      element.style.backgroundColor = "green";
    } else if (element.type == "radio" || element.type == "checkbox") {
      if (results.example1[index]) {
        element.checked = results.example1[index];
        element.parentElement.style.backgroundColor = "green";
      }
    }
  });
}
