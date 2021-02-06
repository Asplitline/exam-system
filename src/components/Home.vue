<template>
  <div class="container">
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo w"
          mode="horizontal"
          default-active="/"
          router
        >
          <el-menu-item class="logo"
            ><img src="../assets/manage-logo.png" alt="" height="50"
          /></el-menu-item>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/contest"> 在线评测</el-menu-item>
          <el-menu-item index="/subject">科目学习</el-menu-item>
          <el-menu-item index="/share">分享中心</el-menu-item>
          <el-submenu class="userInfo" index>
            <template slot="title">你好</template>
            <el-menu-item index="/user">个人信息</el-menu-item>
            <el-menu-item index="/user">退出系统</el-menu-item>
          </el-submenu>
        </el-menu></el-header
      >
      <el-main class="w"> <router-view></router-view></el-main>
      <el-footer style="height: 100px">
        <p class="call-me"><a href="">关于我们</a>|<a href="">联系我们</a></p>
        <p class="copy-right">© 2020 NSU All Rights Reserved</p>
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
  background-color: #fcfdff;
  .el-footer {
    background-color: #333;
    color: #fff;
    font-size: 14px;
    text-align: center;
    p {
      line-height: 22px;
    }
  }
  .call-me {
    a {
      font-size: 16px;
      color: #fff;
      margin: 0 10px;
    }
  }
  .copy-right {
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
}

.el-header {
  padding: 0;
  background-color: #fff;
  .w {
    margin: 0 auto;
  }
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
