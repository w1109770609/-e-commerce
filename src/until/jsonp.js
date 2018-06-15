// 1. 动态创建script
// 2.script添加路径
// 3.callback

function jsonp(url,callbackname){
  return new Promise((resolve)=>{
    window[callbackname] = (data)=>{
      resolve(data)
    }
    let script = document.createElement('script');
    script.src = url
    document.body.appendChild(script)
  })
}
export default jsonp;
