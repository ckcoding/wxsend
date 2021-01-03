//导入包
const express = require('express')
// const mysql = require("mysql");
//设定app
const app = express()
//解决跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') return res.send(200);
  next();
});
//引入
const openid = require('./routes/openid')
const login = require('./routes/login')
const users = require('./routes/users')
const code = require('./routes/code')
const send = require('./routes/send')
//post接收
const bodyParser = require('body-parser')
//主页重定向
app.get('/',(req,res)=>{
    res.send('cs')
})

//post 接收中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/api/openid',openid)
app.use('/api/login',login)
app.use('/api/users',users)
app.use('/api/code',code)
app.use('/api/send',send)

const port = process.env.PORT || 4600
app.listen(port,()=>{
    console.log(port,'端口已开启')
})