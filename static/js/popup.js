var switchBtnDom = document.getElementById('switchBtn')
function onSwitchStatus (e) {
  var target = e.target
  console.log(target.dataset.active)
  var active = target.dataset.active === 'true' ? false : true
  var domText = target.getElementsByClassName('txt')[0]
  var domIcon = target.getElementsByClassName('icon')[0]

  domText.innerText = active ? '关闭' : '开启'
  domIcon.src = active ? '../img/pop_open.png' : '../img/pop_close.png'
  target.dataset.active = active
}

switchBtnDom.onclick = onSwitchStatus