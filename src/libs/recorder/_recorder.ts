import InlineWorker from 'inline-worker'

/** 配置信息 */
interface RecorderConfig {
  /** 截取二进制长度 */
  bufferLen?: number
  /** 声道数量 */
  numChannels?: number
  /** 媒体类型 */
  mimeType?: string
  /** 采样率 */
  sampleRate?: number
  /** 回调函数 */
  callback?: Function
}

/** callbacl Function */
type RecorderCallback = Record<string, Array<Function>> 

interface WorkerMessageStruct {
  data: {
    /** 命令类型 */
    command: string
    /** 配置 */
    config: RecorderConfig
    /** 二进制数据 */
    buffer: Array<Float32Array>
    /** 音频类型 */
    type: string

    data?: WorkerMessageStruct
  }
}

class Recorder {
  private context: BaseAudioContext
  private node: ScriptProcessorNode
  private worker: any
  private config: RecorderConfig = {
    bufferLen: 4096,
    numChannels: 2,
    mimeType: 'audio/wav'
  }

  recording = false

  callbacks: RecorderCallback = {
    getBuffer: [],
    exportWAV: []
  }

  constructor(source: AudioNode, cfg: RecorderConfig) {
    Object.assign(this.config, cfg)

    this.context = source.context
    this.node = (this.context.createScriptProcessor).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels)

    this.node.onaudioprocess = (e) => {
      if (!this.recording) return

      const buffer = []
      for (let channel = 0; channel < this.config.numChannels; channel++) {
        buffer.push(e.inputBuffer.getChannelData(channel))
      }

      this.worker.postMessage({
        command: 'record',
        buffer: buffer
      })
    }

    source.connect(this.node)
    /** 获取上下文所有音频的最终目的地的值 */
    this.node.connect(this.context.destination)

    let self = {}
    this.worker = new InlineWorker(function() {
      let recLength = 0,
          recBuffers: Array<Array<Float32Array>> = [],
          sampleRate: number,
          numChannels: number

      this.onmessage = function(e: WorkerMessageStruct) {
        switch (e.data.command) {
          case 'init':
            init(e.data.config)
            break
          case 'record':
            record(e.data.buffer)
            break
          case 'exportWAV':
            exportWAV(e.data.type)
            break
          case 'getBuffer':
            getBuffer()
            break
          case 'clear':
            clear()
            break
        }
      }

      /** 初始化 */
      function init(config: RecorderConfig) {
        sampleRate = config.sampleRate
        numChannels = config.numChannels
        initBuffers()
      }

      /** 记录数据 */
      function record(inputBuffer: Array<Float32Array>) {
        for (let channel = 0; channel < numChannels; channel++) {
          recBuffers[channel].push(inputBuffer[channel])
        }
        recLength += inputBuffer[0].length
      }

      /** 导出wav */
      function exportWAV(type: string) {
        const buffers = []

        for (let channel = 0; channel < numChannels; channel++) {
          buffers.push(mergeBuffers(recBuffers[channel], recLength))
        }

        let interleaved
        if (numChannels === 2) {
          interleaved = interleave(buffers[0], buffers[1])
        } else if (numChannels === 1) {
          interleaved = extractSingleChannel(buffers[0])
        } else {
          interleaved = buffers[0]
        }

        const dataview = encodeWAV(interleaved)
        const audioBlob = new Blob([dataview], {type: type})

        this.postMessage({command: 'exportWAV', data: audioBlob})
      }

      /** 处理单声道书籍 */
      function extractSingleChannel(input: Float32Array) {
        const samleStep = 1

        // 如果此处不按比例缩短，实际输出的文件会包含sampleStep倍长度的空录音
        const length = Math.ceil(input.length / samleStep)
        const result = new Float32Array(length)
        let index = 0,
            inputIndex = 0
        
        while (index < length) {
          // 此处是处理关键，算法就是输入的数据点每隔sampleStep距离取一个点放入result
          result[index++] = input[inputIndex]
          inputIndex += samleStep
        }

        return result
      }

      /** 获取buffer */
      function getBuffer() {
        const buffers = []

        for (let channel = 0; channel < numChannels; channel++) {
          buffers.push(mergeBuffers(recBuffers[channel], recLength))
        }

        this.postMessage({ command: 'getBuffer', data: buffers })
      }

      /** 清理数据 */
      function clear() {
        recLength = 0
        recBuffers = []
        initBuffers()
      }

      /** 初始化数据 */
      function initBuffers() {
        for (let channel = 0; channel < numChannels; channel++) {
          recBuffers[channel] = []
        }
      }

      /** 压缩数据 */
      function mergeBuffers(recBuffers: Array<Float32Array>, recLength: number) {
        const result = new Float32Array(recLength)
        let offset = 0

        for (let i = 0; i < recBuffers.length; i++) {
          result.set(recBuffers[i], offset)
          offset += recBuffers[i].length
        }

        return result
      }

      /** 处理双声道数据 */
      function interleave(inputL: Float32Array, inputR: Float32Array) {
        const length = inputL.length + inputR.length
        const result = new Float32Array(length)

        let index = 0,
            inputIndex = 0

        while (index < length) {
          result[index++] = inputL[inputIndex]
          result[index++] = inputR[inputIndex]
          inputIndex++
        }

        return result
      }

      /** 处理16字节PCM */
      function floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
        for (let i = 0; i < input.length; i++, offset += 2) {
          const s = Math.max(-1, Math.min(1, input[i]))
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
        }
      }

      /** 插入字符串标识 */
      function writeString(view: DataView, offset: number, string: string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i))
        }
      }

      /** 转WAV */
      function encodeWAV(samples: Float32Array) {
        const buffer = new ArrayBuffer(44 + samples.length * 2)
        const view = new DataView(buffer)

        /** RIFF 标识符 */
        writeString(view, 0, 'RIFF')
        /** RIFF 块长度 */
        view.setUint32(4, 36 + samples.length * 2, true)
        /** RIFF 类型 */
        writeString(view, 8, 'WAVE')
        /** fmt 标识符 */
        writeString(view, 12, 'fmt')
        /** fmt 块长度 */
        view.setUint32(16, 16, true)
        /** 样本格式（raw） */
        view.setUint16(20, 1, true)
        /** 声道数量 */
        view.setUint16(22, numChannels, true)
        /** 样本率 */
        view.setUint32(24, sampleRate, true)
        /** 字节率 （样本率 * 块对齐） */
        view.setUint32(28, sampleRate * 4, true)
        /** 块对齐 （声道数量 * 每个样本的字节数） */
        view.setUint16(32, numChannels * 2, true)
        /** 每个样本的字节数 */
        view.setUint16(34, 16, true)
        /** 添加data标识符 */
        writeString(view, 36, 'data')
        /** data长度 */
        view.setUint32(40, samples.length * 2, true)

        floatTo16BitPCM(view, 44, samples)

        return view
      }
    }, self)

    this.worker.postMessage({
      command: 'init',
      config: {
        samleRate: this.context.sampleRate,
        numChannels: this.config.numChannels
      }
    })

    this.worker.onmessage = (e: WorkerMessageStruct) => {
      let cb: Function = this.callbacks[e.data.command].pop()

      if (typeof cb === 'function') {
        cb(e.data.data)
      }
    }
  }
  
  public record() {
    this.recording = true
  }

  public stop() {
    this.recording = false
  }

  public clear() {
    this.worker.postMessage({ command: 'clear' })
  }

  public getBuffer(cb: Function) {
    cb = cb || this.config.callback

    if (!cb) throw new Error('Callbak not set')

    this.callbacks.getBuffer.push(cb)

    this.worker.postMessage({ command: 'getBuffer' })
  }

  public exportWAV(cb: Function, mineType: string) {
    mineType = mineType || this.config.mimeType
    cb = cb || this.config.callback

    if (!cb) throw new Error('Callback not set')

    this.callbacks.exportWAV.push(cb)

    this.worker.postMessage({
      command: 'exportWAV',
      type: mineType
    })
  }

  public forceDonload(blob: Blob, filename: string) {
    const url = (window.URL || window.webkitURL).createObjectURL(blob)
    const link = window.document.createElement('a')

    link.href = url
    link.download = filename || 'output.wav'
    
    let click = document.createEvent('Event')
    click.initEvent('click', true, true)
    link.dispatchEvent(click)
  }
}

export default Recorder