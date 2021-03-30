<template>
  <div class="problem">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'problem'}">题目</el-breadcrumb-item>
        <el-breadcrumb-item>题目列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchProblem,$event)"
        @t-close="handleClose(fetchProblem)" text="题目" />
      <!-- 题目表单 -->
      <el-table :data="problemList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="id" label="题号" min-width="60"></el-table-column>
        <el-table-column prop="title" label="题目" min-width="300"></el-table-column>
        <el-table-column prop="sujectId" label="课程" min-width="100">
          <template v-slot="{ row }">
            {{row.subjectId}}
          </template>
        </el-table-column>
        <el-table-column prop="questionType" label="题型" min-width="100">
          <template v-slot="{ row }">
            <span v-if="row.questionType === 0">单选题</span>
            <span v-else-if="row.questionType === 1">多选题</span>
            <span v-else-if="row.questionType === 2">问答题</span>
            <span v-else-if="row.questionType === 3">编程题</span>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" min-width="100">
          <template v-slot="{ row }">
            <el-rate v-model="row.difficulty" disabled> </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template v-slot="{ row }">
            <el-link :underline="false" type="primary">修改</el-link>
            <el-link :underline="false" type="danger"
              @click="deleteById(_deleteProblem,fetchProblem,row.id,'题目')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 考试分页 -->
      <el-pagination @size-change="handleSizeChange(fetchProblem,$event)"
        @current-change="handleCurrentChange(fetchProblem,$event)"
        :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加题目 -->
    <el-drawer title="添加题目" :visible.sync="isAddProblemDrawer" direction="rtl"
      ref="addProblemDrawer" class="myDrawer" :wrapperClosable="false"
      @close="closeDrawer('addProblemForm')">
      <div class="demo-drawer__content">
        <el-form :model="addProblemForm" :rules="problemRules" ref="addProblemForm"
          label-width="100px" size="medium" hide-required-asterisk>
          <el-form-item label="题目分类">
            <el-select placeholder="选择题目类型" v-model="addProblemForm.subjectId">
              <el-option v-for="(val, key) in miniSubjects" :key="key" :value="key"
                :label="val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目标题" prop="title">
            <el-input v-model.trim="addProblemForm.title"></el-input>
          </el-form-item>
          <el-form-item label="题目内容" prop="content">
            <el-input type="textarea" v-model.trim="addProblemForm.content" :rows="4">
            </el-input>
          </el-form-item>
          <el-form-item label="题目选项" prop="questionType">
            <el-select placeholder="选择题目类型" v-model="addProblemForm.questionType">
              <el-option label="单选" value="0"></el-option>
              <el-option label="多选" value="1"></el-option>
              <el-option label="问答" value="2"></el-option>
              <el-option label="编程" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- 只能用 v-if -->
          <div v-if="isShowAddSelect">
            <el-form-item label="A选项" prop="optionA">
              <el-input v-model="addProblemForm.optionA"></el-input>
            </el-form-item>
            <el-form-item label="B选项" prop="optionB">
              <el-input v-model="addProblemForm.optionB"></el-input>
            </el-form-item>
            <el-form-item label="C选项" prop="optionC">
              <el-input v-model="addProblemForm.optionC"></el-input>
            </el-form-item>
            <el-form-item label="D选项" prop="optionD">
              <el-input v-model="addProblemForm.optionD"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="题目答案" prop="answer">
            <el-input type="textarea" :rows="4" v-model="addProblemForm.answer">
            </el-input>
          </el-form-item>
          <el-form-item label="题目解析" prop="parse">
            <el-input type="textarea" :rows="4" v-model="addProblemForm.parse"></el-input>
          </el-form-item>
          <el-form-item label="题目难度" prop="difficulty">
            <el-radio-group v-model="addProblemForm.difficulty">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="3"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="5"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题目分值" prop="score">
            <el-input v-model.number="addProblemForm.score" type="number" min="1"
              max="50"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer btns">
          <el-button type="primary" @click="isAddProblemDrawer = false">取消</el-button>
          <el-button type="success" @click="submitAddForm">添加</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 修改题目 -->
    <el-drawer title="修改题目" :visible.sync="isEditProblemDrawer" direction="ltr"
      ref="editProblemDrawer" class="myDrawer" :wrapperClosable="false"
      @close="closeDrawer('editProblemForm')">
      <div class="demo-drawer__content">
        <el-form :model="editProblemForm" :rules="problemRules" ref="editProblemForm"
          label-width="100px" size="medium" hide-required-asterisk>
          <el-form-item label="题目分类">
            <el-select placeholder="选择题目类型" v-model="editProblemForm.subjectId">
              <el-option v-for="(val, key) in miniSubjects" :key="key"
                :value="Number(key)" :label="val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目标题" prop="title">
            <el-input v-model.trim="editProblemForm.title"></el-input>
          </el-form-item>
          <el-form-item label="题目内容" prop="content">
            <el-input type="textarea" v-model.trim="editProblemForm.content" :rows="4">
            </el-input>
          </el-form-item>
          <el-form-item label="题目选项" prop="questionType">
            <el-select placeholder="选择题目类型" v-model="editProblemForm.questionType">
              <el-option label="单选" :value="0"></el-option>
              <el-option label="多选" :value="1"></el-option>
              <el-option label="问答" :value="2"></el-option>
              <el-option label="编程" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- 只能用 v-if -->
          <div v-if="isShowEditSelect">
            <el-form-item label="A选项" prop="optionA">
              <el-input v-model="editProblemForm.optionA"></el-input>
            </el-form-item>
            <el-form-item label="B选项" prop="optionB">
              <el-input v-model="editProblemForm.optionB"></el-input>
            </el-form-item>
            <el-form-item label="C选项" prop="optionC">
              <el-input v-model="editProblemForm.optionC"></el-input>
            </el-form-item>
            <el-form-item label="D选项" prop="optionD">
              <el-input v-model="editProblemForm.optionD"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="题目答案" prop="answer">
            <el-input type="textarea" :rows="4" v-model="editProblemForm.answer">
            </el-input>
          </el-form-item>
          <el-form-item label="题目解析" prop="parse">
            <el-input type="textarea" :rows="4" v-model="editProblemForm.parse">
            </el-input>
          </el-form-item>
          <el-form-item label="题目难度" prop="difficulty">
            <el-radio-group v-model="editProblemForm.difficulty">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="3"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="5"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题目分值" prop="score">
            <el-input v-model.number="editProblemForm.score" type="number" min="1"
              max="50"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer btns">
          <el-button type="primary" @click="isEditProblemDrawer = false">取消</el-button>
          <el-button type="success" @click="submitEditForm">添加</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { _getProblemList, _deleteProblem } from '@api'
import { checkScore } from '@utils'
import { mapActions } from 'vuex'
import { aMixin } from '@mixins'
export default {
  data() {
    return {
      problemList: [],
      isAddProblemDrawer: false,
      addProblemForm: {},
      // 添加表单验证规则
      problemRules: {
        title: [
          { required: true, message: '请输入题目名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
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
      },
      // 获取简化版科目列表
      miniSubjects: {},
      isEditProblemDrawer: false,
      editProblemForm: {}
    }
  },
  methods: {
    _deleteProblem,
    ...mapActions(['fetchAllSubject']),
    // 获取问题列表
    async fetchProblem() {
      const { list, total } = await _getProblemList(this.query)
      this.problemList = list
      this.total = total
    },
    // 显示添加表单
    showAddDrawer() {
      this.isAddProblemDrawer = true
    },
    // 提交添加表单
    submitAddForm() {
      this.$refs.addProblemForm.validate(async (valid) => {
        if (!valid) return
        this.addProblemForm.state = 1
        const { data, status } = await this.$http.post(
          '/question/api/addQuestion',
          this.addProblemForm
        )
        if (status) {
          if (data.success) {
            this.isAddProblemDrawer = false
            this.getProblem()
            this.$message.success('添加成功')
          } else {
            this.$message.error('删除成功')
          }
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    // 修改题目
    editProblemDrawer(data) {
      this.isEditProblemDrawer = true
      this.editProblemForm = this.toConvert(data)
    },
    // 提交修改
    submitEditForm() {
      this.$refs.editProblemForm.validate(async (valid) => {
        if (!valid) return
        console.log(this.editProblemForm)
        const success = await this.$http.post(
          '/question/api/updateQuestion',
          this.editProblemForm
        )
        if (success) {
          this.$message.success('修改成功')
          this.isEditProblemDrawer = false
          this.getProblem()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 关闭后清空表单
    closeDrawer(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mixins: [aMixin],
  computed: {
    isShowAddSelect() {
      return (
        this.addProblemForm.questionType === '0' ||
        this.addProblemForm.questionType === '1'
      )
    },
    isShowEditSelect() {
      return (
        this.editProblemForm.questionType === 0 ||
        this.editProblemForm.questionType === 1
      )
    }
  },
  created() {
    this.fetchProblem()
    this.fetchAllSubject()
  }
}
</script>
<style lang="less" scoped>
@import '~@css/common.less';
// .el-drawer.rtl,
// .el-drawer.ltr {
//   overflow: auto !important;
// }

/* 隐藏侧边滑动控件 */
// .el-drawer__container ::-webkit-scrollbar {
//   display: none;
// }

// .myDrawer {
//   .el-form {
//     padding-right: 10%;
//     .el-form-item {
//       .el-select {
//         width: 100%;
//       }
//     }
//   }
//   .btns {
//     margin-bottom: 16px;
//     text-align: center;
//   }
// }
</style>
