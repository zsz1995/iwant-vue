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
        <el-menu-item index="/" style="margin-left: 30px">最新</el-menu-item>
        <el-menu-item index="/notice">全部活动</el-menu-item>
        <span class="pull-right" style="height: 60px;line-height: 60px;margin: 0 20px;">
          <template v-if="!user.login">
            <el-button-group>
              <el-button @click="login_drawer = true" type="text" icon="icon-login">登录</el-button>
              <el-button type="text">/</el-button>
              <el-button @click="register_drawer = true" type="text" icon="icon-adduser">注册</el-button>
            </el-button-group>
          </template>
          <template v-else>
            <el-avatar icon="icon-user"></el-avatar>
          </template>
        </span>
      </el-menu>
    </el-header>
    <el-drawer
    title="登录"
    :visible.sync="login_drawer"
    @close="loginCloseHandler"
    >
      <login ref="login"></login>
    </el-drawer>
    <el-drawer
    title="注册"
    :visible.sync="register_drawer"
    @close="registerCloseHandler"
    >
      <register ref="register"></register>
    </el-drawer>
  </div>
</template>

<script>
  import Register from "@/components/base/Register";
  import Login from "@/components/base/Login";

  export default {
    name: "BaseHeader",
    components: {
      Register,
      Login
    },
    props: {
      activeIndex: String
    },
    data() {
      return {
        login_drawer: this.$store.state.id.length !== 0,
        register_drawer: false
      }
    },
    computed: {
      user() {
        let login = this.$store.state.id.length !== 0;
        let avatar = this.$store.state.avatar;
        return {
          login,
          avatar
        }
      }
    },
    methods: {
      loginCloseHandler() {
        this.$refs["login"].resetForm("loginForm");
      },
      registerCloseHandler() {
        this.$refs["register"].resetForm("registerForm");
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
