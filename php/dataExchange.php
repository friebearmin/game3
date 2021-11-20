<?php
    //Typ-Beschreibung siehe PDF-Buch JavaScript
	header("Content-type: text/html; charset=ISO-8859-1"); 
	// <- Werte müssen noch überprüft werden, aus Hackgründen 
    //require '';
if(isset($_POST["time"]) and isset($_POST["id"]) 
    and isset($_POST["name"]) and isset($_POST["x"]) 
    and isset($_POST["y"]) and isset($_POST["eyeX"]) 
    and isset($_POST["eyeX"]) and isset($_POST["color"]))
	{
        if (!isset($_SESSION)) { session_start(); }
		$time = (int) $_POST["time"];
		$id = (int) $_POST["id"];
		$name = $_POST["name"];
		$x = (int) $_POST["x"];
		$y = (int) $_POST["y"];
		$eyeX = (int) $_POST["eyeX"];
		$eyeY = (int) $_POST["eyeY"];
		$color = $_POST["color"];
		$lifePoints = 100;
        $angleWeapon1 = 180;
        $angleWeapon2 = 0;
        $angleWeaponTime1 = 0;
        $angleWeaponTime2 = 0;
		$testString = 'testString';
        //Ready player datas from file
		$playerData = fopen("playerData.txt", "r") or die("Unable to open file!0");		
		$sendingArray = [];
		$now = round(microtime(true) * 1000);
        while (($line = fgets($playerData)) !== false){
            // process the line read.
            $line = str_replace("\r", "", $line);
            $line = str_replace("\n", "", $line);
            $lineValues = explode("#",$line);
            $timeOfLine = (int) $lineValues[0];
            $idOfLine = (int) $lineValues[1];
            if($now - $timeOfLine < 1000*10*1 and $idOfLine != $id){
                $sendingArray[] = $lineValues;
            }else{
                if($now - $timeOfLine < 1000*10*1 and $idOfLine == $id){
                    $lifePoints = (int) $lineValues[7];
                    $angleWeapon1 = (int) $lineValues[9];
                    $angleWeapon2 = (int) $lineValues[10];
                    $angleWeaponTime1 = (int) $lineValues[11];
                    $angleWeaponTime2 = (int) $lineValues[12];
                }
            }
        }
		fclose($playerData);
        $sendingArray[] = [(string)$time,(string)$id,$name,(string)$x,(string)$y,(string)$eyeX,(string)$eyeY,(string)$lifePoints,$color,(string)$angleWeapon1,(string)$angleWeapon2,(string)$angleWeaponTime1,(string)$angleWeaponTime2,(string)$testString];
        $lastIndex = array_key_last($sendingArray);
        //$sendingArray[$lastIndex][9] = '1';
        // TODO 
        // Bestimme die drei Punkte von der Waffe
        $angleWeaponNow = 0;
        if($angleWeapon1 !== $angleWeapon2){
            $angleWeaponNow = ($angleWeapon2-$angleWeapon1)*min(($now-$angleWeaponTime1)/($angleWeaponTime2-$angleWeaponTime1),1)+$angleWeapon1;
        }
		$angleWeaponToCalculation = $angleWeaponNow;
        if($eyeX == 1){
		    $angleWeaponToCalculation += 270;
            //rot = 90;
        }
        if($eyeX == -1){
		    $angleWeaponToCalculation += 90;
            //rot = 270;
        }
        /*
        if($eyeY == -1){
		    $angleWeaponToCalculation += 0;
            rot = 0;
        }
        */
        if($eyeY == 1){
		    $angleWeaponToCalculation += 180;
            //rot = 180;
        }
        $radius = 16;
        // Erst x-value und dann y-value
        // Wie lang ist das Schwert / die Waffen?
        $pointWeapon1 = [$x+$radius*2, $y];
        $pointWeapon2 = [$x+$radius*3, $y];
        $pointWeapon3 = [$x+$radius*4, $y];
		$pointWeapons = [];
        $pointWeapons[] = drehePunkt($x,$y,$pointWeapon1[0],$pointWeapon1[1],$angleWeaponToCalculation);
        $pointWeapons[] = drehePunkt($x,$y,$pointWeapon2[0],$pointWeapon2[1],$angleWeaponToCalculation);
        $pointWeapons[] = drehePunkt($x,$y,$pointWeapon3[0],$pointWeapon3[1],$angleWeaponToCalculation);
        //Next calculate hit a player

        //$sendingArray[$lastIndex][9] = '('.$pointWeapons[2][0] . ' | ' .$pointWeapons[2][1].')';
        
        $playerArray = '';
        foreach ($sendingArray as $smallArray){
            $idForeach = (int) $smallArray[1];
            if($idForeach != $id){
                $hitPlayer = false;
                $xForeach = (int) $smallArray[3];
                $yForeach = (int) $smallArray[4];
                foreach ($pointWeapons as $pointWeapon){
                    $distance = sqrt(($xForeach-$pointWeapon[0])*($xForeach-$pointWeapon[0])+($yForeach-$pointWeapon[1])*($yForeach-$pointWeapon[1]));
                    if($distance < $radius){
                        $hitPlayer = true;
                        $sendingArray[$lastIndex][13] = 'x:'.$pointWeapon[0].' y:'.$pointWeapon[0];
                        break;
                    }
                }
                if($hitPlayer){
                    $lifePointsForeach = (int) $smallArray[7];
                    $lifePointsForeach = $lifePointsForeach - 10;
                    $indexForeach = array_search($smallArray, $sendingArray);
                    $sendingArray[$indexForeach][7] = (string)$lifePointsForeach;
                }
            }
        }
        foreach ($sendingArray as $smallArray){
            $playerArray .= implode('#',$smallArray) . "\r\n";
        }
		$playerData = fopen("playerData.txt", "w") or die("Unable to open file!");		
		fwrite($playerData, $playerArray);
		fclose($playerData);
		$now = round(microtime(true) * 1000);
        $sendingArrayWithTime = [];
        $sendingArrayWithTime[] = $now;
        $sendingArrayWithTime[] = $sendingArray;
        echo json_encode($sendingArrayWithTime);
	}
    else
	{
		$now = round(microtime(true) * 1000);
        //Ready player datas from file
		$playerData = fopen("playerData.txt", "r") or die("Unable to open file!2");		
		$sendingArray = [];
        while (($line = fgets($playerData)) !== false){
            // process the line read.
            $line = str_replace("\r", "", $line);
            $line = str_replace("\n", "", $line);
			$lineValues = explode("#",$line);
            $timeOfLine = (int) $lineValues[0];
			//$sendingArray[] = $lineValues;
            if($now - $timeOfLine < 1000*10*1){
                $sendingArray[] = $lineValues;
            }
        }
		fclose($playerData);
        $playerArray = '';
        foreach ($sendingArray as $smallArray){
            $playerArray .= implode('#',$smallArray) . "\r\n";
        }
		$playerData = fopen("playerData.txt", "w") or die("Unable to open file!");		
		fwrite($playerData, $playerArray);
		fclose($playerData);
        //echo json_encode($sendingArray);
		$now = round(microtime(true) * 1000);
        $sendingArrayWithTime = [];
        $sendingArrayWithTime[] = $now;
        $sendingArrayWithTime[] = $sendingArray;
        echo json_encode($sendingArrayWithTime);
	}

    //xD und yD ist der Ursprung um den sich x und y drehen soll
    function drehePunkt($xD, $yD, $x, $y, $winkel) {
        $xN = $x-$xD; //Abstand zwischen xD und x
        $yN = $y-$yD; //Abstand zwischen yD und y
        $xF = $xN*cos(gradInRadiant($winkel))+$yN*sin(gradInRadiant($winkel)); //x Abstand verändern
        $yF = -$xN*sin(gradInRadiant($winkel))+$yN*cos(gradInRadiant($winkel));//y Abstand verändern
        $xE = $xF+$xD; //zum Ursprung dazurechnen
        $yE = $yF+$yD;
        return [$xE, $yE];
    }
    function gradInRadiant($grad) {
        return ($grad*pi())/180;
    }
?>
