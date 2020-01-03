<template>
    <meeting-detail :meeting="meeting"/>
</template>

<script>
  import MeetingDetail from "@/components/meeting/MeetingDetail";
  export default {
    components: {
      MeetingDetail
    },
    data() {
      return {
        meeting: {
          name: "好吃的汉堡"
        }
      }
    }
  }
</script>

<style scoped>

</style>
