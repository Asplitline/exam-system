<template>
  <div>
    <el-container class="userInfo">
      <el-aside width="280px">
        <el-card>
          <el-avatar
            shape="square"
            :size="240"
            fit="cover"
            :src="bindSrc(user.avatarImgUrl)"
          ></el-avatar>
        </el-card>
        <el-card>
          <a href=""
            ><h4 class="name">{{ user.name }}</h4></a
          >
          <span class="school"
            ><i class="el-icon-s-promotion">{{ user.email }} </i></span
          >
          <p class="desc">{{ user.email && '暂时没有任何信息' }}</p>
        </el-card>
        <el-card class="box-card" body-style="padding: 0">
          <a
            href="javascript:;"
            class="asideItem"
            @click="setCurrent(1)"
            :class="{ 'aside-current': activeIndex === 1 }"
            ><i class="icon-user1 iconfont"></i>个人信息</a
          >
          <a
            href="javascript:;"
            class="asideItem"
            @click="setCurrent(2)"
            :class="{ 'aside-current': activeIndex === 2 }"
            ><i class="el-icon-edit-outline"></i>更改密码</a
          >
          <a
            href="javascript:;"
            class="asideItem"
            @click="setCurrent(3)"
            :class="{ 'aside-current': activeIndex === 3 }"
            ><i class="el-icon-document"></i>考试记录</a
          >
          <a
            href="javascript:;"
            class="asideItem"
            @click="setCurrent(4)"
            :class="{ 'aside-current': activeIndex === 4 }"
            ><i class="icon-comment iconfont"></i>我的发帖</a
          >
        </el-card>
      </el-aside>
      <el-main>
        <el-card class="mainForm">
          <!-- 个人信息 -->
          <div v-if="activeIndex === 1">
            <el-divider content-position="left"
              ><i class="icon-user1 iconfont">个人信息</i></el-divider
            >
            <el-form
              :model="userForm"
              :rules="userFormRules"
              ref="userForm"
              label-width="100px"
              label-position="left"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="userForm.name"> </el-input>
              </el-form-item>
              <el-form-item label="学号" prop="id">
                <el-input v-model="userForm.id" disabled> </el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qq">
                <el-input v-model="userForm.qq"> </el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="userForm.phone"> </el-input>
              </el-form-item>
              <el-form-item label="上传头像" prop="avatar">
                <el-upload
                  class="avatar-uploader"
                  :action="bindSrc('uploadfile')"
                  :show-file-list="false"
                  :size="50"
                  :on-success="handleAvatarSuccess"
                  name="files"
                >
                  <img
                    v-if="userForm.avatarImgUrl"
                    :src="bindSrc(userForm.avatarImgUrl)"
                    class="avatar"
                  />
                </el-upload>
              </el-form-item>
              <el-form-item label="自我描述" prop="description">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="userForm.description"
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="submitBtn"
                  type="primary"
                  @click="submitUserInfo"
                  ><i class="el-icon-edit"></i>确认修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 更改密码 -->
          <div v-else-if="activeIndex === 2">
            <el-divider content-position="left"
              ><i class="el-icon-edit-outline">更改密码</i></el-divider
            >
            <!-- :rules="pwdFormRules" -->
            <el-form
              :model="pwdForm"
              ref="pwdForm"
              label-width="100px"
              label-position="left"
              v-if="activeIndex === 2"
            >
              <el-form-item label="旧密码" prop="oldPwd">
                <el-input v-model="pwdForm.oldPwd" type="password"> </el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="pwdForm.newPwd" type="password"> </el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPwd">
                <el-input v-model="pwdForm.confirmPwd" type="password">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="submitBtn"
                  type="primary"
                  @click="handlePassword"
                  ><i class="el-icon-edit"></i>确认修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 考试记录 -->
          <div v-else-if="activeIndex === 3">
            <el-divider content-position="left"
              ><i class="el-icon-document">考试记录</i></el-divider
            >
            <el-table :data="gradeList" border style="width: 100%">
              <el-table-column prop="date" label="考试名称" width="180">
                <template v-slot="{ row }">
                  {{ row.contestName }}
                </template>
              </el-table-column>
              <!-- <el-table-column prop="name" label="考试科目" width="180">
              </el-table-column> -->
              <el-table-column prop="createTime" label="考试开始时间">
                <template v-slot="{ row }">
                  {{ row.createTime | formatDate }}
                </template>
              </el-table-column>
              <el-table-column prop="finishTime" label="考试结束时间">
                <template v-slot="{ row }">
                  {{ row.finishTime | formatDate }}
                </template>
              </el-table-column>
              <el-table-column prop="result" label="成绩">
                <template v-slot="{ row }">
                  {{ row.result }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 我的发帖 -->
          <div v-else class="userComment">
            <el-divider content-position="left"
              ><i class="icon-comment iconfont">我的发帖</i></el-divider
            >
            <div class="postDesc" v-for="item in postList" :key="item.id">
              <a href="javascript:;" @click="goPost(item.id)"
                ><h4>{{ item.title }}</h4></a
              >
              <a class="comment" href="javascript:;"
                ><i class="el-icon-chat-dot-round">{{ item.replyNum }}</i></a
              >
              <span class="createTime"
                >发布于: {{ item.createTime | formatDate }}</span
              >
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// BUG>> 表单验证有问题
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['id'],
  data() {
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) return callback()
      callback(new Error('邮箱不合法'))
    }
    // 验证手机
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^1[34578]\d{9}$/
      if (regPhone.test(value)) return callback()
      callback(new Error('手机号码不合法'))
    }
    return {
      user: {},
      userForm: {},
      userFormRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        qq: [{ required: true, message: '请填入qq号', trigger: 'blur' }],
        phone: [
          { required: true, message: '请填入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填入电子邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      pwdForm: {},
      // pwdFormRules: {
      //   oldPwd: [
      //     { required: true, message: '旧密码不能为空', trigger: 'blur' }
      //   ],
      //   newPwd: [
      //     { required: true, message: '新密码不能为空', trigger: 'blur' }
      //   ],
      //   confirmPwd: [
      //     { required: true, message: '两次密码不一致', trigger: 'blur' }
      //   ]
      // },
      activeIndex: 1,
      contestTable: [],
      postList: [],
      gradeList: [],
      contestQuery: {
        pageNum: 1,
        pageSize: 10,
        studentId: null
      },
      postQuery: {
        page: 1,
        size: 10,
        keyword: null
      }
    }
  },
  methods: {
    ...mapMutations(['initUser']),
    async getCommentById() {
      switch (this.activeIndex) {
        case 1:
          this.handleUserInfo()
          break
        case 2:
          // this.handlePassword()
          break
        case 3:
          this.handleContest()
          break
        case 4:
          this.handlePost()
          break
      }
    },
    // 修改用户信息
    handleUserInfo() {
      this.userForm = this.toConvert(this.user)
    },
    // 提交用户信息
    submitUserInfo() {
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) return
        const { data, status } = await this.$http.put(
          '/account/updateIgnoreNull',
          this.userForm
        )
        if (status === 200) {
          if (data.success) {
            this.initUser(this.userForm)
            this.user = this.toConvert(this.userForm)
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    // 修改密码
    async handlePassword() {
      const isTrue = await this.isTruePassword()
      if (isTrue) {
        if (this.pwdForm.newPwd === this.pwdForm.confirmPwd) {
          const { status, data } = await this.$http.get(
            '/account/changePassword',
            {
              params: {
                id: this.user.id,
                password: this.pwdForm.confirmPwd
              }
            }
          )
          if (status === 200) {
            if (data.success) {
              this.$message.success('修改成功')
              this.pwdForm = []
            } else {
              this.$message.error('修改失败')
            }
          } else {
            this.$message.warning('请求失败')
          }
        } else {
          this.$message.error('两次密码不一致')
        }
      } else {
        this.$message.error('密码错误')
      }
    },
    // 验证密码
    async isTruePassword() {
      const { data } = await this.$http.post(
        '/account/api/login',
        this.toUrlParams({
          username: this.user.username,
          password: this.pwdForm.oldPwd
        })
      )
      return data.success
    },
    // 获取考试
    async handleContest() {
      const { data, status } = await this.$http.get(
        '/grade/api/pageGradeByStudentId',
        {
          params: this.contestQuery
        }
      )
      if (status === 200) {
        this.gradeList = data.grades
        this.gradeList.forEach((item) => {
          // console.log(item.contestId, this.getContestById(item.contestId).title)
          item.contestName = this.getContestById(item.contestId).title || '未知'
        })
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 获取用户列表
    async handlePost() {
      const { data, status } = await this.$http.get(
        '/post/api/pagePostByAuthorId',
        {
          params: this.postQuery
        }
      )
      if (status === 200) {
        const { list } = data
        this.postList = list
      } else {
        this.$message.warning('请求失败')
      }
    },

    setCurrent(index) {
      this.activeIndex = index
      this.getCommentById()
    },

    goPost(pid) {
      this.$router.push(`/share/post/${pid}/${this.user.id}`)
    },

    handleAvatarSuccess(res, file) {
      this.userForm.avatarImgUrl = file.raw.name
    }
  },
  computed: {
    ...mapGetters(['getContestById'])
  },
  created() {
    this.user = this.$store.state.currentUser
    this.contestQuery.studentId = this.user.id
    this.postQuery.keyword = this.user.id
    this.getCommentById()
  }
}
</script>

<style lang="less" scoped>
.userInfo {
  .el-main {
    padding: 0 20px;
  }
  .name,
  .desc {
    margin: 10px 0;
  }
  .desc {
    color: #777;
  }
  .asideItem {
    letter-spacing: 0.5em;
    text-align: center;
    display: block;
    padding: 10px 0;
    color: #00b894;
    transition: all linear 0.1s;
    i {
      padding-right: 6px;
    }
  }
  .asideItem:hover,
  .aside-current {
    background-color: #00b894;
    transform: scale(1.1);
    color: #fff;
  }
  .mainForm {
    .el-divider {
      .iconfont,
      [class^='el-icon'] {
        font-size: 20px;
        letter-spacing: 0.2em;
      }
    }
    .el-form-item__label {
      text-align: left;
    }
    .avatar-uploader {
      width: 160px;
      height: 160px;
      border: 2px dashed #eee;
      transition: all 0.2s linear;
      border-radius: 6px;
      &:hover {
        border-color: #ff7675;
      }
      i {
        width: 100%;
        height: 100%;
      }
    }
    .avatar {
      width: 160px;
      height: 160px;
    }
    .avatar-uploader .el-upload {
      border: none;
    }
  }
}

.el-form {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 20px 40px;
  .submitBtn {
    float: right;
    font-size: 14px;
    letter-spacing: 0.1em;
  }
}
.userComment {
  [class^='el-icon'] {
    font-size: 18px;
  }
  a {
    color: #45aaf2;
    h4 {
      font-size: 22px;
      margin: 10px 0;
    }
  }
  a.comment {
    color: #666;
    i {
      letter-spacing: 0.5em;
    }
  }
  a:hover {
    color: red;
  }
  .createTime {
    float: right;
    font-size: 14px;
    color: #999;
  }
  .postDesc {
    padding: 10px;
    border-bottom: 1px dashed #ccc;
  }
}
</style>

<style lang="less">
.mainForm {
  .avatar-uploader .el-upload {
    border: none;
  }
}
</style>
