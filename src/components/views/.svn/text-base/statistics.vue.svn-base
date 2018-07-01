<template>
  <div class="statistics-page " id="statistics-page" @scroll.native="loadMore()">
    <div class="en-lg-title">
      <span @click="changeRouter()" style="cursor:pointer;">作业概览--
        <span style="font-size: 16px;">统计</span>
      </span>
      <div class="condition">
        <span class="head-font">时间：</span>
        <el-date-picker type="datetime" placeholder="开始时间" v-model="condition.startTime" class="time-picker" prefix-icon="el-icon-date"
          :picker-options="time"></el-date-picker>
        <el-date-picker type="datetime" placeholder="结束时间" v-model="condition.endTime" class="time-picker" prefix-icon="el-icon-date"
          :picker-options="time"></el-date-picker>
        <span class="head-font">类型：</span>
        <select class="select" v-model="condition.jobType">
          <option :value="-1">全部</option>
          <option v-for="property in constant.JOB_TYPE" v-text="property.label" :value="property.value" :key="property.label"></option>
        </select>
        <span class="head-font">分组：</span>
        <select class="select" v-model="condition.jobGroupName">
          <option v-for="item in $store.state.groups" :key="item.groupId" v-text="item.groupName" v-bind:value="item.groupName"></option>
        </select>
        <input placeholder="请输入作业名" type="text" v-model="condition.jobName" class="keyword">
        <span class="export-excel">Excel</span>
      </div>
    </div>
    <div class="statistics-head">
      <div v-for="head in jobStatsOverview" :key="head.type" class="statistics-category" :style="head.align">
        <img :src="'/static/images/'+head.icon" class="head-icon">
        <div class="head-content">
          <p>
            <span v-text="head.value" class="head-value" :style="{'margin-left':((head.value.length>=3)? '0px':'20px')}"></span>
            <span class="head-unit">条</span>
          </p>
          <p v-text="head.type" class="head-unit"></p>
        </div>
      </div>
    </div>
    <div class="statistics-body">
      <div class="statistics-chart-block">
        <p class="en-md-title">数据流量</p>
        <div id="data-flow" class="statistics-chart"></div>
      </div>
      <div class="statistics-chart-block">
        <p class="en-md-title">执行次数</p>
        <div id="data-times" class="statistics-chart"></div>
      </div>
    </div>
    <div class="statistics-bottom">
      <el-table :data="tableData" style="width: 100%;margin-top:10px" @expand-change="toggleRowExpansion">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="statistics-table-expand" v-for="child in props.row.histories.content" :key="child.id"
              v-bind:xxx="JSON.stringify(child)">
              <el-form-item label="执行次数" class="statistics-bottom-item-small">
                <span v-text="child.time"></span>
              </el-form-item>
              <el-form-item label="数据流量" class="statistics-bottom-item-small">
                <span v-text="child.dataNum"></span>
              </el-form-item>
              <el-form-item label="耗时(毫秒)" class="statistics-bottom-item-small">
                <span v-text="child.duration"></span>
              </el-form-item>
              <el-form-item label="开始时间" class="statistics-bottom-item-big">
                <span v-text="child.triggerTime"></span>
              </el-form-item>
              <el-form-item class="child-more" v-if="child.isMore">
                <span @click="loadMoreHistory(props.row.jobId)">更多>></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="jobName"></el-table-column>
        <el-table-column label="分组" prop="jobGroupName"></el-table-column>
        <el-table-column label="数据流量" prop="totalDataNum"></el-table-column>
        <el-table-column label="执行次数" prop="totalExecNum"></el-table-column>
        <el-table-column label="执行耗时" prop="totalDuration"></el-table-column>
        <el-table-column label="版本号" prop="jobVersion">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="历史记录" :visible.sync="dialogTableVisible" class="job-stats-dialog">
      <el-table :data="jobStatsCount.content">
        <el-table-column property="time" label="执行次数"></el-table-column>
        <el-table-column property="dataNum" label="数据流量"></el-table-column>
        <el-table-column property="duration" label="耗时(毫秒)"></el-table-column>
        <el-table-column property="triggerTime" label="开始时间"></el-table-column>
      </el-table>
      <el-pagination class="small-pagination" small layout="prev, pager, next" :current-page.sync="jobStatsCountPageInfo.pageNo"
        :total="jobStatsCount.totalCount" :page-size="jobStatsCount.currentPageSize"></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import statisticsUtils from '@/api/statistics'
export default {
  data () {
    return {
      // 时间控件最大值
      time: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      //  统计页面头
      jobStatsOverview: [{
        icon: 'icon-executing.png',
        type: '执行作业',
        align: 'float:left',
        value: ''
      },
      {
        icon: 'inco-times.png',
        type: '数据流量',
        align: '',
        value: ''
      },
      {
        icon: 'icon-flow.png',
        type: '执行次数',
        align: 'float:right',
        value: ''
      }
      ],
      condition: {
        jobName: '',
        jobGroupName: '',
        jobType: this.constant.JOB_TYPE[0].value,
        startTime: '',
        endTime: ''
      },
      tableData: [],
      // 历史记录查询
      jobStatsCount: [],
      jobStatsCountPageInfo: {
        pageSize: this.constant.DEFAULT_PAGE_INFO.pageSize,
        pageNo: this.constant.DEFAULT_PAGE_INFO.pageNo,
        jobId: ''
      },
      // 历史记录弹框
      dialogTableVisible: false,
      chartData: {
        xAxis: [],
        dataNums: [],
        execNums: []
      },
      statisticsPage: this.$store.state.statisticsPage,
      tableTotalPage: ''
    }
  },
  watch: {
    condition: {
      handler (newValue, oldValue) {
        let condition = Object.assign({}, newValue)
        if (newValue.jobGroupName === '全部') {
          condition.jobGroupName = ''
        }
        // 获取作业概览总统计
        this.getJobStatsOverview(condition)
        // 获取作业概览图标坐标数据、绘图
        this.getJobStatsChartPoint(condition)
        // 表格数据
        this.tableData = []
        this.getJobStatsCount(condition)
      },
      deep: true
    },
    jobStatsCountPageInfo: {
      handler (newValue, oldValue) {
        let condition = Object.assign({}, this.condition)
        condition.pageSize = this.jobStatsCountPageInfo.pageSize
        condition.pageNo = this.jobStatsCountPageInfo.pageNo
        condition.jobId = newValue.jobId
        this.getJobStatsHistory(condition)
      },
      deep: true
    },
    'chartData.xAxis': {
      handler (newValue, oldValue) {
        this.loadLineChart('data-times', [this.chartData.xAxis, this.chartData.execNums], '#FCC300')
        this.loadLineChart('data-flow', [this.chartData.xAxis, this.chartData.dataNums], '#03C783')
      },
      deep: true
    },
    statisticsPage: {
      handler (newValue, oldValue) {
        if (newValue.pageNo > this.tableTotalPage) {
          return
        }
        let condition = Object.assign({}, this.condition)
        condition.pageNo = newValue.pageNo
        // 表格数据
        this.getJobStatsCount(condition)
      },
      deep: true
    }
  },
  created: function () {
    this.condition.jobType = ''
    this.condition.endTime = new Date()
    this.condition.startTime = new Date(this.condition.endTime.getTime() - 24 * 60 * 60 * 1000)
  },
  methods: {
    changeRouter: function () {
      this.$router.push({
        path: '/overview'
      })
    },
    loadMore: function () {
      console.log(arguments)
    },
    // 展开节点
    toggleRowExpansion: function (row) {
      let condition = Object.assign({}, this.condition)
      condition.jobId = row.jobId
      this.getJobStatsHistory(condition, row)
    },
    // 弹出历史信息框，重置对应参数
    loadMoreHistory: function (jobId) {
      this.jobStatsCountPageInfo.jobId = jobId
      this.dialogTableVisible = true
      this.jobStatsCountPageInfo.pageNo = 1
    },
    // 获取节点历史信息
    getJobStatsHistory: function (condition, row) {
      let vue = this
      statisticsUtils.getJobStatsHistory((res) => {
        if (row) {
          row.histories = res
        }
        vue.jobStatsCount = res
      }, condition)
    },
    // 作业概览作业统计列表
    getJobStatsCount: function (condition) {
      let vue = this
      // vue.tableData = []
      statisticsUtils.getJobStatsCount((res) => {
        vue.tableTotalPage = res.totalPage
        res.content.forEach((item) => {
          item.histories = {}
          vue.tableData.push(item)
        })
      }, condition)
    },
    // 作业概览图标坐标数据
    getJobStatsChartPoint: function (condition) {
      let vue = this
      vue.chartData.xAxis = []
      vue.chartData.dataNums = []
      vue.chartData.execNums = []
      statisticsUtils.getJobStatsChartPoint((res) => {
        if (res) {
          res.sort(function (a, b) {
            return a.triggerTime - b.triggerTime
          })
          res.forEach(element => {
            vue.chartData.xAxis.push(vue.$utils.formatDateFromLong(element.triggerTime,
              'yyyy/MM/dd hh:mm:ss'))
            vue.chartData.dataNums.push(element.dataNum)
            vue.chartData.execNums.push(element.execNum)
          })
        }
        // 绘图
      }, condition)
    },
    // 作业概览总统计
    getJobStatsOverview: function (condition) {
      let vue = this
      statisticsUtils.getJobStatsOverview((res) => {
        if (res) {
          vue.jobStatsOverview[0].value = res.totalExecNum
          vue.jobStatsOverview[1].value = res.totalDataNum
          vue.jobStatsOverview[2].value = res.totalJobNum
        }
      }, condition)
    },
    // 绘制折线图
    loadLineChart: function (id, data, color) {
      let xAxis = this.$utils.hideAxisWithData('category', data[0])
      xAxis.boundaryGap = false
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: this.$utils.getGrid(60, 15, 50, 30),
        xAxis: xAxis,
        yAxis: this.$utils.hideAxisWithIndex(),
        series: [{
          smooth: true,
          data: data[1],
          type: 'line',
          areaStyle: {
            normal: {
              color: color
            }
          },
          itemStyle: {
            color: color
          },
          lineStyle: {
            color: color
          }
        }]
      }
      var myChart = this.$echarts.getInstanceByDom(document.getElementById(id))
      if (myChart) {
        this.$echarts.dispose(myChart)
      }
      if (data[0].length <= 0) {
        return
      }
      if (myChart === undefined) {
        myChart = this.$echarts.init(document.getElementById(id))
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style>
  .time-picker {
    height: 28px;
    width: 174px !important;
  }

  .time-picker input {
    height: 28px;
    padding-right: 10px !important;
    width: 174px !important;
  }

  .time-picker i {
    line-height: 28px;
  }

  .statistics-head {
    text-align: center;
  }

  .statistics-body {
    height: 225px;
    margin-top: 6px;
  }

  .statistics-category {
    width: 32%;
    height: 125px;
    line-height: 125px;
    background: #ffffff;
    text-align: left;
    display: inline-block;
  }

  .head-icon {
    height: 63px;
    width: 63px;
    margin-left: 46px;
    margin-top: 40px;
    float: left;
  }

  .head-content {
    float: left;
    height: 100%;
  }

  .head-content p {
    height: 30px;
    line-height: 30px;
    margin-top: 40px;
  }

  .head-content p .head-value {
    font-size: 30px;
    color: rgba(77, 132, 254, 1);
  }

  .head-content .head-unit {
    font-size: 14px;
    color: #6E6E6E;
    margin-left: 16px;
    margin-top: 0px;
  }

  .head-font {
    font-size: 12px;
    color: #67717A;
  }

  .statistics-chart-block {
    width: 49%;
    height: 225px;
    float: left;
    background-color: #ffffff;
  }

  .statistics-chart-block:not(:first-child) {
    float: right;
  }

  .statistics-chart-block .en-md-title {
    margin-left: 10px;
  }

  .statistics-chart {
    height: 192px;
  }

  .statistics-table-expand {
    font-size: 0;
  }

  .statistics-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .statistics-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .statistics-table-expand .el-form-item:not(.child-more){
    margin-left: 5.5%;
  }
  .statistics-table-expand .el-form-item:first-child{
    margin-left: 0px;
  }
  .statistics-page input.keyword {
    width: 120px;
  }
  .statistics-bottom-item-small{
    width: 180px;
  }
  .statistics-bottom-item-big{
    width: 250px;
  }
  .statistics-page .el-table__expanded-cell {
       padding: 0px 0px 0px 55px;
  }

  .child-more .el-form-item__content {
    line-height: 30px;
  }

  .child-more span {
    background-color: #FCC300;
    color: #ffffff;
    height: 20px;
    line-height: 20px;
    vertical-align: bottom;
    width: 49px;
    margin-left: 6px;
    padding: 0px 0px 0px 11px;
    border-radius: 8px;
    display: inline-block;
    cursor: pointer;
  }

  .small-pagination {
    text-align: center;
    height: 30px;
    margin-top: 20px;
  }

  .small-pagination .btn-prev,
  .small-pagination .btn-next {
    width: 26px;
    color: #c0c4cc;
  }

  .small-pagination .el-pager .number {
    width: 26px;
    border-radius: 50%;
    border: 1px solid #c0c4cc !important;
    margin-left: 9px;
  }

  .small-pagination .el-pager .number:not(.active) {
    color: #c0c4cc;
  }

  .export-excel {
    display: none;
    font-size: 12px;
    color: #ffffff;
    background-color: #03c783;
    padding: 3px 13px 3px 29px;
    border-radius: 5px;
    background-image: url(/static/images/icon_export_excel.png);
    background-repeat: no-repeat;
    background-position: 10px 3px;
    cursor: pointer;
  }
</style>
