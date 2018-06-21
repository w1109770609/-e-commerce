<template>
   <div class="login">
     <header>
       <span></span><span>登录717</span><b @click="goToRegister">去注册</b>
     </header>
    <div class="form">
      <p><span class="iconfont icon-fangdajing"></span><input type="text" v-model="username" placeholder="请输入手机号"></p>
      <p><span class="iconfont icon-msg"></span><input type="text" v-model="password" placeholder="请输入密码"></p>
      <div><button @click="goToLogin">登陆</button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    goToRegister(){
      this.$router.push('/register')
    },
    goToLogin(){
      let phoneReg = /^1[3578]\d{9}$/;
      if(!phoneReg.test(this.username)){
        alert('请输入正确手机号');
        return;
      }
      let pwdReg = /\d{6,}/;
      if(!pwdReg.test(this.password)){
        alert('请输入正确格式的密码');
        return;
      }
      this.$http.post('/api/login',{
        username:this.username,
        password:this.password
      }).then(res=>{
        if(res.code===1){
          document.cookie = `keyword=${res.token}`;
          this.$router.push({
            name:this.$route.query.from || 'home'
          })
        }else{
          console.log(res.msg)
        }

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    height:1.4rem;
    background:#F4F4F4;
    padding: 0 .2rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    span{
      font-size: .4rem;
    }
    b{
      color:#FB4141;
    }
  }
  .form{
    padding: 0 .2rem;
    p{
      height:1.2rem;
      line-height: 1.2rem;
      display: flex;
      margin-top: .1rem;
      font-size: .3rem;
      border-bottom:1px solid #eee;
      label{
        width:1.2rem;
        color:#333333;
      }
      input{
        flex:1;
        border:0;
        padding-left: .2rem;
      }
    }
    div{
      text-align: center;
      padding-top: 20px;
      button{
        width:75%;
        height:1.1rem;
        color:#fff;
        border:0;
        background: #FB4141;
        border-radius: 40px;
      }
    }
  }
</style>
