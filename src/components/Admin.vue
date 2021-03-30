<template>
  <!-- 侧边导航 -->
  <el-container class="main-container">
    <el-aside :width="isCollapse ? '64px' : '260px'">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <span>初中题库管理系统</span>
      </div>
      <el-menu :default-active="activePath" text-color="#fff" active-text-color="#92cd18"
        :collapse="isCollapse" :collapse-transition="false" router>
        <el-menu-item :index="item.index" @click="saveActiveMenu(item.index)"
          v-for="item in menuList">
          <i :class='item.icon'></i>
          <span slot="title">{{item.content}}</span>
        </el-menu-item>
      </el-menu>
      <a href="javascript:;" class="toggle">|||</a>
    </el-aside>
    <!-- 顶部导航 -->
    <el-container class="content-container">
      <el-header>
        <div>
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#fff"
            text-color="#000" active-text-color="#0000004d">
            <el-submenu class="user-info" index="0">
              <template slot="title">
                <img
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  alt="" class="avatar" />
                <span>你好,{{ name }}</span>
              </template>
              <el-menu-item><i class="icon-user iconfont"></i>个人中心</el-menu-item>
              <el-menu-item @click="logout"><i class="icon-log-out iconfont"></i>退出系统
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
/**
 * 用户管理
 * 考试管理
 * 课程管理
 * 题目管理
 * 试卷批改
 * 交流区管理
 */
import { menuList } from '@static'
export default {
  data() {
    return {
      isCollapse: false,
      activePath: '',
      name: window.sessionStorage.getItem('name'),
      avatar: window.sessionStorage.getItem('avatar'),
      menuList
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
  updated() {
    console.log(this.$route)
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activeMenu')
  }
}
</script>

<style lang="less" scoped>
.main-container {
  // max-height: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.el-header {
  padding: 0 0;
  .logo {
    width: 40px;
    height: 40px;
    pointer-events: none;
  }
  .logo-title {
    font-size: 20px;
  }
  .user-info {
    float: right;
    margin-right: 40px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      margin-left: 12px;
      font-size: 14px;
      color: #777;
      letter-spacing: 0.1em;
      vertical-align: middle;
    }
  }
  .iconfont {
    color: #fff;
    margin-right: 20px;
  }
}

.el-aside {
  position: relative;
  box-shadow: 0 10px 10px #000;
  height: 100%;
  background-color: #2f323a;
  overflow: visible;
  .iconfont {
    color: #fff;
  }
  .logo {
    position: relative;
    font-size: 0;
    padding: 10px 0;
    text-align: center;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      font-size: 18px;
      text-indent: 0.5em;
      line-height: 50px;
      color: #fff;
      text-align: center;
      vertical-align: middle;
      letter-spacing: 0.1em;
    }
  }
  .el-menu {
    border-right: none;
    span {
      font-size: 16px;
    }
  }
  .el-menu-item {
    background-color: #2f323a;
    border-left: 3px solid transparent;
    text-align: center;
    letter-spacing: 0.3em;
    &:hover {
      border-left: 3px solid #92cd18;
      background-color: #25272e;
    }
  }
  .toggle {
    top: 14px;
    right: -30px;
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    background-color: #25272e;
    letter-spacing: 0.1em;
    border-radius: 0 4px 4px 0;
    transition: all 0.2s ease-in-out;
    z-index: 1;
    &:hover {
      letter-spacing: 0.3em;
    }
  }
}

.iconfont {
  margin-right: 10px;
  font-size: 18px;
}
</style>
