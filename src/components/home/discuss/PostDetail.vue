<template>
  <div class="post-detail">
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
      <div class="p-content" v-html="post.htmlContent" v-highlight>
      </div>
      <div class="p-comment">
        <div class="p-comment-header">
          <el-input type="text" v-model="comment"></el-input>
          <el-button type="success" @click="addComment()">评论</el-button>
        </div>
        <div class="p-comment-content">
          <ul class="p-comment-list">
            <li class="p-comment-item">
              <img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt="">
              <div>
                <p class="p-comment-author">小王</p>
                <p class="p-comment-content">rust早点出来就没go啥事了 xl x bdocker k8s都会选rust编写</p>
                <p class="p-comment-date">2021-04-03 09:10</p>
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
import { mapState } from 'vuex'
import { bindURL, getUid } from '@utils'
import { _addComment } from '@api'
export default {
  props: ['id'],
  data() {
    return {
      comment: '',
      post: {}
    }
  },
  methods: {
    bindURL,
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
        this.$message.success('评论成功')
      } else {
        this.$message.error('评论失败')
      }
    }
  },
  computed: {
    ...mapState(['currentPost', 'currentUser'])
  },
  created() {
    console.log(this.id)
    this.post = this.currentPost
  }
}

//  "content": "string",
//   "createTime": "2021-04-05T06:35:27.885Z",
//   "id": 0,
//   "postId": 0,
//   "userId": 0
</script>

<style lang="less" scoped>
.p-header {
  padding-bottom: 26px;
  border-bottom: 1px dashed #92cd18;
  h2 {
    font-size: 30px;
    font-weight: normal;
    border-left: 3px solid #92cd18;
    padding-left: 20px;
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
  padding-bottom: 26px;
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
      //   border: 1px solid #000;
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
        font-size: 14px;
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