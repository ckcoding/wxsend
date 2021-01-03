<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户数据</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->

    <el-card>
      <el-row :gutter="50">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
          </el-input>
        </el-col>
        <el-col :span="4"
          ><el-button type="primary" round @click="find">搜索</el-button></el-col
        >
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="userlist" border stripe>
           <el-table-column type='index' label="序号" >
        </el-table-column>
        <el-table-column :data="user" prop="openid" label="用户opened">
        </el-table-column>
        <el-table-column prop="number" label="剩余次数"> 
        </el-table-column>
         <!-- <el-table-column prop="id" label="是否开启推送"> 
        </el-table-column> -->
         <el-table-column prop="time" label="注册时间"> 
        </el-table-column>
      </el-table>
   
 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=" queryInfo.pagenum"
      :page-sizes="[10, 20,30]"
      :page-size='queryInfo.pagenum'
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">

    </el-pagination>


    </el-card>
  </div>
</template>


 <script>
    export default {
      data() {
        return {
             
        userlist:[],
          queryInfo:{
              query:'',
              //显示多少条
              pagesize:10,
              //页数
              pagenum:1,
             
          },total:0
        }
      },
        created() {
    this.getUserList();
     
    
  },
  methods: {

      async getUserList() {
      const { data: res } = await this.$http.get("users");
      if (res.msg.code === 200) {
        this.userlist = res.data;
        this.total = res.data.length
        
        //console.log(res.data.length);
      } else {
        return;
      }
    },
      handleSizeChange(newsize) {
        this.queryInfo.pagesize = newsize
        console.log(this.queryInfo.pagesize);
       
        
        this.getUserList()
      //  this.queryInfo.pagesize

      },
      find() {
       this.$message('抱歉，搜索接口我们正在开发中，敬请期待');

      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
      }
    },
    }
  </script>
<style lang='less' scoped>
.el-table{
    margin-top: 20px;
    font-size: 12px;
    
}.el-pagination{
     margin-top: 20px;
    font-size: 12px;
}

</style>
