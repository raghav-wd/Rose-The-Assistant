<?php
class Lyrics{
    function useApi($str){
            $filter = chopStrs($str, ["lyrics of the song", "lyrics of song", "lyrics of", "show me the", "get me the", "show the", "get the", "rose"]);
            $data = apiFetch("http://api.musixmatch.com/ws/1.1/track.search?q_track=".$filter."&page_size=5&page=1&s_track_rating=desc&apikey=6e69d20b0d81fe1f1d7f7f530875ca27");
            $track_name = $data["message"]["body"]["track_list"][0]["track"]["track_name"];
            $artist_name = $data["message"]["body"]["track_list"][0]["track"]["artist_name"];
            $album_name = $data["message"]["body"]["track_list"][0]["track"]["album_name"];
            if(strpos($artist_name, "feat.") > -1)
            $artist_name = substr($artist_name, 0, strpos($artist_name, "feat.") );
            $data = apiFetch("http://lyric-api.herokuapp.com/api/find/".$artist_name."/".$track_name);
            $obj = new Class{};
            $json = file_get_contents("data.json");
            $json = json_decode($json, true);
            $reply = $json["showResults"];
            if(gettype($reply) == 'array')
            $reply = $reply[rand(0, count($reply)-1)];
            $obj->ai = $reply;
            $obj->result = $data["lyric"];
            if($obj->result == "")return "idk";
            $obj->result = "{|".str_replace("\n", "<br/>", $obj->result)."|}";
            $json = json_encode($obj);
            return $json;
    }
}