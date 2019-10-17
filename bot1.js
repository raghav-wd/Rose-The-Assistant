document.getElementById("q_run").addEventListener("click", function () {
    var qField = document.getElementById("q");
    var q = qField.value;
    qField.value = ""
    q = q.trim();
    chip(q, 1, 0)
    roseApi(q)
});

function roseApi(q)
{
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
           var myObj = JSON.parse(this.responseText);
           var objProps = Object.keys(myObj);
           if (objProps[0] != "videoTitle")//check if its a youtube card
           {
               var result = ""
               for (var i = 0; i < objProps.length; i++)
                   if (["result", "ai"].indexOf(objProps[i]) == -1)
                       result += capFirstL(objProps[i]) + ": " + myObj[objProps[i]] + "{|<br/>|}"
               else result += capFirstL(myObj[objProps[i]]) + "{|<br/>|}"
               chip(result, 0, 1)
           }
           else
           soundChip(myObj[objProps[1]], myObj[objProps[0]])
       }
   };
   xmlhttp.open("GET", "http://localhost:8081/bot/bot.php?q="+q.toLowerCase(), true);
   xmlhttp.send();
}
dynamicallyLoadScript('jsmodules/text to speech.js')
dynamicallyLoadScript('jsmodules/chip.js')
dynamicallyLoadScript('jsmodules/soundChip.js')


function capFirstL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); // create a script DOM node
    script.src = url; // set its src to the provided URL

    document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

