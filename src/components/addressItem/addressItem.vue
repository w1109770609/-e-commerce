<template>
  <div>
    <div class="adr_top" @click="select_addr(item.name)">
      <p class="adr_user"><span>{{item.name}}</span><span>{{item.phone}}</span></p>
      <h3 class="user_adr">{{item.privince}}{{item.city}}{{item.aren}}</h3>
      <h3>详细地址：{{item.address}}</h3>
    </div>
    <div class="edit">
        <label for=""><input type="checkbox" class="moren" />默认</label>
        <p>
          <span class="iconfont icon-bianji"></span><span>编辑</span>
          <span class="iconfont icon-shanchu"></span><span>删除</span>
        </p>
    </div>
  </div>
</template>

<script>
import {getCookie} from '@/until/cookie.js'
export default {
  props:['item'],
  data() {
    return {

    }
  },
  methods:{
    select_addr(name){
      this.$http.post('/api/selectAddr',{
        token:getCookie('keyword'),
        name
      }).then(res=>{
        if(res.code==0){
          this.$toast.$emit('activeShow',res.msg)
          this.$router.push({
            name:'login',
            query:{
              from:'address'
            }
          })
        }else{
          this.$store.commit('last_address',res.msg);
          this.$router.push({
            name:'resultOrder'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
