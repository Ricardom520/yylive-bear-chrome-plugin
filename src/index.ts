import axios from 'axios'
import webSocket, { Socket } from 'socket.io-client'
import Canvas from './canvas'
import { h5recorder } from './h5recorder'

class YYLiveBear {
  private mediaRecorder: MediaRecorder | null
  private socketClient: Socket

  constructor() {
    this.init()
    // this.socketInit()

    this.mediaRecorder = null
  }

  private socketInit() {
    console.log('socketInit')
    this.socketClient = webSocket('http://127.0.0.1:7001', {
      query: {
        test: 'Hello World'
      }
    })
    this.socketClient.on('connect', () => {
      console.log('socket connected!')
    })

    this.socketClient.on('res', (msg) => {
      console.log(msg)
    })

    this.socketClient.on('disconnect', msg => {
      console.log(msg)
    })
  }

  private init() {
    // 创建全局dom 
    const dom = document.createElement('div')
    dom.id = 'yybear_pop'

    var temp = function() {
      return `<canvas id='yylive_bear' width="200" height="300"></canvas>`
    }

    dom.appendChild(this.createFrag(temp()))
    document.body.appendChild(dom)

    this.render()
  }

  private createFrag(temp: string) {
    return document.createRange().createContextualFragment(temp)
  }

  private render() {
    const canvas = new Canvas()
    canvas.init()
    canvas.dbclick(() => this.getAudioRecorder())
    // canvas.dbclick(() => {})
  }

  private async getAudioRecorder() {
    if (!this.mediaRecorder) {
      if (!navigator.mediaDevices.getUserMedia) {
        alert('很抱歉，当前浏览器不支持该功能~')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })
      console.log('stream:', stream)
      if (!stream) {
        console.error('授权失败')
        return
      }
      console.log('授权成功')
      this.mediaRecorder = new MediaRecorder(stream)
    }
    console.log(this.mediaRecorder)
    let start = false
    let recorder: any = null
    window.addEventListener('keydown', (e) => {
      if (this.mediaRecorder && !start && e.keyCode === 32) {
        h5recorder.get(function(rec: any) {
          recorder = rec
          recorder.start()
        })
        this.mediaRecorder.start()
        start = true
      }
    })

    window.addEventListener('keyup', (e) => {
      if (this.mediaRecorder && start && e.keyCode === 32) {
        this.mediaRecorder.stop()
        recorder.stop()
        // recorder.upload('http://127.0.0.1:8081/process_post', function(state: any, e: any) {
        //   switch (state) {
        //     case 'uploading':
        //         //var percentComplete = Math.round(e.loaded * 100 / e.total) + '%';
        //         break;
        //     case 'ok':
        //         //alert(e.target.responseText);
        //         console.log(e)
        //         alert("上传成功,在node的log中查看结果");
        //         //window.location.href="VideoSearchServlet.do";
        //         break;
        //     case 'error':
        //         alert("上传失败");
        //         break;
        //     case 'cancel':
        //         alert("上传被取消");
        //         break;
        //   }
        // })
        start = false
      }
    })
    
    this.mediaRecorder.ondataavailable = (e) => {
      console.log('====')
      console.log(e)
      console.log(e.data)
      const formData = new FormData()
      formData.append('voice', e.data, 'recorder.mp3')
      console.log('formData', formData)
      // this.socketClient.emit('send', {
      //   data: e.data
      // })
      axios({
        url: 'http://127.0.0.1:8081/process_post',
        method: 'post',
        data: formData
      })
      .then(res => {
        console.log('结果:', res)
      })
    } 
  }
}

window.onload = function() {
  new YYLiveBear()
}