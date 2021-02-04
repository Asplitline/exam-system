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
        <el-card
          class="answer-area"
          v-for="(item, index) in problemList"
          :key="item.id"
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
            <!-- 单选 -->
            <div class="select" v-if="item.questionType === 0">
              <el-radio v-model="select" label="1" border>{{
                item.optionA
              }}</el-radio>
              <el-radio v-model="select" label="2" border>{{
                item.optionB
              }}</el-radio>
              <el-radio v-model="select" label="3" border>{{
                item.optionC
              }}</el-radio>
              <el-radio v-model="select" label="4" border>{{
                item.optionD
              }}</el-radio>
            </div>
            <!-- 多选 -->
            <div class="select-mut" v-else-if="item.questionType === 1">
              <el-checkbox v-model="selectM" label="1" border>{{
                item.optionA
              }}</el-checkbox>
              <el-checkbox v-model="selectM" label="2" border>{{
                item.optionB
              }}</el-checkbox>
              <el-checkbox v-model="selectM" label="3" border>{{
                item.optionC
              }}</el-checkbox>
              <el-checkbox v-model="selectM" label="4" border>{{
                item.optionD
              }}</el-checkbox>
            </div>
            <!-- 问答 + 代码 -->
            <div class="ques" v-else>
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="ques"
              >
              </el-input>
            </div>
          </div>
        </el-card>
      </el-main>
      <el-aside width="240px">
        <el-card class="box-card" body-style="padding:10px">
          <dl>
            <dd><span>考生学号:</span><span>admin</span></dd>
            <dd><span>当前考生:</span><span>管理员</span></dd>
            <dd><span>剩余时间:</span><span>101:23:47:55</span></dd>
            <dd><span>开始时间:</span><span>2021-01-10 08:35:00</span></dd>
            <dd><span>结束时间:</span><span>2021-04-22 15:50:00</span></dd>
            <dd><span class="last">总分:</span><span>5</span></dd>
          </dl>
        </el-card>
        <el-card class="aside-bottom">
          <div class="select-problem">
            <button
              class="problem-noactive"
              v-for="index in problemNum"
              :key="index"
              :class="{ 'problem-current': index === currentIndex }"
              @click="showProblem(index)"
            >
              {{ index }}
            </button>
            <!-- <button class="problem-noactive">3</button>
            <button class="problem-current">15</button>
            <button class="problem">15</button>  -->
            <!-- button 占位 -->
            <button
              class="problem-fill"
              v-for="index in fillNum"
              :key="index + 'sss'"
            ></button>
          </div>
          <el-button type="success">交卷</el-button>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  props: ['id', 'name'],
  data() {
    return {
      select: [],
      selectM: [],
      ques: '',
      problemList: [],
      currentIndex: 1
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
        this.problemList = data
      } else {
        this.$message.warning('请求失败')
      }
    },
    showProblem(id) {
      this.currentIndex = id
    }
  },
  computed: {
    problemNum() {
      return this.problemList.length
    },
    fillNum() {
      return this.problemNum % 5 === 0 ? 0 : 5 - (this.problemNum % 5)
    }
  },
  created() {
    this.getProblem()
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
    border: 2px solid #2ecc71;
    color: #2ecc71;
    outline: none;
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all linear 0.1s;
  }

  [class^='problem']:hover {
    transform: scale(1.2);
  }
  .problem-noactive {
    color: #ccc;
    border-color: #ccc;
  }
  .problem-current {
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
</style>
