<template>
  <div class="problem-list">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iProblem' }">题目练习</el-breadcrumb-item>
      <el-breadcrumb-item>题目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="problemList.length===0" class="not-found"><i
        class="iconfont icon-40401">暂无题目</i></div>
    <el-card v-else>
      <ul class="pl-list">
        <li class="pl-item" v-for="item in problemList" :key="item.id">
          <p class="pl-title">
            <span
              class="pl-tag">{{'[' + problemStatus[item.questionType].content+ ']'}}</span>{{item.title}}
          </p>
          <a href="javascript:;" class="pl-btn"
            @click="goProblemDetail(item)">完整试题|答案解析</a>
        </li>
      </ul>
    </el-card>
  </div>

</template>

<script>
import { _getProblemList } from '@api'
import { hMixin } from '@mixins'
import { problemStatus } from '@static'
import { mapMutations } from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      problemList: {},
      problemStatus
    }
  },
  methods: {
    ...mapMutations(['setCurrentProblem']),
    async fetchProblemList() {
      this.query.subjectId = this.id
      const { list, total } = await _getProblemList(this.query)
      this.problemList = list
      this.total = total
    },
    goProblemDetail(data) {
      this.setCurrentProblem(data)
      this.$router.push(`/problemDetail/${data.id}`)
    }
  },
  computed: {},
  mixins: [hMixin],
  created() {
    this.fetchProblemList()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
.problem-list {
  /deep/.el-card__body {
    padding: 0 20px;
  }
}
.pl-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 24px;
  .pl-tag {
    color: @color-main;
    font-weight: 700;
    margin-right: 4px;
    letter-spacing: 0.1em;
  }
  .pl-title {
    letter-spacing: 0.1em;
    color: #333;
  }
  .pl-btn {
    display: inline-block;
    padding: 6px 10px;
    border: 2px solid @color-main;
    color: @color-main;
    letter-spacing: 3px;
    transition: all 0.2s linear;
    margin-bottom: 16px;
    &:hover {
      color: #fff;
      background-color: @color-main;
    }
  }
}
</style>
