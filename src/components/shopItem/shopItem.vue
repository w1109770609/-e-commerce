<template>
    <dl @click="shopItem">
      <dt>
        <img v-lazy="item.show.img" alt="">
      </dt>
      <dd>
        <p class="tits">{{item.title}}</p>
        <p @click.stop="addshopCar">
          <span>{{item.price}}</span>
          <i class="iconfont icon-shopcar"></i>
        </p>
      </dd>
    </dl>
</template>

<script>
import {getCookie} from '@/until/cookie.js'
export default {
  props:['item'],
  data() {
    return {

    }
  },
  methods: {
    addshopCar(){
      this.$http.post('/api/shopcar',{
        token:getCookie('keyword'),
        item:this.item
      }).then(res=>{
        if(res.code===1){
          this.$toast.$emit('activeShow','添加成功')
        }else{
          console.log('写入失败');
          this.$router.push({
            name:'login',
            query:{
              from:'shopcar'
            }
          })
        }
      })
    },
    shopItem(){
      this.$router.push({
        name:'detail',
        query:{
          imgUrl:this.item.show.img,
          price:this.item.price
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  dl{
    width:100%;
    color:#666;
    padding: 3px;
    dt{
      width:100%;
      img{
        width:100%;
        height: 5rem;
      }
    }
    dd{
      .tits{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        word-break:break-all;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      p{
        display: flex;
        line-height: 2;
        justify-content: space-between;
        span{
          color:#ff3333;
        }
        i{
          text-align:center;
          width:30px;

        }
      }
    }
  }
</style>
