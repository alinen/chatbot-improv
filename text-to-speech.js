// https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/
const synth = window.speechSynthesis;


const voiceSelect = document.getElementById("voices");
const pitch = document.getElementById("pitch");
const pitchValue = document.getElementById("pitch-value");
const rate = document.getElementById("rate");
const rateValue = document.getElementById("rate-value");

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
      selectedIndex = i;
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(response) {
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }
  
    if (response !== "") {
      const utterThis = new SpeechSynthesisUtterance(response);
  
      utterThis.onend = function (event) {
        endAnimateWord(event.utterance.text);
      };

      utterThis.onboundary = function (event) {
        animateWord(event.utterance.text, event.charIndex);
      };
  
      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };
  
      // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
      const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
          break;
        }
      }
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      synth.speak(utterThis);
    }
  }