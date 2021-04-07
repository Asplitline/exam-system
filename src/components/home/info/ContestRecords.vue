<template>
  <div class="contest-record">
    <el-table :data="contestList" style="width: 100%">
      <el-table-column prop="title" label="考试名称" min- width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="考试科目" min-width="100">
        <template v-slot="{row}">
          {{row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="考试时间" min-width="100">
        <template v-slot="{row}">
          {{row.updateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="考试成绩" min-width="100">
        <template v-slot="{row}">
          {{row.updateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{row}">
          <el-link type="primary" :underline="false" @click="goPostDetail(row)">错题
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
import { mapState } from 'vuex'
import { _getContestRecord } from '@api'
export default {
  name: 'contest-record',
  data() {
    return {
      query: {
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      contestList: []
    }
  },
  methods: {
    async fetchContest() {
      this.query.studentId = this.currentUser.id
      const { totalPageNum, grades } = await _getContestRecord(this.query)
      this.contestList = grades
      this.total = totalPageNum
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchContest()
  }
}
</script>

<style>
</style>