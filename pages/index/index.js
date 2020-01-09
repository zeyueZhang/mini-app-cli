//index.js
import login from '../../server/login.js';
//获取应用实例
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
  
  },
  onLoad: function () {
    
  },
  getUserInfo: function({detail}) {
    console.log(detail)
    if(detail.userInfo) {
      // 获取用户信息授权登录
      login().then(res => {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      })
     
    }
    
  }
})
