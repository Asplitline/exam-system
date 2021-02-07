<template>
  <div class="login_container">
    <div class="login_box">
      <!-- <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div> -->
      <el-form
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            @keyup.enter.native="submitForm('loginFormRef')"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="info" @click="resetForm('loginFormRef')"
            >重置</el-button
          >
          <el-button type="success" @click="submitForm('loginFormRef')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setUserList']),
    ...mapMutations(['initUser', 'initUserList']),
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = this.toUrlParams(this.loginForm)
          const result = await this.$http.post('account/api/login', params)
          const { message, success, data } = result.data
          if (success === false) {
            this.$message.error(message)
          } else {
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', data.id)
            window.sessionStorage.setItem('name', data.username)
            window.sessionStorage.setItem('avatar', data.avatarImgUrl)
            window.sessionStorage.setItem('activeMenu', '/_contest')
            window.sessionStorage.setItem('userInfo', { userInfo: data })
            // 设置用户列表
            this.setUserList(data.id)
            // 设置当前登录用户
            this.initUser(data)
            this.initUserList()
            if (data.level === 2) this.$router.push('/admin')
            else this.$router.push('/home')
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toUrlParams(form) {
      let params = []
      for (const key in form) {
        params.push(key + '=' + form[key])
      }
      params = params.join('&')
      return params
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #1e1e1e;
}

.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
  .avatar_box {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>
