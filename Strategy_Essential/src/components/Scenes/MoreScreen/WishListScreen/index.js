import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image, ScrollView ,Alert} from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import Styles from '../../../BaseView/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MOCK_THUMNAIL = {
  videos: [
    {
      title: 'Strategy Approach แนวทางการวางกลยุทธ์ที่เหมาะกับคุณที่สุดทำอย่างไร | Strategy Clinic EP.1',
      desc: 'เมื่อความสำคัญของกลยุทธ์เพิ่มขึ้นอย่างทวีคูณในช่วงวิกฤต ตอนแรกของซีรีส์ Strategy Clinic ชวนคุณมองกลับไปที่ก้าวแรกของการวางกลยุทธ์ วาดตาราง 2x2 เพื่อหารูปแบบกลยุทธ์ที่เหมาะสมกับองค์กรของคุณเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
      image: require('../../../../images/mockup/podcast_01.png'),
      like: 760,
      share: 10,
      date: '19 SEP 2020'
    },
    {
      title: 'กรณีศึกษาร้านทำฟัน กลยุทธ์เอาตัวรอดของ SMEs ในช่วงเศรษฐกิจแย่ | Strategy Clinic EP.2',
      desc: 'The Secret Sauce: Strategy Clinic เปิดรับผู้ป่วยรายแรก กรณีศึกษาจากร้านทำฟันที่อยู่ในช่วงขาขึ้น ด้วยจำนวนคนไข้ที่เพิ่มขึ้นทำให้ตัดสินใจลงทุนเพิ่ม ทว่า วิกฤตโควิด-19 ส่งผลให้ภาพรวมกำลังซื้อลดลง บวกกับคลินิกมากมายหันมาแข่งขันกันที่ราคาเพื่อดึงดูดลูกค้า เขาควรลงมาสู้ในสมรภูมิราคาหรือไม่ กลยุทธ์หลังจากนี้ควรเป็นอย่างไรเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
      image: require('../../../../images/mockup/podcast_02.png'),
      like: 12300,
      share: 1234,
      date: '19 SEP 2020'
    },
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199',
      desc: 'จากการเป็นผู้กำหนดอนาคตในตอนที่แล้ว ดร.ธนัย ชรินทร์สาร ผู้เชี่ยวชาญด้านกลยุทธ์ เจ้าของ Facebook group Strategy Essential จะมาอธิบายถึงขั้นตอนวางกลยุทธ์ในเชิงของเครื่องมือ ซึ่งสามารถนำไปลองใช้ได้กับทั้งบริษัท หรือทำให้ตัวเองประสบความสำเร็จในระดับบุคคลก็ได้กลยุทธ์ที่ดีสำหรับธุรกิจในอนาคต จำเป็นต้องมีความสอดคล้องกันและคิดอย่างเป็นระบบ ด้วยขั้นตอนต่อไปนี้ 1. ตีกรอบ 2. การสำรวจ 3. การสร้างอนาคตหลายรูปแบบ 4. การเลือกอนาคต 5. วางแผน และ 6. การลงมือทำแบบ ลองดูสิ',
      image: require('../../../../images/mockup/podcast_03.png'),
      like: 2000,
      share: 100,
      date: '19 SEP 2020'
    },
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 1 เมื่อคุณไม่ได้มีอนาคตเดียว | The Secret Sauce EP.198',
      desc: 'กลับมาอีกครั้งตามคำเรียกร้อง! เคน นครินทร์ ชวนคุณมาพูดคุยกับ อาจารย์ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ เจ้าของ Facebook Group Strategy Essential ผู้มีประสบการณ์มายาวนานกว่า 20 ปี ทบทวนหนทางสู่ความสำเร็จอีกที ท่ามกลางสถานการณ์โลกธุรกิจที่ทุกคนยอมรับว่า วันนี้ยิ่งทวีคูณความยากมากขึ้นเรื่อยๆ',
      image: require('../../../../images/mockup/podcast_04.png'),
      like: 0,
      share: 2000,
      date: '19 SEP 2020'
    },
  ],
  podcasts: [
    {
      title: 'Strategy Process เครื่องมือสร้างกลยุทธ์ด้วยตัวเองให้อยู่รอดในโลกยุค Disruption',
      desc: 'ผู้นำต้องทำอย่างไรถึงสามารถสร้างกลยุทธ์ที่ดีให้ตนเองและองค์กรในยุคที่ทุกคนต่างรู้ดีว่ากลยุทธ์คือหัวใจสำคัญที่ทำให้องค์กรก้าวไปข้างหน้า แต่เมื่อถึงเวลาลงมือทำจริง ผู้นำจำนวนไม่น้อยกลับคิดไม่ออก ไม่รู้ว่าควรเริ่มต้นไปทางไหน จนท้ายที่สุดก็ต้องจ้าง Outsource เข้ามาช่วย ซึ่งแน่นอนว่าข้อดีคือพวกเขามีความเชี่ยวชาญ แต่หากมองอีกด้าน กว่าจะออกแบบกลยุทธ์ได้สำเร็จก็อาจชักช้าไม่ทันต่อโลกที่เปลี่ยนแปลงเร็วกว่าที่คิดเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี ในรายการ The Secret Sauce',
      image: require('../../../../images/mockup/podcast_05.png'),
      like: 0,
      share: 2000,
      date: '19 SEP 2020'
    },
  ],
  articles: [
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199',
      desc: 'จากการเป็นผู้กำหนดอนาคตในตอนที่แล้ว ดร.ธนัย ชรินทร์สาร ผู้เชี่ยวชาญด้านกลยุทธ์ เจ้าของ Facebook group Strategy Essential จะมาอธิบายถึงขั้นตอนวางกลยุทธ์ในเชิงของเครื่องมือ ซึ่งสามารถนำไปลองใช้ได้กับทั้งบริษัท หรือทำให้ตัวเองประสบความสำเร็จในระดับบุคคลก็ได้กลยุทธ์ที่ดีสำหรับธุรกิจในอนาคต จำเป็นต้องมีความสอดคล้องกันและคิดอย่างเป็นระบบ ด้วยขั้นตอนต่อไปนี้ 1. ตีกรอบ 2. การสำรวจ 3. การสร้างอนาคตหลายรูปแบบ 4. การเลือกอนาคต 5. วางแผน และ 6. การลงมือทำแบบ ลองดูสิ',
      image: require('../../../../images/mockup/podcast_02.png'),
      like: 2000,
      share: 100,
      date: '19 SEP 2020'
    },
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 1 เมื่อคุณไม่ได้มีอนาคตเดียว | The Secret Sauce EP.198',
      desc: 'กลับมาอีกครั้งตามคำเรียกร้อง! เคน นครินทร์ ชวนคุณมาพูดคุยกับ อาจารย์ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ เจ้าของ Facebook Group Strategy Essential ผู้มีประสบการณ์มายาวนานกว่า 20 ปี ทบทวนหนทางสู่ความสำเร็จอีกที ท่ามกลางสถานการณ์โลกธุรกิจที่ทุกคนยอมรับว่า วันนี้ยิ่งทวีคูณความยากมากขึ้นเรื่อยๆ',
      image: require('../../../../images/mockup/podcast_01.png'),
      like: 0,
      share: 2000,
      date: '19 SEP 2020'
    },
  ]
}

const { width, height } = Dimensions.get('screen')

const headerSection = {
  Videos: 'Videos',
  Podcasts: 'Podcasts',
  Articles: 'Articles'
}
class WishListScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      enableEdit: false,
      searchBegin: false,
      selectedSection: headerSection.Videos,
      valueVideos: 0,
      valuePodcasts: 0,
      valueArticles: 0,
      result: MOCK_THUMNAIL
    }

  }
  getResult() {
    const result = MOCK_THUMNAIL
    this.setState({
      result: MOCK_THUMNAIL,
      valueVideos: result.videos.length,
      valuePodcasts: result.podcasts.length,
      valueArticles: result.articles.length,
    })
  }

  componentDidMount() {
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
      console.log("colorScheme : ", colorScheme)
    })
    this.getResult()
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
    const { result, selectedSection } = this.state
    var section = result.videos
    switch (selectedSection) {
      case headerSection.Videos:
        section = result.videos
        break
      case headerSection.Podcasts:
        section = result.podcasts
        break
      case headerSection.Articles:
        section = result.articles
        break
    }
    const thumnailWidth = width / 3
    const thumbailHeight = thumnailWidth * 9 / 16
    var contentsList = []
    for (var i = 0; i < section.length; i++) {
      contentsList.push(

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => { this.navigateToContentsDetail() }}
        >
          <View style={{ width: this.state.width, marginVertical: 10, marginLeft: 16, flexDirection: 'row' }}>
            <Image
              style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
              source={section[i].image}
            />

            <View style={{ flexDirection: 'column', flex: 1, paddingRight: 16 }}>
              <Text style={[Styles.title, {}]}
                numberOfLines={2}
              >
                {section[i].title}
              </Text>
              <Text
                style={[this.getStyle().subTitleGray, {}]}
                numberOfLines={1}
              >
                {section[i].desc}
              </Text>
              <Text style={[this.getStyle().subTitleGray, {}]}>
                {section[i].date}
              </Text>
            </View>

            {this.state.enableEdit ?
              <View style={{ width: 60, marginRight: 16, justifyContent: 'center', alignItems: 'center' ,height:60}}>
                {this.renderRemoveButton(i)}
                  </View>
              :
              null
            }

          </View>
        </TouchableOpacity>
      )
    }
    return contentsList
  }

  renderSectionHeader() {
    const { valueVideos, valuePodcasts, valueArticles, selectedSection } = this.state
    return (
      <View style={{ width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          activeOpacity={0.8}
          onPress={() => { this.setState({ selectedSection: headerSection.Videos }) }}
        >
          <Text style={[Styles.title, { color: selectedSection == headerSection.Videos ? 'white' : 'gray' }]}>
            Videos ({valueVideos})
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          activeOpacity={0.8}
          onPress={() => { this.setState({ selectedSection: headerSection.Podcasts }) }}
        >
          <Text style={[Styles.title, { color: selectedSection == headerSection.Podcasts ? 'white' : 'gray' }]}>
            Podcasts ({valuePodcasts})
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          activeOpacity={0.8}
          onPress={() => { this.setState({ selectedSection: headerSection.Articles }) }}
        >
          <Text style={[Styles.title, { color: selectedSection == headerSection.Articles ? 'white' : 'gray' }]}>
            Articles ({valueArticles})
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  editToggle = () => {
    this.setState({ enableEdit: !this.state.enableEdit })
  }

  renderNoresultScreen() {
    return (
      <View style={{ width: width }}>
      </View>
    )
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.renderHeader("My List", this.editToggle, this.state.enableEdit)}
        {this.renderFooter()}
        {this.renderSectionHeader()}
        <ScrollView
          style={{ flex: 1, width: width }}
          onTouchStart={() => { this.setState({ searchBegin: false }) }}
          onScrollBeginDrag={() => {
            this.setState({ searchBegin: false })
            Keyboard.dismiss(0)
          }}
        >
          {this.renderContentsList()}

        </ScrollView>

      </View>
    );
  }
}

export default WishListScreen;
