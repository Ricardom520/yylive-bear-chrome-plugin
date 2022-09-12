import Canvas from './canvas'

class YYLiveBear {
  private mediaRecorder: MediaRecorder | null
  constructor() {
    this.init()

    this.mediaRecorder = null
  }

  private init() {
    // 创建全局dom 
    const dom = document.createElement('div')
    dom.id = 'yybear_pop'

    var temp = function() {
      return `<canvas id='yylive_bear'></canvas>`
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
    // canvas.dbclick(() => this.getAudioRecorder())
    canvas.dbclick(() => {})
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
    this.mediaRecorder.start()
    this.mediaRecorder.ondataavailable = function(e) {
      console.log('====')
      console.log(e)
    }

    setTimeout(() => {
      console.log('时间到')
      this.mediaRecorder?.stop()
    }, 5000)
  }
}

window.onload = function() {
  new YYLiveBear()
}