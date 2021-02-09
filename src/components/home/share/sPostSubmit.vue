<template>
  <div v-highlight>
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
    <el-input placeholder="请输入内容" v-model="title" class="postTitle">
      <template slot="prepend">标题</template>
    </el-input>
    <quill-editor ref="myQuillEditor" v-model="content" :options="options" />

    <el-button class="submitPost" type="danger" @click="getContent" plain>
      提交
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      title: '',
      user: {},
      options: {
        theme: 'snow',
        placeholder: '请输入内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 几级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表，无序列表
            [{ script: 'sub' }, { script: 'super' }], // 下角标，上角标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{ direction: "rtl" }], // 文字输入方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 颜色选择
            [{ font: [] }], // 字体
            [{ align: [] }], // 居中
            ['clean'], // 清除样式
            [('link', 'image', 'video')] // 控制能上传的内容
          ]
        }
      }
    }
  },
  methods: {
    onEditorBlur({ html, text }) {
      console.log(html, text)
    },
    async getContent() {
      const temp = {
        textContent: this.editor.getText().trim(),
        htmlContent: this.content.trim(),
        authorId: this.user.id,
        title: this.title.trim()
      }
      if (this.validate(temp)) {
        const { data, status } = await this.$http.post(
          '/post/api/addPost',
          temp
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('添加成功')
            this.title = ''
            this.content = ''
            window.history.go(-1)
          }
        } else {
          this.$message.error('添加失败')
        }
      }
    },
    // 校验文章
    validate(data) {
      if (data.title.length === 0) {
        this.$notify.error({
          title: '错误',
          dangerouslyUseHTMLString: true,
          message: '<strong style="color:red;">标题</strong>不能为空'
        })
        return false
      }
      if (data.textContent.length === 0) {
        this.$notify.error({
          title: '错误',
          dangerouslyUseHTMLString: true,
          message: '<strong style="color:red;">内容</strong>不能为空'
        })
        return false
      }
      return true
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created() {
    this.user = this.$store.state.currentUser
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
.postTitle {
  border-radius: 6px;
  margin-bottom: 20px;
  outline: none;
}
.postTitle.el-input.el-input-group.el-input-group--prepend {
  width: 500px;
}
</style>
