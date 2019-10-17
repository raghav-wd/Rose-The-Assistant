<?php
class Youtube
{
    function useApi($str)
    {
        $data = apiFetch("https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDkAoya9xz7unbWaM56gCA5C2bFukKnmZ8&q=".$str);
        $obj = new Class{};
        $obj->videoTitle = $data["items"][0]["snippet"]["title"];
        $obj->videoTitle = str_replace("&#39;", "'", $obj->videoTitle);
        $obj->videoTitle = str_replace("(", "{|(", $obj->videoTitle);
        $obj->videoTitle = str_replace(")", ")|}", $obj->videoTitle);
        $obj->videoId = $data["items"][0]["id"]["videoId"];
        $json = json_encode($obj);
        return $json;
    }
}