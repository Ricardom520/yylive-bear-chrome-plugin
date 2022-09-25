import axios from "axios";
import Recorder from "./_recorder"

var recorder: any = null
let audio_context: any = null

function startUserMedia(stream: any) {
  var input: any = audio_context.createMediaStreamSource(stream);
  console.log('Media stream created.');
 
  recorder = new Recorder(input,{
    numChannels:1,
    sampleRate: 16000
  });
  console.log('Recorder initialised.');
}

async function init() {
  try {
    // eslint-disable-next-line
    // @ts-ignore
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
    audio_context = new AudioContext({sampleRate: 16000});
    console.log(audio_context)
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  // eslint-disable-next-line
  // @ts-ignore
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    console.log('错误：', e)
  });
  
}

function startRecord() {
  recorder && recorder.record()
}

function stopRecord() {
  recorder && recorder.stop()
}

function upload() {
  if (recorder) {
    return new Promise((resolve, reject) => {
      recorder.exportWAV(async (blob: Blob) => {
        const formData = new FormData()
        formData.append('recorder.wav', blob)
    
        const res = await axios({
          url: 'http:127.0.0.1:8081/process_post',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        recorder.clear()
        resolve(res.data)
      })
    })
  }
}

export default {
  init: init,
  start: startRecord,
  stop: stopRecord,
  upload: upload
}