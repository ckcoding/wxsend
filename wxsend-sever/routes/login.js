const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const Keys = require('../config/keys')
var db = Keys.db()
router.post('/', (req, res) => {
    var name = req.body.name
    var password = req.body.password
    var nameSql = 'SELECT * FROM `admin` WHERE `name` LIKE ' + "'" +name + "'";
    db.query(nameSql, (err, result) => {
      var  user = JSON.parse(JSON.stringify(result))[0]
        if (user) {
            //密码验证
            if(name === user.name && password === user.password){
                var rule = {user,password}
            //token获取
                jwt.sign(rule, Keys.secret,{expiresIn: 3600},(err,token)=>{
                    if(err) throw err;
                  return res.json({
                        code:200,
                        msg:'登录成功',
                        success:true,
                        token : 'Bearer '+token
                    },);
                });
            }else{
               return res.status(200).json({code:400,mgs:'密码错误'})
                 } 
        } else {
          return res.status(200).json({code:404,mgs:'用户不存在'})
        }
        //密码匹配
    })
    //db.end()
})
module.exports = router