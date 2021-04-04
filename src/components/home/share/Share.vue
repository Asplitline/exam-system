<template>
  <div class="share">
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
          <el-button type="danger" class="addpost" size="mini" plain
            @click="goPostSubmit"><i class="el-icon-edit-outline"></i>我要发布</el-button>
          <ul>
            <li class="postdesc" v-for="item in postList" :key="item.id">
              <a @click="goPostById(item.id, item.authorId)" href="javascript:;">
                <h3>{{ item.title }}</h3>
              </a>
              <p>
                <span class="author">{{ getName(item.authorId) }}</span>
                <span class="createDate">{{ item.createTime | formatDate }}发表在
                  <em>[我要提问]</em></span>
                <span class="replyDate">最后回复时间:
                  <em>{{ item.lastReplyTime | formatDate }}</em>
                </span>
              </p>
              <p class="icons">
                <i class="el-icon-chat-dot-round">2</i>
                <i class="icon-dianzan iconfont">2</i>
                <i class="el-icon-view">123</i>
              </p>
            </li>
          </ul>
          <!-- 分页 -->
          <el-pagination layout="prev, pager, next" :total="total" :page-size="query.size"
            @current-change="handleCurrent" v-if="total">
          </el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      postList: [],
      userList: [],
      activeName: 'first',
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      total: 0
    }
  },
  methods: {
    ...mapMutations(['initPostList']),
    // 获取文章
    async getPostList() {
      const { data, status } = await this.$http('/post/api/pagePosts', {
        params: this.query
      })
      if (status === 200) {
        const { list, total } = data
        this.total = total
        this.postList = list
        this.initPostList(list)
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 提交文章
    goPostSubmit() {
      this.$router.push('/share/sPostSubmit')
    },
    // 跳转到文章详情
    goPostById(id, uid) {
      this.$router.push(`/share/post/${id}/${uid}`)
    },
    // 根据id获取用户名
    getName(id) {
      return this.getUserById(id).name
    },
    // 当前页
    handleCurrent(currentIndex) {
      this.query.page = currentIndex
      this.getPostList()
    }
  },
  computed: {
    ...mapGetters(['getUserById'])
  },
  created() {
    this.getPostList()
    this.userList = this.$store.state.userList
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
  a {
    color: rgb(0, 0, 238);
    &:hover {
      color: red;
    }
  }
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
