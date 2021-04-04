<template>
  <div class="info">
    <el-card>
      <div class="i-header">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt="">
        <div class="i-info">
          <p class="i-title">张三</p>
          <p class="i-desc">暂时没有任何签名</p>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="1">
          <span slot="label"><i class="el-icon-date"></i> 个人信息</span>
          个人信息
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"><i class="el-icon-date"></i> 修改密码</span>
          修改密码
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label"><i class="el-icon-date"></i> 错题记录</span>
          错题记录
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label"><i class="el-icon-date"></i> 发帖记录</span>
          发帖记录
        </el-tab-pane>
        <el-tab-pane name="5">
          <span slot="label"><i class="el-icon-date"></i> 考试记录</span>
          考试记录
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  padding: 0 20%;
}

.i-header {
  display: flex;
  margin-bottom: 20px;
  img {
    width: 100px;
    height: 100px;
  }
  .i-info {
    margin-left: 2em;
    .i-title {
      color: #2f2f2f;
      font-size: 20px;
    }
    .i-desc {
      color: #969696;
      font-size: 16px;
    }
  }
}

.el-tabs__item span {
  font-size: 16px;
}

/deep/.el-tabs__item:hover,
/deep/.el-tabs__item.is-active {
  color: #92cd18;
}
/deep/.el-tabs__active-bar {
  background-color: #92cd18;
}
</style>