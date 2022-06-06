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
