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
  constructor(name, color, gold, goldMine, requestid) {
    this.name = name;
    this.color = color;
    this.gold = gold;
    this.goldMine = goldMine;
    this.capital = ''; // refers to capital object, assigned in turn.js
    this.forts = []; //array of hexs w/ fort
    this.requestid = requestid;
    this.troop = []; // array of Battalion emperor has
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

    // capital goes down
    if (this.health <= 0){

      // tiles reset
      this.tile.building = "";
      for (let i = 0; i < map.grid.length; i++){
        for (let j = 0; j < map.grid[i].length; j++){
          if (map.grid[i][j].color == this.color){
            map.grid[i][j].color = "white";
          }
        }
      }
      drawGrid(map);

      // troops are gone
      for (let i = 0; i < players[colors.indexOf(this.color)].troop.length; i++){
        let currTroop = players[colors.indexOf(this.color)].troop[i];
        console.log(currTroop.ownerCol)
        map.grid[currTroop.x][currTroop.y].troop = null;

        // clear troop on map
        let clearX = Math.round(map.grid[currTroop.x][currTroop.y].centerX);
        let clearY = Math.round(map.grid[currTroop.x][currTroop.y].centerY);
        ctxTC.clearRect(clearX-31,clearY-31,65,60);
      }

      // player is eliminated in turn
      console.log(colors.indexOf(this.color))
      players[colors.indexOf(this.color)] = null;

      // one player remaining
      if (players.filter(player => player != null).length == 1){
        alert(players[turnCounter].name + " WON!");
        hexClick = function(){
          alert(players[turnCounter].name + " WON! GAME'S OVER");
        }
        nextTurnButton.removeEventListener('click', nextTurn);
      }

      return true;
    }
    return false;
  }
}