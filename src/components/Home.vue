<template>
<el-container class="home_container">
    <el-header class="home_header">
         <el-button icon="iconfont icon-icon-test5" size="mini" @click="toggle()" circle></el-button>
         <span class="title">smallshop后台管理</span>
          <el-button class="logout" type="danger" round @click="logout()" >退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="home_aside" :width="collapse?'65px':'180px'">
 <el-menu router :collapse="collapse" :unique-opened="true" :collapse-transition="false" background-color="#333744"  text-color="#fff"
        active-text-color="#ffd04b" style="border:none; margin-top:5px " >
         <!-- 一级菜单 -->
          <el-submenu :index="item.id" v-for="item in menus" :key="item.id">
           <template slot="title">
             <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
          </template>
                <!-- 二级菜单 -->
          <el-menu-item v-for="lastItem in item.children" :index="lastItem.path" :key="lastItem.id">
              <span><i class="iconfont icon-icon-test5"></i></span>
              {{lastItem.authName}}
              </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>

</template>

<script>
    export default {
        data() {
            return{
                 collapse:false,
                 menus:[],
                 iconArr:['icon-user-fill','icon-cog','icon-shoppingcart','icon-file','icon-chart-area']
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            toggle() {
                this.collapse = !this.collapse
            },
            async getData() {
                //this.$http.get('menus').then(res=>console.log(res.data) )
                const {data:{data,meta}} = await this.$http.get('menus') 
                if(meta.status !== 200) return this.$message.error('失败')
                this.menus = data

            },
            logout(){
                sessionStorage.removeItem('token')
                this.$router.push('/login')
            }
        }
    }
</script>

<style  scoped>
    .home_container{
        height: 100%;
    }
    .home_header {
        background: #373D41;
        line-height: 60px;
    }
    .home_aside{
        background: #333744
    }
    .home_main {
        background: #EAEDf1
    }
    .title {
        color:#ccc;
        font-size: 18px;
        padding-left: 20px;
    }
    .logout {
        float: right;
        margin-top: 15px;
    }
</style>