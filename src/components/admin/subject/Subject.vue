<template>
  <div>
    <div class="split-line">
      <span><i class="icon-book iconfont"></i>科目列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>科目管理</el-breadcrumb-item>
      <el-breadcrumb-item>科目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入课程名称"
          class="input-with-select"
          v-model="query.keyword"
          clearable
          @clear="getSubject()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getSubject()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click="isAddSubjectDiaglog = true"
          >添加科目</el-button
        >
      </el-col>
    </el-row>
    <!-- 考试列表 -->
    <el-table stripe style="width: 100%" max-height="600" :data="subjectList">
      <el-table-column label="#" prop="id" min-width="40"> </el-table-column>
      <el-table-column label="课程名称" prop="name" min-width="100"> </el-table-column>
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
          <el-tag
            effect="plain"
            type="info"
            :class="scope.row.questionNum > 0 ? 'myNum' : ''"
          >
            {{ scope.row.questionNum }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editSubjectDialog(scope.row.id)"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteSubjectDialog(scope.row.id)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog
      :visible.sync="isAddSubjectDiaglog"
      width="20%"
      @close="closeSubjectDialog"
    >
      <el-form
        :model="addSubjectForm"
        ref="addSubjectForm"
        :rules="addSubjectRules"
        :hide-required-asterisk="true"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="addSubjectForm.name"></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddSubjectDiaglog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddSubject()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog :visible.sync="isEditSubjectDiaglog" width="20%" center>
      <el-form
        :model="editSubjectForm"
        ref="editSubjectForm"
        :rules="editSubjectRules"
        :hide-required-asterisk="true"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="editSubjectForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="imgUrl" label-width="0">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            action="http://127.0.0.1:8088/uploadfile"
            name="files"
          >
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
export default {
  data() {
    return {
      subjectList: [],
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 10,
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
    // 获取科目列表
    async getSubject() {
      const { data, status } = await this.$http.get(
        '/subject/api/pageSubjects',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { list, pageSize: size, total } = data
        this.subjectList = list
        this.total = total
        Object.assign(this.query, size)
        window.sessionStorage.setItem('total', total)
      }
    },
    // 选择当前页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getSubject()
    },
    // 选择最大页数
    handleCurrentChange(currentPage) {
      this.query.page = currentPage
      this.getSubject()
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
    // 显示删除对话框
    deleteSubjectDialog(id) {
      console.log(id)
      this.$confirm('此操作将永久删除课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete(
            '/subject/api/deleteSubject/' + id
          )
          if (status === 200) {
            if (data.success) {
              this.$message.success('删除成功')
              this.getSubject()
            } else {
              this.$message.error('删除错误')
            }
          } else {
            this.$message.error('请求错误')
          }
        })
        .catch(() => {
          this.$message.warning('已取消删除')
        })
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
    // 修改科目
    submitEditSubject() {
      this.isEditSubjectDiaglog = false
      this.$refs.editSubjectForm.validate(async (valid) => {
        if (!valid) return false
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
  mounted() {
    this.getSubject()
  }
}
</script>
