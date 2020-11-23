$(document).ready(function(e) {

    loadData();
    
    
    dt = dynamicTable.config('data-table', 
                                 ['skill', 'level', 'repetition', 'totalRepetitions', 'malus', 'totalMalusRepetitions', 'power'], 
                                 ['Skill', 'Level', 'Repetitions', 'Total Repetitions', 'Malus-Value', 'Total Malus-Value', 'Skill-Power'], //set to null for field names instead of custom header names
                                 'There are no items to list...');
    
    
    $('#btn-1').click(function(e) {
        dt.load(data1);
    });
    
    $('#btn-2').click(function(e) {
        let tmp = skillArray[0].giveNewRepetitions(10);
        skillArray[1].giveMalusRepetitions(tmp);
        skillArray[2].giveMalusRepetitions(tmp);
        console.info(skillArray[0].name+" erzeugte "+tmp+" Malus-Punkte"); 
        loadData();
        dt.load(data1);
    });
    
    $('#btn-3').click(function(e) {
        let tmp = skillArray[1].giveNewRepetitions(10);
        skillArray[0].giveMalusRepetitions(tmp);
        skillArray[2].giveMalusRepetitions(tmp);
        console.info(skillArray[1].name+" erzeugte "+tmp+" Malus-Punkte"); 
        loadData();
        dt.load(data1);
    });
    
    $('#btn-4').click(function(e) {
        if(itsStop) {
            itsStop = false;
            window.clearInterval(timeSaver);
        } else {
            timeSaver = window.setInterval(getRepetition3, 10);	
            itsStop = true;	
        }
    });
    
});    
let dt;
let skillArray = [];

skillArray.push(new Skill("Schwert"));
skillArray.push(new Skill("Bogen"));
skillArray.push(new Skill("Feuerball"));
skillArray.push(new Skill("Eisspeer"));
skillArray.push(new Skill("Dolch"));
skillArray.push(new Skill("Streitkolben"));
skillArray.push(new Skill("Axt"));
for(let i = 0; i<skillArray.length;i++){
    skillArray[i].checkNextMalusRepetition();
}
var data1;
function loadData(){
    data1 = [];
    for(let i = 0; i<skillArray.length;i++){
        data1.push({ skill: skillArray[i].name,
            level: skillArray[i].currentLevel,
            repetition: skillArray[i].currentRepetitions+" / "+skillArray[i].nextLevelRepetitions,
            totalRepetitions: skillArray[i].totalRepetitions,
            malus: skillArray[i].counterMalusRepetitions+" / "+skillArray[i].nextMalusRepetitions,
            totalMalusRepetitions: skillArray[i].totalMalusRepetitions,
            power: skillArray[i].power});
    }
}

let timeSaver;
let itsStop = false;
let repeatCounter = 0;
function getRepetition(){
    //let whichSkill = Math.floor((Math.random() * skillArray.length))-1;
    //let whichSkill = Math.round(Math.random()) + Math.round(Math.random());
    //let whichSkill = Math.round(Math.random()) + Math.round(Math.random()) + Math.round(Math.random());
    let whichSkill = 0;
    //let whichSkill = Math.round(Math.random());
    if(whichSkill >= 0 && whichSkill < skillArray.length){
        repeatCounter+=50;
        let tmp = skillArray[whichSkill].giveNewRepetitions(50);
        for(let i = 0; i<skillArray.length;i++){
            if(i != whichSkill){
                skillArray[i].giveMalusRepetitions(tmp);
            }
        }
        loadData();
        dt.load(data1);
        if(repeatCounter>1300000){
            itsStop = false;
            window.clearInterval(timeSaver);
            repeatCounter = 0;
        }
    }
}
let testBool0 = true; 
let testBool1 = true; 
let testBool2 = true; 
let testBool3 = true; 
let testBool4 = true; 
let testBool5 = true; 
let testBool6 = true; 
function getRepetition2(){
    //let whichSkill = Math.round(Math.random()*2);
    //let whichSkill = Math.floor((Math.random() * 4));
    let whichSkill = 0;
    for(let j = 0; j<skillArray.length;j++){
        if(skillArray[whichSkill].currentLevel >= 30){
            whichSkill = j;
        }
    }
    if(skillArray[0].currentLevel >= 30){
        if(testBool0){
            testBool0 = false; 
            console.info("1. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
        }
        if(skillArray[1].currentLevel >= 30){
            if(testBool1){
                testBool1 = false; 
                console.info("2. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
            }
            if(skillArray[2].currentLevel >= 30){
                if(testBool2){
                    testBool2 = false; 
                    console.info("3. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
                }
                if(skillArray[3].currentLevel >= 30){
                    if(testBool3){
                        testBool3 = false; 
                        console.info("4. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
                    }
                    if(skillArray[4].currentLevel >= 30){
                        if(testBool4){
                            testBool4 = false; 
                            console.info("5. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
                        }
                        if(skillArray[5].currentLevel >= 30){
                            if(testBool5){
                                testBool5 = false; 
                                console.info("6. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
                            }
                            if(skillArray[6].currentLevel >= 30){
                                if(testBool6){
                                    testBool6 = false; 
                                    console.info("7. Lvl 30 nach "+repeatCounter+" Wiederholungen."); 
                                    itsStop = false;
                                    window.clearInterval(timeSaver);
                                    repeatCounter = 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /*
    if(skillArray[whichSkill].currentLevel >= 20){
        whichSkill = (whichSkill + 1)%4;
        if(skillArray[whichSkill].currentLevel >= 20){
            whichSkill = (whichSkill + 1)%4;
            if(skillArray[whichSkill].currentLevel >= 20){
                whichSkill = (whichSkill + 1)%4;
                if(skillArray[whichSkill].currentLevel >= 20){
                    itsStop = false;
                    window.clearInterval(timeSaver);
                    repeatCounter = 0;
                    whichSkill = -1;
                }
            }
        }
    }
    if(skillArray[whichSkill].currentLevel >= 20){
        itsStop = false;
        window.clearInterval(timeSaver);
        repeatCounter = 0;
        whichSkill = -1;
    }
    */
    if(whichSkill >= 0 && whichSkill < skillArray.length){
        repeatCounter+=30;
        let tmp = skillArray[whichSkill].giveNewRepetitions(30);
        for(let i = 0; i<skillArray.length;i++){
            if(i != whichSkill){
                skillArray[i].giveMalusRepetitions(tmp);
            }
        }
        loadData();
        dt.load(data1);
        if(repeatCounter>350000){
            itsStop = false;
            window.clearInterval(timeSaver);
            repeatCounter = 0;
        }
    }
}
function getRepetition3(){
    let whichSkill = Math.floor((Math.random() * skillArray.length))-1;
    //let whichSkill = Math.round(Math.random()) + Math.round(Math.random());
    //let whichSkill = Math.round(Math.random()) + Math.round(Math.random()) + Math.round(Math.random());
    //let whichSkill = 0;
    //let whichSkill = Math.round(Math.random());
    if(whichSkill >= 0 && whichSkill < skillArray.length){
        repeatCounter+=1;
        let tmp = skillArray[whichSkill].giveNewRepetitions(1);
        for(let i = 0; i<skillArray.length;i++){
            if(i != whichSkill){
                skillArray[i].increaseNotUse();
            }
        }
        loadData();
        dt.load(data1);
        if(repeatCounter>1300000){
            itsStop = false;
            window.clearInterval(timeSaver);
            repeatCounter = 0;
        }
    }
}
