<template>
  <el-container style="height: 100%">
    <base-header :activeIndex="activeIndex"/>
    <el-main style="margin-top: 53px;padding: 0;">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import BaseHeader from "@/components/base/BaseHeader.vue";

  export default {
    name: 'index',
    components: {
      BaseHeader
    },
    data() {
      return {
        activeIndex: "/latest"
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.activeIndex = to.path
      })
    },
    beforeRouteUpdate(to, from, next) {
      this.activeIndex = to.path;
      next();
    }

  }
</script>
<style scoped>
</style>
