<template>
  <div class="problem">
    <el-card>
      <ul class="p-list">
        <li class="p-item" v-for="item in subjectList" :key="item.id">
          <a href="javascript:;" @click="goProlemList(item)">
            <img :src="bindURL(item.imgUrl)" alt="">
            <p>{{item.name}}</p>
          </a>
        </li>
        <li v-for="item in blankNum" class="p-item"></li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { _getSubjectList } from '@api'
import { hMixin } from '@mixins'
import { bindURL } from '@utils'
export default {
  data() {
    return {
      subjectList: {}
    }
  },
  methods: {
    bindURL,
    async fetchSubject() {
      const { list, total } = await _getSubjectList(this.query)
      this.subjectList = list
      this.total = total
    },
    goProlemList(data) {
      this.$router.push(`/problem/${data.id}`)
    }
  },
  computed: {
    blankNum() {
      return this.allNum % 4 === 0 ? 0 : 4 - (this.allNum % 4)
    },
    allNum() {
      return this.subjectList.length
    }
  },
  mixins: [hMixin],
  created() {
    this.fetchSubject()
  }
}
</script>

<style lang="less" scoped>
.p-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 20px 60px;
  border: 1px solid #eee;
}

.p-item {
  width: 200px;
  height: 300px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  a {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    transition: all 0.5s ease-out;
    p {
      position: absolute;
      bottom: -60px;
      left: 0;
      height: 60px;
      line-height: 60px;
      width: 100%;
      text-align: center;
      margin: 0;
      // transform: translateY(100px);
      background-color: rgba(0, 0, 0, 0.5);
      color: #eee;
      transition: all 0.8s ease-out;
    }
    &:hover {
      box-shadow: 0px 0px 6px 3px rgb(0 0 0 / 14%);
      p {
        bottom: 0;
        // transform: translateY(0);
      }
    }
  }
}
</style>