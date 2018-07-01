import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/api/store'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
// 拦截请求
axios.interceptors.request.use(config => {
  let name = store.state.user.name
  if (config.data) {
    config.data['user'] = name
  } else {
    config.url += '?user=' + name
  }
  return config
}, err => {
  Message.error({message: '请求超时!'})
  return Promise.resolve(err)
})
// 拦截返回值
axios.interceptors.response.use(data => {
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器找不到'})
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'})
  } else {
    Message.error({message: '未知错误!'})
  }
  return Promise.resolve(err)
})

let base = ''
// post
const postRequest = (url, params, callback) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  }).then((res) => {
    if (errorHandler(res)) {
      return
    }
    callback(res.data.data)
  })
}
// update
const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// put 请求不拦截错误
const putRequest = (url, params, callback) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  }).then((res) => {
    callback(res.data)
  })
}
// delete
const deleteRequest = (url, params, callback) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  }
  return axios.delete(url, config).then((res) => {
    if (errorHandler(res)) {
      return
    }
    callback(res.data.data)
  })
}
// get
const getRequest = (url, callback, params, isNotHandleError) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  }).then((res) => {
    if (!isNotHandleError && errorHandler(res)) {
      return
    }
    callback(res.data.data)
  })
}

const errorHandler = (res) => {
  if (res.data.errorCode !== '0') {
    Message.error({message: res.data.message})
    return true
  }
}
export default {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
  uploadFileRequest
}
