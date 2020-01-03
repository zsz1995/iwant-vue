<template>
  <div class="all-meeting">
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-col :span="16">
        <el-timeline>
          <card-meeting v-for="item in meetings" :key="item.name" :meeting="item"/>
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
        page: 1,
        limit: 5,
        meetings: []
      }
    },
    methods: {
      getAllMeetings() {
        let that = this;
        this.$request({
          url: "/meeting/all",
          method: "get",
          data: JSON.stringify({
            page: that.page,
            limit: that.limit
          })
        }).then( res => {
          if (res.success) {
            that.meetings = res.data;
          }
        })
      }
    },
    created() {
      this.getAllMeetings()
    }
  }
</script>

<style scoped>

</style>
