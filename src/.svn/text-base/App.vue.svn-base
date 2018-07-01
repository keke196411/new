<template>
  <div id="app">
    <enHead></enHead>
    <enBody></enBody>
  </div>
</template>

<script>
import enHead from '@/components/common/head'
import enBody from '@/components/common/body'
import store from '@/api/store'
export default {
  name: 'App',
  created () {
    this.$store.commit({
      type: 'user',
      amount: {
        name: 'enjoyor',
        password: '123'
      }
    })
  },
  components: {
    enHead,
    enBody
  },
  store
}

</script>
<style>
  .line-height-18 .el-form-item__content {
    line-height: 18px !important;
  }

  #app {
    min-width: 1340px;
  }

  * {
    margin: 0px;
    padding: 0px;
    font-family: "Microsoft YaHei", sans-serif;
  }

  html {
    height: 100%;
    background-color: #F7F6FB;
  }

  body {
    height: 100%;
    overflow: hidden;
  }

  /* 布局 */

  .content {
    padding-right: 15px;
    background-color: #F7F6FB;
    height: 100%;
    position: relative;
  }

.el-menu{
      border-right: none !important;
}
  .condition {
    float: right;
  }

  .condition .select {
    width: 87px;
    height: 31px;
    padding-left: 7px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    color: #797c7d;
    font-size: 12px;
    margin-right: 4px;
    line-height: 31px;
  }

  .condition input.keyword {
    width: 200px;
    height: 26px;
    padding-left: 7px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    color: #4d84fe;
    font-size: 12px;
    margin-right: 4px;
  }

  .content .el-table {
    height: calc(100% - 41px);
  }

  /* 分页相关 */

  .content .el-pager li.number,
  .btn-prev,
  .btn-next {
    border-radius: 50% !important;
    border: 1px solid #acabab !important;
  }

  .content .el-pager li.number:not(.active),
  .btn-prev,
  .btn-next,
  .content .el-icon-more {
    background-color: #ffffff !important;
  }

  .content .el-icon-more:before {
    font-size: 12px;
  }

  .content .el-pagination {
    bottom: 40px;
    text-align: center;
    width: 100%;
    font-size: 12px !important;
    font-weight: 400;
  }

  .content .el-pagination {
    align-self: flex-end !important;
    margin-bottom: 4px !important;
    margin-top: auto !important;
  }

  /* 编辑 */

  [contenteditable="false"] {
    margin-left: 10px;
    width: 108px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [contenteditable="true"] {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    padding: 0px 10px;
    border: 1px solid #eeeeee;
    width: 100px;
  }

  /* 标题 */

  .en-lg-title {
    height: 26px;
    font-size: 20px;
    color: #4d84f3;
    margin-left: 3px;
    margin-bottom: 15px;
  }

  .en-md-title {
    text-align: left;
    font-size: 16px;
    padding-left: 5px;
    color: #595959;
    border-left: 2px solid #5186FE;
    line-height: 16px;
    border-spacing: 10px;
    margin-left: 18px;
    margin-top: 10px;
  }

  .en-sm-title {
    font-size: 14px;
    color: #6e6e6e;
    margin-left: 5px;
    margin-top: 6px;
  }

  .en-xs-title {
    font-size: 12px;
    color: #6e6e6e;
    margin-left: 5px;
  }

  .el-menu-item.is-active span{
    color: #4d84fe;
  }

  .el-menu-item,
  .el-submenu .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
  }

  /* icon */

  .icon {
    vertical-align: middle;
    background-repeat: no-repeat !important;
    width: 26px;
    height: 27px;
    display: inline-block !important;
  }

  .icon-logo {
    background: url(/static/images/icon-login.png) left top / 100% 100%;
    background-size: 100% 100%;
    margin-right: 10px;
  }

  .icon-del {
    background: url(/static/images/icon-del.png) left top;
  }

  .icon-add {
    background: url(/static/images/icon-add.png) left top;
  }

  .icon-function {
    background: url(/static/images/icon-function.png) left top;
  }

  .icon-abstract {
    background-position: 2px 2px;
  }

  .is-active .icon-abstract {
    background-position: -21px 2px;
  }

  .icon-list {
    background-position: 2px -21px;
  }

  .is-active .icon-list {
    background-position: -21px -21px;
  }
  .is-opened .icon-list{
       background-position: 2px -21px;
  }

  .icon-error {
    background-position: 2px -45px;
  }

  .is-active .icon-error {
    background-position: -21px -45px;
  }

  .icon-log {
    background-position: 2px -69px;
  }

  .is-active .icon-log {
    background-position: -21px -69px;
  }

  .icon-delete {
    background: url(/static/images/icon-delete.png) left top;
  }

  .icon-edit {
    background: url(/static/images/icon-edit.png) left top;
  }

  .icon-see {
    background: url(/static/images/icon-see.png) left top;
  }

  .icon-pause {
    background: url(/static/images/icon-pause.png) left top;
    margin-top: 5px;
  }

  .icon-start {
    background: url(/static/images/icon-start.png) left top;
  }

  .icon-stop {
    background: url(/static/images/icon-stop.png) left top;
    background-position: 2px 4px;
  }

  .icon-recovery {
    background: url(/static/images/icon-recovery.png) left top;
  }

  /* end icon */

  /* modal */

  .el-dialog__header {
    height: 40px;
    padding: 0px !important;
    line-height: 40px;
    padding-left: 14px;
    background: -o-linear-gradient(left, #4d84fe, #86acfe) !important;
    background: -moz-linear-gradient(left, #4d84fe, #86acfe) !important;
    background: -webkit-linear-gradient(left, #4d84fe, #86acfe) !important;
    font-size: 16px;
    text-align: left;
  }

  .md-md-dialog .el-dialog__body>p:first-child {
    font-size: 16px;
    color: #ffca3b;
    margin-bottom: 15px;
  }

  .md-md-dialog .el-dialog__body>p>span:first-child {
    margin-right: 9px;
  }

  .el-dialog__title {
    color: #fefefe !important;
    margin-left: 14px !important;
  }

  .el-dialog__header .el-dialog__headerbtn {
    top: 10px !important;
  }

  .el-dialog__header .el-dialog__headerbtn .el-icon-close::before {
    font-size: 21px;
    color: #ffffff;
  }

  .el-dialog__body {
    padding: 10px 20px !important;
  }

  .el-dialog__body .el-form {
    padding-top: 10px;
  }

  .el-dialog__body .el-form label,
  .el-dialog__body .el-form span {
    font-size: 12px;
    color: #797c7d;
  }
.label-top-form.el-form span {
   color:  #303133
}
  .el-dialog__body .el-form .el-input input {
    height: 28px;
  }

  .el-dialog__body .el-form .el-select {
    display: block;
  }

  .el-dialog__body .el-form .el-date-editor {
    width: 100%;
  }

  .el-dialog__body .en-md-title {
    margin: 0px;
  }

  .el-dialog__footer {
    bottom: 0px;
    height: 62px;
    width: 100%;
    text-align: center !important;
    border-top: 1px solid #eeeeee;
  }

  .el-dialog__footer .el-button {
    height: 36px;
    width: 80px;
    padding: 0px;
  }

  .md-md-dialog .el-dialog {
    width: 640px !important;
  }

 .cron-dialog .el-dialog {
    width: 680px !important;
  }

  .md-lg-dialog .el-dialog {
    width: 755px !important;
  }

  .md-md-dialog .el-dialog__body {
    padding-top: 10px;
    padding-left: 16px;
  }

  .md-details .el-dialog {
    height: 505px !important
  }

  .label-top-form label {
    height: 24px;
    line-height: 24px;
    padding: 0px
  }

  .label-top-form .el-form-item {
    margin-bottom: 0px;
  }

  .en-number  {
    width: 100%;
  }

  .en-number  [role="button"] {
    height: 25px!important;
    margin-top: 5px!important;
    line-height: 25px!important;
  }

  .info-msg {
    line-height: 90px;
    font-size: 16px;
    color: #979798;
    text-align: center;
  }

  /* reset */
  .el-table__body-wrapper .el-table__body {
    display: block;
    width: 100% !important;
  }

  .list table {
    display: block;
  }

  .list table * {
    display: block;
  }

  .list table tr:after {
    content: '';
    display: block;
    clear: both;
  }

  .list table th,
  .list table td {
    float: left;
    height: 100%;
  }

  .list table th:first-child,
  .list table td:first-child {
    width: 5%;
  }

  .list table th:nth-child(2),
  .list table td:nth-child(2) {
    width: 10%;
  }

  .list table th:nth-child(3),
  .list table td:nth-child(3) {
    width: 10%;
  }

  .list table th:nth-child(4),
  .list table td:nth-child(4) {
    width: 10%;
  }

  .list table th:nth-child(5),
  .list table td:nth-child(5) {
    width: 10%;
  }

  .list table th:nth-child(6),
  .list table td:nth-child(6) {
    width: 10%;
    display: inherit;
  }

  .list table th:nth-child(7),
  .list table td:nth-child(7) {
    width: 10%;
  }

  .list table th:nth-child(8),
  .list table td:nth-child(8) {
    width: 10%;
  }

  .list table th:nth-child(9),
  .list table td:nth-child(9) {
    width: 25%;
  }

  .content {
    display: -webkit-flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: stretch !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  .content .el-table {
    flex: 1 1 auto !important;
    align-self: flex-start !important;
    min-height: 225px !important;
  }

  .font-size-0 {
    font-size: 0;
  }

  .el-tooltip__popper {
    left: 100px;
    right: 100px;
  }
  .cron-content .el-input-number__increase,
  .cron-content .el-input-number__decrease {
    line-height: 13px !important;
    height: 13px !important;
  }

</style>
