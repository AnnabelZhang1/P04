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

  move(xInd, yInd, hex) {  //draws hexagons
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
