
// each player start off w/ 7 gold, 2 troops
let red = new Emperor("#E30B5C", 7, 2 );
let yellow = new Emperor("#FDDA0D", 7, 2 );
let blue = new Emperor("#4169E1", 7, 2 );
let green = new Emperor("#00A36C", 7, 2 );

let players = [red, yellow, blue, green];


// handles the switch from planning plase to action phase of turn cycle
let turnIsPlanning = true; // switches btwn planning and action
let turnShow = document.getElementById("turnPhase");

let nextTurnButton = document.getElementById("nextTurn");
let nextTurnPhase = function(){
    if (turnIsPlanning){
        turnIsPlanning = false;
        turnShow.innerHTML="Action";
    }
    else{
        turnIsPlanning = true;
        turnShow.innerHTML="Planning";
    }
}
// when user clicks next, it goes to action phase
nextTurnButton.addEventListener('click', nextTurnPhase);