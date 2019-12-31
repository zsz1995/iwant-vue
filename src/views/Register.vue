<template>
  <div>
    <el-row>
      <router-link to="/">
        <el-image :src="iwant" class="logo"/>
      </router-link>
      <div style="width: 980px;height: auto;margin: 100px auto;">
        <el-col :offset="2" :span="8">
          <el-image :src="src_teamwork" style="height: 400px;width: 400px; "></el-image>
        </el-col>
        <el-col :offset="4" :span="8" style="">
          <el-form
          :model="input" :rules="rules" ref="registerForm" class="iw-drawform"
          >
            <el-form-item label="账号注册" prop="username">
              <el-input prefix-icon="icon-user" v-model="input.username" autocomplete="off"
                        placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-key" v-model="input.password" type="password" autocomplete="off"
                        placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input prefix-icon="el-icon-key" v-model="input.checkPassword" type="password" autocomplete="off"
                        placeholder="密码确认"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" size="medium" type="primary" @click="doRegister('registerForm')">
                <span v-if="loading">
                注 册 中 ...
                </span>
                <span v-else>
                注册
                </span>

              </el-button>
              <el-button size="medium" @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
            <span class="iw-label">已有账号？
            <router-link to="/login">
              <el-button type="text">
              点此登录
              <i class="icon-login"></i>
            </el-button>
            </router-link>
            </span>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </el-row>

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
        iwant: require("@/static/img/iwant.png"),
        src_teamwork: require("@/static/img/register.svg"),
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

        that.$refs[form].validate((valid) => {
          if (valid) {
            that.loading = true;
            register(that.input.username, that.$md5(that.input.password)).then(res => {
              that.loading = false;
              if (res.success) {
                that.$message({
                  type: "success",
                  message: "注册成功, 快点登录吧",
                  duration: 1000,
                  onClose: () => {
                    that.$router.push({path: "/login"})
                  }
                })
              }
            }).catch(err => {
              console.log("注册失败:" + err)
              that.loading = false;
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
