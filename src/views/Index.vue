<template>
  <el-container>
    <base-header :activeIndex="activeIndex"></base-header>
    <el-main style="margin-top: 53px">
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
