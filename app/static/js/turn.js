
// each player start off w/ 7 gold, 2 troops
let red = new Emperor("Red", "#E30B5C", 7, 2 );
let yellow = new Emperor("Yellow", "#FDDA0D", 7, 2 );
let blue = new Emperor("Blue", "#4169E1", 7, 2 );
let green = new Emperor("Green", "#00A36C", 7, 2 );

let players = [red, yellow, blue, green];


// handles the switch from planning plase to action phase of turn cycle
let turnIsPlanning = true; // switches btwn planning and action
let turnShow = document.getElementById("turnPhase");
let changeTurnCycle = function(){
    if (turnIsPlanning){
        turnIsPlanning = false;
        turnShow.innerHTML="Phase: Action";
    }
    else{
        turnIsPlanning = true;
        turnShow.innerHTML="Phase: Planning";
    }
}

// handles the switch from player to player
let turnCounter = 0;
let turnPlayer = document.getElementById("turnPlayer");
let nextTurn = function(){
    turnCounter++;
    // every player has gone
    if (turnCounter > 3){
        changeTurnCycle();
        turnCounter = 0;
    }
    turnPlayer.innerHTML = players[turnCounter].name + "'s Turn";
    // updates resources of new player
    goldShow.innerHTML="Gold: " + players[turnCounter].gold;
}

let nextTurnButton = document.getElementById("nextTurn");
nextTurnButton.addEventListener('click', nextTurn);

// shows resouces of player's turn 
let goldShow = document.getElementById("gold");
