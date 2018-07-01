import http from '@/common/httpUtils'
// 获取分组列表
const getLogs = (callback, params) => {
  http.getRequest('/deploy/log', (res) => {
    callback(res)
  }, params, true)
}
export default {
  getLogs
}
