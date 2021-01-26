<template>
  <el-container class="main-container">
    <el-header>
      <div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#1b1c1d"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            ><img src="../assets/manage-logo.png" alt="" class="logo"
          /></el-menu-item>
          <el-menu-item class="logo-title"
            >成都东软学院考试平台控制台</el-menu-item
          >
          <el-submenu class="user-info" index="1">
            <template slot="title">
              <img src="../assets/jenny.jpg" alt="" class="avatar" />
              管理员
            </template>
            <el-menu-item
              ><i class="icon-user iconfont"></i>个人中心</el-menu-item
            >
            <el-menu-item @click="logout"
              ><i class="icon-log-out iconfont"></i>退出系统</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>

      <!-- <el-button type="info" @click="logout">退出</el-button> -->
    </el-header>
    <el-container>
      <el-aside width="260px">
        <el-menu
          background-color="#fff"
          text-color="#000"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-computer"></i>
              <span>测评管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="icon-list iconfont"></i>
            <span slot="title">题目管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="icon-book iconfont"></i>
            <span slot="title">科目管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="icon-chart iconfont"></i>
            <span slot="title">成绩管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="icon-user1 iconfont"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="icon-planeo iconfont"></i>
            <span slot="title">帖子管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="icon-comment iconfont"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
}
.el-header {
  padding: 0 0;
  .logo {
    width: 50px;
    height: 50px;
    pointer-events: none;
  }
  .logo-title {
    font-size: 20px;
  }
  .user-info {
    float: right;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.el-aside {
  box-shadow: 0 10px 10px #000;
  .el-menu {
    height: 100%;
  }
}
</style>
<style>
.iconfont {
  margin: 0 16px !important;
}
</style>
