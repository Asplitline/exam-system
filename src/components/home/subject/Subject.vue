<template>
  <div class="sub-main">
    <el-card class="card-subject">
      <div class="card-row">
        <div class="card-content" v-for="item in subjectlist" :key="item.id">
          <a href="" class="card-pic">
            <img :src="bindSrc(item.imgUrl)" alt="" />
          </a>
          <el-button type="text" class="card-title">{{ item.name }}</el-button>
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
        </div>
        <!-- 补位 -->
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="query.size"
        @current-change="handleCurrent"
      >
      </el-pagination>
    </el-card>
    <div class="sub-search">
      <el-input placeholder="请输入课程名称" v-model="query.keyword">
        <el-button slot="append" icon="el-icon-search" circle=""></el-button>
      </el-input>
    </div>
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
      total: 0
    }
  },
  methods: {
    async getSubject() {
      const { data, status } = await this.$http.get(
        '/subject/api/pageSubjects',
        {
          params: this.query
        }
      )
      if (status === 200) {
        const { list, total } = data
        this.total = total
        this.subjectlist = list
      } else {
        this.$message.warning('请求失败')
      }
    },
    handleCurrent(currentIndex) {
      console.log(currentIndex)
      this.query.page = currentIndex
      this.getSubject()
    }
  },
  created() {
    this.getSubject()
  }
}
</script>

<style lang="less" scoped>

.el-main {

}
.sub-main {
  position: relative;
  .sub-search {
    position: absolute;
    top: 0;
    left: -200px;
    width: 200px;
    height: 40px;
  }
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card-content {
    position: relative;
    width: 260px;
    height: 260px;
    margin-bottom: 20px;
    border-radius: 2%;
    // box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    i {
      margin-right: 4px;
    }
    .card-title,
    .card-author {
      margin-left: 10px;
    }
  }
  .card-pic {
    display: inline-block;
    width: 100%;
    img {
      width: 100%;
      height: 140px;
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
