import Taro from '@tarojs/taro'

export async function AnonymousLogin ({uid}) {
  return await Taro.request({
    url: 'https://api.gizwits.com/app/users',
    data: {
      phone_id: uid,
    },
    method: 'POST',
    header: {
      'content-type': 'application/json',
      'X-Gizwits-Application-Id': 'cc33c0a6a8104e2fa9d83a221d680dfc'
    }
  })
}