<template>
  <div class="problem-detail">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ name:'iProblem' }">题目练习</el-breadcrumb-item>
      <el-breadcrumb-item>题目详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-link @click="back()" class="p-back" :underline="false">返回</el-link>
    <el-card>
      <div class="p-title"> <span
          class="p-tag">{{'[' + problemStatus[currentProblem.questionType].content+ ']'}}</span>{{currentProblem.title}}
      </div>
      <div class="p-content">
        <div class="p-select" v-if="currentProblem.questionType === 0 ">
          <el-radio v-model="select" label="A" border>A、{{currentProblem.optionA}}
          </el-radio>
          <el-radio v-model="select" label="B" border>B、{{currentProblem.optionB}}
          </el-radio>
          <el-radio v-model="select" label="C" border>C、{{currentProblem.optionC}}
          </el-radio>
          <el-radio v-model="select" label="D" border>D、{{currentProblem.optionD}}
          </el-radio>
        </div>
        <div class="p-select" v-if="currentProblem.questionType===1">
          <el-checkbox v-model="mulSelect" border label="A">A、{{currentProblem.optionA}}
          </el-checkbox>
          <el-checkbox v-model="mulSelect" border label="B">B、{{currentProblem.optionB}}
          </el-checkbox>
          <el-checkbox v-model="mulSelect" border label="C">C、{{currentProblem.optionC}}
          </el-checkbox>
          <el-checkbox v-model="mulSelect" border label="D">D、{{currentProblem.optionD}}
          </el-checkbox>
        </div>
        <div class="p-judge" v-else-if="currentProblem.questionType === 2">
          <el-radio v-model="judge" border label="A">A、{{currentProblem.optionA}}
          </el-radio>
          <el-radio v-model="judge" border label="B">B、{{currentProblem.optionB}}
          </el-radio>
        </div>
        <div class="p-question" v-else-if="currentProblem.questionType === 3">
          <p>{{currentProblem.content}}</p>
          <el-input type="textarea" v-model="answer" resize="none" placeholder="答题区域"
            :autosize="{minRows:3,maxRows:6}">
          </el-input>
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
      activeNames: '',
      select: '',
      mulSelect: [],
      judge: '',
      answer: ''
    }
  },
  computed: {
    ...mapState(['currentProblem'])
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
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

.el-radio,
.el-checkbox {
  width: 100%;
  margin-top: 20px;
}

.el-radio.is-bordered + .el-radio.is-bordered,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}

.problem-detail {
  position: relative;
}
.p-back {
  position: absolute;
  top: 0;
  right: 0;
  padding: 6px 10px;
  border: 1px solid #666;
  // span {
  //   color: #409eff;
  // }
  &:hover {
    border-color: #409eff;
  }
}
.el-textarea {
  margin: 20px 0;
}
</style>
