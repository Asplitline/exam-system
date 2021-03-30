<template>
  <div class="discuss">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'discuss'}">交流</el-breadcrumb-item>
        <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchPost,$event)"
        @t-close="handleClose(fetchPost)" text="帖子" />
      <el-table stripe style="width: 100%" :data="PostList">
        <el-table-column prop="title" label="标题" min-width="180">
        </el-table-column>
        <el-table-column prop="authorId" label="发布者"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="{ row }">
            {{ row.createTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间" min-width="120">
          <template v-slot="{ row }">
            {{ row.updateTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="lastReplyTime" label="最后一次回复时间" min-width="120">
          <template v-slot="{ row }">
            {{ row.lastReplyTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="replyNum" label="回帖数量" min-width="80">
          <template v-slot:default="scope">
            <el-tag effect="plain" type="info"
              :class="scope.row.replyNum > 0 ? 'myNum' : ''">
              {{ scope.row.replyNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80">
          <template v-slot="{row}">
            <el-link :underline="false" type="primary">修改</el-link>
            <el-link :underline="false" type="danger"
              @click="deleteById(_deletePost,fetchPost,row.id,'帖子')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchPost,$event)"
        @current-change="handleCurrentChange(fetchPost,$event)" :current-page="query.page"
        :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { _getPostList, _deletePost } from '@api'
import { aMixin } from '@mixins'
export default {
  data() {
    return {
      PostList: [],
      selectIndex: 1
    }
  },
  methods: {
    _deletePost,
    // 获取帖子列表
    async fetchPost() {
      const { list, total } = await _getPostList(this.query)
      this.PostList = list
      this.total = total
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchPost()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/common.less';
</style>
