<template>
  <div class="iw-container">
    <el-row>
      <el-col :span="8">

      </el-col>
      <el-col :span="4" :offset="12">
        <el-image :src="src_teamwork" style="height: 400px;width: 400px; margin-top: 100px;"></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        src_teamwork: require("@/static/img/header-teamwork.svg")
      }
    }
  }
</script>

<style scoped>
  .iw-container {
    margin-top: -80px;
    margin-right: -20px;
    height: 100%;
    width: 100%;
    overflow: no-display;
    background: url('../static/img/header-background.jpg') center center no-repeat;
    background-size: cover;
  }

</style>
