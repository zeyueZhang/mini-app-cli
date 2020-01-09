import http from './index';
const login = (userInfo) => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        http.get('login', { code: res.code, p: 'friendqa' }).then(res => {
          if(res.error_code === 0) {
            console.log(res.data,'login')
            wx.setStorageSync('cookie', res.data)
            resolve(res.data)
            
          }else {
            reject()
            wx.hideLoading()
            // wx.showModal({
            //   title: '警告',
            //   content: '小程序登录接口出错,点击按钮退出',
            //   showCancel: false,
            //   success(res) {
            //     wx.exitMiniProgram()
            //   }
            // })
            
          }
        }).catch(err => {
          reject(err)
          console.log(err, 'login')
          wx.hideLoading()
          // wx.showModal({
          //   title: '警告',
          //   content: '小程序登录接口出错,点击按钮退出',
          //   showCancel: false,
          //   success(res) {
          //     wx.exitMiniProgram()
          //   }
          // })
          
        })
        // wx.setStorageSync('cookie', res)
      }
    })
  })
}
export default login