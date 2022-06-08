//retrieve node in DOM via ID
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasHL = document.getElementById('interactions');
const ctxHL = canvasHL.getContext('2d');
const canvasTC = document.getElementById('troopCanv');
const ctxTC = canvasTC.getContext('2d');
let curHex = [-1,-1];

var socket;
$(document).ready(function() {
    // // The http vs. https is important. Use http for localhost!
    socket = io.connect('http://' + document.domain + ':' + location.port);

    console.log("socket is ready");

    socket.on('status', function(data) {
      console.log("status received")
      console.log(data);
    }


  });

}
