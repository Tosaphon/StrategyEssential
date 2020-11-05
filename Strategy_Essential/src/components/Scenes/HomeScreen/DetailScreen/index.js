import React from 'react';
import { DeviceEventEmitter, Dimensions, Image, SafeAreaView, Text, TouchableWithoutFeedback, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Appearance, useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import Styles from '../../../BaseView/Styles';
import BaseComponent from '../../../Utility/BaseComponent';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from 'react-native-video-controls';

import RNBackgroundDownloader from 'react-native-background-downloader';

const { width, height } = Dimensions.get('screen')
const DOUBLE_PRESS_DELAY = 300;

class DetailScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRate: false,
      isShowRating: false,
      isTeserFullscreen: false,
      isTeserPause: false,
      lastTap: null,
      isBookmark: false,
      stackCount: 0,
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา',
      subTitle: 'ใน Podcast The Secret Sauce ตอนนี้ ผมจะมาพูดคุยถึงขั้นตอนวางกลยุทธ์ในเชิงเครื่องมือ หรือ Tools ขั้นตอนเหล่านี้จะช่วยนำทางเราและสามารถนำไปใช้ได้จริงกับทั้งบริษัท และส่วนบุคคล โดยปกติแล้วเมื่อพูดถึงการทำกลยุทธ์ บริษัทต่างๆ มักจะให้เอาคนที่เกี่ยวข้องทั้งหมดมารวมกัน หา Facilitator สักคนเพื่อมาทำ SWOT ด้วยกัน แปะโพสต์อิทไอเดียมากมาย แล้วโหวตให้คะแนนกัน เพราะไม่มีใครกล้าฆ่าไอเดียของคนอื่นๆ ทิ้ง',
      isVideoThumnail: true,
      isPodcast: false,
      isMuted: true,
      isVideoPlayed: false,
      scheme: Appearance.getColorScheme()
    };
  }

  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      this.setState({ isTeserPause: false })
    });
    this.reRender = this.props.navigation.addListener('blur', () => {
      this.setState({ isTeserPause: true })
    });
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
      console.log("colorScheme : ", colorScheme)
    })
    // console.log("isPodcast : ", this.props.route.params.isPodcast)
    this.getProps()
  }

  async getProps() {
    const isPodcast = await AsyncStorage.getItem('isPodcast')
    this.setState({ isPodcast: JSON.parse(isPodcast) })
  }

  downloadContent() {
    console.log("emit")
    DeviceEventEmitter.emit('downloadContents',
      {
        title: 'Strategy Approach แนวทางการวางกลยุทธ์ที่เหมาะกับคุณที่สุดทำอย่างไร | Strategy Clinic EP.1',
        desc: 'เมื่อความสำคัญของกลยุทธ์เพิ่มขึ้นอย่างทวีคูณในช่วงวิกฤต ตอนแรกของซีรีส์ Strategy Clinic ชวนคุณมองกลับไปที่ก้าวแรกของการวางกลยุทธ์ วาดตาราง 2x2 เพื่อหารูปแบบกลยุทธ์ที่เหมาะสมกับองค์กรของคุณเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
        image: require('../../../../images/mockup/podcast_01.png'),
        fill: 0,
        date: '19 SEP 2020'
      })
  }

  navigateBack() {
    DeviceEventEmitter.emit('audioBarActive', {
      isActive: false,
    });
    this.props.navigation.goBack()
  }

  renderRelateContents() {
    const { scheme } = this.state
    const thumnailWidth = width / 3
    const thumbailHeight = thumnailWidth * 9 / 16
    var contentsList = []
    for (var i = 0; i < 10; i++) {
      contentsList.push(
        <TouchableOpacity
          key={i}
          style={{ width: '100%', marginVertical: 10, marginHorizontal: 16, flexDirection: 'row' }}
          onPress={() => {
            this.props.navigation.push('ContentsDetailNavigation', {
              key: "ContentsDetailNavigation",
            })
          }}
        >
          <Image
            style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
            source={require('../../../../images/mockup/mock_video_thumnail01.png')}
          />
          <View style={{ flexDirection: 'column', flex: 1, paddingRight: 16 }}>
            <Text style={[this.getStyle(scheme).title, {}]}
              numberOfLines={2}
            >
              {this.state.title}
            </Text>
            <Text
              style={[this.getStyle(scheme).subTitleGray, {}]}
              numberOfLines={1}
            >
              The Secret Sauce EP.199
              </Text>
            <Text
              style={[this.getStyle(scheme).subTitleGray, {}]}
              numberOfLines={1}
            >
              19 SEP 2020
              </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return contentsList
  }
  renderVideoThumbnail() {
    const { isTeserPause, lastTap, isMuted } = this.state
    const videoHeight = width * 9 / 16
    return (
      <TouchableOpacity
        activeOpacity={1}
        // style={{ width: width, videoHeight: videoHeight }}
        onPress={async () => {
          const now = await Date.now()
          console.log('tab : ', now)
          if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            {
              Platform.OS == 'android' ?
                this.player.presentFullscreenPlayer()
                :
                null
            }

          } else {
            await this.setState({ lastTap: now, isMuted: !isMuted })
          }
        }}
      >
        <Video
          style={{
            width: width,
            height: videoHeight,
          }}
          paused={isTeserPause}
          muted={isMuted}
          source={require('../../../../Videos/video_01.mp4')}
          ref={(ref) => {
            this.player = ref
          }}
          resizeMode={"cover"}
          onError={(error) => { console.log('video error : ', error) }}
        />

        <View style={{ width: 30, height: 30, bottom: 10, right: 15, position: 'absolute' }}>
          {isMuted ?
            <Ionicons name="volume-mute" color='white' size={24} />
            :
            <Ionicons name="volume-high" color='white' size={24} />
          }

        </View>
      </TouchableOpacity>
    )
  }
  renderPictureThumnail() {
    return (
      <View style={{ width: width }}>
        <Image
          style={{ width: width, height: width * 9 / 16 }}
          // blurRadius={60}
          source={require('../../../../images/mockup/mock_video_thumnail01.png')}
        />
        {/* <LinearGradient
          colors={[
            'rgba(0, 0, 0,0)',
            'rgba(0, 0, 0,0.2)',
            'rgba(0, 0, 0,0.2)',
            'rgba(0, 0, 0,1)',
          ]}
          style={{
            width: '100%',
            height: 50,
            overflow: 'visible',
            marginTop: -20
          }} /> */}
      </View>
    )
  }

  render() {
    const { isTeserPause, lastTap, isRate, isVideoThumnail, isPodcast, isBookmark, isVideoPlayed } = this.state
    return (
      <View style={this.getStyle().container}>
        <Video
          pictureInPicture={true}
          fullscreen={true}
          playInBackground={false}
          paused={!isVideoPlayed}
          onFullscreenPlayerWillPresent={() => {
            this.setState({ isVideoPlayed: !isVideoPlayed })
          }}
          source={require('../../../../Videos/video_01.mp4')}
          ref={(ref) => {
            this.fullScreenPlayer = ref
          }}
          onError={(error) => { console.log('video error : ', error) }}
        />
        
        <SafeAreaView>
          {isVideoThumnail ?
            this.renderVideoThumbnail()
            :
            this.renderPictureThumnail()
          }
        </SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
          onPress={() => {
            this.setState({ isTeserPause: true })

            if (isPodcast) {
              DeviceEventEmitter.emit('navigateToPodcastPlayer')
            } else {
              // this.props.navigation.navigate('VideoFullScreen')
              this.fullScreenPlayer.presentFullscreenPlayer()
            }
          }}
        >
          <View style={{ width: '92%', backgroundColor: '#DFB445', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            {isPodcast ?
              <Feather style={{ marginRight: 5 }} name="headphones" color='white' size={26} />
              :
              <Entypo style={{ marginRight: 5 }} name="controller-play" color='white' size={26} />
            }

            <Text style={[this.getStyle().title, { marginVertical: 10 }]}>
              PLAY
          </Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={{ width: width }}>
          <Text style={[this.getStyle().title, { marginHorizontal: 20, marginVertical: 10 }]}>
            {this.state.title}
          </Text>
          <Text style={[this.getStyle().title, { marginHorizontal: 20, marginVertical: 10 }]}>
            {this.state.subTitle}
          </Text>

          <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              onPress={() => {
                this.setState({ isBookmark: !isBookmark })
              }}
            >
              {isBookmark ?
                <FontAwesome name="bookmark" color={this.getIconColor()} size={24} />
                :
                <FontAwesome name="bookmark-o" color={this.getIconColor()} size={24} />
              }
              <Text style={[this.getStyle().title, { fontSize: 10, marginTop: 5 }]}>My List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              onPress={() => {
                this.setState({ isRate: !isRate, isShowRating: true })
              }}
            >
              <AntDesign name={isRate ? "like1" : "like2"} color={this.getIconColor()} size={30} />
              <Text style={[this.getStyle().title, { fontSize: 10, marginTop: 5 }]}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              onPress={() => {
                this.downloadContent()
              }}
            >
              <MaterialCommunityIcons name="download" color={this.getIconColor()} size={30} />
              <Text style={[this.getStyle().title, { fontSize: 10, marginTop: 5 }]}>Download</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: width, flexDirection: 'column', marginTop: 20 }}>
            <Text style={[this.getStyle().title, { marginLeft: 20 }]}>Relate Contents</Text>
            {this.renderRelateContents()}
          </View>

        </ScrollView>

        <SafeAreaView style={{ position: 'absolute', right: 24, top: 7 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.popToTop()
            }}
          >
            <AntDesign name="closecircle" color='white' size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={{ position: 'absolute', left: 24, top: 5 }}>
          <TouchableOpacity
            onPress={() => {
              this.navigateBack()
            }}
          >
            <Ionicons name="arrow-back-circle" color='white' size={30} />
          </  TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default DetailScreen;
