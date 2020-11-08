import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, DeviceEventEmitter, StyleSheet, Image, Alert, StatusBar } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native'
import AsyncStorage from '@react-native-community/async-storage';

import Styles from '../../../BaseView/Styles';
const { width, height } = Dimensions.get('screen')
const ENUM_THEME = {
  dark: "dark",
  light: 'light'
}

class AppSetting extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isWifiOnly: false,
      isThaiLanguage: false,
      isLightMode: false,
      currentTheme: ENUM_THEME.light,
      scheme: Appearance.getColorScheme()
    };
  }

  componentDidMount() {
    this.getTheme()
  }

  changeTheme = async () => {
    const { currentTheme } = this.state
    const toggleTheme = currentTheme == ENUM_THEME.light ? ENUM_THEME.dark : ENUM_THEME.light
    await this.setState({ currentTheme: toggleTheme })
    await AsyncStorage.setItem('theme', toggleTheme)
    console.log('currentTheme', toggleTheme)
    await DeviceEventEmitter.emit('switchTheme', { theme: toggleTheme })
  }

  getTheme = async () => {
    var theme = await AsyncStorage.getItem('theme')
    console.log('loaded theme : ', theme)
    theme = theme == ENUM_THEME.dark ? ENUM_THEME.dark : ENUM_THEME.light
    await this.setState({ currentTheme: theme })
  }

  render() {
    const { isThaiLanguage, isWifiOnly, isLightMode, currentTheme } = this.state
    return (
      <View style={this.getStyle().container}>
        <StatusBar barStyle='light-content'/>
        {this.renderHeader("App Settings")}
        <ScrollView style={this.getStyle().scrollView}>
          <SafeAreaView style={[this.getStyle().container, { width: width }]}>
            {this.renderFooter()}
            <View style={{ width: width }}>
              <View style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}>
                <MaterialCommunityIcons style={{ marginLeft: 20, marginRight: 16 }} name="wifi" color={this.getIconColor()} size={26} />
                <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.wifiOnlyLabel}</Text>
                <View
                  style={{ paddingRight: 20 }}
                >
                  <ToggleSwitch
                    isOn={isWifiOnly}
                    onColor="#dfb445"
                    offColor="#4c5cd1"
                    label={isWifiOnly ? global.l10n.onWifiLabel : global.l10n.offWifiLabel}
                    labelStyle={this.getStyle().title}
                    size='medium'
                    onToggle={isOn => this.setState({ isWifiOnly: !isWifiOnly })}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: width }}>
              <View style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}>
                <SimpleLineIcons style={{ marginLeft: 20, marginRight: 16 }} name="globe" color={this.getIconColor()} size={26} />
                <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.languageLabel}</Text>
                <View
                  style={{ paddingRight: 20 }}
                >
                  <ToggleSwitch
                    isOn={global.currentLanguage == 'th'}
                    onColor="#dfb445"
                    offColor="#4c5cd1"
                    label={global.currentLanguage == 'th' ? global.l10n.thaiLocalizeLabel : global.l10n.englishLocalizeLabel}
                    labelStyle={this.getStyle().title}
                    size='medium'
                    onToggle={async () => {
                      // this.setState({ isThaiLanguage: !isThaiLanguage })
                      let currentLanguage = global.currentLanguage == 'th' ? 'en' : 'th'
                      global.currentLanguage = currentLanguage
                      global.l10n.setLanguage(currentLanguage)
                      await AsyncStorage.setItem('currentLanguage', currentLanguage)
                      DeviceEventEmitter.emit('switchLanguage')
                      // this.setState({})
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: width }}>
              <View style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}>
                <MaterialIcons style={{ marginLeft: 20, marginRight: 16 }} name="color-lens" color={this.getIconColor()} size={26} />
                <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.themeLabel}</Text>
                <View
                  style={{ paddingRight: 20 }}
                >
                  <ToggleSwitch
                    isOn={currentTheme == ENUM_THEME.dark ? true : false}
                    onColor="#dfb445"
                    offColor="#4c5cd1"
                    label={currentTheme == ENUM_THEME.dark ? 'Dark' : 'Light'}
                    labelStyle={this.getStyle().title}
                    size='medium'
                    onToggle={(isOn) => {
                      this.changeTheme(isOn)
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: width }}>
              <TouchableOpacity style={[ScreenStyles.tableCell, this.getStyle().backgroundColor]}
                onPress={() => {
                  Alert.alert(global.l10n.removeAllDownloadsAlertTitle, global.l10n.removeAllDownloadsAlertSubtitle,
                    [
                      {
                        text: global.l10n.removeAllDownloadsAlertCancelTitle,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      {
                        text: global.l10n.removeAllDownloadsAlertConfirmTitle, onPress: () => {
                          //TODO: Remove all download
                        }
                      }
                    ])
                }}
              >
                <MaterialCommunityIcons style={{ marginLeft: 20, marginRight: 16 }} name="trash-can-outline" color={this.getIconColor()} size={26} />
                <Text style={[this.getStyle().title, { flex: 1 }]}>{global.l10n.removeAllDownloadsLabel}</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
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

export default AppSetting;
