<template>
  <div class="discuss">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iDiscuss' }">交流区</el-breadcrumb-item>
      <el-breadcrumb-item>交流区列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-main class="d-main">
        <ul class="main-list" v-if="postList">
          <li class="main-list-item" v-for="item in postList" :key="item.id">
            <div class="d-title">
              <img :src="bindURL(item.author.avatarImgUrl)" alt="" class="d-avatar">
              <span class="d-author">{{item.author.name}}</span>
              <span class="d-date">发布于<i>{{item.createTime | formatDate}}</i></span>
            </div>
            <div class="d-content">
              <a href="javascript:;" @click="goPostDetail(item)">{{item.title}}</a>
              <p>
                {{item.desc}}
              </p>
            </div>
          </li>
        </ul>
      </el-main>
      <el-aside width="300px">
        <el-card class="aside-card">
          <a href="javascript:;" class="add-post" @click="goAddPost()"><i
              class="iconfont icon-edit"></i>写文章</a>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { _getPostList } from '@api'
import { htmlToText } from '@utils'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { bindURL } from '@utils'
export default {
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      total: 0,
      postList: {}
    }
  },
  methods: {
    bindURL,
    ...mapActions(['fetchAllUser']),
    ...mapMutations(['setCurrentPost']),
    async fetchPost() {
      const { list, total } = await _getPostList(this.query)
      this.postList = list
      this.postList.map((item) => {
        item.desc = htmlToText(item.htmlContent)
        item.author = this.getUserById(item.authorId) || {}
        return item
      })
      this.total = total
    },
    goAddPost() {
      this.$router.push({ name: 'iAddPost' })
    },
    goPostDetail(data) {
      this.setCurrentPost(data)
      this.$router.push(`/discuss/${data.id}`)
    }
  },
  computed: {
    ...mapGetters(['getUserById'])
  },
  created() {
    this.fetchAllUser()
    this.fetchPost()
  }
}
</script> 

<style lang="less" scoped>
@import '~@css/hcommon.less';
@import '~@css/mixins.less';

.discuss {
  // padding: 0 10%;
}

.aside-card {
  padding: 20px;
  .add-post {
    display: inline-block;
    background-color: #fff;
    border: 1px solid #21b351;
    border-radius: 6px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color: #21b351;
    i::before {
      font-size: 18px;
      margin-right: 6px;
    }
    &:hover {
      background-color: #e8f7ed;
    }
  }
}

.d-main {
  padding-top: 0;
}
.main-list {
  padding-top: 0;
  .main-list-item {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    transition: all 0.2s ease-in;
    margin-bottom: 20px;
    .d-title {
      .d-avatar {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
      }
      span[class^='d-'] {
        font-size: 14px;
        margin-left: 6px;
      }
      .d-author {
        color: #4a4a4a;
      }
      .d-date {
        color: #888;
        i {
          font-style: normal;
          margin-left: 4px;
        }
      }
    }
    .d-content {
      font-size: 14px;
      margin: 14px;
      & > a {
        display: inline-block;
        font-size: 18px;
        color: #111;
        border-bottom: 1px solid transparent;
        &:hover {
          border-bottom: 1px solid #d3d3d3;
        }
      }
      & > p {
        color: #222;
        letter-spacing: 1px;
        .text-ellipsis-s(2);
      }
    }
    &:hover {
      box-shadow: 1px 1px 4px 0px rgb(0 0 0 / 30%);
    }
  }
}
</style>