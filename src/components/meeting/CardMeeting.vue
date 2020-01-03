<template>
  <el-card class="meeting" shadow="hover">
    <div slot="header" class="header">
      <span class="title">{{ meetingInfo.title }}</span>
      <i class="el-icon-timer">截止日期 {{ meetingInfo.endTime | formatDate }}</i>
      <i class="el-icon-time">发布于 {{ meetingInfo.createTime | formatTime }}</i>
    </div>
    <div class="body">
      <span class="content">
        {{ meetingInfo.content }}
      </span>
      <i class="el-icon-location">地点 {{ meetingInfo.position }}</i>
      <i class="el-icon-user">讲师 {{ meetingInfo.lecturer }}</i>
      <el-button @click="showDetail(meetingInfo.meetingId)" type="text" style="float: right;padding: 3px 0;">查看详情 </el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "MeetingDetail",
    props: ["meeting"],
    data() {
      return {
        currentDate: new Date(),
        meetingInfo: this.meeting
      }
    },
    methods: {
      showDetail(meetingId) {
        this.$router.push({path: `/meeting/${meetingId}`})
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .el-card {
    margin-bottom: 20px;
    padding: 14px;
  }
</style>
