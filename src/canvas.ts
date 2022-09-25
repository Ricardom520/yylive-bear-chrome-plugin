type GradientColor = {
  pro: number
  color: string
}

interface CanvasStruct {
  canvas: HTMLCanvasElement
}

const gradientYellow: GradientColor[] = [
  {
    pro: 0,
    color: '#FFE652'
  },
  {
    pro: 1,
    color: '#FCD21C'
  }
]

import { playVoice } from './utils/func'

class Canvas implements CanvasStruct {
  readonly canvas: HTMLCanvasElement

  constructor() {
    this.canvas = document.getElementById('yylive_bear') as HTMLCanvasElement
  }

  init() {
    this.canvasRender()
  }

  public dbclick(fn: Function) {
    this.canvas.addEventListener('dblclick', () => {
      playVoice('https://web.yystatic.com/project/nearlive-static/mobile/voices/voice_02.mp3')
      fn()
      const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D

      this.drawChatBox(ctx,5,120,150,100)
    })
  }

  private canvasRender() {
    // canvas画布
    
    const ctx: CanvasRenderingContext2D  = this.canvas.getContext('2d') as CanvasRenderingContext2D

    const x = 43
    const y = 136

    // 左手
    leftHand()
    function leftHand() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(120, 235)
      ctx.bezierCurveTo(120, 235, 80, 250, 65, 310)
      ctx.bezierCurveTo(65, 310, 120, 310, 120, 240)
      ctx.fillStyle = '#FBC700'
      ctx.fill()
      ctx.closePath()

      ctx.beginPath()
      ctx.moveTo(70, 290)
      ctx.bezierCurveTo(70, 290, 60, 310, 80, 310)
      ctx.bezierCurveTo(80, 310, 85, 290, 70, 290)
      ctx.fillStyle = '#86491C'
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }

    // 右手
    rightHand()
    function rightHand() {
      ctx.beginPath()
      ctx.moveTo(125, 235)
      ctx.bezierCurveTo(125, 235, 165, 250, 180, 310)
      ctx.bezierCurveTo(180, 310, 125, 310, 125, 235)
      ctx.fillStyle = '#FBC700'
      ctx.fill()
      ctx.closePath()

      ctx.beginPath()
      ctx.moveTo(160, 295)
      ctx.bezierCurveTo(160, 295, 175, 275, 180, 310)
      ctx.bezierCurveTo(180, 310, 160, 310, 160, 295)
      ctx.fillStyle = '#86491C'
      ctx.fill()
      ctx.closePath()
    }

    // 身体
    bearBody()
    function bearBody() {
      ellipseOne(ctx, 121, 300, 38, 50, '#FDD528')
      ellipseOne(ctx, 121, 305, 20, 28, '#FFEFC5')
    }

    // 画脸
    bearFace()
    function bearFace() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(20 + x, 115 + y)
      ctx.bezierCurveTo(35 + x, 140 + y, 115 + x, 140 + y, 130 + x, 115 + y)

      ctx.bezierCurveTo(130 + x, 115 + y, 155 + x, 80 + y, 90 + x, 45 + y)
      ctx.bezierCurveTo(130 + x, 160 + y, 160 + x, 20 + y, 100 + x, 52 + y)
      ctx.bezierCurveTo(100 + x, 52 + y, 95 + x, 48 + y, 90 + x, 45 + y)
      
      ctx.bezierCurveTo(88 + x, 45 + y, 95 + x, 28 + y, 70 + x, 45 + y)
      ctx.bezierCurveTo(70 + x, 45 + y, 65 + x, 48 + y, 62 + x, 50 + y)
      
      ctx.bezierCurveTo(62 + x, 50 + y, 20 + x, 20 + y, 25 + x, 78 + y)
      ctx.bezierCurveTo(25 + x, 78 + y, 50 + x, 60 + y, 70 + x, 45 + y)
      
      ctx.bezierCurveTo(70 + x, 45 + y, 0 + x, 75 + y, 20 + x, 115 + y)
      fillGradientColor(ctx, 20 + x, 115 + y, 135, 135, gradientYellow)
      ctx.closePath()
      ctx.restore()
    }

    // 左耳
    leftEar()
    function leftEar() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(52 + x, 55 + y)
      ctx.bezierCurveTo(52 + x, 55 + y, 30 + x, 40 + y, 35 + x, 68 + y)
      fillColor(ctx, '#8D4F1F')
      ctx.closePath()
      ctx.restore()
    }

    // 右耳
    rightEar()
    function rightEar() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(125 + x, 74 + y)
      ctx.bezierCurveTo(125 + x, 74 + y, 130 + x, 50 + y, 110 + x, 58 + y)
      fillColor(ctx, '#8D4F1F')
      ctx.closePath()
      ctx.restore()
    }

    // 熊猫眼
    eyeBgColor()
    function eyeBgColor() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(78 + x, 80 + y)
      ctx.bezierCurveTo(70 + x, 55 + y, 40 + x, 65 + y, 35 + x, 95 + y)
      ctx.bezierCurveTo(35 + x, 95 + y, 30 + x, 122 + y, 60 + x, 110 + y)
      ctx.bezierCurveTo(60 + x, 110 + y, 80 + x, 95 + y, 100 + x, 110 + y)
      ctx.bezierCurveTo(100 + x, 110 + y, 125 + x, 125 + y, 122 + x, 96 + y)
      ctx.bezierCurveTo(122 + x, 90 + y, 106 + x, 45 + y, 87 + x, 80 + y)
      ctx.bezierCurveTo(87 + x, 80 + y, 84 + x, 85 + y, 78 + x, 80 + y)
      ctx.closePath()
      fillColor(ctx, '#8D4F1F')
      ctx.restore()
    }

    // 左眼
    leftEye()
    function leftEye() {
      ctx.save()
      ctx.beginPath()
      ellipseOne(ctx, 60 + x, 88 + y, 10, 13, '#FFF')
      ellipseOne(ctx, 59 + x, 88 + y, 8, 10, '#8D4F1F')
      ellipseOne(ctx, 60 + x, 85 + y, 3, 4, '#fff')
      ctx.restore()
    }

    // 右眼
    const _canvas = this.canvas
    rightEye()
    function rightEye() {
      ctx.save()
      let angle = 25
      let centerX = 102 + x 
      let centerY = 89 + y
      let ampl = 23
      let flag = true
      var distance = 14
      let num = 0
      function paint() {
        if (distance === 0) {
          flag = false
        } else if (distance === 14) {
          num++
          flag = true
        }

        if (flag) {
          distance--
        } else {
          distance++
        }
        ctx.beginPath()
        const k = .5522848
        const ox = 10 * k // 水平控制点偏移量
        const oy = 13 * k // 垂直控制点偏移量
        // // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(92 + x, 89 + y)
        ctx.bezierCurveTo(92 + x, 89 - oy + y, 102 - ox + x, 76 + y, 102 + x, 76 + y)
        ctx.bezierCurveTo(102 + ox + x, 76 + y, 112 + x, 89 - oy + y, 112 + x, 89 + y)
        ctx.bezierCurveTo(112 + x, 89 + oy + y, 102 + ox + x, 102 + y, 102 + x, 102 + y)
        ctx.bezierCurveTo(102 - ox + x, 102 + y, 92 + x, 89 + oy + y, 92 + x, 89 + y)
        ctx.fillStyle = '#fff'
        ctx.fill()
        ellipseOne(ctx, 102 +x , 89 + y, 8, 10, '#8D4F1F')
        ellipseOne(ctx, 100 + x, 87 + y, 3, 4, '#fff')
        ctx.beginPath()
        ctx.strokeStyle = '#8D4F1F'
        for (var i = 0; i < angle; i++) {
          ctx.moveTo(centerX-angle/2+i,centerY-distance);
          ctx.lineTo(centerX-angle/2+i, centerY-(Math.floor(Math.sin(Math.PI*i/angle) * ampl)));
          ctx.moveTo(centerX-angle/2+i,centerY+distance);
          ctx.lineTo(centerX-angle/2+i,centerY+(Math.floor(Math.sin(Math.PI*i/angle) * ampl)));
          ctx.stroke();
        }
        ctx.closePath()
      }
      paint()
      // setInterval(paint, 50)
      _canvas.addEventListener('dblclick', () => {
        const timer = setInterval(() => {
          if (num === 3) {
            console.log(num)
            clearInterval(timer)
            num = 0
          } else {
            paint()
          }
        }, 20)
      })
      
      ctx.restore()
    }

    // 鼻子
    mouse()
    function mouse() {
      ctx.save()
      ctx.moveTo(74 + x, 114 + y)
      ctx.beginPath()
      ctx.bezierCurveTo(74 + x, 114 + y, 80 + x, 124 + y, 88 + x, 114 + y)
      ctx.closePath()
      fillColor(ctx, '#8D4F1F')
      ctx.restore()
    }
    
    // 填充过渡颜色
    function fillGradientColor(context: CanvasRenderingContext2D, x: number, y: number, r1: number, r2: number, options: GradientColor[]) {
      var gradient = context.createLinearGradient(x, y, r1, r2)
      for (var i = 0; i < options.length; i++) {
        gradient.addColorStop(options[i].pro, options[i].color)
      }

      context.fillStyle = gradient
      context.fill()
    }

    // 一个椭圆
    function ellipseOne(context: CanvasRenderingContext2D, x: number, y: number, a: number, b: number, color: string) {
      var step = (a > b) ? 1 / a : 1 / b
      context.beginPath()
      context.moveTo(x + a, y)
      for(var i = 0; i < 2 * Math.PI; i += step) {
          context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i))
      }
      context.closePath()
      fillColor(context, color)
    }

    // 一个圆
    function fillAroundOne(context: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
      context.beginPath()
      context.arc(x, y, r, 0, 2 * Math.PI)
      context.closePath()
      fillColor(context, color)
    }

    // 填充椭圆
    function fillEllipseOne(context: CanvasRenderingContext2D, x: number, y: number, a: number, b: number, color: string) {
      var k = .5522848
      var ox = a * k // 水平控制点偏移量
      var oy = b * k // 垂直控制点偏移量
      // // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
      context.save()
      context.beginPath()
      context.moveTo(x - a, y)
      context.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b)
      context.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y)
      context.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b)
      context.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y)
      context.closePath()
      context.restore()
      fillColor(context, color)
    }

    // 填充颜色
    function fillColor(context: CanvasRenderingContext2D, val: string) {
      context.fillStyle = val
      context.fill()
    }
  }

  private drawChatBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.beginPath()
    ctx.moveTo(x, y + 0.35 * h)
    ctx.quadraticCurveTo(x + 0.04 * w, y + 0.02 * h, x + 0.5 * w, y)
    ctx.quadraticCurveTo(x + 0.96 * w, y + 0.02 * h, x + w, y + 0.35 * h)
    ctx.quadraticCurveTo(x + w, y + 0.7 * h, x + 0.58 * w, y + 0.72 * h)
    ctx.quadraticCurveTo(x + 0.5 * w, y + 0.9 * h, x + 0.6 * w, y + h)
    ctx.quadraticCurveTo(x + 0.38 * w, y + 0.80 * h, x + 0.38 * w, y + 0.72 * h)
    ctx.quadraticCurveTo(x, y + 0.70 * h, x, y + 0.35 * h)
    ctx.closePath()
    ctx.stroke()
    ctx.font = '14px Verdana'
    ctx.fillStyle = 'black'
    ctx.fillText('按着回车说话~', 30, 160)
  }
}

export default Canvas