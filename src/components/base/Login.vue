<template>
  <div>
    <el-form :model="loginData" :rules="rules" ref="loginForm" class="iw-drawform">
      <el-form-item label="用户名" required prop="username">
        <el-input v-model="loginData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="loginData.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="doLogin('loginForm')">登录</el-button>
        <el-button size="medium" @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        loginData: {
          username: "",
          password: ""
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
        this.$refs[form].validate((valid) => {
          if (valid) {
            that.$store.dispatch("login", that.loginData).then(() => {
              console.log(that.$store.state)
            }).catch(err => {
              if (err !== "error") {
                that.$message({message: err, type: "error", showClose: true})
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
