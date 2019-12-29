<template>
  <div id="app">
    <link rel="icon" type="image/x-icon" href="../public/favicon.ico"/>
    <router-view/>
  </div>
</template>

<script>
  import {getToken} from "@/utils/auth";

  export default {
    name: "App",
    created() {
      this.$store.commit("SET_TOKEN", getToken())
    }
  }

</script>
<style lang="scss">
</style>
