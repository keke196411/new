import http from '@/common/httpUtils'

const getOverride = (callback) => {
  http.getRequest('/deploy/overview', (res) => {
    callback(res)
  })
}
export default {
  getOverride
}
