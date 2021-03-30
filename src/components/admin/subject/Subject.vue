<template>
  <div class="subject">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'subject'}">课程</el-breadcrumb-item>
        <el-breadcrumb-item>课程列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchSubject,$event)"
        @t-close="handleClose(fetchSubject)" text="课程" />
      <!-- 课程列表 -->
      <el-table stripe style="width: 100%" max-height="600" :data="subjectList">
        <el-table-column label="#" prop="id" min-width="40"> </el-table-column>
        <el-table-column label="课程名称" prop="name" min-width="100">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="150">
          <template v-slot:default="{ row }">
            {{ row.createTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" min-width="150">
          <template v-slot:default="{ row }">
            {{ row.updateTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="题目数量" prop="questionNum" min-width="80">
          <template v-slot:default="scope">
            <el-tag effect="plain" type="info"
              :class="scope.row.questionNum > 0 ? 'myNum' : ''">
              {{ scope.row.questionNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-link :underline="false" type="primary">修改</el-link>
            <el-link :underline="false" type="danger"
              @click="deleteById(_deleteSubject,fetchSubject,row.id,'课程')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange(fetchSubject,$event)"
        @current-change="handleCurrentChange(fetchSubject,$event)"
        :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog :visible.sync="isAddSubjectDiaglog" width="20%"
      @close="closeSubjectDialog">
      <el-form :model="addSubjectForm" ref="addSubjectForm" :rules="addSubjectRules"
        :hide-required-asterisk="true">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="addSubjectForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddSubjectDiaglog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddSubject()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog :visible.sync="isEditSubjectDiaglog" width="20%" center>
      <el-form :model="editSubjectForm" ref="editSubjectForm" :rules="editSubjectRules"
        :hide-required-asterisk="true">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="editSubjectForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="imgUrl" label-width="0">
          <el-upload class="avatar-uploader" :show-file-list="false"
            :on-success="handleAvatarSuccess" action="http://127.0.0.1:8088/uploadfile"
            name="files">
            <img :src="bindSrc(editSubjectForm.imgUrl)" class="avatar" />
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditSubjectDiaglog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditSubject()">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import { _deleteSubject, _getSubjectList } from '@api'
export default {
  data() {
    return {
      subjectList: [],
      isAddSubjectDiaglog: false,
      isEditSubjectDiaglog: false,
      addSubjectForm: {},
      addSubjectRules: {
        name: [
          { required: true, message: '请输入科目名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      editSubjectForm: {},
      editSubjectRules: {
        name: [
          { required: true, message: '请输入科目名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    _deleteSubject,
    // 获取科目列表
    async fetchSubject() {
      const { list, total } = await _getSubjectList(this.query)
      this.subjectList = list
      this.total = total
    },
    // 添加科目
    submitAddSubject() {
      this.$refs.addSubjectForm.validate(async (valid) => {
        if (!valid) return false
        const formData = this.addSubjectForm
        const { data, status } = await this.$http.post(
          '/subject/api/addSubject',
          formData
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('添加成功')
            this.isAddSubjectDiaglog = false
          } else {
            this.$message.error('添加失败')
          }
        } else {
          this.$message.error('请求错误')
        }
      })
    },
    // 关闭添加对话框
    closeSubjectDialog() {
      this.isAddSubjectDiaglog = false
      this.$refs.addSubjectForm.resetFields()
    },
    // 显示修改对话框
    async editSubjectDialog(id) {
      this.isEditSubjectDiaglog = true
      const { data, status } = await this.$http.get(
        '/subject/api/getSubjectById/' + id
      )
      if (status === 200) {
        this.editSubjectForm = data
      }
    },
    // 提交修改科目
    submitEditSubject() {
      this.isEditSubjectDiaglog = false
      this.$refs.editSubjectForm.validate(async (valid) => {
        if (!valid) return false
        // const res = await this.$http.get(
        //   '/question/api/getQuestionsBySubjectId',
        //   {
        //     params: { subjectId: this.editSubjectForm.id }
        //   }
        // )
        // this.editSubjectForm.questionNum = res.data
        const { data, status } = await this.$http.post(
          '/subject/api/updateSubject',
          this.editSubjectForm
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.editSubjectForm.imgUrl = file.raw.name
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchSubject()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/common.less';
</style>
