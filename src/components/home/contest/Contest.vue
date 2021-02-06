<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>在线测评</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card>
      <el-table :data="contestList" stripe style="width: 100%">
        <el-table-column prop="title" label="考试名称" min-width="180">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" min-width="180">
          <template v-slot="{ row }">
            {{ row.startTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="180">
          <template v-slot="{ row }">
            {{ row.endTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="subjectId" label="考试科目" min-width="180">
          <template v-slot="{ row }">
            {{ miniSubject[row.id] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template v-slot="{ row }">
            <el-button type="primary" @click="goContestDetail(row)"
              >进入考试</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { currentContest } from '../../../plugins/globalvar'
export default {
  data() {
    return {
      contestList: [],
      miniSubject: [],
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      total: 0
    }
  },
  methods: {
    async getContest() {
      const { data, status } = await this.$http.get(
        '/contest/api/pageContest',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { list, total } = data
        this.total = total
        this.contestList = list
      } else {
        this.$message.warning('请求失败')
      }
    },
    goContestDetail(data) {
      currentContest._setCurrentContest(data)
      this.$router.push(`/contest/${data.id}/${data.title}`)
    }
  },
  async created() {
    this.miniSubject = await this.getMiniSubject()
    this.getContest()
  }
}
</script>

<style>
</style>
