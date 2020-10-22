import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, DeviceEventEmitter, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Appearance, useColorScheme } from 'react-native-appearance';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Video from 'react-native-video';

import Styles from '../../BaseView/Styles';
import BaseComponent from '../../Utility/BaseComponent'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-navigation';

// const MOCK_THUMNAIL = {
//   videos: [
//     {
//       title: 'Strategy Approach แนวทางการวางกลยุทธ์ที่เหมาะกับคุณที่สุดทำอย่างไร | Strategy Clinic EP.1',
//       desc: 'เมื่อความสำคัญของกลยุทธ์เพิ่มขึ้นอย่างทวีคูณในช่วงวิกฤต ตอนแรกของซีรีส์ Strategy Clinic ชวนคุณมองกลับไปที่ก้าวแรกของการวางกลยุทธ์ วาดตาราง 2x2 เพื่อหารูปแบบกลยุทธ์ที่เหมาะสมกับองค์กรของคุณเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
//       image: require('../../../images/mockup/podcast_01.png'),
//       fill: 0,
//       date: '19 SEP 2020'
//     },
//     {
//       title: 'กรณีศึกษาร้านทำฟัน กลยุทธ์เอาตัวรอดของ SMEs ในช่วงเศรษฐกิจแย่ | Strategy Clinic EP.2',
//       desc: 'The Secret Sauce: Strategy Clinic เปิดรับผู้ป่วยรายแรก กรณีศึกษาจากร้านทำฟันที่อยู่ในช่วงขาขึ้น ด้วยจำนวนคนไข้ที่เพิ่มขึ้นทำให้ตัดสินใจลงทุนเพิ่ม ทว่า วิกฤตโควิด-19 ส่งผลให้ภาพรวมกำลังซื้อลดลง บวกกับคลินิกมากมายหันมาแข่งขันกันที่ราคาเพื่อดึงดูดลูกค้า เขาควรลงมาสู้ในสมรภูมิราคาหรือไม่ กลยุทธ์หลังจากนี้ควรเป็นอย่างไรเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
//       image: require('../../../images/mockup/podcast_02.png'),
//       fill: 0,
//       date: '19 SEP 2020'
//     },
//     {
//       title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199',
//       desc: 'จากการเป็นผู้กำหนดอนาคตในตอนที่แล้ว ดร.ธนัย ชรินทร์สาร ผู้เชี่ยวชาญด้านกลยุทธ์ เจ้าของ Facebook group Strategy Essential จะมาอธิบายถึงขั้นตอนวางกลยุทธ์ในเชิงของเครื่องมือ ซึ่งสามารถนำไปลองใช้ได้กับทั้งบริษัท หรือทำให้ตัวเองประสบความสำเร็จในระดับบุคคลก็ได้กลยุทธ์ที่ดีสำหรับธุรกิจในอนาคต จำเป็นต้องมีความสอดคล้องกันและคิดอย่างเป็นระบบ ด้วยขั้นตอนต่อไปนี้ 1. ตีกรอบ 2. การสำรวจ 3. การสร้างอนาคตหลายรูปแบบ 4. การเลือกอนาคต 5. วางแผน และ 6. การลงมือทำแบบ ลองดูสิ',
//       image: require('../../../images/mockup/podcast_03.png'),
//       fill: 0,
//       date: '19 SEP 2020'
//     },
//     {
//       title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 1 เมื่อคุณไม่ได้มีอนาคตเดียว | The Secret Sauce EP.198',
//       desc: 'กลับมาอีกครั้งตามคำเรียกร้อง! เคน นครินทร์ ชวนคุณมาพูดคุยกับ อาจารย์ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ เจ้าของ Facebook Group Strategy Essential ผู้มีประสบการณ์มายาวนานกว่า 20 ปี ทบทวนหนทางสู่ความสำเร็จอีกที ท่ามกลางสถานการณ์โลกธุรกิจที่ทุกคนยอมรับว่า วันนี้ยิ่งทวีคูณความยากมากขึ้นเรื่อยๆ',
//       image: require('../../../images/mockup/podcast_04.png'),
//       fill: 0,
//       date: '19 SEP 2020'
//     },
//   ]
// }

const { width, height } = Dimensions.get('screen')

class DownloadsScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit: false,
      fillList: [0, 0, 0, 0],
      destinationPath: "",
      scheme: Appearance.getColorScheme(),
      downloadedVideo: ['', '', '', ''],
      downloadedPodcast: ['', '', '', ''],
      downloadList: [],
    };
    // this.startDownload()
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.addListener('navigateToPodcastDetail', this.navigateToPodcastDetail);
      DeviceEventEmitter.addListener('downloadContents', this.startDownload);
    });
    this.reRender = this.props.navigation.addListener('blur', () => {
      DeviceEventEmitter.removeListener('navigateToPodcastDetail')
    });
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
    })
  }

  startDownload = async (event) => {
    const { downloadList } = this.state
    this.setState({ downloadList: [...downloadList, event] })
    console.log("downloadList : ", downloadList)
    // const destination = RNBackgroundDownloader.directories.documents + '/.videos/BigBuckBunny'
    // console.log('destination : ', destination)
    // let task = RNBackgroundDownloader.download({
    //   id: 'BigBuckBunny',
    //   url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //   destination: destination
    // }).begin((expectedBytes) => {
    //   console.log(`Going to download ${expectedBytes} bytes!`);
    // }).progress((percent) => {
    //   this.setState({ fill: parseInt(percent) * 100 })
    // }).done(() => {
    //   this.setState({ fill: 100 })
    //   this.setState({ destinationPath: destination })
    //   console.log('Download is done!');
    // }).error((error) => {
    //   console.log('Download canceled due to error: ', error);
    // });
  }
  getProgressCircular(index) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => { }}
      >
        <AnimatedCircularProgress
          size={40}
          width={3}
          fill={this.state.fillList[index]}
          tintColor="white"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <Text style={Styles.title}>
                {this.state.fillList[index]}
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </TouchableOpacity>
    )
  }

  renderRemoveButton(index) {
    const { scheme } = this.state
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          Alert.alert("Would you like to remove this video?", "",
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'remove', onPress: () => {
                  this.setState({ mockVideoCount: this.state.mockVideoCount - 1 })
                }
              }
            ])
        }}
      >
        <Text
          style={[this.getStyle(scheme).title, { color: 'red', fontWeight: '800', fontSize: 12 }]}>
          REMOVE
        </Text>
      </TouchableOpacity>
    )
  }

  renderContentsList() {
    const { scheme, mockVideoCount, fillList, downloadList } = this.state
    const thumnailWidth = width / 3
    const thumbailHeight = thumnailWidth * 9 / 16
    var contentsList = []
    for (var i = 0; i < downloadList.length; i++) {
      contentsList.push(
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            var tempList = fillList
            tempList[i] = tempList[i] + 10
            this.setState({ fillList: tempList })
          }}
        >
          <View style={{ width: this.state.width, marginVertical: 10, marginLeft: 16, flexDirection: 'row' }}>
            <Image
              style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
              source={downloadList[i].image}
            />
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={[this.getStyle().title, {}]}
                numberOfLines={2}
              >
                {downloadList[i].title}
              </Text>
              <Text style={[this.getStyle().subTitleGray, {}]}
                numberOfLines={1}
              >
                {downloadList[i].desc}
              </Text>
              <Text style={[this.getStyle().subTitleGray, {}]}
                numberOfLines={1}
              >
                {downloadList[i].date}
              </Text>
            </View>
            <View style={{ width: 60, marginRight: 16, justifyContent: 'center', alignItems: 'center', height: 60 }}>
              {this.state.enableEdit ?
                this.renderRemoveButton(i) :
                this.state.downloadList[i] < 100 ?
                  this.getProgressCircular(i) :
                  <MaterialIcons name="done" color='green' size={30} />
              }
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return contentsList
  }

  renderNoVideoView() {
    const { scheme } = this.state
    const cycleSize = width / 3
    return (
      <View style={[this.getStyle(scheme).container, { alignItems: 'center' }]}>
        <View style={{ width: cycleSize, height: cycleSize, backgroundColor: 'gray', borderRadius: cycleSize, marginTop: 120, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="file-download" color='white' size={width / 4} />
        </View>
        <Text style={[this.getStyle(scheme).title, { marginVertical: 16, marginHorizontal: 32, textAlign: 'center' }]}>
          You can download all contents such as videos or podcasts for see it later with offline mode
          </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        >
          <View style={{ borderColor: 'white', borderWidth: 1 }}>
            <Text style={[this.getStyle(scheme).title, { marginVertical: 12, marginHorizontal: 16 }]}>FIND MORE TO DOWNLOAD</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderFineMoreToDownload() {
    const { scheme } = this.state
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.props.navigation.navigate('Home')
        }}
      >
        <View style={{ borderColor: 'white', borderWidth: 1 }}>
          <Text style={[this.getStyle(scheme).title, { marginVertical: 12, marginHorizontal: 16 }]}>FIND MORE TO DOWNLOAD</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderVideoList() {
    var videoList = []
    for (var i = 0; i < this.state.downloadedVideo.length; i++) {
      videoList.push(

      )
    }
  }

  render() {
    const { enableEdit, scheme, downloadList } = this.state
    if (downloadList.length == 0) {
      return this.renderNoVideoView()
    } else {

      return (
        <SafeAreaView style={this.getStyle(scheme).container}>
          <View
            style={{ width: width, alignItems: 'flex-end' }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                this.setState({ enableEdit: !enableEdit })
              }}
            >
              {enableEdit ?
                <Text style={[this.getStyle(scheme).title, { marginRight: 16, height: 26 }]}>
                  Done
                </Text>
                :
                <MaterialIcons style={{ marginRight: 16 }} name="edit" color='white' size={26} />
              }

            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ flex: 1, width: width }}
          >
            <Text style={[this.getStyle(scheme).title, { marginLeft: 16 }]}>
              Videos
              </Text>
            {this.renderContentsList()}
            <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
              {this.renderFineMoreToDownload()}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

export default DownloadsScreen;
