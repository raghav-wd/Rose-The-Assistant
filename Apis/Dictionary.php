<?php
class Dictionary{
    function useApi($str){
        $word = removeNonKeyWords($str);
        $word = removeWords($word, ["meaning", "definition"]);
        $word = trim($word, " ");
        $htm = file_get_contents("https://www.dictionary.com/browse/".$word);
        $start = strpos($htm, '<meta name="description" content="');
        $end = strpos($htm, 'See more.">');
        $meaning = substr($htm, $start+34, $end-$start-35);
        $meaning = chopStrs($meaning, ['See more.">']);
        $obj = new Class{};
        $obj->result = $meaning;
        return json_encode($obj);
    }
}