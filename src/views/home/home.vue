<template>
  <div class="home">
      <header class="header">
        <i class="iconfont icon-logo"></i>
        <div>
          <input type="text" placeholder="请输入您要购买的商品" @click="toSeacch">
        </div>
        <p>
          <i class="iconfont icon-shop"></i>
          <span>我的店铺</span>
        </p>
        <p>
          <i class="iconfont icon-msg"></i>
          <span>消息</span>
        </p>
      </header>
      <div class="content" ref="scroll" @scroll="onScrollTo">
        <div class="swiper-container" ref="swipers">
          <div class="swiper-wrapper">
            <SwiperItem imgInd="../../../static/image/1.jpg"></SwiperItem>
            <SwiperItem imgInd="../../../static/image/2.png"></SwiperItem>
            <SwiperItem imgInd="../../../static/image/3.jpg"></SwiperItem>
            <SwiperItem imgInd="../../../static/image/4.jpg"></SwiperItem>
          </div>
        </div>
        <div class="list" ref="list">
          <dl v-for="(item,index) in getlist" :key="index">
            <dt><img :src="item.src" alt=""></dt>
            <dd>{{item.txt}}</dd>
          </dl>
        </div>
        <div class="vertical-ban" ref="ban">
            <div class="tit">
              商城动态
            </div>
            <div class="swiper-container" ref="txt_swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  无公害来的路上耽搁了个收到了发给收到了发给肯定是看搁了个收到了发给肯定是看过
                </div>
                <div class="swiper-slide">
                  无公害来的路上耽搁了个收到了发给收到了发给肯定是看搁了个收到了发给肯定是看过
                </div>
                <div class="swiper-slide">
                  无公害来的路上耽搁了个收到了发给收到了发给肯定是看搁了个收到了发给肯定是看过
                </div>
              </div>
            </div>
        </div>
        <div class="middle-header" ref="heads">
          <p>
            <span>天天特惠</span>
            <span>每天都有惊喜</span>
          </p>
          <span>更多</span>
        </div>
        <ol class="shops" ref="shops">
          <li class="shoplist" v-for="(item,ind) in shoplist" :key="ind">
            <ShopItem :item="item"></ShopItem>
          </li>
        </ol>
        <div class="tips">{{bottomMsg}}</div>
      </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import jsonp from '@/until/jsonp.js'
import SwiperItem from '@/components/swiperItems/swiperItems'
import ShopItem from '@/components/shopItem/shopItem'
import { mapActions,mapState } from 'vuex';
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      url:'http://list.meilishuo.com/search?frame=1&page=1&cKey=wap-index&tag=&maxPrice=&minPrice=&fcid=&_mgjuuid=e61a3677-d308-472e-a1be-b5f71dee0444&sort=pop&_=1528851893936&callback=jsonp4',
      shoplist:[],
      flag:true,
      page:1,
      bottomMsg:'数据正在加载中。。。'
    }
  },
  computed:{
    ...mapState(['getlist'])
  },
  components: {
    SwiperItem,
    ShopItem
  },
  mounted(){
    this.$http.get('/search?page=1').then(res=>{
      this.shoplist = res.data.list
    })
    // jsonp(this.url,'jsonp4').then(res=>{
    //   this.shoplist = res.data.list
    //   console.log(this.shoplist)
    // })
    new Swiper(this.$refs.swipers,{
      loop:true,
      autoplay:true,
    })
    new Swiper(this.$refs.txt_swiper,{
      loop:true,
      autoplay:true,
      direction:'vertical'
    })
    this.getList()
  },
  methods:{
    onScrollTo(){
      let swH = this.$refs.swipers.offsetHeight
      let listH = this.$refs.list.offsetHeight
      let banH = this.$refs.ban.offsetHeight
      let shopsH = this.$refs.shops.offsetHeight
      let headsH = this.$refs.heads.offsetHeight
      let boxH = this.$refs.scroll.offsetHeight
      let scrT = this.$refs.scroll.scrollTop
      if(swH+listH+banH+shopsH+headsH-scrT-boxH<50&&this.flag){
        this.flag = false
        this.page++
        if(this.page>4){
          this.bottomMsg = "我是有底线的"
          return false
        }else{
          this.$http.get(`/search?page=${this.page}`).then(res=>{
            this.shoplist = [...this.shoplist,...res.data.list]
            this.flag = true
          })
        }
      }

    },
    toSeacch(){
      this.$router.push({name:'search'})
    },
    ...mapActions(['getList'])
  }
}
</script>

<style lang="scss">
  .home{
    display: flex;
    height:100%;
    flex-direction: column;
  }
  .contents{
    flex:1;
    overflow-y: scroll;
  }
  .header{
    height:1rem;
    display:flex;
    align-items: center;
    color: #FC4141;
    &>i{
      padding: 0 .2rem;
    }
    div{
      flex:1;
      position: relative;
      input{
        width:100%;
        height:.6rem;
        border:0;
        padding-left: .5rem;
        background: #F5F5F5;
        border-radius: .1rem;
      }
    }
    p{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 .1rem;
    }
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    dl{
      width:25%;
      color:#666;
      padding: .1rem 0;
      text-align: center;
      dt{
        width:100%;;
        img{
          width:1rem;
          height:1rem;
        }
      }
      dd{
        line-height: 1.5;
      }
    }
  }
  .vertical-ban{
    height:.85rem;
    overflow: hidden;
    padding: 0 .3rem;
    color:#666;
    display: flex;
    .tit{
      color:#FF9967;
      width:30px;
      font-size: .28rem;
      display: inline-block
    }
    .swiper-container{
      flex:1;
      padding-left: .1rem;
      .swiper-slide{
        height:.85rem;
      }
    }
  }
  .middle-header{
    height:1rem;
    margin-top: .2rem;
    border-top: 3px solid #EEEEEE;
    border-bottom: 3px solid #EEEEEE;
    display: flex;
    color:#666;
    justify-content: space-between;
    padding: 0 .1rem 0 .3rem;
    align-items: center;
    p span{
      color:#FF6D00;
      padding-right: .1rem;
      &:nth-child(1){
        font-size: .3rem;
      }
    }
  }
  .shops{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .shoplist{
      width:50%;
    }
  }
  .tips{
    line-height: 2;
    color: #666;
    padding-left: .1rem;
  }
</style>
