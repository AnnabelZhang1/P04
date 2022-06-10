// The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
// SoftDev
// P04: Forged By Land
// 2022-05-28

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
        if (event.action === "select_hex"){
          ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);
          drawHexNoFill(map.grid[event.curHexX][event.curHexY].centerX,map.grid[event.curHexX][event.curHexY].centerY, "black");
        }
        else if (event.action === "move_troops"){
          console.log("moving troops")
          troopHighlight(map.grid[event.adjax][event.adjy].centerX,map.grid[event.adjax][event.adjy].centerY);
        }
    });

    // socket.on('draw_to_self', function(data){
    //     // referenced in line 137 of troop.js
    //     if (event.action === "move_troops"){
    //       console.log("moving troops")
    //       troopHighlight(map.grid[event.adjax][event.adjy].centerX,map.grid[event.adjax][event.adjy].centerY);
    //     }
    // });

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
