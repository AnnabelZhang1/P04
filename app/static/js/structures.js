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
    constructor(x, y, color) {
        this.length = x;
        this.height = y;
        this.grid = [];
        // Two for loops nested within each other so I can push the length of the grid "x" times, then push that length grid "y" to make the height.
        for(let i = 0; i < this.height; i++){
          let add = [];
          for(let j = 0; j < this.length; j++) {
            add.push(0);
          }
          this.grid.push(add);
        }
        drawGrid(this.length, this.height, color);
    }
}
