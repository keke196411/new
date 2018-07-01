import http from '@/common/httpUtils'
let menus = [
  {
    name: '作业概览',
    index: '/overview',
    show: true,
    icon: 'icon-abstract',
    children: []
  },
  {
    name: '作业列表',
    show: true,
    index: '/job',
    icon: 'icon-list',
    groupId: '1',
    children: []
  },
  {
    name: '异常作业',
    icon: 'icon-error',
    index: '/job/errors',
    show: true,
    children: []
  },
  {
    name: '运行日志',
    show: true,
    index: '/log',
    icon: 'icon-log',
    children: []
  }
]

// 获取分组列表
const getGroups = (callback, params) => {
  http.getRequest('/deploy/groups', (res) => {
    res.map((menu) => {
      menu.editable = false
      menu.originName = menu.groupName
    })
    callback(menus, res)
  }, params)
}
// 删除分组
const deleteGroup = (groupId, callback) => {
  http.deleteRequest(`/deploy/group/${groupId}`, null, (res) => {
    callback(res)
  })
}
// 新增分组
const addGroup = (params, callback) => {
  http.postRequest(`/deploy/group`, params, (res) => {
    callback(res)
  })
}
// 分组改名
const changeGroupName = (params, callback) => {
  http.putRequest(`/deploy/group/${params.groupId}`, {param: params}, (res) => {
    callback(res)
  })
}
// 分组改名
const getTime = (callback) => {
  http.getRequest(`/time`, (res) => {
    callback(res)
  })
}
export default {
  getGroups,
  deleteGroup,
  addGroup,
  changeGroupName,
  getTime
}
