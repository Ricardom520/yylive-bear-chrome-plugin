interface H5recorderConfigStruct {
  sampleBits?: number
  sampleRate?: number
}

interface AudioDataStruct {
  size: number
  buffer: string[]
  inputSampleRate: number
  inputSampleBits: number
  outputSampleRate: number
  outputSampleBits: number
  input: any
  compress: () => void
  encodeWAV: () => void
}

export const h5recorder: any = function (stream: MediaStream, config: H5recorderConfigStruct) {
  config = config || {}
  config.sampleBits = config.sampleBits || 16 // 采样数位 8， 16
  config.sampleRate = config.sampleRate || (8000) // 采样率(1/6 44100)

  const context = new AudioContext()
  const audioInput = context.createMediaStreamSource(stream)
  const recorder = context.createScriptProcessor(4096, 1, 1)

  const audioData: AudioDataStruct = {
    /** 录音文件长度 */
    size: 0,
    /** 录音缓存 */
    buffer: [],
    /** 输入采样率 */
    inputSampleRate: context.sampleRate,
    /** 输入采样数位 8, 16 */
    inputSampleBits: 16,
    /** 输出采样率 */
    outputSampleRate: config.sampleRate,
    /** 输出采样数位 8, 16 */
    outputSampleBits: config.sampleBits,
    input: function (data: number[]) {
      this.buffer.push(new Float32Array(data))
      this.size += data.length
    },
    /** 合并压缩 */
    compress: function() {
      // 合并
      const data = new Float32Array(this.size)
      let offset = 0
      
      for (let i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset)
        offset += this.buffer[i].length
      }

      // 压缩
      const compression = this.inputSampleRate / this.outputSampleBits
      const length = data.length / compression
      const result = new Float32Array(length)
      let index = 0, j = 0

      while (index < length) {
        result[index] = data[j]
        j += compression
        index++
      }

      return result
    },
    encodeWAV: function() {
      const sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate)
      const sampleBits = Math.min(this.inputSampleBits, this.outputSampleBits)
      const bytes = this.compress()
      const dataLength = bytes.length * (sampleBits / 8)
      const buffer = new ArrayBuffer(44 + dataLength)
      const data = new DataView(buffer)

      const channelCount = 1
      let offset = 0

      const writeString = function(str: string) {
        for (let i = 0; i < str.length; i++) {
          data.setUint8(offset + i, str.charCodeAt(i))
        }
      }

      // 资源交换文件标识符
      writeString('RIFF')
      offset += 4
      // 下个地址开始到文件尾总字节数，即文件大小-8
      data.setUint32(offset, 36 + dataLength, true)
      offset += 4
      // WAV文件标志
      writeString('WAVE')
      offset += 4
      // 波形格式标志
      writeString('fmt ')
      offset += 4
      // 过滤字节，一般为 0*10 = 16
      data.setUint32(offset, 16, true)
      offset += 4
      // 格式类别 （PCM形式采样数据）
      data.setUint16(offset, 1, true)
      offset += 2
      // 通道数
      data.setUint16(offset, channelCount, true)
      offset += 2
      // 采样率，每秒样本数，表示每个通道的播放速度
      data.setUint32(offset, sampleRate, true)
      offset += 4
      // 波形数据传输率（每秒平均字节数）单声道*每秒数据位数*每样本数据位/8
      data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true)
      offset += 4
      // 快数据调整数 采样一次占用字节数 单声道*每样本的数据位数/8
      data.setUint32(offset, channelCount * (sampleBits / 8), true)
      offset += 2
      // 每样本数据位数
      data.setUint16(offset, sampleBits, true)
      offset += 2
      // 数据标识符
      writeString('data')
      offset += 4
      // 采样数据总和，即数据总大小-44
      data.setUint32(offset, dataLength, true)
      offset += 4
      // 写入采样数据
      if (sampleBits === 8) {
        for (let i = 0; i < bytes.length; i++, offset++) {
          const s = Math.max(-1, Math.min(1, bytes[i]))
          let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
          val = 255 / (65535 / (val + 32768))
          data.setInt8(offset, val)
        }
      } else {
        for (var i = 0; i < bytes.length; i++, offset += 2) {
          const s = Math.max(-1, Math.min(1, bytes[i]));
          data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
      }

      return new Blob([data], {
        type: 'audio/wav'
      })
    }
  }

  /** 开始录音 */
  this.start = function() {
    audioInput.connect(recorder);
    recorder.connect(context.destination)
  }

  /** 停止 */
  this.stop = function() {
    recorder.disconnect()
  }

  /** 获取音频文件 */
  this.getBlob = function() {
    this.stop()
    return audioData.encodeWAV()
  }

  /** 回放 */
  // this.play = function (audio) {
  //   audio.src = window.URL.createObjectURL(this.getBlob());
  // }


  /** 上传 */
  this.upload = function (url: string, callback: Function) {
    var fd = new FormData();
    fd.append("audioData", this.getBlob());
    var xhr = new XMLHttpRequest();
    if (callback) {
        xhr.upload.addEventListener("progress", function (e) {
            callback('uploading', e);
        }, false);
        xhr.addEventListener("load", function (e) {
            callback('ok', e);
        }, false);
        xhr.addEventListener("error", function (e) {
            callback('error', e);
        }, false);
        xhr.addEventListener("abort", function (e) {
            callback('cancel', e);
        }, false);
    }
    xhr.open("POST", url);
    xhr.send(fd);
    //xhr.send('56766758');
    //console.log(xhr.responseText);
  }

  /** 音频采集 */
  recorder.onaudioprocess = function (e) {
    audioData.input(e.inputBuffer.getChannelData(0));
    //record(e.inputBuffer.getChannelData(0));
  }
}

/** 抛出异常 */
h5recorder.throwError = function (message: string) {
  console.error(message)
}

/** 是否支持录音 */
h5recorder.canRecording = (navigator.mediaDevices.getUserMedia !== null)

/** 获取录音机 */
h5recorder.get = function(callback: Function, config: H5recorderConfigStruct) {
  if (callback) {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then((stream) => {
        const src = new h5recorder(stream, config)
        callback(src)
      })
      .catch((error) => {
        switch (error.code || error.name) {
          case 'PERMISSION_DENIED':
          case 'PermissionDeniedError':
            h5recorder.throwError('用户拒绝提供信息。');
            break;
          case 'NOT_SUPPORTED_ERROR':
          case 'NotSupportedError':
            h5recorder.throwError('浏览器不支持硬件设备。');
            break;
          case 'MANDATORY_UNSATISFIED_ERROR':
          case 'MandatoryUnsatisfiedError':
            h5recorder.throwError('无法发现指定的硬件设备。');
            break;
          default:
            h5recorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
            break;
        }
      })
    } else {
      h5recorder.throwError('当前浏览器不支持录音功能。')
      return
    }
  }
}