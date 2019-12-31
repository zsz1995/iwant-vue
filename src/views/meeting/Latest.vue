<template>
  <el-row class="me-container meeting banner1" type="flex" align="middle" justify="center">
    <el-col :span="20" v-if="loading">
      <!--最新会议-->
      <el-row type="flex" justify="center">
        <el-col :span="12" class="me-meeting" style="text-align: center">
          <span class="title">
          {{ meeting.title }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col offset="4" :span="10">
            <span class="content">
              {{ meeting.content }}
            </span>
        </el-col>
        <el-col :span="10">
          <el-form>
            <el-form-item label="讲师">
            <span>
              <i class="icon-user"/>
              {{ meeting.lecturer }}
            </span>
            </el-form-item>
            <el-form-item label="地址">
              <i class="el-icon-place"/>
              <span>
                {{ meeting.position }}
              </span>
            </el-form-item>
            <el-form-item label="人数">
              <i class="icon-team"/>
              <span>
                {{ meeting.personLimit }}
              </span>
            </el-form-item>
            <el-form-item>
              {{ JSON.stringify(meeting) }}
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-col :span="1">
          <el-button type="primary" @click="signHandler" icon="icon-flag">
            现在报名
          </el-button>
        </el-col>
      </el-row>
    </el-col>
    <div v-else>
      <el-row type="flex" justify="center">
        <el-col :span="12" class="me-meeting" style="text-align: center;">
          <span class="title" style="color: #606266">
          暂无活动
          </span>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        meeting: {},
        cuxiao: require("@/static/img/cuxiao.png"),
        kuayue: require("@/static/img/kuayue.jpg")
      }
    },
    methods: {
      signHandler() {
        let that = this;
        if (this.user.needFill) {
          this.$message.info("个人信息需要完善");
          return;
        }
        that.$confirm("确定报名吗?").then(() => {
          that.$request({
            url: "/sign/" + that.meeting.meetingId,
            method: "post"
          }).then(res => {
            if (res.success) {
              that.$message.success("报名成功")
            }

          }).catch(() => {

          });

        })
      },
      getLatest() {
        let that = this;
        this.$request({
          url: "/meeting/latest",
          method: "get"
        }).then(res => {
          if (res.success) {
            that.loading = true;
            that.meeting = res.data;
          }
        })
      }
    },
    computed: {
      user() {
        return {
          needFill: null === this.$store.getters.user.mobile,
        }
      }
    },
    created() {
      this.getLatest()
    }
  }
</script>

<style scoped>

</style>
