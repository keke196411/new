// 作业状态
const JOB_STATUS_LIST = [
  {label: '全部', value: -1},
  {label: '正常', value: -2},
  {label: '待调度', value: 0},
  {label: '待执行', value: 5},
  {label: '执行中', value: 1},
  {label: '暂停中', value: 2},
  {label: '完成', value: 3},
  {label: '异常', value: 4}
]
const JOB_STATUS_OBJECT = {
  ALL: {label: '全部', value: -1},
  NORMAL: {label: '正常', value: -2},
  PUBLISHED: {label: '待调度', value: 0, color: '#787878', icon: '', tableClass: 'published'},
  RUNNING: {label: '执行中', value: 1, color: '#0ab301', icon: [{clazz: 'icon-pause', title: '暂停', action: 'suspend'}, {clazz: 'icon-stop', title: '停止', action: 'stop'}], tableClass: 'running'},
  PAUSE: {label: '暂停中', value: 2, color: '#bd4bff', icon: [{clazz: 'icon-recovery', title: '继续', action: 'resume'}, {clazz: 'icon-stop', title: '停止', action: 'stop'}], tableClass: 'pause'},
  COMPLETE: {label: '完成', value: 3, color: '#6291f3', icon: [{clazz: 'icon-start', title: '开始', action: 'start'}], tableClass: 'complete'},
  ERROR: {label: '异常', value: 4, color: '#fc4c7a', icon: [{clazz: 'icon-start', title: '开始', action: 'start'}], tableClass: 'error'},
  WATTING: {label: '等待执行', value: 5, color: '#ff9c58', icon: [{clazz: 'icon-pause', title: '暂停', action: 'suspend'}, {clazz: 'icon-stop', title: '停止', action: 'stop'}], tableClass: 'watting'}
}
// 作业类型
const JOB_TYPE = [
  {label: '未设置', value: 0},
  {label: '实时作业', value: 1},
  {label: '定时作业', value: 2},
  {label: 'cron作业', value: 3},
  {label: '重复作业', value: 4}
]
// 作业性质
const JOB_PROPERTY = [
  {label: '全部', value: -1},
  {label: 'API作业', value: 0},
  {label: '调度作业', value: 1}
]
// 作业优先级
const JOB_PRIORITY = [{value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}, {value: '4', label: '4'}, {value: '5', label: '5'}, {value: '6', label: '6'}]
// 分页默认信息
const DEFAULT_PAGE_INFO = {pageSize: 10, pageNo: 1}
// 柱状图图表展示方式
const BAR_POSTION = {VERTICAL: 'VERTICAL', HORIZONTAL: 'HORIZONTAL'}

// 提示信息
const MESSAGE = {
  GROUP_ADD_SUCCESS: '成功添加分组',
  GROUP_DELETE_SUCCESS: '成功删除分组',
  GROUP_UPDATE_SUCCESS: '成功更新分组'
}
// 00~59
const NUMBER_LT_60 = [
  ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'],
  ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
  ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39'],
  ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
  ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
]
const NUMBER_LT_24 = [
  ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
  ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
]
const NUMBER_LT_32 = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
  ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  ['31']
]
const NUMBER_LT_8 = [
  ['1', '2', '3', '4', '5', '6', '7']
]
// 日志类别
const LOG_LEVEL = [
  {value: 'INFO', label: '基本日志'},
  {value: 'ERROR', label: '错误日志'}
  // {value: 'TRACE', label: '详细日志'}
]

const NUMBER_LT_13 = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']]
export default {
  JOB_STATUS_LIST,
  JOB_PRIORITY,
  DEFAULT_PAGE_INFO,
  BAR_POSTION,
  JOB_STATUS_OBJECT,
  JOB_TYPE,
  MESSAGE,
  NUMBER_LT_60,
  NUMBER_LT_24,
  NUMBER_LT_32,
  NUMBER_LT_8,
  NUMBER_LT_13,
  LOG_LEVEL,
  JOB_PROPERTY
}
