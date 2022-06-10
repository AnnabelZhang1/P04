// WORK ON SHOWING BUILDINGS AND NOT DISPLAYING TROOPS THAT MOVE ONTO BUILDINGS


// each player start off w/ 7 gold, 2 troops
let red = new Emperor("Red", "#E30B5C", 7, 0 , "");
let yellow = new Emperor("Yellow", "#FDDA0D", 7, 0, "");
let blue = new Emperor("Blue", "#4169E1", 7, 0, "");
let green = new Emperor("Green", "#00A36C", 7, 0, "");

let players = [red, yellow, blue, green];

for (let i = 0; i < 4; i++){
    players[i].capital = capitals[i];
}
/* Capitals init version
players[0].capital = map.grid[capitalRows[0]][capitalCols[0]];
players[1].capital = map.grid[capitalRows[1]][capitalCols[1]];
players[2].capital = map.grid[capitalRows[2]][capitalCols[2]];
players[3].capital = map.grid[capitalRows[3]][capitalCols[3]];
*/

let turnCounter = 0;
let turnIsStart = true; // is the first cycle of planning, so don't add new troops to capital


// handles the switch from planning plase to action phase of turn cycle
//let turnIsPlanning = true; // switches btwn planning and action
//let turnShow = document.getElementById("turnPhase");
/*
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
*/

// find correct player
var findCurrentPlayer = function(id){
  // var found = players.find(function(element) {
  var found = players.findIndex(function(element) {
    return (element.requestid === id);
  });

  // console.log(found);
  return found;
};


// handles the switch from player to player
let turnPlayer = document.getElementById("turnPlayer");
let nextTurn = function(){
    // player is in progress of choosing to move troops and has not finished
    if (action){
        alert("you are moving troops");
        return;
    }


    eraseNotifs();
    // deleteOptions();
    // socket.emit('deny_options_everyone_else')
    turnCounter++;

    // to clear the last selected hexagon upon clicking next turn.
    const canvasHL = document.getElementById('interactions');
    const ctxHL = canvasHL.getContext('2d');
    ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);

    // every player has gone, resets player cycle
    if (turnCounter > 3){
        //changeTurnCycle();
        turnCounter = 0;
        turnIsStart = false;
    }

    // this player has been eliminated
    if (players[turnCounter] == null){
        console.log(turnCounter);
        nextTurn();
        return;
    }

    currentPlayer = players[turnCounter];
    currentPlayerColor = players[turnCounter].name;
    currentPlayerID = players[turnCounter].requestid;

    console.log("entering this stage");
    socket.emit('update_turn', {'playername': players[turnCounter].name, 'playerid': players[turnCounter].requestid})
    // turnPlayer.innerHTML = players[turnCounter].name + "'s Turn";
    //if (turnIsPlanning){
        /// avoid capitals getting troops at first cycle
    if (!turnIsStart){
        getResources();
    }

    updateValues();

    // troop recalibration
    for (let i = 0; i < players[turnCounter].troop.length; i++){
        // reset currMoves for all your troops
        let troop = players[turnCounter].troop[i];
        troop.currMoves = 0;
        // if your troop is on enemy capital, capital takes damage
        let tile = map.grid[troop.x][troop.y];
        if (tile.building == "Capital"){
            conquerTile(troop, tile);
        }
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
    /*
    if (!turnIsPlanning){
        alert("Can Only Buy During Planning");
        return;
    }
    */
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
        // add to hex tile
        map.grid[curHex[0]][curHex[1]].building = "Gold Mine";
		let mine = new Image(70,70);
		mine.src = "./static/assets/gold_mine.png";
		mine.onload = drawImgOnload;
        // update new vales on screen
        updateValues();
        deleteOptions();
        showOptions();
    }
}

let deleteGoldMine = function(){
    map.grid[curHex[0]][curHex[1]].building = "";
    players[turnCounter].goldMine -= 1;
	let clearX = map.grid[curHex[0]][curHex[1]].centerX;
	let clearY = map.grid[curHex[0]][curHex[1]].centerY;
	ctxB.clearRect(clearX-34,clearY-34,68,65);
    updateValues();
    deleteOptions();
    showOptions();
}

//update all values on screen for current player
let updateValues = function(){
    let currentPlayer = players[turnCounter];
    goldShow.innerHTML = "Gold: " + currentPlayer.gold;
    goldMineShow.innerHTML = "Gold Mines: "+currentPlayer.goldMine;
}

let getResources = function(){
    let currentPlayer = players[turnCounter];
    console.log(currentPlayer);
    // 3 gold from capital
    let addGold = 3;

    // 5 gold from each gold mine comes in at start of planning turn
    let goldMine = currentPlayer.goldMine;
    // has mine, add + send notif
    if (goldMine != 0){
        addGold += goldMine * 5;
        //currentPlayer.gold += addGold;
        //addNotif("*recevied " + addGold + " from mines");
    }
    currentPlayer.gold += addGold;
    addNotif("*received " + addGold + " gold");
    /*  AMEND- capital gives 3 gold per turn
    // 2 troops spawn at capital
    let prevTroop = currentPlayer.capital.troops;
    //console.log(currentPlayer.capital.troops);
    currentPlayer.capital.modifyTroops(prevTroop + 2);
    addNotif("*2 troops spawn at capital");
    */
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

let showTile = function(){
    // tile
    let build = document.getElementById("buildOptions");
    let tile = document.createElement("p");
    tile.innerHTML = "Tile: (" + curHex[0] + ", " + curHex[1] + ")";
    build.appendChild(tile);

    // shows what building is on tile when tile is clicked
    let building = map.grid[curHex[0]][curHex[1]].building;
    let showBuild = document.createElement("p");
    if (building == ""){
        showBuild.innerHTML = "Has No Buildings";
    }
    else{
        showBuild.innerHTML = "Building: " + building;
    }
    build.appendChild(showBuild);

    // capital health
    if (building == "Capital"){
        let health = document.createElement("p");
        health.innerHTML = "Health: " + players[colors.indexOf(map.grid[curHex[0]][curHex[1]].color)].capital.health;
        build.append(health);
    }

}
let showOptions = function(hex){
    // tile
    let build = document.getElementById("buildOptions");
    let building = map.grid[curHex[0]][curHex[1]].building;
    showTile();

    /* moved to canvas hexClick
    // moving troops
    if (action){
        console.log("move otpions")
        let moveButton = document.createElement("button");
        moveButton.innerHTML = "Move Troops Here";
        moveButton.setAttribute("class", "btn btn-danger");
        build.appendChild(moveButton);
        moveButton.addEventListener('click', planMoveTroopsHere); // fxn in troop.js
        return;
    }
    */

    // not moving
    // if it's player's tile, shows building options
    if (map.grid[curHex[0]][curHex[1]].color == players[turnCounter].color){ // color is used instead of name b/c hex doesnt have name porperty
        //console.log("worky?");
        if (building == ""){
            // adds goldMine button to page
            let goldMineCreated = document.createElement("button");
            goldMineCreated.innerHTML = "Build Gold Mine";
            //goldMineCreated.setAttribute("id", "goldMineBuy");
            goldMineCreated.setAttribute("title", "costs 7");
            goldMineCreated.setAttribute("class", "btn btn-warning");
            build.appendChild(goldMineCreated);
            goldMineCreated.addEventListener('click', buyGoldMine); //buyGoldMine is in turn.js

            build.appendChild(document.createElement("br"));

            // fortbuy button
            let fortCreated = document.createElement("button");
            fortCreated.innerHTML = "Build Fort";
            fortCreated.setAttribute("id", "fortBuy");
            fortCreated.setAttribute("class", "btn btn-secondary");
            build.appendChild(fortCreated);
            fortCreated.addEventListener('click', buyFort);
        }
        else if (building == "Gold Mine"){
            let deleteMineButton = document.createElement("button");
            deleteMineButton.innerHTML = "Delete Gold Mine";
            //deleteMineButton.setAttribute("id", "goldMineDelete");
            deleteMineButton.setAttribute("class", "btn btn-dark");
            build.appendChild(deleteMineButton);
            //console.log(goldMineButton);
            deleteMineButton.addEventListener('click', deleteGoldMine); //buyGoldMine is in turn.js
        }
        else if (building == "Fort"){
            // delete
            let deleteFortButton = document.createElement("button");
            deleteFortButton.innerHTML = "Delete Fort";
            deleteFortButton.setAttribute("class", "btn btn-dark");
            build.appendChild(deleteFortButton);
            deleteFortButton.addEventListener('click', deleteFort);

            build.appendChild(document.createElement("br"));

            spawnTroops();

        }
        else if (building == "Capital"){
            spawnTroops();
        }

    }

    // not moving
    // if it's player's tile, shows building options
    // UPDATE: this code should check to see if a troop exists on the curHex tile and whether you can move it
    console.log("color "+map.grid[curHex[0]][curHex[1]].color);
    if (map.grid[curHex[0]][curHex[1]].troop != null && players[turnCounter].color == map.grid[curHex[0]][curHex[1]].troop.ownerCol && map.grid[curHex[0]][curHex[1]].troop.currMoves < map.grid[curHex[0]][curHex[1]].troop.moveSpeed){
        console.log("allow movement");
        console.log("currMoves "+map.grid[curHex[0]][curHex[1]].troop.currMoves);
        build.appendChild(document.createElement("br"));
        // allow to plan movement of these troops
        let moveTroopsButton = document.createElement("button");
        moveTroopsButton.innerHTML = "Move Troops";
        moveTroopsButton.setAttribute("class", "btn btn-danger");
        build.appendChild(moveTroopsButton);
        moveTroopsButton.addEventListener('click', moveTroopsFrom);
    }

}

let moveTroopsFrom = function(){
    console.log("moving");
    action = true;
    selectedHex = [curHex[0], curHex[1]]; // for some reason, selectedHex = curHex just makes a refernece to curHex and when cur changes so does selected
    // in canvas hexClick, waits for player to click adajaceent in whereMoveTroops

    whereMoveTroops(); // to get auto troop highlight

    deleteOptions();
}


// used in capital + fort in options
let spawnTroops = function(){
    let build = document.getElementById("buildOptions");

    let buyTroopsButton = document.createElement("button");
    buyTroopsButton.innerHTML = "Buy Troops";
    buyTroopsButton.setAttribute("class", "btn btn-primary");
    build.appendChild(buyTroopsButton);
    buyTroopsButton.addEventListener('click', buyTroops);
}

let buyTroops = function(){
    let num = 1;
    // one troop costs 7 gold
    let cost = 7 * num;
    if(map.grid[curHex[0]][curHex[1]].troop != null) {
        alert("troop already on tile!");
        return;
    }
    if (players[turnCounter].gold < cost){
        alert("costs " + cost + " gold");
        return;
    }
    players[turnCounter].gold -= cost;
    //map.grid[curHex[0]][curHex[1]].addTroops(num);


    // foot soldier
    let soldier = new Battalion(10,5,2,1,players[turnCounter].color,"#926F34",false,curHex[0],curHex[1]);
    map.grid[curHex[0]][curHex[1]].troop = soldier;
    map.grid[curHex[0]][curHex[1]].troop.move(map.grid[curHex[0]][curHex[1]].troop.x,map.grid[curHex[0]][curHex[1]].troop.y,true);
    players[turnCounter].troop.push(soldier);

    updateValues();
    deleteOptions();
    showOptions();
}

let deleteOptions = function(){
    let build = document.getElementById("buildOptions");
    // console.log(children);
    while (build.hasChildNodes()){
        build.removeChild(build.firstChild);
    }
}

// can be changed to diff canvas
var c = document.getElementById('troopCanv');
var ctx1 = c.getContext("2d");

// Loads in the different images
// let img0 = document.createElement("img");
// img0.src = '../static/assets/castle_blue.png';
//
// let img1 = document.createElement("img");
// img1.src = '../static/assets/castle_green.png';
//
// let img2 = document.createElement("img");
// img2.src = '../static/assets/castle_yellow.png';
//
// let img3 = document.createElement("img");
// img3.src = '../static/assets/castle_red.png';
//
// function drawFort(color, x, y){
//   if (color === "Blue"){
//     ctx1.drawImage(img0, x, y, 90, 90);
//   }
//   else if (color === "Green"){
//     ctx1.drawImage(img1, x, y, 90, 90);
//   }
//   else if (color === "Yellow"){
//     ctx1.drawImage(img2, x, y, 90, 90);
//   }
//   else if (color === "Red"){
//     ctx3.drawImage(img2, x, y, 90, 90);
//   }
// };

let buyFort = function(){
    // fort costs 5
    let cost = 5;
    if (players[turnCounter].gold < cost){
        alert("fort costs 5 gold");
        return;
    }
    players[turnCounter].gold -= cost;
    map.grid[curHex[0]][curHex[1]].building = "Fort";
    players[turnCounter].forts.push(map.grid[curHex[0]][curHex[1]]);
	let castle = new Image(57,57);
	if (turnCounter == 0) {
		// red fort
		castle.src = "./static/assets/castle_red.jpg"
	} else if (turnCounter == 1) {
		// yellow fort
		castle.src = "./static/assets/castle_yellow.png"
	} else if (turnCounter == 2) {
		// blue fort
		castle.src = "./static/assets/castle_blue.png"
	} else if (turnCounter == 3) {
		// green fort
		castle.src = "./static/assets/castle_green.png"
	}
	//ctxTC.drawImage(castle,map.grid[curHex[0]][curHex[1]].centerX,map.grid[curHex[0]][curHex[1]].centerY);
	castle.onload = drawImgOnload;
	console.log("FORT BUILT");
    // IDK if we really need fort in player but oh well its here
    //console.log(players[turnCounter]);

    updateValues();
    deleteOptions();
    showOptions();

    // idk how you find the middle of the hexagon
    // x = 0;
    // y = 0;
    // drawFort(players[turnCounter].name, x, y);
}

function drawImgOnload() {
	ctxB.drawImage(this,map.grid[curHex[0]][curHex[1]].centerX-26,map.grid[curHex[0]][curHex[1]].centerY-33,this.width,this.height);
}

let deleteFort = function(){
    map.grid[curHex[0]][curHex[1]].building = "";
    // rid of fort in player
    players[turnCounter].forts = players[turnCounter].forts.filter(fort => fort != map.grid[curHex[0]][curHex[1]]);
	let clearX = map.grid[curHex[0]][curHex[1]].centerX;
	let clearY = map.grid[curHex[0]][curHex[1]].centerY;
	ctxB.clearRect(clearX-34,clearY-34,68,65);
    //console.log(players[turnCounter]);

    updateValues();
    deleteOptions();
    showOptions();
}
