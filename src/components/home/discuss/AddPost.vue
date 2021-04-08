<template>
  <div class="add-post">
    <el-form :model="postForm" :rules="postRules" ref="postForm">
      <el-form-item prop="title">
        <el-input v-model="postForm.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="textContent">
        <mavon-editor style="min-height:600px" v-model="postForm.textContent"
          ref="md-editor" @imgAdd="handleEditorImgAdd" />
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" size="small" @click="goBack()"><i
            class="el-icon-refresh-left"></i>返回
        </el-button>
        <el-button type="success" size="small" @click="submitPost('postForm')"><i
            class="el-icon-edit"></i>发表
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { bindURL, markdownToHtml } from '@utils'
import { _uploadFile, _addPost } from '@api'
import { mapState } from 'vuex'
import { hMixin } from '@mixins'
export default {
  data() {
    return {
      postForm: {},
      postRules: {
        title: { required: true, message: '请填写文章标题', trigger: 'blur' },
        textContent: {
          required: true,
          message: '请填写文章内容',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    // 图片上传
    async handleEditorImgAdd(pos, file) {
      const formData = new FormData()
      formData.append('files', file)
      const path = await _uploadFile(formData)
      this.$refs['md-editor'].$img2Url(pos, bindURL(path))
    },
    // 提交文章
    submitPost(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { success } = await _addPost(
          this.handlePostForm(this[formName].textContent)
        )
        if (success) {
          this.$message.success('发布成功')
          this.$router.push({ name: 'iDiscuss' })
        } else {
          this.$message.error('发布失败')
        }
      })
    },
    // 处理文章表单
    handlePostForm(text) {
      const htmlContent = markdownToHtml(text)
      return {
        authorId: this.currentUser.id,
        title: this.postForm.title,
        textContent: this.postForm.textContent,
        htmlContent,
        createTime: Date.now(),
        updateTime: Date.now(),
        id: Date.now() % 999999999
      }
    }
  },
  mixins: [hMixin],
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    mavonEditor
  }
}
</script>

<style lang="less" scoped>
.btns {
  text-align: right;
  .el-button {
    margin-right: 10px;
    i {
      margin-right: 4px;
    }
  }
}
</style>
