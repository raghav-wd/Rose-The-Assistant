<?php
class Birthday{
    function useApi($str)
    {
        $strOrg = $str;
        $str = removeNonKeywords(trim($str));
        $str = removeWords($str, ["birthday", "birthdays", "month", "this"]);

        $months = ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        $index = getIndex($str, $months);
        if($index != -1)
        $month = $months[$index];
        else $month = "";
        $dates = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31th"];
        $index = getIndex($str, $dates);
        if($index != -1)
        $date = $dates[$index];
        else $date = "";
        
        $str = removeWords($str, ["$date", "$month"]);
        $name = trim($str);
        // echo $name;
        $json = file_get_contents("birthday.json");
        $jsonObj = json_decode($json, true);
        $obj = new Class{};
        if($date == "" && $month != "")
        {
            $birthdays_in_mth = $jsonObj[$month];
            $result = "People having birthday in ".ucfirst($month)." are {|&#127874;&#127880;&#127882;-<br/>|}";
            for($i = 0; $i<31; $i++)
            {
                $arr = $birthdays_in_mth[$dates[$i]];
                if(count($arr) > 1)
                foreach($arr as $x)
                if($x != "")
                $result .= "{|&#8226;|}".$dates[$i]." ".ucfirst($month)." {|-|} ".ucfirst($x).". {|<br/>|}";
            }
            $obj->result = $result;
            $json = json_encode($obj);
            echo $json;
        }
        else if(strAnalyser($strOrg)->isQues == 1 && $date != "")
        {
        $value1 = $jsonObj[$month][$date];
        $result = "These people have Birthday on ".$date." ".ucfirst($month)."{|&#127874;&#127880;&#127882;<br/>|}";
        for($i = 1; $i<count($value1); $i++)
        $result .= "{|".$i.".|} ".ucfirst($value1[$i]).". {|<br/>|}";
        $obj->result = $result;
        $json = json_encode($obj);
        echo $json;
        }
        else if($date != ""){
            $value1 = $jsonObj[$month][$date];
            $value2 = $jsonObj[$month][$date];

            array_push($value2, $name);
            $part = substr($json, strpos($json, $month));
            $residue = substr($json, 0, strpos($json, $month));
            $residue = $residue.substr($part, 0, strpos($part, $date)) ;//11
            $part = substr($part, strpos($part, $date));
            // echo substr($part, 0, strpos($json, $date));
            $part = preg_replace('/'.preg_quote('["'.implode('", "', $value1).'"]', '/').'/', '["'.implode('", "', $value2).'"]', $part, 1);
            $json = $residue.$part;
            // echo substr($part, 0, strpos($part, "10th")) ;
            //writting in json
            $myfile = fopen("birthday.json", "w") or die("Unable to open file!");
            fwrite($myfile, $json);
            fclose($myfile);
            $obj->result = "I'll wish ".ucfirst($name)." on time. {|&#127874;|}";
            $json = json_encode($obj);
            echo $json;
        }
        else return "idk";
    }
    // function str_replace_first($from, $to, $content)
    // {
    //     $from = '/'.preg_quote($from, '/').'/';
    //     return preg_replace($from, $to, $content, 1);
    // }
}