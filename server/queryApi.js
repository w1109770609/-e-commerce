let http = require('http')
function getData(url){
  console.log(url)
  return new Promise((resolve,reject)=>{
    const options = {
      hostname: 'm.gome.com.cn',
      path: url,
      port:80,
      method: 'GET',
      headers: {
        //'Content-Type':'application/json'
      }
    };

    let data = '';
    const req = http.request(options, (res) => {
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        data += chunk
      });
      res.on('end', () => {
        resolve(data)
        console.log('No more data in response')
      });
    });

    req.on('error', (e) => {
      reject('error')
    })
    req.end()
  })

}
module.exports = getData;

