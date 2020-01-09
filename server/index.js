import { dev } from '../config/env';
import apiRoutes from './apiRoutes/index';
import login from './login';
var app = getApp();

/**
 * POST请求，
 * URL：接口
 */
function request(urlKey, postData) {
  const cookie = wx.getStorageSync('cookie')
  let url = apiRoutes[urlKey]
  // 这里区分开发环境接口和线上接口
  if(dev){
    url = apiRoutes[urlKey].replace(/(https:\/\/|http:\/\/|\/\/)/i, ($1) => {
      return $1 + "beta-"
    })
  }
 
  postData.openid = cookie.openid
  postData.session_key = cookie.session_key
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      header: {
        "content-type": "application/json",
        "cookie": JSON.stringify(cookie)
      },
      data: postData,
      method: 'POST',
      success: function (res) {
        if(res.data.error_code === 0) {
          resolve(res.data);
        }else {
          if(res.data.error_code === 10002) {
            console.log('login again')
            return login().then(res => {
              return resolve(request(urlKey, postData))
            })
          }else {
            reject(res.data)
          }
        }
      },
      fail: function (err) {
        reject(err);
      },
    })
  })
}
 
//GET请求
function getData(urlKey, data) {
  const cookie = wx.getStorageSync('cookie')
  let url = apiRoutes[urlKey]
  if(dev && urlKey !== 'statistics'){
    url = apiRoutes[urlKey].replace(/(https:\/\/|http:\/\/|\/\/)/i, ($1) => {
      return $1 + "beta-"
    })
  }
  data.openid = cookie.openid
  data.session_key = cookie.session_key
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: {
        "content-type": "application/json",
        "cookie": JSON.stringify(cookie)
      },
      method: 'GET',
      success: function (res) {
        if(res.statusCode === 200) {
          if(res.data.error_code === 0) {
            resolve(res.data);
          }else {
            if(res.data.error_code === 10002) {
              console.log('login again')
              return login().then(res => {
                return resolve(getData(urlKey, data))
              })
            }else {
              reject(res.data)
            }
          }
          
        }else {
          console.log(res, 'getStatuscode !== 200')
          reject(res);
        }
        
      },
      fail: function (err) {
        console.log(err, 'fail')
        reject(err);
      },
    })
  })
}
 
module.exports = {
  get: getData,
  post: request
}