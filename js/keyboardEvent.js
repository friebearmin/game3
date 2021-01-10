document.onkeydown = function(event) {
	// 1-Taste 
	if (event.keyCode == 49) {	
		return;
	}	
	// 2-Taste 
	if (event.keyCode == 50) {	
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
		return;
    }	
	// E-Taste
	if (event.keyCode == 69) {
        keyEPressed = true;
		return;
	}	
    // S-Taste
	if (event.keyCode == 83) {
        keySPressed = true;
		return;
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
