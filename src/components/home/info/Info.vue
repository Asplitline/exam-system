<template>
  <div class="info">
    <el-card>
      <div class="i-header">
        <img :src="bindURL(currentUser.avatarImgUrl)" alt="">
        <div class="i-info">
          <p class="i-title">{{currentUser.name}}</p>
          <p class="i-desc">{{currentUser.description||'暂时没有任何签名'}}</p>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="user-info">
          <span slot="label"><i class="iconfont icon-user1"></i> 个人信息</span>
          <user-info />
        </el-tab-pane>
        <el-tab-pane name="change-password">
          <span slot="label"><i class="iconfont icon-keychange"></i> 修改密码</span>
          <change-password :id="currentUser.id" />
        </el-tab-pane>
        <el-tab-pane name="error-record">
          <span slot="label"><i class="iconfont icon-edit"></i> 错题记录</span>
          <error-record />
        </el-tab-pane>
        <el-tab-pane name="post-record">
          <span slot="label"><i class="iconfont icon-editorpublish"></i> 发帖记录</span>
          <post-record />
        </el-tab-pane>
        <el-tab-pane name="contest-record">
          <span slot="label"><i class="iconfont icon-record"></i> 考试记录</span>
          <contest-record />
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import userInfo from './UserInfo'
import changePassword from './ChangePassword'
import errorRecord from './ErrorRecord'
import postRecord from './PostRecord'
import contestRecord from './ContestRecord'
import { mapState } from 'vuex'
import { bindURL } from '@utils'
export default {
  data() {
    return {
      activeName: 'user-info'
    }
  },
  methods: {
    bindURL,
    handleClick(tab, evt) {
      // console.log(tab, evt)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    userInfo,
    changePassword,
    errorRecord,
    postRecord,
    contestRecord
  }
}
</script>

<style lang="less" scoped>
.info {
  padding: 0 20%;
}
.i-header {
  display: flex;
  margin-bottom: 20px;
  img {
    width: 100px;
    height: 100px;
    border: 1px solid #ede9e9;
  }
  .i-info {
    margin-left: 2em;
    .i-title {
      color: #2f2f2f;
      font-size: 20px;
      margin-top: 10px;
    }
    .i-desc {
      color: #969696;
      font-size: 16px;
    }
  }
}

.el-tabs__item span {
  font-size: 16px;
}

/deep/.el-tabs__item:hover,
/deep/.el-tabs__item.is-active {
  color: #92cd18;
}
/deep/.el-tabs__active-bar {
  background-color: #92cd18;
}

// li.userInfo.el-submenu .el-submenu__title {
//   color: red;
// }
</style>