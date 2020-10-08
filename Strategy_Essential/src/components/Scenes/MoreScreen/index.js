import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, DeviceEventEmitter, StyleSheet, Image, Alert } from 'react-native';
import BaseComponent from '../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import Styles from '../../BaseView/Styles';
import DeviceInfo from 'react-native-device-info';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('screen')
const menuList = ['Inbox', 'Wish List', 'App Settings', 'Help']
const switchScreenCase = {
  InboxScreen: 'InboxScreen',
  WishListScreen: 'WishListScreen',
  AppSettingScreen: 'AppSettingScreen',
  HelpScreen: 'HelpScreen'
}

class MoreScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      scheme: Appearance.getColorScheme()
    };
  }

  componentDidMount() {
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ scheme: colorScheme })
      console.log("colorScheme : ", colorScheme)
    })
  }

  renderNotificationList() {
    const { scheme } = this.state
    const thumnailWidth = width / 4
    let notificationList = []
    for (var i = 0; i < 3; i++) {
      notificationList.push(
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ width: width, marginBottom: 10, flexDirection: 'row', marginRight: 40 }}
          onPress={() => { this.navigateToContentsDetail() }}
        >
          <Image style={{ width: thumnailWidth, height: thumnailWidth * 3 / 4, backgroundColor: 'white', marginLeft: 20, marginRight: 16 }}
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
        </TouchableOpacity>
      )
    }
    return notificationList
  }

  render() {
    const { scheme } = this.state
    return (
      <ScrollView style={{ width: width, backgroundColor: '#1E1F1E' }}>
        <SafeAreaView style={[Styles.container, { width: width }]}>
          <View style={{ paddingLeft: 16, paddingBottom: 8, paddingTop: 24 }}>
            <Text style={[Styles.title, { fontSize: 16 }]}>Menu</Text>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={ScreenStyles.tableCell}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.InboxScreen);
              }}
            >
              <Feather style={{ marginLeft: 20, marginRight: 16 }} name="inbox" color='white' size={26} />
              <Text style={[Styles.title, { flex: 1 }]}>Inbox</Text>
              <View style={{ width: 26, height: 26, borderRadius: 26, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={Styles.title}>
                  1</Text>
              </View>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          {this.renderNotificationList()}
          <View style={{ width: width }}>
            <TouchableOpacity style={ScreenStyles.tableCell}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.WishListScreen);
              }}
            >
              <Feather style={{ marginLeft: 20, marginRight: 16 }} name="heart" color='white' size={26} />
              <Text style={[Styles.title, { flex: 1 }]}>Wish List</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={ScreenStyles.tableCell}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.AppSettingScreen);
              }}
            >
              <Feather style={{ marginLeft: 20, marginRight: 16 }} name="settings" color='white' size={26} />
              <Text style={[Styles.title, { flex: 1 }]}>App Setting</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <View style={{ width: width }}>
            <TouchableOpacity style={ScreenStyles.tableCell}
              onPress={() => {
                this.props.navigation.navigate(switchScreenCase.HelpScreen);
              }}
            >
              <Feather style={{ marginLeft: 20, marginRight: 16 }} name="help-circle" color='white' size={26} />
              <Text style={[Styles.title, { flex: 1 }]}>Help</Text>
              <MaterialIcons style={{ paddingRight: 24 }} name="navigate-next" color='#737373' size={26} />
            </TouchableOpacity>
          </View>
          <Text style={[this.getStyle(scheme).subTitleGray, { color: '#6a6a6a', marginTop: 10 }]} allowFontScaling={false}>
            App Version : {DeviceInfo.getVersion()}
          </Text>


          <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert("Would you like to sign out?", "",
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    { text: 'Sign out', onPress: () => console.log('OK Pressed') }
                  ])
              }}
            >
              <Text style={[this.getStyle(scheme).title, { fontSize: 16 }]} allowFontScaling={false}>
                Sign Out
          </Text>
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
