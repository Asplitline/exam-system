<template>
  <div>
    <div class="split-line">
      <span><i class="iconfont icon-computer"></i>测评管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测评管理</el-breadcrumb-item>
      <el-breadcrumb-item>测评列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain>添加考试</el-button>
      </el-col>
    </el-row>
    <!-- 考试列表 -->
    <el-table :data="contestList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="title" label="考试名称" min-width="200">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" min-width="200">
        <template v-slot="scope">
          {{ formatDate(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" min-width="200">
        <template v-slot="scope">
          {{ formatDate(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="subjectId" label="考试科目" min-width="100">
      </el-table-column>
      <el-table-column prop="state" label="当前状态" min-width="100">
        <template v-slot="scope">
          <el-tag
            effect="dark"
            :type="['', 'success', 'danger'][scope.row.state - 1]"
            >{{ ['未开始', '进行中', '已结束'][scope.row.state - 1] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contestList: [],
      query: {
        key: '',
        page: 1,
        size: 10
      },
      total: 10
    }
  },
  methods: {
    // 获取考试列表
    async getContest() {
      const { data, status } = await this.$http.get(
        '/contest/api/pageContest',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { total, list, pageNum, pageSize: size } = data
        this.contestList = list
        console.log(list)
        this.query = { size, pageNum }
        this.total = total
      }
    }
  },
  mounted() {
    this.getContest()
  }
}
</script>

<style>
</style>
