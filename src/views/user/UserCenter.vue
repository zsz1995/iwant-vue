<template>
  <el-container class="iw-c">
    <el-aside width="200px">
      <el-menu
      router
      :default-active="defaultActiveMenu"
      class="iw-m"
      >

        <el-menu-item-group>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人中心</span>
          </template>

          <el-menu-item index="/filluser">
            <el-badge is-dot>
              <i class="icon-edit"></i>信息维护
            </el-badge>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="2" disabled>
          <i class="el-icon-menu"></i>
          <span slot="title">我参加的活动</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="icon-flag"></i>
          <span slot="title">我的计划</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="height: 17px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in $route.meta.breadCrumb" :key="index">
            <router-link v-if="item.url" :to="item.url">{{item.title}}</router-link>
            <a v-else>
              {{item.title}}
            </a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        defaultActiveMenu: "/filluser"
      }
    }
  }
</script>

<style scoped>
  .iw-c, .iw-c .iw-m {
    height: 500px;
  }

  .el-badge {
    display: inline;
  }
</style>
