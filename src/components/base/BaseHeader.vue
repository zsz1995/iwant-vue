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
          <el-button @click="register_drawer = true" type="text" icon="icon-adduser">注册</el-button>
        </el-button-group>
      </span>
      </el-menu>
    </el-header>
    <el-drawer
    title="登录"
    :visible.sync="login_drawer"
    >
    </el-drawer>

    <el-drawer
    title="注册"
    :visible.sync="register_drawer"
    >
      <el-form :model="input" :rules="rules" ref="ruleForm" class="iw-drawform">
        <el-form-item label="手机号" required prop="tel">
          <el-input v-model="input.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="input.pass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="input.checkPass" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
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
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        }else {
          if (this.input.pass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
        }
      };


      return {
        input: {
          tel: "",
          pass: "",
          checkPass: ""
        },
        rules: {
          pass:[
            {validator: validatePass, trigger: "blur"}
          ]
        },
        login_drawer: false,
        register_drawer: true
      }
    },
    methods: {
      loginCloseHandler(done) {
        this.$confirm("确认关闭?").then(() => {
          done();
        })
        .catch(() => {
        })
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

  .iw-drawform {
    margin: 20px 30px;
  }
</style>
