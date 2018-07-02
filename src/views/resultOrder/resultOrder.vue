<template>
  <div class="page">
    <transition name="pay">
      <div class="payment_sure" v-show="pay_flag">
        <div class="paymentL">
          <div class="tit">
            <span @click="pay_flag=false">X</span>
            <span>付款详情</span>
            <span></span>
          </div>
          <div class="payList">
            <p><span>余额支付</span><span>￥{{balance}}.00</span></p>
            <p><span>奖金支付</span><span>￥{{bonus}}.00</span></p>
            <p><span>总计</span><strong>￥{{balance+bonus}}.00</strong></p>
          </div>
          <div class="sures">
            <button @click="sure_pay">确认付款</button>
          </div>
        </div>
      </div>
    </transition>
    <section>
      <Ordertit>我的订单</Ordertit>
      <div class="address_l">
        <div class="address" v-show="$store.state.address_l['name']" @click="addaddr">
          <AddressItem :item="$store.state.address_l"></AddressItem>
        </div>
        <div class="add" v-show="!$store.state.address_l['name']" @click="addAddress">
          请添加您的收货地址
        </div>
      </div>
      <div class="shoplist">
          <!-- computedL -->
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
      <p>
        <strong>总计:{{this.total}}.00</strong>
        <span @click="subShops">提交订单</span>
      </p>
    </div>
  </div>
</template>

<script>
import ComputedShops from '@/components/computedShops/computedShops';
import AddressItem from '@/components/addressItem/addressItem';
import Ordertit from '@/components/ordertit/ordertit';
import Cricle from '@/components/cricle/cricle';
import {mapState} from 'vuex';
import {getCookie} from '@/until/cookie';
export default {
  data() {
    return {
      pay_flag:false,
      flagAddress: false,
      flag: false,
      msg: '',
      freight: 10,
      payment:{
        balance:1000,
        bonus:100
      },
      balance:0,
      bonus:0,
      total:0,
      computedL:[]
    };
  },
  computed: {
    ...mapState(['totalSum']),
  },
  methods:{
    addaddr(){
      this.$router.push({
        name:'address'
      })
    },
    addAddress(){
      this.$router.push({
        name:'address'
      })
    },
    sure_pay(){
      sessionStorage.setItem('paytotal',JSON.stringify({total:this.$store.state.totalSum,balance:this.balance,bonus:this.bonus}))
      this.$router.push({
        name:'paysuccess'
      })
    },
    subShops(){
      if(!this.$store.state.address_l['name']){
        this.dialog.$emit('upDialog',{
          flag:true,
          btnArr:[{att:'close',txt:'取消'},{att:'add',txt:'去添加'}],
          middle:true
        })
        return;
      }
      if(this.total>this.$store.state.totalSum){
        this.pay_flag = true
      }else{
        this.$toast.$emit('activeShow','金额不足,请选择其他方式支付!')
      }
    },
    upFlag(val){
      let {flag,name} = val;
      switch(name){
        case 'balance':
          if(flag){
            this.total += this.payment.balance;
            this.balance = this.payment.balance
          }else{
            this.total =this.total-this.payment.balance;
            this.balance = 0
          }
          break;
        case 'bonus':
          if(flag){
            this.total += this.payment.bonus
            this.bonus = this.payment.bonus
          }else{
            this.total =this.total-this.payment.bonus
            this.bonus = 0;
          }
          break;
      }
    }
  },
  components: {
    ComputedShops,
    Ordertit,
    Cricle,
    AddressItem
  },
  mounted() {
    this.$store.dispatch('fetch_list');
    // this.$http.post('/api/resultshops',{
    //   token:getCookie('keyword')
    // }).then(res=>{
    //   if(res.code==1){
    //     this.computedL = res.msg
    //   }
    // })

    this.dialog.$on('through',()=>{
      this.$router.push({
        name:'address'
      })
      // this.flagAddress = true
    })
  },
};
</script>

<style lang="scss" scoped>
  @import './result.scss'
</style>
