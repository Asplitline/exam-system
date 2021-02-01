<template>
  <div class="container">
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          text-color="#304455"
          active-text-color="#41b883"
          default-active="/"
          router
        >
          <el-menu-item class="logo"
            ><img src="../assets/manage-logo.png" alt="" height="50"
          /></el-menu-item>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/contest">在线评测</el-menu-item>
          <el-menu-item index="/subject">科目学习</el-menu-item>
          <el-menu-item index="/share">分享中心</el-menu-item>
          <el-submenu class="userInfo">
            <template slot="title">你好</template>
            <el-menu-item index="/user">个人信息</el-menu-item>
          </el-submenu>
        </el-menu></el-header
      >
      <el-main> <router-view></router-view></el-main>
      <el-footer class="mfooter">
        <el-row :gutter="20">
          <el-col :span="5" :offset="4"
            ><div class="grid-content bg-purple">
              <h2>项目介绍</h2>
              <p>
                在线考试系统是一个在线测试学习系统，并用于辅助课程教学和学生学习。
              </p>
            </div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <h2>联系我们</h2>
              <p>如有问题请发邮件到<a>1231@456.com</a></p>
            </div></el-col
          >
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <p>© 2020 NSU All Rights Reserved</p>
              <p>
                网站版本：v1.0.0 Beta #20200109 服务器时间：2021-01-10 14:51:12
              </p>
              <p>
                站长统计 | 今日IP[91] | 今日PV[4511] | 昨日IP[133] |
                昨日PV[10109] | 当前在线[1]
              </p>
            </div></el-col
          >
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-flow: column;
  min-height: 100%;
  .mfooter {
    background-color: #333;
    color: #fff;
    font-size: 14px;
    p {
      line-height: 22px;
    }
  }
}

.el-header {
  padding: 0;
}

.el-main {
  flex: 1;
}
.userInfo {
  float: right !important;
}
</style>

<style>
.logo:hover {
  background-color: transparent !important;
}
</style>
