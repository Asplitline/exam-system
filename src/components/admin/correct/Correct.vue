<template>
  <div class="correct">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'correct'}">批改</el-breadcrumb-item>
        <el-breadcrumb-item>试卷列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchContest,$event)"
        @t-close="handleClose(fetchContest)" text="帖子" :showAdd="false" />
      <!-- 考试列表 -->
      <el-table :data="contestList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="title" label="考试名称" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" min-width="150">
          <template v-slot="{ row }">
            {{ row.startTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="150">
          <template v-slot="{ row }">
            {{ row.endTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="subjectId" label="考试科目" min-width="120">
          <template v-slot:default="{ row }">
            {{row.subject.name}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="当前状态" min-width="100">
          <template v-slot="{ row }">
            <el-tag effect="dark" type="success" v-if="row.current === 0">{{ '未开始' }}
            </el-tag>
            <el-tag effect="dark" type="warning" v-else-if="row.current === 1">{{ '进行中' }}
            </el-tag>
            <el-tag effect="dark" type="danger" v-else-if="row.current === 2">{{ '已结束' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template v-slot="{ row }">
            <el-link :underline="false" type="primary" @click="goCorrectDetail(row,0)">结果
              <!-- :disabled="row.current === 2" -->
            </el-link>
            <el-link :underline="false" type="danger" @click="goCorrectDetail(row,1)">批改
              <!-- :disabled="row.current === 2" -->
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 考试分页 -->
      <el-pagination @size-change="handleSizeChange(fetchContest,$event)"
        @current-change="handleCurrentChange(fetchContest,$event)"
        :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import { _getContestList } from '@api'
import { mapActions, mapGetters } from 'vuex'
import { handleContestState } from '@utils'
import { SHOW, CORRECT } from '@static'
export default {
  data() {
    return {
      contestList: [],
      miniSubjects: {}
    }
  },
  methods: {
    ...mapActions(['fetchAllSubject']),
    // 获取考试列表
    async fetchContest() {
      const { list, total } = await _getContestList(this.query)
      this.contestList = list
      this.contestList.forEach((item) => {
        item.subject = this.getSubjectById(item.subjectId)
        item.current = handleContestState(item.startTime, item.endTime)
      })
      this.total = total
    },
    // 跳转到成绩列表
    goCorrectDetail(data, flag) {
      switch (flag) {
        case SHOW:
          break
        case CORRECT:
          break
      }
      this.$router.push(`/_correct/${data.id}`)
    }
  },
  computed: {
    ...mapGetters(['getSubjectById'])
  },
  mixins: [aMixin],
  created() {
    this.fetchContest()
    this.fetchAllSubject()
  }
}
</script>
<style lang="less" scoped>
@import '~@css/common.less';
</style>
