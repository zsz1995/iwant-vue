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
          <template v-if="!user.isLogin">
            <el-button-group>
              <el-button @click="login_drawer = true" type="text" icon="icon-login">登录</el-button>
              <el-button type="text">/</el-button>
              <el-button @click="register_drawer = true" type="text" icon="icon-adduser">注册</el-button>
            </el-button-group>
          </template>
          <template v-else>
            <el-dropdown trigger="click" @command="handleUserCommand">
              <span class="el-dropdown-link">
                <el-avatar style="vertical-align: middle;" icon="icon-user"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="icon-pic-left" command="editInfo">个人信息</el-dropdown-item>
                <el-dropdown-item icon="icon-logout" command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      <register @registerSuccess="registerSuccess" ref="register"></register>
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
        login_drawer: false,
        register_drawer: false
      }
    },
    computed: {
      user() {
        let that = this;
        let isLogin = this.$store.state.isLogin;
        if (that.login_drawer && isLogin) {
          that.login_drawer = false;
        }

        if (that.login_drawer && isLogin) {
          that.login_drawer = false;
        }

        return {
          isLogin
        }
      }
    },
    methods: {
      loginCloseHandler() {
        this.$refs["login"].resetForm("loginForm");
      },
      registerCloseHandler() {
        this.$refs["register"].resetForm("registerForm");
      },
      handleUserCommand(command) {
        let that = this;
        if (command === "editInfo") {
          console.log("edit")
        }
        if (command === "logout") {
          that.$store.dispatch("frontLogout").then(() => {
            that.$router.push({path: "/"})
          }).catch((error) => {
            if (error !== 'error') {
              that.$message({message: error, type: 'error', showClose: true});
            }
          })
        }
      },
      registerSuccess() {
        this.register_drawer = false;
        this.login_drawer = true;

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
