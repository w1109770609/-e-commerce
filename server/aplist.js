const express = require('express');
const app = express()
const fs = require('fs')
const path = require('path')
let bodyParse = require('body-parser')
let jwt = require('jsonwebtoken')
app.use(bodyParse.json())
app.all('*',(req,res,next)=>{
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers':'Content-Type'
  })
  next()
})
const ejs = require('ejs')
app.engine('html',ejs.__express)
app.use(express.static(path.resolve(process.cwd()+'/dist')))
app.set('view engine','html')

app.get('/index/',(req,res)=>{
  res.render('index',{
    title:'HTML'
  })
})


//https://m.gome.com.cn/index.php?ctl=goods_class&act=ajaxGetClassList&cid=17951828
app.get('/api/guomei',(req,res)=>{
  let getData = require('./queryApi')
  getData(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.id}`).then(result=>{
    res.end(result)
  })
})

app.get('/search',(req,res)=>{
  let pathname = path.resolve('goodslist');
  let contents = fs.readFileSync(pathname + `/list${req.query.page}.json`);
  if (req.query.page>4)return false
  setTimeout(() => {
    res.end (contents);
  }, 2000);
})

app.get('/list', (req, res) => {
  let result = fs.readFileSync('./list.json','utf-8')
  res.end(result)
})
app.post('/api/register',(req,res)=>{
  let loginsPath = path.resolve('logins')
  let content = JSON.parse(fs.readFileSync(loginsPath + '/logins.json', 'utf-8'))
  if (content.some((item) => {
    return item.username == req.body.username;
  })){
    res.json({
      code: 1,
      msg: '用户已存在,请登陆'
    })
    return;
  }
  content.push(req.body);
  fs.writeFile(loginsPath + '/logins.json', JSON.stringify(content),(err)=>{
    if(err){
      res.json({
        code: 0,
        msg: err
      })
    }else{
      res.json({
        code: 1,
        msg: 'success'
      })
    }
  })
})

app.post('/api/login',(req,res)=>{
  let loginsPath = path.resolve ('logins');
  let loginCon = JSON.parse(fs.readFileSync(loginsPath + '/logins.json', 'utf-8'))
  if (loginCon.some(item => {
    return req.body.username == item.username
  })){
    let token = jwt.sign(req.body, '1601E',{ expiresIn: 60*60  })
    res.json({
      code: 1,
      msg: 'success',
      token
    })
  }else{
    res.json({
      code: 0,
      msg: '输入正确用户名'
    })
  }
})

app.post('/api/shoplist',(req,res)=>{
  let cons = path.resolve('addshop');
  let txt = JSON.parse(fs.readFileSync(cons + '/addshop.json', 'utf-8'))
  jwt.verify(req.body.token, '1601E', (err,decode)=>{
    if(err){
      res.json({
        code:0,
        msg:err
      })
    }else{
      res.json({
        code: 1,
        msg: txt[decode.username]
      })
    }
  })
})

app.post('/api/shopcar',(req,res)=>{
  jwt.verify(req.body.token,'1601E',(err,decode)=>{
    if(err){
      res.json({
        code:0,
        msg:'登陆超时，请重新登陆'
      })
    }else{
      let cons = path.resolve('addshop');
      let txt = JSON.parse(fs.readFileSync(cons +'/addshop.json','utf-8'))
      if(txt[decode.username]){
        let flag = false;
        txt[decode.username].forEach(item => {
          if(item.title == req.body.item.title){
            ++item.count;
            flag=true;
          }
        });
        if(!flag){
          let o ={
            ...req.body.item,
            count:1,
            flag:false
          }
          txt[decode.username].push(o)
        }
      }else{
        txt[decode.username] = [{count: 1,flag:false,...req.body.item}]
      }
      fs.writeFile(cons + '/addshop.json',JSON.stringify(txt),(err)=>{
        if(err){
          res.json({
            code:0,
            msg:'写入失败'
          })
        }else{
          res.json({
            code:1,
            msg:'success'
          })
        }
      })
    }
  })
})
app.post('/api/add',(req,res)=>{
  let cons = path.resolve('addshop');
  let txt = JSON.parse(fs.readFileSync(cons + '/addshop.json', 'utf-8'))
  jwt.verify(req.body.token, '1601E', (err, decode) => {
    if(err){
      res.json({
        code:0,
        msg:'过期了'
      })
      return;
    }
    let list = txt[decode.username].map(item => {
      if (item.title === req.body.title) {
        item.count += req.body.num
        if (item.count <= 0 && req.body.num==-1){
          item.count = 1;
          return;
        }
      }
      return item;
    })
    decode[req.body.username] = list
    fs.writeFile(cons + '/addshop.json', JSON.stringify(txt), (err) => {
      if (err) {
        res.json({
          code: 0,
          msg: '写入失败'
        })
      } else {
        res.json({
          code: 1,
          msg: 'success'
        })
      }
    })
  })

})

app.post('/api/delete', (req, res) => {
  let cons = path.resolve('addshop');
  let txt = JSON.parse(fs.readFileSync(cons + '/addshop.json', 'utf-8'))
  jwt.verify(req.body.token, '1601E', (err, decode) => {
    if (err) {
      res.json({
        code: 0,
        msg: '过期了'
      })
      return;
    }
    txt[decode.username] = req.body.content
    fs.writeFile(cons + '/addshop.json', JSON.stringify(txt), (err) => {
      if (err) {
        res.json({
          code: 0,
          msg: '写入失败'
        })
      } else {
        res.json({
          code: 1,
          msg: 'success'
        })
      }
    })

  })
})
app.listen('3000',()=>{
  console.log('profect!')
})
