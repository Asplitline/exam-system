<template>
  <div class="main">
    <p class="m-banner">海量|智能|多端</p>
    <h1 class="m-title">初中题库管理系统</h1>
    <p class="m-desc">开始你的学习旅程吧！</p>
    <div class="btns">
      <a href="#/contest">
        <span>考试中心</span>
        <i class="iconfont icon-ArrowRight-copy"></i>
      </a>
      <a href="#/problem">
        <span>题目练习</span>
        <i class="iconfont icon-ArrowRight-copy"></i>
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.m-banner,
.m-title,
.m-desc {
  text-align: center;
  color: #fff;
  text-shadow: 4px 9px 4px rgb(0 0 0 / 10%);
}
.m-banner {
  margin-top: 100px;
  font-size: 28px;
  line-height: 33px;
  letter-spacing: 40px;
}
.m-title {
  font-size: 63px;
  font-weight: normal;
  line-height: 73px;
  letter-spacing: 17px;
}
.m-desc {
  font-size: 24px;
  line-height: 33px;
  margin: 0 0 40px;
}
.btns {
  position: relative;
  width: 324px;
  height: 50px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  a {
    display: inline-block;
    height: 50px;
    width: 150px;
    border-radius: 25px;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    // transition: all 0.5s ease-in;
    margin-right: 20px;
    border: 1px solid #fff;
    background-color: transparent;
    span {
      // vertical-align: middle;
      color: #fff;
    }
    i {
      &::before {
        transition: all 0.5s ease-out;
        font-size: 20px;
        color: #fff;
      }
    }
    &:hover {
      // letter-spacing: 0.15em;
      background-color: #fff;
      border-color: #58ab2f;
      span,
      i::before {
        color: #58ab2f;
        margin-left: 6px;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
