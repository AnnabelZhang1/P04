// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

function drawTroop(xInd,yInd,tCol,oCol,curhexx,curhexy,hp) {
    ctxTC.strokeStyle = "black";
    ctxTC.fillStyle = tCol + "";
    ctxTC.beginPath();
    // outer hexagon, denoting troop color
    for (let i = 0; i < 6; i++) {
        ctxTC.lineTo(xInd + 30 * Math.cos(a * i), yInd + 30 * Math.sin(a * i));
    }
    ctxTC.closePath();
    ctxTC.stroke();
    ctxTC.fill();
    ctxTC.strokeStyle = "black";
    ctxTC.fillStyle = oCol + "";
    ctxTC.beginPath();
    //inner hexagon denoting empire color
    for (let i = 0; i < 6; i++) {
        ctxTC.lineTo(xInd + 10 * Math.cos(a * i), yInd + 10 * Math.sin(a * i));
    }
    ctxTC.closePath();
    ctxTC.stroke();
    ctxTC.fill();
    ctxTC.fillStyle = "orange";
    ctxTC.textAlign = "center";
    ctxTC.font="12px Arial";

    ctxTC.fillText(hp,map.grid[curhexx][curhexy].centerX,map.grid[curhexx][curhexy].centerY + 5);
    console.log("hp text done: " + hp);
  }

// socket interactions
var socket;
$(document).ready(function() {
    // // The http vs. https is important. Use http for localhost!
    socket = io.connect('http://' + document.domain + ':' + location.port);
    console.log("socket is ready");

    // receives connecting msg
    socket.on('conjs', function(data) {
        const event = data
        console.log("connection received")
        console.log("Current clients: " + event.data)
    });

    // receives disconnecting msg
    socket.on('disconjs', function(data) {
        const event = data
        console.log(event.msg)
    });

    // sets id of connecting players in order of connection
    socket.on('setid', function(data) {
        const event = data
        red.requestid = event.data[0]
        // console.log(red.requestid)
        yellow.requestid = event.data[1]
        blue.requestid = event.data[2]
        green.requestid = event.data[3]
    });

    socket.on('draw_to_all', function(data){
        const event = data
        console.log(data)
        // referenced in line 191 of canvas.js
        if (event.action === "select_hex_notroop"){
          ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
          drawHexNoFill(map.grid[event.curHexX][event.curHexY].centerX,map.grid[event.curHexX][event.curHexY].centerY, "black");
        }
        // referenced in line 185 of canvas.js
        else if (event.action === "select_hex_troop"){
          // ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
          drawHexNoFill(map.grid[event.curHexX][event.curHexY].centerX,map.grid[event.curHexX][event.curHexY].centerY, "black");
        }
        // referenced in line 145 of troop.js
        else if (event.action === "move_troops"){
          // console.log("moving troops")
          troopHighlight(map.grid[event.adjax][event.adjy].centerX,map.grid[event.adjax][event.adjy].centerY);
        }
        // referenced in line 220 of troop.js
        else if (event.action === "clear_all"){
          ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
        }
        // referenced in lines 241 and 249 of troop.js
        else if (event.action === "conquer_tile"){
          console.log("drawing tileeee")
          drawHexagon((event.tile).centerX - 2.5, (event.tile).centerY, event.tile);
        }
        // referenced in line 82 and 108 of troop.js
        else if (event.action === "draw_troop"){
          console.log("trooppp being drawn")
          // (event.def).troop.drawTroop(def.centerX,def.centerY,def.troop.troopCol,def.troop.ownerCol);
          drawTroop(event.x,event.y,event.tc,event.oc,event.hexx,event.hexy,event.hp);
        }
        // referenced in line 88 and 100 of troop.js
        else if(event.action === "clear_hex"){
          ctxTC.clearRect(event.x, event.y, 65, 60);
        }
    });

    // referenced in line 91 of turn.js
    socket.on('update_html', function(data){
      const event = data
      console.log("updating html:" + data)
      turnPlayer.innerHTML = event.playername + "'s Turn";
    });

    socket.on('deny_options', function(data){
      deleteOptions();
    });

});
