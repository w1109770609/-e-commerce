import axios from 'axios'
let httpInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
console.log(process.env.NODE_ENV)
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
