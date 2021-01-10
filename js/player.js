//Ein Verweis um die Zeitschleife zu deaktivieren
var intervalDurationMove = 200;
var imageWapeon = document.createElement("IMG");
var breite = 0;
var hoehe = 0;
const areaSize = 32;
const moveSize1 = 3;
const moveSize2 = 1;
const moveSize3 = 3;

class Spieler {
    constructor(plyN, areaManager) {
        this.plyN = plyN;
        this.areaManager = areaManager;
        this.x = areaManager.startx;
        this.y = areaManager.starty;
        this.xDiMiBool = true;
        this.xDiPlBool = true;
        this.yDiMiBool = true;
        this.yDiPlBool = true;
        this.eyeX = 0;
        this.eyeY = -1;
        this.winkel = 0;
        this.interval;
        this.spell = new Spell('Eisschutz-Schild',this);
        this.weapon = new Weapon('sword',this, 2);
        this.coords1;
        this.coords2;
        this.coords3;
        this.coords4;
        this.weaponShiftX = 0;
        this.weaponShiftY = 0;
        this.weaponTyp = 0;
        this.attackStop = true;
        this.attackDirection = true;
        this.testCounter = 0;
    }
	lineOfSight = function(x,y) {
        if(x>0){this.eyeX = 1;}
        else if(x<0){this.eyeX = -1;}
        else{this.eyeX = 0;}
        if(y>0){this.eyeY = 1;}
        else if(y<0){this.eyeY = -1;}
        else{this.eyeY = 0;}
    }
	attackGo = function() {
        console.log("attackGo Funktion wurde benutzt, aber keine Funktion.");
		//this.areaManager.attackArea(this.x+this.eyeX, this.y+this.eyeY);
	}
	update = function(ctx){
        this.weapon.update();
        if(keyWPressed){
            if(this.xDiPlBool && this.eyeX == 1){ this.x += moveSize1;
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiMiBool = true;
                this.xDiPlBool = (boolXPL && boolXPR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
	    //TODO 8.01.2021
	    //Hier werden jetzt die 4 Punkte vorne, links, rechts und unten in der Mitte überprüft
	    //aber was ist mit den Ecken, aktuel gibt es da einen kleinen fehler
            }
            if(this.xDiMiBool && this.eyeX == -1){ this.x -= moveSize1;
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiPlBool = true;
                this.xDiMiBool = (boolXML && boolXMR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
            if(this.yDiMiBool && this.eyeY == -1){ this.y -= moveSize1; 
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiPlBool = true;
                this.yDiMiBool = (boolYML && boolYMR);
                this.xDiMiBool = (boolXML && boolXMR); 
                this.xDiPlBool = (boolXPL && boolXPR);
                /*
                console.log("bool00"+bool00);
                console.log("bool01"+bool01);
                console.log("bool10"+bool10);
                console.log("bool11"+bool11);
                */
            }
            if(this.yDiPlBool && this.eyeY == 1){ this.y += moveSize1;
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiMiBool = true;
                this.yDiPlBool = (boolYPL && boolYPR);
                this.xDiMiBool = (boolXML && boolXMR);
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            //console.log("plyX"+this.x);
            //console.log("plyY"+this.y);
        }
        if(keyEPressed){
            if(this.yDiPlBool && this.eyeX == 1){ this.y += moveSize2;
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiMiBool = true;
                this.yDiPlBool = (boolYPL && boolYPR);
                this.xDiMiBool = (boolXML && boolXMR);
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            if(this.yDiMiBool && this.eyeX == -1){ this.y -= moveSize2;
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiPlBool = true;
                this.yDiMiBool = (boolYML && boolYMR);
                this.xDiMiBool = (boolXML && boolXMR); 
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            if(this.xDiPlBool && this.eyeY == -1){ this.x += moveSize2;
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiMiBool = true;
                this.xDiPlBool = (boolXPL && boolXPR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
            if(this.xDiMiBool && this.eyeY == 1){ this.x -= moveSize2;
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiPlBool = true;
                this.xDiMiBool = (boolXML && boolXMR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
        }
        if(keyQPressed){
            if(this.yDiMiBool && this.eyeX == 1){ this.y -= moveSize2;
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiPlBool = true;
                this.yDiMiBool = (boolYML && boolYMR);
                this.xDiMiBool = (boolXML && boolXMR); 
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            if(this.yDiPlBool && this.eyeX == -1){ this.y += moveSize2;
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiMiBool = true;
                this.yDiPlBool = (boolYPL && boolYPR);
                this.xDiMiBool = (boolXML && boolXMR);
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            if(this.xDiMiBool && this.eyeY == -1){ this.x -= moveSize2;
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiPlBool = true;
                this.xDiMiBool = (boolXML && boolXMR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
            if(this.xDiPlBool && this.eyeY == 1){ this.x += moveSize2;
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiMiBool = true;
                this.xDiPlBool = (boolXPL && boolXPR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
        }
        if(keySPressed){
            if(this.yDiMiBool && this.eyeY == 1){ this.y -= moveSize2;
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiPlBool = true;
                this.yDiMiBool = (boolYML && boolYMR);
                this.xDiMiBool = (boolXML && boolXMR); 
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            if(this.yDiPlBool && this.eyeY == -1){ this.y += moveSize2; 
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
                this.yDiMiBool = true;
                this.yDiPlBool = (boolYPL && boolYPR);
                this.xDiMiBool = (boolXML && boolXMR);
                this.xDiPlBool = (boolXPL && boolXPR);
            }
            if(this.xDiPlBool && this.eyeX == -1){ this.x += moveSize2;
	            let boolXPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXPR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiMiBool = true;
                this.xDiPlBool = (boolXPL && boolXPR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
            if(this.xDiMiBool && this.eyeX == 1){ this.x -= moveSize2;
	            let boolXML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y-areaSize/2+moveSize3));
	            let boolXMR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2,this.y+areaSize/2-moveSize3));
	            let boolYML = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y-areaSize/2));
	            let boolYMR = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y-areaSize/2));
	            let boolYPR = !this.areaManager.checkPointMatrix(new Point(this.x-areaSize/2+moveSize3,this.y+areaSize/2));
	            let boolYPL = !this.areaManager.checkPointMatrix(new Point(this.x+areaSize/2-moveSize3,this.y+areaSize/2));
                this.xDiPlBool = true;
                this.xDiMiBool = (boolXML && boolXMR);
                this.yDiPlBool = (boolYPL && boolYPR);
                this.yDiMiBool = (boolYML && boolYMR);
            }
        }
        //this.areaManager.checkPoints(this);
    }
	render = function(ctx, xS, yS){
	    //Rechteck für Körper
	    ctx.fillStyle = "#FF823E";
	    //ctx.fillRect(this.x+xS, this.y+yS, areaSize, areaSize);
	    ctx.fillRect(xCe-areaSize/2, yCe-areaSize/2, areaSize, areaSize);
	    //Rechteck für Blickrichtung
        ctx.fillStyle = "#000000";
        //ctx.fillRect(this.x+areaSize/2+this.eyeX*areaSize/4-areaSize/10+xS,this.y+areaSize/2+this.eyeY*areaSize/4-areaSize/10+yS,areaSize/5,areaSize/5);
        ctx.fillRect(xCe-areaSize/10, yCe-areaSize/10-areaSize/4,areaSize/5,areaSize/5);
        this.weapon.render(ctx, xS, yS);
        this.spell.draw(ctx, xS, yS);
    }
    beingAttacked = function(attackPoints){
        return false;
    }
}

class Cube {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
    update = function(ctx){
	    return false;
    }
	render = function(ctx, xS, yS){
	    //Rechteck für den Körper
	    ctx.fillStyle = "#307663";
	    ctx.fillRect(this.x+xS, this.y+yS, areaSize, areaSize);
    }
    getxWalls = function(){
        let firstWall = [this.x, this.y, this.y+areaSize, 1];
        //console.log(firstWall[0] +' '+  firstWall[1]+' '+ firstWall[2]+' '+ firstWall[3]);
        let secondWall = [this.x+areaSize, this.y, this.y+areaSize, -1];
        let both = [firstWall,secondWall];
        return both;
    }
    getyWalls = function(){
        let firstWall = [this.y, this.x, this.x+areaSize, 1];
        let secondWall = [this.y+areaSize, this.x, this.x+areaSize, -1];
        return [firstWall, secondWall];
    }
    beingAttacked = function(attackPoints){
        var ind;
        for(ind in attackPoints){
            if(this.isPointIn(attackPoints[ind])){
                return true;
            }
        }
        return false;
    }
    isPointIn = function(point){
        if(this.x <= point.x && (this.x+areaSize)>=point.x){
            if(this.y < point.y && (this.y+areaSize)>point.y){
                return true;
            }
        }
        return false;
    }
}
//Soll eine Klasse werden von der allen Objekte erben sollen
//die gezeichnet werden
class GameObj {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

class Rock {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.imageData = new Image();
        this.imageData.onload = imageIsLoaded;
        this.imageData.src = "vase_1.png";
        this.life = 5;
        this.state = 5;
        this.somethingChanged = false;
        this.existIt  = true;
    }
    update = function(ctx){
        this.checkSomethingChange();
	    return false;
    }
	render = function(ctx, xS, yS){
	    if(this.existIt){
            ctx.drawImage(this.imageData, 0, 0, 32, 32, this.x+xS, this.y+yS, areaSize, areaSize);
        }
    }
    getxWalls = function(){
        let firstWall = [this.x, this.y, this.y+areaSize, 1];
        console.log(firstWall[0] +' '+  firstWall[1]+' '+ firstWall[2]+' '+ firstWall[3]);
        let secondWall = [this.x+areaSize, this.y, this.y+areaSize, -1];
        let both = [firstWall,secondWall];
        return both;
    }
    getyWalls = function(){
        let firstWall = [this.y, this.x, this.x+areaSize, 1];
        let secondWall = [this.y+areaSize, this.x, this.x+areaSize, -1];
        return [firstWall, secondWall];
    }
    beingAttacked1 = function(xVal1, yVal1, xVal2, yVal2){
        //console.log("x of Rock: " + this.x);
        //console.log("y of Rock: " + this.y);
        //console.log("x of get: " + xVal1);
        //console.log("y of get: " + yVal1);
        //TODO
        //new Code on 27.12.2020
        let pArray = [];
        pArray.push(new Point(this.x, this.y));
        pArray.push(new Point(this.x+areaSize, this.y));
        pArray.push(new Point(this.x, this.y+areaSize));
        pArray.push(new Point(this.x+areaSize, this.y+areaSize));
        let dX = xVal1 - xVal2;
        let dY = yVal1 - yVal2;
        let diff12 = Math.sqrt((dX)*(dX)+(dY)*(dY));
        var p;
        for(p in pArray){
            dX = pArray[p].x - xVal2;
            dY = pArray[p].y - yVal2;
            let diffP2 = Math.sqrt((dX)*(dX)+(dY)*(dY));
            dX = pArray[p].x - xVal1;
            dY = pArray[p].y - yVal1;
            let diffP1 = Math.sqrt((dX)*(dX)+(dY)*(dY));
            if(diffP2 < diff12 && diffP1 < diff12){
                let q = (diffP2*diffP2*(-1)+diffP1*diffP1+diff12*diff12)/(2*diff12);
                let h = Math.sqrt(diffP1*diffP1-q*q)
                if(h < 2){
                    console.log("Rock wurde angegriffen.");
                    console.log("x of Rock: " + pArray[p].x);
                    console.log("y of Rock: " + pArray[p].y);
                    console.log("x of get: " + xVal2);
                    console.log("y of get: " + yVal2);
                    return true;
                }
            }
        }
        return false;
    }
    beingAttacked2 = function(xVal1, yVal1, xVal2, yVal2){
        //Old Code befor 27.12.2020
        if(this.x < xVal2 && (+areaSize)>xVal2){
            if(this.y < yVal2 && (this.y+areaSize)>yVal2){
                if(this.life > 0){
                    this.life -= 1;
                    this.state -= 1;
                    this.somethingChanged = true;
                    console.log("Rock wurde angegriffen.");
                    return true;
                }
            }
        }
        return false;
    }
    beingAttacked = function(attackPoints){
        var ind;
        for(ind in attackPoints){
            if(this.life > 0 && this.isPointIn(attackPoints[ind])){
                this.life -= 1;
                this.state -= 1;
                this.somethingChanged = true;
                console.log("Vase wurde angegriffen.");
                return true;
            }
        }
        return false;
    }
    isPointIn = function(point){
        if(this.x <= point.x && (this.x+areaSize)>=point.x){
            if(this.y < point.y && (this.y+areaSize)>point.y){
                return true;
            }
        }
        return false;
    }
    checkSomethingChange = function(){
        if(this.somethingChanged){
            this.somethingChanged = false;
            if(this.state == 5){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = "vase_1.png";
            }else if(this.state == 4){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = "vase_2.png";
            }else if(this.state == 3){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = "vase_3.png";
            }else if(this.state == 2){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = "vase_4.png";
            }else if(this.state == 1){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = "vase_5.png";
            }else if(this.state == 0){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = "vase_6.png";
            }else{
                this.existIt  = false;
            }
            
        }
    }
}
