<?php
function strAnalyser($str){
        $isQues = -1;$isQuestioned = "";
        $isApis = -1;

        $ques_tags = ["is", "are", "how", "tell", "what", "where", "when", "who", "can", "do", "know", "whose"];
        $user = ["i", "me", "mine", "my", "myself"];
        $ai = ["you", "your", "yours", "yourself"];
        // $filtrate = removeNonKeywords($str);
        $obj = new Class{};
        if(inString(explode(' ', $str)[0], $ques_tags, false))
        $isQues = 1;
        if(inString($str, $user, false))
        $isQuestioned = "user_info";
        else if(inString($str, $ques_tags, false))
        $isQuestioned = "ai";
        $obj->isQues = $isQues;
        $obj->isQuestioned = $isQuestioned;
        return $obj;
    }

    function inString($str, $arr, $matches=false)
    {
        $str = explode(" ", $str);
        $c = 0;
        for($i = 0; $i<count($str); $i++)
        {
            if(in_array($str[$i], $arr) )
            {$c++;if($matches == false)break;}
        }
        return $c;
    }

    function getIndex($str, $arr="")
    {
        $str = explode(" ", $str);
        $index = -1;
        for($i = 0; $i<count($arr); $i++)
        {
            if(in_array($arr[$i], $str) )
            $index = $i;
        }
        return $index;
    }

    function removeNonKeywords($str)
    {
        $str = " ".$str." ";
        $nonKeyWords = ["a", "an", "the", "what", "where", "when", "how", "tell", "who", "can", "much",
        "is", "am", "are", "was", "were","has", "have", "do", "know", "does", "in", "out", "at", "on", "of", "over", "about","we", "me", "mine", "my", "i", "you", "your", "yours", "really", "rose"
        ];
        for($i = 0; $i< count($nonKeyWords); $i++)
        {
            $search = " ".$nonKeyWords[$i]." ";
            if(stripos( $str, $search) > -1)
            {
                $w = substr($str, stripos($str, $search), strlen($search));
                $str = str_replace($search, " ", $str);
            }            
        }
        return $str;
    }

    function removeWords($str, $arr)
    {
        $str = " ".$str." ";
        for($i = 0; $i< count($arr); $i++)
        {
            $search = " ".$arr[$i]." ";
            if(stripos( $str, $search) > -1)
            {
                $w = substr($str, stripos($str, $search), strlen($search));
                $str = str_replace($search, " ", $str);
            }
        }
        return $str;
    }

    function chopStrs($str, $arr)
    {
        for($i = 0; $i<count($arr); $i++)
        $str = str_replace($arr[$i], "", $str);
        return $str;
    }

    function apiFetch($URL)
    {
        $URL = preg_replace("/ /", "%20", $URL);
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => $URL,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache"
        ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        $response = json_decode($response, true); //because of true, it's in an array
        return $response;
    }
//     entreprenurial quotes
// https: //api.myjson.com/bins/pymbl
function apostrophy($str){
    $str = str_replace("'s", " is", $str);
    $str = str_replace("'m", " am", $str);
    $str = str_replace("'re", " are", $str);
    $str = str_replace("'ve", " have", $str);
    return $str;
}