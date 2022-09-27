const bg = chrome.extension.getBackgroundPage()

// chrome.runtime.onMessage.addListener((req, sender, sendReponse) => {
//   console.log('----')
//   sendReponse('我收到了你的来信')
//   console.log('接收信息biubiubiu', req)
//   console.log(sender)
// })

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
  console.log('bg:', bg)
  // bg.toPopup()
  sendMessageToContentScript({
    yyliveOpen: active
  }, (response) => {
		if (response) {
      console.log('已收到信息:', response)
    };
	});
}

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

switchBtnDom.onclick = onSwitchStatus