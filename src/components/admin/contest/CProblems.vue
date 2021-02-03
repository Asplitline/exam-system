<template>
  <div>
    <div class="split-line">
      <span><i class="iconfont icon-computer"></i>{{ title }}</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测评管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp">
      <el-button type="success" plain @click="isAddProblemDrawer = true"
        >添加考试</el-button
      >
      <div>
        <el-tag type="danger"
          ><i class="el-icon-s-opportunity"></i>总分 - {{ totalScore }}</el-tag
        >
        <el-tag><i class="el-icon-info"></i>题数 - {{ totalNum }}</el-tag>
      </div>
    </el-row>
    <!-- 题目列表 -->
    <el-table :data="cProblemList" stripe style="width: 100%" max-height="600">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="title" label="题目" min-width="300">
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
      <el-table-column prop="score" label="分值" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
    <!-- 添加题目 -->
    <el-drawer
      title="添加题目"
      :visible.sync="isAddProblemDrawer"
      direction="rtl"
      ref="addProblemDrawer"
      class="myDrawer"
      :wrapperClosable="false"
      @close="closeDrawer('addProblemForm')"
    >
      <div class="demo-drawer__content">
        <el-form
          :model="addProblemForm"
          :rules="problemRules"
          ref="addProblemForm"
          label-width="100px"
          size="medium"
          hide-required-asterisk
        >
          <el-form-item label="题目分类">
            <el-select
              placeholder="选择题目类型"
              v-model="addProblemForm.subjectId"
            >
              <el-option
                v-for="(val, key) in miniSubjects"
                :key="key"
                :value="key"
                :label="val"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目标题" prop="title"
            ><el-input v-model.trim="addProblemForm.title"></el-input>
          </el-form-item>
          <el-form-item label="题目内容" prop="content"
            ><el-input
              type="textarea"
              v-model.trim="addProblemForm.content"
              :rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item label="题目选项" prop="questionType">
            <el-select
              placeholder="选择题目类型"
              v-model="addProblemForm.questionType"
            >
              <el-option label="单选" value="0"></el-option>
              <el-option label="多选" value="1"></el-option>
              <el-option label="问答" value="2"></el-option>
              <el-option label="编程" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- 只能用 v-if -->
          <div v-if="isShowAddSelect">
            <el-form-item label="A选项" prop="optionA"
              ><el-input v-model="addProblemForm.optionA"></el-input>
            </el-form-item>
            <el-form-item label="B选项" prop="optionB"
              ><el-input v-model="addProblemForm.optionB"></el-input>
            </el-form-item>
            <el-form-item label="C选项" prop="optionC"
              ><el-input v-model="addProblemForm.optionC"></el-input>
            </el-form-item>
            <el-form-item label="D选项" prop="optionD"
              ><el-input v-model="addProblemForm.optionD"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="题目答案" prop="answer">
            <el-input
              type="textarea"
              :rows="4"
              v-model="addProblemForm.answer"
            ></el-input>
          </el-form-item>
          <el-form-item label="题目解析" prop="parse">
            <el-input
              type="textarea"
              :rows="4"
              v-model="addProblemForm.parse"
            ></el-input
          ></el-form-item>
          <el-form-item label="题目难度" prop="difficulty">
            <el-radio-group v-model="addProblemForm.difficulty">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="3"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="5"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题目分值" prop="score"
            ><el-input
              v-model.number="addProblemForm.score"
              type="number"
              min="1"
              max="50"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer btns">
          <el-button type="primary" @click="isAddProblemDrawer = false"
            >取消</el-button
          >
          <el-button type="success" @click="submitForm('addProblemForm')"
            >添加</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: ['id', 'title'],
  data() {
    var checkScore = function (rule, value, callback) {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数值'))
      } else {
        if (value < 0) {
          callback(new Error('分数不能小于0'))
        } else if (value > 50) {
          callback(new Error('分数不能大于50'))
        } else {
          callback()
        }
      }
    }
    return {
      cProblemList: [],
      addProblemForm: {},
      isAddProblemDrawer: false,
      miniSubjects: {},
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
      }
    }
  },
  methods: {
    // 查询当前考试下题目
    async getProblemById() {
      const { status, data } = await this.$http.get(
        '/question/api/getQuestionsByContestId/',
        {
          params: { contestId: this.id }
        }
      )
      if (status === 200) {
        this.cProblemList = data
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 获取科目列表
    async getSubject() {
      const size = sessionStorage.getItem('total') || 30
      const { data, status } = await this.$http.get(
        '/subject/api/pageSubjects',
        {
          params: {
            size
          }
        }
      )
      if (status === 200) {
        data.list.map(({ name, id }) => {
          this.miniSubjects[id] = name
        })
      } else {
        this.$message.error('请求失败')
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        Object.assign(this.addProblemForm, { contestId: Number(this.id) })
        // console.log(this.addProblemForm)
        const { data, status } = await this.$http.post(
          '/question/api/addQuestion',
          this.addProblemForm
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('添加成功')
            this.isAddProblemDrawer = false
          } else this.$message.error('添加失败')
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    // 清空表单
    closeDrawer() {}
  },
  computed: {
    // 计算总分
    totalScore() {
      let temp = 0
      this.cProblemList.forEach((item) => {
        temp += item.score
      })
      return temp
    },
    // 计算数量
    totalNum() {
      return this.cProblemList.length
    },
    // 选择题
    isShowAddSelect() {
      return (
        this.addProblemForm.questionType === '0' ||
        this.addProblemForm.questionType === '1'
      )
    },
    // 非选择题
    isShowEditSelect() {
      return (
        this.editProblemForm.questionType === 0 ||
        this.editProblemForm.questionType === 1
      )
    }
  },
  created() {
    this.getSubject()
    this.getProblemById()
  }
}
</script>
<style lang="less" scoped>
.showInfo {
  background-color: #fff;
}

.mixInp {
  & > div {
    float: right;
    .el-tag {
      display: inline-block;
      height: 40px;
      font-size: 16px;
      margin-right: 20px;
      letter-spacing: 0.2em;
      i {
        margin-right: 4px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
