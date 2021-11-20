function testCalculateMatrixPosition(){
    if(areaManager1){
        let usedfct = areaManager1.calculateMatrixPosition;
        if(!arraysEqual(areaManager1.calculateMatrixPosition(0,0),[0,0,0,0])){ console.log('Unittest Fehler by 1.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50,50),[0,0,0,0])){ console.log('Unittest Fehler by 2.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240,50),[0,0,1,0])){ console.log('Unittest Fehler by 3.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340,50),[0,0,1,0])){ console.log('Unittest Fehler by 4.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50,240),[0,0,0,1])){ console.log('Unittest Fehler by 5.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50,340),[0,0,0,1])){ console.log('Unittest Fehler by 6.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240,240),[0,0,1,1])){ console.log('Unittest Fehler by 7.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340,340),[0,0,1,1])){ console.log('Unittest Fehler by 8.'); }

        let xCh = 480;
        let yCh = 480;
        let lsg1 = 1;
        let lsg2 = 1;
        let printVal = 8;
        if(!arraysEqual(areaManager1.calculateMatrixPosition(xCh,yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+1)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,50+yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+2)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+3)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+4)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,240+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+5)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,340+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+6)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,240+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+7)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,340+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+8)+'.'); }

        xCh = 0;
        yCh = 480;
        lsg1 = 0;
        lsg2 = 1;
        printVal = 16;
        if(!arraysEqual(areaManager1.calculateMatrixPosition(xCh,yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+1)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,50+yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+2)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+3)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+4)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,240+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+5)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,340+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+6)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,240+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+7)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,340+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+8)+'.'); }

        xCh = 480;
        yCh = 0;
        lsg1 = 1;
        lsg2 = 0;
        printVal = 24;
        if(!arraysEqual(areaManager1.calculateMatrixPosition(xCh,yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+1)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,50+yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+2)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+3)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+4)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,240+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+5)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,340+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+6)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,240+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+7)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,340+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+8)+'.'); }

        xCh = -480;
        yCh = 0;
        lsg1 = -1;
        lsg2 = 0;
        printVal = 24;
        if(!arraysEqual(areaManager1.calculateMatrixPosition(xCh,yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+1)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,50+yCh),[lsg1,lsg2,0,0])){ console.log('Unittest Fehler by '+(printVal+2)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+3)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,50+yCh),[lsg1,lsg2,1,0])){ console.log('Unittest Fehler by '+(printVal+4)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,240+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+5)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(50+xCh,340+yCh),[lsg1,lsg2,0,1])){ console.log('Unittest Fehler by '+(printVal+6)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(240+xCh,240+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+7)+'.'); }
        if(!arraysEqual(areaManager1.calculateMatrixPosition(340+xCh,340+yCh),[lsg1,lsg2,1,1])){ console.log('Unittest Fehler by '+(printVal+8)+'.'); }

        console.log('Wir sind fertig mit dem testCalculateMatrixPosition, Fehler wurden angezeigt.');
    }else{
        console.log('Kein areaManager1 zum testen in testCalculateMatrixPosition vorhanden.');
    }
}
