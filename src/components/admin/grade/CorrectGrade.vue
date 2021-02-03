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
        <el-tooltip content="修改试卷" placement="top" enterable="false">
          <el-button type="danger" icon="el-icon-edit" circle></el-button>
        </el-tooltip>
        <el-tooltip content="提交成绩" placement="top" enterable="false">
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['id', 'title'],
  data() {
    return {
      students: [],
      users: {},
      query: {
        size: 1000,
        page: 0
      }
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
      console.log(id, this.users[id])
      return this.users[id] || '已注销'
    }
  },
  created() {
    this.getUsers()
    this.getUsersByContestId()
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
