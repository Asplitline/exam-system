<template>
  <div v-highlight>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分享中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-container class="postDetail">
      <el-main>
        <!-- 文章描述 -->
        <div class="postdesc">
          <el-row>
            <el-col :span="2">
              <el-avatar
                shape="square"
                :size="50"
                :src="bindSrc(user.avatarImgUrl)"
              ></el-avatar>
            </el-col>
            <el-col :span="12">
              <div class="content">
                <a href=""
                  ><h4>{{ user.name }}</h4>
                </a>
                <span class="createDate"
                  >{{ post.createTime | formatDate }}发表</span
                >
              </div>
              <p class="icons">
                <i class="el-icon-chat-dot-round">2</i>
                <i class="icon-dianzan iconfont">2</i>
                <i class="el-icon-view">123</i>
              </p>
            </el-col>
          </el-row>
        </div>
        <!-- 文章内容 -->
        <div class="postContent">
          <el-card shadow="always">
            <div v-html="post.htmlContent"></div>
          </el-card>
        </div>
        <el-divider> </el-divider>
        <!-- 评论区域 -->
        <p class="replyTitle">
          <i class="el-icon-chat-dot-round"></i>回复<span
            >({{ post.replyNum }})</span
          >
        </p>
        <div class="postRely">
          <div class="comment">
            <div class="content">
              <el-row v-for="(item, index) in comment" :key="item.id">
                <el-col :span="1">
                  <el-avatar
                    shape="square"
                    :size="36"
                    src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                  ></el-avatar>
                </el-col>
                <el-col :span="16" class="info">
                  <a href="javascript:;" class="author"
                    >{{ getUsernameById(item.userId) }}
                  </a>
                  <span class="replyDate"></span>
                  <div class="text">{{ item.content }}</div>
                  <a
                    href="javascript:;"
                    class="actions"
                    @click="showTextarea(item.id)"
                    >回复</a
                  >

                  <transition name="fade">
                    <div class="replyArea" v-show="currentIndex === item.id">
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="comment[index].replyValue"
                        :rows="2"
                        resize="none"
                        @blur="closeReply"
                      >
                      </el-input>
                      <div class="btns">
                        <el-button
                          type="info"
                          icon="el-icon-close"
                          size="mini"
                          @click="closeReply"
                        >
                          取消
                        </el-button>
                        <el-button
                          type="success"
                          icon="el-icon-edit"
                          size="mini"
                          @click="addReply(item.id, comment[index].replyValue)"
                          >回复</el-button
                        >
                      </div>
                    </div>
                  </transition>
                </el-col>
              </el-row>
              <div class="comments" :span="20">
                <div class="content">
                  {{ comment.replies }}
                  <!-- <el-row v-for="item in comment.replies" :key="item.id">
                    <el-col :span="1">
                      <el-avatar
                        shape="square"
                        :size="36"
                        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                      ></el-avatar>
                    </el-col>
                    <el-col :span="16" class="info">
                      <a href="javascript:;" class="author"
                        >{{ item.userId }}
                      </a>
                      <span class="replyDate">{{ item.createTime }}</span>
                      <div class="text">{{ item.content }}</div>
                      <a href="javascript:;" class="actions">回复</a>
                    </el-col>
                  </el-row> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="commentArea">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            resize="none"
            v-model="commentValue"
            @focus="isShowBtns = true"
            @blur="isShowBtns = false"
          >
          </el-input>
          <transition name="fade">
            <div class="btns" v-show="isShowBtns">
              <el-button
                type="info"
                icon="el-icon-close"
                size="mini"
                @click="isShowBtns = true"
                >取消</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="addComment"
                >评论</el-button
              >
            </div>
          </transition>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['id', 'uid'],
  data() {
    return {
      user: {},
      post: {},
      comment: [],
      commentValue: '',
      currentIndex: 0,
      isShowBtns: false,
      userId: 0
    }
  },
  methods: {
    // 根据id获取文章评论
    async getCommentById() {
      const { data, status } = await this.$http.post(
        `/reply/api/getCommentsByPostId?postId=${this.id}`
      )
      if (status === 200) {
        data.forEach(async (item) => {
          item.replies = await this.getRelyByCommentId(item.id)
        })
        this.comment = data
      }
    },
    // 显示回复框
    showTextarea(id) {
      this.currentIndex = id
    },
    // 根据id获得用户名称
    getUsernameById(id) {
      return this.getUserById(id) && this.getUserById(id).name
    },
    // 显示评论按钮
    showBtns() {
      this.isShowBtns = true
    },
    // 添加评论
    async addComment() {
      this.commentValue = this.commentValue.trim()
      if (this.commentValue.length) {
        const { data, status } = await this.$http.post(
          '/reply/api/addComment',
          {
            postId: Number(this.id),
            userId: this.$store.state.currentUser.id,
            content: this.commentValue
          }
        )
        if (status === 200) {
          if (data.success) {
            this.getCommentById()
          }
          this.commentValue = ''
        } else {
          this.$message.warning('请求失败')
        }
      }
    },
    // 添加回复
    async addReply(commentId, val) {
      val = val.trim()
      if (val.length) {
        const { data, status } = await this.$http.post('/reply/api/addReply', {
          postId: Number(this.id),
          userId: this.userId,
          commentId: commentId,
          content: val
        })
        if (status === 200) {
          if (data.success) {
            this.getCommentById()
          }
          val = ''
        } else {
          this.$message.warning('请求失败')
        }
      }
    },
    // 取消回复
    closeReply() {
      this.currentIndex = 0
      this.replyValue = ''
    },
    // 获取评论下回复
    async getRelyByCommentId(id) {
      // 3
      const res = await this.$http.get('/reply/getReplysByCommentId', {
        params: {
          commentId: id
        }
      })
      return res.data
    }
  },
  computed: {
    ...mapGetters(['getUserById', 'getCurrentPost'])
  },
  created() {
    this.post = this.getCurrentPost(Number(this.id))
    this.user = this.getUserById(Number(this.uid))
    this.userId = this.$store.state.currentUser.id
    this.getCommentById()
  }
}
</script>

<style lang="less" scoped>
.title {
  i {
    margin-right: 6px;
  }
}
.postDetail {
  .el-main {
    padding: 0 20px;
  }
}

.postdesc {
  font-size: 14px;
  position: relative;
  .content {
    a h4 {
      margin: 0 0 12px 0;
    }
  }
  .icons {
    position: absolute;
    bottom: 0;
    right: 0;
    i {
      font-size: 16px;
      padding: 0 4px;
    }
  }
}

.postContent {
  margin: 40px 0;
  letter-spacing: 0.1em;
}

.replyTitle {
  font-size: 20px;
  i {
    padding-right: 4px;
  }
}

.comment {
  .content {
    font-size: 14px;
    .replyDate {
      color: #aaa;
    }
    .actions {
      color: #e74c3c;
    }
    .el-row {
      margin-bottom: 20px;
    }
  }
  .comments {
    margin-top: 6px;
    margin-left: 40px;
  }
}

.commentArea,
.replyArea {
  width: 600px;
  .btns {
    float: right;
    margin: 10px 10px 0 0;
    bottom: -40px;
  }
}
// 动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
