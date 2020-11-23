<?php
	header("Content-type: text/html; charset=ISO-8859-1"); //Typ-Beschreibung siehe PDF-Buch JavaScript
	
	if(isset($_GET["x"]) & isset($_GET["y"]) & isset($_GET["myID"])) // <- Werte müssen noch überprüft werden, aus Hackgründen
	{
		$theUsers = fopen("currentUsers.txt", "r") or die("Unable to open file!");		
		$x = (int) $_GET["x"];
		$y = (int) $_GET["y"];
		$txt = "";
        $checker = true;
        while(! feof($theUsers)) {
            $txtTmp = fgets($theUsers);
            $arrUser = explode(",",$txtTmp);
            if($arrUser[0] == $_GET["myID"]){
                $arrUser[1] = $x;
                $arrUser[2] = $y;
                $txtTmp = implode(",",$arrUser);
                $txtTmp .= "\n";				
                $checker = false;
            }
            $txt .= $txtTmp;
        }
        if($checker){
            $arrUser[0] = $_GET["myID"];
            $arrUser[1] = $x;
            $arrUser[2] = $y;
            $txtTmp = implode(",",$arrUser);
            $txtTmp .= "\n";				
            $txt .= $txtTmp;
        }
		fclose($theUsers);
		$theUsers = fopen("currentUsers.txt", "w") or die("Unable to open file!");		
		fwrite($theUsers, $txt);
		fclose($theUsers);
        echo $txt;
	}
?>
