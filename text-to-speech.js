// https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/
const synth = window.speechSynthesis;

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
  
      utterThis.voice = synth.getVoices()[0];
      utterThis.pitch = 1.0;
      utterThis.rate = 0.9;
      synth.speak(utterThis);
    }
  }