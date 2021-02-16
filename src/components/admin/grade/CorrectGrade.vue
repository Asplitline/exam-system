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
        <el-button
          type="danger"
          icon="el-icon-check"
          @click="completeCorrect"
          plain
          >完成批改</el-button
        >
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
          <el-tag type="danger" effect="dark" v-if="row.state === 1"
            >已批改</el-tag
          >
          <el-tag effect="dark" v-else-if="row.state === 2">未批改</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="操作" min-width="150">
        <template v-slot="{ row }">
          <el-tooltip content="修改试卷" placement="top">
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              @click="showAnswerCard(row)"
            ></el-button>
          </el-tooltip>
          <!-- <el-tooltip content="提交成绩" placement="top" :enterable="false">
            <el-button type="success" icon="el-icon-check" circle></el-button>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 批改表单 -->
    <el-dialog :visible.sync="isDialogCorrect" width="40%" @close="clearDialog">
      <el-form :model="answerCard" :rules="correctRules" ref="correctForm">
        <el-form-item
          v-for="(item, index) in answerCard.miniProblem"
          :key="item.id"
          class="correctArea"
          :prop="'miniProblem.' + index + '.value'"
          :rules="[
            { required: true, message: '分数不能为空', trigger: 'blur' }
          ]"
        >
          <div>
            <label for="">题号</label>
            <el-input v-model="item.id" disabled></el-input>
            <label for="">考生答案</label>
            <el-input
              type="textarea"
              v-model="item.sAnswer"
              resize="none"
              :autosize="{ minRows: 2, maxRows: 6 }"
              disabled
            ></el-input>
            <label for="">参考答案</label>
            <el-input
              type="textarea"
              v-model="item.answer"
              resize="none"
              :autosize="{ minRows: 2, maxRows: 6 }"
              disabled
            ></el-input>
            <label for="">分值</label>
            <el-input v-model="item.score" disabled></el-input>
            <label for="">打分</label>
            <el-input v-model="item.value"></el-input>
          </div>
        </el-form-item>
        <h4 class="sumScore">总分：{{ totalScore }}</h4>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogCorrect = false">取 消</el-button>
        <el-button type="primary" @click="submitCorrect">确 定</el-button>
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
      correctRules: {},
      answerCard: {
        miniProblem: []
      },
      currentCard: {}
    }
  },
  methods: {
    // 根据id获取答题卡
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
        this.answerCard.miniProblem = this.cMiniProblem
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
      this.currentCard = data
      this.isDialogCorrect = true
    },
    // 考生答案
    // 提交答题卡
    submitCorrect() {
      this.$refs.correctForm.validate(async (valid) => {
        if (!valid) return
        const { status, data } = await this.$http.post(
          '/grade/api/finishGrade',
          {
            manulResult: this.totalScore,
            contestId: this.id,
            autoResult: this.currentCard.autoResult,
            id: this.currentCard.id
          }
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('批改成功')
            this.isDialogCorrect = false
            this.currentCard = {}
            this.getUsersByContestId()
          } else {
            this.$message.error('批改失败')
          }
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    // 清空对话框
    clearDialog() {
      this.$refs.correctForm.resetFields()
    },
    // 完成批改
    async completeCorrect() {
      this.$confirm('此操作将提交考试成绩, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http(
            '/contest/api/finishContest/' + this.id
          )
          if (status === 200) {
            if (data.success) {
              this.$message.success('完成批改')
              window.history.go(-1)
            }
          } else {
            this.$message.error('批改失败')
          }
        })
        .catch(() => {
          this.$message.warning('已取消提交')
        })
    },
    // 计算总分
    totalResult(id) {
      this.answerCard.miniProblem.forEach((item) => {
        if (item.id === id) console.log(item)
      })
    }
  },
  computed: {
    cMiniProblem() {
      return this.problem.filter((item) => item.questionType > 1)
    },
    totalScore() {
      let sum = 0
      this.answerCard.miniProblem.forEach((item) => {
        sum += Number(item.value) || 0
      })
      return sum
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

.correctArea {
  border: 1px solid #000;
  padding: 30px;
  border-radius: 10px;
}

.sumScore {
  text-align: center;
  font-size: 30px;
}
</style>
