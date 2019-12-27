<template>
  <div>
    <el-form
    :model="input" :rules="rules" ref="registerForm" class="iw-drawform"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在注册..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form-item label="用户名" required prop="username">
        <el-input prefix-icon="icon-user" v-model="input.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input prefix-icon="el-icon-key" v-model="input.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword" required>
        <el-input prefix-icon="el-icon-key" v-model="input.checkPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="doRegister('registerForm')">注册</el-button>
        <el-button size="medium" @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {register} from "@/api/login";

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
          if (this.input.password !== "") {
            this.$refs.registerForm.validateField("checkPassword");
          }
          callback()
        }
      };
      let validateCheckPassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次确认密码"))
        } else if (value !== this.input.password) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      };
      return {
        loading: false,
        input: {
          username: "",
          password: "",
          checkPassword: ""
        },
        rules: {
          username: [
            {validator: validateUsername, trigger: "blur"}
          ],
          password: [
            {validator: validatePassword, trigger: "blur"}
          ],
          checkPassword: [
            {validator: validateCheckPassword, trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      doRegister(form) {
        let that = this;
        that.loading = true;
        that.$refs[form].validate((valid) => {
          if (valid) {
            register(that.input.username, that.$md5(that.input.password)).then(res => {
              that.loading = false;
              if (res.success) {
                that.$message({
                  type: "success",
                  message: "注册成功, 快点登录吧",
                  duration: 1000,
                  onClose: () => {
                    that.$emit("registerSuccess")
                  }
                })

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
