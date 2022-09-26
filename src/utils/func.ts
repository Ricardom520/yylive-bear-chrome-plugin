/** 播放音频 */
export const playVoice = (url: string) => {
  return new Promise((resolve) => {
    const audioDom = document.createElement('audio')
    audioDom.src = url
    audioDom.autoplay = true
    document.body.appendChild(audioDom)

    audioDom.addEventListener('ended', function() {
      document.body.removeChild(audioDom)
      resolve(null)
    })
  })
}