<template>
  <div id="app">
      <Toast></Toast>
      <Dialog >
      <h1>提示</h1>
      <p>您还未填写收货地址信息,请先添加地址</p>
    </Dialog>
    <router-view></router-view>
  </div>
</template>

<script>
import Footer from '@/components/footer/footer'
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  components:{
    Footer
  }
}
</script>

<style>
</style>
