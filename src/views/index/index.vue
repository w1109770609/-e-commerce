<template>
  <div class="index-box">
    <div class="content">
        <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/footer/footer';
export default {
  data() {
    return {

    }
  },
  components: {
      Footer
  }
}
</script>

<style src="./index.css">
</style>
