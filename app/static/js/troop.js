class Battalion {
  // no treason
  // no resurrection
  // no crippling moving speed
  constructor(health, attack, cost, moveSpeed, ownerCol, troopCol, inBuild) {
    this.hp = health;
    this.atk = attack;

    // this value will be reduced from the emperor(player character)'s gold funds.
    this.cost = cost;
    this.mvSpd = moveSpeed;
    this.ownCol = ownerCol;
    this.trpCol = troopCol;
    this.inBuild = false;
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

  move(xInd, yInd) {  //draws hexagons
    if (!inBuild) {
      ctx.strokeStyle = "black";
      ctx.fillStyle = this.ownerCol + "";
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
          ctx.lineTo(x + 30 * Math.cos(a * i), y + 30 * Math.sin(a * i));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.strokeStyle = "black";
      ctx.fillStyle = this.troopCol + "";
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
          ctx.lineTo(x + 10 * Math.cos(a * i), y + 10 * Math.sin(a * i));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
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
    for (let i = 0; i < 6; i++){
        troopHighlight(map.grid[adjacents[i][0]][adjacents[i][1]].centerX,map.grid[adjacents[i][0]][adjacents[i][1]].centerY);
    }


    // clicked original hex, allow cancel action
    if (curHex[0]===selectedHex[0] && curHex[1]===selectedHex[1]){
      console.log("samsies");

      let build = document.getElementById("buildOptions");
      let cancelMoveButton = document.createElement("button");
      cancelMoveButton.innerHTML = "Cancel Move Troops";
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
        moveButton.innerHTML = "Move Troops Here";
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
    // console.log(adjacents);
    return adjacents;
}

// includes() and indexOf() doesn't work D: prolly cuz 2d array
let isIn = function (adjacents, curHex){
    for (let i = 0; i<5; i++){
        if (adjacents[i][0] == curHex[0] && adjacents[i][1] == curHex[1]){
            //console.log("true");
            return true;
        }
    }
    return false;
}

let moveTroopsFrom = function(){
    console.log("moving");
    action = true;
    selectedHex = [curHex[0], curHex[1]]; // for some reason, selectedHex = curHex just makes a refernece to curHex and when cur changes so does selected
    // in canvas hexClick, waits for player to click adajaceent in whereMoveTroops
    //(Math.abs(curHex[0]-selectedHex[0]) <= 1 &&  Math.abs(curHex[1]-selectedHex[1]) <= 1)
    
    deleteOptions();
}

let moveTroopsHere = function(){
    plannedActions[turnCounter].push(selectedHex + " -> " + curHex);
    // action will happen during action phase

    // clear
    deleteOptions();
    ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);

    // planning movement done
    action = false;
}
