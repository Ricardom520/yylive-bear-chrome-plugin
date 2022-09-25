import Canvas from './canvas'
import Recorder from './libs/recorder'

class YYLiveBear {

  constructor() {
    this.init()
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
  }

  private async getAudioRecorder() {
    let start = false
    Recorder.init()
    window.addEventListener('keydown', (e) => {
      if (!start && e.keyCode === 32) {
        start = true
        Recorder.start()
      }
    })

    window.addEventListener('keyup', async (e) => {
      if (start && e.keyCode === 32) {
        Recorder.stop()
        const res: any = await Recorder.upload()
        console.log('res:', res)
        this.handleWord(res.result[0])
        start = false
      }
    })
  }

  private handleWord(str: string) {
    if (str.indexOf('首页') > -1) {
       // 命中首页，跳转首页
      window.location.href = 'https://www.yy.com'
    } else if (str.indexOf('弹幕') > -1) {
      // 命中弹慕，发送弹慕
      const danmu = str.split('弹幕')[1]
      console.log('danmu:', danmu)
    } else if (str.indexOf('直播间') > -1) {
      // 命中直播间，跳转直播间
      window.location.href = 'https://www.yy.com/54880976/54880976?tempId=16777217'
    } else if (str.indexOf('个人页') > -1) {
      // 命中个人页，跳转个人页
      window.location.href = 'https://www.yy.com/u/40187'
    } else if (str.indexOf('礼物') > -1) {
      console.log('送礼:')
    } else if (str.indexOf('取消关注') > -1 || str.indexOf('取关') > -1) {
      console.log('取关行为')
    } else if (str.indexOf('关注') > -1) {
      console.log('关注行为')
    }
  }
}

window.onload = function() {
  new YYLiveBear()
}