<template>
  <div>
    <el-container class="userInfo">
      <el-aside width="280px">
        <el-card>
          <el-avatar
            shape="square"
            :size="240"
            fit="cover"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-avatar>
        </el-card>
        <el-card>
          <a href=""><h4 class="name">管理员</h4></a>
          <span class="school"
            ><i class="el-icon-collection">成都东软学院 </i></span
          >
          <p class="desc">只会Hello World的程序员</p>
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
              <el-form-item label="学号" prop="name">
                <el-input v-model="userForm.name"> </el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="name">
                <el-input v-model="userForm.name"> </el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="name">
                <el-input v-model="userForm.name"> </el-input>
              </el-form-item>
              <el-form-item label="上传头像" prop="name">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                >
                  <img
                    v-if="userForm.imageUrl"
                    :src="userForm.imageUrl"
                    class="avatar"
                  />
                </el-upload>
              </el-form-item>
              <el-form-item label="自我描述" prop="name">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="userForm.name"
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submitBtn" type="primary"
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
            <!-- <el-form
              :model="pwdForm"
              :rules="pwdRules"
              ref="pwdForm"
              label-width="100px"
              label-position="left"
              v-if="activeIndex === 2"
            >
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="pwdForm.oldPwd" type="password"> </el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="pwdForm.newPwd" type="password"> </el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="pwdForm.cofirmPwd" type="password">
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
            </el-form> -->
            <el-form
              :model="pwdForm"
              status-icon
              :rules="pwdRules"
              ref="pwdForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="pwdForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="pwdForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 考试记录 -->
          <div v-else-if="activeIndex === 3">
            <el-divider content-position="left"
              ><i class="el-icon-document">考试记录</i></el-divider
            >
            <el-table :data="contestTable" border style="width: 100%">
              <el-table-column prop="date" label="考试名称" width="180">
              </el-table-column>
              <el-table-column prop="name" label="考试科目" width="180">
              </el-table-column>
              <el-table-column prop="address" label="考试开始时间">
              </el-table-column>
              <el-table-column prop="address" label="考试结束时间">
              </el-table-column>
              <el-table-column prop="address" label="成绩"> </el-table-column>
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
export default {
  data() {
    // 密码不能为空
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.oldPwd !== '') {
          this.$refs.pwdForm.validateField('newPassword')
        }
        callback()
      }
    }
    var validateCPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {},
      userForm: {},
      userFormRules: {},
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        cofirmPwd: ''
      },
      pwdRules: {
        oldPassword: [{ validator: validatePass, trigger: 'blur' }],
        newPassword: [{ validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ validator: validateCPass, trigger: 'blur' }]
      },
      activeIndex: 1,
      contestTable: [],
      postList: [],
      contestQuery: {
        page: 1,
        size: 10,
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
    handleUserInfo() {},
    // 修改密码
    async handlePassword() {
      if (await this.isTruePassword()) {
      } else {
        console.log('密码错误')
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
      const res = await this.$http.get('/post/api/pagePostByAuthorId', {
        params: this.contestQuery
      })
      console.log(res)
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
    }
  },
  created() {
    this.user = this.$store.state.currentUser
    this.contestQuery.studentId = this.user.id
    this.postQuery.keyword = this.user.id
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
