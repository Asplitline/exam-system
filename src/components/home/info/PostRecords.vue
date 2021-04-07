<template>
  <div class="post-record">
    <el-table :data="postList" style="width: 100%">
      <el-table-column prop="title" label="文章名称" min- width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="100">
        <template v-slot="{row}">
          {{row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="100">
        <template v-slot="{row}">
          {{row.updateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{row}">
          <el-link type="primary" :underline="false" @click="goPostDetail(row)">详情
          </el-link>
          <el-link type="danger" :underline="false"
            @click="deleteById(_deletePost,fetchPost,row.id,'文章')">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total"
      @current-change="handleCurrentChange(fetchPost,$event)">
    </el-pagination>
  </div>
</template>

<script>
import { _getPostByAuthorId, _deletePost } from '@api'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { hMixin } from '@mixins'
import { htmlToText } from '@utils'
export default {
  name: 'post-record',
  data() {
    return {
      postList: []
    }
  },
  methods: {
    ...mapMutations(['setCurrentPost']),
    _deletePost,
    async fetchPost() {
      this.query.keyword = this.currentUser.id
      const { list, total } = await _getPostByAuthorId(this.query)
      this.total = total
      this.postList = list
      this.postList.map((item) => {
        item.desc = htmlToText(item.htmlContent)
        item.author = this.getUserById(item.authorId) || {}
        return item
      })
    },
    goPostDetail(data) {
      this.setCurrentPost(data)
      this.$router.push(`/discuss/${data.id}`)
    }
  },
  mixins: [hMixin],
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['getUserById'])
  },
  created() {
    this.fetchPost()
  }
}
</script>

<style lang="less" scoped>
.el-link {
  margin-right: 8px;
}
</style>
