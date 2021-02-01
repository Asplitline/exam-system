<template>
  <div>
    <div class="split-line">
      <span><i class="icon-planeo iconfont"></i>帖子管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="query.keyword">
          <el-select
            v-model="selectIndex"
            slot="prepend"
            placeholder="请选择"
            class="input-with-select"
          >
            <el-option label="文章名" :value="1"></el-option>
            <el-option label="作者ID" :value="2"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getPost(selectIndex)"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table stripe style="width: 100%" :data="postList">
      <el-table-column prop="title" label="标题" min-width="220">
      </el-table-column>
      <el-table-column prop="authorId" label="发布者"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template v-slot="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="编辑时间">
        <template v-slot="scope">
          {{ formatDate(scope.row.updateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="lastReplyTime" label="最后一次回复时间">
        <template v-slot="scope">
          {{ formatDate(scope.row.lastReplyTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="replyNum" label="回帖数量">
        <template v-slot:default="scope">
          <el-tag
            effect="plain"
            type="info"
            :class="scope.row.replyNum > 0 ? 'myNum' : ''"
          >
            {{ scope.row.replyNum }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletePostDialog(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 0,
      selectIndex: 1
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    // 获取帖子列表
    async getPost(flag = 1) {
      if (flag === 1) {
        this.handleGetPost('/post/api/pagePosts')
      } else {
        this.handleGetPost('/post/api/pagePostByAuthorId')
      }
    },
    // 搜索分类处理
    async handleGetPost(url) {
      const { data, status } = await this.$http.get(url, {
        params: this.query
      })
      if (status === 200) {
        const { list, pageNum: page, total } = data
        Object.assign(this.query, { page })
        this.postList = list
        this.total = total
      } else {
        this.$message.warning('请求失败')
      }
    },
    getAuthorById() {},
    // 选择最大页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getPost()
    },
    // 选择当前页
    handleCurrentChange(currentPage) {
      this.query.page = currentPage
      this.getPost()
    },
    // 删除帖子
    deletePostDialog(id) {
      this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { status, data } = await this.$http.delete(
            '/post/api/deletePost/' + id
          )
          if (status === 200) {
            if (data.success) {
              this.$message.success('删除成功')
              this.getPost(this.selectIndex)
            } else this.$message.error('删除失败')
          } else {
            this.$message.warning('请求错误')
          }
        })
        .catch(() => {
          this.$message.warning('已取消删除')
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<style>
.el-select .el-input {
  width: 110px;
}
</style>
