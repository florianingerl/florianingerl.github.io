let nav = document.querySelector("#header");
let height = nav.offsetHeight;

console.log( {height } );

let bh = document.querySelector("#behindheader");
bh.style.height = height +"px";
console.log("Everything worked fine!");

var style = document.createElement('style');
style.innerHTML = "html { scroll-padding-top: " + height +"px; }";
document.head.appendChild(style);

console.log("This also worked fine!");
