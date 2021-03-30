<template>
  <div class="container" :class="{ mainIndex: isIndex }">
    <el-container>
      <el-header v-show="!isIndex">
        <el-menu class="el-menu-demo w" mode="horizontal" router :default-active="active">
          <el-menu-item class="logo"><img src="../assets/logo.png" alt="" height="50" />
          </el-menu-item>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/contest"> 在线评测</el-menu-item>
          <el-menu-item index="/subject">科目学习</el-menu-item>
          <el-menu-item index="/share">分享中心</el-menu-item>
          <el-submenu class="userInfo" index>
            <template slot="title">
              <el-avatar :src="bindSrc(user.avatarImgUrl)"></el-avatar>
              {{ user.name }}
            </template>
            <el-menu-item index="/user">个人信息</el-menu-item>
            <el-menu-item index="/user">更改密码</el-menu-item>
            <el-menu-item index="/user">考试记录</el-menu-item>
            <el-menu-item index="/user">我的发帖</el-menu-item>
            <el-menu-item @click="logout">退出系统</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main :class="{ w: !isIndex }">
        <router-view></router-view>
      </el-main>

      <el-footer style="height: 100px" class="footer">
        <p class="call-me"><a href="">关于我们</a>|<a href="">联系我们</a></p>
        <p class="copy-right">© 2020 NSU All Rights Reserved</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
/**
 * 考试中心
 * 题目练习
 * 交流区
 * 个人信息
 */
export default {
  data() {
    return {
      user: {},
      isIndex: false,
      active: ''
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  created() {
    this.user = this.$store.state.currentUser
    this.active = window.sessionStorage.getItem('currentMenu')
    this.isIndex = window.sessionStorage.getItem('isIndex') === 'true'
  },
  updated() {
    this.active = window.sessionStorage.getItem('currentMenu')
    this.isIndex = window.sessionStorage.getItem('isIndex') === 'true'
  }
}
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

.el-menu-item {
  text-align: center;
  letter-spacing: 0.2em;
}

// 主页样式
.mainIndex {
  background-image: linear-gradient(to top right, #12cbc4, #0652dd);
  .footer {
    background-color: transparent;
  }
}
</style>

<style>
.logo:hover {
  background-color: transparent !important;
}
</style>
