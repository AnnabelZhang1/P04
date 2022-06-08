class Battalion {
  // no treason
  // no resurrection
  // no crippling moving speed
  constructor(health, attack, cost, mvSpd, ownCol, trpCol, inBuild, x, y) {
    this.hp = health;
    this.atk = attack;

    // this value will be reduced from the emperor(player character)'s gold funds.
    this.cost = cost;
    this.moveSpeed = mvSpd;
    this.ownerCol = ownCol;
    this.troopCol = trpCol;
    this.inBuild = false;
    this.x = x;
    this.y = y;
    this.currMoves = 0;
  }

  takeDmg(dmg) {
    this.hp -= dmg;
  }

  heal(hp) {
    this.hp += hp;
  }

  dealDmg(troop)  {
    troop.takeDmg(this.atk);
  }

  payUp() {
    return this.cost;
  }

  shelterIn(y_o_n) {
    this.inBuild = y_o_n;
  }

  drawTroop(xInd,yInd,tCol,oCol) {
    ctxTC.strokeStyle = "black";
    ctxTC.fillStyle = tCol + "";
    ctxTC.beginPath();
    // outer hexagon, denoting troop color
    for (let i = 0; i < 6; i++) {
        ctxTC.lineTo(xInd + 30 * Math.cos(a * i), yInd + 30 * Math.sin(a * i));
    }
    ctxTC.closePath();
    ctxTC.stroke();
    ctxTC.fill();
    ctxTC.strokeStyle = "black";
    ctxTC.fillStyle = oCol + "";
    ctxTC.beginPath();
    //inner hexagon denoting empire color
    for (let i = 0; i < 6; i++) {
        ctxTC.lineTo(xInd + 10 * Math.cos(a * i), yInd + 10 * Math.sin(a * i));
    }
    ctxTC.closePath();
    ctxTC.stroke();
    ctxTC.fill();
    ctxTC.fillStyle = "orange";
    ctxTC.textAlign = "center";
    ctxTC.font="12px Arial";
    ctxTC.fillText(this.hp,map.grid[curHex[0]][curHex[1]].centerX,map.grid[curHex[0]][curHex[1]].centerY + 5);
    console.log("hp text done: " + this.hp);
  }

  move(xInd, yInd, isInit) {  //draws hexagons
    if(map.grid[curHex[0]][curHex[1]].troop != null && !isInit) {
      // troop of one empire tries to move onto a tile with a troop from the same empire
      if (map.grid[curHex[0]][curHex[1]].troop.ownerCol == this.ownerCol) {
        addNotif("illegal troop movement!");
     // combat phase
      } else {
        let atkHex = map.grid[selectedHex[0]][selectedHex[1]];
        let defHex = map.grid[curHex[0]][curHex[1]];
        let clearX = Math.round(defHex.centerX);
        let clearY = Math.round(defHex.centerY);
        ctxTC.clearRect(clearX-31,clearY-31,65,60);
        this.currMoves += 1;
        atkHex.troop.dealDmg(defHex.troop);
        defHex.troop.drawTroop(defHex.centerX,defHex.centerY,defHex.troop.troopCol,defHex.troop.ownerCol);
        if (defHex.troop.hp <= 0) {
          defHex.troop = null;
          ctxTC.clearRect(clearX-31,clearY-31,65,60);
          atkHex.troop.move(clearX,clearT,false);
        }
      }
    } else {
      this.x = xInd;
      this.y = yInd;
      xInd = map.grid[curHex[0]][curHex[1]].centerX;
      yInd = map.grid[curHex[0]][curHex[1]].centerY;
      if (!isInit) {
        let clearX = Math.round(map.grid[selectedHex[0]][selectedHex[1]].centerX);
        let clearY = Math.round(map.grid[selectedHex[0]][selectedHex[1]].centerY);
        ctxTC.clearRect(clearX-31,clearY-31,65,60);
        map.grid[selectedHex[0]][selectedHex[1]].troop = null;
        console.log("isnt init");
        this.currMoves += 1;
        console.log("currMoves " + this.currMoves);
      }
      map.grid[curHex[0]][curHex[1]].troop = new Battalion(this.hp,this.atk,this.cost,this.moveSpeed,players[turnCounter].color,"#926F34",false,curHex[0],curHex[1]);
      map.grid[curHex[0]][curHex[1]].troop.currMoves = this.currMoves;
      if (!this.inBuild) {
      this.drawTroop(xInd,yInd,this.troopCol,this.ownerCol);

      console.log("moved");
      conquerTile(this);
    }
  }
}

}


// movement of troops + combat stuff prolly

//let plannedActions = [[], [], [], []];
// red, yellow, blue, green

let action = false;
let selectedHex = "";

let whereMoveTroops = function(){
    console.log('action move')
    console.log(curHex);
    console.log(selectedHex);

    showTile();
    adajcents = getAdjacentTiles();
    console.log(adjacents);

    // highlights adjacent tiles
    for (let i = 0; i < adjacents.length; i++){
        troopHighlight(map.grid[adjacents[i][0]][adjacents[i][1]].centerX,map.grid[adjacents[i][0]][adjacents[i][1]].centerY);
    }


    // clicked original hex, allow cancel action
    if (curHex[0]===selectedHex[0] && curHex[1]===selectedHex[1]){
      console.log("samsies");

      let build = document.getElementById("buildOptions");
      let cancelMoveButton = document.createElement("button");
      cancelMoveButton.innerHTML = "Cancel Move Troop";
      cancelMoveButton.setAttribute("class", "btn btn-dark");
      build.appendChild(cancelMoveButton);
      cancelMoveButton.addEventListener('click', function(){
        action = false;
        deleteOptions();
        ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
      })
    }
    // selected adjacent tile, show move here option, else no show
    else if(isIn(adjacents, curHex)){
        console.log("adjacents");

        let build= document.getElementById("buildOptions");
        let moveButton = document.createElement("button");
        moveButton.innerHTML = "Move Troop Here";
        moveButton.setAttribute("class", "btn btn-danger");
        build.appendChild(moveButton);
        moveButton.addEventListener('click', moveTroopsHere);
    }
}

let getAdjacentTiles = function(){
    adjacents = [[selectedHex[0]-1, selectedHex[1]], [selectedHex[0]+1, selectedHex[1]], // up and down
                 [selectedHex[0], selectedHex[1]-1], [selectedHex[0], selectedHex[1]+1] // left and right
                ]
    // even column has top diagonals as adjacents
    if (selectedHex[1]%2 == 0){
        adjacents[4] = [selectedHex[0]-1, selectedHex[1]-1];
        adjacents[5] = [selectedHex[0]-1, selectedHex[1]+1];
    }
    // odds have bottom diagonals
    else {
        adjacents[4] = [selectedHex[0]+1, selectedHex[1]-1];
        adjacents[5] = [selectedHex[0]+1, selectedHex[1]+1];
    }

    // eliminate edge cases
    console.log(adjacents);
    adjacents = adjacents.filter(tile => tile[0]>= 0 && tile[0] <= 5 && tile[1]>=0 && tile[1]<=10);
    console.log(adjacents);

    return adjacents;
}

// includes() and indexOf() doesn't work D: prolly cuz 2d array
let isIn = function (adjacents, curHex){
    for (let i = 0; i< adjacents.length; i++){
        if (adjacents[i][0] == curHex[0] && adjacents[i][1] == curHex[1]){
            //console.log("true");
            return true;
        }
    }
    return false;
}

let moveTroopsHere = function(){
    //plannedActions[turnCounter].push(selectedHex + " -> " + curHex);
    // action will happen during action phase

    map.grid[selectedHex[0]][selectedHex[1]].troop.move(curHex[0],curHex[1],false);
    // console.log(map.grid[curHex[0]][curHex[1]].color)
    // if (map.grid[curHex[0]][curHex[1]].color == "white") {
    //     map.grid[curHex[0]][curHex[1]].modifyColor(map.grid[curHex[0]][curHex[1]].troop.ownerCol);
    // }
    // clear
    deleteOptions();
    ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);

    // planning movement done
    action = false;
}

let conquerTile = function(troop){
  // assumes no other troop is on tile
  if (map.grid[curHex[0]][curHex[1]].building == "Capital"){
    console.log('capital');
    console.log(capitals[turnCounter]);
    let col = ["#E30B5C", "#FDDA0D", "#4169E1", "#00A36C"];
    // players[col.findIndex(map.grid[curHex[0]][curHex[1]].color)].capital.health -= troop.attack;
  }
  else{
    // tile changes color accordingly
    map.grid[curHex[0]][curHex[1]].color = troop.ownerCol;
    drawHexagon(map.grid[curHex[0]][curHex[1]].centerX - 2.5, map.grid[curHex[0]][curHex[1]].centerY, map.grid[curHex[0]][curHex[1]]);
  }

}
