<template>
  <p class="toastItem" v-show="flag"><slot></slot></p>
</template>

<script>
export default {
  props:['timeout'],
  data() {
    return {
      flag:false
    }
  },
  mounted(){
    this.flag = true
    setTimeout(() => {
      this.flag = false
    }, this.timeout.timeout);
  }
}
</script>

<style scoped>
</style>
