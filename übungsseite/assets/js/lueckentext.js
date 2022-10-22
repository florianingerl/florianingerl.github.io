

class Lueckentext {
    constructor(id, filename) {
        this.id = id;
        this.filename = filename;
    }

    loadFile() {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            document.getElementById(this.id).innerHTML = xhttp.responseText;
            this.createLueckentext(xhttp.responseText);
        }
        xhttp.open("GET", this.filename, true);
        xhttp.send();
    }

    createLueckentext(s) {
        let pattern = new RegExp(/\{(.*?)\}/g);
        let result;
        let l = document.getElementById(this.id);
        l.innerHTML = "";

        this.correctAnswers = [];
        let i = 0;
        while ((result = pattern.exec(s)) != null) {
            l.innerHTML += s.substring(i, result.index );
            this.correctAnswers[ this.correctAnswers.length ] = result[1];
            l.innerHTML += "<input type=\"text\" style=\"display:inline-block; width: 100px;\"></input>";
            i = pattern.lastIndex;

            /*
            let d = document.createElement("div");
            body.appendChild(d);
            d.appendChild( document.createTextNode( "Matched " + result[0] + " at position " + result.index + " and next search begins at " + pattern.lastIndex ) ); */
        }
        l.innerHTML += "<br><br>";

        let button = document.createElement("button");
        button.innerHTML = "Check your answers";
        
        button.onclick = () => {
            let inputs = document.getElementsByTagName("input");
            for(let j = 0; j < inputs.length; ++j){
                if(inputs[j].value === this.correctAnswers[j] ){
                    inputs[j].style.color = "green";
                }
                else {
                    inputs[j].style.color = "red";
                }
            }
        };
       
        l.appendChild(button);
        
    }
}

