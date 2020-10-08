import React from 'react';
import { DeviceEventEmitter, Dimensions, Image, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appearance, useColorScheme } from 'react-native-appearance';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from "react-native-share";
import Video from 'react-native-video';
import Styles from '../../../BaseView/Styles';
import BaseComponent from '../../../Utility/BaseComponent';
import LinearGradient from 'react-native-linear-gradient';

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
      stackCount: 0,
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา',
      subTitle: 'ใน Podcast The Secret Sauce ตอนนี้ ผมจะมาพูดคุยถึงขั้นตอนวางกลยุทธ์ในเชิงเครื่องมือ หรือ Tools ขั้นตอนเหล่านี้จะช่วยนำทางเราและสามารถนำไปใช้ได้จริงกับทั้งบริษัท และส่วนบุคคล โดยปกติแล้วเมื่อพูดถึงการทำกลยุทธ์ บริษัทต่างๆ มักจะให้เอาคนที่เกี่ยวข้องทั้งหมดมารวมกัน หา Facilitator สักคนเพื่อมาทำ SWOT ด้วยกัน แปะโพสต์อิทไอเดียมากมาย แล้วโหวตให้คะแนนกัน เพราะไม่มีใครกล้าฆ่าไอเดียของคนอื่นๆ ทิ้ง',
      isVideoThumnail: false,
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

  renderRating() {
    return (
      <Modal
        isVisible={this.state.isShowRating}
        hasBackdrop={true}
        // backdropColor='black'
        // backdropOpacity={0.4}
        customBackdrop={
          <TouchableWithoutFeedback
            onPress={() => { this.setState({ isShowRating: false }) }}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        }
      >
        <View style={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={Styles.title}>
            Rating
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name={isRate = "staro"} color='white' size={30} />
          </View>
        </View>
      </Modal>
    )
  }

  renderVideoThumbnail() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const now = Date.now()
          console.log('tab : ', now)
          if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            this.player.presentFullscreenPlayer()
          } else {
            this.setState({ lastTap: now, isTeserPause: !isTeserPause })
          }
        }}
      >
        <Video
          style={{
            width: width,
            height: width * 9 / 16,
          }}
          paused={isTeserPause}
          source={require('../../../../Videos/video_01.mp4')}
          ref={(ref) => {
            this.player = ref
          }}
          onError={(error) => { console.log('video error : ', error) }}
        />
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
    const { isTeserPause, lastTap, isRate, isVideoThumnail } = this.state
    return (
      <View style={Styles.container}>
        <SafeAreaView>
          {this.renderRating()}
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
            DeviceEventEmitter.emit('navigateToPodcastPlayer')
          }}
        >
          <View style={{ width: '92%', backgroundColor: '#DFB445', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Entypo name="controller-play" color='white' size={26} />
            <Text style={[Styles.title, { marginVertical: 10 }]}>
              PLAY
          </Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={{ width: width }}>
          <Text style={[Styles.title, { marginHorizontal: 20, marginVertical: 10 }]}>
            {this.state.title}
          </Text>
          <Text style={[Styles.title, { marginHorizontal: 20, marginVertical: 10 }]}>
            {this.state.subTitle}
          </Text>

          <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              onPress={() => { }}
            >
              <AntDesign name="plus" color='white' size={30} />
              <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Wish List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              onPress={() => {
                this.setState({ isRate: !isRate, isShowRating: true })
              }}
            >
              <AntDesign name={isRate ? "star" : "staro"} color='white' size={30} />
              <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              onPress={() => {
                const options = {
                  title: 'Share via',
                  message: this.state.title,
                  url: 'some share url',
                  filename: 'test', // only for base64 file in Android
                };
                Share.open(options)
                  .then((res) => { console.log(res) })
                  .catch((err) => { err && console.log(err); });
              }}
            >
              <AntDesign name="sharealt" color='white' size={30} />
              <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: width, flexDirection: 'column', marginTop: 20 }}>
            <Text style={[Styles.title, { marginLeft: 20 }]}>Relate Contents</Text>
            {this.renderRelateContents()}
          </View>

        </ScrollView>

        <SafeAreaView style={{ position: 'absolute', right: 24 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.popToTop()
            }}
          >
            <AntDesign name="closecircle" color='white' size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={{ position: 'absolute', left: 24 }}>
          <TouchableOpacity
            onPress={() => {
              this.navigateBack()
            }}
          >
            <Ionicons name="arrow-back-circle" color='white' size={30} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default DetailScreen;
