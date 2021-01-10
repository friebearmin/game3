(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license
	//
	// Opera engineer Erik Möller wrote about rAF and developed a polyfill
	// that better handles browsers without native support.
	// You can read about it, but basically his code will choose a delay of between 4ms
	// and 16ms in order to more closely match 60fps. Here it is,
	// in case you’d like to use it. Note it uses the standard method name.

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//Hier erarbeite ich gerade eine neue Datei,
//welches das Zeichnen übernehemen soll.
//Aber mit Hilfe von der Methode requestAnimationFrame statt mit setIntervall.
//Stand 2020.11.08 - 15:28
//TODO
//kA 2020.11.08 - 15:28
//vielleicht Code säubern
//oder neue Waffen Bewegungen
//oder andere Zauber
// man könnte auch den Mittelpunkt dies Spiele betrachten und nicht eine Ecke von ihm
// 2020.12.02 - 18:30
// Man koennte jetzt die Waffenschlaege aufraeumen
// Die alten weg und der neue macht Schaden
// Also Schaden Verwaltung anfangen

var canvas;
var ctx;
let boolOnline = false;
var ply1;
var myID;
let objectArray;
let objectPlayer;
const xDim = 15;
const yDim = 15;
let xCe = areaSize*xDim/2;
let yCe = areaSize*yDim/2;
//DimTmp is for AreaManager Matrix administration 
const xDimTmp = 2;
const yDimTmp = 2;
let imageWeapon;
let areaManager1;
let key3Pressed = false;
let key4Pressed = false;
let keyWPressed = false;
let keyEPressed = false;
let keyQPressed = false;
let keySPressed = false;
// Die KeyPress Variablen so einstellen,
// dass sie true werden wenn sie gedrückt sind und false werden wenn die Taste
// los gelassen wird
// und bei True wird entsprechend was gemacht
function main(bodyWindow){
    //loadDataFromFile("file:///D:/Programme/myPrograms/Das Spiel/HTML/Game - 3.2/ToDos.txt", handleFileData);
    fetch('file:///D:/Programme/myPrograms/Das Spiel/HTML/Game - 3.2/ToDos.txt')
  .then(response => response.text())
  .then(text => console.log(text))
    /*
    var url = 'ToDos.txt';
    var storedText;

    fetch(url)
    .then(function(response) {
        response.text().then(function(text) {
        storedText = text;
        done();
        });
    });

    function done() {
        console.log(storedText);
    }
    */

    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    setCanvasSize(bodyWindow);
    imageWeapon = new Image();
    areaManager1 = new AreaManager(xCe, yCe)
    areaManager1.addyWall(0,0,2*xCe,1);
    areaManager1.addyWall(areaSize,0,2*xCe,-1);
    areaManager1.addyWall(2*yCe,0,areaSize,-1);
    areaManager1.addxWall(areaSize,0,2*yCe,-1);
    areaManager1.addxWall(0,0,2*yCe,1);
    areaManager1.addxWall(2*xCe,0,areaSize,-1);

    areaManager1.addyWall(areaSize*3,areaSize*2,areaSize*3,1);
    areaManager1.addyWall(areaSize*10,areaSize*2,areaSize*3,-1);
    areaManager1.addxWall(areaSize*2,areaSize*3,areaSize*10,1);
    areaManager1.addxWall(areaSize*3,areaSize*3,areaSize*10,-1);
    objectArray = [];
    objectPlayer = [];
    myID = Math.floor((Math.random() * 100) + 1);
    for(i=0;i<15;i++){
        objectArray.push(new Cube(i, i*areaSize, 0));
        areaManager1.addObjectToMatrix(objectArray[objectArray.length-1])
    }
    for(i=1;i<15;i++){
        objectArray.push(new Cube(i+15, 0, i*areaSize));
        areaManager1.addObjectToMatrix(objectArray[objectArray.length-1])
    }
    for(i=3;i<10;i++){
        objectArray.push(new Cube(i+30, areaSize*2, i*areaSize));
        areaManager1.addObjectToMatrix(objectArray[objectArray.length-1])
    }
    objectArray.push(new Cube(40, areaSize*14, areaSize*14));
    areaManager1.addAreaObject(objectArray[objectArray.length-1])
    areaManager1.addObjectToMatrix(objectArray[objectArray.length-1])
    objectArray.push(new Rock(41, areaSize*14, areaSize*7));
    areaManager1.addAreaObject(objectArray[objectArray.length-1])
    areaManager1.addObjectToMatrix(objectArray[objectArray.length-1])
    objectArray.push(new Cube(42, areaSize*14, (-1)*areaSize*14));
    areaManager1.addObjectToMatrix(objectArray[objectArray.length-1])
	ply1 = new Spieler(1, areaManager1);
    objectPlayer.push(ply1);
    objectPlayer.push(ply1.spell);
    console.log("objectArray:"+objectArray.length);
    console.log('matrx[0][0].length: '+areaManager1.matrix[0][0].length);
    console.log('matrx[0][1].length: '+areaManager1.matrix[0][1].length);
    console.log('matrx[1][0].length: '+areaManager1.matrix[1][0].length);
    console.log('matrx[1][1].length: '+areaManager1.matrix[1][1].length);
	//ply1.spell.loop = setInterval(function(){ply1.spell.repeat();}, 200);
    gameLoop();
}

//Passt die Größe des Canvas Objectes an
function setCanvasSize(bodyWindow){
    document.getElementById("mainCanvas").width = xCe*2;
    document.getElementById("mainCanvas").height = yCe*2;
}
//löscht alles im Canvas
function clearField()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function addNewObjectToDraw(object){
}
//Diese Methode wird zur Frame-Methode dazu ausgefuehrt
function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    clearField();
    xShiftObject = (-1)*(ply1.x);
    yShiftObject = (-1)*(ply1.y);
    let xShiftObjectForRotation = xCe;
    let yShiftObjectForRotation = yCe;
    var rot = 0;
    if(ply1.eyeX == 1){
        var rot = 90;
        yShiftObjectForRotation = yCe;
    }
    if(ply1.eyeX == -1){
        var rot = 270;
        xShiftObjectForRotation = xCe;
    }
    /*
    if(ply1.eyeY == -1){
        var rot = 0;
    }
    */
    if(ply1.eyeY == 1){
        var rot = 180;
        yShiftObjectForRotation = yCe;
        xShiftObjectForRotation = xCe;
    }
    //Führt eine Translation durch damit die Rotation um den Spieler passiert
    ctx.translate(xShiftObjectForRotation,yShiftObjectForRotation);
    ctx.rotate(-rot * Math.PI / 180);
    for(var obj in objectArray){
        //Passt das Objekt an, welches gleich gezeichnet wird
        objectArray[obj].update(ctx,xShiftObject,yShiftObject);
        //Zeichnet das Objekt
        objectArray[obj].render(ctx,xShiftObject,yShiftObject);
    }
    //areaManager1.render(ctx,xShiftObject,yShiftObject);
    ctx.rotate(rot * Math.PI / 180);
    ctx.translate((-1)*xShiftObjectForRotation, (-1)*yShiftObjectForRotation);
    for(var obj in objectPlayer){
        //Passt das Objekt an, welches gleich gezeichnet wird
        objectPlayer[obj].update(ctx,0,0);
        //Zeichnet das Objekt
        objectPlayer[obj].render(ctx,0,0);
    }
}
//Diese Klasse soll verwalten
//wo man hingehen kann
//TODO hier wird gerade gearbeitet, 15.11.2020 16:00
// Add something, was checkt ob ein Objekt aktiv ist
// und passt die Grenzen an
class AreaManager {
    constructor(x,y) {
        //Hier startet der Spieler
        this.startx = x;
        this.starty = y;
        this.points = [];
        //Das Aufrufen der xValues koennte man durch dirctionary schnell machen
        //gleich fuer die yValues
        this.xValues = [];
        this.xWallStart = [];
        this.xWallEnd = [];
        this.xDirection = [];
        this.yValues = [];
        this.yWallStart = [];
        this.yWallEnd = [];
        this.yDirection = [];
        this.matrix = []
        this.matrix[0] = []
        this.matrix[1] = []
        this.matrix[0][0] = []
        this.matrix[0][1] = []
        this.matrix[1][0] = []
        this.matrix[1][1] = []
    }
	render = function(ctx, xS, yS){
	    ctx.fillStyle = "#ff3300";

        for(let i=0; i < this.yValues.length;i++){
            ctx.beginPath();
            ctx.moveTo(this.yWallStart[i]+xS-areaSize/2, this.yValues[i]+yS-this.yDirection[i]*areaSize/2+this.yDirection[i]);
            ctx.lineTo(this.yWallEnd[i]+xS+areaSize/2, this.yValues[i]+yS-this.yDirection[i]*areaSize/2+this.yDirection[i]);
            ctx.stroke();
        }
        for(let i=0; i < this.xValues.length;i++){
            ctx.beginPath();
            ctx.moveTo(this.xValues[i]+xS-this.xDirection[i]*areaSize/2+this.xDirection[i], this.xWallStart[i]+yS-areaSize/2);
            ctx.lineTo(this.xValues[i]+xS-this.xDirection[i]*areaSize/2+this.xDirection[i], this.xWallEnd[i]+yS+areaSize/2);
            ctx.stroke();
        }
    }
    addAreaObject = function(object){
        let xWalls = object.getxWalls();
        for (let i in xWalls) {
            this.addxWall(xWalls[i][0], xWalls[i][1], xWalls[i][2], xWalls[i][3])
        }
        let yWalls = object.getyWalls();
        for (let i in yWalls) {
            this.addyWall(yWalls[i][0], yWalls[i][1], yWalls[i][2], yWalls[i][3])
        }
        this.manageWalls();
    }
    // Diese Methode soll alle Walls untersuchen und sie verbinden oder loeschen
    manageWalls = function(){
        console.log('Achtung die Methode manageWalls in main.js funktioniert nicht!');
    }
    //Fuegt Punkte hinzu und berechnet die entsprechenden Waende
    addPoints = function(points){
        console.log('Achtung die Methode addPoints in main.js funktioniert nicht!');
    }
    addxWall = function(xValue, start, end, dircetion){
        this.xValues[this.xValues.length] = xValue;
        this.xWallStart[this.xWallStart.length] = start;
        this.xWallEnd[this.xWallEnd.length] = end;
        this.xDirection[this.xDirection.length] = dircetion;
    }
    addyWall = function(yValue, start, end, dircetion){
        this.yValues[this.yValues.length] = yValue;
        this.yWallStart[this.yWallStart.length] = start;
        this.yWallEnd[this.yWallEnd.length] = end;
        this.yDirection[this.yDirection.length] = dircetion;

    }
    checkPoints = function(object){
        for(let i=0; i < this.yValues.length;i++){
            if((this.yValues[i]-this.yDirection[i]*areaSize/2+this.yDirection[i]) == object.y){
                if((this.yWallStart[i]-areaSize/2) < object.x && (this.yWallEnd[i]+areaSize/2) > object.x){
                    if(this.yDirection[i] == 1){
                        object.xDiPlBool = false;
                        break;
                    }
                    if(this.yDirection[i] == -1){
                        object.xDiMiBool = false;
                        break;
                    }
                }
                if((this.yWallStart[i]-areaSize/2) > object.x){
                        //console.log('Kaffee12');
                    if(this.yDirection[i] == 1){
                        object.xDiPlBool = true;
                    }
                    if(this.yDirection[i] == -1){
                        object.xDiMiBool = true;
                    }
                }
                if((this.yWallEnd[i]+areaSize/2) < object.x){
                    if(this.yDirection[i] == 1){
                        object.xDiPlBool = true;
                    }
                    if(this.yDirection[i] == -1){
                        object.xDiMiBool = true;
                    }
                }
            }
        }
        for(let i=0; i < this.xValues.length;i++){
            if((this.xValues[i]-this.xDirection[i]*areaSize/2+this.xDirection[i]) == object.x){
                if((this.xWallStart[i]-areaSize/2) < object.y && (this.xWallEnd[i]+areaSize/2) > object.y){
                    if(this.xDirection[i] == 1){
                        object.yDiPlBool = false;
                        break;
                    }
                    if(this.xDirection[i] == -1){
                        object.yDiMiBool = false;
                        break;
                    }
                }
                if((this.xWallStart[i]-areaSize/2) > object.y){
                        //console.log('Kaffee12');
                    if(this.xDirection[i] == 1){
                        object.yDiPlBool = true;
                    }
                    if(this.xDirection[i] == -1){
                        object.yDiMiBool = true;
                    }
                }
                if((this.xWallEnd[i]+areaSize/2) < object.y){
                    if(this.xDirection[i] == 1){
                        object.yDiPlBool = true;
                    }
                    if(this.xDirection[i] == -1){
                        object.yDiMiBool = true;
                    }
                }
            }
        }
    }
    addObjectToMatrix = function(object){
        var xMod00 = Math.floor(mod(object.x,xCe*2)/xCe);
        var yMod00 = Math.floor(mod(object.y,yCe*2)/yCe);
        this.matrix[xMod00][yMod00].push(object);
        var xMod11 = Math.floor(mod(object.x+areaSize,xCe*2)/xCe);
        var yMod11 = Math.floor(mod(object.y+areaSize,xCe*2)/yCe);
        if(xMod11 == 2){
            xMod11 = 1;
        }
        if(yMod11 == 2){
            yMod11 = 1;
        }
        var boolBoth = 0;
        if(xMod00 != xMod11){
            this.matrix[xMod11][yMod00].push(object);
            boolBoth++;
        }
        if(yMod00 != yMod11){
            this.matrix[xMod00][yMod11].push(object);
            boolBoth++;
        }
        if(boolBoth == 2){
            this.matrix[xMod11][yMod11].push(object);
        }
    }
    checkPointMatrix = function(point){
        //TODO Methode mit x und y benutzen
        //dabei aber jeden Punkt überprüfen und nicht nur einmal am Ende
        //und die verschieben beim Punkt dazu rechnet und nicht 
        //wie in der checkPoint Methode
        //also wenn man in xEye = -1, dann Minus areaSize/2 auf dem Point rechnen
        //var xMod = Math.floor(point.x%(xCe*2)/xCe);
        var xMod = Math.floor(mod(point.x,xCe*2)/xCe);
        //var yMod = Math.floor(point.y%(yCe*2)/yCe);
        var yMod = Math.floor(mod(point.y,yCe*2)/yCe);
        try{
            for(var obj in this.matrix[xMod][yMod]){
                if(this.matrix[xMod][yMod][obj].isPointIn(point)){
                    console.log("checkPointMatrix id: "+this.matrix[xMod][yMod][obj].id);
                    return true;
                }
            }
        }
        catch(e){
            console.log("xMod and yMod - Values: "+ xMod +' & '+ yMod);
            console.log("x and y - Values: "+ point.x +' & '+ point.y);
        }
        return false;
    }
    attackArea = function(points){
        var boolVal = false;
        for(var obj in objectArray){
            if(objectArray[obj].beingAttacked(points)){
                boolVal = true;
                break;
            }
        }
        if(boolVal){
            return true;
        }
        for(var obj in objectPlayer){
            if(objectPlayer[obj].beingAttacked(points)){
                boolVal = true;
                break;
            }
        }
        if(boolVal){
            return true;
        }
        return false;
    }
}
//xD und yD ist der Ursprung um den sich x und y drehen soll
function drehePunkt(xD, yD, x, y, winkel) {
	xN = x-xD; //Abstand zwischen xD und x
	yN = y-yD; //Abstand zwischen yD und y
	xF = xN*Math.cos(gradInRadiant(winkel))+yN*Math.sin(gradInRadiant(winkel)); //x Abstand verändern
	yF = -xN*Math.sin(gradInRadiant(winkel))+yN*Math.cos(gradInRadiant(winkel));//x Abstand verändern
	xE = xF+xD; //zum Ursprung dazurechnen
	yE = yF+yD;
	return new Array(xE, yE);
}
function gradInRadiant(grad) {
	return (grad*Math.PI)/180;
}

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    turnPoint = function(angle, xC = 0, yC = 0) {
        let xN = this.x-xC; //Abstand zwischen xC und x
        let yN = this.y-yC; //Abstand zwischen yC und y
        let xF = xN*Math.cos(gradInRadiant(angle))+yN*Math.sin(gradInRadiant(angle)); //x Abstand verändern
        let yF = -xN*Math.sin(gradInRadiant(angle))+yN*Math.cos(gradInRadiant(angle));//x Abstand verändern
        let xE = xF+xC; //zum Ursprung dazurechnen
        let yE = yF+yC;
        return new Point(xE, yE);
    }
}
function imageIsLoaded(){
    console.log("image was loaded");
}
function mod(n, m){
  return ((n % m) + m) % m;
}
/*
// Do the request
loadDataFromFile("/path/to/file", handleFileData);
*/
function loadDataFromFile(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // The request is done; did it work?
            if (xhr.status == 200 || xhr.status == 0) {
                // ***Yes, use `xhr.responseText` here***
                callback(xhr.responseText);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
            }
        }
    };
    xhr.open("GET", path);
    xhr.send();
}

function handleFileData(fileData) {
    if (!fileData) {
        // Show error
        return;
    }
    // Use the file data
    console.log(fileData);
}
