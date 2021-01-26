<template>
  <div>
    <div class="split-line">
      <span><i class="icon-user1 iconfont"></i>用户列表</span>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
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
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      stripe
      style="width: 100%"
      class="userList"
      max-height="600"
    >
      <el-table-column prop="avatarImgUrl" label="头像" min-width="80">
        <template v-slot:default="scope">
          <el-avatar
            shape="square"
            :size="50"
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
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      bans: ['icon-xianxing-qiyong iconfont', 'icon-ban iconfont'],
      bansIcon: ['noban-icon', 'ban-icon'],
      levels: ['学生', '教师', '管理员'],
      query: {
        pageNum: 0,
        pagesize: 5
      },
      total: 1,
      search: ''
    }
  },
  methods: {
    async getUsers() {
      const { data, status } = await this.$http.post(
        'account/pageAccount/',
        this.query
      )
      const { list, pageNum, pagesize, total } = data
      if (status === 200) {
        this.userList = list
        this.query = { pageNum, pagesize }
        this.total = total
      }
    },
    bindSrc(src) {
      return 'http://localhost:8088/' + src
    },
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getUsers()
    },
    handleCurrentChange(newSize) {
      this.query.page = newSize
      this.getUsers()
    },
    async userStateChange(userInfo) {
      const { id: account, state } = userInfo
      const { data } = await this.$http.put('/account/updateIgnoreNull', {
        account,
        state
      })
      if (data.success === true) {
        this.$message.success(data.message)
      } else {
        userInfo.state = !userInfo.state
        this.$message.error(data.message)
      }
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 18px;
}

.ban-icon {
  color: red;
}
.noban-icon {
  color: #67c23a;
}

.el-pagination {
  margin-top: 20px;
}

.mixInp {
  margin: 20px 0;
}
</style>
<style>
.el-table .el-switch__label.is-active {
  color: red;
}
</style>
