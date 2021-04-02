<template>
  <div class="contest">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'contest'}">考试</el-breadcrumb-item>
        <el-breadcrumb-item>考试列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchContest,$event)"
        @t-close="handleClose(fetchContest)" text="考试" />
      <!-- 考试列表 -->
      <el-table :data="contestList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="title" label="考试名称" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" min-width="150">
          <template v-slot="{ row }">
            {{ row.startTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="150">
          <template v-slot="{ row }">
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
            <el-tag effect="dark" :type="['', 'success', 'danger'][scope.row.current]">
              {{ ['未开始', '进行中', '已结束'][scope.row.current] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200">
          <template v-slot="{ row }">
            <el-link :underline="false" type="success">详情</el-link>
            <el-link :underline="false" type="primary">修改</el-link>
            <el-link :underline="false" type="danger"
              @click="deleteById(_deleteContest,fetchContest,row.id,'考试')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 考试分页 -->
      <el-pagination @size-change="handleSizeChange(fetchContest,$event)"
        @current-change="handleCurrentChange(fetchContest,$event)"
        :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加考试对话框 -->
    <el-dialog :visible.sync="isAddContestDialog" width="40%" class="add-contest"
      @close="clearContestDialog">
      <el-form label-width="80px" :model="addContestForm" ref="addContestForm"
        :rules="addContestRules" :hide-required-asterisk="true">
        <el-form-item label="考试名称" prop="title">
          <el-input v-model="addContestForm.title"></el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subjectId">
          <el-select placeholder="请选择考试科目" v-model="addContestForm.subjectId">
            <el-option v-for="(val, key) in miniSubjects" :key="key" :label="val"
              :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker type="datetimerange" align="center" start-placeholder="开始日期"
            end-placeholder="结束日期" v-model="addContestForm.date"
            :default-time="['9:00:00', '12:00:00']">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddContestDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddContest()">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改考试对话框 -->
    <el-dialog :visible.sync="isEditContestDialog" width="40%" class="edit-contest">
      <el-form label-width="80px" :model="editContestForm" ref="editContestForm"
        :rules="editContestRules" :hide-required-asterisk="true">
        <el-form-item label="考试名称" prop="title">
          <el-input v-model="editContestForm.title"></el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subjectId">
          <el-select placeholder="请选择考试科目" v-model="editContestForm.subjectId">
            <el-option v-for="item in subjects" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker type="datetimerange" align="center" start-placeholder="开始日期"
            end-placeholder="结束日期" v-model="editContestForm.date"
            :default-time="['9:00:00', '12:00:00']">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditContestDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditContest()">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import { _getContestList, _deleteContest } from '@api'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      contestList: [],
      contestDialog: false,
      subjects: {},
      miniSubjects: {},
      contestForm: {},
      contestRules: {
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
    _deleteContest,
    ...mapActions(['fetchAllSubject']),
    // 获取考试列表
    async fetchContest() {
      const { list, total } = await _getContestList(this.query)
      this.contestList = list
      this.total = total
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
            this.getContest()
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
    // 处理考试状态
    handleContestState() {
      this.contestList.forEach((item) => {
        if (item.startTime > Date.now()) item.current = 0
        else if (item.endTime < Date.now()) item.current = 2
        else item.current = 1
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
    },
    // 显示试卷题目列表
    showProblemById(id, title) {
      this.$router.push(`/_contest/problems/${id}/${title}`)
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchContest()
    this.fetchAllSubject()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/common.less';
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
