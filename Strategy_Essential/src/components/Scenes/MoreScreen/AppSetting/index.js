import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, DeviceEventEmitter, StyleSheet, Image, Alert } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native'

import Styles from '../../../BaseView/Styles';
const { width, height } = Dimensions.get('screen')

class AppSetting extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isWifiOnly: false,
      isThaiLanguage: false,
      scheme: Appearance.getColorScheme()
    };
  }

  render() {
    const { isThaiLanguage, isWifiOnly } = this.state
    return (
      <View style={Styles.container}>
        {this.renderHeader("App Setting", this.navigateBack)}
        <ScrollView style={{ width: width, backgroundColor: '#1E1F1E' }}>
          <SafeAreaView style={[Styles.container, { width: width }]}>
            <View style={{ width: width }}>
              <TouchableOpacity style={ScreenStyles.tableCell}>
                <MaterialCommunityIcons style={{ marginLeft: 20, marginRight: 16 }} name="wifi" color='white' size={26} />
                <Text style={[Styles.title, { flex: 1 }]}>Wifi Only</Text>
                <View
                  style={{ paddingRight: 20 }}
                >
                  <ToggleSwitch
                    isOn={isWifiOnly}
                    onColor="green"
                    offColor="#4c5cd1"
                    label={isWifiOnly ? 'ON' : 'OFF'}
                    labelStyle={Styles.title}
                    size='medium'
                    onToggle={isOn => this.setState({ isWifiOnly: !isWifiOnly })}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: width }}>
              <TouchableOpacity style={ScreenStyles.tableCell}>
                <SimpleLineIcons style={{ marginLeft: 20, marginRight: 16 }} name="globe" color='white' size={26} />
                <Text style={[Styles.title, { flex: 1 }]}>Language</Text>
                <View
                  style={{ paddingRight: 20 }}
                >
                  <ToggleSwitch
                    isOn={isThaiLanguage}
                    onColor="green"
                    offColor="#4c5cd1"
                    label={isThaiLanguage ? "TH" : "EN"}
                    labelStyle={Styles.title}
                    size='medium'
                    onToggle={isOn => this.setState({ isThaiLanguage: !isThaiLanguage })}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: width }}>
              <TouchableOpacity style={ScreenStyles.tableCell}
                onPress={() => {
                  Alert.alert('Remove all downloads', 'Are you sure?')
                }}
              >
                <MaterialCommunityIcons style={{ marginLeft: 20, marginRight: 16 }} name="trash-can-outline" color='white' size={26} />
                <Text style={[Styles.title, { flex: 1 }]}>Remove all downloads</Text>
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
