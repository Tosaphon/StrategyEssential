import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'

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
class WishListScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      searchBegin: false,
      selectedSection: headerSection.Home,
      valueHome: 0,
      valueVideos: 0,
      valuePodcasts: 0,
      valueArticles: 0
    }
  }

  renderContentsList() {
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
            <View style={{ flexDirection: 'column' }}>
              <Text style={[Styles.title, {}]}>
                TITLE
              </Text>
              <Text style={[Styles.title, {}]}>
                SUBTITLE
              </Text>
              <Text style={[Styles.title, {}]}>
                DATE TIME
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return contentsList
  }

  renderSectionHeader() {
    const { valueHome, valueVideos, valuePodcasts, valueArticles, selectedSection } = this.state
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
        {this.renderHeader("Wish List", this.navigateBack)}
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

export default WishListScreen;
