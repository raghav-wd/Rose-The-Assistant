<?php
// class analyzeQuery{
    // function analyze($str){
        include "../utilities.php";
        $str = $_GET["q"];
        $q_type = "n/a";
        $q_questioned = "n/a";
        $strArr = explode(" ", $str);

        $ques_tags = ["is", "how", "tell", "what", "where", "when", "who", "can", "your", "do"];
        $user = ["i", "me", "mine", "my"];
        $ai = ["you", "you're,", "your", "yours"];
        if(getIndex($strArr[0], $ques_tags) > -1)
        {$q_type = "interrogative"; echo $q_type;}
        else
        {$q_type = "declarative"; echo $q_type;}
        if(inString($str, $user) > 0)$q_questioned = "user";
        else if(inString($str, $ai) > 0)$q_questioned = "ai";
        echo $q_questioned;

        $filtrate = removeNonKeyWords($str);
        echo "\n".$filtrate;
    // }
// }