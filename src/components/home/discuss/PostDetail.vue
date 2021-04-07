<template>
  <div class="post-detail">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iDiscuss' }">交流区</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="p-header">
        <h2>{{post.title}}</h2>
        <div class="p-info">
          <img :src="bindURL(post.author.avatarImgUrl)" alt="">
          <div>
            <p class="p-author">{{post.author.name}}</p>
            <p class="p-date">发布于<i>{{post.author.createTime|formatDate}}</i></p>
          </div>
        </div>
      </div>
      <div class="p-content markdown-body" v-html="post.htmlContent" v-highlight>
      </div>
      <div class="p-comment">
        <div class="p-comment-header">
          <el-input type="text" v-model="comment"></el-input>
          <el-button type="success" @click="addComment()">评论</el-button>
        </div>
        <div class="p-comment-content">
          <ul class="p-comment-list">
            <li class="p-comment-item" v-for="item in commentList" :key="item.id">
              <img :src="bindURL(item.user.avatarImgUrl)" alt="">
              <div>
                <p class="p-comment-author">{{item.user.name}}</p>
                <p class="p-comment-content">{{item.content}}</p>
                <p class="p-comment-date">{{item.createTime | formatDate}}</p>
              </div>
              <div class="p-comment-tools">
                <!-- <a href="javascript:;"> <i class="iconfont icon-discuss"></i>回复</a> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { bindURL, getUid, convertURL } from '@utils'
import { _addComment, _getCommentByPostId } from '@api'
export default {
  props: ['id'],
  data() {
    return {
      comment: '',
      post: {},
      commentList: {}
    }
  },
  methods: {
    bindURL,
    async fetchComment() {
      const params = convertURL({ postId: this.id })
      this.commentList = await _getCommentByPostId(params)
      this.commentList.forEach((item) => {
        item.user = this.getUserById(item.userId)
      })
    },
    async addComment() {
      if (this.comment.trim().length === 0) {
        this.$message.warning('评论不能为空')
        return
      }
      const { success } = await _addComment({
        content: this.comment,
        id: getUid(),
        createTime: Date.now(),
        postId: Number(this.id),
        userId: this.currentUser.id
      })
      if (success) {
        this.comment = ''
        this.fetchComment()
        this.$message.success('评论成功')
      } else {
        this.$message.error('评论失败')
      }
    }
  },
  computed: {
    ...mapState(['currentPost', 'currentUser']),
    ...mapGetters(['getUserById'])
  },
  created() {
    this.post = this.currentPost
    this.fetchComment()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
.p-header {
  padding-bottom: 26px;
  border-bottom: 1px dashed #92cd18;
  h2 {
    font-size: 26px;
    font-weight: normal;
    border-left: 3px solid #92cd18;
    padding-left: 20px;
    margin-top: 0;
  }
  .p-info {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border: 1px solid #dee;
    }
    p {
      margin: 0;
      margin-left: 20px;
    }
    .p-author {
      font-size: 16px;
      margin-bottom: 6px;
    }
    .p-date {
      font-size: 12px;
      color: #8a92a9;
      i {
        color: #062743;
        font-style: normal;
      }
    }
  }
}

.p-content {
  padding: 10px;
  border-bottom: 1px dashed #92cd18;
  text-indent: 2em;
  //   line-height: 1;
}

.p-comment {
  padding-top: 26px;
  .p-comment-header {
    display: flex;
    padding-bottom: 26px;

    .el-button {
      margin-left: 4px;
    }
  }
  .p-comment-list {
    max-width: 600px;
    .p-comment-item {
      display: flex;
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      img {
        width: 40px;
        height: 40px;
        margin-right: 8px;
      }
      p {
        margin: 0;
        font-size: 16px;
        color: #111;
        margin-bottom: 4px;
      }
      .p-comment-date {
        color: #888;
        font-size: 13px;
      }
      .p-comment-tools {
        position: absolute;
        right: 0;
        bottom: 0;
        a {
          font-size: 16px;
          color: #888;
          i::before {
            font-size: 16px;
            margin-right: 4px;
          }
          &:hover {
            color: #92cd18;
          }
        }
      }
    }
  }
}
</style>
