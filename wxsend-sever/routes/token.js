const express = require('express')
const request = require('request')
const router = express.Router()
const api = require('../config/keys')

//获取tocken
let p =new Promise(function (resolve, reject) {
    var url = api.tokenURL
    request.get(url, (req, res) => {
        if (req) reject(req)
        resolve(res)
    })
}).then(function (value) {
    //console.log(JSON.parse(value.body).access_token)
    return JSON.parse(value.body).access_token
},function (reason) {
    console.log(reason)
})
async function fn1() {
    let p =new Promise(function (resolve, reject) {
        var url = api.tokenURL
        request.get(url, (req, res) => {
            if (req) reject(req)
            resolve(res)
        })
    }).then(function (value) {
        //console.log(JSON.parse(value.body).access_token)
        return JSON.parse(value.body).access_token
    },function (reason) {
        console.log(reason)
    })
    var value = await p;
    console.log(value,2)



    var sendurl = api.sendUrl +value

    console.log(sendurl)
    var formData = {}
    
    request.post({url:sendurl, formData: formData}, (req, res)=> {
   
    console.log(res.body) 
    });

    return value

}
var send = fn1()
//下发通知send
console.log(send,1)

var sendurl = api.sendUrl +send
console.log(sendurl)
var formData = {}

request.post({sendurl, formData: formData}, (req, res)=> {
    console.log(sendurl)
//console.log(res.body) 
});



// var f = fn1()
// console.log(f)


router.get('/', (req, res) => {
    var f = fn1()
console.log(f)
    //获取请求参
    res.json({ msg:'token请求成功'})

});

module.exports = router