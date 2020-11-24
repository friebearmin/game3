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

var canvas;
var ctx;
let boolOnline = false;
var ply1;
var myID;
let objectArray;
let objectPlayer;
let xCe = 140;
let yCe = 140;
let xCe2 = 150;
let yCe2 = 150;
let imageWeapon;
let areaManager1;
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
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    setCanvasSize(bodyWindow);
    imageWeapon = new Image();
    areaManager1 = new AreaManager(xCe, yCe)
    areaManager1.addyWall(0,0,300,1);
    areaManager1.addyWall(20,0,300,-1);
    objectArray = [];
    objectPlayer = [];
    myID = Math.floor((Math.random() * 100) + 1);
    for(i=0;i<15;i++){
        objectArray.push(new Cube(i, i*20, 0));
    }
    for(i=1;i<15;i++){
        objectArray.push(new Cube(i+15, 0, i*20));
    }
    for(i=3;i<10;i++){
        objectArray.push(new Cube(i+30, 40, i*20));
    }
    objectArray.push(new Cube(40, 280, 280));
	ply1 = new Spieler(1, areaManager1);
    objectPlayer.push(ply1);
    objectPlayer.push(ply1.spell);
    console.log("objectArray:"+objectArray.length);
	//ply1.spell.loop = setInterval(function(){ply1.spell.repeat();}, 200);
    gameLoop();
}

//Passt die Größe des Canvas Objectes an
function setCanvasSize(bodyWindow){
    document.getElementById("mainCanvas").width = xCe2*2;
    document.getElementById("mainCanvas").height = yCe2*2;
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
    let xShiftObjectForRotation = xCe2-areaSize/2;
    let yShiftObjectForRotation = yCe2-areaSize/2;
    var rot = 0;
    if(ply1.eyeX == 1){ 
        var rot = 90;
        yShiftObjectForRotation = yCe2-areaSize/2+areaSize;
    }
    if(ply1.eyeX == -1){ 
        var rot = 270; 
        xShiftObjectForRotation = xCe2-areaSize/2+areaSize;
    }
    /*
    if(ply1.eyeY == -1){ 
        var rot = 0; 
    }
    */
    if(ply1.eyeY == 1){
        var rot = 180; 
        yShiftObjectForRotation = yCe2-areaSize/2+areaSize;
        xShiftObjectForRotation = xCe2-areaSize/2+areaSize;
    }
    //ctx.translate(xCe+areaSize/2, yCe+areaSize/2);
    ctx.translate(xShiftObjectForRotation,yShiftObjectForRotation);
    

    ctx.rotate(-rot * Math.PI / 180);
    for(var obj in objectArray){
        //Passt das Objekt an, welches gleich gezeichnet wird
        objectArray[obj].update(ctx,xShiftObject,yShiftObject);
        //Zeichnet das Objekt
        objectArray[obj].render(ctx,xShiftObject,yShiftObject);
    }
    ctx.rotate(rot * Math.PI / 180);
    //ctx.translate((-1)*(xCe+areaSize/2), (-1)*(yCe+areaSize/2));
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
        this.yValues = [];
        this.yWallStart = [];
        this.yWallEnd = [];
        this.yDirection = [];

    }
    addAreaObject = function(points){
        console.log('Achtung die Methode addAreaObject in main.js funktioniert nicht!');
    }
    //Fuegt Punkte hinzu und berechnet die entsprechenden Waende
    addPoints = function(points){
        console.log('Achtung die Methode addPoints in main.js funktioniert nicht!');
    }
    addxWall = function(xValue, start, end){
        console.log('Achtung die Methode addxWall in main.js funktioniert nicht!');

    }
    addyWall = function(yValue, start, end, dircetion){
        this.yValues[this.yValues.length] = yValue;
        this.yWallStart[this.yWallStart.length] = start;
        this.yWallEnd[this.yWallEnd.length] = end;
        this.yDirection[this.yDirection.length] = dircetion;

    }
// TODO 24.11.2020
//Eine neue Idee
//Statt zu sagen, der neue Punkt ist okay
//Koennte man auch sagen, der aktuelle Punkt darf in diese Richtung
//nicht veraendert werden
    checkPoints2 = function(object){
        for(let i=0; i < this.yValues.length;i++){
            if(this.yValues[i] == object.y){
                if(this.yWallStart[i] < object.x){
                    if(this.yWallEnd[i] > object.x){
                        if(this.yDirection[i] == 1){
                            console.log('Kaffee1');
                            if(object.xDiPlBool){
                                console.log('Kaffee11');
                            }
                            if(!object.xDiPlBool){
                                console.log('Kaffee12');
                            }
                            object.xDiPlBool = false;
                            return;
                        }
                        if(this.yDirection[i] == -1){
                            object.xDiMiBool = false;
                            console.log('Kaffee2');
                            return;
                        }
                    }
                }
            }
        }

    }
    checkPoints = function(xValue, yValue){
        for(let i=0; i < this.xValues.length;i++){
            if(this.xValues[i] == xValue){
                if(this.xWallStart[i] < yValue){
                    if(this.xWallEnd[i] > yValue){
                        return false;
                    }
                }
            }
        }
        for(let i=0; i < this.yValues.length;i++){
            if(this.yValues[i] == yValue){
                if(this.yWallStart[i] < xValue){
                    if(this.yWallEnd[i] > xValue){
                        return false;
                    }
                }
            }
        }


        //console.log('Kaffee' + this.yValues.length);
        return true;
    }
}
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
