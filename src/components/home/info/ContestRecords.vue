<template>
  <div class="contest-record">
    <el-table :data="contestList" style="width: 100%">
      <el-table-column prop="title" label="考试名称" min- width="150">
        <template v-slot="{row}">
          {{row.contest.title}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="交卷时间" min-width="150">
        <template v-slot="{row}">
          {{row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="finishTime" label="判卷时间" min-width="150">
        <template v-slot="{row}">
          {{row.finishTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="result" label="考试成绩" min-width="80">
      </el-table-column>
      <!-- <el-table-column label="操作" min-width="50">
        <template v-slot="{row}">
          <el-link type="primary" :underline="false" @click="goPostDetail(row)">错题
          </el-link>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total"
      @current-change="handleCurrentChange(fetchPost,$event)">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
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
    ...mapActions(['fetchAllContest']),
    async fetchContest() {
      this.query.studentId = this.currentUser.id
      const { totalPageNum, grades } = await _getContestRecord(this.query)
      this.contestList = grades
      this.contestList.forEach((item) => {
        item.contest = this.getContestById(item.contestId)
      })
      this.total = totalPageNum
      console.log(this.contestList)
    }
  },
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['getContestById'])
  },
  created() {
    this.fetchContest()
    this.fetchAllContest()
  }
}
</script>

<style>
</style>