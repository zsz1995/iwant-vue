<template>
  <div>
    <el-form
    :model="loginData"
    :rules="rules"
    ref="loginForm"
    class="iw-drawform"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在登录..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form-item label="用户名" required prop="username">
        <el-input prefix-icon="icon-user" v-model="loginData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input prefix-icon="el-icon-key" v-model="loginData.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="doLogin('loginForm')">登录</el-button>
        <el-button size="medium" @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {login} from "@/api/login";

  export default {
    data() {
      let validateUsername = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"))
        } else {
          callback()
        }
      };

      let validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          callback()
        }
      };
      return {
        loading: false,
        loginData: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {validator: validateUsername, trigger: "blur"}
          ],
          password: [
            {validator: validatePassword, trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      doLogin(form) {
        let that = this;
        that.loading = true;
        that.$refs[form].validate((valid) => {
          if (valid) {
            debugger
            login(that.loginData.username, that.$md5(that.loginData.password)).then(res => {
              that.loading = false;
              if (res.success) {
                that.$message.success("登录成功")
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm(form) {
        this.$refs[form].resetFields()
      }
    }
  }
</script>

<style scoped>
  .iw-drawform {
    margin: 20px 30px;
  }
</style>
