import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import Styles from '../../../BaseView/Styles';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';

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
      <View style={Styles.container}>
        {this.renderHeader("Inbox", this.navigateBack)}
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
