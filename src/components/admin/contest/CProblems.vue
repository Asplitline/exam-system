<template>
  <div>
    <div class="split-line">
      <span><i class="iconfont icon-computer"></i>{{ title }}</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测评管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp">
      <el-button type="success" plain>添加考试</el-button>
      <div>
        <el-tag type="danger"
          ><i class="el-icon-s-opportunity"></i>总分 - {{ totalScore }}</el-tag
        >
        <el-tag><i class="el-icon-info"></i>题数 - {{ totalNum }}</el-tag>
      </div>
    </el-row>
    <!-- 考试列表 -->
    <el-table :data="cProblemList" stripe style="width: 100%" max-height="600">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="title" label="题目" min-width="300">
      </el-table-column>
      <el-table-column prop="questionType" label="题型" min-width="100">
        <template v-slot="{ row }">
          <span v-if="row.questionType === 0">单选题</span>
          <span v-else-if="row.questionType === 1">多选题</span>
          <span v-else-if="row.questionType === 2">问答题</span>
          <span v-else-if="row.questionType === 3">编程题</span>
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="难度" min-width="100">
        <template v-slot="{ row }">
          <el-rate v-model="row.difficulty" disabled> </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分值" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['id', 'title'],
  data() {
    return {
      cProblemList: []
    }
  },
  methods: {
    async getProblemById() {
      const { status, data } = await this.$http.get(
        '/question/api/getQuestionsByContestId/',
        {
          params: { contestId: this.id }
        }
      )
      if (status === 200) {
        this.cProblemList = data
      } else {
        this.$message.warning('请求失败')
      }
    }
  },
  computed: {
    totalScore() {
      let temp = 0
      this.cProblemList.forEach((item) => {
        temp += item.score
      })
      return temp
    },
    totalNum() {
      return this.cProblemList.length
    }
  },
  created() {
    this.getProblemById()
  }
}
</script>
<style lang="less" scoped>
.showInfo {
  background-color: #fff;
}

.mixInp {
  & > div {
    float: right;
    .el-tag {
      display: inline-block;
      height: 40px;
      font-size: 16px;
      margin-right: 20px;
      letter-spacing: 0.2em;
      i {
        margin-right: 4px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
