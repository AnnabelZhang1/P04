// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-24

class Fort {
  constructor() {
    this.troopCap = 4;
    this.troopNum = 0;
    this.owner = "";
  }

  constructor(troopCap, color) {
    this.troopCap = troopCap;
    this.troopNum = 0;
    this.owner = color;
  }
}

class Grid {
    constructor() {
        this.length = 6;
        this.height = 6;
        this.grid = [];
        // Two for loops nested within each other so I can push the length of the grid "6" times, then push that length grid "6" more times.
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.length; j++) {
                let add = [];
                add.push(0);
            }
            grid.push(add);
        }
    }

    constructor(length, height) {
        this.length = length;
        this.height = height;
        this.grid = [];
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.length; j++) {
                let add = [];
                add.push(0);
            }
            grid.push(add);
        }
    }
}
