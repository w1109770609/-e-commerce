<template>
  <div class="page">
    <section>
      <Ordertit>我的订单</Ordertit>
      <div class="address_l">
        <div class="address" v-show="flagAddress">
          <p><strong>路飞</strong> <span>15735173622</span></p>
          <p>北京市海定区知春路北京市海定区知春路北京市海定区知春路</p>
        </div>
        <div class="add">
          请添加您的收货地址
        </div>
      </div>
      <div class="shoplist">
        <ComputedShops :flags="flag" v-for="(item,index) in $store.state.computedL" :key="index" :item="item"></ComputedShops>
      </div>
      <div class="totalMoney">
        <p><span>商品总金额：</span><span>{{this.totalSum}}</span></p>
        <p><span>运费：</span><span>￥{{freight}}.00</span></p>
        <p><span>总额(含运费)</span><strong>{{this.totalSum*1+freight}}</strong></p>
      </div>
      <div class="payment">
        <div>
          <span>余额支付￥{{payment.balance}}.00</span><Cricle @upFlag="upFlag" name="balance"></Cricle>
        </div>
        <div>
          <span>奖金支付￥{{payment.bonus}}.00</span><Cricle @upFlag="upFlag" name="bonus"></Cricle>
        </div>
      </div>
    </section>
    <div class="submit">
      <span @click="subShops">提交订单</span>
    </div>
  </div>
</template>

<script>
import ComputedShops from '@/components/computedShops/computedShops';
import Ordertit from '@/components/ordertit/ordertit';
import Cricle from '@/components/cricle/cricle';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      flagAddress: false,
      flag: false,
      msg: '',
      freight: 10,
      payment:{
        balance:1000,
        bonus:100
      },
      total:0
    };
  },
  computed: {
    ...mapState(['totalSum']),
  },
  methods:{
    subShops(){
      if(!this.flagAddress){

        // this.dialog.$emit('upDialog',{
        //   flag:true,
        //   btnArr:[{att:'close',txt:'取消'},{att:'add',txt:'去添加'}],
        //   middle:true
        // })
        // this.flagAddress=true
      }
      if(this.total>this.$store.state.totalSum){
        alert(23)
      }
    },
    sureF(){
      this.flagAddress = true
    },
    upFlag(val){
      let {flag,name} = val;
      switch(name){
        case 'balance':
          if(flag){
            this.total += this.payment.balance
          }else{
            this.total =this.total-this.payment.balance
          }
          break;
        case 'bonus':
          if(flag){
            this.total += this.payment.bonus
          }else{
            this.total =this.total-this.payment.bonus
          }
          break;
      }
    }
  },
  components: {
    ComputedShops,
    Ordertit,
    Cricle,
  },
  mounted() {
    this.$store.dispatch('fetch_list');
  },
};
</script>

<style lang="scss" scoped>
.page {
  color: #666;
  height:100%;
  display: flex;
  flex-direction: column;
}
section{
  flex:1;
  overflow-y: scroll;
}
.address_l {
  padding: 0 0.2rem;
}
.address {
  p {
    padding: 0.1rem 0;
  }
}
.add {
  padding: 0.3rem 0;
}
.totalMoney {
  padding: 0 0.3rem;
  border-bottom: 4px solid #ccc;
  p {
    display: flex;
    line-height: 2;
    color: #666;
    justify-content: space-between;
    strong {
      color: red;
    }
  }
}
.payment {
  padding: 0 0.3rem;
  & > div {
    display: flex;
    height: 0.9rem;
    justify-content: space-between;
    align-items: center;
  }
}
.submit {
  height: 1rem;
  span {
    float: right;
    width: 2.4rem;
    height: 100%;
    background: #ff3333;
    text-align: center;
    line-height: 1rem;
    color: #fff;
  }
}
</style>
