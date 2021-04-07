<template>
  <div class="contest-detail">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'contest'}">考试</el-breadcrumb-item>
        <el-breadcrumb-item>考试详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchProblem,$event)"
        @t-close="handleClose(fetchProblem)" text="题目" @t-btn="showProblemDialog(0)" />
      <!-- 考试列表 -->
      <el-table :data="problemList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="title" label="题目标题" min-width="120">
        </el-table-column>
        <el-table-column prop="questionType" label="题目类型" min-width="120">
          <template v-slot="{ row }">
            <span>{{problemStatus[row.questionType].content}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subjectId" label="所属课程" min-width="120">
          <template v-slot="{row}">
            {{getSubjectById(row.subjectId)&&getSubjectById(row.subjectId).name}}
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="题目难度" min-width="120">
          <template v-slot="{row}">
            <el-rate v-model="row.difficulty" disabled>
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="题目分数" min-width="120">
          <template v-slot="{row}">
            <el-tag type="info" effect="dark">{{row.score}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template v-slot="{row}">
            <el-link :underline="false" type="primary" @click="showProblemDialog(1,row)">
              修改
            </el-link>
            <el-link :underline="false" type="danger"
              @click="deleteById(_deleteProblem,fetchProblem,row.id,'题目')">删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 题目对话框 -->
    <el-dialog :title="problemForm.flag===0?'添加题目':'修改题目'"
      :visible.sync="problemDialogVisible" width="40%"
      @close="clearDialog('problemForm')">
      <el-form :model="problemForm" :rules="problemRules" ref="problemForm"
        label-width="100px" size="small" class="problem-dialog-form">
        <el-form-item label="题目" prop="title">
          <el-input v-model="problemForm.title" placeholder="输入题目标题">
          </el-input>
        </el-form-item>
        <el-form-item label="课程" prop="subjectId">
          <el-select placeholder="选择题目类型" v-model="problemForm.subjectId">
            <el-option v-for="item in getMiniSubject()" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="questionType">
          <el-radio-group v-model="problemForm.questionType" size="mini">
            <el-radio :label="item.questionType" v-for="item in problemStatus"
              :key="item.questionType" border>{{item.content}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template
          v-if="problemForm.questionType===0 || problemForm.questionType===1 || problemForm.questionType === 2">
          <el-form-item label="选项A" prop="optionA">
            <el-input v-model="problemForm.optionA">
            </el-input>
          </el-form-item>
          <el-form-item label="选项B" prop="optionB">
            <el-input v-model="problemForm.optionB">
            </el-input>
          </el-form-item>
          <template v-if="problemForm.questionType!==2">
            <el-form-item label="选项C" prop="optionC">
              <el-input v-model="problemForm.optionC">
              </el-input>
            </el-form-item>
            <el-form-item label="选项D" prop="optionD">
              <el-input v-model="problemForm.optionD">
              </el-input>
            </el-form-item>
          </template>

        </template>
        <template v-else>
          <el-form-item label="详情" prop="content">
            <el-input type="textarea" :rows="2" placeholder="请输入题目详情"
              :autosize="{ minRows: 2, maxRows: 4 }" v-model="problemForm.content"
              resize="none">
            </el-input>
          </el-form-item>
        </template>
        <el-form-item label="难度" prop="difficulty">
          <el-rate v-model="problemForm.difficulty"></el-rate>
        </el-form-item>
        <el-form-item label="分值" prop="score">
          <el-input v-model="problemForm.score" type="number" placeholder="选择题目分值">
          </el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input type="textarea" :rows="2" placeholder="请输入答案"
            :autosize="{ minRows: 2, maxRows: 4 }" v-model="problemForm.answer"
            resize="none">
          </el-input>
        </el-form-item>
        <el-form-item label="解析" prop="parse">
          <el-input type="textarea" :rows="2" placeholder="请输入解析"
            :autosize="{ minRows: 2, maxRows: 4 }" v-model="problemForm.parse"
            resize="none">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="problemDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitProblem(problemForm.flag,'problemForm')"
          size="small">
          {{problemForm.flag === 0? '添加': '修改'}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import { problemStatus, ADD, EDIT } from '@static'
import { mapGetters, mapActions } from 'vuex'
import { checkScore, getUid, convertDeepCopy } from '@utils'
import {
  _addProblem,
  _getProblemByContestId,
  _editProblem,
  _deleteProblem
} from '@api'
export default {
  props: ['id', 'title'],
  data() {
    return {
      problemList: [],
      problemStatus,
      problemForm: {},
      problemDialogVisible: false,
      problemRules: {
        title: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        subjectId: [
          { required: true, message: '请选择课程名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入题目内容', trigger: 'blur' }
        ],
        questionType: [
          { required: true, message: '请选择题目类型', trigger: 'blur' }
        ],
        optionA: [
          { required: true, message: '选项A不能为空', trigger: 'blur' }
        ],
        optionB: [
          { required: true, message: '选项B不能为空', trigger: 'blur' }
        ],
        optionC: [
          { required: true, message: '选项C不能为空', trigger: 'blur' }
        ],
        optionD: [
          { required: true, message: '选项D不能为空', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '题目答案不能为空', trigger: 'blur' }
        ],
        difficulty: [
          { required: true, message: '请为题目选择难度', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '分值不能为空', trigger: 'blur' },
          { validator: checkScore, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    _deleteProblem,
    ...mapActions(['fetchAllSubject']),
    async fetchProblem() {
      const list = await _getProblemByContestId({ contestId: this.id })
      this.problemList = list
    },
    showProblemDialog(flag, data) {
      this.problemDialogVisible = true
      switch (flag) {
        case ADD:
          this.problemForm.flag = ADD
          break
        case EDIT:
          this.problemForm = convertDeepCopy(data)
          this.problemForm.flag = EDIT
          break
      }
    },
    submitProblem(flag, formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        if (flag === ADD) {
          this[formName].id = getUid()
          this[formName].state = 1
          this[formName].contestId = this.id
          const { success } = await _addProblem(this[formName])
          this.handleSuccess(success, '添加题目')
        } else if (flag === EDIT) {
          const { success } = await _editProblem(this[formName])
          this.handleSuccess(success, '修改题目')
        }
        this.problemDialogVisible = false
        this.fetchProblem()
      })
    }
  },
  computed: {
    ...mapGetters(['getMiniSubject', 'getSubjectById'])
  },
  mixins: [aMixin],
  created() {
    this.fetchAllSubject()
    this.fetchProblem()
  }
}
</script>
<style lang="less" scoped>
@import '~@css/common.less';
</style>
