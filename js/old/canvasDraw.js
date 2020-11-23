var canvas;
var ctx;
var intervalMain;
var intervalDurationMain = 100;
let boolOnline = false;
var ply1;
var myID;

//löscht alles im Canvas
function clearField()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
function startFct(bodyWindow) {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    document.getElementById("mainCanvas").width = bodyWindow.innerWidth-31;
    document.getElementById("mainCanvas").height = bodyWindow.innerHeight-140.4;
    $("#mainCanvas").on("swipeleft",ply1MoveLPerma);
    $("#mainCanvas").on("swiperight",ply1MoveRPerma);
    $("#mainCanvas").on("swipedown",ply1MoveUPerma);
    $("#mainCanvas").on("swipeup",ply1MoveOPerma);
    $("#mainCanvas").on("dbclick",doubleClick);
	breite = canvas.width;
	hoehe = canvas.height;
    objectArray = [];
    myID = Math.floor((Math.random() * 100) + 1);
	ply1 = new Spieler(1, 300, 300);
	//ply1.spell = new Spell('Eisschutz-Schild',ply1);
	ply1.spell.loop = setInterval(function(){ply1.spell.repeat();}, 200);
    intervalMain = setInterval(neuZeichnen, intervalDurationMain);
}
var checker = true;
function stopIntervalMain() {
    if(checker){
        clearInterval(intervalMain);
        clearInterval(intervalMover);
        checker = false;
        moveState = 0;
    }else{
        intervalMain = setInterval(neuZeichnen, intervalDurationMain);
        checker = true;
    }
}

let objectArray;
function addNewObjectToDraw(object){
    //TODO als nächstes: die Objecte müssen eine Zeichen methode besitzen
}

function neuZeichnen(){
    clearField();
	ply1.draw(ctx);
	/*
    for(i = 0; i < arrayEnemy.length; i++) {
        var singleUser = arrayEnemy[i];
        if(singleUser[0] != myID){
            ctx.fillStyle = "hsl(330, 100%, "+singleUser[0]+"%)";
            ctx.fillRect(singleUser[1],singleUser[2],areaSize,areaSize);
        }
    }
    */
    ctx.fillStyle = "#000000";
    ctx.font = "15px Arial";
    ctx.fillText("PHP:  Katze",20,20);
    //ctx.fillText("PHP: "+currentCoords,20,20);

	//dealCoords();
}

var arrayEnemy = [];
var currentCoords = "";
function dealCoords(){
    if(boolOnline){
        var req1 = new XMLHttpRequest();
        req1.open("get", "currentCoords.php?myID=" + myID + "&x=" + ply1.x + "&y=" + ply1.y, true);
        req1.onreadystatechange = function() {
            if (req1.readyState == 4 && req1.status == 200) {
                currentCoords = req1.responseText;
                var rowArray = currentCoords.split("\n");
                for(i = 0; i < rowArray.length; i++) {
                    arrayEnemy[i] = rowArray[i].split(",");
                }
            }			
        };
        req1.send();
    }else{
        currentCoords = "17,100,20;24,20,100;37,160,160";
        var rowArray = currentCoords.split(";");
        for(i = 0; i < rowArray.length; i++) {
            arrayEnemy[i] = rowArray[i].split(",");
        }
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
