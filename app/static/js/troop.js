// movement of troops + combat stuff prolly

let plannedActions = [[], [], [], []];
// red, yellow, blue, green

let action = false;
let selectedHex = "";

let planMoveTroops = function(){
    console.log("moving");
    action = true;
    selectedHex = [curHex[0], curHex[1]];
    // for some reason, selectedHex = curHex just makes a refernece to curHex and when cur changes so does selected
    // in canvas hexClick, waits for player to click adajcent tile and click planMoveHere
    deleteOptions();
}

let planMoveTroopsHere = function(){
    plannedActions[turnCounter].push(selectedHex + " -> " + curHex);
    // action will happen during action phase

    // clear
    deleteOptions();
    ctxHL.clearRect(0,0,canvasHL.width,canvasHL.height);

    // planning movement done
    action = false;
}
