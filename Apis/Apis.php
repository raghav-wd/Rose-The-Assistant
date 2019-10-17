<?php
        $apis = file_get_contents("category.json");
        $apis = json_decode($apis, true);
        for($i = 0; $i<100; $i++)
        {
            if(inString($str, $apis["apis"]["apisKws"][$i]))
            {
                include_once "classes/".$apis["apis"]["apisName"][$i].".php";
                $instance = new $apis["apis"]["apisName"][$i];
                echo $instance->useApi($str);
                break;        
            }
            else break;
        }