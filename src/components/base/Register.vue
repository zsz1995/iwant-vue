<template>
  <div>
    <el-form :model="input" :rules="rules" ref="registerForm" class="iw-drawform">
      <el-form-item label="手机号" required prop="tel">
        <el-input v-model="input.tel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input v-model="input.pass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input v-model="input.checkPass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="submitForm('registerForm')">提交</el-button>
        <el-button size="medium" @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      let validateTel = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号"))
        } else {
          callback()
        }
      };

      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.input.pass !== "") {
            this.$refs.registerForm.validateField("checkPass");
          }
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次确认密码"))
        } else if (value !== this.input.pass) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      };
      return {
        input: {
          tel: "",
          pass: "",
          checkPass: ""
        },
        rules: {
          tel: [
            {validator: validateTel, trigger: "blur"}
          ],
          pass: [
            {validator: validatePass, trigger: "blur"}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log(1)
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
