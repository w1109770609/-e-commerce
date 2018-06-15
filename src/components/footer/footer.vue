<template>
  <footer class="footer">
    <ul>
      <router-link tag="li" :to="{name:'home'}">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link tag="li" :to="{name:'classify'}">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </router-link>
      <li>
        <i class="iconfont icon-msg"></i>
        <span>社交</span>
      </li>
      <router-link tag="li" :to="{name:'shopcar'}">
        <i class="iconfont icon-shopcar"></i>
        <span>购物车</span>
      </router-link>
      <router-link tag="li" :to="{name:'mine'}">
        <i class="iconfont icon-mine"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </footer>
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

<style src="./footer.css">
</style>
