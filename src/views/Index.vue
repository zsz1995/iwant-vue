<template>
  <el-container direction="vertical">
    <base-header :activeIndex="activeIndex"/>
    <el-main class="main" style="overflow: auto">
      <el-backtop target=".main" :visibility-height="200"/>
      <router-view/>
      <base-footer v-show="showFooter"/>
    </el-main>
  </el-container>
</template>

<script>
  import BaseHeader from "@/components/base/BaseHeader.vue";
  import BaseFooter from "@/components/base/BaseFooter.vue";

  export default {
    name: 'index',
    components: {
      BaseHeader,
      BaseFooter
    },
    data() {
      return {
        activeIndex: "/meetings",
        showFooter: false
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.activeIndex = to.path
      })
    },
    beforeRouteUpdate(to, from, next) {
      this.showFooter = (to.path === "/meetings");
      this.activeIndex = to.path;
      next();
    }

  }
</script>
<style scoped>
</style>
