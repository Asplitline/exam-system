<template>
  <div class="subject-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }"
        >科目学习</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card>
      <el-table :data="problemList" stripe style="width: 100%">
        <el-table-column type="index" width="60" label="#"> </el-table-column>
        <el-table-column prop="title" label="题目" min-width="300">
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" min-width="100">
          <template v-slot="{ row }">
            <el-rate v-model="row.difficulty" disabled> </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="questionType" label="题型" min-width="100">
          <template v-slot="{ row }">
            <span v-if="row.questionType === 0">单选题</span>
            <span v-else-if="row.questionType === 1">多选题</span>
            <span v-else-if="row.questionType === 2">问答题</span>
            <span v-else-if="row.questionType === 3">编程题</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="goProblemDetail(row.id)"
              plain
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="query.size"
        @current-change="handleCurrent"
        v-if="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['id', 'name'],
  data() {
    return {
      problemList: [],
      query: {
        page: 1,
        size: 10,
        keyword: null,
        subjectId: this.id
      },
      total: 0
    }
  },
  methods: {
    // 获取题目清单
    async getProblemById() {
      const { status, data } = await this.$http('/question/api/pageQuestion', {
        params: this.query
      })
      if (status === 200) {
        const { list, total } = data
        this.problemList = list
        this.total = total
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 当前页
    handleCurrent(currentIndex) {
      this.query.page = currentIndex
      this.getProblemById()
    },
    // 问题详情
    goProblemDetail(id) {
      this.$router.push(`/sProblem/${id}/${this.name}`)
    }
  },
  created() {
    this.getProblemById()
  }
}
</script>
