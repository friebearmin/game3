document.onkeydown = function(event) {
	// 1-Taste 
	if (event.keyCode == 49 && attackStopPly1) {	
        clearInterval(ply1.interval);
		attackStopPly1 = false;
		ply1.attackGo();
		ply1.interval = setInterval(weaponMove1, 20);
		setTimeout(weaponReset1, 300);
		return;
	}	
	// 2-Taste 
	if (event.keyCode == 50) {	
	    if(ply1.attackStop){
            clearInterval(ply1.interval);
            ply1.attackStop = false;
            ply1.interval = setInterval( function(){ply1.weaponMove();}, 20);
            setTimeout(function(){ply1.stopAttack();}, 300);
        }
    }	
	// 3-Taste 
	if (event.keyCode == 51) {	
	    if(ply1.attackStop){
            clearInterval(ply1.interval);
            ply1.attackStop = false;
            ply1.attackLance();
            ply1.interval = setInterval( function(){ply1.weaponMove();}, 20);
            setTimeout(function(){
                ply1.stopAttack2();
                ply1.attackDirection = false; 
                ply1.interval = setInterval( function(){ply1.attackLance();}, 20);
                setTimeout(function(){
                    clearInterval(ply1.interval);
                    ply1.interval = setInterval( function(){ply1.attackLanceBack();}, 20);
                    setTimeout(function(){
                        ply1.stopAttack();
                    }, 100);
                }, 100);
            }, 160);
        }
    }
	// 4-Taste 
	if (event.keyCode == 52) {	
	    key4Pressed = true; 
    }

	// W-Taste
	if (event.keyCode == 87) {
        keyWPressed = true;
	    return;	}	
	// D-Taste
	if (event.keyCode == 68) {
	    if(ply1.eyeX == 1){
            ply1.eyeX = 0;
            ply1.eyeY = 1;
            return;
        }
	    if(ply1.eyeX == -1){
            ply1.eyeX = 0;
            ply1.eyeY = -1;
            return;
        }
	    if(ply1.eyeY == -1){
            ply1.eyeX = 1;
            ply1.eyeY = 0;
            return;
        }
	    if(ply1.eyeY == 1){
            ply1.eyeX = -1;
            ply1.eyeY = 0
            return;
        }
    }	
    // A-Taste
	if (event.keyCode == 65) {
	    if(ply1.eyeX == 1){
            ply1.eyeX = 0;
            ply1.eyeY = -1;
            return;
        }
	    if(ply1.eyeX == -1){
            ply1.eyeX = 0;
            ply1.eyeY = 1;
            return;
        }
	    if(ply1.eyeY == -1){
            ply1.eyeX = -1;
            ply1.eyeY = 0;
            return;
        }
	    if(ply1.eyeY == 1){
            ply1.eyeX = 1;
            ply1.eyeY = 0
            return;
        }
    }	
    // Q-Taste
	if (event.keyCode == 81) {
        keyQPressed = true;
    }	
	// E-Taste
	if (event.keyCode == 69) {
        keyEPressed = true;
	}	
    // S-Taste
	if (event.keyCode == 83) {
        keySPressed = true;
	}	
}
document.onkeyup = function(event) {
	// W-Taste
	if (event.keyCode == 87) {
        keyWPressed = false;
    }
	if (event.keyCode == 69) {
        keyEPressed = false;
    }
	if (event.keyCode == 81) {
        keyQPressed = false;
    }
	if (event.keyCode == 83) {
        keySPressed = false;
    }
}
