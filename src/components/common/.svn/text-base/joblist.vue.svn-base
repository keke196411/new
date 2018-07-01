<template>
  <div class="list content table-content">
    <div class="en-lg-title">
      <span v-html="pageTitle"></span>
      <div class="condition">
        <select v-bind:placeholder="optionsValue" class="select" v-if="isShowCategories" v-model="groupId" @change="groupIdChange">
          <option v-for="item in $store.state.groups" :key="item.groupId" v-text="item.groupName" v-bind:value="item.groupId"></option>
        </select>
        <select v-bind:placeholder="statusValue" class="select" v-model="condition.status">
          <option v-for="item in constant.JOB_STATUS_LIST" :key="item.value" v-text="item.label" v-bind:value="item.value"></option>
        </select>
        <select class="select" v-model="condition.type">
          <option value="author">作者</option>
          <option value="jobName">任务名称</option>
        </select>
        <input type="text" v-model="condition.keywords" class="keyword">
      </div>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="order" label="序号" width="" header-align="center" align="center"></el-table-column>
      <!-- <el-table-column v-if="tableData.type!=null" prop="type" label="类型" width="" header-align="center" align="center"></el-table-column> -->
      <el-table-column prop="jobName" label="名称" header-align="center" align="center" width=""></el-table-column>
      <el-table-column prop="version" label="版本号" width="" header-align="center" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" width="" header-align="center" align="center"></el-table-column>
      <el-table-column prop="groupName" label="所在分组" width="" header-align="center" align="center"></el-table-column>
      <el-table-column prop="status.label" label="状态" width="" header-align="center" align="center">
        <template slot-scope="scope">
          <span :class="'job-status '+ scope.row.status.tableClass " v-text="scope.row.status.label"></span>
        </template>
      </el-table-column>
      <el-table-column prop="jobType.label" label="策略" width="" header-align="center" align="center"></el-table-column>
      <el-table-column prop="deployTime" label="发布时间" header-align="center" align="center" width=""></el-table-column>
      <el-table-column label="操作" header-align="center" align="center" width="">
        <template slot-scope="scope">
          <p class="font-size-0">
            <span v-for="(placeholder,key) in scope.row.status.placeholder" class="icon" :key="key"></span>
            <span v-for="(icon,key) in scope.row.status.icon" @click="changeJobStatus(icon.action,scope.row.jobId)" :class="'icon '+ icon.clazz"
              :key="icon+key" :title="icon.title"></span>
            <span class="icon icon-see" @click="showDetialsDialog(scope.row.jobId)"></span>
            <span class="icon icon-edit" @click="showEditDialog(scope.row.jobId)"></span>
            <span class="icon icon-delete" @click="showInfoMsg('确定删除该信息', scope.row)"></span>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, prev, pager, next" :total="totalCount" :page-size="constant.DEFAULT_PAGE_INFO.pageSize"
      :current-page.sync="condition.pageNo" v-if="totalCount>0"></el-pagination>

    <el-dialog title="编辑" :visible.sync="dialogFlag.isEdit" label-position="left" class="md-lg-dialog md-edit">
      <el-form :model="editingJobData" label-width="90px" label-position="top" class="label-top-form">
        <p class="en-md-title">数据总览</p>
        <el-row :gutter="52">
          <el-col :span="12">
            <el-form-item label="名称:">
              <el-input type="text" v-model="editingJobData.jobName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业分类:">
              <el-select v-model="editingJobData.groupId" placeholder="请选择">
                <el-option v-for="item in $store.state.groups" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="目的:">
            <el-input type="text" v-model="editingJobData.fundes"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="描述:" class="description">
          <el-input type="textarea" v-model="editingJobData.jobdes"></el-input>
        </el-form-item>
        <p class="en-md-title strategy">执行策略</p>
        <el-row :gutter="52">
          <el-col :span="12">
            <el-form-item label="重试次数:">
              <el-input type="text" v-model="editingJobData.maxRetryTimes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级别:">
              <el-select placeholder="请选择" v-model="editingJobData.priority">
                <el-option v-for="item in constant.JOB_PRIORITY" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="52">
          <el-col :span="12">
            <el-form-item label="类型:">
              <el-select placeholder="请选择" v-model="editingJobData.jobType" @change="changeJobType">
                <el-option v-for="item in constant.JOB_TYPE" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="触发时间:" v-if="editingJobData.jobType === constant.JOB_TYPE[2].value || editingJobData.jobType === constant.JOB_TYPE[4].value">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="editingJobData.triggerTime" :picker-options="nowTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="表达式:" v-if="editingJobData.jobType === constant.JOB_TYPE[3].value">
              <el-col :span="17" style="padding-left:0px;padding-right:0px">
                <el-input type="text" v-model="editingJobData.cron" class="cron"></el-input>
              </el-col>
              <el-col :span="4" class="cron">
                <el-button type="warning" size="mini" @click="showCronDialog">cron表达式</el-button>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="52">
          <el-col :span="12">
            <el-form-item label="间隔:" v-if="editingJobData.jobType === constant.JOB_TYPE[4].value" class="line-height-18">
              <el-input type="text" v-model="editingJobData.repeatInterval">
                <template slot="append">秒</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="次数:" v-if="editingJobData.jobType === constant.JOB_TYPE[4].value">
              <el-input-number class="en-number" type="text" v-model="editingJobData.repeatCount" :min=1></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFlag.isEdit = false">取消</el-button>
        <el-button type="primary" @click="updateJob">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="作业-详情" :visible.sync="dialogFlag.isSee" label-position="left" class="md-lg-dialog md-details">
      <el-form :model="detailsJobData" label-width="90px" label-position="top" class="label-top-form details">
        <p class="en-md-title">基本信息</p>
        <el-row :gutter="52">
          <el-col :span="8">
            <label>状态：</label>
            <span :style="{color:detailsJobData.status.color}" v-text="detailsJobData.status.label"></span>
          </el-col>
          <el-col :span="8">
            <label>作者/任务名称：</label>
            <span v-text="detailsJobData.author"></span>
          </el-col>
          <el-col :span="8">
            <label>版本：</label>
            <span v-text="detailsJobData.version"></span>
          </el-col>
        </el-row>
        <el-row :gutter="52">
          <el-col :span="8">
            <label>发布时间：</label>
            <span v-text="detailsJobData.deployTime"></span>
          </el-col>
          <el-col :span="8">
            <label>作业分类：</label>
            <span v-text="detailsJobData.jobType.label"></span>
          </el-col>
        </el-row>
        <p class="en-md-title" style="margin-top: 34px;">执行情况</p>

        <el-row :gutter="52">
          <el-col :span="8">
            <label>上次：</label>
            <span v-text="detailsJobData.currentTriggerTime"></span>
          </el-col>
          <el-col :span="8">
            <label>下次：</label>
            <span v-text="detailsJobData.nextTriggerTime"></span>
          </el-col>
          <el-col :span="8">
            <label>数据量：</label>
            <span v-text="detailsJobData.totalCount"></span>
          </el-col>
        </el-row>
        <el-row :gutter="52">
          <el-col :span="8">
            <label>成功：</label>
            <span v-text="detailsJobData.successCount" style="color:#0ab301"></span>
          </el-col>
          <el-col :span="8">
            <label>耗时：</label>
            <span v-text="$utils.millisToOther(detailsJobData.duration,120)"></span>
          </el-col>
        </el-row>
        <el-row>
          <label style=" float: left;">日志：</label>
          <el-col :span="20" style="    overflow: auto;height: 125px;">
            <span v-if="detailsJobData.logs.length === 0">无</span>
            <p v-for="(log,key) in detailsJobData.logs" v-html="log.logstr" :key="key" class="log" v-if="detailsJobData.logs.length >0"></p>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFlag.isSee = false">取消</el-button>
        <el-button type="primary" @click="dialogFlag.isSee = false">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="isShowInfoDialog" width="30%" center>
      <p v-text="infoMsg" class="info-msg"></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteJob(detailsJobData)">确 定</el-button>
      </span>
    </el-dialog>
    <encron></encron>

    <el-dialog title="提示" :visible.sync="startFailed.dialogVisible" width="30%">
      <span v-text="startFailed.message" class="force-to-start-message"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="startFailed.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="forceToStart(true)">强制开启</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jobUtils from '@/api/job'
import encron from '@/components/common/cron'
import bus from '@/common/eventbus'
export default {
  data () {
    return {
      // 强制执行
      startFailed: {
        dialogVisible: false,
        message: '',
        jobId: ''
      },
      groupId: '',
      tableData: [],
      statusValue: '类型',
      optionsValue: '类型',
      dialogFlag: {
        isEdit: false,
        isSee: false
      },
      // 时间控件默认数据
      nowTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      infoMsg: '',
      isShowInfoDialog: false,
      // 查询条件
      condition: {
        status: this.constant.JOB_STATUS_OBJECT.ALL.value,
        pageNo: this.constant.DEFAULT_PAGE_INFO.pageNo,
        pageSize: this.constant.DEFAULT_PAGE_INFO.pageSize,
        url: '',
        author: '',
        isChange: 0,
        type: 'author',
        jobName: '',
        keywords: ''
      },
      deleteJobId: '',
      // 编辑时数据
      editingJobData: {
        jobId: '',
        groupId: '',
        jobType: '',
        priority: '',
        maxRetryTimes: '',
        cron: null,
        triggerTime: null,
        repeatCount: null,
        repeatInterval: null,
        jobName: '',
        fundes: '',
        jobdes: '',
        isTigger: null
      },
      // 详情数据
      detailsJobData: {
        author: '',
        currentTriggerTime: '',
        deployTime: '',
        duration: '',
        endDate: '',
        groupName: '',
        jobType: {
          label: ''
        },
        nextTriggerTime: '',
        startDate: '',
        status: {
          label: ''
        },
        successCount: '',
        totalCount: '',
        version: '',
        logs: []
      },
      isShowCategories: true,
      pageTitle: '',
      url: this.$store.state.urlObject,
      totalCount: 0
    }
  },
  watch: {
    url: {
      handler (newValue, oldValue) {
        this.setJobList(newValue.url)
      },
      deep: true
    },
    condition: {
      handler (newValue, oldValue) {
        let vue = this
        let condition = Object.assign({}, this.condition)
        // 下拉选择填写的字段
        condition[condition.type] = condition.keywords
        jobUtils.getJobs(condition, (res) => {
          if (res && res.content) {
            vue.formatterTableData(res.content)
            vue.totalCount = res.totalCount
          }
        })
      },
      deep: true
    },
    keywordsChange: function (newValue, oldValue) {
      this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
    },
    statusChange: function (newValue, oldValue) {
      this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
    }
  },
  computed: {
    keywordsChange: function () {
      return this.condition.keywords
    },
    statusChange: function () {
      return this.condition.status
    }
  },
  components: {
    encron
  },
  methods: {
    groupIdChange: function () {
      if (this.groupId !== '') {
        this.condition.url = `/deploy/group/${this.groupId}`
      } else {
        this.condition.url = `/deploy`
      }
    },
    // 改变作业类型
    changeJobType: function () {
      let vue = this
      vue.editingJobData.cron = ''
      vue.editingJobData.repeatCount = null
      vue.editingJobData.repeatInterval = null
      if (vue.editingJobData.jobType === vue.constant.JOB_TYPE[2].value || vue.editingJobData.jobType === vue.constant
        .JOB_TYPE[4].value) {
        vue.editingJobData.isTigger = true
        if (vue.editingJobData.triggerTime !== 0) {
          vue.editingJobData.triggerTime = new Date(vue.editingJobData.triggerTime)
        } else {
          vue.editingJobData.triggerTime = new Date()
        }
      }
    },
    // 弹出cron对话框
    showCronDialog: function () {
      bus.$emit('showCronDialog', this.editingJobData.cron)
    },
    // 格式化数据
    formatterTableData: function (content) {
      this.tableData = []
      let vue = this
      let count = (vue.condition.pageNo - 1) * vue.condition.pageSize + 1 // 序号
      content.map((job) => {
        job.operation = ''
        job.jobType = vue.constant.JOB_TYPE[job.jobType]
        if (!job['type']) {
          job.type = null
        }
        job.order = count
        job.deployTime = vue.$utils.formatDateFromLong(job.deployTime, 'yyyy-MM-dd hh:mm')
        // 实时作业+定时作业
        this.getIcon(job)
        count++
        vue.tableData.push(job)
      })
    },
    getIcon: function (job) {
      job.status = Object.assign({}, this.$utils.formatterStatus(job.status, this.constant.JOB_STATUS_OBJECT))
      // 定时和实时作业
      if (job.jobType.value === 1 || job.jobType.value === 2) {
        if (job.status.value === this.constant.JOB_STATUS_OBJECT.RUNNING.value ||
            job.status.value === this.constant.JOB_STATUS_OBJECT.PAUSE.value ||
            job.status.value === this.constant.JOB_STATUS_OBJECT.WATTING.value) {
          job.status.icon = [{
            clazz: 'icon-stop',
            title: '停止',
            action: 'stop'
          }]
        } else {
          job.status.icon = [{
            clazz: 'icon-start',
            title: '开始',
            action: 'start'
          }]
        }
      }
      if (job.status.value === 0 && job.jobType.value !== 0) {
        job.status.icon = [{
          clazz: 'icon-start',
          title: '开始',
          action: 'start'
        }]
      } else if (job.status.value === 0 && job.jobType.value === 0) {
        job.status.icon = []
      }
      job.status.placeholder = []
      for (let i = 0; i < 2 - job.status.icon.length; i++) {
        job.status.placeholder.push({
          clazz: '',
          title: '',
          action: ''
        })
      }
    },
    // 删除前弹框
    showInfoMsg: function (msg, job) {
      if (job.status === this.constant.JOB_STATUS_OBJECT.WATTING.value ||
          job.status === this.constant.JOB_STATUS_OBJECT.PAUSE.value ||
          job.status === this.constant.JOB_STATUS_OBJECT.WATTING.value) {
        this.$utils.showErrorMsg(this, '当前状态不能被删除')
        return
      }
      this.infoMsg = msg
      this.isShowInfoDialog = true
      this.deleteJobId = job.jobId
    },
    // 编辑弹框
    showEditDialog: function (jobId) {
      let vue = this
      jobUtils.getJobDetailsForEditing(jobId, (res) => {
        vue.dialogFlag.isEdit = true
        for (const prop in vue.editingJobData) {
          vue.editingJobData[prop] = res[prop]
        }
        vue.editingJobData.groupId = res.jobGroup.groupId
        vue.editingJobData.isTigger = false
        vue.editingJobData.repeatInterval /= 1000
        if (vue.constant.JOB_TYPE[4].value) {
          vue.editingJobData.repeatCount += 1
        }
        if (vue.editingJobData.jobType === vue.constant.JOB_TYPE[2].value || vue.editingJobData.jobType === vue
          .constant.JOB_TYPE[4].value) {
          vue.editingJobData.isTigger = true
          if (vue.editingJobData.triggerTime !== 0) {
            vue.editingJobData.triggerTime = new Date(vue.editingJobData.triggerTime)
          } else {
            vue.editingJobData.triggerTime = new Date()
          }
        }
      })
    },
    // 查看详情
    showDetialsDialog: function (jobId) {
      jobUtils.getJobDetailsForWatching(jobId, (res) => {
        res.deployTime = this.$utils.formatDateFromLong(res.deployTime, 'yyyy-MM-dd hh:mm:ss')
        res.startDate = this.$utils.formatDateFromLong(res.startDate, 'yyyy-MM-dd hh:mm:ss')
        if (res.nextTriggerTime !== 0) {
          res.nextTriggerTime = this.$utils.formatDateFromLong(res.nextTriggerTime, 'yyyy-MM-dd hh:mm:ss')
        } else {
          res.nextTriggerTime = '无'
        }
        res.currentTriggerTime = this.$utils.formatDateFromLong(res.currentTriggerTime, 'yyyy-MM-dd hh:mm:ss')
        res.jobType = this.constant.JOB_TYPE[res.jobType]
        res.status = Object.assign({}, this.$utils.formatterStatus(res.status, this.constant.JOB_STATUS_OBJECT))
        res.logs.forEach((log) => {
          log.logstr =
              `<span style="margin-right: 5px;">[${this.$utils.formatDateFromLong(log.logTime, 'yyyy-MM-dd hh:mm:ss')}]</span><span style="margin-right: 10px;">${log.level}</span><span>${log.msg}</span>`
        })
        this.detailsJobData = res
        this.dialogFlag.isSee = true
      })
    },
    // 删除任务
    deleteJob: function () {
      let vue = this
      jobUtils.deleteJob(this.deleteJobId, (res) => {
        vue.isShowInfoDialog = false
        vue.condition.isChange++
      })
    },
    // 改状态
    changeJobStatus: function (action, jobId) {
      if (action.indexOf('start') >= 0) {
        this.startFailed.jobId = jobId
        this.forceToStart(false)
        return
      }
      jobUtils.changeStatus(action, jobId, (res) => {
        if (res.errorCode !== '0') {
          this.$utils.showErrorMsg(this, res.message)
          return
        }
        this.$utils.showSuccessMsg(this, '操作成功')
        this.condition.isChange++
      })
    },
    // 强制开始
    forceToStart: function (flag) {
      let vue = this
      jobUtils.forceToStart(vue.startFailed.jobId, flag, (res) => {
        if (res.errorCode === 'SE_2000') {
          vue.startFailed.dialogVisible = true
          vue.startFailed.message = res.message
          return
        }
        if (res.errorCode !== '0') {
          vue.$utils.showErrorMsg(vue, res.message)
          return
        }
        vue.startFailed.dialogVisible = false
        vue.$utils.showSuccessMsg(vue, '操作成功')
        vue.condition.isChange++
      })
    },
    // 更新任务
    updateJob: function () {
      let vue = this
      let editData = Object.assign({}, vue.editingJobData)
      if (vue.editingJobData.isTigger) {
        editData.triggerTime = new Date(editData.triggerTime).getTime()
      } else {
        editData.triggerTime = 0
      }
      editData.repeatInterval *= 1000
      editData.repeatCount -= 1
      jobUtils.updateJob({
        param: editData
      }, (res) => {
        if (res.errorCode !== '0') {
          this.$utils.showErrorMsg(this, res.message)
          return
        }
        vue.dialogFlag.isEdit = false
        vue.condition.isChange++
      })
    },
    socketOnMessage: function (res) {
      if (res.code === 1) {
        this.$utils.showErrorMsg(this, res.message)
        return
      }
      this.tableData.forEach((job) => {
        if (job.jobId === res.jobId) {
          job.status = res.newStatus
          this.getIcon(job)
        }
      })
    },
    setJobList (url) {
      let vue = this
      vue.condition.pageNo = vue.constant.DEFAULT_PAGE_INFO.pageNo
      vue.condition.author = ''
      vue.condition.status = vue.constant.JOB_STATUS_OBJECT.ALL.value
      let urlSplit = url.split('/')
      vue.isShowCategories = false
      // 获取分组下的job
      if (urlSplit.length === 2) {
        vue.isShowCategories = true
        vue.pageTitle = '作业列表'
        vue.condition.url = '/deploy'
        return
      }
      // 异常作业
      if (url.indexOf('errors') >= 0) {
        vue.condition.url = '/deploy'
        vue.pageTitle = '异常作业'
        vue.condition.status = vue.constant.JOB_STATUS_OBJECT.ERROR.value
        return
      }
      // 异常作业
      if (url.indexOf('normal') >= 0) {
        vue.condition.url = '/deploy'
        vue.pageTitle = '正常作业'
        vue.condition.status = vue.constant.JOB_STATUS_OBJECT.NORMAL.value
        return
      }
      // 获取全部
      if (urlSplit.length === 4) {
        vue.condition.groupId = urlSplit[urlSplit.length - 2]
        vue.pageTitle = '作业列表--<span style=\'font-size: 16px;\'>' + urlSplit[urlSplit.length - 1] + '</span>'
        vue.condition.url = `/deploy/group/${vue.condition.groupId}`
      }
    }
  },
  created () {
    let vue = this
    vue.$bus._events.setCronValue = null
    // vue.initWebSocket()
    vue.$bus.$on('setCronValue', function (cron) {
      vue.editingJobData.cron = cron
    })
    vue.$bus.$on('socketOnMessage', function (res) {
      vue.socketOnMessage(res)
    })
    let url = this.$store.state.urlObject.url
    if (url === '') {
      url = '/job'
    }
    vue.setJobList(url)
  },
  // 清除事件监听
  beforeDestroy () {
    this.$bus.$off('setCronValue', function (param) {})
    this.$bus.$off('socketOnMessage', function (param) {})
  }
}

</script>
<style>
  .cron-content {
    height: 250px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    box-shadow: none;
  }

  .cron-content .el-tabs__content {
    padding: 15px !important;
    padding-bottom: 0px !important;
    overflow: auto;
    height: 197px;
  }

  .cron-content .el-checkbox {
    margin-left: 14px !important;
  }

  .hour-pane .el-checkbox .el-checkbox__label {
    padding-left: 2px;
  }

  .day-pane .el-checkbox {
    width: 40px;
  }

  .line {
    margin-top: 2px;
  }

  .line .el-radio__label,
  .line span {
    font-size: 12px;
    color: #797c7d;
  }

  .line .el-radio {
    line-height: 22px;
  }

  .cron {
    padding-left: 0px !important;
    padding-right: 0px !important;
    line-height: 36px;
  }

  .cron .el-button--mini,
  .el-button--mini.is-round {
    padding: 7px 4px;
  }

  .cron .el-button--warning {
    background-color: #ffb54b;
    border-color: #ffb54b;
    margin-left: 5px;
  }

  .cron .el-button--warning span {
    color: #ffffff !important
  }

  .el-table__row .cell .icon:not(:first-child) {
    margin-left: 35px;
    padding-right: 0px;
  }

  .log {
    padding-left: 39px;
    font-size: 12px;
    color: #797c7d;
  }

  .details .el-row {
    margin-top: 16px;
  }

  .en-md-title {
    margin-bottom: 7px !important;
  }

  .description textarea {
    height: 67px;
    resize: unset;
  }

  .strategy {
    margin-top: 31px !important;
  }

  .job-status {
    display: inline-block !important;
    border-radius: 10px;
    font-size: 12px;
    line-height: 19px;
    width: 57px;
    text-align: center;
  }

  .running {
    background-color: rgba(67, 238, 0, 0.31);
    border: 1px solid rgba(85, 199, 72, 0.31);
    color: #0ab301;
  }

  .watting {
    background-color: rgba(255, 173, 105, 0.31);
    border: 1px solid rgba(252, 129, 39, 0.31);
    color: #ff9c58;
  }

  .pause {
    background-color: rgba(244, 68, 255, 0.31);
    border: 1px solid rgba(218, 3, 232, 0.31);
    color: #bd4bff;
  }

  .published {
    background-color: rgba(188, 188, 188, 0.31);
    border: 1px solid rgba(151, 151, 151, 0.31);
    color: #787878;
  }

  .complete {
    background-color: rgba(77, 132, 254, 0.31);
    border: 1px solid rgba(21, 94, 255, 0.31);
    color: #6291f3;
  }

  .error {
    background-color: rgba(253, 53, 105, 0.31);
    border: 1px solid rgba(229, 17, 73, 0.31);
    color: #fc4c7a;
  }

  .list .is-center {
    padding: 0px !important
  }

  .list .el-table .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
    line-height: 34px;
    height: 100%;
  }

  .force-to-start-message {
    margin: 19px 0px !important;
    display: block !important;
  }

</style>
