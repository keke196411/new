<template>
  <div class="en-body">
    <el-row class="en-nav">
      <el-menu class="el-menu-vertical-demo" @open="changeRouter" @close="changeRouter" @select="changeRouter">
        <div v-for="(menu,key) in menus" :key="key">
          <el-menu-item :index="menu.index" v-if="menu.children.length == 0 && menu.name !== '作业列表' && menu.name !== '日志管理'">
            <i :class="'icon icon-function '+menu.icon "></i>
            <span slot="title" v-text="menu.name" class="menu-name"></span>
          </el-menu-item>
          <el-submenu v-if="menu.name === '作业列表'" :index="menu.index">
            <template slot="title">
              <i :class="'icon icon-function '+menu.icon "></i>
              <span slot="title" v-text="menu.name" class="menu-name"></span>
              <div class="group-icon en-inline-block" @click.stop="isShowGroupDialog = true ">
                <i class="icon icon-add" style="margin-right: 9px; margin-top: 4px;width:17px"> </i>
              </div>
            </template>
            <template slot="title"></template>
            <draggable v-model="groups" @end="dragoverGroup">
              <transition-group>
                <el-menu-item :index="'/job/'+group.groupId+'/'+group.groupName" v-for="(group,key) in groups" :key="key">
                  <span v-text="group.groupName" @click="changeStatus(group)" @blur.stop="rename(group,$event)" :title="group.groupName" :class="'group-name '+group.editable"
                    :contenteditable="group.editable" style="padding-left: 20px"></span>
                  <div class="group-icon" @click.stop="deleteGroup(group.groupId)">
                    <i class="icon icon-del"> </i>
                  </div>
                </el-menu-item>
              </transition-group>
            </draggable>
          </el-submenu>
          <el-submenu v-if="menu.name === '日志管理'" :index="menu.index">
            <template slot="title">
              <i :class="'icon icon-function '+menu.icon "></i>
              <span slot="title" v-text="menu.name" class="menu-name"></span>
            </template>
            <template slot="title"></template>
            <el-menu-item :index="child.index" v-for="(child,key) in menu.children" :key="key">
              <span v-text="child.name" contenteditable="false"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>

      <div class="left-bottom">
        <p class="copyright">服务器时间</p>
        <p v-text="$utils.formatDateFromLong(date, 'yyyy/MM/dd hh:mm:ss')" class="date"> </p>
      </div>
    </el-row>
    <div class="en-main" @scroll="test($event)">
      <router-view></router-view>
    </div>
    <el-dialog title="作业列表—新增分组" :visible.sync="isShowGroupDialog" width="30%" center class="groud-add-dialog">
      <el-row>
        <el-col :span="3">名称：</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入分组名称" v-model="groupName" clearable>
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowGroupDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import menuUtils from '@/api/menu'
// import bus from '@/common/eventbus'
import draggable from 'vuedraggable'

let getGroups = (vue) => {
  menuUtils.getGroups(function (tree, groups) {
    let store = JSON.parse(JSON.stringify(groups))
    store.unshift({allowDeleted: 1,
      groupId: '',
      groupName: '全部',
      groupOrder: 1
    })
    vue.$store.commit({
      type: 'groups',
      amount: store
    })
    vue.menus = tree
    vue.groups = groups
  })
}

export default {
  data () {
    return {
      isShowGroupDialog: false,
      menus: [],
      groups: [],
      groupName: '',
      dbclick: {
        method: '',
        count: 0
      },
      selectGroup: {},
      date: '',
      statisticsPage: this.constant.DEFAULT_PAGE_INFO.pageNo
    }
  },
  components: {
    draggable
  },
  created () {
    getGroups(this)
    this.getTime()
  },
  methods: {
    test: function (e) {
      let all = e.target.scrollHeight
      let slf = e.target.offsetHeight
      let sco = e.target.scrollTop
      let vue = this
      if (sco + slf === all) {
        if (vue.$router.history.current.name === 'statistics') {
          vue.statisticsPage += 1
        } else {
          vue.statisticsPage = vue.constant.DEFAULT_PAGE_INFO.pageNo
        }
        vue.$store.commit({
          type: 'statisticsPage',
          amount: vue.statisticsPage
        })
      }
    },
    getTime () {
      let vue = this
      let getDate = (callback) => {
        menuUtils.getTime((res) => {
          vue.date = res
          if (callback) {
            callback()
          }
        })
      }
      getDate(() => {
        window.setInterval(() => {
          vue.date += 1000
        }, 1000)
      })
      window.setInterval(getDate, 1000 * 60 * 20)
    },
    // 拖拽
    dragoverGroup: function ($event) {
      let newIndex = $event.newIndex
      this.selectGroup = this.groups[newIndex]
      this.selectGroup.groupOrder = newIndex + 1
      let vue = this
      menuUtils.changeGroupName(vue.selectGroup, (res) => {
        vue.$utils.showSuccessMsg(vue, vue.constant.MESSAGE.GROUP_UPDATE_SUCCESS)
        // 重新刷新分组
        getGroups(vue)
      })
    },
    // 改名
    rename: function (group, $event) {
      group.editable = false
      group.groupName = $event.target.innerHTML
      menuUtils.changeGroupName(group, (res) => {
        if (res.errorCode === '0') {
          this.$utils.showSuccessMsg(this, this.constant.MESSAGE.GROUP_UPDATE_SUCCESS)
        } else {
          group.groupName = group.originName
          this.$utils.showErrorMsg(this, res.message)
        }
      })
      group.editable = false
    },
    // 双击改状态
    changeStatus: function (group) {
      let vue = this
      vue.dbclick.count++
      vue.dbclick.method = setTimeout(function () {
        if (vue.dbclick.count === 2) {
          group.editable = true
          clearTimeout(vue.dbclick.method)
        }
        vue.dbclick.count = 0
      }, 300)
    },
    // 点击跳转
    changeRouter: function (url) {
      if (url.indexOf('job') >= 0) {
        this.$store.commit({
          type: 'urlObject',
          amount: url
        })
        this.$router.push({
          path: '/job'
        })
      } else {
        this.$router.push({
          path: url
        })
      }
    },
    // 删除分组
    deleteGroup: function (groupId) {
      let groups = this.groups
      menuUtils.deleteGroup(groupId, (res) => {
        for (let index = 0; index < groups.length; index++) {
          if (groupId === groups[index].groupId) {
            groups.splice(index, 1)
          }
        }
        this.$utils.showSuccessMsg(this, this.constant.MESSAGE.GROUP_DELETE_SUCCESS)
      })
    },
    // 新增分组
    addGroup: function () {
      let vue = this
      vue.isShowGroupDialog = false
      let param = {
        param: vue.groupName
      }
      menuUtils.addGroup(param, (res) => {
        // 重新刷新分组
        getGroups(vue)
        vue.groupName = ''
        this.$utils.showSuccessMsg(this, this.constant.MESSAGE.GROUP_ADD_SUCCESS)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .groud-add-dialog .el-dialog--center .el-dialog__body {
    padding: 10px 20px !important;
  }

  .groud-add-dialog .el-col-3 {
    line-height: 40px;
  }

  .group-icon {
    position: absolute;
    top: 0px;
    z-index: 1;
    right: 20px;
    display: none;
    padding-top: 4px;
    height: 43px;
  }

  .group-icon.en-inline-block {
    right: 30px;
    display: inline-block;
  }

  .el-menu-item:hover .group-icon {
    display: inline-block;
  }

  .en-body {
    position: absolute;
    top: 55px;
    left: 0;
    bottom: 0px;
    width: 100%;
  }

  .en-nav {
    width: 190px;
    height: 100%;
    background-color: #ffffff;
  }

  .en-nav .el-submenu .el-menu-item {
    min-width: 178px;
    padding-left: 30px !important;
  }

  .en-nav .el-menu-item span.group-name {
    padding-left: 12px !important;
  }

  .en-nav .el-menu-item span.group-name:before {
    content: "|";
    color: #4d84fe;
    padding-left: 0px;
    margin-right: 5px;
    font-weight: 700;
    font-size: 14px;
    vertical-align: top;
    visibility: hidden;
  }

  .en-nav .el-menu-item.is-active span.group-name:before {
    visibility: visible;
  }

  .en-main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 202px;
    padding-top: 12px;
    padding-right: 12px;
    padding-bottom: 12px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .en-main>div {
    width: 100%;
    height: 100%;

  }

  .date {
    text-align: center;

    color: #303133;
    height: 25px;
    line-height: 25px;

  }

  .copyright {
    font-size: 12px;
    height: 29px;
    line-height: 29px;
  }

  .left-bottom {
    font-size: 15px;
    font-weight: 200;
    bottom: 0px;
    position: absolute;
    width: 100%;
    color: #303133;
    border-top: 1px solid #dddddd;
    text-align: center;
    background-color: #ffffff;
  }

  .menu-name {
    padding-left: 6px !important;
  }

  .el-menu-item.is-active {
    background-color: #ecf6ff !important;
  }

  .en-nav .el-menu-item {
    color: #595959 !important;
  }
</style>
