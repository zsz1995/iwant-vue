<template>
  <div>
    <el-form ref="userForm" :rules="rules" :model="formData" label-width="120px" size="mini">
      <el-row>
        <el-col :span="13" :xs="20">
          <el-row>
            <el-col :span="12" :xs="20">
              <el-form-item label="真实姓名" class="is-required" prop="realname">
                <el-input clearable v-model="formData.realname" placeholder="真实姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="身份证号码" class="is-required" prop="idno">
                <el-input clearable v-model="formData.idno" placeholder="身份证号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="手机号码" class="is-required" prop="mobile">
                <el-input clearable v-model="formData.mobile" placeholder="手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="邮箱" class="is-required" prop="email">
                <el-input clearable v-model="formData.email" placeholder="邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="志愿者编号">
                <el-input clearable v-model="formData.volunteerNo" placeholder="志愿者编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="所在城市" class="is-required" prop="city">
                <el-cascader :options="dict.city" v-model="formData.city" separator=","
                             placeholder="请选择城市"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="职务" class="is-required" prop="job">
                <el-input clearable v-model="formData.job" placeholder="职务"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="职称" class="is-required" prop="jobLevel">
                <el-select clearable v-model="formData.jobLevel" placeholder="请选择职称" value="其他">
                  <el-option v-for="item in dict.jobLevel" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="学历">
                <el-select clearable v-model="formData.education" placeholder="请选择学历" value="其他">
                  <el-option v-for="item in dict.education" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="20">
              <el-form-item label="专业">
                <el-input clearable v-model="formData.special" placeholder="专业"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16">
              <el-form-item label="">
                <avatar-upload :avatar="avatarUrl">
                </avatar-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
      <el-col :span="15" :xs="20">
        <el-form-item label="工作单位" class="is-required" prop="workPlace">
          <el-input clearable v-model="formData.workPlace" placeholder="工作单位"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="15" :xs="20">
        <el-form-item label="通讯地址">
          <el-input clearable v-model="formData.address" placeholder="通讯地址"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="15" :xs="20">
        <el-form-item label="擅长专题">
          <el-input type="textarea" maxlength="120" show-word-limit v-model="formData.skill"
                    placeholder="擅长专题"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="15" :xs="20">
        <el-form-item label="希望提高哪方面的能力">
          <el-input type="textarea" maxlength="120" show-word-limit v-model="formData.improve"
                    placeholder="希望提高哪方面的能力"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="7">
        <el-form-item>
          <el-button @click="save" size="mini" type="primary">
            保存
          </el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import AvatarUpload from "@/components/upload/AvatarUpload"
  import {validateIdNo, validatePhone} from "@/utils/validate";
  import {getUserInfo} from "@/api/user";
  import dict from "@/utils/dict"

  export default {
    components: {
      AvatarUpload
    },
    data() {
      return {
        avatarUrl: "",
        formData: {
          realname: "",
          idno: "",
          volunteerNo: "",
          city: "",
          workPlace: "",
          job: "",
          jobLevel: "",
          education: "",
          special: "",
          email: "",
          mobile: "",
          address: "",
          skill: "",
          improve: "",
        },
        rules: {
          realname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          idno: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {validator: validateIdNo, trigger: "blur"}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: validatePhone, trigger: "blur"}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          job: [
            {required: true, message: '请输入职务', trigger: 'blur'},
          ],
          jobLevel: [
            {required: true, message: '请选择职称', trigger: 'blur'},
          ],
          city: [
            {required: true, message: '请选择所在城市', trigger: 'blur'},
          ],

          workPlace: [
            {required: true, message: '请输入工作单位', trigger: 'blur'},
          ]

        },
        dict: dict
      }
    },
    methods: {
      save() {
        let that = this;
        that.$refs["userForm"].validate(valid => {
          if (valid) {
            let data =that.formData;
            let city = that.formData.city;
            data.city = (city instanceof Array ) && city.length > 0 ? city.join(",") : city;
            that.$request({
              url: "/user/save",
              method: "post",
              data: data
            }).then(res => {
              if (res.success) {
                that.$message.success("保存成功")
              }
            })


          }
        })
      },
      initUserInfo() {
        let that = this;
        getUserInfo().then(res => {
          if (res.success && res.data != null) {
            let data = res.data;
            data.city = data.city.split(",");
            that.formData = res.data;
            that.avatarUrl = data.avatar;
          }
        })
      }
    },
    created() {
      this.initUserInfo()
    }
  }
</script>

<style scoped>
</style>
