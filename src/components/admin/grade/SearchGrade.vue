<template>
  <div>
    <div class="split-line">
      <span><i class="icon-chart iconfont"></i>{{ title }} - 成绩列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/_grade' }">成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20"> </el-row>
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

<style>
</style>
