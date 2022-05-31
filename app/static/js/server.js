//retrieve element in DOM via ID
// var c = document.getElementById("slate");

// creates websocket
const websocket = new WebSocket("ws://localhost:6789/");

function initialize(websocket) {
  websocket.addEventListener("open", () => {
    // Send an "init" event for the first player.
    // requires only max 4
    const event = { type: "init" };
    websocket.send(JSON.stringify(event));
  });
}
// sending data to server
var send_mouse = function(e){
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;
  console.log("sent to server "+mouseX+","+mouseY);
  websocket.send(JSON.stringify({xcor":mouseX, "ycor":mouseY}))
}

// function playMove(board, player, column, row) {
//   // Check values of arguments.
//   if (player !== PLAYER1 && player !== PLAYER2) {
//     throw new Error(`player must be ${PLAYER1} or ${PLAYER2}.`);
//   }
//   const columnElement = board.querySelectorAll(".column")[column];
//   if (columnElement === undefined) {
//     throw new RangeError("column must be between 0 and 6.");
//   }
//   const cellElement = columnElement.querySelectorAll(".cell")[row];
//   if (cellElement === undefined) {
//     throw new RangeError("row must be between 0 and 5.");
//   }
//   // Place checker in cell.
//   if (!cellElement.classList.replace("empty", player)) {
//     throw new Error("cell must be empty.");
//   }
// }

//takes in JSON file
websocket.onmessage=({data})=>{
  // parse data from server
  const event = JSON.parse(data);

  console.log("recieved from server:");
  console.log(event);

  // determine what/where to draw
  if(event.mode=="rect"){
    drawRect(event.xcor,event.ycor);
  }else if (event.mode == "circle"){
    drawCircle(event.xcor, event.ycor);
  }else if (event.mode == "wipe"){
    wipeCanvas();
  }else if(event.type == "users"){
    console.log(event.count+" users are online");
  }
}
