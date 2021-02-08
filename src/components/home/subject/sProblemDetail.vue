<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }"
        >科目学习</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-container class="answerArea">
      <el-main>
        <el-card>
          <el-divider
            ><h1><i class="el-icon-question"></i>题目标题</h1></el-divider
          >
          <p class="title">
            {{ problem.title }}
          </p>
        </el-card>
        <el-card>
          <el-divider
            ><h1><i class="el-icon-info"></i>题目内容</h1></el-divider
          >
          <div
            class="select"
            v-if="problem.questionType === 0 || problem.questionType === 1"
          >
            <p>A、{{ problem.optionA }}</p>
            <p>B、{{ problem.optionB }}</p>
            <p>C、{{ problem.optionC }}</p>
            <p>D、{{ problem.optionD }}</p>
          </div>
          <div v-else>
            <p>{{ problem.content }}</p>
          </div>
        </el-card>
        <el-card>
          <el-divider
            ><h1><i class="el-icon-success"></i>正确答案</h1></el-divider
          >
          <div class="answer">
            <el-collapse>
              <el-collapse-item title="查看正确答案" name="1">
                <div class="correct">
                  <el-divider>正确答案</el-divider><span>D</span>
                </div>
                <div class="parse">
                  <el-divider>答案解析</el-divider>
                  {{ problem.parse }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-main>
      <el-aside width="260px">
        <el-card class="box-card" body-style="padding:10px">
          <dl>
            <dd>
              <span>题目类型</span><span>{{ selectType }}</span>
            </dd>
            <dd><span>上传者:</span><span>admin</span></dd>
            <dd>
              <span>题目难度:</span>
              <span>
                <el-rate
                  disabled
                  text-color="#ff9900"
                  v-model="problem.difficulty"
                >
                </el-rate>
              </span>
            </dd>
            <dd>
              <span>发布时间:</span
              ><span>{{ problem.createTime | formatDate }} </span>
            </dd>
            <dd>
              <span>更新时间</span
              ><span>{{ problem.updateTime | formatDate }} </span>
            </dd>
          </dl>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['id', 'name'],
  data() {
    return {
      value: 5,
      problem: {}
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['getCurrentProblem']),
    selectType() {
      return ['单选题', '多选题', '问答题', '编程题'][this.problem.questionType]
    }
  },
  created() {
    this.problem = this.getCurrentProblem(Number(this.id))
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.answerArea {
  .el-main {
    padding-top: 0;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .el-divider {
    h1 {
      font-size: 20px;
    }
  }
  .title {
    padding: 20px 0;
  }
  .select {
    padding-left: 20px;
  }
  .parse {
    letter-spacing: 0.1em;
    font-size: 18px;
  }
  .correct {
    span {
      font-size: 18px;
      color: red;
    }
  }
  .answer {
    min-height: 400px;
  }
}
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
</style>
