<template>
 <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>推送</el-breadcrumb-item>
      <el-breadcrumb-item>推送管理</el-breadcrumb-item>
    </el-breadcrumb>
      <el-card>
  <!-- 用户列表 -->


     <el-form   label-width="120px"  size="small"  >
  <el-form-item label="标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>

    <el-form-item label="内容">
    <el-input v-model="form.smg"></el-input>
  </el-form-item>

    <el-form-item label="时间">
    <el-input v-model="form.time"></el-input>
  </el-form-item>


    <el-form-item label="备注">
    <el-input v-model="form.tips"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="send">推送</el-button>
    <el-button>重制</el-button>
  </el-form-item>
</el-form>

 </el-card>
 </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '广州到北京',
          smg: '北京到广州',
          time: '2020-01-01',
          tips: '2020-01-02'
        }
      }
    },
    methods: {
     send(){
   this.$http.post('send',this.form)
       console.log(res);
       console.log(res.data)
          if(res.data.code !== 200) return this.$message.error('登录失败，账号或密码不正确');
          return this.$message.success('登录成功'),
          console.log(res.data)
      
      }
  }}
</script>
<style lang="less" scoped>
.el-form{
    margin: auto;
    width: 60%;
    padding: 100px;
    .el-form-item{
        font-size: 12px;
        padding: 20px;
        .el-button{
         margin-left: 50px;
          margin-right: 50px;
            width: 80px;
            height: 30px;
            border-radius: 12px;
        }
    }
    
}
</style>