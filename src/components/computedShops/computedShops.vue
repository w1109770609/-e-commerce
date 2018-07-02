<template>
    <div class="shopend">
       <div class="shopList">
          <span :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'" @click="tabAct"></span>
            <dl>
                <dt><img v-lazy="item.show.img" alt=""></dt>
                <dd>
                    <div class="menu">
                        {{item.title}}
                    </div>
                    <div class="shops">
                        <div class="price">
                            <span>{{item.price}}</span>
                        </div>
                        <div class="increatment">
                            <span @click="add(-1)">-</span>
                            <b>{{item.count}}</b>
                            <span @click="add(1)">+</span>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
import { getCookie } from '@/until/cookie'
export default {
  props:{
    item:{
      type:Object,
      required:true
    },
    flags:{
      type:Boolean,
    }
  },
  data() {
    return {
      activeClass:'iconfont icon-unchecked',
      flag:false,
      arrInd:[],
      uparr:[]
    }
  },
  watch:{
    item(){
      this.$store.commit('total',{
        title:this.item.title,
        flag:this.flag
      })
    },
    flags(n,o){
      this.flag = n;
      this.$store.commit('total',{
        title:this.item.title,
        flag:this.flag
      })
    }
  },
  methods:{
    tabAct(){
      this.flag = !this.flag;
      this.$store.commit('total',{
        title:this.item.title,
        flag:this.flag,
      })
      this.$http.post('/api/result',{
        token:getCookie('keyword'),
        item:this.item,
        flag:this.flag
      }).then(res=>{
        console.log(res)
      })
    },
    add(num){
      this.$http.post('/api/add',{
        num,
        token:getCookie('keyword'),
        title:this.item.title
      }).then(res=>{
        if(res.code==1){
          this.$store.dispatch('fetch_list')
        }
      })
    }
  }
}
</script>

<style scoped>
   @import './computedShops.css';
</style>
