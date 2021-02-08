<template>
  <div>
    <div class="split-line">
      <span><i class="icon-chart iconfont"></i>成绩列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入考试名称"
          class="input-with-select"
          v-model="query.keyword"
          clearable
          @clear="getContest()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getContest()"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 考试列表 -->
    <el-table :data="contestList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="title" label="考试名称" min-width="150">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" min-width="150">
        <template v-slot="{ row }">
          <!-- {{ formatDate(scope.row.startTime) }} -->
          {{ row.startTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" min-width="150">
        <template v-slot="{ row }">
          <!-- {{ formatDate(scope.row.endTime) }} -->
          {{ row.endTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="subjectId" label="考试科目" min-width="120">
        <template v-slot:default="{ row }">
          {{ findSubJectById(row.subjectId) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="当前状态" min-width="100">
        <template v-slot="{ row }">
          <el-tag effect="dark" type="success" v-if="row.state === 1"
            >{{ '未开始' }}
          </el-tag>
          <el-tag effect="dark" type="warning" v-else-if="row.state === 2"
            >{{ '批改中' }}
          </el-tag>
          <el-tag effect="dark" type="danger" v-else-if="row.state === 3"
            >{{ '已结束' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template v-slot="{ row }">
          <el-button
            :disabled="row.state !== 3"
            type="success"
            icon="el-icon-search"
            circle
            @click="goShowGrade(row.id, row.title)"
          ></el-button>
          <el-button
            :disabled="row.state === 3"
            type="primary"
            circle
            @click="goCorrectGrade(row.id, row.title)"
            ><i class="el-icon-edit"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 考试分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contestList: [],
      miniSubjects: {},
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 10
    }
  },
  methods: {
    // 查找对应的课程
    findSubJectById(id) {
      return this.miniSubjects[id] || '综合测试'
    },
    // 获取课程列表
    async getSubject() {
      const size = sessionStorage.getItem('total') || 30
      const { data, status } = await this.$http.get(
        '/subject/api/pageSubjects',
        {
          params: {
            size
          }
        }
      )
      if (status === 200) {
        data.list.map(({ name, id }) => {
          this.miniSubjects[id] = name
        })
      } else {
        this.$message.error('请求失败')
      }
    },
    // 获取考试列表
    async getContest() {
      const { data, status } = await this.$http.get(
        '/contest/api/pageContest',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { total, list, pageSize: size } = data
        this.contestList = list
        Object.assign(this.query, size)
        this.total = total
      }
    },
    // 最大页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getContest()
    },
    // 当前页
    handleCurrentChange(currentPage) {
      this.query.page = currentPage
      this.getContest()
    },
    goShowGrade(id, title) {
      this.$router.push(`/_grade/show/${id}/${title}`)
    },
    goCorrectGrade(id, title) {
      this.$router.push(`/_grade/correct/${id}/${title}`)
    }
  },
  created() {
    this.getSubject()
    this.getContest()
  }
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>
