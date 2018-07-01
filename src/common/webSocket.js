
let webSocket = {
  ws: null,
  timeOut: null
}

let initWebSocket = function (options) {
  let url = options.url
  webSocket.ws = new WebSocket(url)
  webSocket.ws.onopen = function () {
    console.log('连接开启')
    webSocket.ws.send(`{"serviceType":"deploy","method":"add"}`)
    clearInterval(webSocket.timeout)
  }
  webSocket.ws.onmessage = function (message) {
    console.log(message.data)
    options.socketOnMessage(JSON.parse(message.data))
  }
  webSocket.ws.onclose = function () {
    console.log('连接关闭')
    clearInterval(webSocket.timeout)
    webSocket.timeout = setInterval(function () {
      initWebSocket(options)
    }, 5000)
  }
  return webSocket.ws
}
// 初始化webSocket
export default {
  initWebSocket
}
