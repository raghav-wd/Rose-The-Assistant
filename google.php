<?php
// require "simple_html_dom.php";
$str = $_GET["q"];
$str = str_replace(" ", "+", $str);
$html = file_get_contents("https://www.google.com/search?q=".$str);
$st = strpos($html, 'AP7Wnd">');
$results = str_replace("...", "<br/>", strip_tags(substr($html, $st+8, strlen($html))));

if(strpos($results, "http") > -1)
$results = substr($results, 0, strpos($results, "http"));
if(strpos($results, "More items") > -1)
$results = substr($results, 0, strpos($results, "More items"));
echo $results;
