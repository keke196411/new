import http from '@/common/httpUtils'

// 获取作业列表
const getJobs = (params, callback) => {
  http.getRequest(params.url, (res) => {
    callback(res)
  }, params, true)
}

// 获取作业信息
const getJobDetailsForEditing = (jobId, callback) => {
  http.getRequest(`/deploy/job/${jobId}`, (res) => {
    callback(res)
  })
}

// 获取作业信息
const getJobDetailsForWatching = (jobId, callback) => {
  http.getRequest(`/deploy/job_des/${jobId}`, (res) => {
    callback(res)
  })
}

// 删除作业
const deleteJob = (jobId, callback) => {
  http.deleteRequest(`/deploy/job/${jobId}`, null, (res) => {
    callback(res)
  })
}
// 更新作业
const updateJob = (params, callback) => {
  http.putRequest(`/deploy/job/${params.param.jobId}/update`, params, (res) => {
    callback(res)
  })
}

/** 改状态 **/
const getStatusUrlMapper = (action, jobId) => {
  return `/deploy/job/${jobId}/${action}`
}
const changeStatus = (action, jobId, callback) => {
  let url = getStatusUrlMapper(action, jobId)
  http.putRequest(url, {
    'jobId': jobId
  }, (res) => {
    callback(res)
  })
}
const forceToStart = (jobId, forceToStart, callback) => {
  http.putRequest(`/deploy/job/${jobId}/start`, {
    'jobId': jobId,
    param: {
      forceToStart: forceToStart
    }
  }, (res) => {
    callback(res)
  })
}
export default{
  deleteJob,
  changeStatus,
  getJobDetailsForWatching,
  getJobDetailsForEditing,
  updateJob,
  getJobs,
  forceToStart
}
