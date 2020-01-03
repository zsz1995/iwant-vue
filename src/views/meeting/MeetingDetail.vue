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

    <el-row type="flex" justify="center" style="height: 300px">
      <el-col :span="16">
        <el-amap ref="map" vid="amapDemo"
                 :amap-manager="amapManager"
                 :center="center" :zoom="zoom" :plugin="plugin"
                 :events="events" class="amap-demo">
          <el-amap-marker :position="marker.position" :events="marker.events"
                          :visible="marker.visible" :draggable="marker.draggable"/>
        </el-amap>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import VueAMap from "vue-amap";

  let amapManager = new VueAMap.AMapManager();
  export default {
    name: "MeetingDetail",
    data() {
      return {
        meeting: {},
        marker:
        {
          position: [116.999825, 36.662524],
          events: {
            click: () => {
              alert('click marker');
            },
            dragend: (e) => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>',
        },
        amapManager, zoom: 19,
        center: [116.999825, 36.662524],
        events: {
          init: (o) => {
            o.getCity(result => {
              console.log(result)
            })
          },
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e) => {
            console.log(e, 'map clicked');
          }
        },
        plugin: ['ToolBar', {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }]
      };
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
