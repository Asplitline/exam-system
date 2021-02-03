<template>
  <div>
    <div class="split-line">
      <span><i class="icon-chart iconfont"></i>{{ title }} - 成绩列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20"> </el-row>
    <el-table :data="contestList" stripe style="width: 100%" max-height="600">
      <el-table-column
        prop="title"
        label="学号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="姓名"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="选择题分数"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="主观题分数"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="总分"
        min-width="150"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['id', 'title'],
  data() {
    return {}
  }
}
</script>

<style>
</style>
