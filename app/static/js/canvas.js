// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
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
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "orange";
    ctx.textAlign = "center";
    ctx.font = "25px Arial";
    ctx.fillText(hex.troops + "", x, y + 10);
}


function drawHexNoFill(x,y,radius) {
  ctx.lineWidth = 5;
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(x + radius * Math.cos(a * i), y + radius * Math.sin(a * i));
  }
  ctx.closePath();
  ctx.stroke();
}

function clearHexagon(x, y, hex) {  //draws hexagons
    ctx.strokeStyle = "#c4d9ec"
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();

}


// initiates canvas in brwoser
let map = new Grid(11, 6);
// topright red
map.grid[int(Math.random()*5)][int(Math.random()*3)].color = "#E30B5C";
// top left
map.grid[int(Math.random()*5)+5][int(Math.random()*3)].color = "#FDDA0D";
map.grid[int(Math.random()*5)][int(Math.random()*3)+3].color = "#4169E1";
map.grid[int(Math.random()*5)+5][int(Math.random()*3)+3].color = "#00A36C";
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
    drawHexNoFill(map.grid[curHex[0]][curHex[1]].centerX,map.grid[curHex[0]][curHex[1]].centerY,50);
  }

  // if building options are shown, they will be deleted 
  deleteOptions();
  showOptions(curHex); 

}

// testing troops
let tester = map.grid[0][0]
console.log("troops:" + tester.troops);
tester.modifyTroops(3);
console.log("new troops:" + tester.troops);
tester.troops = 4;
console.log("troops:" + tester.troops);

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

