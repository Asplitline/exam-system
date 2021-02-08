<template>
  <div>
    <div class="split-line">
      <span><i class="icon-chart iconfont"></i>{{ title }} - 成绩列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/_grade' }"
        >成绩管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <div class="finish-correct">
        <el-button type="danger" icon="el-icon-check" plain>完成批改</el-button>
      </div>
    </el-row>
    <!-- 学生表 -->
    <el-table :data="students" stripe style="width: 100%" max-height="600">
      <el-table-column
        prop="studentId"
        label="学号"
        min-width="150"
      ></el-table-column>
      <el-table-column prop="studentId" label="姓名" min-width="150">
        <template v-slot="{ row }">
          {{ getNameById(row.studentId) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="autoResult"
        label="选择题分数"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="manulResult"
        label="主观题分数"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="result"
        label="总分"
        min-width="150"
      ></el-table-column>
      <el-table-column prop="state" label="试卷状态" min-width="150">
        <template v-slot="{ row }">
          <el-tag type="danger" effect="dark" v-if="row.state === 0"
            >已批改</el-tag
          >
          <el-tag effect="dark" v-else-if="row.state === 1">未批改</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="操作" min-width="150">
        <template v-slot="{ row }">
          <el-tooltip content="修改试卷" placement="top">
            <el-button
              type="danger"
              icon="el-icon-edit"
              circle
              @click="showAnswerCard(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="提交成绩" placement="top" :enterable="false">
            <el-button type="success" icon="el-icon-check" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 批改表单 -->
    <el-dialog title="提示" :visible.sync="isDialogCorrect" width="30%">
      <el-form
        :model="miniProblem"
        :rules="correctRules"
        ref="correctForm"
        label-width="100px"
      >
        <el-form-item label="题号" prop="name">
          <el-input v-model="miniProblem.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="考生答案" prop="name">
          <el-input
            type="textarea"
            v-model="miniProblem.sAnswer"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 6 }"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="参考答案" prop="answer">
          <el-input
            type="textarea"
            v-model="miniProblem.answer"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 6 }"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="分值" prop="score">
          <el-input v-model="miniProblem.score" disabled></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogCorrect = false">取 消</el-button>
        <el-button type="primary" @click="isDialogCorrect = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['id', 'title'],
  data() {
    return {
      isDialogCorrect: false,
      students: [],
      users: {},
      query: {
        size: 1000,
        page: 0
      },
      problem: [],
      correctForm: {},
      correctRules: {}
    }
  },
  methods: {
    async getUsersByContestId() {
      const { data, status } = await this.$http.get(
        '/grade/api/pageGradeByContestId',
        {
          params: {
            keyword: this.id
          }
        }
      )
      if (status === 200) {
        this.students = data.list
      }
    },
    // 获取用户列表
    async getUsers() {
      const { data, status } = await this.$http.post(
        '/account/pageAccount',
        this.query
      )
      if (status === 200) {
        const { list } = data
        list.forEach((item) => {
          this.users[item.id] = item.name
        })
      }
    },
    getNameById(id) {
      return this.users[id] || '已注销'
    },
    // 获取问题
    async getProblemById() {
      const { data, status } = await this.$http.get(
        '/question/api/getQuestionsByContestId/',
        {
          params: {
            contestId: this.id
          }
        }
      )
      if (status === 200) {
        this.problem = data
        console.log(this.miniProblem)
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 显示答题卡
    showAnswerCard(data) {
      const arr = data.answerJson.split('_~_')
      this.problem.forEach((item, index) => {
        if (item.questionType > 1) {
          item.sAnswer = arr[index]
        }
      })
      this.isDialogCorrect = true
    }
    // 考生答案
  },
  computed: {
    miniProblem() {
      return this.problem.filter((item) => item.questionType > 1)
    }
  },
  created() {
    this.getUsers()
    this.getUsersByContestId()
    this.getProblemById()
  }
}
</script>

<style lang="less" scoped>
.finish-correct {
  float: right;
  margin-right: 60px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
