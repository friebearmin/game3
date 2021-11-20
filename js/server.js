//Check Email if this is valid.
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// 19.10.2021
function manageObjectsFromServer(datas){
    for(let index in datas){
        let id = parseInt(datas[index][1]);
        let objectType = datas[index][2];
        let x = parseInt(datas[index][3]);
        let y = parseInt(datas[index][4]);
        let lifePoints = parseInt(datas[index][7]);
        let objectSettings = datas[index][8];
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
    }
    // ? Sollen Objekte aus dem matrixIndex-Array gelöscht werden, wenn sie nicht gebraucht werden ?
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
