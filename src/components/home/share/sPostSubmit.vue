<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分享中心</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-alert
      type="warning"
      title="请注意帖子的言语措辞,如果出现恶意中伤别人,诽谤他人,帖子将被删除,发帖人将会被惩罚。"
      show-icon
      center
      class="postAlert"
    >
    </el-alert>
    <quill-editor ref="myQuillEditor" v-model="content" />

    <el-button class="submitPost" type="danger" @click="getContent()" plain>
      提交
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    // onEditorBlur(quill) {
    //   console.log('editor blur!', quill)
    // },
    // onEditorFocus(quill) {
    //   console.log('editor focus!', quill)
    // },
    // onEditorReady(quill) {
    //   console.log('editor ready!', quill)
    // },
    // onEditorChange({ quill, html, text }) {
    //   console.log('editor change!', quill, html, text)
    //   this.content = html
    // }
    getContent() {
      console.log(this.content)
    }
  }
}
</script>
<style lang="less" scoped>
.el-alert {
  margin: 20px 0;
  .el-alert__description {
    font-size: 20px;
  }
}

.el-alert .el-alert__description {
  font-size: 20px;
}

.submitPost {
  float: right;
  margin: 20px;
}
</style>

<style lang="less">
.postAlert {
  .el-alert__title {
    font-size: 15px;
  }
}
</style>
