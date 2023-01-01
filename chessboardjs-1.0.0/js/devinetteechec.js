var devinettes = [
    {
      question: "Kann der weiße Springer den schwarzen Bauern noch aufhalten?",
      questionFranz: "Est-ce que le cavalier blanc peut encore rattraper le pion noir?",
      questionEng: "Can the white knight still prevent the black pawn from queening?",
      position: { a2: 'bK',  a8: 'wK', e4: 'wN', g2: 'bP'},
      solution: [ {source:'e4',target:'c3'}, {source:'a2',target:'a1'}, {source:'c3',target:'e2'}] 
    },
    {
        question: "Kann der weiße Springer den schwarzen Bauern noch aufhalten?",
        questionFranz: "Est-ce que le cavalier blanc peut encore rattraper le pion noir?",
        questionEng: "Can the white knight still prevent the black pawn from queening?",
        position: { c1: 'bK',  a8: 'wK', g6: 'wN', g2: 'bP'},
        solution: [ {source:'g6',target:'f4'}, {source:'g2',target:'g1', isQueening: true}, {source:'f4',target:'e2'}, {source:'c1',target:'d2'},{source:'e2',target:'g1'}] 
      },
      {
        question: "Kann der weiße Springer den schwarzen Bauern noch aufhalten?",
        questionFranz: "Est-ce que le cavalier blanc peut encore rattraper le pion noir?",
        questionEng: "Can the white knight still prevent the black pawn from queening?",
        position: { d1: 'bK',  a8: 'wK', b6: 'wN', b2: 'bP'},
        solution: [ {source:'b6',target:'a4'}, {source:'b2',target:'b1', isQueening: true}, {source:'a4',target:'c3'}, {source:'d1',target:'e1'}, {source:'c3',target:'b1'}] 
      },
      {
        question: "Kann der weiße Springer den schwarzen Bauern noch aufhalten?",
        questionFranz: "Est-ce que le cavalier blanc peut encore rattraper le pion noir?",
        questionEng: "Can the white knight still prevent the black pawn from queening?",
        position: { c8: 'bK',  a7: 'wK', b8: 'wN', h4: 'bP'},
        solution: [ {source:'b8',target:'c6'}, {source:'h4',target:'h3'}, {source:'c6',target:'e7'}, {source:'c8',target:'c7'}, {source:'e7',target:'f5'}, {source:'h3',target:'h2'},{source:'f5',target:'g3'}, {source:'c7',target:'d6'}, {source:'a7',target:'b6'}, {source:'d6',target:'e5'}, {source:'b6',target:'c5'}, {source:'e5',target:'f4'}, {source:'g3',target:'h1'},{source:'f4',target:'f3'}, {source:'c5',target:'d4'}, {source:'f3',target:'g2'},{source:'d4',target:'e3'},{source:'g2',target:'h1'},{source:'e3',target:'f2'}] 
      }
];

var de = 0;
var fr = 1;
var en = 2;


class DevinetteEchec {

    constructor(devinettes){
        this.devinettes = devinettes;
        this.i = 0; 

        this.langue = de;
	    if (window.location.pathname.endsWith("franz.html")) {
		    this.langue = fr;
	    }
        else if(window.location.pathname.endsWith("eng.html")){
            this.langue = en;
        }
        this.constructDevinette();
    }

    constructDevinette() {
        let container = document.getElementById("devinetteEchec");
        container.innerHTML = "";
        
        let question = document.createElement("p");
        question.innerHTML = this.devinettes[this.i].question;
        if(this.langue == fr){
            question.innerHTML = this.devinettes[this.i].questionFranz;
        }
        else if(this.langue == en){
            question.innerHTML = this.devinettes[this.i].questionEng;
        }
        container.appendChild(question);

        let divBoard = document.createElement("div");
        divBoard.style = "width: 200px; height: 200px;"
        divBoard.id = "board";
        container.appendChild(divBoard);  

        let pFeedback = document.createElement("p");
        container.appendChild(pFeedback);

        this.devinettes[this.i].j = 0;

        let config = {
            draggable: true,
            dropOffBoard: "snapback",
            moveSpeed: "slow",
            pieceTheme: 'chessboardjs-1.0.0/img/chesspieces/wikipedia/{piece}.png',
            position: this.devinettes[this.i].position   
        }
        config.onDrop = (source, target, piece, newPos, oldPos, orientation) => {
               
            let move = this.devinettes[this.i].solution[ this.devinettes[this.i].j ];
            if(move.source !== source || move.target !== target){
                pFeedback.style = "color:red;";
                pFeedback.innerHTML = "Falscher Zug! Versuche einen anderen."; 
                if(this.langue == fr){
                    pFeedback.innerHTML = "Coup faux! Essaye un autre coup!";
                }
                else if(this.langue == en){
                    pFeedback.innerHTML = "Wrong move! Try another move!";
                }
                return "snapback";
            }
            else {
                pFeedback.style = "color:green;"
                let l = this.devinettes[this.i].solution.length;
                this.devinettes[this.i].j++;
                if(this.devinettes[this.i].j == l){
                    pFeedback.innerHTML = "Gratulation! Du hast diese Aufgabe gelöst!";
                    if( this.langue == fr ){
                        pFeedback.innerHTML = "Felicitations! Tu as résoudu la devinette!";
                    }
                    else if( this.langue == en){
                        pFeedback.innerHTML = "Congratulations! You have solved the problem!";
                    }
                    this.i++;
                    if(this.i !== this.devinettes.length) {
                        let b = document.createElement("button");
                        b.style="display:block";
                        b.innerHTML = "Nächste Aufgabe!";
                        if( this.langue == fr){
                            b.innerHTML = "Exercice suivant!";
                        }
                        else if(this.langue == en){
                            b.innerHTML = "Next exercice!";
                        }
                        container.appendChild(b);

                        console.log(board);
                        
                        b.onclick = () => {
                            this.constructDevinette();
                        }
                    }
                    else {
                        let p = document.createElement("p");
                        p.style = "color:green";
                        p.innerHTML = "Du hast alle Aufgaben gelöst!";
                        if(this.langue == fr){
                            p.innerHTML = "Tu as résoudu toutes les devinettes!";
                        }
                        else if(this.langue == en){
                            p.innerHTML = "You have solved all the exercices!";
                        }
                        container.appendChild(p);
                    }    
                } else {
                    pFeedback.innerHTML = "Richtiger Zug! Finde jetzt die richtige Fortsetzung";
                    if(this.langue == fr){
                        pFeedback.innerHTML = "Coup correct! Trouve la bonne continuation maintenant!";
                    }
                    else if(this.langue == en){
                        pFeedback.innerHTML = "Correct move! Find the right continuation now!";
                    }
                    let move = this.devinettes[this.i].solution[ this.devinettes[this.i].j ];
                    board.move( move.source + '-' + move.target );
                    if(move.isQueening){
                        let position = board.position();
                        position[move.target] = "bQ";
                        board.position( position );
                    }
                    this.devinettes[this.i].j++;
                }
                return "drop";
            }
        };

        var board = Chessboard('board', config );
        

    }
}

new DevinetteEchec(devinettes);