import http from '@/common/httpUtils'
import utils from '@/common/commonUtils'

// 作业概览总统计
const getJobStatsOverview = (callback, params) => {
  http.getRequest(`/stats/jobStatsOverview`, (res) => {
    callback(res)
  }, formatterDate(params))
}

// 作业概览图标坐标数据
const getJobStatsChartPoint = (callback, params) => {
  http.getRequest(`/stats/jobStatsChartPoint`, (res) => {
    callback(res)
  }, formatterDate(params))
}

// 作业概览作业统计列表
const getJobStatsCount = (callback, params) => {
  http.getRequest(`/stats/jobStatsCount`, (res) => {
    callback(res)
  }, formatterDate(params))
}

// 作业概览某个作业统计历史列表
const getJobStatsHistory = (callback, params) => {
  http.getRequest(`/stats/jobStatsHistory`, (res) => {
    formatterJobStatsHistoryData(res, callback)
  }, formatterDate(params))
}

const formatterJobStatsHistoryData = (res, callback) => {
  res.content.forEach((element, key) => {
    element.triggerTime = utils.formatDateFromLong(element.triggerTime, 'yyyy/MM/dd hh:mm:ss')
    element.time = res.totalCount - (res.currentPageNo - 1) * res.currentPageSize - key
    element.isMore = false
    if (key === res.content.length - 1 && (res.currentPageNo - 1) * res.currentPageSize + key + 1 < res.totalCount) {
      element.isMore = true
    }
  })
  callback(res)
}
const formatterDate = (condition) => {
  condition.startTime = new Date(condition.startTime).getTime()
  condition.endTime = new Date().getTime()
  if (condition.endTime) {
    condition.endTime = new Date(condition.endTime).getTime()
  }
  return condition
}
export default {
  getJobStatsOverview,
  getJobStatsChartPoint,
  getJobStatsCount,
  getJobStatsHistory
}
