<template>
  <div class="paysuccess">
    <Oredertit>订单支付成功</Oredertit>
    {{$store.state.totalSum}}
  </div>
</template>

<script>
import jwt from 'jsonwebtoken';
import Oredertit from '@/components/ordertit/ordertit'
export default {
  data() {
    return {

    }
  },
  components: {
    Oredertit
  },
  created(){
    console.log(JSON.parse(sessionStorage.getItem('paytotal')))
  }
}
</script>

<style scoped>
</style>
