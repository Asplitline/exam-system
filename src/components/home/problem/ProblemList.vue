<template>
  <div class="problem-list">
    <h1>题库预览</h1>
    <ul class="pl-list">
      <li class="pl-item" v-for="item in problemList" :key="item.id">
        <p class="pl-title">
          <span class="pl-tag">[单选题]</span>{{item.title}}
        </p>
        <a href="javascript:;" class="pl-btn">完整试题|答案解析</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { _getProblemList } from '@api'
import { hMixin } from '@mixins'
import { problemStatus } from '@static'
export default {
  props: ['id'],
  data() {
    return {
      problemList: {},
      problemStatus
    }
  },
  methods: {
    async fetchProblemList() {
      this.query.subjectId = this.id
      const { list, total } = await _getProblemList(this.query)
      this.problemList = list
      this.total = total
    }
  },
  mixins: [hMixin],
  created() {
    this.fetchProblemList()
  }
}
</script>

<style lang="less" scoped>
.problem-list {
  h1 {
    padding-left: 24px;
    border-left: 3px solid #92cd18;
    // background-color: #fff;
  }
}
.pl-item {
  background-color: #fff;
  border: 1px solid #eee;
  padding: 10px 24px;
  .pl-tag {
    color: #92cd18;
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
    border: 2px solid #92cd18;
    color: #92cd18;
    letter-spacing: 3px;
    transition: all 0.2s linear;
    &:hover {
      color: #fff;
      background-color: #92cd18;
    }
  }
}
</style>