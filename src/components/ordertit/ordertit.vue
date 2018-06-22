<template>
  <header>
    <router-link tag="span" to="/index/mine">回退</router-link><span><slot></slot></span><span class="iconfont icon-msg"></span>
  </header>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

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
