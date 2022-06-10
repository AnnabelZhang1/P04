// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasHL = document.getElementById('interactions');
const ctxHL = canvasHL.getContext('2d');
const canvasTC = document.getElementById('troopCanv');
const ctxTC = canvasTC.getContext('2d');
let curHex = [-1,-1];

// background of canvas behind hexagons
// ctx.fillStyle = "#F0F8FF";
ctx.fillStyle = "#c4d9ec";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const a = Math.PI / 3; //angle. The 6 makes it a hexagon!
const r = 50; //radius (change as needed)

function drawGrid(z) { //z is grid object
  // For some reason, when the length is divisable by two, the y value becomes half of what it should be.
  // Thus, the if-else function.
  var color = "#d066a4";
  if (z.length % 2 == 0) {
    for (let y = r, i = 0; i < z.height; y += 2 * r * Math.sin(a), i++) {
      //columns
      for (let x = r, p = 0, j = 0; j < z.length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), j++) {
        //rows
        drawHexagon(x, y, z.grid[i][j]);
      }
    }
  }
  else { //same as before, but y += r * Math.sin(a) instead of y += 2 * r * Math.sin(a).
    for (let y = r, i = 0; i < z.height; y += r * Math.sin(a), i++) {
      for (let x = r, p = 0, j = 0; j < z.length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), j++) {
        drawHexagon(x, y, z.grid[i][j]);
      }
    }
  }
}

function drawHexagon(x, y, hex) {  //draws hexagons
    ctx.strokeStyle = "black";
    ctx.fillStyle = hex.color + "";
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i) + 2.5, y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}


function drawHexNoFill(x,y,color) {
  ctxHL.lineWidth = 5;
  ctxHL.strokeStyle = color;
  ctxHL.beginPath();
  for (let i = 0; i < 6; i++) {
    ctxHL.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }
  ctxHL.closePath();
  ctxHL.stroke();
}

function clearHexagon(x, y, hex) {  //draws hexagons
    ctx.strokeStyle = "#c4d9ec"
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i) + 2.5, y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();

}


// initiates canvas in brwoser
let map = new Grid(11, 6);

let capitals = [];
let colors = ["#E30B5C", "#FDDA0D", "#4169E1", "#00A36C"];
// topright red
//capitals[0] = new Capital(colors[0], map.grid[Math.round(Math.random()*1)][8+Math.round(Math.random()*2)]);
capitals[0] = new Capital(colors[0], map.grid[3][9]);
// top left yellow
// capitals[1] = new Capital(colors[1], map.grid[Math.round(Math.random()*1)][Math.round(Math.random()*2)]);
capitals[1] = new Capital(colors[1], map.grid[3][10]);
capitals[3] = new Capital(colors[3], map.grid[2][9]);


// bottom right blue
capitals[2] = new Capital(colors[2], map.grid[4+Math.round(Math.random()*1)][8+Math.round(Math.random()*2)]);
// bottom left green
//capitals[3] = new Capital(colors[3], map.grid[4+Math.round(Math.random()*1)][Math.round(Math.random()*2)]);
for (let i = 0; i < 4; i++){
  capitals[i].tile.color = colors[i];
  capitals[i].tile.building = "Capital";
}
/* OTHER VERSION- capitals allowed anywhere
// initates capital coordinates
let capitalRows = [0, 0, 0, 0];
let capitalCols = [0, 0, 0, 0];
for (let i = 0; i < 4; i++){
  let row = Math.floor(Math.random()*6);
  let col = Math.floor(Math.random()*11);
  //console.log(row);
  while (capitalRows.includes(row)){
    row = Math.floor(Math.random()*6);
    //console.log("repeat: " + row);
  }
  while (capitalCols.includes(col)){
    col = Math.floor(Math.random()*11);
  }
  capitalRows[i]= row;
  capitalCols[i] = col;
}
// red
console.log(map.grid)
map.grid[capitalRows[0]][capitalCols[0]].color = "#E30B5C";
map.grid[capitalRows[0]][capitalCols[0]].building = "Capital";
// players[0].capital = map.grid[capitalRows[0]][capitalCols[0]];
// yellow
map.grid[capitalRows[1]][capitalCols[1]].color = "#FDDA0D";
map.grid[capitalRows[1]][capitalCols[1]].building = "Capital";
// players[1].capital = map.grid[capitalRows[1]][capitalCols[1]];
// blue
map.grid[capitalRows[2]][capitalCols[2]].color = "#4169E1";
map.grid[capitalRows[2]][capitalCols[2]].building = "Capital";
//players[2].capital = map.grid[capitalRows[2]][capitalCols[2]];
// green
map.grid[capitalRows[3]][capitalCols[3]].color = "#00A36C";
map.grid[capitalRows[3]][capitalCols[3]].building = "Capital";
//players[3].capital = map.grid[capitalRows[3]][capitalCols[3]];
*/

map.grid[2][2].color = colors[1]; // yellow testing
map.grid[4][4].color = colors[1]; // yellow testing
map.grid[3][3].color = colors[2]; // blue testing
map.grid[3][4].color = colors[3]; // green testing
map.grid[3][5].color = "#E30B5C"; // for testing buildings
map.grid[3][6].color = "#E30B5C"; // for testing buildings

drawGrid(map);


/* calls isClicked (defined in structures.js) on every hexagon
in the grid. modifies the elements of the curHex array.
 */
function hexClick(event) {
  mX = event.offsetX;
  mY = event.offsetY;
  console.log(mX);
  console.log(mY);
  let hexClicked = false;
  for (let i = 0; i < map.height; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map.grid[i][j].isClicked(mX,mY)) {
        curHex[0] = i;
        curHex[1] = j;
        hexClicked = true;
      }
    }
  }
  ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
  deleteOptions();

  // before drawHexNoFill so hex highlight is on top of troop highlight

  // moving troop
  if (action){
    whereMoveTroops(); // in troop.js
  }
  // not moving troops
  else{
    // show correct building + planning options of hex
    showOptions(curHex);
  }


  if(!hexClicked) {
    curHex[0] = -1; curHex[1] = -1;
    console.log(curHex);
  }
  else {
    console.log(curHex);
    console.log("troop is here? " + map.grid[curHex[0]][curHex[1]].troop);

    currentPlayer = players[turnCounter];
    currentPlayerColor = players[turnCounter].name;
    currentPlayerID = players[turnCounter].requestid;
    if (currentPlayerColor === players[findCurrentPlayer(currentPlayerID)].name) {
      socket.emit('send_mouse_all', {'action':'select_hex', 'curHexX': curHex[0], 'curHexY' : curHex[1]})
      // socket.emit('deny_options_everyone_else')
    // drawHexNoFill(map.grid[curHex[0]][curHex[1]].centerX,map.grid[curHex[0]][curHex[1]].centerY, "black");
  }}

}


let troopHighlight = function(x, y){
  ctxHL.lineWidth = 1;
  ctxHL.strokeStyle = 'rgba(100, 100, 100, 0.75)';
  ctxHL.fillStyle = 'rgba(200, 200, 200, 0.5)';
  ctxHL.beginPath();
  for (let i = 0; i < 6; i++) {
      ctxHL.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }
  ctxHL.closePath();
  ctxHL.stroke();
  ctxHL.fill();
}
