const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')
const request = require('request')
const api = require('../config/keys')

app.use(passport.initialize());
require('../config/send-jwt')(passport);
router.post("/",passport.authenticate('jwt',{session:false}),(req,res)=>{
console.log(req.body.title)

    var formdata ={
        thing1:{
			"value": req.body.title,
		}, 
        thing2:{
			"value": req.body.smg,
		}, 
        date3: {
			"value": req.body.time,
		}, 
        date4: {
			"value": req.body.tips,
		}, 
    }
    console.log(typeof req.body.title)

    //获取tocken
    // 
    //用户数据
   var users = req.user
    var url = api.tokenURL
    //tocken
    request.get(url, (req, res) => {
        if (res){
         var  token =  JSON.parse(res.body).access_token
         console.log(token);
         let sendurl = api.sendUrl+token
         for(var i = 0; i<users.length; i++){
            console.log(i);
           var  openid = users[i].openid
           var id = users[i].number
           console.log(id);
            var data = {
                "touser": openid,
                "template_id": "gnJg-8HC2X7o60qe_am0cvjCFckHLt49iGDq17Vn_Fg",
                "page": "index",
                "data": formdata
                
            }
             request.post({url:sendurl,headers:{"Content-Type":"json"}, form: JSON.stringify(data)},(req,res)=>{
                 if(res){ console.log(res.body);
                    var db = api.db()
                    
                    var num = id - 1
                    console.log(num);
                    
                    if (num !== 0 ){
                        var addSql = 'UPDATE send SET number = ' + num + " WHERE openid = " + '"' + openid + '"'
                        db.query(addSql, (err, result) => {
                            if (err) {
                                return  {code:400,msg: '获取失败'}
                            } else {
                                return  {code:200,msg: '存在openid记录，次数新增'}
                            }
                        });
                    }else{
                        var addSql = 'UPDATE send SET number = ' + 0 + " WHERE openid = " + '"' + openid + '"'
                    db.query(addSql, (err, result) => {
                        if (err) {
                            return  {code:400,msg: '获取失败'}
                        } else {
                            return  {code:200,msg: '存在openid记录，次数新增'}
                        }
                    });
                    }
                    
       
                    return  ({ msg: '成功',code:200})
                    
                    
                 }
             })
         }

        }else{
            return  res.json({ msg: '成功',code:200})
        }
    })

    return  res.json({ msg: '成功',code:200})

})
module.exports = router