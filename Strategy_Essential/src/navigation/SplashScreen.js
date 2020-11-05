import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import FullScreenError from '../components/BaseView/FullScreenError'
import LocalizedStrings from "react-native-localization";
import axios from 'axios';

let strings = new LocalizedStrings({
  en: {
    homeTabbar: 'Home',
    inboxTabbar: 'Inbox',
    searchTabbar: 'Search',
    downloadTabbar: 'Download',
    moreTabbar: 'More',
    homeTopTabbar: 'Home',
    videoTopTabbar: 'Videos',
    podcastTopTabbar: 'Podcasts',
    articleTopTabbar: 'Articles',
    feedTopTabbar: 'Feed',

    myListLabel: 'My List',
    wifiOnlyLabel: 'Wifi Only',
    languageLabel: 'Language',
    themeLabel: 'Theme',
    removeAllDownloadsLabel: 'Remove all downloads',
    removeAllDownloadsAlertTitle: ' Remove all downloads',
    removeAllDownloadsAlertSubtitle: 'Would you like to remove all download?',
    removeAllDownloadsAlertConfirmTitle: 'Remove',
    removeAllDownloadsAlertCancelTitle: 'Cancel',
    onWifiLabel: 'On',
    offWifiLabel: 'Off',
    thaiLocalizeLabel: 'TH',
    englishLocalizeLabel: 'EN',
    appSettingTitle: 'App Setting',
  },
  th: {
    homeTabbar: 'หน้าแรก',
    inboxTabbar: 'กล่องข้อความ',
    searchTabbar: 'ค้นหา',
    downloadTabbar: 'ดาวน์โหลด',
    moreTabbar: 'อื่นๆ',
    homeTopTabbar: 'หน้าแรก',
    videoTopTabbar: 'วีดีโอ',
    podcastTopTabbar: 'พอตแคส',
    articleTopTabbar: 'บทความ',
    feedTopTabbar: 'ข้อความ',

    myListLabel: 'ลิสของฉัน',
    wifiOnlyLabel: 'Wifi Only',
    languageLabel: 'ภาษา',
    themeLabel: 'ธีม',
    removeAllDownloadsLabel: 'ลบรายการดาวน์โหลดทั้งหมด',
    removeAllDownloadsAlertTitle: ' ลบรายการดาวน์โหลดทั้งหมด',
    removeAllDownloadsAlertSubtitle: 'คุณต้องการลบรายการดาวน์โหลดทั้งหมดใช่หรือไม่?',
    removeAllDownloadsAlertConfirmTitle: 'ลบทั้งหมด',
    removeAllDownloadsAlertCancelTitle: 'ยกเลิก',
    onWifiLabel: 'เปิด',
    offWifiLabel: 'ปิด',
    thaiLocalizeLabel: 'TH',
    englishLocalizeLabel: 'EN',
    appSettingTitle: 'ตั้งค่าแอปพลิเคชั่น',
  }
});


class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      isLoaded: false,
      isError: false
    };
  }

  componentDidMount() {
    this.onloadPreload()
  }

  dismissErrorScreen = () => {
    this.setState({ isError: false })
  }

  async onloadPreload() {
    const isMember = await AsyncStorage.getItem("isMember")
    const currentLanguage = await AsyncStorage.getItem("currentLanguage")
    await this.getLanguagePack()
    if (currentLanguage) {
      global.currentLanguage = currentLanguage
      global.l10n.setLanguage(currentLanguage)
    } else {
      global.currentLanguage = 'en'
      await AsyncStorage.setItem('currentLanguage', 'en')
    }
    var isMemberBool = (isMember == 'true');
    this.props.onloadPreload(isMemberBool)
    // this.setState({ isError: true })
  }

  async getLanguagePack() {
    console.log('get localize')
    await axios.get('http://coachflix.mmzilla.com/api/v1/localization')
      .then((response) => {
        let l10n = response.data.data
        global.l10n = new LocalizedStrings(l10n)
        console.log('localize response : ', l10n)
      })
      .catch((error) => {
        console.log(error)
        this.setState({isError:true})
      })

    // const languagePack = await AsyncStorage.getItem("languagePack")
    // if (languagePack) {
    //   global.l10n = await JSON.parse(languagePack)
    // } else {
    //   let l10n = await JSON.parse(painString)
    //   await AsyncStorage.setItem('languagePack', l10n)
    //   global.l10n = l10n
    // }
    // let l10n = strings
    // await AsyncStorage.setItem('languagePack', l10n)
    // global.l10n = l10n
  }

  render() {
    if (this.state.isError) {
      return <FullScreenError dismissErrorScreen={this.dismissErrorScreen} isFullScreen={true} />
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: '50%' }}
            source={require('../images/LOGO.jpg')}
            resizeMode="contain"
          />
        </View>
      );
    }

  }
}

export default SplashScreen;
