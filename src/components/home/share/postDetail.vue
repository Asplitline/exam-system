<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分享中心</el-breadcrumb-item>
      <el-breadcrumb-item>金山WPS服务端开发工程师面试经历</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-container class="postDetail">
      <el-main>
        <div class="postdesc">
          <el-row>
            <el-col :span="2">
              <el-avatar
                shape="square"
                :size="50"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              ></el-avatar>
            </el-col>
            <el-col :span="12">
              <div class="content">
                <a href=""><h4>小王</h4> </a>
                <span class="createDate">2020-04-27 10:19:29发表</span>
              </div>
              <p class="icons">
                <i class="el-icon-chat-dot-round">2</i>
                <i class="icon-dianzan iconfont">2</i>
                <i class="el-icon-view">123</i>
              </p>
            </el-col>
          </el-row>
        </div>

        <div class="postContent">
          <el-card shadow="always">
            <h1>A header</h1>
            <p>
              Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex
              eam alia facete scriptorem, est autem aliquip detraxit at. Usu
              ocurreret referrentur at, cu epicurei appellantur vix. Cum ea
              laoreet recteque electram, eos choro alterum definiebas in.
            </p>
            <p>
              Vim dolorum definiebas an. Mei ex natum rebum iisque. Audiam
              quaerendum eu sea, pro omittam definiebas ex. Te est latine
              definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne,
              his te phaedrum referrentur consectetuer. Id vix fabulas oporteat,
              ei quo vide phaedrum, vim vivendum maiestatis in. Eu quo homero
              blandit intellegebat. Incorrupte consequuntur mei id.
            </p>
            <p>
              Mei ut facer dolores adolescens, no illum aperiri quo, usu odio
              brute at. Qui te porro electram, ea dico facete utroque quo.
              Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur
              at. Quodsi convenire mnesarchum eu per, quas minimum postulant per
              id.
            </p>
          </el-card>
        </div>
        <el-divider> </el-divider>
        <p class="replyTitle">
          <i class="el-icon-chat-dot-round"></i>回复<span>(4)</span>
        </p>
        <div class="postRely">
          <div class="comment">
            <div class="content">
              <el-row>
                <el-col :span="1">
                  <el-avatar
                    shape="square"
                    :size="36"
                    src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                  ></el-avatar>
                </el-col>
                <el-col :span="16" class="info">
                  <a href="javascript:;" class="author">Matt </a>
                  <span class="replyDate">2020-05-04 18:36:03</span>
                  <div class="text">How artistic!</div>
                  <a href="javascript:;" class="actions">回复</a>
                  <div class="replyControl">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="textarea1"
                      :rows="3"
                      resize="none"
                    >
                    </el-input>
                    <el-button
                      type="success"
                      icon="el-icon-edit"
                      size="mini"
                      style="margin-top: 6px; float: right"
                      >提交</el-button
                    >
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="comments" :span="20">
              <div class="content">
                <el-row>
                  <el-col :span="1">
                    <el-avatar
                      shape="square"
                      :size="36"
                      src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                    ></el-avatar>
                  </el-col>
                  <el-col :span="16" class="info">
                    <a href="javascript:;" class="author">Matt </a>
                    <span class="replyDate">2020-05-04 18:36:03</span>
                    <div class="text">How artistic!</div>
                    <a href="javascript:;" class="actions">回复</a>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.title {
  i {
    margin-right: 6px;
  }
}
.postDetail {
  .el-main {
    padding: 0 20px;
  }
}

.postdesc {
  font-size: 14px;
  position: relative;
  .content {
    a h4 {
      margin: 0 0 12px 0;
    }
  }
  .icons {
    position: absolute;
    bottom: 0;
    right: 0;
    i {
      font-size: 16px;
      padding: 0 4px;
    }
  }
}

.postContent {
  margin: 40px 0;
  letter-spacing: 0.1em;
}

.replyTitle {
  font-size: 20px;
  i {
    padding-right: 4px;
  }
}

.comment {
  .content {
    font-size: 14px;
    .replyDate {
      color: #aaa;
    }
    .actions {
      color: #e74c3c;
    }
  }
  .comments {
    margin-top: 6px;
    margin-left: 40px;
  }
}
</style>
