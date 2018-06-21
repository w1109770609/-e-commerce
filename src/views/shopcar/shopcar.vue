<template>
  <div class="shopcar">
    <header>
      <span></span><span>购物车</span><strong @click="writes">{{msg}}</strong>
    </header>
    <Toast></Toast>
    <div class="shopList">
      <ComputedShops :flags="flag" v-for="(item,index) in $store.state.computedL" :key="index" :item="item"></ComputedShops>
    </div>
    <div class="footer">
      <div class="left">全选:<span @click="selectedAll" :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'"></span></div>
      <div class="right" v-show="footerShow">
          <div class="total">
              <span>总计:${{$store.state.totalSum}}.00</span>
              <span>(含运费)</span>
          </div>
          <div class="submit">
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
        })
      }
    }
  },
  mounted(){
    this.$store.dispatch('fetch_list')
  }
}
</script>

<style scoped>
  header{
    height:.9rem;
    font-size: .35rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 0 .2rem;
    color:#666;
  }
  .shopcar{
    height:100%;
    display: flex;
    flex-direction:column;
  }
  .shopList{
    flex:1;
    overflow-y: scroll;
  }
 .footer{
    height:1rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .delete{
    width:2rem;
    background: #F71919;
    height:100%;
    color:#fff;
    text-align: center;
    line-height: 1rem;
  }
  .right{
    display:flex;
    height:100%;
  }
  .total{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding-right:10px;
  }
  .total span:nth-child(1){
    color:#F71919;
  }.total span:nth-child(2){
    color:#ccc;
  }
  .submit{
    width:100px;
    text-align:center;
    line-height:45px;
    background:#FB4141;
    color:#fff;
  }
</style>
