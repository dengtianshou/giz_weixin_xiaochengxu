import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import GizwitsSdk from 'mini_program_gizwits_sdk';

import './index.scss'
import { getGlobalData } from '../../utils/global';

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps;
}

@inject('counterStore')
@observer
class Index extends Component {
  state = {
    devices: [],
    isRun: false
  };

  async componentDidShow() {
    // 获取当前连接wifi
    const { SSID, password, pk, ps } = this.$router.params;
    const token = getGlobalData("token");
    const uid = getGlobalData("uid");

    // 增加匿名登录
    const sdk = new GizwitsSdk({
      appID: 'cc33c0a6a8104e2fa9d83a221d680dfc',
      appSecret: '0fb30ccaac5c4f558eed6205e431683a',
      // specialProductKeys: [pk],
      // specialProductKeySecrets: [ps],
      specialProductKeys: ['104a789c553e4d639bc03b27b5e489b5'],
      specialProductKeySecrets: ['6ed9a31fb13c4ab1af0e346fc48adee0'],
      token: token,
      uid: uid,
      cloudServiceInfo: null,
    });

    wx.getConnectedWifi({
      success: async (data) => {
        console.log(data.wifi.SSID);
        if (data.wifi.SSID.indexOf('XPG-GAgent-') !== -1) {
          // 开始配网
          this.setState({
            isRun: true
          });

          try {
            const data = await sdk.setDeviceOnboardingDeploy({
              ssid: SSID,
              password: password,
              timeout: 60,
              softAPSSIDPrefix: 'XPG-GAgent-',
            });
            console.log('setDeviceOnboardingDeploy', data);
            if (data.success) {
              this.setState({
                devices: data.data,
              });
            }
          } catch (error) {
            console.log('setDeviceOnboardingDeployError', error);
          }
        }
      }
    });

  }

  gotoPanel_2 = e =>{
    Taro.navigateTo({
      url: `/pages/new/index`,
    });
  }

  render() {
    const { devices, isRun } = this.state;
    return (
      <View className='index'>
        {
          isRun === false ? <Text>请连接到wifi XPG-GAgent-***</Text> : null
          // <Text> 测试</Text>
          // <Button onClick={this.gotoPanel_2}>测试页面跳转</Button>
        }
        {
          isRun && devices.length === 0 ? <Text>正在发现设备</Text> : null
        }
        {
          devices.length > 0 && devices.map(item => {
          // return <Text>{item.did}</Text> 
            // return <Text>{"设备mac为:"+item.mac}</Text> 
            Taro.navigateTo({
              url: `/pages/new/index`,
            });
            
          })
        }
      </View>
    )
  }
}

export default Index as ComponentType
