import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image, StatusBar } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import Styles from '../../../BaseView/Styles';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';

const MOCK_THUMNAIL = {
  videos: [
    {
      title: 'Strategy Approach แนวทางการวางกลยุทธ์ที่เหมาะกับคุณที่สุดทำอย่างไร | Strategy Clinic EP.1',
      desc: 'เมื่อความสำคัญของกลยุทธ์เพิ่มขึ้นอย่างทวีคูณในช่วงวิกฤต ตอนแรกของซีรีส์ Strategy Clinic ชวนคุณมองกลับไปที่ก้าวแรกของการวางกลยุทธ์ วาดตาราง 2x2 เพื่อหารูปแบบกลยุทธ์ที่เหมาะสมกับองค์กรของคุณเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
      image: require('../../../../images/mockup/podcast_01.png'),
      like: 760,
      share: 10
    },
    {
      title: 'กรณีศึกษาร้านทำฟัน กลยุทธ์เอาตัวรอดของ SMEs ในช่วงเศรษฐกิจแย่ | Strategy Clinic EP.2',
      desc: 'The Secret Sauce: Strategy Clinic เปิดรับผู้ป่วยรายแรก กรณีศึกษาจากร้านทำฟันที่อยู่ในช่วงขาขึ้น ด้วยจำนวนคนไข้ที่เพิ่มขึ้นทำให้ตัดสินใจลงทุนเพิ่ม ทว่า วิกฤตโควิด-19 ส่งผลให้ภาพรวมกำลังซื้อลดลง บวกกับคลินิกมากมายหันมาแข่งขันกันที่ราคาเพื่อดึงดูดลูกค้า เขาควรลงมาสู้ในสมรภูมิราคาหรือไม่ กลยุทธ์หลังจากนี้ควรเป็นอย่างไรเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี เจ้าของ Facebook Group Strategy Essential',
      image: require('../../../../images/mockup/podcast_02.png'),
      like: 12300,
      share: 1234
    },
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199',
      desc: 'จากการเป็นผู้กำหนดอนาคตในตอนที่แล้ว ดร.ธนัย ชรินทร์สาร ผู้เชี่ยวชาญด้านกลยุทธ์ เจ้าของ Facebook group Strategy Essential จะมาอธิบายถึงขั้นตอนวางกลยุทธ์ในเชิงของเครื่องมือ ซึ่งสามารถนำไปลองใช้ได้กับทั้งบริษัท หรือทำให้ตัวเองประสบความสำเร็จในระดับบุคคลก็ได้กลยุทธ์ที่ดีสำหรับธุรกิจในอนาคต จำเป็นต้องมีความสอดคล้องกันและคิดอย่างเป็นระบบ ด้วยขั้นตอนต่อไปนี้ 1. ตีกรอบ 2. การสำรวจ 3. การสร้างอนาคตหลายรูปแบบ 4. การเลือกอนาคต 5. วางแผน และ 6. การลงมือทำแบบ ลองดูสิ',
      image: require('../../../../images/mockup/podcast_03.png'),
      like: 2000,
      share: 100
    },
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 1 เมื่อคุณไม่ได้มีอนาคตเดียว | The Secret Sauce EP.198',
      desc: 'กลับมาอีกครั้งตามคำเรียกร้อง! เคน นครินทร์ ชวนคุณมาพูดคุยกับ อาจารย์ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ เจ้าของ Facebook Group Strategy Essential ผู้มีประสบการณ์มายาวนานกว่า 20 ปี ทบทวนหนทางสู่ความสำเร็จอีกที ท่ามกลางสถานการณ์โลกธุรกิจที่ทุกคนยอมรับว่า วันนี้ยิ่งทวีคูณความยากมากขึ้นเรื่อยๆ',
      image: require('../../../../images/mockup/podcast_04.png'),
      like: 0,
      share: 2000
    },
  ],
  podcasts: [
    {
      title: 'Strategy Process เครื่องมือสร้างกลยุทธ์ด้วยตัวเองให้อยู่รอดในโลกยุค Disruption',
      desc: 'ผู้นำต้องทำอย่างไรถึงสามารถสร้างกลยุทธ์ที่ดีให้ตนเองและองค์กรในยุคที่ทุกคนต่างรู้ดีว่ากลยุทธ์คือหัวใจสำคัญที่ทำให้องค์กรก้าวไปข้างหน้า แต่เมื่อถึงเวลาลงมือทำจริง ผู้นำจำนวนไม่น้อยกลับคิดไม่ออก ไม่รู้ว่าควรเริ่มต้นไปทางไหน จนท้ายที่สุดก็ต้องจ้าง Outsource เข้ามาช่วย ซึ่งแน่นอนว่าข้อดีคือพวกเขามีความเชี่ยวชาญ แต่หากมองอีกด้าน กว่าจะออกแบบกลยุทธ์ได้สำเร็จก็อาจชักช้าไม่ทันต่อโลกที่เปลี่ยนแปลงเร็วกว่าที่คิดเคน นครินทร์ คุยกับ ดร.ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ ผู้มีประสบการณ์กว่า 20 ปี ในรายการ The Secret Sauce',
      image: require('../../../../images/mockup/podcast_05.png'),
      like: 0,
      share: 2000
    },
  ],
  articles: [
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199',
      desc: 'จากการเป็นผู้กำหนดอนาคตในตอนที่แล้ว ดร.ธนัย ชรินทร์สาร ผู้เชี่ยวชาญด้านกลยุทธ์ เจ้าของ Facebook group Strategy Essential จะมาอธิบายถึงขั้นตอนวางกลยุทธ์ในเชิงของเครื่องมือ ซึ่งสามารถนำไปลองใช้ได้กับทั้งบริษัท หรือทำให้ตัวเองประสบความสำเร็จในระดับบุคคลก็ได้กลยุทธ์ที่ดีสำหรับธุรกิจในอนาคต จำเป็นต้องมีความสอดคล้องกันและคิดอย่างเป็นระบบ ด้วยขั้นตอนต่อไปนี้ 1. ตีกรอบ 2. การสำรวจ 3. การสร้างอนาคตหลายรูปแบบ 4. การเลือกอนาคต 5. วางแผน และ 6. การลงมือทำแบบ ลองดูสิ',
      image: require('../../../../images/mockup/podcast_02.png'),
      like: 2000,
      share: 100
    },
    {
      title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 1 เมื่อคุณไม่ได้มีอนาคตเดียว | The Secret Sauce EP.198',
      desc: 'กลับมาอีกครั้งตามคำเรียกร้อง! เคน นครินทร์ ชวนคุณมาพูดคุยกับ อาจารย์ธนัย ชรินทร์สาร ที่ปรึกษาและวิทยากรด้านกลยุทธ์ เจ้าของ Facebook Group Strategy Essential ผู้มีประสบการณ์มายาวนานกว่า 20 ปี ทบทวนหนทางสู่ความสำเร็จอีกที ท่ามกลางสถานการณ์โลกธุรกิจที่ทุกคนยอมรับว่า วันนี้ยิ่งทวีคูณความยากมากขึ้นเรื่อยๆ',
      image: require('../../../../images/mockup/podcast_01.png'),
      like: 0,
      share: 2000
    },
  ]
}

const { width, height } = Dimensions.get('screen')

const headerSection = {
  Home: 'Home',
  Videos: 'Videos',
  Podcasts: 'Podcasts',
  Articles: 'Articles'
}
class InboxScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      searchBegin: false,
      selectedSection: headerSection.Home,
      valueHome: 0,
      valueVideos: 0,
      valuePodcasts: 0,
      valueArticles: 0,
      scheme: Appearance.getColorScheme()
    }
  }
  componentDidMount() {
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
      console.log("colorScheme : ", colorScheme)
    })
  }

  renderContentsList() {
    const { scheme } = this.state
    const thumnailWidth = width / 3
    const thumbailHeight = thumnailWidth * 9 / 16
    var contentsList = []
    for (var i = 0; i < 10; i++) {
      contentsList.push(

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => { this.navigateToContentsDetail() }}
        >
          <View style={{ width: this.state.width, marginVertical: 10, marginLeft: 16, flexDirection: 'row' }}>
            <Image
              style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
              source={require('../../../../images/mockup/mock_video_thumnail01.png')}
            />
            <View style={{ flexDirection: 'column', flex: 1, paddingRight: 16 }}>
              <Text style={[this.getStyle(scheme).title, {}]}
                numberOfLines={2}
              >
                วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา
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
          </View>
        </TouchableOpacity>
      )
    }
    return contentsList
  }

  renderNoresultScreen() {
    return (
      <View style={{ width: width }}>
      </View>
    )
  }

  render() {
    return (
      <View style={this.getStyle().container}>
        <StatusBar barStyle='light-content'/>
        {this.renderTitleHeader(global.l10n.InboxHeaderTitleLabel)}
        {this.renderFooter()}
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

export default InboxScreen;
