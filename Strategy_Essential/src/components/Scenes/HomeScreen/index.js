import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions, Platform, DeviceEventEmitter, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from '../../Utility/BaseComponent'
import Styles from '../../BaseView/Styles';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

import axios from 'axios'
import { Appearance, useColorScheme } from 'react-native-appearance';

const { width, height } = Dimensions.get('window')
const switchScreenCase = {
  DetailScreen: 'ContentsDetailNavigation'
}

class HomeScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      access_token: '',
      scheme: Appearance.getColorScheme(),
      toptabHeight: 0,
      mockThumnail: [
        {
          url: require('../../../images/mockup/podcast_01.png'),
          title: 'New Release'
        },
        {
          url: require('../../../images/mockup/podcast_02.png'),
          title: 'Trending Now'
        },
        {
          url: require('../../../images/mockup/podcast_03.png'),
          title: 'Special For You'
        },
        {
          url: require('../../../images/mockup/podcast_04.png'),
          title: 'Money'
        },
        {
          url: require('../../../images/mockup/podcast_05.png'),
          title: 'World Trending'
        },

      ]
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.addListener('navigateToPodcastDetail', this.navigateToPodcastDetail);
    });
    this.reRender = this.props.navigation.addListener('blur', () => {
      DeviceEventEmitter.removeListener('navigateToPodcastDetail')
    });
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
      console.log("colorScheme : ", colorScheme)
    })
  }


  async setTabbarBottomHeight(height) {
    try {
      await AsyncStorage.setItem('tabbarBottomHeight', height.toString())
    } catch (e) {
      // saving error
      console.log('error : ', e)
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
    this.props.navigation.navigate(screenName, { isPodcast: false })
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

  likeAndShareBar(likeNumber, shareNumber) {
    const { scheme } = this.state
    return (
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#216FD9', marginLeft: 5 }}>
            <Foundation name="like" color='white' size={20} />
          </View>
          <Text style={[this.getStyle(scheme).title, { marginLeft: 5 }]}>
            {likeNumber}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
          <Text style={[this.getStyle(scheme).subTitle, {}]}>
            {shareNumber} Share
          </Text>
        </View>
      </View>
    )
  }

  renderCategory(index) { //index for mock
    const { mockThumnail, scheme } = this.state
    let videoList = []

    const thumnailWidth = Platform.isPad ? width / 3 : width / 2
    const thumnailHeight = thumnailWidth / 132 * 74
    for (var i = 0; i < mockThumnail.length - 1; i++) {

      videoList.push(
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flexDirection: 'column', width: thumnailWidth, marginRight: 10, marginLeft: i == 0 ? 20 : 10, backgroundColor: '#111' }}
          onPress={() => {
            this.switchToScreen(switchScreenCase.DetailScreen)
          }}
        >
          <Image style={{ width: thumnailWidth, height: thumnailHeight, backgroundColor: 'white' }}
            source={mockThumnail[Math.floor(Math.random() * mockThumnail.length - 1) + 1].url}
          />
          <View style={{ width: '100%' }}>
            <Text style={[this.getStyle(scheme).title, { marginVertical: 5, marginHorizontal: 5 }]} numberOfLines={2}>
              วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา
          </Text>
            <Text style={[this.getStyle(scheme).subTitleGray, { marginHorizontal: 5 }]} numberOfLines={2}>
              ใน Podcast The Secret Sauce ตอนนี้ ผมจะมาพูดคุยถึงขั้นตอนวางกลยุทธ์ในเชิงเครื่องมือ หรือ Tools ขั้นตอนเหล่านี้จะช่วยนำทางเราและสามารถนำไปใช้ได้จริงกับทั้งบริษัท และส่วนบุคคล โดยปกติแล้วเมื่อพูดถึงการทำกลยุทธ์ บริษัทต่างๆ มักจะให้เอาคนที่เกี่ยวข้องทั้งหมดมารวมกัน หา Facilitator สักคนเพื่อมาทำ SWOT ด้วยกัน แปะโพสต์อิทไอเดียมากมาย แล้วโหวตให้คะแนนกัน เพราะไม่มีใครกล้าฆ่าไอเดียของคนอื่นๆ ทิ้ง'
          </Text>
          </View>
          {this.likeAndShareBar(2, 4)}
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ width: width, marginTop: 5 }}>
        <Text style={[this.getStyle(scheme).title, { marginLeft: 20, marginVertical: 10 }]}>
          {mockThumnail[index].title}
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
    const { scheme } = this.state
    return (
      <View style={this.getStyle(scheme).container}>
        <SafeAreaView
          ///for detect tabbar top height
          style={{ width: width, top: 0 }}
        />
        {this.renderFooter()}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => {
              this.switchToScreen(switchScreenCase.DetailScreen)
            }}
          >
            <SafeAreaView>
              <Image
                style={{
                  width: width,
                  height: width * 800 / 1200
                }}
                resizeMode='contain'
                source={require('../../../images/mockup/cover.jpg')}
              />
            </SafeAreaView>
          </TouchableOpacity>
          {this.renderCategory(0)}
          {this.renderCategory(1)}
          {this.renderCategory(2)}
          {this.renderCategory(3)}
          {this.renderCategory(4)}
          {/* <Image
            style={{ top: 0, bottom: 0, left: 0, right: 0 }}
            resizeMode='stretch'
            source={require('../../../images/mockup/home_bg.png')}
          /> */}
          <View style={{ height: 40 }} />
        </ScrollView>
        {/* {this.renderHeaderBG(this.state.toptabHeight, this.state.scheme)} */}
        <View
          ///for detect tabbar bottom height
          style={{ position: 'absolute', width: width, bottom: 0, height: 10,}}
          onLayout={event => {
            const bottom = height - event.nativeEvent.layout.y
            this.setTabbarBottomHeight(bottom)
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;
