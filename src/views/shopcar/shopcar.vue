<template>
  <div class="shopcar">
    <header>
      <span></span><span>购物车</span><strong @click="writes">{{msg}}</strong>
    </header>
    <Toast></Toast>
    <div class="shoplist">
      <ComputedShops :flags="flag" v-for="(item,index) in $store.state.computedL" :key="index" :item="item"></ComputedShops>
    </div>
    <div class="footer">
      <div class="left">全选:<span @click="selectedAll" :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'"></span></div>
      <div class="right" v-show="footerShow">
          <div class="total">
              <span>总计:${{$store.state.totalSum}}</span>
              <span>(含运费)</span>
          </div>
          <div class="submit" @click="upOrder">
              提交订单
          </div>
      </div>
      <div class="right" v-show="!footerShow">
        <span class="delete" @click="deleted">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from '@/until/cookie.js';
import {mapState} from 'vuex'
import ComputedShops from '@/components/computedShops/computedShops'
import Bus from '@/until/bus'
export default {
  data() {
    return {
      footerShow:true,
      flag:false,
      msg:'编辑'
    }
  },
  components:{ComputedShops},
  methods:{
    upOrder(){
      this.$http.post('/api/shoplist',{
        token:getCookie('keyword')
      }).then(res=>{
        this.$router.push({
          name:'resultOrder',
          params:{
            cons:res.msg
          }
        })
      })
    },
    writes(){
      if(this.msg == '编辑'){
        this.msg = '完成'
      }else{
        this.msg = '编辑'
      }
      this.footerShow = !this.footerShow
    },
    selectedAll(){
      this.flag = !this.flag
    },
    deleted(){
      if(confirm('确定要删除吗?')){
        this.$store.commit('deleted')
        this.$http.post('/api/delete',{
          token:getCookie('keyword'),
          content:this.$store.state.computedL
        }).then(res=>{
          this.$toast.$emit('activeShow','删除成功')
          if(res.code===1){
            this.$store.dispatch('fetch_list')
          }
        })
      }
    }
  },
  mounted(){
    this.$store.dispatch('fetch_list')
  }
}
</script>

<style scoped src="./shopcar.css">
</style>
