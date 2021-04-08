<template>
  <div class="user-info">
    <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px"
      size="small">
      <el-form-item prop="avatarImgUrl" label="头像">
        <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')" name="files"
          :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="userForm.avatarImgUrl" :src="bindURL(userForm.avatarImgUrl)"
            class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userForm.name"></el-input>
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
      <el-form-item label="个人简介" prop="description">
        <el-input type="textarea" placeholder="请输入内容"
          v-model="userForm.description" :autosize="{minRows:2,maxRows:4}" resize="none">
        </el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="success" @click="submitForm('userForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkEmail, checkPhone, bindURL, convertDeepCopy } from '@utils'
import { mapMutations, mapState } from 'vuex'
import { _editUser } from '@api'
import { hMixin } from '@mixins'
export default {
  name: 'user-info',
  data() {
    return {
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
      }
    }
  },
  methods: {
    bindURL,
    // 上传图片
    ...mapMutations(['setCurrentUser']),
    handleAvatarSuccess(res, file) {
      this.$set(this.userForm, 'avatarImgUrl', res)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        const { success } = await _editUser(this[formName])
        this.handleSuccess(success, '修改用户')
        this.setCurrentUser(convertDeepCopy(this[formName]))
      })
    }
  },
  mixins: [hMixin],
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.userForm = convertDeepCopy(this.currentUser)
  }
}
</script>

<style lang="less" scoped>
/deep/.avatar-uploader {
  .el-upload {
    border: 4px double #8c939d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: tomato;
    }
  }

  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
.el-form-item.btn.el-form-item--small {
  text-align: right;
  margin-right: 20px;
}
</style>
