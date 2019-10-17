

var people = {
    "user_info": [{
        "name": "Raghav",
        "skills": ["Fullstack Development"],
        "birthday": "03 August 2000",
        "nickname": "Yatox",
        "height": "170cm",
        "friends": ["Ayush", "Boomshik", "Mudit", "Naman", "Shaury", "Abhishek", "Neelesh", "Arnab", "Rahul", "Shubhankar"]
    }],
    "ai": [{
        "name": "Rose",
        "birthday": "19 July 2019",
        "hate": "oversmart",
        "belief": "I will evolve and reborn as a Human",
        "master": `${people.user_info[0].name}`,
        "height": "160cm",
        "like": ["J pop", "K pop", "piano", "anime", "skating", "web dev"]
    }],
};

var searches = ["wikipedia", "search", "google"];
document.getElementById("q_run").addEventListener("click", function () {
    // var qField = document.getElementById("q");
    // var q = qField.value;
    // qField.value = ""
    // q = q.trim();
    // bot(q);
    alert("hi")
});

var ttdata = {
    "0": ["", "Competencies", "Architecture Lab", "Architecture", "Data Structure Lab"],
    "1": ["", "Social Skills", "Architecture Lab", "Architecture", "Data Structure Lab"],
    "2": ["", "Analog & Digital", "", "Management", ""],
    "3": ["", "Analog & Digital", "", "OOPS", ""],
    "4": ["", "Maths", "", "Analog & Digital", ""],
    "5": ["Maths", "", "OOPS", "", "Bio"],
    "6": ["Maths", "", "OOPS", "", "Bio"],
    "7": ["Data Structure", "", "Bio", "", "Maths"],
    "8": ["Data Structure", "Analog & Digital Lab", "Data Structure", "OOPS Lab", "Management 105"],
    "9": ["Architecture", "Analog & Digital Lab", "Architecture", "OOPS Lab", "OOPS"]
};

var pfMess = {
    // "0": ["Bread, Buttter, Jam, Chappathi, Karamani Kurma, Tea, Coffee, Milk", "Chappathi, Aloo Mutter, Veg Biriyani/Bahara Pulao, Onion Raitha, White Rice, Mysore Dal Fry, Frymes, Mango Pickle, Sweet-Kesari", "Cake/Donut, Tea, Coffee", "Poori, Moong Dal Tadka, Black Channa Currry, Non-veg Gravy, White Rice, Frymes, Lemon Pickle, Milk(150ml), Green Salad, Banana"],
    // "1": ["Bread, Butter, Jam, Poha, Tea, Coffee, Milk", "Paratha, Veg Chettinad, White Rice, Dal, Taduka, Veg Sabzi, Butter Milk, Mixed Pickle, Frymes.", "Bread, Jam, Bajji/Aloo Bonda, Tea, Coffee", "Chappathi, White Peas Kurma, Veg Pulao, Dal Fry, White Rice, Veg Manchurian, Non Veg Gravy, Butter, Milk, Mango Pickle, Frymes, Milk(150ml), Green Salad, Fresh Fruits"],
    // "2": ["Bread, Butter, Jam, Idly, Masala Omlette, Sambar, Chutney, Tea, Coffee, Milk, Banana", "Poori, Potato Masala, White Rice, Tomato Dal Fry, Kadai Veg Sabzi, Butter Milk, Mixed Pickle, Frymes.", "Bread, Jam, Bajji/Aloo, Bonda, Tea, Coffee", "Chappathi, Veg(Panner) Non-Veg(Chicken Masala/Chilly Chicken), White Rice, Tomato Dal, Butter milk, Green Salad, Frymes, Mixed Pickle, Milk(150ml), Ice cream"],
    // "3": []
}

var ttslots = [480, 530, 585, 640, 695, 750, 805, 860, 915, 965, 1020];
loadDoc();
var ques_tags = ["what", "where", "when", "how", "tell", "who"];

var subject = {
    "user_info": ["me", "mine", "my", "I"],
    "ai": ["you", "your", "yours"]
}
//Wikipedia search function
function dowiki(place) {
    var URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=';

    URL += "&titles=" + place;
    URL += "&rvprop=content";
    URL += "&callback=?";
    $.getJSON(URL, function (data) {
        var obj = data.query.pages;
        var ob = Object.keys(obj)[0];
        // console.log(obj[ob]["extract"]);
        try {
            chip(obj[ob]["extract"].substring(0, 450), 0, 1);
        } catch (err) {
            chip(err.message, 0);
        }
    });
}
var weatherProps;
// Muxicmatch
// http: //api.musixmatch.com/ws/1.1/track.search?q_track=hello&page_size=1&page=1&s_track_rating=desc&apikey=6e69d20b0d81fe1f1d7f7f530875ca27
// Dictionary API
// https: //www.dictionaryapi.com/api/v3/references/thesaurus/json/slack?key=0c7678e8-28c9-4a9a-9b91-d13796b07643
// function roseApi(q)
// {
//     var URL = `bot.php?q=`+q;
//     $.getJSON(URL, function (data) {
//         var obj = data;
//         obj = obj.replace(/\n/g, "<br/>");
//         chip(data, 0, 0)
//         // try {
//         //     if (obj == "") throw e;
//         //     chip(, 0, 1)
//         //     chip(obj, 0, 0);
//         // } catch (err) {
//         //     chip(`I can't fetch the lyrics of song ${song}`, 0, 1);
//         //     console.log(err.message);
//         // }
//     })
// }
//Open Weather Api
function openWeather(city="chennai", attr)
{
    var key = "b6de18649b3a772475da2dcd5541638a";
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    // var URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=';
    // attr = "sunset"
    // if (typeof attr === "undefined") attr = "humidity";
    var weather = "";
    $.getJSON(URL, function (data) {
        var ow = {
            city: data.name,
            weather: data.weather[0].description,
            // icon: data.weather.icon,
            temp: data.main.temp + "&degC",
            //  data.main.temp_min + "&degC", data.main.temp_max + "&degC"], //gets avg, min, max temp
            humidity: data.main.humidity + "%",
            pressure: data.main.pressure+"hPa",
            speed: data.wind.speed+"m/sec",
            clouds: data.clouds.all+"%"
            // country: data.sys.country,
            // sunrise: data.sys.sunrise,
            // sunset: data.sys.sunset
        };
        try {
            if (typeof attr === "undefined")
            {
                var owValsArr = Object.keys(ow);//obj props value in an array
                weatherProps = owValsArr;
                var owPropsArr = Object.getOwnPropertyNames(ow);//obj propsName in an array
                weather = `Here are the weather stats of ${ow.city}, ${people.user_info[0].nickname} <br/>`
                for (var x = 1; x < owPropsArr.length; x++)
                {
                    weather += owValsArr[x] + ": " + ow[owValsArr[x]] + "<br/>";
                        // + ": " + owValsArr[x] + " ";
                }
            }
            chip(weather, 0, 1);
        } catch (err) {
            chip(err.message, 0);
        }
    })
}
//Timetable teller functions
function timetable(q) {
    var d = new Date();
    var hr = d.getHours();
    var mm = hr * 60 + d.getMinutes();
    var day = (d.getDay() != 0) ? d.getDay() - 1 : 6;
    var showAll = 0;
    var dayKWsIndex = 99;
    var dayKWs = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "today", "tomorrow", "yesterday"]//Array of keys of showing whole timetable
    var x = ["previous", "now", "next"]
    if (dayKWs.indexOf(q) > -1)//Handler for telling day wise schedule
    { mm = 480; showAll = 1; dayKWsIndex = dayKWs.indexOf(q); }
    if (dayKWsIndex < 5)//if week days is asked
        day = dayKWsIndex;
    else
    {
        if (q == "tomorrow")
            day = (day != 6) ? day + 1 : 0;
        else if (q == "yesterday")
            day = (day != 0) ? day - 1 : 6;
    }
    if (mm < 480 || mm > 1020 || day > 4)
        chip(`Let's call it a day Sir`, 0, 1);
    else
    {
        var output = "";
        for (var i = 1; i < 11; i++)
        {
            if (mm <= ttslots[i])
            {   
                if (x.indexOf(q) > -1)//Handler for x keys
                {
                    if (q == x[0]) i--;
                    if (q == x[2]) i++;
                }
                if (ttdata[i - 1][day] == "")output += timeConvert(ttslots[i - 1]) + " " + "Chill out!<br/>";
                else output += `${timeConvert(ttslots[i - 1])} ${ttdata[i - 1][day]}<br/>`;
                if (showAll == 0)
                    break;
            }
        }
        chip(output, 0, 1)
    }
    
    return mm;
}
function getLyrics(singer, song)
{
    var URL = `http://lyric-api.herokuapp.com/api/find/${singer}/${song}`;
    $.getJSON(URL, function (data) {
        var obj = data.lyric;
        obj = obj.replace(/\n/g, "<br/>");
        try {
            if (obj == "") throw e;
            chip(`Here are the lyrics of song ${song} by ${singer}`, 0, 1)
            chip(obj, 0, 0);
        } catch (err) {
            chip(`I can't fetch the lyrics of song ${song}`, 0, 1);
            console.log(err.message);
        }
    })
}
//utilities
var timeConvert = function (n) {
    var minutes = n % 60;
    var hours = (n - minutes) / 60;
    if (minutes == 0) minutes = "00"
    if (minutes < 10 && minutes != 0) minutes = minutes + "0"
    return hours + ":" + minutes;
}
//get random values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Finds an ele exists in an ele
function indexOfInArr(arr1, arr2)
{
    var index = -1;
    for (var i = 0; i < arr2.length; i++)
        if (arr1.indexOf(arr2[i]) > -1)
            index = i;
    return index;
}
// Rendering Chats
function chip(txt, side, read) {
    if (typeof (txt) === "undefined") {
        console.log("undefined ignored"); return;
    }
    var side = (side == 0) ? "" : "right";
    var color = (side == 0) ? "pink" : "";
    var ren = document.getElementById("chatScreen");
    if(read == 1)say(txt);
    ren.innerHTML += `<tr>
                    <td></td>
                    <td class="${side}"><div style="background-color: ${color}" class="chip">${txt}</div></td>
                </tr>`;
}
// Sentence builder functions
function me_or_you(person_questioned)
{
    return (person_questioned == "user_info") ? "Your" : "My";
}
function prefix(w) {
    if (typeof (w) == "object") return `s are ${w}`;//are for a lot of peeps also add s
    if (isNaN(w.charAt(0)) == false) return ` is on ${w}`;//on for dates
    return ` is ${w}`;
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}

//Text to voice
// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = rate.value;
const pitch = document.querySelector('#pitch');
const pitchValue = pitch.value;
const body = document.querySelector('body');

// Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    // Loop through voices and create an option for each one
    voices.forEach(voice => {
        // Create option element
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = (txt) => {
    // Check if speaking
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    // textInput.value = "Hello I am c2 a bot created by my master";
    textInput.value = txt;

    if (textInput.value !== '') {
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Speak end
        speakText.onend = e => {
            console.log('Done speaking...');
        };

        // Speak error
        speakText.onerror = e => {
            console.error('Something went wrong');
        };

        // Selected voice
        const selectedVoice = "Microsoft Zira Desktop - English (United States)";

        // Loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);
    }
};
// EVENT LISTENERS
// Text form submit
function say(txt) {
    // textForm.submit();
    setTimeout(function () {
        // textForm.addEventListener('submit', e => {
        // e.preventDefault();
        speak(txt);
        textInput.blur();
        // });
    }, 150);
    // });
}

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());
//Greetings
var getGreetings = function() {
    var d = new Date();
    var h = d.getHours();
    var exaggeration = ["Good", "Crazy", "How is your"];
    var rand = getRandomInt(0, exaggeration.length - 1);
    if (h < 12 && h > 4) return `${exaggeration[rand]} Morning`;
    else if (h >= 12 && h < 18) return `${exaggeration[rand]} Afternoon`;
    else if (h >= 18 && h < 10) return `${exaggeration[rand]} Evening`;
    else return `${exaggeration[rand]} Night`;
}
var greetings = [`${people.ai[0].name} is at your service, ${people.user_info[0].nickname}`, `What can I do for you, ${people.user_info[0].nickname}`, `${getGreetings()}, ${people.user_info[0].nickname}`, "How are you doing, Sir"]
//Bot
document.addEventListener("DOMContentLoaded", function () {
    chip(greetings[getRandomInt(0, greetings.length - 1)], 0, 1);
});

function removeNonKeyWords(str)
{
    var nonKeyWords = ["a", "an", "the", "what", "where", "when", "how", "tell", "who",
        "is", "am", "are", "was", "were", "in", "out", "at", "on", "of", "over", "about", "me", "mine", "my", "i", "you", "your", "yours", "song"
    ];
    var words = str.toLowerCase().split(" ");
    var dec = 0;
    for (var i = 0; i < nonKeyWords.length - dec; i++)
    if (words.indexOf(nonKeyWords[i]) > -1) {
        var index = words.indexOf(nonKeyWords[i]);
        words.splice(index, 1);
        i--;
    }        
    return words;
}
var grattitude = ["thank you", "nice work", "great job", "well done", `I'm proud of you ${people.ai[0].name}`]
var grattitudeRevert = [`Nah, all thanks to you`, `You're Welcome`, `I always look forward to help you`, `You can count on me always ${people.user_info[0].nickname}`]
var loveGreets = [`love you`, `love you ${people.ai[0].name}`, `I love you`, `I love you ${people.ai[0].name}`]
var loveGreetsRevert = [`I love you too ${people.user_info[0].nickname}`, `Love you more`, `Love you way more`, `Fake Love, just kidding haha`]
var idk = [`Sorry, I don't understand`, `Pardon`, `Come again`, `Whut???`, `Can't get you`, `I beg your pardon`, `I'm sorry for not being deligent`, `Sorry, I was busy with something else, What did you say`, `I wish I could be more understandable`, `Ahhh a bug bit me`]
var notSure = [`Not sure but I guess you meant`, `I think asked`, `I guess you asked`, `Here's what I found`, `This might be helpful`]
function bot(q) {
    var Q = q;
    chip(Q, 1, 0);
    roseApi($q);
    // q = q.toLowerCase();
    // q = q.replace("'s", "");
    // var words = removeNonKeyWords(q);
    // if(indexOfInArr(q, ques_tags) > -1)
    // {
    //     var person_questioned = "@net"
    //     if (indexOfInArr(q, subject.user_info) > -1)
    //         person_questioned = "user_info";
    //     else if (indexOfInArr(q, subject.ai) > -1)
    //         person_questioned = "ai";
    //     if (person_questioned == "@net")
    //         dowiki(words[0]);
    //     // chip("hi", 0, 0)
    //     chip(`${me_or_you(person_questioned)} ${words[0]} ${prefix(people[person_questioned][0][words[0]])}`, 0, 1);
        return;
    }
    // if (subject.user_info.indexOf(words[2]) > -1)
        // var person_questioned = "user_info";
    // else if (subject.ai.indexOf(words[2]) > -1)
    //     var person_questioned = "ai";
    // if (ques_tags.indexOf(words[0]) > -1) //replies to a question
    // {
    //     chip(`${me_or_you(person_questioned)} ${words[3]}${prefix(people[person_questioned][0][words[3]])} `, 0, 1);
    // }
    if (searches.indexOf(words[0]) > -1) {
        dowiki(Q.substring(words[0].length + 1, Q.length));
        // console.log(org_q.substring(words[0].length + 1, org_q.length));
        return;
    }
    else if (words.indexOf("timetable") > -1 || words.indexOf("period") > -1 || (words.indexOf("time") > -1 && words.indexOf("table") > -1)) {
        var validttKWs = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "today", "tomorrow","yesterday", "previous", "now", "next"];
        for (var i = 0; i < validttKWs.length; i++)
            if (words.indexOf(validttKWs[i]) > -1) {
                timetable(validttKWs[i]);
                return;
            }
        chip(notSure[getRandomInt(0, notSure.length)], 0, 1)
        timetable("today")
        return;
    }
    else if (words.indexOf(`lyrics` > -1))
    {
        var index1 = words.indexOf("lyrics");
        var index2 = words.indexOf("by");
        var song = "";
        for (var i = index1 + 1; i < index2; i++)
            song += words[i] + " ";
        
        var singer = "";
        for (var i = index2 + 1; i < words.length; i++)
            singer += words[i]+" ";
        
        chip(getLyrics(singer, song), 0, 0);
        // return;
    }
    if (words.indexOf("weather") > -1) {
        var index = words.indexOf("weather");
        openWeather(words[index + 1]);
        // return;
    }
    else if (grattitude.indexOf(q) > -1) chip(grattitudeRevert[getRandomInt(0, grattitudeRevert.length)], 0, 1);
    else if (loveGreets.indexOf(q) > -1) chip(loveGreetsRevert[getRandomInt(0, loveGreetsRevert.length)], 0, 1);
    else chip(idk[getRandomInt(0, idk.length)], 0, 1)
}
