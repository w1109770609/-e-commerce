<template>
  <header>
    <span @click="gohistory">回退</span>
<span><slot></slot></span><span class="iconfont icon-msg"></span>
  </header>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    gohistory(){
      this.$router.history.go(-1)
    }
  }
}
</script>

<style scoped>
  header{
    color:#666;
    height:.9rem;
    background: #fafafb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .4rem;
  }
</style>
