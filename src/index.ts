import Canvas from './canvas'

class YYLiveBear {
  constructor() {
    this.init()
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
  }
}

window.onload = function() {
  new YYLiveBear()
}