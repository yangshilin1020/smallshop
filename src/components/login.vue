<template>
    <div class="login_container">   
        <div class="box">
            <div class="auer">
                <h1>欢迎登陆</h1>
            </div>
        <div id="login">
            <el-form :model="form" ref="form" :rules="rules">
           <el-form-item prop="username" >
               <el-input prefix-icon="iconfont icon-icon-test4" placeholder="用户名" value="admin" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" >
            <el-input type="password" prefix-icon="iconfont icon-icon-test"  placeholder="密码" value="123456" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item class="rrr">
            <el-button type="primary" @click="submit()">登录</el-button>
           <el-button>重置 </el-button>
 
    </el-form-item>
    </el-form>
        </div>
          
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return{
            form:{
                username:'admin',
                password:'123456'
            },
              rules:{
                  username:[
                      { required: true, message: '请输入用户名', trigger: 'blur'}
                  ],
                  password:[
                       { required: true, message: '请输入密码', trigger: 'blur'},
                       { min:5, max:15, message: '密码长度在 5 到 15 个字符', trigger: 'blur' }
                  ]
         }
        }
      
    },
    methods :{
        submit(){
            this.$refs.form.validate(async valid=>{
                if(valid) {
                    // this.$http.post('login',this.form)
                    // .then(res=>{
                    //     console.log(res)
                    // })       
                    const {data:{data,meta}} = await this.$http.post('login',this.form)
                    if(meta.status!== 200)   return this.$message.error(meta.msg);
                    sessionStorage.setItem('token',data.token)
                    this.$router.push('/home')
                    
                }
            })
        }
    }
}
</script>

<style scoped>
.login_container{
    width: 100%;
    height: 100%;
    background:linear-gradient(45deg,#ccc,#105763);
}
.login_container .box {
    width:400px;
    height:250px;
    box-shadow: 0 0 10px #eee;
    position : absolute ;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
     background:linear-gradient(45deg,#D2ECF1,#efefef);
     padding: 0 16px;
     box-sizing: border-box;
}
#login {
    margin-top: 40px
}
.auer {
    text-align: center
}
.rrr {
    text-align: center
}
</style>