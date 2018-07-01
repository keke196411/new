<template>
  <div>
    <p class="en-lg-title">作业概览</p>
    <el-row class="ab-top">
      <div class="job-overview">
        <div class="job-overview-all">
          <p class="en-md-title">综述</p>
          <div class="transform">
            <img src="/static/images/icon-total.png" width="34" height="34">
            <div class="right">
              <span v-text="number.count" @click="changeRouter('/statistics')"></span>
              <p class="en-sm-title">作业总量</p>
            </div>
          </div>
        </div>
        <div class="or-bottom">
          <div class="or-normal">
            <span v-text="number.normal"  @click="changeRouter('/job/normal')"></span>
            <p class="en-xs-title">正常</p>
          </div>
          <i></i>
          <div class="or-error">
            <span v-text="number.error"  @click="changeRouter('/job/errors')"></span>
            <p class="en-xs-title">异常</p>
          </div>
        </div>
      </div>
      <div class="job-distribution">
        <p class="en-md-title">分布</p>
        <div id="h-bar"></div>
      </div>
    </el-row>
    <el-row class="ab-bottom">
      <div class="left">
        <p>
          <img src="/static/images/img-left.png">
          <span>作业耗时排名(单位：秒)</span>
          <img src="/static/images/img-right.png">
        </p>
        <div id="time-ranking" :style="'height:'+duration.chartHight+'px'">

        </div>
      </div>
      <div class="right">
        <p>
          <img src="/static/images/img-left.png">
          <span>数据流量排名(单位：条)</span>
          <img src="/static/images/img-right.png">
        </p>
        <div id="frequency-ranking" :style="'height:'+totalCount.chartHight+'px'">

        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import abstractUtils from '@/api/abstract'
export default {
  name: 'abstract',
  data () {
    return {
      // 顶部左侧总览
      number: {
        count: 0,
        normal: 0,
        error: 0
      },
      // 概要图
      distribution: {
        labels: [],
        normals: [],
        errors: []
      },
      // 耗时排名
      duration: {
        labels: [],
        values: [],
        chartHight: ''
      },
      // 数据量排名
      totalCount: {
        labels: [],
        values: [],
        chartHight: ''
      },
      // 顶部坐标最大值
      maxOverview: 0
    }
  },
  created () {
    let $vue = this
    abstractUtils.getOverride((res) => {
      // 数据总览和调度分组分布(柱状图顺序和左侧菜单顺序一致)
      let jobGroupOverview = []
      for (let i = 0; i < $vue.$store.state.groups.length; i++) {
        let prop = $vue.$store.state.groups[i].groupName
        $vue.distribution.labels.push(prop)
        // 方便调用sort获取顶部图表纵坐标最大值
        jobGroupOverview.push(res.jobGroupOverview[prop])
        // 顶部图表数据图表化
        if (res.jobGroupOverview[prop]) {
          $vue.distribution.normals.push(res.jobGroupOverview[prop].normalJobCount)
          $vue.distribution.errors.push(res.jobGroupOverview[prop].exceptionJobCount)
        } else {
          $vue.distribution.normals.push(0)
          $vue.distribution.errors.push(0)
        }
      }
      // 获取最大值
      jobGroupOverview.sort($vue.$utils.compare('exceptionJobCount'))
      $vue.maxOverview = jobGroupOverview[0].exceptionJobCount
      jobGroupOverview.sort($vue.$utils.compare('normalJobCount'))
      if ($vue.maxOverview < jobGroupOverview[0].normalJobCount) {
        $vue.maxOverview = jobGroupOverview[0].normalJobCount
      }

      // 顶部左侧总览
      $vue.number.normal = $vue.$utils.sum($vue.distribution.normals)
      $vue.number.error = $vue.$utils.sum($vue.distribution.errors)
      $vue.number.count = $vue.number.normal + $vue.number.error

      // 时间排名数据图表化jobDurations
      res.jobDurations = res.jobDurations.slice(0, 20)
      res.jobDurations.sort($vue.$utils.compare('duration', true))
      let maxD = res.jobDurations[res.jobDurations.length - 1].duration
      res.jobDurations.forEach((item) => {
        let val = item.duration
        $vue.duration.labels.push(item.jobName)
        let label = $vue.$utils.getChartLabel('#595959', val, maxD)
        label.formatter = function (node) {
          return $vue.$utils.formatNum(node.data.value / 1000)
        }
        $vue.duration.values.push({
          value: val,
          label: label
        })
      })
      $vue.duration.chartHight = $vue.duration.values.length * 40
      // 数据量数据图表化
      res.jobTotalCounts = res.jobTotalCounts.slice(0, 20)
      res.jobTotalCounts.sort($vue.$utils.compare('totalCount', true))
      let maxT = res.jobTotalCounts[res.jobTotalCounts.length - 1].totalCount
      res.jobTotalCounts.forEach((item) => {
        let val = item.totalCount
        $vue.totalCount.labels.push(item.jobName)
        let label = $vue.$utils.getChartLabel('#595959', val, maxT)
        label.formatter = function (node) {
          return $vue.$utils.formatNum(node.data.value).split('\\.')[0]
        }
        $vue.totalCount.values.push({
          value: val,
          label: label
        })
      })
      $vue.totalCount.chartHight = $vue.totalCount.values.length * 40
      // 绘图
      $vue.$nextTick(function () {
        $vue.drawTotalCountChart()
        $vue.drawDurationChart()
        $vue.drawOverviewbar()
      })
    })
  },
  methods: {
    // 顶部概要图
    drawOverviewbar: function () {
      let $vue = this
      let option = {
        grid: this.$utils.getGrid(55, 32, 20, 35),
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          this.$utils.hideAxisWithData('category', this.distribution.labels)
        ],
        yAxis: [{
          type: 'value',
          name: '作业数（条）',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: function () {
            // 能被5整除的纵坐标
            if ($vue.maxOverview % 5 > 0) {
              return (5 - $vue.maxOverview % 5) + $vue.maxOverview
            }
            return $vue.maxOverview
          },
          splitNumber: 5
        }],
        series: [{
          name: '正常',
          type: 'bar',
          barMaxHeight: '80%',
          barCategoryGap: 20,
          barWidth: 30,
          barMinHeight: 1,
          data: this.distribution.normals,
          itemStyle: this.$utils.lineGradient('#a5c2ff', '#4e84fe', this.constant.BAR_POSTION.VERTICAL)
        },
        {
          name: '异常',
          type: 'bar',
          barMaxHeight: '80%',
          barCategoryGap: 20,
          barWidth: 30,
          barMinHeight: 1,
          data: this.distribution.errors,
          itemStyle: this.$utils.lineGradient('#fda3a3', '#ff0e0f', this.constant.BAR_POSTION.VERTICAL)
        }
        ]
      }
      let myChart = this.$echarts.init(document.getElementById('h-bar'))
      myChart.setOption(option)
    },
    // 调用次数柱状图
    drawTotalCountChart: function () {
      let vue = this
      let option = {
        grid: vue.$utils.getGrid(75, 15, 20, 15),
        xAxis: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (node) {
            return node[0].name + '(' + vue.$utils.formatNum(node[0].data.value) + ')条'
          }
        },
        yAxis: vue.$utils.hideAxisWithData('category', vue.totalCount.labels),
        series: [{
          type: 'bar',
          barMinHeight: 1,
          barMaxWidth: 40,
          data: vue.totalCount.values,
          itemStyle: vue.$utils.lineGradient('#ffbe0d', '#ffde84', vue.constant.BAR_POSTION.HORIZONTAL)
        }]
      }
      let myChart = vue.$echarts.init(document.getElementById('frequency-ranking'))
      myChart.setOption(option)
    },
    // 调用耗时柱状图
    drawDurationChart: function () {
      let vue = this
      let option = {
        grid: this.$utils.getGrid(75, 15, 20, 15),
        xAxis: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (node) {
            return node[0].name + '(' + vue.$utils.formatNum(node[0].data.value / 1000) + ')秒'
          }
        },
        yAxis: vue.$utils.hideAxisWithData('category', vue.duration.labels),
        series: [{
          type: 'bar',
          barMinHeight: 1,
          barMaxWidth: 40,
          data: vue.duration.values,
          itemStyle: vue.$utils.lineGradient('#4e84fe', '#a5c2ff', vue.constant.BAR_POSTION.HORIZONTAL)
        }]
      }
      let myChart = vue.$echarts.init(document.getElementById('time-ranking'))
      myChart.setOption(option)
    },
    // 页面跳转
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
    }
  }
}
</script>
<style>
  .job-overview {
    width: 340px;
    height: 244px;
    float: left;
  }

  .job-overview .en-md-title,
  .job-overview .job-overview-all,
  .job-overview .or-bottom {
    background-color: #ffffff;
  }

  .job-overview .en-md-title {
    margin-top: 0px;
  }

  .job-overview-all {
    height: 153px;
    padding-top: 10px;
  }

  .job-overview-all img {
    width: 30px;
    height: 33px;
    margin-top: 47px;
    margin-left: 103px;
    float: left;
  }

  .job-overview-all .right {
    margin-left: 0px;
    float: left;
    margin-top: 30px;
    text-align: center;
  }

  .job-overview-all .right span {
    font-size: 30px;
    color: #4d84fe;
  }

  .ab-top {
    height: 260px;
  }

  .or-bottom {
    height: 84px;
    margin-top: 12px;
  }

  .or-bottom div {
    float: left;
    width: 169px;
    text-align: center;
    margin-top: 15px;
  }

  .job-overview-all:hover .transform{
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -o-transform: scale(1.1);
    -moz-transform: scale(1.1);
    cursor: pointer;
    display: block;
  }
  .or-bottom div:hover span,
  .or-bottom div:hover p {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    cursor: pointer;
    display: block;
  }
  .job-overview-all:hover .transform{
        height: 117px;
  }
  .or-bottom .or-normal span {
    color: #ffb33a;
    text-align: center;
  }

  .or-bottom .or-error span {
    color: #ff5a74;
    text-align: center;
  }

  .or-bottom .en-xs-title {
    margin-top: 5px;
  }

  .or-bottom i {
    border: 1px solid #DBD8D8;
    float: left;
    margin-top: 38px;
    height: 20px;
  }

  .job-distribution {
    background-color: #ffffff;
    height: 100%;
    position: absolute;
    right: 0;
    left: 352px;
  }

  .ab-bottom {
    height: calc(100% - 200px) !important;
    margin-top: 15px;
    min-height: 520px !important;
  }

  .ab-bottom:after {
    content: '';
    display: block;
    clear: both;
  }

  .ab-bottom>div {
    float: left;
    width: 49%;
    min-height:  calc( 100% - 40px) !important;
    background-color: #ffffff !important;
  }

  .ab-bottom .right {
    float: right;
  }

  #h-bar {
    width: 100%;
    height: 230px;
  }

  #time-ranking,#frequency-ranking {
    width: 100%;
    background-color: #ffffff;
  }

  .ab-bottom .right p,
  .ab-bottom .left p {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #595959;
    text-align: center;
    border-bottom: 1px solid #eeeeee;
  }

  .ab-bottom .right p span,
  .ab-bottom .left p span {
    margin: 0px 10px;
  }
</style>
