<template>
  <div>
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-col :span="16">
        <el-timeline>
          <el-timeline-item v-for="item in meetings" :key="item.name" :timestamp="item.time" placement="top">
            <card-meeting  :meeting="item" />
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CardMeeting from "@/components/meeting/CardMeeting";

  export default {
    name: "AllMeetings",
    components: {
      CardMeeting
    },
    data() {
      return {
        meetings: [
          {name: "活动1", time: "2019年1月2日"},
          {name: "活动2", time: "2019年1月1日"}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
