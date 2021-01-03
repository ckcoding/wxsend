//index.js
//获取应用实例
//每次都获取code，拿到openid，存入cookie
const app = getApp()



Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
//huoqu
getup:function(){
  wx.requestSubscribeMessage({
    tmplIds: ['gnJg-8HC2X7o60qe_am0cvjCFckHLt49iGDq17Vn_Fg'],
    success (res) {
      wx.getStorage({
        key: 'openid',
        success (res) {
          console.log(res.data)
          if(res.data){
            wx.request({
              url: 'http://127.0.0.1:4600/api/openid?openid='+res.data,
            
              method: 'GET',
              header: { 'content-type': 'application/json'},
              success: function(openIdRes){
                console.log(openIdRes.data)
              },
              fail: function(error) {
                  console.info("订阅消息权限获取失败");
                  console.info(error);
              }
           })
          }

        }
      })
     }
  })
},

getin:function(){


},
  onLoad: function () {
    wx.login({
      success: function (res) {
          console.log(res)
           if (res.code) {
              console.log('通过login接口的code换取openid');
               wx.request({
                 url: 'http://127.0.0.1:4600/api/code?code='+res.code,
               
                 method: 'GET',
                 header: { 'content-type': 'application/json'},
                 success: function(openIdRes){
                      wx.setStorage({
                        key: "openid",
                        data:openIdRes.data.openid,
                      });
                 },
                 fail: function(error) {
                     console.info("获取用户openId失败");
                     console.info(error);
                 }
              })
            }
          }
      })
    },


  jiemi:function(){

  },


  getUserInfo: function(e) {
  
    wx.getUserInfo({
      success: function(res) {
        var miyao = res.signature
        var miwen = res.encryptedData
        var iv = res.iv
       
        console.log(miyao)
        console.log(miwen)
        console.log(iv)
        console.log(res)
      }
    })
  }
})
