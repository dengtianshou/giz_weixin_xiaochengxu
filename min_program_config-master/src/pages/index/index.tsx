import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import GizwitsSdk from 'mini_program_gizwits_sdk';
import { View, Button, Text, Input, Form } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'


import './index.scss'
import { AnonymousLogin } from '../../services/openApi'
import { setGlobalData, getGlobalData } from '../../utils/global'



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
    SSID: '',
    password: '',
  };
  async componentDidMount() {
    const uid = '7a90c0abba3b4af18b1056c1e8981178';
    const userData = await AnonymousLogin({ uid });
    console.log('userData', userData);
    console.log('index里面的token')
    console.log('用户token为：',userData.data.token)
    console.log('index里面的uid')
    console.log('用户uid为：',userData.data.uid)
    console.log('index里面data为：',userData.data)
    setGlobalData('token', userData.data.token)
    // setGlobalData('uid', uid)
    setGlobalData('uid', userData.data.uid)

    wx.startWifi({
      success(res){
        console.log(res.errMsg, 'wifi初始化成功')
      },
      fail:function(res){
        console.log(res.errMsg, 'wifi初始化失败')
      }
    });
  }
  componentDidShow() {
    wx.startWifi({
      success(res){
    
        console.log(res.errMsg, 'wifi初始化成功')
        
      },
      fail:function(res){
        console.log(res.errMsg, 'wifi初始化失败')
      }
    });
    // 获取当前连接wifi
    wx.getConnectedWifi({
      success: (data) => {
        console.log(data.wifi.SSID);
        this.setState({
          SSID: data.wifi.SSID
        });
      }
    });
  }
  formSubmit1 = (e) => {
    const { SSID } = this.state;
    const {password, pk, ps } = e.currentTarget.value;
    // if(!pk) {
    //   Taro.showModal({
    //     title: '错误',
    //     content: '请输入正确的pk',
    //     showCancel: false,
    //   })
    //   return;
    // }
    // if(!ps) {
    //   Taro.showModal({
    //     title: '错误',
    //     content: '请输入正确的ps',
    //     showCancel: false,
    //   })
    //   return;
    // }
    Taro.navigateTo({
      // url: `/pages/config/index?SSID=${SSID}&password=${password}&pk=${pk}&ps=${ps}`,
      url: `/pages/config/index?SSID=${SSID}&password=${password}`,
    });
  }
  gotoPanel = e =>{
    Taro.navigateTo({
      url: `/pages/new/index`,
    });
  }

  render() {
    const { SSID } = this.state;
    return (
      <Form onSubmit={this.formSubmit1} >
        <View className='index'>

        <Text>
            版本号为002\n\n
        </Text>
        {/* <Input name='pk' style={{ border: '1px solid #000' }}></Input> */}
          {/* <Text>
            请输入PK
        </Text>
          <Input name='pk' style={{ border: '1px solid #000' }}></Input>

          <Text>
            请输入PS
        </Text>
          <Input name='ps' style={{ border: '1px solid #000' }}></Input> */}

          <Text>
            当前wifi：{SSID}
          </Text>
          <View>
            <Text>
              请输入密码
        </Text>
            <Input name='password' style={{ border: '1px solid #000' }}></Input>
          </View>

          <Button formType="submit" >下一步</Button>
          
          
        </View>

        <Button onClick={this.gotoPanel}>测试页面跳转</Button>
      </Form>
      

    )
  }
}

export default Index as ComponentType
