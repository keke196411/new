// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import constant from '@/common/constant'
import utils from '@/common/commonUtils'
import bus from '@/common/eventbus'
import socket from '@/common/webSocket'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import infiniteScroll from 'vue-infinite-scroll'

// 显式地通过 Vue.use() 来安装 ElementUI
Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.prototype.$echarts = echarts
Vue.prototype.constant = constant
Vue.prototype.$utils = utils
Vue.prototype.$bus = bus
Vue.prototype.socket =
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data () {
    return {
      webSocket: ''
    }
  },
  created () {
    this.initWebSocket()
  },
  methods: {
    initWebSocket: function () {
      let vue = this
      this.webSocket = socket.initWebSocket({
        socketOnMessage: vue.socketOnMessage,
        // url: 'ws://192.168.22.108:9093/websocket',
        // url: 'ws://192.168.91.11:7072/websocket',
        // url: 'ws://localhost:9093/websocket',
        url: 'ws://192.168.92.1:7072/websocket',
        socketClose: vue.socketClose
      })
    },
    socketOnMessage: function (res) {
      bus.$emit('socketOnMessage', res)
    }
  }
})
