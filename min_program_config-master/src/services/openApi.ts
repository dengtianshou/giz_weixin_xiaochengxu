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
      'X-Gizwits-Application-Id': 'fbdb4a6934a44bdbb0658147429aac8d'
    }
  })
}