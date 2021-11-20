let key1Pressed = false;
let key1WasPressed = false;
let key2Pressed = false;
let key2WasPressed = false;
let key3Pressed = false;
let key4Pressed = false;
let key5Pressed = false;
let key7Pressed = false;
let key8Pressed = false;
let key9Pressed = false;
let key0Pressed = false;
let nameOfKeyPressedRunForward = "W";
let keyPressedRunForward = false;
let nameOfKeyPressedToTurnRight = "U";
let keyPressedToTurnRight = false;
let nameOfKeyPressedToTurnLeft = "Z";
let keyPressedToTurnLeft = false;
let nameOfKeyPressedRunBack = "S";
let keyPressedRunBack = false;
let nameOfKeyPressedRunLeft = "A";
let keyPressedRunLeft = false;
let nameOfKeyPressedRunRight = "D";
let keyPressedRunRight = false;
let keyRPressed = false;
let keyFPressed = false;
let nameOfKeyPressedToRotateRightWeapon = "J";
let keyPressedToRotateRightWeapon = false;
let nameOfKeyPressedToRotateLeftWeapon = "H";
let keyPressedToRotateLeftWeapon = false;
let keyUPressed = false;
let keyUWasPressed = false;
let keyPressedToExamineInFrontOfYou = false;
let keyUpPressed = false;
let keyDownPressed = false;
let keyLeftPressed = false;
let keyRightPressed = false;
document.onkeydown = function(event) {
    if ( event.target.nodeName == 'INPUT' ){
        return;
    }
	// 1-Taste 
	if (event.keyCode == 49) {	
	    key1Pressed = true; 
		return;
	}	
	// 2-Taste 
	if (event.keyCode == 50) {	
	    key2Pressed = true; 
		return;
    }	
	// 3-Taste 
	if (event.keyCode == 51) {	
	    key3Pressed = true; 
		return;
    }
	// 4-Taste 
	if (event.keyCode == 52) {	
	    key4Pressed = true; 
		return;
    }
	// 5-Taste 
	if (event.keyCode == 53) {	
	    key5Pressed = true; 
		return;
    }
	// 7-Taste 
	if (event.keyCode == 55) {	
	    if(key7Pressed){
	        key7Pressed = false; 
            document.getElementById("rightCanvas").style.visibility="visible";
            document.getElementById("leftCanvas").style.visibility="visible";
        }else{
	        key7Pressed = true; 
            document.getElementById("rightCanvas").style.visibility="hidden";
            document.getElementById("leftCanvas").style.visibility="hidden";
        }
		return;
    }
	// 8-Taste 
	if (event.keyCode == 56) {	
	    if(key8Pressed){
	        key8Pressed = false; 
            guideUse = false;
        }else{
	        key8Pressed = true; 
            guideUse = true;
        }
		return;
    }
	// 9-Taste 
	if (event.keyCode == 57) {	
	    key9Pressed = true; 
	    if(ply1){
            writeToServer = true;
	        ply1.weapon.printAttackPoints();
        }
		return;
    }
    // 0-Taste
	if (event.keyCode == 48) {
	    if(key0Pressed){
	        key0Pressed = false; 
        }else{
	        key0Pressed = true; 
        }
        dataExchangeToServer();
		return;
    }
	// W-Taste
	if (event.keyCode == 87) {
        keyPressedRunForward = true;
	    return;	}	
	// D-Taste
	if (event.keyCode == 68) {
        keyPressedRunRight = true;
		return;
    }	
    // A-Taste
	if (event.keyCode == 65) {
        keyPressedRunLeft = true;
		return;
    }	
    // Z-Taste
	if (event.keyCode == 90) {
        keyPressedToTurnLeft = true;
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == 1){
            ply1.eyeX = 0;
            ply1.eyeY = -1;
            return;
        }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == -1){
            ply1.eyeX = 0;
            ply1.eyeY = 1;
            return;
        }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == -1){
            ply1.eyeX = -1;
            ply1.eyeY = 0;
            return;
        }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == 1){
            ply1.eyeX = 1;
            ply1.eyeY = 0;
            return;
        }
		return;
    }	
	// U-Taste
	if (event.keyCode == 85) {
        keyPressedToTurnRight = true;
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == 1){
            ply1.eyeX = 0;
            ply1.eyeY = 1;
            return;
        }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeX == -1){
            ply1.eyeX = 0;
            ply1.eyeY = -1;
            return;
        }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == -1){
            ply1.eyeX = 1;
            ply1.eyeY = 0;
            return;
        }
	    if(ply1 && ply1.lifePoints > 0 && ply1.eyeY == 1){
            ply1.eyeX = -1;
            ply1.eyeY = 0;
            return;
        }
		return;
	}	
    // S-Taste
	if (event.keyCode == 83) {
        keyPressedRunBack = true;
		return;
	}	
    // R-Taste
	if (event.keyCode == 82) {
        keyRPressed = true;
		return;
	}	
    // F-Taste
	if (event.keyCode == 70) {
        keyFPressed = true;
		return;
	}	
    // H-Taste
	if (event.keyCode == 72) {
        keyPressedToRotateLeftWeapon = true;
        keyPressedToRotateRightWeapon = false;
        dataAttackToServer();
		return;
	}	
    // J-Taste
	if (event.keyCode == 74) {
        keyPressedToRotateRightWeapon = true;
        keyPressedToRotateLeftWeapon = false;
        dataAttackToServer();
		return;
	}	
    // I-Taste
	if (event.keyCode == 73) {
        keyPressedToExamineInFrontOfYou = true;
        if(ply1 && ply1.lifePoints > 0){
            ply1.toExamineInFrontOfYou();
        }
		return;
	}	
    // Up-Taste
	if (event.keyCode == 38) {
        keyUpPressed = true;
		return;
	}	
    // Down-Taste
	if (event.keyCode == 40) {
        keyDownPressed = true;
		return;
	}	
    // Left-Taste
	if (event.keyCode == 37) {
        keyLeftPressed = true;
		return;
	}	
    // Right-Taste
	if (event.keyCode == 39) {
        keyRightPressed = true;
		return;
	}	
    // Space-Taste
	if (event.keyCode == 32) {
        if(!ply1){
            console.log('A new player can be created.');
            viewersClicker = false;
            $( "#popupNewPlayer" ).popup("open");
            setTimeout(function(){
                viewersClicker = true;
                document.getElementById("newPlayerName").focus();
            }, 100);
        }
	}	
}
document.onkeyup = function(event) {
    if ( event.target.nodeName == 'INPUT' ){
        return;
    }
	// W-Taste
	if (event.keyCode == 87) {
        keyPressedRunForward = false;
    }
	// D-Taste
	if (event.keyCode == 68) {
        keyPressedRunRight = false;
    }
    // A-Taste
	if (event.keyCode == 65) {
        keyPressedRunLeft = false;
    }
	// U-Taste
	if (event.keyCode == 85) {
        keyPressedToTurnRight = false;
    }
    // Z-Taste
	if (event.keyCode == 90) {
        keyPressedToTurnLeft = false;
    }
	// S-Taste
	if (event.keyCode == 83) {
        keyPressedRunBack = false;
    }
	// 1-Taste 
	if (event.keyCode == 49) {	
	    key1Pressed = false; 
		return;
	}	
	// 2-Taste 
	if (event.keyCode == 50) {	
	    key2Pressed = false; 
		return;
    }	
	// 3-Taste 
	if (event.keyCode == 51) {	
	    key3Pressed = false; 
		return;
    }
	// 4-Taste 
	if (event.keyCode == 52) {	
	    key4Pressed = false; 
		return;
    }
	// 5-Taste 
	if (event.keyCode == 53) {	
	    key5Pressed = false; 
		return;
    }
	// 8-Taste 
	if (event.keyCode == 56) {	
		//return;
    }
	// 9-Taste 
	if (event.keyCode == 57) {	
	    key9Pressed = false; 
		return;
    }
    // R-Taste
	if (event.keyCode == 82) {
        keyRPressed = false;
		return;
	}	
    // F-Taste
	if (event.keyCode == 70) {
        keyFPressed = false;
		return;
	}	
    // H-Taste
	if (event.keyCode == 72) {
        keyPressedToRotateLeftWeapon = false;
		return;
	}	
    // J-Taste
	if (event.keyCode == 74) {
        keyPressedToRotateRightWeapon = false;
		return;
	}	
    // I-Taste
	if (event.keyCode == 73) {
        keyPressedToExamineInFrontOfYou = false;
		return;
	}	
    // Up-Taste
	if (event.keyCode == 38) {
        keyUpPressed = false;
	}	
    // Down-Taste
	if (event.keyCode == 40) {
        keyDownPressed = false;
	}	
    // Left-Taste
	if (event.keyCode == 37) {
        keyLeftPressed = false;
	}	
    // Right-Taste
	if (event.keyCode == 39) {
        keyRightPressed = false;
	}	
}
