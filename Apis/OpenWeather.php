<?php
    class OpenWeather {
        function useApi($str){
            $str = chopStrs($str, ["weather"]);
            $filter = removeNonKeywords($str);
            $data = apiFetch("https://api.openweathermap.org/data/2.5/weather?q=". $filter ."&appid=b6de18649b3a772475da2dcd5541638a&units=metric");
            $obj = new Class{};
            $obj->ai = "Showing weather of city ".$data["name"].".";
            $obj->weather = $data["weather"][0]["description"].".";
            $obj->temperature = $data["main"]["temp"]." Celsius".".";
            $obj->humidity = $data["main"]["humidity"]."%".".";
            $obj->wind = $data["wind"]["speed"]." meters per second".".";
            $obj->clouds = $data["clouds"]["all"]."%".".";
            $json = json_encode($obj);
            echo $json;
        }
    }