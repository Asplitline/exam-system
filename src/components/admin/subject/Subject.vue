<template>
  <div class="subject">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'subject'}">课程</el-breadcrumb-item>
        <el-breadcrumb-item>课程列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <top-search :data="query.keyword" @t-enter="handleEnter(fetchSubject,$event)"
        @t-close="handleClose(fetchSubject)" @t-btn="showSubjectDialog(0)" text="课程" />
      <!-- 课程列表 -->
      <el-table stripe style="width: 100%" max-height="600" :data="subjectList">
        <el-table-column label="课程名称" prop="name" min-width="150">
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
          <template v-slot:default="{row}">
            <el-tag type="info" effect="dark">
              {{ row.questionNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <!-- <el-link :underline="false" type="success">详情</el-link> -->
            <el-link :underline="false" type="primary" @click="showSubjectDialog(1,row)">
              修改
            </el-link>
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
    <el-dialog :title="subjectForm.flag===0?'添加课程':'修改课程'"
      :visible.sync="subjectDialogVisible" width="30%"
      @close="clearDialog('subjectForm')">
      <el-form :model="subjectForm" ref="subjectForm" :rules="subjectRules"
        class="subject-dialog-form" :hide-required-asterisk="true" label-width="100px"
        size="small">
        <el-form-item label="课程封面" prop="imgUrl" v-if="subjectForm.flag === 1">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')" name="files"
            :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="subjectForm.imgUrl" :src="bindURL(subjectForm.imgUrl)"
              class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="subjectDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary"
          @click="submitSubject(subjectForm.flag,'subjectForm')">
          {{subjectForm.flag === 0? '添加': '修改'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import {
  _deleteSubject,
  _getSubjectList,
  _addSubject,
  _editSubject
} from '@api'
import { bindURL, convertDeepCopy, getUid } from '@utils'
import { ADD, EDIT } from '@static'

export default {
  data() {
    return {
      subjectList: [],
      subjectDialogVisible: false,
      subjectForm: {},
      subjectRules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    _deleteSubject,
    bindURL,
    // 获取课程列表
    async fetchSubject() {
      const { list, total } = await _getSubjectList(this.query)
      this.subjectList = list
      this.total = total
    },
    // 显示课程对话框
    showSubjectDialog(flag, data) {
      this.subjectDialogVisible = true
      switch (flag) {
        case ADD:
          this.subjectForm.flag = ADD
          break
        case EDIT:
          this.subjectForm = convertDeepCopy(data)
          this.subjectForm.flag = EDIT
          break
      }
    },
    submitSubject(flag, formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        if (flag === ADD) {
          this[formName].id = getUid()
          const { success } = await _addSubject(this[formName])
          this.handleSuccess(success, '添加课程')
        } else if (flag === EDIT) {
          const { success } = await _editSubject(this[formName])
          this.handleSuccess(success, '修改课程')
        }
        this.subjectDialogVisible = false
        this.fetchSubject()
      })
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.$set(this.subjectForm, 'imgUrl', res)
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

div.subject /deep/.avatar-uploader {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 187px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 130px;
    height: 187px;
    display: block;
  }
}
</style>
