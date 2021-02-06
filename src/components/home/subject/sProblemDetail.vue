<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }"
        >科目学习</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-container class="answerArea">
      <el-main>
        <el-card>
          <el-divider
            ><h1><i class="el-icon-question"></i>题目标题</h1></el-divider
          >
          <p class="title">
            下列哪一个 Transact-SQL 语句能够实现收回 user2 查询基本表 T
            的权限？（ ）
          </p>
        </el-card>
        <el-card>
          <el-divider
            ><h1><i class="el-icon-info"></i>题目内容</h1></el-divider
          >
          <div class="select">
            <p>A.REVOKE UPDATE ON T</p>
            <p>B.GRANT SELECT ON T TO user2</p>
            <p>C.DENY SELECT ON T TO user2</p>
            <p>D.REVOKE SELECT ON T FROM user2</p>
          </div>
        </el-card>
        <el-card>
          <el-divider
            ><h1><i class="el-icon-success"></i>正确答案</h1></el-divider
          >
          <div class="answer">
            <el-collapse>
              <el-collapse-item title="查看正确答案" name="1">
                <div class="correct">
                  <el-divider>正确答案</el-divider><span>D</span>
                </div>
                <div class="parse">
                  <el-divider>答案解析</el-divider>
                  DENY：在安全系统中创建一项，以拒绝给当前数据库内的安全帐户授予权限并防止安全帐户通过其组或角色成员资格继承权限。
                  REVOKE：删除以前在当前数据库内的用户上授予或拒绝的权限。
                </div>
              </el-collapse-item></el-collapse
            >
          </div>
        </el-card>
      </el-main>
      <el-aside width="260px">
        <el-card class="box-card" body-style="padding:10px">
          <dl>
            <dd><span>题目类型</span><span>单选题</span></dd>
            <dd><span>上传者:</span><span>admin</span></dd>
            <dd>
              <span>题目难度:</span>
              <span>
                <el-rate disabled text-color="#ff9900" v-model="value">
                </el-rate>
              </span>
            </dd>
            <dd><span>发布时间:</span><span>2020-02-18 12:02:35 </span></dd>
            <dd><span>更新时间</span><span>2020-04-02 17:40:55 </span></dd>
          </dl>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  props: ['id', 'name'],
  data() {
    return {
      value: 5
    }
  },
  methods: {
    getProblem() {}
  }
}
</script>
<style lang="less" scoped>
.answerArea {
  .el-main {
    padding-top: 0;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .el-divider {
    h1 {
      font-size: 20px;
    }
  }
  .title {
    padding: 20px 0;
  }
  .select {
    padding-left: 20px;
  }
  .parse {
    letter-spacing: 0.1em;
    font-size: 18px;
  }
  .correct {
    span {
      font-size: 18px;
      color: red;
    }
  }
  .answer {
    min-height: 400px;
  }
}
.box-card {
  span {
    display: inline-block;
    // line-height: 40px;
    font-size: 13px;
  }
  dd {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  dd:last-child {
    border-bottom: none;
  }
  dd > span:first-child {
    min-width: 60px;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
  dd > span:last-child {
    padding-left: 20px;
  }
}

.el-collapse-item {
  transition: all 0.5 linear;
}
</style>
