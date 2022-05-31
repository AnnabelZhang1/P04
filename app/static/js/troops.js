class Troop {
  constructor(health, attack, cost) {
    this.hp = health;
    this.atk = attack;

    // this value will be reduced from the emperor(player character)'s gold funds.
    this.cost = cost;
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

}
