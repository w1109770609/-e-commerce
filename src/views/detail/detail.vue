<template>
  <div class="detail">
    <p><img :src="this.$route.query.imgUrl" alt=""></p>
    <div>
      <h3>{{this.$route.query.price}}</h3>
      <span>加入购物车</span>
      <span class="iconfont icon-shopcar"></span>
    </div>
  </div>
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

<style lang="scss" scoped>
  .detail{
    width:100%;
    height:100%;
    p{
      text-align: center;
      img{
        width: 80%;
      }
    }
    div{
      padding-left: 10%;
      padding-top: 20px;
      color:crimson;
      font-size: .4rem;
    }
  }
</style>
