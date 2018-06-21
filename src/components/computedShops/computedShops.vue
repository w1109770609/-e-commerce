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
    .shopList {
      display: flex;
      padding: .1rem 0;
      padding-right:10px;
      border-bottom: 5px solid #ccc;
    }
    .shopList>span{
      width:.7rem;
      flex-shrink: 0;
      display:flex;
      justify-content: center;
      align-items:center
    }
    .shopList dl{
        display:flex;
        height:95%;
    }
    dl dt{
        width:3.4rem;
        height:100%;
    }
    dl dt img{
        width:100%;
        height:100%
    }
    dl dd{
        padding-left:10px;
        color:#666666;
    }
    dl dd .shops{
        display:flex;
        justify-content:space-between;
        padding:14px 0;
    }
     dl dd .price{
         color:#FC4141;
         font-size:18px;
         font-weight:800;
     }
     dl dd .increatment{
        border:1px solid #ccc;
        border-radius:6px;
        padding:0 10px;
     }
    dl dd .increatment span,dl dd .increatment b{
         width:15px;
        height:34px;
        line-height:34px;
         display:inline-block;
         text-align:center;
     }
     dl dd .increatment b{
         width:35px;
         text-align:center;
         border-left:1px solid #ccc;
         border-right:1px solid #ccc;
     }

</style>
