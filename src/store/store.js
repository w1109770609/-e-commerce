import Vue from 'vue';
import Vuex from 'vuex';
import { httpInstance as http } from '../until/http'
Vue.use(Vuex)
import {getCookie} from '../until/cookie'
import router from '../router/index'
let store = new Vuex.Store({
  state:{
    getlist:[],
    listCache:{},
    computedL:[],
    totalObj:{},
    totalSum:0,
    arrInd:[],
    arr:[],
    address:[],
    address_l:{}
  },
  mutations:{
    fetch_list(state,payload){
      state.getlist = payload
    },
    fetch_listCache(state,payload){
      let o = { ...state.listCache }
      o[payload.id] = payload.data;
      state.listCache = o;
    },
    fetchL(state,payload){
      state.computedL = payload
    },
    total(state, payload){
      let sum = 0;
      let arr = state.arrInd
        state.computedL.map((item, index) => {
          if (item.title == payload.title) {
            if (payload.flag) {
              if(arr.indexOf(index)==-1){
               arr.push(index)
              }
              sum += item.count * item.price
              state.totalObj[item.title] = sum;
            } else {
              state.totalObj[item.title] = 0;
            }
          }
        })
        state.arrInd = arr.sort()
        let totalSum = 0;
        Object.values(state.totalObj).forEach(item => {
          totalSum += item;
        });
        state.totalSum = totalSum.toFixed(2)
    },
    deleted(state){
      let computedL = [...state.computedL]
      let ind = state.arrInd.map((item, index) => {
        return item - index
      })
      console.log(state.arrInd)
      ind.forEach((item,index)=>{
        console.log(item)
        computedL.splice(item,1)
      })
      state.computedL = computedL;
    },
    address(state,payload){
      state.address = payload
    },
    last_address(state,payload) {
      state.address_l = payload
    },
  },
  actions:{
    getListCache({state,commit},payload){
      if (!state.listCache[payload]){
        http.get(`/api/guomei?id=${payload}`).then(res => {
          commit('fetch_listCache', {
            data: res.secondLevelCategories,
            id: payload
          })
        })
      }
    },
    getList({ commit }){
      http.get('/list').then(res=>{
        commit('fetch_list',res);
      })
    },
    fetch_list({commit}){
      http.post('/api/shoplist', { token: getCookie('keyword') }).then(res => {
        if (res.code === 0) {
          router.push({
            name: 'login',
            query: {
              from: 'shopcar'
            }
          })
        } else {
          commit('fetchL',res.msg)
        }
      })
    },
    fetch_address({commit}){
       http.post("/api/address", {
         token: getCookie("keyword")
       }).then(res => {
         if (res.code == 0) {
           this.$toast.$emit('activeShow', res.msg)
           setTimeout(() => {
             router.push({
               name: 'login',
               query: {
                 from: 'address'
               }
             })
           }, 2000);
         } else {
           commit('address',res.msg)
         }
       });
    }
  }
})

export default store


