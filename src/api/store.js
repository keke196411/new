import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储状态值
  state: {
    user: {},
    groups: [],
    jobs: [],
    urlObject: {
      url: ''
    },
    logConfig: {
      url: ''
    },
    statisticsPage: {
      pageNo: ''
    }
  },
  mutations: {
    user: (state, payplay) => {
      state.user = payplay.amount
    },
    groups: (state, payplay) => {
      state.groups = payplay.amount
    },
    urlObject: (state, payplay) => {
      state.urlObject.url = payplay.amount
    },
    logConfig: (state, payplay) => {
      state.logConfig.url = payplay.amount
    },
    statisticsPage: (state, payplay) => {
      state.statisticsPage.pageNo = payplay.amount
    }
  },
  getters: {},
  actions: {}
})
