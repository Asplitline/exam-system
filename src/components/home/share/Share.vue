<template>
  <div class="share">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分享中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-container>
      <el-main>
        <!-- 顶部导航 -->
        <ul class="nav-share" v-show="false">
          <li class="nav-share-item"><a href="javascript:;">全部</a></li>
          <li class="nav-share-item"><a href="javascript:;">站内公告</a></li>
          <li class="nav-share-item"><a href="javascript:;">笔经面经</a></li>
          <li class="nav-share-item"><a href="javascript:;">我要提问</a></li>
          <li class="nav-share-item"><a href="javascript:;">技术交流</a></li>
          <li class="nav-share-item"><a href="javascript:;">产品运营</a></li>
          <li class="nav-share-item"><a href="javascript:;">留学生</a></li>
          <li class="nav-share-item"><a href="javascript:;">职业发展</a></li>
          <li class="nav-share-item"><a href="javascript:;">招聘信息</a></li>
          <li class="nav-share-item"><a href="javascript:;">资源分享</a></li>
          <li class="nav-share-item"><a href="javascript:;">猿生活</a></li>
        </ul>
        <!-- 标签页 -->
        <el-card class="nav-pane">
          <el-tabs>
            <el-tab-pane label="最新回复"></el-tab-pane>
            <el-tab-pane label="最新发表"></el-tab-pane>
            <el-tab-pane label="最热"></el-tab-pane>
            <el-tab-pane label="精华"> </el-tab-pane>
          </el-tabs>
          <el-button
            type="danger"
            class="addpost"
            size="mini"
            plain
            @click="goPostSubmit"
            ><i class="el-icon-edit-outline"></i>我要发布</el-button
          >
          <ul>
            <li class="postdesc">
              <a href="#/share/post/7"
                ><h3>金山WPS服务端开发工程师面试经历</h3></a
              >
              <p>联合广场 14</p>
              <p>
                <span class="author">小王</span>
                <span class="createDate"
                  >2020-04-27 10:19:29发表在 <em>[我要提问]</em></span
                >
                <span class="replyDate"
                  >最后回复时间: <em>2020-12-15 18:15:47</em>
                </span>
              </p>
              <p class="icons">
                <i class="el-icon-chat-dot-round">2</i>
                <i class="icon-dianzan iconfont">2</i>
                <i class="el-icon-view">123</i>
              </p>
            </li>
            <li class="postdesc">
              <a href="javascript:;"
                ><h3>金山WPS服务端开发工程师面试经历</h3></a
              >
              <p>联合广场 14</p>
              <p>
                <span class="author">小王</span>
                <span class="createDate"
                  >2020-04-27 10:19:29发表在 <em>[我要提问]</em></span
                >
                <span class="replyDate"
                  >最后回复时间: <em>2020-12-15 18:15:47</em>
                </span>
              </p>
              <p class="icons">
                <i class="el-icon-chat-dot-round">2</i>
                <i class="icon-dianzan iconfont">2</i>
                <i class="el-icon-view">123</i>
              </p>
            </li>
          </ul>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    goPostSubmit() {
      this.$router.push('/share/sPostSubmit')
    }
  }
}
</script>

<style lang="less" scoped>
.nav-share {
  display: flex;
  flex-wrap: wrap;
  .nav-share-item {
    width: 12.5%;
    padding-bottom: 10px;
  }
}
.nav-pane {
  position: relative;
  .addpost {
    position: absolute;
    right: 14px;
    top: 12px;
    i {
      padding-right: 6px;
    }
  }
}
.postdesc {
  position: relative;
  font-size: 14px;
  letter-spacing: 0.1em;
  padding: 10px 0;
  border-bottom: 1px dashed #ccc;
  em {
    font-style: normal;
  }
  .icons {
    position: absolute;
    bottom: 20px;
    right: 0;
    i {
      font-size: 16px;
      padding: 0 4px;
    }
  }
  p {
    margin: 0;
    margin-top: 10px;
    span {
      margin-right: 10px;
    }
  }
}
</style>

<style lang="less">
.share {
  .el-main {
    padding: 0 20px;
  }
  .el-divider--horizontal {
    margin: 12px 0;
  }
}
</style>
