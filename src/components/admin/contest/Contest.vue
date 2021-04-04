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
        @t-close="handleClose(fetchContest)" text="考试" @t-btn="showContestDialog(0)" />
      <!-- 考试列表 -->
      <el-table :data=" contestList" stripe style="width: 100%" max-height="600">
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
          <template v-slot="{ row }">
            {{getSubjectById(row.subjectId)&&getSubjectById(row.subjectId).name}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="当前状态" min-width="100">
          <template v-slot="{row}">
            <el-tag :type="contestStatus[row.current].type">
              {{contestStatus[row.current].content}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200">
          <template v-slot="{ row }">
            <el-link :underline="false" type="success" @click="goContestDetail(row)">详情
            </el-link>
            <el-link :underline="false" type="primary" @click="showContestDialog(1,row)">
              修改
            </el-link>
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
    <el-dialog :visible.sync="contestDialogVisible" width="40%"
      @close="clearDialog('contestForm')">
      <el-form label-width="80px" :model="contestForm" ref="contestForm"
        :rules="contestRules" :hide-required-asterisk="true" class="contest-dialog-form"
        size="small">
        <el-form-item label="考试名称" prop="title">
          <el-input v-model="contestForm.title"></el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subjectId">
          <el-select v-model="contestForm.subjectId" placeholder="请选择">
            <el-option v-for="item in getMiniSubject()" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="date">
          <el-date-picker v-model="contestForm.date" type="datetimerange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="contestDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitContest(contestForm.flag,'contestForm')"
          size="small">
          {{contestForm.flag === 0? '添加': '修改'}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import {
  _getContestList,
  _deleteContest,
  _addContest,
  _editContest
} from '@api'
import { mapActions, mapGetters } from 'vuex'
import { ADD, EDIT, contestStatus } from '@static'
import { convertDeepCopy, getCurrentByDate, getUid } from '@utils'
export default {
  data() {
    return {
      contestStatus,
      contestList: [],
      contestDialogVisible: false,
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
      this.contestList = getCurrentByDate(list)
      this.total = total
    },
    // 显示对话框
    showContestDialog(flag, data) {
      this.contestDialogVisible = true
      switch (flag) {
        case ADD:
          this.contestForm.flag = ADD
          break
        case EDIT:
          this.contestForm = convertDeepCopy(data)
          this.contestForm.date = [
            this.contestForm.startTime,
            this.contestForm.endTime
          ]
          this.contestForm.flag = EDIT
          break
      }
    },
    // 提交考试
    submitContest(flag, formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        this[formName].startTime = this[formName].date[0]
        this[formName].endTime = this[formName].date[1]
        if (flag === ADD) {
          this[formName].id = getUid()

          const { success } = await _addContest(this[formName])
          this.handleSuccess(success, '添加考试')
        } else if (flag === EDIT) {
          const { success } = await _editContest(this[formName])
          this.handleSuccess(success, '修改考试')
        }
        this.contestDialogVisible = false
        this.fetchContest()
      })
    },
    // 跳转到考试详情
    goContestDetail({ title, id }) {
      this.$router.push(`/_contest/${title}/${id}`)
    }
  },
  computed: {
    ...mapGetters(['getMiniSubject', 'getSubjectById'])
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
</style>
