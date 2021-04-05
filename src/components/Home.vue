<template>
  <div class="container" :class="{ mainIndex: isIndex() }">
    <el-container>
      <el-header v-show="!isIndex()">
        <el-menu class="w" mode="horizontal" router :default-active="currentHIndex"
          active-text-color="#92cd18">
          <el-menu-item class="logo"><img src="../assets/logo.png" alt="" height="50" />
          </el-menu-item>
          <!-- 菜单栏 -->
          <el-menu-item v-for="item in hMenuList" :index="item.index">{{item.content}}
          </el-menu-item>
          <el-submenu class="userInfo" index>
            <template slot="title">
              <el-avatar :src="bindURL(currentUser.avatarImgUrl)"></el-avatar>
              {{ currentUser.name }}
            </template>
            <el-menu-item index="/user"> <i class="iconfont icon-user"></i>个人信息
            </el-menu-item>
            <el-menu-item @click="logout"> <i class="iconfont icon-logout"></i>退出系统
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main :class="{ w: !isIndex() }">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { bindURL } from '@utils'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { hMenuList } from '@static'
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
      hMenuList
    }
  },
  methods: {
    bindURL,
    ...mapMutations(['setCurrentUser']),
    logout() {
      window.sessionStorage.clear()
      this.setCurrentUser(null)
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(['currentHIndex', 'currentUser']),
    ...mapGetters({
      isIndex: 'getIsIndex'
    })
  },
  updated() {
    // console.log(this.isIndex)
    // console.log(this.currentHIndex)
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-flow: column;
  min-height: 100%;
  background-color: #fafafa;
  .el-header {
    background-color: #2f323a;
    padding: 0;
    .w {
      margin: 0 auto;
    }
    .el-menu {
      background-color: #2f323a;
    }
    .el-menu-item {
      text-align: center;
      color: #fff;
      letter-spacing: 0.2em;
      &:hover {
        background-color: #25272e;
        color: #fff;
      }
    }

    .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
    /deep/.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
      background-color: transparent;
    }
  }
}

.el-main {
  flex: 1;
}

.userInfo {
  float: right !important;
}

/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: #eee;
  &:hover {
    color: #ddd;
  }
}

.container.mainIndex {
  background-image: linear-gradient(#4e9e49, #5db21f);
}
</style>
