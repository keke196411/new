<template>
    <div id="dialog">
        <el-dialog title="提示" :visible.sync="isShowInfoDialog" width="30%" center>
            <span v-text="infoMsg"></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowInfoDialog = false">取 消</el-button>
                <el-button type="primary" @click="isShowInfoDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      infoMsg: '提示信息',
      isShowInfoDialog: false
    }
  },
  methods: {
    showInfoMsg: function (msg) {
      this.infoMsg = msg
      this.isShowInfoDialog = true
    }
  }
}
</script>
