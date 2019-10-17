<?php
class Wikipedia {
    function useApi($str){
            $filter = chopStrs($str, ["search"]);
            $data = apiFetch("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=".$filter."&utf8=&format=json");
            $wikiPageTitle = $data["query"]["search"][0]["title"];
            $data = apiFetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=". $wikiPageTitle);
            $arr = array_keys($data["query"]["pages"]);
            $obj = new Class{};
            $json = file_get_contents("data.json");
            $json = json_decode($json, true);
            $reply = $json["showResults"];
            if(gettype($reply) == 'array')
            $reply = $reply[rand(0, count($reply)-1)];
            $obj->ai = $reply;
            $obj->result = $data["query"]["pages"][$arr[0]]["extract"];
            $obj->result = str_replace("(", "{|(", $obj->result);
            $obj->result = str_replace(")", ")|}", $obj->result);
            $str =substr($obj->result, 200, strlen($obj->result));
            $pos = strpos($str, ".");
            for($i = 0; $i<strlen($str); $i++)
            {
                if($str[$i] == ".")
                {$str = substr($str, 0, $i).".{|".substr($str, $i+1, strlen($obj->result));
                break;}
            }
            $obj->result = substr($obj->result, 0, 200).$str."|}";
            $json = json_encode($obj);
            echo $json;
    }
}