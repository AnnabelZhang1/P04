class Battalion {
  // no treason
  // no resurrection
  // no crippling moving speed
  constructor(health, attack, cost, moveSpeed, ownerCol, troopCol) {
    this.hp = health;
    this.atk = attack;

    // this value will be reduced from the emperor(player character)'s gold funds.
    this.cost = cost;
    this.mvSpd = moveSpeed;
    this.ownCol = ownerCol;
    this.trpCol = troopCol;
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

  move(xInd, yInd, r, hex) {  //draws hexagons
      ctx.strokeStyle = "black";
      ctx.fillStyle = hex.color + "";
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
          ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      /*
      ctx.fillStyle = "orange";
      ctx.textAlign = "center";
      ctx.font = "25px Arial";
      */
      ctx.fillText(hex.troops + "", x, y + 10);
  }

}


// movement of troops + combat stuff prolly

let plannedActions = [[], [], [], []];
// red, yellow, blue, green

let action = false;
let selectedHex = "";

let planMoveTroops = function(){
    console.log("moving");
    action = true;
    selectedHex = [curHex[0], curHex[1]];
    // for some reason, selectedHex = curHex just makes a refernece to curHex and when cur changes so does selected
    // in canvas hexClick, waits for player to click adajcent tile and click planMoveHere
    //(Math.abs(curHex[0]-selectedHex[0]) <= 1 &&  Math.abs(curHex[1]-selectedHex[1]) <= 1)
    


    }
    deleteOptions();
}

let planMoveTroopsHere = function(){
    plannedActions[turnCounter].push(selectedHex + " -> " + curHex);
    // action will happen during action phase

    // clear
    deleteOptions();
    ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);

    // planning movement done
    action = false;
}
