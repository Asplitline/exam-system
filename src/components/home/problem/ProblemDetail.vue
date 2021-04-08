<template>
  <div class="problem-detail">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iProblem' }">题目练习</el-breadcrumb-item>
      <el-breadcrumb-item>题目详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="p-title"> <span
          class="p-tag">{{'[' + problemStatus[currentProblem.questionType].content+ ']'}}</span>{{currentProblem.title}}
      </div>
      <div class="p-content">
        <div class="p-select"
          v-if="currentProblem.questionType === 0 || currentProblem.questionType===1">
          <p>A、{{currentProblem.optionA}}</p>
          <p>B、{{currentProblem.optionB}}</p>
          <p>C、{{currentProblem.optionC}}</p>
          <p>D、{{currentProblem.optionD}}</p>
        </div>
        <div class="p-judge" v-else-if="currentProblem.questionType === 2">
          <p>A、{{currentProblem.optionA}}</p>
          <p>B、{{currentProblem.optionB}}</p>
        </div>
        <div class="p-question" v-else-if="currentProblem.questionType === 3">
          <p>{{currentProblem.content}}</p>
        </div>
      </div>
      <el-collapse v-model=" activeNames">
        <el-collapse-item title="正确答案" name="1">
          <p>{{currentProblem.answer}}</p>
        </el-collapse-item>
        <el-collapse-item title="答案解析" name="2">
          <p>
            {{currentProblem.parse || '略'}}
          </p>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { problemStatus } from '@static'
export default {
  props: ['id'],
  data() {
    return {
      problemStatus,
      activeNames: ''
    }
  },
  computed: {
    ...mapState(['currentProblem'])
  },
  created() {}
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
/deep/.el-collapse-item__content {
  color: @color-brown;
  font-size: 16px;
  p {
    margin: 0;
  }
}
/deep/.el-collapse-item__header {
  font-size: 15px;
  color: @color-blue;
}

.p-tag {
  color: @color-main;
  font-weight: 700;
  margin-right: 4px;
  letter-spacing: 0.1em;
}
.p-content {
  padding-left: 10px;
}
</style>
