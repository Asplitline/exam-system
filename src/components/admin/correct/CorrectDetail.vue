<template>
  <div class="correct-detail">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'correct'}">批改</el-breadcrumb-item>
        <el-breadcrumb-item>试卷批改</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="studentList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="studentId" label="学生学号" min-width="150">
        </el-table-column>
        <el-table-column prop="student" label="学生姓名" min-width="150">
          <template v-slot="{row}">
            {{row.student.name}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="交卷时间" min-width="150">
          <template v-slot="{row}">
            {{row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="finishTime" label="批改时间" min-width="150">
          <template v-slot="{row}">
            {{row.finishTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="autoResult" label="客观题分数" min-width="150">
          <template v-slot="{row}">
            {{row.result - row.manulResult}}
          </template>
        </el-table-column>
        <el-table-column prop="manulResult" label="主观题分数" min-width="150">
        </el-table-column>
        <el-table-column prop="result" label="总分" min-width="150">
        </el-table-column>
        <el-table-column label="操作" min-width="150" v-if="xFlag === 1">
          <template v-slot="{row}">
            <el-link :underline="false" type="primary" @click="handleAnswerCard(row)">批改
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-link type="danger" class="c-finish" :underline="false" @click="submitContest()"
        v-if="xFlag === 1">
        完成批改</el-link>
    </el-card>
    <el-dialog title="学生试卷" :visible.sync="correctDialogVisible" width="30%"
      :close-on-click-modal="false">
      <el-form :model="answerForm" ref="answerForm" size="small"
        :close-on-click-modal="false">
        <el-form-item :prop="'answer.'+index+'.value'"
          v-for="(item,index) in answerForm.answer" :key="index"
          :rules="{required: true, message: '请打分', trigger: 'blur'}">
          <div class="answer-item">
            <span>题号</span>
            <p>{{item.id}}</p>
          </div>
          <div class="answer-item">
            <span>考生答案</span>
            <p>{{item.sAnswer}}</p>
          </div>
          <div class="answer-item">
            <span>参考答案</span>
            <p>{{item.answer}}</p>
          </div>
          <div class="answer-item">
            <span>分值</span>
            <p>{{item.score}}</p>
          </div>
          <p>打分</p>
          <el-input v-model.number="item.value" type="number" min="0" :max="item.score">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="correctDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitCorrect('answerForm')" size="small">提 交
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  _getAnswerCardById,
  _getProblemByContestId,
  _finishGrade,
  _finishContest
} from '@api'
import { aMixin } from '@mixins'
import { mapActions, mapGetters } from 'vuex'
import { convertDeepCopy } from '@utils'
export default {
  props: ['id', 'flag'],
  data() {
    return {
      studentList: [],
      correctDialogVisible: false,
      problemList: [],
      answerForm: {
        answer: []
      },
      answerRules: [{ require: true, message: '请打分', trigger: blur }],
      currentCard: {}
    }
  },
  methods: {
    ...mapActions(['fetchAllUser']),
    async fetchAnswerCard() {
      this.query.keyword = this.id
      const { list, total } = await _getAnswerCardById(this.query)
      list.forEach((item) => {
        item.student = this.getUserById(item.studentId)
      })
      this.studentList = list
      this.total = total
    },
    // 处理答题卡
    async handleAnswerCard(data) {
      this.currentCard = convertDeepCopy(data)
      const arr = data.answerJson.split('_~_')
      this.answerForm.answer.forEach((item, index) => {
        item.sAnswer = arr[index]
      })
      this.correctDialogVisible = true
    },
    // 获取答案
    async getAnswer() {
      this.problemList = await _getProblemByContestId({ contestId: this.id })
      this.problemList.forEach((item) => {
        this.answerForm.answer.push({
          answer: item.answer,
          score: item.score,
          id: item.id,
          type: item.questionType
        })
      })
    },
    // 提交修改
    submitCorrect(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        let autoResult = 0
        let manulResult = 0
        this.answerForm.answer.forEach((item) => {
          if (item.type === 0 || item.type === 1 || item.type === 2) {
            autoResult += item.value
          } else if (item.type === 3) {
            manulResult += item.value
          }
        })
        const result = autoResult + manulResult
        Object.assign(this.currentCard, {
          autoResult,
          manulResult,
          result,
          finishTime: Date.now()
        })
        const { success } = await _finishGrade(this.currentCard)
        this.handleSuccess(success, '判卷', this.fetchAnswerCard)
        this.correctDialogVisible = false
      })
    },
    // 完成批改
    submitContest() {
      if (!this.correctState)
        return this.$message.error('还存在未批改的试卷，无法提交')
      this.$confirm('将完成试卷批改，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const { success } = await _finishContest(this.id)
        if (success) {
          this.$message.success('已完成批改，可查看成绩')
          this.$router.go(-1)
        } else {
          this.$message.error('完成批改失败')
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getUserById']),
    correctState() {
      console.log(this.studentList)
      return this.studentList.every((item) => {
        return item.finishTime != null
      })
    },
    xFlag() {
      return Number(this.flag)
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchAnswerCard()
    this.fetchAllUser()
    this.getAnswer()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
@import '~@css/common.less';
/deep/.el-dialog__body {
  padding: 10px 20px;
}

/deep/.el-form-item__content {
  border-top: 2px dashed @color-brown;
  padding: 16px 10px 0;
  & > p {
    margin-top: 0;
    font-size: 18px;
    border-left: 3px solid @color-red;
    padding-left: 20px;
  }
}
/deep/.el-form-item--small {
  .el-form-item__error {
    margin-left: 16px;
  }
  .el-input__inner {
    border: 1px solid @color-main;
    margin-bottom: 10px;
  }
}
.answer-item {
  padding: 6px 0;
  span {
    display: inline-block;
    border-left: 3px solid @color-gray;
    padding-left: 20px;
  }
  p {
    padding: 0px 10px;
    border: 1px solid #dadada;
    background-color: #fafafa;
  }
}
.c-finish {
  position: absolute;
  right: 30px;
  bottom: 12px;
  padding: 6px 10px;
  border: 1px solid #f56c6c;
}
.el-link.el-link--danger:hover {
  background-color: #f56c6c;
  color: #fff;
}
.correct-detail > .el-card {
  position: relative;
  /deep/.el-card__body {
    padding-bottom: 50px;
  }
}
</style>
