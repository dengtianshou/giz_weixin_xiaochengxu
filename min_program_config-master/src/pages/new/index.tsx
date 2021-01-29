import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'
import  GizwitsWS  from '../../utils/gizwitsWSSdk'


@inject('counterStore')
@observer
class Index extends Component {


  async componentDidShow() {
   

  }
  render() {

    console.log('测试开始')
    const gizwitsWS =new GizwitsWS(
      'api.gizwits.com','6b7b688d783c47d0a2f9df8da4253366','35310579b8484ac4a67cb4d84ecb12a5','cc33c0a6a8104e2fa9d83a221d680dfc','attrs_v4','ssl_socket'
    );
    gizwitsWS.init();
    return (
      <View className='index'>
       <Text> 设备已经配网成功</Text>
      </View>
    )
  }
}

export default Index as ComponentType
