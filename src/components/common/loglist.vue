<template>
  <div class="content">
    <div class="en-lg-title">
      <span>运行日志</span>
      <div class="condition">
        <el-date-picker type="datetime" placeholder="开始时间" v-model="condition.logStartTime" class="time-picker" prefix-icon="el-icon-date"
          :picker-options="time"></el-date-picker>
        <el-date-picker type="datetime" placeholder="结束时间" v-model="condition.logEndTime" class="time-picker" prefix-icon="el-icon-date"
          :picker-options="time"></el-date-picker>
        <select class="select" v-model="condition.logLevel">
          <option value="INFO">基本日志</option>
          <option value="ERROR">错误日志</option>
          <!-- <option value="TRACE">详细日志</option> -->
        </select>
        <select class="select" v-model="condition.type">
          <option value="author">操作人</option>
          <option value="jobName">任务名称</option>
        </select>
        <input type="text"  v-model="condition.keywords" class="keyword">
      </div>
    </div>
    <el-table :data="logs" stripe style="width: 100%" tooltip-effect="light"  class="log-table">
      <el-table-column width="100" prop="index" label="序号" header-align="center" align="center"></el-table-column>
      <el-table-column width="120" prop="author" label="操作人" header-align="center" align="center"></el-table-column>
      <el-table-column width="150" prop="jobName" label="任务名称" header-align="center" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="180" prop="jobVersion" label="版本" header-align="center" align="center"></el-table-column>
      <el-table-column width="200" prop="logLevel.label" label="日志级别" header-align="center" align="center"></el-table-column>
      <el-table-column width="200" prop="logTime" label="时间" header-align="center" align="center" ></el-table-column>
      <el-table-column label="信息" header-align="left" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <svg class="octicon octicon-clippy clipboard-btn" :data-clipboard-text="scope.row.logMsg"
            viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true" @click="$message({message:'复制成功',type: 'success'})">
              <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
            </svg>
            <span v-text="scope.row.logMsg"></span>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next" :total="total" :page-size="constant.DEFAULT_PAGE_INFO.pageSize"
      :current-page.sync="condition.pageNo" v-if="total>0"></el-pagination>
  </div>
</template>
<script>
import logUtils from '@/api/log'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      // 时间控件最大值
      time: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      // 查询条件
      condition: {
        type: 'author',
        author: '',
        jobName: '',
        logStartTime: '',
        logEndTime: '',
        logLevel: 'INFO',
        keywords: '',
        pageNo: '',
        pageSize: this.constant.DEFAULT_PAGE_INFO.pageSize
      },
      clipboards: [],
      total: 0,
      // 日志
      logs: []
    }
  },
  watch: {
    condition: {
      handler (newValue, oldValue) {
        let condition = Object.assign({}, this.condition)
        // 下拉选择填写的字段
        condition[condition.type] = condition.keywords
        // 传入开始时间为空
        if (condition.logStartTime === '' || condition.logStartTime === null) {
          condition.logStartTime = new Date(0)
        }
        // 传入结束时间为空
        if (condition.logEndTime === '' || condition.logEndTime === null) {
          condition.logEndTime = new Date()
        }
        // 时间转成long
        condition.logEndTime = condition.logEndTime.getTime()
        condition.logStartTime = condition.logStartTime.getTime()
        let vue = this
        // 查找日志
        logUtils.getLogs((res) => {
          vue.logs = []
          if (res && res.content) {
            vue.logs = res.content
            vue.total = res.totalCount
          }
          vue.formatterLog()
          vue.$nextTick(function () {
            vue.initCopy()
          })
        }, condition)
      },
      deep: true
    },
    keywordsChange: function (newValue, oldValue) {
      this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
    },
    logLevelChange: function () {
      this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
    },
    logEndTimeChange: function () {
      this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
    },
    logStartTimeChange: function () {
      this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
    }
  },
  computed: {
    keywordsChange: function () {
      return this.condition.keywords
    },
    logLevelChange: function () {
      return this.condition.logLevel
    },
    logEndTimeChange: function () {
      return this.condition.logEndTime
    },
    logStartTimeChange: function () {
      return this.condition.logStartTime
    }
  },
  created () {
    this.condition.pageNo = this.constant.DEFAULT_PAGE_INFO.pageNo
  },
  methods: {
    // 格式化日志：加序号和格式化时间
    formatterLog: function () {
      let vue = this
      let index = (vue.condition.pageNo - 1) * vue.condition.pageSize + 1 // 序号
      vue.logs.forEach((log) => {
        log.index = index
        log.logTime = vue.$utils.formatDateFromLong(log.logTime, 'yyyy-MM-dd hh:mm:ss')
        log.logLevel = vue.$utils.formatterJobLevel(log.logLevel, this.constant.LOG_LEVEL)
        index++
      })
    },
    initCopy: function () {
      let clipboardBtns = document.getElementsByClassName('clipboard-btn')
      this.clipboards.forEach((clipboard) => {
        clipboard.destroy()
      })
      this.clipboards = []
      for (let i = 0; i < clipboardBtns.length; i++) {
        this.clipboards.push(new Clipboard('.clipboard-btn'))
      }
    }
  }
}
</script>
<style>
  .time-picker {
    height: 29px;
    width: 174px !important;
  }

  .time-picker input {
    height: 29px;
    padding-right: 10px !important;
    width: 174px !important;
  }

  .time-picker i {
    line-height: 29px;
  }
  .clipboard-btn{
    cursor: pointer;
  }
</style>
