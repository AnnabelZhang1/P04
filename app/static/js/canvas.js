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
       color = z.grid[i][j].color;
        drawHexagon(x, y, color);
      }
    }
  }
  else { //same as before, but y += r * Math.sin(a) instead of y += 2 * r * Math.sin(a).
    for (let y = r, i = 0; i < z.height; y += r * Math.sin(a), i++) {
      for (let x = r, p = 0, j = 0; j < z.length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), j++) {
        color = z.grid[i][j].color;
        drawHexagon(x, y, color);
      }
    }
  }
}

function drawHexagon(x, y, color) {  //draws hexagons
    ctx.fillStyle = color + "";
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}


// initiates canvas in brwoser
let map = new Grid(10, 3);
drawGrid(map);

function hexCheck(event) {
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
  if(!hexClicked) {curHex[0] = -1; curHex[1] = -1;}
  console.log(curHex);
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
