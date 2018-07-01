import constant from '@/common/constant'
// 数组求和
let sum = (array) => {
  let count = 0
  array.forEach(item => {
    count += item
  })
  return count
}

// 柱状图颜色渐变
let lineGradient = (strat, stop, postion) => {
  let y = 0
  let x = 0
  if (postion === constant.BAR_POSTION.HORIZONTAL) {
    x = 1
  }
  if (postion === constant.BAR_POSTION.VERTICAL) {
    y = 1
  }
  return {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: x,
      y2: y,
      colorStops: [{
        offset: 0, color: strat
      }, {
        offset: 1, color: stop
      }],
      globalCoord: false // 缺省为 false
    }
  }
}
// 图表位置
let getGrid = (left, top, right, bottom) => {
  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom
  }
}
// 隐藏坐标轴
let hideAxisWithouData = (type) => {
  return {
    type: type,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    boundaryGap: false,
    axisTick: {
      show: false
    }
  }
}
// 隐藏坐标轴
let hideAxisWithIndex = (type) => {
  return {
    type: type,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    gridIndex: 0
  }
}
// 隐藏坐标轴
let hideAxisWithData = (type, data) => {
  return {
    type: type,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      formatter: function (value) {
        if (getLength(value) < 4) {
          return value
        }
        return cutStr(value, 4) + '...'
      }
    },
    data: data
  }
}

// 弹框
let showMsg = (vue, msg, type) => {
  vue.$message({
    showClose: true,
    message: msg,
    type: type
  })
}
// 成功提示框
let showSuccessMsg = (vue, msg) => {
  showMsg(vue, msg, 'success')
}
// 警告弹框
let showWarningMsg = (vue, msg) => {
  showMsg(vue, msg, 'warning')
}
// 错误弹框
let showErrorMsg = (vue, msg) => {
  showMsg(vue, msg, 'error')
}

// 格式化时间
let formatDate = function formatDate (date, format) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
// long转时间
let formatDateFromLong = (timestamp, format) => {
  let date = null
  if (timestamp === null) {
    return '无'
  }
  try {
    date = formatDate(new Date(timestamp), format)
  } catch (e) {
    return '无'
  }
  return date
}
// 格式化状态
let formatterStatus = (status, JOB_STATUS) => {
  for (const props in JOB_STATUS) {
    if (JOB_STATUS[props].value === status) {
      return JOB_STATUS[props] // Object.assign({}, JOB_STATUS[props])
    }
  }
}
// 格式化日志类别
let formatterJobLevel = (level, LOG_LEVEL) => {
  LOG_LEVEL.forEach((item) => {
    if (item.value === level) {
      level = item
    }
  })
  return level
}
// 柱状图上的数字
let getChartLabel = (color, value, max) => {
  let position = 'right'
  if (value > max * 0.8) {
    position = 'insideRight'
  }
  return {
    show: true,
    position: position,
    color: color
  }
}
// 获取长度（中文相当于两个字符）
let getLength = (s) => {
  var charLength = 0
  for (var i = 0; i < s.length; i++) {
    var sonStr = s.charAt(i)
    encodeURI(sonStr).length > 2 ? charLength += 1 : charLength += 0.5
  }
  return charLength
}
// 截取字符
let cutStr = (str, len) => {
  var charLength = 0
  for (var i = 0; i < str.length; i++) {
    var sonStr = str.charAt(i)
    encodeURI(sonStr).length > 2 ? charLength += 1 : charLength += 0.5
    if (charLength >= len) {
      var subLen = charLength === len ? i + 1 : i
      return str.substr(0, subLen)
    }
  }
}
// 比较大小
let compare = (property, isDesc) => {
  return function (a, b) {
    let number = a[property] - b[property]
    if (isDesc) {
      return number
    }
    return -number
  }
}
// 时间单位转换
let millisToOther = (millis, upper) => {
  // 1秒以内
  if (millis <= 1000) {
    millis += '(毫秒)'
  }
  // 120秒以内
  if (millis > 1000 && millis <= 1000 * upper) {
    millis = (millis / 1000).toFixed(2)
    millis += '(秒)'
  }
  // 120分以内
  if (millis > 120000 && millis <= 60000 * upper) {
    millis = (millis / 60000).toFixed(2)
    millis += '(分)'
  }
  // 120小时以内
  if (millis > 7200000 && millis <= 3600000 * upper) {
    millis = (millis / 3600000).toFixed(2)
    millis += '(时)'
  }
  if (millis > 3600000 * upper) {
    millis = (millis / 86400000).toFixed(2)
    millis += '(天)'
  }
  return millis
}
// 格式化数字
function formatNum (str) {
  str += ''
  let newStr = ''
  let count = 0
  if (str.indexOf('.') === -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr
      }
      count++
    }
    str = newStr
  } else {
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr // 逐个字符相接起来
      }
      count++
    }
    str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3)
  }
  return str
}
export default {
  sum,
  lineGradient,
  getGrid,
  hideAxisWithouData,
  hideAxisWithData,
  hideAxisWithIndex,
  showSuccessMsg: showSuccessMsg,
  showWarningMsg: showWarningMsg,
  showErrorMsg: showErrorMsg,
  formatterStatus,
  formatDateFromLong,
  formatDate,
  formatterJobLevel,
  getChartLabel,
  compare,
  millisToOther,
  formatNum
}
