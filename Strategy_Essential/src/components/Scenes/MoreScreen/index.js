import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, DeviceEventEmitter, StyleSheet, Image, Alert, Platform } from 'react-native';
import BaseComponent from '../../Utility/BaseComponent'
import { Appearance, useColor } from 'react-native-appearance';
import Styles from '../../BaseView/Styles';
import DeviceInfo from 'react-native-device-info';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('screen')
const menuList = ['Inbox', 'Wish List', 'App Settings', 'Help']
const switchScreenCase = {
  InboxScreen: 'InboxScreen',
  WishListScreen: 'WishListScreen',
  AppSettingScreen: 'AppSettingScreen',
  HelpScreen: 'HelpScreen',
  PodcastsSavedScreen: 'PodcastsSavedScreen'
}

class MoreScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
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
      ],
      mockTitle: ['New Series available', 'Podcast Weekly updates', 'The Standard x Strategy Essential'],
      profile: null
    }
  }

  componentDidMount() {
    this.getProfile()
  }

  async getProfile() {
    let stringProfile = await AsyncStorage.getItem('profile')
    let profile = await JSON.parse(stringProfile)
    this.setState({ profile: profile })
  }

  renderNotificationList() {
    const { mockThumnail, mockTitle } = this.state
    const thumnailWidth = Platform.isPad ? width / 4 : width / 3
    const thumnailHeight = thumnailWidth / 132 * 74
    let notificationList = []
    for (var i = 0; i < 3; i++) {
      notificationList.push(
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ width: width, marginBottom: 10, flexDirection: 'row', marginRight: 40 }}
          onPress={() => { this.navigateToContentsDetail() }}
        >
          <Image style={{ width: thumnailWidth, height: thumnailHeight, backgroundColor: 'white', marginLeft: 20, marginRight: 16 }}
            source={mockThumnail[i].url}
          />
          <View style={{ flexDirection: 'column', flex: 1, paddingRight: 16 }}>
            <Text style={[this.getStyle().title, {}]}
              numberOfLines={2}
            >
              {mockTitle[i]}
            </Text>
            <Text
              style={[this.getStyle().subTitleGray, {}]}
              numberOfLines={1}
            >
              The Secret Sauce EP.199
              </Text>
            <Text
              style={[this.getStyle().subTitleGray, {}]}
              numberOfLines={1}
            >
              19 SEP 2020
              </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return notificationList
  }

  render() {
    return (
      <ScrollView style={this.getStyle().scrollView}>
        <SafeAreaView style={[this.getStyle().container, { width: width }]}>
          <View style={{ paddingLeft: 16, paddingBottom: 8, paddingTop: 24 }}>
            <Text style={[this.getStyle().title, { fontSize: 16 }]}>{global.l10n.welcomeLabel} {this.state.profile ? this.state.profile.name : ""}</Text>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.WishListScreen);
              }}
            >
              <FontAwesome style={{ marginLeft: 20, marginRight: 16 }} name="bookmark-o" color={this.getIconColor()} size={26} />
              <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.myListLabel}</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.PodcastsSavedScreen);
              }}
            >
              <FontAwesome5 style={{ marginLeft: 20, marginRight: 16 }} name="headphones-alt" color={this.getIconColor()} size={26} />
              <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.podcastSaveTitleLabel}</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.AppSettingScreen);
              }}
            >
              <Feather style={{ marginLeft: 20, marginRight: 16 }} name="settings" color={this.getIconColor()} size={26} />
              <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.appSettingTitle}</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.HelpScreen);
              }}
            >
              <Feather style={{ marginLeft: 20, marginRight: 16 }} name="help-circle" color={this.getIconColor()} size={26} />
              <Text style={[this.getStyle().title, { flex: 1 }]}>Help</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <Text style={[this.getStyle().subTitleGray, { color: '#6a6a6a', marginTop: 10, marginLeft: 16 }]} allowFontScaling={false}>
            App Version : {DeviceInfo.getVersion()}
          </Text>
          <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert(global.l10n.logoutAlertTitleLabel, global.l10n.logoutAlertSubtitleLabel,
                  [
                    {
                      text: global.l10n.logoutAlertCancleButtonLabel,
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: global.l10n.logoutAlertSubmitButtonLabel, onPress: () => {
                        AsyncStorage.setItem("theme", 'dark')
                        AsyncStorage.setItem("isMember", "false")
                        DeviceEventEmitter.emit('switchTheme', { theme: 'dark' })
                        DeviceEventEmitter.emit('updateRootView');
                      }
                    }
                  ])
              }}
            >
              <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[this.getStyle().title, { fontSize: 16 }]} allowFontScaling={false}>
                  {global.l10n.logoutButtonLabel}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </ScrollView>
    );
  }
}

const ScreenStyles = StyleSheet.create({
  tableCell: {
    width: width,
    paddingVertical: 16,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
})

export default MoreScreen;
