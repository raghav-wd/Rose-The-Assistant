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
        speak(dontSay(txt));
        textInput.blur();
    }, 150);
}

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

function dontSay(str) {
    var open = str.indexOf("{|");
    var end = str.indexOf("|}");
    if (open != -1 && end != -1) {
        str = str.substring(0, open) + str.substring(end + 2, str.length)
        return dontSay(str);
    } else return str
}