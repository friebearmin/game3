//Ein Verweis um die Zeitschleife zu deaktivieren
let intervalDurationMove = 200;
let imageWapeon = document.createElement("IMG");
let breite = 0;
let hoehe = 0;
const areaSize = 32;
const moveSize1 = 3;
const moveSize2 = 1;
const moveSize3 = 3;

class Spieler {
    constructor(id, areaManager, color) {
        this.id = id;
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
        this.weapon = new Weapon('mac',this, 2);
        this.coords1;
        this.coords2;
        this.coords3;
        this.coords4;
        this.weaponShiftX = 0;
        this.weaponShiftY = 0;
        this.weaponTyp = 0;
        this.isPlayer = true;
        this.attackStop = true;
        this.attackDirection = true;
        this.color = color;
        this.testCounter = 0;

        this.imageArray = [];
        /*
        this.imageLinks = ["17/17_only_shield_64_64.png", "17/17_only_mac_64_64.png",
            "17/17_only_legg_l_64_64.png", "17/17_only_legg_r_64_64.png", 
            "17/17_only_body_64_64.png", "17/17_only_hand_r_64_64.png", 
            "17/17_only_hand_l_64_64.png", "17/17_only_arm_r_64_64.png",
            "17/17_only_arm_l_64_64.png", "17/17_only_shoulder_r_64_64.png",
            "17/17_only_shoulder_l_64_64.png", "17/17_only_head_64_64.png"];
        for(let i=0;i<12;i++){
            this.imageArray[i] = new Image();
            this.imageArray[i].onload = imageIsLoaded;
            this.imageArray[i].src = imagePreLinkName+this.imageLinks[i];
        }
        */
        this.xMI = [0,0,0,0,0,0,0,0,0,0,0,0];
        this.yMI = [0,0,0,0,0,0,0,0,0,0,0,0];

        this.isMoved = false;
        this.isMovedChangeX = 1;
        this.isMovedChangeY = 1;
        this.lifePoints = 100;
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
	update = function(){
	    if(this.lifePoints <= 0){return;}
        this.weapon.update();
        if(keyPressedRunForward){
            this.isMoved = true;
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
        }
        if(keyPressedRunRight){
            this.isMoved = true;
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
        if(keyPressedRunLeft){
            this.isMoved = true;
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
        if(keyPressedRunBack){
            this.isMoved = true;
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
    }
	render = function(ctx, xS, yS){
	    if(this.lifePoints <= 0){
            let lineWidth = 4;
            let xPos = areaSize*7;
            let yPos = areaSize*7;
            
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(4+xPos, 10+yPos, areaSize-2*lineWidth, lineWidth);  
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(14+xPos, 0+yPos, lineWidth, areaSize);
            ctx.stroke();
            ctx.fill();
	        return;
	    }

        if(this.isMoved){
            //this.yMI[0] -= this.isMovedChangeY;
            //this.yMI[1] += this.isMovedChangeY;
            this.yMI[2] += this.isMovedChangeY;
            this.yMI[3] -= this.isMovedChangeY;
            this.yMI[5] += this.isMovedChangeY;
            this.yMI[6] -= this.isMovedChangeY;
            this.yMI[7] += this.isMovedChangeY;
            this.yMI[8] -= this.isMovedChangeY;
            this.yMI[9] += this.isMovedChangeY;
            this.yMI[10] -= this.isMovedChangeY;
            this.xMI[11] = this.isMovedChangeY;
            if(this.yMI[10] > 5){
                this.isMovedChangeY = 1;
            }
            if(this.yMI[10] < -5){
                this.isMovedChangeY = -1;
            }
            this.isMoved = false;
        }
        /*
        for(let i=2;i<12;i++){
            ctx.drawImage(this.imageArray[i], 0, 0, 64, 64, xCe-areaSize+this.xMI[i], yCe-areaSize+this.yMI[i], 2*areaSize, 2*areaSize);
        }
        */
        let cX = xCe;
        let cY = yCe;
        let cR = areaSize/2;
        let p0 = new Point(cX+cR,cY);
        let p45 = p0.turnPoint(45,cX, cY);
        let p90 = new Point(cX, cY-cR);
        let p135 = p0.turnPoint(135,cX, cY);
        let p180 = new Point(cX-cR,cY);
        let p225 = p0.turnPoint(225,cX, cY);
        let p270 = new Point(cX, cY+cR);
        let p315 = p0.turnPoint(315,cX, cY);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(p135.x, p135.y);
        ctx.lineTo(cX-30, cY+this.yMI[2]);
        ctx.lineTo(p225.x, p225.y);
        ctx.lineTo(p315.x, p315.y);
        ctx.lineTo(cX+30, cY+this.yMI[3]);
        ctx.lineTo(p45.x, p45.y);
        ctx.stroke(); 
        drawCircle(ctx,cX,cY, cR, this.color);
        let lifePercentage = Math.max(Math.min(1,this.lifePoints/100),0);
        let cR2 = lifePercentage*(areaSize-4)/2;
        drawCircle(ctx,cX,cY, cR2, "#ff5050");
        //this.spell.draw(ctx, xS, yS);
        this.weapon.render(ctx, xS, yS);
    }
    beingAttacked = function(attackPoint){
        return false;
    }
    //Is used in touchEvent.js and keyboardEvent.js!
    toExamineInFrontOfYou = function(){
        let checkPoint = new Point(this.x,this.y);
        let hitObjectID = false;;
        for(let i = 1;i<30;i++){
            checkPoint.x += this.eyeX*areaSize;
            checkPoint.y += this.eyeY*areaSize;
            hitObjectID = this.areaManager.checkPointMatrixGetID(checkPoint);
            if(hitObjectID !== false){
                break;
            }
        }
        if(hitObjectID !== false){
            console.log('Objekt mit id: '+  hitObjectID + ' vor dem Spieler.');
        }else{
            console.log('Kein Objekt vor dem Spieler oder fehler in der Berechnung.');
        }
    }
}

class Cube {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = "#307663";
    }
    update = function(ctx){
	    return false;
    }
	render = function(ctx, xS, yS){
	    //Rechteck für den Körper
	    ctx.fillStyle = this.color;
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
    beingAttacked = function(attackPoint){
        //var ind;
        //for(ind in attackPoints){
        if(this.isPointIn(attackPoint)){
            return true;
        }
        //}
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
        this.imageData.src = imagePreLinkName+"vase_1.png";
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
    beingAttacked = function(attackPoint){
        //var ind;
        //for(ind in attackPoints){
        if(this.life > 0 && this.isPointIn(attackPoint)){
            this.life -= 1;
            this.state -= 1;
            this.somethingChanged = true;
            console.log("Vase wurde angegriffen.");
            return true;
        }
        //}
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
                this.imageData.src = imagePreLinkName+"vase_1.png";
            }else if(this.state == 4){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = imagePreLinkName+"vase_2.png";
            }else if(this.state == 3){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = imagePreLinkName+"vase_3.png";
            }else if(this.state == 2){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = imagePreLinkName+"vase_4.png";
            }else if(this.state == 1){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = imagePreLinkName+"vase_5.png";
            }else if(this.state == 0){
                this.imageData = new Image();
                this.imageData.onload = imageIsLoaded;
                this.imageData.src = imagePreLinkName+"vase_6.png";
            }else{
                this.existIt  = false;
            }
            
        }
    }
}

class OpponentPlayer {
    constructor(id, startX, startY, name, areaManager, color) {
        console.log('OpponentPlayer was created, id: '+id);
        this.id = id;
        this.areaManager = areaManager;
        this.x = startX;
        this.y = startY;
        this.name = name;
        this.eyeX = 0;
        this.eyeY = -1;
        this.winkel = 0;
        this.interval;
        this.spell;
        this.weapon = new Weapon('mac',this, 2);
        this.testCounter = 0;
        this.xMI = [0,0,0,0,0,0,0,0,0,0,0,0];
        this.yMI = [0,0,0,0,0,0,0,0,0,0,0,0];
        this.isPlayer = false;

        this.isMoved = false;
        this.isMovedChangeX = 1;
        this.isMovedChangeY = 1;
        this.lifePoints = 100;
        this.color = color;
    }
	toConsole = function() {
        console.log('Ich bin ein OpponentPlayer.');
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
    }
	render = function(ctx, xS, yS){
	    if(this.lifePoints <= 0){
            let lineWidth = 4;
            let xPos = this.x+xS;
            let yPos = this.y+yS;
            
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(4+xPos, 10+yPos, areaSize-2*lineWidth, lineWidth);  
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(14+xPos, 0+yPos, lineWidth, areaSize);
            ctx.stroke();
            ctx.fill();
	        return;
        }
        //console.log('OpponentPlayer was drawn.');
        let cX = this.x+xS;
        let cY = this.y+yS;
        let cR = areaSize/2;
        let addAngel = 0;
        if(this.eyeX == 1){
            addAngel = -90;
        }else if(this.eyeX == -1){
            addAngel = 90;
        }else if(this.eyeY == 1){
            addAngel = 180;
        }
        let p0 = new Point(cX+cR,cY);
        let p45 = p0.turnPoint(45+addAngel,cX, cY);
        let p90 = new Point(cX, cY-cR);
        let p135 = p0.turnPoint(135+addAngel,cX, cY);
        let p180 = new Point(cX-cR,cY);
        let p225 = p0.turnPoint(225+addAngel,cX, cY);
        let p270 = new Point(cX, cY+cR);
        let p315 = p0.turnPoint(315+addAngel,cX, cY);
        let pArmL = new Point(cX-2*cR, cY+this.yMI[2]);
        pArmL = pArmL.turnPoint(addAngel,cX, cY);
        let pArmR = new Point(cX+2*cR, cY+this.yMI[3]);
        pArmR = pArmR.turnPoint(addAngel,cX, cY);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(p135.x, p135.y);
        ctx.lineTo(pArmL.x, pArmL.y);
        ctx.lineTo(p225.x, p225.y);
        ctx.lineTo(p315.x, p315.y);
        ctx.lineTo(pArmR.x, pArmR.y);
        ctx.lineTo(p45.x, p45.y);
        ctx.stroke();
        drawCircle(ctx,cX,cY, cR, this.color);
        let lifePercentage = Math.max(Math.min(1,this.lifePoints/100),0);
        let cR2 = lifePercentage*(areaSize-4)/2;
        drawCircle(ctx,cX,cY, cR2, "#ff5050");
        this.weapon.renderOpponentPlayer(ctx, cX, cY, addAngel);
    }
    beingAttacked = function(attackPoint){
        return false;
    }
    isPointIn = function(point){
	    if(this.lifePoints <= 0){
            return false;
        }
	    if(Math.sqrt((this.x-point.x)*(this.x-point.x)+(this.y-point.y)*(this.y-point.y))<areaSize/2){
            return true;
        }
        return false;
    }
	newPosition = function(x,y){
	    if(x != this.x && y != this.y){
            if(this.areaManager.newPositionOfObject(x,y,this)){
                this.x = x;
                this.y = y;
            }
        }
    }
}
