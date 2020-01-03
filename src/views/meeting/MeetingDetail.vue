<template>
  <div class="detail">
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <div class="title">
          {{meeting.title}}
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <div class="content">
          {{meeting.content}}
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <i class="el-icon-timer"> 截止时间 {{meeting.endTime | formatDate}} </i>
        <i class="el-icon-time"> 创建时间 {{meeting.createTime | formatDate}}</i>
        <i class="el-icon-user"> 讲师 {{meeting.lecturer}}</i>
        <i class="el-icon-location"> 地址 {{meeting.position}}</i>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-button @click="sign" type="primary" size="small" style="float: right;margin: 20px">报名</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "MeetingDetail",
    data() {
      return {
        meeting: {}
      }
    },
    methods: {
      sign() {
        let that = this;
        this.$request({
          url: `/sign/${this.meeting.meetingId}`,
          method: "post"
        }).then(res => {
          if (res.success) {
            that.$message.success("报名成功")
          }
        });
      },
      init() {
        let that = this;
        let meetingId = that.$route.params.id;
        that.$request({
          url: `/meeting/${meetingId}`,
          method: "get",
        }).then(res => {
          if (res.success) {
            that.meeting = res.data;
          }
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style scoped>
  .el-card {
    border-radius: 0;
    background-color: beige;
  }
</style>
