// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-24

class Grid {
    constructor(x, y) {
        this.length = x;
        this.height = y;
        this.grid = [];
        // Two for loops nested within each other so I can push the length of the grid "x" times, then push that length grid "y" to make the height.
        for(let i = 0; i < this.height; i++){
          let add = [];
          for(let j = 0; j < this.length; j++) {
            add.push(new Hexagon(i, j));
          }
          this.grid.push(add);
        }
    }
}

class Hexagon {
  constructor(x, y){
    /*
    having color as a string/hexcode is better than as a number b/c we have to convert from int eventually
    starting col as int to randomize colors so all colors seen on canvas
    each hexagon should start off white normally tho
    */
    //let col = Math.floor(Math.random() * 5);
                // white, red, yellow, blue, green
    let cols = ["white", "#E30B5C", "#FDDA0D", "#4169E1", "#00A36C"];
    this.color = "white";
    // what building is on tile (only 1 can be on building at once); buildings for now strings
    this.building = "";
    // Checks the type of troop on the tile
    this.troop = null;
    this.x = x;
    this.y = y;
    this.centerX = (y * 75 + 50) + 2.5;
    this.centerY = (x * 50 * Math.sqrt(3) + 50);
    if (y % 2 == 1) {this.centerY += 25*Math.sqrt(3);}
  }
  // modifying functins technically not needed
  modifyBuildings(newBuildings){
    this.buildings = newBuildings;
  }
  // modifyTroops(newNum){
  //   this.troops = newNum;
  //   clearHexagon(this.centerX - 2.5, this.centerY, this);
  //   drawHexagon(this.centerX - 2.5, this.centerY, this);
  // }
  // addTroops(num){
  //   let prev = this.troops;
  //   this.modifyTroops(prev + num);
  // }

  // x and y are event.offsetX and event.offsetY respectively
  isClicked(x,y) {
    if (50 >= (Math.sqrt(Math.pow(this.centerX-x,2) + Math.pow(this.centerY-y,2) ))) {
      return true;
    }
    return false;
  }
  modifyColor(newColor) {
    this.color = newColor;
    clearHexagon(this.centerX - 2.5, this.centerY, this);
    drawHexagon(this.centerX - 2.5, this.centerY, this);
  }

}

class Emperor {
  constructor(name, color, gold, troops, goldMine, requestid) {
    this.name = name;
    this.color = color;
    this.gold = gold;
    this.troops = troops;
    this.goldMine = goldMine;
    this.capital = ''; // refers to hexagon tile; done after declaring players
    this.forts = []; //array of hexs w/ fort
    this.requestid = requestid;
  }
}

class Capital {
  constructor(color, tile){
    this.color = color;
    this.health = 50;
    this.tile = tile;
  }
  takeDamage(damage){
    this.health -= damage;
    // console.log(this.color, this.health);
  }
}