<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>在线测评</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-container>
      <el-main>
        <el-form :model="answerCardForm" ref="answerCardForm" class="cardForm">
          <el-form-item
            v-for="(item, index) in answerCardForm.problemList"
            :key="item.id"
            :prop="'problemList.' + index + '.value'"
            :rules="[{ required: true, message: '', trigger: 'blur' }]"
          >
            <el-card
              class="answer-area"
              :class="index + 1 === currentIndex ? '' : 'hidden-s'"
            >
              <el-divider class="answer-title">
                <i class="el-icon-question">题目描述</i>
              </el-divider>
              <div class="desc">
                <span class="qType" v-if="item.questionType === 0">(单选)</span>
                <span class="qType" v-else-if="item.questionType === 1"
                  >(多选)</span
                >
                <span class="qType" v-else-if="item.questionType === 2"
                  >(问答)</span
                >
                <span class="qType" v-else>(编程)</span>
                <span class="qContent">{{ item.content }}</span>
                <span class="qScore"> ({{ item.score }}分)</span>
              </div>
              <el-divider class="answer-title">
                <i class="el-icon-edit">作答区域</i>
              </el-divider>
              <div class="answer-content">
                <!-- {{ item.value }} -->
                <!-- 单选 -->
                <div class="select" v-if="item.questionType === 0">
                  <el-radio
                    label="A"
                    v-model="item.value"
                    @change="handleVal(index, item.value)"
                    border
                    >{{ item.optionA }}</el-radio
                  >
                  <el-radio
                    label="B"
                    v-model="item.value"
                    @change="handleVal(index, item.value)"
                    border
                    >{{ item.optionB }}</el-radio
                  >
                  <el-radio
                    label="C"
                    v-model="item.value"
                    @change="handleVal(index, item.value)"
                    border
                    >{{ item.optionC }}</el-radio
                  >
                  <el-radio
                    label="D"
                    v-model="item.value"
                    @change="handleVal(index, item.value)"
                    border
                    >{{ item.optionD }}</el-radio
                  >
                </div>
                <!-- 多选 -->
                <div class="select-mut" v-else-if="item.questionType === 1">
                  <el-checkbox-group
                    v-model="item.value"
                    @change="handleVal(index, item.value)"
                  >
                    <el-checkbox label="A" border>{{
                      item.optionA
                    }}</el-checkbox>
                    <el-checkbox label="B" border>{{
                      item.optionB
                    }}</el-checkbox>
                    <el-checkbox label="C" border>{{
                      item.optionC
                    }}</el-checkbox>
                    <el-checkbox label="D" border>{{
                      item.optionD
                    }}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- 问答 + 代码 -->
                <div class="ques" v-else>
                  <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="item.value"
                    @change="handleVal(index, item.value)"
                  >
                  </el-input>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
      </el-main>
      <el-aside width="240px">
        <el-card class="box-card" body-style="padding:10px">
          <dl>
            <dd>
              <span>考生学号:</span><span>{{ cUser.id }}</span>
            </dd>
            <dd>
              <span>当前考生:</span><span>{{ cUser.name }}</span>
            </dd>
            <dd>
              <span>剩余时间:</span
              ><span class="surplus">{{ surplusTime }}</span>
            </dd>
            <dd>
              <span>开始时间:</span
              ><span>{{ cContest.startTime | formatDate }}</span>
            </dd>
            <dd>
              <span>结束时间:</span
              ><span>{{ cContest.endTime | formatDate }}</span>
            </dd>
            <dd>
              <span class="last">总分:</span
              ><span>{{ cContest.totalScore }}</span>
            </dd>
          </dl>
        </el-card>
        <el-card class="aside-bottom">
          <div class="select-problem">
            <button
              class="problem"
              v-for="index in problemNum"
              :key="index"
              :class="{
                'problem-current': index === currentIndex,
                'problem-active': existArray[index]
              }"
              @click="showProblem(index)"
            >
              {{ index }}
            </button>
            <button
              class="problem-fill"
              v-for="index in fillNum"
              :key="index + 'sss'"
            ></button>
          </div>
          <el-button type="success" @click="submitCard">交卷</el-button>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { currentContest, currentUser } from '../../../plugins/globalvar'
export default {
  props: ['id', 'name'],
  data() {
    return {
      ques: '',
      problemList: [],
      currentIndex: 1,
      answerCardForm: {
        problemList: []
      },
      existArray: [],
      cUser: {},
      cContest: {},
      surplusTime: '',
      timer: ''
    }
  },
  methods: {
    async getProblem() {
      const { data, status } = await this.$http.get(
        '/question/api/getQuestionsByContestId',
        {
          params: {
            contestId: this.id
          }
        }
      )
      if (status === 200) {
        // BUG>>
        // 动态循环添加表单项，目前只会指定单个字段，
        // 单选框，文本域默认为string，但是多选框默认为array
        // 目前解决：强制值为array，但是不合理
        // 期待解决：动态循环添加表单项，能够添加多个字段
        data.forEach((item) => {
          this.answerCardForm.problemList.push(
            Object.assign(item, { value: [] })
          )
        })
      } else {
        this.$message.warning('请求失败')
      }
    },
    showProblem(id) {
      this.currentIndex = id
      this.$refs.answerCardForm.clearValidate()
    },
    submitCard() {
      this.$refs.answerCardForm.validate((valid) => {
        if (!valid) return this.$message.error('还有未写题目')
        const answer = []
        this.answerCardForm.problemList.forEach((item) => {
          answer.push(item.value)
        })
        console.log(answer.join('_~_'))
      })
    },
    showActive(index) {
      return this.existArray[index]
    },
    // 题目有无内容判断
    handleVal(index, val) {
      this.existArray[index + 1] = val.length > 0
    },
    handleSurplus() {
      const now = Date.now()
      const end = new Date(this.cContest.endTime).getTime()
      let diff = end > now ? end - now : 0
      if (diff > 0) {
        diff /= 1000
        const d = Math.floor(diff / 60 / 60 / 24)
        const h = Math.floor((diff / 60 / 60) % 24)
        const m = Math.floor((diff / 60) % 60)
        const s = Math.floor(diff % 60)
        this.surplusTime = `${this.pad0(d)} ${this.pad0(h)}:${this.pad0(
          m
        )}:${this.pad0(s)}`
      }
    },
    pad0(val, len = 2) {
      return ('000000000000' + val).substr(-len)
    }
  },
  computed: {
    problemNum() {
      return this.answerCardForm.problemList.length
    },
    fillNum() {
      return this.problemNum % 5 === 0 ? 0 : 5 - (this.problemNum % 5)
    }
  },
  created() {
    this.getProblem()
    this.cUser = currentUser._getCurrentUser()
    this.cContest = currentContest._getCurrentContest()
    console.log(this.cContest)
    console.log(this.cUser)
  },
  mounted() {
    console.log('start')
    this.timer = setInterval(this.handleSurplus, 1000)
  },
  beforeDestroy() {
    console.log('clear')
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.el-main {
  padding: 0 20px;
}
// 题目标题
.answer-title {
  i {
    letter-spacing: 0.2em;
    font-size: 20px;
  }
}

// 题目内容
.desc {
  padding: 20px 0;
  letter-spacing: 0.2em;
  .qType {
    color: red;
  }
}

[class^='select'] {
  padding: 20px 0;
  .el-radio,
  .el-checkbox {
    display: block;
    width: 100%;
    margin: 20px 0;
  }

  .el-radio:hover,
  .el-checkbox:hover {
    border-color: #e74c3c;
  }
  .el-radio.is-bordered + .el-radio.is-bordered,
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
}

.ques {
  padding: 40px 0;
}
// 侧边信息
.box-card {
  span {
    display: inline-block;
    // line-height: 40px;
    font-size: 13px;
  }
  dd {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  dd:last-child {
    border-bottom: none;
  }
  dd > span:first-child {
    min-width: 60px;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
  dd > span:last-child {
    padding-left: 20px;
  }
}

// 自定义按钮样式
.select-problem {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  [class^='problem'] {
    display: inline-block;
    width: 34px;
    height: 28px;
    margin-bottom: 10px;
    border: 2px solid #ccc;
    color: #ccc;
    outline: none;
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all linear 0.1s;
  }

  [class^='problem']:hover {
    transform: scale(1.2);
  }
  .problem.problem-active {
    color: #2ecc71;
    border-color: #2ecc71;
  }
  .problem.problem-current {
    color: #fff;
    background-color: #2ecc71;
    border-color: #2ecc71;
  }
  .problem-fill {
    visibility: hidden;
  }
}

.hidden-s {
  display: none;
}

.cardForm {
  .el-form-item {
    margin-bottom: 0;
  }
}

.surplus {
  color: red;
}
</style>

<style lang="less">
.cardForm .el-form-item__error {
  display: none;
}
</style>
