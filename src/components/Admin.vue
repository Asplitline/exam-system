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
              <img :src="bindSrc(avatar)" alt="" class="avatar" />
              <span v-once>{{ name }}</span>
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
      <el-aside :width="isCollapse ? '64px' : '260px'">
        <div class="toggle-menu" @click="toToggleMenu">|||</div>
        <el-menu
          :default-active="activePath"
          background-color="#fff"
          text-color="#000"
          active-text-color="#F56C6C"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/_contest" @click="saveActiveMenu('/_contest')">
            <i class="iconfont icon-computer"></i>
            <span slot="title">测评管理</span>
          </el-menu-item>
          <el-menu-item index="/_problem" @click="saveActiveMenu('/_problem')">
            <i class="icon-list iconfont"></i>
            <span slot="title">题目管理</span>
          </el-menu-item>
          <el-menu-item index="/_subject" @click="saveActiveMenu('/_subject')">
            <i class="icon-book iconfont"></i>
            <span slot="title">科目管理</span>
          </el-menu-item>
          <el-menu-item index="/_grade" @click="saveActiveMenu('/_grade')">
            <i class="icon-chart iconfont"></i>
            <span slot="title">成绩管理</span>
          </el-menu-item>
          <el-menu-item index="/_users" @click="saveActiveMenu('/_users')">
            <i class="icon-user1 iconfont"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/_posts" @click="saveActiveMenu('/_posts')">
            <i class="icon-planeo iconfont"></i>
            <span slot="title">帖子管理</span>
          </el-menu-item>
          <el-menu-item
            index="/_comments"
            @click="saveActiveMenu('/_comments')"
          >
            <i class="icon-comment iconfont"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      activePath: '',
      name: window.sessionStorage.getItem('name'),
      avatar: window.sessionStorage.getItem('avatar')
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toToggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    saveActiveMenu(url) {
      window.sessionStorage.setItem('activeMenu', url)
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activeMenu')
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
  .iconfont {
    color: #fff;
    margin-right: 20px;
  }
}

.el-aside {
  box-shadow: 0 10px 10px #000;
  height: 100%;
  background-color: #fff;
}

.iconfont {
  margin-right: 10px;
  font-size: 18px;
}

.el-submenu,
.el-menu-item {
  span {
    font-size: 16px;
  }
}

.toggle-menu {
  width: 100%;
  color: #6c5ce7;
  text-align: center;
  padding: 10px 0;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: letter-spacing 0.5s;
}

.toggle-menu:hover {
  color: blue;
  letter-spacing: 0.5em;
}

.el-menu-item {
  text-align: center;
  letter-spacing: 0.3em;
}
</style>
