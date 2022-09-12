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
      const audioDom = document.createElement('audio')
      audioDom.src = 'https://web.yystatic.com/project/nearlive-static/mobile/voices/voice_02.mp3'
      audioDom.autoplay = true
      document.body.appendChild(audioDom)

      audioDom.addEventListener('ended', function() {
        document.body.removeChild(audioDom)
      })

      fn()
      const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D

      this.drawChatBox(ctx,10,10,100,100)
    })
  }

  private canvasRender() {
    // canvas画布
    
    const ctx: CanvasRenderingContext2D  = this.canvas.getContext('2d') as CanvasRenderingContext2D

    // 画脸
    bearFace()
    function bearFace() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(20, 115)
      ctx.bezierCurveTo(35, 140, 115, 140, 130, 115)

      ctx.bezierCurveTo(130, 115, 155, 80, 90, 45)
      ctx.bezierCurveTo(130, 160, 160, 20, 100, 52)
      ctx.bezierCurveTo(100, 52, 95, 48, 90, 45)
      
      ctx.bezierCurveTo(88, 45, 95, 28, 70, 45)
      ctx.bezierCurveTo(70, 45, 65, 48, 62, 50)
      
      ctx.bezierCurveTo(62, 50, 20, 20, 25, 78)
      ctx.bezierCurveTo(25, 78, 50, 60, 70, 45)
      
      ctx.bezierCurveTo(70, 45, 0, 75, 20, 115)
      fillGradientColor(ctx, 20, 115, 135, 135, gradientYellow)
      ctx.closePath()
      ctx.restore()
    }

    // 左耳
    leftEar()
    function leftEar() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(52, 55)
      ctx.bezierCurveTo(52, 55, 30, 40, 35, 68)
      fillColor(ctx, '#8D4F1F')
      ctx.closePath()
      ctx.restore()
    }

    // 右耳
    rightEar()
    function rightEar() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(125, 74)
      ctx.bezierCurveTo(125, 74, 130, 50, 110, 58)
      fillColor(ctx, '#8D4F1F')
      ctx.closePath()
      ctx.restore()
    }

    // 熊猫眼
    eyeBgColor()
    function eyeBgColor() {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(78, 80)
      ctx.bezierCurveTo(70, 55, 40, 65, 35, 95)
      ctx.bezierCurveTo(35, 95, 30, 122, 60, 110)
      ctx.bezierCurveTo(60, 110, 80, 95, 100, 110)
      ctx.bezierCurveTo(100, 110, 125, 125, 122, 96)
      ctx.bezierCurveTo(122, 90, 106, 45, 87, 80)
      ctx.bezierCurveTo(87, 80, 84, 85, 78, 80)
      ctx.closePath()
      fillColor(ctx, '#8D4F1F')
      ctx.restore()
    }

    // 左眼
    leftEye()
    function leftEye() {
      ellipseOne(ctx, 60, 88, 10, 13, '#FFF')
      ellipseOne(ctx, 61, 88, 8, 10, '#8D4F1F')
      ellipseOne(ctx, 64, 85, 3, 4, '#fff')
    }

    // 右眼
    const canvas = this.canvas
    rightEye()
    function rightEye() {
      ctx.save()
      let angle = 25
      let centerX = 102
      let centerY = 89
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
        ctx.moveTo(92, 89)
        ctx.bezierCurveTo(92, 89 - oy, 102 - ox, 76, 102, 76)
        ctx.bezierCurveTo(102 + ox, 76, 112, 89 - oy, 112, 89)
        ctx.bezierCurveTo(112, 89 + oy, 102 + ox, 102, 102, 102)
        ctx.bezierCurveTo(102 - ox, 102, 92, 89 + oy, 92, 89)
        ctx.fillStyle = '#fff'
        ctx.fill()
        ellipseOne(ctx, 102, 89, 8, 10, '#8D4F1F')
        ellipseOne(ctx, 104, 87, 3, 4, '#fff')
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
      canvas.addEventListener('click', () => {
        const timer = setInterval(() => {
          if (num === 1) {
            clearInterval(timer)
            num = 0
          } else {
            paint()
          }
        }, 25)
      })
      
      ctx.restore()
    }

    // 鼻子
    mouse()
    function mouse() {
      ctx.save()
      ctx.moveTo(74, 114)
      ctx.beginPath()
      ctx.bezierCurveTo(74, 114, 80, 124, 88, 114)
      ctx.closePath()
      fillColor(ctx, '#8D4F1F')
      ctx.restore()
    }
    
    // 填充过渡颜色
    function fillGradientColor(context: CanvasRenderingContext2D , x: number, y: number, r1: number, r2: number, options: GradientColor[]) {
      var gradient = context.createLinearGradient(x, y, r1, r2)
      for (var i = 0; i < options.length; i++) {
        gradient.addColorStop(options[i].pro, options[i].color)
      }

      context.fillStyle = gradient
      context.fill()
    }

    // 一个椭圆
    function ellipseOne(context: CanvasRenderingContext2D , x: number, y: number, a: number, b: number, color: string) {
      var step = (a > b) ? 1 / a : 1 / b
      context.beginPath()
      context.moveTo(x + a, y)
      for(var i = 0; i < 2 * Math.PI; i += step) {
          context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i))
      }
      context.closePath()
      fillColor(context, color)
    }

    // 填充颜色
    function fillColor(context: CanvasRenderingContext2D , val: string) {
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
    ctx.quadraticCurveTo(x + 0.5 * w, y + 0.9 * h, x + 0.2 * w, y + h)
    ctx.quadraticCurveTo(x + 0.38 * w, y + 0.80 * h, x + 0.38 * w, y + 0.72 * h)
    ctx.quadraticCurveTo(x, y + 0.70 * h, x, y + 0.35 * h)
    ctx.stroke()
  }
}

export default Canvas