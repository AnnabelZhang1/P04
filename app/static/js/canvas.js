// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// The canvas bounding box wasn't showing on my computer for some reason, so I just drew it in manually.
// DELETE LATER
ctx.beginPath();
// ctx.strokeStyle = "gray";
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.stroke();

// background of canvas behind hexagons
// ctx.fillStyle = "#F0F8FF"; 
ctx.fillStyle = "#c4d9ec";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const a = 2 * Math.PI / 6; //angle. The 6 makes it a hexagon!
const r = 50; //radius (change as needed)

function drawGrid(z) { //z is grid object
  // For some reason, when the length is divisable by two, the y value becomes half of what it should be.
  // Thus, the if-else function.
  var color = "#d066a4";
  if (z.length % 2 == 0) {
    for (let y = r, i = 0; i < z.height; y += 2 * r * Math.sin(a), i++) {
      //columns
      for (let x = r, p = 0, m = 0; m < z.length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), m++) {
        //rows
        /*
        if(z.grid[i][m].color == 0) {
          color = "white";
        }
        else if (z.grid[i][m].color == 1) {
          color = "red";
        }
        else if (z.grid[i][m].color == 2) {
          color = "yellow";
        }
        else if (z.grid[i][m].color == 3) {
          color = "blue";
        }
        else if (z.grid[i][m].color == 4) {
          color = "green";
        }
        */
       color = z.grid[i][m].color;
        drawHexagon(x, y, color);
      }
    }
  }
  else { //same as before, but y += r * Math.sin(a) instead of y += 2 * r * Math.sin(a).
    for (let y = r, i = 0; i < z.height; y += r * Math.sin(a), i++) {
      for (let x = r, p = 0, m = 0; m < z.length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), m++) {
        console.log("length: " + z.length);
        console.log("coordinates: " + i + ", " + m + ". Results: " + z.grid[i][m]);
        /*
        if(z.grid[i][m].color == 0) {
          color = "white";
        }
        else if (z.grid[i][m].color == 1) {
          color = "red";
        }
        else if (z.grid[i][m].color == 2) {
          color = "yellow";
        }
        else if (z.grid[i][m].color == 3) {
          color = "blue";
        }
        else if (z.grid[i][m].color == 4) {
          color = "green";
        }
        */
        color = z.grid[i][m].color;
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

// testing troops
let tester = map.grid[0][0]
console.log("troops:" + tester.troops);
tester.modifyTroops(3);
console.log("new troops:" + tester.troops);
tester.troops = 4;
console.log("troops:" + tester.troops);


