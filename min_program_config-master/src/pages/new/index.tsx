import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'



@inject('counterStore')
@observer
class Index extends Component {


  async componentDidShow() {
   

  }
  render() {

    return (
      <View className='index'>
       <Text> 设备已经配网成功</Text>
      </View>
    )
  }
}

export default Index as ComponentType
