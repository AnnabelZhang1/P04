
// each player start off w/ 7 gold, 2 troops
let red = new Emperor("Red", "#E30B5C", 7, 2, 0 );
let yellow = new Emperor("Yellow", "#FDDA0D", 7, 2, 0 );
let blue = new Emperor("Blue", "#4169E1", 7, 2, 0 );
let green = new Emperor("Green", "#00A36C", 7, 2, 0 );

let players = [red, yellow, blue, green];

let turnCounter = 0;
let currentPlayer = players[turnCounter];


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
let turnPlayer = document.getElementById("turnPlayer");
let nextTurn = function(){
    turnCounter++;
    // every player has gone
    if (turnCounter > 3){
        changeTurnCycle();
        turnCounter = 0;
    }
    turnPlayer.innerHTML = players[turnCounter].name + "'s Turn";
    getResources();
    updatevalues();
}

let nextTurnButton = document.getElementById("nextTurn");
nextTurnButton.addEventListener('click', nextTurn);

// shows resouces of player's turn 
let goldShow = document.getElementById("gold"); 

// user wants to buy a gold mine
let goldMineShow = document.getElementById("goldMineShow");
let goldMineButton = document.getElementById("goldMineBuy");
let buyGoldMine = function(){
    // gold mines cost five gold 
    let currentPlayer = players[turnCounter];
    //currentGold = currentPlayer.gold;
    if (currentPlayer.gold >= 5){
        currentPlayer.gold -= 5;
        currentPlayer.goldMine++;
        // update new vales on screen
        updatevalues();
    }

}
goldMineButton.addEventListener('click', buyGoldMine)

//update all values on screen for current player
let updatevalues = function(){
    goldShow.innerHTML = "Gold: " + currentPlayer.gold;
    goldMineShow.innerHTML = "Gold Mines: "+currentPlayer.goldMine;
}

let getResources = function(){
    // 5 gold from each gold mine comes in at start of planning turn 
    if (turnIsPlanning){
        let goldMine = currentPlayer.goldMine;
        addGold = goldMine * 5;
        currentPlayer.gold += addGold;
    }
}