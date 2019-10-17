<?php
class Google
{
    function useApi($str)
    {
        $str = $_GET["q"];
        if(inString($str, ["google"]));
        $str = chopStrs($str, ["google"]);
        $str = str_replace(" ", "+", $str);
        $html = file_get_contents("https://www.google.com/search?q=".$str);
        $st = strpos($html, 'AP7Wnd">');
        $results = str_replace("...", "<br/>", strip_tags(substr($html, $st+8, strlen($html))));

        if(strpos($results, "http") > -1)
        $results = substr($results, 0, strpos($results, "http"));
        if(strpos($results, "More items") > -1)
        $results = substr($results, 0, strpos($results, "More items"));
        $obj = new Class{};
        // $results = preg_replace('/(?<!\ )[0-9][0-9][0-9][0-9]/', ' $0', $results);
        $results = str_replace("-", "{|-|}", $results);
        $results = str_replace("&", "{|&", $results);
        $results = str_replace(";", ";|}", $results);
        $results = preg_replace('/(?<!\ )[A-Z][a-z]/', ' $0', $results);
        $obj->result = iconv('UTF-8', 'ISO-8859-1//TRANSLIT//IGNORE', $results);
        $json = json_encode($obj);
        $json = str_replace("<br\/>", "{|<br\/>|}", $json);
        echo $json;
    }
}