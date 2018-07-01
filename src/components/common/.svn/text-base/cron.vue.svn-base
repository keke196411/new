<template>
  <el-dialog title="cron表达式生成中..." :visible.sync="isShowCron" width="30%" center class="md-md-dialog cron-dialog">
    <p @click="isShowCron = false">
      <span>&lt;</span>
      <span>返回编辑</span>
    </p>
    <el-form ref="cron-from" v-model="cron">
      <el-tabs type="border-card" class="cron-content">
        <el-tab-pane label="秒">
          <div title="" class="panel-body panel-body-noheader panel-body-noborder">
            <el-radio-group v-model="cron.second.index">
              <div class="line">
                <el-radio label="wildcard" v-model="cron.second.wildcard">每秒允许的通配符[, - * /]</el-radio>
              </div>
              <el-row class="line">
                <el-radio label="cycle" v-model="cron.second.cycle.min">周期从</el-radio>
                <el-input-number type="text" class="en-number" controls-position="right" v-model="cron.second.cycle.min" :min="1" :max="58"></el-input-number>
                <span>到</span>
                <el-input-number type="text" class="en-number" controls-position="right" v-model="cron.second.cycle.max" :min="2" :max="59"></el-input-number>
                <span>秒</span>
              </el-row>
              <el-row class="line">
                <el-radio label="interval">从</el-radio>
                <el-input-number type="text" class="en-number" controls-position="right" v-model="cron.second.interval.start" :min="0" :max="59"></el-input-number>
                <span>秒开始，每</span>
                <el-input-number type="text" class="en-number" controls-position="right" v-model="cron.second.interval.step" :min="1" :max="59"></el-input-number>
                <span>秒执行一次</span>
              </el-row>
              <div class="line">
                <el-radio label="specify">指定</el-radio>
              </div>
              <el-checkbox-group v-model="cron.second.specify" :span=12>
                <div v-for="(items,key) in constant.NUMBER_LT_60" :key="key">
                  <el-checkbox v-for="(item,key) in items" type="checkbox" :label="item" :value="item" :key="key">
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </el-radio-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分">
          <el-radio-group v-model="cron.minute.index">
            <div class="line">
              <el-radio label="wildcard" v-model="cron.minute.wildcard">每分钟允许的通配符[, - * /]</el-radio>
            </div>
            <el-row class="line">
              <el-radio label="cycle" v-model="cron.minute.cycle.min">周期从</el-radio>
              <el-input-number class="en-number" controls-position="right" v-model="cron.minute.cycle.min"  :min="1" :max="58"></el-input-number>
              <span>到</span>
              <el-input-number class="en-number" controls-position="right" v-model="cron.minute.cycle.max"  :min="2" :max="59"></el-input-number>
              <span>分钟</span>
            </el-row>
             <el-row class="line">
              <el-radio label="interval">从</el-radio>
              <el-input-number class="en-number" controls-position="right" v-model="cron.minute.interval.start"  :min="0" :max="59"></el-input-number>
              <span>分开始，每</span>
              <el-input-number class="en-number" controls-position="right" v-model="cron.minute.interval.step"  :min="1" :max="59"></el-input-number>
              <span>分执行一次</span>
            </el-row>
            <div class="line">
              <el-radio label="specify">指定</el-radio>
            </div>
            <el-checkbox-group v-model="cron.minute.specify">
              <div v-for="(items,key) in constant.NUMBER_LT_60" :key="key">
                <el-checkbox v-for="(item,key) in items" type="checkbox" :label="item" :value="item" :key="key">
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="小时" class="hour-pane">
          <el-radio-group v-model="cron.hour.index">
            <div class="line">
              <el-radio label="wildcard" v-model="cron.hour.wildcard">每时允许的通配符[, - * /]</el-radio>
            </div>
            <el-row class="line">
                <el-radio label="cycle">周期从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.hour.cycle.min" :min="0" :max="23"></el-input-number>
                <span>到</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.hour.cycle.max" :min="2" :max="23"></el-input-number>
                <span>小时</span>
            </el-row>
            <el-row class="line">
                <el-radio label="interval">从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.hour.interval.start" :min="0" :max="23"></el-input-number>
                <span>时开始，每</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.hour.interval.step" :min="1" :max="23"></el-input-number>
                <span>小时执行一次</span>
            </el-row>
            <div class="line">
              <el-radio label="specify">指定</el-radio>
            </div>
            <el-checkbox-group v-model="cron.hour.specify">
              <div v-for="(items,key) in constant.NUMBER_LT_24" :key="key">
                <el-checkbox v-for="(item,key) in items" type="checkbox" :label="item" :value="item" :key="key">
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="日" class="day-pane">
          <el-radio-group v-model="cron.day.index">
            <div class="line">
              <el-radio label="wildcard" v-model="cron.day.wildcard">每日允许的通配符[, - * /]</el-radio>
            </div>
            <div class="line">
              <el-radio label="notSpecify" v-model="cron.day.notSpecify">不指定</el-radio>
            </div>
            <el-row class="line">
                <el-radio label="cycle" v-model="cron.day.cycle.min">周期从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.day.cycle.min" :min="1" :max="31"></el-input-number>
                <span>到</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.day.cycle.max" :min="2" :max="23"></el-input-number>
                <span>日</span>
            </el-row>
            <el-row class="line">
                <el-radio label="interval">从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.day.interval.start" :min="1" :max="31"></el-input-number>
                <span>日开始，每</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.day.interval.step" :min="1" :max="31"></el-input-number>
                <span>日执行一次</span>
            </el-row>
            <el-row class="line">
                <el-radio label="near">每月</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.day.near" :min="1" :max="31"></el-input-number>
                <span>日最近的工作日</span>
            </el-row>
            <div class="line">
              <el-radio label="last">本月最后一天</el-radio>
            </div>
            <div class="line">
              <el-radio label="specify">指定</el-radio>
            </div>
            <el-checkbox-group v-model="cron.day.specify">
              <div v-for="(items,key) in constant.NUMBER_LT_32" :key="key">
                <el-checkbox v-for="(item,key) in items" type="checkbox" :label="item" :value="item" :key="key">
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="星期">
          <el-radio-group v-model="cron.week.index">
            <div class="line">
              <el-radio label="wildcard" v-model="cron.week.wildcard">每周允许的通配符[, - * /]</el-radio>
            </div>
            <div class="line">
              <el-radio label="notSpecify">不指定</el-radio>
            </div>
            <el-row class="line">
                <el-radio label="interval">周期从周</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.week.interval.start" :min="1" :max="7"></el-input-number>
                <span>到</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.week.interval.step" :min="2" :max="7"></el-input-number>
            </el-row>
            <el-row class="line">
                <el-radio label="weekInterval">第</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.week.weekInterval.start" :min="1" :max="4"></el-input-number>
                <span>周，星期</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.week.weekInterval.step"  :min="1" :max="7"></el-input-number>
            </el-row>
            <el-row class="line">
                <el-radio label="last">本月最后一星期的星期 </el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.week.last" :min="1" :max="7"></el-input-number>
            </el-row>
            <div class="line">
              <el-radio label="specify">指定</el-radio>
            </div>
            <el-checkbox-group v-model="cron.week.specify">
              <div v-for="(items,key) in constant.NUMBER_LT_8" :key="key">
                <el-checkbox v-for="(item,key) in items" type="checkbox" :label="item" :value="item" :key="key">
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="月">
          <el-radio-group v-model="cron.month.index">
            <div class="line">
              <el-radio label="wildcard">月允许的通配符[, - * /]</el-radio>
            </div>
            <div class="line">
              <el-radio label="notSpecify">不指定</el-radio>
            </div>
            <el-row class="line">
                <el-radio label="cycle">周期从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.month.cycle.min" :min="1" :max="12"></el-input-number>
                <span>月到</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.month.cycle.max"  :min="2" :max="12"></el-input-number>
                <span>月</span>
            </el-row>
            <el-row class="line">
                <el-radio label="interval">从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.month.interval.start" :min="1" :max="31"></el-input-number>
                <span>日开始，每</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.month.interval.step" :min="1" :max="12"></el-input-number>
                <span>月执行一次</span>
            </el-row>
            <div class="line">
              <el-radio label="specify">指定</el-radio>
            </div>
            <el-checkbox-group v-model="cron.month.specify">
              <div v-for="(items,key) in constant.NUMBER_LT_13" :key="key">
                <el-checkbox v-for="(item,key) in items" type="checkbox" :label="item" :value="item" :key="key">
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="年">
          <el-radio-group v-model="cron.year.index">
            <div class="line">
              <el-radio label="notSpecify">不指定，允许的通配符[, - * /]</el-radio>
            </div>
            <div class="line">
              <el-radio label="wildcard">每年</el-radio>
            </div>
            <el-row class="line">
                <el-radio label="cycle" v-model="cron.year.cycle.min">周期从</el-radio>
                <el-input-number controls-position="right" class="en-number" v-model="cron.year.cycle.min" :min="new Date().getFullYear()" :max="3000"></el-input-number>
                <span>到</span>
                <el-input-number controls-position="right" class="en-number" v-model="cron.year.cycle.max"  :min="new Date().getFullYear()+1" :max="3000"></el-input-number>
            </el-row>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>
      <p class="en-md-title" style="margin-top: 13px;">表达式</p>
      <el-row>
        <el-col :span=3 v-text="'表达式字段:'">
        </el-col>
        <el-col :span=3 v-for="(unit,key) in timeUnit" :key="key" v-text="unit.text" style="text-align: center;">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=3 v-text="'1'" style="visibility:hidden"></el-col>
        <el-col :span=3 v-for="(unit,key) in timeUnit" :key="key" style="text-align: center;">
          <el-input type="text" class="en-cron-field" v-model="unit.value"></el-input>
        </el-col>
      </el-row>
      <div>
        cron表达式：
        <el-input v-model="cronValue"></el-input>
      </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="cronResolve">反解</el-button>
        <el-button type="primary" @click="confirmCron">确 定</el-button>
      </span>

  </el-dialog>
</template>
<script>
import bus from '@/common/eventbus'
let cron = [{value: '*', text: '秒'}, {value: '*', text: '分'}, {value: '*', text: '时'}, {value: '*', text: '日'}, {value: '*', text: '星期'}, {value: '?', text: '月'}, {value: '', text: '年'}]
export default {
  data () {
    return {
      isShowCron: false,
      timeUnit: JSON.parse(JSON.stringify(cron)),
      cron: {
        second: {
          index: '',
          wildcard: '',
          cycle: {
            min: '',
            max: ''
          },
          interval: {
            start: '',
            step: ''
          },
          specify: []
        },
        minute: {
          index: '',
          wildcard: '',
          cycle: {
            min: '',
            max: ''
          },
          interval: {
            start: '',
            step: ''
          },
          specify: []
        },
        hour: {
          index: '',
          wildcard: '',
          cycle: {
            min: '',
            max: ''
          },
          interval: {
            start: '',
            step: ''
          },
          specify: []
        },
        day: {
          index: '',
          wildcard: '',
          notSpecify: '',
          cycle: {
            min: '',
            max: ''
          },
          interval: {
            start: '',
            step: ''
          },
          specify: [],
          near: '',
          last: ''
        },
        week: {
          index: '',
          wildcard: '',
          notSpecify: '',
          weekInterval: {
            min: '',
            max: ''
          },
          interval: {
            start: '',
            step: ''
          },
          specify: [],
          near: '',
          last: ''
        },
        month: {
          index: '',
          wildcard: '',
          notSpecify: '',
          cycle: {
            min: '',
            max: ''
          },
          interval: {
            start: '',
            step: ''
          },
          specify: [],
          near: '',
          last: ''
        },
        year: {
          index: '',
          wildcard: '',
          notSpecify: '',
          cycle: {
            min: '',
            max: ''
          }
        }
      },
      cronValue: '',
      isFirstLoad: true
    }
  },
  watch: {
    'cron.second': {
      handler (newValue, oldValue) {
        this.timeChange('second', this.cron.second.index, 0)
      },
      deep: true
    },
    'cron.minute': {
      handler (newValue, oldValue) {
        this.timeChange('minute', this.cron.minute.index, 1)
      },
      deep: true
    },
    'cron.hour': {
      handler (newValue, oldValue) {
        this.timeChange('hour', this.cron.hour.index, 2)
      },
      deep: true
    },
    'cron.day': {
      handler (newValue, oldValue) {
        this.timeChange('day', this.cron.day.index, 3)
      },
      deep: true
    },
    'cron.week': {
      handler (newValue, oldValue) {
        this.timeChange('week', this.cron.week.index, 4)
      },
      deep: true
    },
    'cron.month': {
      handler (newValue, oldValue) {
        this.timeChange('month', this.cron.month.index, 5)
      },
      deep: true
    },
    'cron.year': {
      handler (newValue, oldValue) {
        this.timeChange('year', this.cron.year.index, 6)
      },
      deep: true
    },
    'isShowCron': {
      handler (newValue, oldValue) {
        this.timeUnit = JSON.parse(JSON.stringify(cron))
      }
    }
  },
  created () {
    let vue = this
    vue.$bus._events.showCronDialog = null
    this.$bus.$on('showCronDialog', function (cronValue) {
      vue.isShowCron = true
      if (cronValue === '') {
        cronValue = '* * * * * ?'
      }
      vue.cronValue = cronValue
    })
  },
  methods: {
    // 时间改变
    timeChange: function (type, prop, index) {
      if (this.isFirstLoad) {
        this.$nextTick(() => {
          this.isFirstLoad = false
        })
        return
      }
      switch (prop) {
        case 'wildcard':
          this.timeUnit[index].value = '*'
          break
        case 'cycle':
          this.timeUnit[index].value = this.cron[type].cycle.min + '-' + this.cron[type].cycle.max
          break
        case 'interval':
          this.timeUnit[index].value = this.cron[type].interval.start + '/' + this.cron[type].interval.step
          break
        case 'weekInterval':
          this.timeUnit[index].value = this.cron[type].weekInterval.start + '#' + this.cron[type].weekInterval.step
          break
        case 'specify':
          this.timeUnit[index].value = ''
          for (let i = 0; i < this.cron[type].specify.length; i++) {
            this.timeUnit[index].value += parseInt(this.cron[type].specify[i])
            if (i < this.cron[type].specify.length - 1) {
              this.timeUnit[index].value += ','
            }
          }
          break
        case 'notSpecify':
          this.timeUnit[index].value = this.cron[type].notSpecify
          break
        case 'near':
          this.timeUnit[index].value = this.cron[type].near + 'W'
          break
        case 'last':
          this.timeUnit[index].value = this.cron[type].last + 'L'
          break
      }
      let vue = this
      vue.cronValue = ''
      this.timeUnit.forEach(unit => {
        vue.cronValue += unit.value + ' '
      })
    },
    // 确定当前cron表达式
    confirmCron: function () {
      bus.$emit('setCronValue', this.cronValue)
      this.isShowCron = false
    },
    // cron反解析
    cronResolve: function () {
      let cronList = this.cronValue.split(' ')
      for (let index = 0; index < this.timeUnit.length; index++) {
        this.timeUnit[index].value = cronList[index]
      }
    }
  },
  // 清除事件监听
  beforeDestroy () {
    this.$bus.$off('showCronDialog', function (param) {})
  }
}

</script>
<style>
  .padding-top-7px {
    padding-top: 7px;
  }

  .en-cron-field {
    height: 25px;
    width: 71px;
    line-height: 25px;
  }

  .en-cron-field input {
    height: 25px;
    line-height: 25px;
    padding-left: 8px;
    padding-right: 0px;
  }

  .cron-content .en-number {
    width: 160px;
  }

  .cron-content .el-input-number__decrease {
    top: 14px !important;
  }

</style>
