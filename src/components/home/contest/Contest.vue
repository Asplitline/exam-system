<template>
  <div class="contest">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iContest' }">考试中心</el-breadcrumb-item>
      <el-breadcrumb-item>考试列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="contestList" stripe style="width: 100%" key="contestTable">
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
        <el-table-column label="考试状态" min-width="180">
          <template v-slot="{ row }">
            <el-tag :type="contestStatus[row.state].type"
              :key="contestStatus[row.state].state">
              {{contestStatus[row.state].content}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="subjectId" label="考试科目" min-width="180">
          <template v-slot="{ row }">
            {{ getSubjectById(row.subjectId) &&  getSubjectById(row.subjectId).name}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template v-slot="{ row }">
            <el-button type="info" disabled size="mini" v-if="row.state === 0">未开始
            </el-button>
            <el-button v-else-if="row.state === 1" type="primary"
              @click="goContestDetail(row)" size="mini">进入考试</el-button>
            <el-button type="danger" size="mini" disabled v-else>已结束</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { _getContestList } from '@api'
import { hMixin } from '@mixins'
import { contestStatus } from '@static'
import { handleContestState } from '@utils'
export default {
  data() {
    return {
      contestList: [],
      miniSubject: [],
      contestStatus
    }
  },
  methods: {
    ...mapMutations(['setCurrentContest']),
    ...mapActions(['fetchAllSubject']),
    // 获取考试列表
    async getContest() {
      const { list, total } = await _getContestList(this.query)
      this.contestList = list
      this.contestList.forEach((item) => {
        item.state = handleContestState(item.startTime, item.endTime)
      })
      this.total = total
    },
    // 进入考试
    goContestDetail(data) {
      this.setCurrentContest(data)
      this.$router.push(`/contest/${data.id}`)
    }
  },
  computed: {
    ...mapGetters(['getSubjectById'])
  },
  mixins: [hMixin],
  created() {
    this.fetchAllSubject()
    this.getContest()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
</style>
