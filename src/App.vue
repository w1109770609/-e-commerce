<template>
  <div id="app">
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
