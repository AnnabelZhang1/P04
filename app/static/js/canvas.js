// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// The canvas bounding box wasn't showing on my computer for some reason, so I just drew it in manually.
// DELETE LATER
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.stroke();

const a = 2 * Math.PI / 6; //angle. The 6 makes it a hexagon!
const r = 50; //radius (change as needed)

function drawGrid(length, height) {
  // For some reason, when the length is divisable by two, the y value becomes half of what it should be.
  // Thus, the if-else function.
  if (length % 2 == 0) {
    for (let y = r, i = 0; i < height; y += 2 * r * Math.sin(a), i++) {
      //columns
      for (let x = r, p = 0, m = 0; m < length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), m++) {
        //rows
        drawHexagon(x, y);
      }
    }
  }
  else { //same as before, but y += r * Math.sin(a) instead of y += 2 * r * Math.sin(a).
    for (let y = r, i = 0; i < height; y += r * Math.sin(a), i++) {
      for (let x = r, p = 0, m = 0; m < length; x += r * (1 + Math.cos(a)), y += ((-1) ** p++) * r * Math.sin(a), m++) {
        drawHexagon(x, y);
      }
    }
  }
}

function drawHexagon(x, y) {  //draws hexagons
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }
  ctx.closePath();
  ctx.stroke();
}
