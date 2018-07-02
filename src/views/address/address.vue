<template>
    <div class="adr_box">
      <div class="address_title">
          <span class="iconfont icon-xiangzuo"></span><h3>收货地址</h3>
      </div>
      <div  class="address_no" v-show="$store.state.address.length==0">
          <h3 class="adr_h3">您还没有添加地址哦~~~</h3>
      </div>
       <div class="address_list" v-for="(item,index) in $store.state.address" :key="index">
         <AddressItem :item="item"></AddressItem>
      </div>
      <div class="adr_btn">
         <button @click="adrFn">+新增地址</button>
      </div>
      <Dialog ref="dia"></Dialog>
    </div>
</template>
<script>
import { getCookie } from "@/until/cookie";
import AddressItem from '@/components/addressItem/addressItem'
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.$store.dispatch('fetch_address')
  },
  components:{AddressItem},
  methods: {
    adrFn() {
      this.$router.push({
        name: "addaddr"
      });
    }
  }
};
</script>
<style scoped>
  @import './address.css';
</style>


