<template>
  <div class="swiper-slide">
    <img :src="imgInd" />
  </div>
</template>

<script>
export default {
  props:['imgInd'],
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
  img{
    width:100%;
    height:3.5rem;
  }
</style>
