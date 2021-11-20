var consoleBool = false;
var innerBool = false;
function startup() {
    //Füge die TouchEvents hinzu zu den zwei Canvas
    let el = document.getElementById("rightCanvas");
    el.addEventListener("touchstart", handleStartRight, false);
    el.addEventListener("touchend", handleEndRight, false);
    el.addEventListener("touchcancel", handleCancelRight, false);
    el.addEventListener("touchmove", handleMoveRight, false);
    el = document.getElementById("leftCanvas");
    el.addEventListener("touchstart", handleStartLeft, false);
    el.addEventListener("touchend", handleEndLeft, false);
    el.addEventListener("touchcancel", handleCancelLeft, false);
    el.addEventListener("touchmove", handleMoveLeft, false);
    //Berechne die Punkte für die Kreis, die getoucht werden können
    pointCntrL1 = new Point(xCntr,yCntr);
    pointCntrL2_12 = new Point(xCntr,yCntr-rad1-rad2-pffr);
    let newPoint = drehePunkt(xCntr,yCntr,xCntr+rad1+rad2+pffr,yCntr,30);
    pointCntrL3_14 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr+rad2+pffr,yCntr,30);
    pointCntrR3 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr-rad1-rad2-pffr,yCntr,-30);
    pointCntrL4_10 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr-rad1-rad2-pffr,yCntr,-30);
    pointCntrR4 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr,yCntr+rad1+rad2+pffr,60);
    pointCntrL5_16 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr,yCntr+rad1+rad2+pffr,-30);
    pointCntrL6_19 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr,yCntr+rad1+rad2+pffr-10,15);
    pointCntrL7_17 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr-rad1-rad2-pffr+10,yCntr,15);
    pointCntrL8_20 = new Point(newPoint[0],newPoint[1]);

    pointCntrR1 = new Point(xCntr,yCntr);
    pointCntrR2 = new Point(xCntr,yCntr-rad1-rad2-pffr);
    newPoint = drehePunkt(xCntr,yCntr,xCntr-rad2-pffr,yCntr,30);
    pointCntrR5 = new Point(newPoint[0],newPoint[1]);
    newPoint = drehePunkt(xCntr,yCntr,xCntr,yCntr+rad1+rad2+pffr,30);
    pointCntrR6 = new Point(newPoint[0],newPoint[1]);
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    }else{
        document.getElementById("rightCanvas").style.visibility="hidden";
        document.getElementById("leftCanvas").style.visibility="hidden";
    }
}
document.addEventListener("DOMContentLoaded", startup);
var ongoingTouchesR = [];
var ongoingTouchesL = [];

function handleStartRight(evt) {
    if(innerBool){
        //document.getElementById("pTestR").innerHTML = 'handleStartRight was used';
    }
    evt.preventDefault();
    if(consoleBool){
        console.log("touchstart.");
    }
    var el = document.getElementById("rightCanvas");
    //var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

        var rect = el.getBoundingClientRect();
        var rectWeidth = rect.left-rect.right;
        var rectHeight = rect.top-rect.bottom;
    for (var i = 0; i < touches.length; i++) {
        if(consoleBool){
            console.log("touchstart:" + i + "...");
        }
        ongoingTouchesR.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        //ctx.beginPath();
        var xCanVal = (-1)*Math.round(xCe*(touches[i].pageX-rect.left)/rectWeidth);
        var yCanVal = -1*Math.round(yCe*2*(touches[i].pageY-rect.top)/rectHeight);
        //document.getElementById("pTestR").innerHTML = document.getElementById("pTestR").innerHTML + '<br>x: '+ xCanVal + ' y:' +yCanVal;
        //ctx.arc(xCanVal, yCanVal, 4, 0, 2 * Math.PI, false);  // a circle at the start
        isACircleTouchedRight(xCanVal,yCanVal);
        //ctx.arc(50+Math.random()*50, 50+Math.random()*50, 4, 0, 2 * Math.PI, false);  // a circle at the start
        //ctx.fillStyle = color;
        //ctx.fill();
        if(consoleBool){
            console.log("touchstart:" + i + ".");
        }
    }
}
function handleStartLeft(evt) {
    if(innerBool){
        //document.getElementById("pTestL").innerHTML = 'handleStartLeft was used';
    }
    evt.preventDefault();
    if(consoleBool){
        console.log("touchstart.");
    }
    var el = document.getElementById("leftCanvas");
    //var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    var rect = el.getBoundingClientRect();
    var rectWeidth = rect.left-rect.right;
    var rectHeight = rect.top-rect.bottom;
    for (var i = 0; i < touches.length; i++) {
        if(consoleBool){
            console.log("touchstart:" + i + "...");
        }
        ongoingTouchesL.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        //ctx.beginPath();
        var xCanVal = (-1)*Math.round(xCe*(touches[i].pageX-rect.left)/rectWeidth);
        var yCanVal = -1*Math.round(yCe*2*(touches[i].pageY-rect.top)/rectHeight);
        if(innerBool){
            //document.getElementById("pTestL").innerHTML = document.getElementById("pTestL").innerHTML + '<br>x: '+ xCanVal + ' y:' +yCanVal;
        }
        //ctx.arc(xCanVal, yCanVal, 4, 0, 2 * Math.PI, false);  // a circle at the start
        isACircleTouchedLeft(xCanVal,yCanVal);
        //ctx.arc(50+Math.random()*50, 50+Math.random()*50, 4, 0, 2 * Math.PI, false);  // a circle at the start
        //ctx.fillStyle = color;
        //ctx.fill();
        if(consoleBool){
            console.log("touchstart:" + i + ".");
        }
    }
}

function handleMoveRight(evt) {
    if(innerBool){
        //document.getElementById("pTestR").innerHTML = document.getElementById("pTestR").innerHTML + '<br>handleMoveRight';
    }
    evt.preventDefault();
    var el = document.getElementById("rightCanvas");
    //var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    var rect = el.getBoundingClientRect();
    var rectWeidth = rect.left-rect.right;
    var rectHeight = rect.top-rect.bottom;
    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);
        var xCanVal1 = (-1)*Math.round(xCe*(touches[i].pageX-rect.left)/rectWeidth);
        var yCanVal1 = -1*Math.round(yCe*2*(touches[i].pageY-rect.top)/rectHeight);
        var xCanVal2 = (-1)*Math.round(xCe*(ongoingTouchesR[i].pageX-rect.left)/rectWeidth);
        var yCanVal2 = -1*Math.round(yCe*2*(ongoingTouchesR[i].pageY-rect.top)/rectHeight);

        if (idx >= 0) {
            if(consoleBool){
                console.log("continuing touch "+idx);
            }
            //ctx.beginPath();
            if(consoleBool){
                console.log("ctx.moveTo(" + xCanVal2 + ", " + yCanVal2 + ");");
            }
            //ctx.moveTo(xCanVal2, yCanVal2);
            if(consoleBool){
                console.log("ctx.lineTo(" + xCanVal1 + ", " + yCanVal1 + ");");
            }
            //ctx.lineTo(xCanVal1, yCanVal1);
            //ctx.lineWidth = 4;
            //ctx.strokeStyle = color;
            //ctx.stroke();

            ongoingTouchesR.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
            if(consoleBool){
                console.log(".");
            }
        } else {
            console.log("can't figure out which touch to continue");
        }
    }
}

function handleMoveLeft(evt) {
    if(innerBool){
        //document.getElementById("pTestL").innerHTML = document.getElementById("pTestL").innerHTML + '<br>handleMoveLeft';
    }
    evt.preventDefault();
    var el = document.getElementById("leftCanvas");
    //var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    var rect = el.getBoundingClientRect();
    var rectWeidth = rect.left-rect.right;
    var rectHeight = rect.top-rect.bottom;
    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexByIdLeft(touches[i].identifier);
        var xCanVal1 = (-1)*Math.round(xCe*(touches[i].pageX-rect.left)/rectWeidth);
        var yCanVal1 = -1*Math.round(yCe*2*(touches[i].pageY-rect.top)/rectHeight);
        var xCanVal2 = (-1)*Math.round(xCe*(ongoingTouchesL[i].pageX-rect.left)/rectWeidth);
        var yCanVal2 = -1*Math.round(yCe*2*(ongoingTouchesL[i].pageY-rect.top)/rectHeight);

        if (idx >= 0) {
            if(consoleBool){
                console.log("continuing touch "+idx);
            }
        //ctx.beginPath();
        if(consoleBool){
            console.log("ctx.moveTo(" + xCanVal2 + ", " + yCanVal2 + ");");
        }
        //ctx.moveTo(xCanVal2, yCanVal2);
        if(consoleBool){
            console.log("ctx.lineTo(" + xCanVal1 + ", " + yCanVal1 + ");");
        }
        //ctx.lineTo(xCanVal1, yCanVal1);
        //ctx.lineWidth = 4;
        //ctx.strokeStyle = color;
        //ctx.stroke();

        ongoingTouchesL.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        if(consoleBool){
            console.log(".");
        }
        } else {
            if(consoleBool){
                console.log("can't figure out which touch to continue");
            }
        }
    }
}

function handleEndRight(evt) {
    //document.getElementById("pTestR").innerHTML = document.getElementById("pTestR").innerHTML + '<br>handleEndRight was used';
    evt.preventDefault();
    log("touchend");
    var el = document.getElementById("rightCanvas");
    //var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    var rect = el.getBoundingClientRect();
    var rectWeidth = rect.left-rect.right;
    var rectHeight = rect.top-rect.bottom;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            var xCanVal1 = (-1)*Math.round(xCe*(touches[i].pageX-rect.left)/rectWeidth);
            var yCanVal1 = -1*Math.round(yCe*2*(touches[i].pageY-rect.top)/rectHeight);
            var xCanVal2 = (-1)*Math.round(xCe*(ongoingTouchesR[i].pageX-rect.left)/rectWeidth);
            var yCanVal2 = -1*Math.round(yCe*2*(ongoingTouchesR[i].pageY-rect.top)/rectHeight);
            //ctx.lineWidth = 4;
            //ctx.fillStyle = color;
            //ctx.beginPath();
            //ctx.moveTo(xCanVal2, yCanVal2);
            //ctx.lineTo(xCanVal1, yCanVal1);
            //ctx.fillRect(xCanVal1 - 4, yCanVal1 - 4, 8, 8);  // and a square at the end
            ongoingTouchesR.splice(idx, 1);  // remove it; we're done
        } else {
                if(consoleBool){
                    console.log("can't figure out which touch to end");
                }
        }
    }
    keyPressedToRotateRightWeapon = false;
    keyPressedToTurnLeft = false;
    keyPressedToTurnRight = false;
    keyPressedToRotateLeftWeapon = false;
    keyPressedToExamineInFrontOfYou = false;
}

function handleEndLeft(evt) {
    if(innerBool){
        //document.getElementById("pTestL").innerHTML = document.getElementById("pTestL").innerHTML + '<br>handleEndLeft was used';
    }
    evt.preventDefault();
    log("touchend");
    var el = document.getElementById("leftCanvas");
    //var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    var rect = el.getBoundingClientRect();
    var rectWeidth = rect.left-rect.right;
    var rectHeight = rect.top-rect.bottom;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexByIdLeft(touches[i].identifier);

        if (idx >= 0) {
        var xCanVal1 = (-1)*Math.round(xCe*(touches[i].pageX-rect.left)/rectWeidth);
        var yCanVal1 = -1*Math.round(yCe*2*(touches[i].pageY-rect.top)/rectHeight);
        var xCanVal2 = (-1)*Math.round(xCe*(ongoingTouchesL[i].pageX-rect.left)/rectWeidth);
        var yCanVal2 = -1*Math.round(yCe*2*(ongoingTouchesL[i].pageY-rect.top)/rectHeight);
        //ctx.lineWidth = 4;
        //ctx.fillStyle = color;
        //ctx.beginPath();
        //ctx.moveTo(xCanVal2, yCanVal2);
        //ctx.lineTo(xCanVal1, yCanVal2);
        //ctx.fillRect(xCanVal1 - 4, yCanVal1 - 4, 8, 8);  // and a square at the end
        ongoingTouchesL.splice(idx, 1);  // remove it; we're done
        } else {
            console.log("can't figure out which touch to end");
        }
    }
    keyPressedRunForward = false;
    keyPressedRunBack = false;
    keyPressedRunLeft = false;
    keyPressedRunRight = false;
}

function handleCancelRight(evt) {
    //document.getElementById("pTestR").innerHTML = document.getElementById("pTestR").innerHTML + '<br>handleCancelRight';
    evt.preventDefault();
    console.log("touchcancel.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouchesR.splice(idx, 1);  // remove it; we're done
    }
}

function handleCancelLeft(evt) {
    if(innerBool){
        //document.getElementById("pTestL").innerHTML = document.getElementById("pTestL").innerHTML + '<br>handleCancelLeft';
    }
    evt.preventDefault();
    if(consoleBool){
        console.log("touchcancel.");
    }
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexByIdLeft(touches[i].identifier);
        ongoingTouchesL.splice(idx, 1);  // remove it; we're done
    }
}

function colorForTouch(touch) {
  var r = touch.identifier % 16;
  var g = Math.floor(touch.identifier / 3) % 16;
  var b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  var color = "#" + r + g + b;
  if(consoleBool){
    console.log("color for touch with identifier " + touch.identifier + " = " + color);
  }
  return color;
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouchesR.length; i++) {
    var id = ongoingTouchesR[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

function ongoingTouchIndexByIdLeft(idToFind) {
  for (var i = 0; i < ongoingTouchesL.length; i++) {
    var id = ongoingTouchesL[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

function log(msg) {
    if(innerBool){
        //document.getElementById("pTestR").innerHTML = document.getElementById("pTestR").innerHTML + '<br>Log: '+msg;
    }
}


let rad1 = 50;//Radius vom Haupt-Knopf
let rad2 = 30;//Radien von den anderen Knöpfen
let rad3 = 50;//Radien von den anderen Knöpfen
let pffr = 20;//Abstand zwischen den Knöpfen
let pffr2 = -20;//Abstand zwischen den Knöpfen
let xCntr = 120;//Zentrum vom Haupt-Knopf x-Achse
let yCntr = 240;//Zentrum vom Haupt-Knopf y-Achse
let pointCntrR1;//Zentrum - nicht in Nutzung -
let pointCntrR2;//Oben+
let pointCntrR3;//Zentrum rechts+
let pointCntrR4;//Oben Links+
let pointCntrR5;//Zentrum links
let pointCntrR6;//Unten Links
function drawTouchBtnR(canvasR, ctxR){
	ctxR.clearRect(0, 0, canvasR.width, canvasR.height);
    //W-Knopf Bereich Nach vorne bewegen - Zentrum
    //drawCircle(ctxR, pointCntrR1.x, pointCntrR1.y, rad1, 'black');
    //U-Knopf Bereich Nach rechts drehen - Oben
    drawCircle(ctxR, pointCntrR2.x, pointCntrR2.y, rad2, 'black');
    //J-Knopf Bereich Nach rechts bewegen - Oben Rechts
    drawCircle(ctxR, pointCntrR3.x, pointCntrR3.y, rad1, 'black');
    //Z-Knopf Bereich Nach links drehen - Oben Links
    drawCircle(ctxR, pointCntrR4.x, pointCntrR4.y, rad2, 'black');
    //H-Kopf Bereich Nach rechts drehen - Unten Rechts
    drawCircle(ctxR, pointCntrR5.x, pointCntrR5.y, rad1, 'black');
    //S-Kopf Bereich Nach hinten bewegen - Unten Links
    drawCircle(ctxR, pointCntrR6.x, pointCntrR6.y, rad2, 'black');
}

function isACircleTouchedRight(x,y){
    /* Zentrum wird gerade nicht gebraucht
    if(Math.sqrt((x-pointCntrR1.x)*(x-pointCntrR1.x)+(y-pointCntrR1.y)*(y-pointCntrR1.y))<rad1){
        console.log('Point im Zentrum Rechts');
        return;
    }
    */
    if(Math.sqrt((x-pointCntrR2.x)*(x-pointCntrR2.x)+(y-pointCntrR2.y)*(y-pointCntrR2.y))<rad1){
        console.log('Point to turn right');
        keyPressedToTurnRight = true;
        if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == 1){ ply1.eyeX = 0; ply1.eyeY = 1; return; }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == -1){ ply1.eyeX = 0; ply1.eyeY = -1; return; }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == -1){ ply1.eyeX = 1; ply1.eyeY = 0; return; }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == 1){ ply1.eyeX = -1; ply1.eyeY = 0; return; }
        return;
    }
    if(Math.sqrt((x-pointCntrR3.x)*(x-pointCntrR3.x)+(y-pointCntrR3.y)*(y-pointCntrR3.y))<rad1){
        console.log('Point to rotate right weapon');
        keyPressedToRotateRightWeapon = true;
        keyPressedToRotateLeftWeapon = false;
        dataAttackToServer();
        return;
    }
    if(Math.sqrt((x-pointCntrR4.x)*(x-pointCntrR4.x)+(y-pointCntrR4.y)*(y-pointCntrR4.y))<rad1){
        console.log('Point to turn left');
        keyPressedToTurnLeft = true;
        if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == 1){ ply1.eyeX = 0; ply1.eyeY = -1; return; }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == -1){ ply1.eyeX = 0; ply1.eyeY = 1; return; }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == -1){ ply1.eyeX = -1; ply1.eyeY = 0; return; }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == 1){ ply1.eyeX = 1; ply1.eyeY = 0; return; }
        return;
    }
    if(Math.sqrt((x-pointCntrR5.x)*(x-pointCntrR5.x)+(y-pointCntrR5.y)*(y-pointCntrR5.y))<rad1){
        console.log('Point to rotate left weapon');
        keyPressedToRotateLeftWeapon = true;
        keyPressedToRotateRightWeapon = false;
        dataAttackToServer();
        return;
    }
    if(Math.sqrt((x-pointCntrR6.x)*(x-pointCntrR6.x)+(y-pointCntrR6.y)*(y-pointCntrR6.y))<rad1){
        console.log('Point to Examine in front of you');
        keyPressedToExamineInFrontOfYou = true;
        if(ply1 && ply1.lifePoints > 0){
            ply1.toExamineInFrontOfYou();
        }
        return;
    }
}
function isACircleTouchedLeft(x,y){
    if(Math.sqrt((x-pointCntrL1.x)*(x-pointCntrL1.x)+(y-pointCntrL1.y)*(y-pointCntrL1.y))<rad1){
        console.log('Point im W-Knopf');
        keyPressedRunForward = true;
        return;
    }
    if(Math.sqrt((x-pointCntrL2_12.x)*(x-pointCntrL2_12.x)+(y-pointCntrL2_12.y)*(y-pointCntrL2_12.y))<rad2){
        console.log('Point to run forward and left');
        keyPressedRunLeft = true;
        keyPressedRunForward = true;
        return;
    }
    if(Math.sqrt((x-pointCntrL3_14.x)*(x-pointCntrL3_14.x)+(y-pointCntrL3_14.y)*(y-pointCntrL3_14.y))<rad2){
        console.log('Point to run forward and right');
        keyPressedRunRight = true;
        keyPressedRunForward = true;
        return;
    }
    if(Math.sqrt((x-pointCntrL4_10.x)*(x-pointCntrL4_10.x)+(y-pointCntrL4_10.y)*(y-pointCntrL4_10.y))<rad2){
        console.log('Point run left');
        keyPressedRunLeft = true;
    }
    if(Math.sqrt((x-pointCntrL5_16.x)*(x-pointCntrL5_16.x)+(y-pointCntrL5_16.y)*(y-pointCntrL5_16.y))<rad2){
        console.log('Point run right');
        keyPressedRunRight = true;
    }
    if(Math.sqrt((x-pointCntrL6_19.x)*(x-pointCntrL6_19.x)+(y-pointCntrL6_19.y)*(y-pointCntrL6_19.y))<rad2){
        console.log('Point run back');
        keyPressedRunBack = true;
        return;
    }
    if(Math.sqrt((x-pointCntrL7_17.x)*(x-pointCntrL7_17.x)+(y-pointCntrL7_17.y)*(y-pointCntrL7_17.y))<rad2){
        console.log('Point run back and right');
        keyPressedRunBack = true;
        keyPressedRunRight = true;
        return;
    }
    if(Math.sqrt((x-pointCntrL8_20.x)*(x-pointCntrL8_20.x)+(y-pointCntrL8_20.y)*(y-pointCntrL8_20.y))<rad2){
        console.log('Point run back and left');
        keyPressedRunBack = true;
        keyPressedRunLeft = true;
        return;
    }
}

let pointCntrL1;
let pointCntrL2_12;
let pointCntrL3_14;
let pointCntrL4_10;
let pointCntrL5_16;
let pointCntrL6_19;
let pointCntrL7_17;
let pointCntrL8_20;
function drawTouchBtnL(canvasL, ctxL){
	ctxL.clearRect(0, 0, canvasL.width, canvasL.height);
    //W-Knopf Bereich Nach vorne bewegen - Zentrum
    drawCircle(ctxL, pointCntrL1.x, pointCntrL1.y, rad1, 'black');
    //Q-Knopf Bereich Nach links bewegen - Oben
    drawCircle(ctxL, pointCntrL2_12.x, pointCntrL2_12.y, rad2, 'black');
    //E-Knopf Bereich Nach rechts bewegen - Oben Rechts
    drawCircle(ctxL, pointCntrL3_14.x, pointCntrL3_14.y, rad2, 'black');
    //A-Knopf Bereich Nach links drehen - Oben Links
    drawCircle(ctxL, pointCntrL4_10.x, pointCntrL4_10.y, rad2, 'black');
    //D-Kopf Bereich Nach rechts drehen - Unten Rechts
    drawCircle(ctxL, pointCntrL5_16.x, pointCntrL5_16.y, rad2, 'black');
    //S-Kopf Bereich Nach hinten bewegen - Unten Links
    drawCircle(ctxL, pointCntrL6_19.x, pointCntrL6_19.y, rad2, 'black');
    //S&D-Kopf Bereich Nach hinten bewegen - Unten Links
    drawCircle(ctxL, pointCntrL7_17.x, pointCntrL7_17.y, rad2, 'black');
    //S&A-Kopf Bereich Nach hinten bewegen - Unten Links
    drawCircle(ctxL, pointCntrL8_20.x, pointCntrL8_20.y, rad2, 'black');
}

function drawCircle(ctx, x, y, radius, color) {
    drawCircleComplex(ctx, x, y, radius, 0, 360, 0, color);
}

function drawCircleComplex(ctx, x, y, radius, winkel1, winkel2, richtung, color) {
	
	ctx.beginPath();
	ctx.arc(x, y, radius, gradInRadiant(winkel1), gradInRadiant(winkel2), richtung);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.stroke(); 
	ctx.closePath();
}
function gradInRadiant(grad) {
	return (grad*Math.PI)/180;
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }   
	return { x: xPosition, y: yPosition };
}

(function() {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();
