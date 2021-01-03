const express = require('express')
const router = express.Router()
const api = require('../config/keys')
var db = api.db()
router.get('/', (req, res) => {
    //获取请求参数
    var openid = req.query.openid
    const openidurl = api.openidURI + openid

    if (openid) {
        var findSql = 'SELECT * FROM `send` WHERE `openid` LIKE ' + '"' + openid + '"';
        db.query(findSql, (err, result) => {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return  res.json({code:400,msg: '获取失败'})
            } else {
                var user = JSON.parse(JSON.stringify(result))[0]
                if (user != undefined) {
                    var num = user.number + 1
                    var addSql = 'UPDATE send SET number = ' + num + " WHERE openid = " + '"' + openid + '"'
                    db.query(addSql, (err, result) => {
                        if (err) {
                            return  res.json({code:400,msg: '获取失败'})
                        } else {
                            return  res.json({code:200,msg: '存在openid记录，次数新增'})
                        }
                    });
                } else {
                    var nums = 1
                    var time = new Date()
                    var addSql = 'INSERT INTO send(id,openid,number,time) VALUES(1,?,?,?)';
                    var addSqlParams = [openid, nums, time];
                    db.query(addSql, addSqlParams, (err, result) => {
                        if (err) {
                            
                            return  res.json({code:400,msg: '获取失败'})
                        } else {
                            return  res.json({code:200,msg: 'openid写入数据库成功'})
                        }
                    });
                }
            }
        });
    }
    else {
      return  res.json({code:400,msg: '获取失败'})

    }

});



module.exports = router
//vue create