import axios from 'axios'
let onlineUrl = "http://192.168.191.1:3000"
let testUrl = 'http://localhost:3000'
console.log(process.env.NODE_ENV)
let httpInstance = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? onlineUrl : testUrl
});
httpInstance.interceptors.request.use((config)=>{
  return config
},(err)=>{
  return Promise.reject(err)
})
httpInstance.interceptors.response.use((response)=>{
  if (response.status==200){
    return response.data
  }else{
    return response;
  }
})

export { httpInstance }
export default {
  install(Vue){
    Object.defineProperty(Vue.prototype, '$http', {
      value: httpInstance
    })
  }
}
