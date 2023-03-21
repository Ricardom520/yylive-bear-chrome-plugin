class Recognition {
  recognition: any

  constructor() {
    this.recognition = new window.webkitSpeechRecognition()
  }

  recognitionStart() {
    this.recognition.start()
  }
}