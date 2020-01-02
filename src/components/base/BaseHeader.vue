<template>
  <div>
      <el-menu
      :router="true"
      :default-active="activeIndex"
      menu-trigger="click"
      mode="horizontal"
      class="iw-header"
      >
        <router-link to="/">
          <el-image class="logo" :src="iwant">
          </el-image>
        </router-link>
        <el-menu-item index="/meetings" style="margin-left: 30px">全部活动</el-menu-item>
        <span class="pull-right" style="height: 60px;line-height: 60px;margin: 0 20px;">
          <template v-if="!user.isLogin">
            <router-link to="/login" class="margin-right-5">
              <el-button type="text" icon="icon-login" size="medium">登录</el-button>
            </router-link>
            <router-link to="/register">
              <el-button plain icon="icon-adduser" size="small" round>注册</el-button>
            </router-link>
          </template>
          <template v-else>
            <el-dropdown trigger="click" @command="handleUserCommand">
              <span class="el-dropdown-link">
                  <el-avatar style="vertical-align: middle;" :src="user.avatar">
                    <i v-if="!user.avatar" class="icon-user"/>
                  </el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/usercenter">
                  <el-dropdown-item icon="icon-pic-left">
                    <el-badge value="待完善" :hidden="!user.needFill">
                    个人中心
                    </el-badge>
                  </el-dropdown-item>
                </router-link>
                <el-dropdown-item icon="icon-logout" command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </span>
      </el-menu>
  </div>
</template>

<script>
  // import {getUserInfo} from "@/api/user";

  export default {
    name: "BaseHeader",
    components: {},
    props: {
      activeIndex: String
    },
    data() {
      return {
        iwant: require("@/static/img/iwant.png"),
      }
    },
    computed: {
      user() {
        let token = this.$store.getters.token;
        let isLogin = token && token.length > 0;
        return {
          needFill: null === this.$store.getters.user.mobile,
          isLogin: isLogin,
          avatar: this.$store.state.user.avatar
        }
      }
    },
    methods: {
      loginHandler() {
        this.$router.push({path: "/login"})
      },
      registerHandler() {
        this.$router.push({path: "/register"})
      },
      handleUserCommand(command) {
        let that = this;
        if (command === "editInfo") {
          that.$router.push("editUser")
        }
        if (command === "logout") {
          that.$store.dispatch('LogOut').then((res) => {
            if (res.success) {
              that.$message.info("注销成功.");
              that.$router.push("/")
            }
          })
        }
      },
      initUserInfo() {
        /*
                let that = this;
                getUserInfo().then(res => {
                  if (res.success && res.data != null) {
                    that.needFill = false;
                    let data = res.data;
                    that.$store.commit("SET_AVATAR", data.avatar);
                  }
                })
        */
      }
    },
    created() {
      this.initUserInfo()
    }
  }
</script>

<style scoped>
  .iw-header {
    height: 60px;
    padding: 0 0;
    position: fixed;
    left: 0;
    top: 0;
    min-width: 100%;
    z-index: 1024;
  }
</style>
