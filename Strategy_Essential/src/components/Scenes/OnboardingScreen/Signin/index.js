import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../../BaseView/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import BaseComponent from "../../../Utility/BaseComponent";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen')
const boxWidth = width * 3 / 4

class Signin extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    };
  }

  // renderHeader() {
  //   return (
  //     <View style={{
  //       // flex: 1,
  //       width: width,
  //       justifyContent: 'center',
  //       backgroundColor: 'blue',
  //     }}>
  //       <SafeAreaView style={{
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //       }}>
  //         <Ionicons style={{}} name="chevron-back" color='white' size={26} />
  //         <Text style={[Styles.title, {}]}>TITLE</Text>
  //       </SafeAreaView>
  //     </View>
  //   )
  // }

  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.emit('onBoardingIndicator', {
        index: 4,
      });
    });
  }
  navigateBack = () => {
    this.props.navigation.goBack()
  }

  validateEmail() {
    console.log("valid")
  }
  validatePassword() {
    console.log("valid")
  }

  async signin() {
    await AsyncStorage.setItem('token','test')
    this.props.navigation.navigate('ConsentsScreen')
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.renderHeader("Signin", this.navigateBack)}
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View style={ScreenStyles.container}>
            <View style={[Styles.textInputView,{ marginTop: 40 }]}>
              <TextInput
                placeholder="Email or phone number"
                style={[Styles.title, { height: 32, }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='email-address'
                onBlur={() => {
                  this.validateEmail()
                }}
                onChangeText={async text => {
                  await this.setState({ usename: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <View style={[Styles.textInputView]}>
              <TextInput
                placeholder="Password"
                style={[Styles.title, { height: 32, }]}
                secureTextEntry={true}
                allowFontScaling={false}
                value={this.state.passwrod}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType="default"
                onBlur={() => {
                  this.validatePassword()
                }}
                onChangeText={async text => {
                  await this.setState({ password: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.signin()
              }}
            >
              <View style={[
                Styles.textInputView,
                {
                  borderColor: '#707070',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                  justifyContent: 'center'
                }]}>
                <Text style={[Styles.title]}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("RegistrationScreen")

              }}
            >
              <View style={[
                Styles.textInputView,
                {
                  marginTop: -4,
                  backgroundColor: 'transparent',
                  justifyContent: 'center'
                }]}>
                <Text style={[Styles.title]}>Register</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: boxWidth }}>
              <TouchableOpacity
                onPress={() => { }}
              >
                <Text style={Styles.title}>
                  Forgot password?
              </Text>
              </TouchableOpacity>
            </View>
            <Text style={Styles.title}>
              OR
              </Text>
            <View style={{ width: boxWidth }}>
            </View>
            <Text style={[Styles.title, { width: boxWidth, textAlign: 'center' }]}>
              Creating an account means you’re okay with
              Strategy Essential’s
                <Text style={[Styles.title, { color: 'gray' }]}
                onPress={() => {
                  console.log("pressed")
                }}
              >
                {' '}Term of Service, Privacy Policy
              </Text>
            </Text>
          </View>
        </ScrollView>
        {this.renderLoadingView(this.state.isLoading)}
      </View>
    );
  }
}

const ScreenStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  
  headerTitle: {
    color: 'white',
    fontSize: 20
  }
})


export default Signin;
