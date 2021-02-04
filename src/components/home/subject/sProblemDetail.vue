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
  </div>
</template>

<script>
export default {
  props: ['id', 'name'],
  data() {
    return {}
  },
  methods: {
    getProblem() {}
  }
}
</script>
<style lang="less" scoped>
</style>
