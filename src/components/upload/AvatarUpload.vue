<template>
  <el-upload
  class="avatar-uploader"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  accept="image/jpeg"
  action=""
  :http-request="uploadAvatar"

  >
    <img v-if="imageUrl || avatar" :src="imageUrl || avatar" class="avatar" alt="">
    <span v-else>
        <i class="el-icon-plus avatar-uploader-icon">
        </i>
        <br>
        <span class="avatar-desc">
          照片
        </span>
      </span>

  </el-upload>
</template>


<script>
  export default {
    name: "AvatarUpload",
    props: {
      avatar: String
    },
    data() {
      return {
        imageUrl: "",
      };
    },
    methods: {
      uploadAvatar(option) {
        let fileReader = new FileReader();
        let file = option.file;
        if (file) {
          fileReader.readAsDataURL(file)
        }
        let that = this;
        fileReader.onload = () => {
          that.imageUrl = fileReader.result;
          this.$request({
            url: "/user/avatar",
            method: "post",
            data: {
              avatar: that.imageUrl
            }
          }).then(res => {
            if (res.success) {
              that.$store.commit("SET_AVATAR", that.imageUrl);
            }
          })

        };


      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader i {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar-uploader .avatar-desc {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 170px;
    display: block;
  }
</style>
