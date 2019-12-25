<template>
  <div>
    <el-header
    class="iw-header"
    >
      <el-menu
      :router="true"
      :default-active="activeIndex"
      menu-trigger="click"
      mode="horizontal"
      >
        <el-menu-item index="/" style="margin-left: 30px">首页</el-menu-item>
        <el-menu-item index="/notice">通告</el-menu-item>
        <span class="pull-right" style="height: 60px;line-height: 60px;margin: 0 20px;">
        <el-button-group>
          <el-button @click="login_drawer = true" type="text" icon="icon-login">登录</el-button>
          <el-button type="text">/</el-button>
          <el-button type="text" icon="icon-adduser">注册</el-button>
        </el-button-group>
      </span>
      </el-menu>
    </el-header>
    <el-drawer
      title="登录"
      :visible.sync="login_drawer"
      :before-close="loginCloseHandler"
    >

    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "BaseHeader",
    props: {
      activeIndex: String
    },
    data() {
      return {
        login_drawer: false
      }
    },
    methods: {
      loginCloseHandler(done) {
        this.$confirm("确认关闭?").then(() => {
          done();
        })
        .catch(() => {})
      }
    }
  }
</script>

<style scoped>
  .iw-header {
    margin-bottom: 60px;
    padding: 0 0;
    position: fixed;
    left: 0;
    top: 0;
    min-width: 100%;
  }

</style>
