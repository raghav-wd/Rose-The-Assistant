<?php
class randomQuery{
    function randomQ($str){
        $json = file_get_contents("randomChats.json");
        $json = json_decode($json, true);
        if(isset($json[$str]))
        {
            $reply = $json[$str];
            if(gettype($reply) == 'array')
            $reply = $reply[rand(0, count($reply)-1)];
            $obj = new Class{};
            $obj->result = $reply;
            return json_encode($obj);;
        }
    }
}