let initialRepetitionsValue = 100;
let leveRate = 1.1;
let powerRate = 1.01;
let numberOfSkills = 0;


class Skill{
    constructor(name) {
        numberOfSkills++;
        this.name = name;
        this.currentLevel = 1;
        this.power = 1;
        //Repetitions
        this.totalRepetitions = 0;
        this.totalRepetitionsWithMalus = 0;
        this.currentRepetitions = 0;
        this.nextLevelRepetitions = getNextLevelRepetitions(this.currentLevel);
        //Malus Repetitons for other skills
        this.totalMalusRepetitions = 0;
        this.nextMalusRepetitions = getNextMalusRepetitions(this.currentLevel);
        this.counterMalusRepetitions = 0;
        //
        this.counterNotUse = 0;
    }

    //functions of skill
    newRepetition = function() {
        this.totalRepetitions ++;
        this.totalRepetitionsWithMalus ++;
        this.currentRepetitions ++;
        this.counterMalusRepetitions ++;
        this.counterNotUse = 0;

        this.checkLevel();
        let malusValue = this.checkMalus();
        return malusValue;
    }
    giveNewRepetitions = function(numberRep) {
        if (Number.isInteger(numberRep) && numberRep > 0){
            this.totalRepetitions += numberRep;
            this.totalRepetitionsWithMalus += numberRep;
            this.currentRepetitions += numberRep;
            this.counterMalusRepetitions += numberRep;

            this.checkLevel();
            let malusValue = this.checkMalus();
            this.checkNextMalusRepetition();
            return malusValue;
        }
        return 0;
    }
    giveMalusRepetitions = function(numberMalus) {
        if (Number.isInteger(numberMalus) && numberMalus > 0){
            this.totalRepetitionsWithMalus -= numberMalus;
            this.currentRepetitions -= numberMalus;
            this.checkLevel();
        }
    }
    increaseNotUse = function(){
        this.counterNotUse ++;
        if(this.counterNotUse > numberOfSkills){
            this.giveMalusRepetitions(1);
            this.counterNotUse = 0;
        }
    }
    checkLevel = function() {
        if(this.currentRepetitions>=this.nextLevelRepetitions){
            //Level Up
            this.currentLevel++;
            this.power = getSkillPower(this.currentLevel);
            this.currentRepetitions -= this.nextLevelRepetitions;
            this.nextLevelRepetitions = getNextLevelRepetitions(this.currentLevel);
            this.checkLevel();

        }else if(this.currentRepetitions<0){
            if(this.currentLevel > 1){
            //Level Down
            this.currentLevel--;
            this.power = getSkillPower(this.currentLevel);
            this.nextLevelRepetitions = getNextLevelRepetitions(this.currentLevel);
            this.currentRepetitions = this.currentRepetitions+this.nextLevelRepetitions;
            this.checkLevel();
            }else{
                if(this.currentLevel < 1){
                    console.error("The currentLevel is lower then 1."); 
                    this.currentLevel = 1;
                    this.power = 1;
                }
                this.nextLevelRepetitions = getNextLevelRepetitions(this.currentLevel);
                this.currentRepetitions = 0;
            }
        }
    }
    checkMalus = function() {
        if(this.counterMalusRepetitions>=this.nextMalusRepetitions){
            this.counterMalusRepetitions -= this.nextMalusRepetitions;
            this.totalMalusRepetitions++;
            return 1 + this.checkMalus();
        }
        return 0;
    }
    checkNextMalusRepetition = function() {
        this.nextMalusRepetitions = getNextMalusRepetitions(this.currentLevel);
    }

    //TODO change power depending on the level

}

function getNextLevelRepetitions(level){
    if (Number.isInteger(level) && level > 0){
        return Math.round(Math.pow(leveRate, level-1)*initialRepetitionsValue);
    }else{
        console.error("The function 'getNextLevelRepetitions' didn't get a number greater than zero."); 
        return 10000;
    }
}

function getNextMalusRepetitions(level){
    if (Number.isInteger(level) && level > 0){
        /*
        let proportion = 1/Math.max(numberOfSkills,level);
        return Math.round(proportion*getNextLevelRepetitions(level));
        */
        return Math.max(numberOfSkills,level);
    }else{
        console.error("The function 'getNextMalusRepetitions' didn't get a number greater than zero."); 
        return 10;
    }
}

function getSkillPower(level){
    if (Number.isInteger(level) && level > 0){
        return Math.pow(level,powerRate)-level+1;
    }else{
        console.error("The function 'getSkillPower' didn't get a number greater than zero."); 
        return 1;
    }
}

class Spell{
    constructor(name, player) {
        this.name = name;
        this.skill = new Skill();
        this.player = player;
        this.x1 = -20;
        this.y1 = -20;
        this.x2 = -20;
        this.y2 = -22;
        this.x3 = 20;
        this.y3 = -22;
        this.x4 = 20;
        this.y4 = -20;

        this.x1End = 0;
        this.y1End = 0;
        this.x2End = 0;
        this.y2End = 0;
        this.x3End = 0;
        this.y3End = 0;
        this.x4End = 0;
        this.y4End = 0;
        this.alpha = 0;
        this.loop;
        this.counter = 0;
    }
    repeat = function(){ 
        this.alpha = (this.alpha+9)%360;
        var coords1 = drehePunkt(0, 0, this.x1, this.y1, this.alpha);
        var coords2 = drehePunkt(0, 0, this.x2, this.y2, this.alpha);
        var coords3 = drehePunkt(0, 0, this.x3, this.y3, this.alpha);
        var coords4 = drehePunkt(0, 0, this.x4, this.y4, this.alpha);
        /*
        var coords1 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize, player.y+areaSize/2-areaSize, alpha);
        var coords2 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize, player.y+areaSize/2-areaSize*5/4, alpha);
        var coords3 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize+2*areaSize, player.y+areaSize/2-areaSize*5/4, alpha);
        var coords4 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize+2*areaSize, player.y+areaSize/2-areaSize, alpha);
        */
        
        this.x1End = coords1[0];
        this.y1End = coords1[1];
        this.x2End = coords2[0];
        this.y2End = coords2[1];
        this.x3End = coords3[0];
        this.y3End = coords3[1];
        this.x4End = coords4[0];
        this.y4End = coords4[1];
        /*
        console.log("x1 " + x1 + ' ' + y1);
        console.log("x1 " + this.x2End + ' ' + this.y2End);
        console.log("x1 " + this.x3End + ' ' + this.y3End);
        console.log("x1 " + this.x4End + ' ' + this.y4End);
        */
    }
    update = function(ctx){ 
        if(this.counter > 20){
            this.counter = 0;
            this.alpha = (this.alpha+9)%360;
            var coords1 = drehePunkt(0, 0, this.x1, this.y1, this.alpha);
            var coords2 = drehePunkt(0, 0, this.x2, this.y2, this.alpha);
            var coords3 = drehePunkt(0, 0, this.x3, this.y3, this.alpha);
            var coords4 = drehePunkt(0, 0, this.x4, this.y4, this.alpha);
            /*
            var coords1 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize, player.y+areaSize/2-areaSize, alpha);
            var coords2 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize, player.y+areaSize/2-areaSize*5/4, alpha);
            var coords3 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize+2*areaSize, player.y+areaSize/2-areaSize*5/4, alpha);
            var coords4 = drehePunkt(player.x+areaSize/2, player.y+areaSize/2, player.x+areaSize/2-areaSize+2*areaSize, player.y+areaSize/2-areaSize, alpha);
            */
            
            this.x1End = coords1[0];
            this.y1End = coords1[1];
            this.x2End = coords2[0];
            this.y2End = coords2[1];
            this.x3End = coords3[0];
            this.y3End = coords3[1];
            this.x4End = coords4[0];
            this.y4End = coords4[1];
            /*
            console.log("x1 " + x1 + ' ' + y1);
            console.log("x1 " + this.x2End + ' ' + this.y2End);
            console.log("x1 " + this.x3End + ' ' + this.y3End);
            console.log("x1 " + this.x4End + ' ' + this.y4End);
            */
        }else{
            this.counter++;
        }
    }
	render = function(ctx, xS, yS){
    }

    draw = function(ctx, xS, yS){
        //Rechteck für Eiswand
	    //Eiswand immer vor den Augen
	    /*
        ctx.fillRect(player.x+areaSize/2-player.eyeY*player.eyeY*areaSize+player.eyeX*areaSize,
                     player.y+areaSize/2-player.eyeX*player.eyeX*areaSize+player.eyeY*areaSize,
                areaSize*2*player.eyeY*player.eyeY+areaSize*player.eyeX/5,
                areaSize*2*player.eyeX*player.eyeX+areaSize*player.eyeY/5);
                */
        
	    //Eiswand bewegt sich rum
        ctx.lineJoin = "round";
        ctx.beginPath();
        let xValue = xCe;
        let yValue = yCe;
        ctx.moveTo(xValue+this.x1End, yValue+this.y1End);
        ctx.lineTo(xValue+this.x2End, yValue+this.y2End);
        ctx.lineTo(xValue+this.x3End, yValue+this.y3End);
        ctx.lineTo(xValue+this.x4End, yValue+this.y4End);
        /*
        ctx.moveTo(this.player.x+areaSize/2+this.x1End+xS, this.player.y+areaSize/2+this.y1End+yS);
        ctx.lineTo(this.player.x+areaSize/2+this.x2End+xS, this.player.y+areaSize/2+this.y2End+yS);
        ctx.lineTo(this.player.x+areaSize/2+this.x3End+xS, this.player.y+areaSize/2+this.y3End+yS);
        ctx.lineTo(this.player.x+areaSize/2+this.x4End+xS, this.player.y+areaSize/2+this.y4End+yS);
        */
        ctx.closePath();
	    ctx.fillStyle = "#66ccff";
        ctx.fill();
    }
    beingAttacked = function(xVal1, yVal1, xVal2, yVal2){
        //console.error("Ein Spell wurde angegriffen. Nichts programmiert."); 
    }
}
const weaponTypes = ['hammer', 'polearm', 'axe', 'sword', 'rod', 'dagger', 'katana'];
class Weapon{
    constructor(name, player, size) {
        this.name = name;
        this.skill = new Skill();
        this.player = player;
        this.angle = 45;
        this.loop;
        this.coords = [];
        this.coords1;
        this.coords2;
        this.coords3;
        this.coords4;
        this.moveX = 0;
        this.moveY = 0;
        this.moveXY = 1;
        this.weaponShiftX = 0;
        this.weaponInNoUse = true;
        this.useWeapon1 = false;
        this.useWeapon2 = false;
        this.moveWeaponDirection = 1;
        switch(this.name){
            case weaponTypes[0]:
                //hammer
                this.coords = [
                    new Point(1,0),
                    new Point(1,areaSize*1.5),
                    new Point(areaSize/2,areaSize*1.5),
                    new Point(areaSize/2,areaSize*2),
                    new Point(-areaSize/2,areaSize*2),
                    new Point(-areaSize/2,areaSize*1.5),
                    new Point(-1,areaSize*1.5),
                    new Point(-1,0),
                ];
                break;
            case weaponTypes[1]:
                //polearm
                this.coords = [
                    new Point(1,0),
                    new Point(1,areaSize),
                    new Point(3,areaSize*1.25),
                    new Point(0,areaSize*1.5),
                    new Point(-3,areaSize*1.25),
                    new Point(-1,areaSize),
                    new Point(-1,0),
                ];
                break;
            case weaponTypes[2]:
                //axe
                this.coords = [
                    new Point(1,0),
                    new Point(1,areaSize*1.3),
                    new Point(2,areaSize*1.3),

                    new Point(5,areaSize*1),
                    new Point(7,areaSize*1.3),
                    new Point(7,areaSize*1.5),
                    new Point(5,areaSize*1.8),

                    new Point(2,areaSize*1.5),
                    new Point(1,areaSize*1.5),
                    new Point(1,areaSize*1.6),
                    new Point(-1,areaSize*1.6),
                    new Point(-1,areaSize*1.5),
                    new Point(-2,areaSize*1.5),
                    new Point(-2,areaSize*1.3),
                    new Point(-1,areaSize*1.3),
                    new Point(-1,0)
                ];
                break;
            case weaponTypes[3]:
                //sword
                imageWeapon.onload = imageIsLoaded;
                imageWeapon.src = "magicSword.png";
                break;
            case weaponTypes[4]:
                //rod
                break;
            case weaponTypes[5]:
                //dagger
                break;
            case weaponTypes[6]:
                //katana
                break;
            default:
                this.coords = [];
                this.coords.push(new Point(0,0));
                this.coords.push(new Point(5,0));
                this.coords.push(new Point(5,20));
                this.coords.push(new Point(0,20));
        }
    }
	render = function(ctx, xS, yS){
        var xZero = xCe; var yZero = yCe;
        ctx.translate(xZero, yZero);
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.drawImage(imageWeapon, 0, 0, 128, 128, 0+this.moveX, 0+this.moveY, areaSize*2, areaSize*2);

        /*
        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.lineTo(-1, 0);
        ctx.lineTo(50, 50);
        ctx.closePath();
	    ctx.fillStyle = "#66ccff";
        ctx.fill();
        */

        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(-xZero, -yZero);
    }
	update = function(){
	    if(this.useWeapon1){
            this.weaponMove1();
        }
	    if(this.useWeapon2){
            this.weaponMove2();
        }
	    if(key3Pressed){
            if(this.useWeapon2){
                this.useWeapon2 = false;
                key3Pressed = false;
            }else{
                this.useWeapon2 = true;
                key3Pressed = false;
            }
        }
	    if(key4Pressed){
            if(this.useWeapon1){
                this.useWeapon1 = false;
                key4Pressed = false;
                //this.moveWeaponDirection = -1;
            }else{
                console.log("Weapon is used."); 
                this.useWeapon1 = true;
                key4Pressed = false;
            }
        }
    }
	weaponMove1 = function(){
        this.angle += this.moveWeaponDirection*7;
        let attackBool = false;
        if(this.moveWeaponDirection == 1){
            let winkelTmp = this.angle-135;
            let pointsofWeapon = [];
            for(var i = 0;i<4;i++){
                let xToBeCal = this.player.eyeX*(areaSize+areaSize*i/3);
                let yToBeCal = this.player.eyeY*(areaSize+areaSize*i/3);
                let gedrehtePunkte = drehePunkt(0, 0, xToBeCal, yToBeCal, winkelTmp);
                pointsofWeapon.push(new Point(this.player.x+gedrehtePunkte[0],this.player.y+gedrehtePunkte[1]));
            }
            attackBool = this.player.areaManager.attackArea(pointsofWeapon);
        }
        if(this.angle > 170 || attackBool){
            this.moveWeaponDirection = -1;
        }
        if(this.angle < 46){
            this.moveWeaponDirection = 1;
            this.angle = 45
            this.useWeapon1 = false;
        }
    }
	weaponMove2 = function(){
        this.moveX += 3*this.moveXY;
        this.moveY += 3*this.moveXY;
        if(this.moveX > 20){
            this.moveXY = -1;
        }
        if(this.moveX <= 0){
            this.moveX = 0;
            this.moveY = 0;
            this.moveXY = 1;
            this.useWeapon2 = false;
            if(this.angle > 45){
                this.useWeapon1 = true;
                this.moveWeaponDirection = -1;
            }
        }
    }
}
