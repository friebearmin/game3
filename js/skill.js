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
const weaponTypes = ['mac', 'polearm', 'axe', 'sword', 'rod', 'dagger', 'katana'];
class Weapon{
    constructor(name, player, size) {
        this.name = name;
        this.skill = new Skill();
        this.player = player;
        //this.angle = 45;
        this.angle = 0;
        this.anglePhp = 0;
        this.angle1 = 0;
        this.angle2 = 0;
        this.angleTime1 = 0;
        this.angleTime2 = 0;
        this.loop;
        this.coords = [];
        /* wird nicht gebraucht
        this.coords1;
        this.coords2;
        this.coords3;
        this.coords4;
        */
        this.moveX = 0;
        this.moveY = 0;
        this.moveXY = 1;
        this.weaponShiftX = 0;
        this.weaponInNoUse = true;
        this.useWeapon1 = false;
        this.useWeapon2 = false;
        this.useWeaponAttackAndStop = false;
        this.moveWeaponDirection = 1;
        this.testPointX = 0;
        this.testPointY = 0;
        this.weaponRotationPoint;
        this.weaponAttackPoints = [];
        switch(this.name){
            case weaponTypes[0]:
                //hammer
                this.weaponRotationPoint = new Point(0,0);//new Point(48,47);
                this.angle = 0;
                this.weaponAttackPoints.push(new Point(2*areaSize/2,0));
                this.weaponAttackPoints.push(new Point(3*areaSize/2,0));
                this.weaponAttackPoints.push(new Point(4*areaSize/2,0));
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
                imageWeapon.onload = imageIsLoaded;
                imageWeapon.src = imagePreLinkName+"axe.png";
                break;
            case weaponTypes[3]:
                //sword
                imageWeapon.onload = imageIsLoaded;
                //imageWeapon.src = imagePreLinkName+"magicSword.png";
                imageWeapon.src = imagePreLinkName+"17/17_only_mac_64_64.png";
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
        ctx.fillStyle = "#333300";
        ctx.strokeStyle = "black";
        ctx.translate(xCe+this.weaponRotationPoint.x, yCe+this.weaponRotationPoint.y);
        let tmp = 0;
        ctx.rotate(-(this.angle+tmp) * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, -5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, -5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(40+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(45+this.moveX-this.weaponRotationPoint.x+17, 0+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(40+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, 5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, 5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(0+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(0+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.stroke(); 
        ctx.fill();
        if(key8Pressed){
            drawCircle(ctx,2*areaSize/2,0, 2, 'red');
            drawCircle(ctx,3*areaSize/2,0, 2, 'red');
            drawCircle(ctx,4*areaSize/2,0, 2, 'red');
        }
        //ctx.fillRect(0+this.moveX-this.weaponRotationPoint.x-areaSize, 0+this.moveY-this.weaponRotationPoint.y-areaSize, areaSize/10, areaSize*2);
        ctx.rotate((this.angle+tmp) * Math.PI / 180);
        ctx.translate(-xCe-this.weaponRotationPoint.x, -yCe-this.weaponRotationPoint.y);
    }
	renderOpponentPlayer = function(ctx, xS, yS, addAngel){
        ctx.fillStyle = "#333300";
        ctx.strokeStyle = "black";
        ctx.translate(xS+this.weaponRotationPoint.x, yS+this.weaponRotationPoint.y);
        let tmp = addAngel;
        ctx.rotate(-(this.angle+tmp) * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, -5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, -5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(40+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(45+this.moveX-this.weaponRotationPoint.x+17, 0+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(40+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(7+this.moveX-this.weaponRotationPoint.x+17, 5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, 5+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(5+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(0+this.moveX-this.weaponRotationPoint.x+17, 1+this.moveY-this.weaponRotationPoint.y);
        ctx.lineTo(0+this.moveX-this.weaponRotationPoint.x+17, -1+this.moveY-this.weaponRotationPoint.y);
        ctx.stroke(); 
        ctx.fill();
        //ctx.fillRect(0+this.moveX-this.weaponRotationPoint.x-areaSize, 0+this.moveY-this.weaponRotationPoint.y-areaSize, areaSize/10, areaSize*2);
        ctx.rotate((this.angle+tmp) * Math.PI / 180);
        ctx.translate(-xS-this.weaponRotationPoint.x, -yS-this.weaponRotationPoint.y);
    }
	update = function(){
	    let now = Date.now();
        let angleNow = (this.angle2-this.angle1)*Math.min((now-this.angleTime1)/(this.angleTime2-this.angleTime1),1)+this.angle1;
	    this.angle = angleNow;
	    if(this.player.isPlayer && this.player.lifePoints > 0 && writeToServer){
	        if(now < this.angleTime2){
                let weaponAttackPointsToUse = this.calculateAttackPoints();
                for(let i = 0; i< weaponAttackPointsToUse.length; i++){
                    //TODO 10.10.2021 nächste Zeile ist ein boolen und wenn gegenspieler getroffen, dann was machen
                    let hitObjectID = this.player.areaManager.checkPointMatrixGetID(weaponAttackPointsToUse[i]);
                    if(hitObjectID > 0){
                        writeToServer = false; //wird in dataHitToServer (in der main) nach Serverkontakt auf true gesetzt
                        let hitOpponentPlayer = false;
                        if(opponentIDs.includes(hitObjectID)){
                            hitOpponentPlayer = true;
                        }
                        dataHitToServer(hitOpponentPlayer);
                        break;
                    }
                }
            }
        }
    }
	angleUpdate = function(angleWeapon1,angleWeapon2,angleWeaponTime1,angleWeaponTime2){
        this.angle1 = angleWeapon1;
        this.angle2 = angleWeapon2;
        this.angleTime1 = angleWeaponTime1;
        this.angleTime2 = angleWeaponTime2;
    }
    calculateAttackPoints = function(){
        let addAngle = 0;
        if(this.player.eyeX == 1){
            addAngle = -90;
        }else if(this.player.eyeX == -1){
            addAngle = 90;
        }else if(this.player.eyeY == 1){
            addAngle = 180;
        }
        let weaponAttackPointsToUse = [];
        for(let i = 0; i< this.weaponAttackPoints.length; i++){
            weaponAttackPointsToUse.push(this.weaponAttackPoints[i].turnPoint(this.angle+addAngle, 0,0));
        }
        for(let i = 0; i< weaponAttackPointsToUse.length; i++){
            weaponAttackPointsToUse[i].x += this.player.x;
            weaponAttackPointsToUse[i].y += this.player.y;
        }
        return weaponAttackPointsToUse;
    }
    printAttackPoints = function(){
        console.log('printAttackPoints');
        /*
        let point1 = new Point(2*areaSize/2,0);
        let point2 = new Point(3*areaSize/2,0);
        let point3 = new Point(4*areaSize/2,0);
        let addAngle = 0;
        if(this.player.eyeX == 1){
            addAngle = -90;
        }else if(this.player.eyeX == -1){
            addAngle = 90;
        }else if(this.player.eyeY == 1){
            addAngle = 180;
        }
        let turnpoint1 = point1.turnPoint(this.angle+addAngle, 0,0);
        let turnpoint2 = point2.turnPoint(this.angle+addAngle, 0,0);
        let turnpoint3 = point3.turnPoint(this.angle+addAngle, 0,0);
        turnpoint1.x += this.player.x;
        turnpoint1.y += this.player.y;
        turnpoint2.x += this.player.x;
        turnpoint2.y += this.player.y;
        turnpoint3.x += this.player.x;
        turnpoint3.y += this.player.y;
        console.log('player x: '+ this.player.x + ' y: ' + this.player.y);
        console.log('point1 x: '+ turnpoint1.x + ' y: ' + turnpoint1.y);
        console.log('point2 x: '+ turnpoint2.x + ' y: ' + turnpoint2.y);
        console.log('point3 x: '+ turnpoint3.x + ' y: ' + turnpoint3.y);
        */
        console.log('player x: '+ this.player.x + ' y: ' + this.player.y);
        let weaponAttackPointsToUse = this.calculateAttackPoints();
        for(let i = 0; i< weaponAttackPointsToUse.length; i++){
            console.log('point'+i+' x: '+ weaponAttackPointsToUse[i].x + ' y: ' + weaponAttackPointsToUse[i].y);
        }
    }
}
