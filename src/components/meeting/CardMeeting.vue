<template>
  <el-card>
    <div style="padding: 14px;">
      <span>{{ meetingInfo.name }}</span>
      <div class="bottom clearfix">
        <time class="time">{{ currentDate }}</time>
        <el-button type="text" class="button">操作按钮</el-button>
      </div>
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
      init() {
        console.log(this.meetingId)
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .el-card {
    margin-top: 20px;
    background-color: beige;
  }
</style>
