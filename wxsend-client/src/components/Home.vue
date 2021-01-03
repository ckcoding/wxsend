<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="http://kzddck.cn/image/logo.png" alt="logo" />
        <span>小程序推送管理系统</span>
      </div>
      <el-button type="info" round @click="clear">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          router
          :default-active="activePath"
        >
          <el-submenu index="‘1‘">
            <template slot="title">
              <i class="el-icon-user-solid"></i>

              <span>用户</span>
            </template>

            <el-menu-item index="users"
            @click="seveNavState('users')"
              ><template slot="title">
                <i class="el-icon-menu"></i>

                <span>用户数据</span>
              </template></el-menu-item
            >
          </el-submenu>

          <el-submenu index="‘2’" >
            <template slot="title">
              <i class="el-icon-s-promotion"></i>

              <span>推送</span>
            </template>

            <el-menu-item index="send"
            @click="seveNavState('send')"
              ><template slot="title">

                
      

                <i class="el-icon-menu"></i>

                <span>推送管理</span>
              </template></el-menu-item
            >
          </el-submenu>

          <el-submenu index="‘3‘">
            <template slot="title">
              <i class="el-icon-s-data"></i>

              <span>数据</span>
            </template>

            <!-- <el-menu-item index="data"
            @click="seveNavState('data')"
              ><template slot="title"> -->
                 <el-menu-item  @click="find">
                        <template slot="title">
                <i class="el-icon-menu"></i>

                <span>数据汇总</span>
              </template></el-menu-item
            >
          </el-submenu>

          <el-submenu index="‘4‘">
            <template slot="title">
              <i class="el-icon-s-tools"></i>

              <span>设置</span>
            </template>

            <!-- <el-menu-item index="setting"
            @click="seveNavState('setting')"
              ><template slot="title"> -->

                 <el-menu-item  @click="find">
                        <template slot="title">
                <i class="el-icon-menu"></i>

                <span>个人中心</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      activePath: [],
    };
  },
  created() {
    //this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    clear() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
     find() {
       this.$message('抱歉，此功能我们正在紧急开发中，敬请期待');

      },
    // async getMenuList() {
    //   const { data: res } = await this.$http.get("messages");

    //   if (res.msg.code === 200) {
    //     this.menulist = res.data;
    //     console.log(res.data);
    //   } else {
    //     return;
    //   }
    // },
    seveNavState(activePath) {
      console.log(activePath);

      window.sessionStorage.setItem("activePath", activePath);

      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;

  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 25px;
    }
    span {
      color: #fff;
      margin-left: 25px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home_container {
  height: 100%;
}
</style>