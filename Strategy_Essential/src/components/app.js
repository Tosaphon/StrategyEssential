import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, DeviceEventEmitter, AppState, Appearance, TouchableOpacity, StatusBar, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import RootStack from '../navigation/RootNavigation'
import OnboardingNavigation from '../navigation/OnboardingNavigation'
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../navigation/SplashScreen'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from './BaseView/Styles';
import PodcastScreen from '../components/Scenes/HomeScreen/DetailScreen/podcastPlayer'
import BaseComponent from './Utility/BaseComponent'
import Video from 'react-native-video';
import TrackPlayer from 'react-native-track-player';

let { width, height } = Dimensions.get('window')

const ENUM_SPEED = [
  1, 1.5, 2, 0.5
]

class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      tabbarBottomHeight: 0,
      activeAudioBar: true,
      slideIndicatorIndex: 1,
      numberOfList: 3,
      isMember: true,
      isPodcastPlay: false,
      isShowPodCastPlayer: false,
      loadingPreload: true,
      currentTime: 0,
      speedIndex: 0,
    };
  }
  componentDidMount() {
    this.getTabbarBottomHeight()
    this.eventListener = DeviceEventEmitter.addListener('audioBarActive', this.handleActiveAudioBar);
    this.eventListener = DeviceEventEmitter.addListener('navigateToPodcastPlayer', this.handleNavigateToPodcastPlayer);
    this.eventListener = DeviceEventEmitter.addListener('onBoardingIndicator', this.handleSlideIndicator);
    this.eventListener = DeviceEventEmitter.addListener('updateRootView', this.handleUpdateRootView);
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  onloadPreload = async (isMember) => {
    await this.setState({ loadingPreload: false, isMember: isMember })
  }

  _handleAppStateChange = async (nextAppState) => {
    if (this.state.appState.match(/inactive|background/)
      && nextAppState === 'active') {

      console.log("App has come to the foreground!");
    } else {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack) {
        TrackPlayer.play()
      }
    }
    this.setState({ appState: nextAppState });
  };

  handleNavigateToPodcastPlayer = async (event) => {
    await this.setState({ isShowPodCastPlayer: true, activeAudioBar: false, isPodcastPlay: false })
    console.log("isShowPodCastPlayer ", this.state.isShowPodCastPlayer)
  }

  handleUpdateRootView = async (event) => {
    const isMember = await AsyncStorage.getItem("isMember")
    var isMemberBool = (isMember == 'true');
    await this.setState({ isMember: isMemberBool })
  }

  handleSlideIndicator = async (event) => {
    await this.setState({ slideIndicatorIndex: event.index })
    console.log('index: ', event.index)
  }

  handleActiveAudioBar = async (event) => {
    await this.getTabbarBottomHeight()
    await this.setState({ activeAudioBar: event.isActive, isPodcastPlay: event.isActive, speedIndex: event.speedIndex })
    const time = await Math.round(event.currentTime)
    this.player && this.player.seek(time)
    console.log("seek time : ", event)
  }

  async getTabbarBottomHeight() {
    const tabbarBottomHeight = await AsyncStorage.getItem('tabbarBottomHeight')
    const height = await parseFloat(tabbarBottomHeight)
    await this.setState({ tabbarBottomHeight: height })
    console.log('tabbar height : ', height)
  }

  dismisPodcastPlayer = async () => {
    await this.setState({ isShowPodCastPlayer: false })
    console.log("isShowPodCastPlayer : ", this.state.isShowPodCastPlayer)
  }
  seek(time) {
    time = Math.round(time);
    this.player && this.player.seek(time);
    this.setState({
      currentTime: time,
      isPodcastPlay: false,
    });
  }
  async setTime(data) {
    await this.setState({ currentTime: Math.floor(data.currentTime) });
  }
  async setDuration(data) {
    await this.setState({ maximumTime: Math.floor(data.duration) });
  }

  renderAudioBar() {
    const { isPodcastPlay, tabbarBottomHeight, activeAudioBar } = this.state
    const thumnailWidth = width / 7
    return (
      <View>
        {tabbarBottomHeight && activeAudioBar ?
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              // DeviceEventEmitter.emit('navigateToPodcastPlayer')
              this.setState({ isShowPodCastPlayer: true, isPodcastPlay: false })
            }}
            style={{
              position: 'absolute',
              width: width,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: this.state.tabbarBottomHeight,
              flexDirection: 'row'
            }}
          >
            <Video
              onLoad={this.setDuration.bind(this)}
              onProgress={this.setTime.bind(this)}
              paused={!isPodcastPlay}
              playInBackground={true}
              source={require('../Videos/video_01.mp4')}
              ref={(ref) => {
                this.player = ref
              }}
            />

            <View style={{ width: thumnailWidth, height: thumnailWidth * 3 / 4, backgroundColor: 'black', marginLeft: 20, marginVertical: 10 }}>
            </View>
            <Text
              style={[Styles.title, { flex: 1, color: 'black', marginHorizontal: 12 }]}
              numberOfLines={2}
            >
              วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199
              </Text>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { this.setState({ isPodcastPlay: !isPodcastPlay }) }}
            >
              {isPodcastPlay ?
                <Ionicons name="pause" color='black' size={30} />
                :
                <Entypo name="controller-play" color='black' size={30} />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', marginRight: 12 }}
              onPress={() => { this.setState({ activeAudioBar: false }) }}
            >
              <Ionicons name="close" color='black' size={30} />
            </TouchableOpacity>

          </TouchableOpacity>
          : null
        }
      </View>
    )
  }

  renderRootStack() {
    return (
      <View style={{ width: width, height: height }}>
        {Platform.OS == 'ios' ?
          <StatusBar barStyle={this.state.scheme == 'light' ? 'dark-content' : 'light-content'} />
          :
          null
        }
        <RootStack scheme={this.state.scheme} />
        <PodcastScreen
          isVisible={this.state.isShowPodCastPlayer}
          dismiss={this.dismisPodcastPlayer}
          currentTime={this.state.currentTime}
          speedIndex={this.state.speedIndex}
        />
        {this.renderAudioBar()}
      </View>
    )
  }

  renderOnboarding() {
    return (
      <View style={{ width: width, height: height }}>
        <OnboardingNavigation />
        <View style={{
          position: 'absolute',
          width: width,
          height: 50,
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white' }}>
            {this.renderSliderIndicator()}
          </Text>
        </View>
      </View>
    )
  }
  renderSliderIndicator() {
    var indicators = []
    const { slideIndicatorIndex, numberOfList } = this.state

    if (slideIndicatorIndex != numberOfList + 1) {
      for (let i = 1; i < numberOfList + 1; i++) {
        console.log('slideIndicatorIndex : ', slideIndicatorIndex)
        const indicatorSize = i == slideIndicatorIndex ? 10 : 7
        indicators.push(
          <View style={{ width: indicatorSize, height: indicatorSize, borderRadius: indicatorSize, backgroundColor: 'white', marginHorizontal: 3 }} />
        )
      }
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {indicators}
      </View>
    )
  }

  render() {
    if (this.state.loadingPreload) {
      return <SplashScreen onloadPreload={this.onloadPreload} />
    } else {
      if (this.state.isMember) {
        return this.renderRootStack()
      } else {
        return this.renderOnboarding()
      }
    }

  }
}

export default App
