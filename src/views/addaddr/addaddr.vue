<template>
    <div class="adr_shop">
      <div class="adr_title">
        <span class="iconfont icon-xiangzuo" @click="togoMine"></span><h3>收货人</h3>
      </div>
    <div>
    <p class="p_inp"><input type="text" placeholder="收件人姓名" v-model="data.name"></p>
    <p class="p_inp"><input type="text" placeholder="手机号" v-model="data.phone"></p>
    <div class="selects">
      <div class="itemSelect">
        <multiselect v-model="value" @select="select" label="name" placeholder="选择省" :options="privince" :allow-empty="false">
          <template slot-scope="{ option }"><strong>{{ option.name }}</strong> </template>
        </multiselect>
      </div>
      <div class="itemSelect">
        <multiselect @select="select2" v-model="value1" label="name" placeholder="选择市" :options="citys" :allow-empty="false">
          <template slot-scope="{ option }"><strong>{{ option.name }}</strong> </template>
        </multiselect>
      </div>
    </div>
     <div class="aren">
      <multiselect v-model="value2" @select="select3" placeholder="选择区" :options="aren" :allow-empty="false">
        <template slot-scope="{ option }"><strong>{{ option.name }}</strong> </template>
      </multiselect>
     </div>
    <p class="p_inp"><input type="text" placeholder="详细地址" v-model="data.address"></p>
</div>
      <div class="adr_btn">
         <button @click="saveFn">保存</button>
      </div>
    </div>
</template>
<script>
import { getCookie } from "@/until/cookie";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios'
export default {
  data() {
    return {
      value:'',
      value1:'',
      value2:'',
      data:{
        name: "",
        phone: "",
        address:'',
        privince:'',
        city:'',
        aren:''
      },
      privince:[],
      citys:[],
      aren:[]
    };
  },
  components:{Multiselect},
  mounted(){
    axios.get('/server/city/city.json').then(res=>{
      console.log(res.data)
      this.privince = res.data
    })
  },
  methods: {
    saveFn() {
      if(this.data.name!=""){
        this.$http.post('/api/addaddr',{
          data:this.data,
          token:getCookie('keyword')
        }).then(res=>{
          if(res.code==0){
            this.$toast.$emit('activeShow',res.msg)
            setTimeout(() => {
              this.$router.push({
                name:'login',
                query:{
                  from:'addaddr'
                }
              })
            }, 2000);
          }else{
            this.$router.push({
              name:'address'
            })
          }
          console.log(res)
        })
      }else{
        this.$toast.$emit('activeShow','姓名不能能为空')
      }

    },
    togoMine(){
      this.$router.push({
        name:"address"
      })
    },
    select(a){
      this.data.privince = a.name
      this.citys = a.city;
      this.value2='';
      this.value1='';
    },
    select2(a){
      this.data.city = a.name
      this.aren = a.area
    },
    select3(a){
      console.log(a)
      this.data.aren = a
    }
  },
};
</script>
<style scoped>
  @import './addaddr.css';
</style>

