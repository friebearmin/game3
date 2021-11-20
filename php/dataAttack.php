<?php
    //Typ-Beschreibung siehe PDF-Buch JavaScript
	header("Content-type: text/html; charset=ISO-8859-1"); 
	// <- Werte müssen noch überprüft werden, aus Hackgründen 
    //require '';
    if(isset($_POST["time"]) and isset($_POST["id"]) 
        and isset($_POST["key1"]) and isset($_POST["key2"]))
    {
        $time = (int) $_POST["time"];
		$id = (int) $_POST["id"];
        $key1 = (bool) $_POST["key1"];
		$key2 = (bool) $_POST["key2"];


        $angleWeapon1 = 0;
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
                $angleWeapon1Old = (int) $lineValues[9];
                $angleWeapon2Old = (int) $lineValues[10];
                $angleWeaponTime1Old = (int) $lineValues[11];
                $angleWeaponTime2Old = (int) $lineValues[12];
                if($now > $angleWeaponTime2Old-250){
                    $rightSide = false;
                    //New Attack
                    if($key1 and $angleWeapon2Old != 180){
                        // von rechts nach links (Taste h)
                        $angleWeapon1 = 0;
                        if($angleWeapon2Old > 0){
                            $angleWeapon1 = $angleWeapon2Old;
                        }
                        $angleWeapon2 = 180;
                        $rightSide = true;
                    }elseif($key2 and $angleWeapon2Old != 0){
                        // von links nach rechts (Taste u)
                        $angleWeapon1 = 180;
                        $angleWeapon2 = 0;
                        if($angleWeapon2Old > 0){
                            $angleWeapon1 = $angleWeapon2Old;
                        }
                        $rightSide = true;
                    }
                    if(($key1 or $key2) and $rightSide){
                        $angleWeaponTime1 = $time;
                        $angleWeaponTime2 = $time+1000*(abs($angleWeapon1-$angleWeapon2))/180;
                        //$angleWeaponTime1 = $now;
                        //$angleWeaponTime2 = $now+1000;
                        $lineValues[9] = (String) $angleWeapon1;
                        $lineValues[10] = (String) $angleWeapon2;
                        $lineValues[11] = (String) $angleWeaponTime1;
                        $lineValues[12] = (String) $angleWeaponTime2;
                    }
                }else{
                    //Attack Stop
                    $angleWeaponNow = 0;
                    $nowMod = $time+50;
                    if($angleWeapon1Old !== $angleWeapon2Old){
                        $angleWeaponNow = ($angleWeapon2Old-$angleWeapon1Old)*min(($nowMod-$angleWeaponTime1Old)/($angleWeaponTime2Old-$angleWeaponTime1Old),1)+$angleWeapon1Old;
                    }
                    $angleWeapon1 = 0;
                    $angleWeapon2 = $angleWeaponNow;
                    $angleWeaponTime1 = $nowMod-1000;
                    $angleWeaponTime2 = $nowMod;
                    $lineValues[9] = (String) $angleWeapon1;
                    $lineValues[10] = (String) $angleWeapon2;
                    $lineValues[11] = (String) $angleWeaponTime1;
                    $lineValues[12] = (String) $angleWeaponTime2;
                }
                $sendingArray[] = $lineValues;
            }
        }
		fclose($playerData);
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
    elseif(isset($_POST["time"]) and isset($_POST["id"]) 
        and isset($_POST["hit"]))
    {
        $time = (int) $_POST["time"];
		$id = (int) $_POST["id"];
        $hit = (bool) $_POST["hit"];

		$x = 0;
		$y = 0;
        $eyeX = 0;
		$eyeY = -1;
        $angleWeapon1 = 0;
        $angleWeapon2 = 0;
        $angleWeaponTime1 = 0;
        $angleWeaponTime2 = 0;
        $angleWeaponNow = 0;
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
                $angleWeapon1 = (int) $lineValues[9];
                $angleWeapon2 = (int) $lineValues[10];
                $angleWeaponTime1 = (int) $lineValues[11];
                $angleWeaponTime2 = (int) $lineValues[12];
                $x = (int) $lineValues[3];
                $y = (int) $lineValues[4];
                $eyeX = (int) $lineValues[5];
                $eyeY = (int) $lineValues[6];
                if($now < $angleWeaponTime2){
                    //calculate the new Weapon swing direction.
                    $usedTime = $time;
                    $timeDistance = $usedTime - $angleWeaponTime1;
                    if($angleWeapon1 !== $angleWeapon2){
                        $angleWeaponNow = ($angleWeapon2-$angleWeapon1)*min(($timeDistance)/($angleWeaponTime2-$angleWeaponTime1),1)+$angleWeapon1;
                    }
                    $lineValues[9] = (String) $angleWeaponNow;
                    $lineValues[10] = (String) $angleWeapon1;
                    $lineValues[11] = (String) $usedTime;
                    $lineValues[12] = (String) ($usedTime + $timeDistance);
                }else{
                    //Weapon hit was with stand position.
                    //This situation should not occur.
                }
                $sendingArray[] = $lineValues;
            }
        }
		fclose($playerData);
        //check the hit
        if($hit){
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
