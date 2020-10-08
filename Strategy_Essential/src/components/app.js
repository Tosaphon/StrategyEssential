import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, DeviceEventEmitter, AppState, Appearance } from 'react-native';
import RootStack from '../navigation/RootNavigation'
import OnboardingNavigation from '../navigation/OnboardingNavigation'
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../navigation/SplashScreen'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Styles from './BaseView/Styles';
import PodcastScreen from '../components/Scenes/HomeScreen/DetailScreen/podcastPlayer'


let { width, height } = Dimensions.get('window')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      tabbarBottomHeight: 0,
      activeAudioBar: false,
      slideIndicatorIndex: 1,
      numberOfList: 3,
      isMember: true,
      isPodcastPlay: false,
      isShowPodCastPlayer: false,
      loadingPreload: true
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

  onloadPreload = async (isMember) => {
    await this.setState({ loadingPreload: false, isMember: isMember })
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/)
      && nextAppState === 'active') {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };

  handleNavigateToPodcastPlayer = async (event) => {
    await this.setState({ isShowPodCastPlayer: true })
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
    await this.setState({ activeAudioBar: event.isActive, isPodcastPlay: event.isActive })
  }

  async getTabbarBottomHeight() {
    const tabbarBottomHeight = await AsyncStorage.getItem('tabbarBottomHeight')
    const height = await parseFloat(tabbarBottomHeight)
    await this.setState({ tabbarBottomHeight: height })
    console.log('tabbar height : ', height)
  }

  dismisPodcastPlayer = async () => {
    await this.setState({ isShowPodCastPlayer: false })
  }

  renderAudioBar() {
    const { isPodcastPlay, tabbarBottomHeight, activeAudioBar } = this.state
    const thumnailWidth = width / 7
    return (
      <View>
        {tabbarBottomHeight != 0 && activeAudioBar ?
          <View
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
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                this.setState({ isShowPodCastPlayer: true })
              }}
            >
              <View style={{ width: thumnailWidth, height: thumnailWidth * 3 / 4, backgroundColor: 'black', marginLeft: 20, marginVertical: 10 }}>
              </View>
            </TouchableOpacity>
            <Text
              style={[Styles.title, { flex: 1, color: 'black', marginHorizontal: 12 }]}
              numberOfLines={2}
            >
              วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199
              </Text>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { this.setState({ isPodcastPlay: !isPodcastPlay }) }}
            >
              {isPodcastPlay ?
                <Ionicons name="pause" color='black' size={30} />
                :
                <Entypo name="controller-play" color='black' size={30} />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}
              onPress={() => { this.setState({ activeAudioBar: false }) }}
            >
              <Ionicons name="close" color='black' size={30} />
            </TouchableOpacity>

          </View>
          : null
        }
      </View>
    )
  }

  renderRootStack() {
    return (
      <View style={{ width: width, height: height }}>
        <RootStack />
        <PodcastScreen isVisible={this.state.isShowPodCastPlayer} dismiss={this.dismisPodcastPlayer} />
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
        if (i == slideIndicatorIndex) {
          indicators.push(
            <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: 'white', marginHorizontal: 3 }} />
          )
        } else {
          indicators.push(
            <View style={{ width: 7, height: 7, borderRadius: 7, backgroundColor: 'white', marginHorizontal: 3 }} />
          )
        }
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
    }
    if (this.state.isMember) {
      return this.renderRootStack()
    } else {
      return this.renderOnboarding()
    }
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: width,
    height: height
  },
  container: {
    position: 'absolute',
    width: width,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
});

export default App
