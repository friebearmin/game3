function checkTheWebsiteSize(){
    let windowInnerWeidth = self.innerWidth;
    let windowInnerHeight = self.innerHeight;
    let minOfWeidthAndHeight = Math.min(windowInnerWeidth,windowInnerHeight);
    let minIsWeidth = false;
    let minIsHeight = false;//obsolet
    if(windowInnerWeidth < windowInnerHeight){
        minIsWeidth = true;
    }else{
        minIsHeight = true;//obsolet
    }
    if(minOfWeidthAndHeight < 512){//480 Size of canvas plus 2*16 for padding
        //padding deaktiv
        document.getElementById("mainCanvasDiv").style.padding = "inherit"; 
        let newSize = Math.min(minOfWeidthAndHeight,484)-2;
        if(minIsWeidth){
            document.getElementById("mainCanvas").style.height = newSize+"px"; 
            document.getElementById("mainCanvas").style.width = "auto"; 
        }else{
            document.getElementById("mainCanvas").style.height = "auto";
            document.getElementById("mainCanvas").style.width = newSize+"px";  
        }
    }else if(windowInnerWeidth < 992){
        //padding aktiv
        document.getElementById("mainCanvasDiv").style.padding = ""; 
        if(minIsWeidth){
            document.getElementById("mainCanvas").style.height = "482px"; 
            document.getElementById("mainCanvas").style.width = "auto"; 
        }else{
            document.getElementById("mainCanvas").style.height = "auto";
            document.getElementById("mainCanvas").style.width = "482px";  
        }
    }else{
        //padding aktiv
        document.getElementById("mainCanvasDiv").style.padding = ""; 
        document.getElementById("mainCanvas").style.height = "auto";
        document.getElementById("mainCanvas").style.width = "50%"; 
    }
}
