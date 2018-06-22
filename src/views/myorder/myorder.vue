<template>
  <div class="order">
    <Ordertit>我的订单</Ordertit>
    <div class="list">
      <ol>
        <router-link tag="li" :to="{name:'allorder'}" router-link-active="active" >全部</router-link>
        <router-link tag="li" :to="{name:'obligation'}" router-link-active="active" >代付款</router-link>
        <router-link tag="li" :to="{name:'ungoods'}" router-link-active="active" >待发货</router-link>
        <router-link tag="li" :to="{name:'goods'}" router-link-active="active" >待收货</router-link>
        <router-link tag="li" :to="{name:'aftersale'}" router-link-active="active" >售后</router-link>
      </ol>
    </div>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Ordertit from '@/components/ordertit/ordertit'
export default {
  data() {
    return {

    }
  },
  components: {
    Ordertit
  }
}
</script>

<style lang="scss" scoped>
  .order{
    color:#666;
  }
  .list{
    height:.9rem;
    ol{
      height:100%;
      display: flex;
      li{
        flex:1;
        text-align: center;
        line-height: .9rem;
        &.active{
          color:#fc4141;
          border-bottom: 1px solid #fc4141;
        }
      }
    }
  }

</style>
