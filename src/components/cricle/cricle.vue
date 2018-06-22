<template>
  <div class="cricle" @click="tabClass">
    <span :class="[flag?'active':'']"></span>
  </div>
</template>

<script>
export default {
  props:['name'],
  data() {
    return {
      flag:false
    }
  },
  methods: {
    tabClass(){
      this.flag = !this.flag;
      this.$emit('upFlag',{
        flag:this.flag,
        name:this.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .cricle{
    width:1.4rem;
    height:.7rem;
    border-radius: 26px;
    border:1px solid #ccc;
    position: relative;
    span{
      position: absolute;
      top:0;
      left:0;
      width:.7rem;
      height:.7rem;
      border-radius: 50%;
      border:2px solid #eee;
      transition: .5s;
      &.active{
        transform: translateX(100%);
        background: limegreen;
      }
    }
  }
</style>
