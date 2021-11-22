function formSubmit() {
  /* Zum Weiterleiten */
  document.getElementById("search-view").style.display = "none";
  document.getElementById("results-view").style.display = "block";
  document.getElementById("arrow_back_ios").setAttribute("side", 1);

  /* input tags speichern */
  const input = document.querySelectorAll("input");

  /* input id und wert speichern */
  var nameAndValues = {};
  Array.from(input).forEach((input) => (nameAndValues[input.id] = input.value));

  /* gefilterte Daten generieren */
  console.log(nameAndValues);
  const filteredData = data[nameAndValues["von"]]["Flüge"].filter(
    (data) =>
      data["nach"] == nameAndValues["nach"] &&
      data["date"] == nameAndValues["date"] &&
      data["time"] == nameAndValues["time"]
  );

  console.log(filteredData);

  /* Header */
  const headerResultView =
    `
  <div class="details">
  <div class="tagZeitOrt">
    <p>Freitag</p>
    <h2 class="date">` +
    transformDate(nameAndValues["date"]) +
    `</h2>
    <p>Von <b>` +
    nameAndValues["von"] +
    `</b></p>
  </div>
  <hr />
  <div id="wetter">
    <span class="material-icons"> wb_sunny </span
    ><span id="temperature">` +
    data[nameAndValues["von"]]["Wetter"] +
    `</span
    ><span id="city">Wetter in <b>` +
    nameAndValues["nach"] +
    `</b></span>
  </div>
</div>`;

  var flights = ``;

  filteredData.forEach(
    (flight, index) =>
      (flights =
        flights +
        `<table class="flights" key="` +
        index +
        `" von="` +
        flight["von"] +
        `" onclick="showDetails(this)">
    <tr>
      <th>
        <i class="material-icons">airplane_ticket</i>
      </th>
      <th class="flight-number">
      ` +
        flight["nr"] +
        `
      </th>
      <th class="flight-destination">
        Nach ` +
        flight["nach"] +
        `
      </th>
    </tr>
    <tr>
      <td><i class="material-icons">flight_takeoff</i></td>
      <td>` +
        flight["time"] +
        `</td>
      <td class="success">` +
        flight["time_according"] +
        `</td>
    </tr>
    <tr>
      <td><i class="material-icons">flight_land</i></td>
      <td>` +
        flight["arrival"] +
        `</td>
      <td class="success">` +
        flight["arrival_according"] +
        `</td>
    </tr>
  </table>`)
  );

  document.getElementById("results-view").innerHTML =
    headerResultView +
    (flights === ``
      ? ""
      : `<div class="flights-container">` + flights + `</div>`);
}

const results = {
  example1: ["Hallo", "Richtig", "est", true, false, false, true, false, false],
};

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
