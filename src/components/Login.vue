<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">登录界面</h1>
      <el-form class="login-form" :model="loginForm" :rules="loginFormRules"
        ref="loginFormRef">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"
            placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password"
            placeholder="密码" type="password"
            @keyup.enter.native="submitForm('loginFormRef')"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="info" @click="resetForm('loginFormRef')">重置</el-button>
          <el-button type="success" @click="submitForm('loginFormRef')">登录</el-button>
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.login-container {
  height: 100%;
  background-image: linear-gradient(120deg, #04fff3, #3b99f0);
}
.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 350px;
  background-color: #fffe;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(17, 39, 59, 0.8);
  border: 1px solid rgba(17, 39, 59, 1);
  .login-title {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    text-shadow: 0 0 10px rgba(200, 200, 200, 0.8);
    letter-spacing: 0.2em;
  }
  .login-form {
    padding: 30px 80px 0;
    // box-sizing: border-box;
    /deep/.el-form-item {
      margin-bottom: 40px;
      .el-input__inner {
        box-shadow: 0 0 3px black;
        // border-color: transparent;
        border-radius: 20px;
        &:focus {
          box-shadow: 0 0 4px 4px rgba(@color-gray, 0.8);
          border-color: @color-gray;
        }
      }
      .el-form-item__error {
        text-indent: 2em;
        margin-top: 6px;
      }
    }
  }
}

.btns {
  text-align: center;
}
</style>
