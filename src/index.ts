import Canvas from './canvas'
import Recorder from './libs/recorder'
import { playVoice } from './utils/func'

enum MakeSure {
  Danmu = 'danmu',
  Gift = 'gift',
  Null = ''
}

type PluginPopSender = {
  id: string
  origin: string
}

class YYLiveBear {
  private canvas: Canvas
  private makeSure: MakeSure

  constructor() {
    // window.chrome.extension.onMessage.addEventListener(function (msg: string, sender: any, response: Function) {
    //   console.log(msg, sender)
    //   console.log('response:', response)
    //   response()
    // })
    // this.init()

    this.makeSure = MakeSure.Null
  }

  public init() {
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

  public destroy() {
    const target = document.getElementById('yybear_pop')

    document.body.removeChild(target)
  }

  private createFrag(temp: string) {
    return document.createRange().createContextualFragment(temp)
  }

  private render() {
    const canvas = new Canvas()
    canvas.init()
    canvas.dbclick(() => this.getAudioRecorder())

    this.canvas = canvas
  }

  private async getAudioRecorder() {
    let start = false
    Recorder.init()
    window.addEventListener('keydown', (e) => {
      if (!start && e.keyCode === 32) {
        this.canvas.fillText('说话中...', 30, 160)
        start = true
        Recorder.start()
      }
    })

    window.addEventListener('keyup', async (e) => {
      if (start && e.keyCode === 32) {
        this.canvas.fillText('思考中...', 30, 160)
        Recorder.stop()
        const res: any = await Recorder.upload()
        console.log('res:', res)
        this.handleWord(res.result[0])
        start = false
      }
    })
  }

  private async sayOk(fn?: Function) {
    await playVoice('https://web.yystatic.com/project/nearlive-static/mobile/voices/voice_01.mp3')

    fn && fn()
  }

  private handleWord(str: string) {
    if (str.indexOf('首页') > -1) {
       // 命中首页，跳转首页
      this.sayOk(() => window.location.href = 'https://https://www.yy.com')
    } else if (str.indexOf('弹幕') > -1) {
      // 命中弹慕，发送弹慕
      const danmu = str.split('弹幕')[1]
      console.log('danmu:', danmu)
      this.makeSure = MakeSure.Danmu
      this.canvas.fillText(`确定发送弹幕:${danmu}?`, 30, 160)
    } else if (str.indexOf('直播间') > -1) {
      // 命中直播间，跳转直播间
      this.sayOk(() => window.location.href = 'https://https://www.yy.com/54880976/54880976?tempId=16777217')
    } else if (str.indexOf('个人页') > -1) {
      // 命中个人页，跳转个人页
      this.sayOk(() => window.location.href = 'https://https://www.yy.com/u/40187')
    } else if (str.indexOf('礼物') > -1) {
      console.log('送礼:')
      this.makeSure = MakeSure.Gift
    } else if (str.indexOf('取消关注') > -1 || str.indexOf('取关') > -1) {
      console.log('取关行为')
      this.sayOk(() => window.postMessage({
        origin: 'yylive_plugin',
        data: {
          type: 2
        }
      }, 'https://www.yy.com'))
    } else if (str.indexOf('关注') > -1) {
      console.log('关注行为')
      this.sayOk(() => window.postMessage({
        origin: 'yylive_plugin',
        data: {
          type: 3
        }
      }, 'https://www.yy.com'))
    } else if (str.indexOf('确定') > -1) {
      if (this.makeSure === MakeSure.Danmu) {
        this.sayOk(() => window.postMessage({
          origin: 'yylive_plugin',
          data: {
            type: 0,
            value: 'Hello'
          }
        }, 'https://www.yy.com'))
      } else if (this.makeSure === MakeSure.Gift) {
        this.sayOk(() => window.postMessage({
          origin: 'yylive_plugin',
          data: {
            type: 1,
            value: {
              giftid: 3293,
              num: 1
            }
          }
        }, 'https://www.yy.com'))
      }

      this.makeSure = MakeSure.Null
    } else if (str.indexOf('熊') > -1) {
      playVoice('https://web.yystatic.com/project/nearlive-static/mobile/voices/voice_03.mp3')
    } else if (str.indexOf('有') > -1 && (str.indexOf('好看') > -1 || str.indexOf('精彩') > -1) && (str.indexOf('直播间') > -1 || str.indexOf('主播') > -1)) {
      playVoice('https://web.yystatic.com/project/nearlive-static/mobile/voices/voice_04.mp3')
    } 
  }
}

const yyLiveBear = new YYLiveBear()

// 接收来自后台的消息
window.chrome.runtime.onMessage.addListener(function(request: any, sender: PluginPopSender, sendResponse: Function)
{
  console.log('sender:', sender)
  console.log('request:', request)
  if (sender.id === 'ncknodifdefckbjbohkchjinagafjina') {
    if (request.yyliveOpen) {
      yyLiveBear.init()
    } else {
      yyLiveBear.destroy()
    }
  }
});