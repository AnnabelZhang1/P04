// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasHL = document.getElementById('interactions');
const ctxHL = canvasHL.getContext('2d');
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
    if (hex.troops != 0) {
        ctx.fillStyle = "orange";
        ctx.textAlign = "center";
        ctx.font = "25px Arial";
        ctx.fillText(hex.troops + "", x + 2.5, y + 10);
    }
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
capitals[0] = map.grid[Math.round(Math.random()*1)][8+Math.round(Math.random()*2)];
// top left yellow
capitals[1] = map.grid[Math.round(Math.random()*1)][Math.round(Math.random()*2)];
// bottom right blue
capitals[2] = map.grid[4+Math.round(Math.random()*1)][8+Math.round(Math.random()*2)];
// bottom left green
capitals[3] = map.grid[4+Math.round(Math.random()*1)][Math.round(Math.random()*2)];
for (let i = 0; i < 4; i++){
  capitals[i].color = colors[i];
  capitals[i].building = "Capital";
  capitals[i].troops = 2;
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
map.grid[capitalRows[0]][capitalCols[0]].troops = 2;
// players[0].capital = map.grid[capitalRows[0]][capitalCols[0]];
// yellow
map.grid[capitalRows[1]][capitalCols[1]].color = "#FDDA0D";
map.grid[capitalRows[1]][capitalCols[1]].building = "Capital";
map.grid[capitalRows[1]][capitalCols[1]].troops = 2;
// players[1].capital = map.grid[capitalRows[1]][capitalCols[1]];
// blue
map.grid[capitalRows[2]][capitalCols[2]].color = "#4169E1";
map.grid[capitalRows[2]][capitalCols[2]].building = "Capital";
map.grid[capitalRows[2]][capitalCols[2]].troops = 2;
//players[2].capital = map.grid[capitalRows[2]][capitalCols[2]];
// green
map.grid[capitalRows[3]][capitalCols[3]].color = "#00A36C";
map.grid[capitalRows[3]][capitalCols[3]].building = "Capital";
map.grid[capitalRows[3]][capitalCols[3]].troops = 2;
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
  if(!hexClicked) {
    curHex[0] = -1; curHex[1] = -1;
    console.log(curHex);
  }
  else {
    console.log(curHex);
    ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
    drawHexNoFill(map.grid[curHex[0]][curHex[1]].centerX,map.grid[curHex[0]][curHex[1]].centerY, "black");
  }

  // **MAKE BETTER LATER- REFACTOR THIS CODE
  // moving troop
  if (action){
    console.log('action move')
    console.log(curHex);
    console.log(selectedHex);
    // clicked original hex, allow cancel action
    if (curHex[0]===selectedHex[0] && curHex[1]===selectedHex[1]){
      console.log("samsies");
      deleteOptions();

      let build = document.getElementById("buildOptions");
      let cancelMoveButton = document.createElement("button");
      cancelMoveButton.innerHTML = "Cancel Move Troops";
      cancelMoveButton.setAttribute("class", "btn btn-dark");
      build.appendChild(cancelMoveButton);
      cancelMoveButton.addEventListener('click', function(){
        action = false;
        deleteOptions();
        ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
      })
    }
    // hex is within 1 of the original hex
    else if (Math.abs(curHex[0]-selectedHex[0]) <= 1 &&  Math.abs(curHex[1]-selectedHex[1]) <= 1){
      // allow to move troop to curHex
      deleteOptions();
      console.log("adajencet");

      let build= document.getElementById("buildOptions");
      let moveButton = document.createElement("button");
      moveButton.innerHTML = "Move Troops Here";
      moveButton.setAttribute("class", "btn btn-danger");
      build.appendChild(moveButton);
      moveButton.addEventListener('click', planMoveTroopsHere); // fxn in troop.js
      //showOptions(curHex);
    }
    // not adjacent, prevent showing
    else{
      deleteOptions();
    }
  }
  // not moving troops
  else{
    // show correct building + planning options of hex
    deleteOptions();
    showOptions(curHex);
  }

}

// window.addEventListener("DOMContentLoaded", () => {
//   // Initialize the UI.
//   const board = document.getElementById('canvas');
//   createBoard(board);
//   // Open the WebSocket connection and register event handlers.
//   const websocket = new WebSocket("ws://localhost:6789/");
//   initGame(websocket);
//   receiveMoves(board, websocket);
//   sendMoves(board, websocket);
// });
