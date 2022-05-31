// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-24

class Fort {
  constructor(troopCap, color) {
    this.troopCap = troopCap;
    this.troopNum = 0;
    this.owner = color;
  }
}

class Grid {
    constructor(x, y) {
        this.length = x;
        this.height = y;
        this.grid = [];
        // Two for loops nested within each other so I can push the length of the grid "x" times, then push that length grid "y" to make the height.
        for(let i = 0; i < this.height; i++){
          let add = [];
          for(let j = 0; j < this.length; j++) {
            add.push(new Hexagon());
          }
          this.grid.push(add);
        }
        
    }
}

class Hexagon {
  constructor(){
    /*
    having color as a string/hexcode is better than as a number b/c we have to convert from int eventually 
    starting col as int to randomize colors so all colors seen on canvas
    each hexagon should start off white normally tho
    */
    let col = Math.floor(Math.random() * 5);
                // white, red, yellow, blue, green
    let cols = ["white", "#E30B5C", "#FDDA0D", "#4169E1", "#00A36C"];
    this.color = cols[col];
    // holds what buildings are on the tile
    this.buildings = "";
    // holds how many troops are on tile
    this.troops = 0;
  }
  // modifying functins technically not needed
  modifyBuildings(newBuildings){
    this.buildings = newBuildings;
  }
  modifyTroops(newNum){
    this.troops = newNum;
  }
}
