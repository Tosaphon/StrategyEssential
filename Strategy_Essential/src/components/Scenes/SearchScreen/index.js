import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image, DeviceEventEmitter } from 'react-native';
import { Appearance, useColorScheme } from 'react-native-appearance';
import BaseComponent from '../../Utility/BaseComponent'

import Styles from '../../BaseView/Styles';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('screen')

const headerSection = {
  Home: 'Home',
  Videos: 'Videos',
  Podcasts: 'Podcasts',
  Articles: 'Articles'
}
class SearchScreen extends BaseComponent {
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

  renderContentsList() {
    const thumnailWidth = width / 3
    const thumbailHeight = thumnailWidth * 9 / 16
    const { scheme } = this.state
    var contentsList = []
    for (var i = 0; i < 10; i++) {
      contentsList.push(

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => { this.navigateToContentsDetail() }}
        >
          <View
            style={{ width: '100%', marginVertical: 10, marginHorizontal: 16, flexDirection: 'row' }}
          >
            <Image
              style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
              source={require('../../../images/mockup/mock_video_thumnail01.png')}
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

  renderSearchView() {
    return (
      <SafeAreaView style={{ width: this.state.width, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          marginVertical: 10,
          marginLeft: 24,
          marginRight: 12,
          backgroundColor: '#2f2f2f',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}>
          <Feather name="search" color='gray' size={26} style={{ marginLeft: 16, marginVertical: 4 }} />
          <TextInput
            style={{ marginLeft: 8, flex: 1 }}
            placeholder='Search'
            placeholderTextColor='gray'
            onFocus={() => { this.setState({ searchBegin: true }) }}
          />
        </View>
        {this.state.searchBegin ?
          <View style={{ flex: 0.15 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ searchBegin: false })
                Keyboard.dismiss(0)
              }}
            >
              <Text style={{ color: 'white' }}>
                Cancle
          </Text>
            </TouchableOpacity>
          </View> : null
        }
      </SafeAreaView>
    )
  }

  renderSectionHeader() {
    const { valueHome, valueVideos, valuePodcasts, valueArticles, selectedSection, scheme } = this.state
    return (
      <View style={{ width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          activeOpacity={0.8}
          onPress={() => { this.setState({ selectedSection: headerSection.Home }) }}
        >
          <Text style={[Styles.title, { color: selectedSection == headerSection.Home ? 'white' : 'gray' }]}>
            Home ({valueHome})
            </Text>
        </TouchableOpacity>
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
            Articels ({valueArticles})
            </Text>
        </TouchableOpacity>
      </View>
    )
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
        {this.renderFooter()}
        {this.renderSearchView()}
        {this.renderSectionHeader()}
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          // contentContainerStyle={{ flexGrow: 1, width: '100%' }}
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

export default SearchScreen;
