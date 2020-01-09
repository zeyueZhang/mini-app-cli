import {dev} from '../config/env';
const uploadUrl = ''
export function uploadFile(path) {
  let url = uploadUrl
  if(dev){
    url = uploadUrl.replace(/(https:\/\/|http:\/\/|\/\/)/i, ($1) => {
      return $1 + "beta-"
    })
  }
  const cookie = wx.getStorageSync('cookie')
  console.log(cookie)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath: path,
      name: String(Date.now() + Math.random()),
      formData: {
        // 这里是参数
        _caller: 'sticky_note',
        file_name: String(Date.now() + Math.random()),
        session_key: cookie.session_key || '',
        openid: cookie.openid || '',
        is_floder_name: 'locks'
      },
      success: function(res) {
        if(res.statusCode === 200) {
          resolve(JSON.parse(res.data))
        }else {
          console.log(res)
          reject(res)
        }
      },
      fail: function(err) {
        console.log(err)
        reject(err)
      }
    })
  })
  
}