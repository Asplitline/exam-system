<template>
  <div class="error-record">
    <el-select v-model="contestId" @change="fetchError()">
      <el-option value="" disabled>请选择考试</el-option>
      <el-option :label="item.title" :value="item.id" v-for="item in getMiniContest()"
        :key="item.id">
      </el-option>
    </el-select>
    <el-table :data="errorList" style="width: 100%">
      <el-table-column prop="title" label="题目标题" min-width="180">
        <template v-slot="{row}">
          {{row.problem.title}}
        </template>
      </el-table-column>
      <el-table-column prop="questionType" label="题目类型" min-width="100">
        <template v-slot="{row}">
          {{problemStatus[row.problem.questionType].content}}
        </template>
      </el-table-column>
      <el-table-column prop="answer" label="我的答案" min-width="100">
        <template v-slot="{row}">
          {{row.answer}}
        </template>
      </el-table-column>
      <el-table-column prop="answer" label="标准答案" min-width="100">
        <template v-slot="{row}">
          {{row.problem.answer}}
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="题目难度" min-width="150">
        <template v-slot="{row}">
          <el-rate v-model="row.problem.difficulty" disabled></el-rate>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{row}">
          <el-link type="primary" :underline="false" @click="goProblemDetail(row)">详情
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { _getWrongProblem } from '@api'
import { problemStatus } from '@static'
export default {
  name: 'error-record',
  data() {
    return {
      errorList: [],
      contestId: '',
      problemStatus
    }
  },
  methods: {
    ...mapActions(['fetchAllContest', 'fetchAllProblem']),
    ...mapMutations(['setCurrentProblem']),
    async fetchError() {
      this.errorList = await _getWrongProblem({
        contestId: this.contestId,
        userId: this.currentUser.id
      })
      this.errorList.forEach((item) => {
        item.problem = this.getProblemById(item.questionId)
      })
    },
    goProblemDetail({ problem }) {
      this.setCurrentProblem(problem)
      this.$router.push(`/problemDetail/${problem.id}`)
    }
  },
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['getMiniContest', 'getProblemById'])
  },
  created() {
    this.fetchAllContest()
    this.fetchAllProblem()
  }
}
</script>

<style>
</style>
