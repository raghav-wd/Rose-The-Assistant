<?php
include "../utilities.php";
$str = $_GET["q"];
$str = apostrophy(trim($str));
$str = removeWords($str, ["remember"]);
