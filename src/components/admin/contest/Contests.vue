<template>
  <div>
    <div class="split-line">
      <span><i class="iconfont icon-computer"></i>测评管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测评管理</el-breadcrumb-item>
      <el-breadcrumb-item>测评列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入考试名称"
          class="input-with-select"
          v-model="query.keyword"
          clearable
          @clear="getContest()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getContest()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="addContestDialog()" plain
          >添加考试</el-button
        >
      </el-col>
    </el-row>
    <!-- 考试列表 -->
    <el-table :data="contestList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="title" label="考试名称" min-width="150">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" min-width="150">
        <template v-slot="{ row }">
          <!-- {{ formatDate(scope.row.startTime) }} -->
          {{ row.startTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" min-width="150">
        <template v-slot="{ row }">
          <!-- {{ formatDate(scope.row.endTime) }} -->
          {{ row.endTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="subjectId" label="考试科目" min-width="120">
        <template v-slot:default="{ row }">
          {{ findSubJectById(row.subjectId) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="当前状态" min-width="100">
        <template v-slot="scope">
          <el-tag
            effect="dark"
            :type="['', '', 'success', 'danger'][scope.row.state]"
            >{{ ['未开始', '未开始', '进行中', '已结束'][scope.row.state] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editContestDialog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteContestDialog(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 考试分页 -->
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
    <!-- 添加考试对话框 -->
    <el-dialog
      :visible.sync="isAddContestDialog"
      width="40%"
      class="add-contest"
      @close="clearContestDialog"
    >
      <el-form
        label-width="80px"
        :model="addContestForm"
        ref="addContestForm"
        :rules="addContestRules"
        :hide-required-asterisk="true"
      >
        <el-form-item label="考试名称" prop="title">
          <el-input v-model="addContestForm.title"></el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subjectId">
          <el-select
            placeholder="请选择考试科目"
            v-model="addContestForm.subjectId"
          >
            <el-option
              v-for="(val, key) in miniSubjects"
              :key="key"
              :label="val"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker
            type="datetimerange"
            align="center"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="addContestForm.date"
            :default-time="['9:00:00', '12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddContestDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddContest()">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改考试对话框 -->
    <el-dialog
      :visible.sync="isEditContestDialog"
      width="40%"
      class="edit-contest"
    >
      <el-form
        label-width="80px"
        :model="editContestForm"
        ref="editContestForm"
        :rules="editContestRules"
        :hide-required-asterisk="true"
      >
        <el-form-item label="考试名称" prop="title">
          <el-input v-model="editContestForm.title"></el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subjectId">
          <el-select
            placeholder="请选择考试科目"
            v-model="editContestForm.subjectId"
          >
            <el-option
              v-for="item in subjects"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker
            type="datetimerange"
            align="center"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="editContestForm.date"
            :default-time="['9:00:00', '12:00:00']"
          >
          </el-date-picker> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditContestDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditContest()">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contestList: [],
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 10,
      isAddContestDialog: false,
      isEditContestDialog: false,
      subjects: {},
      miniSubjects: {},
      addContestForm: {},
      addContestRules: {
        title: [
          { required: true, message: '请输入考试名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        subjectId: [
          { required: true, message: '请选择考试科目', trigger: 'blur' }
        ],
        date: [{ required: true, message: '请选择考试时间', trigger: 'blur' }]
      },
      editContestForm: {},
      editContestRules: {
        title: [
          { required: true, message: '请输入考试名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        subjectId: [
          { required: true, message: '请选择考试科目', trigger: 'blur' }
        ],
        date: [{ required: true, message: '请选择考试时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取考试列表
    async getContest() {
      const { data, status } = await this.$http.get(
        '/contest/api/pageContest',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { total, list, pageSize: size } = data
        this.contestList = list
        this.handleContestState()
        Object.assign(this.query, size)
        this.total = total
      }
    },
    // 最大页数
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getContest()
    },
    // 当前页
    handleCurrentChange(currentPage) {
      this.query.page = currentPage
      this.getContest()
    },
    // 获取课程列表
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
        // const sMap = new Map()
        // data.list.map(({ name, id }) => {
        //   sMap.set(id, name)
        // })
        // this.subjects = sMap
        data.list.map(({ name, id }) => {
          this.miniSubjects[id] = name
        })
        this.subjects = data.list
      } else {
        this.$message.error('请求失败')
      }
    },
    // 显示添加对话框
    addContestDialog() {
      this.isAddContestDialog = true
    },
    // 添加考试
    submitAddContest() {
      this.$refs.addContestForm.validate(async (valid) => {
        if (!valid) return false
        this.addContestForm.startTime = this.addContestForm.date[0]
        this.addContestForm.endTime = this.addContestForm.date[1]
        // BUG>> state默认为0,但是实际值从1开始
        const { data, status } = await this.$http.post(
          '/contest/api/addContest',
          this.addContestForm
        )
        if (status === 200) {
          if (data.success) {
            this.isAddContestDialog = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    // 清空对话框
    clearContestDialog() {
      this.$refs.addContestForm.resetFields()
    },
    // 查找对应的课程
    findSubJectById(id) {
      return this.miniSubjects[id] || '综合测试'
      // return this.subjects.get(id) || '未知课程'
    },
    // 删除考试
    deleteContestDialog(id) {
      this.$confirm('此操作将永久删除考试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete(
            '/contest/api/deleteContest/' + id
          )
          if (status === 200) {
            if (data.success) {
              this.$message.success('删除成功')
              this.getContest()
            } else {
              this.$message.error('删除失败')
            }
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {
          this.$message.warning('已取消删除')
        })
    },
    // 处理考试状态
    handleContestState() {
      this.contestList.forEach((item) => {
        if (item.startTime > Date.now()) item.state = 1
        else if (item.endTime < Date.now()) item.state = 3
        else item.state = 2
      })
    },
    // 显示修改对话框
    editContestDialog(data) {
      this.isEditContestDialog = true
      // 处理数据，进行深拷贝
      this.editContestForm = this.toConvert(data)
      this.editContestForm.date = [data.startTime, data.endTime]
    },
    // 提交修改对话框
    submitEditContest() {
      this.$refs.editContestForm.validate(async (valid) => {
        if (!valid) return false
        const obj = {
          startTime: this.editContestForm.date[0],
          endTime: this.editContestForm.date[1],
          updateTime: Date.now()
        }
        Object.assign(this.editContestForm, obj)
        const { data, status } = await this.$http.put(
          '/contest/api/updateContest',
          this.editContestForm
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('修改成功')
            this.isEditContestDialog = false
            this.getContest()
          } else this.$message.error('修改失败')
        } else {
          this.$message.error('请求失败')
        }
      })
    }
  },
  created() {
    this.getSubject()
  },
  mounted() {
    this.getContest()
  }
}
</script>

<style lang="less" scoped>
.add-contest,
.edit-contest {
  padding: 0 9%;
}
.el-dialog {
  .el-form-item {
    padding: 0 10%;
    .el-select {
      width: 100%;
    }
    .el-date-editor--datetimerange.el-input,
    .el-date-editor--datetimerange.el-input__inner {
      width: 100%;
    }
  }
}
</style>
