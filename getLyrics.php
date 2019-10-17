<?php

$ch = curl_init();
$headers = array(
'Authorization: Token {token}',
'Content-Type: application/json',
 
);
$api_endpoint = 'https://www.azlyrics.com/lyrics/bangtanboys/dna.html';
curl_setopt($ch, CURLOPT_URL, $api_endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_HEADER, 0);
 
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
 
$response = curl_exec($ch);
 
echo $response;
// $ch = curl_init("https://www.w3schools.com/js/js_json_php.asp");
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
// $content = curl_exec($ch);
// curl_close($ch);
// echo $content;

// $html = file_get_contents("https://www.azlyrics.com/lyrics/bangtanboys/dna.hhttps://www.azlyrics.com/lyrics/bangtanboys/dna.htmltml");
// echo $html;