import http from './index';

const setUserInfo = (userInfo = {}, subscribe) => {
  let paramsData = {}
  if(userInfo.avatarUrl) {
    paramsData = {
      nick: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      sex: userInfo.gender,
      region: userInfo.city
    }
  }else {
    paramsData = {
      subscribe
    }
  }
  return new Promise((resolve, reject) => {
    http.post('setUserInfo', {
      ...paramsData
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default setUserInfo