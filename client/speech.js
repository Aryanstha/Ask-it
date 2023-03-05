let recognition = null;
      let isListening = false;

      function startSpeech() {
        if (!recognition) {
          recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';
          recognition.onresult = handleSpeechResult;
        }
        recognition.start();
        isListening = true;
      }

      function stopSpeech() {
        if (recognition) {
          recognition.stop();
        }
        isListening = false;
      }

      function handleSpeechResult(event) {
        let result = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          result += event.results[i][0].transcript;
        }
        document.getElementById('result').textContent = result;
      }

      document.addEventListener('keydown', event => {
        if (event.key === ' ' && !isListening) {
          startSpeech();
        }
      });

      document.addEventListener('keyup', event => {
        if (event.key === ' ' && isListening) {
          stopSpeech();
        }
      });
