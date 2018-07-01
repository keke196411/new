<template>
    <el-row class="en-head">
        <el-col :span="24">
            <div class="head-notify">
                <i class="icon icon-logo"></i>
                <h2>作业管理器</h2>
            </div>
            <div class="head-login">
                <img src="/static/images/icon-user.png" width="34" height="34">
                <a class="btn">Admin</a>
            </div>
        </el-col>
    </el-row>
</template>

<style>
.en-head{
    position: relative;
    z-index: 1;
    height: 55px;
    box-shadow: 0 2px 2px rgba(102,103,103,.1);
    background-color: #ffffff;
    padding-left: 20px;
}
.en-head .head-notify ,.en-head .head-login{
    height:55px;
    line-height: 55px;
}
.en-head .head-notify {
    float: left;
    width: 216px;
}
.en-head .head-notify h2 {
    display: inline;
    vertical-align: middle;
    font-size: 16px;
    color: #4d84fe;
    font-weight: 400;
}
.en-head .head-login{
    float: right;
}
.en-head .head-login img{
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}
.en-head .head-login .btn{
    height: 18px;
    margin: 0 20px 0 5px;
    padding: 0 3px;
    line-height: 1;
    vertical-align: middle;
    font-size: 16px;
    color: #4d84fe;
}
</style>
