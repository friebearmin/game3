//Hier erarbeite ich gerade eine neue Datei,
//welches das Zeichnen übernehemen soll.
//Aber mit Hilfe von der Methode requestAnimationFrame statt mit setIntervall.
//Stand 2021.01.13
//TODO
//vielleicht Code säubern
//oder neue Waffen Bewegungen
//oder andere Zauber
//oder siehe auch Txt Datei Todos

let canvas, canvasLeft, canvasRight;
let ctx, ctxLeft, ctxRight;
let boolOnline = false;
let ply1;
let myID;
let opponentIDs = [];
let myName = "";
let objectWorld; // Verwaltet alle Objekte für die Spielwelt
let objectPlayer;
let areaManager1;
let newPlayerCanvas;
let communicationLoopToServer;
const xDim = 15;
const yDim = 15;
let xCe = areaSize*xDim/2;
let yCe = areaSize*yDim/2;
let mapSize = areaSize*xDim;
//DimTmp is for AreaManager Matrix administration 
const xDimTmp = 2;
const yDimTmp = 2;
let imageWeapon;
let imagePreLinkName = 'UsedImages/';
let testStringPhp = 'None';
let timeLastNewData = 0;
let timeLastSending = 0;
let phpTimeLoop = 500;
let writeToServer = true;
// Diese Variable gibt an, ob der Besucher noch zuschaut oder schon mit spielt.
let viewers = true;
let viewersClicker = true;
let guideUse = false;
let mouseX = 0;
let mouseY = 0;
// Die KeyPress Variablen so einstellen,
// dass sie true werden wenn sie gedrückt sind und false werden wenn die Taste
// los gelassen wird
// und bei True wird entsprechend was gemacht
function main(bodyWindow){
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    canvasRight = document.getElementById("rightCanvas");
    ctxRight = canvasRight.getContext("2d");
    canvasLeft = document.getElementById("leftCanvas");
    ctxLeft = canvasLeft.getContext("2d");
    setCanvasSize(bodyWindow);
    drawTouchBtnR(canvasRight, ctxRight);
    drawTouchBtnL(canvasLeft, ctxLeft);
    imageWeapon = new Image();
    areaManager1 = new AreaManager()
    objectPlayer = [];
    //Set false if user should create self
    if(localStorage.myID){
        createNewPlayer();
    }

    newPlayerCanvas = new Image();
    newPlayerCanvas.onload = imageIsLoaded;
    newPlayerCanvas.src = imagePreLinkName+'newGame.png';
    gameLoop();
	communicationLoopToServer = window.setInterval(dataExchangeToServer, phpTimeLoop);	
}

//Passt die Größe des Canvas Objectes an
function setCanvasSize(bodyWindow){
    document.getElementById("mainCanvas").width = xCe*2;
    document.getElementById("mainCanvas").height = yCe*2;
    document.getElementById("leftCanvas").width = xCe;
    document.getElementById("leftCanvas").height = yCe*2;
    document.getElementById("rightCanvas").width = xCe;
    document.getElementById("rightCanvas").height = yCe*2;
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
    let xShiftObjectForRotation = xCe;
    let yShiftObjectForRotation = yCe;
    let rot = 0;
    let xShiftObject = (-1)*areaManager1.startx;
    let yShiftObject = (-1)*areaManager1.starty;
    if(ply1){
        xShiftObject = (-1)*(ply1.x);
        yShiftObject = (-1)*(ply1.y);
        if(ply1.eyeX == 1){
            rot = 90;
        }
        if(ply1.eyeX == -1){
            rot = 270;
        }
        /*
        if(ply1.eyeY == -1){
            rot = 0;
        }
        */
        if(ply1.eyeY == 1){
            rot = 180;
        }
    }

    ctx.lineWidth = 2;
    //Führt eine Translation durch damit die Rotation um den Spieler passiert
    ctx.translate(xShiftObjectForRotation,yShiftObjectForRotation);
    ctx.rotate(-rot * Math.PI / 180);
    for(let i1=-1; i1<2;i1++){
    for(let j1=-1; j1<2;j1++){
    for(let i2=0; i2<2;i2++){
    for(let j2=0; j2<2;j2++){
        try{
    for(let index in areaManager1.matrix9[i1][j1][i2][j2]){
        //Passt das Objekt an, welches gleich gezeichnet wird
        areaManager1.matrix9[i1][j1][i2][j2][index].update(ctx,xShiftObject,yShiftObject);
        //Zeichnet das Objekt
        areaManager1.matrix9[i1][j1][i2][j2][index].render(ctx,xShiftObject,yShiftObject);
    }
        }catch{
        }
        }}}}
    //areaManager1.render(ctx,xShiftObject,yShiftObject);
    ctx.rotate(rot * Math.PI / 180);
    ctx.translate((-1)*xShiftObjectForRotation, (-1)*yShiftObjectForRotation);
    for(let obj in objectPlayer){
        //Passt das Objekt an, welches gleich gezeichnet wird
        objectPlayer[obj].update();
        //Zeichnet das Objekt
        objectPlayer[obj].render(ctx,0,0);
    }
    if(ply1){
        areaManager1.manageAreaPosition(ply1.x,ply1.y);
    //new 27.09.2021
        drawLifeLine(ctx);
    }
//new 18.08.2021
    if(viewers){
        renderStart(ctx);
    }
    if(key8Pressed || guideUse){
        renderGuide(ctx);
    }
}
//new 27.09.2021
function drawLifeLine(ctx){
    let playerLifePercentage = ply1.lifePoints/100;
    let lineWidth = 2;
    let xPos = lineWidth/2;
    let yPos = areaSize*xDim-lineWidth/2;
    let heightLine = (areaSize*xDim-2*lineWidth)*playerLifePercentage;
    let widthLine = 10-2*lineWidth;
    let xPos2 = areaSize*xDim-widthLine-lineWidth/2;
    
    ctx.beginPath();
    ctx.lineWidth = lineWidth.toString();
    ctx.strokeStyle = "black";
    ctx.rect(xPos, yPos, widthLine, -heightLine);
    ctx.stroke();
    ctx.fillStyle = "#669900";
	ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = lineWidth.toString();
    ctx.strokeStyle = "black";
    ctx.rect(xPos2, yPos, widthLine, -heightLine);
    ctx.stroke();
    ctx.fillStyle = "#669900";
	ctx.fill();
}
//new 31.08.2021
// Fragt den Server nach neuen informationen ab.
function dataExchangeToServer(){
    if(writeToServer){
        timeLastSending = Date.now();
        let sendingData = "time="+timeLastSending;
        if(ply1 && ply1.lifePoints > 0){
            sendingData += "&id="+myID;
            sendingData += "&name="+myName;
            sendingData += "&x="+ply1.x;
            sendingData += "&y="+ply1.y;
            sendingData += "&eyeX="+ply1.eyeX;
            sendingData += "&eyeY="+ply1.eyeY;
            sendingData += "&color="+ply1.color.replace('#','');
        }
        let req1 = new XMLHttpRequest();
        req1.open("POST", "php/dataExchange.php", true);
        req1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req1.onreadystatechange = function() {
            if (req1.readyState == 4 && req1.status == 200) {
                let dataReport = JSON.parse(this.responseText);
                //console.log(dataReport);
                let timeNewData =  parseInt(dataReport[0]);
                let timeDifference =  timeNewData - timeLastNewData;
                if(timeDifference > 0){
                    updateDisplayLatenz(Date.now()-timeLastSending);
                    manageOpponentPlayers(dataReport[1]);
                }else{
                }
                timeLastNewData = timeNewData;
            }
        };
        //console.log(sendingData);
        req1.send(sendingData);
    }
}
//new 08.10.2021
// Gibt dem Server bescheid, dass angegriffen wurde.
function dataAttackToServer(){
    if(ply1 && ply1.lifePoints > 0 && writeToServer){
        let sendingData = "time="+Date.now();
        sendingData += "&id="+myID;
        sendingData += keyPressedToRotateLeftWeapon ? "&key1=1" : "&key1=0";
        sendingData += keyPressedToRotateRightWeapon ? "&key2=1" : "&key2=0";
        let req1 = new XMLHttpRequest();
        req1.open("POST", "php/dataAttack.php", true);
        req1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req1.onreadystatechange = function() {
            if (req1.readyState == 4 && req1.status == 200) {
                let dataReport = JSON.parse(this.responseText);
                //console.log(dataReport);
                let timeNewData =  parseInt(dataReport[0]);
                let timeDifference =  timeNewData - timeLastNewData;
                if(timeDifference > 0){
                    manageOpponentPlayers(dataReport[1]);
                }else{
                }
                timeLastNewData = timeNewData;
            }
        };
        //console.log('Sending AttackData to Server. '+Date.now());
        req1.send(sendingData);
    }
}
//new 11.10.2021
// Gibt dem Server bescheid, dass etwas getroffen wurde
function dataHitToServer(hit){
    if(ply1 && ply1.lifePoints > 0){
        let sendingData = "time="+Date.now();
        sendingData += "&id="+myID;
        sendingData += hit ? "&hit=1" : "&hit=0";
        let req1 = new XMLHttpRequest();
        req1.open("POST", "php/dataAttack.php", true);
        req1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req1.onreadystatechange = function() {
            if (req1.readyState == 4 && req1.status == 200) {
                setTimeout(function(){
                    writeToServer = true;
                }, 500);
                let dataReport = JSON.parse(this.responseText);
                //console.log(dataReport);
                let timeNewData =  parseInt(dataReport[0]);
                let timeDifference =  timeNewData - timeLastNewData;
                if(timeDifference > 0){
                    manageOpponentPlayers(dataReport[1]);
                }else{
                }
                timeLastNewData = timeNewData;
            }
        };
        //console.log('Sending AttackData to Server. '+Date.now());
        req1.send(sendingData);
    }
}
// 03.09.2021
// Verwaltet die Gegenspieler
function manageOpponentPlayers(datas){
    let playerNotOnServer = true;
    let allOpponentPlayers = {'len': 0};
    for(let index in opponentIDs){
        allOpponentPlayers[String(opponentIDs[index])] = false;
        allOpponentPlayers['len']++;
    }
    for(let index in datas){
        let id = parseInt(datas[index][1]);
        let name = datas[index][2];
        let x = parseInt(datas[index][3]);
        let y = parseInt(datas[index][4]);
        let eyeX = parseInt(datas[index][5]);
        let eyeY = parseInt(datas[index][6]);
        let lifePoints = parseInt(datas[index][7]);
        let color = '#'+datas[index][8];
        let angleWeapon1 = parseInt(datas[index][9]);
        let angleWeapon2 = parseInt(datas[index][10]);
        let angleWeaponTime1 = parseInt(datas[index][11]);
        let angleWeaponTime2 = parseInt(datas[index][12]);
        let testString = datas[index][13];
        if(id !== myID){
            let xMatrixPos;
            let yMatrixPos;
            if(ply1){
                xMatrixPos = Math.floor(x/480)-Math.floor(ply1.x/480);
                yMatrixPos = Math.floor(y/480)-Math.floor(ply1.y/480);
            }else{
                xMatrixPos = Math.floor(x/480)-Math.floor(areaManager1.startx/480);
                yMatrixPos = Math.floor(y/480)-Math.floor(areaManager1.starty/480);
            }
            if(Math.abs(xMatrixPos) < 2 && Math.abs(yMatrixPos) < 2){
                if(!areaManager1.matrixIndex[String(id)]){
                    areaManager1.addObjectsToMatrix(xMatrixPos,yMatrixPos,[new OpponentPlayer(id, x, y, name, areaManager1, color)]);
                    opponentIDs.push(id);
                    areaManager1.matrixIndex[String(id)].eyeX = eyeX;
                    areaManager1.matrixIndex[String(id)].eyeY = eyeY;
                    //areaManager1.matrixIndex[String(id)].weapon.angle = angleWeapon;
                    areaManager1.matrixIndex[String(id)].weapon.angleUpdate(angleWeapon1,angleWeapon2,angleWeaponTime1,angleWeaponTime2);
                    areaManager1.matrixIndex[String(id)].lifePoints = lifePoints;
                    allOpponentPlayers[String(id)] = true;
                    allOpponentPlayers['len']++;
                }else{
                    areaManager1.matrixIndex[String(id)].newPosition(x,y);
                    areaManager1.matrixIndex[String(id)].eyeX = eyeX;
                    areaManager1.matrixIndex[String(id)].eyeY = eyeY;
                    //areaManager1.matrixIndex[String(id)].weapon.angle = angleWeapon;
                    areaManager1.matrixIndex[String(id)].weapon.angleUpdate(angleWeapon1,angleWeapon2,angleWeaponTime1,angleWeaponTime2);
                    areaManager1.matrixIndex[String(id)].lifePoints = lifePoints;
                    areaManager1.matrixIndex[String(id)].color = color;
                    allOpponentPlayers[String(id)] = true;
                }
            }
        }else{
            playerNotOnServer = false;
            ply1.weapon.angleUpdate(angleWeapon1,angleWeapon2,angleWeaponTime1,angleWeaponTime2);
            ply1.lifePoints = lifePoints;
            if(ply1.lifePoints <= 0){
                ply1.eyeX = 0;
                ply1.eyeY = -1;
            }
            if(testStringPhp != testString){
                console.log('new testStringPhp: '+testString);
            }
            testStringPhp = testString;
        }
    }
    if(ply1 && playerNotOnServer){
        ply1.lifePoints = 100;
    }
    //console.log(allOpponentPlayers);
    let removeOpponents = []
    for(let index in opponentIDs){
        if(areaManager1.matrixIndex[String(opponentIDs[index])] != undefined && !allOpponentPlayers[String(opponentIDs[index])]){
            removeOpponents.push(opponentIDs[index]);
        }}
    if(removeOpponents.length > 0){
        console.log(removeOpponents);
    }
    for(let index in removeOpponents){
        //hier wieder der OpponentPlayer gelöscht an drei Orte:
        let id = removeOpponents[index];
        if(areaManager1.matrixIndex[String(id)] == undefined){
            continue;
        }
        let x = areaManager1.matrixIndex[String(id)].x;
        let y = areaManager1.matrixIndex[String(id)].y;
        //let xMatrixPos = Math.floor(x/480)-Math.floor(ply1.x/480);
        //let yMatrixPos = Math.floor(y/480)-Math.floor(ply1.y/480);
        let allMatrixPos = areaManager1.getAllMatrixPositions(areaManager1.matrixIndex[String(id)]);
        console.log('allMatrixPos: '+allMatrixPos);
        //AreaManger Matrix
        for(let allMatrixPosIndex in allMatrixPos){
            let mv1 = allMatrixPos[allMatrixPosIndex][0];
            let mv2 = allMatrixPos[allMatrixPosIndex][1];
            let mv3 = allMatrixPos[allMatrixPosIndex][2];
            let mv4 = allMatrixPos[allMatrixPosIndex][3];
            let indexRemove1 = -1;
            for(let index2 in areaManager1.matrix9[mv1][mv2][mv3][mv4]){
                if(areaManager1.matrix9[mv1][mv2][mv3][mv4][index2].id == id){
                    indexRemove1 = index2;
                }
            }
            console.log('indexRemove1: '+indexRemove1);
            if (indexRemove1 > -1) {
                areaManager1.matrix9[mv1][mv2][mv3][mv4].splice(indexRemove1, 1);
            }
        }
        //AreaManger Index 
        areaManager1.matrixIndex['len']--;
        delete areaManager1.matrixIndex[String(id)];
        //opponentsIDs
        const indexRemove2 = opponentIDs.indexOf(id);
        if (indexRemove2 > -1) {
            opponentIDs.splice(indexRemove2, 1);
        }
    }
}
// 25.08.2021 von stackoverflow
function timeNow(){
  var a = new Date();
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var millisec = a.getMilliseconds();
    if(millisec < 100){
        millisec = 0+millisec.toString();
    }
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ':' + millisec;
  return time;
}
//new 18.08.2021
// Gibt die Position der Maus in der Konsole wieder
function getPos(e){
    var kontext = canvas.getContext("2d");
    var position = getPosition(canvas);
    mouseX = e.clientX-position.x;
    mouseY = e.clientY-position.y+Math.floor(window.pageYOffset);
    if(key8Pressed){
        console.log('x: '+mouseX+' y: '+mouseY);
    }
    //console.log(getCoords(canvas));
}

//Gibt die Coordinaten des Elementen aus
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

//12.10.2021
function updateDisplayLatenz(value) {
    document.getElementById("latencySpan").innerHTML = value;
}
function clickCanvas() {
    if(viewers){
    if(mouseX > canvas.offsetWidth*(40/480) && mouseX < canvas.offsetWidth*(440/480) &&
        mouseY > canvas.offsetHeight*(25/480) && mouseY < canvas.offsetHeight*(125/480) && viewersClicker){
        console.log('A new player can be created.');
        viewersClicker = false;
        $( "#popupNewPlayer" ).popup("open");
        setTimeout(function(){
            document.getElementById("newPlayerName").focus();
            viewersClicker = true;
        }, 100);
    }
    }
}

//Gibt dem Server bescheid, dass ein neuer Spieler dabei ist
//wird auch in popupNewPlayer genutzt
function createNewPlayer() {
    if(!ply1){
        viewers = false;
        myID = Math.floor((Math.random() * 1000000) + 1);
        if(localStorage.myID){
            myID = parseInt(localStorage.myID);
        }else{
            localStorage.myID = myID;
            guideUse = true;
            //TODO man könnte noch den Server fragen, ob es diese ID schon gibt
        }
        let playerColor = getRandomColor();
        if(localStorage.color){ playerColor = localStorage.color;
        }else{ localStorage.color = playerColor; }

        console.log('New Player was created.'+myID);
        myName = $("#newPlayerName").val();
        if(myName == ''){
            myName = 'player'+myID;
        }
        $("#newPlayerName").val("");
        $("#popupNewPlayer").popup("close");
        ply1 = new Spieler(1, areaManager1, playerColor);
        objectPlayer.push(ply1);
    }else{
        console.log('New Player already there.');
        $("#popupNewPlayer").popup("close");
    }
}

//Diese Klasse soll verwalten
//wo man hingehen kann
class AreaManager {
    constructor() {
        console.log('newPositionOfObject muss noch verbessert werden.');
        this.testCounterTrue = 0;
        this.testCounterFalse = 0;
        //Calculate the start position of the player
        let xStart = (getRandomInt(3)-1);
        let yStart = (getRandomInt(3)-1);
        for(let i = 0; i<4;i++){
            if(xStart == 0 && yStart == 0){
                xStart = (getRandomInt(3)-1);
                yStart = (getRandomInt(3)-1);
            }else{
                break;
            }
        }
        console.log('xStart: '+xStart);
        console.log('yStart: '+yStart);
        //Hier startet der Spieler
        this.startx = xStart*areaSize*xDim+xCe;
        this.starty = yStart*areaSize*xDim+yCe;
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

        this.matrixIndex = {'len': 0};
        this.matrix9 = [];
        this.matrix9[0] = [];
        this.matrix9[1] = [];
        this.matrix9[-1] = [];

        this.matrix9[0][0] = this.getNewMatrix();//Mitte Mitte
        this.matrix9[1][0] = this.getNewMatrix();//Rechts Mitte
        this.matrix9[-1][0] = this.getNewMatrix();//Links Mitte
        this.matrix9[0][1] = this.getNewMatrix();//Mitte Unten
        this.matrix9[1][1] = this.getNewMatrix();//Rechts Unten
        this.matrix9[-1][1] = this.getNewMatrix();//Links Unten
        this.matrix9[0][-1] = this.getNewMatrix();//Mitte Oben
        this.matrix9[1][-1] = this.getNewMatrix();//Rechts Oben
        this.matrix9[-1][-1] = this.getNewMatrix();//Links Oben
        if(Math.abs(0-xStart)<2 && Math.abs(0-yStart)<2){
            this.addObjectsToMatrix(0-xStart,0-yStart,world(0,0));
        }
        if(Math.abs(0-xStart)<2 && Math.abs(1-yStart)<2){
            this.addObjectsToMatrix(0-xStart,1-yStart,world(0,1));
        }
        if(Math.abs(-1-xStart)<2 && Math.abs(1-yStart)<2){
            this.addObjectsToMatrix(-1-xStart,1-yStart,world(-1,1));
        }
        if(Math.abs(-1-xStart)<2 && Math.abs(0-yStart)<2){
            this.addObjectsToMatrix(-1-xStart,0-yStart,world(-1,0));
        }
        if(Math.abs(-1-xStart)<2 && Math.abs(-1-yStart)<2){
            this.addObjectsToMatrix(-1-xStart,-1-yStart,world(-1,-1));
        }

        if(Math.abs(0-xStart)<2 && Math.abs(-1-yStart)<2){
            this.addObjectsToMatrix(0-xStart,-1-yStart,world(0,-1));
        }
        if(Math.abs(1-xStart)<2 && Math.abs(-1-yStart)<2){
            this.addObjectsToMatrix(1-xStart,-1-yStart,world(1,-1));
        }
        if(Math.abs(1-xStart)<2 && Math.abs(0-yStart)<2){
            this.addObjectsToMatrix(1-xStart,0-yStart,world(1,0));
        }
        if(Math.abs(1-xStart)<2 && Math.abs(1-yStart)<2){
            this.addObjectsToMatrix(1-xStart,1-yStart,world(1,1));
        }

        this.xArea = Math.floor(this.startx/(xCe*2))*xCe*2;
        this.yArea = Math.floor(this.starty/(yCe*2))*yCe*2;
        console.log('this.xArea: '+this.xArea);
        console.log('this.yArea: '+this.yArea);
        console.log('this.testCounterTrue: '+this.testCounterTrue);
        console.log('this.testCounterFalse: '+this.testCounterFalse);
    }
	render = function(ctx, xS, yS){
        console.log('Die render Methode von AreaManager wurde deaktiviert');
        /*
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
        */
    }
    //Überprüft ob der angegebene Punkt in einem Objekt liegt
    checkPointMatrix = function(point){
        let matrixPosition1 = this.calculateMatrixPosition(point.x, point.y);
        let val1 = matrixPosition1[0];
        let val2 = matrixPosition1[1];
        let val3 = matrixPosition1[2];
        let val4 = matrixPosition1[3];
        try{
            for(let index in this.matrix9[val1][val2][val3][val4]){
                if(this.matrix9[val1][val2][val3][val4][index].isPointIn(point)){
                    return true;
                }
            }
        }
        catch(e){
            console.log(e);
            console.log("val3 and val4 - Values: "+ val3 +' & '+ val4);
            console.log("x and y - Values: "+ point.x +' & '+ point.y);
            console.log("val1 and val2 - Values: "+ val1 +' & '+ val2);
        }
        return false;
    }
    //Überprüft ob der angegebene Punkt in einem Objekt liegt
    checkPointMatrixGetID = function(point){
        let matrixPosition1 = this.calculateMatrixPosition(point.x, point.y);
        let val1 = matrixPosition1[0];
        let val2 = matrixPosition1[1];
        let val3 = matrixPosition1[2];
        let val4 = matrixPosition1[3];
        try{
            for(let index in this.matrix9[val1][val2][val3][val4]){
                if(this.matrix9[val1][val2][val3][val4][index].isPointIn(point)){
                    return this.matrix9[val1][val2][val3][val4][index].id;
                }
            }
        }
        catch(e){
            console.log(e);
            console.log("val3 and val4 - Values: "+ val3 +' & '+ val4);
            console.log("x and y - Values: "+ point.x +' & '+ point.y);
            console.log("val1 and val2 - Values: "+ val1 +' & '+ val2);
        }
        return false;
    }
    attackArea = function(points){
        for(var indP in points){
            let matrixPosition1 = this.calculateMatrixPosition(point.x, point.y);
            let val1 = matrixPosition1[0]; let val2 = matrixPosition1[1]; let val3 = matrixPosition1[2]; let val4 = matrixPosition1[3];
            try{
                for(var index in this.matrix9[val1][val2][val3][val4]){
                    if(this.matrix9[val1][val2][val3][val4][index].beingAttacked(points[indP])){
                        return true;
                    }
                }
            }
            catch(e){
                console.log("val3 and val4 - Values: "+ val3 +' & '+ val4);
                console.log("x and y - Values: "+ points[0].x +' & '+ points[0].y);
                console.log("val1 and val2 - Values: "+ val1 +' & '+ val2);
            }
        }
        return false;
    }
    getAllMatrixPositions = function(object){
        let id = object.id;
        let allPos = [];
        for(let i1=-1; i1<2;i1++){
        for(let j1=-1; j1<2;j1++){
        for(let i2=0; i2<2;i2++){
        for(let j2=0; j2<2;j2++){
            try{
        for(let index in areaManager1.matrix9[i1][j1][i2][j2]){
            let idTmp = areaManager1.matrix9[i1][j1][i2][j2][index].id;
            if(id == idTmp){
                allPos.push([i1,j1,i2,j2]);
            }
        }
            }catch{
            }
            }}}}
        return allPos;
    }
    newPositionOfObject = function(x,y,object){
        console.log('newPositionOfObject wurde ausgeführt.');
        // Diese Methode wird gebraucht, falls sich Objekte oder Spieler bewegen 
        // und dies gewährt, dass das Objekt wieder in der richtigen Matrix ist.
        let pos1 = this.calculateMatrixPosition(object.x,object.y);
        let pos2 = this.calculateMatrixPosition(object.x+areaSize,object.y);
        let pos3 = this.calculateMatrixPosition(object.x,object.y+areaSize);
        let pos4 = this.calculateMatrixPosition(object.x+areaSize,object.y+areaSize);
        let pos1New = this.calculateMatrixPosition(x,y);
        let pos2New = this.calculateMatrixPosition(x+areaSize,y);
        let pos3New = this.calculateMatrixPosition(x,y+areaSize);
        let pos4New = this.calculateMatrixPosition(x+areaSize,y+areaSize);
        let controller = false;
        for(let i = 0;i<pos1.length;i++){
            if(pos1[i] != pos1New[i]){
                controller = true;
                break;
            }
            if(pos2[i] != pos2New[i]){
                controller = true;
                break;
            }
            if(pos3[i] != pos3New[i]){
                controller = true;
                break;
            }
            if(pos4[i] != pos4New[i]){
                controller = true;
                break;
            }
        }
        if(controller){
            let allPos = [pos1];
            for(let i = 0;i<pos1.length;i++){
                if(pos1[i] != pos2[i]){
                    allPos.push(pos2);
                    break;
                }
            }
            for(let i = 0;i<pos1.length;i++){
                if(pos1[i] != pos3[i]){
                    allPos.push(pos3);
                    break;
                }
            }
            for(let i = 0;i<pos1.length;i++){
                if(pos1[i] != pos4[i]){
                    allPos.push(pos4);
                    break;
                }
            }
            let allPosNew = [pos1New];
            for(let i = 0;i<pos1New.length;i++){
                if(pos1New[i] != pos2New[i]){
                    allPosNew.push(pos2New);
                    break;
                }
            }
            for(let i = 0;i<pos1New.length;i++){
                if(pos1New[i] != pos3New[i]){
                    allPosNew.push(pos3New);
                    break;
                }
            }
            for(let i = 0;i<pos1New.length;i++){
                if(pos1New[i] != pos4New[i]){
                    allPosNew.push(pos4New);
                    break;
                }
            }
            for(let allMatrixPosIndex in allPos){
                let mv1 = allPos[allMatrixPosIndex][0];
                let mv2 = allPos[allMatrixPosIndex][1];
                let mv3 = allPos[allMatrixPosIndex][2];
                let mv4 = allPos[allMatrixPosIndex][3];
                let indexRemove1 = -1;
                for(let index1 in this.matrix9[mv1][mv2][mv3][mv4]){
                    if(this.matrix9[mv1][mv2][mv3][mv4][index1].id == object.id){
                        indexRemove1 = index1;
                    }
                }
                if (indexRemove1 > -1) {
                    this.matrix9[mv1][mv2][mv3][mv4].splice(indexRemove1, 1);
                }
            }
            for(let allMatrixPosIndex in allPosNew){
                let mv1 = allPosNew[allMatrixPosIndex][0];
                let mv2 = allPosNew[allMatrixPosIndex][1];
                let mv3 = allPosNew[allMatrixPosIndex][2];
                let mv4 = allPosNew[allMatrixPosIndex][3];
                this.matrix9[mv1][mv2][mv3][mv4].push(object);
            }
        }
        return true;
    }
    addObjectsToMatrix = function(x,y,objects){
        // 29.08.2021
        // es sollten nur die Ids gespeichert werden und wo anders die Objekte
        // In der naechsten Zeile, obj ist nur der index des Arrays
        for(let obj in objects){
            //Fügt das Objekt in die Bereiche entsprechenden Bereiche hinzu,
            //jenachdem ob seine Ecken dort liegen.
            let matrixPosition1 = this.calculateMatrixPosition(objects[obj].x, objects[obj].y);
            let val1 = matrixPosition1[0];
            let val2 = matrixPosition1[1];
            let val3 = matrixPosition1[2];
            let val4 = matrixPosition1[3];
            if(matrixPosition1[0] == x){this.testCounterTrue++;}else{this.testCounterFalse++;}
            if(matrixPosition1[1] == y){this.testCounterTrue++;}else{this.testCounterFalse++;}
            /*
            if(matrixPosition1[2] == val3){this.testCounterTrue++;}else{this.testCounterFalse++;}
            if(matrixPosition1[3] == val4){this.testCounterTrue++;}else{this.testCounterFalse++;}
            */
            if(Math.abs(val3) > 1 || Math.abs(val4) > 1){
                continue;
            }
            if(!(typeof this.matrix9[val1][val2][val3] !== 'undefined')){
                console.log('Fehler');
                //console.log('x: '+x+' y:'+y+' val3: '+val3);
                console.log('val1: '+val1+' val2:'+val2+' val3: '+val3);
            }
            this.matrix9[val1][val2][val3][val4].push(objects[obj]);
            // 25.08.2021: Ziel per Id die Koordinaten zu bekommen
            if(objects[obj].id !== undefined){
                if(!this.matrixIndex[objects[obj].id.toString()]){
                    this.matrixIndex[objects[obj].id.toString()] = objects[obj];
                    this.matrixIndex['len']++;
                }else{
                    console.log('Gibt es schon: id '+objects[obj].id);
                }
            }else{
                console.log('Hat keine Id');
                console.log(objects[obj]);
            }
            let matrixPosition2 = this.calculateMatrixPosition(objects[obj].x+areaSize, objects[obj].y);
            let matrixPosition3 = this.calculateMatrixPosition(objects[obj].x, objects[obj].y+areaSize);
            let matrixPosition4 = this.calculateMatrixPosition(objects[obj].x+areaSize, objects[obj].y+areaSize);
            var xMod11 = Math.floor(mod(objects[obj].x+areaSize,xCe*2)/xCe);
            var yMod11 = Math.floor(mod(objects[obj].y+areaSize,xCe*2)/yCe);
            if(xMod11 == 2){
                xMod11 = 1;
            }
            if(yMod11 == 2){
                yMod11 = 1;
            }
            if(!arraysEqual(matrixPosition1, matrixPosition2) && Math.abs(matrixPosition2[2]) < 2 && Math.floor((objects[obj].x)/mapSize) == Math.floor((objects[obj].x+areaSize)/mapSize)){
                this.matrix9[val1][val2][matrixPosition2[2]][val4].push(objects[obj]);
                this.testCounterTrue++;
            }
            if(!arraysEqual(matrixPosition1, matrixPosition3) && Math.abs(matrixPosition3[3]) < 2 && Math.floor((objects[obj].y)/mapSize) == Math.floor((objects[obj].y+areaSize)/mapSize)){
                this.matrix9[val1][val2][val3][matrixPosition3[3]].push(objects[obj]);
                this.testCounterTrue++;
            }
            if(!arraysEqual(matrixPosition1, matrixPosition4) && Math.abs(matrixPosition4[2]) < 2 && Math.abs(matrixPosition4[3]) < 2
                    && Math.floor((objects[obj].x)/mapSize) == Math.floor((objects[obj].x+areaSize)/mapSize)
                    && Math.floor((objects[obj].y)/mapSize) == Math.floor((objects[obj].y+areaSize)/mapSize)){
                this.matrix9[val1][val2][matrixPosition4[2]][matrixPosition4[3]].push(objects[obj]);
                this.testCounterTrue++;
            }
        }
    }
    //Stellt fest ob der Spiele das Gebiet verlassen hat und 
    //x/y-AreaDifRel gibt an in welche Richtung
    manageAreaPosition = function(x, y){
        let xAreaNew = Math.floor(x/(xCe*2))*xCe*2;
        let yAreaNew = Math.floor(y/(yCe*2))*yCe*2;
        let xAreaDifRel = (xAreaNew - this.xArea)/(yCe*2);
        let yAreaDifRel = (yAreaNew - this.yArea)/(yCe*2);
        if(xAreaDifRel != 0 || yAreaDifRel != 0){
            this.xArea = xAreaNew;
            this.yArea = yAreaNew;
            this.changeMatrix(xAreaDifRel,yAreaDifRel);
        }
    }
    changeMatrix = function(x,y){
        let tmpMatrix9 = [];
        tmpMatrix9[0] = [];
        tmpMatrix9[1] = [];
        tmpMatrix9[-1] = [];
        
        tmpMatrix9[0][0] = this.matrix9[0][0];
        tmpMatrix9[1][0] = this.matrix9[1][0];
        tmpMatrix9[-1][0] = this.matrix9[-1][0];
        tmpMatrix9[0][1] = this.matrix9[0][1];
        tmpMatrix9[1][1] = this.matrix9[1][1];
        tmpMatrix9[-1][1] = this.matrix9[-1][1];
        tmpMatrix9[0][-1] = this.matrix9[0][-1];
        tmpMatrix9[1][-1] = this.matrix9[1][-1];
        tmpMatrix9[-1][-1] = this.matrix9[-1][-1];

        this.matrix9[0][0] = tmpMatrix9[0+x][0+y];
        if(x == 1 && y == 0){
            //remove objectives in this.matrixIndex from (-1,-1),(-1,0),(-1,1)
            //for(let ix1 = -1; ix1 < 2; ix1++){
            let ix1 = -1;
            for(let iy1 = -1; iy1 < 2; iy1++){
            for(let ix2 = 0; ix2 < 2; ix2++){
            for(let iy2 = 0; iy2 < 2; iy2++){
            for(let index in tmpMatrix9[ix1][iy1][ix2][iy2]){
                delete this.matrixIndex[tmpMatrix9[ix1][iy1][ix2][iy2][index].id.toString()];
            }}}}

            this.loadNewDataForMatrx(1,0);
            this.loadNewDataForMatrx(1,1);
            this.loadNewDataForMatrx(1,-1);
            this.matrix9[-1][0] = tmpMatrix9[-1+x][0+y];
            this.matrix9[-1][1] = tmpMatrix9[-1+x][1+y];
            this.matrix9[-1][-1] = tmpMatrix9[-1+x][-1+y];
            this.matrix9[0][1] = tmpMatrix9[0+x][1+y];
            this.matrix9[0][-1] = tmpMatrix9[0+x][-1+y];
        }else if(x == -1 && y == 0){
            //remove objectives in this.matrixIndex from (1,-1),(1,0),(1,1)
            //for(let ix1 = -1; ix1 < 2; ix1++){
            let ix1 = 1;
            for(let iy1 = -1; iy1 < 2; iy1++){
            for(let ix2 = 0; ix2 < 2; ix2++){
            for(let iy2 = 0; iy2 < 2; iy2++){
            for(let index in tmpMatrix9[ix1][iy1][ix2][iy2]){
                delete this.matrixIndex[tmpMatrix9[ix1][iy1][ix2][iy2][index].id.toString()];
            }}}}

            this.loadNewDataForMatrx(-1,0);
            this.loadNewDataForMatrx(-1,1);
            this.loadNewDataForMatrx(-1,-1);
            this.matrix9[1][0] = tmpMatrix9[1+x][0+y];
            this.matrix9[1][1] = tmpMatrix9[1+x][1+y];
            this.matrix9[1][-1] = tmpMatrix9[1+x][-1+y];
            this.matrix9[0][1] = tmpMatrix9[0+x][1+y];
            this.matrix9[0][-1] = tmpMatrix9[0+x][-1+y];
        }else if(x == 0 && y == 1){
            //remove objectives in this.matrixIndex from (-1,-1),(0,-1),(1,-1)
            for(let ix1 = -1; ix1 < 2; ix1++){
            //for(let iy1 = -1; iy1 < 2; iy1++){
            let iy1 = -1;
            for(let ix2 = 0; ix2 < 2; ix2++){
            for(let iy2 = 0; iy2 < 2; iy2++){
            for(let index in tmpMatrix9[ix1][iy1][ix2][iy2]){
                delete this.matrixIndex[tmpMatrix9[ix1][iy1][ix2][iy2][index].id.toString()];
            }}}}

            this.loadNewDataForMatrx(0,1);
            this.loadNewDataForMatrx(1,1);
            this.loadNewDataForMatrx(-1,1);
            this.matrix9[0][-1] = tmpMatrix9[0+x][-1+y];
            this.matrix9[1][-1] = tmpMatrix9[1+x][-1+y];
            this.matrix9[-1][-1] = tmpMatrix9[-1+x][-1+y];
            this.matrix9[-1][0] = tmpMatrix9[-1+x][0+y];
            this.matrix9[1][0] = tmpMatrix9[1+x][0+y];
        }else if(x == 0 && y == -1){
            //remove objectives in this.matrixIndex from (-1,1),(0,1),(1,1)
            for(let ix1 = -1; ix1 < 2; ix1++){
            //for(let iy1 = -1; iy1 < 2; iy1++){
            let iy1 = 1;
            for(let ix2 = 0; ix2 < 2; ix2++){
            for(let iy2 = 0; iy2 < 2; iy2++){
            for(let index in tmpMatrix9[ix1][iy1][ix2][iy2]){
                delete this.matrixIndex[tmpMatrix9[ix1][iy1][ix2][iy2][index].id.toString()];
            }}}}

            this.loadNewDataForMatrx(0,-1);
            this.loadNewDataForMatrx(1,-1);
            this.loadNewDataForMatrx(-1,-1);
            this.matrix9[0][1] = tmpMatrix9[0+x][1+y];
            this.matrix9[1][1] = tmpMatrix9[1+x][1+y];
            this.matrix9[-1][1] = tmpMatrix9[-1+x][1+y];
            this.matrix9[-1][0] = tmpMatrix9[-1+x][0+y];
            this.matrix9[1][0] = tmpMatrix9[1+x][0+y];
        }else{
            console.log('Großer Fehler in changeMatrix falsche Eingabe.');
            console.log(' x: '+x+' & y: '+y);
        }

        var counter = 0;
        try{ tmpMatrix9[0][0][0][0];
            counter++;
        }catch{ console.log('Matrix00 Fehler'); }
        try{ tmpMatrix9[1][0][0][0];
            counter++;
        }catch{ console.log('Matrix10 Fehler'); }
        try{ tmpMatrix9[-1][0][0][0];
            counter++;
        }catch{ console.log('Matrix-10 Fehler'); }
        try{ tmpMatrix9[0][1][0][0];
            counter++;
        }catch{ console.log('Matrix01 Fehler'); }
        try{ tmpMatrix9[1][1][0][0];
            counter++;
        }catch{ console.log('Matrix11 Fehler'); }
        try{ tmpMatrix9[-1][1][0][0];
            counter++;
        }catch{ console.log('Matrix-11 Fehler'); }
        try{ tmpMatrix9[0][-1][0][0];
            counter++;
        }catch{ console.log('Matrix0-1 Fehler'); }
        try{ tmpMatrix9[1][-1][0][0];
            counter++;
        }catch{ console.log('Matrix1-1 Fehler'); }
        try{ tmpMatrix9[-1][-1][0][0];
            counter++;
        }catch{ console.log('Matrix-1-1 Fehler'); }
        if(counter == 9){
            console.log('Alles schick');
        }else{
            console.log('Nicht alles schick');
        }
    }
    getNewMatrix = function(){
        let newMatrix = [];
        newMatrix[0] = [];
        newMatrix[1] = [];
        newMatrix[0][0] = [];
        newMatrix[0][1] = [];
        newMatrix[1][0] = [];
        newMatrix[1][1] = [];
        return newMatrix;
    }
    loadNewDataForMatrx = function(x,y){
        this.matrix9[x][y] = this.getNewMatrix();
        let newXAreaForData = this.xArea/(xCe*2)+x;
        let newYAreaForData = this.yArea/(yCe*2)+y;
        /* Kann eigentlich weg, es seiden es kommt noch ein Fehler auf
         * 20.01.2021 19:45
        console.log(' x: '+x+' & y: '+y);
        console.log(' xArea: '+this.xArea/(xCe*2)+' & yArea: '+this.yArea/(yCe*2));
        console.log('newXAreaForData: '+newXAreaForData+' & newYAreaForData: '+newYAreaForData);
        */
        this.addObjectsToMatrix(x,y,world(newXAreaForData,newYAreaForData));
    }
    calculateMatrixPosition = function(x,y){
        //TODO Methode in addObjectsToMatrix einbauen und dabei alle vier Ecken auf Gleichheit überprüfen
        // 05.10.2021
        let shiftX = this.startx;
        let shiftY = this.starty;
        if(typeof ply1 !== 'undefined'){
            shiftX = ply1.x;
            shiftY = ply1.y;
        }
        let xMod = x-Math.floor(shiftX/mapSize)*mapSize;
        let yMod = y-Math.floor(shiftY/mapSize)*mapSize;
        let val1 = Math.floor(xMod/mapSize);
        let val2 = Math.floor(yMod/mapSize);
        //TODO val3 udn val4 wird bei negativen Werten falsch berechnet
        let val3 = Math.floor((x%mapSize)/xCe);
        let val4 = Math.floor((y%mapSize)/yCe);
        val3 += val3<0 ? 2 : 0;
        val4 += val4<0 ? 2 : 0;
        //console.log('2. ['+val1+', '+val2+', '+val3+', '+val4+']');
        return [val1,val2,val3,val4];
    }
}
//xD und yD ist der Ursprung um den sich x und y drehen soll
function drehePunkt(xD, yD, x, y, winkel) {
	xN = x-xD; //Abstand zwischen xD und x
	yN = y-yD; //Abstand zwischen yD und y
	xF = xN*Math.cos(gradInRadiant(winkel))+yN*Math.sin(gradInRadiant(winkel)); //x Abstand verändern
	yF = -xN*Math.sin(gradInRadiant(winkel))+yN*Math.cos(gradInRadiant(winkel));//y Abstand verändern
	xE = xF+xD; //zum Ursprung dazurechnen
	yE = yF+yD;
	return new Array(xE, yE);
}
function gradInRadiant(grad) {
	return (grad*Math.PI)/180;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

//rechnet den Punkt zum Zeichnen um
function realPointInCanvasDrawPoint(point){

}

//TODO
//rechnet den Punkt zum Zeichnen um
function pointAroundPlayerInCanvasDrawPoint(point){
    return new Point(point.x*(ply1.eyeX-ply1.eyeY), point.y*(ply1.eyeX+ply1.eyeY));
}

//rechnet den Punkt in Koordinatensystem um
function pointAroundPlayerRealPoint(point){
    return new Point(point.x*(ply1.eyeX-ply1.eyeY), point.y*(ply1.eyeX+ply1.eyeY));
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
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function renderStart(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "10";
    if(mouseX > canvas.offsetWidth*(40/480) && mouseX < canvas.offsetWidth*(440/480) &&
        mouseY > canvas.offsetHeight*(25/480) && mouseY < canvas.offsetHeight*(125/480) && viewersClicker){
        ctx.strokeStyle = "#ff9966";
    }else{
        ctx.strokeStyle = "#6699ff";
    }
    ctx.rect(40, 25, 400, 100);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Welcome to the game.", 240, 55);
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Press space or here.", 240, 85);
    ctx.fillText("to create a character.", 240, 110);
    ctx.textAlign = "right";
    ctx.font = "15px Comic Sans MS";
    ctx.fillText("By Armin.", 430, 115);
    ctx.textAlign = "left";
}
let guideSteps = 1;
function renderGuide(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "10";
    ctx.strokeStyle = "gray";
    ctx.rect(25, 25, 150, 130);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.font = "15px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("Game Control Guide", 30, 43); 
    if(guideSteps == 1){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedRunForward, 30, 70); 
        ctx.fillText("to run forward.", 30, 95); 
        if(keyPressedRunForward){ setTimeout(function(){ guideSteps = 2; }, 500); }
    }else if(guideSteps == 2){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedRunBack, 30, 70); 
        ctx.fillText("to run ", 30, 95); 
        ctx.fillText("backwards,", 30, 120); 
        ctx.fillText("but is slow.", 30, 145); 
        if(keyPressedRunBack){ setTimeout(function(){ guideSteps = 3; }, 500); }
    }else if(guideSteps == 3){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedRunLeft, 30, 70); 
        ctx.fillText("to run", 30, 95); 
        ctx.fillText("to the left,", 30, 120); 
        ctx.fillText("but is slow.", 30, 145); 
        if(keyPressedRunLeft){ setTimeout(function(){ guideSteps = 4; }, 500); }
    }else if(guideSteps == 4){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedRunRight, 30, 70); 
        ctx.fillText("to run", 30, 95); 
        ctx.fillText("to the right", 30, 120); 
        ctx.fillText("but is slow.", 30, 145); 
        if(keyPressedRunRight){ setTimeout(function(){ guideSteps = 5; }, 500); }
    }else if(guideSteps == 5){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedToTurnLeft, 30, 70); 
        ctx.fillText("to turn you", 30, 95); 
        ctx.fillText("to the left.", 30, 120); 
        if(keyPressedToTurnLeft){ setTimeout(function(){ guideSteps = 6; }, 1500); }
    }else if(guideSteps == 6){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedToTurnRight, 30, 70); 
        ctx.fillText("to turn you", 30, 95); 
        ctx.fillText("to the right.", 30, 120); 
        if(keyPressedToTurnRight){ setTimeout(function(){ guideSteps = 7; }, 1500); }
    }else if(guideSteps == 7){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedToRotateLeftWeapon, 30, 70); 
        ctx.fillText("to swing your", 30, 95); 
        ctx.fillText("weapon from", 30, 120); 
        ctx.fillText("right to left.", 30, 145); 
        if(keyPressedToRotateLeftWeapon){ setTimeout(function(){ guideSteps = 8; }, 500); }
    }else if(guideSteps == 8){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press "+nameOfKeyPressedToRotateRightWeapon, 30, 70); 
        ctx.fillText("to swing your", 30, 95); 
        ctx.fillText("weapon from", 30, 120); 
        ctx.fillText("left to right.", 30, 145); 
        if(keyPressedToRotateRightWeapon){ setTimeout(function(){ guideSteps = 9; }, 500); }
    }else if(guideSteps == 9){
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("The guide", 50, 70); 
        ctx.fillText("is over.", 60, 95); 
        ctx.fillText("Have fun!", 50, 120); 
        setTimeout(function(){
            key8Pressed = false;
            guideUse = false
            guideSteps = 1;
        }, 2000);
    }
}
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

    //loadDataFromFile("file:///D:/Programme/myPrograms/Das Spiel/HTML/Game - 3.2/ToDos.txt", handleFileData);
    //fetch('ToDos.txt').then(response => response.text()).then(text => console.log(text));
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
}

function handleFileData(fileData) {
    if (!fileData) {
        // Show error
        return;
    }
    // Use the file data
    console.log(fileData);
}
