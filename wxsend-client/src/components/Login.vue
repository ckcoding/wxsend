<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录 -->
      <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginrules" ref="loginFromRef">

          <!-- 账号 -->
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.name" placeholder="请输入账号" ></el-input>
        </el-form-item>

<!-- 密码 -->
         <el-form-item prop="password">
          <el-input prefix-icon="el-icon-turn-off" v-model="loginForm.password" placeholder="请输入密码" type='password' ></el-input>
        </el-form-item>


         <el-form-item  class='btns'>
          <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="loginFrom">重置</el-button>
        </el-form-item>


      </el-form>

     、
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
         loginForm: {
          name: 'admin',
          password: '123456'
        },
        loginrules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
          
          },
      }
    },methods:{

loginFrom() {
        this.$refs.loginFromRef.resetFields();
      },login(){
          this.$refs.loginFromRef.validate(async vaild=>{
              console.log(vaild)
              if(!vaild) return
       var res = await this.$http.post('login',this.loginForm)
       console.log(res);
       
          if(res.data.code !== 200) return this.$message.error('登录失败，账号或密码不正确');
          return this.$message.success('登录成功'),
          console.log(res.data.token),
          window.sessionStorage.setItem('token',res.data.token),
          this.$router.push('/home')
          })
      }
    }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns{
    display: flex;
    justify-content: flex-end;
   
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
     box-sizing: border-box;
}
</style>
