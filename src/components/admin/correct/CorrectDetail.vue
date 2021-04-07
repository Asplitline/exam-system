<template>
  <div class="correct-detail">
    <el-card>
      <!-- 面包导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'correct'}">批改</el-breadcrumb-item>
        <el-breadcrumb-item>试卷批改</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="problemList" stripe style="width: 100%" max-height="600">
        <el-table-column prop="title" label="学生学号" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="学生姓名" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="交卷时间" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="批改时间" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="客观题分数" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="主观题分数" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="总分" min-width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="操作" min-width="150">
          <el-link :underline="false" type="primary" @click="goCorrectDetail(row,0)">批改
          </el-link>
          <el-link :underline="false" type="danger" @click="goCorrectDetail(row,0)">提交
          </el-link>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      problemList: [{}]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/common.less';
</style>
