<template>
  <div>
    <div class="main">
      <h1>成都东软学院在线考试教学辅助系统</h1>
      <div class="btns">
        <a class="items" href="#/contest">
          <i class="icon-computer iconfont"></i>
          <h4>考试</h4>
          <p>即使是正规的教学考试，也能轻松应对，准确评判</p>
        </a>
        <a class="items" href="#/subject">
          <i class="icon-interface4 iconfont"></i>
          <h4>题库</h4>
          <p>适合教学使用的题目，合理的题目分类</p>
        </a>
        <a class="items" href="#/share">
          <i class="icon-comment iconfont"></i>
          <h4>社区</h4>
          <p>在这里同学可以分享自己的学习体验，解答疑惑</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.main {
  color: #fff;
  h1 {
    font-size: 30px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 200px;
  }
  .btns {
    text-align: center;
    .items {
      display: inline-block;
      width: 200px;
      height: 200px;
      padding: 14px;
      margin-right: 10px;
      border-radius: 10px;
      color: #dcdde1;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

      i {
        font-size: 4em;
        display: block;
      }
      h4 {
        // margin: 0;
        // margin-top: 6px;
      }
      p {
        font-size: 14px;
      }
    }
    .items:hover {
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      transform: scale(1.1);
    }
  }
}
</style>
