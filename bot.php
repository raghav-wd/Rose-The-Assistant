<?php
header("Access-Control-Allow-Origin: *");  
header('Content-Type: application/json');
include_once "utilities.php";
    $q = $_GET["q"];
    $q = apostrophy($q);
    // $q = removeWords($q, ["rose"]);
    needData($q);
    function needData($str)
    {
        $org_str = $str;
        $apis = file_get_contents("category.json");
        $apis = json_decode($apis, true);
        $reply = "idk";
        for($i = 0; $i<count($apis["apis"]["apisName"]); $i++)
        {
            if(inString($str, $apis["apis"]["apisKws"][$i]))
            {
                include_once "Apis/".$apis["apis"]["apisName"][$i].".php";
                $instance = new $apis["apis"]["apisName"][$i];
                $reply = $instance->useApi($str);
                if($reply != "")
                echo $reply;
                break;        
            }
        }
        if($reply == "idk" && strAnalyser($str)->isQues == 1)
        {
            if(strAnalyser($str)->isQuestioned != "user_info")
            $json = file_get_contents("ai.json");
            else
            $json = file_get_contents("user.json");
            $json = json_decode($json, true);
            $kw = trim(removeNonKeywords($str));
            if(isset($json[$kw]))
            {
                $reply = $json[$kw];
                if(gettype($reply) == 'array')
                $reply = $reply[rand(0, count($reply)-1)];
                echo '{"result": "'.$reply.'"}';
            }
        }
        else
        {
            $ai = file_get_contents("statement.json");
            $ai = json_decode($ai, true);
            $kw = trim(removeNonKeywords($str));
            if(isset($ai[$kw]))
            {
                $reply = $ai[$kw];
                if(gettype($reply) == 'array')
                $reply = $reply[rand(0, count($reply)-1)];
                if($reply == "")$reply="idk";
                else
                echo '{"result": "'.$reply.'"}';
            }
        }
        if($reply == "idk")
        {
            include_once "modules/randomQuery.php";
            $instance = new randomQuery;
            $reply = $instance->randomQ($org_str);
            if($reply == "")$reply="idk";
            else echo $reply;
        }
        if($reply == "idk"){
            include_once "Apis/Google.php";
            $instance = new Google;
            $reply = $instance->useApi($str);
            echo $reply;
        }
        if($reply == "idk"){
            $json = file_get_contents("data.json");
            $json = json_decode($json, true);
            echo '{"result": "'.$json["idk"][rand(0, count($json["idk"])-1)].'"}';
        }
    }
    