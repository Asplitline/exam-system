<template>
  <div>
    <div class="split-line">
      <span><i class="icon-comment iconfont"></i>评论列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 评论列表 -->
    <el-table :data="commentList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="content" label="内容" min-width="200">
      </el-table-column>
      <el-table-column prop="userId" label="回帖人" min-width="150">
        <template v-slot="{ row }">
          {{ getUserNameById(row.userId) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="回帖时间" min-width="150">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="{ row }">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteCommentById(row.id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      commentList: [],
      query: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  methods: {
    // 获取评论
    async getComment() {
      const { status, data } = await this.$http.get(
        '/comment/api/pageComment',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { comments, totalPageSize } = data
        this.total = totalPageSize
        this.commentList = comments
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 修改最大页
    handleSizeChange(size) {
      this.query.pageSize = size
      this.query.pageNum = 1
      this.getComment()
    },
    // 获取当前页
    handleCurrentChange(currentIndex) {
      this.query.pageNum = currentIndex
      this.getComment()
    },
    // 获取回帖人
    getUserNameById(id) {
      return this.getUserById(id) && this.getUserById(id).name
    },
    async deleteCommentById(id) {
      this.$confirm('此操作将永久删除评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete(
            '/comment/api/deleteComment/' + id
          )
          if (status === 200) {
            if (data.success) {
              this.$message.success('删除成功')
              this.getComment()
            } else {
              this.$message.error('删除失败')
            }
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {
          this.$message.warning('已取消删除')
        })
    }
  },
  created() {
    this.getComment()
  },
  computed: {
    ...mapGetters(['getUserById'])
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
