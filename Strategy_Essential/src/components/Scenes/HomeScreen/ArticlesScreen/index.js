import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions, Platform, DeviceEventEmitter } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from '../../../Utility/BaseComponent'
import Styles from '../../../BaseView/Styles';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios'
import { Appearance, useColorScheme } from 'react-native-appearance';
const switchScreenCase = {
  DetailScreen: 'ContentsDetailNavigation',
  ArticleDetail: 'ArticleDetail'
}

const { width, height } = Dimensions.get('window')

class ArticlesScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      scheme: Appearance.getColorScheme(),
      mockThumnail: [
        {
          url: require('../../../../images/mockup/podcast_01.png'),
          title: 'New Release'
        },
        {
          url: require('../../../../images/mockup/podcast_02.png'),
          title: 'Trending Now'
        },
        {
          url: require('../../../../images/mockup/podcast_03.png'),
          title: 'Special For You'
        },
        {
          url: require('../../../../images/mockup/podcast_04.png'),
          title: 'Money'
        },
        {
          url: require('../../../../images/mockup/podcast_05.png'),
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
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
      console.log("colorScheme : ", colorScheme)
    })
  }

  switchToScreen(screenName) {
    this.props.navigation.navigate(screenName)
  }

  renderImages() {
    const { mockUrl } = this.state
    var imageList = []
    for (var i = 0; i < mockUrl.length; i++) {
      imageList.push(
        <View
          key={i}
        >
          <Image
            style={{ width: width, height: width }}
            source={mockUrl[i].url}
          />
        </View>
      )
    }
    return imageList
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

  renderArticleListCategory(index) {
    const { scheme, mockThumnail } = this.state
    let videoList = []
    const thumnailWidth = Platform.isPad ? width / 3 : width / 2
    const thumnailHeight = thumnailWidth / 132 * 74
    for (var i = 0; i < mockThumnail.length; i++) {
      videoList.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.8}
          style={{ flexDirection: 'column', width: thumnailWidth, marginRight: 10, marginLeft: i == 0 ? 20 : 10, backgroundColor: '#111' }}
          onPress={() => {
            this.switchToScreen(switchScreenCase.ArticleDetail)
          }}
        >
          <Image style={{ width: thumnailWidth, height: thumnailHeight, backgroundColor: 'white' }}
            source={mockThumnail[Math.floor(Math.random() * mockThumnail.length - 1) + 1].url}
          />
          <View style={{ width: '100%' }}>
            <Text style={[this.getStyle(scheme).title, { marginVertical: 5, marginHorizontal: 5 }]} numberOfLines={2}>
              วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา
          </Text>
            <Text style={[this.getStyle(scheme).subTitleGray, { marginHorizontal: 5 }]} numberOfLines={2}>
              ใน Podcast The Secret Sauce ตอนนี้ ผมจะมาพูดคุยถึงขั้นตอนวางกลยุทธ์ในเชิงเครื่องมือ หรือ Tools ขั้นตอนเหล่านี้จะช่วยนำทางเราและสามารถนำไปใช้ได้จริงกับทั้งบริษัท และส่วนบุคคล โดยปกติแล้วเมื่อพูดถึงการทำกลยุทธ์ บริษัทต่างๆ มักจะให้เอาคนที่เกี่ยวข้องทั้งหมดมารวมกัน หา Facilitator สักคนเพื่อมาทำ SWOT ด้วยกัน แปะโพสต์อิทไอเดียมากมาย แล้วโหวตให้คะแนนกัน เพราะไม่มีใครกล้าฆ่าไอเดียของคนอื่นๆ ทิ้ง'
          </Text>
          </View>
          {this.likeAndShareBar(2, 4)}
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ width: width, marginTop: 20 }}>
        <Text style={[this.getStyle(scheme).title, { marginLeft: 20, marginVertical: 10 }]}>
          Trending Now
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

  render() {
    const { scheme } = this.state
    return (
      <View style={this.getStyle(scheme).container}>
        {this.renderFooter()}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width: width }}>
            <TouchableOpacity
              onPress={() => {
                this.switchToScreen(switchScreenCase.DetailScreen)
              }}
            >
              <SafeAreaView>
                <Image
                  style={{
                    width: width,
                    height: width * 800 / 1200
                  }}
                  resizeMode='cover'
                  source={require('../../../../images/mockup/podcast_05.png')}
                />
              </SafeAreaView>
            </TouchableOpacity>
            {this.renderArticleListCategory(0)}
            {this.renderArticleListCategory(1)}
            {this.renderArticleListCategory(2)}
            {this.renderArticleListCategory(3)}
            {this.renderArticleListCategory(4)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ArticlesScreen;
