<template>
  <div class="shopcar">
    shopcar
    <h1>实验路由</h1>
  </div>
</template>

<script>
import {getCookie} from '@/until/cookie.js';
export default {
  data() {
    return {

    }
  },
  mounted(){
    this.$http.post('/api/shoplist',{token:getCookie('keyword')}).then(res=>{
      if(res.code===0){
        this.$router.push({
          name:'login',
          query:{
            from:'shopcar'
          }
        })
      }else{
        console.log(res)
      }
    })
  }
}
</script>

<style scoped>
</style>
