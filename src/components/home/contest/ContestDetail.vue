<template>
  <div class="contest-detail">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iContest' }">考试中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentContest.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-main>
        <el-card>
          <div class="p-main" :class="{'no-display': index !== currentIndex}"
            v-for="(item,index) in problemList" :key="item.id">
            <p class="p-title">
              <span class="p-tag">{{item.questionType | quesType}}</span>
              {{item.title}}
              <span class="p-score">{{item.score | handleScore(1)}} </span>
            </p>
            <div class="p-select" v-if="item.questionType === 0">
              <el-radio v-model="answer[index]" label="A" border>
                {{item.optionA}}
              </el-radio>
              <el-radio v-model="answer[index]" label="B" border>
                {{item.optionB}}
              </el-radio>
              <el-radio v-model="answer[index]" label="C" border>
                {{item.optionC}}
              </el-radio>
              <el-radio v-model="answer[index]" label="D" border>
                {{item.optionD}}
              </el-radio>
            </div>
            <div class="p-mul-select" v-else-if="item.questionType === 1">
              <!-- <el-checkbox v-model="answer[index]" label="A" border>{{item.optionA}}
              </el-checkbox>
              <el-checkbox v-model="answer[index]" label="B" border>{{item.optionB}}
              </el-checkbox>
              <el-checkbox v-model="answer[index]" label="C" border>{{item.optionC}}
              </el-checkbox>
              <el-checkbox v-model="answer[index]" label="D" border>{{item.optionD}}
              </el-checkbox> -->
              <el-checkbox-group v-model="answer[index]">
                <el-checkbox label="A" border>{{item.optionA}}
                </el-checkbox>
                <el-checkbox label="B" border>{{item.optionB}}
                </el-checkbox>
                <el-checkbox label="C" border>{{item.optionC}}
                </el-checkbox>
                <el-checkbox label="D" border>{{item.optionD}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="p-judge" v-else-if="item.questionType === 2">
              <el-radio v-model="answer[index]" label="A" border>
                {{item.optionA}}
              </el-radio>
              <el-radio v-model="answer[index]" label="B" border>
                {{item.optionB}}
              </el-radio>
            </div>
            <template v-else-if="item.questionType === 3">
              <div class="p-question-info ">
                {{item.content}}
              </div>
              <div class="p-question">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}"
                  placeholder="答题区域" v-model="answer[index]" resize="none">
                </el-input>
              </div>
            </template>
          </div>
        </el-card>
      </el-main>
      <el-aside>
        <el-card>
          <p class="c-title">考试信息</p>
          <ul class="c-info">
            <li class="c-info-item">
              <span>开始时间</span>
              <span>{{currentContest.startTime | formatDate}}</span>
            </li>
            <li class="c-info-item">
              <span>结束时间</span>
              <span>{{currentContest.endTime | formatDate}}</span>
            </li>
            <li class="c-info-item">
              <span>考试总分</span>
              <span>{{totalScore | handleScore}}</span>
            </li>
            <li class="c-info-item">
              <span>考试题数</span>
              <span>共{{totalNum}}题</span>
            </li>
          </ul>
        </el-card>
        <el-card>
          <p class="c-title">答题卡</p>
          <ul class="c-card">
            <li class="c-card-item"
              :class="{'c-card-active':answerFlag[index],'c-card-current':currentIndex === index}"
              v-for="(item,index) in problemList" :key="item.id">
              <a href="javascript:;" @click="setCurrentIndex(index)"> {{index+1}}</a>
            </li>
            <li class="c-card-item" v-for="item in blankNum" :key="item"
              style="visibility:hidden">
            </li>
          </ul>
        </el-card>
        <el-card>
          <div class="c-btns">
            <span>倒计时-<i>{{this.countDown}}</i></span>
            <button @click="submitContest()">交卷</button>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { _getProblemByContestId, _addAnswerCard } from '@api'
import { problemStatus } from '@static'
import { mapState } from 'vuex'
import { pad0, getUid } from '@utils'
export default {
  props: ['id'],
  data() {
    return {
      problemList: [],
      problemStatus,
      answer: [],
      currentIndex: 0,
      answerFlag: {},
      timer: null,
      countDown: ''
    }
  },
  methods: {
    // 获取题目
    async fetchProblem() {
      this.problemList = await _getProblemByContestId({ contestId: this.id })
      this.problemList.forEach((item) => {
        if (item.questionType === 1) {
          this.answer.push([])
        } else {
          this.answer.push('')
        }
      })
    },
    // 提交答题卡
    submitContest() {
      if (!this.handleAnswerCard()) {
        this.$message.error('存在未作答题目，请仔细检查')
        return
      }
      this.$confirm('你确定要交卷吗？不再检查一下?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { success } = await _addAnswerCard(this.handleAnswer())
          const loading = this.$loading({
            lock: true,
            text: '提交试卷中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(() => {
            loading.close()
            if (success) {
              this.$message.success('交卷成功')
              this.$router.push({ name: 'iContest' })
            } else {
              this.$message.error('试卷已经提交过了')
            }
          }, 2000)
        })
        .catch(() => {
          this.$message.info('已取消交卷')
        })
    },
    // 设置答题状态
    setCurrentIndex(index) {
      this.currentIndex = index
      this.handleAnswerCard()
    },
    // 校验答题卡
    handleAnswerCard() {
      let cnt = 0
      for (const key in this.answer) {
        const val = this.answer[key]
        if (typeof val !== 'object' || val === null) {
          if (val.trim && val.trim().length !== 0) {
            this.answerFlag[key] = true
            cnt++
          } else {
            this.answerFlag[key] = false
          }
        } else {
          if (val.length !== 0) {
            this.answerFlag[key] = true
            cnt++
          } else {
            this.answerFlag[key] = false
          }
        }
      }
      return cnt === this.totalNum
    },
    // 启动倒计时
    startCountDown() {
      return setInterval(() => {
        const date = (this.currentContest.endTime - Date.now()) / 1000
        if (date === 0 || date < 0) {
          this.endCountDown()
          this.$router.push({ name: 'iContest' })
        }
        const hour = pad0(Math.floor(date / (60 * 60)), 3)
        const min = pad0(Math.floor(date / 60))
        const second = pad0(Math.floor(date % 60))
        this.countDown = `${hour}:${min}:${second}`
      }, 1000)
    },
    // 关闭倒计时
    endCountDown() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    // 整理答案
    handleAnswer() {
      let res = ''
      for (const key in this.answer) {
        res += '_~_' + this.answer[key]
      }
      return {
        id: getUid(),
        answerJson: res.substr(3),
        contestId: this.id,
        studentId: this.currentUser.id,
        createTime: Date.now(),
        state: 0
      }
    }
  },
  watch: {},
  computed: {
    ...mapState(['currentContest', 'currentUser']),
    blankNum() {
      return this.totalNum % 5 === 0 ? 0 : 5 - (this.totalNum % 5)
    },
    totalNum() {
      return this.problemList.length
    },
    totalScore() {
      let score = 0
      this.problemList.forEach((item) => {
        score += item.score
      })
      return score
    }
  },
  created() {
    this.fetchProblem()
  },
  mounted() {
    this.timer = this.startCountDown()
  },
  destroyed() {
    this.endCountDown(this.timer)
  }
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
.el-main {
  padding-top: 0;
  min-height: 600px;
  & > .el-card {
    height: 100%;
  }
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered,
.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
.el-checkbox,
.el-radio {
  width: 100%;
  margin-top: 14px;
}
/deep/ .el-radio.is-bordered,
/deep/ .el-checkbox.is-bordered {
  &:hover {
    background-color: rgba(@color-blue, 0.1);
  }
}
.p-title {
  .p-tag {
    color: @color-main;
    font-weight: 700;
    margin-right: 4px;
    letter-spacing: 0.1em;
  }
  .p-score {
    color: @color-pink;
    letter-spacing: 0.1em;
  }
}

.p-question-info {
  padding: 40px 20px;
  margin-bottom: 20px;
  background-color: #fbfbfb;
  border: 1px solid #eee;
}

.c-title {
  font-size: 20px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 10px;
}
.c-info-item {
  font-size: 14px;
  span {
    display: inline-block;
    white-space: nowrap;
    line-height: 30px;
  }
  span:first-child {
    width: 40%;
    color: #111;
    letter-spacing: 0.2em;
  }
  span:last-child {
    width: 60%;
    color: #888;
    letter-spacing: 1px;
  }
}

.c-card {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .c-card-item {
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin: 6px;
    a {
      border-radius: 50%;
      border: 2px solid #bbb;
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: #999;
      &:hover {
        background-color: #eee;
      }
    }
    &.c-card-active {
      a {
        border-color: @color-main;
        color: @color-main;
      }
    }
    &.c-card-current {
      a {
        background-color: @color-main;
        border-color: @color-main;
        color: #fff;
      }
    }
  }
}

.c-btns {
  text-align: center;
  span {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    color: #888;
    letter-spacing: 0.1em;
    margin-bottom: 10px;
    i {
      letter-spacing: normal;
      color: @color-red;
      font-style: normal;
    }
  }
  button {
    padding: 6px 14px;
    border: 2px solid @color-main;
    background-color: #fff;
    cursor: pointer;
    outline: none;
    color: @color-main;
    font-size: 18px;
    border-radius: 4px;
    transition: transform 0.5s linear, background-color 0.5s linear;
    &:hover {
      transform: scale(1.1);
      background-color: rgba(@color-main);
      color: #fff;
    }
  }
}

.el-aside {
  .el-card {
    margin-bottom: 10px;
  }
}
</style>
