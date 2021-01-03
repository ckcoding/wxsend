const express = require('express')
const request = require('request')
const router = express.Router()
const api = require('../config/keys')
router.get('/', (req, res) => {
    new Promise(function (resolve, reject) {
        var code = req.query.code
        const openidurl = api.openidURI + code
        request.get(openidurl, (req, res) => {
            if (req) reject(req)
            resolve(res)
        })
    }).then(function (value) {
        console.log(value.body, 2);
        var openid = JSON.parse(value.body).openid
        if (openid !== undefined) return res.json({ msg: 'openid请求成功', code: 200, openid: openid })
        return res.json({ msg: 'openid请求失败', code: 400 })
    }, function (reason) {
        console.log(reason)
    })
});
module.exports = router