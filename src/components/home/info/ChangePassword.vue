<template>
  <div class="change-password">
    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm"
      label-width="100px" size="small">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="info" @click="resetForm('passwordForm')">重置</el-button>
        <el-button type="success" @click="submitForm('passwordForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { _changePassword } from '@api'
export default {
  name: 'change-password',
  props: {
    id: {
      type: Number
    }
  },
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {},
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        const success = _changePassword({
          id: this.id,
          password: this.passwordForm.confirmPassword
        })
        if (success) {
          this.$message.success('修改密码成功！下次登录生效')
          this.resetForm('passwordForm')
        } else {
          this.$message.error('修改密码失败')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item.btn.el-form-item--small {
  text-align: right;
  margin-right: 20px;
}
</style>
