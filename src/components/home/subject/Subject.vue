<template>
  <div class="sub-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">科目学习</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card class="card-subject">
      <div class="card-row">
        <el-card
          class="card-content"
          v-for="item in subjectlist"
          :key="item.id"
          body-style="padding: 0"
          shadow="hover"
        >
          <a class="card-pic" @click="goSuject(item.id, item.name)">
            <img :src="bindSrc(item.imgUrl)" alt="" />
          </a>
          <el-button
            type="text"
            class="card-title"
            @click="goSuject(item.id, item.name)"
            >{{ item.name }}</el-button
          >
          <div class="card-author">
            <span class="author"><i class="el-icon-user-solid"></i>admin</span>
          </div>
          <div class="card-detail">
            <span class="problem-num">
              <i class="el-icon-tickets"></i>{{ item.questionNum }}</span
            >
            <span class="problem-info">
              <i class="el-icon-upload"></i>私有题库</span
            >
          </div>
        </el-card>
        <!-- 补位 -->
        <div
          class="card-content hidden"
          v-for="index in currentSize"
          :key="index"
        ></div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="query.size"
        @current-change="handleCurrent"
      >
      </el-pagination>
    </el-card>
    <div class="sub-search"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectlist: [],
      query: {
        size: 16,
        page: 1,
        keyword: null
      },
      currentSize: 0,
      total: 0
    }
  },
  methods: {
    // 获取课程列表
    async getSubject() {
      const { data, status } = await this.$http.get(
        '/subject/api/pageSubjects',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { list, total, size } = data
        this.total = total
        this.subjectlist = list
        this.handleLastLine(size % 4)
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 点击切换页面
    handleCurrent(currentIndex) {
      console.log(currentIndex)
      this.query.page = currentIndex
      this.getSubject()
    },
    // flex布局最后一行占位
    handleLastLine(size) {
      this.currentSize = size === 0 ? 0 : 4 - size
    },
    // 跳转到课程详情
    goSuject(id, name) {
      this.$router.push(`/subject/${id}/${name}`)
    }
  },
  created() {
    this.getSubject()
  }
}
</script>

<style lang="less" scoped>
.card-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card-content {
    position: relative;
    width: 260px;
    height: 260px;
    margin-bottom: 20px;
    border-radius: 8px;

    i {
      margin-right: 8px;
    }
    .card-title,
    .card-author {
      margin-left: 10px;
    }
  }
  .card-pic {
    display: inline-block;
    width: 100%;
    height: 140px;
    overflow: hidden;
    img {
      width: 100%;
      height: 140px;
      transition: all linear 0.3s;
      cursor: pointer;
    }
  }
  .card-content:hover {
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.2);
    img {
      transform: scale(1.05);
    }
  }
  .card-title {
    font-size: 20px;
    font-weight: 600;
  }
  .card-detail {
    position: absolute;
    display: flex;
    justify-content: space-around;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 36px;
    line-height: 36px;
    border-top: 1px solid #eee;
    font-size: 14px;
    color: #999;
    box-sizing: border-box;
  }
}
</style>

<style lang="less">
.el-card.card-subject {
  .el-pager li {
    font-size: 18px;
    font-weight: normal;
  }
}
</style>
