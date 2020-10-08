import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions, Platform, DeviceEventEmitter } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Appearance, useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from '../../../Utility/BaseComponent'
import Styles from '../../../BaseView/Styles';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'


const { width, height } = Dimensions.get('screen')
const switchScreenCase = {
  DetailScreen: 'ContentsDetailNavigation'
}

class VideosScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      access_token: '',
      scheme: Appearance.getColorScheme()
    };
  }
  componentDidMount() {
  }

  async setTabbarBottomHeight(height) {
    try {
      await AsyncStorage.setItem('tabbarBottomHeight', height.toString())
    } catch (e) {
      // saving error
    }
  }

  async login() {
    var self = this
    var bodyFormData = new FormData();
    bodyFormData.append('username', 'admin');
    bodyFormData.append('password', '123456');
    await axios({
      method: 'post',
      url: 'http://coachflix.mmzilla.com/api/v1/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(async function (response) {
        //handle success
        // console.log(response);
        const token = response.data.data.token
        console.log('token : ', token)
        await self.setState({ access_token: token })
        self.getProfile()
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  async getProfile() {
    const AuthStr = 'Bearer ' + this.state.access_token
    await axios.get('http://coachflix.mmzilla.com/api/v1/profile', {
      headers: { 'Authorization': AuthStr }
    })
      .then(async function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
  switchToScreen(screenName) {
    this.props.navigation.navigate(screenName)
  }

  renderIpadHeader() {
    if (Platform.isPad) {
      return (
        <View style={{ width: width, backgroundColor: 'black', alignItems: 'flex-end', paddingTop: 20, paddingBottom: 8 }}>
          <Feather name="search" color='white' size={26} />
        </View>
      )
    }
  }

  renderCategory() {
    let videoList = []
    for (var i = 0; i < 10; i++) {
      videoList.push(
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.switchToScreen(switchScreenCase.DetailScreen)
          }}
        >
          <Image style={{ width: 132, height: 74, backgroundColor: 'white', marginRight: 10, marginLeft: i == 0 ? 20 : 10 }}
            source={require('../../../../images/mockup/mock_video_thumnail01.png')}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ width: width, marginTop: 20 }}>
        <Text style={[Styles.title, { marginLeft: 20, marginVertical: 10 }]}>
          Trending Now
          </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <View style={{ flexDirection: 'row' }}>
            {videoList}
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.renderFooter()}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => {
              this.switchToScreen(switchScreenCase.DetailScreen)
              // DeviceEventEmitter.emit('audioBarActive', {
              //   isActive: true,
              // });
            }}
          >
            <Image
              style={{
                width: width,
                height: width * 800 / 1200
              }}
              resizeMode='contain'
              source={require('../../../../images/mockup/cover.jpg')}
            />
          </TouchableOpacity>
          {this.renderCategory()}
          {this.renderCategory()}
          {this.renderCategory()}
          {this.renderCategory()}
          {this.renderCategory()}
          {/* <Image
            style={{ top: 0, bottom: 0, left: 0, right: 0 }}
            resizeMode='stretch'
            source={require('../../../images/mockup/home_bg.png')}
          /> */}
          <View style={{ height: 40 }} />
        </ScrollView>
        {this.renderHeaderBG()}

        <View
          ///for detect tabbar bottom height
          style={{ position: 'absolute', width: width, bottom: 0 }}
          onLayout={event => {
            const bottom = height - event.nativeEvent.layout.y
            this.setTabbarBottomHeight(bottom)
          }}
        />
      </View>
    );
  }
}

{/* <Tab.Screen
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <Feather name="search" color={color} size={26} />
            ),
          }}
          name="Search" component={SearchStackScreen} /> */}

export default VideosScreen;
