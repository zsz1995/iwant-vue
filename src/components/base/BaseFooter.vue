<template>
  <el-footer>
    <div class="me-footer">
      <p>Designed by
        <strong>
          <router-link to="/" class="me-login-design-color">Noobz</router-link>
        </strong>
      </p>
    </div>
  </el-footer>
</template>

<script>
  import config from "@/settings";
  export default {
    data() {
      return {
        footer: config.footerTxt
      }
    }
  }
</script>

<style scoped>

  .me-footer {
    text-align: center;
    line-height: 60px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;

  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

</style>
