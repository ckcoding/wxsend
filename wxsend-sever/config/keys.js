module.exports = {
    openidURI : 'https://a', //openid链接，请参考微信小程序开发文档获取
    tokenURL :'https://a', // 小程序token，请参考微信小程序开发文档获取
    sendUrl:'https://api', // 推送链接，请参考微信小程序开发文档获取
    secret:'secret',
    db :function fn(){
        const mysql = require("mysql");
        return  mysql.createConnection({
            host: "192.168.31.147",
            user: "admin",
            port: 3306,
            password: "kkd",
            database: "admin"
          })
    }

 
    
}
