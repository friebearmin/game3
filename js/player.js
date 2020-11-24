//Ein Verweis um die Zeitschleife zu deaktivieren
var intervalMover;
var intervalDurationMove = 200;
var imageWapeon = document.createElement("IMG");
var breite = 0;
var hoehe = 0;
var areaSize = 20;
var moveSize1 = 2;
var moveSize2 = 1;

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
    }
    
	
	move = function(x, y) {
	    if((this.x+x)>=0 && (this.x+x)<breite){
            this.x += x;
            if(x>0){this.eyeX = 1;}
            if(x<0){this.eyeX = -1;}
            if(x==0){this.eyeX = 0;}
        }else{
            clearInterval(intervalMover);
        }
	    if((this.y+y)>=0 && (this.y+y)<hoehe){
            this.y += y;
            if(y>0){this.eyeY = 1;}
            if(y<0){this.eyeY = -1;}
            if(y==0){this.eyeY = 0;}
        }else{
            clearInterval(intervalMover);
        }
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
		attackArea(this.x+this.eyeX, this.y+this.eyeY);
	}
	update = function(ctx){
        this.weapon.update();
        if(keyWPressed){
            let newX = this.x;
            let newY = this.y;
            if(this.xDiPlBool && this.eyeX == 1){ newX += moveSize1; }
            if(this.xDiMiBool && this.eyeX == -1){ newX -= moveSize1; }
            if(this.yDiMiBool && this.eyeY == -1){ newY -= moveSize1; }
            if(this.yDiPlBool && this.eyeY == 1){ newY += moveSize1; }
            if(this.areaManager.checkPoints(newX, newY)){
                this.x = newX;
                this.y = newY;
            }
            //console.log("plyX"+this.x);
            //console.log("plyY"+this.y);
        }
        if(keyEPressed){
            if(this.xDiPlBool && this.eyeX == 1){ this.y += moveSize2; this.xDiMiBool = true;}
            if(this.xDiMiBool && this.eyeX == -1){ this.y -= moveSize2; this.xDiPlBool = true;}
            if(this.yDiPlBool && this.eyeY == -1){ this.x += moveSize2; this.yDiMiBool = true;}
            if(this.yDiMiBool && this.eyeY == 1){ this.x -= moveSize2; this.yDiPlBool = true;}
            //TODO klappt noch nicht 24.11.2020
            this.areaManager.checkPoints2(this);
        }
        if(keyQPressed){
            if(this.xDiMiBool && this.eyeX == 1){ this.y -= moveSize2; this.xDiPlBool = true;}
            if(this.xDiPlBool && this.eyeX == -1){ this.y += moveSize2; this.xDiMiBool = true;}
            if(this.yDiMiBool && this.eyeY == -1){ this.x -= moveSize2; this.yDiPlBool = true;}
            if(this.yDiPlBool && this.eyeY == 1){ this.x += moveSize2; this.yDiMiBool = true;}
            //TODO klappt noch nicht 24.11.2020
            this.areaManager.checkPoints2(this);
        }
        if(keySPressed){
            let newX = this.x;
            let newY = this.y;
            if(this.xDiMiBool && this.eyeX == 1){ newX -= moveSize1; }
            if(this.xDiPlBool && this.eyeX == -1){ newX += moveSize1; }
            if(this.yDiPlBool && this.eyeY == -1){ newY += moveSize1; }
            if(this.yDiMiBool && this.eyeY == 1){ newY -= moveSize1; }
            if(this.areaManager.checkPoints(newX, newY)){
                this.x = newX;
                this.y = newY;
            }
        }
    }
	render = function(ctx, xS, yS){
	    //Rechteck für Körper
	    ctx.fillStyle = "#FF823E";
	    //ctx.fillRect(this.x+xS, this.y+yS, areaSize, areaSize);
	    ctx.fillRect(xCe, yCe, areaSize, areaSize);
	    //Rechteck für Blickrichtung
        ctx.fillStyle = "#000000";
        //ctx.fillRect(this.x+areaSize/2+this.eyeX*areaSize/4-areaSize/10+xS,this.y+areaSize/2+this.eyeY*areaSize/4-areaSize/10+yS,areaSize/5,areaSize/5);
        ctx.fillRect(xCe+areaSize/2-areaSize/10, yCe+areaSize/2-areaSize/10-areaSize/4,areaSize/5,areaSize/5);
        this.weapon.render(ctx, xS, yS);
        this.spell.draw(ctx, xS, yS);
    }
    attackLance = function(){
        this.weaponShiftX += 5;
        this.weapon.weaponShiftX += 5;
        //neuZeichnen();
    }
    attackLanceBack = function(){
        this.weaponShiftX -= 5;
        this.weapon.weaponShiftX -= 5;
        //neuZeichnen();
    }
    weaponMove = function(){
        if(this.attackDirection){
            this.winkel += 14.5;
            this.weapon.angle += 14.5;
        }else{
            this.winkel -= 14.5;
            this.weapon.angle -= 14.5;
        }
        //neuZeichnen();
    }
    stopAttack = function(){
        clearInterval(this.interval);
        if(this.attackDirection){
            this.attackDirection = false; 
            this.winkel = 203;
            this.weapon.angle = 203;
        }else{
            this.attackDirection = true; 
            this.winkel = -14.5;
            this.weapon.angle = -14.5;
        }
        this.weaponShiftX = 0;
        this.weapon.weaponShiftX = 0;
        this.weaponShiftY = 0;
        this.attackStop = true;
    }
    stopAttack2 = function(){
        clearInterval(this.interval);
        this.winkel = 90;
    }
}

function attackArea(x, y){
    //das Feld (x,y) wird attackiert
}
var attackStopPly1 = true;
var attackDirectionPly1 = true;
weaponMove1 = function(){
    if(attackDirectionPly1){
        ply1.winkel += 14.5;
    }else{
        ply1.winkel -= 14.5;
    }
    neuZeichnen();
}

function weaponReset1(){
    clearInterval(ply1.interval);
    if(attackDirectionPly1){
        attackDirectionPly1 = false; 
        ply1.winkel = 203;
    }else{
        attackDirectionPly1 = true; 
        ply1.winkel = -14.5;
    }
    ply1.interval = "";
    neuZeichnen();
    attackStopPly1 = true;
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
}
