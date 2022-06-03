
// each player start off w/ 7 gold, 2 troops
let red = new Emperor("Red", "#E30B5C", 7, 2, 0 );
let yellow = new Emperor("Yellow", "#FDDA0D", 7, 2, 0 );
let blue = new Emperor("Blue", "#4169E1", 7, 2, 0 );
let green = new Emperor("Green", "#00A36C", 7, 2, 0 );

let players = [red, yellow, blue, green];
players[0].capital = map.grid[capitalRows[0]][capitalCols[0]];
players[1].capital = map.grid[capitalRows[1]][capitalCols[1]];
players[2].capital = map.grid[capitalRows[2]][capitalCols[2]];
players[3].capital = map.grid[capitalRows[3]][capitalCols[3]];

let turnCounter = 0;
let turnIsStart = true; // is the first cycle of planning, so don't add new troops to capital

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
    eraseNotifs();
    deleteOptions();

    turnCounter++;
    // every player has gone
    if (turnCounter > 3){
        changeTurnCycle();
        turnCounter = 0;
        turnIsStart = false;
    }
    turnPlayer.innerHTML = players[turnCounter].name + "'s Turn";
    if (turnIsPlanning){
        /// avoid capitals getting troops at first cycle
        if (!turnIsStart){
            getResources();
        }
        updatevalues();
    }
}

let nextTurnButton = document.getElementById("nextTurn");
nextTurnButton.addEventListener('click', nextTurn);

// shows resouces of player's turn 
let goldShow = document.getElementById("gold"); 

// user wants to buy a gold mine
let goldMineShow = document.getElementById("goldMineShow");
let goldMineButton = document.getElementById("goldMineBuy");
let buyGoldMine = function(){
    // might be made redddundant later but for now still needed 
    // can only buy during planning
    if (!turnIsPlanning){
        alert("Can Only Buy During Planning");
        return;
    }
    // gold mines cost 7 gold 
    let cost = 7;
    // add to player
    let currentPlayer = players[turnCounter];
    //currentGold = currentPlayer.gold;
    if (currentPlayer.gold < cost){
        alert("Gold Mines cost " + cost + " gold");
        return;
    }
    else{
        currentPlayer.gold -= cost;
        currentPlayer.goldMine++;
        // update new vales on screen
        updatevalues();
    }
    // add to hex tile
    map.grid[curHex[0]][curHex[1]].building = "goldMine";
}
let deleteGoldMine = function(){
    map.grid[curHex[0]][curHex[1]].building = "";
    players[turnCounter].goldMine -= 1;
    updatevalues();
}

//update all values on screen for current player
let updatevalues = function(){
    let currentPlayer = players[turnCounter];
    goldShow.innerHTML = "Gold: " + currentPlayer.gold;
    goldMineShow.innerHTML = "Gold Mines: "+currentPlayer.goldMine;
}

let getResources = function(){
    let currentPlayer = players[turnCounter];
    // 5 gold from each gold mine comes in at start of planning turn 
    
    let goldMine = currentPlayer.goldMine;
    // has mine, add + send notif
    if (goldMine != 0){
        addGold = goldMine * 5;
        currentPlayer.gold += addGold;
        addNotif("*recevied " + addGold + " from mines");
    }
    // 2 troops spawn at capital 
    let prevTroop = currentPlayer.capital.troops;
    //console.log(currentPlayer.capital.troops);
    currentPlayer.capital.modifyTroops(prevTroop + 2);
    addNotif("*2 troops spawn at capital");
}

let addNotif = function(notification){
    let notifs = document.getElementById("notifs");
    let statement = document.createElement("p");
    statement.setAttribute("class", "noti");
    //let text = document.createTextNode(notification);
    //statement.appendChild(text);
    statement.innerHTML = notification;
    notifs.appendChild(statement);
    //console.log(notifs);
    //console.log(statement);
    //console.log(notification);
}

let eraseNotifs = function(){
    let notifs = document.getElementById("notifs");
    while (notifs.hasChildNodes()){
        notifs.removeChild(notifs.firstChild);
    }
}


let showOptions = function(hex){
    if (!turnIsPlanning){
        return;
    }
    // shows what building is on tile when tile is clicked
    let build = document.getElementById("buildOptions");
    let building = map.grid[curHex[0]][curHex[1]].building;
    let showBuild = document.createElement("p");
    if (building == ""){
        showBuild.innerHTML = "Has No Buildings";
    }
    else{
        showBuild.innerHTML = "Building: " + building;
    }
    build.appendChild(showBuild);
    // if it's player's tile, shows building options
    // color is used instead of name b/c hex doesnt have name porperty
    if (map.grid[curHex[0]][curHex[1]].color == players[turnCounter].color){
        if (building == "goldMine"){
            let deleteMineButton = document.createElement("button");
            deleteMineButton.innerHTML = "Delete Gold Mine";
            deleteMineButton.setAttribute("id", "goldMineDelete");
            deleteMineButton.setAttribute("class", "btn btn-dark");
            build.appendChild(deleteMineButton);
            //console.log(goldMineButton);
            deleteMineButton.addEventListener('click', deleteGoldMine); //buyGoldMine is in turn.js
        }
        if (building == ""){
            // adds goldMine button to page
            let goldMineCreated = document.createElement("button");
            goldMineCreated.innerHTML = "Build Gold Mine";
            goldMineCreated.setAttribute("id", "goldMineBuy");
            goldMineCreated.setAttribute("class", "btn btn-warning");
            build.appendChild(goldMineCreated);
            //console.log(goldMineButton);
            goldMineCreated.addEventListener('click', buyGoldMine); //buyGoldMine is in turn.js
        }
      }
  }
  
  let deleteOptions = function(){
    let build = document.getElementById("buildOptions");
    let children = build.childNodes;
    // console.log(children);
    while (build.hasChildNodes()){
      build.removeChild(build.firstChild);
    }
  
  }
  