<?php
class Schedule {
    function useApi($str) {
            $def_timetable = "third sem";
            $def_mess = "pf";

            $json = file_get_contents("schedule.json");
            $json = json_decode($json, true);

            // $day = $_GET['day'];
            // $time = $_GET['time'];

            $dayKWs = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "today", "tomorrow", "yesterday"];
            // $slots = $json["third sem"]["slots"];
            $day = getIndex(strtolower(date("l")), $dayKWs);
            $time = 480;
            // $day = 1;

            $str = removeNonKeywords($str);
            $askedSchedule = trim(removeWords($str, ["pf", "mano", "manoranjitham", "college", "hostel", "timetable"]));

            if(inString($str, $dayKWs))
            {
                $index = getIndex($askedSchedule, $dayKWs);
                if($index < 7)
                $day = $index;
                if($index == 8)
                $day = ($day == 6)?0:$day+1;
                else if($index == 9)
                $day = ($day == 0)?6:$day-1;
            }
            $obj = new Class{};
            
            for($i = 0; $i<3; $i++)
            {
                if(inString($str, $json["dictionary"][$i]) > 0)
                {
                    $key = $json["dictionary"]["scheduleNames"][$i];
                    $obj->ai = $json[$key]["ai"];
                    for($j = 0; $j<count($json[$key]["slotNames"]); $j++)
                    {
                        $objProp = $json[$key]["slotNames"][$j];
                        $isArray = $json[$key][$day];
                        if(gettype($isArray) == "array")
                        $obj->$objProp = "{|".$json[$key][$day][$j]."|}";
                        else $obj->greetings = $json[$key][$day];
                    }
                    echo json_encode($obj);
                }
                // else break;
            }

            
    }
}
