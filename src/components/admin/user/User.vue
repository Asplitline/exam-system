<template>
  <div class="user">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'user'}">用户</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索模块 -->
      <topSearch :data="query.keyword" @t-enter="handleEnter(fetchUser,$event)"
        @t-close="handleClose(fetchUser)" text="用户" @t-btn="showUserDialog(0)" />
      <!-- 用户表单 -->
      <el-table :data="userList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="avatarImgUrl" label="头像">
          <template v-slot="{row}">
            <el-avatar shape="square" :size="40" :src="bindURL(row.avatarImgUrl)">
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" min-width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100">
        </el-table-column>
        <el-table-column prop="qq" label="QQ" min-width="120"> </el-table-column>
        <el-table-column prop="phone" label="手机" min-width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="160">
        </el-table-column>
        <el-table-column prop="level" label="身份" min-width="80">
          <template v-slot="{row}">
            <el-tag :type="levels[row.level].type" v-if="levels">
              {{levels[row.level].value}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template v-slot="{row}">
            <el-link :underline="false" type="primary" @click="showUserDialog(1,row)">修改
            </el-link>
            <el-link :underline="false" type="danger"
              @click="deleteById(_deleteUser,fetchUser,row.id,'用户')">删除</el-link>
            <el-link :underline="false" type="info" @click="resetPassword(row.id)">重置
            </el-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange(fetchUser,$event)"
        @current-change="handleCurrentChange(fetchUser,$event)" :current-page="query.page"
        :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </el-card>
    <!-- 用户对话框 -->
    <el-dialog :title="userForm.flag===0?'添加用户':'修改用户'" :visible.sync="userDialogVisible"
      width="30%" @close="clearDialog('userForm')">
      <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px"
        size="small" class="user-dialog-form">
        <el-form-item prop="avatarImgUrl" label="头像" v-if="userForm.flag === 1">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')" name="files"
            :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="userForm.avatarImgUrl" :src="bindURL(userForm.avatarImgUrl)"
              class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="userForm.username" :disabled="userForm.flag === 1">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="userForm.flag === 0">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="userForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="level">
          <el-radio v-for="level in levels" :label="level.id" v-model="userForm.level">
            {{level.value}}
          </el-radio>
        </el-form-item>
        <el-form-item label="个人描述" prop="description">
          <el-input type="textarea" autosize placeholder="请输入内容"
            v-model="userForm.description" :autosize="{minRows:2,maxRows:4}"
            resize="none">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitUser(userForm.flag,'userForm')"
          size="small">{{userForm.flag === 0? '添加': '修改'}}
        </el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { aMixin } from '@mixins'
import {
  _getUserList,
  _deleteUser,
  _changePassword,
  _addUser,
  _editUser
} from '@api'
import {
  checkEmail,
  checkPhone,
  bindURL,
  convertDeepCopy,
  convertURL,
  getUid
} from '@utils'
import { ADD, EDIT, DEFAULT_PWD, levels } from '@static'
export default {
  data() {
    return {
      userList: [],
      levels,
      userForm: {},
      userRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        qq: [{ required: true, message: '请填入qq号', trigger: 'blur' }],
        phone: [
          { required: true, message: '请填入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填入电子邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        level: [{ required: true, message: '请选择用户身份', trigger: 'blur' }],
        avatarImgUrl: [
          { required: true, message: '请选择头像', trigger: 'blur' }
        ]
      },
      userDialogVisible: false
    }
  },
  methods: {
    bindURL,
    _deleteUser,
    // 获取用户列表
    async fetchUser() {
      const { list, total } = await _getUserList(this.query)
      this.userList = list
      this.total = total
    },
    // 显示对话框
    showUserDialog(flag, data) {
      this.userDialogVisible = true
      switch (flag) {
        case ADD:
          this.userForm.flag = ADD
          break
        case EDIT:
          this.userForm = convertDeepCopy(data)
          this.userForm.flag = EDIT
          break
      }
    },
    submitUser(flag, formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        if (flag === ADD) {
          this[formName].id = getUid()
          this[formName].state = 0
          const { success } = await _addUser(this[formName])
          this.handleSuccess(success, '添加用户')
        } else if (flag === EDIT) {
          const { success } = await _editUser(this[formName])
          this.handleSuccess(success, '修改用户')
        }
        this.userDialogVisible = false
        this.fetchUser()
      })
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.$set(this.userForm, 'avatarImgUrl', res)
    },
    // 重置密码
    async resetPassword(id) {
      const success = await _changePassword(
        '?' + convertURL({ id, password: DEFAULT_PWD })
      )
      if (success) {
        this.$message.success('重置密码:123456')
      } else {
        this.$message.error('重置失败')
      }
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchUser()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
@import '~@css/common.less';
</style>
