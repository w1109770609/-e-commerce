<template>
  <div class="mine">
      <header @click="out">我的717商城</header>
      <div class="tit">
        <img src="../../../static/mine/1.gif" alt="">
      </div>
      <div class="myshop">
        <i class="iconfont icon-shop" style="font-size:.8rem"></i>
        <span style="font-size:.5rem;padding-left:.5rem;">我的店铺</span>
      </div>
      <div class="list">
        <ol>
          <li>
            <i class="iconfont icon-fukuan"></i>
            <span>待付款</span>
          </li>
          <li>
            <i class="iconfont icon-fahuo"></i>
            <span>代发货</span>
          </li>
          <li>
            <i class="iconfont icon-shouhuo"></i>
            <span>待收货</span>
          </li>
          <li>
            <i class="iconfont icon-shouhou"></i>
            <span>售后</span>
          </li>
          <li @click="goMyOrder">
            <i class="iconfont icon-dingdan"></i>
            <span>我的订单</span>
          </li>
        </ol>
      </div>
      <div class="Management">
          <p>账户余额</p>
          <p>地址管理</p>
          <p>我的客服</p>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods:{
    goMyOrder(){
      this.$router.push({
        name:'myorder'
      })
    },
    out(){
      this.$router.push({
        name:'login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    height:.9rem;
    color:#666;
    text-align: center;
    line-height: .9rem;
  }
  .tit{
    text-align: center;
    background: #FB5642;
    padding: .2rem 0;
    img{
      width:1.46rem;
      height:1.46rem;
    }
  }
  .myshop{
    padding-left: .2rem;
  }
  .list{
    border-bottom: 4px solid #ccc;
    ol{
      width: 100%;
      display: flex;
      li{
        flex:1;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: .2rem 0;
        color:#666;
      }
    }
  }
  .Management{
    padding-left: .3rem;
    color:#666;
    border-bottom: 4px solid #ccc;
    p{
      height:1rem;
      line-height:1rem;
      border-bottom: 1px solid #ccc;
    }
  }

</style>
