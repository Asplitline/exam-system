<template>
  <div>
    <div class="split-line">
      <span> <i class="icon-user1 iconfont"></i> 用户管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="addUserDialog()" plain
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表单 -->
    <el-table
      :data="userList"
      stripe
      style="width: 100%"
      class="userList"
      max-height="600"
    >
      <el-table-column prop="avatarImgUrl" label="头像">
        <template v-slot:default="scope">
          <el-avatar
            shape="square"
            :size="60"
            :src="bindSrc(scope.row.avatarImgUrl)"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="username" label="账号" min-width="100">
      </el-table-column>
      <el-table-column prop="qq" label="QQ" min-width="160"> </el-table-column>
      <el-table-column prop="phone" label="手机" min-width="160">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="160">
      </el-table-column>
      <el-table-column prop="level" label="身份" min-width="80">
        <template v-slot:default="scope">
          <el-tag
            :type="['', 'success', 'danger'][scope.row.level]"
            effect="dark"
            >{{ levels[scope.row.level] }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" min-width="100">
        <template v-slot:default="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="1"
            active-text="开"
            inactive-text="关"
            @change="userStateChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template v-slot:default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editUserDialog(scope.row.id)"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteUserDialog(scope.row.id)"
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

    <!-- 添加用户对话框 -->
    <el-dialog
      :visible.sync="isAddUserDialog"
      width="30%"
      @close="closeUserDialog"
    >
      <el-form
        :model="addUserFormData"
        :rules="addUserRules"
        ref="addUserForm"
        label-width="80px"
        :hide-required-asterisk="true"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addUserFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="addUserFormData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addUserFormData.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="addUserFormData.qq"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addUserFormData.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserFormData.email"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="level">
          <el-select v-model="addUserFormData.level" placeholder="用户身份">
            <el-option label="学生" :value="0">学生</el-option>
            <el-option label="教师" :value="1">教师</el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddUser('addUserForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog :visible.sync="isEditUserDialog" width="30%">
      <el-form
        :model="editUserFormData"
        :rules="editUserRules"
        ref="editUserForm"
        label-width="80px"
      >
        <!-- 上传头像 -->
        <el-form-item label-width="0">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            action="http://127.0.0.1:8088/uploadfile"
            name="files"
          >
            <img :src="bindSrc(editUserFormData.avatarImgUrl)" class="avatar" />
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editUserFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="editUserFormData.username"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="editUserFormData.qq"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editUserFormData.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserFormData.email"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="level">
          <el-select v-model="editUserFormData.level" placeholder="用户身份">
            <el-option label="学生" :value="0"></el-option>
            <el-option label="教师" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditUser()">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) return callback()
      callback(new Error('邮箱不合法'))
    }
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^1[34578]\d{9}$/
      if (regPhone.test(value)) return callback()
      callback(new Error('手机号码不合法'))
    }
    //
    return {
      userList: [],
      bans: ['icon-xianxing-qiyong iconfont', 'icon-ban iconfont'],
      bansIcon: ['noban-icon', 'ban-icon'],
      levels: ['学生', '教师', '管理员'],
      query: {
        page: 1, // 当前页
        size: 10 // 最大页数
      },
      total: 1,
      search: '',
      isAddUserDialog: false,
      isEditUserDialog: false,
      addUserFormData: {},
      addUserRules: {
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
        level: [{ required: true, message: '请选择用户身份', trigger: 'blur' }]
      },
      editUserFormData: {},
      editUserRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        qq: [{ required: true, message: '请填入qq号', trigger: 'blur' }],
        phone: [
          { required: true, message: '请填入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填入电子邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        level: [{ required: true, message: '请选择用户身份', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUsers() {
      const { data, status } = await this.$http.post(
        'account/pageAccount/',
        this.query
      )
      const { list, pageNum: page, pageSize: size, total } = data
      if (status === 200) {
        this.userList = list
        this.query = { page, size }
        this.total = total
      }
    },
    // 数字换页
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.query.page = 1
      this.getUsers()
    },
    // 点击换页
    handleCurrentChange(newSize) {
      this.query.page = newSize
      this.getUsers()
    },
    // 用户状态改变对话框
    async userStateChange(userInfo) {
      const { id, state } = userInfo
      const { data } = await this.$http.put('/account/updateIgnoreNull', {
        id,
        state
      })
      if (data.success === true) {
        this.$message.success(data.message)
      } else {
        userInfo.state = !userInfo.state
        this.$message.error(data.message)
      }
    },
    // 添加用户对话框
    addUserDialog() {
      this.isAddUserDialog = !this.isAddUserDialog
    },
    // 提交添加
    submitAddUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const submitFormData = this.mergeUseDefault(this.addUserFormData)
          const { data } = await this.$http.post(
            '/account/insert',
            submitFormData
          )
          if (data.success) {
            this.isAddUserDialog = false
            this.$message.success(data.message)
            this.getUsers()
          } else {
            this.$message.error(data.message)
            return false
          }
        } else {
          return false
        }
      })
    },
    // 处理添加数据
    mergeUseDefault(form) {
      const useDefault = {
        updateTime: new Date(),
        createTime: new Date(),
        level: 0,
        state: 0,
        id: Date.now() % 999999,
        avatarImgUrl: 'headimg_placeholder.png'
      }
      return Object.assign(useDefault, form)
    },
    // 关闭用户对话框
    closeUserDialog() {
      this.$refs.addUserForm.resetFields()
      this.isAddUserDialog = false
    },
    // 修改对话框
    async editUserDialog(id) {
      this.isEditUserDialog = !this.isEditUserDialog
      const { data, status } = await this.$http.get('/account/getById', {
        params: {
          id
        }
      })
      if (status === 200) {
        this.editUserFormData = data
      }
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.editUserFormData.avatarImgUrl = file.raw.name
    },
    // 提交修改
    submitEditUser() {
      this.$refs.editUserForm.validate(async (valid) => {
        if (!valid) return false
        const editData = this.editUserFormData
        const { data } = await this.$http.put(
          '/account/updateIgnoreNull',
          editData
        )
        if (data.success) {
          this.$message.success('修改成功')
          this.getUsers()
          this.isEditUserDialog = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 删除用户对话框
    deleteUserDialog(id) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data } = await this.$http.delete('/account/delete/' + id)
          if (data.success) {
            this.$message.success('删除成功')
            this.getUsers()
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {
          this.$message.warning('已取消删除')
        })
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style lang="less" scoped>
.ban-icon {
  color: red;
}
.noban-icon {
  color: #67c23a;
}

.el-form {
  padding: 0 10%;
}
.el-form-item,
.el-select {
  width: 100%;
}
</style>
<style>
/*  开关文字 */
.el-table .el-switch__label.is-active {
  color: red;
}
/* 表格图片 */
.el-avatar > img {
  width: 100%;
  height: 100%;
}

/* 上传图片 */
.el-dialog .avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
  vertical-align: middle;
}
/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #ff7979;
}
</style>
