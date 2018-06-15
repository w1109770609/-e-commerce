import Vue from 'vue';
import Vuex from 'vuex';
import { httpInstance as http } from '../until/http'
Vue.use(Vuex)
let store = new Vuex.Store({
  state:{
    getlist:[],
    listCache:{

    }
  },
  mutations:{
    fetch_list(state,payload){
      state.getlist = payload
    },
    fetch_listCache(state,payload){
      let o = { ...state.listCache }
      o[payload.id] = payload.data;
      state.listCache = o;
    }
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
    }
  }
})

export default store


