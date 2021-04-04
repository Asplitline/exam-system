<template>
  <div class="top-search">
    <div class="search" v-show="showSearch">
      <el-input type="text" placeholder="请开始搜索" :clearable="true" v-model="searchValue"
        @clear="handleClose" @keyup.enter.native="handleEnter"
        @keyup.esc.native="handleClose">
        <el-button slot="append" icon="el-icon-search" @click="handleEnter">
        </el-button>
      </el-input>
    </div>
    <div class="add" v-show="showAdd">
      <el-button icon="el-icon-plus" @click="handleAdd()">添加{{text}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-search',
  props: {
    data: {
      type: String
    },
    text: {
      type: String
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },

  methods: {
    handleClose() {
      this.searchValue = ''
      this.$emit('t-close')
    },
    handleEnter() {
      this.$emit('t-enter', this.searchValue)
    },
    handleAdd(e) {
      this.$emit('t-btn')
    }
  },
  mounted() {
    this.searchValue = this.data
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.top-search {
  display: flex;
  width: auto;
  height: 40px;
  //   搜索
  .el-input-group {
    padding: 0;
    /deep/.el-input__inner {
      width: 0;
      border: none;
      padding: 0;
      opacity: 0;
      transition: all 1s ease-in-out;
    }
    /deep/ .el-input-group__append {
      // border-radius: 50%;
      background-color: transparent;
      border: 1px solid transparent;
      transition: all 0.5s ease-in-out;
    }
    .el-button {
      height: 38px;
      width: 38px;
      margin: 0;
      padding: 0;
      background-color: @color-main;
      border: 2px solid rgba(@color-main, 0.2);
      color: #f4f4f4;
      font-weight: 700;
      border-radius: 50%;
      transition: all 1.5s ease-in-out;
      /deep/.el-icon-search {
        font-size: 20px;
        font-weight: 700;
      }
    }
    &:hover {
      /deep/.el-input__inner {
        width: 200px;
        border: 1px solid #dcdfe6;
        padding: 0 15px;
        opacity: 1;
        border-radius: 4px;
      }
      /deep/ .el-input-group__append {
        .el-button {
          border-radius: 4px;
        }
      }
    }
  }
  /deep/.el-input-group__append {
    padding: 0;
  }
  //   添加
  /deep/.add {
    .el-button {
      width: 38px;
      height: 38px;
      padding: 0;
      background-color: @color-blue;
      border: 2px solid rgba(@color-blue, 0.2);
      color: #f8f8f8;
      transition: all 0.5s ease-in-out;
      border-radius: 50%;
      text-align: right;
      transition: all 1s ease-in-out;
      i {
        font-size: 20px;
        font-weight: 700;
        vertical-align: middle;
        padding: 8px 0 8px 8px;
      }
      &:hover {
        width: 100%;
        border-radius: 4px;
        span {
          width: 90px;
          opacity: 1;
        }
      }
      span {
        opacity: 0;
        padding: 8px;
        font-size: 18px;
        vertical-align: middle;
        transition: all 2s ease-in;
      }
    }
  }
}
</style>