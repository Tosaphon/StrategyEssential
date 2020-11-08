import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, Dimensions, Platform, DeviceEventEmitter, TouchableOpacity, Linking, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from '../../Utility/BaseComponent'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Modal from 'react-native-modal';
import LoadingView from '../../BaseView/LoadingView';
import { authentication, getContents } from '../../BaseView/Service'
import Video from 'react-native-video'

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
      toptabHeight: 0,
      showPopup: false,
      isLoading: true,
      highlights: null,
      categories: null,
      isTeserPause: false,
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
    this.reRender = this.props.navigation.addListener('focus', () => {
      this.setState({ isTeserPause: false })
    });
    this.reRender = this.props.navigation.addListener('blur', () => {
      this.setState({ isTeserPause: true })
    });

    this.onload()
  }

  onload = async () => {
    await authentication(this.handleSignIn)
    await getContents(this.handleGetContents)
  }

  dismissPopup() {
  }

  handleGetContents = async (result) => {
    if (result.isError) {
      console.log('fail : ', result)
    } else {
      console.log('success : ', result)
      let content = result.response.data.data.home
      await this.setState({ highlights: content.highlight, categories: content.categories })
    }
  }

  handleSignIn = async (result) => {
    if (result.isError) {
      Alert.alert('error')
      console.log(result.response)
    }
  }

  async switchToScreen(screenName) {
    await AsyncStorage.setItem('isPodcast', 'false')
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
          key={i}
          activeOpacity={0.8}
          style={[this.getStyle().backgroundBW, { flexDirection: 'column', width: thumnailWidth, marginRight: 10, marginLeft: i == 0 ? 20 : 10 }]}
          onPress={() => {
            this.analyticsTracker("ContentClick", { id: '123', type: 'video' })
            this.switchToScreen(switchScreenCase.DetailScreen)
          }}
        >
          <Image style={{ width: thumnailWidth, height: thumnailHeight, backgroundColor: 'white' }}
            source={mockThumnail[Math.floor(Math.random() * mockThumnail.length - 1) + 1].url}
          />
          <View style={{ width: '100%' }}>
            <Text style={[this.getStyle().title, { marginVertical: 5, marginHorizontal: 5 }]} numberOfLines={2}>
              วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา
          </Text>
            <Text style={[this.getStyle().subTitleGray, { marginHorizontal: 5 }]} numberOfLines={2}>
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

  renderPopUpModal() {
    const imageWidth = width * 2 / 3
    const imageHeight = imageWidth * 960 / 650
    return (
      <Modal
        isVisible={this.state.showPopup}
        hasBackdrop={true}
        style={{ margin: 0, width: width, height: height }}
      >
        <View style={{ width: width, height: height, position: 'absolute', backgroundColor: 'black', opacity: 0.5, }} />
        <View style={{ width: width, height: height, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: imageWidth, alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => { this.setState({ showPopup: false }) }}>
              <AntDesign name="closecircle" color='white' size={26} style={{ marginTop: -30, marginRight: -24 }} />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'white' }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                const url = "https://www.facebook.com/110765340497594/posts/163228651917929/?extid=0&d=n"
                Linking.canOpenURL(url).then(supported => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    console.log("Don't know how to open URI: " + this.props.url);
                  }
                });
                this.setState({ showPopup: false })
              }}>
              <Image
                style={{ width: imageWidth, height: imageHeight, }}
                source={require('../../../images/popup.jpg')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderHighlight() {
    const { highlights, categories, isTeserPause } = this.state
    let contentHeight = width * 9 / 16
    if (highlights) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.switchToScreen(switchScreenCase.DetailScreen)
          }}
        >
          <SafeAreaView>
            {highlights.video[0] ?
              <Video
                style={{
                  width: width,
                  height: contentHeight,
                }}
                paused={isTeserPause}
                // muted={isMuted}
                source={{ uri: highlights.video[0].path }}
                ref={(ref) => {
                  this.player = ref
                }}
                resizeMode={"cover"}
                onError={(error) => { console.log('video error : ', error) }}
              />
              :
              <Image
                style={{
                  width: width,
                  height: contentHeight
                }}
                resizeMode='contain'
                source={{ uri: highlights.image[1].path }}
              />
            }
          </SafeAreaView>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { scheme } = this.state
    return (
      <View style={this.getStyle(scheme).container}>
        <StatusBar
          barStyle={this.state.scheme == 'light' ? 'dark-content' : 'light-content'}
        />
        {this.renderPopUpModal()}
        {this.renderFooter()}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderHighlight()}
          {this.renderCategory(0)}
          {this.renderCategory(1)}
          {this.renderCategory(2)}
          {this.renderCategory(3)}
          {this.renderCategory(4)}
          <View style={{ height: 40 }} />
        </ScrollView>
        <LoadingView visible={this.state.isLoading} />
      </View>
    );
  }
}

export default HomeScreen;
